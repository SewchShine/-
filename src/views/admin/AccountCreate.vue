<template>
    <div class="create-container">
      <h2>创建户籍管理账号</h2>
      <form @submit.prevent="handleCreate">
        <div class="form-group">
          <label>账号权限</label>
          <select v-model="account.role">
            <option value="super">高级管理员</option>
            <option value="normal">普通管理员</option>
          </select>
        </div>
  
        <div class="form-group">
          <label>昵称</label>
          <input v-model="account.name" type="text" placeholder="请输入昵称" required />
        </div>

        <div class="form-group">
          <label>单位名称</label>
          <input v-model="account.unit" type="text" placeholder="请输入单位名称" required />
        </div>
  
        <div class="form-group">
          <label>登录名称</label>
          <input v-model="account.username" type="text" placeholder="请输入登录名称" required />
        </div>
  
        <div class="form-group">
          <label>密码</label>
          <input v-model="account.password" type="password" placeholder="请输入密码" required />
        </div>
  
        <div class="form-group">
          <label>确认密码</label>
          <input v-model="account.confirmPassword" type="password" placeholder="请再次输入密码" required />
        </div>
  
        <div class="form-group">
          <label>管辖区域</label>
          <div class="region-select">
            <input v-model="account.province" type="text" placeholder="省" />
            <input v-model="account.city" type="text" placeholder="市" />
            <input v-model="account.county" type="text" placeholder="区/县" />
          </div>
        </div>
  
        <button type="submit" class="submit-btn">创建账号</button>
      </form>
    </div>
  </template>
  
  <script setup>
import { reactive } from 'vue'
import axios from 'axios'

const account = reactive({
  role: 'normal',       // 'super' or 'normal'
  nickname: '',         // 对应 username
  unit: '',             // office_name
  username: '',         // login_id
  password: '',
  confirmPassword: '',
  manageAreaCode: ''    // 6位行政区划码（如 130622）
})

const handleCreate = async () => {
  if (account.password !== account.confirmPassword) {
    alert('两次密码输入不一致！')
    return
  }

  // 权限映射：super = 1，normal = 2
  const privilegeMap = {
    super: 1,
    normal: 2
  }

  const requestData = {
    username: account.nickname,
    login_id: account.username,
    password: account.password,
    manage_area: account.manageAreaCode,
    office_name: account.unit,
    privilege: privilegeMap[account.role]
  }

  try {
    const response = await axios.post('/admin/user', requestData)
    alert('账号创建成功！')
    console.log('返回结果：', response.data)
  } catch (error) {
    console.error('创建账号失败：', error)
    alert('创建失败，请稍后重试')
  }
}
</script>

  <style scoped>
  .create-container {
    background-color: #fff;
    padding: 30px 40px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    max-width: 600px;
    margin: 0 auto;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 6px;
    color: #444;
  }
  
  input, select {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
  }
  
  input:focus, select:focus {
    border-color: #2193b0;
  }
  
  .region-select {
  display: flex;
  gap: 6px;
  width: 300px; /* 控制整体区域宽度 */
}
.region-select input {
  flex: 1;
}

.submit-btn {
    margin-top: 10px;
    padding: 12px;
    font-size: 16px;
    background-color: #2193b0;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #19769c;
  }
  </style>
  