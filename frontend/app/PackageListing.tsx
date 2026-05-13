"use client";

import { useMemo, useState } from "react";

function HeadingFont({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontVariationSettings:
          "'opsz' 144, 'wght' 600, 'wdth' 40, 'GRAD' 0, 'slnt' 0, 'XTRA' 468, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738",
      }}
    >
      {children}
    </span>
  );
}

type PackageItem = any;

function getPrice(item: PackageItem) {
  const rawPrice = String(item.acf?.price ?? "0");

  return Number(rawPrice.replace(",", ".").replace(/[^\d.]/g, ""));
}

function getImageSrc(item: PackageItem) {
  const imageUrl = String(item.acf?.image_url || "");

  if (imageUrl.startsWith("/images/")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `/images/packages/${imageUrl}`;
}

function FilterContent({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  ranges,
  selectedRanges,
  toggleRange,
  variant = "desktop",
}: any) {
  const isMobile = variant === "mobile";

  return (
    <aside
      className={
        isMobile
          ? "min-h-[100dvh] w-full bg-[#F5F5F5] p-6 pb-[120px] backdrop-blur-[16px]"
          : "h-auto w-full rounded-[12px] bg-white/80 p-6 shadow-[0_24px_32px_-12px_rgba(0,0,0,0.10)] backdrop-blur-[16px] lg:h-[889px] lg:w-[312px]"
      }
    >
      <h3 className="mb-10 whitespace-nowrap text-[31px] leading-[31px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
        <HeadingFont>ΦΙΛΤΡΑ</HeadingFont>
      </h3>

      <div className="space-y-8">
        <div>
          <p className="mb-6 whitespace-nowrap text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
            <HeadingFont>ΕΥΡΟΣ ΤΙΜΗΣ</HeadingFont>
          </p>

          <div className="mb-5 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] leading-[14px] text-[#555563]">
                Από
              </label>

              <input
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="€"
                type="number"
                className="h-[40px] rounded-[8px] border border-[#BEBEBE] bg-white/80 px-4 text-[14px] leading-[16px] text-[#838393] outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] leading-[14px] text-[#555563]">
                Έως
              </label>

              <input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="€"
                type="number"
                className="h-[40px] rounded-[8px] border border-[#BEBEBE] bg-white/80 px-4 text-[14px] leading-[16px] text-[#838393] outline-none"
              />
            </div>
          </div>

          <img
            src="/filters/chart.svg"
            alt="Price chart"
            className="mb-5 h-auto w-full"
          />

          <div className="space-y-4 text-[14px] leading-[16px] text-[#555563]">
            {ranges.map((range: any) => (
              <label key={range.id} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={selectedRanges.includes(range.id)}
                  onChange={() => toggleRange(range.id)}
                  className="mt-0 h-4 w-4 shrink-0 cursor-pointer rounded border-[#BEBEBE]"
                />

                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {[1, 2].map((section) => (
          <div key={section} className="space-y-6">
            <p className="whitespace-nowrap text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
              <HeadingFont>ΦΙΛΤΡΟ</HeadingFont>
            </p>

            <div className="space-y-4 text-[14px] leading-[16px] text-[#555563]">
              {[1, 2, 3, 4, 5].map((item) => (
                <label key={item} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 cursor-pointer rounded border-[#BEBEBE]"
                  />

                  <span>Φίλτρο</span>
                </label>
              ))}
            </div>

            {section === 1 && <div className="h-px w-full bg-black/10" />}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function PackageListing({
  packages,
}: {
  packages: PackageItem[];
}) {
  const [sort, setSort] = useState("popular");
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const ranges = [
    { id: "under50", label: "Έως 50 €", min: 0, max: 50 },
    { id: "50to150", label: "50 - 150 €", min: 50, max: 150 },
    { id: "150to500", label: "150 - 500 €", min: 150, max: 500 },
  ];

  function toggleRange(id: string) {
    setSelectedRanges((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const filteredPackages = useMemo(() => {
    let result = [...packages];

    if (minPrice) {
      result = result.filter((item) => getPrice(item) >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((item) => getPrice(item) <= Number(maxPrice));
    }

    if (selectedRanges.length > 0) {
      result = result.filter((item) => {
        const price = getPrice(item);

        return ranges.some(
          (range) =>
            selectedRanges.includes(range.id) &&
            price >= range.min &&
            price <= range.max
        );
      });
    }

    if (sort === "priceAsc") {
      result.sort((a, b) => getPrice(a) - getPrice(b));
    }

    if (sort === "priceDesc") {
      result.sort((a, b) => getPrice(b) - getPrice(a));
    }

    return result;
  }, [packages, sort, selectedRanges, minPrice, maxPrice]);

  const filtersProps = {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    ranges,
    selectedRanges,
    toggleRange,
  };

  return (
    <>
      <input id="filters-drawer" type="checkbox" className="peer hidden" />

      {/* Mobile / tablet fullscreen filters */}
      <div className="fixed inset-0 z-[9999] hidden h-[100dvh] w-[100vw] overflow-hidden bg-[#F5F5F5] peer-checked:block lg:hidden">
        <div className="relative h-[100dvh] w-full overflow-y-auto bg-[#F5F5F5]">
          <FilterContent {...filtersProps} variant="mobile" />

          <label
            htmlFor="filters-drawer"
            className="fixed right-4 top-4 z-[10001] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/80 text-[22px] text-[#555563] shadow-[0_24px_32px_-12px_rgba(0,0,0,0.50)] backdrop-blur-[16px]"
          >
            ×
          </label>

          <div className="fixed bottom-4 left-1/2 z-[10000] flex h-[80px] w-[calc(100vw-32px)] max-w-[328px] -translate-x-1/2 items-center rounded-[12px] border border-black/10 bg-white/80 px-4 py-4 backdrop-blur-[16px]">
            <label
              htmlFor="filters-drawer"
              className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[8px] border border-[#009649] bg-[#009649] text-[14px] font-[500] text-white transition-all duration-300 hover:bg-[#00B9F2]"
            >
              Εφαρμογή
            </label>
          </div>
        </div>
      </div>

      <div className="relative z-30 mt-0 flex w-full max-w-[1328px] flex-col items-center gap-6 md:mt-0 md:flex-row md:items-start">
        {/* Desktop sidebar */}
        <div className="hidden h-[955px] w-[312px] shrink-0 pt-[66px] backdrop-blur-[16px] lg:block">
          <FilterContent {...filtersProps} />
        </div>

        <div className="flex w-full flex-col items-center gap-6 lg:w-[984px]">
          {/* Mobile / tablet toolbar */}
          <div className="flex w-full max-w-[430px] flex-col items-center gap-4 px-4 md:max-w-[760px] lg:hidden">
            <p className="w-full text-center text-[16px] leading-[28px] font-[600] text-[#555563]">
              {filteredPackages.length} διαθέσιμα πακέτα διακοπών
            </p>

            <div className="flex w-full items-center justify-between gap-4">
              <label
                htmlFor="filters-drawer"
                className="flex h-[42px] w-[128px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#009649] text-[14px] font-[500] text-[#009649]"
              >
                <img
                  src="/icons/settings.svg"
                  alt="Filters"
                  className="h-4 w-4 object-contain"
                />

                <span>Φίλτρα</span>
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-[42px] flex-1 rounded-lg border border-[#BEBEBE] bg-white/80 px-4 text-[14px] text-[#555563] outline-none"
              >
                <option value="popular">Δημοφιλή</option>
                <option value="priceAsc">Τιμή: χαμηλή προς υψηλή</option>
                <option value="priceDesc">Τιμή: υψηλή προς χαμηλή</option>
              </select>
            </div>
          </div>

          {/* Desktop top bar */}
          <div className="hidden w-full items-center justify-between lg:flex">
            <p className="text-[14px] leading-[14px] text-[#555563]">
              {filteredPackages.length} διαθέσιμα πακέτα διακοπών
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-[220px] rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm text-gray-500 outline-none"
            >
              <option value="popular">Δημοφιλή</option>
              <option value="priceAsc">Τιμή: χαμηλή προς υψηλή</option>
              <option value="priceDesc">Τιμή: υψηλή προς χαμηλή</option>
            </select>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="flex min-h-[260px] w-full max-w-[430px] items-center justify-center rounded-[12px] bg-white/70 p-8 text-center text-[#555563] md:max-w-[760px] lg:max-w-none">
              Δεν βρέθηκαν αποτελέσματα για τα φίλτρα που επιλέξατε.
            </div>
          ) : (
            <div className="grid w-full max-w-[430px] grid-cols-1 gap-4 px-4 pb-0 md:max-w-[760px] md:grid-cols-2 md:gap-6 lg:max-w-none lg:w-[984px] lg:grid-cols-3 lg:px-0 lg:pb-6">
              {filteredPackages.map((item: any) => (
                <article
                  key={item.id}
                  className="h-[448px] w-full overflow-hidden rounded-[12px] bg-white/80 shadow-[0_24px_32px_-12px_rgba(0,0,0,0.10)] backdrop-blur-[16px] transition-transform duration-300 hover:-translate-y-1 md:h-[479px]"
                >
                  <img
                    src={getImageSrc(item)}
                    alt={item.title.rendered}
                    className="h-[282px] w-full rounded-[12px] object-cover"
                  />

                  <div className="flex h-[166px] w-full flex-col items-start justify-end gap-2 px-4 pb-4 pt-3 md:h-[197px] md:px-6 md:pb-6 md:pt-5">
                    <div className="flex h-[82px] w-full flex-col items-start justify-end gap-2 overflow-hidden md:h-[97px]">
                      <p className="w-full text-[12px] leading-[14px] text-[#838393] md:text-[#9CA3AF]">
                        {item.acf.subtitle}
                      </p>

                      <h2 className="h-[60px] w-full text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563] md:h-[75px]">
                        <HeadingFont>{item.title.rendered}</HeadingFont>
                      </h2>
                    </div>

                    <div className="flex h-[48px] w-full items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[12px] leading-[14px] font-[600] uppercase tracking-[0.02em] text-[#555563] md:leading-none md:text-[#777783]">
                          απο
                        </span>

                        <span className="text-[20px] leading-[20px] font-[600] tracking-[0.05em] text-[#555563] md:text-[22px] md:font-[800] md:leading-none md:tracking-normal">
                          <HeadingFont>{item.acf.price}€</HeadingFont>
                        </span>
                      </div>

                      <button className="h-[48px] w-[106px] rounded-lg bg-[#009649] text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#00B9F2] md:w-[96px] md:text-[13px]">
                        {item.acf.button_text}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mb-0 mt-2 text-center md:mt-6">
            <button className="h-[48px] w-[210px] rounded-lg border border-[#009649] bg-white/80 px-6 text-sm font-semibold text-[#009649] backdrop-blur-[16px] transition-all duration-300 hover:bg-[#009649] hover:text-white lg:h-auto lg:w-auto lg:px-8 lg:py-3">
              Δείτε περισσότερα (127)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}