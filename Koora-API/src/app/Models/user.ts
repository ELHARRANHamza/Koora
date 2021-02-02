import { Role } from './role';
export class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    userName: string;
    password: string;
    image: string;
    roles: Role;
}
