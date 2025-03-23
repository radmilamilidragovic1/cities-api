<template>
    <div id="dropdown-menu">
      <nav id="nav1">
        <div id="cool">
          <a id="cool">GRADOVI</a>
        </div>
        <div class="navbar-links">
  
          <router-link class="nav-icon" to="/" title="Naslovnica">
            <img src="@/images/30.jpg" alt="Naslovnica" />
          </router-link>
          <router-link class="nav-icon" to="/AuthBlog" title="Blog">
            <img src="@/images/globe.png" alt="Blog" />
          </router-link>
          <router-link class="nav-icon" to="/AuthDestinacije" title="Destinacije">
            <img src="@/images/32.jpg" alt="Gradovi" />
          </router-link>
  
          <template v-if="!userStore.isLoggedIn">
            <router-link class="nav-icon" to="/auth" title="Login">
              <img src="@/images/" alt="Login" />
            </router-link>
          </template>
          <template v-else>
            <button @click="logout" class="nav-icon" title="Logout">
              <img src="@/images/38.jpg" alt="Logout" />
            </button>
          </template>
        </div>
      </nav>
    </div>
  </template>

  
  <script setup>
  import { useUserStore } from '@/stores/counter.js';
  import { useRouter } from 'vue-router';
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const logout = () => {
    userStore.logout();
    router.push('/');
  };
  </script>
  
  <style scoped>
  nav {
    display: flex;
    font-family: Poppins, Serif;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #1eff00;
    position: fixed;
    top: 0;
    left: 0;    right: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    height: 75px;
    border-bottom: rgb(55, 50, 50);
  }
  #cool {
    display: flex;
    flex-direction: row;
    font-size: 50px;
    font-weight: bold;
    color: rgb(34, 178, 116);
    margin-right: 30px;
  }
  .navbar-links {
    display: flex;
    gap: 30px;
  }
  .nav-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    transition: transform 0.2s ease-in-out;
  }
  .nav-icon img {
    width: 100%;
    height: 100%;
  }
  .nav-icon:hover {
    transform: scale(1.1);
  }
  
  .nav-icon:hover img {
    filter: brightness(1.2);
  }
  @media (max-width: 768px) {
    nav {
      padding: 10px 20px;
    }
    .navbar-links {
      display: none;
      flex-direction: column;
      width: 100%;
    }
    .navbar-links a {
      text-align: center;
      padding: 10px;
      width: 100%;
      background-color: #2fff00;
      color: white;
    }
    .navbar-links a:hover {
      background-color: #00ff11;
    }
    nav.open .navbar-links {
      display: flex;
    }
  }
  </style>