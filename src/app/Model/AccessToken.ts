import {Driver} from "./Driver";

export class AccessToken {
    constructor(
    public id:string ='',
    public token: string = '',
    public driver_id: string = '',
    public driver: Driver
    ){

    }
}