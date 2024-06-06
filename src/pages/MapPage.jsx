import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, query } from "firebase/firestore";
import { db } from "../firebase-config";
import "../assets/leaflet/clusterMarker.css";

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

const famousMarkerHtml = renderToStaticMarkup(
  <div
    style={{
      position: "relative",
      fontSize: "50px",
      display: "inline-block",
    }}
  >
    <style>
      {`
        @keyframes shine {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.2);
            filter: brightness(1.5);
          }
        }
        @keyframes raySpread {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .shine-animation {
          position: relative;
          animation: shine 2s infinite;
          color: #FFC300;
        }
        .shine-animation::after {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          border-radius: 50%;
          border: 2px solid rgba(255, 215, 0, 1);
          animation: raySpread 3s infinite;
        }
      `}
    </style>
    <FaMapMarker className="shine-animation" style={{ zIndex: 2 }} />
    <img
      src={tombstoneImage}
      alt="Tombstone"
      style={{
        position: "absolute",
        width: "30px",
        height: "auto",
        top: "5px",
        left: "10px",
        zIndex: 3,
      }}
    />
  </div>
);

const famousMarkerIcon = new L.divIcon({
  html: famousMarkerHtml,
  className: "my-custom-class",
  iconSize: L.point(30, 50),
  iconAnchor: [15, 50],
});

function SetViewOnClick({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
}

const createClusterCustomIcon = (cluster) => {
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
  const goTo = useNavigate();

  useEffect(() => {
    const fetchAllItems = async () => {
      setLoading(true);
      try {
        const categories = [
          "Histoire et Politique",
          "Scientifiques",
          "Litterature et Philosophie",
          "Sports",
          "Arts visuels",
          "Arts musicaux",
          "Arts vivants",
          "Les plus connus",
        ];
        const docRef = doc(db, "Tombs", "Categories");
        const promises = categories.map((category) => {
          const colRef = collection(docRef, category);
          return getDocs(query(colRef));
        });
        const snapshots = await Promise.all(promises);
        const allItems = snapshots.flatMap((snapshot, index) =>
          snapshot.docs.map((doc) => ({
            id: doc.id,
            category: categories[index],
            ...doc.data(),
          }))
        );
        setItems(allItems);
      } catch (e) {
        setError("Échec de la récupération des données");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllItems();
  }, []);

  useEffect(() => {
    const handleLocationPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permissionStatus.state === "granted") {
          getUserLocation();
        } else if (permissionStatus.state === "prompt") {
          requestUserLocation();
        } else if (permissionStatus.state === "denied") {
          alert("La géolocalisation est nécessaire pour utiliser cette carte.");
          requestUserLocation();
        }

        permissionStatus.onchange = () => {
          if (permissionStatus.state === "granted") {
            // window.location.reload();
          } else if (permissionStatus.state === "denied") {
            alert(
              "La géolocalisation est nécessaire pour utiliser cette carte."
            );
            requestUserLocation();
          }
        };
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de la permission de géolocalisation :",
          error
        );
      }
    };

    const requestUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newPos);
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la position :",
            error
          );
          alert("La géolocalisation est nécessaire pour utiliser cette carte.");
        },
        { enableHighAccuracy: true }
      );
    };

    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newPos);
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la position :",
            error
          );
          alert("La géolocalisation est nécessaire pour utiliser cette carte.");
        },
        { enableHighAccuracy: true }
      );
    };

    handleLocationPermission();

    const locationCheckInterval = setInterval(handleLocationPermission, 2000);

    return () => clearInterval(locationCheckInterval);
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
        <div className="text-red-500 text-xl font-semibold">
          Erreur : {error}
        </div>
      </div>
    );
  }

  const getLocation = (location) => {
    if (typeof location === "string") {
      let split = location.split(",");
      return [split[0], split[1]];
    } else {
      return [location._lat, location._long];
    }
  };

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
                position={getLocation(item.location)}
                icon={
                  item.category === "Les plus connus"
                    ? famousMarkerIcon
                    : customMarkerIcon
                }
              >
                <Popup>
                  <div className="flex flex-col items-center justify-between max-w-44 max-h-60 font-aileronBold text-xl">
                    <h3>{item.title}</h3>
                    <div
                      className="w-full flex justify-center items-center rounded-2xl m-1"
                      onClick={() => {
                        goTo(`/category/${item.category}/${item.id}`);
                      }}
                    >
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
