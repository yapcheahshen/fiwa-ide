import {Transliterator} from 'fiwa';
export const translitLine=(str)=>{
  	const transliterator=new Transliterator();
  	const r=transliterator.fromText(str,'zh');
  	const concise=transliterator.toText(r,'concise');
  	return {rawtext:concise};
}
