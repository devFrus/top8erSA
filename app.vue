<template>
  <div class="background">
    <Form v-if="!formFilled" @form-submitted="handleForm"></Form>
    <Top8 v-else :players="players"></Top8>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const formFilled = ref(false)
const players = ref([])

const handleForm = (submittedPlayers: any) => {
  players.value = submittedPlayers
  formFilled.value = true
}
</script>
<style lang="scss">
:root {
  --primary-bg: #181824;
  --secondary-bg: #232946;
  --card-bg: #232946;
  --input-bg: #232946;
  --input-border: #393a56;
  --input-focus: #ffee8c;
  --accent: #ffee8c;
  --text-main: #ffee8c;
  --text-secondary: #fffbe6;
  --card-shadow: 0 4px 24px rgba(255, 238, 140, 0.08);
  --card-shadow-strong: 0 2px 8px rgba(255, 238, 140, 0.18);
}
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  width: 100%;
  height: 100%;
}
.background {
  background: #0f1021;
  width: 100vw;
  height: 100vh;
  padding-top: 8rem;
}

@font-face {
    font-family: 'Proxima Nova Italic';
    font-style: normal;
    src: url('./assets/fonts/proximanova_boldit.otf') format('woff2');
}

@font-face {
    font-family: 'Proxima Nova';
    font-style: normal;
    src: url('./assets/fonts/proximanova_bold.otf') format('woff2');
}
</style>
