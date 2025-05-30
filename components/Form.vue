<template>
  <form @submit.prevent="submitForm" class="top8-form">
    <div class="title">El cojonudo Top 8 Generator</div>
    <div class="players-grid">
      <div v-for="(player, idx) in players" :key="idx" class="player-form">
        <h3>Jugador {{ idx + 1 }}</h3>
        <label>
          Nombre del jugador:
          <input v-model="player.name" type="text" required />
        </label>
        <label>
          Twitter handle:
          <input v-model="player.handle" type="text" placeholder="@usuario" />
        </label>
        <label>
          Personaje:
          <input
            v-model="player.character"
            type="text"
            placeholder="Buscar personaje"
            @input="filterCharacters(idx)"
            @focus="player.showSuggestions = true"
            @blur="hideSuggestions(idx)"
            @keydown.down.prevent="moveSuggestion(idx, 1)"
            @keydown.up.prevent="moveSuggestion(idx, -1)"
            @keydown.enter.prevent="selectActiveSuggestion(idx)"
            autocomplete="on"
            list="characters-list"
          />
          <ul
            v-if="player.showSuggestions && player.filteredCharacters.length"
            class="suggestions"
          >
            <li
              v-for="(char, cidx) in player.filteredCharacters"
              :key="char.id"
              :tabindex="0"
              :class="{ active: player.activeSuggestion === cidx }"
              @mousedown.prevent="selectCharacter(idx, char.name)"
              @keydown.enter.prevent="selectCharacter(idx, char.name)"
              @mouseover="player.activeSuggestion = cidx"
            >
              <img :src="`_nuxt${getIconRoute(char.name)}`" class="icon"/> {{ char.name }}
            </li>
          </ul>
        </label>
      </div>
    </div>
    <button type="submit" class="submit-btn">Guardar Top 8</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, nextTick } from "vue";
const emit = defineEmits(["formSubmitted"]);
const { data: charactersData } = await useAsyncData("charactersList", async () => {
  return await $fetch(`/api/characters`);
});
const allCharacters = charactersData.value || [];
interface PlayerForm {
  name: string;
  handle: string;
  character: string;
  characterID: number | null;
  filteredCharacters: { id: number; name: string }[];
  showSuggestions: boolean;
  activeSuggestion: number;
}
const getIconRoute = (name: string) => {
  return `/assets/icons/32px-${name.replaceAll(" ", "").replaceAll(".", "")}HeadSSBU.png`;
};
const players = reactive<PlayerForm[]>(
  Array.from({ length: 8 }, () => ({
    name: "",
    handle: "",
    character: "",
    characterID: null,
    filteredCharacters: allCharacters,
    showSuggestions: false,
    activeSuggestion: 0,
  }))
);

function filterCharacters(idx: number) {
  const search = players[idx].character.toLowerCase();
  players[idx].filteredCharacters = allCharacters.filter((c) =>
    c.name.toLowerCase().includes(search)
  );
  players[idx].showSuggestions = true;
  players[idx].activeSuggestion = 0;
}

function selectCharacter(idx: number, name: string) {
  players[idx].character = name;
  const found = allCharacters.find((c) => c.name === name);
  players[idx].characterID = found ? found.id : null;
  players[idx].showSuggestions = false;
}

function selectActiveSuggestion(idx: number) {
  const player = players[idx];
  if (
    player.showSuggestions &&
    player.filteredCharacters.length > 0 &&
    player.activeSuggestion >= 0
  ) {
    const char = player.filteredCharacters[player.activeSuggestion];
    selectCharacter(idx, char.name);
  }
}

function moveSuggestion(idx: number, direction: number) {
  const player = players[idx];
  if (!player.showSuggestions || player.filteredCharacters.length === 0) return;
  player.activeSuggestion += direction;
  if (player.activeSuggestion < 0) player.activeSuggestion = player.filteredCharacters.length - 1;
  if (player.activeSuggestion >= player.filteredCharacters.length) player.activeSuggestion = 0;

  // Hacer scroll al elemento activo
  nextTick(() => {
    const ul = document.querySelectorAll('.suggestions')[idx];
    if (ul) {
      const activeLi = ul.querySelectorAll('li')[player.activeSuggestion];
      if (activeLi && typeof activeLi.scrollIntoView === 'function') {
        activeLi.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  });
}

function hideSuggestions(idx: number) {
  nextTick(() => {
    players[idx].showSuggestions = false;
  });
}

function submitForm() {
  emit("formSubmitted", players);
}
</script>

<style scoped>


.title {
  font-family: "Proxima Nova", sans-serif;
  font-weight: 700;
  font-size: 4.5rem;
  color: var(--accent);
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 16px #23294655;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.2rem;
  vertical-align: middle;
}
.top8-form {
  background: var(--primary-bg);
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: var(--card-shadow);
  max-width: 1200px;
  margin: 0 auto;
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem 1.5rem;
}

.player-form {
  background: var(--card-bg);
  border-radius: 1rem;
  box-shadow: var(--card-shadow-strong);
  padding: 1.2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  border: 1.5px solid var(--input-border);
  transition: border 0.2s;
}

.player-form h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--accent);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.97rem;
  color: var(--text-main);
  margin-bottom: 0.7rem;
  font-weight: 500;
  position: relative;
}

input[type="text"] {
  margin-top: 0.3rem;
  padding: 0.45rem 0.7rem;
  border: 1.5px solid var(--input-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--input-bg);
  color: var(--text-secondary);
  transition: border 0.2s, background 0.2s, color 0.2s;
}

input[type="text"]:focus {
  border: 1px solid var(--input-focus);
  outline: none;
  background: #232946;
  color: var(--accent);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background: var(--secondary-bg);
  border: 1.5px solid var(--input-border);
  border-radius: 0 0 0.5rem 0.5rem;
  max-height: 180px;
  overflow-y: auto;
  box-shadow: 0 2px 16px #181824cc;
  margin: 0;
  padding: 0;
  list-style: none;
}

.suggestions li {
  padding: 0.5rem 0.7rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  color: var(--text-secondary);
  background: transparent;
}

.suggestions li:hover,
.suggestions li.active {
  background: var(--accent);
  color: #232946;
}

.submit-btn {
  margin: 2rem auto 0 auto;
  display: block;
  background: var(--accent);
  color: #232946;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 0.9rem 2.5rem;
  border: none;
  border-radius: 0.7rem;
  box-shadow: var(--card-shadow-strong);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.submit-btn:hover {
  background: #232946;
  color: var(--accent);
  border: 1.5px solid var(--accent);
}

@media (max-width: 1100px) {
  .players-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .players-grid {
    grid-template-columns: 1fr;
  }
  .top8-form {
    padding: 1rem;
  }
}
</style>
