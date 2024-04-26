import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarker } from "react-icons/fa";
import tombstoneImage from "./styles/tombstone_1.png";
// import './styles/MyMap.css'

const customMarkerHtml = renderToStaticMarkup(
  <div
    style={{
      position: "relative",
      width: "60px",
      height: "20px",
      fontSize: "37px",
    }}
  >
    <FaMapMarker style={{ color: "#FFC300" }} />
    <img
      src={tombstoneImage}
      alt="Tombstone"
      style={{
        position: "absolute",
        width: "20px",
        height: "auto",
        left: "32%",
        top: "90%",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);

const customMarkerIcon = new L.divIcon({
  html: customMarkerHtml,
  className: "my-custom-class",
  iconSize: L.point(30, 50),
  iconAnchor: [15, 50],
});

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.flyTo(coords, map.getZoom());
  return null;
}

const MyMap = () => {
  const [tombs, setTombs] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchTombs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AllTombs"));
        const tombData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTombs(tombData);
      } catch (error) {
        console.error("Error fetching tomb data: ", error);
      }
    };

    fetchTombs();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = [position.coords.latitude, position.coords.longitude];
        setUserLocation(newPos);
      },
      () => {
        console.error("Permission denied or error retrieving location");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {tombs.map((tomb) => (
        <Marker
          key={tomb.id}
          position={[tomb.location._lat, tomb.location._long]}
          icon={customMarkerIcon}
        >
          <Popup>
            <div>
              <strong>{tomb.title}</strong>
              <br />
              <button
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${tomb.location._lat},${tomb.location._long}`,
                    "_blank"
                  );
                }}
              >
                Y aller
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      {userLocation && (
        <>
          <CircleMarker
            center={userLocation}
            color="blue"
            radius={2}
            fillColor="#0000FF"
            fillOpacity={1}
          >
            <Popup>Vous êtes ici</Popup>
          </CircleMarker>
          <SetViewOnClick coords={userLocation} />
        </>
      )}
    </MapContainer>
  );
};

export default MyMap;
