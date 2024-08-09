// Challenge: get a random image from Unslapsh and set it as the background

// Part 1:

// URL: https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature
// (You can change the "query" at the end to whatever theme you want)

// Change the bodys background image to:
// url (<insert the URL of the image from the API here)

// (You may need to dig around the response body a bit to find this URL)

// (Note: Ive already added some CSS to resize the image within the window
// Instruction for this were found on CSS Tricks:
// https://css-tricks.com/perfect-full-page-background-image/#awesome-easy-progressive-css3-way)


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=43324")
.then(res => res.json())
.then(data => {
    console.log(data.urls.regular)
    
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    
    document.getElementById("author").textContent = `By: ${data.user.name}`
})

.catch (err => {
    
    // Challenge: get a URL for a default background image and set it here

    // 1. Change the query in the URL above back to something real
    // 2. Log the image url to the console (replacing console)
    // 3. Use that URL as the "default" background image to 
    //    the promise is ever ejected
    
    // url:https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjA0MzI2ODR8&ixlib=rb-4.0.3&q=80&w=1080 index.js:21:13
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjA0MzI2ODR8&ixlib=rb-4.0.3&q=80&w=1080)`
    // Report the error to some kind of service

    document.getElementById("author").textContent = `By: Dodi`   
})



// Challenge: Get current data on cryptocurrency from the list below
// 1. bitcoin
// 2. dogecoin
// 3. etherum
// 4. litecoin


// 1. Search the API docs for an endpoint that will get you the "current data for a coin"
// (https://www.coingecko.com/api/documentations/v3#/)

// 2. Exwcute a test request from the API docs and skim through the data for anything that 
// you may find interesting to use in the dashboard



// Pull down the cryptocurrency data for dogecoin from the CoinGecko API and log it to the console

// Also add a .catch() method to console any errors that might occur to the console

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
      if (!res.ok) {
         throw Error("Something went wrong")


      }
      
      return res.json()


    })
 
    .then(data => {


        // Challenge: Add the name and icon of the crytocurrency
        // to the upper-left of the dashboard page
        
        // Use `data.name` and `data.image.small` to acces that info

        document.getElementById("crypto-top").innerHTML = `
        <img src = ${data.image.small} />
        <span>${data.name}</span>
         `
        // Challenge: Add the following data points underneath the name and icon
        // (1 paragraph each):

        // 1. Current price (data.market_data.current_price.usd)
        // 2. 24-hour high price (data.market_data.high_24h.usd)
        // 3. 24-hour high price (data.market_data.low_24h.usd)

        // Feel free to check the response data object for your own currency
        // if you dont want to use USD.
        document.getElementById("crypto").innerHTML += `
        <p>current price: ${data.market_data.current_price.usd}</p>
        <p>up: ${data.market_data.high_24h.usd}</p>
        <p>down: ${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

    // Challenge: log the current time to console, formatted like this:

    // 1:30 PM

    // Use Google and Stack overflow to find the best way

    // Good luck


    function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = (date.toLocaleTimeString("en-us", {timeStyle: "medium"}))
}


    // Challenges:

    // 1. Display the current time on the dashboard
    // 2. Update the current time every second

    // setInterval(getCurrentTime, 1000)

// Challenge: Learn how to acces the user's coordinates by using the Geolocation Web API!

// Log the user's position to the console.


// navigator.geolocation.getCurrentPosition(position =>{
//     console.log(position)
// });

// navigator.geolocation.getCurrentPosition() 
//     .then(position => {
//         console.log(position)
//     })

    // async function getLocation() {
    //     const position = await navigator.geolocation.getCurrentPosition()
    //     console.log(position)
    // }
 
    // navigator.geolocation.getCurrentPosition(position => {
    //     fetch("")
    // })  
    
    // Thought Experiment:
    
    // What would get current position() look like if it were
    // using promises instead of callbacks? Replace what we have
    // below with your best guess. (It won't function correctly)
    
    // navigator.geolocation.getCurrentPosition(position => {
    //     console.log(position)
    // });
    
    
    // Challenge: Get the user's current weather for their area
    // and log it to the console
    
    // BaseURL: https://apis.scrimba.com/openweathermap/data/2.5/weather
    // Queries to include:
    //     -lat (latitude)
    //     -lon (longtitude)
    //     -units (imperial or metric)
    
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            // console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}°</p>
                <p class="weather-city">${data.name}</p>
                
            `
            
                
        })
        .catch(err => console.error(err))
    });
    
    // position: GeolocationPosition
    // timestamp: 1720582010572 
    // coords: accuracy: 11346 
    // latitude: 14.2156
    // longitude: 121.1633 
    // altitude: null 
    // altitudeAccuracy: null 
    // heading: null
    // speed: null    
    
    
    // Challenge: Display the weather icon as an <img/>
    // inside the <div id="weather">
    
    // This site shows an example URL for the icon:
    // https://openweathermap.org/weather-conditions
    
    // Note: the weather icon is found instead data.weather, 
    // which is an array of weather for that area. 
    // You can just access the first item in that 
    // array to get the icon ID.
    
    // https://openweathermap.org/img/wn/10d@2x.png
    
    // Challenge: display the temperature (rounded to the nearest degree)
    // and the city. Don't worry about the layout for now.
    
    
    // {coord: {lon: 121.1633, lat: 14.2156}, weather: [{id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d'}], base: 'stations', main: {temp: 86.52, feels_like: 99.12, temp_min: 85.96, temp_max: 88.09, pressure: 1009, humidity: 77, sea_level: 1009, grnd_level: 1000}, visibility: 10000, wind: {speed: 1.48, deg: 248, gust: 2.24}, clouds: {all: 100}, dt: 1720591540, sys: {type: 2, id: 2084056, country: 'PH', sunrise: 1720560781, sunset: 1720607279}, timezone: 28800, id: 1720681, name: 'Calamba', cod: 200}
