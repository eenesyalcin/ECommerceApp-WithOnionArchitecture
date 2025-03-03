import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateProduct } from '../../../../contracts/create-product';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';
import { FileUploadComponent, FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FileUploadComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {
  
  @Output() createdProduct:  EventEmitter<CreateProduct> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "Test",
    explanation: "Resimleri sürükleyin veya seçiniz...",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg, .json"
  };

  constructor(
    private createProductService: ProductService,
    private alertify: AlertifyService,
    spinner: NgxSpinnerService,
  ) {
    super(spinner);
  }

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createProductObject: CreateProduct = new CreateProduct();
    createProductObject.name = name.value;
    createProductObject.price = parseFloat(price.value);
    createProductObject.stock = parseInt(stock.value)

    if (!name.value) {
      this.alertify.alertifyMessage("Lütfen ürün adı giriniz!", {
        dismissOther: true,
        messageType: AlertifyMessageType.Error,
        position: AlertifyPosition.TopRight
      });
      return;
    } else {
      if (name.value.length < 5) {
        this.alertify.alertifyMessage("Ürün adının uzunluğu 5 karakterden az olamaz!", {
          dismissOther: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyPosition.TopRight
        });
        return;
      } else if (name.value.length > 150) {
        this.alertify.alertifyMessage("Ürün adının uzunluğu 150 karakterden fazla olamaz!", {
          dismissOther: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyPosition.TopRight
        });
        return;
      } else {
        if (parseInt(price.value) < 0) {
          this.alertify.alertifyMessage("Fiyat bilgisi negatif olamaz!", {
            dismissOther: true,
            messageType: AlertifyMessageType.Error,
            position: AlertifyPosition.TopRight
          });
          return;
        } else {
          if (parseFloat(stock.value) < 0) {
            this.alertify.alertifyMessage("Stok sayısı negatif olamaz!", {
              dismissOther: true,
              messageType: AlertifyMessageType.Error,
              position: AlertifyPosition.TopRight
            });
            return;
          }
        }
      }
    }

    this.createProductService.create(createProductObject, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.alertifyMessage("Ürün başarıyla eklenmiştir.", {
        dismissOther: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.TopRight
      });
      this.createdProduct.emit(createProductObject);
    }, errorMessage => {
      this.alertify.alertifyMessage(errorMessage, {
        dismissOther: true,
        messageType: AlertifyMessageType.Error,
        position: AlertifyPosition.TopRight
      });
    });
  }

}
