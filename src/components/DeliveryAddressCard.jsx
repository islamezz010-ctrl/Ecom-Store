import { MapPin, Plus, Check } from "lucide-react";
import { useDeliveryLocation } from "../context/LocationContext";
import LocationSelector from "./LocationSelector";

const DeliveryAddressCard = ({ onAddAddress }) => {
  const { selectedAddress, addresses, selectAddress, location } =
    useDeliveryLocation();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#777682]">
          Delivery address
        </h3>
        <button
          type="button"
          onClick={onAddAddress}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#312e81] px-3 py-1.5 text-xs font-bold text-[#312e81] transition hover:bg-[#312e81]/5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add new address
        </button>
      </div>

      {selectedAddress ? (
        <div className="rounded-xl border border-[#c8c5d3] bg-white p-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#006b5f]" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#1b1b21]">{selectedAddress.fullName}</p>
              <p className="mt-1 text-sm text-[#474651]">
                {selectedAddress.building && `${selectedAddress.building}, `}
                {selectedAddress.street}
              </p>
              <p className="text-sm text-[#474651]">
                {selectedAddress.cityArea}, {selectedAddress.district},{" "}
                {selectedAddress.governorate}
              </p>
              <p className="mt-1 text-sm text-[#777682]">
                +20 {selectedAddress.mobile}
                {selectedAddress.landmark && ` · Near ${selectedAddress.landmark}`}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#006b5f]">
                {selectedAddress.addressType === "office" ? "Office delivery" : "Home delivery"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#c8c5d3] bg-white p-4 text-sm text-[#474651]">
          No saved address yet. Add one for accurate delivery, or choose a city below.
        </div>
      )}

      {addresses.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#777682]">
            Saved addresses
          </p>
          {addresses.map((address) => {
            const isActive = selectedAddress?.id === address.id;
            return (
              <button
                key={address.id}
                type="button"
                onClick={() => selectAddress(address.id)}
                className={`flex w-full cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                  isActive
                    ? "border-[#312e81] bg-[#e2dfff]/30"
                    : "border-[#e5e1e9] bg-white hover:border-[#c8c5d3]"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#1b1b21]">
                    {address.fullName}
                  </p>
                  <p className="truncate text-xs text-[#474651]">
                    {address.cityArea}, {address.governorate}
                  </p>
                </div>
                {isActive && <Check className="h-4 w-4 shrink-0 text-[#006b5f]" />}
              </button>
            );
          })}
        </div>
      )}

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#777682]">
          Or deliver to city
        </p>
        <LocationSelector variant="full" />
        <p className="mt-2 text-sm text-[#777682]">
          Shipping to {location.name} · {location.deliveryDays} business days
        </p>
      </div>
    </div>
  );
};

export default DeliveryAddressCard;
