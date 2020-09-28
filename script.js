const apikey = "171ebf2d968bba22d8b8fafbcf4713fe";

const form = document.getElementById('form');
const search = document.getElementById('search');
const ptemp = document.getElementById('temp');
const pdesc = document.getElementById('desc');
const hname = document.getElementById('name');
const maxmin = document.getElementById('maxmin');
const icon = document.getElementById('image');
let date = document.querySelector('.date');


const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);
    addWeather(respData);

}

function KtoC(K) {
    return (K - 273.15).toFixed(2);
}

function addWeather(data) {
    ptemp.innerText = KtoC(data.main.temp) + "°C";
    hname.innerText = data.name + ", " + data.sys.country;
    icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    icon.width = "100";
    pdesc.innerText = data.weather[0].description;
    maxmin.innerText = KtoC(data.main.temp_min)+"/"+KtoC(data.main.temp_max);

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
    else {
        window.alert(city + " Not Found");
    }
    document.getElementById('form').reset();

})