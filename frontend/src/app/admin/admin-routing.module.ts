import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { AddReferenceComponent } from './components/add-reference/add-reference.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { ListOperatorsComponent } from './components/list-operators/list-operators.component';
import { AdminGuard } from '../services/admin.guard';
import { RegisterComponent } from '../components/register/register.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { HomeworkDetailComponent } from './components/homework-detail/homework-detail.component';
import { HomeworkEditComponent } from './components/homework-edit/homework-edit.component';
import { AddWarehouse1Component } from './components/add-warehouse1/add-warehouse1.component';
import { ListWarehouse1Component } from './components/list-warehouse1/list-warehouse1.component';


const adminRoutes: Routes = [
	{
		path: 'admin-panel',
		component: MainComponent,
		canActivate: [AdminGuard],		
		children: [
			{path: '', redirectTo: 'home', pathMatch: 'full'},
			{path: 'listado-tareas', component: ListComponent},
			{path: 'crear-operario', component: RegisterComponent},
			{path: 'editar', component: EditComponent},
			{path: 'crear-referencia', component: AddReferenceComponent},
			{path: 'crear-tarea', component: AddHomeworkComponent},
			{path: 'listado-operarios', component: ListOperatorsComponent},
			{path: 'codigo-barras/:id', component: BarcodeComponent},
			{path: 'detalles-tarea/:id', component: HomeworkDetailComponent},
			{path: 'editar-tarea/:id', component: HomeworkEditComponent},
			{path: 'insertar-registro', component: AddWarehouse1Component},
			{path: 'lista-registro', component: ListWarehouse1Component},

		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule { }