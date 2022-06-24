import {Fiwa,TypeChecker,TokenType,tokenTypeName} from 'fiwa';
export const fiwaTokenTypes=(doc)=>{
  const typeChecker=new TypeChecker();

  doc.cm.startOperation();
  doc.getAllMarks().forEach(it=>it.clear());
  const {from,to}=doc.cm.getViewport();
  let extra=0;
  for (let i=from;i<to;i++){
  	 const r=typeChecker.run(doc.getLine(i));
  	 for (let j=0;j<r.length;j++) {
  	 	const [tk,s,e,tt]=r[j];
  	 	const typename=tokenTypeName(tt);
  	 	if (typename=='function') {
  	 		extra++
  	 	} else extra=0;

	 	typename&&doc.markText({line:i,ch:s},{line:i,ch:e},
	 		{className:'tt_'+typename+(extra?(extra%2):'')})
  	 }
  	 
  }
  doc.cm.endOperation();
}