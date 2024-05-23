import { Component, ViewChildren, QueryList } from '@angular/core';
import { TrafficLightComponent, TrafficLightColor  } from '../traffic-light/traffic-light.component';
import { CommonModule } from '@angular/common';
import { TrafficLightComponent2 } from '../traffic-light2/traffic-light2.component';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  imports: [CommonModule, TrafficLightComponent, TrafficLightComponent2],
  standalone: true
})
export class ControlPanelComponent {
  @ViewChildren(TrafficLightComponent) trafficLights!: QueryList<TrafficLightComponent>;
  @ViewChildren(TrafficLightComponent2) trafficLights2!: QueryList<TrafficLightComponent2>; 

  emergencyMode = false;
  private emergencyTimeout: any;
  private coolDownTimeout: any;
  buttonDisabled: boolean = false;

  onEmergency() {
    if (this.emergencyMode) return;

    this.emergencyMode = true;
    this.buttonDisabled = true;
    
    //L1
    this.trafficLights.forEach(light => {
      light.startEmergencyMode();
    });
    
    //L2
    this.trafficLights2.forEach(light => {
      light.startEmergencyMode();
    });

    //L1
    this.emergencyTimeout = setTimeout(() => {
      this.trafficLights.forEach(light => {
        light.stopEmergencyMode();
      });
      this.emergencyMode = false;
    }, 10000);  

    //L2
    this.emergencyTimeout = setTimeout(() => {
      this.trafficLights2.forEach(light => {
        light.stopEmergencyMode();
      });
      this.emergencyMode = false;
    }, 10000);

    this.coolDownTimeout = setTimeout(() => {
      this.buttonDisabled = false;
    }, 20000);
  }
}
