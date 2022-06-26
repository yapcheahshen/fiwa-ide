import {Compiler} from 'fiwa';
export const compileLine=(str)=>{
  	const compiler=new Compiler();
  	const r=compiler.run(str);
  	return {rawtext:r};
}
