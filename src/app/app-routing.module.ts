import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaymentsComponent} from './payments/payments.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPaymentComponent} from './new-payment/new-payment.component';

const routes: Routes = [
  { path: '', component: NewPaymentComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'payments', component: PaymentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
