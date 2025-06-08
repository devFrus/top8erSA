import { characters } from "~/server/data/characters";
import { charactersMelee } from "../data/charactersMelee";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const game = query.game|| 'ultimate'; // Por defecto Smash Ultimate
  const idsParam = query.ids as Array<Int32Array>;

  let filtered = game === 'melee'  ? charactersMelee : characters;
  
  // ✅ Filtro por IDs
  if (idsParam) {
    const ids = idsParam
      .toString()
      .split(",")
      .map((id) => parseInt(id));
    filtered = filtered.filter((c) => ids.includes(c.id));
  }

  return filtered;
});
