import {Driver} from "./Driver";
import {Vehicle} from "./Vehicle";

export class AccessLog {
    constructor(
        public id: string = '0',
        public access_time: string ='',
        public vehicle_return: string ='',
        public vehicle_id: string ='',
        public driver_id: string='',
        public driver:Driver,
        public vehicle:Vehicle
    ){

    }
}
