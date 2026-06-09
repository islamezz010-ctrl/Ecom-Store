const DELIVERY_LOCATIONS = [
  { id: "cairo", name: "Cairo", governorate: "Cairo", shippingCost: 0, freeShippingMin: 50 },
  { id: "giza", name: "Giza", governorate: "Giza", shippingCost: 3.99, freeShippingMin: 75 },
  { id: "alexandria", name: "Alexandria", governorate: "Alexandria", shippingCost: 4.99, freeShippingMin: 75 },
  { id: "mansoura", name: "Mansoura", governorate: "Dakahlia", shippingCost: 5.99, freeShippingMin: 100 },
  { id: "tanta", name: "Tanta", governorate: "Gharbia", shippingCost: 5.99, freeShippingMin: 100 },
  { id: "aswan", name: "Aswan", governorate: "Aswan", shippingCost: 7.99, freeShippingMin: 120 },
];

const getLocationById = (id) =>
  DELIVERY_LOCATIONS.find((loc) => loc.id === id) ??
  DELIVERY_LOCATIONS.find((loc) => loc.id === "cairo");

const getShippingCost = (location, subtotal) => {
  if (!location) return 0;
  if (subtotal >= location.freeShippingMin) return 0;
  return location.shippingCost;
};

module.exports = { DELIVERY_LOCATIONS, getLocationById, getShippingCost };
