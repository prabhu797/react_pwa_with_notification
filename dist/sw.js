if(!self.define){let e,i={};const r=(r,s)=>(r=new URL(r+".js",s).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(s,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>r(e,o),f={module:{uri:o},exports:c,require:d};i[o]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(n(...e),c)))}}define(["./workbox-e3490c72"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-CC7fLEQk.js",revision:null},{url:"assets/index-Cs9mLtrU.css",revision:null},{url:"index.html",revision:"0b18e9a662a8f7c323d8eb6cec867639"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"service-worker.js",revision:"934aff98a7c5fc4ffaabc0f31006e647"},{url:"android-chrome-192x192.png",revision:"4a56c9475e1919c3f1c58957339dea1a"},{url:"android-chrome-512x512.png",revision:"5b2692209dd6fdec96bd7173aef06a3e"},{url:"apple-touch-icon.png",revision:"7da83dfe91af2717bb0a1cd7a9180f0f"},{url:"favicon.ico",revision:"892fe0fd2656e6d088004a492ca04771"},{url:"maskable_icon.png",revision:"cedde86d8206ee8e4f85687d95af3946"},{url:"manifest.webmanifest",revision:"09b145fdb5f3ca4d3e15055252d3281e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
