import { characters } from "~/server/data/characters";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = parseInt(query.id as string, 10);
  const idsParam = query.ids as Array<Int32Array>;

  let filtered = characters;

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
