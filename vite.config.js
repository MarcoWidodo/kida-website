import {defineConfig,loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import eventsHandler from './api/events';
import opportunitiesHandler from './api/opportunities';
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),'EVENTS_');
 if(env.EVENTS_SHEET_CSV_URL)process.env.EVENTS_SHEET_CSV_URL=env.EVENTS_SHEET_CSV_URL;
 const opportunityEnv=loadEnv(mode,process.cwd(),'OPPORTUNITIES_');
 if(opportunityEnv.OPPORTUNITIES_SHEET_CSV_URL)process.env.OPPORTUNITIES_SHEET_CSV_URL=opportunityEnv.OPPORTUNITIES_SHEET_CSV_URL;
 return {
  plugins:[react(),{
   name:'local-event-feed',
   configureServer(server){
    for(const [path,handler] of [['/api/events',eventsHandler],['/api/opportunities',opportunitiesHandler]])server.middlewares.use(path,(req,res)=>{
     let status=200;
     const response={setHeader:(name,value)=>res.setHeader(name,value),status:code=>{status=code;return response;},json:body=>{res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify(body));}};
     handler(req,response);
    });
   }
  }],
  build:{outDir:'dist',sourcemap:false}
 };
});
