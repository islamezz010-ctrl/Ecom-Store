const products = [
  // ===== ELECTRONICS =====
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
    category: "Home & Appliances",
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
    category: "Home & Appliances",
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
    category: "Home & Appliances",
    stock: 9,
  },
  {
    name: "Orbit Travel Tumbler",
    price: 34.95,
    description:
      "Vacuum-insulated stainless steel tumbler that keeps drinks hot or cold for hours.",
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80",
    category: "Home & Appliances",
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
  // Additional Electronics
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 349.99,
    description: "Industry-leading noise cancellation with premium sound quality and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Samsung 65\" QLED 4K TV",
    price: 1299.99,
    description: "Stunning QLED display with Quantum HDR and ultra-slim design for immersive viewing.",
    image: "https://images.unsplash.com/photo-1593351143522-6f9d8b1a0c5f?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 8,
  },
  {
    name: "Apple iPad Air M2 11\"",
    price: 599.99,
    description: "Powerful iPad Air with M2 chip, Liquid Retina display, and all-day battery life.",
    image: "https://images.unsplash.com/photo-1580910051073-0c9a9a3b4850?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 1099.99,
    description: "Premium Android tablet with Dynamic AMOLED 2X display and S Pen included.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 12,
  },
  {
    name: "Apple Watch Series 9",
    price: 399.99,
    description: "Advanced health features including blood oxygen monitoring and ECG app.",
    image: "https://images.unsplash.com/photo-1541534401786-27bd39d3dff2?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Samsung Galaxy Watch 6 Classic",
    price: 329.99,
    description: "Premium smartwatch with rotating bezel, sleep coaching, and body composition analysis.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 18,
  },
  {
    name: "Bose QuietComfort Earbuds II",
    price: 279.99,
    description: "World-class noise cancellation with CustomTune technology for personalized sound.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 22,
  },
  {
    name: "JBL PartyBox 310",
    price: 499.99,
    description: "Powerful portable Bluetooth speaker with dynamic light show and deep bass.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "MacBook Air M3 15\"",
    price: 1299.99,
    description: "Ultra-thin laptop with M3 chip, 18-hour battery, and stunning Liquid Retina display.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 14,
  },
  {
    name: "Dell XPS 15 Laptop",
    price: 1499.99,
    description: "Premium ultrabook with InfinityEdge display, Intel i9, and NVIDIA RTX graphics.",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    stock: 8,
  },
  // ===== FASHION =====
  {
    name: "Classic Fit Suit Jacket",
    price: 249.99,
    description: "Tailored wool-blend suit jacket perfect for business and formal occasions.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 15,
  },
  {
    name: "Premium Denim Jeans",
    price: 89.99,
    description: "Comfort-fit selvedge denim jeans made from premium Japanese denim.",
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 30,
  },
  {
    name: "Floral Summer Dress",
    price: 79.99,
    description: "Lightweight floral midi dress with adjustable waist tie and flowy silhouette.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 25,
  },
  {
    name: "Cashmere Blend Scarf",
    price: 59.99,
    description: "Luxuriously soft cashmere-merino blend scarf in classic herringbone pattern.",
    image: "https://images.unsplash.com/photo-1601924921557-45e6ddf05b91?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 40,
  },
  {
    name: "Leather Crossbody Phone Bag",
    price: 69.99,
    description: "Compact genuine leather crossbody bag with RFID protection and adjustable strap.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 35,
  },
  {
    name: "Nike Air Max 270",
    price: 149.99,
    description: "Iconic sneakers with Nike Air cushioning and breathable mesh upper.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 20,
  },
  {
    name: "Adidas Ultraboost Light",
    price: 189.99,
    description: "Ultra-comfortable running shoes with Light BOOST midsole for maximum energy return.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 16,
  },
  {
    name: "Ray-Ban Aviator Classic",
    price: 153.99,
    description: "Timeless aviator sunglasses with gold frame and polarized green glass lenses.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 28,
  },
  {
    name: "Timberland Premium 6-Inch Boots",
    price: 198.99,
    description: "Iconic waterproof leather boots with seam-sealed construction and padded collar.",
    image: "https://images.unsplash.com/photo-1543508283-b1f5d7e45eb5?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 12,
  },
  {
    name: "Levi's 501 Original Fit Jeans",
    price: 69.99,
    description: "The original blue jean since 1873. Straight-leg, button-fly, authentic denim.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    stock: 32,
  },
  // ===== GROCERY =====
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
  // ===== BEAUTY & FRAGRANCE =====
  {
    name: "Vitamin C Brightening Serum",
    price: 34.99,
    description: "Powerful 20% vitamin C serum with hyaluronic acid for glowing skin.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    category: "Beauty & Fragrance",
    stock: 30,
  },
  {
    name: "Retinol Anti-Aging Night Cream",
    price: 54.99,
    description: "Advanced retinol formula that reduces fine lines and improves skin texture overnight.",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4c38b8e?auto=format&fit=crop&w=900&q=80",
    category: "Beauty & Fragrance",
    stock: 22,
  },
  {
    name: "Chanel No. 5 Eau de Parfum",
    price: 139.99,
    description: "The iconic floral-aldehyde fragrance. Timeless elegance in every spray.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    category: "Beauty & Fragrance",
    stock: 15,
  },
  {
    name: "Fenty Beauty Pro Filt'r Foundation",
    price: 38.99,
    description: "Soft-matte, long-wear foundation with 50 shades for every skin tone.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    category: "Beauty & Fragrance",
    stock: 28,
  },
  {
    name: "Olaplex No. 3 Hair Perfector",
    price: 28.99,
    description: "At-home bond building treatment that repairs damaged hair from within.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80",
    category: "Beauty & Fragrance",
    stock: 40,
  },
  {
    name: "Moroccanoil Treatment Hair Oil",
    price: 34.99,
    description: "Lightweight argan oil hair treatment for smooth, shiny, frizz-free hair.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
    category: "Beauty & Fragrance",
    stock: 35,
  },
  // ===== HOME & APPLIANCES =====
  {
    name: "Ninja Air Fryer Pro",
    price: 129.99,
    description: "4-in-1 air fryer with 5-quart capacity, 7 cooking functions, and crisp finish.",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=900&q=80",
    category: "Home & Appliances",
    stock: 20,
  },
  {
    name: "KitchenAid Stand Mixer Artisan",
    price: 449.99,
    description: "Iconic tilt-head stand mixer with 5-quart stainless steel bowl and 10 speeds.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
    category: "Home & Appliances",
    stock: 8,
  },
  {
    name: "Dyson V15 Detect Cordless Vacuum",
    price: 749.99,
    description: "Laser detects microscopic dust. Piezo sensor counts particles. 60-minute runtime.",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80",
    category: "Home & Appliances",
    stock: 10,
  },
  {
    name: "iRobot Roomba j7+ Robot Vacuum",
    price: 599.99,
    description: "Intelligent robot vacuum with PrecisionVision navigation and self-emptying base.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=80",
    category: "Home & Appliances",
    stock: 12,
  },
  {
    name: "Tempur-Pedic Memory Foam Pillow",
    price: 79.99,
    description: "Ergonomically designed memory foam pillow with cooling cover for restful sleep.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    category: "Home & Appliances",
    stock: 45,
  },
  {
    name: "Nest Learning Thermostat 4th Gen",
    price: 249.99,
    description: "Smart thermostat that learns your schedule and adjusts to save energy.",
    image: "https://images.unsplash.com/photo-1567925086728-19fc663a3a64?auto=format&fit=crop&w=900&q=80",
    category: "Home & Appliances",
    stock: 18,
  },
  // ===== BABY =====
  {
    name: "Graco 4Ever DLX Car Seat",
    price: 299.99,
    description: "4-in-1 car seat that grows with your child from infant to booster.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=80",
    category: "Baby",
    stock: 12,
  },
  {
    name: "UPPAbaby Vista V2 Stroller",
    price: 899.99,
    description: "Premium modular stroller that converts from single to double. Suitable from birth.",
    image: "https://images.unsplash.com/photo-1519689680058-2b0e6019e484?auto=format&fit=crop&w=900&q=80",
    category: "Baby",
    stock: 5,
  },
  {
    name: "Baby Bjorn Baby Carrier One",
    price: 179.99,
    description: "Ergonomic baby carrier with 4 carrying positions from newborn to toddler.",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80",
    category: "Baby",
    stock: 18,
  },
  {
    name: "Philips Avent Baby Bottles Set",
    price: 39.99,
    description: "Natural response baby bottles with anti-colic system. 4-pack, 8oz each.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
    category: "Baby",
    stock: 35,
  },
  // ===== TOYS & GAMES =====
  {
    name: "LEGO Harry Potter Hogwarts Castle",
    price: 249.99,
    description: "Stunning 6,020-piece LEGO replica of Hogwarts Castle with 4 minifigures.",
    image: "https://images.unsplash.com/photo-1587654780014-d1e6a5ca0f0d?auto=format&fit=crop&w=900&q=80",
    category: "Toys & Games",
    stock: 6,
  },
  {
    name: "Nintendo Switch OLED Model",
    price: 349.99,
    description: "Nintendo Switch with vibrant 7-inch OLED screen, wide kickstand, and 64GB storage.",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=900&q=80",
    category: "Toys & Games",
    stock: 15,
  },
  {
    name: "Hasbro Monopoly Board Game",
    price: 29.99,
    description: "Classic Monopoly game with updated tokens, cards, and fast-play rules.",
    image: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?auto=format&fit=crop&w=900&q=80",
    category: "Toys & Games",
    stock: 50,
  },
  // ===== SPORTS & OUTDOORS =====
  {
    name: "Bowflex SelectTech 552 Dumbbells",
    price: 349.99,
    description: "Adjustable dumbbell set that replaces 15 sets. Weights from 5 to 52.5 lbs each.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    category: "Sports & Outdoors",
    stock: 8,
  },
  {
    name: "Coleman Sundome 4-Person Tent",
    price: 89.99,
    description: "Easy-setup dome tent with WeatherTec system and 75 square feet of space.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    category: "Sports & Outdoors",
    stock: 20,
  },
  {
    name: "Hydro Flask 32oz Water Bottle",
    price: 44.99,
    description: "Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold 24hrs.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    category: "Sports & Outdoors",
    stock: 60,
  },
  {
    name: "Wilson Evolution Basketball",
    price: 64.99,
    description: "Official game basketball with premium composite leather and moisture-wicking cover.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
    category: "Sports & Outdoors",
    stock: 25,
  },
  // ===== STATIONARY & BOOKS =====
  {
    name: "Moleskine Classic Notebook Set",
    price: 29.99,
    description: "Set of 3 classic hardcover notebooks with ruled pages and expandable inner pocket.",
    image: "https://images.unsplash.com/photo-1507842217343-583f7270bfbb?auto=format&fit=crop&w=900&q=80",
    category: "Stationary & Books",
    stock: 40,
  },
  {
    name: "Sharpie Permanent Marker 24-Pack",
    price: 19.99,
    description: "Assorted color permanent markers with fine point tips. Bold marks on most surfaces.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80",
    category: "Stationary & Books",
    stock: 55,
  },
  {
    name: "Pilot G2 Premium Gel Pen Set",
    price: 14.99,
    description: "Set of 10 premium gel ink pens with smooth writing and comfortable grip.",
    image: "https://images.unsplash.com/photo-1604870945410-e4f36441ebb8?auto=format&fit=crop&w=900&q=80",
    category: "Stationary & Books",
    stock: 65,
  },
];

module.exports = products;