import React, { useCallback, useState } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 35.6894,
  lng: 139.692,
};

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowContent, setInfoWindowContent] = useState("");
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMapClick = (e) => {
    const maxZoomService = new window.google.maps.MaxZoomService();
    maxZoomService.getMaxZoomAtLatLng(e.latLng, (result) => {
      if (result.status !== "OK") {
        setInfoWindowContent("Error in MaxZoomService");
      } else {
        setInfoWindowContent(
          "The maximum zoom at this location is: " + result.zoom
        );
      }
      setInfoWindowPosition(e.latLng);
      setInfoWindowVisible(true);
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB0pAAfd-SgsJm0w0hvzZfg90qfXoPN9bw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        mapTypeId="roadmap"
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {infoWindowVisible && (
          <InfoWindow
            position={infoWindowPosition}
            onCloseClick={() => setInfoWindowVisible(false)}
          >
            <div>{infoWindowContent}</div>
          </InfoWindow>
        )}
      </GoogleMap>
      {/* <StreetView /> */}
      <h1>Hi This is a Street View Made with React!</h1>
    </LoadScript>
  );
};

// this component is not being used it is only useed fof street view

class StreetView extends React.Component {
  componentDidMount() {
    new window.google.maps.StreetViewPanorama(
      document.getElementById("street-view"),
      {
        position: { lat: 35.6894, lng: 139.692 },
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
      }
    );
  }

  render() {
    return (
      <div>
        <div id="street-view" style={{ width: "100%", height: "400px" }}></div>
      </div>
    );
  }
}

export default React.memo(MapComponent);
