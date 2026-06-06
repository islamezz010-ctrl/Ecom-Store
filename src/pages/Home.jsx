import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API } from "../lib/api";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCZmQc5B1XeBzqK-v0sywfyVyHSX_-iLyT0oJ0brUz2IWZvwfqc0aFMprdb4mid2nPhyWspvArWzsqZez0DbHNvmyb0BuU7I1CsWrV2LZV9tsIif9iYDfIl_rCf8JfsF_qbWnHI6l6-2UU2ciAedEENEz7qTmQ5qUC38DR8VirFDh5o2powr0Bh4EJAhnTmIMJs2UuNFb02cagllli_sQQy64xE2Hcm7_xONM5_Kf6MqauSEDyRSAbf1LHDvqB3BnAs5Guxh5ae3tAy";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#f0ecf4]">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-90"
            src={heroImage}
            alt="Premium tech and lifestyle products in a minimalist showroom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fcf8ff] via-[#fcf8ff]/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#006b5f]">
              Premium Utility
            </span>
            <h1 className="brand-heading text-5xl font-bold leading-tight text-[#1a146b] sm:text-6xl">
              Redefining the Modern Essential.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#474651]">
              Experience the intersection of high-performance technology and
              everyday lifestyle aesthetics. Curated for the discerning
              professional.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-lg bg-[#1a146b] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#312e81] active:scale-95"
              >
                Shop Now
              </a>
              <a
                href="#collections"
                className="rounded-lg border border-[#1a146b] px-8 py-4 text-sm font-bold text-[#1a146b] transition hover:bg-[#1a146b]/5 active:scale-95"
              >
                View Collections
              </a>
            </div>
          </div>
        </div>
      </section>

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
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl"
            >
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={collection.image}
                alt={collection.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a146b]/85 via-[#1a146b]/10 to-transparent" />
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((item) => (
                <ProductCard key={item._id ?? item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
