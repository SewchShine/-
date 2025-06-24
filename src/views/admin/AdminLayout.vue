<template>
    <div class="admin-layout">
      <aside class="sidebar">
        <h2 class="title">管理员中心</h2>
  
        <nav>
          <router-link to="/admin/create" exact-active-class="active">
            <span class="icon">🆕</span> 创建账号
          </router-link>
          <router-link to="/admin/delete" exact-active-class="active">
            <span class="icon">🗑️</span> 删除账号
          </router-link>
          <router-link to="/admin/search" exact-active-class="active">
            <span class="icon">🔍</span> 账号查询
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
    background-color: #f4f7fb;
  }
  
  .sidebar {
    width: 220px;
    background: linear-gradient(to bottom, #2193b0, #6dd5ed);
    color: white;
    padding: 20px;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
  
  nav {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .sidebar a {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    border-radius: 10px;
    text-decoration: none;
    color: white;
    font-size: 15px;
    transition: background 0.3s;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .sidebar a:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .sidebar a.active {
    background-color: white;
    color: #2193b0;
    font-weight: bold;
  }
  
  .icon {
    margin-right: 8px;
    font-size: 16px;
  }
  
  .content {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
  }
  </style>
  