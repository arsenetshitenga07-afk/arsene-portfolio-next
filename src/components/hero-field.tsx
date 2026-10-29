"use client";
import { useEffect, useRef } from "react";
const vertexSource = ["#version 300 es","in vec2 position; out vec2 vUv;","void main(){ vUv=position*.5+.5; gl_Position=vec4(position,0.,1.); }"].join("\n");
const fragmentSource = [
"#version 300 es",
"precision highp float; in vec2 vUv; uniform float uTime; uniform vec2 uResolution; uniform vec3 uAccent; uniform vec3 uCoral; out vec4 outColor;",
"float blob(vec2 p, vec2 c, float r){ return 1.0-smoothstep(0.0,r,length(p-c)); }",
"void main(){ vec2 p=(vUv-.5)*vec2(uResolution.x/uResolution.y,1.0); float t=uTime*.17;",
"float a=blob(p,vec2(sin(t)*.18-.14,cos(t*.8)*.14),.75); float b=blob(p,vec2(cos(t*.7)*.24+.18,sin(t)*.12),.56);",
"vec3 c=vec3(.043,.055,.047); c=mix(c,uAccent,a*.44); c=mix(c,uCoral,b*.2);",
"float grain=fract(sin(dot(vUv*uResolution,vec2(12.9898,78.233)))*43758.5453); c+=(grain-.5)*.018; outColor=vec4(c,1.0); }"
].join("\n");
function compile(gl:WebGL2RenderingContext,type:number,source:string){
  const shader=gl.createShader(type); if(!shader)return null;
  gl.shaderSource(shader,source); gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);return null;}
  return shader;
}
function readColor(value:string):[number,number,number]{
  const hex=value.replace("#","");
  if(hex.length!==6)return [.77,.94,.44];
  return [0,2,4].map((i)=>parseInt(hex.slice(i,i+2),16)/255) as [number,number,number];
}
export function HeroField(){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const gl=canvas.getContext("webgl2",{alpha:false,antialias:false,powerPreference:"low-power"});if(!gl)return;
    const vertex=compile(gl,gl.VERTEX_SHADER,vertexSource),fragment=compile(gl,gl.FRAGMENT_SHADER,fragmentSource);
    if(!vertex||!fragment)return;
    const program=gl.createProgram();if(!program)return;
    gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.useProgram(program);
    const position=gl.getAttribLocation(program,"position");gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const timeLocation=gl.getUniformLocation(program,"uTime"),resolutionLocation=gl.getUniformLocation(program,"uResolution");
    const accentLocation=gl.getUniformLocation(program,"uAccent"),coralLocation=gl.getUniformLocation(program,"uCoral");
    const setColors=()=>{const s=getComputedStyle(document.documentElement);gl.uniform3fv(accentLocation,readColor(s.getPropertyValue("--hero-accent").trim()));gl.uniform3fv(coralLocation,readColor(s.getPropertyValue("--hero-coral").trim()));};
    setColors();const themeObserver=new MutationObserver(setColors);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onPointerMove=(event:PointerEvent)=>{
      if(reduced)return;
      const rect=canvas.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      const inside=x>=-.5&&x<=.5&&y>=-.5&&y<=.5;
      const px=inside?x*2:0,py=inside?y*2:0;
      const field=canvas.parentElement;
      if(!field)return;
      field.style.setProperty("--glow-x",`${-px*20}px`);
      field.style.setProperty("--glow-y",`${-py*16}px`);
      field.style.setProperty("--orbit-x",`${-py*15}deg`);
      field.style.setProperty("--orbit-y",`${px*20}deg`);
      field.style.setProperty("--orbit-shift-x",`${-px*26}px`);
      field.style.setProperty("--orbit-shift-y",`${-py*20}px`);
    };
    const resetPointer=()=>{
      const field=canvas.parentElement;
      if(!field)return;
      field.style.setProperty("--glow-x","0px");field.style.setProperty("--glow-y","0px");
      field.style.setProperty("--orbit-x","0deg");field.style.setProperty("--orbit-y","0deg");
      field.style.setProperty("--orbit-shift-x","0px");field.style.setProperty("--orbit-shift-y","0px");
    };
    let frame=0,visible=true,lastFrame=0;
    const resize=()=>{const ratio=Math.min(window.devicePixelRatio||1,window.innerWidth<700?.85:1.15);const w=Math.max(1,Math.floor(canvas.clientWidth*ratio)),h=Math.max(1,Math.floor(canvas.clientHeight*ratio));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}};
    const draw=(now:number)=>{if(!visible||document.hidden){frame=0;return;}const interval=window.innerWidth<700?1000/30:1000/60;if(now-lastFrame<interval){frame=requestAnimationFrame(draw);return;}lastFrame=now;resize();gl.uniform2f(resolutionLocation,canvas.width,canvas.height);gl.uniform1f(timeLocation,reduced?0:now/1000);gl.drawArrays(gl.TRIANGLES,0,3);if(!reduced)frame=requestAnimationFrame(draw);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!reduced&&!frame)frame=requestAnimationFrame(draw);if(!visible&&frame){cancelAnimationFrame(frame);frame=0;}if(visible&&reduced)draw(performance.now());},{threshold:.01});
    observer.observe(canvas);
    const onVisibility=()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else if(!document.hidden&&visible&&!reduced&&!frame)frame=requestAnimationFrame(draw);else if(visible&&reduced)draw(performance.now());};
    window.addEventListener("resize",resize);window.addEventListener("pointermove",onPointerMove,{passive:true});window.addEventListener("blur",resetPointer);document.addEventListener("visibilitychange",onVisibility);resize();if(reduced)draw(performance.now());else frame=requestAnimationFrame(draw);
    return()=>{observer.disconnect();themeObserver.disconnect();window.removeEventListener("resize",resize);window.removeEventListener("pointermove",onPointerMove);window.removeEventListener("blur",resetPointer);document.removeEventListener("visibilitychange",onVisibility);if(frame)cancelAnimationFrame(frame);if(buffer)gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);};
  },[]);
  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true"/>;
}
