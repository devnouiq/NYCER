export const VIPPage = () => {
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 p-6 md:p-12 lg:h-[70vh]">
      <div className="flex flex-col md:flex-row">
        <div className="mx-4 md:mx-12 mt-6 md:flex mb-4 md:mb-0 flex flex-col items-center justify-center">
          <div className="bg-[#E1CEC3] rounded-full h-32 md:h-52 w-32 md:w-52 text-[#AF7153] font-bold text-xl md:text-3xl flex items-center justify-center">
            USD 2
          </div>
          <p className="mt-4 md:mt-6 text-2xl md:text-4xl font-bold text-[#AF4425]">
            Monthly
          </p>
        </div>

        <div className="mx-4 md:mx-12 mt-20 md:flex flex flex-col items-center justify-center">
          <div className="bg-[#AF7153] rounded-full h-32 md:h-52 w-32 md:w-52 text-[#AF4425] font-bold text-xl md:text-3xl flex items-center justify-center">
            USD 19
          </div>
          <p className="mt-4 md:mt-6 text-2xl md:text-4xl font-bold text-[#AF4425]">
            Annually
          </p>
          <p className="mt-2 md:mt-6 text-xl font-bold text-[#AF4425]">
            Save 20%
          </p>
        </div>
      </div>

      <div className="pl-4 md:pl-8 pr-4 md:pr-10 pt-4 md:pt-0">
        <p className="text-[#AF7153] text-3xl md:text-5xl font-extrabold">
          Be a VIP.
        </p>
        <div className="text-[#693D14] pt-4 md:pt-8">
          <p>Join our VIP membership and enjoy these benefits:</p>
          <ul className="list-disc pt-4 md:pt-8 pl-2 md:pl-6 pr-4 md:pr-10">
            <li className="p-1">Compare 4 products instead of 2</li>
            <li className="p-1">
              Get exclusive deals from brands that we work with
            </li>
            <li className="p-1">Priority submissions </li>
            <li className="p-1">
              First dips on beta testing for future upgrades and community
              building
            </li>
            <li className="p-1">
              Fast-track on discounts, invites and other promotional items{" "}
            </li>
            <li className="p-1">Personalised skincare routine highlighting </li>
            <li className="p-1">
              Compatibility scores with your skin profile and concerns{" "}
            </li>
            <li className="p-1">
              Custom newsletters laser-focused for you assured by AI accuracy
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
