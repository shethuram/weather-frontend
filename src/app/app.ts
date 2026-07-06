import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather';

@Component({
  selector: 'app-root',
  imports: [WeatherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Root wrapper component for the Weather Application
}
