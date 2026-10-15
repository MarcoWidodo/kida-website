import {createContext,useCallback,useContext,useEffect,useState} from 'react';
import seed from './opportunities.seed.json';
import {normalizeOpportunities} from '../../lib/opportunity-data.mjs';
const Context=createContext();
export function OpportunityProvider({children}){
 const [opportunities,setOpportunities]=useState(()=>normalizeOpportunities(seed));const [notice,setNotice]=useState('');const [revision,setRevision]=useState(0);const retry=useCallback(()=>setRevision(v=>v+1),[]);
 useEffect(()=>{let active=true,controller;async function refresh(){if(document.hidden)return;controller?.abort();controller=new AbortController();try{const response=await fetch('/api/opportunities',{signal:controller.signal,cache:'no-cache'});if(!response.ok)throw new Error('Unavailable');const data=await response.json();if(!Array.isArray(data.opportunities))throw new Error('Invalid feed');const checked=normalizeOpportunities(data.opportunities);if(data.opportunities.length&&!checked.length)throw new Error('Invalid feed');if(active){setOpportunities(checked);setNotice('');try{localStorage.setItem('kida-opportunities-v1',JSON.stringify({records:checked,savedAt:Date.now()}));}catch{}}}catch(error){if(active&&error.name!=='AbortError')setNotice('Live updates are unavailable. Showing the saved opportunities.');}}
 try{const cached=JSON.parse(localStorage.getItem('kida-opportunities-v1')||'null');if(cached&&Array.isArray(cached.records)&&Date.now()-cached.savedAt<7*86400000)setOpportunities(normalizeOpportunities(cached.records));}catch{}
 refresh();const interval=setInterval(refresh,60000);window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);return()=>{active=false;controller?.abort();clearInterval(interval);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);};},[revision]);
 return <Context.Provider value={{opportunities,notice,retry}}>{children}</Context.Provider>;
}
export const useOpportunities=()=>useContext(Context);
