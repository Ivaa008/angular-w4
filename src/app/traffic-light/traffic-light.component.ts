import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export enum TrafficLightColor {
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green'
}

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class TrafficLightComponent implements OnInit, OnDestroy {
  @Input() direction: string = '';
  currentColor: TrafficLightColor = TrafficLightColor.Red;
  buttonDisabled: boolean = true;

  public TrafficLightColor = TrafficLightColor;

  private colorCycle: TrafficLightColor[] = [TrafficLightColor.Red,TrafficLightColor.Yellow, TrafficLightColor.Green, TrafficLightColor.Yellow];
  

  private index = 0;
  private interval: any;

  ngOnInit() {
    this.startCycle();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCycle() {
    this.setColor();
    this.interval = setInterval(() => {
      this.index = (this.index + 1) % this.colorCycle.length;
      this.setColor();
    }, this.getIntervalTime());
  }

  setColor() {
    this.currentColor = this.colorCycle[this.index];
    this.buttonDisabled = this.currentColor === TrafficLightColor.Red;
  }

  getIntervalTime() {
    if (this.currentColor === TrafficLightColor.Red || this.currentColor === TrafficLightColor.Green) {
      return 5000;
    } else {
      return 2000;
    }
  }

  onCross() {
    if (this.currentColor === TrafficLightColor.Yellow) {
      alert('Неправилно пресичане');
    }
  }
}
