import Link from "next/link";

const LearnMoreButton = () => {
  return (
    <Link href="#simulacao" className="flex">
      <button className="group relative inline-flex items-center cursor-pointer outline-none border-0 bg-transparent p-0 text-inherit font-inherit w-[220px] h-12 overflow-hidden rounded-full">
        {/* Circle background that expands */}
        <span className="absolute left-0 top-0 bottom-0 w-12 h-12 bg-primary rounded-full transition-all duration-450 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-full group-hover:rounded-none z-0"></span>

        {/* Arrow icon */}
        <span className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center">
          <span className="relative w-5 h-0.5 bg-white transition-all duration-450 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-2">
            <span className="absolute top-[-0.25rem] right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white rotate-45"></span>
          </span>
        </span>

        {/* Button text - now properly aligned and spaced */}
        <span className="relative z-10 ml-1 pr-8 text-primary/80 font-bold text-sm uppercase tracking-wide transition-all duration-450 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:text-white group-hover:translate-x-2">
          Simular uma solicitação
        </span>
      </button>
    </Link>
  );
};

export default LearnMoreButton;
