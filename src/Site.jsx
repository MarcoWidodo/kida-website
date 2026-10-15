import {useState,useEffect,useRef,useMemo,createContext,useContext} from 'react';
import {Link,NavLink,useLocation,useNavigate,useMatch} from 'react-router-dom';
import {useEvents,organizationColors,eventDate,eventTime,isUpcoming} from './lib/events';
import Icon from './components/Icons';
import FilterSelect from './components/FilterSelect';
import OrbitField from './components/OrbitField';
import EventImage,{resolveEventMedia} from './components/EventImage';

const ThemeContext=createContext();
export function ThemeProvider({children}) {
  const [dark,setDark]=useState(()=>document.documentElement.dataset.theme==='dark');
  useEffect(()=>{
    document.documentElement.dataset.theme=dark?'dark':'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#000000':'#ffffff');
    try {localStorage.setItem('kida-theme',dark?'dark':'light');} catch {}
  },[dark]);
  return <ThemeContext.Provider value={{dark,toggle:()=>setDark(v=>!v)}}>{children}</ThemeContext.Provider>;
}
export function Navbar() {
 const {dark,toggle}=useContext(ThemeContext);const [menu,setMenu]=useState(false);const header=useRef(),menuButton=useRef();const location=useLocation();
 useEffect(()=>setMenu(false),[location.pathname]);
 useEffect(()=>{if(!menu)return;const dismiss=e=>{if(e.type==='keydown'&&e.key==='Escape'){setMenu(false);menuButton.current?.focus();}else if(e.type==='pointerdown'&&!header.current?.contains(e.target))setMenu(false);};document.addEventListener('keydown',dismiss);document.addEventListener('pointerdown',dismiss);return()=>{document.removeEventListener('keydown',dismiss);document.removeEventListener('pointerdown',dismiss);};},[menu]);
 return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header" ref={header}><div className="page-width site-nav">
 <Link className="brand" to="/" aria-label="KIDA home"><span className="logo-pair"><img className="logo-light" src="/assets/logos/kida-red.png" alt="KIDA" width="66" height="66"/><img className="logo-dark" src="/assets/logos/kida-white.png" alt="" width="66" height="66"/></span><span className="brand-caption">King International<br/>Development Association</span></Link>
 <nav id="main-navigation" className={menu?'is-open':''} aria-label="Main navigation">{[['/about','About'],['/events','Events'],['/opportunities','Opportunities'],['/tools','Tools'],['/contact','Get involved']].map(([href,label])=><NavLink key={href} to={href} onClick={()=>setMenu(false)}>{label}</NavLink>)}</nav>
 <button className="theme-button tactile-icon" onClick={toggle} aria-label={'Switch to '+(dark?'light':'dark')+' mode'} aria-pressed={dark} title={'Switch to '+(dark?'light':'dark')+' mode'}><Icon name={dark?'sun':'moon'} size={19}/></button>
 <button className="menu-button tactile-icon" ref={menuButton} aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="main-navigation" onClick={()=>setMenu(v=>!v)}><Icon name={menu?'close':'menu'}/></button>
 </div></header></>;
}
export function JoinSection() {
 return <section className="join-section page-width" aria-labelledby="join-heading"><div className="join-row"><h2 id="join-heading">Get <em className="large-accent">involved.</em></h2><a className="tactile-button" href="https://www.instagram.com/stanford.kida/" target="_blank" rel="noopener noreferrer">Follow @stanford.kida <span aria-hidden="true">↗</span></a></div></section>;
}
export function Footer() {
 return <footer className="site-footer page-width"><p>King International Development Association<br/><span className="muted">A student organization at Stanford University.</span></p><a className="text-link" href="mailto:stanford.kida@gmail.com">Say hello! <span aria-hidden="true">↗</span></a></footer>;
}
export const OrbitBackground=OrbitField;
function useEventOpen() {
 const navigate=useNavigate(); const location=useLocation();
 return event=>navigate('/events/'+event.id+location.search,{state:{backgroundLocation:location}});
}
function Preview({event}) {
 return <span className="event-preview"><span className="event-preview-inner"><span className="event-preview-copy" id={'preview-'+event.id}>{event.summary}</span></span></span>;
}
export function EventRow({event}) {
 const open=useEventOpen(); const date=new Date(event.date+'T12:00:00Z');
 return <button className="event-row" data-event={event.id} aria-haspopup="dialog" aria-label={'Read about '+event.title+', '+eventDate(event)} aria-describedby={'preview-'+event.id} onClick={()=>open(event)}>
   <time className="event-date" dateTime={event.date}><span>{String(date.getUTCDate()).padStart(2,'0')}</span><span>{new Intl.DateTimeFormat('en-US',{month:'short',timeZone:'UTC'}).format(date)} {date.getUTCFullYear()}</span></time><span className="event-main"><span className="event-title">{event.title}</span><span className="event-series">{event.organization}</span><Preview event={event}/></span><span className="event-arrow" aria-hidden="true">↗</span>
 </button>;
}
export function EventCard({event}) {
 const open=useEventOpen();
 return <article className="event-card" style={{'--organization-color':organizationColors[event.organization]||'#8c1515'}}><button className="event-card-button" data-event={event.id} aria-haspopup="dialog" aria-label={'Read about '+event.title+', '+eventDate(event)} aria-describedby={'preview-'+event.id} onClick={()=>open(event)}>
   <span className="event-card-visual"><EventImage event={event}/></span>
   <span className="event-card-content"><span className="event-card-meta"><time dateTime={event.date}>{eventDate(event)}</time><span>{isUpcoming(event)?'Upcoming':'Past event'}</span></span><span className="event-title">{event.title}</span><span className="event-card-host"><span className="host-dot" aria-hidden="true"/>{event.organization}{event.organization!=='KIDA'&&event.kidaRole!=='Shared opportunity'?' · KIDA':''}</span><Preview event={event}/><span className="event-card-bottom"><span>Event details</span><span aria-hidden="true">↗</span></span></span>
 </button></article>;
}
export function EventDialog() {
 const match=useMatch('/events/:id'); const {events}=useEvents(); const location=useLocation(); const navigate=useNavigate();const dialog=useRef(); const origin=useRef();const [copied,setCopied]=useState(false);
 const event=events.find(item=>item.id===match?.params.id);
 const eventMedia=event?resolveEventMedia(event):null;
 useEffect(()=>{
  if (!event) return;
  origin.current=document.activeElement;
  dialog.current.showModal();document.body.classList.add('modal-open');
  dialog.current.querySelector('button').focus({preventScroll:true});
  setCopied(false);
  return ()=>{dialog.current?.close();document.body.classList.remove('modal-open');const target=origin.current;requestAnimationFrame(()=>{if(target?.isConnected)target.focus({preventScroll:true});});};
 },[event?.id]);
 function close() {
  if(location.state?.backgroundLocation) navigate(-1);
  else navigate('/events'+location.search,{replace:true});
 }
 if(!match)return null;
 if(!event) return <section className="page-width missing-event"><h2>Event not found.</h2><p>This event may have been withdrawn or its link may have changed.</p><Link to="/events" className="text-link">Browse events ↗</Link></section>;
 async function copy() {
  try {await navigator.clipboard.writeText(new URL('/events/'+event.id,locationOrigin()).href);setCopied(true);}catch{setCopied(false);}
 }
 function locationOrigin(){return window.location.origin;}
 return <dialog className="event-dialog" ref={dialog} aria-labelledby="dialog-title" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();if(e.target===e.currentTarget&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))close();}}><div className="dialog-inner"><button className="dialog-close" aria-label="Close event details" onClick={close} autoFocus>Close <span aria-hidden="true">×</span></button>
 <p className="eyebrow muted">{event.series||event.organization} · {isUpcoming(event)?'Upcoming':'Past event'}</p><h2 id="dialog-title">{event.title}</h2><p className="dialog-host">{event.host}</p>
 <dl className="event-details"><div><dt>When</dt><dd>{eventDate(event)}{eventTime(event)&&<><br/>{eventTime(event)}</>}</dd></div><div><dt>Where</dt><dd>{event.location}</dd></div>{event.audience&&<div><dt>Who</dt><dd>{event.audience}</dd></div>}<div><dt>KIDA</dt><dd>{event.kidaRole==='Shared opportunity'?'Shared opportunity · hosted by '+event.organization:({'Hosted':'Hosted by KIDA','Collaborated':'In collaboration with KIDA','Participated':'KIDA participated'}[event.kidaRole])}</dd></div></dl>
 <div className="dialog-description">{event.description.map((p,i)=><p key={i}>{p}</p>)}</div><div className="dialog-actions"><a className="tactile-button" href={event.sourceUrl} target="_blank" rel="noopener noreferrer">{event.sourceUrl.startsWith('/assets/')?'Original invitation':'Organizer’s event page'} <span aria-hidden="true">↗</span></a><button className="text-button" onClick={copy}>{copied?'Link copied':'Copy link'} <span aria-hidden="true">↗</span></button></div><p className="copy-status sr-only" role="status">{copied?'Event link copied.':''}</p>
 {event.sources.length>1&&<div className="additional-sources"><p className="eyebrow muted">Also listed by</p>{event.sources.slice(1).map((url,i)=><a key={url} className="text-link" href={url} target="_blank" rel="noopener noreferrer">Additional event source {i+1} ↗</a>)}</div>}
 {eventMedia?.path&&eventMedia.kind!=='logo'&&<figure className="event-poster"><img src={eventMedia.path} style={eventMedia.dimensions?.[0]<300?{width:eventMedia.dimensions[0],marginInline:'auto'}:undefined} alt={eventMedia.alt||'Event image for '+event.title} loading="lazy" referrerPolicy="no-referrer"/><figcaption>{eventMedia.credit||'Event organizer'}{eventMedia.sourcePage&&<> · <a className="image-credit" href={eventMedia.sourcePage} target="_blank" rel="noopener noreferrer">Image source ↗</a></>}</figcaption></figure>}
 </div></dialog>;
}
export function HomePage() {
 const {events}=useEvents();const upcoming=events.filter(event=>isUpcoming(event)).sort((a,b)=>a.date.localeCompare(b.date));const chosen=(upcoming.length?upcoming:[...events].sort((a,b)=>b.date.localeCompare(a.date))).slice(0,3);
 return <><OrbitBackground/><section className="community-section page-width" aria-label="Our community"><figure className="community-photo"><img src="/assets/photos/street-1440.webp" srcSet="/assets/photos/street-760.webp 760w, /assets/photos/street-1440.webp 1440w" sizes="(max-width:800px) 100vw,65vw" alt="Motorbikes and an auto rickshaw moving through a busy street lined with shops." width="1440" height="810" loading="lazy"/><figcaption>From the KIDA photo collection.</figcaption></figure><div className="community-copy"><p className="eyebrow muted">Our community</p><p>Connecting students with the <a className="accent institutional-link" href="https://kingcenter.stanford.edu/" target="_blank" rel="noopener noreferrer">King Center on Global Development</a> and a wider world of ideas.</p><Link className="text-link" to="/about">About KIDA <span aria-hidden="true">↗</span></Link></div></section>
 <section className="events-section page-width" aria-labelledby="events-heading"><div className="section-heading"><h2 id="events-heading">Development Events <span className="accent">at Stanford</span></h2><Link className="text-link" to="/events">All events <span aria-hidden="true">↗</span></Link></div><p className="eyebrow muted home-event-label">{upcoming.length?'Coming up':'From the archive'}</p><div className="event-list">{chosen.map(event=><EventRow key={event.id} event={event}/>)}</div></section><JoinSection/></>;
}
export function EventsPage() {
 const {events,notice,retry}=useEvents();const location=useLocation();const navigate=useNavigate();
 const params=new URLSearchParams(location.search); const search=params.get('q')||'';const organization=params.get('org')||'';const topic=params.get('topic')||'';const when=['upcoming','past'].includes(params.get('when'))?params.get('when'):'all';
 const organizations=[...new Set(events.map(e=>e.organization))].sort();const topics=[...new Set(events.flatMap(e=>e.topics))].sort();
 function filter(key,value){const next=new URLSearchParams(location.search);if(value)next.set(key,value);else next.delete(key);navigate({pathname:'/events',search:next.toString()},{replace:true});}
 const filtered=useMemo(()=>events.filter(event=>(!organization||event.organization===organization)&&(!topic||event.topics.includes(topic))&&(!search||[event.title,event.host,event.summary,event.description.join(' '),event.topics.join(' ')].join(' ').toLowerCase().includes(search.toLowerCase()))),[events,organization,topic,search]);
 const upcoming=filtered.filter(event=>isUpcoming(event)).sort((a,b)=>a.date.localeCompare(b.date));
 const past=filtered.filter(event=>!isUpcoming(event)).sort((a,b)=>b.date.localeCompare(a.date));
 const count=(when==='past'?past:when==='upcoming'?upcoming:filtered).length;
 const archiveYears=[...new Set(past.map(event=>event.date.slice(0,4)))].sort();const archiveLabel=archiveYears.length>1?archiveYears[0]+'–'+archiveYears.at(-1).slice(2):archiveYears[0]||'';
 return <><section className="archive-header page-width"><p className="eyebrow muted">Across Stanford</p><h1>Events<span className="accent">.</span></h1><p>Ideas to explore. People to meet.</p></section><section className="archive-section page-width" aria-label="Discover events">
 <div className="event-controls"><div className="period-buttons" aria-label="Event period">{['all','upcoming','past'].map(value=><button key={value} aria-pressed={when===value} onClick={()=>filter('when',value==='all'?'':value)}>{value==='all'?'All events':value==='upcoming'?'Upcoming':'Past'}</button>)}</div><div className="event-filters"><label className="search-field"><span className="sr-only">Search events</span><input type="search" placeholder="Search events" value={search} onChange={e=>filter('q',e.target.value)}/><span aria-hidden="true"><Icon name="search" size={17}/></span></label><FilterSelect label="Organization" value={organization} onChange={value=>filter('org',value)} options={organizations} placeholder="All organizations"/><FilterSelect label="Topic" value={topic} onChange={value=>filter('topic',value)} options={topics} placeholder="All topics"/></div></div>
 <p className="event-result-count" role="status">{count} {count===1?'event':'events'}{(search||organization||topic)&&<button className="clear-filters" onClick={()=>navigate('/events',{replace:true})}>Clear filters</button>}</p>
 {notice&&<p className="feed-notice" role="status">{notice} <button onClick={retry}>Retry</button></p>}
 {when!=='past'&&upcoming.length>0&&<section className="event-group" aria-labelledby="upcoming-heading"><div className="archive-toolbar"><h2 id="upcoming-heading">Coming up</h2><span className="eyebrow muted">At Stanford</span></div><div className="event-grid">{upcoming.map(event=><EventCard key={event.id} event={event}/>)}</div></section>}
 {when!=='upcoming'&&past.length>0&&<section className="event-group" aria-labelledby="past-heading"><div className="archive-toolbar"><h2 id="past-heading">From the archive</h2><span className="eyebrow muted">{archiveLabel}</span></div><div className="event-grid">{past.map(event=><EventCard key={event.id} event={event}/>)}</div></section>}
 {!count&&<div className="empty-events"><h2>{when==='upcoming'?'More conversations to come.':'No matching events.'}</h2><p>{when==='upcoming'?'Explore the archive or follow KIDA for updates.':'Try a different search or clear the filters.'}</p><Link className="text-link" to="/events">Browse all events ↗</Link></div>}
 <div className="archive-afterword"><a className="text-link" href="https://kingcenter.stanford.edu/events/student-events" target="_blank" rel="noopener noreferrer">More at the King Center <span aria-hidden="true">↗</span></a></div></section><JoinSection/></>;
}
const branches=[
 ['Research','#00548f','The Research Branch turns curiosity into application. Students collaborate on projects with King Center affiliates, support faculty research, and build KIDA’s interdisciplinary methods toolkit. Members gain hands-on experience with design thinking, data analysis, and policy writing—learning how evidence-based research can drive real change.'],
 ['Events','#d1660f','The Events Branch brings the world of international development to Stanford. Through speaker series, policy lunches, and career spotlights, the team curates conversations that inspire and connect. Members engage directly with faculty, practitioners, and alumni while learning how to host thoughtful, high-impact events that shape KIDA’s community.'],
 ['Communications','#620059','The Communications Branch amplifies our presence across campus and beyond. From managing social media and newsletters to connecting with the King Center’s alumni network, the team shares the stories behind our members and initiatives. Whether through outreach, design, or writing, this branch turns ideas into impact and builds KIDA’s voice in the global development community.'],
 ['Innovation','#8f993e','The Innovation Branch leads KIDA’s most ambitious initiatives, from datathons to policy design challenges. Members work across disciplines to design creative, high-impact projects in collaboration with the King Center, FSI, and other partners. For those who dream big and love building from scratch, this branch is where bold ideas take off.']
];
export function AboutPage() {
 return <><section className="archive-header page-width"><p className="eyebrow muted">King International Development Association</p><h1>About <em className="accent">KIDA.</em></h1></section><section className="about-intro page-width"><h2>A community for<br/>global development.</h2><div><p>KIDA is a student-led community at Stanford for people curious about global development. We connect students with conversations, research, and opportunities across campus.</p><p>We collaborate with the <a className="accent institutional-link" href="https://kingcenter.stanford.edu/" target="_blank" rel="noopener noreferrer">King Center on Global Development</a> and share relevant events from departments and organizations around Stanford.</p></div></section><section className="branches-section page-width"><div className="section-heading"><h2>Our <span className="accent">Workstreams</span></h2></div><div className="branches">{branches.map(([name,color,description],i)=><details key={name} className="branch" style={{'--branch-color':color}}><summary><span className="branch-index">0{i+1}</span><span>{name}</span><span className="branch-mark" aria-hidden="true">+</span></summary><p>{description}</p></details>)}</div></section><JoinSection/></>;
}
export function ContactPage() {
 return <><section className="archive-header page-width"><p className="eyebrow muted">Get involved</p><h1>Say <em className="accent">hello!</em></h1><p>Curious about KIDA? We’d like to hear from you.</p></section><section className="contact-section page-width"><a className="contact-option" href="mailto:stanford.kida@gmail.com"><span className="contact-icon"><Icon name="mail" size={30}/></span><span className="eyebrow muted">Email</span><h2>Let’s connect.</h2><p>Joining KIDA, sharing an opportunity, or exploring a collaboration.</p><span className="text-link">stanford.kida@gmail.com <span aria-hidden="true">↗</span></span></a><a className="contact-option" href="https://www.instagram.com/stanford.kida/" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Icon name="instagram" size={30}/></span><span className="eyebrow muted">Instagram</span><h2>Stay in the loop.</h2><p>Events, announcements, and ways to get involved.</p><span className="text-link">@stanford.kida <span aria-hidden="true">↗</span></span></a></section></>;
}
