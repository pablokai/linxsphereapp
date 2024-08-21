import { Routes } from '@angular/router';
import { HomeComponent } from './admin/pages/home/home.component';
import { EmpleadosComponent } from './admin/pages/empleados/empleados.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { AppComponent } from './app.component';
import { ɵdevModeEqual } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => //se usa lazy loading para cargar como hijo el admin module
            import('./admin/admin.module')
                .then(module => module.AdminModule),
                

        
        // {
        //     path: '',
        //     component: HomeComponent,
        // },
        // {
        //     path: 'inicio',
        //     component: HomeComponent
        // },
        // {
        //     path: 'empleados',
        //     component: EmpleadosComponent
        // }
    }  
];
