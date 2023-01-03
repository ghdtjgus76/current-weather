import './App.css';
import React from 'react';
import axios from 'axios';

// our application is a weather app
// what will our app do?
// 1. we want to grab data from a database somewhere of the weather
// API Call (Application Programming Interface) JSON weather data
// STATE! plain javascript object that holds the current state of information
// dynamic data
// in our app we will be using Hooks to handle our weather data states

// useEffect hook tells our component app to do something
// after rendering

// FINISH THE FUNCTIONALITY OF WEATHER ALGO APP
// ADD & DISPLAY THE FOLLOWING DATA POINTS
// Humidity, Minimum Temp, and Weather Icons
function App() {
  const [allData, setAllData] = React.useState({
    city: '',
    country: '',
    temperature: '',
    humidity: '',
    minTemp: '',
    weatherIcon: '',
  });
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    // we add what we want to happen after rendering
    // fetch the database information the API call of weather
    fetchData('Seoul');
  }, []);

  const fetchData = async (city) => {
    // try catch error handling
    try {
      const APIKEY = 'e3808bd2077e5ba8429778e35a66c3c1';

      // axios is a library which will allow us to make requests to the backend with promises
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);

      setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemp: result.data.main.temp_min,
        weatherIcon: result.data.weather[0].icon,
      });
    } catch (e) {
      console.log('API not loaded correctly or loaded for the first time');
    }
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchData(search);
  }

  return (
    // the section tag in react for sections and the main tag for the main build
    // under main we will have sections for the form and for displaying results
    <main>
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          name='city' 
          placeholder='Location'
          value={search}
          onChange={handleChange}
        />
        <button htmlFor='city'>Search</button>
      </form>
      <section>
        <div className='header-div'>
          <div className='data'>
            <img src={'http://openweathermap.org/img/wn/'+ allData.weatherIcon + '@2x.png'} />
            <h1 className='title'>{allData.city}</h1>
          </div>
          <h2 className='location'>{allData.country}</h2>
        </div>

        <div className='weather-description'>
          <div>
            <h3>TEMPERATURE</h3>
            <p>{allData.temperature}°C</p>
          </div>
          <div>
            <h3>MINIMUM TEMPERATURE</h3>
            <p>{allData.minTemp}°C</p>
          </div>
          <div>
            <h3>HUMIDITY</h3>
            <p>{allData.humidity}%</p>
          </div>
        </div>
      </section>
    </div>
    </main>
  );
}

export default App;