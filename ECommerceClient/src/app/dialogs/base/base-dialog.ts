import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent>{
    constructor(public dialogRef: MatDialogRef<DialogComponent>){}

    close(){
        console.log("BİR DEFA TETİKLENDİ")
        this.dialogRef.close();
    }
}
