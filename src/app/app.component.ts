import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GlobalDecorComponent} from "./global-decor/global-decor.component";
import {GlobalHeaderComponent} from "./global-header/global-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalDecorComponent, GlobalHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gamedash';
}
