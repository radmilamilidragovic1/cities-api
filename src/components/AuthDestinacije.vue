<template>
    <div class="container">
      <div class="hero">
        <h1>Recepti</h1>
        <p>Ovdje ćete pronaći mnoštvo recepata za svaki okus i prigodu.</p>
        <input type="text" v-model="searchQuery" placeholder="Pretraži recepte..." class="search-bar" />
      </div>
  
      <div class="image-grid">
        <div v-for="(recipe, index) in filteredRecipes" :key="index" class="image-container">
          <router-link :to="`/recept/${recipe.index + 1}`">
            <img :src="recipe.image" alt="Recept Image" class="recipe-image" />
          </router-link>
          <div class="image-overlay">
            <p class="image-text">{{ recipe.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed } from 'vue';
import BUDVA from "@/images/1.jpg";
import Monako from "@/images/2.jpg";
import Bar from "@/images/3.jpg";
import Bari from "@/images/4.jpg";
import Split from "@/images/5.jpg";
import Dubrovnik from "@/images/6.jpg";
import Korcula from '@/images/7.jpg';
import Torino from '@/images/8.jpg';
import Paris from '@/images/9.jpg';
import Ulcinj from '@/images/10.jpg';
import kotor from '@/images/11.jpg';
import Maldivi from '@/images/12.jpg';
import Antalija from '@/images/13.jpg';
import Porec from '@/images/14.jpg';
import Rovinj from '@/images/15.jpg';
import Njujork from '@/images/16.jpg';
import Brisel from '@/images/17.jpg';
import Bec from '@/images/18.jpg';
import Prag from '@/images/19.jpg';
import Lisabon from "@/images/20.jpg";
import Bukurest from "@/images/21.jpg";
import Nica from "@/images/22.jpg";
import Ankara from "@/images/23.jpg";
import Rim from "@/images/24.jpg";
import Zagreb from "@/images/25.jpg";
import Kijev from "@/images/26.jpg";
import Moskva from "@/images/27.jpg";

const items = ref([
  { image: BUDVA, title: "Budva grad ljbavi" },
  { image: Monako, title: "Monako, grad luksuza" },
  { image: Bar, title: "Stari crnogorski grad" },
  { image: Bari, title: "Najveca luka Italije" },
  { image: Split, title: "Najljepse odmaraliste Hrvatske" },
  { image: Dubrovnik, title: "Stari grad u Hrvartskoj" },
  { image: Korcula, title: "Predivna oaza mira" },
  { image: Torino, title: "Stari Italijanski grad" },
  { image: Paris, title: "Grad svjetlosti" },
  { image: Ulcinj, title: "Predivne plaze Crne Gore" },
  { image: kotor, title: "Drevni grad Crne Gore" },
  { image: Maldivi, title: "Oaza mira" },
  { image: Antalija, title: "Crce Turske" },
  { image: Porec, title: "Gradic na obali mora" },
  { image: Rovinj, title: "Srce Hravtske" },
  { image: Njujork, title: "Grad iluzija" },
  { image: Brisel, title: "Grad cokolade" },
  { image: Bec, title: "Carska prestonica" },
  { image: Prag, title: "uneskov grad kuture"},
  { image: Lisabon, title: "grad cvjeca" },
  { image: Bukurest, title: "balkanski Paris " },
  { image: Nica, title: " turisticka atrakcija " },
  { image: Ankara, title: "grad umjetnosti i muzike" },
  { image: Rim, title: "istoriski grad" },
  { image:Zagreb, title: "grad zanimljive arhitekture " },
  { image: Kijev, title: "GRAD zelenila" },
  { image: Moskva, title: "Moskva, carsko grad Rusije" },
]);

const searchQuery = ref('');

const filteredRecipes = computed(() => {
  return recipes.filter(recipe =>
    recipe.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  color: #333;
  text-align: center;
  margin-top: 80px;
}
.hero h1 {
  font-size: 48px;
  font-weight: 700;
  color: #ff7f00;
  margin-bottom: 10px;
}
.hero p {
  font-size: 18px;
  color: black;
  margin-bottom: 20px;
}
.search-bar {
  background: #f9f9f9;
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 8px;
  outline: none;
  margin-bottom: 20px;
}
.search-bar:focus {
  border-color: orangered;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.image-container:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.recipe-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 16px;
}
.image-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(255, 127, 0, 0.7), transparent);
  padding: 10px 0;
  text-align: center;
}
.image-text {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}
</style>