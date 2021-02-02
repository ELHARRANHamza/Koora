import { Categorie } from './categorie';
import { Commentaire } from './commentaire';

export class ListNews {
    id: number;
    titre: string;
    description: string;
    image: string;
    // tslint:disable-next-line:variable-name
    id_Cat: number;
    // tslint:disable-next-line:variable-name
    date_Publiciter: Date;
    commentaires: Commentaire[];
    getCategories: Categorie;
}
