<template>
    <div class="login-container">
      <div class="login-box">
        <h2>人口信息管理系统</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>用户名</label>
            <input v-model="username" type="text" placeholder="请输入用户名" required />
          </div>
          <div class="form-group">
            <label>密码</label>
            <input v-model="password" type="password" placeholder="请输入密码" required />
          </div>
          <div class="form-group">
            <label>角色</label>
            <select v-model="role">
              <option value="user">用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          <button type="submit" class="login-btn">登录</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const role = ref('user')
  const router = useRouter()
  
  const handleLogin = () => {
  if (role.value === 'user') {
    router.push('/user/home')
  } else {
    router.push('/admin/home')
  }
}

  </script>
  
  <style scoped>
  .login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #6dd5ed, #2193b0);
    font-family: 'Segoe UI', sans-serif;
  }
  
  .login-box {
    background-color: #ffffffee;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 400px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 8px;
    color: #555;
    font-size: 15px;
  }
  
  input, select {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
  }
  
  input:focus, select:focus {
    border-color: #2193b0;
  }
  
  .login-btn {
    width: 100%;
    padding: 12px;
    border: none;
    background-color: #2193b0;
    color: white;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .login-btn:hover {
    background-color: #19769c;
  }
  </style>
  