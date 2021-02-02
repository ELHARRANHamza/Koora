import { Teams } from './teams';

export class Players {
    id: number;
    firstname: string;
    lastName: string;
    image: string;
    poste: string;
     // tslint:disable-next-line:variable-name
    date_Nais: Date;
    nombre: number;
    nationality: string;
    about: string;
    vote: string;
    team: Teams;
}
