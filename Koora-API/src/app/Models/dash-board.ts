import { CommentaireDto } from './commentaire-dto';
import { ListNews } from './list-news';
import { User } from './user';

export class DashBoard {
    users: User [];
    commentaires: CommentaireDto[];
    news: ListNews [];
}
