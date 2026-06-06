# The-Daily-Hub
# The Daily Hub

A lightweight, responsive single-page web application that provides real-time weather updates, task management, and daily inspiration in one place.

---

## Project Overview

The Daily Hub is a simple dashboard application built using HTML, CSS, and Vanilla JavaScript. It demonstrates core frontend development concepts such as API integration, asynchronous programming, DOM manipulation, event handling, state management, and responsive design.

The application combines three useful daily utilities:

* Current Weather Information
* Interactive Daily Checklist
* Quote of the Day

---

## Features

### Weather Widget

* Automatically detects the user's location using the Browser Geolocation API.
* Fetches real-time weather data from the Open-Meteo API.
* Displays:

  * Current location
  * Temperature
  * Weather condition

### Daily Checklist

* Add new tasks dynamically.
* Mark tasks as completed using checkboxes.
* Immediate visual feedback with strike-through styling.
* Updates the interface without refreshing the page.

### Quote of the Day

* Fetches a random inspirational quote from a public API.
* Displays both quote and author.
* Includes a fallback quote if the API request fails.

### Responsive Design

* Mobile-first layout.
* Adapts seamlessly across desktop, tablet, and mobile devices.
* Uses CSS Grid and flexible layouts for improved user experience.

---

## Screenshots

### Desktop View
<img width="1897" height="940" alt="image" src="https://github.com/user-attachments/assets/07086f46-03df-4af4-b596-f349234b8a1a" />


## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### APIs

* Open-Meteo API (Weather Data)
* DummyJSON Random Quote API

### Browser APIs

* Geolocation API

---

## Project Structure

```text
the-daily-hub/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

### File Description

#### index.html

Contains the structure and layout of the application.

#### style.css

Contains all styling, responsive layouts, animations, and visual design.

#### app.js

Handles:

* API requests
* Geolocation
* Task management
* DOM updates
* Event handling

---

## How to Run the Project Locally

### Option 1: Download ZIP

1. Download the project files.
2. Extract the folder.
3. Open `index.html` in any modern web browser.

### Option 2: Clone Repository

```bash
git clone <repository-url>
```

Open the project folder and launch:

```bash
index.html
```

No additional dependencies or installations are required.

---

## APIs Used

### Weather API

Open-Meteo API

Purpose:

* Retrieve current weather information based on user coordinates.

### Quote API

DummyJSON Random Quote API

Purpose:

* Fetch a random inspirational quote each time the page loads.

---

## Application Flow

### Weather Widget

1. User opens the application.
2. Browser requests location permission.
3. Coordinates are obtained.
4. Weather data is requested from Open-Meteo.
5. Weather information is displayed on the screen.

### Daily Checklist

1. User enters a task.
2. User clicks "Add Task".
3. Task is added to the checklist.
4. User can mark tasks as completed using checkboxes.

### Quote Widget

1. Application loads.
2. Random quote API is called.
3. Quote and author are displayed.

---

## Key Concepts Demonstrated

* Asynchronous Programming
* Fetch API
* Async/Await
* DOM Manipulation
* Event Handling
* Responsive Design
* State Management using JavaScript Objects and Arrays
* Error Handling
* Browser Geolocation API

---

## AI Usage Reflection

I used both ChatGPT and Google Gemini during the development process.

### How AI Was Used

* Understanding API integration and asynchronous JavaScript.
* Generating initial project structure ideas.
* Debugging JavaScript issues.
* Improving responsiveness and UI design.
* Reviewing code organization and documentation.
* Learning best practices for README creation.

### Useful Prompts

* "Create a weather widget using Open-Meteo API with HTML, CSS, and JavaScript."
* "How can I build a dynamic to-do list using Vanilla JavaScript?"
* "Suggest responsive CSS improvements for a dashboard application."
* "Generate a professional README for a frontend assessment project."

### Challenges and Fixes

Some AI-generated suggestions required modification to better fit project requirements and browser compatibility. All generated code was reviewed, tested, and understood before inclusion in the final application.

### What I Learned

* Working with REST APIs.
* Handling asynchronous operations using async/await.
* Managing application state in JavaScript.
* Updating the DOM dynamically.
* Building responsive user interfaces.

---

## Future Improvements

* Save tasks using Local Storage.
* Add task deletion functionality.
* Add weather icons and extended forecasts.
* Add dark mode support.
* Improve accessibility features.
* Add task categories and priorities.

---

## License

This project was developed as part of a frontend assessment assignment and is intended for educational and evaluation purposes.
