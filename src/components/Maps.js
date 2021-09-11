import "../App.scss";

import { HistoryList } from "./HistoryList";
import { mapAdded } from "../redux/MapsSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import TextField from "@material-ui/core/TextField";
import Loading from "./Loading";

const Maps = () => {
  const initialState = [
    {
      isOpen: false,
      coords: { lat: 3.139003, lng: 101.686855 },
      address: "",
    },
  ];
  const [states, setStates] = useState(initialState);
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();
  const mapsAmount = useSelector((state) => state.maps.entities.length);
  const { entities } = useSelector((state) => state.maps);

  //set default coords
  useEffect(() => {
    setStates({
      ...states,
      coords: { lat: 3.139003, lng: 101.686855 },
    });
    setTimeout(() => setloading(false), 500);
  }, []);

  //load google place autocomplete
  const onLoad = (autocomplete) => {
    setStates({
      ...states,
      address: autocomplete,
    });
  };

  //selected google place
  const OnPlaceChanged = () => {
    const data = states.address.getPlace();
    let url = "";
    let rating = "";
    let review = "";
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
        })
      );
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

  return (
    <div className="container">
      {loading === true ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="flex">
            <Autocomplete onLoad={onLoad} onPlaceChanged={OnPlaceChanged}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Search Places"
                className="textfield"
              />
            </Autocomplete>
            <HistoryList states={states} setStates={setStates} />
          </div>
          <GoogleMap
            center={states.coords}
            zoom={13}
            mapContainerClassName="mapContainer"
          >
            {entities.length &&
              entities.map(({ title, coords }) => (
                <Marker
                  position={coords}
                  onClick={handleToggleOpen}
                  draggable="true"
                >
                  {/* {states.isOpen && (
                    <InfoWindow position={states.coords} onCloseClick={handleToggleOpen}>
                      <span>{title}</span>
                    </InfoWindow>
                  )} */}
                </Marker>
              ))}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default Maps;
