import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: any, errorCallBack?: any) {
    this.httpClientService.post({
      controller: "Test"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      if (typeof errorResponse.error === 'object' && !Array.isArray(errorResponse.error)) {
        Object.entries(errorResponse.error).forEach(([key, values]) => {
          if (Array.isArray(values)) {
            values.forEach(value => {
              message += `${value}<br>`;
            });
          }
        });
      } else if (Array.isArray(errorResponse.error)) {
        errorResponse.error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
      } else {
        message = "Beklenmedik bir hata oluştu.";
      }
      errorCallBack(message);
    });
  }
}
