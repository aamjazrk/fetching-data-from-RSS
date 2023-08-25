"use client";
import Image from "next/image";
import { getData } from "../components/service/data";
import { useEffect, useState } from "react";
import { RSSItemInterface } from "../interface/item";
import CategoryChip from "@/components/ui/module/catagoryChip";
import Link from "next/link";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import React from "react";

export default function Home() {
  const [items, setItem] = useState<RSSItemInterface[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Start with slide 1
  const [show, setShow] = useState<RSSItemInterface[]>([]);

  const handlePrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(show.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
    console.log("call handlePrevSlide id: ", currentSlide);
  };

  const handleNextSlide = () => {
    console.log("call handleNextSlide id: ", currentSlide);
    setCurrentSlide((prevSlide) =>
      prevSlide > show.length - 2 ? 0 : prevSlide + 1
    ); // Ensure maximum is the number of items
  };

  const getDataRss = async () => {
    let res = await getData();
    console.log("resdata", res);
    if (res.data.items) {
      setItem(res.data.items);
      setShow(res.data.items.slice(0, 4));
      setCurrentSlide(1);
    }
  };
  // Autoplay configuration
  const autoplayDelay = 5000; // Delay in milliseconds
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      handleNextSlide();
    }, autoplayDelay);

    return () => clearInterval(autoplayInterval);
  }, [currentSlide]);

  useEffect(() => {
    getDataRss();
  }, []);

  // Log the item state whenever it changes
  useEffect(() => {
    console.log("Updated item:", items);
  }, [items]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-black">Blogs</h1>
      <div className="relative mx-auto  container">
        {/* Carousel */}
        <div className="w-2/4 h-[50vh] flex overflow-hidden relative m-auto">
          {/* Left button */}
          <AiOutlineLeft
            onClick={handlePrevSlide}
            className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
          />
          <Swipe
            onSwipeLeft={handlePrevSlide}
            onSwipeRight={handleNextSlide}
            className="relative z-10 w-full h-full"
          >
            {show.map((item, index) => (
              <Link href={item.link}>
                <Image
                  key={item.id}
                  src={item.image}
                  layout="fill"
                  objectFit="cover"
                  className={`animate-fadeIn ${
                    index === currentSlide ? "visible" : "hidden"
                  }`}
                  alt="Picture of slice"
                />
              </Link>
            ))}
          </Swipe>
          {/* Right button */}
          <AiOutlineRight
            onClick={handleNextSlide}
            className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
          />
        </div>
        {/* Pagination */}
        <div className="relative flex justify-center p-2">
          {show.map((item) => (
            <div
              key={item.id}
              className={
                item.id === currentSlide
                  ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
              }
              onClick={() => {
                setCurrentSlide(item.id);
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-10/12 grid md:grid-cols-3 gap-5">
        {items &&
          items.map((item) => (
            <div
              id="body"
              key={item.title}
              className="bg-white shadow-md rounded-md p-4 max-w-5xl max-h-full "
            >
              <Link href={item.link}>
                <h2 className="mb-2 text-gray-600 text-lg font-semibold">
                  <span className="line-clamp-2">{item.title}</span>
                </h2>
                <span className="flex flex-wrap flex-1 ">
                  {item.categories.map((item) => (
                    <CategoryChip category={item}></CategoryChip>
                  ))}
                </span>
                <div className="flex justify-center">
                  <Image
                    src={item.image}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    className="place-self-center pt-2"
                    objectFit="cover"
                  />
                </div>
                <p className="text-gray-600 line-clamp-3 pt-3">
                  {item["content:encodedSnippet"]}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </main>
  );
}
