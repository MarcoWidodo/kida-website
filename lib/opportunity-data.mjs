import {safeURL,validDate,parseCSV,pacificToday} from './event-data.mjs';
const text=(value,limit=12000)=>typeof value==='string'?value.trim().slice(0,limit):'';
const list=value=>(Array.isArray(value)?value:String(value||'').split(/[;\n]+/)).map(value=>text(value,150)).filter(Boolean);
export function normalizeOpportunity(raw){
 const id=text(raw.id,160),title=text(raw.title,400),sourceUrl=safeURL(raw.sourceUrl);
 const description=(Array.isArray(raw.description)?raw.description:String(raw.description||'').split(/\n\s*\n/)).map(value=>text(value)).filter(Boolean);
 if(!/^[a-z0-9][a-z0-9-]*$/.test(id)||!title||!sourceUrl||!description.length||!text(raw.eligibility)||!['Yes','Some undergraduates'].includes(raw.undergraduateEligible))return null;
 return {id,title,organization:text(raw.organization,100)||'Stanford',host:text(raw.host,300)||text(raw.organization,100),type:['Research','Internship','Fellowship','Volunteer','Job','Challenge'].includes(raw.type)?raw.type:'Research',recordKind:raw.recordKind==='Opportunity'?'Opportunity':'Program',location:text(raw.location,500)||'See the organizer’s page',locationMode:['On-site','Hybrid','Remote','Varies'].includes(raw.locationMode)?raw.locationMode:'Varies',locations:list(raw.locations).slice(0,6),topics:list(raw.topics).slice(0,10),eligibility:text(raw.eligibility,2500),undergraduateEligible:raw.undergraduateEligible,deadline:validDate(raw.deadline)?raw.deadline:null,expiresOn:validDate(raw.expiresOn)?raw.expiresOn:null,availability:['Open','Upcoming','Explore program','Closed'].includes(raw.availability)?raw.availability:'Explore program',summary:text(raw.summary,1200)||description[0],description:description.slice(0,10),sourceUrl,applicationUrl:safeURL(raw.applicationUrl),verifiedOn:validDate(raw.verifiedOn)?raw.verifiedOn:null,sources:[...new Set(list(raw.sources).map(value=>safeURL(value)).filter(Boolean))].slice(0,8)};
}
export function normalizeOpportunities(records){const ids=new Set();return records.map(normalizeOpportunity).filter(record=>{if(!record||ids.has(record.id))return false;ids.add(record.id);return true;});}
export function opportunitiesFromCSV(input){const [headers,...rows]=parseCSV(input.replace(/^\uFEFF/,''));if(!headers||!['id','title','description','sourceUrl','eligibility','undergraduateEligible'].every(key=>headers.includes(key)))throw new Error('Opportunity feed headers are incomplete');return normalizeOpportunities(rows.filter(row=>row[headers.indexOf('id')]?.trim()).map(row=>Object.fromEntries(headers.map((name,i)=>[name,row[i]||'']))));}
export function opportunityAvailability(record,now=new Date()){
 const today=pacificToday(now);
 if((record.deadline&&record.deadline<today)||(record.expiresOn&&record.expiresOn<today))return 'Closed';
 if(record.availability==='Open'&&(!record.verifiedOn||Date.parse(today)-Date.parse(record.verifiedOn)>30*86400000))return 'Check availability';
 return record.availability;
}
