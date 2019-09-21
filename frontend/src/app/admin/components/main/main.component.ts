import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [UserService]
})
export class MainComponent implements OnInit {
	title = 'Panel de administración';	
	public user: User;
	public token;
	public identity;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService
  ) { }

  ngOnInit() {
  	this.admins();
  }

  admins(){
  	this.identity = this._userService.getIdentity();
  	if(this.identity.role == 'ROLE_ALMACEN1'){  		
  		return true;
  	}
  	
  }

}
