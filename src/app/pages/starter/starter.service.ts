import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable ()
export class StarterService{
    constructor(private http: Http){}
    getlineonedata (url){
        return this.http.get(url)
            .map((response: Response) => response.json())
    }

    getlineOnedata(arr){
        let a = arr;
        let b;
        let label=[];
        let data=[];
        for (let i= 0; i< a.length; i++){
            label.push(a[i].label);
            data.push(a[i].data);
        }
        return b={
            'lab':label,
            'dat': data
        }
    }
    getTotal (arr){
        let a = arr;
        let b = 0;
        for (let i= 0; i< a.length; i++){
            b += a[i];
        }
        return b;
    }
    getPercentage (arr,j){
        let a = arr;
        let b:number[]=[];
        for (let i= 0; i< a.length; i++){
            let t = Number(((a[i]/j)*100).toFixed(1));
            b.push(t);
        }
        return b;
    }
}