<template>
  <div v-if="characters.length" class="top-8-container">
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
      <div class="handle"><Twitter class="icon" />{{ getPlayerByPosition(1)?.handle }}</div>
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
      <div class="handle"><Twitter class="icon" />{{ getPlayerByPosition(3)?.handle }}</div>
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
      <div class="handle"><Twitter class="icon" />{{ getPlayerByPosition(4)?.handle }}</div>
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
      <div class="handle"><Twitter class="icon" />{{ getPlayerByPosition(5)?.handle }}</div>
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
      <div class="handle"><Twitter class="icon" />{{ getPlayerByPosition(6)?.handle }}</div>
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
      <div class="handle"><Twitter class="icon" />{{ getPlayerByPosition(7)?.handle }}</div>
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
      <div class="handle"><Twitter class="icon" />{{ getPlayerByPosition(8)?.handle }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import Twitter from "~/assets/icons/twitter.svg";

interface Player {
  name: string;
  position: number;
  handle: string;
  characterID: number;
}

// Recibe la prop players
const props = defineProps<{ players: Player[] }>()

// Computed para characters con posición asignada
const characters = computed(() =>
  props.players.map((player, idx) => ({
    ...player,
    position: idx + 1,
  }))
)

// El resto del código puede seguir usando "characters" como antes
const { data: charactersData } = await useAsyncData("characters", async () => {
  return await $fetch(
    `/api/characters?ids=${characters.value.map((c) => c.characterID).join(",")}`
  );
});
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
  return character ? `url("_nuxt/assets/renders/${character.image}")` : "";
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
</script>
<style lang="scss">
.render {
  filter: drop-shadow(3px 8px 0 #ff42ec);
  background-repeat: no-repeat;
  &_outside {
    position: absolute;
  }
}

.top-8-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 703px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Proxima Nova", "Arial", sans-serif;
  padding-top: 10rem; // Only for demo purposes, adjust as needed
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.2rem;
    vertical-align: middle;
  }
  .card {
    background: #1c1c3a;
    border: 4px solid #ff42ec;
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
    box-shadow: 0 0 10px rgba(255, 54, 195, 0.5);

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
      font-family: "Proxima Nova Italic", "Arial", sans-serif;
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
          background: #ff42ec;
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
          background: #ff42ec;
          clip-path: polygon(-15% 100%, 100% 0, 100% 100%);
          z-index: -1;
        }
      }
    }

    .name-background {
      height: 0.6rem;
      margin-top: auto;
      background: #ff42ec;
      box-shadow: 0 4px 16px 0 rgba(255, 54, 195, 0.25);
      width: 100%;
      z-index: 1;
    }

    .handle {
      font-size: 1rem;
      color: #ccc;
      background-color: #66195f;
      padding: 0.2rem 1rem;
      text-align: right;
      font-weight: bolder;
      color: #ff42ec;
      border-radius: 0 0 1rem 1rem;
      z-index: 1;
    }
  }
}
</style>
