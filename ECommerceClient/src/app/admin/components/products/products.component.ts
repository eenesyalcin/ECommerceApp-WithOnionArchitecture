import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService){
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);


    // GET
    this.httpClientService.get<Product[]>({
      controller: "Test"
    }).subscribe(data => console.log(data), error => console.log(error));


    // POST
    this.httpClientService.post({
      controller: "Test"
    }, {
      name: "Kalem",
      stock: 100,
      price: 15
    }).subscribe();


    // PUT
    this.httpClientService.put({
      controller: "Test",
    }, {
      id: "1050d0a8-6f2b-49f9-c78b-08dd56549a9c",
      name: "Renkli Kalem",
      stock: 1000,
      price: 300
    }).subscribe();


    // DELETE
    this.httpClientService.delete({
      controller: "Test"
    }, "ba976546-5e64-44b6-c794-08dd56549a9c").subscribe();


    // DIFFERENT ENDPOINT
    this.httpClientService.get({
      fullEndpoint: "https://jsonplaceholder.typicode.com/posts"
    }).subscribe(data => console.log(data));
  }

}
