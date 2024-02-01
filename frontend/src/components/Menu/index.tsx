import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext.tsx";
import { List } from "@phosphor-icons/react";

const auth = useContext(AuthContext);

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="flex flex-col items-start gap-3">
        <nav className=" bg-slate-900 w-full flex flex-col items-start justify-start gap-3 font-fira-code text-main-white sm:hidden">
          <button onClick={toggleMenu}>Menu</button>
          {menuOpen && (
            <div className="flex flex-col items-start gap-3">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/private" onClick={toggleMenu}>
                Chatbot
              </Link>
              <Link to="/register" onClick={toggleMenu}>
                Register
              </Link>
              {auth.user && (
                <button
                  onClick={() => {
                    auth.signOut();
                    toggleMenu();
                  }}
                >
                  Sair
                </button>
              )}
            </div>
          )}

          <List size={32} />
        </nav>
      </div>
      )
    </div>
  );
}
