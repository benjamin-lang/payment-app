import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PageDto, Payment} from './Payment';
import {PaymentsService} from './payments.service';
import {NewPaymentComponent} from '../new-payment/new-payment.component';
import {MatDialog, MatPaginator, MatSort, PageEvent, Sort} from '@angular/material';
import {merge, Observable, of} from "rxjs";
import {fromMatPaginator, fromMatSort, paginateRows, sortRows} from "./datasource-utils";
import {catchError, map, startWith, switchMap} from "rxjs/operators";

//https://stackblitz.com/edit/table-like-mat-accordion?file=app%2Fapp.component.ts
//https://stackblitz.com/angular/mxoemeygmlk?file=app%2Ftable-http-example.ts

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements AfterViewInit {
  pageDto: PageDto;
  totalCount: number;
  payments: Payment[] = [];

  animal: string;
  name: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private paymentsService: PaymentsService, public dialog: MatDialog) {
  }

  // ngOnInit() {
  //   this.getPayments();
  //
  //   const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
  //   const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
  //
  //   const rows$ = of(examplePayments);
  //
  //   this.totalRows$ = rows$.pipe(map(rows => rows.length));
  //   this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
  // }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.getPayments();
  }

  getPayments(): void {
    this.paymentsService.getPayments(this.paginator.pageSize, null).subscribe(pageDto => {
      this.pageDto = pageDto;
      this.payments = pageDto.Payments;
      this.totalCount = pageDto.TotalCount;
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

export const examplePayments: Payment[] = [
  {
    "id": "ff54b32d-606d-4529-b707-c863c69776a1",
    "dateOccurred": new Date('December 17, 1995 03:24:00'),
    "type": "DEBT",
    "category": "GROCERY",
    "subcategory": "Lebensmittel",
    "value": 1460,
    "note": "Aldi"
  },
  {
    "id": "d4a4c602-e65c-4ccd-8217-6c74c3e9eb40",
    "dateOccurred": new Date('December 18, 1995 03:24:00'),
    "type": "DEBT",
    "category": "GROCERY",
    "subcategory": "Lebensmittel",
    "value": 4801,
    "note": "aldi"
  }
];
