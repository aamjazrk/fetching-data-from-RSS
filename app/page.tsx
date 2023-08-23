'use client'
import Image from 'next/image'
import { getData } from "../components/service/data";
import { useEffect, useState } from "react";
import { RSSItemInterface } from '../interface/item';

export default function Home() {
  const [item,setItem] = useState<RSSItemInterface[]>([])
  
  const [data, setData] = useState<JSON[]>([]);
  const getDataRss = async () => {
    let res = await getData();
    if (res.data.items) {
      setData(res.data.items);
      setItem(res.data.items)
    }
  };

  useEffect(() => {
    getDataRss();
  },[]);
  // Log the item state whenever it changes
  useEffect(() => {
    console.log('Updated item:', item);
  }, [item]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        {item && item.map(item => (
         <div id="body" key={item.guid} className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600">creator: {item.creator}</p>
            <p className="text-gray-600">date: {item.isoDate}</p>
            <div className="grid"></div>
          </div>
        ))}
      </div>
      
    </main>
  )
}
