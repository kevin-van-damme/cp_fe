"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Camping } from "@/typesCamping";
import "leaflet/dist/leaflet.css";
import "@/components/maps/fixLeafletIcons";

const Map = ({ camping }: { camping: Camping }) => {
  return (
    <MapContainer
      className="w-full h-full rounded-2xl"
      zoom={13}
      maxZoom={18}
      center={[camping.field_camping_map.lat, camping.field_camping_map.lon]}
      key={Math.random()}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker key={camping.id} position={[camping.field_camping_map.lat, camping.field_camping_map.lon]}></Marker>
    </MapContainer>
  );
};

export default Map;
