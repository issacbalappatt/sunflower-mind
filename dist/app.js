const $ = (s) => document.querySelector(s);
const petals = $('#petals');
for (let i=0;i<24;i++) { const p=document.createElementNS('http://www.w3.org/2000/svg','ellipse'); p.setAttribute('cx','0');p.setAttribute('cy','-98');p.setAttribute('rx',i%2?17:20);p.setAttribute('ry',i%2?64:70);p.setAttribute('fill','url(#petal)');p.setAttribute('transform',`rotate(${i*15})`);p.setAttribute('opacity',i%2?'.86':'1');petals.append(p); }
for(let i=0;i<95;i++){const a=i*2.39996,r=4.7*Math.sqrt(i),p=document.createElementNS('http://www.w3.org/2000/svg','circle');p.setAttribute('cx',Math.cos(a)*r);p.setAttribute('cy',Math.sin(a)*r);p.setAttribute('r','1.7');p.setAttribute('fill',i%3?'#ad955f':'#d4b777');$('#seeds').append(p);}
const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
const booking=$('#booking');
function validBookingUrl(){try{const u=new URL(window.SUNFLOWER_CONFIG.bookingUrl);return u.protocol==='https:'?u.href:null}catch{return null}}
function openBooking(){
  if(window.openSunflowerBooking){window.openSunflowerBooking();return;}
  document.getElementById('appointments').scrollIntoView({behavior:'smooth'});
}
document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',openBooking));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
const policies={privacy:['Your privacy','This informational website does not offer account registration, collect intake information, or process payments. It does not use analytics or advertising cookies. The hosting provider may process technical request data to deliver and protect the site. Website fonts are served locally. An external booking calendar is loaded only when you choose to open it; its provider receives technical request information and applies its own privacy terms. External booking services, once connected, have their own privacy terms. Practice contact details and a full practice privacy notice will be provided before online booking opens. Please do not share sensitive clinical information through public channels.'],terms:['Before you book','Online booking and payment are not active. Session fees, duration, location or online format, cancellation and refund policies, practitioner credentials and informed consent must be confirmed and published by the practice before appointments can be accepted. No appointment is reserved by opening this portal. This website is not an emergency service.']};
document.querySelectorAll('[data-policy]').forEach(b=>b.addEventListener('click',()=>{const [title,body]=policies[b.dataset.policy],h=document.createElement('h2'),p=document.createElement('p');h.textContent=title;p.textContent=body;$('#policy-content').replaceChildren(h,p);$('#policy').showModal()}));

$('#year').textContent=new Date().getFullYear();
