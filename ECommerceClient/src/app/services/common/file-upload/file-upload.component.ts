import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  imports: [NgxFileDropModule, NgIf, NgFor],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService
  ){}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => {
      const message: string = "Dosyalar başarıyla yüklendi."
      if(this.options.isAdminPage){
        this.alertifyService.alertifyMessage(message, {
          dismissOther: true,
          messageType: AlertifyMessageType.Success,
          position: AlertifyPosition.TopRight
        })
      }else{
        this.customToastrService.toastrMessage(message, "BAŞARILI", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
    }, (errorResponse: HttpErrorResponse) => {
      const message: string = "Dosyalar yüklenirken bir hata ile karşılaşıldı!"
      if(this.options.isAdminPage){
        this.alertifyService.alertifyMessage(message, {
          dismissOther: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyPosition.TopRight
        })
      }else{
        this.customToastrService.toastrMessage(message, "HATA", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight
        })
      }
    });

  }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
