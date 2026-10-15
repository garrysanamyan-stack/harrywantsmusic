const tracks=[["Трек 1","HarryWantsMusic"],["Трек 2","HarryWantsMusic"],["Трек 3","HarryWantsMusic"],["Трек 4","HarryWantsMusic"],["Трек 5","HarryWantsMusic"],["Трек 6","HarryWantsMusic"],["Arash - Boro Boro Harry Remix","HarryWantsMusic"],["SAYAN - Мальборо (Harry Remix)","HarryWantsMusic"]]
.map((t,i)=>({title:t[0],artist:t[1],src:`tracks/track-${i+1}.mp3`,cover:`covers/cover-${i+1}.jpg`}));
const $=id=>document.getElementById(id),a=$("audio"),pl=$("playlist");let cur=0;
const fmt=s=>isNaN(s)?"0:00":Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");
tracks.forEach((t,i)=>{const li=document.createElement("li");li.innerHTML=`<span style="color:inherit;display:flex;align-items:center;gap:10px"><img src="${t.cover}" alt="" style="width:40px;height:40px;border-radius:6px;object-fit:cover">${i+1}. ${t.title} — ${t.artist}</span><span>▶</span>`;li.onclick=()=>{load(i);a.play()};pl.appendChild(li)});
function load(i){cur=(i+tracks.length)%tracks.length;const t=tracks[cur];a.src=t.src;$("title").textContent=t.title;$("artist").textContent=t.artist;const c=$("cover");c.textContent="";c.style.background=`url(${t.cover}) center/cover`;[...pl.children].forEach((l,j)=>l.classList.toggle("active",j===cur))}
load(0);
$("play").onclick=()=>a.paused?a.play():a.pause();$("next").onclick=()=>{load(cur+1);a.play()};$("prev").onclick=()=>{load(cur-1);a.play()};
a.onplay=()=>$("play").textContent="⏸";a.onpause=()=>$("play").textContent="▶";a.onended=()=>$("next").click();
a.ontimeupdate=()=>{$("seek").value=a.duration?a.currentTime/a.duration*100:0;$("cur").textContent=fmt(a.currentTime);$("dur").textContent=fmt(a.duration)};
$("seek").oninput=e=>{if(a.duration)a.currentTime=e.target.value/100*a.duration};$("vol").oninput=e=>a.volume=e.target.value;a.volume=.8;
$("form").onsubmit=e=>{e.preventDefault();$("ok").textContent="Спасибо, "+e.target.name.value+"! Вы подписаны 🎶";e.target.reset()};
fetch("https://abacus.jasoncameron.dev/hit/harrywantsmusic-garrysanamyan/views").then(r=>r.json()).then(d=>{if(d&&d.value!=null)$("views").textContent=" · 👁 "+d.value+" просмотров"}).catch(()=>{});
