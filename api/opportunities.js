import {opportunitiesFromCSV} from '../lib/opportunity-data.mjs';
export default async function handler(req,res){
 if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Method not allowed'});}
 try{
  const url=new URL(process.env.OPPORTUNITIES_SHEET_CSV_URL);
  if(url.protocol!=='https:'||url.hostname!=='docs.google.com'||!url.pathname.includes('/spreadsheets/d/e/'))throw new Error('Invalid source');
  const response=await fetch(url,{signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('Unavailable');
  const input=await response.text();if(input.length>3000000)throw new Error('Too large');
  const opportunities=opportunitiesFromCSV(input);res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=120');return res.status(200).json({opportunities,updatedAt:new Date().toISOString()});
 }catch{res.setHeader('Cache-Control','no-store');return res.status(503).json({error:'Live opportunity updates are temporarily unavailable.'});}
}
