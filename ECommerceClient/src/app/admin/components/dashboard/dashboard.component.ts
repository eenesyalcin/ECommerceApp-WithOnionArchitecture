import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {}

}
