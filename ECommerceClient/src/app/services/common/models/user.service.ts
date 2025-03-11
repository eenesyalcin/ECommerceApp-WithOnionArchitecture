import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { CreateUser } from '../../../contracts/users/createUser';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<CreateUser>{
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "user"
    }, user);

    return await firstValueFrom(observable) as CreateUser;
  }

}
