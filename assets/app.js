
const COINS=[
["BTC","Bitcoin","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/btc.png"],
["ETH","Ethereum","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/eth.png"],
["SOL","Solana","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/sol.png"],
["BNB","BNB","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/bnb.png"],
["XRP","XRP","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/xrp.png"],
["ADA","Cardano","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/ada.png"],
["DOGE","Dogecoin","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/doge.png"],
["AVAX","Avalanche","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/avax.png"],
["LINK","Chainlink","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/link.png"],
["DOT","Polkadot","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/dot.png"],
["TRX","TRON","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/trx.png"],
["LTC","Litecoin","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/ltc.png"],
["ATOM","Cosmos","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/atom.png"],
["UNI","Uniswap","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/uni.png"],
["NEAR","NEAR","https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/near.png"]
];
const FALLBACK={BTC:64821,ETH:3388,SOL:152.8,BNB:586,XRP:.612,ADA:.452,DOGE:.133,AVAX:36.18,LINK:14.72,DOT:6.28,TRX:.118,LTC:74.92,ATOM:7.44,UNI:9.17,NEAR:5.08};
function fmt(n){n=Number(n);return n<1?"$"+n.toFixed(4):"$"+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
async function getMarkets(){try{let r=await fetch("/api/markets");if(!r.ok)throw 0;return await r.json()}catch(e){return COINS.map((c,i)=>({symbol:c[0],price:FALLBACK[c[0]],change:(i%3===0?2.1:i%3===1?.8:-1.2),volume:"Demo"}))}}
function logo(sym){let c=COINS.find(x=>x[0]===sym);return c?c[2]:""}
function coinName(sym){let c=COINS.find(x=>x[0]===sym);return c?c[1]:sym}
async function renderMarkets(){
 let box=document.getElementById("marketRows"),ticker=document.getElementById("ticker"); if(!box&&!ticker)return;
 let data=await getMarkets(); window.marketData=data;
 const draw=(arr)=>{if(box)box.innerHTML=arr.map(x=>`<div class="tr"><span class="coin"><img class="coin-logo" src="${logo(x.symbol)}" onerror="this.style.display='none'"><b>${coinName(x.symbol)} <i class="symbol">${x.symbol}</i></b></span><span>${fmt(x.price)}</span><span class="${x.change>=0?'up':'down'}">${x.change>=0?'+':''}${Number(x.change).toFixed(2)}%</span><span>${x.volume||'—'}</span><canvas class="spark" data-symbol="${x.symbol}" width="85" height="28"></canvas><a class="trade" href="trade.html?symbol=${x.symbol}USDT">Trade</a></div>`).join("");drawSparks()};
 draw(data);
 if(ticker)ticker.innerHTML=data.slice(0,9).map(x=>`<span><b>${x.symbol}</b> ${fmt(x.price)} <i class="${x.change>=0?'up':'down'}">${x.change>=0?'+':''}${Number(x.change).toFixed(2)}%</i></span>`).join("");
 let s=document.getElementById("coinSearch");if(s)s.oninput=e=>draw(data.filter(x=>(x.symbol+coinName(x.symbol)).toLowerCase().includes(e.target.value.toLowerCase())));
}
function drawSparks(){document.querySelectorAll(".spark").forEach((cv,j)=>{let c=cv.getContext("2d"),v=15,pts=[];for(let i=0;i<24;i++){v+=(Math.sin((i+j)/3)*.7)+(Math.random()-.5);pts.push(v)};let mn=Math.min(...pts),mx=Math.max(...pts);c.clearRect(0,0,85,28);c.strokeStyle=pts.at(-1)>=pts[0]?"#31e6a1":"#ff6072";c.lineWidth=1.6;c.beginPath();pts.forEach((p,i)=>{let x=i*85/23,y=25-(p-mn)/(mx-mn||1)*21;i?c.lineTo(x,y):c.moveTo(x,y)});c.stroke()})}
renderMarkets();
