import { Champion } from './champion';
import { Teams } from './teams';

export class TeamsChampion {
    id: number;
    team: Teams;
    champions: Champion;
    point: number;
    nbMatch: number;
    nbMatchW: number;
    nbMatchL: number;
    nbMatchB: number;
}
