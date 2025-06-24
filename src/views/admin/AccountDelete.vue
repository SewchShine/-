<template>
  <div class="delete-page">
    <div class="card">
      <h2>删除户籍管理账号</h2>

      <!-- 筛选区域 -->
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

        <button @click="filterAccounts" class="btn primary">筛选</button>
      </div>

      <!-- 表格展示 -->
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
                <button class="btn danger" @click="confirmDelete(index)">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 弹窗 -->
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
import { ref, reactive } from "vue";

const filter = reactive({ role: "", unit: "" });
import axios from "axios";

const filterAccounts = async () => {
  try {
    const response = await axios.get("/admin/list", {
      params: {
        role: filter.role,
        unit: filter.unit,
      },
    });
    filteredAccounts.value = response.data;
  } catch (error) {
    console.error("筛选失败：", error);
    alert("获取账号列表失败");
  }
};

const deleteAccount = async () => {
  const targetAccount = filteredAccounts.value[deleteIndex.value];
  try {
    await axios.delete(`/api/admin/delete`, {
      data: { login_id: targetAccount.username },
    });
    alert("删除成功");
    showConfirm.value = false;
    filterAccounts(); // 重新刷新列表
  } catch (error) {
    console.error("删除失败：", error);
    alert("删除失败，请稍后再试");
  }
};
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
