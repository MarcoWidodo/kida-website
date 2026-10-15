import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const registry=JSON.parse(await fs.readFile(new URL('../data/opportunity-sources.json',import.meta.url),'utf8'));
const directory=path.resolve('.review');await fs.mkdir(directory,{recursive:true});
const snapshotFile=path.join(directory,'opportunity-source-snapshots.json');let previous={};try{previous=JSON.parse(await fs.readFile(snapshotFile,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
const snapshots={...previous},queue=[];
function textOnly(html){const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||html;return main.replace(/<(script|style|nav|footer|header)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|amp|quot|#39);/g,' ').replace(/\s+/g,' ').trim();}
for(const source of registry){
 const url=new URL(source.url);if(url.protocol!=='https:')throw new Error('Only HTTPS official sources are supported');
 try{
  const response=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'KIDA source review (+https://www.stanfordkida.com/)'}});if(!response.ok)throw new Error('HTTP '+response.status);
  const html=await response.text();if(html.length>5000000)throw new Error('Source is too large');
  const text=textOnly(html),hash=createHash('sha256').update(text).digest('hex');const prior=previous[source.id];
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||html;
  const links=[...main.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].flatMap(match=>{try{const target=new URL(match[1].replaceAll('&amp;','&'),url);const label=textOnly(match[2]);return target.protocol==='https:'&&/opportunit|research|fellow|intern|volunt|application|apply/i.test(target.pathname+' '+label)?[{title:label.slice(0,250),url:target.href}]:[];}catch{return [];}});
  const distinct=[...new Map(links.map(link=>[link.url,link])).values()];const oldLinks=new Set(prior?.links?.map(link=>link.url)||[]);
  snapshots[source.id]={url:url.href,checkedAt:new Date().toISOString(),hash,links:distinct};
  if(!prior||prior.hash!==hash)queue.push({source:source.organization,url:url.href,status:'Pending review',change:prior?'Page text changed':'First source snapshot',newLinks:distinct.filter(link=>!oldLinks.has(link.url)),selectionRules:source.filtering,expiryChecks:source.expiryChecks});
 }catch(error){queue.push({source:source.organization,url:url.href,status:'Fetch failed',error:error.message});}
}
await fs.writeFile(snapshotFile,JSON.stringify(snapshots,null,2)+'\n');await fs.writeFile(path.join(directory,'opportunity-review-queue.json'),JSON.stringify({checkedAt:new Date().toISOString(),note:'Candidates require source, development relevance, and undergraduate eligibility review. Nothing has been published.',queue},null,2)+'\n');
console.log('Reviewed '+registry.length+' official source groups. '+queue.length+' source changes or fetch issues saved to .review/opportunity-review-queue.json. Nothing was published.');
