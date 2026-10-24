/* Motion 14.6.0 (MIT), locally bundled. All ongoing motion shares pause controls. */
(function(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)'),controls=[],hero=document.querySelector('.hero-art');let paused=false,breathing=false,timer=null;
 const animate=(...args)=>{if(!window.Motion||reduced.matches||paused)return null;const control=Motion.animate(...args);controls.push(control);control.then?.(()=>{const i=controls.indexOf(control);if(i>=0)controls.splice(i,1);});return control;};
 if(!reduced.matches&&window.Motion){
   animate('.hero-line',{opacity:[0,1],transform:['translateY(30px)','translateY(0px)']},{duration:1.2,delay:Motion.stagger(.14,{startDelay:.12}),ease:[.22,1,.36,1]});
   animate('.hero-copy .intro, .hero-copy .actions, .hero-note',{opacity:[0,1],y:[15,0]},{duration:.9,delay:Motion.stagger(.12,{startDelay:.55})});
   animate('.hero-art',{opacity:[0,1],clipPath:['inset(8% 0 0 0 round 220px 220px 12px 12px)','inset(0% 0 0 0 round 220px 220px 12px 12px)']},{duration:1.5,ease:[.22,1,.36,1]});
   const petals=document.querySelectorAll('#petals ellipse');petals.forEach((p,i)=>{animate(p,{opacity:[0,Number(p.getAttribute('opacity'))]},{duration:1.1,delay:.5+i*.035})});
 }
 const motes=document.querySelector('.light-motes');for(let i=0;i<12;i++){const s=document.createElement('span');s.style.cssText=`left:${12+(i*23)%78}%;top:${15+(i*17)%68}%;--duration:${7+i%5}s;--delay:-${i*1.7}s;--size:${i%3+2}px;`;motes.append(s);}
 let raf=null;function progress(){raf=null;const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;document.querySelector('header').classList.toggle('scrolled',scrollY>15);}
 addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(progress)},{passive:true});progress();
 hero.addEventListener('pointermove',e=>{if(!fine.matches||reduced.matches||paused)return;const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hero.style.setProperty('--pointer-x',x*12+'px');hero.style.setProperty('--pointer-y',y*8+'px');});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--pointer-x','0px');hero.style.setProperty('--pointer-y','0px')});
 function setPaused(value){paused=value;document.body.classList.toggle('motion-paused',value);controls.forEach(c=>{try{value?c.pause():c.play()}catch{}});document.getElementById('motion-toggle').textContent=value?'Resume animations ▷':'Pause animations Ⅱ';document.getElementById('motion-toggle').setAttribute('aria-pressed',String(value));const art=document.getElementById('art-motion');art.textContent=value?'▷':'Ⅱ';art.setAttribute('aria-label',value?'Resume all animations':'Pause all animations');art.setAttribute('aria-pressed',String(value));if(value)stopBreathing();}
 document.getElementById('motion-toggle').onclick=()=>setPaused(!paused);document.getElementById('art-motion').onclick=()=>setPaused(!paused);
 const orb=document.querySelector('.breathing-orb'),label=document.getElementById('breathing-label'),button=document.getElementById('breathing-start');
 function stopBreathing(){breathing=false;clearInterval(timer);timer=null;orb.classList.remove('guided');label.textContent='Just be.';button.setAttribute('aria-pressed','false');button.textContent='Try a quiet moment ↗';document.getElementById('breathing-caption').textContent='Follow the circle at a pace that feels comfortable.';}
 button.onclick=()=>{if(breathing){stopBreathing();return;}if(paused)setPaused(false);breathing=true;button.setAttribute('aria-pressed','true');button.textContent='Finish quiet moment';document.getElementById('breathing-caption').textContent='Breathe comfortably. You can stop whenever you like.';orb.classList.add('guided');label.textContent='Breathe in';let phase=true;timer=setInterval(()=>{phase=!phase;label.textContent=phase?'Breathe in':'Breathe out';},5000);};
 reduced.addEventListener('change',()=>{if(reduced.matches)setPaused(true);});document.addEventListener('visibilitychange',()=>{if(document.hidden&&breathing)stopBreathing();});
})();

