import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit} from '@angular/core';
import { StarterService } from './starter.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';



@Component({
	templateUrl: './starter.component.html',
	styleUrls: ['./starter.component.css'],
	providers:[StarterService]
})

export class StarterComponent implements OnInit, AfterViewInit  {

	@ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
	chart: Array<any> = [];

	result:Array<any>;
	projects:Array<any>;
	comments:Array<any>;
	contacts:Array<any>;
	dataforLineOne:{};
	dataforDoughnut:{};
	tabledataDoughnut:Array<any>;
	totalDoughnut:number;
  	public lineChartData:Array<any>=[
		{data: []}
	];
	public lineChartLabels:Array<any>=[];
	public doughnutChartLabels:string[] = [];
	public doughnutChartData:number[] = [];

	dataFrolineSiteA;
	dataFrolineSiteB;
	dataForLine2:{};
	public lineChartData1:Array<any> = [
		{data: []},
		{data: []}
	];
	public lineChartLabels1:Array<any> = [];


	private _url: string = './assets/api/lineChartOne.json';
	private _url1: string = './assets/api/ProjectsOfMonth.json';
	private _url2: string = './assets/api/Comments.json';
	private _url3: string = './assets/api/MyContact.json';
	private _url4: string = './assets/api/visit.json';
	private _url5: string = './assets/api/website.json';
	constructor( private _service: StarterService) {
	}

	ngOnInit() {
		this._service.getlineonedata(this._url1).subscribe(resProjectData=> {this.projects = resProjectData['projectofmonth'];
		});
		this._service.getlineonedata(this._url2).subscribe(resCommentData=> {this.comments = resCommentData['comments'];
		});
		this._service.getlineonedata(this._url3).subscribe(resContactData=> {this.contacts = resContactData['contacts'];
		});

	}

	ngAfterViewInit() {
		this.parseCharts();
		this.loadChart1();
		this.loadChart2();
		this.loadChart3();
	}

	parseCharts() {
		this.charts.forEach((child) => {
			this.chart.push(child);
		});
	}

	loadChart1(){
		this._service.getlineonedata(this._url).subscribe(resLineData=> {this.result = resLineData['salesoverview'];
			this.dataforLineOne=this._service.getlineOnedata(this.result);
			this.lineChartData=[{data: this.dataforLineOne['dat']}];
			this.chart[0].chart.config.data.labels  = this.dataforLineOne['lab'];
		});
	}

	loadChart2(){
		this._service.getlineonedata(this._url4).subscribe(resLineData=> {this.tabledataDoughnut = resLineData['visit'];
			this.dataforDoughnut=this._service.getlineOnedata(this.tabledataDoughnut);
			this.totalDoughnut = this._service.getTotal(this.dataforDoughnut['dat']);
			this.doughnutChartData=this._service.getPercentage(this.dataforDoughnut['dat'],this.totalDoughnut);
			this.doughnutChartLabels=this.dataforDoughnut['lab'];
			this.chart[1].chart.config.data.labels = this.dataforDoughnut['lab'];
		});
	}


	loadChart3(){
		this._service.getlineonedata(this._url5).subscribe(resLineData=> {this.dataForLine2 = resLineData['website'];
			this.dataFrolineSiteA = this._service.getlineOnedata(this.dataForLine2['SiteA']);
			this.dataFrolineSiteB = this._service.getlineOnedata(this.dataForLine2['SiteB']);
			this.lineChartData1 = [
				{data: this.dataFrolineSiteA['dat']},
				{data: this.dataFrolineSiteB['dat']}
			];
			 this.chart[2].chart.config.data.labels = this.dataFrolineSiteA['lab'];
		});
	}




	// lineChart

	public lineChartOptions:any = {
		elements: {
			line: {
				tension: 0
			}
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					ticks: {
						callback: function(label) {
							return label/100+'k';
						},
						min: 0,
						stepSize: 100,
						beginAtZero: true,
						fontSize: 15,
						fontColor: 'lightgrey',
						maxTicksLimit: 5,
						padding: 25,
					},
					gridLines: {
						drawBorder: false,
					}
				}
			],
			xAxes : [ {
				gridLines : {
					display : false
				},
				ticks: {
					fontSize: 15,
					fontColor: 'lightgrey'
				}
			} ]
		},
		tooltips: {
			callbacks: {
				title: function() {
					return 'Earning ($)'
				},
				label: function(tooltipItem, data) {
					return data['datasets'][0]['data'][tooltipItem['index']];
				}
			},
			titleFontSize: 16,
			titleFontColor: '#ffffff',
			bodyFontColor: '#ffffff',
			bodyFontSize: 18,
			displayColors: false
		}
	};
	public lineChartColors:Array<any> = [
		{
			backgroundColor: 'transparent',
			borderColor: '#1e90ff',
			pointBackgroundColor: '#1e90ff',
			pointBorderColor: '#1e90ff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	];
	public Legend:boolean = false;
	public lineChartType:string = 'line';

	//Doughnut
	public doughnutChartType:string = 'doughnut';
	public doughnutChartColors:Array<any> = [
		{
			backgroundColor: ['#eceff1', '#745af2', '#26c6da', '#1e88e5'],
			borderColor: ['#eceff1', '#745af2', '#26c6da', '#1e88e5'],
			hoverBackgroundColor: ['#eceff1', '#745af2', '#26c6da', '#1e88e5'],
			hoverBorderColor: ['#eceff1', '#745af2', '#26c6da', '#1e88e5'],
			hoverBorderWidth: [5,5,5,5]
		}
	];
	public doughnutChartOptions:any = {
		responsive: true,
		tooltips: {
			callbacks: {
				title: function(tooltipItem, data) {
					return data['labels'][tooltipItem[0]['index']];
				},
				label: function (tooltipItem, data) {
					return data['datasets'][0]['data'][tooltipItem['index']] + '%';
				}
			},
			titleFontSize: 16,
			titleFontColor: '#ffffff',
			bodyFontColor: '#ffffff',
			bodyFontSize: 18,
			displayColors: false
		}
	};


	public lineChartOptions1:any = {
		responsive: true,
		scales: {
			yAxes: [
				{
					ticks: {
						callback: function(label) {
							return label+'k';
						},
						min: 0,
						stepSize: 5,
						beginAtZero: true,
						fontSize: 15,
						fontColor: 'lightgrey',
						maxTicksLimit: 5,
						padding: 25,
					}
				}
			],
			xAxes : [ {
				ticks: {
					fontSize: 15,
					fontColor: 'lightgrey'
				}
			} ]
		},
		tooltips: {
			callbacks: {
				title: function() {
					return
				}
			},
			titleFontSize: 16,
			titleFontColor: '#ffffff',
			bodyFontColor: '#ffffff',
			bodyFontSize: 18,
			displayColors: false
		}
	};
	public lineChartColors1:Array<any> = [
		{
			backgroundColor: 'rgba(6, 215, 156,0.1)',
			borderColor: '#06d79c',
			pointBackgroundColor: '#06d79c',
			pointBorderColor: '#06d79c',
			pointHoverBackgroundColor: '#06d79c',
			pointHoverBorderColor: '#06d79c'
		},
		{
			backgroundColor: 'rgba(57, 139, 247,0.1)',
			borderColor: '#398bf7',
			pointBackgroundColor: '#398bf7',
			pointBorderColor: '#398bf7',
			pointHoverBackgroundColor: '#398bf7',
			pointHoverBorderColor: '#398bf7'
		}
	];


	public chartClicked(e:any):void {}
	public chartHovered(e:any):void {}
}