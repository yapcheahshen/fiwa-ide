<script>
import {onMount} from 'svelte'
import {fiwaTokenTypes} from './fiwatokentype.ts'
import {compileLine} from './compile.ts';
import {translitLine} from './translit.ts';

import {StockWasm,Transliterator} from 'fiwa';
let timer,editor;
let checked=true;
$: lang=checked?'zh':'concise';
const stockwasm=[StockWasm.fibonacci,StockWasm.sum_array];
const setSourceText=()=>{
  const transliterator=new Transliterator();
  const out=stockwasm.map(wasm=>transliterator.toText( wasm, lang));
  editor.setValue(out.join('\n'));
  fiwaTokenTypes(editor.doc,lang);
}
onMount(()=>{
  editor = new CodeMirror(document.querySelector('.code'), {
  	lineNumbers: true, lineWrapping:true, theme:'ambiance'
  });
  console.clear()
  setSourceText(checked);	
  editor.on("change",(cm,obj)=>{
  	clearTimeout(timer);
  	timer=setTimeout(()=>{
  		fiwaTokenTypes(cm.doc,lang);
  	},250);
  })
  // editor.on("cursorActivity",(cm)=>{
  // 	const r=translitLine(  cm.getLine(cm.getCursor().line) ) ;
  // 	document.querySelector('#disassembly').innerHTML=r.rawtext;
  // })
})

$: editor&&setSourceText(checked);


</script>
<label><input type="checkbox" bind:checked>中</label>
<div class="code"></div>
<div id="disassembly">Compile</div>

<style>

</style>