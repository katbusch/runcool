import * as React from "react";
import { PlacesAutocomplete } from './PlacesAutocomplete';

interface NavBarProps {
    onSearchSubmit: (lat: number, lon: number) => void;
}

export class LocationSearch extends React.Component<NavBarProps, undefined> {
    public render() {
        return (
            <div>
                <PlacesAutocomplete
                    searchSubmit={this.getCoords}
                    hintText="I will run in..."
                    textFieldStyle={{
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.54)',
                    }}
                />
            </div>
        );
    }

    getCoords = (lat: number, lon: number) => {
        console.log(lat + ',' + lon);
        this.props.onSearchSubmit(lat, lon);
    }
}
