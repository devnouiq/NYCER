import { SearchField } from "../components/Search";
import { SloganPage } from "../components/SloganPage";
import { ToolDescription } from "../components/ToolDescription";
import { VIPPage } from "../components/VIPPage";
import { InfoCard } from "../components/InfoCard";
import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";
import { InfoCardProps } from "../types/InfoCardTypes";
import { useState } from "react";
import htu from "../assets/how_to_use.png";
import abu from "../assets/about_us.png";

export const Home = () => {
  const howtouseProps: InfoCardProps = {
    imageSrc: htu,
    title: "HOW TO USE",
    content: [
      "1.Use the search fields to find any ingredients, products, brands and you'll be directed to the right tool",
      "2.Sign up for a free account to get newsletters, updates and skincare routine",
      "That's it!",
    ],
    backgroundColor: "#AF7153",
  };

  const aboutusProps: InfoCardProps = {
    imageSrc: abu,
    title: "ABOUT US",
    subtitle: "KNOWLEDGE IS BEAUTY",
    content: [
      "NYCER Lifestyle advocates for the balance of aesthetic and wellness for your Self and your Space",
      "We believe in holistic development and are in constant pursuit of providing the best for our community, be it in the form of products, services or knowledge.",
      "NYCER Search Tool was born out of the demand that women all over the world are becoming more aware of the ingredients they want to consume or apply on their bodies. The platform serves to make this search for active ingredients, products comparison, routine builder and many more, to be at your fingertips.",
    ],
    backgroundColor: "#E1CEC3",
    textcolor: "black",
    tilecolor: "#fff",
    titlecolor: "#D1BAB5",
  };

  const [toggleSignInOverlay, setToggleSignInOverlay] = useState(false);
  const [toggleSignUpOverlay, setToggleSignUpOverlay] = useState(false);

  return (
    <>
      <div>
        <div className="px-4 py-4 min-h-screen input_wrapper bg-[url('./assets/1.png')] bg-cover bg-center">
          <div className="flex items-center justify-center min-h-[40vh] md:min-h-[60vh] w-full mt-12 md:mt-20">
            <SearchField
              placeholder="*find active ingredients"
              setOpenModal={setToggleSignInOverlay}
              openModal={toggleSignInOverlay}
            />
          </div>
        </div>

        <SloganPage
          bg_color="#AF7153"
          line1="YOU DESERVE THE"
          line2="NYCER"
          line3="THINGS IN LIFE"
          line4="AND WE ARE HERE TO HELP YOU FIND THEM"
        />
        <ToolDescription />
        <InfoCard {...howtouseProps} />
        <InfoCard {...aboutusProps} />
        <SloganPage
          bg_color="#E1CEC3"
          line1="Live a NYCER life,"
          line3="Care for NYCER skin"
          line4="WE BELIEVE IN HELPING YOU ACHIEVE BETTER"
        />
        <VIPPage />
      </div>

      {toggleSignInOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 items-center z-50">
          <SignIn closeModal={setToggleSignInOverlay} />
        </div>
      )}
      {toggleSignUpOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 items-center z-50">
          <div>
            <button onClick={() => setToggleSignUpOverlay(false)}></button>
          </div>
          <SignUp closeModal={setToggleSignUpOverlay} />
        </div>
      )}
    </>
  );
};
