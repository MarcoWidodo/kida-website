import {useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
const orbits=[{rx:318,ry:318,rotation:0,color:'#8c1515',duration:42,phase:0},{rx:318,ry:128,rotation:0,color:'#d1660f',duration:45,phase:1.8},{rx:318,ry:128,rotation:60,color:'#00548f',duration:48,phase:3.9},{rx:318,ry:128,rotation:-60,color:'#620059',duration:52,phase:5},{rx:220,ry:220,rotation:0,color:'#8f993e',duration:46,phase:2.6}];
function point(orbit,angle){const x=Math.cos(angle)*orbit.rx,y=Math.sin(angle)*orbit.ry,r=orbit.rotation*Math.PI/180;return [400+x*Math.cos(r)-y*Math.sin(r),400+x*Math.sin(r)+y*Math.cos(r)];}
export default function OrbitField(){
 const hero=useRef(),svg=useRef();
 useEffect(()=>{
  let frame,last=0,elapsed=0,visible=true;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const reduced=()=>media.matches||new URLSearchParams(window.location.search).get('motion')==='reduce';
  const dots=[...svg.current.querySelectorAll('[data-orbit-dot]')],trails=[...svg.current.querySelectorAll('[data-orbit-trail]')],gradients=[...svg.current.querySelectorAll('linearGradient')];
  function draw(){orbits.forEach((orbit,i)=>{const angle=orbit.phase+elapsed*Math.PI*2/orbit.duration;const end=point(orbit,angle),start=point(orbit,angle-.48);const points=Array.from({length:20},(_,j)=>point(orbit,angle-.48+.48*j/19));trails[i].setAttribute('d',points.map((p,j)=>(j?'L':'M')+p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' '));dots[i].setAttribute('cx',end[0]);dots[i].setAttribute('cy',end[1]);gradients[i].setAttribute('x1',start[0]);gradients[i].setAttribute('y1',start[1]);gradients[i].setAttribute('x2',end[0]);gradients[i].setAttribute('y2',end[1]);});}
  function tick(now){elapsed+=last?Math.min((now-last)/1000,.1):0;last=now;draw();frame=requestAnimationFrame(tick);}
  function update(){cancelAnimationFrame(frame);last=0;if(visible&&!document.hidden&&!reduced())frame=requestAnimationFrame(tick);else draw();}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();});observer.observe(hero.current);
  draw();update();media.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
 },[]);
 return <section className="hero-scene" ref={hero} aria-labelledby="hero-heading"><div className="ambient-art" aria-hidden="true"><svg ref={svg} viewBox="0 0 800 800" fill="none"><defs>{orbits.map((orbit,i)=><linearGradient key={i} id={'orbit-color-'+i} gradientUnits="userSpaceOnUse"><stop stopColor={orbit.color} stopOpacity="0"/><stop offset="1" stopColor={orbit.color} stopOpacity=".8"/></linearGradient>)}</defs>{orbits.map((orbit,i)=><g key={i}><ellipse className={'orbit-line'+(i===4?' orbit-inner':'')} cx="400" cy="400" rx={orbit.rx} ry={orbit.ry} transform={'rotate('+orbit.rotation+' 400 400)'}/><path data-orbit-trail="" className="orbit-color-trail" stroke={'url(#orbit-color-'+i+')'}/><circle data-orbit-dot="" r={i===0?4:3.5} fill={orbit.color}/></g>)}</svg></div><div className="hero-inner page-width"><p className="eyebrow hero-kicker">A student community at Stanford</p><h1 className="hero-heading" id="hero-heading"><span>Find your path</span><span>to <span className="accent">global development</span></span><span className="accent">at Stanford.</span></h1><div className="hero-bottom"><div className="hero-actions"><Link className="tactile-button" to="/events">Explore events <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/contact">Get involved <span aria-hidden="true">↗</span></Link></div></div></div></section>;
}
