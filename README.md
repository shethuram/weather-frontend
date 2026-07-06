# Weather Forecast Dashboard (Assignment submission)

A lightweight weather dashboard built using **Angular 22** that consumes a public REST API and displays weather forecast records inside a responsive, clean table, with automatic cloud deployments using **GitHub Actions**.

---

## 📌 Project Description

This application represents the submission for the **Deploy an Angular Weather Application using GitHub Actions and GitHub Pages** assignment. 

It retrieves live 5-day weather data from the following REST API:
`https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast`

### Key Features Implemented:
- **Part 1 & 2 (Component & Service)**: Refactored logic into a dedicated component (`WeatherComponent` under selector `<app-weather>`) consuming an Observable-based Angular `HttpClient` service (`WeatherService` in `weather.service.ts`).
- **Part 3 (UI Requirements)**: Built a table showcasing columns: `Date`, `Temperature (C)`, `Temperature (F)`, and `Summary`. Includes "Loading..." messages and user-friendly connection error cards.
- **CI/CD (Part 5 & 6)**: Configured a continuous deployment workflow under `.github/workflows/deploy.yml` triggering on push to `main` and deploying directly to GitHub Pages.
- **Bonus 1**: Dynamic record count indicator showing the total number of forecasts (`Total Forecast Records: 5`).
- **Bonus 2**: Conditionally binds background colors (`hot-highlight`) to table rows where `TemperatureC > 30` to visually call out extreme heat records.
- **Bonus 3**: A manual **Refresh** action button to reload data on demand.

---

## ⚙️ Project Specifications

- **Angular Version**: 22.0.4
- **CSS Style Guide**: Claude-style Dark Matte Minimalism
- **Deployment URL**: [https://shethuram.github.io/weather-frontend/](https://shethuram.github.io/weather-frontend/)

---

## 🚀 Installation & Local Run Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shethuram/weather-frontend.git
   cd weather-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local server**:
   ```bash
   npm start
   # or
   ng serve
   ```
   Open `http://localhost:4200` to view the application locally.

4. **Verify local production compile**:
   ```bash
   npm run build
   ```

---

## 🛠️ GitHub Actions Deployment Pipeline

The workflow defined in `.github/workflows/deploy.yml` automates:
1. Triggering on code push to the `main` branch.
2. Checking out the repository.
3. Setting up Node.js v22.
4. Installing NPM dependencies using `npm ci`.
5. Compiling Angular for production: `npx ng build --configuration production --base-href=/weather-frontend/`.
6. Deploying the static folder `dist/weather-frontend/browser` straight to GitHub Pages.
