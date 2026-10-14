import {useEffect} from 'react';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import {EventProvider} from './lib/events';
import {ThemeProvider,Navbar,Footer,HomePage,AboutPage,EventsPage,ContactPage,EventDialog} from './Site';
function SiteRoutes() {
 const location=useLocation();const background=location.state?.backgroundLocation;const mainLocation=background||location;
 useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[mainLocation.pathname]);
 useEffect(()=>{
  const title=mainLocation.pathname.startsWith('/events')?'Events':mainLocation.pathname==='/about'?'About':mainLocation.pathname==='/contact'?'Get involved':null;
  document.title=title?title+' — Stanford KIDA':'KIDA — Find your path to global development at Stanford.';
 },[mainLocation.pathname]);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>document.documentElement.dataset.motion=media.matches||new URLSearchParams(window.location.search).get('motion')==='reduce'?'reduced':'full';
  update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);
 },[]);
 return <><Navbar/><main id="main" tabIndex="-1"><Routes location={mainLocation}><Route path="/" element={<HomePage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/events" element={<EventsPage/>}/><Route path="/events/:id" element={<EventsPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<ContactPage/>}/></Routes></main><Footer/><EventDialog/></>;
}
export default function App(){return <ThemeProvider><BrowserRouter><EventProvider><SiteRoutes/></EventProvider></BrowserRouter></ThemeProvider>;}
