"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Camping } from "@/typesCamping";
import "leaflet/dist/leaflet.css";
import "@/components/maps/fixLeafletIcons";
import Image from "next/image";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";
const MapAll = ({ campings }: { campings: Camping[] }) => {
  return (
    <MapContainer className="w-screen h-100 lg:h-150 md:h-150 rounded-lg" zoom={7} maxZoom={18} center={[50.68072319026102, 5.299799969579857]}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {campings.map((camping: Camping) => (
          <Marker key={camping.id} position={[camping.field_camping_map.lat, camping.field_camping_map.lon]}>
            <Popup>
              <Image
                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${camping.field_camping_image.uri.url}`}
                width={300}
                height={200}
                sizes="100%"
                alt={camping.title}
                className="w-full h-full"
              />
              <h3 className="mt-2">{camping.title}</h3>
              <p>{camping.field_camping_location.name}</p>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
export default MapAll;
