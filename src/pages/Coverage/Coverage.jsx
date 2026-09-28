import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useLoaderData } from "react-router";
import { useEffect, useRef, useState } from "react";

// Search korle map ke selected district- er kace niye jabe
const MapController = ({ selectedCenter }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCenter) {
      map.flyTo([selectedCenter.latitude, selectedCenter.longitude], 10, {
        duration: 1.5,
      });
    }
  }, [selectedCenter, map]);

  return null;
};

const Coverage = () => {
  const serviceCenters = useLoaderData();

  const [searchText, setSearchText] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);

  const markerRefs = useRef({});

  const bangladeshCenter = [23.685, 90.3563];

  // Search input unujai district filter
  const filteredCenters = serviceCenters.filter((center) =>
    center.district.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Search button click
  const handleSearch = () => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      setSelectedCenter(null);
      return;
    }

    const foundDistrict = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(search),
    );

    if (foundDistrict) {
      setSelectedCenter(foundDistrict);

      // sei marker-er Popup open korbe
      setTimeout(() => {
        const marker = markerRefs.current[foundDistrict.district];

        if (marker) {
          marker.openPopup();
        }
      }, 100);
    } else {
      alert("District not found!");
    }
  };

  // Enter press korle search hobe
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold">
          We are available in 64 districts
        </h1>

        <p className="text-gray-500 mt-3">
          Find our delivery coverage across Bangladesh
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search district..."
            className="input input-bordered w-full"
          />

          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>

        {/* Search Result Count */}
        {searchText && (
          <p className="text-sm text-gray-500 mt-2">
            {filteredCenters.length} district found
          </p>
        )}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-lg border">
        <MapContainer
          center={bangladeshCenter}
          zoom={7}
          scrollWheelZoom={true}
          className="h-[500px] w-full"
        >
          {/* OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Map Controller */}
          <MapController selectedCenter={selectedCenter} />

          {/* 64 District Markers */}
          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              ref={(marker) => {
                if (marker) {
                  markerRefs.current[center.district] = marker;
                }
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="text-lg font-bold">{center.district}</h3>

                  <p className="text-sm mt-1">Delivery Service Available</p>

                  <p className="text-sm mt-2">
                    <strong>Covered Areas:</strong>
                  </p>

                  <p className="text-sm">{center.covered_area.join(", ")}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
