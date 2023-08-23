
import Parser from 'rss-parser';
import { NextRequest, NextResponse } from "next/server";

// Create an in-memory cache to store fetched data
const cache = new Map();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const cachedData = cache.get('cachedData');
    if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
      console.log('sent cache data')
      // If cached data is available and not expired (1 hour), use it
      return NextResponse.json({
        data: cachedData.data,
        success: true
      }, { status: 200 });
    }

    let parser = new Parser();
    const response = await parser.parseURL('https://life.wongnai.com/feed');
    if(!response){
      console.log('fetch data unsuccesful ,sent cache data')
      // fetch data unsuccesful ,sent cache data
      return NextResponse.json({
        data: cachedData.data,
        success: true
      }, { status: 200 });

    }

    // Cache the fetched data along with the current timestamp
    cache.set('cachedData', {
      data: response,
      timestamp: Date.now()
    });

    console.log('sent new data')
    return NextResponse.json({
      data: response,
      success: true
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error,
      success: false
    }, { status: 500 });
  }
}
