import { useState } from "react";
import { useParams } from "react-router-dom";
import SubcategoryGrid from "../components/SubcategoryGrid";
import ProductSlider from "../components/ProductSlider";
import ElectronicsCarousel from "../components/ElectronicsCarousel";
import FashionCarousel from "../components/FashionCarousel";
import BeautyCarousel from "../components/BeautyCarousel";
import HomeCarousel from "../components/HomeCarousel";
import BabyCarousel from "../components/BabyCarousel";
import ToysCarousel from "../components/ToysCarousel";
import SportsCarousel from "../components/SportsCarousel";
import GroceryCarousel from "../components/GroceryCarousel";
import StationaryBooksCarousel from "../components/StationaryBooksCarousel";
import ProductCard from "../components/ProductCard";
import HorizontalScroller from "../components/HorizontalScroller";

// Import all mock data
import {
  fashionTabs,
  fashionMensClothing,
  fashionWomensClothing,
  fashionShoes,
  fashionAccessories,
  fashionSubcategories,
  beautyTabs,
  beautySkincare,
  beautyFragrances,
  beautyMakeup,
  beautyHaircare,
  beautySubcategories,
  homeTabs,
  homeKitchen,
  homeLivingRoom,
  homeBedroom,
  homeAppliances,
  homeSubcategories,
  babyTabs,
  babyEssentials,
  babyClothing,
  babyGear,
  babyFeeding,
  babySubcategories,
  toysTabs,
  toysAction,
  toysBoard,
  toysEducational,
  toysOutdoor,
  toysSubcategories,
  sportsTabs,
  sportsFitness,
  sportsTeam,
  sportsOutdoor,
  sportsCycling,
  sportsSubcategories,
  groceryGrains,
  groceryBeverages,
  grocerySnacks,
  groceryFresh,
  stationaryBooksProducts,
  electronicsSpeakers,
  electronicsTelevisions,
  electronicsSmartwatches,
  electronicsTablets,
} from "../data/products";

// Inline reusable components
const CategorySubNav = ({ tabs, activeTab, setActiveTab }) => (
  <div className="bg-white border-b border-[#e5e1e9]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <HorizontalScroller
        ariaLabel="Category tabs"
        contentClassName="flex items-center gap-2 py-4"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab && setActiveTab(i)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
              activeTab === i || (activeTab === undefined && i === 0)
                ? "bg-[#e5e8f0] text-[#1a146b] border border-[#d0d3db]"
                : "bg-[#f6f2fa] text-[#474651] border border-transparent hover:bg-[#e5e8f0]"
            }`}
          >
            {tab}
          </button>
        ))}
      </HorizontalScroller>
    </div>
  </div>
);

const CategorySubcategoryGrid = ({ subcategories }) => (
  <div className="bg-gradient-to-r from-[#e3eef8] via-[#f7e3e7] to-[#fae5e6]">
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-y-10 gap-x-2">
        {subcategories.map((sub, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-transform group-hover:-translate-y-2 rounded-full overflow-hidden bg-white shadow-sm border border-white/40 p-2">
              <img
                src={sub.img}
                alt={sub.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-xs font-bold text-center text-gray-800 leading-tight">
              {sub.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CategoryProductSections = ({ sections }) => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
    {sections.map((section) => (
      <div key={section.title} className="mb-8">
        <h3 className="mb-4 text-sm font-semibold text-[#1b1b21]">
          {section.title}
        </h3>
        <HorizontalScroller
          ariaLabel={`${section.title} products`}
          contentClassName="flex gap-4 py-2"
        >
          {section.items.map((prod) => (
            <div key={prod.id} className="w-64 shrink-0">
              <ProductCard product={prod} />
            </div>
          ))}
        </HorizontalScroller>
      </div>
    ))}
  </section>
);

const CategoryPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const displayTitle = id
    ? id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Category";

  return (
    <div className="bg-[#fcf8ff]">
      {/* Category Sub-navs */}
      {id === "electronics" && (
        <CategorySubNav
          tabs={[
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
          ]}
        />
      )}
      {id === "grocery" && (
        <CategorySubNav
          tabs={[
            "All Groceries",
            "Grains & Cereals",
            "Spices & Seasonings",
            "Oils & Condiments",
            "Healthy Foods",
            "Beverages",
            "Baking Essentials",
            "Organic Products",
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      {id === "fashion" && (
        <CategorySubNav
          tabs={fashionTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      {id === "beauty-fragrance" && (
        <CategorySubNav
          tabs={beautyTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      {id === "home-appliances" && (
        <CategorySubNav
          tabs={homeTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      {id === "baby" && (
        <CategorySubNav
          tabs={babyTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      {id === "toys-games" && (
        <CategorySubNav
          tabs={toysTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      {id === "sports-outdoors" && (
        <CategorySubNav
          tabs={sportsTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {/* Hero Carousel Area */}
      {id === "electronics" && <ElectronicsCarousel />}
      {id === "fashion" && <FashionCarousel />}
      {id === "beauty-fragrance" && <BeautyCarousel />}
      {id === "home-appliances" && <HomeCarousel />}
      {id === "baby" && <BabyCarousel />}
      {id === "toys-games" && <ToysCarousel />}
      {id === "sports-outdoors" && <SportsCarousel />}
      {id === "grocery" && <GroceryCarousel />}

      {/* Stationary Books Carousel */}
      {id === "stationary-books" && (
        <div className="flex justify-center py-12 bg-white">
          <StationaryBooksCarousel />
        </div>
      )}

      {/* Subcategory Grids */}
      {id === "electronics" && <SubcategoryGrid />}
      {id === "fashion" && (
        <CategorySubcategoryGrid subcategories={fashionSubcategories} />
      )}
      {id === "beauty-fragrance" && (
        <CategorySubcategoryGrid subcategories={beautySubcategories} />
      )}
      {id === "home-appliances" && (
        <CategorySubcategoryGrid subcategories={homeSubcategories} />
      )}
      {id === "baby" && (
        <CategorySubcategoryGrid subcategories={babySubcategories} />
      )}
      {id === "toys-games" && (
        <CategorySubcategoryGrid subcategories={toysSubcategories} />
      )}
      {id === "sports-outdoors" && (
        <CategorySubcategoryGrid subcategories={sportsSubcategories} />
      )}

      {/* Product Sections */}
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
        <CategoryProductSections
          sections={[
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
          ]}
        />
      ) : id === "fashion" ? (
        <CategoryProductSections
          sections={[
            { title: "Men's Clothing | Top Picks", items: fashionMensClothing },
            {
              title: "Women's Collection | Trending",
              items: fashionWomensClothing,
            },
            { title: "Shoes | Best Sellers", items: fashionShoes },
            { title: "Accessories | Must-Haves", items: fashionAccessories },
          ]}
        />
      ) : id === "beauty-fragrance" ? (
        <CategoryProductSections
          sections={[
            { title: "Skincare | Best Sellers", items: beautySkincare },
            { title: "Fragrances | Premium", items: beautyFragrances },
            { title: "Makeup | Trending", items: beautyMakeup },
            { title: "Haircare | Top Rated", items: beautyHaircare },
          ]}
        />
      ) : id === "home-appliances" ? (
        <CategoryProductSections
          sections={[
            { title: "Kitchen | Must-Haves", items: homeKitchen },
            { title: "Living Room | Trending", items: homeLivingRoom },
            { title: "Bedroom | Comfort", items: homeBedroom },
            { title: "Appliances | Smart Living", items: homeAppliances },
          ]}
        />
      ) : id === "baby" ? (
        <CategoryProductSections
          sections={[
            { title: "Essentials | Top Picks", items: babyEssentials },
            { title: "Clothing | Adorable", items: babyClothing },
            { title: "Gear | Must-Haves", items: babyGear },
            { title: "Feeding | Best Sellers", items: babyFeeding },
          ]}
        />
      ) : id === "toys-games" ? (
        <CategoryProductSections
          sections={[
            { title: "Action & Building | Top Picks", items: toysAction },
            { title: "Board Games | Family Fun", items: toysBoard },
            { title: "Educational | STEM", items: toysEducational },
            { title: "Outdoor | Adventure", items: toysOutdoor },
          ]}
        />
      ) : id === "sports-outdoors" ? (
        <CategoryProductSections
          sections={[
            { title: "Fitness | Top Equipment", items: sportsFitness },
            { title: "Team Sports | Game On", items: sportsTeam },
            { title: "Outdoor Adventure | Explore", items: sportsOutdoor },
            { title: "Cycling | Gear Up", items: sportsCycling },
          ]}
        />
      ) : id === "grocery" ? (
        <CategoryProductSections
          sections={[
            {
              title: "Grains & Cereals | Pantry Staples",
              items: groceryGrains,
            },
            { title: "Beverages | Refreshing", items: groceryBeverages },
            { title: "Snacks | Tasty", items: grocerySnacks },
            { title: "Fresh & Organic", items: groceryFresh },
          ]}
        />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 text-center">
          <h2 className="text-3xl font-bold mb-4">{displayTitle}</h2>
          <p className="text-xl text-gray-500">
            Products coming soon in this category!
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
