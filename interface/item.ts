export interface RSSItemInterface {
  id: number
  categories: string[];
  'content:encoded': string; 
  'content:encodedSnippet': string; 
  creator: string;
  'dc:creator': string; 
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
  image:string;
}
