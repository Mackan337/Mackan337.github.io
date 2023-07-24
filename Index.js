


function handleKeyPress(event) {
    if (event.keyCode == 13) {
      Getlocation();
    }
  }
  
  async function Getlocation() {

    function formatTime(dateTimeStr) {
      const date = new Date(dateTimeStr);
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    }
    const Textinput = document.getElementById('Location');
    const locationValue = Textinput.value;
    console.log(locationValue);

    const LocationInfo = document.getElementById('Locationinfo');
    LocationInfo.textContent = locationValue

    //Api url to retrive the latitude and longitude from Openstreetmap
    const api_Url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationValue)}&format=json`;


    const response_cords = await fetch(api_Url);

    const data = await response_cords.json();
    //taking out the lon and lat from the response
    const longitude = Number(parseFloat(data[0].lon).toFixed(6));
    const latitude = Number(parseFloat(data[0].lat).toFixed(6));
    console.log("Longitude: " + longitude + "Latitude: " + latitude);
    //the smhi weather forecast api url, using the lon and lat from the other api req
    const api_Url_Weather = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

    const response = await fetch(api_Url_Weather);

    const data_weather = await response.json();
    console.log(data_weather);

    data_weather.timeSeries.forEach((timeData) => {
        const validTime = timeData.validTime;
        const parameters = timeData.parameters;
    
        // Extract specific parameters of interest (You may choose other parameters based on your requirements)
        const temperature = parameters.find((param) => param.name === "t").values[0];
        const windSpeed = parameters.find((param) => param.name === "ws").values[0];
        const precipitation = parameters.find((param) => param.name === "pmean").values[0];
    
        // Format the time using the formatTime function
        const formattedTime = formatTime(validTime);
    
        // Create a new row and insert it into the table
        const tableBody = document.getElementById('weather-data-container');
        const newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.innerHTML = `
          <div class="cell">${formattedTime}</div>
          <div class="cell">${temperature} °C</div>
          <div class="cell">${windSpeed} m/s</div>
          <div class="cell">${precipitation} mm/h</div>
        `;
        tableBody.appendChild(newRow);

        const LocationInfo = document.getElementById('Locationinfo');
        LocationInfo.textContent = locationValue
    
        console.log(`Valid Time: ${formattedTime}`);
        console.log(`Temperature: ${temperature} °C`);
        console.log(`Wind Speed: ${windSpeed} m/s`);
        console.log(`Precipitation: ${precipitation} mm/h`);
        console.log("--------------------------------------");
      });
    }


    
    










var myVar = setInterval(function() {
    myTimer();
  }, 1000);
  
  function myTimer() {
    var d = new Date();
    document.getElementById("clock").innerHTML = d.toLocaleTimeString();
  }
    
    

    
