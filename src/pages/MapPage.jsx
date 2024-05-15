import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, query } from "firebase/firestore";
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
import tombstoneImage from "../assets/img/tombstone_1.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useTranslation } from "react-i18next";
import "../assets/leaflet/clusterMarker.css";
import { useParams } from "react-router-dom";

const customMarkerHtml = renderToStaticMarkup(
  <div
    style={{
      position: "relative",
      fontSize: "50px",
    }}
  >
    <FaMapMarker style={{ color: "#FFC300" }} />
    <img
      src={tombstoneImage}
      alt="Tombstone"
      style={{
        position: "absolute",
        width: "30px",
        height: "auto",
        top: "5px",
        left: "10px",
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

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom_marker",
    iconSize: L.point(33, 33, true),
  });
};

const MyMap = () => {
  const [items, setItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { place } = useParams();

  useEffect(() => {
    const categories = [
      "Histoire et Politique",
      "Scientifiques",
      "Litterature et Philosophie",
      "Sport",
      "Arts visuels",
      "Arts musicaux",
      "Arts vivants",
    ];

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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-aileronBold">
        <div className="text-xl font-semibold">REST IN PEACE...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen font-aileronBold">
        <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {items.map(
          (item) =>
            item.location && (
              <Marker
                key={item.id}
                position={[item.location._lat, item.location._long]}
                icon={customMarkerIcon}
              >
                <Popup>
                  <div className="flex flex-col items-center justify-between max-w-44 max-h-60 font-aileronBold text-xl">
                    <h3>{item.title}</h3>
                    <div className="w-full flex justify-center items-center rounded-2xl m-1">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-28 h-28 max-w-32 max-h-36 rounded-2xl object-cover object-top"
                      />
                    </div>
                    <button
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${item.location._lat},${item.location._long}`,
                          "_blank"
                        );
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-1 rounded-2xl"
                    >
                      {t("map_go")}
                    </button>
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MarkerClusterGroup>

      {place && (
        <SetViewOnClick
          coords={[Number(place.split(",")[0]), Number(place.split(",")[1])]}
        />
      )}

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
          {!place && <SetViewOnClick coords={userLocation} />}
        </>
      )}
    </MapContainer>
  );
};

export default MyMap;
