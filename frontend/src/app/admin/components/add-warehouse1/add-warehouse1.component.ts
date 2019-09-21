import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { GLOBAL } from '../../../services/global';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { UserService } from '../../../services/user.service';
import { Warehouse1 } from '../../../models/warehouse1';

@Component({
  selector: 'app-add-warehouse1',
  templateUrl: './add-warehouse1.component.html',
  styleUrls: ['./add-warehouse1.component.css'],
  providers: [UserService, Warehouse1Service]
})
export class AddWarehouse1Component implements OnInit {
	public title: string;
	public warehouse1: Warehouse1;
  public ware: Warehouse1;
	public identityd;
	public token;
	public url: string;
	public status;
  public register: String[];
  public my_register: string;
  public barcode;


  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _warehouse1Service: Warehouse1Service
  ) {
  	this.title = 'Ingresar registros';
  	this.warehouse1 = new Warehouse1('','','','', 0,'');
    this.ware = new Warehouse1('','','','', 0,'');
  	this.identityd = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = GLOBAL.url;
    this.register = new Array();

   }

  ngOnInit() {
    //this.getWarehouses1();
  }

  onSubmit(form){
  	this._warehouse1Service.addWarehouse1(this.token, this.warehouse1).subscribe(
  		response => {
  			if(!response.warehouse1){
  				this.status = 'error';
  			}else{
  				this.status = 'success';
  				this.warehouse1 = response.warehouse1;
          
  				//this._router.navigate(['/admin-panel/detalles-tarea/', this.warehouse1._id]);
  			}
        form.reset();
  		},
  		error => {
  			var errorMessage = <any>error;

  			if(errorMessage != null){
  				this.status = 'error';
  			}
  		}
  	);
  }

  addRegister(){
    this.register.push(this.my_register);
  }

  deleteRegister(indice){
    //delete this.register[indice];
    this.register.splice(indice, 1);
  }

  getWarehouses1(){
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if(!response.warehouse1){
          console.log('mierda');
        }else{
          this.warehouse1 = response.warehouse1;
          console.log(this.warehouse1);
          //this.addRegister();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getWarehouse1(){
    this._route.params.forEach((params: Params) => {
      let id = params['reference'];

      this._warehouse1Service.getWarehouse1(id).subscribe(
        response => {
          if(!response.ware){
            this._router.navigate(['/']);
          }else{
            //this._router.navigate(['/admin-panel/', this.ware.reference]);
            this.ware = response.ware;
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    });
    
  }


}
