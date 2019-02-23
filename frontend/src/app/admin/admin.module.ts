//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
//import 'angular-barcode';
import { NgxBarcodeModule } from 'ngx-barcode';

//servicios
import { UserService } from '../services/user.service';
import { AdminGuard } from '../services/admin.guard';
import { SearchPipe } from './pipes/search.pipe';
import { BarcodeWarehouse1 } from './pipes/barcodewarehouse1.pipe';

//Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { ListOperatorsComponent } from './components/list-operators/list-operators.component';
import { AddReferenceComponent } from './components/add-reference/add-reference.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { AdminComponent } from './admin.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { HomeworkDetailComponent } from './components/homework-detail/homework-detail.component';
import { HomeworkEditComponent } from './components/homework-edit/homework-edit.component';
import { AddWarehouse1Component } from './components/add-warehouse1/add-warehouse1.component';
import { ListWarehouse1Component } from './components/list-warehouse1/list-warehouse1.component';



@NgModule({
	declarations: [
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent,		
		ListOperatorsComponent,
		AddReferenceComponent,
		AddHomeworkComponent,
		AdminComponent,
		BarcodeComponent,
		HomeworkDetailComponent,
		HomeworkEditComponent,
		SearchPipe,
		BarcodeWarehouse1,
		AddWarehouse1Component,
		ListWarehouse1Component
		
		
		
		
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		AdminRoutingModule,
		NgxBarcodeModule
		
	],
	exports:[
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent
	],
	providers: [
		UserService,
		AdminGuard
	]
})

export class AdminModule {}