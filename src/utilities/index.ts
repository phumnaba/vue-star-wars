import { iCharacter } from "@/interface/iCharacter";
import { v4 as uuidv4 } from "uuid";

export const entities: string[] = [
  "people",
  "films",
  "planets",
  "species",
  "starships",
  "vehicles",
];

export const entitiesIconsMap = {
  films: "mdi-movie-open",
  characters: "mdi-account-group",
  planets: "mdi-earth",
  species: "mdi-space-invaders",
  starships: "mdi-star-shooting",
  vehicles: "mdi-car-multiple",
};

export const CHARACTER_TABLE_HEADERS = [
  {
    text: "Name",
    align: "start",
    value: "name",
  },
  { text: "Gender", value: "gender" },
  { text: "Birth Year", value: "birth_year" },
  {
    text: "Height",
    value: "height",
  },
  {
    text: "Mass",
    value: "mass",
  },
  { text: "", align: "end", value: "actions", sortable: false },
];

export const initialCharacterState: iCharacter = {
  id: uuidv4(),
  birth_year: "",
  created: new Date().toISOString(),
  edited: new Date().toISOString(),
  eye_color: "",
  films: [],
  gender: "",
  hair_color: "",
  height: "",
  homeworld: "",
  mass: "",
  name: "",
  skin_color: "",
  species: [],
  starships: [],
  url: "",
  vehicles: [],
};
