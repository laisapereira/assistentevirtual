import React from "react";

import { TopEmailSection } from "./topEmailSection.tsx";
import { BottomEmailSection } from "./bottomEmailSection.tsx";

export function EmailSection () {

  return (
    <section className="py-8 px-4 mt-16 bg-[#EEE] flex flex-col">

      <TopEmailSection />
      <BottomEmailSection />

    </section>


  );

}