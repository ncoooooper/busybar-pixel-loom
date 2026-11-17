import { panel, read, persist, surface, wrap, type Frame, type Key } from "@shared/surface";

type Weave = { draft:number; palette:number; phase:number };
const palettes = [
  ["Ember", "#170D22", "#FF6C49", "#FFD698"],
  ["Estuary", "#082733", "#299CA6", "#AFF2C9"],
  ["Iris", "#241939", "#9D74DF", "#FFE4A3"],
  ["Porcelain", "#09245A", "#4794E5", "#FAF5E0"],
];
const drafts = ["Diamonds","Herringbone","Basket","Steps","Honeycomb","Ripple"];
const initial:Weave={draft:0,palette:0,phase:0};
let work=read("work",initial);
let gallery=read<Weave[]>("gallery",[]);
let viewing=false, slot=0, notice="";
function thread(x:number,y:number,w:Weave){
  const col=x+w.phase;
  const u=col%12,v=y%12;
  const dx=Math.abs(u-6),dy=Math.abs(v-6);
  switch(w.draft){
    case 0:return (dx+dy)%6;
    case 1:return (col+(Math.floor(col/8)%2?y:16-y))%8;
    case 2:return (Math.floor(col/3)+Math.floor(y/3))%2?col%6:y%6;
    case 3:return (col+2*Math.floor(y/2))%9;
    case 4:return (dx+Math.abs(y%8-4)*2)%8;
    default:return (Math.floor(Math.sin(col/5)*3)+y+9)%7;
  }
}
function draw():Frame{
  const w=viewing?gallery[slot]:work;
  const p=palettes[w.palette];
  const rows=["! XPM2","72 16 3 1",". c "+p[1],"+ c "+p[2],"* c "+p[3]];
  for(let y=0;y<16;y++){
    let row="";
    for(let x=0;x<72;x++){const t=thread(x,y,w);row+=t===0?"*":t<3?"+":".";}
    rows.push(row);
  }
  return [{id:"fabric",type:"xpmbitmap",x:0,y:0,data:rows.join("\n")},...panel("PIXEL LOOM",[
    (viewing?"Gallery "+(slot+1)+"/"+gallery.length:"On the loom")+"  "+p[0],
    drafts[w.draft]+" / shift "+w.phase,notice||(viewing?"Wheel: browse gallery":"Wheel: change draft"),
    viewing?"OK: edit this weave":"OK: palette   Start: shift",
    viewing?"Hold OK: leave gallery":"Hold Start: save weave",viewing?"":"Hold OK: open gallery"
  ])];
}
function input(key:Key){
  notice="";
  if(key==="hold-ok"){
    if(gallery.length){viewing=!viewing;if(viewing)slot=gallery.length-1;}
    else notice="Gallery is empty";
  }else if(viewing){
    if(key==="up"||key==="down")slot=wrap(slot+(key==="up"?1:-1),gallery.length);
    if(key==="ok"){work={...gallery[slot]};viewing=false;persist("work",work);}
  }else if(key==="hold-start"){
    gallery=gallery.concat([{...work}]).slice(-8);persist("gallery",gallery);notice="Saved to slot "+gallery.length;
  }else{
    if(key==="up"||key==="down")work.draft=wrap(work.draft+(key==="up"?1:-1),drafts.length);
    if(key==="ok")work.palette=wrap(work.palette+1,palettes.length);
    if(key==="start")work.phase=wrap(work.phase+1,12);
    persist("work",work);
  }
  console.log("loom",work.draft,work.palette,work.phase,"saved",gallery.length,"gallery",viewing);
}
surface(draw,input);
