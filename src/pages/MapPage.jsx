import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, query, limit } from "firebase/firestore";
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
import MarkerClusterGroup from "react-leaflet-cluster";

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
  const [items, setItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const categories = [
    "HommesHistoire",
    "Les plus connus",
    "sport",
    "Acteurs",
    "Chanteur",
    "Hommes politique",
    "Litteraire",
  ];

  useEffect(() => {
    setLoading(true);
    const fetchAllItems = async () => {
      try {
        const docRef = doc(db, "Tombs", "OccpEQD19eoOmrLfPaP0");
        const promises = categories.map((category) => {
          const colRef = collection(docRef, category);
          const q = query(colRef);
          return getDocs(q);
        });

        const snapshots = await Promise.all(promises);
        const allItems = snapshots.flatMap((snapshot) =>
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        setItems(allItems);
      } catch (e) {
        setError("Failed to fetch data");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllItems();

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
  }, [categories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">REST IN PEACE...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
      </div>
    );
  }

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
      <MarkerClusterGroup chunkedLoading>
        {items.map((item) => (
          <Marker
            key={item.id}
            position={[item.location._lat, item.location._long]}
            icon={customMarkerIcon}
          >
            <Popup>
              <div className="text-center">
                <strong>{item.title}</strong>
                <div className="flex justify-center mt-2">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <br />
                <button
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${item.location._lat},${item.location._long}`,
                      "_blank"
                    );
                  }}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-block"
                >
                  Y aller
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

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
