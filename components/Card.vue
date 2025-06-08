<template>
  <div :class="['card', `card-${position}`]" :style="cardStyle">
    <div
      :class="['render', renderClass]"
      :style="renderStyle"
    />
    <div class="position">{{ realPosition }}</div>
    <div :class="['name', nameClass]">{{ player?.name }}</div>
    <div class="name-background" />
    <div class="secondary-char" v-if="player?.secondaryCharacters?.length">
      <div v-for="(char, idx) in player.secondaryCharacters" :key="idx">
        <img :src="`${getIconRoute(char)}`" class="char-icon" />
      </div>
    </div>
    <div class="handle">
      <span v-if="player?.handle"><Twitter class="icon" />{{ player.handle }}</span>
      <span v-else><Twitter class="icon hidden" />&#8192</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Twitter from "~/assets/icons/twitter.svg";
import fitty from "fitty";
onMounted(() => {
  // Ajusta el tamaño de los nombres de los jugadores
  nextTick(() => {
    fitty(".name", { minSize: 20, maxSize: 40 });
    fitty(".name-1", { minSize: 30, maxSize: 56, multiLine: false });
  });
});

const realPosition = computed(() => {
  return props.position === 6 ? 5 : props.position === 8 ? 7 : props.position;
});
const props = defineProps<{
  player: any;
  position: number;
  renderClass: string;
  renderStyle: Record<string, any>;
  nameClass?: string;
  cardStyle?: Record<string, any>;
  getIconRoute: (name: string) => string;
}>();
</script>

<style scoped lang="scss">
.render {
  filter: drop-shadow(3px 8px 0 var(--primary-color));
  background-repeat: no-repeat;
  background-color: transparent;
  &_outside {
    position: absolute;
  }
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
    font-weight: bold;
    color: #fff;
    z-index: 3;
    white-space: nowrap;
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
    color: #fff;
    text-shadow: 4px 4px rgba(100, 9, 75, 0.91);
  }
  &-1 {
    grid-row: span 3;
    min-height: 30rem;
    .name {
      font-size: 3.5vmin;
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

  &-5,&-6,
  &-7,&-8 {
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

.icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.2rem;
  vertical-align: middle;
  &.hidden {
    color: var(--secondary-color);
  }
}

/* Responsive */
@media (max-width: 900px) {
  .card {
    width: 95vw !important;
    min-width: 0 !important;
    max-width: 99vw !important;
    margin: 0 auto;
    .name {
      font-size: 2.2rem !important;
      right: 1rem !important;
      bottom: 1rem !important;
    }
    .position {
      font-size: 2.5rem !important;
      top: 0.3rem !important;
      left: 0.3rem !important;
    }
  }
  .secondary-char {
    top: 0.3rem;
    right: 0.3rem;
    .char-icon {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
}

@media (max-width: 600px) {
  .card {
    width: 99vw !important;
    min-width: 0 !important;
    max-width: 99vw !important;
    border-radius: 0.5rem;
    padding: 0.5rem 0 !important;
    .name {
      font-size: 1.3rem !important;
      right: 0.5rem !important;
      bottom: 0.5rem !important;
    }
    .position {
      font-size: 1.3rem !important;
      top: 0.2rem !important;
      left: 0.2rem !important;
    }
  }
  .secondary-char {
    top: 0.2rem;
    right: 0.2rem;
    .char-icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>