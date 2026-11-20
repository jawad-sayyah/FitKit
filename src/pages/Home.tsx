import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { categories, featuredProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

const perks = [
  { icon: Truck, title: "Free Delivery", text: "On all orders over $75" },
  { icon: RotateCcw, title: "30-Day Returns", text: "No questions asked" },
  { icon: ShieldCheck, title: "Quality Guarantee", text: "Gear that lasts" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-volt/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-flame/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="inline-block rounded-full border border-volt/40 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-volt">
              New season drop
            </p>
            <h1 className="mt-5 text-6xl font-extrabold leading-[0.95] sm:text-7xl lg:text-8xl">
              Train hard.
              <br />
              <span className="text-volt">Gear up.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Premium fitness equipment, apparel and accessories built for every
              rep, run and recovery day.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-volt px-8 py-4 font-bold uppercase tracking-wide text-ink transition hover:bg-volt-dark"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                to="/products?category=equipment"
                className="rounded-full border border-white/30 px-8 py-4 font-bold uppercase tracking-wide transition hover:border-volt hover:text-volt"
              >
                Equipment
              </Link>
            </div>
          </div>

          {/* Decorative hero collage (placeholder for real imagery) */}
          <div className="relative hidden h-105 lg:block">
            <div className="absolute right-0 top-0 h-64 w-64 rotate-6 rounded-3xl bg-linear-to-br from-volt to-lime-200" />
            <div className="absolute bottom-0 left-8 h-72 w-60 -rotate-6 rounded-3xl bg-linear-to-br from-flame to-orange-300" />
            <div className="absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-ink bg-steel font-display text-6xl font-extrabold text-volt">
              FK
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-line bg-mist">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-volt">
                <Icon size={22} />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-ink/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by category"
          linkTo="/products"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${c.id}`}
              className={`group relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-2xl bg-linear-to-br ${c.tone} p-5 text-white`}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="relative">
                <h3 className="text-3xl font-extrabold">{c.name}</h3>
                <p className="text-sm text-white/80">{c.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition group-hover:opacity-100">
                  Shop <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <SectionHeading
          eyebrow="Trending"
          title="Featured products"
          linkTo="/products"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-volt px-8 py-14 text-ink sm:px-14">
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-ink/10" />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">
            Limited time
          </p>
          <h2 className="mt-2 max-w-xl text-5xl font-extrabold leading-none sm:text-6xl">
            Save up to 25% on strength gear
          </h2>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-bold uppercase tracking-wide text-white hover:bg-steel"
          >
            Grab the deals <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
