import React from "react";

import { TopEmailSection } from "./topEmailSection.tsx";
import { BottomEmailSection } from "./bottomEmailSection.tsx";

export function EmailSection () {

  return (
    <section className="py-14 px-4 mt-20 bg-[#f1f1f1] flex flex-col">

      <TopEmailSection />
      <BottomEmailSection />

    </section>


  );

}