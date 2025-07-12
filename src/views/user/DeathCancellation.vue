<template>
  <div class="death-page">
    <div class="form-card">
      <h2>死亡注销申请</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-row">
            <label>死亡证明编号</label>
            <input v-model.number="form.death_id" type="number" placeholder="请输入编号" required />
          </div>
          <div class="form-row">
            <label>公民身份证号码</label>
            <input v-model="form.identity_card" type="text" maxlength="18" placeholder="请输入身份证号" required />
          </div>
          <div class="form-row">
            <label>姓名</label>
            <input v-model="form.person_name" type="text" maxlength="30" placeholder="请输入姓名" required />
          </div>
          <div class="form-row">
            <label>性别</label>
            <select v-model.number="form.sex" required>
              <option value="">请选择</option>
              <option :value="1">男</option>
              <option :value="0">女</option>
            </select>
          </div>
          <div class="form-row">
            <label>死亡日期</label>
            <input v-model="form.death_date" type="date" required />
          </div>
          <div class="form-row">
            <label>国籍（三字代码）</label>
            <input v-model="form.nationality" type="text" maxlength="3" placeholder="如 CHN" required />
          </div>
          <div class="form-row">
            <label>火化时间（可选）</label>
            <input v-model="form.crematory_time" type="date" />
          </div>
          <div class="form-row">
            <label>殡仪馆名称（可选）</label>
            <input v-model="form.crematory_name" type="text" maxlength="30" placeholder="请输入殡仪馆名称" />
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn">提交注销</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  death_id: '',
  identity_card: '',
  person_name: '',
  sex: '',
  death_date: '',
  nationality: '',
  crematory_time: '',
  crematory_name: ''
})

const handleSubmit = async () => {
  try {
    const payload = {
      death_id: Number(form.death_id),
      identity_card: form.identity_card,
      person_name: form.person_name,
      sex: Number(form.sex),
      death_date: form.death_date,
      nationality: form.nationality,
      crematory_time: form.crematory_time || null,
      crematory_name: form.crematory_name || null
    }
    await axios.post('/people/death', payload)
    alert('死亡注销信息提交成功！')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请检查输入内容')
  }
}
</script>

<style scoped>
.death-page {
  padding: 60px 20px;
  background: #f9fafa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form-card {
  background: #ffffff;
  padding: 40px 50px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 880px;
}

h2 {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #b52b27;
  margin-bottom: 35px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px 40px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 15px;
}

input,
select {
  padding: 11px 14px;
  border: 1px solid #cfd4dc;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s ease;
  background-color: #fefefe;
}

input:focus,
select:focus {
  border-color: #b52b27;
  box-shadow: 0 0 4px rgba(181, 43, 39, 0.3);
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  background-color: #b52b27;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 36px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.btn:hover {
  background-color: #961f1c;
}
</style>
