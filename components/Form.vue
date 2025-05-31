<template>
  <form @submit.prevent="submitForm" class="top8-form">
    <div class="title">El cojonudo Top 8 Generator</div>
    <!-- Botón de autocompletar para pruebas -->
    <button type="button" class="fill-btn" @click="fillRandom">Rellenar aleatorio</button>
    <!-- Nuevo campo para subir logo del torneo -->
    <div class="tournament-logo-field">
      <label>
        Logo del torneo:
        <input type="file" accept="image/*" @change="onLogoChange" />
      </label>
      <div v-if="logoPreview" class="logo-preview">
        <img :src="logoPreview" alt="Logo preview" />
      </div>
    </div>
    <!-- NUEVO: Color pickers -->
    <div class="color-pickers">
      <label>
        Color primario:
        <input type="color" v-model="primaryColor" />
        <span class="color-value">{{ primaryColor }}</span>
      </label>
      <label>
        Color secundario:
        <input type="color" v-model="secondaryColor" />
        <span class="color-value">{{ secondaryColor }}</span>
      </label>
    </div>
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
              <img :src="`${getIconRoute(char.name)}`" class="icon"/> {{ char.name }}
            </li>
          </ul>
        </label>
        <!-- Personajes secundarios -->
        <label>
          Personajes secundarios:
          <div class="secondary-chars">
            <div
              v-for="(sec, sidx) in player.secondaryCharacters"
              :key="sidx"
              class="secondary-char"
            >
              <input
                v-model="player.secondaryCharacters[sidx]"
                type="text"
                placeholder="Buscar personaje"
                @input="filterSecondaryCharacters(idx, sidx)"
                @focus="player.showSecondarySuggestions[sidx] = true"
                @blur="hideSecondarySuggestions(idx, sidx)"
                @keydown.down.prevent="moveSecondarySuggestion(idx, sidx, 1)"
                @keydown.up.prevent="moveSecondarySuggestion(idx, sidx, -1)"
                @keydown.enter.prevent="selectActiveSecondarySuggestion(idx, sidx)"
                autocomplete="on"
              />
              <ul
                v-if="player.showSecondarySuggestions[sidx] && player.filteredSecondaryCharacters[sidx]?.length"
                class="suggestions"
              >
                <li
                  v-for="(char, cidx) in player.filteredSecondaryCharacters[sidx]"
                  :key="char.id"
                  :tabindex="0"
                  :class="{ active: player.activeSecondarySuggestion[sidx] === cidx }"
                  @mousedown.prevent="selectSecondaryCharacter(idx, sidx, char.name)"
                  @keydown.enter.prevent="selectSecondaryCharacter(idx, sidx, char.name)"
                  @mouseover="player.activeSecondarySuggestion[sidx] = cidx"
                >
                  <img :src="`${getIconRoute(char.name)}`" class="icon"/> {{ char.name }}
                </li>
              </ul>
              <button type="button" @click="removeSecondaryCharacter(idx, sidx)">X</button>
            </div>
            <button type="button" @click="addSecondaryCharacter(idx)">Añadir personaje secundario</button>
          </div>
        </label>
      </div>
    </div>
    <!-- NUEVOS CAMPOS ABAJO -->
    <div class="tournament-fields">
      <label>
        Nombre del torneo:
        <input type="text" v-model="tournamentName" placeholder="Ej: Ult. Vortex #14" />
      </label>
      <label>
        Fecha del torneo:
        <input type="date" v-model="tournamentDate" />
      </label>
    </div>
    <button type="submit" class="submit-btn">Guardar Top 8</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from "vue";
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
  // Secundarios
  secondaryCharacters: string[];
  filteredSecondaryCharacters: { id: number; name: string }[][];
  showSecondarySuggestions: boolean[];
  activeSecondarySuggestion: number[];
}
const getIconRoute = (name: string) => {
  return `/icons/32px-${name.replaceAll(" ", "").replaceAll(".", "")}HeadSSBU.png`;
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
    secondaryCharacters: [],
    filteredSecondaryCharacters: [],
    showSecondarySuggestions: [],
    activeSecondarySuggestion: [],
  }))
);

// Nuevo: estado para el logo
const logoFile = ref<File | null>(null);
const logoPreview = ref<string | null>(null);

// NUEVO: estado para los colores
const primaryColor = ref("#ff42ec");
const secondaryColor = ref("#66195f");

// NUEVOS: estado para el nombre y fecha del torneo
const tournamentName = ref("");
const tournamentDate = ref("");

// Logo
function onLogoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    logoFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      logoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    logoFile.value = null;
    logoPreview.value = null;
  }
}

// Autocompletado principal
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

// Secundarios
function addSecondaryCharacter(idx: number) {
  players[idx].secondaryCharacters.push("");
  players[idx].filteredSecondaryCharacters.push(allCharacters);
  players[idx].showSecondarySuggestions.push(false);
  players[idx].activeSecondarySuggestion.push(0);
}
function removeSecondaryCharacter(idx: number, sidx: number) {
  players[idx].secondaryCharacters.splice(sidx, 1);
  players[idx].filteredSecondaryCharacters.splice(sidx, 1);
  players[idx].showSecondarySuggestions.splice(sidx, 1);
  players[idx].activeSecondarySuggestion.splice(sidx, 1);
}
function filterSecondaryCharacters(idx: number, sidx: number) {
  const search = players[idx].secondaryCharacters[sidx].toLowerCase();
  players[idx].filteredSecondaryCharacters[sidx] = allCharacters.filter((c) =>
    c.name.toLowerCase().includes(search)
  );
  players[idx].showSecondarySuggestions[sidx] = true;
  players[idx].activeSecondarySuggestion[sidx] = 0;
}
function selectSecondaryCharacter(idx: number, sidx: number, name: string) {
  // Evita duplicados entre secundarios y con el principal
  if (
    players[idx].secondaryCharacters.some((n, i) => n === name && i !== sidx) ||
    players[idx].character === name
  ) {
    players[idx].showSecondarySuggestions[sidx] = false;
    return;
  }
  players[idx].secondaryCharacters[sidx] = name;
  players[idx].showSecondarySuggestions[sidx] = false;
}
function selectActiveSecondarySuggestion(idx: number, sidx: number) {
  const arr = players[idx];
  if (
    arr.showSecondarySuggestions[sidx] &&
    arr.filteredSecondaryCharacters[sidx]?.length > 0 &&
    arr.activeSecondarySuggestion[sidx] >= 0
  ) {
    const char = arr.filteredSecondaryCharacters[sidx][arr.activeSecondarySuggestion[sidx]];
    selectSecondaryCharacter(idx, sidx, char.name);
  }
}
function moveSecondarySuggestion(idx: number, sidx: number, direction: number) {
  const arr = players[idx];
  if (!arr.showSecondarySuggestions[sidx] || arr.filteredSecondaryCharacters[sidx]?.length === 0) return;
  arr.activeSecondarySuggestion[sidx] += direction;
  if (arr.activeSecondarySuggestion[sidx] < 0) arr.activeSecondarySuggestion[sidx] = arr.filteredSecondaryCharacters[sidx].length - 1;
  if (arr.activeSecondarySuggestion[sidx] >= arr.filteredSecondaryCharacters[sidx].length) arr.activeSecondarySuggestion[sidx] = 0;
  nextTick(() => {
    const ul = document.querySelectorAll('.secondary-chars')[idx]?.querySelectorAll('.suggestions')[sidx];
    if (ul) {
      const activeLi = ul.querySelectorAll('li')[arr.activeSecondarySuggestion[sidx]];
      if (activeLi && typeof activeLi.scrollIntoView === 'function') {
        activeLi.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  });
}
function hideSecondarySuggestions(idx: number, sidx: number) {
  nextTick(() => {
    players[idx].showSecondarySuggestions[sidx] = false;
  });
}

// Envío
function submitForm() {
  emit("formSubmitted", {
    players,
    logo: logoPreview.value, // Puedes enviar el base64 o el File según lo que necesites
    primaryColor: primaryColor.value,
    secondaryColor: secondaryColor.value,
    tournamentName: tournamentName.value,
    tournamentDate: tournamentDate.value,
  });
}

// Rellenar aleatorio
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function fillRandom() {
  const randomNames = [
    "Pepe", "Juan", "Ana", "Luis", "Marta", "Sergio", "Lucía", "Carlos"
  ];
  const randomHandles = [
    "@pepe", "@juan", "@ana", "@luis", "@marta", "@sergio", "@lucia", "@carlos"
  ];
  for (let i = 0; i < players.length; i++) {
    players[i].name = randomNames[i % randomNames.length] + (Math.floor(Math.random() * 100));
    players[i].handle = randomHandles[i % randomHandles.length];
    const char = getRandomItem(allCharacters);
    players[i].character = char ? char.name : "";
    players[i].characterID = char ? char.id : null;
    players[i].filteredCharacters = allCharacters;
    // Secundarios aleatorios
    players[i].secondaryCharacters = [];
    const secCount = Math.floor(Math.random() * 3); // 0-2 secundarios
    for (let j = 0; j < secCount; j++) {
      const secChar = getRandomItem(allCharacters);
      players[i].secondaryCharacters.push(secChar ? secChar.name : "");
    }
    players[i].filteredSecondaryCharacters = players[i].secondaryCharacters.map(() => allCharacters);
    players[i].showSecondarySuggestions = players[i].secondaryCharacters.map(() => false);
    players[i].activeSecondarySuggestion = players[i].secondaryCharacters.map(() => 0);
  }
  // Colores aleatorios
  primaryColor.value = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
  secondaryColor.value = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
}
</script>

<style>
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
</style>

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

.secondary-chars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.secondary-char {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.secondary-char input[type="text"] {
  flex: 1;
}
.secondary-char button {
  background: #393a56;
  color: #ffee8c;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.secondary-char button:hover {
  background: #ffee8c;
  color: #232946;
}

.secondary-chars > button {
  margin-top: 0.3rem;
  background: #232946;
  color: #ffee8c;
  border: 1px solid #393a56;
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.secondary-chars > button:hover {
  background: #ffee8c;
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

.tournament-logo-field {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tournament-logo-field label {
  color: var(--text-main);
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.logo-preview img {
  margin-top: 0.5rem;
  max-width: 120px;
  max-height: 120px;
  border-radius: 0.5rem;
  border: 2px solid var(--accent);
  background: #232946;
}

.color-pickers {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}
.color-pickers label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 600;
  color: var(--text-main);
}
.color-value {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-left: 0.3rem;
  font-family: monospace;
}

.fill-btn {
  margin-bottom: 1.5rem;
  background: #393a56;
  color: #ffee8c;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.fill-btn:hover {
  background: #ffee8c;
  color: #232946;
}

.tournament-fields {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Igual que .players-grid */
  gap: 2rem 1.5rem;                      /* Igual que .players-grid */
}
.tournament-fields label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: var(--text-main);
  gap: 0.3rem;
  min-width: 0; /* Igual que las cards */
}

.tournament-fields input[type="text"],
.tournament-fields input[type="date"] {
  margin-top: 0.3rem;
  padding: 0.45rem 0.7rem;
  border: 1.5px solid var(--input-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--input-bg);
  color: var(--text-secondary);
  transition: border 0.2s, background 0.2s, color 0.2s;
}
.tournament-fields input[type="text"]:focus,
.tournament-fields input[type="date"]:focus {
  border: 1px solid var(--input-focus);
  outline: none;
  background: #232946;
  color: var(--accent);
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
