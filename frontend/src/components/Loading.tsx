import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-600"></div>
    </div>
  );
};
