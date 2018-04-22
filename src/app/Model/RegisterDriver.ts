import {User} from "./User";
import {Driver} from "./Driver";

export class RegisterDriver {
    constructor(
        public driver: Driver = new Driver(),
        public user: User = new User()

    ){

    }
}
