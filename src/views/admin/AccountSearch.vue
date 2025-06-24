<template>
    <div class="query-page">
      <div class="card">
        <h2>账号查询</h2>
  
        <!-- 筛选条件 -->
        <div class="filter-section">
          <label>
            账号类型：
            <select v-model="filter.role">
              <option value="">全部</option>
              <option value="super">高级管理员</option>
              <option value="normal">普通管理员</option>
            </select>
          </label>
  
          <label>
          单位名称：
          <input
            v-model="filter.unit"
            type="text"
            placeholder="请输入单位名称"
          />
        </label>
  
          <button @click="filterAccounts" class="btn primary">查询</button>
        </div>
  
        <!-- 查询结果列表 -->
        <div class="table-wrapper">
          <table class="result-table">
            <thead>
              <tr>
                <th>用户名称</th>
                <th>省</th>
                <th>市</th>
                <th>区/县</th>
                <th>公安局名称</th>
                <th>密码</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(acc, index) in filteredAccounts" :key="index">
                <td>{{ acc.username }}</td>
                <td>{{ acc.province }}</td>
                <td>{{ acc.city }}</td>
                <td>{{ acc.county }}</td>
                <td>{{ acc.unit }}</td>
                <td>{{ acc.password }}</td>
                <td>
                  <button class="btn warning" @click="openEditModal(index)">修改</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- 修改弹窗 -->
      <div v-if="showModal" class="dialog-overlay" @click.self="closeModal">
        <div class="modal">
          <h3>修改账号信息</h3>
          <form @submit.prevent="saveChanges">
            <div class="form-group">
              <label>账号权限</label>
              <select v-model="editAccount.role" required>
                <option value="super">高级管理员</option>
                <option value="normal">普通管理员</option>
              </select>
            </div>
  
            <div class="form-group">
              <label>单位名称</label>
              <input v-model="editAccount.unit" type="text" required />
            </div>
  
            <div class="form-group">
              <label>用户名称</label>
              <input v-model="editAccount.username" type="text" required />
            </div>
  
            <div class="form-group">
              <label>密码</label>
              <input v-model="editAccount.password" type="text" required />
            </div>
  
            <div class="form-group region-select">
              <label>省</label>
              <input v-model="editAccount.province" type="text" />
              <label>市</label>
              <input v-model="editAccount.city" type="text" />
              <label>区/县</label>
              <input v-model="editAccount.county" type="text" />
            </div>
  
            <div class="form-actions">
              <button type="button" class="btn" @click="closeModal">取消</button>
              <button type="submit" class="btn primary">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const filter = reactive({ role: '', unit: '' })
const filteredAccounts = ref([])

const showModal = ref(false)
const editIndex = ref(null)

const editAccount = reactive({
  username: '',
  province: '',
  city: '',
  county: '',
  unit: '',
  password: '',
  role: ''
})

// 查询账号数据（发送到后端）
const filterAccounts = async () => {
  try {
    const res = await axios.get('/admin/user', {
      params: {
        role: filter.role,
        unit: filter.unit
      }
    })
    filteredAccounts.value = res.data
  } catch (err) {
    console.error('查询失败', err)
    alert('查询失败，请稍后再试')
  }
}

// 打开编辑弹窗
const openEditModal = (index) => {
  editIndex.value = index
  Object.assign(editAccount, filteredAccounts.value[index])
  showModal.value = true
}

// 关闭弹窗
const closeModal = () => {
  showModal.value = false
}

// 保存修改（提交到后端）
const saveChanges = async () => {
  if (!editAccount.username || !editAccount.unit || !editAccount.password) {
    alert('请填写完整信息')
    return
  }

  try {
    await axios.put('/api/admin/update', {
      ...editAccount
    })
    alert('修改成功')
    showModal.value = false
    filterAccounts() // 重新刷新数据
  } catch (err) {
    console.error('修改失败', err)
    alert('修改失败，请稍后再试')
  }
}
</script>

  
  <style scoped>
  .query-page {
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
    gap: 20px;
    margin-bottom: 25px;
    align-items: center;
  }
  
  .filter-section label {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #444;
  }
  
  .filter-section select {
    margin-left: 10px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .btn {
    padding: 8px 16px;
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
  
  .btn.warning {
    background-color: #f39c12;
    color: white;
  }
  
  .btn.warning:hover {
    background-color: #e67e22;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  .result-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
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
  
  /* 修改弹窗样式 */
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
    z-index: 1000;
  }
  
  .modal {
    background: #fff;
    border-radius: 16px;
    padding: 30px 35px;
    width: 450px;
    max-width: 95vw;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
  
  .modal h3 {
    margin-bottom: 25px;
    text-align: center;
    color: #222;
  }
  
  .form-group {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-weight: 600;
    margin-bottom: 6px;
    color: #444;
  }
  
  .form-group input,
  .form-group select {
    padding: 10px 12px;
    font-size: 15px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    border-color: #4aa9e9;
    box-shadow: 0 0 5px rgba(74, 169, 233, 0.5);
  }
  
  /* 特殊布局，区域输入横排 */
  .region-select {
    display: flex;
    gap: 10px;
  }
  
  .region-select label {
    flex: none;
    padding-top: 8px;
  }
  
  .region-select input {
    flex: 1;
  }
  
  /* 弹窗按钮组 */
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 20px;
  }
  
  .form-actions .btn {
    min-width: 80px;
    font-weight: 600;
  }
  </style>
  