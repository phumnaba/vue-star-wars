export interface iCharacter {
  id: string;
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  mass: string;
  created?: string;
  edited?: string;
  eye_color?: string;
  films?: Array<string>;
  hair_color?: string;
  homeworld?: string;
  skin_color?: string;
  species?: Array<string>;
  starships?: Array<string>;
  url?: string;
  vehicles?: Array<string>;
}
