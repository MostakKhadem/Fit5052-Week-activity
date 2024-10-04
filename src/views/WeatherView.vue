<template>
  <div class="app-container">
    <div class="weather-container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>

      <main v-if="weatherData" class="weather-card">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div class="weather-info">
          <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
          <div class="weather-details">
            <p class="temperature">{{ temperature }}°C</p>
            <p class="description">{{ weatherData.weather[0].description }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = 'c1a712937de0e9234c448adb62fdd305'

export default {
  data() {
    return {
      city: '',
      weatherData: null
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273.15) : null
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  methods: {
    async searchByCity() {
      if (!this.city) {
        alert('Please enter a city name')
        return
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
      await this.fetchWeatherData(url)
    },
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          await this.fetchWeatherData(url)
        })
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  }
}
</script>

<style scoped>
/* Body styling */
.app-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #74ebd5, #acb6e5);
  font-family: 'Arial', sans-serif;
}

.weather-container {
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

.header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 70%;
  border: 2px solid #ccc;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #74ebd5;
}

.search-button {
  padding: 10px 20px;
  background-color: #74ebd5;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #56c6a9;
}

/* Weather Card */
.weather-card {
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.weather-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.weather-details {
  margin-left: 20px;
}

.temperature {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.description {
  font-size: 18px;
  color: #777;
  text-transform: capitalize;
}
</style>
