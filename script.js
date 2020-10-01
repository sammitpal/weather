apikey = "668c962f5577e05bd4166493d270799e";
const form = document.getElementById('form');
const search = document.getElementById('search');
const ptemp = document.getElementById('temp');
const pdesc = document.getElementById('desc');
const hname = document.getElementById('name');
const maxmin = document.getElementById('maxmin');
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
    ptemp.innerText = KtoC(data.main.temp) + "°";
    hname.innerText = data.name + ", " + data.sys.country;
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