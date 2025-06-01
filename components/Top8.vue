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
        <div class="card card-1">
          <div
            class="render render_outside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(1)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(1)?.id!,
            1
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(1)?.id!, 1)?.width,
          height: getRenderSizes(getPlayerCharacter(1)?.id!, 1)?.height,
          right: getRenderSizes(getPlayerCharacter(1)?.id!, 1)?.right,
          bottom: getRenderSizes(getPlayerCharacter(1)?.id!, 1)?.bottom,
          backgroundPosition: getRenderSizes(getPlayerCharacter(1)?.id!, 1)?.backgroundPosition,
        }"
          />
          <div class="position">1</div>
          <div class="name">{{ getPlayerByPosition(1)?.name }}</div>
          <div class="name-background" />
          <div class="secondary-char">
            <div v-for="(char, idx) in players[0]?.secondaryCharacters">
              <img :src="`${getIconRoute(char)}`" class="char-icon" />
            </div>
          </div>
          <div class="handle">
            <Twitter class="icon" />{{ getPlayerByPosition(1)?.handle }}
          </div>
        </div>
        <div class="card card-2" :style="{ zIndex: 2 }">
          <div
            class="render render_outside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(2)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(2)?.id!,
            2
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(2)?.id!, 2)?.width,
          height: getRenderSizes(getPlayerCharacter(2)?.id!, 2)?.height,
          right: getRenderSizes(getPlayerCharacter(2)?.id!, 2)?.right,
          bottom: getRenderSizes(getPlayerCharacter(2)?.id!, 2)?.bottom,
        }"
          />
          <div class="position">2</div>
          <div class="name">{{ getPlayerByPosition(2)?.name }}</div>
          <div class="name-background" />
          <div class="handle">
            <div class="secondary-char">
              <div v-for="(char, idx) in players[1]?.secondaryCharacters">
                <img :src="`${getIconRoute(char)}`" class="char-icon" />
              </div>
            </div>
            <Twitter class="icon" />{{ getPlayerByPosition(2)?.handle }}
          </div>
        </div>
        <div class="card card-3" :style="{ zIndex: 3 }">
          <div
            class="render render_outside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(3)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(3)?.id!,
            3
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(3)?.id!, 3)?.width,
          height: getRenderSizes(getPlayerCharacter(3)?.id!, 3)?.height,
          right: getRenderSizes(getPlayerCharacter(3)?.id!, 3)?.right,
          bottom: getRenderSizes(getPlayerCharacter(3)?.id!, 3)?.bottom,
        }"
          />
          <div class="position">3</div>
          <div class="name">{{ getPlayerByPosition(3)?.name }}</div>
          <div class="name-background" />
          <div class="handle">
            <div class="secondary-char">
              <div v-for="(char, idx) in players[2]?.secondaryCharacters">
                <img :src="`${getIconRoute(char)}`" class="char-icon" />
              </div>
            </div>
            <Twitter class="icon" />{{ getPlayerByPosition(3)?.handle }}
          </div>
        </div>
        <div class="card card-4" :style="{ zIndex: 4 }">
          <div
            class="render render_outside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(4)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(4)?.id!,
            4
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(4)?.id!, 4)?.width,
          height: getRenderSizes(getPlayerCharacter(4)?.id!, 4)?.height,
          right: getRenderSizes(getPlayerCharacter(4)?.id!, 4)?.right,
          bottom: getRenderSizes(getPlayerCharacter(4)?.id!, 4)?.bottom,
        }"
          />
          <div class="position">4</div>
          <div class="name">{{ getPlayerByPosition(4)?.name }}</div>
          <div class="name-background" />
          <div class="handle">
            <div class="secondary-char">
              <div v-for="(char, idx) in players[3]?.secondaryCharacters">
                <img :src="`${getIconRoute(char)}`" class="char-icon" />
              </div>
            </div>
            <Twitter class="icon" />{{ getPlayerByPosition(4)?.handle }}
          </div>
        </div>
        <div class="card card-5">
          <div
            class="render render_inside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(5)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(5)?.id!,
            5
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(5)?.id!, 5)?.width,
          height: getRenderSizes(getPlayerCharacter(5)?.id!, 5)?.height,
          backgroundPosition: getRenderSizes(getPlayerCharacter(5)?.id!, 5)?.backgroundPosition,
        }"
          />
          <div class="position">5</div>
          <div class="name">{{ getPlayerByPosition(5)?.name }}</div>
          <div class="name-background" />
          <div class="handle">
            <div class="secondary-char">
              <div v-for="(char, idx) in players[4]?.secondaryCharacters">
                <img :src="`${getIconRoute(char)}`" class="char-icon" />
              </div>
            </div>
            <Twitter class="icon" />{{ getPlayerByPosition(5)?.handle }}
          </div>
        </div>
        <div class="card card-5">
          <div
            class="render render_inside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(6)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(6)?.id!,
            5
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(6)?.id!, 6)?.width,
          height: getRenderSizes(getPlayerCharacter(6)?.id!, 6)?.height,
          backgroundPosition: getRenderSizes(getPlayerCharacter(6)?.id!, 5)?.backgroundPosition,
        }"
          />
          <div class="position">5</div>
          <div class="name">{{ getPlayerByPosition(6)?.name }}</div>
          <div class="name-background" />
          <div class="handle">
            <div class="secondary-char">
              <div v-for="(char, idx) in players[5]?.secondaryCharacters">
                <img :src="`${getIconRoute(char)}`" class="char-icon" />
              </div>
            </div>
            <Twitter class="icon" />{{ getPlayerByPosition(6)?.handle }}
          </div>
        </div>
        <div class="card card-7">
          <div
            class="render render_inside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(7)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(7)?.id!,
            7
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(7)?.id!, 7)?.width,
          height: getRenderSizes(getPlayerCharacter(7)?.id!, 7)?.height,
          backgroundPosition: getRenderSizes(getPlayerCharacter(7)?.id!, 7)?.backgroundPosition,
        }"
          />
          <div class="position">7</div>
          <div class="name">{{ getPlayerByPosition(7)?.name }}</div>
          <div class="name-background" />
          <div class="handle">
            <div class="secondary-char">
              <div v-for="(char, idx) in players[0]?.secondaryCharacters">
                <img :src="`${getIconRoute(char)}`" class="char-icon" />
              </div>
            </div>
            <Twitter class="icon" />{{ getPlayerByPosition(7)?.handle }}
          </div>
        </div>
        <div class="card card-7">
          <div
            class="render render_inside"
            :style="{
          backgroundImage: renderImage(getPlayerCharacter(8)?.id!),
          backgroundSize: getRenderSizes(
            getPlayerCharacter(8)?.id!,
            8
          )?.backgroundSize,
          width: getRenderSizes(getPlayerCharacter(8)?.id!, 8)?.width,
          height: getRenderSizes(getPlayerCharacter(8)?.id!, 8)?.height,
          backgroundPosition: getRenderSizes(getPlayerCharacter(8)?.id!, 8)?.backgroundPosition,
        }"
          />
          <div class="position">7</div>
          <div class="name">{{ getPlayerByPosition(8)?.name }}</div>
          <div class="name-background" />
          <div class="handle">
            <div class="secondary-char">
              <div v-for="(char, idx) in players[7]?.secondaryCharacters">
                <img :src="`${getIconRoute(char)}`" class="char-icon" />
              </div>
            </div>
            <Twitter class="icon" />{{ getPlayerByPosition(8)?.handle }}
          </div>
        </div>
      </div>
      <div v-if="props.tournamentUrl && ($device.isDesktop || show)" class="tournamentUrl">
        <Startgg class="icon" />
        start.gg/<span>{{ props.tournamentUrl.split("/")[1] }}</span>
      </div>
    </div>
  </div>
  <button class="screenshot-btn" :class="{'mobile-button': !$device.isDesktop, 'loading': loader}" @click="saveHtmlToImagePNG" :disabled="loader">
  <div v-if="loader" class="loader"></div>
  <div v-else>Guardar</div>
  </button>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import Twitter from "~/assets/icons/twitter.svg";
import Startgg from "~/assets/icons/startgg.svg";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

useHead({
  title: "Top 8"
});

useHead({
  meta: [
    { name: 'viewport', content: 'width=1024' }
  ]
});
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
    `/api/characters?ids=${characters.value
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
  return character ? `url("/renders/${character.image}")` : "";
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
  setTimeout(() =>{
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
    })
  },1000)

};


</script>
<style lang="scss" scoped>

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#ffa516 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%,#ffa516);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13{ 
  100%{transform: rotate(1turn)}
}
.render {
  filter: drop-shadow(3px 8px 0 var(--primary-color));
  background-repeat: no-repeat;
  background-color: transparent;
  &_outside {
    position: absolute;
  }
}

.top-8-container {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  gap: 1rem;
  // margin: 0 auto;
  padding: 2rem;
  font-family: "Proxima Nova", Arial, sans-serif;
  // padding-top: 10rem; // Only for demo purposes, adjust as needed
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.2rem;
    vertical-align: middle;
  }
  .card {
    background: #1c1c3a;
    border: 4px solid var(--primary-color);
    color: white;
    border-radius: 1rem;
    width: 335px;
    padding-top: 1rem 0;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 5rem;

    .name {
      font-size: 3rem;
      font-weight: bold;
      color: #ffff;
      z-index: 2;
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      text-shadow: 4px 4px rgba(100, 9, 75, 0.91);
    }
    .position {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      padding: 0.25rem 0.75rem;
      font-family: "Proxima Nova Italic", Arial, sans-serif;
      font-weight: bold;
      color: #ffff;
    }
    &-1 {
      grid-row: span 3;
      min-height: 30rem;
      .name {
        font-size: 5rem;
        bottom: 2.5rem;
        right: 1rem;
      }
      .name-background {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 2.5rem;
          width: 101%;
          height: 15%;
          background: var(--primary-color);
          clip-path: polygon(-62% 100%, 100% 0, 100% 100%);
          z-index: -1;
          box-shadow: 0 4px 16px 0 rgba(255, 54, 195, 0.25);
        }
      }
      .position {
        font-size: 6rem;
      }
    }

    &-2,
    &-3 {
      min-height: 10.75rem;
      .position {
        font-size: 4rem;
      }
    }

    &-4 {
      min-height: 7.75rem;
      .position {
        font-size: 3.5rem;
        top: 0;
      }
    }

    &-5,
    &-7 {
      min-height: 6.85em;
      .name {
        font-size: 2.3rem;
      }
      .position {
        font-size: 2.5rem;
        top: 0;
      }
    }

    &:not(.card-1) {
      .name-background {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 2.5rem;
          width: 101%;
          height: 25%;
          background: var(--primary-color);
          clip-path: polygon(-15% 100%, 100% 0, 100% 100%);
          z-index: -1;
        }
      }
    }

    .name-background {
      height: 0.6rem;
      margin-top: auto;
      background: var(--primary-color);
      box-shadow: 0 4px 16px 0 rgba(255, 54, 195, 0.25);
      width: 100%;
      z-index: 1;
    }

    .handle {
      font-size: 1rem;
      color: #ccc;
      background-color: var(--secondary-color);
      padding: 0.2rem 1rem;
      text-align: right;
      font-weight: bolder;
      color: var(--primary-color);
      border-radius: 0 0 0.8rem 0.8rem;
      z-index: 1;
    }
  }
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
  border: none;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(255, 238, 140, 0.18);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  // &.mobile-button {
  //   position: absolute;
  //   bottom: 80rem;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   z-index: 1000;
  //   width: 90%;
  //   max-width: 400px;
  //   &.loading {
  //     position: relative;
  //   }
  // }
}
.screenshot-btn:hover {
  background: #232946;
  color: var(--primary-color, #ffee8c);
  border: 1.5px solid var(--primary-color, #ffee8c);
}

.secondary-char {
  position: absolute;
  z-index: 2;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.2rem;
}

.char-icon {
  width: 2rem;
  height: 2rem;
}

.tournamentUrl {
  justify-content: center;;
  font-size: 1.2rem;
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

.message {
  position: absolute;
  top: 30rem;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 2rem;
  text-align: center;
}
</style>
