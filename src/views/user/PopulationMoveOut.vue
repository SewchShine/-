<template>
  <div class="move-out-page">
    <div class="form-card">
      <h2>户口迁出申请</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-row">
            <label>公民身份证号码：</label>
            <input v-model="form.identity_card" maxlength="18" required />
          </div>

          <div class="form-row">
            <label>姓名：</label>
            <input v-model="form.name" maxlength="30" required />
          </div>

          <div class="form-row">
            <label>性别：</label>
            <input v-model.number="form.sex" type="number" required />
          </div>

          <div class="form-row">
            <label>民族：</label>
            <input v-model.number="form.nation" type="number" required />
          </div>

          <div class="form-row">
            <label>出生日期：</label>
            <input v-model="form.birthdate" type="date" required />
          </div>

          <div class="form-row">
            <label>出生地：</label>
            <input v-model="form.birthplace" maxlength="100" required />
          </div>

          <div class="form-row">
            <label>国籍（三字代码）：</label>
            <input v-model="form.nationality" maxlength="3" required />
          </div>

          <div class="form-row">
            <label>籍贯：</label>
            <input v-model="form.native_of" maxlength="40" required />
          </div>

          <div class="form-row">
            <label>与户主关系：</label>
            <input v-model="form.household_name" maxlength="40" required />
          </div>

          <div class="form-row">
            <label>居住地名称（可选）：</label>
            <input v-model="form.household_placeid" maxlength="50" />
          </div>

          <div class="form-row">
            <label>迁出日期（可选）：</label>
            <input v-model="form.movein_date" type="date" />
          </div>

          <div class="form-row">
            <label>何国家/地区来本地址（可选）：</label>
            <input v-model="form.movein_country" maxlength="3" />
          </div>

          <div class="form-row">
            <label>状态：</label>
            <select v-model.number="form.status" required>
              <option value="">请选择</option>
              <option :value="0">无效</option>
              <option :value="1">有效</option>
              <option :value="2">迁出中</option>
              <option :value="3">已销户</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn">提交迁出申请</button>
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
  sex: '',              // 0 / 1
  nation: '',
  birthdate: '',
  birthplace: '',
  nationality: '',
  native_of: '',
  household_name: '',
  household_placeid: '',
  movein_date: '',
  movein_country: '',
  status: ''            // 0 无效 1 有效 2 迁出中 3 已销户
})

const handleSubmit = async () => {
  // === 1) 组装符合后端 DTO 的 payload ===
  const payload = {
    identity_card: form.identity_card,
    name: form.name,
    sex: Number(form.sex),                // int
    nation: Number(form.nation),          // int
    birthdate: form.birthdate,            // yyyy-MM-dd
    birthplace: form.birthplace,
    nationality: form.nationality,
    native_of: form.native_of,
    household_name: form.household_name,
    household_placeid: form.household_placeid || null, // 可选
    movein_date: form.movein_date || null,             // 可选
    movein_country: form.movein_country || null,       // 可选
    status: Number(form.status)          // int，必填
  }

  try {
    // === 2) 发送 PUT 请求 ===
    await axios.put('/people/move-out', payload)   // 如有代理请保持一致
    alert('户口迁出申请提交成功！')
  } catch (err) {
    console.error('提交失败：', err)
    alert('提交失败，请检查输入内容')
  }
}
</script>


<style scoped>
.move-out-page {
  padding: 60px 20px;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px 50px;
  border-radius: 20px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
}

h2 {
  text-align: center;
  font-size: 26px;
  margin-bottom: 35px;
  color: #333;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px 40px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

input[type='text'],
input[type='date'],
input[type='number'],
select {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 15px;
  width: 100%;
  transition: border-color 0.3s;
  background-color: #fff;
}

input:focus,
select:focus {
  border-color: #4aa9e9;
  box-shadow: 0 0 5px rgba(74, 169, 233, 0.4);
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  background: linear-gradient(to right, #2193b0, #6dd5ed);
  color: white;
  font-size: 16px;
  padding: 12px 36px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(33, 147, 176, 0.3);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(33, 147, 176, 0.4);
}
</style>
