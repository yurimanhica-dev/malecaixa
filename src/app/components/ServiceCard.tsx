import Image from "next/image";
import { JSX } from "react";

const ServiceCard = ({
  title,
  description,
  icon,
  number,
  backgroundImage,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  number: string;
  backgroundImage: string;
}) => (
  <div className="group relative c-space border min-w-fit border-gray-300 hover:border-transparent transition-all duration-500 ease-in-out p-8 overflow-hidden h-full">
    {/* Imagem de fundo (aparece no hover) */}
    <div className="absolute inset-0 bg-black opacity-100 transition-opacity duration-500 ease-in-out z-0">
      <Image
        src={backgroundImage ?? null}
        alt=""
        fill
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    {/* Overlay preto (alternativa se não quiser imagem) */}
    <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500 ease-in-out z-0"></div>

    <div className="flex flex-col gap-4 relative z-10 h-full">
      <div className="flex justify-between items-start">
        <div className="group-hover:rotate-y-360 transition-transform duration-500 ease-in-out">
          {icon}
        </div>
        <p className="text-gray-100 font-semibold transition-colors duration-300">
          {number}
        </p>
      </div>

      <hr className="border-t border-gray-300  transition-colors duration-300" />

      <div className="flex-1">
        <h3 className="text-2xl font-semibold mb-4 text-gray-100 transition-colors duration-300">
          {title}
        </h3>
        <p className=" text-gray-50 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default ServiceCard;
