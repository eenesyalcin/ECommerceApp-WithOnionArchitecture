import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/create-product';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: any){
    this.httpClientService.post({
      controller: "Test"
    }, product).subscribe(result => {
      successCallBack();
    });
  }
}
