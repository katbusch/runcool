import { Weather, Times } from './state';

export function fetchWeatherInfo(lat: number, lon: number,
    onSuccess: (weather: Weather, times: Times) => void): void {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +
        '&APPID=89b51f79ad8a8998f6d112c907a9a815&units=imperial').then(
        (response) => {
            return response.json();
        }
        ).then((json: any) => {
            const temp = Number(json['main']['temp']);
            const conditionsCode = Number(json['weather'][0]['id']);
            const windSpeed = Number(json['wind']['speed']);
            const sunriseMS = Number(json['sys']['sunrise']) * 1000;
            const sunsetMS = Number(json['sys']['sunset']) * 1000;
            const weather: Weather = { temp, conditionsCode, windSpeed };
            const times: Times = { sunsetMS, sunriseMS };
            onSuccess(weather, times);
        });
}
