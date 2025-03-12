import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { CreateUser } from '../../../contracts/users/createUser';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) { }

  async create(user: User): Promise<CreateUser>{
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "user"
    }, user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "user",
      action: "login"
    }, {userNameOrEmail, password});

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      // Üretilen token local storage kısmına set edildi, yani eklendi.
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.toastrMessage("Kullanıcı girişi başarıyla sağlandı.", "GİRİŞ BAŞARILI", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }

}
