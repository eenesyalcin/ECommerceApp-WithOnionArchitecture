import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'; 

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet ,HeaderComponent, SidebarComponent, FooterComponent, MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
