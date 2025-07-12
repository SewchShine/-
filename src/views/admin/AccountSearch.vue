<template>
  <div class="query-page">
    <div class="card">
      <h2>账号查询</h2>

      <!-- 筛选条件：四选一 -->
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

        <button @click="filterAccounts" class="btn primary">查询</button>
      </div>

      <!-- 查询结果表格 -->
      <div class="table-wrapper" v-if="filteredAccounts.length > 0">
        <table class="result-table">
          <thead>
            <tr>
              <th>昵称</th>
              <th>登录名</th>
              <th>密码</th>
              <th>管辖区域</th>
              <th>单位名称</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(acc, index) in filteredAccounts" :key="index">
              <td>{{ acc.username }}</td>
              <td>{{ acc.loginId }}</td>
              <td>{{ acc.password }}</td>
              <td>{{ acc.manageArea }}</td>
              <td>{{ acc.officeName }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="no-result">暂无数据，请输入后查询</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const filterOption = ref('office_name')
const filterValue = ref('')
const filteredAccounts = ref([])

const getPlaceholder = (key) => {
  switch (key) {
    case 'officeName': return '请输入单位名称'
    case 'username': return '请输入昵称'
    case 'loginId': return '请输入登录名'
    case 'manageArea': return '请输入区划码'
    default: return '请输入'
  }
}

const filterAccounts = async () => {
  if (!filterValue.value.trim()) {
    alert('请输入查询内容')
    return
  }

  try {
    const response = await axios.get('/admin/user', {
      params: {
        [filterOption.value]: filterValue.value.trim()
      }
    })
    filteredAccounts.value = Array.isArray(response.data?.data)
      ? response.data.data
      : []
  } catch (err) {
    console.error('查询失败', err)
    alert('获取账号列表失败')
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
</style>
