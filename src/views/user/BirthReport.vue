<template>
  <div class="birth-report-page">
    <div class="form-card">
      <h2>出生申报</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-row" v-for="(item, key) in fields" :key="key">
            <label :for="key">{{ item.label }}：</label>
            <template v-if="item.type === 'select'">
              <select v-model="form[key]" required>
                <option value="">请选择</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </template>
            <template v-else>
              <input
                :type="item.type"
                v-model="form[key]"
                :maxlength="item.max"
                required
              />
            </template>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn">出生申请</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  certificateNumber: '',
  babyName: '',
  gender: '',
  birthDate: '',
  motherName: '',
  fatherName: '',
  motherId: '',
  fatherId: '',
  motherNation: '',
  fatherNation: '',
  motherEthnicity: '',
  fatherEthnicity: ''
})

// 用于生成表单字段信息
const fields = {
  certificateNumber: { label: '出生医学证明编号', type: 'text', max: 10 },
  babyName: { label: '新生儿姓名', type: 'text', max: 30 },
  gender: { label: '性别', type: 'select' },
  birthDate: { label: '出生时间', type: 'date' },
  motherName: { label: '母亲姓名', type: 'text', max: 30 },
  fatherName: { label: '父亲姓名', type: 'text', max: 30 },
  motherId: { label: '母亲身份证号', type: 'text', max: 18 },
  fatherId: { label: '父亲身份证号', type: 'text', max: 18 },
  motherNation: { label: '母亲国籍', type: 'text', max: 3 },
  fatherNation: { label: '父亲国籍', type: 'text', max: 3 },
  motherEthnicity: { label: '母亲民族（数字）', type: 'text', max: 11 },
  fatherEthnicity: { label: '父亲民族（数字）', type: 'text', max: 11 }
}

const handleSubmit = async () => {
  try {
    const payload = {
      birth_certificate: form.certificateNumber,
      baby_name: form.babyName,
      baby_sex: form.gender === '男' ? 1 : 0,
      mother_name: form.motherName,
      mother_id_card: form.motherId,
      father_name: form.fatherName,
      father_id_card: form.fatherId,
      mother_nationality: form.motherNation,
      father_nationality: form.fatherNation,
      mother_nation: parseInt(form.motherEthnicity),
      father_nation: parseInt(form.fatherEthnicity)
    }

    await axios.post('/people/birth', payload)
    alert('出生申报提交成功')
  } catch (err) {
    alert('提交失败，请检查输入内容')
    console.error(err)
  }
}
</script>

<style scoped>
.birth-report-page {
  padding: 40px;
  background: linear-gradient(to right, #e6f0ff, #f4fcff);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.form-card {
  background: white;
  padding: 40px 50px;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
}

h2 {
  text-align: center;
  margin-bottom: 35px;
  color: #333;
  font-size: 26px;
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  border-color: #4aa9e9;
  box-shadow: 0 0 5px rgba(74, 169, 233, 0.5);
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  background-color: #2193b0;
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
  background-color: #19769c;
}
</style>
