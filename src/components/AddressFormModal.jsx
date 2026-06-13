import { useState } from "react";
import { X, Loader2, Navigation } from "lucide-react";
import {
  COUNTRIES,
  matchLocationFromText,
  resolveGovernorate,
} from "../data/locations";
import { useDeliveryLocation } from "../context/LocationContext";

const EMPTY_FORM = {
  country: "Egypt",
  fullName: "",
  mobile: "",
  street: "",
  building: "",
  cityArea: "",
  district: "",
  governorate: "",
  landmark: "",
  addressType: "home",
  isDefault: false,
};

const applyGeoFields = (suggested) => {
  const matched = matchLocationFromText({
    cityArea: suggested.cityArea || "",
    governorate: suggested.governorate || "",
  });

  return {
    country: suggested.country || "Egypt",
    cityArea: suggested.cityArea || "",
    governorate: resolveGovernorate(suggested.governorate || matched.governorate),
    district: suggested.district || matched.name,
    street: suggested.street || "",
  };
};

const buildInitialForm = (geoSuggestedAddress) => ({
  ...EMPTY_FORM,
  ...(geoSuggestedAddress ? applyGeoFields(geoSuggestedAddress) : {}),
});

const AddressFormModalContent = ({ onClose }) => {
  const {
    addAddress,
    detectLocation,
    geoDetecting,
    geoError,
    geoSuggestedAddress,
    clearGeoError,
  } = useDeliveryLocation();

  const [form, setForm] = useState(() => buildInitialForm(geoSuggestedAddress));
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };

      if (field === "cityArea") {
        const matched = matchLocationFromText({ cityArea: value });
        next.governorate = matched.governorate;
        next.district = matched.name;
      }

      return next;
    });
  };

  const handleDetectLocation = async () => {
    setFormError("");
    clearGeoError();
    const result = await detectLocation();
    if (!result?.suggestedAddress) return;

    setForm((prev) => ({
      ...prev,
      ...applyGeoFields(result.suggestedAddress),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!form.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!form.mobile.trim()) {
      setFormError("Please enter your mobile number.");
      return;
    }
    if (!form.street.trim()) {
      setFormError("Please enter your street name.");
      return;
    }
    if (!form.cityArea.trim()) {
      setFormError("Please enter your city or area.");
      return;
    }

    setSubmitting(true);
    addAddress(form);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close address form"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-modal-title"
        className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e5e1e9] bg-white px-6 py-4">
          <h2 id="address-modal-title" className="text-xl font-bold text-[#1b1b21]">
            Add an address
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-[#474651] transition hover:bg-[#f6f2fa]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#1b1b21]">
                Enter a new shipping address
              </h3>
              <p className="mt-1 text-sm text-[#777682]">
                We&apos;ll use this address for delivery and shipping estimates.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={geoDetecting}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-[#c8c5d3] px-3 py-2 text-xs font-semibold text-[#1a146b] transition hover:border-[#312e81] hover:bg-[#f6f2fa] disabled:cursor-wait disabled:opacity-60"
            >
              {geoDetecting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Navigation className="h-3.5 w-3.5" />
              )}
              {geoDetecting ? "Detecting..." : "Use my location"}
            </button>
          </div>

          {(geoError || formError) && (
            <p className="rounded-lg bg-[#ffdad6]/50 px-3 py-2 text-sm text-[#ba1a1a]">
              {formError || geoError}
            </p>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              Country/region
            </span>
            <select
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="w-full rounded-lg border border-[#c8c5d3] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#312e81] focus:ring-2 focus:ring-[#312e81]/10"
            >
              {COUNTRIES.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              Full name (First and Last name)
            </span>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full rounded-lg border border-[#c8c5d3] px-3 py-2.5 text-sm outline-none transition focus:border-[#312e81] focus:ring-2 focus:ring-[#312e81]/10"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              Mobile number
            </span>
            <div className="flex overflow-hidden rounded-lg border border-[#c8c5d3] focus-within:border-[#312e81] focus-within:ring-2 focus-within:ring-[#312e81]/10">
              <span className="inline-flex items-center gap-1.5 border-r border-[#c8c5d3] bg-[#f6f2fa] px-3 text-sm font-semibold text-[#474651]">
                <span aria-hidden>🇪🇬</span> +20
              </span>
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
                placeholder="e.g. 1XXXXXXXXX"
                className="w-full px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <span className="mt-1 block text-xs text-[#777682]">
              May be used to assist delivery
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              Street name
            </span>
            <input
              type="text"
              value={form.street}
              onChange={(e) => updateField("street", e.target.value)}
              placeholder="e.g. Talaat Harb Street"
              className="w-full rounded-lg border border-[#c8c5d3] px-3 py-2.5 text-sm outline-none transition focus:border-[#312e81] focus:ring-2 focus:ring-[#312e81]/10"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              Building name/no
            </span>
            <input
              type="text"
              value={form.building}
              onChange={(e) => updateField("building", e.target.value)}
              placeholder="e.g. Princess Tower"
              className="w-full rounded-lg border border-[#c8c5d3] px-3 py-2.5 text-sm outline-none transition focus:border-[#312e81] focus:ring-2 focus:ring-[#312e81]/10"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              City/Area
            </span>
            <input
              type="text"
              value={form.cityArea}
              onChange={(e) => updateField("cityArea", e.target.value)}
              placeholder="e.g. El Nozha, New Cairo City & Dokki"
              className="w-full rounded-lg border border-[#c8c5d3] px-3 py-2.5 text-sm outline-none transition focus:border-[#312e81] focus:ring-2 focus:ring-[#312e81]/10"
            />
            <span className="mt-1 block text-xs text-[#777682]">
              Can&apos;t find your city/area? Try a different spelling
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              District
            </span>
            <input
              type="text"
              value={form.district}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-[#c8c5d3] bg-[#f0ecf4] px-3 py-2.5 text-sm text-[#777682] outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              Governorate
            </span>
            <input
              type="text"
              value={form.governorate}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-[#c8c5d3] bg-[#f0ecf4] px-3 py-2.5 text-sm text-[#777682] outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#1b1b21]">
              Nearest landmark
            </span>
            <input
              type="text"
              value={form.landmark}
              onChange={(e) => updateField("landmark", e.target.value)}
              placeholder="e.g. Cairo festival city"
              className="w-full rounded-lg border border-[#c8c5d3] px-3 py-2.5 text-sm outline-none transition focus:border-[#312e81] focus:ring-2 focus:ring-[#312e81]/10"
            />
          </label>

          <div>
            <h4 className="mb-3 text-sm font-bold text-[#1b1b21]">
              Add delivery instructions
            </h4>
            <fieldset className="space-y-2">
              <legend className="sr-only">Address type</legend>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#474651]">
                <input
                  type="radio"
                  name="addressType"
                  value="home"
                  checked={form.addressType === "home"}
                  onChange={(e) => updateField("addressType", e.target.value)}
                  className="accent-[#1a146b]"
                />
                Home (7am–9pm, all days)
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#474651]">
                <input
                  type="radio"
                  name="addressType"
                  value="office"
                  checked={form.addressType === "office"}
                  onChange={(e) => updateField("addressType", e.target.value)}
                  className="accent-[#1a146b]"
                />
                Office (9am–6pm, Weekdays)
              </label>
            </fieldset>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#474651]">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => updateField("isDefault", e.target.checked)}
              className="accent-[#1a146b]"
            />
            Use as my default address.
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer rounded-xl bg-[#ffd814] px-6 py-3.5 text-sm font-bold text-[#1b1b21] shadow-sm transition hover:bg-[#f7ca00] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? "Saving..." : "Use this address"}
          </button>
        </form>
      </div>
    </div>
  );
};

const AddressFormModal = ({ open, onClose }) => {
  if (!open) return null;

  return <AddressFormModalContent onClose={onClose} />;
};

export default AddressFormModal;
