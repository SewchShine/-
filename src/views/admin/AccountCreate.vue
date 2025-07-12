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
        <input v-model="account.nickname" type="text" placeholder="请输入昵称" required />
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
        <label>管辖区域（省/市/区）</label>
        <el-cascader
          v-model="selectedRegion"
          :options="regionOptions"
          placeholder="请选择省市区"
          :props="{ value: 'code', label: 'name', children: 'children' }"
          clearable />
      </div>

      <button type="submit" class="submit-btn">创建账号</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

// 表单数据
const account = reactive({
  role: 'normal',
  nickname: '',
  unit: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const selectedRegion = ref([])
const regionOptions = ref([])

// 动态加载行政区划数据
onMounted(async () => {
  try {
    const res = await fetch('/region-data/pcas-code.json')
    regionOptions.value = await res.json()
  } catch (err) {
    console.error('无法加载行政区划数据', err)
    alert('加载行政区划数据失败，请检查网络或联系管理员')
  }
})

// 提交表单
const handleCreate = async () => {
  if (account.password !== account.confirmPassword) {
    alert('两次密码输入不一致！')
    return
  }

  if (selectedRegion.value.length !== 3) {
    alert('请选择完整的省、市、区')
    return
  }

  const privilegeMap = {
    super: 0,
    normal: 1
  }

  const requestData = {
    username: account.nickname,
    login_id: account.username,
    password: account.password,
    manage_area: selectedRegion.value.at(-1),
    office_name: account.unit,
    privilege: privilegeMap[account.role]
  }

  try {
    await axios.post('/admin/user', requestData)
    alert('账号创建成功！')
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
  max-width: 640px;
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

input, select, .el-cascader {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

input:focus, select:focus, .el-cascader:focus {
  border-color: #2193b0;
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
