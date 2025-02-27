import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CreateProduct } from '../../../../contracts/create-product';
import { CreateProductService } from '../../../../services/common/models/create-product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent{

  constructor(
    private createProductService: CreateProductService,
    private alertify: AlertifyService,
    spinner: NgxSpinnerService,
  ){
    super(spinner);
  }

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const createProductObject: CreateProduct = new CreateProduct();
    createProductObject.name = name.value;
    createProductObject.price = parseFloat(price.value);
    createProductObject.stock = parseInt(stock.value)

    this.createProductService.create(createProductObject, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.alertifyMessage("Ürün başarıyla eklenmiştir.", {
        dismissOther: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.TopRight
      });
    });
  }

}
