import { Commentaire } from './commentaire';
import { User } from './user';

export class ReponseCommentaire {
     id: number;
     reponse: string;
     userName: string;
     image: string;
     dateReponse: Date;
     idCommentaire: number;
}
