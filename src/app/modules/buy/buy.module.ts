import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyMovieComponent } from './buy-movie/buy-movie.component';
import { RouterModule } from '@angular/router';
import {
   MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
   MatStepperModule, MatCheckboxModule, MatListModule, MatDividerModule, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { UserModule } from '../../user/user.module';
import { MovieModule } from '@modules/movie/movie.module';
import { SharedModule } from '../../shared/shared.module';
import { ScheduleResolver } from '@services/resolver/schedule.resolver';

const materials = [
   MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule,
   MatCheckboxModule, MatButtonModule, MatStepperModule, MatListModule, MatDividerModule
];

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule, SharedModule, UserModule, MovieModule,
      RouterModule.forChild([
         { path: 'ticket/:id', component: BuyTicketComponent, resolve: { schedule: ScheduleResolver } }
      ]),
      ...materials
   ],
   declarations: [BuyMovieComponent, BuyTicketComponent, SeatLayoutComponent, PaymentFormComponent],
})
export class BuyModule { }