import {readdir,readFile,mkdir,writeFile,rm} from 'node:fs/promises';
const files={};
for(const name of await readdir('public')){
 if(!/\.(html|js|css|svg)$/.test(name))continue;
 files['/'+name]={body:await readFile('public/'+name,'utf8'),type:name.endsWith('.html')?'text/html; charset=utf-8':name.endsWith('.css')?'text/css; charset=utf-8':name.endsWith('.svg')?'image/svg+xml':'text/javascript; charset=utf-8'};
}
const source='const PUBLIC_FILES = '+JSON.stringify(files)+';\n'+await readFile('worker/index.js','utf8');
await rm('dist',{recursive:true,force:true});
await mkdir('dist/server',{recursive:true});
await writeFile('dist/server/index.js',source);

const worker=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
if(typeof worker.default?.fetch!=='function')throw Error('Worker must export fetch');
console.log('Built self-contained Worker with '+Object.keys(files).length+' public assets.');
