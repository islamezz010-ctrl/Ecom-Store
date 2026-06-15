import { useState } from "react";
import { useParams } from "react-router-dom";
import SubcategoryGrid from "../components/SubcategoryGrid";
import ProductSlider from "../components/ProductSlider";
import CategoryCarousel from "../components/CategoryCarousel";
import StationaryBooksCarousel from "../components/StationaryBooksCarousel";
import ProductCard from "../components/ProductCard";

// Mock products for Stationary & Books
const stationaryBooksProducts = [
  {
    id: 1,
    name: "Premium Hardcover Notebook",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1507842217343-583f7270bfbb?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Notebooks",
  },
  {
    id: 2,
    name: "Ruled Spiral Notebook",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Notebooks",
  },
  {
    id: 3,
    name: "Bullet Journal Set",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Notebooks",
  },
  {
    id: 4,
    name: "Professional Highlighter Set (12-pack)",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Markers & Highlighters",
  },
  {
    id: 5,
    name: "Premium Gel Pen Set",
    price: 11.99,
    image:
      "https://images.unsplash.com/photo-1604870945410-e4f36441ebb8?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Pens",
  },
  {
    id: 6,
    name: "Permanent Markers Collection",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Markers & Highlighters",
  },
  {
    id: 7,
    name: "Stainless Steel Desk Lamp",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Office Essentials",
  },
  {
    id: 8,
    name: "Desk Organizer Set",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1612548403641-d8c50ba89177?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Office Essentials",
  },
  {
    id: 9,
    name: "Coloring Pencils (48-pack)",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Art Supplies",
  },
  {
    id: 10,
    name: "Watercolor Paint Set",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Art Supplies",
  },
  {
    id: 11,
    name: "Sketch Pad (200 sheets)",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1507842217343-583f7270bfbb?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Art Supplies",
  },
  {
    id: 12,
    name: "Fiction Novel Bundle (3 books)",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e3ffe02?auto=format&fit=crop&q=80&w=400&h=400",
    category: "Books",
  },
];

// Mock products for Electronics
const electronicsSpeakers = [
  {
    id: 101,
    name: "soundcore Select 4",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1600180758890-9c2f3c0b3b1b?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 102,
    name: "Clip 5 Ultra",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1595986813912-d4f1b1e8f1c0?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 103,
    name: "Pyro Mini",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1526178614259-2c5a2b1f9191?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 104,
    name: "SpaceBox",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1617191515702-4a0f9a3c1a1e?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 105,
    name: "X Series",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1606813904660-45b6d0f3f9b0?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

const electronicsTelevisions = [
  {
    id: 201,
    name: "LG UHD TV",
    price: 399.99,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 202,
    name: "LG Nano Cell TVs",
    price: 499.99,
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552281b3d?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 203,
    name: "LG QNED TVs",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 204,
    name: "LG OLED TVs",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e9a0?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

const electronicsSmartwatches = [
  {
    id: 301,
    name: "Oraimo Watch 6",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1541534401786-27bd39d3dff2?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 302,
    name: "Redmi Watch 5",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1593566705108-4f59fa4b389f?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 303,
    name: "Infinix XW1 Watch",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 304,
    name: "HONOR Magic Watch 2",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

const electronicsTablets = [
  {
    id: 401,
    name: "iPad Air",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1580910051073-0c9a9a3b4850?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 402,
    name: "HONOR PAD X8a",
    price: 229.99,
    image:
      "https://images.unsplash.com/photo-1629784151993-fbbd0d2b5b2d?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 403,
    name: "Redmi Pad SE",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1612831819738-2d1a5c0f3f7c?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 404,
    name: "Samsung Galaxy Tab A9",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 405,
    name: "iPad Pro",
    price: 999.99,
    image:
      "https://images.unsplash.com/photo-1580910051073-0c9a9a3b4850?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

const CategoryPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  // Create a nice display title from the URL id (e.g., "electronics" -> "Electronics")
  const displayTitle = id
    ? id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Category";

  return (
    <div className="bg-[#fcf8ff]">
      {/* Category Sub-nav for Electronics */}
      {id === "electronics" && (
        <div className="bg-white border-b border-[#e5e1e9]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-2 overflow-x-auto py-4 hide-scrollbar">
              {[
                "Electronics",
                "Mobiles",
                "Headsets",
                "Wearables",
                "Accessories",
                "Laptops",
                "Laptop Accessories",
                "Gaming",
                "TVs",
                "Cameras",
                "Appliances",
              ].map((tab, i) => (
                <button
                  key={tab}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                    i === 0
                      ? "bg-[#e5e8f0] text-[#1a146b] border border-[#d0d3db]"
                      : "bg-[#f6f2fa] text-[#474651] border border-transparent hover:bg-[#e5e8f0]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Sub-nav for Grocery */}
      {id === "grocery" && (
        <div className="bg-white border-b border-[#e5e1e9]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-2 overflow-x-auto py-4 hide-scrollbar">
              {[
                "All Groceries",
                "Grains & Cereals",
                "Spices & Seasonings",
                "Oils & Condiments",
                "Healthy Foods",
                "Beverages",
                "Baking Essentials",
                "Organic Products",
              ].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                    i === activeTab
                      ? "bg-[#e5e8f0] text-[#1a146b] border border-[#d0d3db]"
                      : "bg-[#f6f2fa] text-[#474651] border border-transparent hover:bg-[#e5e8f0]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Carousel Area */}
      {id !== "stationary-books" && <CategoryCarousel />}

      {/* Stationary Books Carousel - Only for stationary-books category */}
      {id === "stationary-books" && (
        <div className="flex justify-center py-12 bg-white">
          <StationaryBooksCarousel />
        </div>
      )}

      {/* Subcategory Icon Grid - Only for non-grocery categories */}
      {id !== "grocery" && id !== "stationary-books" && <SubcategoryGrid />}

      {/* Product Sliders based on category */}
      {id === "stationary-books" ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
          <div className="mb-10">
            <h2 className="brand-heading text-3xl font-semibold text-[#1b1b21] mb-2">
              Stationary & Books Collection
            </h2>
            <p className="text-gray-600">
              Browse our extensive collection of notebooks, pens, markers,
              office essentials, and books
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stationaryBooksProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : id === "electronics" ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
          <div className="mb-8">
            <h2 className="brand-heading text-3xl font-semibold text-[#1b1b21] mb-2">
              Electronics
            </h2>
            <p className="text-gray-600">
              Top trending picks across speakers, TVs, smartwatches, and
              tablets.
            </p>
          </div>

          {[
            { title: "Speakers | Top & Trending", items: electronicsSpeakers },
            {
              title: "Televisions | Top & Trending",
              items: electronicsTelevisions,
            },
            {
              title: "Smartwatches | Top & Trending",
              items: electronicsSmartwatches,
            },
            { title: "Tablets | Top & Trending", items: electronicsTablets },
          ].map((section) => (
            <div key={section.title} className="mb-8">
              <h3 className="mb-4 text-sm font-semibold text-[#1b1b21]">
                {section.title}
              </h3>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
                {section.items.map((prod) => (
                  <div key={prod.id} className="w-44 flex-shrink-0">
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : id === "grocery" ? (
        <>
          <ProductSlider title="All Groceries" category="Grocery" />
          <ProductSlider title="Organic Products" category="Grocery" />
          <ProductSlider title="Popular Choices" category="Grocery" />
        </>
      ) : (
        <>
          <ProductSlider
            title="Mobiles and Accessories"
            category="smartphones"
          />
          <ProductSlider title="Top Rated Laptops" category="laptops" />
        </>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
