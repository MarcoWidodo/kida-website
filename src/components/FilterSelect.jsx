import {useEffect,useId,useRef,useState} from 'react';
import Icon from './Icons';
export default function FilterSelect({label,value,onChange,options,placeholder='All'}) {
 const id=useId(); const root=useRef(); const trigger=useRef(); const items=useRef([]); const typed=useRef({text:'',time:0});
 const [open,setOpen]=useState(false); const [active,setActive]=useState(0);
 const choices=[{value:'',label:placeholder},...options.map(option=>typeof option==='string'?{value:option,label:option}:option)];
 const selected=Math.max(0,choices.findIndex(option=>option.value===value));
 useEffect(()=>{
  if(!open)return;
  items.current[active]?.focus({preventScroll:true});
 },[open,active]);
 useEffect(()=>{
  if(!open)return;
  const dismiss=e=>{if(!root.current?.contains(e.target))setOpen(false);};
  document.addEventListener('pointerdown',dismiss);document.addEventListener('focusin',dismiss);
  return()=>{document.removeEventListener('pointerdown',dismiss);document.removeEventListener('focusin',dismiss);};
 },[open]);
 function show(index=selected){setActive(index);setOpen(true);}
 function close(){setOpen(false);trigger.current?.focus({preventScroll:true});}
 function choose(option){onChange(option.value);close();}
 function keyboard(e){
  if(['ArrowDown','ArrowUp','Home','End','Escape','Tab'].includes(e.key)){
   if(e.key==='Tab'){setOpen(false);trigger.current?.focus({preventScroll:true});return;}
   e.preventDefault();
   if(e.key==='Escape'){close();return;}
   setActive(current=>e.key==='Home'?0:e.key==='End'?choices.length-1:(current+(e.key==='ArrowDown'?1:-1)+choices.length)%choices.length);
  }else if(e.key.length===1&&!e.metaKey&&!e.ctrlKey&&!e.altKey){
   const now=Date.now();typed.current={text:(now-typed.current.time<700?typed.current.text:'')+e.key.toLowerCase(),time:now};
   const start=active+1;const ordered=[...choices.slice(start),...choices.slice(0,start)];const found=ordered.find(option=>option.label.toLowerCase().startsWith(typed.current.text));
   if(found)setActive(choices.indexOf(found));
  }
 }
 return <div className={'filter-select'+(open?' is-open':'')} ref={root}><span id={id+'-label'} className="sr-only">{label}</span><button className="filter-trigger" ref={trigger} type="button" aria-labelledby={id+'-label '+id+'-value'} aria-haspopup="listbox" aria-controls={id+'-list'} aria-expanded={open} onClick={()=>open?close():show()} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();show(selected);}if(e.key==='Escape')close();}}><span id={id+'-value'}>{choices[selected].label}</span><Icon name="chevron" size={16}/></button>{open&&<div className="filter-popover"><div className="filter-caption">{label}</div><div id={id+'-list'} className="filter-options" role="listbox" aria-label={label} onKeyDown={keyboard}>{choices.map((option,i)=><button type="button" role="option" aria-selected={value===option.value} key={option.value} tabIndex={i===active?0:-1} ref={node=>items.current[i]=node} onClick={()=>choose(option)} onPointerMove={()=>setActive(i)}><span>{option.label}</span><span aria-hidden="true">{value===option.value?'✓':''}</span></button>)}</div></div>}</div>;
}
