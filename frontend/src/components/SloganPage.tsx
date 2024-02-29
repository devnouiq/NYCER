export const SloganPage = (props: {
  bg_color: string;
  line1: string;
  line2?: string;
  line3: string;
  line4: string;
}) => {
  return (
    <div className={`bg-[${props.bg_color}] pt-36 pb-32`}>
      <div className="flex items-center justify-center text-white">
        <img src="" alt="Logo" className="my-6" />
      </div>
      <div className="text-white text-center font-bold pt-14 text-6xl">
        {props.line1}
        <p>{props.line2}</p>
        <p>{props.line3}</p>
      </div>
      <div className="text-white font-medium text-center pt-8">
        {props.line4}
      </div>
      <div className="mt-6 border-t-2 border-white font-semibold w-32 mx-auto"></div>
      <p className="mt-6 text-white text-center font-medium">N Y C E R</p>
    </div>
  );
};
