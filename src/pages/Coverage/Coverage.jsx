import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useLoaderData } from "react-router";
import { useEffect, useRef, useState } from "react";

// Fix Leaflet default marker icons in production builds
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Move the map to the selected district and open its popup
const MapController = ({ selectedCenter, markerRefs }) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedCenter) return;

    const { latitude, longitude, district } = selectedCenter;

    if (
      !Number.isFinite(Number(latitude)) ||
      !Number.isFinite(Number(longitude))
    ) {
      return;
    }

    const marker = markerRefs.current[district];

    map.flyTo([Number(latitude), Number(longitude)], 10, { duration: 1.5 });

    if (marker) {
      map.once("moveend", () => {
        marker.openPopup();
      });
    }
  }, [selectedCenter, map, markerRefs]);

  return null;
};

const Coverage = () => {
  const serviceCenters = useLoaderData();

  const [searchText, setSearchText] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);

  const markerRefs = useRef({});

  const bangladeshCenter = [23.685, 90.3563];

  // Filter districts while typing
  const filteredCenters = serviceCenters.filter((center) =>
    center.district?.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  // Find the district and move the map to its marker
  const handleSearch = () => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      setSelectedCenter(null);
      return;
    }

    const foundDistrict = serviceCenters.find((center) =>
      center.district?.toLowerCase().includes(search),
    );

    if (foundDistrict) {
      setSelectedCenter(foundDistrict);
    } else {
      setSelectedCenter(null);
      alert("District not found!");
    }
  };

  // Search when Enter is pressed
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Page heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          We are available in 64 districts
        </h1>

        <p className="mt-3 text-gray-500">
          Find our delivery coverage across Bangladesh
        </p>
      </div>

      {/* District search */}
      <div className="mx-auto mb-8 max-w-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search district..."
            aria-label="Search district"
            className="input input-bordered min-w-0 flex-1"
          />

          <button
            type="button"
            onClick={handleSearch}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>

        {searchText.trim() && (
          <p className="mt-2 text-sm text-gray-500">
            {filteredCenters.length}{" "}
            {filteredCenters.length === 1 ? "district" : "districts"} found
          </p>
        )}
      </div>

      {/* Bangladesh coverage map */}
      <div className="overflow-hidden rounded-2xl border shadow-lg">
        <MapContainer
          center={bangladeshCenter}
          zoom={7}
          scrollWheelZoom={true}
          className="h-[400px] w-full sm:h-[500px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController
            selectedCenter={selectedCenter}
            markerRefs={markerRefs}
          />

          {/* District markers */}
          {serviceCenters.map((center) => (
            <Marker
              key={center.district}
              position={[Number(center.latitude), Number(center.longitude)]}
              ref={(marker) => {
                if (marker) {
                  markerRefs.current[center.district] = marker;
                } else {
                  delete markerRefs.current[center.district];
                }
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="text-lg font-bold">{center.district}</h3>

                  <p className="mt-1 text-sm">Delivery Service Available</p>

                  <p className="mt-2 text-sm font-semibold">Covered Areas:</p>

                  <p className="text-sm">
                    {Array.isArray(center.covered_area)
                      ? center.covered_area.join(", ")
                      : center.covered_area || "No areas listed"}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
