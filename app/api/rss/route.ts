
import Parser from 'rss-parser';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,res: NextResponse){
  try {
    let parser = new Parser();
    const response = await parser.parseURL('https://life.wongnai.com/feed');
    console.log(response)
    return NextResponse.json({
      response,
        success: true
    }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        error:error,
        success: false
    }, { status: 500 })
  }
};
