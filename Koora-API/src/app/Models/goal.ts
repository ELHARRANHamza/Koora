import { Match } from "./match";
import { Players } from "./players";

export class Goal {
    id: number;
    players: Players;
    match: Match;
    minute: number;
}
