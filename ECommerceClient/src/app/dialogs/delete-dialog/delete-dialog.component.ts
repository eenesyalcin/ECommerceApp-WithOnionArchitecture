import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent> {

  readonly data = inject<DeleteState>(MAT_DIALOG_DATA);
  readonly animal = model(DeleteState.Yes);

  constructor(dialogRef: MatDialogRef<DeleteDialogComponent>) {
    super(dialogRef);
  }

}

export enum DeleteState {
  Yes,
  No
}
