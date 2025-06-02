type CharacterSize = {
  [key: string]: {
    backgroundSize: string;
    bottom?: string;
    right?: string;
    width: string;
    height: string;
    backgroundPosition?: string;
  };
};

export type Character = {
  id: number;
  name: string;
  image: string;
  sizes?: CharacterSize;
};
export const charactersMelee: Character[] = [
  { id: 1, name: "Mario", image: "Mario_SSBM.png" },
  { id: 2, name: "Dr. Mario", image: "Dr._Mario_SSBM.png" },
  { id: 3, name: "Luigi", image: "Luigi_SSBM.png" },
  { id: 4, name: "Bowser", image: "Bowser_SSBM.png" },
  { id: 5, name: "Peach", image: "Peach_SSBM.png" },
  { id: 6, name: "Yoshi", image: "Yoshi_SSBM.png" },
  { id: 7, name: "Donkey Kong", image: "Donkey_Kong_SSBM.png" },
  { id: 8, name: "Captain Falcon", image: "Captain_Falcon_SSBM.png" },
  { id: 9, name: "Ganondorf", image: "Ganondorf_SSBM.png" },
  { id: 10, name: "Falco", image: "Falco_SSBM.png" },
  { id: 11, name: "Fox", image: "Fox_SSBM.png" },
  {
    id: 12,
    name: "Ness",
    image: "Ness_SSBM.png",
    sizes: {
      top1: {
        backgroundSize: "24rem",
        bottom: "1rem",
        right: "0",
        width: "334px",
        height: "579px",
      },
      top2: {
        backgroundSize: "18rem",
        bottom: "0.5rem",
        right: "0",
        width: "292px",
        height: "280px",
      },
      top3: {
        backgroundSize: "16rem",
        bottom: "0.5rem",
        right: "0",
        width: "264px",
        height: "236px",
      },
      top4: {
        backgroundSize: "13rem",
        bottom: "0.5rem",
        right: "0",
        width: "264px",
        height: "191px",
      },
      top5: {
        backgroundSize: "13rem",
        backgroundPosition: "5rem -5rem",
        width: "342px",
        height: "67px",
      },
      top7: {
        backgroundSize: "13rem",
        backgroundPosition: "5rem -5rem",
        width: "342px",
        height: "67px",
      },
    },
  },
  { id: 13, name: "Ice Climbers", image: "Ice_Climbers_SSBM.png" },
  { id: 14, name: "Kirby", image: "Kirby_SSBM.png" },
  { id: 15, name: "Samus", image: "Samus_SSBM.png" },
  { id: 16, name: "Zelda", image: "Zelda_SSBM.png" },
  { id: 17, name: "Sheik", image: "Sheik_SSBM.png" },
  { id: 18, name: "Link", image: "Link_SSBM.png" },
  { id: 19, name: "Young Link", image: "Young_Link_SSBM.png" },
  { id: 20, name: "Pichu", image: "Pichu_SSBM.png" },
  { id: 21, name: "Pikachu", image: "Pikachu_SSBM.png" },
  { id: 22, name: "Jigglypuff", image: "Jigglypuff_SSBM.png" },
  { id: 23, name: "Mewtwo", image: "Mewtwo_SSBM.png" },
  { id: 24, name: "Mr. Game & Watch", image: "Mr._Game_&_Watch_SSBM.png" },
  { id: 25, name: "Marth", image: "Marth_SSBM.png" },
  { id: 26, name: "Roy", image: "Roy_SSBM.png" },
];
