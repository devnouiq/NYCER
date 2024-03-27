import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "/favicon.png";

interface FooterLinkProps {
  href: string;
  label: string;
  icon: JSX.Element;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label, icon }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-white mx-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
    aria-label={label}
    tabIndex={0}>
    {icon}
  </a>
);

export const PageFooter: React.FC = () => (
  <footer className="bg-[#694331] text-white py-10">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <img src={logo} alt="NYCER Logo" className="w-8 h-8 mr-2" />
        <span className="text-xl font-bold text-[#FFFFFF]">NYCER</span>
      </div>
      <nav className="flex items-center mb-4 md:mb-0">
        <FooterLink
          href="#"
          label="Twitter"
          icon={<Twitter size={24} className="text-[#FFFFFF]" />}
        />
        <FooterLink
          href="#"
          label="Instagram"
          icon={<Instagram size={24} className="text-[#FFFFFF]" />}
        />
        <FooterLink
          href="#"
          label="Facebook"
          icon={<Facebook size={24} className="text-[#FFFFFF]" />}
        />
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-center max-w-md lg:max-w-2xl">
        <input
          type="email"
          placeholder="Enter your email address"
          className="outline-none p-2 mb-2 md:mb-0 md:flex-grow placeholder:font-bold text-black"
        />
        <button className="bg-[#315769] p-2 text-white font-bold">
          Join WaitList
        </button>
      </div>
      <div className="flex items-center mb-4 md:mb-0">
        <a
          href="#"
          className="text-[#E1CEC3] hover:text-[#AF7153] mx-2"
          aria-label="Privacy Policy"
          tabIndex={0}>
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-[#E1CEC3] hover:text-[#AF7153] mx-2"
          aria-label="Terms of Use"
          tabIndex={0}>
          Terms of Use
        </a>
      </div>
      <section className="text-[#E1CEC3]">
        &copy; {new Date().getFullYear()} NYCER. All rights reserved.
      </section>
    </div>
  </footer>
);
