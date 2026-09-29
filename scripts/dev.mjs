import http from 'node:http';
import './build.mjs';
const {default:worker}=await import('../dist/server/index.js');
const port=Number(process.env.PORT||3000);
http.createServer(async(req,res)=>{
 try{
  const init={method:req.method,headers:req.headers};
  if(!['GET','HEAD'].includes(req.method)){init.body=req;init.duplex='half'}
  const response=await worker.fetch(new Request(new URL(req.url,`http://localhost:${port}`),init),process.env);
  res.writeHead(response.status,Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500,{'content-type':'text/plain'});res.end('Local server error.');}
}).listen(port,'127.0.0.1',()=>console.log(`Algorithm Lab: http://localhost:${port}`));
