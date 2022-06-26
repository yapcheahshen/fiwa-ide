import {Fiwa,TypeChecker,TokenType,tokenTypeName} from 'fiwa';
const depthSegment=tokens=>{
  const depths=tokens.map(it=>it[4]);
  const starts=tokens.map(it=>it[1]);
  const segments=[];
  let d=0, start=-1;
  for (let i=0;i<depths.length;i++) {
    if (depths[i]!=d) {
      if (start>0 && d>0) segments.push([d, starts[start], starts[i] ]);
      start=i;
    }
    d=depths[i];
  }
  return segments;
  console.log(depths,segments)
}

export const fiwaTokenTypes=(doc,lang)=>{
  const typeChecker=new TypeChecker();

  doc.cm.startOperation();
  doc.getAllMarks().forEach(it=>it.clear());
  const {from,to}=doc.cm.getViewport();
  let extra=0,j;
  for (let i=from;i<to;i++){
  	  const r=typeChecker.run(doc.getLine(i),lang);
      const segments=depthSegment(r);
      for (j=0;j<segments.length;j++) {
        const [depth,s,e]=segments[j];
        doc.markText({line:i,ch:s},{line:i,ch:e},{className:'depth_'+depth});
      }

  	  for (j=0;j<r.length;j++) {
  	 	  const [tk,s,e,tt,depth,stackeffect]=r[j];
  	 	  const typename=tokenTypeName(tt);
      
  	 	  if (typename=='symbol') extra++ ;else extra=0;
 		    tk.trim()&&typename&&doc.markText({line:i,ch:s},{line:i,ch:e},
 		     {className:'tt_'+typename+(extra?(extra%2):'')})  	 		
  	 }
  }

  doc.cm.endOperation();
}