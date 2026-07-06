# Aether Weather Forecast Dashboard

A simple, premium weather forecast dashboard built with Angular 22, designed with glassmorphic elements, hover feedback, shimmer loading skeletons, and interactive Celsius/Fahrenheit toggle control.

It queries the live weather API endpoint:
`https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast`

---

## 🌟 Key Features

- **Angular 22 Signals**: Engineered utilizing modern reactive patterns for instant, lag-free state transitions.
- **Glassmorphic Theme**: Designed with custom CSS variables, backdrop blurs, and glow highlights.
- **Weather Summary Badge Mapping**: Automatically color-categorizes summaries (Freezing, Cool, Mild, Hot, Scorching) with unique visual themes and custom icons.
- **Temperature Unit Switcher**: Toggle easily between Celsius (°C) and Fahrenheit (°F).
- **Responsive Layout**: Designed with fluid typography and a CSS grid layout, looking crisp across desktops, tablets, and phones.
- **Automated Deployment**: Fully configured CI/CD pipeline using GitHub Actions to deploy straight to GitHub Pages.

---

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Server**:
   ```bash
   npm start
   # or
   ng serve
   ```
   Open `http://localhost:4200` to view the application.

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🌐 GitHub Pages CI/CD Setup

This project contains a GitHub Actions workflow in `.github/workflows/deploy.yml` that builds and deploys the application automatically whenever you push code to `main` (or `master`).

Follow these simple steps to host your application:

1. **Create Repository**:
   Create a new public/private repository on GitHub named, for example, `weather-frontend`.

2. **Commit and Push Code**:
   Inside this directory, run the following commands to link your repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit with Angular weather app and workflow"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

3. **Configure Pages Settings**:
   - Go to your repository settings page on GitHub: `Settings` -> `Pages`.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**. (Do not select Deploy from Branch, as the workflow manages this).

4. **Verify Deployment**:
   - Navigate to the **Actions** tab in your GitHub repository to watch the deployment run.
   - Once completed, the deployment URL will be generated (typically `https://<your-username>.github.io/<your-repo-name>/`).
