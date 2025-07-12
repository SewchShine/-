<template>
  <div class="household-query-page">
    <div class="card">
      <h2>综合查询</h2>

      <div class="search-bar">
        <input
          v-model="idNumber"
          type="text"
          placeholder="请输入身份证号"
          @keyup.enter="handleSearch"
        />
        <button class="btn primary" @click="handleSearch">查询</button>
      </div>

      <div class="table-wrapper">
        <table class="result-table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>身份证号</th>
              <th>性别</th>
              <th>民族</th>
              <th>出生日期</th>
              <th>与户主关系</th>
              <th>户籍编号</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in results" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.identityCard }}</td>
              <td>{{ sexMap[item.sex] || '未知' }}</td>
              <td>{{ nationMap[item.nation] || '未知' }}</td>
              <td>{{ item.birthdate }}</td>
              <td>{{ item.householdName }}</td>
              <td>{{ item.householdId }}</td>
              
            </tr>
            <tr v-if="results.length === 0">
              <td colspan="8" style="text-align: center; color: #888">
                暂无查询结果
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const idNumber = ref('')
const results = ref([])

const sexMap = {
  1: '男',
  2: '女'
}
const nationMap = {
  1: '汉族',
  2: '满族'
}

const handleSearch = async () => {
  const query = idNumber.value.trim()
  if (!query) {
    alert('请输入身份证号')
    return
  }

  try {
    const response = await axios.get('/people/research', {
      params: { identity_card: query }
    })

    const raw = response.data?.data

    if (!raw) {
      results.value = []
      alert('未找到匹配记录')
      return
    }

    results.value = Array.isArray(raw) ? raw : [raw]
  } catch (error) {
    console.error('查询失败：', error)
    alert('查询失败，请稍后再试')
  }
}
</script>

<style scoped>
.household-query-page {
  min-height: 100vh;
  background: linear-gradient(to right, #e6f0ff, #f4fcff);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 50px;
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 26px;
  font-weight: 700;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;
}

.search-bar input[type="text"] {
  width: 350px;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-bar input[type="text"]:focus {
  border-color: #4aa9e9;
  box-shadow: 0 2px 12px rgba(74, 169, 233, 0.3);
}

.search-bar button {
  background-color: #2193b0;
  color: white;
  padding: 12px 20px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-bar button:hover {
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
}

.result-table th,
.result-table td {
  padding: 12px 20px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
  color: #555;
  background-color: #f9f9f9;
}

.result-table th {
  background-color: #2193b0;
  color: white;
  font-weight: 600;
}

.result-table tr:nth-child(even) {
  background-color: #f1f1f1;
}

.result-table tr:hover {
  background-color: #f4fcff;
  cursor: pointer;
}

.result-table td {
  transition: background-color 0.3s;
  font-size: 15px;
  color: #333;
}

.result-table tr:hover td {
  background-color: #eef4fb;
}
</style>
