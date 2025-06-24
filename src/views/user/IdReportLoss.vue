<template>
  <div class="report-loss-container">
    <div class="tab-selector">
      <button :class="{ active: method === 1 }" @click="method = 1">方式一：通过身份证号码挂失</button>
      <button :class="{ active: method === 2 }" @click="method = 2">方式二：通过身份信息查找挂失</button>
    </div>

    <div class="form-card">
      <h2>{{ method === 1 ? '身份证号码挂失' : '身份信息查找挂失' }}</h2>

      <!-- 方式一 -->
      <form v-if="method === 1" @submit.prevent="handleLossById">
        <div class="form-row">
          <label>身份证号码</label>
          <input v-model="lossForm.identity_card" type="text" maxlength="18" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn primary">提交挂失</button>
        </div>
      </form>

      <!-- 方式二 -->
      <form v-else @submit.prevent="search">
        <div class="form-grid">
          <div class="form-row">
            <label>姓名</label>
            <input v-model="queryForm.name" type="text" placeholder="可选" />
          </div>
          <div class="form-row">
            <label>出生日期</label>
            <input v-model="queryForm.birthdate" type="date" />
          </div>
          <div class="form-row">
            <label>性别</label>
            <select v-model="queryForm.sex">
              <option value="">请选择</option>
              <option value="1">男</option>
              <option value="0">女</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn primary">查找身份证信息</button>
        </div>
      </form>

      <!-- 查询结果 -->
      <div v-if="results.length" class="result-card">
        <h3>查找结果</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>身份证号</th>
                <th>性别</th>
                <th>生日</th>
                <th>住址</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in results" :key="item.idcard_id">
                <td>{{ item.name }}</td>
                <td>{{ item.identity_card }}</td>
                <td>{{ item.sex === 1 ? '男' : '女' }}</td>
                <td>{{ item.birthdate }}</td>
                <td>{{ item.residential_address }}</td>
                <td>{{ formatStatus(item.status) }}</td>
                <td>
                  <button class="btn small danger" @click="reportLoss(item.identity_card)">挂失</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const method = ref(1)

const lossForm = reactive({
  identity_card: ''
})

const queryForm = reactive({
  name: '',
  birthdate: '',
  sex: ''
})

const results = ref([])

const handleLossById = async () => {
  if (!lossForm.identity_card) {
    alert('请输入身份证号码')
    return
  }

  try {
    await axios.put('/people/idcard', { identity_card: lossForm.identity_card })
    alert('挂失成功！')
  } catch (e) {
    alert('挂失失败，请稍后重试')
    console.error(e)
  }
}

const search = async () => {
  try {
    const response = await axios.get('/people/idcard/search', {
      params: queryForm
    })
    results.value = response.data.data || []
  } catch (e) {
    alert('查询失败，请稍后重试')
    console.error(e)
  }
}

const reportLoss = async (identity_card) => {
  try {
    await axios.put('/people/idcard', { identity_card })
    alert('挂失成功！')
  } catch (e) {
    alert('挂失失败，请稍后重试')
    console.error(e)
  }
}

const formatStatus = (status) => {
  const map = {
    VALID: '有效',
    LOST: '已挂失',
    OUTDATED: '已过期',
    PENDING: '等待激活'
  }
  return map[status] || status
}
</script>

<style scoped>
.report-loss-container {
  padding: 40px;
  background: #eef2f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.tab-selector {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.tab-selector button {
  padding: 10px 20px;
  border: none;
  background-color: #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 15px;
}

.tab-selector button.active {
  background-color: #2b7abf;
  color: white;
}

.form-card {
  background: white;
  padding: 35px 40px;
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 860px;
}

h2, h3 {
  color: #2b7abf;
  text-align: center;
  margin-bottom: 25px;
}

.form-row {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

input, select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}

.btn {
  background-color: #2b7abf;
  color: white;
  padding: 10px 28px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background-color: #1f6496;
}

.btn.small {
  padding: 6px 14px;
  font-size: 13px;
  margin: 2px;
}

.btn.danger {
  background-color: #d9534f;
}

.result-card {
  margin-top: 35px;
}

.table-wrapper {
  overflow-x: auto;
}

.result-card table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.result-card th, .result-card td {
  border: 1px solid #ddd;
  padding: 12px 10px;
  text-align: center;
  font-size: 14px;
}

.result-card th {
  background-color: #f5f7fa;
  font-weight: 600;
}
</style>
