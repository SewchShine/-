<template>
  <div class="user-layout">
    <aside class="sidebar">
      <h2 class="title">公安人口信息系统</h2>

      <nav>
        <p class="group-title">户籍管理</p>
        <router-link to="/user/household/search" exact-active-class="active">综合查询</router-link>

        <p class="group-title">常住人口管理</p>
        <router-link to="/user/population/birth-report" exact-active-class="active">出生申报</router-link>
        <router-link to="/user/population/in" exact-active-class="active">户口迁入</router-link>
        <router-link to="/user/population/out" exact-active-class="active">户口迁出</router-link>
        <router-link to="/user/population/death" exact-active-class="active">死亡注销</router-link>

        <p class="group-title">身份证件管理</p>
        <router-link to="/user/id/under16" exact-active-class="active">未满16岁身份证办理</router-link>
        <router-link to="/user/id/apply" exact-active-class="active">身份证申领</router-link>
        <router-link to="/user/id/loss" exact-active-class="active">身份证挂失</router-link>
      </nav>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>
  
  <script setup>
  </script>
  
  <style scoped>
.user-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
  font-family: "Microsoft YaHei", sans-serif;
}

.sidebar {
  width: 240px;
  background-color: #1f3a93; /* 深蓝 */
  color: #ffffff;
  padding: 24px 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

.title {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.group-title {
  font-weight: bold;
  margin: 22px 0 8px;
  font-size: 20px;
  color: #a9c0e4;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 4px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar a {
  display: block;
  padding: 10px 14px;
  border-radius: 4px;
  text-decoration: none;
  color: #e6ecf5;
  font-size: 14px;
  transition: background-color 0.2s;
}

.sidebar a:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.sidebar a.active {
  background-color: #ffffff;
  color: #1f3a93;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 40px 50px;
  overflow-y: auto;
  background-color: #ffffff;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.03);
}
</style>