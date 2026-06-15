import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import ProductFilters from "../components/ProductFilters";
import { API } from "../lib/api";

const collections = [
  {
    title: "Electronics",
    copy: "Technical excellence for your workflow.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_VSbN-j1bfasw6TIegPWQFsPoVmNJnjiPp7Pa3b810f3C2aGRpV9nmI2I4_Whfy7CCpLg-sGXdDr145CMjQHn07FC_-mVGiEw8r3mXzX-7STFwGvZPrTxE4mcdI_rcldF1NXNDbJ9e-VyGK0z_oDeVre5uiemAEa6vi76t9jeQ48P4MpLbfZ926dUTQe83dEghTE2PDmoG7htot2Db4g_j9ZaVVVMZ7Sr8HeLnlt9x-17ZXN8rcMz3fjNJ4w4X-B1TRBgehSBonmp",
  },
  {
    title: "Fashion",
    copy: "Timeless silhouettes, modern materials.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfXvS950T_XRFxtRAW152pddqClhES8z7VisYHOXo4JVTG3eMb1Cw9EXLCua3EK67b850oVpxwQrP-Omip2uC5KoTUPmUuIPTe8jZN7OcdpBLN2wBSpCzpEJ_j7ITZreeEWcgoPdWw7zGNyGNtzCw7DljTq52M1IOU5x9lSBb5khaO656QXBfLZV9J7ZTj4dFqNx7ESvOFCu1ph7hesUTy_NJ2VJjYBFBkNbstUFsVwDRAuP0hRkYt-b2V7Z_sZKDZ9K67yUPke1QT",
  },
  {
    title: "Home & Living",
    copy: "Elevate your personal sanctuary.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKzHGtruok5Utot-fGiSXRjYzno2vqJwuP0tJi7HzJx0Z3U7vKPz3EIdCM7LmY06qHECioO1xY7R7HkoQPfjun1_aPQIJEIkHsz6biOnF4xPtii4AN90VLLIZuvNL7sji9eeMEyNHe9SFJbum-cYu6mxFO36Xia6QOzjrY-XKWS2yW_rVxTNqFlOnxocJuEG93e9xBef7UVwwUakcnj6hKGlxu6NapYs12C_YBnC-u4TuPogf9AXxcmAT9m7qZs7mhgWJvbTz3c_Lc",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API}/api/products/categories`);
        const data = await response.json();
        if (Array.isArray(data)) setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory) params.append("category", selectedCategory);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sort !== "newest") params.append("sort", sort);

        const queryString = params.toString();
        const url = `${API}/api/products${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);
        const data = await response.json();
        // API may return either a raw array or a paginated object { products, page, pages, total }
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce fetch slightly to avoid spamming while typing prices
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, minPrice, maxPrice, sort]);

  return (
    <main>
      <Carousel />

      <section
        id="collections"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10"
      >
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="brand-heading text-3xl font-semibold text-[#1b1b21]">
              Curated Collections
            </h2>
            <p className="mt-2 text-[#474651]">
              Precision-engineered pieces for every facet of life.
            </p>
          </div>
          <a
            className="font-semibold text-[#006b5f] hover:underline"
            href="#products"
          >
            Explore all categories
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <article
              key={collection.title}
              className="group relative aspect-4/5 overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl"
            >
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={collection.image}
                alt={collection.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a146b]/85 via-[#1a146b]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="brand-heading text-2xl font-semibold">
                  {collection.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-white/90">
                  {collection.copy}
                </p>
                <span className="mt-6 inline-flex rounded-full bg-[#006b5f] px-4 py-2 text-sm font-bold">
                  View
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="products" className="bg-[#f6f2fa] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#006b5f]">
                Exclusive Collection
              </span>
              <h2 className="brand-heading text-4xl font-bold text-[#1a146b]">
                All Products
              </h2>
              <p className="mt-2 text-[#474651]">
                Carefully curated essentials for work, travel, and everyday
                rituals.
              </p>
            </div>
            <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#474651] shadow-sm">
              {loading ? "Loading..." : `${products.length} items found`}
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white text-xl font-bold text-[#777682] shadow-sm">
              Loading New Arrivals...
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <aside className="w-full lg:w-1/4 shrink-0">
                <ProductFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  minPrice={minPrice}
                  onMinPriceChange={setMinPrice}
                  maxPrice={maxPrice}
                  onMaxPriceChange={setMaxPrice}
                  sort={sort}
                  onSortChange={setSort}
                  onClearFilters={() => {
                    setSelectedCategory("");
                    setMinPrice("");
                    setMaxPrice("");
                    setSort("newest");
                  }}
                />
              </aside>
              <div className="flex-1">
                {products.length === 0 ? (
                  <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white text-xl font-bold text-[#777682] shadow-sm border border-[#e5e1e9]">
                    No products found matching your filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {products.map((item) => (
                      <ProductCard key={item._id ?? item.id} product={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
