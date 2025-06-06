<template>
  <div ref="top8Ref" class="top-8" style="position: relative">
    <!-- <div v-if="!$device.isDesktop && !loader" class="message">La preview no está disponible en móvil</div> -->
    <div id="my-node">
      <div v-if="$device.isDesktop || show" class="logo-container">
        <div class="logo left">
          <img src="/img/Logo.png" alt="Logo Comunidad" />
        </div>
        <div class="logo center" v-if="props.logo">
          <img :src="props.logo" alt="Logo Torneo" />
        </div>
        <div class="info" v-if="props.tournamentName && props.tournamentDate">
          <div class="entrants">{{ props.tournamentName }}</div>
          <div class="date">{{ formattedDate }}</div>
        </div>
      </div>
      <div
        v-if="characters.length && ($device.isDesktop || show)"
        class="top-8-container"
        :style="{
          '--primary-color': props.primaryColor,
          '--secondary-color': props.secondaryColor,
        }"
      >
        <Card
          v-for="pos in 8"
          :key="pos"
          :player="getPlayerByPosition(pos)"
          :position="pos"
          :renderClass="pos <= 4 ? 'render_outside' : 'render_inside'"
          :renderStyle="{
        backgroundImage: renderImage(getPlayerCharacter(pos)?.id!),
        backgroundSize: getRenderSizes(getPlayerCharacter(pos)?.id!, pos)?.backgroundSize,
        width: getRenderSizes(getPlayerCharacter(pos)?.id!, pos)?.width,
        height: getRenderSizes(getPlayerCharacter(pos)?.id!, pos)?.height,
        right: getRenderSizes(getPlayerCharacter(pos)?.id!, pos)?.right,
        bottom: getRenderSizes(getPlayerCharacter(pos)?.id!, pos)?.bottom,
        backgroundPosition: getRenderSizes(getPlayerCharacter(pos)?.id!, pos)?.backgroundPosition,
      }"
          :nameClass="pos === 1 ? 'name-1' : ''"
          :getIconRoute="getIconRoute"
          :cardStyle="{ 'z-index': pos }"
        />
      </div>

      <div class="footer-text">
        <div
          v-if="props.tournamentUrl && ($device.isDesktop || show)"
          class="tournamentUrl"
        >
          <Startgg class="icon" />
          start.gg/<span>{{ props.tournamentUrl.split("/")[1] }}</span>
        </div>
        <div class="credits">
          <span>Programado por:</span>
          <a
            href="https://twitter.com/kete_smush"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter class="icon" />
            kete_smush
          </a>
          <br />
          <span>Diseñado por:</span>
          <a
            href="https://twitter.com/Joseluisasdfg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter class="icon" />
            Joseluisasdfg
          </a>
        </div>
      </div>
    </div>

    <button
      class="screenshot-btn"
      :class="{ 'mobile-button': !$device.isDesktop, loading: loader }"
      @click="saveHtmlToImagePNG"
      :disabled="loader"
    >
      <div v-if="loader" class="loader"></div>
      <div v-else>Guardar</div>
    </button>

    <button
      class="back-btn"
      :class="{ 'mobile-button': !$device.isDesktop, loading: loader }"
      @click="$emit('back')"
    >
      Atrás
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import Twitter from "~/assets/icons/twitter.svg";
import Startgg from "~/assets/icons/startgg.svg";

import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

interface Player {
  name: string;
  position: number;
  handle: string;
  characterID: number;
  secondaryCharacters?: string[];
}

// Recibe la prop players
const props = defineProps<{
  players: Player[];
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  tournamentDate?: string;
  tournamentName?: string;
  tournamentUrl?: string;
  game?: string; // Añadido para manejar el juego
}>();
const top8Ref = ref<HTMLElement | null>(null);
// Computed para characters con posición asignada
const characters = computed(() =>
  props.players.map((player, idx) => ({
    ...player,
    position: idx + 1,
  }))
);
const show = ref(true);
const loader = ref(false);
// El resto del código puede seguir usando "characters" como antes
const { data: charactersData } = await useAsyncData("characters", async () => {
  return await $fetch(
    `/api/characters?game=${props.game}&ids=${characters.value
      .map((c) => c.characterID)
      .join(",")}`
  );
});
const getIconRoute = (name: string) => {
  return `/icons/32px-${name
    .replaceAll(" ", "")
    .replaceAll(".", "")}HeadSSBU.png`;
};
const getCharacterByID = (id: number) => {
  return charactersData.value?.find((c) => c.id === id);
};
const getPlayerByPosition = (position: number) => {
  return characters.value.find((c) => c.position === position);
};
const getPlayerCharacter = (position: number) => {
  const player = getPlayerByPosition(position);
  return player ? getCharacterByID(player.characterID!) : null;
};
const renderImage = (characterID: number) => {
  const character = charactersData.value?.find((c) => c.id === characterID);
  return character ? `url("/renders/${props.game}/${character.image}")` : "";
};

const getRenderSizes = (characterID: number, position: number) => {
  const character = charactersData.value?.find((c) => c.id === characterID);

  switch (position) {
    case 1:
      return character?.sizes?.top1;
    case 2:
      return character?.sizes?.top2;
    case 3:
      return character?.sizes?.top3;
    case 4:
      return character?.sizes?.top4;
    case 5:
    case 6:
      return character?.sizes?.top5;
    case 7:
    case 8:
      return character?.sizes?.top7;
    default:
      return null;
  }
};

const formattedDate = computed(() => {
  if (!props.tournamentDate) return "";
  const date = new Date(props.tournamentDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
});

declare const InstallTrigger: any;
let isFirefox = typeof InstallTrigger !== "undefined";

const saveHtmlToImagePNG = () => {
  show.value = true;
  loader.value = true;
  setTimeout(() => {
    const node = document.getElementById("my-node");
    if (!node) return;
    htmlToImage
      .toBlob(node, { backgroundColor: "#0f1021", skipFonts: isFirefox })
      .then(function (blob) {
        if (blob) {
          saveAs(blob, "my-node.png");
        }
      })
      .finally(() => {
        setTimeout(() => {
          // show.value = false;
          loader.value = false;
        }, 1000);
      });
  }, 1000);
};
</script>
<style lang="scss" scoped>
.top-8 {
  padding-bottom: 2rem;
}
#my-node {
  padding-bottom: 2rem;
}
.loader {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px
      no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}

.top-8-container {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  gap: 1rem;
  // margin: 0 auto;
  padding: 2rem 0 4rem 0;
  font-family: "Proxima Nova", Arial, sans-serif;
  // padding-top: 10rem; // Only for demo purposes, adjust as needed
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
  gap: 2rem;
  max-width: 705px;
  margin: 0 auto;
  padding: 2rem;
}
.logo {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 33 auto;
}
.logo.center {
  width: 140px; /* Puedes ajustar el tamaño del logo central */
  flex: 33 auto;
}
.logo img {
  max-width: 100%;
  max-height: 120px;
  object-fit: contain;
}
.info {
  flex: 33 auto;
  z-index: 3;
  text-align: left;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  .entrants,
  .date {
    width: 100%;
    text-align: center;
    padding: 0.5rem 1rem;
    background-color: white;
    color: black;
    border-radius: 1.5rem;
  }
}
.top-8 {
  max-width: 1024px;
  margin: 0 auto;
}
.screenshot-btn {
  margin: 1rem auto 2rem auto;
  display: block;
  background: var(--primary-color, #ffee8c);
  color: #232946;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  border: 1px solid var(--primary-color, #ffee8c);
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(255, 238, 140, 0.18);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.screenshot-btn:hover {
  background: #232946;
  color: var(--primary-color, #ffee8c);

  border: 1px solid var(--primary-color, #ffee8c);
}

.tournamentUrl {
  justify-content: center;
  font-size: 1.4rem;
  color: #fff;
  display: flex;
  align-items: center;

  svg {
    margin-right: 1rem;
  }
  span {
    font-weight: bold;
  }
}
.back-btn {
  margin: 1rem auto 2rem auto;
  display: block;
  background: transparent;
  color: #ffee8c;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  border: none;

  cursor: pointer;
  &:hover {
    color: #fff;
    background: rgba(255, 238, 140, 0.2);
    border: 1.5px solid var(--primary-color, #ffee8c);
    border-radius: 0.7rem;
  }
}
.message {
  position: absolute;
  top: 30rem;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 2rem;
  text-align: center;
}

.credits {
  text-align: left;

  color: #fff;
  font-size: 1.2rem;
  span {
    margin-right: 0.5rem;
  }
  a {
    color: #ffee8c;
    text-decoration: none;
    font-weight: bold;

    align-items: center;
    gap: 0.5rem;
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
}

.footer-text {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 10rem;
}
</style>
