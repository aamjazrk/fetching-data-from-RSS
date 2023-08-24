
import Parser from "rss-parser";
import { NextRequest, NextResponse } from "next/server";
import EventEmitter from "events";

EventEmitter.defaultMaxListeners = 20; // Adjust the value as needed

// Create an in-memory cache to store fetched data
const cache = new Map();

// Function to extract the first image link from HTML content
const extractFirstImageSrc = (html: string): string => {
  const regex = /<img[^>]+src="([^">]+)"/g;
  const matches = regex.exec(html);
  return matches && matches.length > 1 ? matches[1] : "";
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const cachedData = cache.get("cachedData");
    const currentTime = Date.now(); // Current time in milliseconds
    if (cachedData && currentTime - cachedData.timestamp < 3600000) {
      console.log("sent cache data");
      // If cached data is available and not expired (1 hour), use it
      return NextResponse.json(
        {
          data: cachedData.data,
          success: true,
        },
        { status: 200 }
      );
    } else {
      let parser = new Parser();
      const response = await parser.parseURL("https://life.wongnai.com/feed");
      if (!response) {
        if (cachedData) {
          console.log("fetch data unsuccessful, sending cache data");
          // Fetch data unsuccessful, send cached data if available
          return NextResponse.json(
            {
              data: cachedData.data,
              success: true,
            },
            { status: 200 }
          );
        } else {
          console.log("fetch data unsuccessful, no cache available");
          // Fetch data unsuccessful, no cache available
          return NextResponse.json(
            {
              error: "Data fetching and cache both unsuccessful",
              success: false,
            },
            { status: 500 }
          );
        }
      } else {
        // Extract the first image source from the 'content:encoded' field for each item
        // const modifiedData = response.items.map(item => {
        //   const firstImageSrc = extractFirstImageSrc(item['content:encoded']);
        //   return { ...item, image: firstImageSrc };
        // });
        // Extract the first image source from the 'content:encoded' field for each item
        const modifiedData = response.items.map((item, index) => {
          const firstImageSrc = extractFirstImageSrc(item["content:encoded"]);
          return { ...item, id: index + 1, image: firstImageSrc };
        });
        //clear before store new one
        cache.clear();

        // Cache the modified data along with the current timestamp
        cache.set("cachedData", {
          data: modifiedData,
          timestamp: Date.now(),
        });

        console.log("sent new data");
        return NextResponse.json(
          {
            data: modifiedData,
            success: true,
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error,
        success: false,
      },
      { status: 500 }
    );
  }
}
