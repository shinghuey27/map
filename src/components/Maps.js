import "../App.scss";
import styles from "../sass/Maps.module.scss";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import InputAdornment from "@material-ui/core/InputAdornment";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

import { HistoryList } from "./HistoryList";
import { mapAdded } from "../redux/MapsSlice";

const Maps = () => {
  const initialState = [
    {
      isOpen: false,
      coords: { lat: 3.139003, lng: 101.686855 },
      address: "",
      search: "",
      reviewDetails: { name: "", rating: null, time: "", desc: "" },
      selectedItem: null,
    },
  ];
  const [states, setStates] = useState(initialState);

  const dispatch = useDispatch();
  const mapsAmount = useSelector((state) => state.maps.entities.length);
  const { entities } = useSelector((state) => state.maps);

  //set default coords
  useEffect(() => {
    setStates({
      ...states,
      coords: { lat: 3.139003, lng: 101.686855 },
    });
  }, []);

  //load google place autocomplete
  const onLoad = (autocomplete) => {
    setStates({
      ...states,
      address: autocomplete,
    });
  };

  //selected google place
  const OnPlaceChanged = (e) => {
    let url = "";
    let rating = "";
    let review = "";

    const data = states.address.getPlace();

    if (states.address !== null) {
      console.log("selected", data);
      if (data.photos === undefined) {
        url =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
      } else {
        url = data.photos[0].getUrl();
      }
      if (data.rating === undefined) {
        rating = 0;
      } else {
        rating = data.rating;
      }
      if (
        data.user_ratings_total === undefined ||
        data.user_ratings_total === null
      ) {
        review = 0;
      } else {
        review = data.user_ratings_total;
      }
      setStates({
        ...states,
        coords: {
          lat: data.geometry.location.lat(),
          lng: data.geometry.location.lng(),
        },
        search: states.address.gm_accessors_.place.Ij.formattedPrediction,
      });
      console.log("states", states);
      dispatch(
        mapAdded({
          id: mapsAmount + 1,
          title: data.name,
          isOpen: false,
          url: url,
          coords: {
            lat: data.geometry.location.lat(),
            lng: data.geometry.location.lng(),
          },
          rating: rating,
          formatted_address: data.formatted_address,
          review: review,
          reviewDetails: data.reviews,
        })
      );
      console.log("data", data);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };
  //Trigger marker open
  const handleToggleOpen = (evt) => {
    setStates({
      ...states,
      isOpen: !states.isOpen,
    });
  };

  const handleUserInput = (e) => {
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
      <GoogleMap
        center={states.coords}
        zoom={13}
        mapContainerClassName={styles.mapContainer}
      >
        {entities.length &&
          entities.map(({ id, title, coords }) => (
            <Marker
              key={id}
              position={coords}
              onClick={handleToggleOpen}
              draggable="true"
            />
          ))}
      </GoogleMap>
    </div>
  );
};

export default Maps;
