import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import Swipe from "react-easy-swipe";
import { RSSItemInterface } from "@/interface/item";  // Your interface for RSS items

const SlideShow = ({ items }: { items: RSSItemInterface[] }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, items.length));
  };

  return (
    <div className="relative">
      <div className="w-full h-[70vh] overflow-hidden relative m-auto">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 w-full h-full"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`w-full h-full transform transition-transform duration-300 ${
                currentSlide === item.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={item.image}
                layout="fill"
                objectFit="contain"
                alt="Slide"
              />
            </div>
          ))}
        </Swipe>
      </div>
      <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2">
        <AiOutlineLeft
          onClick={handlePrevSlide}
          className="text-5xl cursor-pointer text-gray-400"
        />
      </div>
      <div className="absolute inset-y-1/2 right-0 transform -translate-y-1/2">
        <AiOutlineRight
          onClick={handleNextSlide}
          className="text-5xl cursor-pointer text-gray-400"
        />
      </div>
      <div className="flex justify-center p-2 absolute bottom-0 w-full">
        {items.map((item) => (
          <div
            className={`h-4 w-4 rounded-full mx-2 mb-2 cursor-pointer ${
              currentSlide === item.id ? "bg-gray-700" : "bg-gray-300"
            }`}
            key={item.id}
            onClick={() => {
              setCurrentSlide(item.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;

