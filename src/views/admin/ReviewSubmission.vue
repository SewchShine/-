<template>
    <div class="review-page">
      <div class="card">
        <h2>身份证件办理申请列表</h2>
  
        <div class="table-wrapper">
          <table class="result-table">
            <thead>
              <tr>
                <th>订单编号</th>
                <th>省</th>
                <th>市</th>
                <th>区/县</th>
                <th>公安局名称</th>
                <th>订单类型</th>
                <th>申请时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in orders" :key="order.orderId">
                <td>{{ order.orderId }}</td>
                <td>{{ order.province }}</td>
                <td>{{ order.city }}</td>
                <td>{{ order.county }}</td>
                <td>{{ order.unit }}</td>
                <td>{{ order.orderType }}</td>
                <td>{{ order.applyTime }}</td>
                <td><button class="btn primary" @click="openDetail(index)">查看详情</button></td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- 今日业务统计 -->
        <div class="summary">
          <h3>今日业务总结</h3>
          <div class="summary-item">
            <h4>正常申请</h4>
            <p>已审核：{{ stats.normal.reviewed }}</p>
            <p>等待中：{{ stats.normal.pending }}</p>
          </div>
        </div>
      </div>
  
      <!-- 详情弹窗 -->
      <div v-if="showDetail" class="dialog-overlay" @click.self="closeDetail">
        <div class="detail-modal">
          <h3>订单详情 - {{ selectedOrder.orderId }}</h3>
          <ul>
            <li><strong>省/市/县：</strong>{{ selectedOrder.province }} / {{ selectedOrder.city }} / {{ selectedOrder.county }}</li>
            <li><strong>公安局名称：</strong>{{ selectedOrder.unit }}</li>
            <li><strong>订单类型：</strong>{{ selectedOrder.orderType }}</li>
            <li><strong>申请时间：</strong>{{ selectedOrder.applyTime }}</li>
            <li><strong>申请人姓名：</strong>{{ selectedOrder.applicant }}</li>
            <li><strong>身份证号码：</strong>{{ selectedOrder.idNumber }}</li>
            <li><strong>联系方式：</strong>{{ selectedOrder.contact }}</li>
            <li><strong>备注：</strong>{{ selectedOrder.remark }}</li>
          </ul>
          <button class="btn" @click="closeDetail">关闭</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const orders = ref([
    {
      orderId: 'ORD202506200001',
      province: '浙江',
      city: '杭州',
      county: '西湖区',
      unit: '杭州市公安局',
      orderType: '正常',
      applyTime: '2025-06-20 08:30',
      applicant: '张三',
      idNumber: '330106198001011234',
      contact: '13800001111',
      remark: '无',
      status: '已审核'
    },
    {
      orderId: 'ORD202506200002',
      province: '浙江',
      city: '杭州',
      county: '滨江区',
      unit: '杭州市公安局',
      orderType: '加急',
      applyTime: '2025-06-20 09:15',
      applicant: '李四',
      idNumber: '330106198502027654',
      contact: '13900002222',
      remark: '紧急办理',
      status: '等待中'
    },
    {
      orderId: 'ORD202506200003',
      province: '江苏',
      city: '南京',
      county: '鼓楼区',
      unit: '南京市公安局',
      orderType: '正常',
      applyTime: '2025-06-20 10:00',
      applicant: '王五',
      idNumber: '320106197903045678',
      contact: '13700003333',
      remark: '首次申领',
      status: '等待中'
    }
  ])
  
  const stats = ref({
    normal: { reviewed: 1, pending: 1 },
    express: { reviewed: 0, pending: 1 }
  })
  
  const showDetail = ref(false)
  const selectedOrder = ref({})
  
  const openDetail = (index) => {
    selectedOrder.value = orders.value[index]
    showDetail.value = true
  }
  
  const closeDetail = () => {
    showDetail.value = false
  }
  </script>
  
  <style scoped>
  .review-page {
    min-height: 100vh;
    background: linear-gradient(to right, #e6f0ff, #f4fcff);
    padding: 50px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .card {
    width: 100%;
    max-width: 1100px;
    background: white;
    border-radius: 18px;
    padding: 30px 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #222;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  .result-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 30px;
  }
  
  .result-table th,
  .result-table td {
    padding: 14px 12px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
  }
  
  .result-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .btn {
    cursor: pointer;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .btn.primary {
    background-color: #2193b0;
    color: white;
  }
  
  .btn.primary:hover {
    background-color: #19769c;
  }
  
  .summary {
    display: flex;
    justify-content: center;
    gap: 60px;
    border-top: 1px solid #ddd;
    padding-top: 25px;
    color: #333;
    font-weight: 600;
  }
  
  .summary-item h4 {
    margin-bottom: 10px;
    color: #444;
  }
  
  .summary-item p {
    margin: 6px 0;
  }
  
  /* 详情弹窗 */
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }
  
  .detail-modal {
    background: #fff;
    border-radius: 14px;
    padding: 30px 35px;
    width: 450px;
    max-width: 95vw;
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    color: #222;
  }
  
  .detail-modal h3 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .detail-modal ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
  }
  
  .detail-modal ul li {
    margin-bottom: 10px;
    font-size: 15px;
  }
  
  .detail-modal button {
    display: block;
    margin: 0 auto;
    background-color: #2193b0;
    color: white;
    padding: 8px 30px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }
  
  .detail-modal button:hover {
    background-color: #19769c;
  }
  </style>
  