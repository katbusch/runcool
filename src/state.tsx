/**
 * Application state and functions to modify it.
 */
export interface State {
    gender: Gender;
    weather: Weather;
    times: Times;
    intensity: Intensity;
    feel: Feel;
}

type Condition = 'clear' | 'overcast' | 'partly cloudy' | 'snow' | 'heavy rain' | 'light rain';
export type Wind = 'light wind' | 'heavy wind' | 'no wind';
export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

export type Gender = 'male' | 'female';
export type Intensity = 'hard workout' | 'race' | 'long run' | 'easy run';
export type Feel = 'cool' | 'in between' | 'warm';

export interface Weather {
    temp: number;
    conditionsCode: number;
    windSpeed: number;
}

export interface Times {
    sunriseMS: number;
    sunsetMS: number;
}

const runData: { [conditionsKey: string]: Array<string> } = require('./clothing.json');

// Map of weather condition codes to a simplified condition for the UI
// See https://openweathermap.org/weather-conditions
const conditionCodes: [number[], Condition][] = [
    [[200, 210, 230, 231, 232, 300, 301, 302, 310, 311, 313, 500, 501, 520, 521], 'light rain'],
    [[201, 202, 211, 212, 221, 312, 314, 321, 502, 503, 504, 511, 522, 531], 'heavy rain'],
    [[800, 801], 'clear'],
    [[802, 803], 'partly cloudy'],
    [[701, 711, 721, 804], 'overcast'],
    [[600, 601, 602, 611, 612, 615, 616, 620, 621, 611], 'snow']
];

function conditionsFromCode(code: number): Condition {
    for (const [codes, name] of conditionCodes) {
        if (codes.indexOf(code) !== -1) return name;
    }
    console.error('Unknown condition code ' + code);
    return 'clear';
}

function windFromSpeed(speed: number): Wind {
    if (speed < 1) {
        return 'no wind';
    }
    if (speed < 10) {
        return 'light wind';
    }
    return 'heavy wind';
}

function dateToMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
}

function timeOfDay(boundaryTimes: Times, dateToCheck: Date): TimeOfDay {
    const timeToCheck = dateToMinutes(dateToCheck);
    const sunrise = dateToMinutes(new Date(boundaryTimes.sunriseMS));
    const sunset = dateToMinutes(new Date(boundaryTimes.sunsetMS));
    // TODO use moment.js
    if (timeToCheck < sunrise - 40) {
        return 'night';
    }
    if (timeToCheck >= sunrise - 40 && timeToCheck < sunrise + 40) {
        return 'dawn';
    }
    if (timeToCheck >= sunrise + 40 && timeToCheck < sunset - 20) {
        return 'day';
    }
    if (timeToCheck >= sunset - 20 && timeToCheck < sunset + 40) {
        return 'dusk';
    }
    if (timeToCheck >= sunset + 40) {
        return 'night';
    }
}

const getRoundedTemp = (temp: number) => {
    if (temp < -10) {
        return -10;
    } else if (temp > 100) {
        return 100;
    } else {
        return Math.round(temp / 5) * 5;
    }
};

/**
 * Get the list of running clothing items appropriate to the given state
 * @param date Time to use for time of day calculation, defaults to the current time
 */
export function getClothes(state: State, clothingData = runData, date = new Date()): Array<string> {
    const gender = state.gender;
    const temp = getRoundedTemp(state.weather.temp);
    const condition = conditionsFromCode(state.weather.conditionsCode);
    const wind = windFromSpeed(state.weather.windSpeed);
    const time = timeOfDay(state.times, date);
    const key = [gender, temp, condition, wind, time, state.intensity, state.feel].join(',');
    return clothingData[key];
}
