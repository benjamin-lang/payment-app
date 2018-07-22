import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PageDto, Payment} from './Payment';
import {PaymentsService} from './payments.service';
import {NewPaymentComponent} from '../new-payment/new-payment.component';
import {MatDialog, MatPaginator, MatSort, PageEvent, Sort} from '@angular/material';
import {merge, Observable, of} from "rxjs";
import {fromMatPaginator, fromMatSort, paginateRows, sortRows} from "./datasource-utils";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {log} from "util";

//https://stackblitz.com/edit/table-like-mat-accordion?file=app%2Fapp.component.ts
//https://stackblitz.com/angular/mxoemeygmlk?file=app%2Ftable-http-example.ts

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements AfterContentInit {
  pageDto: PageDto = null;
  totalCount: number;
  payments: Payment[] = [];
  isLoadingResults = false;

  animal: string;
  name: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private paymentsService: PaymentsService, public dialog: MatDialog) {
  }

  ngAfterContentInit () {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;

        if (this.pageDto == null)
          return this.paymentsService.getPayments(this.paginator.pageSize, null);

        return this.paymentsService.getPayments(this.paginator.pageSize, this.pageDto.ContinuationToken);
      }),
      map(page => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.totalCount = page.TotalCount;

        return page;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        return of(null);
      })
    ).subscribe(page => {
      this.payments = page.Payments;
      this.totalCount = page.TotalCount;
      this.pageDto = page

      console.log(this.pageDto)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPaymentComponent, {
      width: '450px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

