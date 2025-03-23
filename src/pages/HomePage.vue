<template>
  <div class="container">
    <header class="header">
      <h1 class="naslov">POKRENI SE NA PUTOVANJE IZ SNOVA!</h1>
      <div class="prijava">
        <p v-if="isLoggedIn" class="welcome">Dobrodošli na najljepse destinacije svjeta! {{ userName }}!</p>

        <button v-if="isLoggedIn" @click="handleLogout" class="logout-button">ODJAVA</button>

        <router-link v-else to="/auth" class="login-button">PRIJAVA</router-link>
      </div>
    </header>

    <div class="content">
      <div class="left-section">
        <h2>KOMENTARI</h2>

        <div class="review-section">
          <h2>Ostavite komentar </h2>
          <textarea v-model="comment" placeholder="Napišite komentar..." class="comment-box"></textarea>

          <div class="rating">
            <span
              v-for="star in 5"
              :key="star"
              @click="rating = star"
              :class="{ 'selected': star <= rating }"
            >&#9733;</span>
          </div>

          <button @click="submitReview">Pošalji</button>
          <p v-if="submitted" class="thank-you">Hvala na posjeti!</p>
        </div>

        <div class="comment-list">
          <h3>Najnoviji komentari</h3>
          <div v-for="(rev, index) in reviews" :key="index" class="comment">
            <strong>{{ rev.user }}</strong> - {{ rev.rating }}★
            <p>{{ rev.text }}</p>
            <small>{{ rev.timestamp }}</small>
          </div>
        </div>

        <h2>GALERIJA SLIKA</h2>
        <div class="image-grid">
          <img v-for="(item, index) in items" :key="index" :src="item.image" alt="Slika" class="small-image" />
        </div>
      </div>

      <div class="right-section">
        <h2>GRADOVI</h2>
        <div class="main-image-container">
          <transition name="fade" mode="out-in">
            <img v-if="items.length > 0 && items[currentIndex]" :src="items[currentIndex].image" alt="Glavna slika" class="main-image" />
          </transition>
          <p class="gradovi-title">{{ items[currentIndex].title }}</p>
        </div>
        <h2>DESTINACIJE</h2>
        <div class="gradovi-card">
          <img :src="Paris.image" alt="Monako" class="gradovi-image" />
          <h3>{{ Paris.title }}</h3>
          <p class="gradovi-description">{{ Paris.description }}</p>

          <div class="gradovi-section">
            <div class="gradovi-box">
              <h3>Znamenitosti gradova</h3>
              <ul>
                <li  style="list-style: none;" v-for="(znamenitosti, index) in monako.znamenitosti" :key="index">{{ znamenitosti }}</li>
              </ul>
            </div>

            <div class="gradovi-box">
              <h3>o gradu</h3>
              <ol>
                <li v-for="(step, index) in monako.steps" :key="index">{{ step }}</li>
              </ol>
            </div>
          </div>
          <img :src="Monako.image" alt="Monako" class="gradovi-image" />
          <h3>{{ Monako.title }}</h3>
          <p class="gradovi-description">{{ Monako.description }}</p>
          <div class="gradovi-section">
            <div class="gradovi-box">
              <h3>lokacija</h3>
              <ul>
                <li  style="list-style: none;" v-for="(znamenitosti, index) in Monako.znamenitosti" :key="index">{{ znamenitosti }}</li>
              </ul>
            </div>

            <div class="gradovi-box">
              <h3>znamenitosti</h3>
              <ol>
                <li v-for="(znamenitosti, index) in monako.znamenitosti" :key="index">{{ znamenitosti }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { defineEmits } from 'vue';
import { useRouter } from "vue-router";

defineEmits(['submit']);
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

const currentIndex = ref(0);
const router = useRouter();
let interval = null;

const userName = ref(localStorage.getItem("userName") || "Korisnik");
const isLoggedIn = ref(!!localStorage.getItem("userName"));
const comment = ref("");
const rating = ref(0);
const submitted = ref(false);
const reviews = ref([]);

const handleLogout = () => {
  localStorage.removeItem("userName");
  isLoggedIn.value = false;
  userName.value = "Korisnik";
  router.push("/auth");
};

onMounted(() => {
  if (items.value.length > 0) {
    interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % items.value.length;
    }, 3000);
  }
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});

const submitReview = () => {
  if (comment.value.trim() && rating.value > 0) {
    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toLocaleString();

    reviews.value.unshift({
      user: userName.value,
      text: comment.value,
      rating: rating.value,
      timestamp: formattedDate,
    });

    submitted.value = true;
    setTimeout(() => (submitted.value = false), 3000);
    comment.value = "";
    rating.value = 0;
  }
};
const Paris = ref({
  title: "Paris",
  description: "Pariz  je glavni i najveći grad Francuske.Francuska",
  country: "Francuska",
   settledYear: 215,
   consolidatedYear: 1004,
   population: 	12405426,
  zipCode: 	75001,


 Znamenitosti: [
  "Pariz je smješten na luku rijeke Seine i sadrži dva otoka ",
    " koji tvore nastariji dio grada.",
     " Ukupno, grad je relativno ravničarski, i najniža elevacija je 35 m",
       "nadmorske visine. Pariz ima nekoliko istaknutih brda",
       "od kojih je sa 130 metara najviši Montmartre",
 
"Bazilika Svetog Srca jedna je od najupečatljivijih pariških znamenitosti, a osim bajkovite arhitekture znamenita je i po predivnom pogledu koji se s njene kupole pruža na ostatak Pariza.",

"Dvorac Versailles jedna je od najznačajnijih i najposjećenijih znamenitosti u Francuskoj, a cijeli je kraljevski kompleks godinama služio kao uzor sličnim projektima europskih aristokrata.",

"Eiffelov toranj najpoznatija je pariška ikona. Ovaj željezni toranj izgrađen je u neposrednoj blizini rijeke Seine na Champ de Mars. Od otvorenja 1889. godine posjetilo ga je više od 235 milijuna ljudi, što ga čini najposjećenijim spomenikom na svijetu za koji se plaća ulaz!",

"Elizejske poljane su najprestižnija avenija u Parizu, a Francuzi vole reći i da je najljepša na svijetu. Proteže se na dva kilometra, sve od Place de la Concorde do Place Charles de Gaulle.",

"Notre Dame de Paris najpoznatija je katedrala u gradu. Izgrađena u gotičkom stilu na Île de la Cité, sjedište je pariškog nadbiskupa. Ime joj znači 'Naša Gospa'.",

"Louvre je jedan od najposjećenijih muzeja na svijetu, ujedno smješten u jednom od pariških povijesnih spomenika, Palais du Louvre, smještenom na desnoj obali Seine.",

"Luksemburški vrt jedna je od najljepših zelenih oaza u Parizu, nastala po uzoru na Palazzo Pitti i vrtove Boboli u Firenci.",

"Muzej smješten na prostoru nekadašnjeg željezničkog kolodvora danas je jedan od najposjećenijih muzeja u Francuskoj, čija kolekcija obuhvaća radove mnogih slavnih umjetnika.",

"Slavoluk pobjede je spomenik smješten na zapadnom kraju Elizejskih poljana, u središnjem dijelu Trga Charles de Gaulle. Simbolizira sve koji su poginuli za Francusku, a posebno one poginule tijekom Napoleonskih ratova. Unutar spomenika nalaze se stotine imena stradalih, ispod je grobnica neznanom vojniku iz 1. svjetskog rata, a ispred spomenika vječni plamen.",


  ]
});
const Monako = ref({
  
name: "Monako ",
description: "grad-država monarhijskog političkog uređenja, smještena na obali Sredozemnog mora.Država je dobila ime po obližnjoj grčkoj koloniji Monoikos",
country: "Knezevina Monako",
settledYear: 515,
consolidatedYear: 2004,
population: 16663,
zipCode: 300370,


Znamenitosti: [
"Monegaška katedrala",
"Nedaleko od Muzeja je i katedrala Bezgrješnog začeća, sagrađena u 19. stoljeću na mjestu crkve sv. Nikole, koja je pak sagrađena još u 13. stoljeću. U Katedrali je pokopana princeza Grace, kao i prijašnji prinčevi Monaka.",

"Oceanografski muzej",
"U Monaco Villeu nalazi se i poznati Muzej oceanografije (Musée Océanographique), predivna zgrada koja se goropadno izdiže iz stijene nad morem te očarava na prvi pogled! Izgradio ga je princ Albert I., veliki ljubitelj morskih dubina, a većina izložaka vezana je baš uz prinčeve ekspedicije. Tako se u muzeju mogu vidjeti ostatci brojnih morskih organizama, modeli Albertovih istraživačkih brodova, kao i neke od prvih podmornica itd.",


"Prinčeva palača (Palais de Monaco), jedna je od rijetkih vladarskih palača koja nije mijenjala svoju funkciju tijekom stoljeća, nego se i danas koristi kao dom obitelji Grimaldi, a to je i jedna od rijetkih palača takve vrste koja je utvrđena. Je li prinčeva obitelj prisutna u Palači možete utvrditi po zastavi, koja je u njihovoj odsutnosti spuštena.",

]

});

</script>

<style scoped>
.container {
  width: 100%;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  color: #333;
  background-color: rgba(255, 255, 255, 0.5);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orange;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  margin-top: 70px;
  border-radius: 30px;
  height: 80px;
}
.naslov {
  margin: 0;
  font-size: 40px;
  color: whitesmoke;
}
.prijava {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 20px;
}
.login-button {
  padding: 10px 20px;
  background-color: white;
  color: #ff6f00;
  text-decoration: none;
  border-radius: 20px;
}
.content {
  display: inline-flex;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
}
.left-section {
  flex: 2;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 10px;
}
.review-section {
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  margin-top: 20px;
}
.comment-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: none;
}
.rating {
  display: flex;
  gap: 5px;
  font-size: 24px;
  cursor: pointer;
}
.rating .selected {
  color: gold;
}
button {
  padding: 10px 15px;
  background: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.thank-you {
  color: green;
  font-weight: bold;
  font-size: x-large;
  margin-top: 10px;
}
.comment-list {
  margin-top: 20px;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.comment {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
.comment:last-child {
  border-bottom: none;
}
small {
  display: block;
  font-size: 12px;
  color: #888;
}
.right-section {
  flex: 3;
  padding: 20px;
  background: white;
  border-radius: 10px;
}
.main-image-container {
  position: relative;
  width: 100%;
  text-align: center;
}
.main-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 30px;
}
.small-image {
  width: 250px;
  height: 200px;
  border-radius: 5px;
  object-fit: cover;
}
.welcome, .logout-button {
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
  padding: 0 10px;
  background-color: antiquewhite;
  border-radius: 20px;
}
.logout-button {
  background-color: #ff6f00;
  color: white;
  font-family: Poppins,Serif;
  font-weight: bold;
  font-size: 20px;
}
.featured-recipes li{
  background: orange;
  color: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  font-weight: bold;
}
.recipe-section {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 20px;
}
.recipe-card {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.recipe-image {
  width: 500px;
  height: 50%;
  border-radius: 10px;
  margin-bottom: 15px;
  object-fit: cover;
}
.recipe-box {
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}
h2{
  margin-bottom: 10px;
  font-size: 30px;
}
h3{
  color: black;
  font-size: 20px;
}
p{
  color: black;
}
.recipe-title {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 25px;
  text-align: center;
  width: max-content;
  font-style: italic;
}
</style>