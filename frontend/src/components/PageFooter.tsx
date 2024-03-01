import React from "react";

export const PageFooter: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-20 lg:py-32">
      <p className="font-bold text-lg md:text-xl lg:text-2xl mb-4">
        News Letter
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center max-w-md lg:max-w-2xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="border border-spacing-2 rounded-md outline-none p-2 mx-4 mb-2 md:mb-0 md:flex-grow placeholder:font-bold focus:outline-[#AF4425]"
        />
        <button className="bg-[#AF4425] rounded-xl p-2 text-white font-bol">
          subscribe
        </button>
      </div>
    </div>
  );
};
