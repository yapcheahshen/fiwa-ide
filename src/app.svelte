<script>
import {onMount} from 'svelte'
 import {fiwaTokenTypes} from './fiwatokentype.ts'
// import {underlineKeymap } from './underline.ts'
let timer;
onMount(()=>{
  var editor = CodeMirror.fromTextArea(document.querySelector('#myTextarea'), {
    lineNumbers: true
  });
  console.clear()
  fiwaTokenTypes(editor.doc);	
  editor.on("change",(cm,obj)=>{
  	clearTimeout(timer)
  	timer=setTimeout(()=>{
  		fiwaTokenTypes(cm.doc);		
  	},250)
  })
})
$: a="xxx"

</script>
hexxxxllo xx

<textarea id="myTextarea">
我們圭₁10相加0x50某個相加動作相減動作
</textarea>
