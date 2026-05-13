import { Roboto_Flex } from "next/font/google";
import DesktopSearchTabs from "./DesktopSearchTabs";
import PackageListing from "./PackageListing";

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "http://localhost:8080";

const robotoFlex = Roboto_Flex({
  subsets: ["latin", "greek"],
  weight: "variable",
  axes: [
    "opsz",
    "wdth",
    "GRAD",
    "slnt",
    "XTRA",
    "XOPQ",
    "YOPQ",
    "YTLC",
    "YTUC",
    "YTAS",
    "YTDE",
    "YTFI",
  ],
});

async function getPackages() {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/package?per_page=12&orderby=date&order=asc`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch packages");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

function HeadingFont({ children, className = "" }: any) {
  return (
    <span
      className={className}
      style={{
        fontVariationSettings:
          "'opsz' 144, 'wght' 600, 'wdth' 40, 'GRAD' 0, 'slnt' 0, 'XTRA' 468, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738",
      }}
    >
      {children}
    </span>
  );
}

export default async function Home() {
  const packages = await getPackages();

  return (
    <main
      className={`${robotoFlex.className} relative min-h-screen overflow-hidden bg-[#F5F5F5] text-[#555563]`}
    >
      {/* BG1 - top background */}
      <img
        src="/images/packages/bg1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 hidden w-full min-w-[1024px] max-w-[1920px] -translate-x-1/2 select-none md:block"
      />

      {/* BG2 - bottom background */}
      <img
        src="/images/packages/bg2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-[1] hidden w-full min-w-[1024px] max-w-[1920px] -translate-x-1/2 select-none md:block"
      />

      {/* Mobile-only soft blobs */}
      <div className="pointer-events-none absolute right-[-73px] top-[710px] z-0 h-[335px] w-[794px] rounded-full bg-[#00B9F2] opacity-20 blur-3xl md:hidden" />
      <div className="pointer-events-none absolute left-0 top-[800px] z-0 h-[281px] w-[360px] rounded-full bg-[#009649] opacity-20 blur-[80px] md:hidden" />

      {/* TOP CONTENT */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center pb-[120px] md:gap-12 md:px-8 md:pb-[150px] md:pt-6 lg:gap-16 lg:px-16 lg:pb-[170px]">
        {/* Mobile breadcrumbs */}
        <div className="flex h-[48px] w-full max-w-[430px] items-center justify-center gap-2 px-4 md:hidden">
          <span className="text-[12px] leading-[14px] text-[#555563]">
            Αρχική
          </span>
          <span className="text-[#009649]">›</span>
          <span className="text-[12px] leading-[14px] text-[#555563]">
            Ελλάδα
          </span>
          <span className="text-[#009649]">›</span>
          <span className="text-[12px] leading-[14px] text-[#838393]">
            Πακέτα
          </span>
        </div>

        {/* HERO */}
        <div className="w-full max-w-[430px] px-4 pb-6 pt-8 text-center md:block md:w-auto md:max-w-none md:p-0">
          <div className="mb-10 hidden text-[11px] leading-[14px] text-gray-400 md:block">
            Αρχική &gt; Ελλάδα &gt; Πακέτα
          </div>

          <h1 className="mb-3 w-full text-center text-[39px] leading-[39px] font-[600] uppercase tracking-[0.05em] text-[#555563] md:mb-5 md:text-[56px] md:leading-[56px] lg:text-[76px] lg:leading-[76px]">
            <HeadingFont>
              <span className="md:hidden">ΠΕΛΟΠΟΝΝΗΣΟΣ</span>
              <span className="hidden md:inline">ΕΛΛΑΔΑ</span>
            </HeadingFont>
          </h1>

          <p className="text-[14px] leading-[24px] text-[#838393] md:text-[12px] md:leading-[14px] md:text-gray-400">
            Πακέτα - Προσφορές
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative z-40 w-full max-w-[430px] px-4 pb-8 md:flex md:h-[170px] md:w-full md:max-w-[860px] md:flex-col md:items-center md:justify-end md:gap-2 md:px-0 md:pb-[48px] lg:h-[185px] lg:max-w-none lg:w-[1096px] lg:pb-[56px]">
          <DesktopSearchTabs />

          {/* Mobile compact search */}
          <div className="mx-auto flex h-[70px] w-full max-w-[398px] items-center justify-between rounded-full border border-black/10 bg-white/80 py-2 pl-7 pr-5 backdrop-blur-[16px] md:hidden">
            <div className="flex min-w-0 flex-col justify-center gap-1">
              <p className="truncate text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
                <HeadingFont>ΠΕΛΟΠΟΝΝΗΣΟΣ</HeadingFont>
              </p>

              <div className="flex flex-wrap items-center gap-1 text-[12px] leading-[14px] text-[#838393]">
                <span>03/08/2023 - 08/08/2023</span>
                <span>•</span>
                <span>2 Ενήλικες</span>
              </div>
            </div>

            <button className="shrink-0 text-[#009649]" aria-label="Edit search">
              ✎
            </button>
          </div>
        </div>

        <PackageListing packages={packages} />
      </section>

      {/* PROMO SECTION */}
      <section className="relative z-20 -mt-[40px] flex w-full flex-col items-center px-4 pb-[64px] pt-[80px] md:-mt-[60px] md:px-8 md:pt-[110px] lg:-mt-[70px] lg:px-[160px] lg:pt-[140px] xl:px-[300px]">
        <div className="relative z-30 flex h-[492px] w-full max-w-[328px] items-center justify-center overflow-hidden rounded-[12px] bg-black shadow-[0_24px_32px_-12px_rgba(0,0,0,0.25)] md:h-[280px] md:max-w-[700px] lg:h-[360px] lg:max-w-[960px] xl:h-[468px] xl:max-w-[1320px]">
          <img
            src="/images/packages/promo.png"
            alt="Promo"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 flex w-full max-w-[296px] flex-col items-center gap-4 px-4 text-center md:max-w-[520px]">
            <h2 className="text-center text-[24px] leading-[24px] font-[600] uppercase tracking-[0.05em] text-white md:whitespace-nowrap md:text-[32px] md:leading-[32px] xl:text-[39px] xl:leading-[39px]">
              <HeadingFont>ΔΕ ΒΡΗΚΑΤΕ ΑΥΤΟ ΠΟΥ ΨΑΧΝΕΤΕ;</HeadingFont>
            </h2>

            <button className="group flex h-[48px] w-[229px] flex-none items-center justify-center gap-2 rounded-[8px] border border-white bg-transparent px-6 py-4 transition-all duration-300 hover:border-[#009649] hover:bg-[#009649]">
              <span
                className="block w-[157px] shrink-0 whitespace-nowrap text-center text-[14px] leading-[16px] font-[500] text-white"
                style={{
                  fontVariationSettings:
                    "'wght' 500, 'wdth' 108, 'GRAD' 0, 'slnt' 0, 'XTRA' 468, 'XOPQ' 96, 'YOPQ' 90, 'YTLC' 485, 'YTUC' 732, 'YTAS' 750, 'YTDE' -180, 'YTFI' 738",
                }}
              >
                Επικοινωνήστε μαζί μας
              </span>

              <img
                src="/icons/send.svg"
                alt="Send"
                className="h-4 w-4 shrink-0 object-contain"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}