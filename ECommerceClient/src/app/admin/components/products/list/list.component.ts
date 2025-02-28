import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ListProduct } from '../../../../contracts/list-product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../../services/admin/alertify.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from '../../../../directives/admin/delete.directive';

@Component({
  selector: 'app-list',
  imports: [MatTableModule, MatPaginatorModule, DeleteDirective],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'update', "delete"];
  dataSource: MatTableDataSource<ListProduct> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private alertifyService: AlertifyService,
    spinner: NgxSpinnerService
  ){
    super(spinner);
  }

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalCount: number; products: ListProduct[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex: 0, this.paginator ? this.paginator.pageSize:5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.alertifyMessage(errorMessage, {
      dismissOther: true,
      messageType: AlertifyMessageType.Error,
      position: AlertifyPosition.TopRight
    }));
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  // delete(id, event: Event){
  //   alert(id);
  //   const img: HTMLImageElement = event.target as HTMLImageElement;
  //   const row = img.parentElement.closest('tr'); // Doğru <tr> seçimi
  //   $(row).fadeOut(2000);
  // }

  async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }

}
