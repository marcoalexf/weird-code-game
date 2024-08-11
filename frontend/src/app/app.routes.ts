import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentspageComponent } from './paymentspage/paymentspage.component';
import { GridComponent } from './grid/grid.component';

export const routes: Routes = [
    { path: '', redirectTo: '/grid', pathMatch: 'full' },
    { path: 'payments', component: PaymentspageComponent },
    { path: 'grid', component: GridComponent },
    { path: '**', component: NotFoundComponent },
];
