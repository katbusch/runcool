import * as React from "react";
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import MapsPlace from 'material-ui/svg-icons/maps/place';

interface PlacesAutocompleteProps {
    searchSubmit?: (lat: number, lon: number) => void;
    hintText?: string;
    textFieldStyle?: React.CSSProperties;
}

interface PlacesAutocompleteState {
    results: string[];
}

export class PlacesAutocomplete extends
    React.Component<PlacesAutocompleteProps, PlacesAutocompleteState> {

    private placesService: google.maps.places.AutocompleteService;
    private geocoder: google.maps.Geocoder;

    // tslint:disable-next-line max-line-length
    private GOOGLE_LOGO_SRC = "https://developers.google.com/places/documentation/images/powered-by-google-on-white.png";
    private CURRENT_LOCATION_TEXT = 'My Location';

    constructor(props: PlacesAutocompleteProps) {
        super(props);
        this.placesService = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
        this.state = { results: [] };
    }

    private onAutocompleteResult = (
        predictions: google.maps.places.AutocompletePrediction[],
        status: google.maps.places.PlacesServiceStatus): void => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        this.setState({ results: predictions.map(prediction => prediction.description) });
    }

    private onGeocodeResult = (
        results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus
    ) => {
        if (status !== google.maps.GeocoderStatus.OK) {
            console.error(status);
            return;
        }
        this.props.searchSubmit(
            results[0].geometry.location.lat(), results[0].geometry.location.lng()
        );
    }

    queryLocation = () => {
        const geoSuccess = (position: { coords: { latitude: number, longitude: number } }) => {
            this.props.searchSubmit(position.coords.latitude, position.coords.longitude);
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, undefined);
    }

    private onNewRequest = (chosenRequest: { text: string }) => {
        // TODO: use place id
        if (chosenRequest.text === this.CURRENT_LOCATION_TEXT) {
            this.queryLocation();
        } else {
            this.geocoder.geocode({ address: chosenRequest.text }, this.onGeocodeResult);
        }
    }

    private menuItems = () => {
        const currentLocationItem = {
            text: this.CURRENT_LOCATION_TEXT,
            value: <MenuItem
                primaryText={this.CURRENT_LOCATION_TEXT}
                leftIcon={<MapsMyLocation />} />,
        };
        const resultsItems = this.state.results.map(result => (
            {
                text: result,
                value: <MenuItem
                    primaryText={result}
                    leftIcon={<MapsPlace />} />,
            }));
        return [currentLocationItem].concat(resultsItems);
    }

    render() {
        return <div>
            <AutoComplete
                dataSource={this.menuItems()}
                onUpdateInput={
                    (searchText: string) => {
                        if (searchText === '') {
                            return;
                        }
                        this.placesService.getPlacePredictions(
                            { input: searchText }, this.onAutocompleteResult);
                    }
                }
                filter={AutoComplete.noFilter}
                onNewRequest={this.onNewRequest}
                hintText={this.props.hintText}
                textFieldStyle={this.props.textFieldStyle}
                fullWidth={true}
                openOnFocus={true}
            />
            <div>
                <img src={this.GOOGLE_LOGO_SRC} style={{ float: 'right', height: '10px' }} />
            </div>
        </div>;
    }
}
