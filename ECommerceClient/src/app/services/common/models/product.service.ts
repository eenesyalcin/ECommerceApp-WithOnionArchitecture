import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/list-product';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductImage } from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
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

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: ListProduct[] }> {
    const promiseData: Promise<{ totalCount: number; products: ListProduct[] }> = this.httpClientService.get<{ totalCount: number; products: ListProduct[] }>({
      controller: "Test",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData
      .then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }


  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "Test",
    }, id);

    await firstValueFrom(deleteObservable);
  }


  async readImages(id: string, successCallBack?: () => void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
      action: "getproductimages",
      controller: "Test"
    }, id);

    const images: ListProductImage[] = await firstValueFrom(getObservable);
    successCallBack();

    return images;
  }


  async deleteImage(id: string, imageId: string, successCallBack?: () => void){
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "Test",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable)
    successCallBack();
  }

}
