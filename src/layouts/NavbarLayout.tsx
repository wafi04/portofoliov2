"use client"

import Link from "next/link";
import { useState } from "react";
import {motion} from "framer-motion"
import { height, opacity, translate } from "@/utils/Animation";
import { NavbarData } from "@/data/Navbar";
import { NavbarItem } from "@/types/NavbarType";
import Image from "next/image";

export function NavbarLayout() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [selectedLink, setSelectedLink] = useState({
        isActive: false,
        index: 0,
    });

    const handleToogle = () => {
        setIsActive((prev) => !prev);
    };
    return (
         <div className="bg-accent fixed w-full z-40 font-blogh-full text-secondary">
      <div className="flex justify-between uppercase text-[30px] font-normal relative px-10">
        <Link href={"/"} className="font-bebas ">
          Portofolio
        </Link>
        <div
          onClick={handleToogle}
          className="flex items-center  justify-center gap-2 cursor-pointer"
        >
          <svg
            className={`w-8 h-8 transition-transform duration-500 items-center ${
              isActive ? "rotate-45 transform translate-x-1.5" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={`transition-transform duration-500 ${
                isActive ? "transform translate-y-1.5 rotate-45" : ""
              }`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isActive ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
          <span className="">{isActive ? "Close" : "Menu"}</span>
        </div>
        {isActive && (
  <motion.div
    variants={height}
    initial="initial"
    animate="enter"
    exit="exit"
    className="absolute top-full left-0 w-full bg-accent overflow-hidden"
  >
    <div className="flex flex-col md:flex-row justify-between min-h-[300px] md:min-h-[200px]">
      <div className="flex-1">
        <Body
          links={NavbarData}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
        />
      </div>
      <div className="hidden md:block flex-1">
        <Images
          src={NavbarData[selectedLink.index].image}
          selectedLink={selectedLink}
        />
      </div>
    </div>
  </motion.div>
)}
      </div>
    </div>
    )
}



interface BodyProps {
  links: NavbarItem[];
  selectedLink: { isActive: boolean; index: any };
  setSelectedLink: React.Dispatch<
    React.SetStateAction<{ isActive: boolean; index: number }>
  >;
}

const Body: React.FC<BodyProps> = ({
  links,
  selectedLink,
  setSelectedLink,
}) => {
  const getChars = (word: string) => {
    let chars: any = [];

    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });

    return chars;
  };
  return (
<div className="flex flex-col md:flex-row gap-4 md:gap-8 px-10 py-[50px]">
      {links.map((item, index) => {
        const { nama, link } = item;
        return (
          <Link key={`links_${index}`} href={link}>
            <motion.p
              custom={[0.3, 0]}
              variants={translate}
              initial="initial"
              animate="enter"
              exit="exit"
              className={`relative flex  transition-all duration-500 cursor-pointer ${
                selectedLink.index === index ? "" : "blur-sm"
              }`}
              onMouseEnter={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
            >
              {getChars(nama)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
};

interface ImagesProps {
  src: string;
  selectedLink: { isActive: boolean; index: number };
}

const Images: React.FC<ImagesProps> = ({ src, selectedLink }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={selectedLink.isActive ? "open" : "closed"}
      className="block w-full h-[300px] relative"
    >
      <Image
        src={src}
        className="object-cover w-full p-5"
        fill={true}
        alt="image"
      />
    </motion.div>
  );
};