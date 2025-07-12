<template>
  <div class="delete-page">
    <div class="card">
      <h2>删除户籍管理账号</h2>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <label>选择查询方式：</label>
        <select v-model="filterOption">
          <option value="office_name">单位名称</option>
          <option value="username">昵称</option>
          <option value="loginId">登录名</option>
          <option value="manage_area">管辖区划码</option>
        </select>

        <input
          v-model="filterValue"
          type="text"
          :placeholder="getPlaceholder(filterOption)"
        />

        <button @click="filterAccounts" class="btn primary">筛选</button>
      </div>

      <!-- 表格展示 -->
      <div class="table-wrapper" v-if="filteredAccounts.length > 0">
        <table class="result-table">
          <thead>
            <tr>
              <th>昵称</th>
              <th>登录名</th>
              <th>密码</th>
              <th>管辖区域</th>
              <th>单位名称</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(acc, index) in filteredAccounts" :key="index">
              <td>{{ acc.username }}</td>
              <td>{{ acc.loginId}}</td>
              <td>{{ acc.password }}</td>
              <td>{{ acc.manageArea }}</td>
              <td>{{ acc.officeName }}</td>
              <td>
                <button class="btn danger" @click="confirmDelete(index)">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="no-result">暂无数据，请尝试查询</div>
    </div>

    <!-- 确认弹窗 -->
    <div v-if="showConfirm" class="dialog-overlay">
      <div class="confirm-dialog">
        <p>确定删除该账号吗？</p>
        <div class="dialog-actions">
          <button class="btn" @click="showConfirm = false">取消</button>
          <button class="btn danger" @click="deleteAccount">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const filterOption = ref('office_name')
const filterValue = ref('')
const filteredAccounts = ref([])
const showConfirm = ref(false)
const deleteIndex = ref(null)

const getPlaceholder = (key) => {
  switch (key) {
    case 'office_name': return '请输入单位名称'
    case 'username': return '请输入昵称'
    case 'loginId': return '请输入登录名'
    case 'manage_area': return '请输入管辖区划码'
    default: return '请输入'
  }
}

const filterAccounts = async () => {
  if (!filterValue.value.trim()) {
    alert('请输入查询值')
    return
  }

  try {
    const response = await axios.get('/admin/user', {
      params: {
        [filterOption.value]: filterValue.value.trim()
      }
    })

    const list = response.data?.data || []
    filteredAccounts.value = Array.isArray(list) ? list : []

  } catch (error) {
    console.error('筛选失败：', error)
    alert('获取账号列表失败')
  }
}

const confirmDelete = (index) => {
  deleteIndex.value = index
  showConfirm.value = true
}

const deleteAccount = async () => {
  const target = filteredAccounts.value[deleteIndex.value]
  try {
    await axios.delete('/admin/user/', {
      params: { userid: target.loginId }
    })
    alert('删除成功')
    showConfirm.value = false
    await filterAccounts() // 刷新数据
  } catch (error) {
    console.error('删除失败：', error)
    alert('删除失败，请稍后重试')
  }
}
</script>

<style scoped>
.delete-page {
  min-height: 100vh;
  background: linear-gradient(to right, #e6f0ff, #f4fcff);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
}

.card {
  background: #fff;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 25px;
  align-items: center;
}

.filter-section label {
  font-weight: 500;
  color: #444;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-section input,
.filter-section select {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn.primary {
  background-color: #2193b0;
  color: white;
}

.btn.primary:hover {
  background-color: #19769c;
}

.btn.danger {
  background-color: #e74c3c;
  color: white;
}

.btn.danger:hover {
  background-color: #c0392b;
}

.table-wrapper {
  overflow-x: auto;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.result-table th,
.result-table td {
  padding: 14px 10px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
}

.result-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.no-result {
  text-align: center;
  margin-top: 30px;
  color: #999;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-dialog {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 300px;
  animation: fadeIn 0.3s ease;
}

.dialog-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
