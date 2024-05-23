import { Component, ViewChildren, QueryList } from '@angular/core';
import { TrafficLightComponent, TrafficLightColor  } from '../traffic-light/traffic-light.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  imports: [CommonModule, TrafficLightComponent],
  standalone: true
})
export class ControlPanelComponent {
  @ViewChildren(TrafficLightComponent) trafficLights!: QueryList<TrafficLightComponent>;

  emergencyMode = false;
  private emergencyTimeout: any;
  private coolDownTimeout: any;
  buttonDisabled: boolean = false;

  onEmergency() {
    if (this.emergencyMode) return;

    this.emergencyMode = true;
    this.buttonDisabled = true;
    this.trafficLights.forEach(light => {
      clearInterval(light['interval']);
      light.currentColor = TrafficLightColor.Yellow;
    });

    this.emergencyTimeout = setTimeout(() => {
      this.emergencyMode = false;
      this.trafficLights.forEach(light => light.startCycle());
    }, 10000);

    this.coolDownTimeout = setTimeout(() => {
      this.buttonDisabled = false;
    }, 20000);
  }
}
