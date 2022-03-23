import React from "react";
import { ReactComponent as LogoTextWhite } from "../assets/images/logo-text-white.svg";

export const Footer = () => {
  return (
    <footer className="bg-violet-900 dark:bg-blueGray-900">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row lg:space-x-12 space-y-12 py-8">
        <div className="flex flex-1 space-x-8 items-center">
          <img
            src={require("../assets/images/pens_putih.png").default}
            alt="pens putih"
            className="w-10 h-10"
          />
          <LogoTextWhite className="w-40 h-6" />
        </div>
        <div className="flex-1 flex flex-col text-lightBlue-50">
          <div className="font-black uppercase text-xs tracking-wider text-blueGray-200 dark:text-blue-400 mb-4">
            Link
          </div>
          <a target="_blank" rel="noreferrer" href="https://www.pens.ac.id">
            Website PENS
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://ethol.pens.ac.id"
            className="mt-2"
          >
            ETHOL
          </a>
        </div>
        <div className="flex-1 text-lightBlue-50">
          <div className="font-black uppercase text-xs tracking-wider text-blueGray-200 dark:text-blue-400 mb-4">
            Kontak
          </div>
          <a 
            target="_blank"
            rel="noreferrer"
            href="https://www.google.co.id/maps/place/Politeknik+Elektronika+Negeri+Surabaya/@-7.2758418,112.791567,17z/data=!3m1!4b1!4m5!3m4!1s0x2dd7fa10ea2ae883:0xbe22c55d60ef09c7!8m2!3d-7.2758471!4d112.7937557"
          >
              Jl. Raya ITS - Kampus PENS Sukolilo Surabaya, Indonesia
          </a>
          <div>(031) 5947280</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
