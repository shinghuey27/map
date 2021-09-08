import Maps from "../components/Maps";
import { withScriptjs } from "react-google-maps";
import React from "react";

const GoogleApi = () => {
  const MapLoader = withScriptjs(Maps);
  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkB5eGAVI247vmTmSlks3O6MnoDk8qOS8&libraries=places"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default GoogleApi;
