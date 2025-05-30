<template>
  <div class="background">
    <Form v-if="!formFilled" @form-submitted="handleForm"></Form>
    <Top8
      v-else
      :players="players"
      :logo="logo"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :tournament-date="tournamentDate"
      :tournament-name="tournamentName"
    ></Top8>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const formFilled = ref(false);
const players = ref([]);
const logo = ref("");
const primaryColor = ref("#ffee8c");
const secondaryColor = ref("#232946");
const tournamentDate = ref(new Date().toISOString().split("T")[0]);
const tournamentName = ref("Top 8 Tournament");

const handleForm = (submittedPlayers: any) => {
  players.value = submittedPlayers.players;
  logo.value = submittedPlayers.logo;
  primaryColor.value = submittedPlayers.primaryColor;
  secondaryColor.value = submittedPlayers.secondaryColor;
  tournamentDate.value = submittedPlayers.tournamentDate;
  tournamentName.value = submittedPlayers.tournamentName;
  formFilled.value = true;
};
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
html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
  background: #0f1021;
}
.background {
  width: 100vw;
  height: 100vh;
  padding-top: 2rem;
}

@font-face {
  font-family: "Proxima Nova Italic";
  font-style: normal;
  src: url("/fonts/proximanova_boldit.otf") format("opentype");
}

@font-face {
  font-family: "Proxima Nova";
  font-style: normal;
  src: url("/fonts/proximanova_bold.otf") format("opentype");
}
</style>
