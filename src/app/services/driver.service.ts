
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {GLOBAL} from "../Model/global";
import {Driver} from "../Model/Driver";


@Injectable()
export class DriverService {
    public url:string;
    public identity;
    public token;
    public driver:Driver = new Driver();
    

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

   
    getToken() {
        let token = JSON.parse(localStorage.getItem('token'));

        if(token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    getDriver() {
        let params = '&authorisation='+ this.getToken();
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'/employee/list', params, {headers: headers}).map(res => res.json());
    }

    registerDriver(data) {
        let json = JSON.stringify(data);

        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'/drivers?XDEBUG_SESSION_START=PHPSTORM', json, {headers: headers})
            .map(res => res.json());
    }

    update(usert_to_update) {
        let json = JSON.stringify(usert_to_update);
        let params = "json="+json + '&authorisation='+this.getToken();
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'/employee/edit?XDEBUG_SESSION_START=PHPSTORM', params, {headers: headers})
            .map(res => res.json());
    }

    

}


