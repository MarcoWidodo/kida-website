import {useEffect,useState} from 'react';
import media from '../lib/event-media.json';
import organizations from '../lib/organization-media.json';
export function resolveEventMedia(event){
 const asset=media[event.id];
 if(event.poster&&![asset?.path,asset?.sourceImageUrl,asset?.pageImageUrl].includes(event.poster))return {path:event.poster,kind:'poster',alt:'Event invitation: '+event.title,credit:'Event organizer'};
 return asset||{path:event.poster,kind:'poster',alt:'Event invitation: '+event.title,credit:'Event organizer'};
}
export default function EventImage({event}){
 const asset=resolveEventMedia(event);const picture=asset.kind==='logo'?null:asset.path;
 const organization=organizations[event.organization]||organizations.Stanford;
 const logo=organization?.path||organization?.localPath;
 const [failed,setFailed]=useState(false);useEffect(()=>setFailed(false),[picture]);
 if(picture&&!failed)return <img src={picture} alt={asset.alt||'Event image: '+event.title} style={asset.dimensions?.[0]<300?{maxWidth:asset.dimensions[0],height:'auto'}:undefined} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>;
 return <span className="organization-artwork">{logo?<img src={logo} alt={event.organization+' logo'} loading="lazy"/>:<span className="organization-wordmark">{event.organization}</span>}</span>;
}
