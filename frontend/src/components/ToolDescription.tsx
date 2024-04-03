export const ToolDescription = () => {
  return (
    <div className="bg-[#E1CEC3] p-4 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:pt-64 p-4">
          <p className="text-[#FFF7F7] font-bold text-4xl md:text-7xl">Our</p>
          <p className="text-[#AF7153] font-bold text-4xl md:text-7xl">Tools</p>
          <p className="text-[#160D0C] py-4 md:py-6">
            <span className="mr-3">F O R</span> <span>E V E R Y B O D Y</span>
          </p>
          <p className="text-[#160D0C] pb-4 md:pb-6">
            NYCER Search Tool is the best platform for you to find the perfect
            skin solutions specifically for your skin type
          </p>
          <button
            className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded-full"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }>
            Sign Up
          </button>
        </div>
        <div className="bg-[#AF7153] md:col-span-2 text-white py-2 px-4 md:px-6 rounded-xl">
          <p className="font-bold py-2 md:py-4 text-xl md:text-2xl">
            INGREDIENT CHECKER
          </p>
          <p className="text-sm md:text-base">
            Check for any ingredient you come across to find its purpose,
            benefit, alternative names, INCI name, skin type match to have a
            peace of mind{" "}
          </p>
          <p className="font-bold py-2 md:py-4 text-xl md:text-2xl">
            COMPARE PRODUCTS
          </p>
          <p className="text-sm md:text-base">
            Ever find it hard to choose between 2 products? Use this tool to
            find similarities and differences so you can make the perfect
            choice.
          </p>
          <p className="font-bold py-2 md:py-4 text-xl md:text-2xl">
            FIND DUPES{" "}
            <span className="text-gray-300 text-sm">
              (Coming Soon. Sign Up for exclusive updates)
            </span>
          </p>
          <p className="text-sm md:text-base">
            Some products can be super attractive but out of your price range.
            Find alternatives with similar active ingredients which means they
            will provide the same benefits at a fraction of the cost.
          </p>
          <p className="font-bold py-2 md:py-4 text-xl md:text-2xl">
            SOLUTIONS TO SKIN PROBLEMS{" "}
            <span className="text-gray-300 text-sm">
              (Coming Soon. Sign Up for exclusive updates)
            </span>
          </p>
          <p className="text-sm md:text-base">
            Acne prone? Hyperpigmentation? Rosacea? No matter your skin
            problems, we got you. Our AI powered solutions and robust database
            will tell you what ingredients you need.
          </p>
          <p className="font-bold py-2 md:py-4 text-xl md:text-2xl">
            INGREDIENTS WIKI{" "}
            <span className="text-gray-300 text-sm">
              (Coming Soon. Sign Up for exclusive updates)
            </span>
          </p>
          <p className="text-sm md:text-base">
            We built a one stop library for you to fulfil all your ingredients
            research needs at fast speeds.
          </p>
          <p className="font-bold py-2 md:py-4 text-xl md:text-2xl">
            CREATE YOUR SKINCARE ROUTINE{" "}
            <span className="text-gray-300 text-sm">
              (Coming Soon. Sign Up for exclusive updates)
            </span>
          </p>
          <p className="text-sm md:text-base">
            Sign up for a fully customized experience to search for ingredients
            you need
          </p>
        </div>
      </div>
    </div>
  );
};
