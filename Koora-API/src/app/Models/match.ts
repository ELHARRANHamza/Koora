import { Champion } from './champion';
import { Goal } from './goal';
import { MatchTV } from './match-tv';
import { Teams } from './teams';

export class Match {
     id: number;
     // tslint:disable-next-line:variable-name
     date_Match: Date;
     // tslint:disable-next-line:variable-name
     team_Aller: Teams;
     // tslint:disable-next-line:variable-name
     team_Retour: Teams;
     // tslint:disable-next-line:variable-name
     res_TeamAller: number;
     // tslint:disable-next-line:variable-name
     res_TeamRetour: number;
     stade: string;
     goals: Goal[];
     champions: Champion;
     // tslint:disable-next-line:variable-name
     match_TVs: MatchTV[];
     etat: number;
     type: string;
}
