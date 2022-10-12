import "../App.scss";
import styles from "../sass/Maps.module.scss";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

import { HistoryList } from "./HistoryList";
import { mapAdded } from "../redux/MapsSlice";
import Loading from "./Loading";

const Maps = () => {
  const initialState = [
    {
      isOpen: false,
      coords: { lat: null, lng: null },
      address: "",
      search: "",
      reviewDetails: { name: "", rating: null, time: "", desc: "" },
      selectedItem: null,
    },
  ];
  const [states, setStates] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const mapsAmount = useSelector((state) => state.maps.entities.length);
  const { entities } = useSelector((state) => state.maps);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStates({
          ...states,
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (err) => setErrorMessage(err.message)
    );
  };

  // set default coords
  useEffect(() => {
    getLocation();
  });

  //load google place autocomplete
  const onLoad = (autocomplete) => {
    setStates({
      ...states,
      address: autocomplete,
    });
  };

  //selected google place
  const OnPlaceChanged = (e) => {
      const data = states.address ? states.address?.getPlace() : null;
      console.log("selected", data);
      setStates({
        ...states,
        coords: {
          lat: data.geometry?.location.lat(),
          lng: data.geometry?.location.lng(),
        },
        // search: states.address.gm_accessors_.place.hk?.formattedPrediction,
        search : `${data.name}, ${data.formatted_address}`,
      });
      dispatch(
        mapAdded({
          id: mapsAmount + 1,
          title: data.name,
          isOpen: false,
          url: data.photos === undefined ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" : data.photos[0].getUrl(),
          coords: {
            lat: data.geometry.location.lat(),
            lng: data.geometry.location.lng(),
          },
          rating: data.rating === undefined ? 0 : data.rating,
          formatted_address: data.formatted_address,
          review: data.user_ratings_total ? data.user_ratings_total : 0,
          reviewDetails: data.reviews,
          buttonText:"Add to compare"
        })
      );
  };
  //Trigger marker open
  const handleToggleOpen = (evt) => {
    setStates({
      ...states,
      isOpen: !states.isOpen,
    });
  };

  const handleUserInput = (e) => {
    console.log("E", states);
    setStates({
      ...states,
      search: e.target.value,
    });
  };

  // Reset Input Field handler
  const resetSearch = () => {
    setStates({
      ...states,
      search: "",
    });
  };

  const renderMap = () => {
    if (errorMessage && !states.coords) {
      return (
        <Typography
          variant="overline"
          color="textSecondary"
          display="block"
          className={styles.errorMessage}
        >
          Oppps Error: {errorMessage}
        </Typography>
      );
    }

    if (!errorMessage && states.coords) {
      return (
        <GoogleMap
          center={states.coords}
          zoom={13}
          mapContainerClassName={styles.mapContainer}
        >
          {entities.length &&
            entities.map(({ id, coords }) => (
              <Marker key={id} position={coords} onClick={handleToggleOpen} />
            ))}
        </GoogleMap>
      );
    }

    return <Loading message="Please Accept Location Request" />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.displayFlex}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={OnPlaceChanged}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Search Places"
            className={styles.search}
            value={states.search}
            onChange={handleUserInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="delete" onClick={resetSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Autocomplete>

        <HistoryList states={states} setStates={setStates} />
      </div>
      {renderMap()}
    </div>
  );
};

export default Maps;
