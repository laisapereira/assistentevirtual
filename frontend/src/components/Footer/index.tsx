import React from "react";

import aceleraLogo from "../../public/acelera-logo.svg";


import { BehanceLogo, DribbbleLogo, LinkedinLogo } from "@phosphor-icons/react";
import { TwitterLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer>
      <div className="container mx-auto flex justify-between items-center py-6 xl:px-3 2xl:py-4">
        <p className="font-bold font-montserrat">Entre em contato com a gente</p>
        <img className="ml-[-8rem]" src={aceleraLogo} />

        <div className="flex items-center gap-4">
          <TwitterLogo />
          <DribbbleLogo />
          <BehanceLogo />
          <LinkedinLogo />
        </div>
      </div>
    </footer>
  );
}
