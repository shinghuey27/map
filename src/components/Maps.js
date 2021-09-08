import React, { useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import "../App.scss";

const Maps = () => {
const initialState = {
  isOpen: false,
  coords: { lat: 40.756795, lng: -73.954298 },
  address: "",
}

  const [state, setState] = useState(initialState);
  // const [selectedAddress,setSelectedAddress] = useState(state.address)


  const handleChange = (address) => {
    setState({ address });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
   
      .then((latLng) =>
      
        setState({
          coords: latLng,
          address:address
        }),
        // setSelectedAddress(address)

      )
      .catch((error) => console.error("Error", error));
      // console.log("halo" + selectedAddress)

  };

  const handleToggleOpen =(evt)=>{
    setState({
      isOpen: true,
      coords: state.coords,
      address: state.address,
    });
    console.log("asdasd" + state.isOpen);

  };

  const GoogleMapExample = withGoogleMap((props) => (
    <GoogleMap defaultCenter={state.coords} defaultZoom={13}>
      <Marker
        key={props.index}
        position={state.coords}
        onClick={handleToggleOpen}
      >
        {state.isOpen && (
          <InfoWindow>
            <span>This is Info Window message!</span>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ));

  return (
    <div className="container">
      <PlacesAutocomplete
        value={state.address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="try">
            <TextField
              {...getInputProps({
                className: "location-search-input",
              })}
              id="outlined-basic"
              variant="outlined"
              label="Search Places"
              value={state.address}
              className="textfield"
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "#f9f9f9",
                      cursor: "pointer",
                      paddingBottom :"10px"
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      paddingBottom :"10px"



                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <GoogleMapExample
        containerElement={<div style={{ height: `100vh`, width: "80vw" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default Maps;
