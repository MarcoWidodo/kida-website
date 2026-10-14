import {createContext,useContext,useEffect,useState,useCallback} from 'react';
import seed from './events.seed.json';
import {normalizeEvents,isUpcoming} from '../../lib/event-data.mjs';
export {isUpcoming};
const EventContext=createContext();
const validSeed=normalizeEvents(seed);
export function EventProvider({children}) {
  const [events,setEvents]=useState(validSeed);
  const [notice,setNotice]=useState('');
  const [revision,setRevision]=useState(0);
  const retry=useCallback(()=>setRevision(v=>v+1),[]);
  useEffect(()=>{
    let active=true, controller;
    async function refresh() {
      if (document.hidden) return;
      controller?.abort(); controller=new AbortController();
      try {
        const response=await fetch('/api/events',{signal:controller.signal,cache:'no-cache'});
        if (!response.ok) throw new Error('Unavailable');
        const data=await response.json();
        if (!Array.isArray(data.events)) throw new Error('Invalid feed');
        const checked=normalizeEvents(data.events);
        if (data.events.length && !checked.length) throw new Error('Invalid feed');
        if (active) {
          setEvents(checked); setNotice('');
          try { localStorage.setItem('kida-events-v1',JSON.stringify({events:checked,savedAt:Date.now()})); } catch {}
        }
      } catch (error) {
        if (active && error.name!=='AbortError') setNotice('Live updates are unavailable. Showing the saved archive.');
      }
    }
    try {
      const cached=JSON.parse(localStorage.getItem('kida-events-v1') || 'null');
      if (cached && Array.isArray(cached.events) && Date.now()-cached.savedAt<7*86400000) setEvents(normalizeEvents(cached.events));
    } catch {}
    refresh();
    const interval=setInterval(refresh,60000);
    window.addEventListener('focus',refresh); document.addEventListener('visibilitychange',refresh);
    return ()=>{ active=false; controller?.abort();clearInterval(interval);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh); };
  },[revision]);
  return <EventContext.Provider value={{events,notice,retry}}>{children}</EventContext.Provider>;
}
export const useEvents=()=>useContext(EventContext);
export const organizationColors={'KIDA':'#8c1515','King Center':'#8c1515','GSB':'#8f993e','CDDRL':'#00548f','APARC':'#620059','International Relations':'#d1660f','Political Science':'#00548f','Stanford Law':'#d1660f','Other':'#620059','Global Health':'#8f993e'};
export function eventDate(event) {
  const format=iso=>new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
  return format(event.date)+(event.endDate && event.endDate!==event.date ? ' – '+format(event.endDate) : '');
}
export function eventTime(event) {
  const format=value=>{const [h,m]=value.split(':').map(Number);return String(h%12||12)+(m?':'+String(m).padStart(2,'0'):'')+' '+(h>=12?'p.m.':'a.m.');};
  return event.startTime ? format(event.startTime)+(event.endTime?' – '+format(event.endTime):'')+' Pacific' : '';
}
