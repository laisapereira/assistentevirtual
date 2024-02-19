import React from "react";

import { TopEmailSection } from "./topEmailSection.tsx";
import { BottomEmailSection } from "./bottomEmailSection.tsx";

export function EmailSection () {

  return (
    <section className="py-8 px-4 bg-[#EEE] flex flex-col xl:mt-6 2xl:mt-14 2xl:pb-10">

      <TopEmailSection />
      <BottomEmailSection />

    </section>


  );

}