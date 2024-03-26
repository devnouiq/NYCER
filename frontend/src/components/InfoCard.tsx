import React from "react";
import { InfoCardProps } from "../types/InfoCardTypes";

export const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  title,
  subtitle,
  content,
  backgroundColor,
  textcolor,
  tilecolor,
  titlecolor,
}) => {
  const dynamicBackgroundColor =
    backgroundColor === "#E1CEC3" ? "#AF7153" : "#E1CEC3";
  // const dynamicTextFontWeight = backgroundColor === "#AF7153" ? "bold" : "";
  const dynamicTextSize = backgroundColor === "#AF7153" ? "2xl" : "";
  const dynamicTileColor = tilecolor === "#fff" ? "bg-[#fff]" : "";

  // const dynamicTitlecolor=backgroundColor === "#AF7153" ? "#D1BAB5" : "#FFF";
  return (
    <div className={`bg-[${backgroundColor}] grid grid-cols-1 md:grid-cols-2`}>
      <img src={imageSrc} alt="" className="w-full h-full object-cover" />
      <div className={`pt-6 ${dynamicTileColor}`}>
        <div
          className={`${
            titlecolor ? "text-[#D1BAB5]" : "text-white"
          }  text-3xl md:text-6xl font-bold text-center`}>
          {title}
        </div>
        {subtitle && (
          <p className={`text-[#D1BAB5] text-center text-lg md:text-2xl pt-4`}>
            {subtitle}
          </p>
        )}
        <div
          className={`bg-[${dynamicBackgroundColor}] m-4 md:m-20 p-4 rounded-xl text-${
            textcolor || "white"
          } text-${dynamicTextSize}`}>
          {content.map((paragraph, index) => (
            <p key={index} className="p-3">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
