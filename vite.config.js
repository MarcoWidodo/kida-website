import {defineConfig,loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import eventsHandler from './api/events';
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),'EVENTS_');
 if(env.EVENTS_SHEET_CSV_URL)process.env.EVENTS_SHEET_CSV_URL=env.EVENTS_SHEET_CSV_URL;
 return {
  plugins:[react(),{
   name:'local-event-feed',
   configureServer(server){
    server.middlewares.use('/api/events',(req,res)=>{
     let status=200;
     const response={setHeader:(name,value)=>res.setHeader(name,value),status:code=>{status=code;return response;},json:body=>{res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify(body));}};
     eventsHandler(req,response);
    });
   }
  }],
  build:{outDir:'dist',sourcemap:false}
 };
});
