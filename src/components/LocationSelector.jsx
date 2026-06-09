import { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown, Check, Loader2 } from "lucide-react";
import { useDeliveryLocation } from "../context/LocationContext";
import { DELIVERY_LOCATIONS } from "../data/locations";

const LocationSelector = ({ variant = "compact" }) => {
  const { location, setLocation, geoDetecting } = useDeliveryLocation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isCompact = variant === "compact";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex cursor-pointer items-center gap-2 rounded-lg border transition-colors ${
          isCompact
            ? "border-transparent px-2 py-1.5 text-sm hover:border-[#e5e1e9] hover:bg-[#f6f2fa]"
            : "w-full border-[#c8c5d3] bg-white px-4 py-3 text-left hover:border-[#312e81]"
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select delivery location"
      >
        {geoDetecting ? (
          <Loader2
            className={`shrink-0 animate-spin text-[#006b5f] ${isCompact ? "h-4 w-4" : "h-5 w-5"}`}
          />
        ) : (
          <MapPin
            className={`shrink-0 text-[#006b5f] ${isCompact ? "h-4 w-4" : "h-5 w-5"}`}
          />
        )}
        <div className={`min-w-0 ${isCompact ? "hidden sm:block" : "flex-1"}`}>
          {isCompact ? (
            <span className="block truncate font-semibold text-[#1b1b21]">
              {location.name}
            </span>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#777682]">
                Deliver to
              </p>
              <p className="truncate font-semibold text-[#1b1b21]">
                {location.name}, {location.governorate}
              </p>
              <p className="text-sm text-[#474651]">
                {location.shippingCost === 0
                  ? "Free delivery"
                  : `$${location.shippingCost.toFixed(2)} shipping`}{" "}
                · {location.deliveryDays} business days
              </p>
            </>
          )}
        </div>
        <ChevronDown
          className={`shrink-0 text-[#777682] transition-transform ${
            isCompact ? "h-4 w-4" : "h-5 w-5"
          } ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Delivery locations"
          className={`absolute z-50 max-h-72 overflow-y-auto rounded-xl border border-[#e5e1e9] bg-white shadow-xl ${
            isCompact
              ? "left-0 top-full mt-2 w-64"
              : "left-0 right-0 top-full mt-2"
          }`}
        >
          {DELIVERY_LOCATIONS.map((loc) => {
            const isSelected = loc.id === location.id;

            return (
              <li key={loc.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    setLocation(loc.id);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#f6f2fa] ${
                    isSelected ? "bg-[#e2dfff]/40" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#1b1b21]">
                      {loc.name}, {loc.governorate}
                    </p>
                    <p className="mt-0.5 text-sm text-[#474651]">
                      {loc.shippingCost === 0
                        ? "Free delivery"
                        : `$${loc.shippingCost.toFixed(2)}`}{" "}
                      · {loc.deliveryDays} days
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#006b5f]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocationSelector;
