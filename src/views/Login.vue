<template>
  <div class="login-container">
      <el-card class="login-card">
        <h2 class="title">系统登录</h2>

        <el-form :model="form" status-icon>
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" block @click="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
      </el-card>
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
    // 调用后端 /login 接口
    const response = await axios.post(
      '/login',
      {
        username: form.username,
        password: form.password
      },
      {
        withCredentials: true  // 确保接收并发送 Cookie
      }
    )

    if (response.data.code === "200") {
      // 读取后端返回的 Role Header（headers 名小写）
      console.log(response);
      // 存储后端返回的Token
      localStorage.setItem(response.data.data.tokenName, response.data.data.tokenValue)
      const role = response.headers['role']
      if (role === 'admin') {
        router.push({ name: 'AdminLayout' })
      } else {
        router.push({ name: 'UserLayout' })
      }
    } else {
      // 登录失败，显示后端 msg
      errorMsg.value = response.data.msg || '登录失败'
    }
  } catch (err) {
    console.error('登录失败详情:', err)
    // 网络错误或后端抛异常
    errorMsg.value =
      err.response?.data?.msg || '登录接口调用失败，请稍后重试'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}
.login-card {
  width: 320px;
  padding: 24px;
  border-radius: 8px;
}
.title {
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
}
.error-msg {
  color: #f56c6c;
  text-align: center;
  margin-top: 12px;
}
</style>