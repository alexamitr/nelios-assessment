"use client";

import { useState } from "react";

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

type DropdownType = "destination" | "checkin" | "checkout" | "people" | null;
type CalendarMode = "checkin" | "checkout";
type CalendarMonthName = "april" | "may";

export default function DesktopSearchTabs() {
  const [activeTab, setActiveTab] = useState<"trips" | "hotels">("trips");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const [selectedDestination, setSelectedDestination] = useState("Ελλάδα");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  const isHotels = activeTab === "hotels";

  const destinations = [
    { id: "athens-center", label: "Athens Center, Athens" },
    { id: "athens-coast", label: "Athens & Coast, Nomos Attikis" },
    { id: "ymittos", label: "Ymittos Athens, Dafni-ymittos" },
    {
      id: "airport",
      label:
        "Athens Eleftherios Venizelos International Airport, Spata-artemida",
    },
  ];

  const hotels = [
    { id: "royalty", label: "Royalty Hotel Athens" },
    { id: "12-keys", label: "12 Keys Athens Apartments" },
    { id: "athenswas", label: "Athenswas Hotel" },
    { id: "thisean", label: "Thisean Modern Suites by Athens Stay" },
    { id: "capital", label: "Athens Capital Hotel" },
    { id: "electra", label: "Electra Metropolis Athens" },
  ];

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  const aprilCells: Array<number | null> = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31,
  ];

  const mayCells: Array<number | null> = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, 31,
  ];

  function handleSelectDestination() {
    setSelectedDestination("Athens Center, Athens");
    setOpenDropdown(null);
  }

  function handleCheckInSelect() {
    setCheckIn("18/4/2023");
    setOpenDropdown(null);
  }

  function handleCheckOutSelect() {
    setCheckOut("22/4/2023");
    setOpenDropdown(null);
  }

  function PeopleCounter({
    label,
    sublabel,
    value,
    onMinus,
    onPlus,
  }: {
    label: string;
    sublabel: string;
    value: number;
    onMinus: () => void;
    onPlus: () => void;
  }) {
    return (
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
            <HeadingFont>{label}</HeadingFont>
          </p>
          <p className="mt-2 text-[12px] leading-[14px] text-[#838393]">
            {sublabel}
          </p>
        </div>

        <div className="flex h-[42px] w-[132px] overflow-hidden rounded-lg border border-gray-300 bg-white">
          <button
            type="button"
            onClick={onMinus}
            className="flex w-11 cursor-pointer items-center justify-center border-r border-gray-300 text-[#555563]"
          >
            -
          </button>

          <div className="flex w-11 items-center justify-center border-r border-gray-300 text-[14px] text-[#555563]">
            {value}
          </div>

          <button
            type="button"
            onClick={onPlus}
            className="flex w-11 cursor-pointer items-center justify-center text-[#555563]"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  function CalendarMonth({
    title,
    cells,
    month,
    mode,
  }: {
    title: string;
    cells: Array<number | null>;
    month: CalendarMonthName;
    mode: CalendarMode;
  }) {
    return (
      <div className="w-[260px]">
        <h3 className="mb-5 text-center text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
          <HeadingFont>{title}</HeadingFont>
        </h3>

        <div className="mb-4 grid grid-cols-7 border-b border-gray-200 pb-3 text-center text-[13px] text-[#555563]">
          {weekDays.map((day, index) => (
            <span key={`${day}-${index}`}>{day}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-3 text-center text-[13px] leading-[24px] text-[#555563]">
          {cells.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${month}-${index}`} className="h-8" />;
            }

            const muted = day < 12;
            const greyCircle = month === "april" && day === 12;

            const checkInSelected =
              mode === "checkin" && month === "april" && day === 18;

            const rangeSelected =
              mode === "checkout" &&
              month === "april" &&
              day >= 18 &&
              day <= 22;

            const rangeStart =
              mode === "checkout" && month === "april" && day === 18;

            const rangeEnd =
              mode === "checkout" && month === "april" && day === 22;

            return (
              <div
                key={`${mode}-${month}-${day}-${index}`}
                className={`flex h-8 items-center justify-center ${
                  rangeSelected ? "bg-[#00B9F2] text-white" : ""
                } ${rangeStart ? "rounded-l-full" : ""} ${
                  rangeEnd ? "rounded-r-full" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (month !== "april") return;
                    if (mode === "checkin") handleCheckInSelect();
                    if (mode === "checkout") handleCheckOutSelect();
                  }}
                  className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition ${
                    checkInSelected ? "bg-[#00B9F2] text-white" : ""
                  } ${
                    greyCircle && !rangeSelected && !checkInSelected
                      ? "bg-gray-100 text-[#555563]"
                      : ""
                  } ${
                    !rangeSelected && !checkInSelected && !greyCircle && muted
                      ? "text-gray-300"
                      : ""
                  } ${
                    !rangeSelected && !checkInSelected && !greyCircle && !muted
                      ? "hover:bg-gray-100"
                      : ""
                  }`}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative hidden w-full flex-col items-center md:flex">
      {/* Tabs */}
      <div className="mb-2 rounded-full border border-black/10 bg-white/80 p-[6px] backdrop-blur-[32px]">
        <button
          type="button"
          onClick={() => {
            setActiveTab("trips");
            setOpenDropdown(null);
            setSelectedDestination("Ελλάδα");
          }}
          className={`h-[48px] cursor-pointer rounded-full px-[28px] text-[14px] leading-[16px] font-medium transition-all duration-300 ${
            !isHotels
              ? "bg-white text-[#009649] shadow-[0_24px_32px_-12px_rgba(0,0,0,0.10)]"
              : "text-[#8B8B95]"
          }`}
        >
          Εκδρομές
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("hotels");
            setOpenDropdown(null);
            setSelectedDestination("");
          }}
          className={`h-[48px] cursor-pointer rounded-full px-[28px] text-[14px] leading-[16px] font-medium transition-all duration-300 ${
            isHotels
              ? "bg-white text-[#009649] shadow-[0_24px_32px_-12px_rgba(0,0,0,0.10)]"
              : "text-[#8B8B95]"
          }`}
        >
          Ξενοδοχεία
        </button>
      </div>

      <div className="relative hidden h-[64px] w-full items-center overflow-visible rounded-xl bg-white shadow-sm md:flex">
        {/* Destination */}
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(
              openDropdown === "destination" ? null : "destination"
            )
          }
          className={`flex h-full flex-1 cursor-pointer flex-col justify-center border-r border-gray-200 px-6 text-left transition-all duration-200 ${
            openDropdown === "destination"
              ? "relative z-40 rounded-xl bg-white shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)]"
              : ""
          }`}
        >
          <p className="text-[11px] leading-[14px] text-gray-400">
            Προορισμός
          </p>

          {selectedDestination && (
            <p className="mt-1 text-[14px] leading-[16px] text-[#555563]">
              {selectedDestination}
            </p>
          )}
        </button>

        {/* Check In */}
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === "checkin" ? null : "checkin")
          }
          className={`flex h-full flex-1 cursor-pointer flex-col justify-center border-r border-gray-200 px-6 text-left transition-all duration-200 ${
            openDropdown === "checkin"
              ? "relative z-40 rounded-xl bg-white shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)]"
              : ""
          }`}
        >
          <p className="text-[11px] leading-[14px] text-gray-400">Check In</p>

          {checkIn ? (
            <p className="mt-1 text-[14px] leading-[16px] text-[#555563]">
              {checkIn}
            </p>
          ) : (
            openDropdown === "checkin" && (
              <p className="mt-1 text-[14px] leading-[16px] text-[#838393]">
                Ημερομηνία
              </p>
            )
          )}
        </button>

        {/* Check Out */}
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === "checkout" ? null : "checkout")
          }
          className={`flex h-full flex-1 cursor-pointer flex-col justify-center border-r border-gray-200 px-6 text-left transition-all duration-200 ${
            openDropdown === "checkout"
              ? "relative z-40 rounded-xl bg-white shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)]"
              : ""
          }`}
        >
          <p className="text-[11px] leading-[14px] text-gray-400">Check Out</p>

          {checkOut ? (
            <p className="mt-1 text-[14px] leading-[16px] text-[#555563]">
              {checkOut}
            </p>
          ) : (
            openDropdown === "checkout" && (
              <p className="mt-1 text-[14px] leading-[16px] text-[#838393]">
                Ημερομηνία
              </p>
            )
          )}
        </button>

        {/* People */}
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === "people" ? null : "people")
          }
          className={`flex h-full flex-1 cursor-pointer flex-col justify-center border-r border-gray-200 px-6 text-left transition-all duration-200 ${
            openDropdown === "people"
              ? "relative z-40 rounded-xl bg-white shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)]"
              : ""
          }`}
        >
          <p className="text-[11px] leading-[14px] text-gray-400">
            Αριθμός ατόμων
          </p>

          {openDropdown === "people" && (
            <p className="mt-1 text-[14px] leading-[16px] text-[#555563]">
              {adults} Ενήλικες, {children} Παιδί
            </p>
          )}
        </button>

        {/* Search */}
        <button className="m-2 flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#009649] px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#00B9F2]">
          <img
            src="/icons/search.svg"
            alt="Search"
            className="h-4 w-4 object-contain"
          />
          Αναζήτηση
        </button>

        {/* Destination dropdown */}
        {openDropdown === "destination" && (
          <div
            className={`absolute left-0 top-[76px] z-30 flex h-[260px] overflow-hidden rounded-xl bg-white shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)] ${
              isHotels ? "w-[620px]" : "w-[310px]"
            }`}
          >
            <div
              className={`${
                isHotels ? "w-1/2" : "w-full"
              } border-r border-gray-200 py-5`}
            >
              <h3 className="px-8 pb-4 text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
                <HeadingFont>ΠΕΡΙΟΧΗ</HeadingFont>
              </h3>

              <div className="h-[190px] overflow-y-auto">
                {destinations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={handleSelectDestination}
                    className={`block w-full cursor-pointer px-8 py-3 text-left text-[14px] leading-[18px] text-[#555563] transition ${
                      item.label === "Athens Center, Athens"
                        ? "bg-[#E7E7E7]"
                        : "hover:bg-[#F1F1F1]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {isHotels && (
              <div className="w-1/2 py-5">
                <h3 className="px-8 pb-4 text-[20px] leading-[20px] font-[600] uppercase tracking-[0.05em] text-[#555563]">
                  <HeadingFont>ΞΕΝΟΔΟΧΕΙΑ</HeadingFont>
                </h3>

                <div className="h-[190px] overflow-y-auto pr-2">
                  {hotels.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={handleSelectDestination}
                      className="block w-full cursor-pointer px-8 py-3 text-left text-[14px] leading-[18px] text-[#555563] transition hover:bg-[#F1F1F1]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Check In calendar */}
        {openDropdown === "checkin" && (
          <div className="absolute left-[80px] top-[76px] z-30 flex w-[700px] gap-12 rounded-xl bg-white px-10 py-8 shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)]">
            <CalendarMonth
              title="APRIL 2023"
              cells={aprilCells}
              month="april"
              mode="checkin"
            />
            <CalendarMonth
              title="MAY 2023"
              cells={mayCells}
              month="may"
              mode="checkin"
            />
          </div>
        )}

        {/* Check Out calendar */}
        {openDropdown === "checkout" && (
          <div className="absolute left-[80px] top-[76px] z-30 flex w-[700px] gap-12 rounded-xl bg-white px-10 py-8 shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)]">
            <CalendarMonth
              title="APRIL 2023"
              cells={aprilCells}
              month="april"
              mode="checkout"
            />
            <CalendarMonth
              title="MAY 2023"
              cells={mayCells}
              month="may"
              mode="checkout"
            />
          </div>
        )}

        {/* People dropdown */}
        {openDropdown === "people" && (
          <div className="absolute right-[92px] top-[76px] z-30 flex w-[340px] flex-col gap-6 rounded-xl bg-white p-8 shadow-[0_24px_32px_-12px_rgba(0,0,0,0.20)]">
            <PeopleCounter
              label="ΕΝΗΛΙΚΕΣ"
              sublabel="12 ετών +"
              value={adults}
              onMinus={() => setAdults((value) => Math.max(1, value - 1))}
              onPlus={() => setAdults((value) => value + 1)}
            />

            <div className="h-px w-full bg-gray-200" />

            <PeopleCounter
              label="ΠΑΙΔΙΑ"
              sublabel="Έως 12 ετών"
              value={children}
              onMinus={() => setChildren((value) => Math.max(0, value - 1))}
              onPlus={() => setChildren((value) => value + 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
}