export const publicFields = ['id','title','date','endDate','startTime','endTime','timezone','location','organization','host','kidaRole','topics','audience','summary','description','sourceUrl','poster','series','sources'];

export function safeURL(value, { local = false } = {}) {
  if (!value || typeof value !== 'string') return null;
  const cleaned = value.trim();
  if (local && /^\/?assets\/[a-zA-Z0-9/_.-]+$/.test(cleaned) && !cleaned.includes('..')) return '/' + cleaned.replace(/^\//, '');
  try {
    const url = new URL(cleaned);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const date = new Date(value + 'T12:00:00Z');
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0,10) === value;
}
const splitList = value => Array.isArray(value) ? value : String(value || '').split(/[\n;,]+/).map(v=>v.trim()).filter(Boolean);
const text = (value, limit = 18000) => typeof value === 'string' ? value.trim().slice(0,limit) : '';
export function normalizeEvent(raw) {
  const id = text(raw.id,160);
  const title = text(raw.title,400);
  const sourceUrl = safeURL(raw.sourceUrl, { local:true });
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id) || !title || !validDate(raw.date) || !sourceUrl) return null;
  const description = (Array.isArray(raw.description) ? raw.description : String(raw.description || '').split(/\n\s*\n/)).map(p=>text(p)).filter(Boolean);
  if (!description.length) return null;
  const time = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value || '') ? value : null;
  const endDate = validDate(raw.endDate) && raw.endDate >= raw.date ? raw.endDate : null;
  return {
    id, title, date:raw.date, endDate,
    startTime:time(raw.startTime), endTime:time(raw.endTime),
    timezone:'America/Los_Angeles',
    location:text(raw.location,600) || 'See the organizer’s event page',
    organization:text(raw.organization,100) || 'Stanford',
    host:text(raw.host,250) || text(raw.organization,100) || 'Stanford',
    kidaRole:['Hosted','Collaborated','Participated','Shared opportunity'].includes(raw.kidaRole) ? raw.kidaRole : 'Shared opportunity',
    topics:splitList(raw.topics).map(v=>text(v,100)).slice(0,8),
    audience:text(raw.audience,1200),
    summary:text(raw.summary,1600) || description[0],
    description:description.slice(0,12),
    sourceUrl,
    poster:safeURL(raw.poster, { local:true }),
    series:text(raw.series,250),
    sources:[...new Set([sourceUrl,...splitList(raw.sources).map(url=>safeURL(url)).filter(url=>url&&!url.includes('/wp-json/'))])].slice(0,8)
  };
}
export function normalizeEvents(rows) {
  const ids = new Set();
  return rows.map(normalizeEvent).filter(event => {
    if (!event || ids.has(event.id)) return false;
    ids.add(event.id); return true;
  });
}
export function parseCSV(input) {
  const rows=[]; let row=[], field='', quoted=false;
  for (let i=0;i<input.length;i++) {
    const c=input[i];
    if (c==='"') {
      if (quoted && input[i+1]==='"') { field+='"'; i++; }
      else quoted=!quoted;
    } else if (c===',' && !quoted) { row.push(field); field=''; }
    else if ((c==='\n' || c==='\r') && !quoted) {
      if (c==='\r' && input[i+1]==='\n') i++;
      row.push(field); if (row.some(v=>v.trim())) rows.push(row); row=[]; field='';
    } else field+=c;
  }
  if (quoted) throw new Error('Incomplete CSV data');
  row.push(field); if (row.some(v=>v.trim())) rows.push(row);
  return rows;
}
export function eventsFromCSV(input) {
  const [headers,...rows]=parseCSV(input.replace(/^\uFEFF/,''));
  if (!headers || !['id','title','date','description','sourceUrl'].every(key=>headers.includes(key))) throw new Error('The event feed headers are incomplete');
  return normalizeEvents(rows.filter(row=>row[headers.indexOf('id')]?.trim()).map(values=>Object.fromEntries(headers.map((name,i)=>[name,values[i] || '']))));
}
export function pacificToday(now = new Date()) {
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const value=type=>parts.find(p=>p.type===type).value;
  return value('year')+'-'+value('month')+'-'+value('day');
}
export function isUpcoming(event, now=new Date()) {
  const today=pacificToday(now);
  const end=event.endDate || event.date;
  if (end!==today) return end>today;
  if (!event.endTime) return true;
  const time=new Intl.DateTimeFormat('en-GB',{timeZone:'America/Los_Angeles',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(now);
  return event.endTime >= time;
}
