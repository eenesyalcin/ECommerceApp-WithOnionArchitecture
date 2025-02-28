import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { CreateProduct } from '../../../contracts/create-product';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  imports: [MatSidenavModule, CreateComponent, ListComponent, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdProduct: CreateProduct){
    this.listComponents.getProducts();
  }

}
