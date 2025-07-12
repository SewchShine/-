<template>
  <div class="id-apply-page">
    <div class="form-card">
      <h2>公民申领身份证</h2>

      <form @submit.prevent="handleSubmit">
        <!-- 身份证号 -->
        <div class="form-row">
          <label>居民身份证号码：</label>
          <input
            v-model="form.identity_card"
            type="text"
            maxlength="18"
            required
            placeholder="请输入身份证号码"
          />
        </div>

        <!-- 姓名 -->
        <div class="form-row">
          <label>姓名：</label>
          <input
            v-model="form.name"
            type="text"
            maxlength="30"
            required
            placeholder="请输入姓名"
          />
        </div>

        <!-- 照片上传 -->
        <div class="form-row">
          <label>身份证件照（可选）：</label>
          <input type="file" accept="image/*" @change="handlePhotoChange" />
        </div>

        <!-- 送达方式 -->
        <div class="form-row">
          <label>居民身份证送达方式：</label>
          <select v-model="form.deliver" required>
            <option disabled value="">请选择送达方式</option>
            <option :value="0">窗口领取</option>
            <option :value="1">代理人送达</option>
            <option :value="2">邮寄送达</option>
          </select>
        </div>

        <!-- 邮寄地址 -->
        <div v-if="form.deliver === 2" class="form-row">
          <label>邮寄地址：</label>
          <input
            v-model="form.deliver_address"
            type="text"
            placeholder="请输入详细邮寄地址"
          />
        </div>

        <!-- 提交 -->
        <div class="form-actions">
          <button type="submit" class="btn">提交申领请求</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  identity_card: '',
  name: '',
  photo: '', // base64 字符串
  deliver: '',
  deliver_address: ''
})

// 图片转 base64
const handlePhotoChange = async (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      form.photo = reader.result
    }
  }
}

const handleSubmit = async () => {
  if (!form.identity_card || !form.name || form.deliver === '') {
    alert('请填写完整的必填信息')
    return
  }

  try {
    const response = await axios.post('/people/idcard', form)
    alert('身份证申领请求已提交成功')
  } catch (error) {
    console.error('提交失败：', error)
    alert('提交失败，请稍后重试')
  }
}
</script>

<style scoped>
.id-apply-page {
  padding: 40px;
  background: linear-gradient(to right, #e6f0ff, #f4fcff);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.form-card {
  background: white;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
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

.form-row {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

input[type="text"],
input[type="file"],
select {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  background-color: #2b7abf;
  color: white;
  font-size: 16px;
  padding: 12px 32px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn:hover {
  background-color: #2468a8;
}
</style>
