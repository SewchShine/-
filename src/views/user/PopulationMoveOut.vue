<template>
  <div class="move-out-page">
    <div class="form-card">
      <h2>户口迁出申请</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-row">
            <label>公民身份证号码：</label>
            <input v-model="form.identity_card" type="text" maxlength="18" required />
          </div>

          <div class="form-row">
            <label>姓名：</label>
            <input v-model="form.name" type="text" maxlength="30" required />
          </div>

          <div class="form-row">
            <label>户号：</label>
            <input v-model="form.household_id" type="text" maxlength="20" required />
          </div>

          <div class="form-row">
            <label>迁出日期（可选）：</label>
            <input v-model="form.moveout_date" type="date" />
          </div>

          <div class="form-row">
            <label>迁出注销类别（可选）：</label>
            <input v-model="form.moveout_type" type="text" maxlength="30" />
          </div>

          <div class="form-row">
            <label>迁往国家/地区（三字代码，可选）：</label>
            <input v-model="form.moveout_country" type="text" maxlength="3" />
          </div>

          <div class="form-row">
            <label>迁往地省市县(区)（可选）：</label>
            <input v-model="form.moveout_city" type="text" maxlength="9" />
          </div>

          <div class="form-row">
            <label>状态（可选）：</label>
            <select v-model="form.status">
  <option value="">请选择</option>
  <option :value="1">有效</option>
  <option :value="2">无效</option>
  <option :value="3">迁出中</option>
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
  household_id: '',
  moveout_date: '',
  moveout_type: '',
  moveout_country: '',
  moveout_city: '',
  status: ''
})

const handleSubmit = async () => {
  const payload = {
    identity_card: form.identity_card,
    name: form.name,
    household_id: form.household_id,
    moveout_date: form.moveout_date || null,
    moveout_type: form.moveout_type || null,
    moveout_country: form.moveout_country || null,
    moveout_city: form.moveout_city || null,
    status: form.status ? Number(form.status) : 1

  }

  try {
    await axios.put('/people/move-out', payload)
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
  background: linear-gradient(to right, #f8fbff, #f0f3f7);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form-card {
  background: #fff;
  padding: 40px 50px;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  width: 100%;
}

h2 {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #2b7abf;
  margin-bottom: 35px;
  border-bottom: 1px solid #e0e6ef;
  padding-bottom: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px 40px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
  font-size: 15px;
}

input,
select {
  padding: 12px 14px;
  border: 1px solid #cfd9e4;
  border-radius: 10px;
  font-size: 15px;
  background-color: #fdfdfd;
  transition: border 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus {
  border-color: #4aa9e9;
  box-shadow: 0 0 6px rgba(74, 169, 233, 0.4);
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  background-color: #2b7abf;
  color: white;
  font-size: 16px;
  padding: 12px 40px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1e5e91;
}
</style>
