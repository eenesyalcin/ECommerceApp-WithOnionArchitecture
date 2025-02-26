import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ECommerceClient';

  ngOnInit(): void {}

}
