<template>
  <section class="cards">
    <article @click="$emit('game', 'melee')" class="card card--1">

      <div class="card__img"></div>
      <div class="card_link">
        <div class="card__img--hover"></div>
      </div>
      <div class="card__info">
        <h3 class="card__title">Super Smash Bros Melee</h3>
      </div>
    </article>

    <article @click="$emit('game', 'ultimate')" class="card card--2">
      <div class="card__img"></div>
      <div class="card_link">
        <div class="card__img--hover"></div>
      </div>
      <div class="card__info">
        <h3 class="card__title">Super Smash Bros Ultimate</h3>
      </div>
    </article>
  </section>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.cards {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  max-width: 900px;
}

.card--1 .card__img,
.card--1 .card__img--hover {
  background-image: url("/img/SSBM_art.png");
  background-size: 100% auto;
}

.card--2 .card__img,
.card--2 .card__img--hover {
  background-image: url("/img/SSBU_art.jpg");
  background-size: 100% auto;

}





.card__img {
  visibility: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 280px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card__info-hover {
  position: absolute;
  padding: 16px;
  width: 100%;
  opacity: 0;
  top: 0;
}

.card__img--hover {
  transition: 0.2s all ease-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 284px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  top: 0;
}
.card {
  margin-right: 25px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  width: 33.3%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
  transform: scale(1.1, 1.1);
}

.card__info {
  z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px 24px 24px 24px;
}

.card__category {
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #868686;
}

.card__title {
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: "Roboto Slab", serif;
}



.card__author {
  font-weight: 600;
  text-decoration: none;
  color: #ad7d52;
}

.card:hover .card__img--hover {
  height: 100%;
  width: 100%;
  opacity: 0.3;
}

.card:hover .card__info {
  background-color: transparent;
  position: relative;
}

.card:hover .card__info-hover {
  opacity: 1;
}
</style>
