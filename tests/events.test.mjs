import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {normalizeEvent,normalizeEvents,parseCSV,eventsFromCSV,isUpcoming,validDate,safeURL} from '../lib/event-data.mjs';
import handler from '../api/events.js';

const seed=JSON.parse(await readFile(new URL('../src/lib/events.seed.json',import.meta.url),'utf8'));
const sample={...seed[0],status:'Approved',reviewNotes:'Private editorial note',eligibilityEvidence:'Private review evidence'};
const csv=rows=>rows.map(row=>row.map(cell=>'"'+String(cell??'').replaceAll('"','""')+'"').join(',')).join('\r\n');
const headers=['id','title','date','description','sourceUrl'];
const fixture=csv([headers,[sample.id,sample.title,sample.date,'First paragraph, including a comma.\n\nA second "quoted" paragraph.',sample.sourceUrl]]);

test('all researched seed records are valid with stable distinct identifiers',()=>{
 assert.equal(seed.length,44);
 assert.equal(normalizeEvents(seed).length,44);
 assert.equal(new Set(seed.map(e=>e.id)).size,44);
 assert.ok(seed.some(e=>e.kidaRole==='Shared opportunity'));
});
test('public normalization omits editorial and review fields',()=>{
 const event=normalizeEvent(sample);
 assert.ok(event);
 assert.equal(event.reviewNotes,undefined);
 assert.equal(event.status,undefined);
 assert.equal(event.eligibilityEvidence,undefined);
 assert.ok(event.description.length);
});
test('unsafe links and malformed dates cannot enter the public catalogue',()=>{
 assert.equal(safeURL('javascript:alert(1)'),null);
 assert.equal(safeURL('https://user:password@example.com'),null);
 assert.equal(safeURL('/assets/../secret',{local:true}),null);
 assert.equal(validDate('2026-02-30'),false);
 assert.equal(normalizeEvent({...sample,date:'2026-02-30'}),null);
 assert.equal(normalizeEvent({...sample,sourceUrl:'data:text/html,x'}),null);
});
test('quoted CSV fields retain commas, newlines, and escaped quotation marks',()=>{
 assert.equal(parseCSV(fixture).length,2);
 const [event]=eventsFromCSV(fixture);
 assert.equal(event.description.length,2);
 assert.equal(event.description[1],'A second "quoted" paragraph.');
 assert.equal(event.id,sample.id);
});
test('missing times remain unspecified and duplicate stable IDs do not duplicate events',()=>{
 const event=normalizeEvent({...sample,startTime:null,endTime:null});
 assert.equal(event.startTime,null);
 assert.equal(event.endTime,null);
 assert.equal(normalizeEvents([sample,sample]).length,1);
 assert.deepEqual(eventsFromCSV(csv([headers])),[]);
});
test('same-day and multi-day status use Pacific dates and end times',()=>{
 const event={date:'2026-10-14',endDate:null,endTime:'18:00'};
 assert.equal(isUpcoming(event,new Date('2026-10-15T00:30:00Z')),true);
 assert.equal(isUpcoming(event,new Date('2026-10-15T01:01:00Z')),false);
 assert.equal(isUpcoming({...event,endDate:'2026-10-16',endTime:null},new Date('2026-10-16T22:00:00Z')),true);
});
function responseCapture(){
 const result={headers:{},statusCode:200,body:null};
 const res={setHeader:(name,value)=>{result.headers[name]=value;},status:code=>{result.statusCode=code;return res;},json:body=>{result.body=body;return result;}};
 return {res,result};
}
test('event endpoint validates its method, source, public output, and failure response',async()=>{
 const oldURL=process.env.EVENTS_SHEET_CSV_URL;const oldFetch=globalThis.fetch;
 try{
  let capture=responseCapture();await handler({method:'POST'},capture.res);assert.equal(capture.result.statusCode,405);
  delete process.env.EVENTS_SHEET_CSV_URL;capture=responseCapture();await handler({method:'GET'},capture.res);assert.equal(capture.result.statusCode,503);
  process.env.EVENTS_SHEET_CSV_URL='https://evil.example/spreadsheets/d/e/feed/pub';
  capture=responseCapture();await handler({method:'GET'},capture.res);assert.equal(capture.result.statusCode,503);
  process.env.EVENTS_SHEET_CSV_URL='https://docs.google.com/spreadsheets/d/e/test-feed/pub?output=csv';
  globalThis.fetch=async()=>new Response(fixture,{status:200});
  capture=responseCapture();await handler({method:'GET'},capture.res);assert.equal(capture.result.statusCode,200);assert.equal(capture.result.body.events.length,1);
  assert.equal(capture.result.body.events[0].reviewNotes,undefined);
  globalThis.fetch=async()=>{throw new Error('Unavailable');};
  capture=responseCapture();await handler({method:'GET'},capture.res);assert.equal(capture.result.statusCode,503);assert.equal(capture.result.body.events,undefined);
 }finally{globalThis.fetch=oldFetch;if(oldURL===undefined)delete process.env.EVENTS_SHEET_CSV_URL;else process.env.EVENTS_SHEET_CSV_URL=oldURL;}
});
