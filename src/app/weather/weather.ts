import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherForecast } from '../weather.service';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class WeatherComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);

  // Reactive state management using Angular Signals
  readonly forecasts = signal<WeatherForecast[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  // Bonus 1: Display weather forecast count
  readonly totalRecords = computed(() => this.forecasts().length);

  ngOnInit(): void {
    this.fetchWeather();
  }

  fetchWeather(): void {
    this.loading.set(true);
    this.error.set(null);

    this.weatherService.getForecasts().subscribe({
      next: (data) => {
        this.forecasts.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching forecasts', err);
        this.error.set('Failed to connect to the weather service. Please check your network or try again.');
        this.loading.set(false);
      }
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
  }

  getWeatherIcon(summary: string): string {
    const s = summary.toLowerCase();
    if (s.includes('freezing') || s.includes('bracing')) return '❄️';
    if (s.includes('chilly') || s.includes('cool')) return '💨';
    if (s.includes('mild') || s.includes('warm') || s.includes('balmy')) return '⛅';
    if (s.includes('hot') || s.includes('sweltering') || s.includes('scorching')) return '☀️';
    return '🌡️';
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
}
