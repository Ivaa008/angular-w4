import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export enum TrafficLightColor {
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green'
}

@Component({
  selector: 'app-traffic-light-reverse',
  templateUrl: './traffic-light2.component.html',
  styleUrls: ['./traffic-light2.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class TrafficLightComponent2 implements OnInit, OnDestroy {
  @Input() direction: string = '';
  currentColor: TrafficLightColor = TrafficLightColor.Green;
  buttonDisabled: boolean = true;
  emergencyMode: boolean = false;

  public TrafficLightColor = TrafficLightColor;

  private colorCycle: TrafficLightColor[] = [TrafficLightColor.Green,TrafficLightColor.Yellow, TrafficLightColor.Red, TrafficLightColor.Yellow];
  

  private index = 0;
  private interval: any;
  private timeout: any;
  private emergencyInterval: any;

  ngOnInit() {
    this.startCycle();
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  clearTimers() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.emergencyInterval) {
      clearInterval(this.emergencyInterval);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCycle() {
    if (this.emergencyMode) return;
    this.setColor();
    this.scheduleNextChange();
  }

  setColor() {
    this.currentColor = this.colorCycle[this.index];
    this.buttonDisabled = this.currentColor === TrafficLightColor.Red;
  }

  getIntervalTime() {
    switch (this.currentColor) {
      case TrafficLightColor.Red:
      case TrafficLightColor.Green:
        return 5000;
      case TrafficLightColor.Yellow:
        return 2000;
      default:
        return 5000;
    }
  }

  scheduleNextChange() {
    this.timeout = setTimeout(() => {
      this.index = (this.index + 1) % this.colorCycle.length;
      this.setColor();
      this.scheduleNextChange();
    }, this.getIntervalTime());
  }

  startEmergencyMode() {
    this.emergencyMode = true;
    this.clearTimers();

    this.currentColor = TrafficLightColor.Yellow;
    this.buttonDisabled = true;

    this.emergencyInterval = setInterval(() => {
      this.currentColor = this.currentColor === TrafficLightColor.Yellow ? TrafficLightColor.Green : TrafficLightColor.Yellow;
    }, 500);
  }

  stopEmergencyMode() {
    this.clearTimers();
    this.emergencyMode = false;
    this.index = 0; // Reset to start from green again
    this.startCycle();
  }

  onCross() {
    if (this.currentColor === TrafficLightColor.Yellow) {
      alert('Неправилно пресичане');
    }
  }
}
