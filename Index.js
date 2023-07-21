function handleKeyPress(event) {
    if (event.keyCode == 13)   {
        Getlocation();

    }
}


async function Getlocation() {
    const Textinput = document.getElementById('Location');
    const locationValue = Textinput.value;
    console.log(locationValue);

    //Api url to retrive the latitude and longitude from Openstreetmap
    const api_Url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationValue)}&format=json`;


    const response_cords = await fetch(api_Url);

    const data = await response_cords.json();
    //taking out the lon and lat from the response
    const longitude = data[0].lon;
    const latitude = data[0].lat;
    console.log("Longitude: " + longitude + "Latitude: " + latitude);
    //the smhi weather forecast api url, using the lon and lat from the other api req
    const api_Url_Weather = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

    const response = await fetch(api_Url_Weather);

    const data_weather = await response.json();
    console.log(data_weather);


    
   









}

var myVar = setInterval(function() {
    myTimer();
  }, 1000);
  
  function myTimer() {
    var d = new Date();
    document.getElementById("clock").innerHTML = d.toLocaleTimeString();
  }
    
    
