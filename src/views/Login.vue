<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">人口管理系统</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="form.username" placeholder="请输入用户名" required />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="form.password" placeholder="请输入密码" required />
        </div>

        <button type="submit" class="login-btn">登录</button>

        <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''
  try {
    const response = await axios.post(
      '/login',
      {
        username: form.username,
        password: form.password
      },
      {
        withCredentials: true
      }
    )

    if (response.data.code === '200') {
      localStorage.setItem(response.data.data.tokenName, response.data.data.tokenValue)
      const role = response.headers['role']
      if (role === 'admin') {
        router.push({ name: 'AdminLayout' })
      } else {
        router.push({ name: 'UserLayout' })
      }
    } else {
      errorMsg.value = response.data.msg || '登录失败'
    }
  } catch (err) {
    console.error('登录失败详情:', err)
    errorMsg.value = err.response?.data?.msg || '登录接口调用失败，请稍后重试'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #284d6d, #4b79a1);
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  background: #ffffffee;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
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
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #19769c;
  outline: none;
}

.login-btn {
  background-color: #1d6fa5;
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #155b87;
}

.error-msg {
  color: #d9534f;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
</style>
