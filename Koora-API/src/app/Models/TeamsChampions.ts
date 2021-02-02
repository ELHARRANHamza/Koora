import { Match } from './match';
import { TeamsChampion } from './teams-champion';

export class TeamsChampions {
    id: number;
    name: string;
    image: string;
    matches: Match[];
    teams: TeamsChampion[];
}
