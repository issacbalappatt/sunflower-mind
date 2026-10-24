import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
const require=createRequire(process.env.SUNFLOWER_NODE_MODULES ? path.join(process.env.SUNFLOWER_NODE_MODULES,'package.json') : import.meta.url);
const sharp=require('sharp');
const root=process.cwd();
const out=path.resolve(root,'../logo-motion/output');await fs.mkdir(out,{recursive:true});
const logo='data:image/png;base64,'+(await sharp('dist/assets/sunflower-mind-logo.webp').png().toBuffer()).toString('base64');
const ffmpeg=process.argv[2];if(!ffmpeg)throw new Error('Provide the FFmpeg executable as the first argument.');
const clamp=x=>Math.min(1,Math.max(0,x));const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};const ease=x=>1-Math.pow(1-clamp(x),3);
const W=1080,FPS=30,SECONDS=9;
function frame(t){
 const end=1-smooth((t-8.1)/.85),symbol=ease((t-.35)/2.1),words=ease((t-1.5)/2),all=smooth(t/.5)*end;
 const scale=.97+.03*ease((t-.3)/2.7),rise=16*(1-ease((t-.3)/2.7));
 const pulse=.5+.5*Math.sin(t*1.2),glow=(smooth((t-2.1)/1.2)-smooth((t-5.8)/1.8))*.2;
 const angle=(t*.13),sx=540+405*Math.cos(angle-2.4),sy=440+405*Math.sin(angle-2.4);
 const line=clamp((t-.4)/3.2)*2545;
 const spark=(x,y,size,op)=>`<g transform="translate(${x} ${y})" opacity="${op*all}"><path d="M0 ${-size} Q${size*.2} ${-size*.2} ${size} 0 Q${size*.2} ${size*.2} 0 ${size} Q${-size*.2} ${size*.2} ${-size} 0 Q${-size*.2} ${-size*.2} 0 ${-size}" fill="#c59c4a"/></g>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" height="1080" viewBox="0 0 1080 1080"><defs><radialGradient id="paper"><stop stop-color="#fff"/><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#faf9f3"/></radialGradient><radialGradient id="warm"><stop stop-color="#ffe0a0" stop-opacity=".8"/><stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/></radialGradient><clipPath id="symbol"><rect width="1045" height="704"/></clipPath><clipPath id="words"><rect y="704" width="1045" height="421"/></clipPath><clipPath id="reveal"><rect x="0" y="0" width="${1045*words}" height="1125"/></clipPath><mask id="dawn"><rect width="1045" height="1125" fill="black"/><circle cx="535" cy="310" r="${950*symbol}" fill="white"/></mask></defs><rect width="1080" height="1080" fill="url(#paper)"/><g opacity="${all}"><circle cx="540" cy="440" r="405" fill="none" stroke="#d8cda9" stroke-width="1.1" stroke-dasharray="${line} 2545" transform="rotate(-100 540 440)" opacity=".55"/><circle cx="540" cy="440" r="422" fill="none" stroke="#dbe1d1" stroke-width=".8" opacity=".42"/><circle cx="${sx}" cy="${sy}" r="3" fill="#c7a158"/><g style="mix-blend-mode:multiply" transform="translate(230 ${95+rise}) translate(310 350) scale(${scale}) translate(-310 -350) scale(.5933)"><g clip-path="url(#symbol)" mask="url(#dawn)" opacity="${symbol}"><image xlink:href="${logo}" width="1045" height="1125"/></g><g clip-path="url(#words)"><g clip-path="url(#reveal)" opacity="${words}"><image xlink:href="${logo}" width="1045" height="1125"/></g></g></g><circle cx="645" cy="300" r="160" fill="url(#warm)" opacity="${glow}"/>${spark(830,223,8,.4+.4*Math.sin(t*1.9)**2)}${spark(870,269,5,.2+.5*Math.cos(t*1.4)**2)}${spark(227,420,5,.2+.4*Math.sin(t*1.6)**2)}<path d="M${540-135*words} 827 H${540+135*words}" stroke="#bba16b" stroke-width="1" opacity="${smooth((t-2.6)/1.2)*.65}"/><text x="540" y="885" fill="#5d6c53" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-style="italic" opacity="${smooth((t-3)/1)*end}">A little light. A little room to grow.</text><text x="540" y="928" fill="#73806a" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="4" opacity="${smooth((t-3.4)/1)*end}">PSYCHOLOGY &amp; WELLBEING</text></g></svg>`;
}
if(process.argv.includes('--preview')){await sharp(Buffer.from(frame(5))).png().toFile(path.join(out,'blend-preview.png'));process.exit(0);}
const filename=path.join(out,'sunflower-mind-logo-motion.mp4');
const encoder=spawn(ffmpeg,['-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',`${W}x${W}`,'-r',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',filename],{stdio:['pipe','ignore','pipe'],windowsHide:true});
let error='';encoder.stderr.on('data',b=>{error+=b});
for(let i=0;i<FPS*SECONDS;i++){
 const svg=Buffer.from(frame(i/FPS));const image=sharp(svg).flatten({background:'#ffffff'}).removeAlpha();
 if([15,45,90,150,225].includes(i))await sharp(svg).png().toFile(path.join(out,`frame-${i}.png`));
 const pixels=await image.raw().toBuffer();if(!encoder.stdin.write(pixels))await once(encoder.stdin,'drain');
 if(i%60===0)process.stdout.write(`Rendered ${i}/${FPS*SECONDS} frames\n`);
}
encoder.stdin.end();const [code]=await once(encoder,'exit');if(code!==0)throw new Error(error||'Encoding failed');
await fs.writeFile(path.join(out,'render-info.json'),JSON.stringify({width:W,height:W,fps:FPS,frames:FPS*SECONDS,duration:SECONDS,audio:false,source:'Original supplied Sunflower Mind logo, composited using SVG masks. No source pixels or lettering redrawn.'},null,2));
console.log(filename);


