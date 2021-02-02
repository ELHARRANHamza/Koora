import { News } from './News';
import { ReponseCommentaire } from './reponse-commentaire';
import { User } from './user';

export class Commentaire {
    id: number;
    commentaire: string;
    news: News;
    // tslint:disable-next-line:variable-name
    date_Cmt: Date;
    users: User;
    reponseCommentaires: ReponseCommentaire[];

}
