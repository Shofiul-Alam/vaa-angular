import { Component, AfterViewInit } from '@angular/core';
import { DriverService} from "../services/driver.service";
import {Driver} from "../Model/Driver";
import {RegisterDriver} from "../Model/RegisterDriver";
import {ValidationService} from "../services/formValidation.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit {

    public driver: Driver = new Driver();
    public registerDriver: RegisterDriver = new RegisterDriver();
    public loader: boolean = false;
    public status:string = '';
    public code;


    constructor(
        private _driverService: DriverService,
        private validationForm:ValidationService
    ) {

    }

    onSubmit() {
        console.log(this.registerDriver);

        this.loader = true;
        this._driverService.registerDriver(this.registerDriver).subscribe(
            response => {
                this.code = response.code;
                console.log(response);
                if(response.code != 200) {
                    this.status = response.msg;
                    this.loader = false;
                    setTimeout(()=>{this.code = 0},10000);
                } else{
                    this.loader = false;
                }
            },
            error => {
                console.log(<any> error);
                this.loader = false;
            }
        );
    }

    cancelPopUp(){
        this.code = 0;
    }

    ngAfterViewInit() {
        $(function() {
            $(".preloader").fadeOut();
        });
        $(function() {
            (<any>$('[data-toggle="tooltip"]')).tooltip()
        });
        $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
    }
}
