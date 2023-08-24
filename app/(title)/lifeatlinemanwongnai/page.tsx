"use client";

import { getData } from "@/components/service/data";
import { useEffect, useState } from "react";
import { RSSItemInterface } from "@/interface/item";
import CategoryChip from "@/components/ui/module/catagoryChip";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";

export default function lifeatlinemanwongnai() {
  const [items, setItem] = useState<RSSItemInterface[]>([]);
  const [data, setData] = useState<JSON[]>([]);


  const getDataRss = async () => {
    let res = await getData();
    if (res.data.items) {
      setData(res.data.items);
      setItem(res.data.items);
    }
  };

  useEffect(() => {
    getDataRss();
  }, []);
  // Log the item state whenever it changes
  useEffect(() => {
    console.log("Updated item:", items);
  }, [items]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-black">Blogs</h1>
      


      <div className="grid lg:grid-cols-1 gap-4">
        {items &&
          items.map((item) => (
            <div
              id="body"
              key={item.id}
              className="bg-white shadow-md rounded-md p-4"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-600">{item.title}</h2>
              <span className="flex flex-wrap flex-1 ">
                  {
                    item.categories.map((item) => (
                      <CategoryChip category={item}></CategoryChip>
                    ))}
                </span>
              <p className="text-gray-600">creator: {item.creator}</p>
              <p className="text-gray-600 flex-wrap">content: {item["content:encoded"]}</p>
              <p className="text-gray-600">date: {item.isoDate}</p>
              <div className="grid"></div>
              {/* Showing the categories in a chip component  */}
              {/* <span className="mt-2 w-full leading-loose">
                <h2 className="text-gray-600 mb-1">Category</h2>
                
                {item.categories && <strong>Categories:</strong>}{" "}
                <span className="flex flex-wrap flex-1 ">
                  {
                    item.categories.map((item) => (
                      <CategoryChip category={item}></CategoryChip>
                    ))}
                </span>
              </span> */}
            </div>
          ))}
      </div>
    </main>
  );
}
