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
              <th>户籍类型</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in results" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.identity_card }}</td>
              <td>{{ item.sex }}</td>
              <td>{{ item.nation }}</td>
              <td>{{ item.birthdate }}</td>
              <td>{{ item.householdName }}</td>
              <td>{{ item.household_id }}</td>
              <td>{{ item.household_type }}</td>
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
import { ref } from "vue";
import axios from "axios";
import request from '../../utils/request';

const idNumber = ref("");
const results = ref([]);

// 工具函数：将驼峰转下划线
const camelToSnake = (str) =>
  str.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());

// 统一字段名为前端模板使用的下划线形式
const normalizeData = (data) => {
  const result = {};
  for (const key in data) {
    result[camelToSnake(key)] = data[key];
  }
  return result;
};

// 处理查询
const handleSearch = async () => {
  const query = idNumber.value.trim();
  if (!query) {
    alert("请输入身份证号");
    return;
  }

  try {
    const response = await axios.get("/people/research", {
      params: { identity_card: query },
      // withCredentials: true
    });
    // const response = await request.get("/people/research", {
    //   params: { identity_card: query },
    //   // withCredentials: true
    // });

    console.log("完整响应：", response.data);

    const raw = response.data?.data;

    if (!raw) {
      results.value = [];
      alert("未找到匹配记录");
      return;
    }

    // 若是数组则批量处理，否则单个包装成数组
    const normalized = Array.isArray(raw)
      ? raw.map(normalizeData)
      : [normalizeData(raw)];

    results.value = normalized;
  } catch (error) {
    console.error("查询失败：", error);
    alert("查询失败，请稍后再试");
  }
};
</script>


<style scoped>
.household-query-page {
  min-height: 100vh;
  background: linear-gradient(to right, #e6f0ff, #f4fcff); /* 温和渐变背景 */
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
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
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
  background-color: #f4fcff; /* 增加鼠标悬停效果 */
  cursor: pointer;
}

.result-table td {
  transition: background-color 0.3s;
}

.result-table tr:hover td {
  background-color: #eef4fb;
}

/* 美化表格内容 */
.result-table td {
  font-size: 15px;
  color: #333;
}

/* 弹窗样式 */
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
  padding: 40px 50px;
  width: 450px;
  max-width: 95vw;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease;
}

.modal h3 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-size: 22px;
  font-weight: 600;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4aa9e9;
  box-shadow: 0 2px 12px rgba(74, 169, 233, 0.3);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.form-actions .btn {
  min-width: 100px;
  font-weight: 600;
  padding: 10px 20px;
}

/* 修改按钮的美化 */
.form-actions .btn.primary {
  background-color: #2193b0;
  color: white;
}

.form-actions .btn.primary:hover {
  background-color: #19769c;
}

.form-actions .btn {
  background-color: #e74c3c;
  color: white;
}

.form-actions .btn:hover {
  background-color: #c0392b;
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
