// ==========================================
// 1. APPLICATION STATE (Source of Truth)
// ==========================================
let tasks = [
  { id: 1, text: 'Review project guidelines', completed: true },
  { id: 2, text: 'Build The Daily Hub application', completed: false }
];

// ==========================================
// 2. DOM CACHE TARGETS
// ==========================================
const taskListEl = document.getElementById('task-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

// ==========================================
// 3. REQUIREMENT 1: WEATHER ENGINE + GEOLOCATION
// ==========================================

// Orchestrator: Requests coordinates and fetches localized names + weather
function loadLocationAndWeather() {
  // Safe default fallback if user blocks permission: New Delhi, India
  const defaultLat = '28.6139';
  const defaultLon = '77.2090';
  const defaultName = 'New Delhi, India';

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch user's exact area and country before bringing down weather metrics
        const locationName = await fetchAreaAndCountry(lat, lon);
        initWeather(lat, lon, locationName);
      },
      (error) => {
        console.warn("Location permission denied. Utilizing default regional hub.");
        initWeather(defaultLat, defaultLon, defaultName);
      }
    );
  } else {
    initWeather(defaultLat, defaultLon, defaultName);
  }
}

// Sub-Service: Translates raw coordinates into human-readable Area, City, and Country
async function fetchAreaAndCountry(lat, lon) {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (!response.ok) throw new Error();
    const data = await response.json();

    // Pull out sub-locality/neighborhood if available, otherwise city, plus the country
    const area = data.locality || data.principalSubdivision || "";
    const city = data.city ? `, ${data.city}` : "";
    const country = data.countryName ? `, ${data.countryName}` : "";

    return `${area}${city}${country}`;
  } catch {
    // If the naming service drops, fall back to simple generic tag
    return "Current Location";
  }
}

// Sub-Service: Fetches current atmospheric data from Open-Meteo
async function initWeather(lat, lon, locationHeading) {
  const weatherContent = document.getElementById('weather-content');
  const locationLabel = document.querySelector('.weather-loc');
  
  if (locationLabel) {
    locationLabel.textContent = locationHeading;
  }

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`);
    if (!response.ok) throw new Error();
    
    const data = await response.json();
    const temp = Math.round(data.current_weather.temperature);
    const code = data.current_weather.weathercode;
    
    weatherContent.innerHTML = `
      <span class="temp">${temp}°C</span>
      <span class="condition">${getWmoDescription(code)}</span>
    `;
  } catch (error) {
    weatherContent.innerHTML = `<span style="color: #ef4444; font-size: 0.875rem;">Weather unavailable</span>`;
  }
}

function getWmoDescription(code) {
  if (code === 0) return 'Clear sky';
  if ([1, 2, 3].includes(code)) return 'Partly cloudy';
  if ([45, 48].includes(code)) return 'Foggy';
  if ([51, 53, 55, 61, 63, 65].includes(code)) return 'Raining';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowing';
  return 'Overcast';
}

// ==========================================
// 4. REQUIREMENT 2: CHECKLIST MODULE
// ==========================================
function renderTasks() {
  taskListEl.innerHTML = '';
  
  if (tasks.length === 0) {
    taskListEl.innerHTML = `<li class="empty-state">All caught up! Add a task above.</li>`;
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    taskListEl.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  todoInput.value = '';
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// ==========================================
// 5. REQUIREMENT 3: ASYNC QUOTE DELIVERY
// ==========================================
async function initQuote() {
  const textEl = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');

  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error();
    const data = await response.json();
    
    textEl.textContent = `"${data.quote}"`;
    authorEl.textContent = `— ${data.author}`;
  } catch {
    textEl.textContent = `"Simplicity is the soul of efficiency."`;
    authorEl.textContent = "— Austin Freeman";
  }
}

// ==========================================
// 6. INITIALIZATION WIRE UP
// ==========================================
todoForm.addEventListener('submit', addTask);

window.addEventListener('DOMContentLoaded', () => {
  loadLocationAndWeather();
  renderTasks();
  initQuote();
});