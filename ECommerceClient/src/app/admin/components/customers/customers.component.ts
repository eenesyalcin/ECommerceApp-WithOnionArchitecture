import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner); // Burada BaseComponent'in constructor'ına biz parametre gönderdik. --> OOP Mantığı
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
  }

}
