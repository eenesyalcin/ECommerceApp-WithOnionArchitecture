import { Component, inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadComponent, FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { ListProductImage } from '../../contracts/list_product_image';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { OpenDialogService } from '../../services/common/open-dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  imports: [MatDialogModule, FileUploadComponent, MatButtonModule, MatCardModule, NgFor],
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  readonly data = inject<SelectProductImageState | string>(MAT_DIALOG_DATA);

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private dialogService: OpenDialogService
) {
    super(dialogRef);
    console.log("Dialog Service:", this.dialogService);
}


  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "Test",
    explanation: "Lütfen ürün resmini seçiniz veya sürükleyiniz.",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }

  images: ListProductImage[];

  async ngOnInit() {
    this.spinnerService.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string, () => this.spinnerService.hide(SpinnerType.BallAtom));
  }


  trackByFn(index: number, item: any) {
    return item.id;
  }


  async deleteImage(imageId: string) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinnerService.show(SpinnerType.BallAtom);
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinnerService.hide(SpinnerType.BallAtom);
          // DOM'dan doğrudan kaldırmadan önce Angular listesi güncelleniyor.
          this.images = this.images.filter(image => image.id !== imageId);
        });
      }
    });
  }
}


export enum SelectProductImageState {
  Close
}
