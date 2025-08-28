"use client"
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "./ui/skeleton";
const GMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 22.48842143590431,
    lng: 88.31106434970289,
  };
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded || !center) {
    return <Skeleton className="h-4 w-[250px]" />;
  }
  return (

    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default GMaps;
