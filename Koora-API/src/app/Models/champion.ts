import { Match } from './match';
import { TeamsChampion } from './teams-champion';

export class Champion {
    id: number;
    name: string;
    image: string;
    matches: Match[];
}
