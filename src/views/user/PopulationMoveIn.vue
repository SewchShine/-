<template>
  <div class="move-in-page">
    <div class="form-card">
      <h2>户口迁入申请</h2>

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
            <select v-model.number="form.sex" required>
              <option value="">请选择</option>
              <option :value="1">男</option>
              <option :value="0">女</option>
            </select>
          </div>

          <div class="form-row">
            <label>民族（数字）：</label>
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
            <input v-model="form.moveout_date" type="date" />
          </div>

          <div class="form-row">
            <label>迁出注销类别（可选）：</label>
            <input v-model="form.moveout_type" maxlength="30" />
          </div>

          <div class="form-row">
            <label>迁往国家/地区（三字代码，可选）：</label>
            <input v-model="form.moveout_country" maxlength="3" />
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
          <button type="submit" class="btn">提交迁入申请</button>
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
  sex: '',
  nation: '',
  birthdate: '',
  birthplace: '',
  nationality: '',
  native_of: '',
  household_name: '',
  household_placeid: '',
  moveout_date: '',
  moveout_type: '',
  moveout_country: '',
  status: ''
})

const handleSubmit = async () => {
  try {
    const payload = {
      identity_card: form.identity_card,
      name: form.name,
      sex: Number(form.sex),           // 整数
      nation: Number(form.nation),     // 整数
      birthdate: form.birthdate,
      birthplace: form.birthplace,
      nationality: form.nationality,
      native_of: form.native_of,
      household_name: form.household_name,
      household_placeid: form.household_placeid || null,  // 可选
      moveout_date: form.moveout_date || null,            // 可选
      moveout_type: form.moveout_type || null,            // 可选
      moveout_country: form.moveout_country || null,      // 可选
      status: form.status === '' ? null : Number(form.status)  // 可选整数
    }

    await axios.put('/people/move-in', payload)
    alert('户口迁入申请提交成功！')
  } catch (error) {
    console.error('提交失败：', error)
    alert('提交失败，请检查输入内容')
  }
}

</script>

<style scoped>
.move-in-page {
  padding: 60px 20px;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 40px 50px;
  border-radius: 20px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 960px;
}

h2 {
  text-align: center;
  margin-bottom: 35px;
  font-size: 26px;
  font-weight: bold;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  transition: all 0.3s;
  background-color: #fff;
}

input:focus,
select:focus {
  border-color: #4aa9e9;
  box-shadow: 0 0 6px rgba(74, 169, 233, 0.5);
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
  padding: 12px 40px;
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
