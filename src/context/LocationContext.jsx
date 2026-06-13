import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_LOCATION_ID,
  getLocationById,
  getShippingCost,
  matchLocationFromText,
} from "../data/locations";
import { safeDetectDeliveryLocation } from "../lib/geolocation";

const LOCATION_KEY = "deliveryLocation";
const ADDRESSES_KEY = "deliveryAddresses";
const SELECTED_ADDRESS_KEY = "selectedAddressId";
const GEO_PROMPT_KEY = "geoPromptAttempted";

const LocationContext = createContext();

const loadAddresses = () => {
  try {
    const stored = localStorage.getItem(ADDRESSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const createAddressId = () =>
  globalThis.crypto?.randomUUID?.() ?? `addr-${Date.now()}`;

export const LocationProvider = ({ children }) => {
  const [locationId, setLocationId] = useState(() => {
    const stored = localStorage.getItem(LOCATION_KEY);
    return stored && getLocationById(stored) ? stored : DEFAULT_LOCATION_ID;
  });
  const [addresses, setAddresses] = useState(loadAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(
    () => localStorage.getItem(SELECTED_ADDRESS_KEY) || null,
  );
  const [geoDetecting, setGeoDetecting] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [geoSuggestedAddress, setGeoSuggestedAddress] = useState(null);

  const location = getLocationById(locationId);
  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ?? null;

  useEffect(() => {
    localStorage.setItem(LOCATION_KEY, locationId);
    window.dispatchEvent(new Event("location:changed"));
  }, [locationId]);

  useEffect(() => {
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (selectedAddressId) {
      localStorage.setItem(SELECTED_ADDRESS_KEY, selectedAddressId);
    } else {
      localStorage.removeItem(SELECTED_ADDRESS_KEY);
    }
  }, [selectedAddressId]);

  const setLocation = useCallback((id) => {
    if (getLocationById(id)) {
      setLocationId(id);
    }
  }, []);

  const detectLocation = useCallback(async () => {
    setGeoDetecting(true);
    setGeoError(null);

    const result = await safeDetectDeliveryLocation();

    setGeoDetecting(false);

    if (!result.success) {
      setGeoError(result.error);
      return null;
    }

    setLocationId(result.data.locationId);
    setGeoSuggestedAddress(result.data.suggestedAddress ?? null);
    return result.data;
  }, []);

  useEffect(() => {
    const alreadyPrompted = sessionStorage.getItem(GEO_PROMPT_KEY);
    if (alreadyPrompted || addresses.length > 0) return;

    sessionStorage.setItem(GEO_PROMPT_KEY, "1");
    detectLocation();
  }, [addresses.length, detectLocation]);

  const addAddress = useCallback((addressInput) => {
    const matchedLocation = matchLocationFromText({
      cityArea: addressInput.cityArea,
      governorate: addressInput.governorate,
    });

    const newAddress = {
      id: createAddressId(),
      country: addressInput.country || "Egypt",
      fullName: addressInput.fullName.trim(),
      mobile: addressInput.mobile.trim(),
      street: addressInput.street.trim(),
      building: addressInput.building.trim(),
      cityArea: addressInput.cityArea.trim(),
      district: addressInput.district.trim(),
      governorate: addressInput.governorate.trim(),
      landmark: addressInput.landmark.trim(),
      addressType: addressInput.addressType,
      isDefault: Boolean(addressInput.isDefault),
      locationId: matchedLocation.id,
      createdAt: new Date().toISOString(),
    };

    setAddresses((prev) => {
      const withoutOldDefault = addressInput.isDefault
        ? prev.map((address) => ({ ...address, isDefault: false }))
        : prev;
      return [...withoutOldDefault, newAddress];
    });

    setSelectedAddressId(newAddress.id);
    setLocationId(matchedLocation.id);
    setGeoSuggestedAddress(null);

    return newAddress;
  }, []);

  const selectAddress = useCallback(
    (id) => {
      const address = addresses.find((item) => item.id === id);
      if (!address) return;
      setSelectedAddressId(id);
      setLocationId(address.locationId);
    },
    [addresses],
  );

  const calculateShipping = useCallback(
    (subtotal) => getShippingCost(location, subtotal),
    [location],
  );

  return (
    <LocationContext.Provider
      value={{
        location,
        locationId,
        setLocation,
        addresses,
        selectedAddress,
        selectedAddressId,
        addAddress,
        selectAddress,
        calculateShipping,
        detectLocation,
        geoDetecting,
        geoError,
        geoSuggestedAddress,
        clearGeoError: () => setGeoError(null),
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useDeliveryLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useDeliveryLocation must be used within a LocationProvider",
    );
  }
  return context;
};
