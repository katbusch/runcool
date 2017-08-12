import { expect } from 'chai';
import { getClothes, State, TimeOfDay, Wind } from '../src/state';

const dateFromTime = (hours: number, minutes: number) =>
    new Date(2017, 8, 6, hours, minutes);

const checkStateKey = (key: string, state: State, date = dateFromTime(12, 30)) => {
    const correctValue = ['yay'];
    const clothes = getClothes(state, { [key]: correctValue }, date);
    expect(clothes).to.deep.equal(correctValue);
};

const baseTestState: State = {
    gender: 'female',
    weather: { temp: 65, conditionsCode: 800, windSpeed: 5 },
    times: {
        sunriseMS: dateFromTime(6, 10).getTime(),
        sunsetMS: dateFromTime(19, 0).getTime(),
    },
    intensity: 'easy run',
    feel: 'in between',
};

describe('state tests', () => {
    it('correctly computes state key', () => {
        const correctKey = 'female,65,clear,light wind,day,easy run,in between';
        checkStateKey(correctKey, baseTestState);
    });

    it('should return no wind', () => {
        const windFromSpeed = (windSpeed: number, expectedWind: Wind) => {
            const correctKey = `female,65,clear,${expectedWind},day,easy run,in between`;
            checkStateKey(correctKey, {
                ...baseTestState,
                weather: { ...baseTestState.weather, windSpeed }
            });
        };
        windFromSpeed(0, 'no wind');
        windFromSpeed(5, 'light wind');
        windFromSpeed(20, 'heavy wind');
    });

    it('correctly computes tempurature', () => {
        const checkTemp = (temp: number, expectedTemp: string) => {
            const correctKey = `female,${expectedTemp},clear,light wind,day,easy run,in between`;
            checkStateKey(correctKey, {
                ...baseTestState,
                weather: { ...baseTestState.weather, temp }
            });
        };
        checkTemp(-30, '-10');
        checkTemp(-10, '-10');
        checkTemp(18, '20');
        checkTemp(20, '20');
        checkTemp(22, '20');
        checkTemp(100, '100');
        checkTemp(130, '100');
    });

    it('correctly computes time of day', () => {
        const checkTimeOfDay = (time: Date, expectedTime: TimeOfDay) => {
            const correctKey = `female,65,clear,light wind,${expectedTime},easy run,in between`;
            checkStateKey(correctKey, baseTestState, time);
        };
        checkTimeOfDay(dateFromTime(6, 0), 'dawn');
        checkTimeOfDay(dateFromTime(6, 30), 'dawn');
        checkTimeOfDay(dateFromTime(12, 30), 'day');
        checkTimeOfDay(dateFromTime(7, 30), 'day');
        checkTimeOfDay(dateFromTime(17, 40), 'day');
        checkTimeOfDay(dateFromTime(18, 40), 'dusk');
        checkTimeOfDay(dateFromTime(19, 0), 'dusk');
        checkTimeOfDay(dateFromTime(19, 30), 'dusk');
        checkTimeOfDay(dateFromTime(20, 30), 'night');
        checkTimeOfDay(dateFromTime(3, 30), 'night');
    });
});
