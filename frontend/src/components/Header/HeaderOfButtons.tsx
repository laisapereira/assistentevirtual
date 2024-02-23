import React from "react";
import { Link } from "react-router-dom";

export function HeaderButtons() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Link to="/private">
        <button className="px-7 py-2 border-2 border-black rounded-full font-sourceSansPro font-normal text-sm xl:text-base xl:px-8">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="px-7 py-2 bg-black border-2 border-black rounded-full font-sourceSansPro font-normal text-white text-sm xl:text-base xl:px-8">
          Cadastro
        </button>
      </Link>
    </div>
  );
}
