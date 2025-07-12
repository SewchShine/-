<template>
  <div class="id-apply-page">
    <div class="form-card">
      <h2>公民申领身份证</h2>

      <form @submit.prevent="handleSubmit">
        <!-- 身份证号 -->
        <div class="form-row">
          <label>居民身份证号码：</label>
          <input v-model="form.idNumber" type="text" required />
        </div>

        <!-- 姓名 -->
        <div class="form-row">
          <label>姓名：</label>
          <input v-model="form.name" type="text" required />
        </div>

        <!-- 数字照片 -->
        <div class="form-row">
          <label>身份证件照数字照片：</label>
          <input type="file" @change="handlePhotoChange" accept="image/*" required />
        </div>

         <!-- 监护人材料 -->
         <div class="form-row">
            <label>
              监护人证明材料：
              <span class="hint">(如《出生医学证明》，如申请人户口簿能反映父母子女关系则可不提供)</span>
            </label>
            <input type="file" @change="handleGuardianProofChange" accept=".pdf,image/*" />
          </div>

        <!-- 送达方式 -->
        <div class="form-row">
          <label>居民身份证送达方式：</label>
          <select v-model="form.deliveryMethod" required>
            <option value="">请选择</option>
            <option value="窗口领取">窗口领取</option>
            <option value="代理人送达">代理人送达</option>
            <option value="邮寄送达">邮寄送达</option>
          </select>
        </div>

        <!-- 邮寄地址 -->
        <div v-if="form.deliveryMethod === '邮寄送达'" class="form-row">
          <label>邮寄地址：</label>
          <input v-model="form.mailAddress" type="text" placeholder="请输入邮寄地址" />
        </div>

        <!-- 提交按钮 -->
        <div class="form-actions">
          <button type="submit" class="btn">提交身份证制证申请</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
idNumber: '',
name: '',
photoFile: null,
deliveryMethod: '',  // 窗口领取 / 代理人送达 / 邮寄送达
mailAddress: ''
})

// 映射送达方式为数字
const deliveryMap = {
'窗口领取': 0,
'代理人送达': 1,
'邮寄送达': 2
}

const handlePhotoChange = (event) => {
const file = event.target.files[0]
if (file) {
  form.photoFile = file
}
}

const handleSubmit = async () => {
try {
  let base64Photo = null

  // 将图片文件转为 base64（如果有）
  if (form.photoFile) {
    base64Photo = await toBase64(form.photoFile)
  }

  const payload = {
    identity_card: form.idNumber,
    name: form.name,
    photo: base64Photo,
    deliver: deliveryMap[form.deliveryMethod],
    deliver_address: form.deliveryMethod === '邮寄送达' ? form.mailAddress : null
  }

  await axios.post('/people/idcard', payload)
  alert('身份证申办请求已提交成功！')
} catch (err) {
  console.error('提交失败：', err)
  alert('提交失败，请检查输入内容')
}
}

// 文件转 base64 工具函数
function toBase64(file) {
return new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})
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
