import{S as ie,i as ue,s as fe,e as p,c as v,a as g,d,b as u,g as V,k as N,t as q,m as C,h as x,L as le,J as c,M as F,j as X,N as ke,K as O,O as Ee,P as Se,Q as se,R as ae,T as Me,U as me,v as Pe,W as Ae,V as Ne,X as Ce,o as re,p as qe,q as ne,n as xe,w as _e,x as pe,y as ve,B as ge}from"../chunks/vendor-0c1d71b8.js";function be(n,e,l){const t=n.slice();return t[8]=e[l],t[10]=l,t}function we(n){let e,l=n[1],t=[];for(let s=0;s<l.length;s+=1)t[s]=ye(be(n,l,s));return{c(){e=p("div");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=v(s,"DIV",{class:!0});var r=g(e);for(let a=0;a<t.length;a+=1)t[a].l(r);r.forEach(d),this.h()},h(){u(e,"class","py-2 bg-white w-full rounded-b-md sm:w-1/2 overflow-y-scroll text-slate-900")},m(s,r){V(s,e,r);for(let a=0;a<t.length;a+=1)t[a].m(e,null)},p(s,r){if(r&10){l=s[1];let a;for(a=0;a<l.length;a+=1){const o=be(s,l,a);t[a]?t[a].p(o,r):(t[a]=ye(o),t[a].c(),t[a].m(e,null))}for(;a<t.length;a+=1)t[a].d(1);t.length=l.length}},d(s){s&&d(e),ke(t,s)}}}function ye(n){let e,l,t,s,r,a,o,f=n[8].title+"",i,m,_,h,b,y,w,A=n[8].year+"",j,L,E,R,W=n[8].rating+"",B,Y,U,I,J,$;return{c(){e=p("div"),l=p("img"),r=N(),a=p("span"),o=p("span"),i=q(f),m=N(),_=p("br"),h=N(),b=p("span"),y=p("span"),w=q("Year: "),j=q(A),L=N(),E=p("span"),R=q("Rating: "),B=q(W),Y=q("/10"),U=N(),this.h()},l(M){e=v(M,"DIV",{class:!0,"data-index":!0});var S=g(e);l=v(S,"IMG",{class:!0,src:!0,alt:!0}),r=C(S),a=v(S,"SPAN",{class:!0});var z=g(a);o=v(z,"SPAN",{class:!0});var G=g(o);i=x(G,f),m=C(G),_=v(G,"BR",{}),G.forEach(d),h=C(z),b=v(z,"SPAN",{class:!0});var K=g(b);y=v(K,"SPAN",{class:!0});var Q=g(y);w=x(Q,"Year: "),j=x(Q,A),Q.forEach(d),L=C(K),E=v(K,"SPAN",{class:!0});var D=g(E);R=x(D,"Rating: "),B=x(D,W),Y=x(D,"/10"),D.forEach(d),K.forEach(d),z.forEach(d),U=C(S),S.forEach(d),this.h()},h(){u(l,"class","h-24 mr-2 aspect-square object-cover rounded"),le(l.src,t=n[8].cover)||u(l,"src",t),u(l,"alt",s=""+(n[8].title+" Cover")),u(o,"class","font-extrabold text-lg"),u(y,"class","text-sm"),u(E,"class","text-sm"),u(b,"class","flex flex-col justify-self-end mt-1"),u(a,"class","flex flex-col h-full"),u(e,"class","flex align-center w-full p-2 h-25 bg-white hover:bg-gray-100 cursor-pointer"),u(e,"data-index",I=n[10])},m(M,S){V(M,e,S),c(e,l),c(e,r),c(e,a),c(a,o),c(o,i),c(o,m),c(o,_),c(a,h),c(a,b),c(b,y),c(y,w),c(y,j),c(b,L),c(b,E),c(E,R),c(E,B),c(E,Y),c(e,U),J||($=F(e,"click",n[3]),J=!0)},p(M,S){S&2&&!le(l.src,t=M[8].cover)&&u(l,"src",t),S&2&&s!==(s=""+(M[8].title+" Cover"))&&u(l,"alt",s),S&2&&f!==(f=M[8].title+"")&&X(i,f),S&2&&A!==(A=M[8].year+"")&&X(j,A),S&2&&W!==(W=M[8].rating+"")&&X(B,W)},d(M){M&&d(e),J=!1,$()}}}function Re(n){let e,l,t,s,r,a,o=n[1].length>0&&n[0]&&we(n);return{c(){e=p("div"),l=p("input"),t=N(),o&&o.c(),this.h()},l(f){e=v(f,"DIV",{class:!0});var i=g(e);l=v(i,"INPUT",{autocomplete:!0,type:!0,class:!0}),t=C(i),o&&o.l(i),i.forEach(d),this.h()},h(){u(l,"autocomplete","off"),u(l,"type","text"),u(l,"class","outline outline-1 outline-slate-300 focus:outline-sky-600 focus:outline-2 p-2 drop-shadow-sm h-10 w-full sm:w-1/2 rounded bg-gradient-to-tr from-slate-100 to-white"),u(e,"class",s="transition-transform duration-500 w-full flex flex-col items-center translate-y-1/3 ease-out "+(n[1].length>0?"translate-y-0":"translate-y-1/3"))},m(f,i){V(f,e,i),c(e,l),c(e,t),o&&o.m(e,null),r||(a=[F(l,"input",n[2]),F(e,"focusin",n[5]),F(e,"blur",n[6])],r=!0)},p(f,[i]){f[1].length>0&&f[0]?o?o.p(f,i):(o=we(f),o.c(),o.m(e,null)):o&&(o.d(1),o=null),i&2&&s!==(s="transition-transform duration-500 w-full flex flex-col items-center translate-y-1/3 ease-out "+(f[1].length>0?"translate-y-0":"translate-y-1/3"))&&u(e,"class",s)},i:O,o:O,d(f){f&&d(e),o&&o.d(),r=!1,Ee(a)}}}function Te(n,e,l){let t,s=!1,{onMovieSelected:r}=e,a=new Array;function o(_){let h=_.currentTarget.value;if(h===""){l(1,a=[]);return}t&&clearTimeout(t),t=setTimeout(()=>{Se.get("https://yts.mx/api/v2/list_movies.json?query_term="+h+"&sort_by=seeds").then(b=>{let y=b.data.data.movies;l(1,a=y.map(w=>({title:w.title,cover:w.medium_cover_image,rating:w.rating,year:w.year,hashes:w.torrents.sort(({seedsA:A},{seedsB:j})=>j-A).map(({hash:A})=>A)})).sort((w,A)=>A.rating-w.rating))}).catch(console.log)},1e3)}function f(_){let h=a[_.currentTarget.dataset.index];r(h)}const i=()=>l(0,s=!0),m=()=>l(0,s=!1);return n.$$set=_=>{"onMovieSelected"in _&&l(4,r=_.onMovieSelected)},[s,a,o,f,r,i,m]}class je extends ie{constructor(e){super();ue(this,e,Te,Re,fe,{onMovieSelected:4})}}function Be(n){let e,l,t,s;return{c(){e=p("span"),l=N(),t=p("span"),s=p("span"),this.h()},l(r){e=v(r,"SPAN",{class:!0}),g(e).forEach(d),l=C(r),t=v(r,"SPAN",{class:!0});var a=g(t);s=v(a,"SPAN",{class:!0}),g(s).forEach(d),a.forEach(d),this.h()},h(){u(e,"class","absolute left-0 bottom-0 w-full h-1 bg-slate-200 rounded-b overflow-hidden"),u(s,"class","absolute left-0 bottom-0 h-1 w-full bg-gradient-to-tr from-green-400 to-green-600"),u(t,"class","absolute left-0 bottom-0 h-1 overflow-hidden")},m(r,a){V(r,e,a),V(r,l,a),V(r,t,a),c(t,s),n[5](t)},p:O,d(r){r&&d(e),r&&d(l),r&&d(t),n[5](null)}}}function Ie(n){let e;return{c(){e=p("span"),this.h()},l(l){e=v(l,"SPAN",{class:!0}),g(e).forEach(d),this.h()},h(){u(e,"class","bg-blue-500 left-0 bottom-0 absolute w-full h-1 animate-pulse")},m(l,t){V(l,e,t)},p:O,d(l){l&&d(e)}}}function Ve(n){let e,l,t,s,r,a,o,f,i,m,_,h,b,y=n[0].title+"",w,A,j,L,E,R,W,B=n[0].year+"",Y,U,I,J,$=n[0].rating+"",M,S,z,G,K;function Q(P,k){return P[1]?Ie:Be}let D=Q(n),T=D(n);return{c(){e=p("div"),l=p("span"),t=se("svg"),s=se("symbol"),r=se("path"),a=se("use"),o=N(),f=p("img"),_=N(),h=p("span"),b=p("span"),w=q(y),A=N(),j=p("br"),L=N(),E=p("span"),R=p("span"),W=q("Year: "),Y=q(B),U=N(),I=p("span"),J=q("Rating: "),M=q($),S=q("/10"),z=N(),T.c(),this.h()},l(P){e=v(P,"DIV",{class:!0});var k=g(e);l=v(k,"SPAN",{class:!0});var de=g(l);t=ae(de,"svg",{class:!0});var oe=g(t);s=ae(oe,"symbol",{id:!0,viewBox:!0});var he=g(s);r=ae(he,"path",{d:!0}),g(r).forEach(d),he.forEach(d),a=ae(oe,"use",{"xlink:href":!0}),g(a).forEach(d),oe.forEach(d),de.forEach(d),o=C(k),f=v(k,"IMG",{class:!0,src:!0,alt:!0}),_=C(k),h=v(k,"SPAN",{class:!0});var H=g(h);b=v(H,"SPAN",{class:!0});var Z=g(b);w=x(Z,y),A=C(Z),j=v(Z,"BR",{}),Z.forEach(d),L=C(H),E=v(H,"SPAN",{class:!0});var ee=g(E);R=v(ee,"SPAN",{class:!0});var ce=g(R);W=x(ce,"Year: "),Y=x(ce,B),ce.forEach(d),U=C(ee),I=v(ee,"SPAN",{class:!0});var te=g(I);J=x(te,"Rating: "),M=x(te,$),S=x(te,"/10"),te.forEach(d),ee.forEach(d),H.forEach(d),z=C(k),T.l(k),k.forEach(d),this.h()},h(){u(r,"d","M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z"),u(s,"id","icon-close"),u(s,"viewBox","0 0 22 28"),Me(a,"xlink:href","#icon-close"),u(t,"class","icon icon-close svelte-2qiq74"),u(l,"class","absolute top-0 right-2 text-slate-400 cursor-pointer"),u(f,"class","h-24 mr-2 aspect-square object-cover rounded"),le(f.src,i=n[0].cover)||u(f,"src",i),u(f,"alt",m=""+(n[0].title+" Cover")),u(b,"class","font-extrabold text-lg"),u(R,"class","text-sm"),u(I,"class","text-sm"),u(E,"class","flex flex-col justify-self-end mt-1"),u(h,"class","flex flex-col h-full"),u(e,"class","bg-gradient-to-tr from-slate-100 to-white flex align-center self-center p-2 w-full sm:w-1/2 outline outline-1 outline-slate-300 drop-shadow-sm relative pb-3 rounded")},m(P,k){V(P,e,k),c(e,l),c(l,t),c(t,s),c(s,r),c(t,a),c(e,o),c(e,f),c(e,_),c(e,h),c(h,b),c(b,w),c(b,A),c(b,j),c(h,L),c(h,E),c(E,R),c(R,W),c(R,Y),c(E,U),c(E,I),c(I,J),c(I,M),c(I,S),c(e,z),T.m(e,null),G||(K=F(l,"click",n[3]),G=!0)},p(P,[k]){k&1&&!le(f.src,i=P[0].cover)&&u(f,"src",i),k&1&&m!==(m=""+(P[0].title+" Cover"))&&u(f,"alt",m),k&1&&y!==(y=P[0].title+"")&&X(w,y),k&1&&B!==(B=P[0].year+"")&&X(Y,B),k&1&&$!==($=P[0].rating+"")&&X(M,$),D===(D=Q(P))&&T?T.p(P,k):(T.d(1),T=D(P),T&&(T.c(),T.m(e,null)))},i:O,o:O,d(P){P&&d(e),T.d(),G=!1,K()}}}function We(n,e,l){let{currentMovie:t}=e,{onCancel:s}=e,r=!0,a,o;me.mitm="./mitm.html";function f(){s&&s(),o&&o()}Pe(()=>{let _=new Ae().add(t.hashes[0],{announce:["wss://tracker.openwebtorrent.com","wss://tracker.btorrent.xyz"]});window.addEventListener("unload",()=>_.destroy()),_.on("ready",()=>{_.files.forEach(h=>{if(h.name.endsWith(".mp4")||h.name.endsWith(".mkv")){let b=me.createWriteStream(h.name,{size:h.length}),y=b.getWriter();window.onunload=o=()=>{b.abort(),y.abort()},window.onbeforeunload=w=>{h.downloaded!==h.length&&(w.returnValue="Are you sure you want to cancel the download?")},h.createReadStream().on("data",w=>{y.write(w)}).on("end",()=>y.close());return}}),l(1,r=!1),_.on("download",()=>{let h=Math.round(_.progress*1e4)/100;console.log(`${h}%`),l(2,a.style.width=`${h}%`,a)})})});function i(m){Ne[m?"unshift":"push"](()=>{a=m,l(2,a)})}return n.$$set=m=>{"currentMovie"in m&&l(0,t=m.currentMovie),"onCancel"in m&&l(4,s=m.onCancel)},[t,r,a,f,s,i]}class De extends ie{constructor(e){super();ue(this,e,We,Ve,fe,{currentMovie:0,onCancel:4})}}function Ye(n){let e,l;return e=new je({props:{onMovieSelected:n[1]}}),{c(){_e(e.$$.fragment)},l(t){pe(e.$$.fragment,t)},m(t,s){ve(e,t,s),l=!0},p:O,i(t){l||(ne(e.$$.fragment,t),l=!0)},o(t){re(e.$$.fragment,t),l=!1},d(t){ge(e,t)}}}function $e(n){let e,l;return e=new De({props:{currentMovie:n[0],onCancel:n[2]}}),{c(){_e(e.$$.fragment)},l(t){pe(e.$$.fragment,t)},m(t,s){ve(e,t,s),l=!0},p(t,s){const r={};s&1&&(r.currentMovie=t[0]),s&1&&(r.onCancel=t[2]),e.$set(r)},i(t){l||(ne(e.$$.fragment,t),l=!0)},o(t){re(e.$$.fragment,t),l=!1},d(t){ge(e,t)}}}function ze(n){let e,l,t,s,r;const a=[$e,Ye],o=[];function f(i,m){return i[0]?0:1}return t=f(n),s=o[t]=a[t](n),{c(){e=N(),l=p("main"),s.c(),this.h()},l(i){Ce('[data-svelte="svelte-1bc0lsu"]',document.head).forEach(d),e=C(i),l=v(i,"MAIN",{class:!0});var _=g(l);s.l(_),_.forEach(d),this.h()},h(){document.title="watchit",u(l,"class","p-5 w-full h-full bg-slate-200 text-slate-900 flex justify-center")},m(i,m){V(i,e,m),V(i,l,m),o[t].m(l,null),r=!0},p(i,[m]){let _=t;t=f(i),t===_?o[t].p(i,m):(xe(),re(o[_],1,1,()=>{o[_]=null}),qe(),s=o[t],s?s.p(i,m):(s=o[t]=a[t](i),s.c()),ne(s,1),s.m(l,null))},i(i){r||(ne(s),r=!0)},o(i){re(s),r=!1},d(i){i&&d(e),i&&d(l),o[t].d()}}}function Ge(n,e,l){let t=null;function s(a){console.log("Movie Selected: ",a.title),l(0,t=a)}return[t,s,()=>l(0,t=null)]}class Ue extends ie{constructor(e){super();ue(this,e,Ge,ze,fe,{})}}export{Ue as default};
