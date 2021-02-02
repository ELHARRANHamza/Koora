import { ReponseCommentaire } from './reponse-commentaire';

export class CommentaireDto {
    id: number;
    // tslint:disable-next-line:variable-name
    id_News: number;
    commentaire: string;
    userName: string;
    image: string;
    // tslint:disable-next-line:variable-name
    date_Poste: Date;
    reponseCommentaires: ReponseCommentaire[];

}
