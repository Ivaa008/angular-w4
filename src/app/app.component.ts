import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ControlPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-w4';
}
