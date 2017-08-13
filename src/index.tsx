import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { DisplayList } from "./components/DisplayList";
import { PaperHolder } from "./components/PaperHolder";
import { LocationSearch } from "./components/LocationSearch";
import { TabPicker } from './components/TabPicker';
import { SectionHeader } from './components/SectionHeader';
import { MuiTheme } from './components/MuiTheme';

import { Colors } from './constants';
import { getClothes, Intensity, Feel, State, Gender, Weather, Times } from "./state";
import * as util from './util';

// Needed for material-ui
injectTapEventPlugin();

const initialState: State = {
    gender: 'female',
    weather: { temp: 60, conditionsCode: 800, windSpeed: 5 },
    times: {
        sunriseMS: 1493730691000,
        sunsetMS: 1493780370000,
    },
    intensity: 'easy run',
    feel: 'in between',
};

class App extends React.Component<undefined, State> {
    constructor() {
        super();
        this.state = initialState;
    }

    onLatLonChange = (lat: number, lon: number) => {
        util.fetchWeatherInfo(lat, lon, (weather: Weather, times: Times) =>
            this.setState({ ...this.state, weather, times }));
    }

    onGenderChanged = (gender: Gender) => this.setState({ ... this.state, gender });

    onFeelChanged = (feel: Feel) => this.setState({ ... this.state, feel });

    onIntensityChanged = (intensity: Intensity) => this.setState({ ...this.state, intensity });

    render() {
        const feelValues: Feel[] = ['cool', 'in between', 'warm'];
        const intensityValues: Intensity[] = ['easy run', 'hard workout', 'long run', 'race'];
        const genderValues: Gender[] = ['female', 'male'];
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
                <div style={{ maxWidth: '780px', margin: 'auto', paddingTop: '40px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='left-panel' style={
                            { flexGrow: 2, minWidth: '200px', position: 'relative' }
                        }>
                            <PaperHolder>
                                <span className='title-text'>What should I wear on my run?</span>
                                <SectionHeader>Run Location</SectionHeader>
                                <LocationSearch
                                    onSearchSubmit={this.onLatLonChange}
                                />
                                <SectionHeader
                                    subheaderText="My clothes style is...">Gender</SectionHeader>
                                <TabPicker
                                    onSelectionChange={this.onGenderChanged}
                                    labels={['Female', 'Male']}
                                    values={genderValues}
                                />
                                <SectionHeader
                                    subheaderText="I want to feel...">Feel</SectionHeader>
                                <TabPicker
                                    onSelectionChange={this.onFeelChanged}
                                    labels={['Cool', 'Medium', 'Warm']}
                                    values={feelValues}
                                    initialSelectedValue='in between'
                                />
                                <SectionHeader
                                    subheaderText="My run will be...">Intensity</SectionHeader>
                                <TabPicker
                                    onSelectionChange={this.onIntensityChanged}
                                    labels={['Easy', 'Hard', 'Long', 'Race']}
                                    values={intensityValues}
                                />
                            </PaperHolder>
                        </div>
                        <div className='right-panel' style={
                            {
                                flexGrow: 1, minWidth: '270px', position: 'relative', top: '100px'
                            }
                        }>
                            <PaperHolder style={{
                                backgroundColor: Colors.secondaryBackgroundColor,
                                color: Colors.secondaryTextColor
                            }}>
                                <span style={{ fontSize: '20px', lineHeight: '30px' }}>
                                    Recommended outfit</span>
                                <DisplayList titles={getClothes(this.state)} />
                            </PaperHolder>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider >
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);
