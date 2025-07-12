<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2 class="title">公安管理系统</h2>

      <nav>
        <router-link to="/admin/create" exact-active-class="active">
          <span class="icon">➕</span> 创建账号
        </router-link>
        
        <router-link to="/admin/search" exact-active-class="active">
          <span class="icon">🔍</span> 账号查询
        </router-link>

        <router-link to="/admin/delete" exact-active-class="active">
          <span class="icon">🗑️</span> 删除账号
        </router-link>
       
        <router-link to="/admin/review" exact-active-class="active">
          <span class="icon">📝</span> 信息审核
        </router-link>
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
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #eef2f7;
  font-family: 'Segoe UI', sans-serif;
}

.sidebar {
  width: 240px;
  background-color: #1e3a5f;
  color: white;
  padding: 30px 20px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar a {
  display: flex;
  align-items: center;
  padding: 12px 18px;
  border-radius: 8px;
  text-decoration: none;
  color: #e0e6f1;
  font-size: 16px;
  transition: background 0.2s, color 0.2s;
}

.sidebar a:hover {
  background-color: #2a4d75;
  color: #ffffff;
}

.sidebar a.active {
  background-color: #ffffff;
  color: #1e3a5f;
  font-weight: bold;
}

.icon {
  margin-right: 10px;
  font-size: 17px;
  display: inline-block;
  width: 20px;
  text-align: center;
}

.content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: #f9fbfe;
}
</style>
