import { Component, inject, model } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DeleteState } from '../delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-upload-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent> {

  readonly data = inject<DeleteState>(MAT_DIALOG_DATA);
  readonly animal = model(DeleteState.Yes);

  constructor(dialogRef: MatDialogRef<FileUploadDialogComponent>) {
    super(dialogRef);
  }

}

export enum FileUploadDialogState{
  Yes,
  No
}
