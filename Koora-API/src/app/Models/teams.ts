import { Categorie } from './categorie';
import { Country } from './country';
import { Players } from './players';

export class Teams {
    id: number;
    nom: string;
    logo: string;
    contry: Country;
    players: Players[];
    categorie: Categorie;
}
