import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) {}

  toastrMessage(message: string, title: string, toastrOptions: Partial<ToastrOptions>){
    this.toastr[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position,
      timeOut: toastrOptions.timeOut,
      progressBar: true
    });
  }

}

export class ToastrOptions{
  messageType: ToastrMessageType;
  position: ToastrPosition;
  timeOut: number = 3000;
}

export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

export enum ToastrPosition{
  TopRight = "toast-top-right",
  TopLeft = "toast-top-left",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}
