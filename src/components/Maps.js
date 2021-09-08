import React, { useState } from "react";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";

import TextField from "@material-ui/core/TextField";
import "../App.scss";

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAkB5eGAVI247vmTmSlks3O6MnoDk8qOS8",
  });

 const initialState = [{
    id:0,
    isOpen: false,
    coords: { lat: 40.756795, lng: -73.954298 },
    address: "",
    url: "",
  }];

  
  const [state, setState] = useState(initialState);

  const onLoad = (autocomplete) => {
    setState({
      isOpen: state.isOpen,
      coords: state.coords,
      address: autocomplete,
      url: state.url,
    });
    console.log("autocomplete", autocomplete);
  };

  const onPlaceChanged = () => {
    const data = state.address.getPlace();
    if (state.address !== null) {
      console.log("selected", data);
      setState({
        isOpen: state.isOpen,
        coords: {
          lat: data.geometry.location.lat(),
          lng: data.geometry.location.lng(),
        },
        address: state.address,
        url: data.photos[0].getUrl(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleToggleOpen = (evt) => {
    setState({
      isOpen: true,
      coords: state.coords,
      address: state.address,
    });
    console.log("isOpenState" + state.isOpen);
  };

  return (
    <div className="container">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        placeholder="disabled"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder=" "
          label="Search Places"
          className="textfield"
        />
      </Autocomplete>
      {/* <img style={{ width: "100px", height: "100px" }} src={state.url}></img> */}
      {isLoaded ? (
        <GoogleMap
          center={state.coords}
          zoom={13}
          mapContainerClassName="mapContainer"
        >
          <Marker
            key="1"
            position={state.coords}
            onClick={handleToggleOpen}
            draggable="true"
          >
            {state.isOpen && (
              <InfoWindow>
                <span>This is Info Window message!</span>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Maps;
