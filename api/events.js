import { eventsFromCSV } from '../lib/event-data.mjs';

export default async function handler(req,res) {
  if (req.method !== 'GET') { res.setHeader('Allow','GET'); return res.status(405).json({error:'Method not allowed'}); }
  const feed=process.env.EVENTS_SHEET_CSV_URL;
  if (!feed) return res.status(503).json({error:'Live event updates are not configured.'});
  try {
    const url=new URL(feed);
    if (url.protocol!=='https:' || url.hostname!=='docs.google.com' || !url.pathname.includes('/spreadsheets/d/e/')) throw new Error('Invalid feed configuration');
    const response=await fetch(url,{signal:AbortSignal.timeout(10000)});
    if (!response.ok) throw new Error('Event source unavailable');
    const input=await response.text();
    if (input.length>3000000) throw new Error('Event feed too large');
    const events=eventsFromCSV(input);
    res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({events,updatedAt:new Date().toISOString()});
  } catch {
    res.setHeader('Cache-Control','no-store');
    return res.status(503).json({error:'Live event updates are temporarily unavailable.'});
  }
}
