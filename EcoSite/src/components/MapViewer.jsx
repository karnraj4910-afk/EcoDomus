import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { wetlands, waterways } from '../data/environmentalData';

const wetlandStyle = {
  color: '#60a5fa',
  weight: 1,
  fillColor: '#3b82f6',
  fillOpacity: 0.25,
};

const waterwayStyle = {
  color: '#38bdf8',
  weight: 3,
  opacity: 0.95,
};

const redMarkerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const MapViewer = ({ siteCenter, onSiteChange }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([siteCenter.lat, siteCenter.lng], 14);
    }
  }, [siteCenter]);

  const handleMarkerDragEnd = () => {
    const marker = markerRef.current;
    if (!marker) return;

    const { lat, lng } = marker.getLatLng();
    onSiteChange({ lat, lng });
  };

  return (
    <MapContainer
      center={[siteCenter.lat, siteCenter.lng]}
      zoom={14}
      scrollWheelZoom
      className="h-full w-full"
      whenCreated={(map) => {
        mapRef.current = map;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
        maxZoom={19}
      />

      <GeoJSON data={wetlands} style={wetlandStyle} />
      <GeoJSON data={waterways} style={waterwayStyle} />

      <Marker
        position={[siteCenter.lat, siteCenter.lng]}
        draggable
        icon={redMarkerIcon}
        ref={markerRef}
        eventHandlers={{ dragend: handleMarkerDragEnd }}
      >
        <Popup>Project Site</Popup>
      </Marker>
    </MapContainer>
  );
};