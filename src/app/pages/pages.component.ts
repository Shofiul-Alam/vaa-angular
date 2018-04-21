import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PageComponent implements OnInit,AfterViewInit {

    constructor(public router: Router) { }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/starter']);
        }
    }
    ngAfterViewInit() {
        $(function() {
            $(".preloader").fadeOut();
        });
    }

}
