import { useState, useEffect, useRef } from "react";
import { MapPin, Search, X, Loader2 } from "lucide-react";
import { useDeliveryLocation } from "../context/LocationContext";
import { DELIVERY_LOCATIONS } from "../data/locations";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapLocationModal = ({ isOpen, onClose, onConfirm }) => {
  const { location, geoDetecting } = useDeliveryLocation();
  const [selectedLocation, setSelectedLocation] = useState(
    location || DELIVERY_LOCATIONS[0],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] =
    useState(DELIVERY_LOCATIONS);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Location coordinates (Egypt locations)
  const locationCoords = {
    cairo: [30.0444, 31.2357],
    giza: [30.0131, 31.2089],
    alexandria: [31.2001, 29.9187],
    helwan: [29.8625, 31.3386],
    zagazig: [30.588, 31.5049],
  };

  // Update selectedLocation when location context changes
  useEffect(() => {
    if (location) {
      setSelectedLocation(location);
    }
  }, [location, isOpen]);

  // Filter locations based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLocations(DELIVERY_LOCATIONS);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredLocations(
        DELIVERY_LOCATIONS.filter(
          (loc) =>
            loc.name.toLowerCase().includes(query) ||
            loc.governorate.toLowerCase().includes(query),
        ),
      );
    }
  }, [searchQuery]);

  // Initialize map
  useEffect(() => {
    if (!isOpen || !mapRef.current || mapInstanceRef.current) return;

    // Create map centered on Egypt
    const map = L.map(mapRef.current).setView([26.8206, 30.8025], 6);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add markers for all locations
    DELIVERY_LOCATIONS.forEach((loc) => {
      const coordKey = loc.governorate.toLowerCase().replace(/\s+/g, "");
      const coords = locationCoords[coordKey] || [30.0444, 31.2357]; // Default to Cairo

      const marker = L.marker(coords, {
        title: loc.name,
      })
        .bindPopup(
          `<div class="p-2">
            <p class="font-semibold">${loc.name}</p>
            <p class="text-sm">${loc.governorate}</p>
          </div>`,
        )
        .addTo(map)
        .on("click", () => {
          setSelectedLocation(loc);
        });

      markersRef.current[loc.id] = marker;
    });

    // Clean up
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  // Update marker styles when selection changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (id === selectedLocation.id) {
        marker.setIcon(
          L.icon({
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
            shadowSize: [41, 41],
            className: "leaflet-marker-selected",
          }),
        );
      } else {
        marker.setIcon(L.icon.default());
      }
    });
  }, [selectedLocation]);

  const handleConfirm = () => {
    onConfirm(selectedLocation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e5e1e9]">
            <h2 className="text-2xl font-bold text-[#1a146b]">
              Add new address
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#f6f2fa] rounded-lg transition"
              aria-label="Close"
            >
              <X size={24} className="text-[#474651]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex gap-6 p-6">
            {/* Map Section */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777682]"
                />
                <input
                  type="text"
                  placeholder="Search for your location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-[#e5e1e9] bg-[#f6f2fa] focus:border-[#1a146b] focus:ring-2 focus:ring-[#1a146b]/10 outline-none transition"
                />
              </div>

              {/* Map Container */}
              <div
                ref={mapRef}
                className="flex-1 rounded-2xl border border-[#e5e1e9] overflow-hidden shadow-md"
                style={{ minHeight: "400px" }}
              />

              {/* Use Current Location Button */}
              <button
                disabled={geoDetecting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#006b5f] text-white font-semibold hover:bg-[#005a52] transition disabled:opacity-70 disabled:cursor-wait"
              >
                {geoDetecting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Detecting location...
                  </>
                ) : (
                  <>
                    <MapPin size={18} />
                    Use current location
                  </>
                )}
              </button>
            </div>

            {/* Locations List Sidebar */}
            <div className="w-80 flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[#777682] uppercase">
                Suggested Locations
              </h3>
              <div className="space-y-2 flex-1 overflow-y-auto pr-2">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition ${
                        selectedLocation.id === loc.id
                          ? "border-[#1a146b] bg-[#e2dfff]/40"
                          : "border-[#e5e1e9] hover:border-[#1a146b]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-[#1b1b21]">
                            {loc.name}
                          </p>
                          <p className="text-sm text-[#474651]">
                            {loc.governorate}
                          </p>
                          <p className="text-xs text-[#777682] mt-1">
                            {loc.shippingCost === 0
                              ? "Free delivery"
                              : `$${loc.shippingCost.toFixed(2)} shipping`}{" "}
                            · {loc.deliveryDays} business days
                          </p>
                        </div>
                        {selectedLocation.id === loc.id && (
                          <div className="ml-2 h-5 w-5 rounded-full bg-[#1a146b] flex items-center justify-center text-white text-xs font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-[#777682]">
                    No locations found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with Confirm Button */}
          <div className="border-t border-[#e5e1e9] p-6 bg-[#f6f2fa]">
            <div className="mb-4 pb-4 border-b border-[#e5e1e9]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#777682] mb-2">
                CURRENT LOCATION
              </p>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-[#1a146b] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1b1b21]">
                    {selectedLocation.name}
                  </p>
                  <p className="text-sm text-[#474651]">
                    {selectedLocation.governorate}, Egypt
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-lg text-white font-bold hover:shadow-lg transition active:scale-95"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1a146b 0%, #312e81 100%)",
              }}
            >
              CONFIRM LOCATION
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapLocationModal;
