import { Role } from "./role";
import { User } from "./user"

export class UserDto {
    users: User[];
    roles: Role[];
}
