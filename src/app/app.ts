import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  // Reactive state using Angular Signals
  readonly forecasts = signal<WeatherForecast[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly isFahrenheit = signal<boolean>(false);

  // Computed properties for summary statistics
  readonly averageTempC = computed(() => {
    const data = this.forecasts();
    if (!data.length) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.temperatureC, 0);
    return Math.round(sum / data.length);
  });

  readonly averageTempF = computed(() => {
    const data = this.forecasts();
    if (!data.length) return 32;
    const sum = data.reduce((acc, curr) => acc + curr.temperatureF, 0);
    return Math.round(sum / data.length);
  });

  readonly overallStatus = computed(() => {
    const avg = this.averageTempC();
    if (avg <= 5) return 'Freezing';
    if (avg <= 15) return 'Cool';
    if (avg <= 25) return 'Mild';
    return 'Hot';
  });

  ngOnInit(): void {
    this.fetchForecast();
  }

  fetchForecast(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<WeatherForecast[]>('https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast')
      .subscribe({
        next: (data) => {
          this.forecasts.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error fetching weather data', err);
          this.error.set('Failed to connect to the weather service. Please check your network or try again.');
          this.loading.set(false);
        }
      });
  }

  toggleUnit(): void {
    this.isFahrenheit.update(val => !val);
  }

  getWeatherClass(summary: string): string {
    const s = summary.toLowerCase();
    if (s.includes('freezing') || s.includes('bracing') || s.includes('chilly') || s.includes('cool')) {
      return 'weather-cold';
    }
    if (s.includes('mild') || s.includes('warm') || s.includes('balmy')) {
      return 'weather-mild';
    }
    return 'weather-hot';
  }

  getWeatherIcon(summary: string): string {
    const s = summary.toLowerCase();
    if (s.includes('freezing') || s.includes('bracing')) return '❄️';
    if (s.includes('chilly') || s.includes('cool')) return '💨';
    if (s.includes('mild') || s.includes('warm') || s.includes('balmy')) return '⛅';
    if (s.includes('hot') || s.includes('sweltering') || s.includes('scorching')) return '☀️';
    return '🌡️';
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC' // Keep date aligned with API strings
    });
  }
}
