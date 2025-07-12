<template>
  <div class="birth-report-page">
    <div class="form-card">
      <h2>出生申报信息登记</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-row" v-for="(item, key) in fields" :key="key">
            <label :for="key">{{ item.label }}</label>
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
          <button type="submit" class="btn">提交出生申报</button>
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

const fields = {
  certificateNumber: { label: '出生医学证明编号', type: 'text', max: 10 },
  babyName: { label: '新生儿姓名', type: 'text', max: 30 },
  gender: { label: '性别', type: 'select' },
  birthDate: { label: '出生日期', type: 'date' },
  motherName: { label: '母亲姓名', type: 'text', max: 30 },
  fatherName: { label: '父亲姓名', type: 'text', max: 30 },
  motherId: { label: '母亲身份证号', type: 'text', max: 18 },
  fatherId: { label: '父亲身份证号', type: 'text', max: 18 },
  motherNation: { label: '母亲国籍', type: 'text', max: 3 },
  fatherNation: { label: '父亲国籍', type: 'text', max: 3 },
  motherEthnicity: { label: '母亲民族代码', type: 'text', max: 11 },
  fatherEthnicity: { label: '父亲民族代码', type: 'text', max: 11 }
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
  padding: 50px 30px;
  background-color: #f3f6fb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.form-card {
  background: #ffffff;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 960px;
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #1e3a5f;
  font-weight: bold;
  margin-bottom: 40px;
  border-bottom: 2px solid #e0e6ef;
  padding-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 40px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

input[type='text'],
input[type='date'],
select {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #cfd9e4;
  font-size: 15px;
  width: 100%;
  transition: border 0.3s, box-shadow 0.3s;
  background-color: #fdfdfd;
}

input:focus,
select:focus {
  border-color: #2b7abf;
  box-shadow: 0 0 5px rgba(43, 122, 191, 0.4);
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}

.btn {
  background-color: #2b7abf;
  color: white;
  font-size: 16px;
  padding: 12px 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn:hover {
  background-color: #1e5e91;
}
</style>
