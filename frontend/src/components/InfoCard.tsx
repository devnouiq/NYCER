import React from "react";

export interface InfoCardProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  content: string[];
  backgroundColor: string;
  textcolor?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  title,
  subtitle,
  content,
  backgroundColor,
  textcolor,
}) => {
  const dynamicBackgroundColor =
    backgroundColor === "#E1CEC3" ? "#AF7153" : "#E1CEC3";
  const dynamicTextFontWeight = backgroundColor === "#AF7153" ? "bold" : "";
  const dynamicTextSize = backgroundColor === "#AF7153" ? "2xl" : "";
  return (
    <div className={`bg-[${backgroundColor}] grid grid-cols-1 md:grid-cols-2`}>
      <img src={imageSrc} alt="" className="w-full h-auto" />
      <div className="pt-6">
        <div
          className={`text-white text-3xl md:text-6xl font-bold text-center`}>
          {title}
        </div>
        {subtitle && (
          <p className={`text-white text-center text-lg md:text-2xl pt-4`}>
            {subtitle}
          </p>
        )}
        <div
          className={`bg-[${dynamicBackgroundColor}] m-4 md:m-20 p-4 rounded-xl text-${
            textcolor || "white"
          } font-${dynamicTextFontWeight} text-${dynamicTextSize}`}>
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
