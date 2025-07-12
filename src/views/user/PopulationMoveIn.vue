<template>
  <div class="move-in-page">
    <div class="form-card">
      <h2>户口迁入申请</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-row">
            <label>公民身份证号码：</label>
            <input type="text" v-model="form.identity_card" maxlength="18" required />
          </div>

          <div class="form-row">
            <label>姓名：</label>
            <input type="text" v-model="form.name" maxlength="30" required />
          </div>

          <div class="form-row">
            <label>性别：</label>
            <select v-model="form.sex" required>
              <option value="">请选择</option>
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
          </div>

          <div class="form-row">
            <label>出生日期：</label>
            <input type="date" v-model="form.birthdate" required />
          </div>

          <div class="form-row">
            <label>民族代码：</label>
            <input type="text" v-model="form.nation" maxlength="2" required />
          </div>

          <div class="form-row">
            <label>籍贯：</label>
            <input type="text" v-model="form.native_of" maxlength="50" required />
          </div>

          <div class="form-row">
            <label>出生地：</label>
            <input type="text" v-model="form.birthplace" maxlength="50" required />
          </div>

          <div class="form-row">
            <label>国籍代码：</label>
            <input type="text" v-model="form.nationality" maxlength="3" required />
          </div>

          <div class="form-row">
            <label>与户主关系：</label>
            <input type="text" v-model="form.household_name" maxlength="40" required />
          </div>

          <div class="form-row">
            <label>居住地名称：</label>
            <input type="text" v-model="form.household_placeid" maxlength="50" />
          </div>

          <div class="form-row">
            <label>户号（可选）：</label>
            <input type="text" v-model="form.household_id" maxlength="20" />
          </div>

          <div class="form-row">
            <label>何时迁来：</label>
            <input type="date" v-model="form.movein_date" required />
          </div>

          <div class="form-row">
            <label>何因迁来：</label>
            <input type="text" v-model="form.movein_reason" maxlength="50" required />
          </div>

          <div class="form-row">
            <label>何国家/地区来本地址：</label>
            <input type="text" v-model="form.movein_country" maxlength="3" required />
          </div>

          <div class="form-row">
            <label>何省市县(区)来本址：</label>
            <input type="text" v-model="form.movein_city" maxlength="50" required />
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
  birthdate: '',
  nation: '',
  native_of: '',
  birthplace: '',
  nationality: '',
  household_name: '',
  household_placeid: '',
  household_id: '',
  movein_date: '',
  movein_reason: '',
  movein_country: '',
  movein_city: ''
})

const handleSubmit = async () => {
  try {
    const payload = {
      ...form,
      household_id: form.household_id || ''  // 空字符串作为默认值
    }
    await axios.put('/people/move-in', payload)
    alert('户口迁入申请提交成功！')
  } catch (error) {
    console.error('提交失败：', error)
    alert('提交失败，请检查输入内容')
  }
}

const payload = {
  ...form,
  household_id: form.household_id || null  // 保证一定传值（可改成 '' 或 null）
}

</script>

<style scoped>
.move-in-page {
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