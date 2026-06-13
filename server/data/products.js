const products = [
  {
    name: "AeroFit Wireless Headphones",
    price: 189.99,
    description:
      "Noise-isolating wireless headphones with breathable ear cushions and a 32-hour battery.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 12,
  },
  {
    name: "LumaDesk Smart Lamp",
    price: 74.5,
    description:
      "A compact desk lamp with touch dimming, warm-to-cool light, and USB-C charging.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    category: "Home & Living",
    stock: 18,
  },
  {
    name: "PulseTrack Fitness Watch",
    price: 149,
    description:
      "Lightweight fitness watch with heart-rate tracking, sleep insights, and water resistance.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "Nomad Tech Backpack",
    price: 119.95,
    description:
      "Weather-resistant everyday backpack with a padded laptop sleeve and modular pockets.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 14,
  },
  {
    name: "Slate Minimal Sneakers",
    price: 96,
    description:
      "Low-profile knit sneakers with cushioned soles for office days and city walks.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 20,
  },
  {
    name: "Arc Portable Speaker",
    price: 89.99,
    description:
      "Compact Bluetooth speaker with rich bass, splash resistance, and all-day playback.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 16,
  },
  {
    name: "Terra Ceramic Pour-Over Set",
    price: 58,
    description:
      "A ceramic pour-over dripper and carafe set made for slow mornings and clean brews.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    category: "Home & Living",
    stock: 11,
  },
  {
    name: "Metro Leather Cardholder",
    price: 42,
    description:
      "Slim full-grain leather cardholder with six slots and a central cash pocket.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 22,
  },
  {
    name: "FocusPad Wireless Charger",
    price: 49.99,
    description:
      "Low-profile wireless charging pad with a grippy textile top and fast-charge support.",
    image:
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Breeze Linen Throw",
    price: 68,
    description:
      "Soft linen-cotton throw blanket with a relaxed texture and year-round weight.",
    image:
      "https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=900&q=80",
    category: "Home & Living",
    stock: 9,
  },
  {
    name: "Orbit Travel Tumbler",
    price: 34.95,
    description:
      "Vacuum-insulated stainless steel tumbler that keeps drinks hot or cold for hours.",
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80",
    category: "Home & Living",
    stock: 30,
  },
  {
    name: "Vivid Mechanical Keyboard",
    price: 132,
    description:
      "Compact mechanical keyboard with hot-swappable switches and quiet tactile feedback.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 13,
  },
  // Grocery products
  {
    name: "Organic Brown Rice",
    price: 12.99,
    description:
      "Premium organic brown rice, high in fiber and nutrients. Perfect for healthy meals.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 50,
  },
  {
    name: "Extra Virgin Olive Oil",
    price: 18.5,
    description:
      "Cold-pressed extra virgin olive oil from Mediterranean olives. 500ml bottle.",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b67?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 30,
  },
  {
    name: "Organic Whole Wheat Flour",
    price: 8.99,
    description:
      "100% organic whole wheat flour, freshly milled. Great for baking bread and pastries.",
    image:
      "https://images.unsplash.com/photo-1571521651817-c076a6c4e48d?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 45,
  },
  {
    name: "Raw Organic Honey",
    price: 16.99,
    description:
      "Raw unfiltered organic honey with live enzymes and probiotics. 500g jar.",
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50b8b7?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 40,
  },
  {
    name: "Himalayan Pink Salt",
    price: 9.99,
    description:
      "Pure Himalayan pink salt crystals. Rich in 84 trace minerals. 1kg.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 60,
  },
  {
    name: "Organic Almond Butter",
    price: 14.99,
    description:
      "Creamy organic almond butter made from roasted almonds. No added sugar.",
    image:
      "https://images.unsplash.com/photo-1624206566897-f1d682642a69?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 35,
  },
  {
    name: "Organic Quinoa",
    price: 11.99,
    description:
      "Premium organic quinoa seeds. Complete protein source with all 9 amino acids.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 25,
  },
  {
    name: "Greek Yogurt",
    price: 6.49,
    description:
      "Creamy Greek yogurt with probiotics. 500g container. Perfect for breakfast.",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 55,
  },
  {
    name: "Organic Chia Seeds",
    price: 13.99,
    description: "Raw organic chia seeds packed with omega-3s and fiber. 500g.",
    image:
      "https://images.unsplash.com/photo-1585707372406-e01b2b417141?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 28,
  },
  {
    name: "Organic Turmeric Powder",
    price: 7.99,
    description:
      "Pure organic turmeric powder with curcumin. Anti-inflammatory spice. 100g.",
    image:
      "https://images.unsplash.com/photo-1596040994211-a64c3c1b5f4e?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 42,
  },
  {
    name: "Cold Brew Coffee Beans",
    price: 15.99,
    description:
      "Premium cold brew coffee beans. Medium roast with smooth caramel notes. 250g.",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 38,
  },
  {
    name: "Organic Coconut Oil",
    price: 13.49,
    description:
      "Virgin coconut oil cold-pressed. Multi-purpose for cooking and skincare.",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b67?auto=format&fit=crop&w=900&q=80",
    category: "Grocery",
    stock: 44,
  },
];

module.exports = products;
