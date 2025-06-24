<template>
  <div class="death-page">
    <div class="form-card">
      <h2>死亡注销</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <label>死亡证明编号：</label>
          <input v-model.number="form.death_id" type="number" required />
        </div>

        <div class="form-row">
          <label>公民身份证号码：</label>
          <input v-model="form.identity_card" maxlength="18" required />
        </div>

        <div class="form-row">
          <label>姓名：</label>
          <input v-model="form.person_name" maxlength="30" required />
        </div>

        <div class="form-row">
          <label>性别：</label>
          <select v-model.number="form.sex" required>
            <option value="">请选择</option>
            <option :value="1">男</option>
            <option :value="0">女</option>
          </select>
        </div>

        <div class="form-row">
          <label>死亡日期：</label>
          <input v-model="form.death_date" type="date" required />
        </div>

        <div class="form-row">
          <label>国籍（三字代码）：</label>
          <input v-model="form.nationality" maxlength="3" required />
        </div>

        <div class="form-row">
          <label>火化时间（可选）：</label>
          <input v-model="form.crematory_time" type="date" />
        </div>

        <div class="form-row">
          <label>殡仪馆名称（可选）：</label>
          <input v-model="form.crematory_name" maxlength="30" />
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
  death_id: '',               // integer
  identity_card: '',          // string <= 18
  person_name: '',            // string <= 30
  sex: '',                    // integer
  death_date: '',             // string <date>
  nationality: '',            // string <= 3
  crematory_time: '',         // string <date> 可选
  crematory_name: ''          // string <= 30 可选
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

    await axios.post('/people/death', payload) // 路径按后端实际设置调整
    alert('死亡注销信息提交成功！')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请检查输入内容')
  }
}

</script>

<style scoped>
.death-page {
  padding: 40px;
  background: linear-gradient(to right, #f8d7da, #f5f5f5);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.form-card {
  background: white;
  padding: 40px 50px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
  color: #c9302c;
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

.form-row label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

input[type='text'],
input[type='number'],
input[type='date'],
select {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  width: 100%;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #c9302c;
  box-shadow: 0 0 5px rgba(201, 48, 44, 0.4);
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  background-color: #c9302c;
  color: white;
  font-size: 16px;
  padding: 12px 36px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #a72824;
}
</style>
