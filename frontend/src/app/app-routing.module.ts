import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentspageComponent } from './paymentspage/paymentspage.component';
import { CodeComponent } from './code/code.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  { path: '', redirectTo: '/code', pathMatch: 'full' },
  { path: 'payments', component: PaymentspageComponent },
  { path: 'code', component: CodeComponent },
  { path: '**', component: NotFoundComponent }, // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
