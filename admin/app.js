import {kv} from '@vercel/kv';
const grid=document.getElementById('grid');
const bots=await (await fetch('/api/bots')).json();
for(const b of bots){
  const card=document.createElement('div'); card.className='card';
  card.innerHTML=`
    <img src="/api/cam/${b.id}" alt="live">
    <h3>${b.id}</h3>
    <p>Battery ${b.battery}%</p>
    <p>Loc ${b.lat},${b.lon}</p>
    <button class="lock">Lock</button>
    <button class="wipe">Wipe</button>
  `;
  card.querySelector('.lock').onclick=()=>fetch('/api/cmd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:b.id,cmd:'lock'})});
  card.querySelector('.wipe').onclick=()=>fetch('/api/cmd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:b.id,cmd:'wipe'})});
  grid.appendChild(card);
}
document.getElementById('mint').onclick=async()=>{
  const {url}=await(await fetch('/api/mint')).json();
  navigator.clipboard.writeText(url);
  alert('Invite link copied to clipboard');
};
