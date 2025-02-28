import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {

  readonly dialog = inject(MatDialog);

  @Input() id: string;
  @Input() controller: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    // Daha önce eklenmiş bir resim olup olmadığını kontrol et
    if (this.element.nativeElement.querySelector("img.delete-icon")) {
      return; // Eğer zaten img varsa, tekrar ekleme
    }

    // Yeni img oluştur
    const img = this._renderer.createElement("img");
    img.setAttribute("src", "/delete.png");
    img.setAttribute("style", "cursor: pointer");
    img.width = 30;
    img.height = 30;
    img.classList.add("delete-icon"); // Benzersiz class ekleyerek çift eklenmeyi önlüyoruz

    // Elemente img ekle
    this._renderer.appendChild(this.element.nativeElement, img);

    // Click event ekleyerek dialog açma
    this._renderer.listen(img, "click", () => {
      this.onClick();
    });
  }

  @HostListener("click")
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 700, () => {
          this.callBack.emit();
          this.alertify.alertifyMessage("Ürün başarıyla silinmiştir.", {
            dismissOther: true,
            messageType: AlertifyMessageType.Success,
            position: AlertifyPosition.TopRight
          });
        });
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertify.alertifyMessage("Ürün silinirken beklenmeyen bir hata ile karşılaşıldı!", {
          dismissOther: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyPosition.TopRight
        })
      }); 
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }

}
