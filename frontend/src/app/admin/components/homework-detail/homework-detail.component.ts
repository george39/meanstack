import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { HomeworkService } from '../../../services/homework.service';
import { UserService } from '../../../services/user.service';
import { Homework } from '../../../models/homework';

@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.component.html',
  styleUrls: ['./homework-detail.component.css'],
  providers: [HomeworkService, UserService]
})
export class HomeworkDetailComponent implements OnInit {
	public homework: Homework;
	public url: string;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _homeworkService: HomeworkService,
  	private _userService: UserService
  ) {
  	this.url = GLOBAL.url;
   }

  ngOnInit() {
  	this.getHomework();
  }

  getHomework(){
  	this._route.params.forEach((params: Params) => {
  		let id = params['id'];

  		this._homeworkService.getHomework(id).subscribe(
  			response => {
  				if(!response.homework){
  					this._router.navigate(['/']);
  				}else{
  					this.homework = response.homework;
  				}
  			},
  			error => {
  				console.log(<any>error);
  			}
  		)
  	});
  	
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Imprimir</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
