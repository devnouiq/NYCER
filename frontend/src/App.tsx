import { SearchField } from "./components/Search";
import { PageHeader } from "./components/PageHeader";
import htu from "./assets/how_to_use.png";
import abu from "./assets/about_us.png";
import { SloganPage } from "./components/SloganPage";
import { ToolDescription } from "./components/ToolDescription";
import { VIPPage } from "./components/VIPPage";
import { InfoCard, InfoCardProps } from "./components/InfoCard";
import "./App.css";
import { PageFooter } from "./components/PageFooter";

function App() {
  const howtouseProps: InfoCardProps = {
    imageSrc: htu,
    title: "HOW TO USE",
    content: [
      "1.Use the search fields to find any ingredients, products, brands and you’ll be directed to the right tool",
      "2.Sign up for a free account to get newsletters, updates and skincare routine",
      "That’s it!",
    ],
    backgroundColor: "#AF7153",
  };

  const aboutusProps: InfoCardProps = {
    imageSrc: abu,
    title: "ABOUT US",
    subtitle: "knowledge is beauty",
    content: [
      "NYCER Lifestyle advocates for the balance of aesthetic and wellness for your Self and your Space",
      "We believe in holistic development and are in constant pursuit of providing the best for our community be in the form of products, services or knowledge.",
      "NYCER Search Tool was born out of the demand that women all over the world are becoming more aware of the ingredients they want to consume or apply on their bodies. The platform serves to make this search for active ingredients, products comparison, routine builder and many more, to be at your fingertips",
    ],
    backgroundColor: "#E1CEC3",
    textcolor: "black",
  };

  return (
    <div>
      {/* <Product /> */}
      <div className="px-4 py-4 min-h-screen input_wrapper bg-[url('./assets/1.png')] bg-cover bg-center">
        <PageHeader />
        <div className="flex items-center justify-center min-h-[40vh] md:min-h-[60vh] w-full mt-12 md:mt-20">
          <SearchField placeholder="*find active ingredients" />
        </div>
        <div className="text-white text-4xl md:text-7xl font-bold text-center mt-4 md:mt-8">
          Skincare At A Deeper Level
        </div>
      </div>
      <SloganPage
        bg_color="#AF7153"
        line1="YOU DESRVE THE"
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
        line4=" we believe in helping you achieve better"
      />
      <VIPPage />
      <PageFooter />
    </div>
  );
}

export default App;
