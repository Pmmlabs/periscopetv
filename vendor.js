/*!
 * VERSION: beta 1.3.4
 * DATE: 2014-11-15
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var t=180/Math.PI,e=[],i=[],r=[],s={},n=_gsScope._gsDefine.globals,a=function(t,e,i,r){this.a=t,this.b=e,this.c=i,this.d=r,this.da=r-t,this.ca=i-t,this.ba=e-t},o=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",l=function(t,e,i,r){var s={a:t},n={},a={},o={c:r},l=(t+e)/2,h=(e+i)/2,u=(i+r)/2,_=(l+h)/2,f=(h+u)/2,c=(f-_)/8;return s.b=l+(t-l)/4,n.b=_+c,s.c=n.a=(s.b+n.b)/2,n.c=a.a=(_+f)/2,a.b=f-c,o.b=u+(r-u)/4,a.c=o.a=(a.b+o.b)/2,[s,n,a,o]},h=function(t,s,n,a,o){var h,u,_,f,c,p,d,m,g,v,y,T,w,x=t.length-1,b=0,P=t[0].a;for(h=0;x>h;h++)c=t[b],u=c.a,_=c.d,f=t[b+1].d,o?(y=e[h],T=i[h],w=.25*(T+y)*s/(a?.5:r[h]||.5),p=_-(_-u)*(a?.5*s:0!==y?w/y:0),d=_+(f-_)*(a?.5*s:0!==T?w/T:0),m=_-(p+((d-p)*(3*y/(y+T)+.5)/4||0))):(p=_-.5*(_-u)*s,d=_+.5*(f-_)*s,m=_-(p+d)/2),p+=m,d+=m,c.c=g=p,c.b=0!==h?P:P=c.a+.6*(c.c-c.a),c.da=_-u,c.ca=g-u,c.ba=P-u,n?(v=l(u,P,g,_),t.splice(b,1,v[0],v[1],v[2],v[3]),b+=4):b++,P=d;c=t[b],c.b=P,c.c=P+.4*(c.d-P),c.da=c.d-c.a,c.ca=c.c-c.a,c.ba=P-c.a,n&&(v=l(c.a,P,c.c,c.d),t.splice(b,1,v[0],v[1],v[2],v[3]))},u=function(t,r,s,n){var o,l,h,u,_,f,c=[];if(n)for(t=[n].concat(t),l=t.length;--l>-1;)"string"==typeof(f=t[l][r])&&"="===f.charAt(1)&&(t[l][r]=n[r]+Number(f.charAt(0)+f.substr(2)));if(o=t.length-2,0>o)return c[0]=new a(t[0][r],0,0,t[-1>o?0:1][r]),c;for(l=0;o>l;l++)h=t[l][r],u=t[l+1][r],c[l]=new a(h,0,0,u),s&&(_=t[l+2][r],e[l]=(e[l]||0)+(u-h)*(u-h),i[l]=(i[l]||0)+(_-u)*(_-u));return c[l]=new a(t[l][r],0,0,t[l+1][r]),c},_=function(t,n,a,l,_,f){var c,p,d,m,g,v,y,T,w={},x=[],b=f||t[0];_="string"==typeof _?","+_+",":o,null==n&&(n=1);for(p in t[0])x.push(p);if(t.length>1){for(T=t[t.length-1],y=!0,c=x.length;--c>-1;)if(p=x[c],Math.abs(b[p]-T[p])>.05){y=!1;break}y&&(t=t.concat(),f&&t.unshift(f),t.push(t[1]),f=t[t.length-3])}for(e.length=i.length=r.length=0,c=x.length;--c>-1;)p=x[c],s[p]=-1!==_.indexOf(","+p+","),w[p]=u(t,p,s[p],f);for(c=e.length;--c>-1;)e[c]=Math.sqrt(e[c]),i[c]=Math.sqrt(i[c]);if(!l){for(c=x.length;--c>-1;)if(s[p])for(d=w[x[c]],v=d.length-1,m=0;v>m;m++)g=d[m+1].da/i[m]+d[m].da/e[m],r[m]=(r[m]||0)+g*g;for(c=r.length;--c>-1;)r[c]=Math.sqrt(r[c])}for(c=x.length,m=a?4:1;--c>-1;)p=x[c],d=w[p],h(d,n,a,l,s[p]),y&&(d.splice(0,m),d.splice(d.length-m,m));return w},f=function(t,e,i){e=e||"soft";var r,s,n,o,l,h,u,_,f,c,p,d={},m="cubic"===e?3:2,g="soft"===e,v=[];if(g&&i&&(t=[i].concat(t)),null==t||m+1>t.length)throw"invalid Bezier data";for(f in t[0])v.push(f);for(h=v.length;--h>-1;){for(f=v[h],d[f]=l=[],c=0,_=t.length,u=0;_>u;u++)r=null==i?t[u][f]:"string"==typeof(p=t[u][f])&&"="===p.charAt(1)?i[f]+Number(p.charAt(0)+p.substr(2)):Number(p),g&&u>1&&_-1>u&&(l[c++]=(r+l[c-2])/2),l[c++]=r;for(_=c-m+1,c=0,u=0;_>u;u+=m)r=l[u],s=l[u+1],n=l[u+2],o=2===m?0:l[u+3],l[c++]=p=3===m?new a(r,s,n,o):new a(r,(2*s+r)/3,(2*s+n)/3,n);l.length=c}return d},c=function(t,e,i){for(var r,s,n,a,o,l,h,u,_,f,c,p=1/i,d=t.length;--d>-1;)for(f=t[d],n=f.a,a=f.d-n,o=f.c-n,l=f.b-n,r=s=0,u=1;i>=u;u++)h=p*u,_=1-h,r=s-(s=(h*h*a+3*_*(h*o+_*l))*h),c=d*i+u-1,e[c]=(e[c]||0)+r*r},p=function(t,e){e=e>>0||6;var i,r,s,n,a=[],o=[],l=0,h=0,u=e-1,_=[],f=[];for(i in t)c(t[i],a,e);for(s=a.length,r=0;s>r;r++)l+=Math.sqrt(a[r]),n=r%e,f[n]=l,n===u&&(h+=l,n=r/e>>0,_[n]=f,o[n]=h,l=0,f=[]);return{length:h,lengths:o,segments:_}},d=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.4",API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var r,s,n,a,o,l=e.values||[],h={},u=l[0],c=e.autoRotate||i.vars.orientToBezier;this._autoRotate=c?c instanceof Array?c:[["x","y","rotation",c===!0?0:Number(c)||0]]:null;for(r in u)this._props.push(r);for(n=this._props.length;--n>-1;)r=this._props[n],this._overwriteProps.push(r),s=this._func[r]="function"==typeof t[r],h[r]=s?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]():parseFloat(t[r]),o||h[r]!==l[0][r]&&(o=h);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?_(l,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,o):f(l,e.type,h),this._segCount=this._beziers[r].length,this._timeRes){var d=p(this._beziers,this._timeRes);this._length=d.length,this._lengths=d.lengths,this._segments=d.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(c=this._autoRotate)for(this._initialRotations=[],c[0]instanceof Array||(this._autoRotate=c=[c]),n=c.length;--n>-1;){for(a=0;3>a;a++)r=c[n][a],this._func[r]="function"==typeof t[r]?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]:!1;r=c[n][2],this._initialRotations[n]=this._func[r]?this._func[r].call(this._target):this._target[r]}return this._startRatio=i.vars.runBackwards?1:0,!0},set:function(e){var i,r,s,n,a,o,l,h,u,_,f=this._segCount,c=this._func,p=this._target,d=e!==this._startRatio;if(this._timeRes){if(u=this._lengths,_=this._curSeg,e*=this._length,s=this._li,e>this._l2&&f-1>s){for(h=f-1;h>s&&e>=(this._l2=u[++s]););this._l1=u[s-1],this._li=s,this._curSeg=_=this._segments[s],this._s2=_[this._s1=this._si=0]}else if(this._l1>e&&s>0){for(;s>0&&(this._l1=u[--s])>=e;);0===s&&this._l1>e?this._l1=0:s++,this._l2=u[s],this._li=s,this._curSeg=_=this._segments[s],this._s1=_[(this._si=_.length-1)-1]||0,this._s2=_[this._si]}if(i=s,e-=this._l1,s=this._si,e>this._s2&&_.length-1>s){for(h=_.length-1;h>s&&e>=(this._s2=_[++s]););this._s1=_[s-1],this._si=s}else if(this._s1>e&&s>0){for(;s>0&&(this._s1=_[--s])>=e;);0===s&&this._s1>e?this._s1=0:s++,this._s2=_[s],this._si=s}o=(s+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?f-1:f*e>>0,o=(e-i*(1/f))*f;for(r=1-o,s=this._props.length;--s>-1;)n=this._props[s],a=this._beziers[n][i],l=(o*o*a.da+3*r*(o*a.ca+r*a.ba))*o+a.a,this._round[n]&&(l=Math.round(l)),c[n]?p[n](l):p[n]=l;if(this._autoRotate){var m,g,v,y,T,w,x,b=this._autoRotate;for(s=b.length;--s>-1;)n=b[s][2],w=b[s][3]||0,x=b[s][4]===!0?1:t,a=this._beziers[b[s][0]],m=this._beziers[b[s][1]],a&&m&&(a=a[i],m=m[i],g=a.a+(a.b-a.a)*o,y=a.b+(a.c-a.b)*o,g+=(y-g)*o,y+=(a.c+(a.d-a.c)*o-y)*o,v=m.a+(m.b-m.a)*o,T=m.b+(m.c-m.b)*o,v+=(T-v)*o,T+=(m.c+(m.d-m.c)*o-T)*o,l=d?Math.atan2(T-v,y-g)*x+w:this._initialRotations[s],c[n]?p[n](l):p[n]=l)}}}),m=d.prototype;d.bezierThrough=_,d.cubicToQuadratic=l,d._autoCSS=!0,d.quadraticToCubic=function(t,e,i){return new a(t,(2*e+t)/3,(2*e+i)/3,i)},d._cssRegister=function(){var t=n.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,r=e._setPluginRatio,s=e.CSSPropTween;e._registerComplexSpecialProp("bezier",{parser:function(t,e,n,a,o,l){e instanceof Array&&(e={values:e}),l=new d;var h,u,_,f=e.values,c=f.length-1,p=[],m={};if(0>c)return o;for(h=0;c>=h;h++)_=i(t,f[h],a,o,l,c!==h),p[h]=_.end;for(u in e)m[u]=e[u];return m.values=p,o=new s(t,"bezier",0,0,_.pt,2),o.data=_,o.plugin=l,o.setRatio=r,0===m.autoRotate&&(m.autoRotate=!0),!m.autoRotate||m.autoRotate instanceof Array||(h=m.autoRotate===!0?0:Number(m.autoRotate),m.autoRotate=null!=_.end.left?[["left","top","rotation",h,!1]]:null!=_.end.x?[["x","y","rotation",h,!1]]:!1),m.autoRotate&&(a._transform||a._enableTransforms(!1),_.autoRotate=a._target._gsTransform),l._onInitTween(_.proxy,m,a._tween),o}})}},m._roundProps=function(t,e){for(var i=this._overwriteProps,r=i.length;--r>-1;)(t[i[r]]||t.bezier||t.bezierThrough)&&(this._round[i[r]]=e)},m._kill=function(t){var e,i,r=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=r.length;--i>-1;)r[i]===e&&r.splice(i,1);return this._super._kill.call(this,t)}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=e())}("BezierPlugin");/*!
 * VERSION: 1.16.1
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,r,s,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o=_gsScope._gsDefine.globals,l={},h=a.prototype=new t("css");h.constructor=a,a.version="1.16.1",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h,lineHeight:""};var u,f,p,c,_,d,m=/(?:\d|\-\d|\.\d|\-\.\d)+/g,g=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,v=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,y=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,x=/(?:\d|\-|\+|=|#|\.)*/g,T=/opacity *= *([^)]*)/i,w=/opacity:([^;]*)/i,b=/alpha\(opacity *=.+?\)/i,P=/^(rgb|hsl)/,S=/([A-Z])/g,C=/-([a-z])/gi,O=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,k=function(t,e){return e.toUpperCase()},R=/(?:Left|Right|Width)/i,A=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,M=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,D=/,(?=[^\)]*(?:\(|$))/gi,N=Math.PI/180,L=180/Math.PI,X={},z=document,E=function(t){return z.createElementNS?z.createElementNS("http://www.w3.org/1999/xhtml",t):z.createElement(t)},F=E("div"),I=E("img"),Y=a._internals={_specialProps:l},B=navigator.userAgent,U=function(){var t=B.indexOf("Android"),e=E("a");return p=-1!==B.indexOf("Safari")&&-1===B.indexOf("Chrome")&&(-1===t||Number(B.substr(t+8,1))>3),_=p&&6>Number(B.substr(B.indexOf("Version/")+8,1)),c=-1!==B.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(B))&&(d=parseFloat(RegExp.$1)),e?(e.style.cssText="top:1px;opacity:.55;",/^0.55/.test(e.style.opacity)):!1}(),j=function(t){return T.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},V=function(t){window.console&&console.log(t)},W="",q="",G=function(t,e){e=e||F;var i,r,s=e.style;if(void 0!==s[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],r=5;--r>-1&&void 0===s[i[r]+t];);return r>=0?(q=3===r?"ms":i[r],W="-"+q.toLowerCase()+"-",q+t):null},H=z.defaultView?z.defaultView.getComputedStyle:function(){},Q=a.getStyle=function(t,e,i,r,s){var n;return U||"opacity"!==e?(!r&&t.style[e]?n=t.style[e]:(i=i||H(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(S,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==s||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:s):j(t)},Z=Y.convertToPixels=function(t,i,r,s,n){if("px"===s||!s)return r;if("auto"===s||!r)return 0;var o,l,h,u=R.test(i),f=t,p=F.style,c=0>r;if(c&&(r=-r),"%"===s&&-1!==i.indexOf("border"))o=r/100*(u?t.clientWidth:t.clientHeight);else{if(p.cssText="border:0 solid red;position:"+Q(t,"position")+";line-height:0;","%"!==s&&f.appendChild)p[u?"borderLeftWidth":"borderTopWidth"]=r+s;else{if(f=t.parentNode||z.body,l=f._gsCache,h=e.ticker.frame,l&&u&&l.time===h)return l.width*r/100;p[u?"width":"height"]=r+s}f.appendChild(F),o=parseFloat(F[u?"offsetWidth":"offsetHeight"]),f.removeChild(F),u&&"%"===s&&a.cacheWidths!==!1&&(l=f._gsCache=f._gsCache||{},l.time=h,l.width=100*(o/r)),0!==o||n||(o=Z(t,i,r,s,!0))}return c?-o:o},$=Y.calculateOffset=function(t,e,i){if("absolute"!==Q(t,"position",i))return 0;var r="left"===e?"Left":"Top",s=Q(t,"margin"+r,i);return t["offset"+r]-(Z(t,e,parseFloat(s),s.replace(x,""))||0)},K=function(t,e){var i,r,s,n={};if(e=e||H(t,null))if(i=e.length)for(;--i>-1;)s=e[i],(-1===s.indexOf("-transform")||be===s)&&(n[s.replace(C,k)]=e.getPropertyValue(s));else for(i in e)(-1===i.indexOf("Transform")||we===i)&&(n[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===n[i]&&(n[i.replace(C,k)]=e[i]);return U||(n.opacity=j(t)),r=De(t,e,!1),n.rotation=r.rotation,n.skewX=r.skewX,n.scaleX=r.scaleX,n.scaleY=r.scaleY,n.x=r.x,n.y=r.y,Se&&(n.z=r.z,n.rotationX=r.rotationX,n.rotationY=r.rotationY,n.scaleZ=r.scaleZ),n.filters&&delete n.filters,n},J=function(t,e,i,r,s){var n,a,o,l={},h=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||s&&s[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(l[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(y,"")?n:0:$(t,a),void 0!==h[a]&&(o=new ce(h,a,h[a],o)));if(r)for(a in r)"className"!==a&&(l[a]=r[a]);return{difs:l,firstMPT:o}},te={width:["Left","Right"],height:["Top","Bottom"]},ee=["marginLeft","marginRight","marginTop","marginBottom"],ie=function(t,e,i){var r=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),s=te[e],n=s.length;for(i=i||H(t,null);--n>-1;)r-=parseFloat(Q(t,"padding"+s[n],i,!0))||0,r-=parseFloat(Q(t,"border"+s[n]+"Width",i,!0))||0;return r},re=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),r=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],s=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==s?s="center"===r?"50%":"0":"center"===s&&(s="50%"),("center"===r||isNaN(parseFloat(r))&&-1===(r+"").indexOf("="))&&(r="50%"),t=r+" "+s+(i.length>2?" "+i[2]:""),e&&(e.oxp=-1!==r.indexOf("%"),e.oyp=-1!==s.indexOf("%"),e.oxr="="===r.charAt(1),e.oyr="="===s.charAt(1),e.ox=parseFloat(r.replace(y,"")),e.oy=parseFloat(s.replace(y,"")),e.v=t),e||t},se=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},ne=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},ae=function(t,e,i,r){var s,n,a,o,l,h=1e-6;return null==t?o=e:"number"==typeof t?o=t:(s=360,n=t.split("_"),l="="===t.charAt(1),a=(l?parseInt(t.charAt(0)+"1",10)*parseFloat(n[0].substr(2)):parseFloat(n[0]))*(-1===t.indexOf("rad")?1:L)-(l?0:e),n.length&&(r&&(r[i]=e+a),-1!==t.indexOf("short")&&(a%=s,a!==a%(s/2)&&(a=0>a?a+s:a-s)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*s)%s-(0|a/s)*s:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*s)%s-(0|a/s)*s)),o=e+a),h>o&&o>-h&&(o=0),o},oe={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},le=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},he=a.parseColor=function(t){var e,i,r,s,n,a;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),oe[t]?oe[t]:"#"===t.charAt(0)?(4===t.length&&(e=t.charAt(1),i=t.charAt(2),r=t.charAt(3),t="#"+e+e+i+i+r+r),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(m),s=Number(t[0])%360/360,n=Number(t[1])/100,a=Number(t[2])/100,i=.5>=a?a*(n+1):a+n-a*n,e=2*a-i,t.length>3&&(t[3]=Number(t[3])),t[0]=le(s+1/3,e,i),t[1]=le(s,e,i),t[2]=le(s-1/3,e,i),t):(t=t.match(m)||oe.transparent,t[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):oe.black},ue="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in oe)ue+="|"+h+"\\b";ue=RegExp(ue+")","gi");var fe=function(t,e,i,r){if(null==t)return function(t){return t};var s,n=e?(t.match(ue)||[""])[0]:"",a=t.split(n).join("").match(v)||[],o=t.substr(0,t.indexOf(a[0])),l=")"===t.charAt(t.length-1)?")":"",h=-1!==t.indexOf(" ")?" ":",",u=a.length,f=u>0?a[0].replace(m,""):"";return u?s=e?function(t){var e,p,c,_;if("number"==typeof t)t+=f;else if(r&&D.test(t)){for(_=t.replace(D,"|").split("|"),c=0;_.length>c;c++)_[c]=s(_[c]);return _.join(",")}if(e=(t.match(ue)||[n])[0],p=t.split(e).join("").match(v)||[],c=p.length,u>c--)for(;u>++c;)p[c]=i?p[0|(c-1)/2]:a[c];return o+p.join(h)+h+e+l+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,p;if("number"==typeof t)t+=f;else if(r&&D.test(t)){for(n=t.replace(D,"|").split("|"),p=0;n.length>p;p++)n[p]=s(n[p]);return n.join(",")}if(e=t.match(v)||[],p=e.length,u>p--)for(;u>++p;)e[p]=i?e[0|(p-1)/2]:a[p];return o+e.join(h)+l}:function(t){return t}},pe=function(t){return t=t.split(","),function(e,i,r,s,n,a,o){var l,h=(i+"").split(" ");for(o={},l=0;4>l;l++)o[t[l]]=h[l]=h[l]||h[(l-1)/2>>0];return s.parse(e,o,n,a)}},ce=(Y._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,r,s,n=this.data,a=n.proxy,o=n.firstMPT,l=1e-6;o;)e=a[o.v],o.r?e=Math.round(e):l>e&&e>-l&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(s=i.xs0+i.s+i.xs1,r=1;i.l>r;r++)s+=i["xn"+r]+i["xs"+(r+1)];i.e=s}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,r,s){this.t=t,this.p=e,this.v=i,this.r=s,r&&(r._prev=this,this._next=r)}),_e=(Y._parseToProxy=function(t,e,i,r,s,n){var a,o,l,h,u,f=r,p={},c={},_=i._transform,d=X;for(i._transform=null,X=e,r=u=i.parse(t,e,r,s),X=d,n&&(i._transform=_,f&&(f._prev=null,f._prev&&(f._prev._next=null)));r&&r!==f;){if(1>=r.type&&(o=r.p,c[o]=r.s+r.c,p[o]=r.s,n||(h=new ce(r,"s",o,h,r.r),r.c=0),1===r.type))for(a=r.l;--a>0;)l="xn"+a,o=r.p+"_"+l,c[o]=r.data[l],p[o]=r[l],n||(h=new ce(r,l,o,h,r.rxp[l]));r=r._next}return{proxy:p,end:c,firstMPT:h,pt:u}},Y.CSSPropTween=function(t,e,r,s,a,o,l,h,u,f,p){this.t=t,this.p=e,this.s=r,this.c=s,this.n=l||e,t instanceof _e||n.push(this.n),this.r=h,this.type=o||0,u&&(this.pr=u,i=!0),this.b=void 0===f?r:f,this.e=void 0===p?r+s:p,a&&(this._next=a,a._prev=this)}),de=a.parseComplex=function(t,e,i,r,s,n,a,o,l,h){i=i||n||"",a=new _e(t,e,0,0,a,h?2:1,null,!1,o,i,r),r+="";var f,p,c,_,d,v,y,x,T,w,b,S,C=i.split(", ").join(",").split(" "),O=r.split(", ").join(",").split(" "),k=C.length,R=u!==!1;for((-1!==r.indexOf(",")||-1!==i.indexOf(","))&&(C=C.join(" ").replace(D,", ").split(" "),O=O.join(" ").replace(D,", ").split(" "),k=C.length),k!==O.length&&(C=(n||"").split(" "),k=C.length),a.plugin=l,a.setRatio=h,f=0;k>f;f++)if(_=C[f],d=O[f],x=parseFloat(_),x||0===x)a.appendXtra("",x,se(d,x),d.replace(g,""),R&&-1!==d.indexOf("px"),!0);else if(s&&("#"===_.charAt(0)||oe[_]||P.test(_)))S=","===d.charAt(d.length-1)?"),":")",_=he(_),d=he(d),T=_.length+d.length>6,T&&!U&&0===d[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(O[f]).join("transparent")):(U||(T=!1),a.appendXtra(T?"rgba(":"rgb(",_[0],d[0]-_[0],",",!0,!0).appendXtra("",_[1],d[1]-_[1],",",!0).appendXtra("",_[2],d[2]-_[2],T?",":S,!0),T&&(_=4>_.length?1:_[3],a.appendXtra("",_,(4>d.length?1:d[3])-_,S,!1)));else if(v=_.match(m)){if(y=d.match(g),!y||y.length!==v.length)return a;for(c=0,p=0;v.length>p;p++)b=v[p],w=_.indexOf(b,c),a.appendXtra(_.substr(c,w-c),Number(b),se(y[p],b),"",R&&"px"===_.substr(w+b.length,2),0===p),c=w+b.length;a["xs"+a.l]+=_.substr(c)}else a["xs"+a.l]+=a.l?" "+_:_;if(-1!==r.indexOf("=")&&a.data){for(S=a.xs0+a.data.s,f=1;a.l>f;f++)S+=a["xs"+f]+a.data["xn"+f];a.e=S+a["xs"+f]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},me=9;for(h=_e.prototype,h.l=h.pr=0;--me>0;)h["xn"+me]=0,h["xs"+me]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(t,e,i,r,s,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=r||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=s,a["xn"+o]=e,a.plugin||(a.xfirst=new _e(a,"xn"+o,e,i,a.xfirst||a,0,a.n,s,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=s,a)):(a["xs"+o]+=e+(r||""),a)};var ge=function(t,e){e=e||{},this.p=e.prefix?G(t)||t:t,l[t]=l[this.p]=this,this.format=e.formatter||fe(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},ve=Y._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var r,s,n=t.split(","),a=e.defaultValue;for(i=i||[a],r=0;n.length>r;r++)e.prefix=0===r&&e.prefix,e.defaultValue=i[r]||a,s=new ge(n[r],e)},ye=function(t){if(!l[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";ve(t,{parser:function(t,i,r,s,n,a,h){var u=o.com.greensock.plugins[e];return u?(u._cssRegister(),l[r].parse(t,i,r,s,n,a,h)):(V("Error: "+e+" js file not loaded."),n)}})}};h=ge.prototype,h.parseComplex=function(t,e,i,r,s,n){var a,o,l,h,u,f,p=this.keyword;if(this.multi&&(D.test(i)||D.test(e)?(o=e.replace(D,"|").split("|"),l=i.replace(D,"|").split("|")):p&&(o=[e],l=[i])),l){for(h=l.length>o.length?l.length:o.length,a=0;h>a;a++)e=o[a]=o[a]||this.dflt,i=l[a]=l[a]||this.dflt,p&&(u=e.indexOf(p),f=i.indexOf(p),u!==f&&(-1===f?o[a]=o[a].split(p).join(""):-1===u&&(o[a]+=" "+p)));e=o.join(", "),i=l.join(", ")}return de(t,this.p,e,i,this.clrs,this.dflt,r,this.pr,s,n)},h.parse=function(t,e,i,r,n,a){return this.parseComplex(t.style,this.format(Q(t,this.p,s,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){ve(t,{parser:function(t,r,s,n,a,o){var l=new _e(t,s,0,0,a,2,s,!1,i);return l.plugin=o,l.setRatio=e(t,r,n._tween,s),l},priority:i})},a.useSVGTransformAttr=p;var xe,Te="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),we=G("transform"),be=W+"transform",Pe=G("transformOrigin"),Se=null!==G("perspective"),Ce=Y.Transform=function(){this.perspective=parseFloat(a.defaultTransformPerspective)||0,this.force3D=a.defaultForce3D!==!1&&Se?a.defaultForce3D||"auto":!1},Oe=window.SVGElement,ke=function(t,e,i){var r,s=z.createElementNS("http://www.w3.org/2000/svg",t),n=/([a-z])([A-Z])/g;for(r in i)s.setAttributeNS(null,r.replace(n,"$1-$2").toLowerCase(),i[r]);return e.appendChild(s),s},Re=z.documentElement,Ae=function(){var t,e,i,r=d||/Android/i.test(B)&&!window.chrome;return z.createElementNS&&!r&&(t=ke("svg",Re),e=ke("rect",t,{width:100,height:50,x:100}),i=e.getBoundingClientRect().width,e.style[Pe]="50% 50%",e.style[we]="scaleX(0.5)",r=i===e.getBoundingClientRect().width&&!(c&&Se),Re.removeChild(t)),r}(),Me=function(t,e,i,r){var s,n;r&&(n=r.split(" ")).length||(s=t.getBBox(),e=re(e).split(" "),n=[(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*s.width:parseFloat(e[0]))+s.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*s.height:parseFloat(e[1]))+s.y]),i.xOrigin=parseFloat(n[0]),i.yOrigin=parseFloat(n[1]),t.setAttribute("data-svg-origin",n.join(" "))},De=Y.getTransform=function(t,e,i,r){if(t._gsTransform&&i&&!r)return t._gsTransform;var n,o,l,h,u,f,p,c,_,d,m=i?t._gsTransform||new Ce:new Ce,g=0>m.scaleX,v=2e-5,y=1e5,x=Se?parseFloat(Q(t,Pe,e,!1,"0 0 0").split(" ")[2])||m.zOrigin||0:0,T=parseFloat(a.defaultTransformPerspective)||0;if(we?o=Q(t,be,e,!0):t.currentStyle&&(o=t.currentStyle.filter.match(A),o=o&&4===o.length?[o[0].substr(4),Number(o[2].substr(4)),Number(o[1].substr(4)),o[3].substr(4),m.x||0,m.y||0].join(","):""),n=!o||"none"===o||"matrix(1, 0, 0, 1, 0, 0)"===o,m.svg=!!(Oe&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM)),m.svg&&(n&&-1!==(t.style[we]+"").indexOf("matrix")&&(o=t.style[we],n=!1),Me(t,Q(t,Pe,s,!1,"50% 50%")+"",m,t.getAttribute("data-svg-origin")),xe=a.useSVGTransformAttr||Ae,l=t.getAttribute("transform"),n&&l&&-1!==l.indexOf("matrix")&&(o=l,n=0)),!n){for(l=(o||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],h=l.length;--h>-1;)u=Number(l[h]),l[h]=(f=u-(u|=0))?(0|f*y+(0>f?-.5:.5))/y+u:u;if(16===l.length){var w,b,P,S,C,O=l[0],k=l[1],R=l[2],M=l[3],D=l[4],N=l[5],X=l[6],z=l[7],E=l[8],F=l[9],I=l[10],Y=l[12],B=l[13],U=l[14],j=l[11],V=Math.atan2(X,I);m.zOrigin&&(U=-m.zOrigin,Y=E*U-l[12],B=F*U-l[13],U=I*U+m.zOrigin-l[14]),m.rotationX=V*L,V&&(S=Math.cos(-V),C=Math.sin(-V),w=D*S+E*C,b=N*S+F*C,P=X*S+I*C,E=D*-C+E*S,F=N*-C+F*S,I=X*-C+I*S,j=z*-C+j*S,D=w,N=b,X=P),V=Math.atan2(E,I),m.rotationY=V*L,V&&(S=Math.cos(-V),C=Math.sin(-V),w=O*S-E*C,b=k*S-F*C,P=R*S-I*C,F=k*C+F*S,I=R*C+I*S,j=M*C+j*S,O=w,k=b,R=P),V=Math.atan2(k,O),m.rotation=V*L,V&&(S=Math.cos(-V),C=Math.sin(-V),O=O*S+D*C,b=k*S+N*C,N=k*-C+N*S,X=R*-C+X*S,k=b),m.rotationX&&Math.abs(m.rotationX)+Math.abs(m.rotation)>359.9&&(m.rotationX=m.rotation=0,m.rotationY+=180),m.scaleX=(0|Math.sqrt(O*O+k*k)*y+.5)/y,m.scaleY=(0|Math.sqrt(N*N+F*F)*y+.5)/y,m.scaleZ=(0|Math.sqrt(X*X+I*I)*y+.5)/y,m.skewX=0,m.perspective=j?1/(0>j?-j:j):0,m.x=Y,m.y=B,m.z=U,m.svg&&(m.x-=m.xOrigin-(m.xOrigin*O-m.yOrigin*D),m.y-=m.yOrigin-(m.yOrigin*k-m.xOrigin*N))}else if(!(Se&&!r&&l.length&&m.x===l[4]&&m.y===l[5]&&(m.rotationX||m.rotationY)||void 0!==m.x&&"none"===Q(t,"display",e))){var W=l.length>=6,q=W?l[0]:1,G=l[1]||0,H=l[2]||0,Z=W?l[3]:1;m.x=l[4]||0,m.y=l[5]||0,p=Math.sqrt(q*q+G*G),c=Math.sqrt(Z*Z+H*H),_=q||G?Math.atan2(G,q)*L:m.rotation||0,d=H||Z?Math.atan2(H,Z)*L+_:m.skewX||0,Math.abs(d)>90&&270>Math.abs(d)&&(g?(p*=-1,d+=0>=_?180:-180,_+=0>=_?180:-180):(c*=-1,d+=0>=d?180:-180)),m.scaleX=p,m.scaleY=c,m.rotation=_,m.skewX=d,Se&&(m.rotationX=m.rotationY=m.z=0,m.perspective=T,m.scaleZ=1),m.svg&&(m.x-=m.xOrigin-(m.xOrigin*q-m.yOrigin*G),m.y-=m.yOrigin-(m.yOrigin*Z-m.xOrigin*H))}m.zOrigin=x;for(h in m)v>m[h]&&m[h]>-v&&(m[h]=0)}return i&&(t._gsTransform=m,m.svg&&(xe&&t.style[we]?ze(t.style,we):!xe&&t.getAttribute("transform")&&t.removeAttribute("transform"))),m},Ne=function(t){var e,i,r=this.data,s=-r.rotation*N,n=s+r.skewX*N,a=1e5,o=(0|Math.cos(s)*r.scaleX*a)/a,l=(0|Math.sin(s)*r.scaleX*a)/a,h=(0|Math.sin(n)*-r.scaleY*a)/a,u=(0|Math.cos(n)*r.scaleY*a)/a,f=this.t.style,p=this.t.currentStyle;if(p){i=l,l=-h,h=-i,e=p.filter,f.filter="";var c,_,m=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==p.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+l+", M21="+h+", M22="+u,w=r.x+m*r.xPercent/100,b=r.y+g*r.yPercent/100;if(null!=r.ox&&(c=(r.oxp?.01*m*r.ox:r.ox)-m/2,_=(r.oyp?.01*g*r.oy:r.oy)-g/2,w+=c-(c*o+_*l),b+=_-(c*h+_*u)),v?(c=m/2,_=g/2,y+=", Dx="+(c-(c*o+_*l)+w)+", Dy="+(_-(c*h+_*u)+b)+")"):y+=", sizingMethod='auto expand')",f.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(M,y):y+" "+e,(0===t||1===t)&&1===o&&0===l&&0===h&&1===u&&(v&&-1===y.indexOf("Dx=0, Dy=0")||T.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&f.removeAttribute("filter")),!v){var P,S,C,O=8>d?1:-1;for(c=r.ieOffsetX||0,_=r.ieOffsetY||0,r.ieOffsetX=Math.round((m-((0>o?-o:o)*m+(0>l?-l:l)*g))/2+w),r.ieOffsetY=Math.round((g-((0>u?-u:u)*g+(0>h?-h:h)*m))/2+b),me=0;4>me;me++)S=ee[me],P=p[S],i=-1!==P.indexOf("px")?parseFloat(P):Z(this.t,S,parseFloat(P),P.replace(x,""))||0,C=i!==r[S]?2>me?-r.ieOffsetX:-r.ieOffsetY:2>me?c-r.ieOffsetX:_-r.ieOffsetY,f[S]=(r[S]=Math.round(i-C*(0===me||2===me?1:O)))+"px"}}},Le=Y.set3DTransformRatio=Y.setTransformRatio=function(t){var e,i,r,s,n,a,o,l,h,u,f,p,_,d,m,g,v,y,x,T,w,b,P,S=this.data,C=this.t.style,O=S.rotation,k=S.rotationX,R=S.rotationY,A=S.scaleX,M=S.scaleY,D=S.scaleZ,L=S.x,X=S.y,z=S.z,E=S.svg,F=S.perspective,I=S.force3D;if(!(((1!==t&&0!==t||"auto"!==I||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&I||z||F||R||k)&&(!xe||!E)&&Se))return O||S.skewX||E?(O*=N,b=S.skewX*N,P=1e5,e=Math.cos(O)*A,s=Math.sin(O)*A,i=Math.sin(O-b)*-M,n=Math.cos(O-b)*M,b&&"simple"===S.skewType&&(v=Math.tan(b),v=Math.sqrt(1+v*v),i*=v,n*=v,S.skewY&&(e*=v,s*=v)),E&&(L+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i),X+=S.yOrigin-(S.xOrigin*s+S.yOrigin*n),d=1e-6,d>L&&L>-d&&(L=0),d>X&&X>-d&&(X=0)),x=(0|e*P)/P+","+(0|s*P)/P+","+(0|i*P)/P+","+(0|n*P)/P+","+L+","+X+")",E&&xe?this.t.setAttribute("transform","matrix("+x):C[we]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+x):C[we]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+A+",0,0,"+M+","+L+","+X+")",void 0;if(c&&(d=1e-4,d>A&&A>-d&&(A=D=2e-5),d>M&&M>-d&&(M=D=2e-5),!F||S.z||S.rotationX||S.rotationY||(F=0)),O||S.skewX)O*=N,m=e=Math.cos(O),g=s=Math.sin(O),S.skewX&&(O-=S.skewX*N,m=Math.cos(O),g=Math.sin(O),"simple"===S.skewType&&(v=Math.tan(S.skewX*N),v=Math.sqrt(1+v*v),m*=v,g*=v,S.skewY&&(e*=v,s*=v))),i=-g,n=m;else{if(!(R||k||1!==D||F||E))return C[we]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) translate3d(":"translate3d(")+L+"px,"+X+"px,"+z+"px)"+(1!==A||1!==M?" scale("+A+","+M+")":""),void 0;e=n=1,i=s=0}h=1,r=a=o=l=u=f=0,p=F?-1/F:0,_=S.zOrigin,d=1e-6,T=",",w="0",O=R*N,O&&(m=Math.cos(O),g=Math.sin(O),o=-g,u=p*-g,r=e*g,a=s*g,h=m,p*=m,e*=m,s*=m),O=k*N,O&&(m=Math.cos(O),g=Math.sin(O),v=i*m+r*g,y=n*m+a*g,l=h*g,f=p*g,r=i*-g+r*m,a=n*-g+a*m,h*=m,p*=m,i=v,n=y),1!==D&&(r*=D,a*=D,h*=D,p*=D),1!==M&&(i*=M,n*=M,l*=M,f*=M),1!==A&&(e*=A,s*=A,o*=A,u*=A),(_||E)&&(_&&(L+=r*-_,X+=a*-_,z+=h*-_+_),E&&(L+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i),X+=S.yOrigin-(S.xOrigin*s+S.yOrigin*n)),d>L&&L>-d&&(L=w),d>X&&X>-d&&(X=w),d>z&&z>-d&&(z=0)),x=S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix3d(":"matrix3d(",x+=(d>e&&e>-d?w:e)+T+(d>s&&s>-d?w:s)+T+(d>o&&o>-d?w:o),x+=T+(d>u&&u>-d?w:u)+T+(d>i&&i>-d?w:i)+T+(d>n&&n>-d?w:n),k||R?(x+=T+(d>l&&l>-d?w:l)+T+(d>f&&f>-d?w:f)+T+(d>r&&r>-d?w:r),x+=T+(d>a&&a>-d?w:a)+T+(d>h&&h>-d?w:h)+T+(d>p&&p>-d?w:p)+T):x+=",0,0,0,0,1,0,",x+=L+T+X+T+z+T+(F?1+-z/F:1)+")",C[we]=x};h=Ce.prototype,h.x=h.y=h.z=h.skewX=h.skewY=h.rotation=h.rotationX=h.rotationY=h.zOrigin=h.xPercent=h.yPercent=0,h.scaleX=h.scaleY=h.scaleZ=1,ve("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(t,e,i,r,n,o,l){if(r._lastParsedTransform===l)return n;r._lastParsedTransform=l;var h,u,f,p,c,_,d,m=r._transform=De(t,s,!0,l.parseTransform),g=t.style,v=1e-6,y=Te.length,x=l,T={};if("string"==typeof x.transform&&we)f=F.style,f[we]=x.transform,f.display="block",f.position="absolute",z.body.appendChild(F),h=De(F,null,!1),z.body.removeChild(F);else if("object"==typeof x){if(h={scaleX:ne(null!=x.scaleX?x.scaleX:x.scale,m.scaleX),scaleY:ne(null!=x.scaleY?x.scaleY:x.scale,m.scaleY),scaleZ:ne(x.scaleZ,m.scaleZ),x:ne(x.x,m.x),y:ne(x.y,m.y),z:ne(x.z,m.z),xPercent:ne(x.xPercent,m.xPercent),yPercent:ne(x.yPercent,m.yPercent),perspective:ne(x.transformPerspective,m.perspective)},d=x.directionalRotation,null!=d)if("object"==typeof d)for(f in d)x[f]=d[f];else x.rotation=d;"string"==typeof x.x&&-1!==x.x.indexOf("%")&&(h.x=0,h.xPercent=ne(x.x,m.xPercent)),"string"==typeof x.y&&-1!==x.y.indexOf("%")&&(h.y=0,h.yPercent=ne(x.y,m.yPercent)),h.rotation=ae("rotation"in x?x.rotation:"shortRotation"in x?x.shortRotation+"_short":"rotationZ"in x?x.rotationZ:m.rotation,m.rotation,"rotation",T),Se&&(h.rotationX=ae("rotationX"in x?x.rotationX:"shortRotationX"in x?x.shortRotationX+"_short":m.rotationX||0,m.rotationX,"rotationX",T),h.rotationY=ae("rotationY"in x?x.rotationY:"shortRotationY"in x?x.shortRotationY+"_short":m.rotationY||0,m.rotationY,"rotationY",T)),h.skewX=null==x.skewX?m.skewX:ae(x.skewX,m.skewX),h.skewY=null==x.skewY?m.skewY:ae(x.skewY,m.skewY),(u=h.skewY-m.skewY)&&(h.skewX+=u,h.rotation+=u)}for(Se&&null!=x.force3D&&(m.force3D=x.force3D,_=!0),m.skewType=x.skewType||m.skewType||a.defaultSkewType,c=m.force3D||m.z||m.rotationX||m.rotationY||h.z||h.rotationX||h.rotationY||h.perspective,c||null==x.scale||(h.scaleZ=1);--y>-1;)i=Te[y],p=h[i]-m[i],(p>v||-v>p||null!=x[i]||null!=X[i])&&(_=!0,n=new _e(m,i,m[i],p,n),i in T&&(n.e=T[i]),n.xs0=0,n.plugin=o,r._overwriteProps.push(n.n));return p=x.transformOrigin,m.svg&&(p||x.svgOrigin)&&(Me(t,re(p),h,x.svgOrigin),n=new _e(m,"xOrigin",m.xOrigin,h.xOrigin-m.xOrigin,n,-1,"transformOrigin"),n.b=m.xOrigin,n.e=n.xs0=h.xOrigin,n=new _e(m,"yOrigin",m.yOrigin,h.yOrigin-m.yOrigin,n,-1,"transformOrigin"),n.b=m.yOrigin,n.e=n.xs0=h.yOrigin,p=xe?null:"0px 0px"),(p||Se&&c&&m.zOrigin)&&(we?(_=!0,i=Pe,p=(p||Q(t,i,s,!1,"50% 50%"))+"",n=new _e(g,i,0,0,n,-1,"transformOrigin"),n.b=g[i],n.plugin=o,Se?(f=m.zOrigin,p=p.split(" "),m.zOrigin=(p.length>2&&(0===f||"0px"!==p[2])?parseFloat(p[2]):f)||0,n.xs0=n.e=p[0]+" "+(p[1]||"50%")+" 0px",n=new _e(m,"zOrigin",0,0,n,-1,n.n),n.b=f,n.xs0=n.e=m.zOrigin):n.xs0=n.e=p):re(p+"",m)),_&&(r._transformType=m.svg&&xe||!c&&3!==this._transformType?2:3),n},prefix:!0}),ve("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),ve("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,l,h,u,f,p,c,_,d,m,g,v,y,x,T,w,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(d=parseFloat(t.offsetWidth),m=parseFloat(t.offsetHeight),o=e.split(" "),l=0;b.length>l;l++)this.p.indexOf("border")&&(b[l]=G(b[l])),f=u=Q(t,b[l],s,!1,"0px"),-1!==f.indexOf(" ")&&(u=f.split(" "),f=u[0],u=u[1]),p=h=o[l],c=parseFloat(f),v=f.substr((c+"").length),y="="===p.charAt(1),y?(_=parseInt(p.charAt(0)+"1",10),p=p.substr(2),_*=parseFloat(p),g=p.substr((_+"").length-(0>_?1:0))||""):(_=parseFloat(p),g=p.substr((_+"").length)),""===g&&(g=r[i]||v),g!==v&&(x=Z(t,"borderLeft",c,v),T=Z(t,"borderTop",c,v),"%"===g?(f=100*(x/d)+"%",u=100*(T/m)+"%"):"em"===g?(w=Z(t,"borderLeft",1,"em"),f=x/w+"em",u=T/w+"em"):(f=x+"px",u=T+"px"),y&&(p=parseFloat(f)+_+g,h=parseFloat(u)+_+g)),a=de(P,b[l],f+" "+u,p+" "+h,!1,"0px",a);return a},prefix:!0,formatter:fe("0px 0px 0px 0px",!1,!0)}),ve("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,r,n,a){var o,l,h,u,f,p,c="background-position",_=s||H(t,null),m=this.format((_?d?_.getPropertyValue(c+"-x")+" "+_.getPropertyValue(c+"-y"):_.getPropertyValue(c):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==m.indexOf("%")!=(-1!==g.indexOf("%"))&&(p=Q(t,"backgroundImage").replace(O,""),p&&"none"!==p)){for(o=m.split(" "),l=g.split(" "),I.setAttribute("src",p),h=2;--h>-1;)m=o[h],u=-1!==m.indexOf("%"),u!==(-1!==l[h].indexOf("%"))&&(f=0===h?t.offsetWidth-I.width:t.offsetHeight-I.height,o[h]=u?parseFloat(m)/100*f+"px":100*(parseFloat(m)/f)+"%");m=o.join(" ")}return this.parseComplex(t.style,m,g,n,a)},formatter:re}),ve("backgroundSize",{defaultValue:"0 0",formatter:re}),ve("perspective",{defaultValue:"0px",prefix:!0}),ve("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),ve("transformStyle",{prefix:!0}),ve("backfaceVisibility",{prefix:!0}),ve("userSelect",{prefix:!0}),ve("margin",{parser:pe("marginTop,marginRight,marginBottom,marginLeft")}),ve("padding",{parser:pe("paddingTop,paddingRight,paddingBottom,paddingLeft")}),ve("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,r,n,a){var o,l,h;return 9>d?(l=t.currentStyle,h=8>d?" ":",",o="rect("+l.clipTop+h+l.clipRight+h+l.clipBottom+h+l.clipLeft+")",e=this.format(e).split(",").join(h)):(o=this.format(Q(t,this.p,s,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),ve("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),ve("autoRound,strictUnits",{parser:function(t,e,i,r,s){return s}}),ve("border",{defaultValue:"0px solid #000",parser:function(t,e,i,r,n,a){return this.parseComplex(t.style,this.format(Q(t,"borderTopWidth",s,!1,"0px")+" "+Q(t,"borderTopStyle",s,!1,"solid")+" "+Q(t,"borderTopColor",s,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(ue)||["#000"])[0]}}),ve("borderWidth",{parser:pe("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),ve("float,cssFloat,styleFloat",{parser:function(t,e,i,r,s){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new _e(n,a,0,0,s,-1,i,!1,0,n[a],e)}});var Xe=function(t){var e,i=this.t,r=i.filter||Q(this.data,"filter")||"",s=0|this.s+this.c*t;100===s&&(-1===r.indexOf("atrix(")&&-1===r.indexOf("radient(")&&-1===r.indexOf("oader(")?(i.removeAttribute("filter"),e=!Q(this.data,"filter")):(i.filter=r.replace(b,""),e=!0)),e||(this.xn1&&(i.filter=r=r||"alpha(opacity="+s+")"),-1===r.indexOf("pacity")?0===s&&this.xn1||(i.filter=r+" alpha(opacity="+s+")"):i.filter=r.replace(T,"opacity="+s))};ve("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,r,n,a){var o=parseFloat(Q(t,"opacity",s,!1,"1")),l=t.style,h="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),h&&1===o&&"hidden"===Q(t,"visibility",s)&&0!==e&&(o=0),U?n=new _e(l,"opacity",o,e-o,n):(n=new _e(l,"opacity",100*o,100*(e-o),n),n.xn1=h?1:0,l.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Xe),h&&(n=new _e(l,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",r._overwriteProps.push(n.n),r._overwriteProps.push(i)),n}});var ze=function(t,e){e&&(t.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),t.removeProperty(e.replace(S,"-$1").toLowerCase())):t.removeAttribute(e))},Ee=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:ze(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};ve("className",{parser:function(t,e,r,n,a,o,l){var h,u,f,p,c,_=t.getAttribute("class")||"",d=t.style.cssText;if(a=n._classNamePT=new _e(t,r,0,0,a,2),a.setRatio=Ee,a.pr=-11,i=!0,a.b=_,u=K(t,s),f=t._gsClassPT){for(p={},c=f.data;c;)p[c.p]=1,c=c._next;f.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:_.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),t.setAttribute("class",a.e),h=J(t,u,K(t),l,p),t.setAttribute("class",_),a.data=h.firstMPT,t.style.cssText=d,a=a.xfirst=n.parse(t,h.difs,a,o)}});var Fe=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,r,s,n,a=this.t.style,o=l.transform.parse;if("all"===this.e)a.cssText="",s=!0;else for(e=this.e.split(" ").join("").split(","),r=e.length;--r>-1;)i=e[r],l[i]&&(l[i].parse===o?s=!0:i="transformOrigin"===i?Pe:l[i].p),ze(a,i);s&&(ze(a,we),n=this.t._gsTransform,n&&(n.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(ve("clearProps",{parser:function(t,e,r,s,n){return n=new _e(t,r,0,0,n,2),n.setRatio=Fe,n.e=e,n.pr=-10,n.data=s._tween,i=!0,n}}),h="bezier,throwProps,physicsProps,physics2D".split(","),me=h.length;me--;)ye(h[me]);h=a.prototype,h._firstPT=h._lastParsedTransform=h._transform=null,h._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,u=e.autoRound,i=!1,r=e.suffixMap||a.suffixMap,s=H(t,""),n=this._overwriteProps;var h,c,d,m,g,v,y,x,T,b=t.style;if(f&&""===b.zIndex&&(h=Q(t,"zIndex",s),("auto"===h||""===h)&&this._addLazySet(b,"zIndex",0)),"string"==typeof e&&(m=b.cssText,h=K(t,s),b.cssText=m+";"+e,h=J(t,h,K(t)).difs,!U&&w.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,b.cssText=m),this._firstPT=c=e.className?l.className.parse(t,e.className,"className",this,null,null,e):this.parse(t,e,null),this._transformType){for(T=3===this._transformType,we?p&&(f=!0,""===b.zIndex&&(y=Q(t,"zIndex",s),("auto"===y||""===y)&&this._addLazySet(b,"zIndex",0)),_&&this._addLazySet(b,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(T?"visible":"hidden"))):b.zoom=1,d=c;d&&d._next;)d=d._next;x=new _e(t,"transform",0,0,null,2),this._linkCSSP(x,null,d),x.setRatio=we?Le:Ne,x.data=this._transform||De(t,s,!0),x.tween=o,x.pr=-1,n.pop()}if(i){for(;c;){for(v=c._next,d=m;d&&d.pr>c.pr;)d=d._next;(c._prev=d?d._prev:g)?c._prev._next=c:m=c,(c._next=d)?d._prev=c:g=c,c=v}this._firstPT=m}return!0},h.parse=function(t,e,i,n){var a,o,h,f,p,c,_,d,m,g,v=t.style;for(a in e)c=e[a],o=l[a],o?i=o.parse(t,c,a,this,i,n,e):(p=Q(t,a,s)+"",m="string"==typeof c,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||m&&P.test(c)?(m||(c=he(c),c=(c.length>3?"rgba(":"rgb(")+c.join(",")+")"),i=de(v,a,p,c,!0,"transparent",i,0,n)):!m||-1===c.indexOf(" ")&&-1===c.indexOf(",")?(h=parseFloat(p),_=h||0===h?p.substr((h+"").length):"",(""===p||"auto"===p)&&("width"===a||"height"===a?(h=ie(t,a,s),_="px"):"left"===a||"top"===a?(h=$(t,a,s),_="px"):(h="opacity"!==a?0:1,_="")),g=m&&"="===c.charAt(1),g?(f=parseInt(c.charAt(0)+"1",10),c=c.substr(2),f*=parseFloat(c),d=c.replace(x,"")):(f=parseFloat(c),d=m?c.replace(x,""):""),""===d&&(d=a in r?r[a]:_),c=f||0===f?(g?f+h:f)+d:e[a],_!==d&&""!==d&&(f||0===f)&&h&&(h=Z(t,a,h,_),"%"===d?(h/=Z(t,a,100,"%")/100,e.strictUnits!==!0&&(p=h+"%")):"em"===d?h/=Z(t,a,1,"em"):"px"!==d&&(f=Z(t,a,f,d),d="px"),g&&(f||0===f)&&(c=f+h+d)),g&&(f+=h),!h&&0!==h||!f&&0!==f?void 0!==v[a]&&(c||"NaN"!=c+""&&null!=c)?(i=new _e(v,a,f||h||0,0,i,-1,a,!1,0,p,c),i.xs0="none"!==c||"display"!==a&&-1===a.indexOf("Style")?c:p):V("invalid "+a+" tween value: "+e[a]):(i=new _e(v,a,h,f-h,i,0,a,u!==!1&&("px"===d||"zIndex"===a),0,p,c),i.xs0=d)):i=de(v,a,p,c,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);
return i},h.setRatio=function(t){var e,i,r,s=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;s;){if(e=s.c*t+s.s,s.r?e=Math.round(e):n>e&&e>-n&&(e=0),s.type)if(1===s.type)if(r=s.l,2===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2;else if(3===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3;else if(4===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4;else if(5===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4+s.xn4+s.xs5;else{for(i=s.xs0+e+s.xs1,r=1;s.l>r;r++)i+=s["xn"+r]+s["xs"+(r+1)];s.t[s.p]=i}else-1===s.type?s.t[s.p]=s.xs0:s.setRatio&&s.setRatio(t);else s.t[s.p]=e+s.xs0;s=s._next}else for(;s;)2!==s.type?s.t[s.p]=s.b:s.setRatio(t),s=s._next;else for(;s;)2!==s.type?s.t[s.p]=s.e:s.setRatio(t),s=s._next},h._enableTransforms=function(t){this._transform=this._transform||De(this._target,s,!0),this._transformType=this._transform.svg&&xe||!t&&3!==this._transformType?2:3};var Ie=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};h._addLazySet=function(t,e,i){var r=this._firstPT=new _e(t,e,0,0,this._firstPT,2);r.e=i,r.setRatio=Ie,r.data=this},h._linkCSSP=function(t,e,i,r){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,r=!0),i?i._next=t:r||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},h._kill=function(e){var i,r,s,n=e;if(e.autoAlpha||e.alpha){n={};for(r in e)n[r]=e[r];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(s=i.xfirst,s&&s._prev?this._linkCSSP(s._prev,i._next,s._prev._prev):s===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,s._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var Ye=function(t,e,i){var r,s,n,a;if(t.slice)for(s=t.length;--s>-1;)Ye(t[s],e,i);else for(r=t.childNodes,s=r.length;--s>-1;)n=r[s],a=n.type,n.style&&(e.push(K(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||Ye(n,e,i)};return a.cascadeTo=function(t,i,r){var s,n,a,o,l=e.to(t,i,r),h=[l],u=[],f=[],p=[],c=e._internals.reservedProps;for(t=l._targets||l.target,Ye(t,u,p),l.render(i,!0,!0),Ye(t,f),l.render(0,!0,!0),l._enabled(!0),s=p.length;--s>-1;)if(n=J(p[s],u[s],f[s]),n.firstMPT){n=n.difs;for(a in r)c[a]&&(n[a]=r[a]);o={};for(a in n)o[a]=u[s][a];h.push(e.fromTo(p[s],i,o,n))}return h},t.activate([a]),a},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=e())}("CSSPlugin");/*!
 * VERSION: beta 1.15.2
 * DATE: 2015-01-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=_gsScope.GreenSockGlobals||_gsScope,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},c=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},p=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},f=u("Back",p("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),p("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),p("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),p=u,f=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--p>-1;)i=f?Math.random():1/u*p,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),f?s+=Math.random()*r-.5*r:p%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new c(1,1,null),p=u;--p>-1;)a=l[p],o=new c(a.x,a.y,o);this._prev=new c(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t>=1?t:1,this._p2=(e||s)/(1>t?t:1),this._p3=this._p2/a*(Math.asin(1/this._p1)||0),this._p2=a/this._p2},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),f},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],h(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));h(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=s._internals={},o=n.isSelector,h=n.isArray,l=n.lazyTweens,_=n.lazyRender,u=[],f=_gsScope._gsDefine.globals,c=function(t){var e,i={};for(e in t)i[e]=t[e];return i},p=a.pauseCallback=function(t,e,i,s){var n,a=t._timeline,o=a._totalTime,h=t._startTime,l=0>t._rawPrevTime||0===t._rawPrevTime&&a._reversed,_=l?0:r,f=l?r:0;if(e||!this._forcingPlayhead){for(a.pause(h),n=t._prev;n&&n._startTime===h;)n._rawPrevTime=f,n=n._prev;for(n=t._next;n&&n._startTime===h;)n._rawPrevTime=_,n=n._next;e&&e.apply(s||a.vars.callbackScope||a,i||u),(this._forcingPlayhead||!a._paused)&&a.seek(o)}},m=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},d=s.prototype=new e;return s.version="1.17.0",d.constructor=s,d.kill()._gc=d._forcingPlayhead=!1,d.to=function(t,e,s,r){var n=s.repeat&&f.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},d.from=function(t,e,s,r){return this.add((s.repeat&&f.TweenMax||i).from(t,e,s),r)},d.fromTo=function(t,e,s,r,n){var a=r.repeat&&f.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},d.staggerTo=function(t,e,r,n,a,h,l,_){var u,f=new s({onComplete:h,onCompleteParams:l,callbackScope:_,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],o(t)&&(t=m(t)),n=n||0,0>n&&(t=m(t),t.reverse(),n*=-1),u=0;t.length>u;u++)r.startAt&&(r.startAt=c(r.startAt)),f.to(t[u],e,c(r),u*n);return this.add(f,a)},d.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},d.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},d.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},d.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},d.add=function(r,n,a,o){var l,_,u,f,c,p;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&h(r)){for(a=a||"normal",o=o||0,l=n,_=r.length,u=0;_>u;u++)h(f=r[u])&&(f=new s({tweens:f})),this.add(f,l),"string"!=typeof f&&"function"!=typeof f&&("sequence"===a?l=f._startTime+f.totalDuration()/f._timeScale:"start"===a&&(f._startTime-=f.delay())),l+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(c=this,p=c.rawTime()>r._startTime;c._timeline;)p&&c._timeline.smoothChildTiming?c.totalTime(c._totalTime,!0):c._gc&&c._enabled(!0,!1),c=c._timeline;return this},d.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&h(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},d._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},d.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},d.insert=d.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},d.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},d.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},d.addPause=function(t,e,s,r){var n=i.delayedCall(0,p,["{self}",e,s,r],this);return n.data="isPause",this.add(n,t)},d.removeLabel=function(t){return delete this._labels[t],this},d.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},d._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&h(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},d.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},d.stop=function(){return this.paused(!0)},d.gotoAndPlay=function(t,e){return this.play(t,e)},d.gotoAndStop=function(t,e){return this.pause(t,e)},d.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,h,u=this._dirty?this.totalDuration():this._totalDuration,f=this._time,c=this._startTime,p=this._timeScale,m=this._paused;if(t>=u)this._totalTime=this._time=u,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",h=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=u+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==f||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(h=n=!0,o="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(h=!0)}else this._totalTime=this._time=this._rawPrevTime=t;if(this._time!==f&&this._first||i||h){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._time&&(e||this._callback("onStart")),this._time>=f)for(s=this._first;s&&(a=s._next,!this._paused||m);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||m);)(s._active||f>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||(l.length&&_(),this._callback("onUpdate"))),o&&(this._gc||(c===this._startTime||p!==this._timeScale)&&(0===this._time||u>=this.totalDuration())&&(n&&(l.length&&_(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this._callback(o)))}},d._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},d.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},d.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},d.recent=function(){return this._recent},d._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},d.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},d._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},d.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},d.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},d._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},d.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},d.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},d.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},d.paused=function(e){if(!e)for(var i=this._first,s=this._time;i;)i._startTime===s&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},d.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},d.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("./TweenLite.js"),module.exports=e())}("TimelineLite");
/*!
 * VERSION: 1.16.1
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(t,e){"use strict";var i=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!i.TweenLite){var s,r,n,a,o,l=function(t){var e,s=t.split("."),r=i;for(e=0;s.length>e;e++)r[s[e]]=r=r[s[e]]||{};return r},h=l("com.greensock"),_=1e-10,u=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},m=function(){},f=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),c={},p=function(s,r,n,a){this.sc=c[s]?c[s].sc:[],c[s]=this,this.gsClass=null,this.func=n;var o=[];this.check=function(h){for(var _,u,m,f,d=r.length,v=d;--d>-1;)(_=c[r[d]]||new p(r[d],[])).gsClass?(o[d]=_.gsClass,v--):h&&_.sc.push(this);if(0===v&&n)for(u=("com.greensock."+s).split("."),m=u.pop(),f=l(u.join("."))[m]=this.gsClass=n.apply(n,o),a&&(i[m]=f,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+s.split(".").pop(),[],function(){return f}):s===e&&"undefined"!=typeof module&&module.exports&&(module.exports=f)),d=0;this.sc.length>d;d++)this.sc[d].check()},this.check(!0)},d=t._gsDefine=function(t,e,i,s){return new p(t,e,i,s)},v=h._class=function(t,e,i){return e=e||function(){},d(t,[],function(){return e},i),e};d.globals=i;var g=[0,0,1,1],T=[],y=v("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?g.concat(e):g},!0),w=y.map={},P=y.register=function(t,e,i,s){for(var r,n,a,o,l=e.split(","),_=l.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=l[_],r=s?v("easing."+n,null,!0):h.easing[n]||{},a=u.length;--a>-1;)o=u[a],w[n+"."+o]=w[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(n=y.prototype,n._calcEnd=!1,n.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},s=["Linear","Quad","Cubic","Quart","Quint,Strong"],r=s.length;--r>-1;)n=s[r]+",Power"+r,P(new y(null,null,1,r),n,"easeOut",!0),P(new y(null,null,2,r),n,"easeIn"+(0===r?",easeNone":"")),P(new y(null,null,3,r),n,"easeInOut");w.linear=h.easing.Linear.easeIn,w.swing=h.easing.Quad.easeInOut;var b=v("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});n=b.prototype,n.addEventListener=function(t,e,i,s,r){r=r||0;var n,l,h=this._listeners[t],_=0;for(null==h&&(this._listeners[t]=h=[]),l=h.length;--l>-1;)n=h[l],n.c===e&&n.s===i?h.splice(l,1):0===_&&r>n.pr&&(_=l+1);h.splice(_,0,{c:e,s:i,up:s,pr:r}),this!==a||o||a.wake()},n.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},n.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s&&(s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i))};var k=t.requestAnimationFrame,S=t.cancelAnimationFrame,A=Date.now||function(){return(new Date).getTime()},x=A();for(s=["ms","moz","webkit","o"],r=s.length;--r>-1&&!k;)k=t[s[r]+"RequestAnimationFrame"],S=t[s[r]+"CancelAnimationFrame"]||t[s[r]+"CancelRequestAnimationFrame"];v("Ticker",function(t,e){var i,s,r,n,l,h=this,u=A(),f=e!==!1&&k,c=500,p=33,d="tick",v=function(t){var e,a,o=A()-x;o>c&&(u+=o-p),x+=o,h.time=(x-u)/1e3,e=h.time-l,(!i||e>0||t===!0)&&(h.frame++,l+=e+(e>=n?.004:n-e),a=!0),t!==!0&&(r=s(v)),a&&h.dispatchEvent(d)};b.call(h),h.time=h.frame=0,h.tick=function(){v(!0)},h.lagSmoothing=function(t,e){c=t||1/_,p=Math.min(e,c,0)},h.sleep=function(){null!=r&&(f&&S?S(r):clearTimeout(r),s=m,r=null,h===a&&(o=!1))},h.wake=function(){null!==r?h.sleep():h.frame>10&&(x=A()-c+5),s=0===i?m:f&&k?k:function(t){return setTimeout(t,0|1e3*(l-h.time)+1)},h===a&&(o=!0),v(2)},h.fps=function(t){return arguments.length?(i=t,n=1/(i||60),l=this.time+n,h.wake(),void 0):i},h.useRAF=function(t){return arguments.length?(h.sleep(),f=t,h.fps(i),void 0):f},h.fps(t),setTimeout(function(){f&&5>h.frame&&h.useRAF(!1)},1500)}),n=h.Ticker.prototype=new h.events.EventDispatcher,n.constructor=h.Ticker;var R=v("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,B){o||a.wake();var i=this.vars.useFrames?q:B;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});a=R.ticker=new h.Ticker,n=R.prototype,n._dirty=n._gc=n._initted=n._paused=!1,n._totalTime=n._time=0,n._rawPrevTime=-1,n._next=n._last=n._onUpdate=n._timeline=n.timeline=null,n._paused=!1;var C=function(){o&&A()-x>2e3&&a.wake(),setTimeout(C,2e3)};C(),n.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},n.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},n.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},n.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},n.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},n.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},n.render=function(){},n.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},n.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},n._enabled=function(t,e){return o||a.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},n._kill=function(){return this._enabled(!1,!1)},n.kill=function(t,e){return this._kill(t,e),this},n._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},n._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},n.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=f(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},n.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},n.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},n.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},n.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},n.totalTime=function(t,e,i){if(o||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,r=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?s-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(this.render(t,e,!1),z.length&&$())}return this},n.progress=n.totalProgress=function(t,e){return arguments.length?this.totalTime(this.duration()*t,e):this._time/this.duration()},n.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},n.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},n.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||_,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},n.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},n.paused=function(t){if(!arguments.length)return this._paused;var e,i,s=this._timeline;return t!=this._paused&&s&&(o||t||a.wake(),e=s.rawTime(),i=e-this._pauseTime,!t&&s.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!==i&&this._initted&&this.duration()&&this.render(s.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,!0,!0)),this._gc&&!t&&this._enabled(!0,!1),this};var D=v("core.SimpleTimeline",function(t){R.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});n=D.prototype=new R,n.constructor=D,n.kill()._gc=!1,n._first=n._last=n._recent=null,n._sortChildren=!1,n.add=n.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._recent=t,this._timeline&&this._uncache(!0),this},n._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},n.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},n.rawTime=function(){return o||a.wake(),this._totalTime};var I=v("TweenLite",function(e,i,s){if(R.call(this,i,s),this.render=I.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:I.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),l=this.vars.overwrite;if(this._overwrite=l=null==l?Q[I.defaultOverwrite]:"number"==typeof l?l>>0:Q[l],(o||e instanceof Array||e.push&&f(e))&&"number"!=typeof e[0])for(this._targets=a=u(e),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(u(n))):(this._siblings[r]=K(n,this,!1),1===l&&this._siblings[r].length>1&&J(n,this,null,1,this._siblings[r])):(n=a[r--]=I.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=K(e,this,!1),1===l&&this._siblings.length>1&&J(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-_,this.render(-this._delay))},!0),E=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},O=function(t,e){var i,s={};for(i in t)G[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!U[i]||U[i]&&U[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};n=I.prototype=new R,n.constructor=I,n.kill()._gc=!1,n.ratio=0,n._firstPT=n._targets=n._overwrittenProps=n._startAt=null,n._notifyPluginsOfEnabled=n._lazy=!1,I.version="1.16.1",I.defaultEase=n._ease=new y(null,null,1,1),I.defaultOverwrite="auto",I.ticker=a,I.autoSleep=120,I.lagSmoothing=function(t,e){a.lagSmoothing(t,e)},I.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(I.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var z=[],L={},N=I._internals={isArray:f,isSelector:E,lazyTweens:z},U=I._plugins={},F=N.tweenLookup={},j=0,G=N.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1},Q={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},q=R._rootFramesTimeline=new D,B=R._rootTimeline=new D,M=30,$=N.lazyRender=function(){var t,e=z.length;for(L={};--e>-1;)t=z[e],t&&t._lazy!==!1&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);z.length=0};B._startTime=a.time,q._startTime=a.frame,B._active=q._active=!0,setTimeout($,1),R._updateRoot=I.render=function(){var t,e,i;if(z.length&&$(),B.render((a.time-B._startTime)*B._timeScale,!1,!1),q.render((a.frame-q._startTime)*q._timeScale,!1,!1),z.length&&$(),a.frame>=M){M=a.frame+(parseInt(I.autoSleep,10)||120);for(i in F){for(e=F[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete F[i]}if(i=B._first,(!i||i._paused)&&I.autoSleep&&!q._first&&1===a._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||a.sleep()}}},a.addEventListener("tick",R._updateRoot);var K=function(t,e,i){var s,r,n=t._gsTweenID;if(F[n||(t._gsTweenID=n="t"+j++)]||(F[n]={target:t,tweens:[]}),e&&(s=F[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return F[n].tweens},H=function(t,e,i,s){var r,n,a=t.vars.onOverwrite;return a&&(r=a(t,e,i,s)),a=I.onOverwrite,a&&(n=a(t,e,i,s)),r!==!1&&n!==!1},J=function(t,e,i,s,r){var n,a,o,l;if(1===s||s>=4){for(l=r.length,n=0;l>n;n++)if((o=r[n])!==e)o._gc||H(o,e)&&o._enabled(!1,!1)&&(a=!0);else if(5===s)break;return a}var h,u=e._startTime+_,m=[],f=0,c=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(h=h||V(e,0,c),0===V(o,h,c)&&(m[f++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((c||!o._initted)&&2e-10>=u-o._startTime||(m[f++]=o)));for(n=f;--n>-1;)if(o=m[n],2===s&&o._kill(i,t,e)&&(a=!0),2!==s||!o._firstPT&&o._initted){if(2!==s&&!H(o,e))continue;o._enabled(!1,!1)&&(a=!0)}return a},V=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*_>n-e?_:(n+=t.totalDuration()/t._timeScale/r)>e+_?0:n-e-_};n._init=function(){var t,e,i,s,r,n=this.vars,a=this._overwrittenProps,o=this._duration,l=!!n.immediateRender,h=n.ease;if(n.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),r={};for(s in n.startAt)r[s]=n.startAt[s];if(r.overwrite=!1,r.immediateRender=!0,r.lazy=l&&n.lazy!==!1,r.startAt=r.delay=null,this._startAt=I.to(this.target,0,r),l)if(this._time>0)this._startAt=null;else if(0!==o)return}else if(n.runBackwards&&0!==o)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(l=!1),i={};for(s in n)G[s]&&"autoCSS"!==s||(i[s]=n[s]);if(i.overwrite=0,i.data="isFromStart",i.lazy=l&&n.lazy!==!1,i.immediateRender=l,this._startAt=I.to(this.target,0,i),l){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=h=h?h instanceof y?h:"function"==typeof h?new y(h,n.easeParams):w[h]||I.defaultEase:I.defaultEase,n.easeParams instanceof Array&&h.config&&(this._ease=h.config.apply(h,n.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],a?a[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,a);if(e&&I._onPluginEvent("_onInitAllProps",this),a&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),n.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=n.onUpdate,this._initted=!0},n._initProps=function(e,i,s,r){var n,a,o,l,h,_;if(null==e)return!1;L[e._gsTweenID]&&$(),this.vars.css||e.style&&e!==t&&e.nodeType&&U.css&&this.vars.autoCSS!==!1&&O(this.vars,e);for(n in this.vars){if(_=this.vars[n],G[n])_&&(_ instanceof Array||_.push&&f(_))&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(U[n]&&(l=new U[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=h={_next:this._firstPT,t:l,p:"setRatio",s:0,c:1,f:!0,n:n,pg:!0,pr:l._priority},a=l._overwriteProps.length;--a>-1;)i[l._overwriteProps[a]]=this._firstPT;(l._priority||l._onInitAllProps)&&(o=!0),(l._onDisable||l._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[n]=h={_next:this._firstPT,t:e,p:n,f:"function"==typeof e[n],n:n,pg:!1,pr:0},h.s=h.f?e[n.indexOf("set")||"function"!=typeof e["get"+n.substr(3)]?n:"get"+n.substr(3)]():parseFloat(e[n]),h.c="string"==typeof _&&"="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*Number(_.substr(2)):Number(_)-h.s||0;h&&h._next&&(h._next._prev=h)}return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&J(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(L[e._gsTweenID]=!0),o)},n.render=function(t,e,i){var s,r,n,a,o=this._time,l=this._duration,h=this._rawPrevTime;if(t>=l)this._totalTime=this._time=l,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===l&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>h||h===_&&"isPause"!==this.data)&&h!==t&&(i=!0,h>_&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||h===t?t:_);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===l&&h>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===l&&(this._initted||!this.vars.lazy||i)&&(h>=0&&(h!==_||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=a=!e||t||h===t?t:_)),this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var u=t/l,m=this._easeType,f=this._easePower;(1===m||3===m&&u>=.5)&&(u=1-u),3===m&&(u*=2),1===f?u*=u:2===f?u*=u*u:3===f?u*=u*u*u:4===f&&(u*=u*u*u*u),this.ratio=1===m?1-u:2===m?u:.5>t/l?u/2:1-u/2}else this.ratio=this._ease.getRatio(t/l);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=o,this._rawPrevTime=h,z.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/l):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===l)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||T))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&t!==-1e-4&&this._startAt.render(t,e,i),e||(this._time!==o||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||T)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&t!==-1e-4&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||T),0===l&&this._rawPrevTime===_&&a!==_&&(this._rawPrevTime=0))}},n._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:I.selector(e)||e;var s,r,n,a,o,l,h,_,u;if((f(e)||E(e))&&"number"!=typeof e[0])for(s=e.length;--s>-1;)this._kill(t,e[s])&&(l=!0);else{if(this._targets){for(s=this._targets.length;--s>-1;)if(e===this._targets[s]){o=this._propLookup[s]||{},this._overwrittenProps=this._overwrittenProps||[],r=this._overwrittenProps[s]=t?this._overwrittenProps[s]||{}:"all";break}}else{if(e!==this.target)return!1;o=this._propLookup,r=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(o){if(h=t||o,_=t!==r&&"all"!==r&&t!==o&&("object"!=typeof t||!t._tempKill),i&&(I.onOverwrite||this.vars.onOverwrite)){for(n in h)o[n]&&(u||(u=[]),u.push(n));if(!H(this,i,e,u))return!1}for(n in h)(a=o[n])&&(a.pg&&a.t._kill(h)&&(l=!0),a.pg&&0!==a.t._overwriteProps.length||(a._prev?a._prev._next=a._next:a===this._firstPT&&(this._firstPT=a._next),a._next&&(a._next._prev=a._prev),a._next=a._prev=null),delete o[n]),_&&(r[n]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return l},n.invalidate=function(){return this._notifyPluginsOfEnabled&&I._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],R.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-_,this.render(-this._delay)),this},n._enabled=function(t,e){if(o||a.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=K(s[i],this,!0);else this._siblings=K(this.target,this,!0)}return R.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?I._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},I.to=function(t,e,i){return new I(t,e,i)},I.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new I(t,e,i)},I.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new I(t,e,s)},I.delayedCall=function(t,e,i,s,r){return new I(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,lazy:!1,useFrames:r,overwrite:0})},I.set=function(t,e){return new I(t,0,e)},I.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:I.selector(t)||t;var i,s,r,n;if((f(t)||E(t))&&"number"!=typeof t[0]){for(i=t.length,s=[];--i>-1;)s=s.concat(I.getTweensOf(t[i],e));for(i=s.length;--i>-1;)for(n=s[i],r=i;--r>-1;)n===s[r]&&s.splice(i,1)}else for(s=K(t).concat(),i=s.length;--i>-1;)(s[i]._gc||e&&!s[i].isActive())&&s.splice(i,1);return s},I.killTweensOf=I.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var s=I.getTweensOf(t,e),r=s.length;--r>-1;)s[r]._kill(i,t)};var W=v("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=W.prototype},!0);if(n=W.prototype,W.version="1.10.1",W.API=2,n._firstPT=null,n._addTween=function(t,e,i,s,r,n){var a,o;return null!=s&&(a="number"==typeof s||"="!==s.charAt(1)?Number(s)-i:parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)))?(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:n},o._next&&(o._next._prev=o),o):void 0},n.setRatio=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.c*t+i.s,i.r?e=Math.round(e):s>e&&e>-s&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},n._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},n._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},I._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},W.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===W.API&&(U[(new t[e])._propName]=t[e]);return!0},d.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=v("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){W.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new W(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,W.activate([a]),a},s=t._gsQueue){for(r=0;s.length>r;r++)s[r]();for(n in c)c[n].func||t.console.log("GSAP encountered missing dependency: com.greensock."+n)}o=!1}})("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenLite");!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):"object"==typeof exports?exports.jwplayer=b():a.jwplayer=b()}(this,function(){return function(a){function b(c){if(d[c])return d[c].exports;var e=d[c]={exports:{},id:c,loaded:!1};return a[c].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c=window.webpackJsonpjwplayer;window.webpackJsonpjwplayer=function(d,f){for(var g,h,i=0,j=[];i<d.length;i++)h=d[i],e[h]&&j.push.apply(j,e[h]),e[h]=0;for(g in f)a[g]=f[g];for(c&&c(d,f);j.length;)j.shift().call(null,b)};var d={},e={0:0};return b.e=function(a,c){if(0===e[a])return c.call(null,b);if(void 0!==e[a])e[a].push(c);else{e[a]=[c];var d=document.getElementsByTagName("head")[0],f=document.createElement("script");f.type="text/javascript",f.charset="utf-8",f.async=!0,f.src=b.p+""+({1:"polyfills.promise",2:"polyfills.base64",3:"provider.youtube",4:"provider.dashjs",5:"provider.shaka",6:"provider.cast"}[a]||a)+".js",d.appendChild(f)}},b.m=a,b.c=d,b.p="",b(0)}([function(a,b,c){a.exports=c(40)},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(a,b,c){var d,e;d=[c(41),c(174),c(45)],e=function(a,b,c){return window.jwplayer?window.jwplayer:c.extend(a,b)}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(42),c(48),c(168)],e=function(a,b){return c.p=b.loadFrom(),a.selectPlayer}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(43),c(98),c(45)],e=function(a,b,c){var d=a.selectPlayer,e=function(){var a=d.apply(this,arguments);return a?a:{registerPlugin:function(a,c,d){"jwpsrv"!==a&&b.registerPlugin(a,c,d)}}};return c.extend(a,{selectPlayer:e})}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(44),c(45),c(86),c(84),c(80),c(98)],e=function(a,b,c,d,e,f){function g(a){var f=a.getName().name;if(!b.find(e,b.matches({name:f}))){if(!b.isFunction(a.supports))throw{message:"Tried to register a provider with an invalid object"};e.unshift({name:f,supports:a.supports})}var g=function(){};g.prototype=c,a.prototype=new g,d[f]=a}var h=[],i=0,j=function(b){var c,d;return b?"string"==typeof b?(c=k(b),c||(d=document.getElementById(b))):"number"==typeof b?c=h[b]:b.nodeType&&(d=b,c=k(d.id)):c=h[0],c?c:d?l(new a(d,m)):{registerPlugin:f.registerPlugin}},k=function(a){for(var b=0;b<h.length;b++)if(h[b].id===a)return h[b];return null},l=function(a){return i++,a.uniqueId=i,h.push(a),a},m=function(a){for(var b=h.length;b--;)if(h[b].uniqueId===a.uniqueId){h.splice(b,1);break}},n={selectPlayer:j,registerProvider:g,availableProviders:e,registerPlugin:f.registerPlugin};return j.api=n,n}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(46),c(62),c(47),c(48),c(61),c(60),c(45),c(63),c(165),c(166),c(167),c(59)],e=function(a,b,c,d,e,f,g,h,i,j,k,l){var m=function(f,m){var n,o=this,p=!1,q={};g.extend(this,c),this.utils=d,this._=g,this.Events=c,this.version=l,this.trigger=function(a,b){return b=g.isObject(b)?g.extend({},b):{},b.type=a,window.jwplayer&&window.jwplayer.debug?c.trigger.call(o,a,b):c.triggerSafe.call(o,a,b)},this.dispatchEvent=this.trigger,this.removeEventListener=this.off.bind(this);var r=function(){n=new h(f),i(o,n),j(o,n),n.on(a.JWPLAYER_PLAYLIST_ITEM,function(){q={}}),n.on(a.JWPLAYER_MEDIA_META,function(a){g.extend(q,a.metadata)}),n.on(a.JWPLAYER_READY,function(a){p=!0,s.tick("ready"),a.setupTime=s.between("setup","ready")}),n.on("all",o.trigger)};r(),k(this),this.id=f.id;var s=this._qoe=new e;s.tick("init");var t=function(){p=!1,q={},o.off(),n&&n.off(),n&&n.playerDestroy&&n.playerDestroy()};return this.getPlugin=function(a){return o.plugins&&o.plugins[a]},this.addPlugin=function(a,b){this.plugins=this.plugins||{},this.plugins[a]=b,this.onReady(b.addToPlayer),b.resize&&this.onResize(b.resizeHandler)},this.setup=function(a){return s.tick("setup"),t(),r(),d.foreach(a.events,function(a,b){var c=o[a];"function"==typeof c&&c.call(o,b)}),a.id=o.id,n.setup(a,this),o},this.qoe=function(){var b=n.getItemQoe(),c=s.between("setup","ready"),d=b.between(a.JWPLAYER_MEDIA_PLAY_ATTEMPT,a.JWPLAYER_MEDIA_FIRST_FRAME);return{setupTime:c,firstFrame:d,player:s.dump(),item:b.dump()}},this.getContainer=function(){return n.getContainer?n.getContainer():f},this.getMeta=this.getItemMeta=function(){return q},this.getPlaylistItem=function(a){if(!d.exists(a))return n._model.get("playlistItem");var b=o.getPlaylist();return b?b[a]:null},this.getRenderingMode=function(){return"html5"},this.load=function(a){var b=this.getPlugin("vast")||this.getPlugin("googima");return b&&b.destroy(),n.load(a),o},this.play=function(a,c){if(g.isBoolean(a)||(c=a),c||(c={reason:"external"}),a===!0)return n.play(c),o;if(a===!1)return n.pause(),o;switch(a=o.getState()){case b.PLAYING:case b.BUFFERING:n.pause();break;default:n.play(c)}return o},this.pause=function(a){return g.isBoolean(a)?this.play(!a):this.play()},this.createInstream=function(){return n.createInstream()},this.castToggle=function(){n&&n.castToggle&&n.castToggle()},this.playAd=this.pauseAd=d.noop,this.remove=function(){return m(o),o.trigger("remove"),t(),o},this};return m}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a={},b=Array.prototype,c=Object.prototype,d=Function.prototype,e=b.slice,f=b.concat,g=c.toString,h=c.hasOwnProperty,i=b.map,j=b.reduce,k=b.forEach,l=b.filter,m=b.every,n=b.some,o=b.indexOf,p=Array.isArray,q=Object.keys,r=d.bind,s=function(a){return a instanceof s?a:this instanceof s?void 0:new s(a)},t=s.each=s.forEach=function(b,c,d){if(null==b)return b;if(k&&b.forEach===k)b.forEach(c,d);else if(b.length===+b.length){for(var e=0,f=b.length;f>e;e++)if(c.call(d,b[e],e,b)===a)return}else for(var g=s.keys(b),e=0,f=g.length;f>e;e++)if(c.call(d,b[g[e]],g[e],b)===a)return;return b};s.map=s.collect=function(a,b,c){var d=[];return null==a?d:i&&a.map===i?a.map(b,c):(t(a,function(a,e,f){d.push(b.call(c,a,e,f))}),d)};var u="Reduce of empty array with no initial value";s.reduce=s.foldl=s.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),j&&a.reduce===j)return d&&(b=s.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(t(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(u);return c},s.find=s.detect=function(a,b,c){var d;return v(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},s.filter=s.select=function(a,b,c){var d=[];return null==a?d:l&&a.filter===l?a.filter(b,c):(t(a,function(a,e,f){b.call(c,a,e,f)&&d.push(a)}),d)},s.reject=function(a,b,c){return s.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},s.compact=function(a){return s.filter(a,s.identity)},s.every=s.all=function(b,c,d){c||(c=s.identity);var e=!0;return null==b?e:m&&b.every===m?b.every(c,d):(t(b,function(b,f,g){return(e=e&&c.call(d,b,f,g))?void 0:a}),!!e)};var v=s.some=s.any=function(b,c,d){c||(c=s.identity);var e=!1;return null==b?e:n&&b.some===n?b.some(c,d):(t(b,function(b,f,g){return e||(e=c.call(d,b,f,g))?a:void 0}),!!e)};s.size=function(a){return null==a?0:a.length===+a.length?a.length:s.keys(a).length},s.after=function(a,b){return function(){return--a<1?b.apply(this,arguments):void 0}},s.before=function(a,b){var c;return function(){return--a>0&&(c=b.apply(this,arguments)),1>=a&&(b=null),c}};var w=function(a){return null==a?s.identity:s.isFunction(a)?a:s.property(a)};s.sortedIndex=function(a,b,c,d){c=w(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;c.call(d,a[h])<e?f=h+1:g=h}return f};var v=s.some=s.any=function(b,c,d){c||(c=s.identity);var e=!1;return null==b?e:n&&b.some===n?b.some(c,d):(t(b,function(b,f,g){return e||(e=c.call(d,b,f,g))?a:void 0}),!!e)};s.contains=s.include=function(a,b){return null==a?!1:(a.length!==+a.length&&(a=s.values(a)),s.indexOf(a,b)>=0)},s.where=function(a,b){return s.filter(a,s.matches(b))},s.findWhere=function(a,b){return s.find(a,s.matches(b))},s.max=function(a,b,c){if(!b&&s.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);var d=-(1/0),e=-(1/0);return t(a,function(a,f,g){var h=b?b.call(c,a,f,g):a;h>e&&(d=a,e=h)}),d},s.difference=function(a){var c=f.apply(b,e.call(arguments,1));return s.filter(a,function(a){return!s.contains(c,a)})},s.without=function(a){return s.difference(a,e.call(arguments,1))},s.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=s.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(o&&a.indexOf===o)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1};var x=function(){};s.bind=function(a,b){var c,d;if(r&&a.bind===r)return r.apply(a,e.call(arguments,1));if(!s.isFunction(a))throw new TypeError;return c=e.call(arguments,2),d=function(){if(!(this instanceof d))return a.apply(b,c.concat(e.call(arguments)));x.prototype=a.prototype;var f=new x;x.prototype=null;var g=a.apply(f,c.concat(e.call(arguments)));return Object(g)===g?g:f}},s.partial=function(a){var b=e.call(arguments,1);return function(){for(var c=0,d=b.slice(),e=0,f=d.length;f>e;e++)d[e]===s&&(d[e]=arguments[c++]);for(;c<arguments.length;)d.push(arguments[c++]);return a.apply(this,d)}},s.once=s.partial(s.before,2),s.memoize=function(a,b){var c={};return b||(b=s.identity),function(){var d=b.apply(this,arguments);return s.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},s.delay=function(a,b){var c=e.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},s.defer=function(a){return s.delay.apply(s,[a,1].concat(e.call(arguments,1)))},s.throttle=function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:s.now(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=s.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}},s.keys=function(a){if(!s.isObject(a))return[];if(q)return q(a);var b=[];for(var c in a)s.has(a,c)&&b.push(c);return b},s.invert=function(a){for(var b={},c=s.keys(a),d=0,e=c.length;e>d;d++)b[a[c[d]]]=c[d];return b},s.defaults=function(a){return t(e.call(arguments,1),function(b){if(b)for(var c in b)void 0===a[c]&&(a[c]=b[c])}),a},s.extend=function(a){return t(e.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},s.pick=function(a){var c={},d=f.apply(b,e.call(arguments,1));return t(d,function(b){b in a&&(c[b]=a[b])}),c},s.omit=function(a){var c={},d=f.apply(b,e.call(arguments,1));for(var g in a)s.contains(d,g)||(c[g]=a[g]);return c},s.clone=function(a){return s.isObject(a)?s.isArray(a)?a.slice():s.extend({},a):a},s.isArray=p||function(a){return"[object Array]"==g.call(a)},s.isObject=function(a){return a===Object(a)},t(["Arguments","Function","String","Number","Date","RegExp"],function(a){s["is"+a]=function(b){return g.call(b)=="[object "+a+"]"}}),s.isArguments(arguments)||(s.isArguments=function(a){return!(!a||!s.has(a,"callee"))}),s.isFunction=function(a){return"function"==typeof a},s.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},s.isNaN=function(a){return s.isNumber(a)&&a!=+a},s.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==g.call(a)},s.isNull=function(a){return null===a},s.isUndefined=function(a){return void 0===a},s.has=function(a,b){return h.call(a,b)},s.identity=function(a){return a},s.constant=function(a){return function(){return a}},s.property=function(a){return function(b){return b[a]}},s.propertyOf=function(a){return null==a?function(){}:function(b){return a[b]}},s.matches=function(a){return function(b){if(b===a)return!0;for(var c in a)if(a[c]!==b[c])return!1;return!0}},s.now=Date.now||function(){return(new Date).getTime()},s.result=function(a,b){if(null==a)return void 0;var c=a[b];return s.isFunction(c)?c.call(a):c};var y=0;return s.uniqueId=function(a){var b=++y+"";return a?a+b:b},s}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a={DRAG:"drag",DRAG_START:"dragStart",DRAG_END:"dragEnd",CLICK:"click",DOUBLE_CLICK:"doubleClick",TAP:"tap",DOUBLE_TAP:"doubleTap",OVER:"over",MOVE:"move",OUT:"out"},b={COMPLETE:"complete",ERROR:"error",JWPLAYER_AD_CLICK:"adClick",JWPLAYER_AD_COMPANIONS:"adCompanions",JWPLAYER_AD_COMPLETE:"adComplete",JWPLAYER_AD_ERROR:"adError",JWPLAYER_AD_IMPRESSION:"adImpression",JWPLAYER_AD_META:"adMeta",JWPLAYER_AD_PAUSE:"adPause",JWPLAYER_AD_PLAY:"adPlay",JWPLAYER_AD_SKIPPED:"adSkipped",JWPLAYER_AD_TIME:"adTime",JWPLAYER_CAST_AD_CHANGED:"castAdChanged",JWPLAYER_MEDIA_COMPLETE:"complete",JWPLAYER_READY:"ready",JWPLAYER_MEDIA_SEEK:"seek",JWPLAYER_MEDIA_BEFOREPLAY:"beforePlay",JWPLAYER_MEDIA_BEFORECOMPLETE:"beforeComplete",JWPLAYER_MEDIA_BUFFER_FULL:"bufferFull",JWPLAYER_DISPLAY_CLICK:"displayClick",JWPLAYER_PLAYLIST_COMPLETE:"playlistComplete",JWPLAYER_CAST_SESSION:"cast",JWPLAYER_MEDIA_ERROR:"mediaError",JWPLAYER_MEDIA_FIRST_FRAME:"firstFrame",JWPLAYER_MEDIA_PLAY_ATTEMPT:"playAttempt",JWPLAYER_MEDIA_LOADED:"loaded",JWPLAYER_MEDIA_SEEKED:"seeked",JWPLAYER_SETUP_ERROR:"setupError",JWPLAYER_ERROR:"error",JWPLAYER_PLAYER_STATE:"state",JWPLAYER_CAST_AVAILABLE:"castAvailable",JWPLAYER_MEDIA_BUFFER:"bufferChange",JWPLAYER_MEDIA_TIME:"time",JWPLAYER_MEDIA_TYPE:"mediaType",JWPLAYER_MEDIA_VOLUME:"volume",JWPLAYER_MEDIA_MUTE:"mute",JWPLAYER_MEDIA_META:"meta",JWPLAYER_MEDIA_LEVELS:"levels",JWPLAYER_MEDIA_LEVEL_CHANGED:"levelsChanged",JWPLAYER_CONTROLS:"controls",JWPLAYER_FULLSCREEN:"fullscreen",JWPLAYER_RESIZE:"resize",JWPLAYER_PLAYLIST_ITEM:"playlistItem",JWPLAYER_PLAYLIST_LOADED:"playlist",JWPLAYER_AUDIO_TRACKS:"audioTracks",JWPLAYER_AUDIO_TRACK_CHANGED:"audioTrackChanged",JWPLAYER_LOGO_CLICK:"logoClick",JWPLAYER_CAPTIONS_LIST:"captionsList",JWPLAYER_CAPTIONS_CHANGED:"captionsChanged",JWPLAYER_PROVIDER_CHANGED:"providerChanged",JWPLAYER_PROVIDER_FIRST_FRAME:"providerFirstFrame",JWPLAYER_USER_ACTION:"userAction",JWPLAYER_PROVIDER_CLICK:"providerClick",JWPLAYER_VIEW_TAB_FOCUS:"tabFocus",JWPLAYER_CONTROLBAR_DRAGGING:"scrubbing",JWPLAYER_INSTREAM_CLICK:"instreamClick"};return b.touchEvents=a,b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b=[],c=b.slice,d={on:function(a,b,c){if(!f(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});var d=this._events[a]||(this._events[a]=[]);return d.push({callback:b,context:c}),this},once:function(b,c,d){if(!f(this,"once",b,[c,d])||!c)return this;var e=this,g=a.once(function(){e.off(b,g),c.apply(this,arguments)});return g._callback=c,this.on(b,g,d)},off:function(b,c,d){var e,g,h,i,j,k,l,m;if(!this._events||!f(this,"off",b,[c,d]))return this;if(!b&&!c&&!d)return this._events=void 0,this;for(i=b?[b]:a.keys(this._events),j=0,k=i.length;k>j;j++)if(b=i[j],h=this._events[b]){if(this._events[b]=e=[],c||d)for(l=0,m=h.length;m>l;l++)g=h[l],(c&&c!==g.callback&&c!==g.callback._callback||d&&d!==g.context)&&e.push(g);e.length||delete this._events[b]}return this},trigger:function(a){if(!this._events)return this;var b=c.call(arguments,1);if(!f(this,"trigger",a,b))return this;var d=this._events[a],e=this._events.all;return d&&g(d,b,this),e&&g(e,arguments,this),this},triggerSafe:function(a){if(!this._events)return this;var b=c.call(arguments,1);if(!f(this,"trigger",a,b))return this;var d=this._events[a],e=this._events.all;return d&&h(d,b,this),e&&h(e,arguments,this),this}},e=/\s+/,f=function(a,b,c,d){if(!c)return!0;if("object"==typeof c){for(var f in c)a[b].apply(a,[f,c[f]].concat(d));return!1}if(e.test(c)){for(var g=c.split(e),h=0,i=g.length;i>h;h++)a[b].apply(a,[g[h]].concat(d));return!1}return!0},g=function(a,b,c){var d,e=-1,f=a.length,g=b[0],h=b[1],i=b[2];switch(b.length){case 0:for(;++e<f;)(d=a[e]).callback.call(d.context||c);return;case 1:for(;++e<f;)(d=a[e]).callback.call(d.context||c,g);return;case 2:for(;++e<f;)(d=a[e]).callback.call(d.context||c,g,h);return;case 3:for(;++e<f;)(d=a[e]).callback.call(d.context||c,g,h,i);return;default:for(;++e<f;)(d=a[e]).callback.apply(d.context||c,b);return}},h=function(a,b,c){for(var d,e=-1,f=a.length;++e<f;)try{(d=a[e]).callback.apply(d.context||c,b)}catch(g){}};return d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51),c(45),c(52),c(53),c(55),c(49),c(56),c(50),c(57),c(60)],e=function(a,b,c,d,e,f,g,h,i,j){var k={};return k.log=function(){window.console&&("object"==typeof console.log?console.log(Array.prototype.slice.call(arguments,0)):console.log.apply(console,arguments))},k.between=function(a,b,c){return Math.max(Math.min(a,c),b)},k.foreach=function(a,b){var c,d;for(c in a)"function"===k.typeOf(a.hasOwnProperty)?a.hasOwnProperty(c)&&(d=a[c],b(c,d)):(d=a[c],b(c,d))},k.indexOf=b.indexOf,k.noop=function(){},k.seconds=a.seconds,k.prefix=a.prefix,k.suffix=a.suffix,b.extend(k,f,h,c,g,d,e,i,j),k}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(50)],e=function(a,b){function c(a){return/^(?:(?:https?|file)\:)?\/\//.test(a)}function d(b){return a.some(b,function(a){return"parsererror"===a.nodeName})}var e={};return e.getAbsolutePath=function(a,d){if(b.exists(d)||(d=document.location.href),b.exists(a)){if(c(a))return a;var e,f=d.substring(0,d.indexOf("://")+3),g=d.substring(f.length,d.indexOf("/",f.length+1));if(0===a.indexOf("/"))e=a.split("/");else{var h=d.split("?")[0];h=h.substring(f.length+g.length+1,h.lastIndexOf("/")),e=h.split("/").concat(a.split("/"))}for(var i=[],j=0;j<e.length;j++)e[j]&&b.exists(e[j])&&"."!==e[j]&&(".."===e[j]?i.pop():i.push(e[j]));return f+g+"/"+i.join("/")}},e.getScriptPath=a.memoize(function(a){for(var b=document.getElementsByTagName("script"),c=0;c<b.length;c++){var d=b[c].src;if(d&&d.indexOf(a)>=0)return d.substr(0,d.indexOf(a))}return""}),e.parseXML=function(a){var b=null;try{"DOMParser"in window?(b=(new window.DOMParser).parseFromString(a,"text/xml"),(d(b.childNodes)||b.childNodes&&d(b.childNodes[0].childNodes))&&(b=null)):(b=new window.ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a))}catch(c){}return b},e.serialize=function(a){if(void 0===a)return null;if("string"==typeof a&&a.length<6){var b=a.toLowerCase();if("true"===b)return!0;if("false"===b)return!1;if(!isNaN(Number(a))&&!isNaN(parseFloat(a)))return Number(a)}return a},e.parseDimension=function(a){return"string"==typeof a?""===a?0:a.lastIndexOf("%")>-1?a:parseInt(a.replace("px",""),10):a},e.timeFormat=function(a,b){if(0>=a&&!b)return"00:00";var c=0>a?"-":"";a=Math.abs(a);var d=Math.floor(a/3600),e=Math.floor((a-3600*d)/60),f=Math.floor(a%60);return c+(d?d+":":"")+(10>e?"0":"")+e+":"+(10>f?"0":"")+f},e.adaptiveType=function(a){if(0!==a){var b=-120;if(b>=a)return"DVR";if(0>a||a===1/0)return"LIVE"}return"VOD"},e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b={};return b.exists=function(a){switch(typeof a){case"string":return a.length>0;case"object":return null!==a;case"undefined":return!1}return!0},b.isHTTPS=function(){return 0===window.location.href.indexOf("https")},b.isRtmp=function(a,b){return 0===a.indexOf("rtmp")||"rtmp"===b},b.isYouTube=function(a,b){return"youtube"===b||/^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(a)},b.youTubeID=function(a){var b=/v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i.exec(a);return b?b.slice(1).join("").replace("?",""):""},b.typeOf=function(b){if(null===b)return"null";var c=typeof b;return"object"===c&&a.isArray(b)?"array":c},b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){function b(a){return a.indexOf("(format=m3u8-")>-1?"m3u8":!1}var c=function(a){return a.replace(/^\s+|\s+$/g,"")},d=function(a,b,c){for(a=""+a,c=c||"0";a.length<b;)a=c+a;return a},e=function(a,b){for(var c=0;c<a.attributes.length;c++)if(a.attributes[c].name&&a.attributes[c].name.toLowerCase()===b.toLowerCase())return a.attributes[c].value.toString();return""},f=function(a){if(!a||"rtmp"===a.substr(0,4))return"";var c=b(a);return c?c:(a=a.substring(a.lastIndexOf("/")+1,a.length).split("?")[0].split("#")[0],a.lastIndexOf(".")>-1?a.substr(a.lastIndexOf(".")+1,a.length).toLowerCase():void 0)},g=function(a){var b=parseInt(a/3600),c=parseInt(a/60)%60,e=a%60;return d(b,2)+":"+d(c,2)+":"+d(e.toFixed(3),6)},h=function(b){if(a.isNumber(b))return b;b=b.replace(",",".");var c=b.split(":"),d=0;return"s"===b.slice(-1)?d=parseFloat(b):"m"===b.slice(-1)?d=60*parseFloat(b):"h"===b.slice(-1)?d=3600*parseFloat(b):c.length>1?(d=parseFloat(c[c.length-1]),d+=60*parseFloat(c[c.length-2]),3===c.length&&(d+=3600*parseFloat(c[c.length-3]))):d=parseFloat(b),d},i=function(b,c){return a.map(b,function(a){return c+a})},j=function(b,c){return a.map(b,function(a){return a+c})};return{trim:c,pad:d,xmlAttribute:e,extension:f,hms:g,seconds:h,suffix:j,prefix:i}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){function b(a){return function(){return d(a)}}var c={},d=a.memoize(function(a){var b=navigator.userAgent.toLowerCase();return null!==b.match(a)}),e=c.isInt=function(a){return parseFloat(a)%1===0};c.isFlashSupported=function(){var a=c.flashVersion();return a&&a>=11.2},c.isFF=b(/firefox/i),c.isIPod=b(/iP(hone|od)/i),c.isIPad=b(/iPad/i),c.isSafari602=b(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i),c.isOSX=b(/Mac OS X/i),c.isEdge=b(/\sedge\/\d+/i);var f=c.isIETrident=function(a){return c.isEdge()?!0:a?(a=parseFloat(a).toFixed(1),d(new RegExp("trident/.+rv:\\s*"+a,"i"))):d(/trident/i)},g=c.isMSIE=function(a){return a?(a=parseFloat(a).toFixed(1),d(new RegExp("msie\\s*"+a,"i"))):d(/msie/i)},h=b(/chrome/i);c.isChrome=function(){return h()&&!c.isEdge()},c.isIE=function(a){return a?(a=parseFloat(a).toFixed(1),a>=11?f(a):g(a)):g()||f()},c.isSafari=function(){return d(/safari/i)&&!d(/chrome/i)&&!d(/chromium/i)&&!d(/android/i)};var i=c.isIOS=function(a){return d(a?new RegExp("iP(hone|ad|od).+\\s(OS\\s"+a+"|.*\\sVersion/"+a+")","i"):/iP(hone|ad|od)/i)};c.isAndroidNative=function(a){return j(a,!0)};var j=c.isAndroid=function(a,b){return b&&d(/chrome\/[123456789]/i)&&!d(/chrome\/18/)?!1:a?(e(a)&&!/\./.test(a)&&(a=""+a+"."),d(new RegExp("Android\\s*"+a,"i"))):d(/Android/i)};return c.isMobile=function(){return i()||j()},c.isIframe=function(){return window.frameElement&&"IFRAME"===window.frameElement.nodeName},c.flashVersion=function(){if(c.isAndroid())return 0;var a,b=navigator.plugins;if(b&&(a=b["Shockwave Flash"],a&&a.description))return parseFloat(a.description.replace(/\D+(\d+\.?\d*).*/,"$1"));if("undefined"!=typeof window.ActiveXObject){try{if(a=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return parseFloat(a.GetVariable("$version").split(" ")[1].replace(/\s*,\s*/,"."))}catch(d){return 0}return a}return 0},c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51),c(45),c(54)],e=function(a,b,c){var d={};d.createElement=function(a){var b=document.createElement("div");return b.innerHTML=a,b.firstChild},d.styleDimension=function(a){return a+(a.toString().indexOf("%")>0?"":"px")};var e=function(a){return b.isString(a.className)?a.className.split(" "):[]},f=function(b,c){c=a.trim(c),b.className!==c&&(b.className=c)};return d.classList=function(a){return a.classList?a.classList:e(a)},d.hasClass=c.hasClass,d.addClass=function(a,c){var d=e(a),g=b.isArray(c)?c:c.split(" ");b.each(g,function(a){b.contains(d,a)||d.push(a)}),f(a,d.join(" "))},d.removeClass=function(a,c){var d=e(a),g=b.isArray(c)?c:c.split(" ");f(a,b.difference(d,g).join(" "))},d.replaceClass=function(a,b,c){var d=a.className||"";b.test(d)?d=d.replace(b,c):c&&(d+=" "+c),f(a,d)},d.toggleClass=function(a,c,e){var f=d.hasClass(a,c);e=b.isBoolean(e)?e:!f,e!==f&&(e?d.addClass(a,c):d.removeClass(a,c))},d.emptyElement=function(a){for(;a.firstChild;)a.removeChild(a.firstChild)},d.addStyleSheet=function(a){var b=document.createElement("link");b.rel="stylesheet",b.href=a,document.getElementsByTagName("head")[0].appendChild(b)},d.empty=function(a){if(a)for(;a.childElementCount>0;)a.removeChild(a.children[0])},d.bounds=function(a){var b={left:0,right:0,width:0,height:0,top:0,bottom:0};if(!a||!document.body.contains(a))return b;var c=a.getBoundingClientRect(a),d=window.pageYOffset,e=window.pageXOffset;return c.width||c.height||c.left||c.top?(b.left=c.left+e,b.right=c.right+e,b.top=c.top+d,b.bottom=c.bottom+d,b.width=c.right-c.left,b.height=c.bottom-c.top,b):b},d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return{hasClass:function(a,b){var c=" "+b+" ";return 1===a.nodeType&&(" "+a.className+" ").replace(/[\t\r\n\f]/g," ").indexOf(c)>=0}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51)],e=function(a){function b(a){a=a.split("-");for(var b=1;b<a.length;b++)a[b]=a[b].charAt(0).toUpperCase()+a[b].slice(1);return a.join("")}function c(b,c,d){if(""===c||void 0===c||null===c)return"";var e=d?" !important":"";return"string"==typeof c&&isNaN(c)?/png|gif|jpe?g/i.test(c)&&c.indexOf("url")<0?"url("+c+")":c+e:0===c||"z-index"===b||"opacity"===b?""+c+e:/color/i.test(b)?"#"+a.pad(c.toString(16).replace(/^0x/i,""),6)+e:Math.ceil(c)+"px"+e}var d,e={},f=function(a,b){d||(d=document.createElement("style"),d.type="text/css",document.getElementsByTagName("head")[0].appendChild(d));var c=a+JSON.stringify(b).replace(/"/g,""),f=document.createTextNode(c);e[a]&&d.removeChild(e[a]),e[a]=f,d.appendChild(f)},g=function(a,d){if(void 0!==a&&null!==a){void 0===a.length&&(a=[a]);var e,f={};for(e in d)f[e]=c(e,d[e]);for(var g=0;g<a.length;g++){var h,i=a[g];if(void 0!==i&&null!==i)for(e in f)h=b(e),i.style[h]!==f[e]&&(i.style[h]=f[e])}}},h=function(a){for(var b in e)b.indexOf(a)>=0&&(d.removeChild(e[b]),delete e[b])},i=function(a,b){g(a,{transform:b,webkitTransform:b,msTransform:b,mozTransform:b,oTransform:b})},j=function(a,b){var c="rgb";a?(a=String(a).replace("#",""),3===a.length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2])):a="000000";var d=[parseInt(a.substr(0,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(4,2),16)];return void 0!==b&&100!==b&&(c+="a",d.push(b/100)),c+"("+d.join(",")+")"};return{css:f,style:g,clearCss:h,transform:i,hexToRgba:j}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(49)],e=function(a,b){function c(a){a.onload=null,a.onprogress=null,a.onreadystatechange=null,a.onerror=null,"abort"in a&&a.abort()}function d(b,d){return function(e){var f=e.currentTarget||d.xhr;if(clearTimeout(d.timeoutId),d.retryWithoutCredentials&&d.xhr.withCredentials){c(f);var g=a.extend({},d,{xhr:null,withCredentials:!1,retryWithoutCredentials:!1});return void l(g)}d.onerror(b,d.url,f)}}function e(a){return function(b){var c=b.currentTarget||a.xhr;if(4===c.readyState){if(clearTimeout(a.timeoutId),c.status>=400){var d;return d=404===c.status?"File not found":""+c.status+"("+c.statusText+")",a.onerror(d,a.url,c)}if(200===c.status)return f(a)(b)}}}function f(a){return function(c){var d=c.currentTarget||a.xhr;if(clearTimeout(a.timeoutId),a.responseType){if("json"===a.responseType)return g(d,a)}else{var e,f=d.responseXML;if(f)try{e=f.firstChild}catch(i){}if(f&&e)return h(d,f,a);if(j&&d.responseText&&!f&&(f=b.parseXML(d.responseText),f&&f.firstChild))return h(d,f,a);if(a.requireValidXML)return void a.onerror("Invalid XML",a.url,d)}a.oncomplete(d)}}function g(b,c){if(!b.response||a.isString(b.response)&&'"'!==b.responseText.substr(1))try{b=a.extend({},b,{response:JSON.parse(b.responseText)})}catch(d){return void c.onerror("Invalid JSON",c.url,b)}return c.oncomplete(b)}function h(b,c,d){var e=c.documentElement;return d.requireValidXML&&("parsererror"===e.nodeName||e.getElementsByTagName("parsererror").length)?void d.onerror("Invalid XML",d.url,b):(b.responseXML||(b=a.extend({},b,{responseXML:c})),d.oncomplete(b))}var i=function(){},j=!1,k=function(a){var b=document.createElement("a"),c=document.createElement("a");b.href=location.href;try{return c.href=a,c.href=c.href,b.protocol+"//"+b.host!=c.protocol+"//"+c.host}catch(d){}return!0},l=function(b,g,h,l){a.isObject(b)&&(l=b,b=l.url);var m,n=a.extend({xhr:null,url:b,withCredentials:!1,retryWithoutCredentials:!1,timeout:6e4,timeoutId:-1,oncomplete:g||i,onerror:h||i,mimeType:l&&!l.responseType?"text/xml":"",requireValidXML:!1,responseType:l&&l.plainText?"text":""},l);if("XDomainRequest"in window&&k(b))m=n.xhr=new window.XDomainRequest,m.onload=f(n),m.ontimeout=m.onprogress=i,j=!0;else{if(!("XMLHttpRequest"in window))return void n.onerror("",b);m=n.xhr=new window.XMLHttpRequest,m.onreadystatechange=e(n)}var o=d("Error loading file",n);m.onerror=o,"overrideMimeType"in m?n.mimeType&&m.overrideMimeType(n.mimeType):j=!0;try{b=b.replace(/#.*$/,""),m.open("GET",b,!0)}catch(p){return o(p),m}if(n.responseType)try{m.responseType=n.responseType}catch(p){}n.timeout&&(n.timeoutId=setTimeout(function(){c(m),n.onerror("Timeout",b,m)},n.timeout));try{n.withCredentials&&"withCredentials"in m&&(m.withCredentials=!0),m.send()}catch(p){o(p)}return m};return{ajax:l,crossdomain:k}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(58),c(45),c(50),c(49),c(59)],e=function(a,b,c,d,e){var f={};return f.repo=b.memoize(function(){var b=e.split("+")[0],d=a.repo+b+"/";return c.isHTTPS()?d.replace(/^http:/,"https:"):d}),f.versionCheck=function(a){var b=("0"+a).split(/\W/),c=e.split(/\W/),d=parseFloat(b[0]),f=parseFloat(c[0]);return d>f?!1:d===f&&parseFloat("0"+b[1])>parseFloat(c[1])?!1:!0},f.loadFrom=function(){return f.repo()},f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return{repo:"http://ssl.p.jwpcdn.com/player/v/",SkinsIncluded:["seven"],SkinsLoadable:["beelden","bekle","five","glow","roundster","six","stormtrooper","vapor"],dvrSeekLimit:-25}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return"7.3.4+commercial_v7-3-4.78.commercial.ba5b24.jwplayer.6040e1.analytics.5a0154.vast.0300bb.googima.e8ba93.plugin-sharing.08a279.plugin-related.909f55.plugin-gapro.0374cd"}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a=function(a,c,d){if(c=c||this,d=d||[],window.jwplayer&&window.jwplayer.debug)return a.apply(c,d);try{return a.apply(c,d)}catch(e){return new b(a.name,e)}},b=function(a,b){this.name=a,this.message=b.message||b.toString(),this.error=b};return{tryCatch:a,Error:b}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b=function(){var b={},c={},d={},e={};return{start:function(c){b[c]=a.now(),d[c]=d[c]+1||1},end:function(d){if(b[d]){var e=a.now()-b[d];c[d]=c[d]+e||e}},dump:function(){return{counts:d,sums:c,events:e}},tick:function(b,c){e[b]=c||a.now()},between:function(a,b){return e[b]&&e[a]?e[b]-e[a]:-1}}};return b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return{BUFFERING:"buffering",IDLE:"idle",COMPLETE:"complete",PAUSED:"paused",PLAYING:"playing",ERROR:"error",LOADING:"loading",STALLED:"stalled"}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(64),c(81),c(158)],e=function(a,b,d){var e=a.prototype.setup;return a.prototype.setup=function(a,f){e.apply(this,arguments);var g=this._model.get("edition"),h=b(g),i=this._model.get("cast"),j=this;h("casting")&&i&&i.appid&&c.e(6,function(a){var b=c(159);j._castController=new b(j,j._model),j.castToggle=j._castController.castToggle.bind(j._castController)});var k=d.setup();this.once("ready",k.onReady,this),f.getAdBlock=k.checkAdBlock},a}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(73),c(115),c(74),c(45),c(93),c(111),c(77),c(114),c(65),c(48),c(116),c(47),c(76),c(62),c(46),c(156)],e=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){function q(a){return function(){var b=Array.prototype.slice.call(arguments,0);this.eventsQueue.push([a,b])}}function r(a){return a===n.LOADING||a===n.STALLED?n.BUFFERING:a}var s=function(a){this.originalContainer=this.currentContainer=a,this.eventsQueue=[],d.extend(this,l),this._model=new g};return s.prototype={play:q("play"),pause:q("pause"),setVolume:q("setVolume"),setMute:q("setMute"),seek:q("seek"),stop:q("stop"),load:q("load"),playlistNext:q("playlistNext"),playlistPrev:q("playlistPrev"),playlistItem:q("playlistItem"),setFullscreen:q("setFullscreen"),setCurrentCaptions:q("setCurrentCaptions"),setCurrentQuality:q("setCurrentQuality"),
setup:function(g,l){function p(){U.mediaModel.on("change:state",function(a,b){var c=r(b);U.set("state",c)})}function q(){X=null,D(U.get("item")),U.on("change:state",m,this),U.on("change:castState",function(a,b){aa.trigger(o.JWPLAYER_CAST_SESSION,b)}),U.on("change:fullscreen",function(a,b){aa.trigger(o.JWPLAYER_FULLSCREEN,{fullscreen:b})}),U.on("itemReady",function(){aa.trigger(o.JWPLAYER_PLAYLIST_ITEM,{index:U.get("item"),item:U.get("playlistItem")})}),U.on("change:playlist",function(a,b){b.length&&aa.trigger(o.JWPLAYER_PLAYLIST_LOADED,{playlist:b})}),U.on("change:volume",function(a,b){aa.trigger(o.JWPLAYER_MEDIA_VOLUME,{volume:b})}),U.on("change:mute",function(a,b){aa.trigger(o.JWPLAYER_MEDIA_MUTE,{mute:b})}),U.on("change:controls",function(a,b){aa.trigger(o.JWPLAYER_CONTROLS,{controls:b})}),U.on("change:scrubbing",function(a,b){b?y():w()}),U.on("change:captionsList",function(a,b){aa.trigger(o.JWPLAYER_CAPTIONS_LIST,{tracks:b,track:Q()})}),U.mediaController.on("all",aa.trigger.bind(aa)),V.on("all",aa.trigger.bind(aa)),this.showView(V.element()),window.addEventListener("beforeunload",function(){X&&X.destroy(),U&&U.destroy()}),d.defer(s)}function s(){for(aa.trigger(o.JWPLAYER_READY,{setupTime:0}),aa.trigger(o.JWPLAYER_PLAYLIST_LOADED,{playlist:U.get("playlist")}),aa.trigger(o.JWPLAYER_PLAYLIST_ITEM,{index:U.get("item"),item:U.get("playlistItem")}),aa.trigger(o.JWPLAYER_CAPTIONS_LIST,{tracks:U.get("captionsList"),track:U.get("captionsIndex")}),U.get("autostart")&&w({reason:"autostart"});aa.eventsQueue.length>0;){var a=aa.eventsQueue.shift(),b=a[0],c=a[1]||[];aa[b].apply(aa,c)}}function t(a){switch(U.get("state")===n.ERROR&&U.set("state",n.IDLE),x(!0),U.get("autostart")&&U.once("itemReady",w),typeof a){case"string":u(a);break;case"object":var b=C(a);b&&D(0);break;case"number":D(a)}}function u(a){var b=new i;b.on(o.JWPLAYER_PLAYLIST_LOADED,function(a){t(a.playlist)}),b.on(o.JWPLAYER_ERROR,function(a){a.message="Error loading playlist: "+a.message,this.triggerError(a)},this),b.load(a)}function v(){var a=aa._instreamAdapter&&aa._instreamAdapter.getState();return d.isString(a)?a:U.get("state")}function w(a){var b;if(a&&U.set("playReason",a.reason),U.get("state")!==n.ERROR){var c=aa._instreamAdapter&&aa._instreamAdapter.getState();if(d.isString(c))return l.pauseAd(!1);if(U.get("state")===n.COMPLETE&&(x(!0),D(0)),!$&&($=!0,aa.trigger(o.JWPLAYER_MEDIA_BEFOREPLAY,{playReason:U.get("playReason")}),$=!1,Z))return Z=!1,void(Y=null);if(z()){if(0===U.get("playlist").length)return!1;b=j.tryCatch(function(){U.loadVideo()})}else U.get("state")===n.PAUSED&&(b=j.tryCatch(function(){U.playVideo()}));return b instanceof j.Error?(aa.triggerError(b),Y=null,!1):!0}}function x(a){U.off("itemReady",w);var b=!a;Y=null;var c=j.tryCatch(function(){U.stopVideo()},aa);return c instanceof j.Error?(aa.triggerError(c),!1):(b&&(_=!0),$&&(Z=!0),!0)}function y(){Y=null;var a=aa._instreamAdapter&&aa._instreamAdapter.getState();if(d.isString(a))return l.pauseAd(!0);switch(U.get("state")){case n.ERROR:return!1;case n.PLAYING:case n.BUFFERING:var b=j.tryCatch(function(){ba().pause()},this);if(b instanceof j.Error)return aa.triggerError(b),!1;break;default:$&&(Z=!0)}return!0}function z(){var a=U.get("state");return a===n.IDLE||a===n.COMPLETE||a===n.ERROR}function A(a){U.get("state")!==n.ERROR&&(U.get("scrubbing")||U.get("state")===n.PLAYING||w(!0),ba().seek(a))}function B(a,b){x(!0),D(a),w(b)}function C(a){var b=h(a);return b=h.filterPlaylist(b,U.getProviders(),U.get("androidhls"),U.get("drm"),U.get("preload")),U.set("playlist",b),d.isArray(b)&&0!==b.length?!0:(aa.triggerError({message:"Error loading playlist: No playable sources found"}),!1)}function D(a){var b=U.get("playlist");a=(a+b.length)%b.length,U.set("item",a),U.set("playlistItem",b[a]),U.setActiveItem(b[a])}function E(a){B(U.get("item")-1,a||{reason:"external"})}function F(a){B(U.get("item")+1,a||{reason:"external"})}function G(){if(z()){if(_)return void(_=!1);Y=G;var a=U.get("item");return a===U.get("playlist").length-1?void(U.get("repeat")?F({reason:"repeat"}):(U.set("state",n.COMPLETE),aa.trigger(o.JWPLAYER_PLAYLIST_COMPLETE,{}))):void F({reason:"playlist"})}}function H(a){ba().setCurrentQuality(a)}function I(){return ba()?ba().getCurrentQuality():-1}function J(){return this._model?this._model.getConfiguration():void 0}function K(){if(this._model.mediaModel)return this._model.mediaModel.get("visualQuality");var a=L();if(a){var b=I(),c=a[b];if(c)return{level:d.extend({index:b},c),mode:"",reason:""}}return null}function L(){return ba()?ba().getQualityLevels():null}function M(a){ba()&&ba().setCurrentAudioTrack(a)}function N(){return ba()?ba().getCurrentAudioTrack():-1}function O(){return ba()?ba().getAudioTracks():null}function P(a){U.persistVideoSubtitleTrack(a),aa.trigger(o.JWPLAYER_CAPTIONS_CHANGED,{tracks:R(),track:a})}function Q(){return W.getCurrentIndex()}function R(){return W.getCaptionsList()}function S(){var a=U.getVideo();if(a){var b=a.detachMedia();if(b instanceof HTMLVideoElement)return b}return null}function T(){var a=j.tryCatch(function(){U.getVideo().attachMedia()});return a instanceof j.Error?void j.log("Error calling _attachMedia",a):void("function"==typeof Y&&Y())}var U,V,W,X,Y,Z,$=!1,_=!1,aa=this,ba=function(){return U.getVideo()},ca=new a(g);U=this._model.setup(ca),V=this._view=new k(l,U),W=new f(l,U),X=new e(l,U,V,C),X.on(o.JWPLAYER_READY,q,this),X.on(o.JWPLAYER_SETUP_ERROR,this.setupError,this),U.mediaController.on(o.JWPLAYER_MEDIA_COMPLETE,function(){d.defer(G)}),U.mediaController.on(o.JWPLAYER_MEDIA_ERROR,this.triggerError,this),U.on("change:flashBlocked",function(a,b){if(!b)return void this._model.set("errorEvent",void 0);var c=!!a.get("flashThrottle"),d={message:c?"Click to run Flash":"Flash plugin failed to load"};c||this.trigger(o.JWPLAYER_ERROR,d),this._model.set("errorEvent",d)},this),p(),U.on("change:mediaModel",p),this.play=w,this.pause=y,this.seek=A,this.stop=x,this.load=t,this.playlistNext=F,this.playlistPrev=E,this.playlistItem=B,this.setCurrentCaptions=P,this.setCurrentQuality=H,this.detachMedia=S,this.attachMedia=T,this.getCurrentQuality=I,this.getQualityLevels=L,this.setCurrentAudioTrack=M,this.getCurrentAudioTrack=N,this.getAudioTracks=O,this.getCurrentCaptions=Q,this.getCaptionsList=R,this.getVisualQuality=K,this.getConfig=J,this.getState=v,this.setVolume=U.setVolume,this.setMute=U.setMute,this.getProvider=function(){return U.get("provider")},this.getWidth=function(){return U.get("containerWidth")},this.getHeight=function(){return U.get("containerHeight")},this.getContainer=function(){return this.currentContainer},this.resize=V.resize,this.getSafeRegion=V.getSafeRegion,this.setCues=V.addCues,this.setFullscreen=function(a){d.isBoolean(a)||(a=!U.get("fullscreen")),U.set("fullscreen",a),this._instreamAdapter&&this._instreamAdapter._adModel&&this._instreamAdapter._adModel.set("fullscreen",a)},this.addButton=function(a,b,c,e,f){var g={img:a,tooltip:b,callback:c,id:e,btnClass:f},h=U.get("dock");h=h?h.slice(0):[],h=d.reject(h,d.matches({id:g.id})),h.push(g),U.set("dock",h)},this.removeButton=function(a){var b=U.get("dock")||[];b=d.reject(b,d.matches({id:a})),U.set("dock",b)},this.checkBeforePlay=function(){return $},this.getItemQoe=function(){return U._qoeItem},this.setControls=function(a){d.isBoolean(a)||(a=!U.get("controls")),U.set("controls",a);var b=U.getVideo();b&&b.setControls(a)},this.playerDestroy=function(){this.stop(),this.showView(this.originalContainer),V&&V.destroy(),U&&U.destroy(),X&&(X.destroy(),X=null)},this.isBeforePlay=this.checkBeforePlay,this.isBeforeComplete=function(){return U.getVideo().checkComplete()},this.createInstream=function(){return this.instreamDestroy(),this._instreamAdapter=new c(this,U,V),this._instreamAdapter},this.skipAd=function(){this._instreamAdapter&&this._instreamAdapter.skipAd()},this.instreamDestroy=function(){aa._instreamAdapter&&aa._instreamAdapter.destroy()},b(l,this),X.start()},showView:function(a){(document.documentElement.contains(this.currentContainer)||(this.currentContainer=document.getElementById(this._model.get("id")),this.currentContainer))&&(this.currentContainer.parentElement&&this.currentContainer.parentElement.replaceChild(a,this.currentContainer),this.currentContainer=a)},triggerError:function(a){this._model.set("errorEvent",a),this._model.set("state",n.ERROR),this._model.once("change:state",function(){this._model.set("errorEvent",void 0)},this),this.trigger(o.JWPLAYER_ERROR,a)},setupError:function(a){var b=a.message,c=j.createElement(p(this._model.get("id"),this._model.get("skin"),b)),e=this._model.get("width"),f=this._model.get("height");j.style(c,{width:e.toString().indexOf("%")>0?e:e+"px",height:f.toString().indexOf("%")>0?f:f+"px"}),this.showView(c);var g=this;d.defer(function(){g.trigger(o.JWPLAYER_SETUP_ERROR,{message:b})})}},s}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(66),c(67),c(48),c(46),c(47),c(45)],e=function(a,b,c,d,e,f){var g=function(){function g(e){var g=c.tryCatch(function(){var c,g=e.responseXML?e.responseXML.childNodes:null,h="";if(g){for(var k=0;k<g.length&&(h=g[k],8===h.nodeType);k++);"xml"===a.localName(h)&&(h=h.nextSibling),"rss"===a.localName(h)&&(c=b.parse(h))}if(!c)try{c=JSON.parse(e.responseText),f.isArray(c)||(c=c.playlist)}catch(l){return void i("Not a valid RSS/JSON feed")}j.trigger(d.JWPLAYER_PLAYLIST_LOADED,{playlist:c})});g instanceof c.Error&&i()}function h(a){i("Playlist load error: "+a)}function i(a){j.trigger(d.JWPLAYER_ERROR,{message:a?a:"Error loading file"})}var j=f.extend(this,e);this.load=function(a){c.ajax(a,g,h)},this.destroy=function(){this.off()}};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51)],e=function(a){return{localName:function(a){return a?a.localName?a.localName:a.baseName?a.baseName:"":""},textContent:function(b){return b?b.textContent?a.trim(b.textContent):b.text?a.trim(b.text):"":""},getChildNode:function(a,b){return a.childNodes[b]},numChildren:function(a){return a.childNodes?a.childNodes.length:0}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51),c(66),c(68),c(69),c(70)],e=function(a,b,c,d,e){function f(b){for(var f={},h=0;h<b.childNodes.length;h++){var i=b.childNodes[h],k=j(i);if(k)switch(k.toLowerCase()){case"enclosure":f.file=a.xmlAttribute(i,"url");break;case"title":f.title=g(i);break;case"guid":f.mediaid=g(i);break;case"pubdate":f.date=g(i);break;case"description":f.description=g(i);break;case"link":f.link=g(i);break;case"category":f.tags?f.tags+=g(i):f.tags=g(i)}}return f=d(b,f),f=c(b,f),new e(f)}var g=b.textContent,h=b.getChildNode,i=b.numChildren,j=b.localName,k={};return k.parse=function(a){for(var b=[],c=0;c<i(a);c++){var d=h(a,c),e=j(d).toLowerCase();if("channel"===e)for(var g=0;g<i(d);g++){var k=h(d,g);"item"===j(k).toLowerCase()&&b.push(f(k))}}return b},k}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(66),c(51),c(48)],e=function(a,b,c){var d="jwplayer",e=function(e,f){for(var g=[],h=[],i=b.xmlAttribute,j="default",k="label",l="file",m="type",n=0;n<e.childNodes.length;n++){var o=e.childNodes[n];if(o.prefix===d){var p=a.localName(o);"source"===p?(delete f.sources,g.push({file:i(o,l),"default":i(o,j),label:i(o,k),type:i(o,m)})):"track"===p?(delete f.tracks,h.push({file:i(o,l),"default":i(o,j),kind:i(o,"kind"),label:i(o,k)})):(f[p]=c.serialize(a.textContent(o)),"file"===p&&f.sources&&delete f.sources)}f[l]||(f[l]=f.link)}if(g.length)for(f.sources=[],n=0;n<g.length;n++)g[n].file.length>0&&(g[n][j]="true"===g[n][j]?!0:!1,g[n].label.length||delete g[n].label,f.sources.push(g[n]));if(h.length)for(f.tracks=[],n=0;n<h.length;n++)h[n].file.length>0&&(h[n][j]="true"===h[n][j]?!0:!1,h[n].kind=h[n].kind.length?h[n].kind:"captions",h[n].label.length||delete h[n].label,f.tracks.push(h[n]));return f};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(66),c(51),c(48)],e=function(a,b,c){var d=b.xmlAttribute,e=a.localName,f=a.textContent,g=a.numChildren,h="media",i=function(a,b){function j(a){var b={zh:"Chinese",nl:"Dutch",en:"English",fr:"French",de:"German",it:"Italian",ja:"Japanese",pt:"Portuguese",ru:"Russian",es:"Spanish"};return b[a]?b[a]:a}var k,l,m="tracks",n=[];for(l=0;l<g(a);l++)if(k=a.childNodes[l],k.prefix===h){if(!e(k))continue;switch(e(k).toLowerCase()){case"content":d(k,"duration")&&(b.duration=c.seconds(d(k,"duration"))),g(k)>0&&(b=i(k,b)),d(k,"url")&&(b.sources||(b.sources=[]),b.sources.push({file:d(k,"url"),type:d(k,"type"),width:d(k,"width"),label:d(k,"label")}));break;case"title":b.title=f(k);break;case"description":b.description=f(k);break;case"guid":b.mediaid=f(k);break;case"thumbnail":b.image||(b.image=d(k,"url"));break;case"player":break;case"group":i(k,b);break;case"subtitle":var o={};o.file=d(k,"url"),o.kind="captions",d(k,"lang").length>0&&(o.label=j(d(k,"lang"))),n.push(o)}}for(b.hasOwnProperty(m)||(b[m]=[]),l=0;l<n.length;l++)b[m].push(n[l]);return b};return i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(71),c(72)],e=function(a,b,c){var d={sources:[],tracks:[]},e=function(e){e=e||{},a.isArray(e.tracks)||delete e.tracks;var f=a.extend({},d,e);a.isObject(f.sources)&&!a.isArray(f.sources)&&(f.sources=[b(f.sources)]),a.isArray(f.sources)&&0!==f.sources.length||(e.levels?f.sources=e.levels:f.sources=[b(e)]);for(var g=0;g<f.sources.length;g++){var h=f.sources[g];if(h){var i=h["default"];i?h["default"]="true"===i.toString():h["default"]=!1,f.sources[g].label||(f.sources[g].label=g.toString()),f.sources[g]=b(f.sources[g])}}return f.sources=a.compact(f.sources),a.isArray(f.tracks)||(f.tracks=[]),a.isArray(f.captions)&&(f.tracks=f.tracks.concat(f.captions),delete f.captions),f.tracks=a.compact(a.map(f.tracks,c)),f};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(51),c(45)],e=function(a,b,c){var d={"default":!1},e=function(e){if(e&&e.file){var f=c.extend({},d,e);f.file=b.trim(""+f.file);var g=/^[^\/]+\/(?:x-)?([^\/]+)$/;if(a.isYouTube(f.file)?f.type="youtube":a.isRtmp(f.file)?f.type="rtmp":g.test(f.type)?f.type=f.type.replace(g,"$1"):f.type||(f.type=b.extension(f.file)),f.type){switch(f.type){case"m3u8":case"vnd.apple.mpegurl":f.type="hls";break;case"dash+xml":f.type="dash";break;case"smil":f.type="rtmp";break;case"m4a":f.type="aac"}return c.each(f,function(a,b){""===a&&delete f[b]}),f}}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b={kind:"captions","default":!1},c=function(c){return c&&c.file?a.extend({},b,c):void 0};return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(45)],e=function(a,b){function d(c){b.each(c,function(b,d){c[d]=a.serialize(b)})}function e(a){return a.slice&&"px"===a.slice(-2)&&(a=a.slice(0,-2)),a}function f(b,c){if(-1===c.toString().indexOf("%"))return 0;if("string"!=typeof b||!a.exists(b))return 0;if(/^\d*\.?\d+%$/.test(b))return b;var d=b.indexOf(":");if(-1===d)return 0;var e=parseFloat(b.substr(0,d)),f=parseFloat(b.substr(d+1));return 0>=e||0>=f?0:f/e*100+"%"}var g={autostart:!1,controls:!0,displaytitle:!0,displaydescription:!0,mobilecontrols:!1,repeat:!1,castAvailable:!1,skin:"seven",stretching:"uniform",mute:!1,volume:90,width:480,height:270},h=function(h){var i=b.extend({},(window.jwplayer||{}).defaults,h);d(i);var j=b.extend({},g,i);if("."===j.base&&(j.base=a.getScriptPath("jwplayer.js")),j.base=(j.base||a.loadFrom()).replace(/\/?$/,"/"),c.p=j.base,j.width=e(j.width),j.height=e(j.height),j.flashplayer=j.flashplayer||a.getScriptPath("jwplayer.js")+"jwplayer.flash.swf","http:"===window.location.protocol&&(j.flashplayer=j.flashplayer.replace("https","http")),j.aspectratio=f(j.aspectratio,j.width),b.isObject(j.skin)&&(j.skinUrl=j.skin.url,j.skinColorInactive=j.skin.inactive,j.skinColorActive=j.skin.active,j.skinColorBackground=j.skin.background,j.skin=b.isString(j.skin.name)?j.skin.name:g.skin),b.isString(j.skin)&&j.skin.indexOf(".xml")>0&&(console.log("JW Player does not support XML skins, please update your config"),j.skin=j.skin.replace(".xml","")),j.aspectratio||delete j.aspectratio,!j.playlist){var k=b.pick(j,["title","description","type","mediaid","image","file","sources","tracks","preload"]);j.playlist=[k]}return j};return h}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(75),c(92),c(46),c(62),c(48),c(47),c(45)],e=function(a,b,c,d,e,f,g){function h(c){var d=c.get("provider").name||"";return d.indexOf("flash")>=0?b:a}var i={skipoffset:null,tag:null},j=function(a,b,f){function j(a,b){b=b||{},u.tag&&!b.tag&&(b.tag=u.tag),this.trigger(a,b)}function k(a){s._adModel.set("duration",a.duration),s._adModel.set("position",a.position)}function l(a){if(m&&t+1<m.length){s._adModel.set("state","buffering"),b.set("skipButton",!1),t++;var d,e=m[t];n&&(d=n[t]),this.loadItem(e,d)}else a.type===c.JWPLAYER_MEDIA_COMPLETE&&(j.call(this,a.type,a),this.trigger(c.JWPLAYER_PLAYLIST_COMPLETE,{})),this.destroy()}var m,n,o,p,q,r=h(b),s=new r(a,b),t=0,u={},v=g.bind(function(a){a=a||{},a.hasControls=!!b.get("controls"),this.trigger(c.JWPLAYER_INSTREAM_CLICK,a),s&&s._adModel&&(s._adModel.get("state")===d.PAUSED?a.hasControls&&s.instreamPlay():s.instreamPause())},this),w=g.bind(function(){s&&s._adModel&&s._adModel.get("state")===d.PAUSED&&b.get("controls")&&(a.setFullscreen(),a.play())},this);this.type="instream",this.init=function(){o=b.getVideo(),p=b.get("position"),q=b.get("playlist")[b.get("item")],s.on("all",j,this),s.on(c.JWPLAYER_MEDIA_TIME,k,this),s.on(c.JWPLAYER_MEDIA_COMPLETE,l,this),s.init(),o.detachMedia(),b.mediaModel.set("state",d.BUFFERING),a.checkBeforePlay()||0===p&&!o.checkComplete()?(p=0,b.set("preInstreamState","instream-preroll")):o&&o.checkComplete()||b.get("state")===d.COMPLETE?b.set("preInstreamState","instream-postroll"):b.set("preInstreamState","instream-midroll");var g=b.get("state");return(g===d.PLAYING||g===d.BUFFERING)&&o.pause(),f.setupInstream(s._adModel),s._adModel.set("state",d.BUFFERING),f.clickHandler().setAlternateClickHandlers(e.noop,null),this.setText("Loading ad"),this},this.loadItem=function(a,d){if(e.isAndroid(2.3))return void this.trigger({type:c.JWPLAYER_ERROR,message:"Error loading instream: Cannot play instream on Android 2.3"});g.isArray(a)&&(m=a,n=d,a=m[t],n&&(d=n[t])),this.trigger(c.JWPLAYER_PLAYLIST_ITEM,{index:t,item:a}),u=g.extend({},i,d),s.load(a),this.addClickHandler();var f=a.skipoffset||u.skipoffset;f&&(s._adModel.set("skipMessage",u.skipMessage),s._adModel.set("skipText",u.skipText),s._adModel.set("skipOffset",f),b.set("skipButton",!0))},this.applyProviderListeners=function(a){s.applyProviderListeners(a),this.addClickHandler()},this.play=function(){s.instreamPlay()},this.pause=function(){s.instreamPause()},this.hide=function(){s.hide()},this.addClickHandler=function(){f.clickHandler().setAlternateClickHandlers(v,w),s.on(c.JWPLAYER_MEDIA_META,this.metaHandler,this)},this.skipAd=function(a){var b=c.JWPLAYER_AD_SKIPPED;this.trigger(b,a),l.call(this,{type:b})},this.metaHandler=function(a){a.width&&a.height&&f.resizeMedia()},this.destroy=function(){if(this.off(),b.set("skipButton",!1),s){f.clickHandler()&&f.clickHandler().revertAlternateClickHandlers(),s.instreamDestroy(),f.destroyInstream(),s=null,a.attachMedia();var c=b.get("preInstreamState");switch(c){case"instream-preroll":case"instream-midroll":var h=g.extend({},q);h.starttime=p,b.loadVideo(h),e.isMobile()&&b.mediaModel.get("state")===d.BUFFERING&&o.setState(d.BUFFERING),o.play();break;case"instream-postroll":case"instream-idle":o.stop()}}},this.getState=function(){return s&&s._adModel?s._adModel.get("state"):!1},this.setText=function(a){f.setAltText(a?a:"")},this.hide=function(){f.useExternalControls()}};return g.extend(j.prototype,f),j}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(47),c(76),c(46),c(62),c(77)],e=function(a,b,c,d,e,f){var g=function(g,h){function i(b){var e=b||m.getVideo();if(n!==e){if(n=e,!e)return;e.off(),e.on("all",function(b,c){c=a.extend({},c,{type:b}),this.trigger(b,c)},o),e.on(d.JWPLAYER_MEDIA_BUFFER_FULL,l),e.on(d.JWPLAYER_PLAYER_STATE,j),e.attachMedia(),e.volume(h.get("volume")),e.mute(h.get("mute")),m.on("change:state",c,o)}}function j(a){switch(a.newstate){case e.PLAYING:m.set("state",a.newstate);break;case e.PAUSED:m.set("state",a.newstate)}}function k(a){h.trigger(a.type,a),o.trigger(d.JWPLAYER_FULLSCREEN,{fullscreen:a.jwstate})}function l(){m.getVideo().play()}var m,n,o=a.extend(this,b);return g.on(d.JWPLAYER_FULLSCREEN,function(a){this.trigger(d.JWPLAYER_FULLSCREEN,a)},o),this.init=function(){m=(new f).setup({id:h.get("id"),volume:h.get("volume"),fullscreen:h.get("fullscreen"),mute:h.get("mute")}),m.on("fullscreenchange",k),this._adModel=m},o.load=function(a){m.set("item",0),m.set("playlistItem",a),m.setActiveItem(a),i(),m.off(d.JWPLAYER_ERROR),m.on(d.JWPLAYER_ERROR,function(a){this.trigger(d.JWPLAYER_ERROR,a)},o),m.loadVideo(a)},o.applyProviderListeners=function(a){i(a),a.off(d.JWPLAYER_ERROR),a.on(d.JWPLAYER_ERROR,function(a){this.trigger(d.JWPLAYER_ERROR,a)},o),h.on("change:volume",function(a,b){n.volume(b)},o),h.on("change:mute",function(a,b){n.mute(b)},o)},this.instreamDestroy=function(){m&&(m.off(),this.off(),n&&(n.detachMedia(),n.off(),m.getVideo()&&n.destroy()),m=null,g.off(null,null,this),g=null)},o.instreamPlay=function(){m.getVideo()&&m.getVideo().play(!0)},o.instreamPause=function(){m.getVideo()&&m.getVideo().pause(!0)},o};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(62)],e=function(a){function b(b){return b===a.COMPLETE||b===a.ERROR?a.IDLE:b}return function(a,c,d){if(c=b(c),d=b(d),c!==d){var e=c.replace(/(?:ing|d)$/,""),f={type:e,newstate:c,oldstate:d,reason:a.mediaModel.get("state")};"play"===e&&(f.playReason=a.get("playReason")),this.trigger(e,f)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(78),c(89),c(90),c(45),c(47),c(91),c(46),c(62)],e=function(a,b,c,d,e,f,g,h,i){var j=["volume","mute","captionLabel","qualityLabel"],k=function(){function g(a,b){switch(a){case"flashThrottle":var c="resume"!==b.state;this.set("flashThrottle",c),this.set("flashBlocked",c);break;case"flashBlocked":return void this.set("flashBlocked",!0);case"flashUnblocked":return void this.set("flashBlocked",!1);case"volume":case"mute":return void this.set(a,b[a]);case h.JWPLAYER_MEDIA_TYPE:this.mediaModel.set("mediaType",b.mediaType);break;case h.JWPLAYER_PLAYER_STATE:return void this.mediaModel.set("state",b.newstate);case h.JWPLAYER_MEDIA_BUFFER:this.set("buffer",b.bufferPercent);case h.JWPLAYER_MEDIA_META:var d=b.duration;e.isNumber(d)&&(this.mediaModel.set("duration",d),this.set("duration",d));break;case h.JWPLAYER_MEDIA_BUFFER_FULL:this.mediaModel.get("playAttempt")?this.playVideo():this.mediaModel.on("change:playAttempt",function(){this.playVideo()},this);break;case h.JWPLAYER_MEDIA_TIME:this.mediaModel.set("position",b.position),this.set("position",b.position),e.isNumber(b.duration)&&(this.mediaModel.set("duration",b.duration),this.set("duration",b.duration));break;case h.JWPLAYER_PROVIDER_CHANGED:this.set("provider",m.getName());break;case h.JWPLAYER_MEDIA_LEVELS:this.setQualityLevel(b.currentQuality,b.levels),this.mediaModel.set("levels",b.levels);break;case h.JWPLAYER_MEDIA_LEVEL_CHANGED:this.setQualityLevel(b.currentQuality,b.levels),this.persistQualityLevel(b.currentQuality,b.levels);break;case h.JWPLAYER_AUDIO_TRACKS:this.setCurrentAudioTrack(b.currentTrack,b.tracks),this.mediaModel.set("audioTracks",b.tracks);break;case h.JWPLAYER_AUDIO_TRACK_CHANGED:this.setCurrentAudioTrack(b.currentTrack,b.tracks);break;case"subtitlesTrackChanged":this.setVideoSubtitleTrack(b.currentTrack,b.tracks);break;case"visualQuality":var f=e.extend({},b);this.mediaModel.set("visualQuality",f)}var g=e.extend({},b,{type:a});this.mediaController.trigger(a,g)}var k,m,n=this,o=a.noop;this.mediaController=e.extend({},f),this.mediaModel=new l,d.model(this),this.set("mediaModel",this.mediaModel),this.setup=function(b){var d=new c;return d.track(j,this),e.extend(this.attributes,d.getAllItems(),b,{item:0,state:i.IDLE,flashBlocked:!1,fullscreen:!1,compactUI:!1,scrubbing:!1,duration:0,position:0,buffer:0}),a.isMobile()&&!b.mobileSdk&&this.set("autostart",!1),this.updateProviders(),this},this.getConfiguration=function(){return e.omit(this.clone(),["mediaModel"])},this.updateProviders=function(){k=new b(this.getConfiguration())},this.setQualityLevel=function(a,b){a>-1&&b.length>1&&"youtube"!==m.getName().name&&this.mediaModel.set("currentLevel",parseInt(a))},this.persistQualityLevel=function(a,b){var c=b[a]||{},d=c.label;this.set("qualityLabel",d)},this.setCurrentAudioTrack=function(a,b){a>-1&&b.length>0&&a<b.length&&this.mediaModel.set("currentAudioTrack",parseInt(a))},this.onMediaContainer=function(){var a=this.get("mediaContainer");o.setContainer(a)},this.changeVideoProvider=function(a){this.off("change:mediaContainer",this.onMediaContainer),m&&(m.off(null,null,this),m.getContainer()&&m.remove()),o=new a(n.get("id"),n.getConfiguration());var b=this.get("mediaContainer");b?o.setContainer(b):this.once("change:mediaContainer",this.onMediaContainer),this.set("provider",o.getName()),-1===o.getName().name.indexOf("flash")&&(this.set("flashThrottle",void 0),this.set("flashBlocked",!1)),m=o,m.volume(n.get("volume")),m.mute(n.get("mute")),m.on("all",g,this)},this.destroy=function(){this.off(),m&&(m.off(null,null,this),m.destroy())},this.getVideo=function(){return m},this.setFullscreen=function(a){a=!!a,a!==n.get("fullscreen")&&n.set("fullscreen",a)},this.chooseProvider=function(a){return k.choose(a).provider},this.setActiveItem=function(a){this.mediaModel.off(),this.mediaModel=new l,this.set("mediaModel",this.mediaModel);var b=a&&a.sources&&a.sources[0];if(void 0!==b){var c=this.chooseProvider(b);if(!c)throw new Error("No suitable provider found");o instanceof c||n.changeVideoProvider(c),o.init&&o.init(a),this.trigger("itemReady",a)}},this.getProviders=function(){return k},this.resetProvider=function(){o=null},this.setVolume=function(a){a=Math.round(a),n.set("volume",a),m&&m.volume(a);var b=0===a;b!==n.get("mute")&&n.setMute(b)},this.setMute=function(b){if(a.exists(b)||(b=!n.get("mute")),n.set("mute",b),m&&m.mute(b),!b){var c=Math.max(10,n.get("volume"));this.setVolume(c)}},this.loadVideo=function(a){if(this.mediaModel.set("playAttempt",!0),this.mediaController.trigger(h.JWPLAYER_MEDIA_PLAY_ATTEMPT,{playReason:this.get("playReason")}),!a){var b=this.get("item");a=this.get("playlist")[b]}this.set("position",a.starttime||0),this.set("duration",a.duration||0),m.load(a)},this.stopVideo=function(){m&&m.stop()},this.playVideo=function(){m.play()},this.persistCaptionsTrack=function(){var a=this.get("captionsTrack");a?this.set("captionLabel",a.label):this.set("captionLabel","Off")},this.setVideoSubtitleTrack=function(a,b){this.set("captionsIndex",a),a&&b&&a<=b.length&&b[a-1].data&&this.set("captionsTrack",b[a-1]),m&&m.setSubtitlesTrack&&m.setSubtitlesTrack(a)},this.persistVideoSubtitleTrack=function(a){this.setVideoSubtitleTrack(a),this.persistCaptionsTrack()}},l=k.MediaModel=function(){this.set("state",i.IDLE)};return e.extend(k.prototype,g),e.extend(l.prototype,g),k}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(79)],e=function(a){return a.prototype.providerSupports=function(a,b){return a.supports(b,this.config.edition)},a}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(80),c(84),c(45)],e=function(a,b,c){function d(b){this.providers=a.slice(),this.config=b||{},"flash"===this.config.primary&&f(this.providers,"html5","flash")}function e(a,b){for(var c=0;c<a.length;c++)if(a[c].name===b)return c;return-1}function f(a,b,c){var d=e(a,b),f=e(a,c),g=a[d];a[d]=a[f],a[f]=g}return c.extend(d.prototype,{providerSupports:function(a,b){return a.supports(b)},choose:function(a){a=c.isObject(a)?a:{};for(var d=this.providers.length,e=0;d>e;e++){var f=this.providers[e];if(this.providerSupports(f,a)){var g=d-e-1;return{priority:g,name:f.name,type:a.type,provider:b[f.name]}}}return null}}),d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(81),c(45),c(82)],e=function(a,b,c,d){function e(c,d){var e=b(d);if(!e("dash"))return!1;if(c.drm&&!e("drm"))return!1;if(!window.MediaSource)return!1;if(!a.isChrome()&&!a.isIETrident(11))return!1;var f=c.file||"";return"dash"===c.type||"mpd"===c.type||f.indexOf(".mpd")>-1||f.indexOf("mpd-time-csf")>-1?!0:!1}var f=c.find(d,c.matches({name:"flash"})),g=f.supports;return f.supports=function(c,d){if(!a.isFlashSupported())return!1;var e=c&&c.type;if("hls"===e||"m3u8"===e){var f=b(d);return f("hls")}return g.apply(this,arguments)},d.push({name:"dashjs",supports:c.constant(!1)}),d.push({name:"shaka",supports:e}),d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b="free",c="premium",d="enterprise",e="ads",f="unlimited",g="trial",h={setup:[b,c,d,e,f,g],dash:[c,d,e,f,g],drm:[d,e,f,g],hls:[c,e,d,f,g],ads:[e,f,g],casting:[c,d,e,f,g],jwpsrv:[b,c,d,e,g]},i=function(b){return function(c){return a.contains(h[c],b)}};return i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(45),c(83)],e=function(a,b,c){function d(b){if("hls"===b.type)if(b.androidhls!==!1){var c=a.isAndroidNative;if(c(2)||c(3)||c("4.0"))return!1;if(a.isAndroid())return!0}else if(a.isAndroid())return!1;return null}var e=[{name:"youtube",supports:function(b){return a.isYouTube(b.file,b.type)}},{name:"html5",supports:function(b){var e={aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"},f=b.file,g=b.type,h=d(b);if(null!==h)return h;if(a.isRtmp(f,g))return!1;if(!e[g])return!1;if(c.canPlayType){var i=c.canPlayType(e[g]);return!!i}return!1}},{name:"flash",supports:function(c){var d={flv:"video",f4v:"video",mov:"video",m4a:"video",m4v:"video",mp4:"video",aac:"video",f4a:"video",mp3:"sound",mpeg:"sound",smil:"rtmp"},e=b.keys(d);if(!a.isFlashSupported())return!1;var f=c.file,g=c.type;return a.isRtmp(f,g)?!0:b.contains(e,g)}}];return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return document.createElement("video")}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(85),c(87)],e=function(a,b){var c={html5:a,flash:b};return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(55),c(48),c(45),c(46),c(62),c(86),c(47)],e=function(a,b,c,d,e,f,g){function h(a,c){b.foreach(a,function(a,b){c.addEventListener(a,b,!1)})}function i(a,c){b.foreach(a,function(a,b){c.removeEventListener(a,b,!1)})}function j(a,b,c){"addEventListener"in a?a.addEventListener(b,c):a["on"+b]=c}function k(a,b,c){a&&("removeEventListener"in a?a.removeEventListener(b,c):a["on"+b]=null)}function l(a){if("hls"===a.type)if(a.androidhls!==!1){var c=b.isAndroidNative;if(c(2)||c(3)||c("4.0"))return!1;if(b.isAndroid())return!0}else if(b.isAndroid())return!1;return null}function m(m,y){function z(){na(Ua.audioTracks),ra(Ua.textTracks)}function A(a){Ca.trigger("click",a)}function B(){Ia&&!Ka&&(I(H()),F(da(),za,ya))}function C(){Ia&&F(da(),za,ya)}function D(){n(Ga),Ea=!0,Ia&&(Ca.state===e.STALLED?Ca.setState(e.PLAYING):Ca.state===e.PLAYING&&(Ga=setTimeout(ca,o)),Ka&&Ua.duration===1/0&&0===Ua.currentTime||(I(H()),G(Ua.currentTime),F(da(),za,ya),Ca.state===e.PLAYING&&(Ca.trigger(d.JWPLAYER_MEDIA_TIME,{position:za,duration:ya}),E())))}function E(){var a=Sa.level;if(a.width!==Ua.videoWidth||a.height!==Ua.videoHeight){if(a.width=Ua.videoWidth,a.height=Ua.videoHeight,ua(),!a.width||!a.height)return;Sa.reason=Sa.reason||"auto",Sa.mode="hls"===Ba[Ja].type?"auto":"manual",Sa.bitrate=0,a.index=Ja,a.label=Ba[Ja].label,Ca.trigger("visualQuality",Sa),Sa.reason=""}}function F(a,b,c){(a!==Ha||c!==ya)&&(Ha=a,Ca.trigger(d.JWPLAYER_MEDIA_BUFFER,{
bufferPercent:100*a,position:b,duration:c}))}function G(a){0>ya&&(a=-(_()-a)),za=a}function H(){var a=Ua.duration,b=_();if(a===1/0&&b){var c=b-Ua.seekable.start(0);c!==1/0&&c>120&&(a=-c)}return a}function I(a){ya=a,Fa&&a&&a!==1/0&&Ca.seek(Fa)}function J(){var a=H();Ka&&a===1/0&&(a=0),Ca.trigger(d.JWPLAYER_MEDIA_META,{duration:a,height:Ua.videoHeight,width:Ua.videoWidth}),I(a)}function K(){Ia&&(Ea=!0,M())}function L(){Ia&&(Ua.muted&&(Ua.muted=!1,Ua.muted=!0),ua(),J())}function M(){Aa||(Aa=!0,Ca.trigger(d.JWPLAYER_MEDIA_BUFFER_FULL))}function N(){Ca.setState(e.PLAYING),Ua.hasAttribute("hasplayed")||Ua.setAttribute("hasplayed",""),Ca.trigger(d.JWPLAYER_PROVIDER_FIRST_FRAME,{})}function O(){Ca.state!==e.COMPLETE&&Ua.currentTime!==Ua.duration&&Ca.setState(e.PAUSED)}function P(){Ka||Ua.paused||Ua.ended||Ca.state!==e.LOADING&&Ca.state!==e.ERROR&&(Ca.seeking||Ca.setState(e.STALLED))}function Q(){Ia&&(b.log("Error playing media: %o %s",Ua.error,Ua.src||xa.file),Ca.trigger(d.JWPLAYER_MEDIA_ERROR,{message:"Error loading media: File could not be played"}))}function R(a){var d;return"array"===b.typeOf(a)&&a.length>0&&(d=c.map(a,function(a,b){return{label:a.label||b}})),d}function S(a){Ba=a,Ja=T(a);var b=R(a);b&&Ca.trigger(d.JWPLAYER_MEDIA_LEVELS,{levels:b,currentQuality:Ja})}function T(a){var b=Math.max(0,Ja),c=y.qualityLabel;if(a)for(var d=0;d<a.length;d++)if(a[d]["default"]&&(b=d),c&&a[d].label===c)return d;return Sa.reason="initial choice",Sa.level={width:0,height:0},b}function U(){return r||s}function V(a,c,d){xa=Ba[Ja],Fa=0,n(Ga);var f=document.createElement("source");f.src=xa.file;var g=Ua.src!==f.src;g||U()?(ya=c,W(d),Ua.load()):(0===a&&0!==Ua.currentTime&&(Fa=-1,Ca.seek(a)),Ua.play()),za=Ua.currentTime,r&&(M(),Ua.paused||Ca.state===e.PLAYING||Ca.setState(e.LOADING)),b.isIOS()&&Ca.getFullScreen()&&(Ua.controls=!0),a>0&&Ca.seek(a)}function W(a){Na=null,Oa=null,Qa=-1,Pa=-1,Ra=-1,Sa.reason||(Sa.reason="initial choice",Sa.level={width:0,height:0}),Ea=!1,Aa=!1,Ka=l(xa),Ua.src=xa.file,xa.preload&&Ua.setAttribute("preload",xa.preload),b.isIOS()&&a&&Y(a.tracks)}function X(){Ua&&(Ua.removeAttribute("src"),!q&&Ua.load&&Ua.load())}function Y(a){for(;Ua.firstChild;)Ua.removeChild(Ua.firstChild);Z(a)}function Z(a){if(a){Ua.setAttribute("crossorigin","anonymous");for(var b=0;b<a.length;b++)if(-1!==a[b].file.indexOf(".vtt")&&/subtitles|captions|descriptions|chapters|metadata/.test(a[b].kind)){var c=document.createElement("track");c.src=a[b].file,c.kind=a[b].kind,c.srclang=a[b].language||"",c.label=a[b].label,c.mode="disabled",Ua.appendChild(c)}}}function $(){for(var a=Ua.seekable?Ua.seekable.length:0,b=1/0;a--;)b=Math.min(b,Ua.seekable.start(a));return b}function _(){for(var a=Ua.seekable?Ua.seekable.length:0,b=0;a--;)b=Math.max(b,Ua.seekable.end(a));return b}function aa(){Ca.seeking=!1,Ca.trigger(d.JWPLAYER_MEDIA_SEEKED)}function ba(){Ca.trigger("volume",{volume:Math.round(100*Ua.volume)}),Ca.trigger("mute",{mute:Ua.muted})}function ca(){Ua.currentTime===za&&P()}function da(){var a=Ua.buffered,c=Ua.duration;return!a||0===a.length||0>=c||c===1/0?0:b.between(a.end(a.length-1)/c,0,1)}function ea(){if(Ia&&Ca.state!==e.IDLE&&Ca.state!==e.COMPLETE){if(n(Ga),Ja=-1,La=!0,Ca.trigger(d.JWPLAYER_MEDIA_BEFORECOMPLETE),!Ia)return;fa()}}function fa(){n(Ga),Ca.setState(e.COMPLETE),La=!1,Ca.trigger(d.JWPLAYER_MEDIA_COMPLETE)}function ga(a){Ma=!0,ma(a),b.isIOS()&&(Ua.controls=!1)}function ha(){var a=-1,b=0;if(Na)for(b;b<Na.length;b++)if("showing"===Na[b].mode){a=b;break}sa(a+1)}function ia(){for(var a=-1,b=0;b<Ua.audioTracks.length;b++)if(Ua.audioTracks[b].enabled){a=b;break}oa(a)}function ja(a){ka(a.currentTarget.activeCues)}function ka(a){if(a&&a.length&&Ra!==a[0].startTime){var b={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"},d=function(a,b){var c,d,e,f,g,h;for(c="",e=a.length,d=b||0;e>d;)switch(f=a[d++],f>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:c+=String.fromCharCode(f);break;case 12:case 13:g=a[d++],c+=String.fromCharCode((31&f)<<6|63&g);break;case 14:g=a[d++],h=a[d++],c+=String.fromCharCode((15&f)<<12|(63&g)<<6|(63&h)<<0)}return c},e=function(a,b){var c,d,e;for(c="",e=a.length,d=b||0;e>d;)254===a[d]&&255===a[d+1]||(c+=String.fromCharCode((a[d]<<8)+a[d+1])),d+=2;return c},f=c.reduce(a,function(a,f){if(!("value"in f)&&"data"in f&&f.data instanceof ArrayBuffer){var g=f,h=new Uint8Array(g.data);f={value:{key:"",data:""}};for(var i=10;14>i&&i<h.length&&0!==h[i];)f.value.key+=String.fromCharCode(h[i]),i++;var j=h[20];1===j||2===j?f.value.data=e(h,21):f.value.data=d(h,21)}if(b.hasOwnProperty(f.value.key)&&(a[b[f.value.key]]=f.value.data),f.value.info){var k=a[f.value.key];c.isObject(k)||(k={},a[f.value.key]=k),k[f.value.info]=f.value.data}else a[f.value.key]=f.value.data;return a},{});Ra=a[0].startTime,Ca.trigger("meta",{metadataTime:Ra,metadata:f})}}function la(a){Ma=!1,ma(a),b.isIOS()&&(Ua.controls=!1)}function ma(a){Ca.trigger("fullscreenchange",{target:a.target,jwstate:Ma})}function na(a){if(Oa=null,a){if(a.length){for(var b=0;b<a.length;b++)if(a[b].enabled){Qa=b;break}-1===Qa&&(Qa=0,a[Qa].enabled=!0),Oa=c.map(a,function(a){var b={name:a.label||a.language,language:a.language};return b})}j(a,"change",ia),Oa&&Ca.trigger("audioTracks",{currentTrack:Qa,tracks:Oa})}}function oa(a){Ua&&Ua.audioTracks&&Oa&&a>-1&&a<Ua.audioTracks.length&&a!==Qa&&(Ua.audioTracks[Qa].enabled=!1,Qa=a,Ua.audioTracks[Qa].enabled=!0,Ca.trigger("audioTrackChanged",{currentTrack:Qa,tracks:Oa}))}function pa(){return Oa||[]}function qa(){return Qa}function ra(a){if(Na=null,a){if(a.length){var b=0,c=a.length;for(b;c>b;b++)"metadata"===a[b].kind?(a[b].oncuechange=ja,a[b].mode="showing"):("subtitles"===a[b].kind||"captions"===a[b].kind)&&(a[b].mode="disabled",Na||(Na=[]),Na.push(a[b]))}j(a,"change",ha),Na&&Na.length&&Ca.trigger("subtitlesTracks",{tracks:Na})}}function sa(a){Na&&Pa!==a-1&&(Pa>-1&&Pa<Na.length?Na[Pa].mode="disabled":c.each(Na,function(a){a.mode="disabled"}),a>0&&a<=Na.length?(Pa=a-1,Na[Pa].mode="showing"):Pa=-1,Ca.trigger("subtitlesTrackChanged",{currentTrack:Pa+1,tracks:Na}))}function ta(){return Pa}function ua(){if("hls"===Ba[0].type){var a="video";0===Ua.videoWidth&&(a="audio"),Ca.trigger("mediaType",{mediaType:a})}}function va(){Na&&Na[Pa]&&(Na[Pa].mode="disabled")}this.state=e.IDLE,this.seeking=!1,c.extend(this,g),this.trigger=function(a,b){return Ia?g.trigger.call(this,a,b):void 0},this.setState=function(a){return Ia?f.setState.call(this,a):void 0};var wa,xa,ya,za,Aa,Ba,Ca=this,Da={click:A,durationchange:B,ended:ea,error:Q,loadeddata:z,loadedmetadata:L,canplay:K,playing:N,progress:C,pause:O,seeked:aa,timeupdate:D,volumechange:ba,webkitbeginfullscreen:ga,webkitendfullscreen:la},Ea=!1,Fa=0,Ga=-1,Ha=-1,Ia=!0,Ja=-1,Ka=null,La=!1,Ma=!1,Na=null,Oa=null,Pa=-1,Qa=-1,Ra=-1,Sa={level:{}},Ta=document.getElementById(m),Ua=Ta?Ta.querySelector("video"):void 0;Ua=Ua||document.createElement("video"),Ua.className="jw-video jw-reset",h(Da,Ua),v||(Ua.controls=!0,Ua.controls=!1),Ua.setAttribute("x-webkit-airplay","allow"),Ua.setAttribute("webkit-playsinline",""),this.stop=function(){n(Ga),Ia&&(X(),b.isIETrident()&&Ua.pause(),Ja=-1,this.setState(e.IDLE))},this.destroy=function(){i(Da,Ua),k(Ua.audioTracks,"change",ia),k(Ua.textTracks,"change",ha),this.remove(),this.off()},this.init=function(a){Ia&&(Ba=a.sources,Ja=T(a.sources),a.sources.length&&"hls"!==a.sources[0].type&&this.sendMediaType(a.sources),xa=Ba[Ja],za=a.starttime||0,ya=a.duration||0,Sa.reason="",W(a))},this.load=function(a){Ia&&(S(a.sources),a.sources.length&&"hls"!==a.sources[0].type&&this.sendMediaType(a.sources),(!r||Ua.hasAttribute("hasplayed"))&&Ca.setState(e.LOADING),V(a.starttime||0,a.duration||0,a))},this.play=function(){return Ca.seeking?(Ca.setState(e.LOADING),void Ca.once(d.JWPLAYER_MEDIA_SEEKED,Ca.play)):void Ua.play()},this.pause=function(){n(Ga),Ua.pause(),this.setState(e.PAUSED)},this.seek=function(a){if(Ia)if(0>a&&(a+=$()+_()),0===Fa&&this.trigger(d.JWPLAYER_MEDIA_SEEK,{position:Ua.currentTime,offset:a}),Ea||(Ea=!!_()),Ea){Fa=0;try{Ca.seeking=!0,Ua.currentTime=a}catch(b){Ca.seeking=!1,Fa=a}}else Fa=a,t&&Ua.paused&&Ua.play()},this.volume=function(a){a=b.between(a/100,0,1),Ua.volume=a},this.mute=function(a){Ua.muted=!!a},this.checkComplete=function(){return La},this.detachMedia=function(){return n(Ga),va(),Ia=!1,Ua},this.attachMedia=function(){Ia=!0,Ea=!1,this.seeking=!1,Ua.loop=!1,La&&fa()},this.setContainer=function(a){wa=a,a.appendChild(Ua)},this.getContainer=function(){return wa},this.remove=function(){X(),n(Ga),Ja=-1,wa===Ua.parentNode&&wa.removeChild(Ua)},this.setVisibility=function(b){b=!!b,b||u?a.style(wa,{visibility:"visible",opacity:1}):a.style(wa,{visibility:"",opacity:0})},this.resize=function(b,c,d){if(!(b&&c&&Ua.videoWidth&&Ua.videoHeight))return!1;var e={objectFit:""};if("uniform"===d){var f=b/c,g=Ua.videoWidth/Ua.videoHeight;Math.abs(f-g)<.09&&(e.objectFit="fill",d="exactfit")}var h=p||u||v||w;if(h){var i=-Math.floor(Ua.videoWidth/2+1),j=-Math.floor(Ua.videoHeight/2+1),k=Math.ceil(100*b/Ua.videoWidth)/100,l=Math.ceil(100*c/Ua.videoHeight)/100;"none"===d?k=l=1:"fill"===d?k=l=Math.max(k,l):"uniform"===d&&(k=l=Math.min(k,l)),e.width=Ua.videoWidth,e.height=Ua.videoHeight,e.top=e.left="50%",e.margin=0,a.transform(Ua,"translate("+i+"px, "+j+"px) scale("+k.toFixed(2)+", "+l.toFixed(2)+")")}return a.style(Ua,e),!1},this.setFullscreen=function(a){if(a=!!a){var c=b.tryCatch(function(){var a=Ua.webkitEnterFullscreen||Ua.webkitEnterFullScreen;a&&a.apply(Ua)});return c instanceof b.Error?!1:Ca.getFullScreen()}var d=Ua.webkitExitFullscreen||Ua.webkitExitFullScreen;return d&&d.apply(Ua),a},Ca.getFullScreen=function(){return Ma||!!Ua.webkitDisplayingFullscreen},this.setCurrentQuality=function(a){if(Ja!==a&&(a=parseInt(a,10),a>=0&&Ba&&Ba.length>a)){Ja=a,Sa.reason="api",Sa.level={width:0,height:0},this.trigger(d.JWPLAYER_MEDIA_LEVEL_CHANGED,{currentQuality:a,levels:R(Ba)}),y.qualityLabel=Ba[a].label;var b=Ua.currentTime||0,c=Ua.duration||0;0>=c&&(c=ya),Ca.setState(e.LOADING),V(b,c)}},this.getCurrentQuality=function(){return Ja},this.getQualityLevels=function(){return R(Ba)},this.getName=function(){return{name:x}},this.setCurrentAudioTrack=oa,this.getAudioTracks=pa,this.getCurrentAudioTrack=qa,this.setSubtitlesTrack=sa,this.getSubtitlesTrack=ta}var n=window.clearTimeout,o=256,p=b.isIE(),q=b.isMSIE(),r=b.isMobile(),s=b.isSafari(),t=b.isFF(),u=b.isAndroidNative(),v=b.isIOS(7),w=b.isIOS(8),x="html5",y=function(){};return y.prototype=f,m.prototype=new y,m}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(46),c(62),c(45)],e=function(a,b,c,d){var e=a.noop,f=d.constant(!1),g={supports:f,play:e,load:e,stop:e,volume:e,mute:e,seek:e,resize:e,remove:e,destroy:e,setVisibility:e,setFullscreen:f,getFullscreen:e,getContainer:e,setContainer:f,getName:e,getQualityLevels:e,getCurrentQuality:e,setCurrentQuality:e,getAudioTracks:e,getCurrentAudioTrack:e,setCurrentAudioTrack:e,checkComplete:e,setControls:e,attachMedia:e,detachMedia:e,setState:function(a){var d=this.state||c.IDLE;this.state=a,a!==d&&this.trigger(b.JWPLAYER_PLAYER_STATE,{newstate:a})},sendMediaType:function(a){var c=a[0].type,d="oga"===c||"aac"===c||"mp3"===c||"mpeg"===c||"vorbis"===c;this.trigger(b.JWPLAYER_MEDIA_TYPE,{mediaType:d?"audio":"video"})}};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(45),c(46),c(62),c(88),c(86),c(47)],e=function(a,b,c,d,e,f,g){function h(a){return a+"_swf_"+k++}function i(b){var c=document.createElement("a");c.href=b.flashplayer;var d=c.hostname===window.location.host;return a.isChrome()&&!d}function j(j,k){function l(a){if(G)for(var b=0;b<a.length;b++){var c=a[b];if(c.bitrate){var d=Math.round(c.bitrate/1e3);c.label=m(d)}}}function m(a){var b=G[a];if(!b){for(var c=1/0,d=G.bitrates.length;d--;){var e=Math.abs(G.bitrates[d]-a);if(e>c)break;c=e}b=G.labels[G.bitrates[d+1]],G[a]=b}return b}function n(){var a=k.hlslabels;if(!a)return null;var b={},c=[];for(var d in a){var e=parseFloat(d);if(!isNaN(e)){var f=Math.round(e);b[f]=a[d],c.push(f)}}return 0===c.length?null:(c.sort(function(a,b){return a-b}),{labels:b,bitrates:c})}function o(){v=setTimeout(function(){g.trigger.call(D,"flashBlocked")},4e3),s.once("embedded",function(){q(),g.trigger.call(D,"flashUnblocked")},D)}function p(){q(),o()}function q(){clearTimeout(v),window.removeEventListener("focus",p)}var r,s,t,u=null,v=-1,w=!1,x=-1,y=null,z=-1,A=null,B=!0,C=!1,D=this,E=function(){return s&&s.__ready},F=function(){s&&s.triggerFlash.apply(s,arguments)},G=n();b.extend(this,g,{init:function(a){a.preload&&"none"!==a.preload&&!k.autostart&&(u=a)},load:function(a){u=a,w=!1,this.setState(d.LOADING),F("load",a),a.sources.length&&"hls"!==a.sources[0].type&&this.sendMediaType(a.sources)},play:function(){F("play")},pause:function(){F("pause"),this.setState(d.PAUSED)},stop:function(){F("stop"),x=-1,u=null,this.setState(d.IDLE)},seek:function(a){F("seek",a)},volume:function(a){if(b.isNumber(a)){var c=Math.min(Math.max(0,a),100);E()&&F("volume",c)}},mute:function(a){E()&&F("mute",a)},setState:function(){return f.setState.apply(this,arguments)},checkComplete:function(){return w},attachMedia:function(){B=!0,w&&(this.setState(d.COMPLETE),this.trigger(c.JWPLAYER_MEDIA_COMPLETE),w=!1)},detachMedia:function(){return B=!1,null},getSwfObject:function(a){var b=a.getElementsByTagName("object")[0];return b?(b.off(null,null,this),b):e.embed(k.flashplayer,a,h(j),k.wmode)},getContainer:function(){return r},setContainer:function(e){if(r!==e){r=e,s=this.getSwfObject(e),document.hasFocus()?o():window.addEventListener("focus",p),s.once("ready",function(){q(),s.once("pluginsLoaded",function(){s.queueCommands=!1,F("setupCommandQueue",s.__commandQueue),s.__commandQueue=[]});var a=b.extend({},k),d=s.triggerFlash("setup",a);d===s?s.__ready=!0:this.trigger(c.JWPLAYER_MEDIA_ERROR,d),u&&F("init",u)},this);var f=[c.JWPLAYER_MEDIA_META,c.JWPLAYER_MEDIA_ERROR,c.JWPLAYER_MEDIA_SEEK,c.JWPLAYER_MEDIA_SEEKED,"subtitlesTracks","subtitlesTrackChanged","subtitlesTrackData","mediaType"],h=[c.JWPLAYER_MEDIA_BUFFER,c.JWPLAYER_MEDIA_TIME],j=[c.JWPLAYER_MEDIA_BUFFER_FULL];s.on(c.JWPLAYER_MEDIA_LEVELS,function(a){l(a.levels),x=a.currentQuality,y=a.levels,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_MEDIA_LEVEL_CHANGED,function(a){l(a.levels),x=a.currentQuality,y=a.levels,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_AUDIO_TRACKS,function(a){z=a.currentTrack,A=a.tracks,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_AUDIO_TRACK_CHANGED,function(a){z=a.currentTrack,A=a.tracks,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_PLAYER_STATE,function(a){var b=a.newstate;b!==d.IDLE&&this.setState(b)},this),s.on(h.join(" "),function(a){"Infinity"===a.duration&&(a.duration=1/0),this.trigger(a.type,a)},this),s.on(f.join(" "),function(a){this.trigger(a.type,a)},this),s.on(j.join(" "),function(a){this.trigger(a.type)},this),s.on(c.JWPLAYER_MEDIA_BEFORECOMPLETE,function(a){w=!0,this.trigger(a.type),B===!0&&(w=!1)},this),s.on(c.JWPLAYER_MEDIA_COMPLETE,function(a){w||(this.setState(d.COMPLETE),this.trigger(a.type))},this),s.on("visualQuality",function(a){a.reason=a.reason||"api",this.trigger("visualQuality",a),this.trigger(c.JWPLAYER_PROVIDER_FIRST_FRAME,{})},this),s.on(c.JWPLAYER_PROVIDER_CHANGED,function(a){t=a.message,this.trigger(c.JWPLAYER_PROVIDER_CHANGED,a)},this),s.on(c.JWPLAYER_ERROR,function(b){a.log("Error playing media: %o %s",b.code,b.message,b),this.trigger(c.JWPLAYER_MEDIA_ERROR,b)},this),i(k)&&s.on("throttle",function(a){q(),"resume"===a.state?g.trigger.call(D,"flashThrottle",a):v=setTimeout(function(){g.trigger.call(D,"flashThrottle",a)},250)},this)}},remove:function(){x=-1,y=null,e.remove(s)},setVisibility:function(a){a=!!a,r.style.opacity=a?1:0},resize:function(a,b,c){c&&F("stretch",c)},setControls:function(a){F("setControls",a)},setFullscreen:function(a){C=a,F("fullscreen",a)},getFullScreen:function(){return C},setCurrentQuality:function(a){F("setCurrentQuality",a)},getCurrentQuality:function(){return x},setSubtitlesTrack:function(a){F("setSubtitlesTrack",a)},getName:function(){return t?{name:"flash_"+t}:{name:"flash"}},getQualityLevels:function(){return y||u.sources},getAudioTracks:function(){return A},getCurrentAudioTrack:function(){return z},setCurrentAudioTrack:function(a){F("setCurrentAudioTrack",a)},destroy:function(){q(),this.remove(),s&&(s.off(),s=null),r=null,u=null,this.off()}}),this.trigger=function(a,b){return B?g.trigger.call(this,a,b):void 0}}var k=0,l=function(){};return l.prototype=f,j.prototype=new l,j}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(47),c(45)],e=function(a,b,c){function d(a,b,c){var d=document.createElement("param");d.setAttribute("name",b),d.setAttribute("value",c),a.appendChild(d)}function e(e,f,i,j){var k;if(j=j||"opaque",a.isMSIE()){var l=document.createElement("div");f.appendChild(l),l.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="'+i+'" name="'+i+'" tabindex="0"><param name="movie" value="'+e+'"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="wmode" value="'+j+'"><param name="bgcolor" value="'+h+'"><param name="menu" value="false"></object>';for(var m=f.getElementsByTagName("object"),n=m.length;n--;)m[n].id===i&&(k=m[n])}else k=document.createElement("object"),k.setAttribute("type","application/x-shockwave-flash"),k.setAttribute("data",e),k.setAttribute("width","100%"),k.setAttribute("height","100%"),k.setAttribute("bgcolor",h),k.setAttribute("id",i),k.setAttribute("name",i),d(k,"allowfullscreen","true"),d(k,"allowscriptaccess","always"),d(k,"wmode",j),d(k,"menu","false"),f.appendChild(k,f);return k.className="jw-swf jw-reset",k.style.display="block",k.style.position="absolute",k.style.left=0,k.style.right=0,k.style.top=0,k.style.bottom=0,c.extend(k,b),k.queueCommands=!0,k.triggerFlash=function(b){var d=this;if("setup"!==b&&d.queueCommands||!d.__externalCall){for(var e=d.__commandQueue,f=e.length;f--;)e[f][0]===b&&e.splice(f,1);return e.push(Array.prototype.slice.call(arguments)),d}var h=Array.prototype.slice.call(arguments,1),i=a.tryCatch(function(){if(h.length){for(var a=h.length;a--;)"object"==typeof h[a]&&c.each(h[a],g);var e=JSON.stringify(h);d.__externalCall(b,e)}else d.__externalCall(b)});return i instanceof a.Error&&(console.error(b,i),"setup"===b)?(i.name="Failed to setup flash",i):d},k.__commandQueue=[],k}function f(a){a&&a.parentNode&&(a.style.display="none",a.parentNode.removeChild(a))}function g(a,b,c){a instanceof window.HTMLElement&&delete c[b]}var h="#000000";return{embed:e,remove:f}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48)],e=function(a,b){function c(a){return"jwplayer."+a}function d(){return a.reduce(this.persistItems,function(a,d){var e=j[c(d)];return e&&(a[d]=b.serialize(e)),a},{})}function e(a,b){try{j[c(a)]=b}catch(d){i&&i.debug&&console.error(d)}}function f(){a.each(this.persistItems,function(a){j.removeItem(c(a))})}function g(){}function h(b,c){this.persistItems=b,a.each(this.persistItems,function(a){c.on("change:"+a,function(b,c){e(a,c)})})}var i=window.jwplayer,j={removeItem:b.noop};try{j=window.localStorage}catch(k){}return a.extend(g.prototype,{getAllItems:d,track:h,clear:f}),g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(61),c(46),c(45)],e=function(a,b,c){function d(a){a.mediaController.off(b.JWPLAYER_MEDIA_PLAY_ATTEMPT,a._onPlayAttempt),a.mediaController.off(b.JWPLAYER_PROVIDER_FIRST_FRAME,a._triggerFirstFrame),a.mediaController.off(b.JWPLAYER_MEDIA_TIME,a._onTime)}function e(a){d(a),a._triggerFirstFrame=c.once(function(){var c=a._qoeItem;c.tick(b.JWPLAYER_MEDIA_FIRST_FRAME);var e=c.between(b.JWPLAYER_MEDIA_PLAY_ATTEMPT,b.JWPLAYER_MEDIA_FIRST_FRAME);a.mediaController.trigger(b.JWPLAYER_MEDIA_FIRST_FRAME,{loadTime:e}),d(a)}),a._onTime=g(a._triggerFirstFrame),a._onPlayAttempt=function(){a._qoeItem.tick(b.JWPLAYER_MEDIA_PLAY_ATTEMPT)},a.mediaController.on(b.JWPLAYER_MEDIA_PLAY_ATTEMPT,a._onPlayAttempt),a.mediaController.once(b.JWPLAYER_PROVIDER_FIRST_FRAME,a._triggerFirstFrame),a.mediaController.on(b.JWPLAYER_MEDIA_TIME,a._onTime)}function f(c){function d(c,d,f){c._qoeItem&&f&&c._qoeItem.end(f.get("state")),c._qoeItem=new a,c._qoeItem.tick(b.JWPLAYER_PLAYLIST_ITEM),c._qoeItem.start(d.get("state")),e(c),d.on("change:state",function(a,b,d){c._qoeItem.end(d),c._qoeItem.start(b)})}c.on("change:mediaModel",d)}var g=function(a){var b=Number.MIN_VALUE;return function(c){c.position>b&&a(),b=c.position}};return{model:f}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(47)],e=function(a,b){var c=a.extend({get:function(a){return this.attributes=this.attributes||{},this.attributes[a]},set:function(a,b){if(this.attributes=this.attributes||{},this.attributes[a]!==b){var c=this.attributes[a];this.attributes[a]=b,this.trigger("change:"+a,this,b,c)}},clone:function(){return a.clone(this.attributes)}},b);return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(47),c(77),c(76),c(46),c(62),c(48),c(45)],e=function(a,b,c,d,e,f,g){var h=function(a,d){this.model=d,this._adModel=(new b).setup({id:d.get("id"),volume:d.get("volume"),fullscreen:d.get("fullscreen"),mute:d.get("mute")}),this._adModel.on("change:state",c,this);var e=a.getContainer();this.swf=e.querySelector("object")};return h.prototype=g.extend({init:function(){if(f.isChrome()){var a=-1,b=!1;this.swf.on("throttle",function(c){if(clearTimeout(a),"resume"===c.state)b&&(b=!1,this.instreamPlay());else{var d=this;a=setTimeout(function(){d._adModel.get("state")===e.PLAYING&&(b=!0,d.instreamPause())},250)}},this)}this.swf.on("instream:state",function(a){switch(a.newstate){case e.PLAYING:this._adModel.set("state",a.newstate);break;case e.PAUSED:this._adModel.set("state",a.newstate)}},this).on("instream:time",function(a){this._adModel.set("position",a.position),this._adModel.set("duration",a.duration),this.trigger(d.JWPLAYER_MEDIA_TIME,a)},this).on("instream:complete",function(a){this.trigger(d.JWPLAYER_MEDIA_COMPLETE,a)},this).on("instream:error",function(a){this.trigger(d.JWPLAYER_MEDIA_ERROR,a)},this),this.swf.triggerFlash("instream:init"),this.applyProviderListeners=function(a){this.model.on("change:volume",function(b,c){a.volume(c)},this),this.model.on("change:mute",function(b,c){a.mute(c)},this)}},instreamDestroy:function(){this._adModel&&(this.off(),this.swf.off(null,null,this),this.swf.triggerFlash("instream:destroy"),this.swf=null,this._adModel.off(),this._adModel=null,this.model=null)},load:function(a){this.swf.triggerFlash("instream:load",a)},instreamPlay:function(){this.swf.triggerFlash("instream:play")},instreamPause:function(){this.swf.triggerFlash("instream:pause")}},a),h}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(94),c(47),c(45),c(46)],e=function(a,b,c,d){var e=function(b,e,f,g){function h(){m("Setup Timeout Error","Setup took longer than "+q+" seconds to complete.")}function i(){c.each(p,function(a){a.complete!==!0&&a.running!==!0&&null!==b&&k(a.depends)&&(a.running=!0,j(a))})}function j(a){var c=function(b){b=b||{},l(a,b)};a.method(c,e,b,f,g)}function k(a){return c.all(a,function(a){return p[a].complete})}function l(a,b){"error"===b.type?m(b.msg,b.reason):"complete"===b.type?(clearTimeout(n),o.trigger(d.JWPLAYER_READY)):(a.complete=!0,i())}function m(a,b){clearTimeout(n),o.trigger(d.JWPLAYER_SETUP_ERROR,{message:a+": "+b}),o.destroy()}var n,o=this,p=a.getQueue(),q=30;this.start=function(){n=setTimeout(h,1e3*q),i()},this.destroy=function(){clearTimeout(n),this.off(),p.length=0,b=null,e=null,f=null}};return e.prototype=b,e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(95),c(81),c(80),c(45),c(48),c(57),c(97)],e=function(a,b,d,e,f,g,h){function i(a,b,c){if(b){var d=b.client;delete b.client,/\.(js|swf)$/.test(d||"")||(d=g.repo()+c),a[d]=b}}function j(a,c){var d=e.clone(c.get("plugins"))||{},f=c.get("edition"),h=b(f),j=/^(vast|googima)$/,k=/\.(js|swf)$/,l=g.repo(),m=c.get("advertising");if(h("ads")&&m&&(k.test(m.client)?d[m.client]=m:j.test(m.client)&&(d[l+m.client+".js"]=m),delete m.client),h("jwpsrv")){var n=c.get("analytics");e.isObject(n)||(n={}),i(d,n,"jwpsrv.js")}i(d,c.get("ga"),"gapro.js"),i(d,c.get("sharing"),"sharing.js"),i(d,c.get("related"),"related.js"),c.set("plugins",d),a()}function k(b,d){var e=d.get("key")||window.jwplayer&&window.jwplayer.key,i=new a(e),j=i.edition();if(d.set("key",e),d.set("edition",j),"unlimited"===j){var k=f.getScriptPath("jwplayer.js");if(!k)return void h.error(b,"Error setting up player","Could not locate jwplayer.js script tag");c.p=k,f.repo=g.repo=g.loadFrom=function(){return k}}d.updateProviders(),"invalid"===j?h.error(b,"Error setting up player",(void 0===e?"Missing":"Invalid")+" license key"):b()}function l(a,b,d){"dashjs"===a?c.e(4,function(a){var e=c(107);e.register(window.jwplayer),d.updateProviders(),b()}):c.e(5,function(a){var e=c(109);e.register(window.jwplayer),d.updateProviders(),b()})}function m(a,b){var c=b.get("playlist"),f=b.get("edition"),g=b.get("dash");e.contains(["shaka","dashjs"],g)||(g="shaka");var h=e.where(d,{name:g})[0].supports,i=e.some(c,function(a){return h(a,f)});i?l(g,a,b):a()}function n(){var a=h.getQueue();return a.LOAD_DASH={method:m,depends:["CHECK_KEY","FILTER_PLAYLIST"]},a.CHECK_KEY={method:k,depends:["LOADED_POLYFILLS"]},a.FILTER_PLUGINS={method:j,depends:["CHECK_KEY"]},a.FILTER_PLAYLIST.depends.push("CHECK_KEY"),a.LOAD_PLUGINS.depends.push("FILTER_PLUGINS"),a.SETUP_VIEW.depends.push("CHECK_KEY"),a.SEND_READY.depends.push("LOAD_DASH"),a}return{getQueue:n}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(96),c(81)],e=function(a,b,c){var d="invalid",e="RnXcsftYjWRDA^Uy",f=function(f){function g(f){a.exists(f)||(f="");try{f=b.decrypt(f,e);var g=f.split("/");h=g[0],"pro"===h&&(h="premium");var k=c(h);if(g.length>2&&k("setup")){i=g[1];var l=parseInt(g[2]);l>0&&(j=new Date,j.setTime(l))}else h=d}catch(m){h=d}}var h,i,j;this.edition=function(){return j&&j.getTime()<(new Date).getTime()?d:h},this.token=function(){return i},this.expiration=function(){return j},g(f)};return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a=function(a){return window.atob(a)},b=function(a){return unescape(encodeURIComponent(a))},c=function(a){try{return decodeURIComponent(escape(a))}catch(b){return a}},d=function(a){for(var b=new Array(Math.ceil(a.length/4)),c=0;c<b.length;c++)b[c]=a.charCodeAt(4*c)+(a.charCodeAt(4*c+1)<<8)+(a.charCodeAt(4*c+2)<<16)+(a.charCodeAt(4*c+3)<<24);return b},e=function(a){for(var b=new Array(a.length),c=0;c<a.length;c++)b[c]=String.fromCharCode(255&a[c],a[c]>>>8&255,a[c]>>>16&255,a[c]>>>24&255);return b.join("")};return{decrypt:function(f,g){if(f=String(f),g=String(g),0==f.length)return"";for(var h,i,j=d(a(f)),k=d(b(g).slice(0,16)),l=j.length,m=j[l-1],n=j[0],o=2654435769,p=Math.floor(6+52/l),q=p*o;0!=q;){i=q>>>2&3;for(var r=l-1;r>=0;r--)m=j[r>0?r-1:l-1],h=(m>>>5^n<<2)+(n>>>3^m<<4)^(q^n)+(k[3&r^i]^m),n=j[r]-=h;q-=o}var s=e(j);return s=s.replace(/\0+$/,""),c(s)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(98),c(65),c(101),c(58),c(45),c(48),c(46)],e=function(a,b,d,e,f,g,h){function i(){var a={LOAD_PROMISE_POLYFILL:{method:j,depends:[]},LOAD_BASE64_POLYFILL:{method:k,depends:[]},LOADED_POLYFILLS:{method:l,depends:["LOAD_PROMISE_POLYFILL","LOAD_BASE64_POLYFILL"]},LOAD_PLUGINS:{method:m,depends:["LOADED_POLYFILLS"]},INIT_PLUGINS:{method:n,depends:["LOAD_PLUGINS","SETUP_VIEW"]},LOAD_YOUTUBE:{method:v,depends:["FILTER_PLAYLIST"]},LOAD_SKIN:{method:u,depends:["LOADED_POLYFILLS"]},LOAD_PLAYLIST:{method:p,depends:["LOADED_POLYFILLS"]},FILTER_PLAYLIST:{method:q,depends:["LOAD_PLAYLIST"]},SETUP_VIEW:{method:w,depends:["LOAD_SKIN"]},SEND_READY:{method:x,depends:["INIT_PLUGINS","LOAD_YOUTUBE","SETUP_VIEW"]}};return a}function j(a){window.Promise?a():c.e(1,function(b){c(104),a()})}function k(a){window.btoa&&window.atob?a():c.e(2,function(b){c(105),a()})}function l(a){a()}function m(b,c){z=a.loadPlugins(c.get("id"),c.get("plugins")),z.on(h.COMPLETE,b),z.on(h.ERROR,f.partial(o,b)),z.load()}function n(a,b,c){z.setupPlugins(c,b),a()}function o(a,b){y(a,"Could not load plugin",b.message)}function p(a,c){var d=c.get("playlist");f.isString(d)?(A=new b,A.on(h.JWPLAYER_PLAYLIST_LOADED,function(b){c.set("playlist",b.playlist),a()}),A.on(h.JWPLAYER_ERROR,f.partial(r,a)),A.load(d)):a()}function q(a,b,c,d,e){var f=b.get("playlist"),g=e(f);g?a():r(a)}function r(a,b){b&&b.message?y(a,"Error loading playlist",b.message):y(a,"Error loading player","No playable sources found")}function s(a,b){return f.contains(e.SkinsLoadable,a)?b+"skins/"+a+".css":void 0}function t(a){for(var b=document.styleSheets,c=0,d=b.length;d>c;c++)if(b[c].href===a)return!0;return!1}function u(a,b){var c=b.get("skin"),g=b.get("skinUrl");if(f.contains(e.SkinsIncluded,c))return void a();if(g||(g=s(c,b.get("base"))),f.isString(g)&&!t(g)){b.set("skin-loading",!0);var i=!0,j=new d(g,i);j.addEventListener(h.COMPLETE,function(){b.set("skin-loading",!1)}),j.addEventListener(h.ERROR,function(){b.set("skin","seven"),b.set("skin-loading",!1)}),j.load()}f.defer(function(){a()})}function v(a,b){var d=b.get("playlist"),e=f.some(d,function(a){var b=g.isYouTube(a.file,a.type);if(b&&!a.image){var c=a.file,d=g.youTubeID(c);a.image="//i.ytimg.com/vi/"+d+"/0.jpg"}return b});e?c.e(3,function(b){var d=c(106);d.register(window.jwplayer),a()}):a()}function w(a,b,c,d){d.setup(),a()}function x(a){a({type:"complete"})}function y(a,b,c){a({type:"error",msg:b,reason:c})}var z,A;return{getQueue:i,error:y}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(99),c(102),c(103),c(100)],e=function(a,b,c,d){var e={},f={},g=function(c,d){return f[c]=new a(new b(e),d),f[c]},h=function(a,b,f,g){var h=d.getPluginName(a);e[h]||(e[h]=new c(a)),e[h].registerPlugin(a,b,f,g)};return{loadPlugins:g,registerPlugin:h}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(100),c(48),c(46),c(47),c(45),c(101)],e=function(a,b,c,d,e,f){function g(a,b,c){return function(){var d=a.getContainer().getElementsByClassName("jw-overlays")[0];d&&(d.appendChild(c),c.left=d.style.left,c.top=d.style.top,b.displayArea=d)}}function h(a){function b(){var b=a.displayArea;b&&a.resize(b.clientWidth,b.clientHeight)}return function(){b(),setTimeout(b,400)}}var i=function(i,j){function k(){q||(q=!0,p=f.loaderstatus.COMPLETE,o.trigger(c.COMPLETE))}function l(){if(!s&&(j&&0!==e.keys(j).length||k(),!q)){var d=i.getPlugins();n=e.after(r,k),e.each(j,function(e,g){var h=a.getPluginName(g),i=d[h],j=i.getJS(),k=i.getTarget(),l=i.getStatus();l!==f.loaderstatus.LOADING&&l!==f.loaderstatus.NEW&&(j&&!b.versionCheck(k)&&o.trigger(c.ERROR,{message:"Incompatible player version"}),n())})}}function m(a){if(!s){var d="File not found";a.url&&b.log(d,a.url),this.off(),this.trigger(c.ERROR,{message:d}),l()}}var n,o=e.extend(this,d),p=f.loaderstatus.NEW,q=!1,r=e.size(j),s=!1;this.setupPlugins=function(c,d){var f=[],j=i.getPlugins(),k=d.get("plugins");e.each(k,function(d,i){var l=a.getPluginName(i),m=j[l],n=m.getFlashPath(),o=m.getJS(),p=m.getURL();if(n){var q=e.extend({name:l,swf:n,pluginmode:m.getPluginmode()},d);f.push(q)}var r=b.tryCatch(function(){if(o&&k[p]){var a=document.createElement("div");a.id=c.id+"_"+l,a.className="jw-plugin jw-reset";var b=e.extend({},k[p]),d=m.getNewInstance(c,b,a);d.addToPlayer=g(c,d,a),d.resizeHandler=h(d),c.addPlugin(l,d,a)}});r instanceof b.Error&&b.log("ERROR: Failed to load "+l+".")}),d.set("flashPlugins",f)},this.load=function(){if(b.exists(j)&&"object"!==b.typeOf(j))return void l();p=f.loaderstatus.LOADING,e.each(j,function(a,d){if(b.exists(d)){var e=i.addPlugin(d);e.on(c.COMPLETE,l),e.on(c.ERROR,m)}});var a=i.getPlugins();e.each(a,function(a){a.load()}),l()},this.destroy=function(){s=!0,this.off()},this.getStatus=function(){return p}};return i}.apply(b,d),!(void 0!==e&&(a.exports=e));
},function(a,b,c){var d,e;d=[c(51)],e=function(a){var b={},c=b.pluginPathType={ABSOLUTE:0,RELATIVE:1,CDN:2};return b.getPluginPathType=function(b){if("string"==typeof b){b=b.split("?")[0];var d=b.indexOf("://");if(d>0)return c.ABSOLUTE;var e=b.indexOf("/"),f=a.extension(b);return!(0>d&&0>e)||f&&isNaN(f)?c.RELATIVE:c.CDN}},b.getPluginName=function(a){return a.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/,"$2")},b.getPluginVersion=function(a){return a.replace(/[^-]*-?([^\.]*).*$/,"$1")},b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(46),c(47),c(45)],e=function(a,b,c){var d={},e={NEW:0,LOADING:1,ERROR:2,COMPLETE:3},f=function(f,g){function h(b){k=e.ERROR,j.trigger(a.ERROR,b)}function i(b){k=e.COMPLETE,j.trigger(a.COMPLETE,b)}var j=c.extend(this,b),k=e.NEW;this.addEventListener=this.on,this.removeEventListener=this.off,this.makeStyleLink=function(a){var b=document.createElement("link");return b.type="text/css",b.rel="stylesheet",b.href=a,b},this.makeScriptTag=function(a){var b=document.createElement("script");return b.src=a,b},this.makeTag=g?this.makeStyleLink:this.makeScriptTag,this.load=function(){if(k===e.NEW){var b=d[f];if(b&&(k=b.getStatus(),2>k))return b.on(a.ERROR,h),void b.on(a.COMPLETE,i);var c=document.getElementsByTagName("head")[0]||document.documentElement,j=this.makeTag(f),l=!1;j.onload=j.onreadystatechange=function(a){l||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(l=!0,i(a),j.onload=j.onreadystatechange=null,c&&j.parentNode&&!g&&c.removeChild(j))},j.onerror=h,c.insertBefore(j,c.firstChild),k=e.LOADING,d[f]=this}},this.getStatus=function(){return k}};return f.loaderstatus=e,f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(100),c(103)],e=function(a,b){var c=function(c){this.addPlugin=function(d){var e=a.getPluginName(d);return c[e]||(c[e]=new b(d)),c[e]},this.getPlugins=function(){return c}};return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(100),c(46),c(47),c(101),c(45)],e=function(a,b,c,d,e,f){var g={FLASH:0,JAVASCRIPT:1,HYBRID:2},h=function(h){function i(){switch(b.getPluginPathType(h)){case b.pluginPathType.ABSOLUTE:return h;case b.pluginPathType.RELATIVE:return a.getAbsolutePath(h,window.location.href)}}function j(){f.defer(function(){q=e.loaderstatus.COMPLETE,p.trigger(c.COMPLETE)})}function k(){q=e.loaderstatus.ERROR,p.trigger(c.ERROR,{url:h})}var l,m,n,o,p=f.extend(this,d),q=e.loaderstatus.NEW;this.load=function(){if(q===e.loaderstatus.NEW){if(h.lastIndexOf(".swf")>0)return l=h,q=e.loaderstatus.COMPLETE,void p.trigger(c.COMPLETE);if(b.getPluginPathType(h)===b.pluginPathType.CDN)return q=e.loaderstatus.COMPLETE,void p.trigger(c.COMPLETE);q=e.loaderstatus.LOADING;var a=new e(i());a.on(c.COMPLETE,j),a.on(c.ERROR,k),a.load()}},this.registerPlugin=function(a,b,d,f){o&&(clearTimeout(o),o=void 0),n=b,d&&f?(l=f,m=d):"string"==typeof d?l=d:"function"==typeof d?m=d:d||f||(l=a),q=e.loaderstatus.COMPLETE,p.trigger(c.COMPLETE)},this.getStatus=function(){return q},this.getPluginName=function(){return b.getPluginName(h)},this.getFlashPath=function(){if(l)switch(b.getPluginPathType(l)){case b.pluginPathType.ABSOLUTE:return l;case b.pluginPathType.RELATIVE:return h.lastIndexOf(".swf")>0?a.getAbsolutePath(l,window.location.href):a.getAbsolutePath(l,i())}return null},this.getJS=function(){return m},this.getTarget=function(){return n},this.getPluginmode=function(){return void 0!==typeof l&&void 0!==typeof m?g.HYBRID:void 0!==typeof l?g.FLASH:void 0!==typeof m?g.JAVASCRIPT:void 0},this.getNewInstance=function(a,b,c){return new m(a,b,c)},this.getURL=function(){return h}};return h}.apply(b,d),!(void 0!==e&&(a.exports=e))},,,,,,,,function(a,b,c){var d,e;d=[c(66),c(112),c(113),c(48)],e=function(a,b,c,d){var e=function(e,f){function g(a){if(a.tracks.length){f.mediaController.off("meta",h),s=[],t={},u={},v=0;for(var b=a.tracks||[],c=0;c<b.length;c++){var d=b[c];d.id=d.name,d.label=d.name||d.language,l(d)}var e=o();this.setCaptionsList(e),p()}}function h(a){var b=a.metadata;if(b&&"textdata"===b.type){if(!b.text)return;var c=t[b.trackid];if(!c){c={kind:"captions",id:b.trackid,data:[]},l(c);var d=o();this.setCaptionsList(d)}var e,g;b.useDTS?(c.source||(c.source=b.source||"mpegts"),e=b.begin,g=b.begin+"_"+b.text):(e=a.position||f.get("position"),g=""+Math.round(10*e)+"_"+b.text);var h=u[g];h||(h={begin:e,text:b.text},b.end&&(h.end=b.end),u[g]=h,c.data.push(h))}}function i(a){d.log("CAPTIONS("+a+")")}function j(a,b){if(r=b,s=[],t={},u={},v=0,f.mediaController.off("meta",h),f.mediaController.off("subtitlesTracks",g),!d.isIOS()){var c,e,i,j=b.tracks;for(i=0;i<j.length;i++)c=j[i],e=c.kind.toLowerCase(),("captions"===e||"subtitles"===e)&&(c.file?(l(c),m(c)):c.data&&l(c))}0===s.length&&(f.mediaController.on("meta",h,this),f.mediaController.on("subtitlesTracks",g,this));var k=o();this.setCaptionsList(k),p()}function k(a,b){var c=null;0!==b&&(c=s[b-1]),a.set("captionsTrack",c)}function l(a){"number"!=typeof a.id&&(a.id=a.name||a.file||"cc"+s.length),a.data=a.data||[],a.label||(a.label="Unknown CC",v++,v>1&&(a.label+=" ("+v+")")),s.push(a),t[a.id]=a}function m(a){d.ajax(a.file,function(b){n(b,a)},i)}function n(e,f){var g,h=e.responseXML?e.responseXML.firstChild:null;if(h)for("xml"===a.localName(h)&&(h=h.nextSibling);h.nodeType===h.COMMENT_NODE;)h=h.nextSibling;g=h&&"tt"===a.localName(h)?d.tryCatch(function(){f.data=c(e.responseXML)}):d.tryCatch(function(){f.data=b(e.responseText)}),g instanceof d.Error&&i(g.message+": "+f.file)}function o(){for(var a=[{id:"off",label:"Off"}],b=0;b<s.length;b++)a.push({id:s[b].id,label:s[b].label||"Unknown CC"});return a}function p(){var a=0,b=f.get("captionLabel");if("Off"===b)return void f.set("captionsIndex",0);for(var c=0;c<s.length;c++){var d=s[c];if(b&&b===d.label){a=c+1;break}d["default"]||d.defaulttrack?a=c+1:d.autoselect}q(a)}function q(a){s.length?f.setVideoSubtitleTrack(a,s):f.set("captionsIndex",a)}f.on("change:playlistItem",j,this),f.on("change:captionsIndex",k,this),f.mediaController.on("subtitlesTracks",g,this),f.mediaController.on("subtitlesTrackData",function(a){var b=t[a.name];if(b){b.source=a.source;for(var c=a.captions||[],d=!1,e=0;e<c.length;e++){var f=c[e],g=a.name+"_"+f.begin+"_"+f.end;u[g]||(u[g]=f,b.data.push(f),d=!0)}d&&b.data.sort(function(a,b){return a.begin-b.begin})}},this),f.mediaController.on("meta",h,this);var r={},s=[],t={},u={},v=0;this.getCurrentIndex=function(){return f.get("captionsIndex")},this.getCaptionsList=function(){return f.get("captionsList")},this.setCaptionsList=function(a){f.set("captionsList",a)}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(51)],e=function(a,b){function c(a){var b={},c=a.split("\r\n");1===c.length&&(c=a.split("\n"));var e=1;if(c[0].indexOf(" --> ")>0&&(e=0),c.length>e+1&&c[e+1]){var f=c[e],g=f.indexOf(" --> ");g>0&&(b.begin=d(f.substr(0,g)),b.end=d(f.substr(g+5)),b.text=c.slice(e+1).join("<br/>"))}return b}var d=a.seconds;return function(a){var d=[];a=b.trim(a);var e=a.split("\r\n\r\n");1===e.length&&(e=a.split("\n\n"));for(var f=0;f<e.length;f++)if("WEBVTT"!==e[f]){var g=c(e[f]);g.text&&d.push(g)}if(!d.length)throw new Error("Invalid SRT file");return d}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51)],e=function(a){function b(a){a||c()}function c(){throw new Error("Invalid DFXP file")}var d=a.seconds;return function(e){b(e);var f=[],g=e.getElementsByTagName("p");b(g),g.length||(g=e.getElementsByTagName("tt:p"),g.length||(g=e.getElementsByTagName("tts:p")));for(var h=0;h<g.length;h++){var i=g[h],j=i.innerHTML||i.textContent||i.text||"",k=a.trim(j).replace(/>\s+</g,"><").replace(/tts?:/g,"");if(k){var l=i.getAttribute("begin"),m=i.getAttribute("dur"),n=i.getAttribute("end"),o={begin:d(l),text:k};n?o.end=d(n):m&&(o.end=o.begin+d(m)),f.push(o)}}return f.length||c(),f}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(70),c(71),c(45),c(78)],e=function(a,b,c,d){function e(a,b){for(var c=0;c<a.length;c++){var d=a[c],e=b.choose(d);if(e)return d.type}return null}var f=function(b){return b=c.isArray(b)?b:[b],c.compact(c.map(b,a))};f.filterPlaylist=function(a,b,d,e,f){var i=[];return c.each(a,function(a){a=c.extend({},a),a.allSources=g(a.sources,d,a.drm||e,a.preload||f),a.sources=h(a.allSources,b),a.sources.length&&(a.file=a.sources[0].file,(a.preload||f)&&(a.preload=a.preload||f),i.push(a))}),i};var g=function(a,d,e,f){return c.compact(c.map(a,function(a){return c.isObject(a)?(void 0!==d&&null!==d&&(a.androidhls=d),(a.drm||e)&&(a.drm=a.drm||e),(a.preload||f)&&(a.preload=a.preload||f),b(a)):void 0}))},h=function(a,b){b&&b.choose||(b=new d({primary:b?"flash":null}));var f=e(a,b);return c.where(a,{type:f})};return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return function(a,b){a.getPlaylistIndex=a.getItem;var c={jwPlay:b.play,jwPause:b.pause,jwSetMute:b.setMute,jwLoad:b.load,jwPlaylistItem:b.item,jwGetAudioTracks:b.getAudioTracks,jwDetachMedia:b.detachMedia,jwAttachMedia:b.attachMedia,jwAddEventListener:b.on,jwRemoveEventListener:b.off,jwStop:b.stop,jwSeek:b.seek,jwSetVolume:b.setVolume,jwPlaylistNext:b.next,jwPlaylistPrev:b.prev,jwSetFullscreen:b.setFullscreen,jwGetQualityLevels:b.getQualityLevels,jwGetCurrentQuality:b.getCurrentQuality,jwSetCurrentQuality:b.setCurrentQuality,jwSetCurrentAudioTrack:b.setCurrentAudioTrack,jwGetCurrentAudioTrack:b.getCurrentAudioTrack,jwGetCaptionsList:b.getCaptionsList,jwGetCurrentCaptions:b.getCurrentCaptions,jwSetCurrentCaptions:b.setCurrentCaptions,jwSetCues:b.setCues};a.callInternal=function(a){console.log("You are using the deprecated callInternal method for "+a);var d=Array.prototype.slice.call(arguments,1);c[a].apply(b,d)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(117),c(46),c(154)],e=function(a,b,c){var d=function(d,e){var f=new a(d,e),g=f.setup;return f.setup=function(){if(g.call(this),"trial"===e.get("edition")){var a=document.createElement("div");a.className="jw-icon jw-watermark",this.element().appendChild(a)}e.on("change:skipButton",this.onSkipButton,this),e.on("change:castActive change:playlistItem",this.showDisplayIconImage,this)},f.showDisplayIconImage=function(a){var b=a.get("castActive"),c=a.get("playlistItem"),d=f.controlsContainer().getElementsByClassName("jw-display-icon-container")[0];b&&c&&c.image?(d.style.backgroundImage='url("'+c.image+'")',d.style.backgroundSize="contain"):(d.style.backgroundImage="",d.style.backgroundSize="")},f.onSkipButton=function(a,b){b?this.addSkipButton():this._skipButton&&(this._skipButton.destroy(),this._skipButton=null)},f.addSkipButton=function(){this._skipButton=new c(this.instreamModel),this._skipButton.on(b.JWPLAYER_AD_SKIPPED,function(){this.api.skipAd()},this),this.controlsContainer().appendChild(this._skipButton.element())},f};return d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(46),c(47),c(58),c(62),c(128),c(129),c(130),c(118),c(132),c(134),c(148),c(149),c(152),c(45),c(153)],e=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=a.style,r=a.bounds,s=a.isMobile(),t=["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],u=function(u,v){function w(b){var c=0,e=v.get("duration"),f=v.get("position");"DVR"===a.adaptiveType(e)&&(c=e,e=Math.max(f,d.dvrSeekLimit));var g=a.between(f+b,c,e);u.seek(g)}function x(b){var c=a.between(v.get("volume")+b,0,100);u.setVolume(c)}function y(a){return a.ctrlKey||a.metaKey?!1:v.get("controls")?!0:!1}function z(a){if(!y(a))return!0;switch(Ga||aa(),a.keyCode){case 27:u.setFullscreen(!1);break;case 13:case 32:u.play({reason:"interaction"});break;case 37:Ga||w(-5);break;case 39:Ga||w(5);break;case 38:x(10);break;case 40:x(-10);break;case 77:u.setMute();break;case 70:u.setFullscreen();break;default:if(a.keyCode>=48&&a.keyCode<=59){var b=a.keyCode-48,c=b/10*v.get("duration");u.seek(c)}}return/13|32|37|38|39|40/.test(a.keyCode)?(a.preventDefault(),!1):void 0}function A(){La=!1,a.removeClass(ja,"jw-no-focus")}function B(){La=!0,a.addClass(ja,"jw-no-focus")}function C(){La||A(),Ga||aa()}function D(){var a=r(ja),c=Math.round(a.width),d=Math.round(a.height);return document.body.contains(ja)?c&&d&&(c!==ma||d!==na)&&(ma=c,na=d,clearTimeout(Ia),Ia=setTimeout(X,50),v.set("containerWidth",c),v.set("containerHeight",d),Ma.trigger(b.JWPLAYER_RESIZE,{width:c,height:d})):(window.removeEventListener("resize",D),s&&window.removeEventListener("orientationchange",D)),a}function E(b,c){c=c||!1,a.toggleClass(ja,"jw-flag-casting",c)}function F(b,c){a.toggleClass(ja,"jw-flag-cast-available",c),a.toggleClass(ka,"jw-flag-cast-available",c)}function G(b,c){a.replaceClass(ja,/jw-stretch-\S+/,"jw-stretch-"+c)}function H(b,c){a.toggleClass(ja,"jw-flag-compact-player",c)}function I(a){a&&!s&&(a.element().addEventListener("mousemove",L,!1),a.element().addEventListener("mouseout",M,!1))}function J(){v.get("state")!==e.IDLE&&v.get("state")!==e.COMPLETE&&v.get("state")!==e.PAUSED||!v.get("controls")||u.play({reason:"interaction"}),Ha?_():aa()}function K(a){a.link?(u.pause(!0),u.setFullscreen(!1),window.open(a.link,a.linktarget)):v.get("controls")&&u.play({reason:"interaction"})}function L(){clearTimeout(Da)}function M(){aa()}function N(a){Ma.trigger(a.type,a)}function O(b,c){c?(ya&&ya.destroy(),a.addClass(ja,"jw-flag-flash-blocked")):(ya&&ya.setup(v,ja,ja),a.removeClass(ja,"jw-flag-flash-blocked"))}function P(){v.get("controls")&&u.setFullscreen()}function Q(){var c=ja.getElementsByClassName("jw-overlays")[0];c.addEventListener("mousemove",aa),ra=new g(v,la,{useHover:!0}),ra.on("click",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),v.get("controls")&&u.play({reason:"interaction"})}),ra.on("tap",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),J()}),ra.on("doubleClick",P),ra.on("move",aa),ra.on("over",aa);var d=new h(v);d.on("click",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),u.play({reason:"interaction"})}),d.on("tap",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),J()}),a.isChrome()&&d.el.addEventListener("mousedown",function(){var a=v.getVideo(),b=a&&0===a.getName().name.indexOf("flash");if(b){var c=function(){document.removeEventListener("mouseup",c),d.el.style.pointerEvents="auto"};this.style.pointerEvents="none",document.addEventListener("mouseup",c)}}),ka.appendChild(d.element()),ta=new i(v),ua=new j(v),ua.on(b.JWPLAYER_LOGO_CLICK,K);var e=document.createElement("div");e.className="jw-controls-right jw-reset",ua.setup(e),e.appendChild(ta.element()),ka.appendChild(e),wa=new f(v),wa.setup(v.get("captions")),ka.parentNode.insertBefore(wa.element(),va.element());var l=v.get("height");s&&("string"==typeof l||l>=1.5*Fa)?a.addClass(ja,"jw-flag-touch"):(ya=new m,ya.setup(v,ja,ja)),pa=new k(u,v),pa.on(b.JWPLAYER_USER_ACTION,aa),v.on("change:scrubbing",S),v.on("change:compactUI",H),ka.appendChild(pa.element()),ja.addEventListener("focus",C),ja.addEventListener("blur",A),ja.addEventListener("keydown",z),ja.onmousedown=B}function R(b){return b.get("state")===e.PAUSED?void b.once("change:state",R):void(b.get("scrubbing")===!1&&a.removeClass(ja,"jw-flag-dragging"))}function S(b,c){b.off("change:state",R),c?a.addClass(ja,"jw-flag-dragging"):R(b)}function T(b,c,d){var e,f=ja.className;d=!!d,d&&(f=f.replace(/\s*aspectMode/,""),ja.className!==f&&(ja.className=f),q(ja,{display:"block"},d)),a.exists(b)&&a.exists(c)&&(v.set("width",b),v.set("height",c)),e={width:b},a.hasClass(ja,"jw-flag-aspect-mode")||(e.height=c),q(ja,e,!0),U(c),X(b,c)}function U(b){if(xa=V(b),pa&&!xa){var c=Ga?oa:v;ia(c,c.get("state"))}a.toggleClass(ja,"jw-flag-audio-player",xa)}function V(a){if(v.get("aspectratio"))return!1;if(o.isString(a)&&a.indexOf("%")>-1)return!1;var b=o.isNumber(a)?a:v.get("containerHeight");return W(b)}function W(a){return a&&Fa*(s?1.75:1)>=a}function X(b,c){if(!b||isNaN(Number(b))){if(!la)return;b=la.clientWidth}if(!c||isNaN(Number(c))){if(!la)return;c=la.clientHeight}a.isMSIE(9)&&document.all&&!window.atob&&(b=c="100%");var d=v.getVideo();if(d){var e=d.resize(b,c,v.get("stretching"));e&&(clearTimeout(Ia),Ia=setTimeout(X,250)),wa.resize(),pa.checkCompactMode(b)}}function Y(){if(Ka){var a=document.fullscreenElement||document.webkitCurrentFullScreenElement||document.mozFullScreenElement||document.msFullscreenElement;return!(!a||a.id!==v.get("id"))}return Ga?oa.getVideo().getFullScreen():v.getVideo().getFullScreen()}function Z(a){var b=v.get("fullscreen"),c=void 0!==a.jwstate?a.jwstate:Y();b!==c&&v.set("fullscreen",c),clearTimeout(Ia),Ia=setTimeout(X,200)}function $(b,c){c?(a.addClass(b,"jw-flag-fullscreen"),q(document.body,{"overflow-y":"hidden"}),aa()):(a.removeClass(b,"jw-flag-fullscreen"),q(document.body,{"overflow-y":""})),X()}function _(){Ha=!1,clearTimeout(Da),pa.hideComponents(),a.addClass(ja,"jw-flag-user-inactive")}function aa(){Ha||(a.removeClass(ja,"jw-flag-user-inactive"),pa.checkCompactMode(la.clientWidth)),Ha=!0,clearTimeout(Da),Da=setTimeout(_,Ea)}function ba(){u.setFullscreen(!1)}function ca(){sa&&sa.setState(v.get("state")),da(v,v.mediaModel.get("mediaType")),v.mediaModel.on("change:mediaType",da,this)}function da(b,c){var d="audio"===c;a.toggleClass(ja,"jw-flag-media-audio",d)}function ea(b,c){var d="LIVE"===a.adaptiveType(c);a.toggleClass(ja,"jw-flag-live",d),Ma.setAltText(d?"Live Broadcast":"")}function fa(a,b){return b?void(b.name?va.updateText(b.name,b.message):va.updateText(b.message,"")):void va.playlistItem(a,a.get("playlistItem"))}function ga(){var a=v.getVideo();return a?a.isCaster:!1}function ha(){a.replaceClass(ja,/jw-state-\S+/,"jw-state-"+za)}function ia(b,c){if(za=c,clearTimeout(Ja),c===e.COMPLETE||c===e.IDLE?Ja=setTimeout(ha,100):ha(),ga())return void a.addClass(la,"jw-media-show");switch(c){case e.PLAYING:X();break;case e.PAUSED:aa()}}var ja,ka,la,ma,na,oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa,Ba,Ca,Da=-1,Ea=s?4e3:2e3,Fa=40,Ga=!1,Ha=!1,Ia=-1,Ja=-1,Ka=!1,La=!1,Ma=o.extend(this,c);this.model=v,this.api=u,ja=a.createElement(p({id:v.get("id")})),a.isIE()&&a.addClass(ja,"jw-ie");var Na=v.get("width"),Oa=v.get("height");q(ja,{width:Na.toString().indexOf("%")>0?Na:Na+"px",height:Oa.toString().indexOf("%")>0?Oa:Oa+"px"}),Ba=ja.requestFullscreen||ja.webkitRequestFullscreen||ja.webkitRequestFullScreen||ja.mozRequestFullScreen||ja.msRequestFullscreen,Ca=document.exitFullscreen||document.webkitExitFullscreen||document.webkitCancelFullScreen||document.mozCancelFullScreen||document.msExitFullscreen,Ka=Ba&&Ca,this.onChangeSkin=function(b,c){a.replaceClass(ja,/jw-skin-\S+/,c?"jw-skin-"+c:"")},this.handleColorOverrides=function(){function b(b,d,e){if(e){b=a.prefix(b,"#"+c+" ");var f={};f[d]=e,a.css(b.join(", "),f)}}var c=v.get("id"),d=v.get("skinColorActive"),e=v.get("skinColorInactive"),f=v.get("skinColorBackground");b([".jw-toggle",".jw-button-color:hover"],"color",d),b([".jw-active-option",".jw-progress",".jw-playlist-container .jw-option.jw-active-option",".jw-playlist-container .jw-option:hover"],"background",d),b([".jw-text",".jw-option",".jw-button-color",".jw-toggle.jw-off",".jw-tooltip-title",".jw-skip .jw-skip-icon",".jw-playlist-container .jw-icon"],"color",e),b([".jw-cue",".jw-knob"],"background",e),b([".jw-playlist-container .jw-option"],"border-bottom-color",e),b([".jw-background-color",".jw-tooltip-title",".jw-playlist",".jw-playlist-container .jw-option"],"background",f),b([".jw-playlist-container ::-webkit-scrollbar"],"border-color",f)},this.setup=function(){this.handleColorOverrides(),v.get("skin-loading")===!0&&(a.addClass(ja,"jw-flag-skin-loading"),v.once("change:skin-loading",function(){a.removeClass(ja,"jw-flag-skin-loading")})),this.onChangeSkin(v,v.get("skin"),""),v.on("change:skin",this.onChangeSkin,this),la=ja.getElementsByClassName("jw-media")[0],ka=ja.getElementsByClassName("jw-controls")[0];var c=ja.getElementsByClassName("jw-preview")[0];qa=new l(v),qa.setup(c);var d=ja.getElementsByClassName("jw-title")[0];va=new n(v),va.setup(d),Q(),aa(),v.set("mediaContainer",la),v.mediaController.on("fullscreenchange",Z);for(var f=t.length;f--;)document.addEventListener(t[f],Z,!1);window.removeEventListener("resize",D),window.addEventListener("resize",D,!1),s&&(window.removeEventListener("orientationchange",D),window.addEventListener("orientationchange",D,!1)),v.on("change:errorEvent",fa),v.on("change:controls",Pa),Pa(v,v.get("controls")),v.on("change:state",ia),v.on("change:duration",ea,this),v.on("change:flashBlocked",O),O(v,v.get("flashBlocked")),u.onPlaylistComplete(ba),u.onPlaylistItem(ca),v.on("change:castAvailable",F),F(v,v.get("castAvailable")),v.on("change:castActive",E),E(v,v.get("castActive")),v.get("stretching")&&G(v,v.get("stretching")),v.on("change:stretching",G),ia(v,e.IDLE),v.on("change:fullscreen",Qa),I(pa),I(ua);var g=v.get("aspectratio");if(g){a.addClass(ja,"jw-flag-aspect-mode");var h=ja.getElementsByClassName("jw-aspect")[0];q(h,{paddingTop:g})}u.on(b.JWPLAYER_READY,function(){D(),T(v.get("width"),v.get("height"))})};var Pa=function(b,c){if(c){var d=Ga?oa.get("state"):v.get("state");ia(b,d)}a.toggleClass(ja,"jw-flag-controls-disabled",!c)},Qa=function(b,c){var d=v.getVideo();Ka?(c?Ba.apply(ja):Ca.apply(document),$(ja,c)):a.isIE()?$(ja,c):(oa&&oa.getVideo()&&oa.getVideo().setFullscreen(c),d.setFullscreen(c)),d&&0===d.getName().name.indexOf("flash")&&d.setFullscreen(c)};this.resize=function(a,b){var c=!0;T(a,b,c),D()},this.resizeMedia=X,this.reset=function(){document.contains(ja)&&ja.parentNode.replaceChild(Aa,ja),a.emptyElement(ja)},this.setupInstream=function(b){this.instreamModel=oa=b,oa.on("change:controls",Pa,this),oa.on("change:state",ia,this),Ga=!0,a.addClass(ja,"jw-flag-ads"),aa()},this.setAltText=function(a){pa.setAltText(a)},this.useExternalControls=function(){a.addClass(ja,"jw-flag-ads-hide-controls")},this.destroyInstream=function(){if(Ga=!1,oa&&(oa.off(null,null,this),oa=null),this.setAltText(""),a.removeClass(ja,"jw-flag-ads"),a.removeClass(ja,"jw-flag-ads-hide-controls"),v.getVideo){var b=v.getVideo();b.setContainer(la)}ea(v,v.get("duration")),ra.revertAlternateClickHandlers()},this.addCues=function(a){pa&&pa.addCues(a)},this.clickHandler=function(){return ra},this.controlsContainer=function(){return ka},this.getContainer=this.element=function(){return ja},this.getSafeRegion=function(b){var c={x:0,y:0,width:v.get("containerWidth")||0,height:v.get("containerHeight")||0},d=v.get("dock");return d&&d.length&&v.get("controls")&&(c.y=ta.element().clientHeight,c.height-=c.y),b=b||!a.exists(b),b&&v.get("controls")&&(c.height-=pa.element().clientHeight),c},this.destroy=function(){window.removeEventListener("resize",D),window.removeEventListener("orientationchange",D);for(var b=t.length;b--;)document.removeEventListener(t[b],Z,!1);v.mediaController&&v.mediaController.off("fullscreenchange",Z),ja.removeEventListener("keydown",z,!1),ya&&ya.destroy(),sa&&(v.off("change:state",sa.statusDelegate),sa.destroy(),sa=null),Ga&&this.destroyInstream(),ua&&ua.destroy(),a.clearCss("#"+v.get("id"))}};return u}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(119),c(48),c(45),c(127)],e=function(a,b,c,d){var e=function(a){this.model=a,this.setup(),this.model.on("change:dock",this.render,this)};return c.extend(e.prototype,{setup:function(){var c=this.model.get("dock"),e=this.click.bind(this),f=a(c);this.el=b.createElement(f),new d(this.el).on("click tap",e)},getDockButton:function(a){return b.hasClass(a.target,"jw-dock-button")?a.target:b.hasClass(a.target,"jw-dock-text")?a.target.parentElement.parentElement:a.target.parentElement},click:function(a){var b=this.getDockButton(a),d=b.getAttribute("button"),e=this.model.get("dock"),f=c.findWhere(e,{id:d});f&&f.callback&&f.callback(a)},render:function(){var c=this.model.get("dock"),d=a(c),e=b.createElement(d);this.el.innerHTML=e.innerHTML},element:function(){return this.el}}),e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='    <div class="jw-dock-button jw-background-color jw-reset';return e=b["if"].call(a,null!=a?a.btnClass:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='" button="'+i((f=null!=(f=b.id||(null!=a?a.id:a))?f:h,typeof f===g?f.call(a,{name:"id",hash:{},data:d}):f))+'">\n        <div class="jw-icon jw-dock-image jw-reset" ',e=b["if"].call(a,null!=a?a.img:a,{name:"if",hash:{},fn:this.program(4,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='></div>\n        <div class="jw-arrow jw-reset"></div>\n',e=b["if"].call(a,null!=a?a.tooltip:a,{name:"if",hash:{},fn:this.program(6,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"    </div>\n"},2:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return" "+h((e=null!=(e=b.btnClass||(null!=a?a.btnClass:a))?e:g,typeof e===f?e.call(a,{name:"btnClass",hash:{},data:d}):e))},4:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return"style='background-image: url(\""+h((e=null!=(e=b.img||(null!=a?a.img:a))?e:g,typeof e===f?e.call(a,{name:"img",hash:{},data:d}):e))+"\")'"},6:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'        <div class="jw-overlay jw-background-color jw-reset">\n            <span class="jw-text jw-dock-text jw-reset">'+h((e=null!=(e=b.tooltip||(null!=a?a.tooltip:a))?e:g,typeof e===f?e.call(a,{name:"tooltip",hash:{},data:d}):e))+"</span>\n        </div>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="jw-dock jw-reset">\n';return e=b.each.call(a,a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"</div>"},useData:!0})},function(a,b,c){a.exports=c(121)},function(a,b,c){"use strict";var d=c(122),e=c(124)["default"],f=c(125)["default"],g=c(123),h=c(126),i=function(){var a=new d.HandlebarsEnvironment;return g.extend(a,d),a.SafeString=e,a.Exception=f,a.Utils=g,a.escapeExpression=g.escapeExpression,a.VM=h,a.template=function(b){return h.template(b,a)},a},j=i();j.create=i,j["default"]=j,b["default"]=j},function(a,b,c){"use strict";function d(a,b){this.helpers=a||{},this.partials=b||{},e(this)}function e(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new g("Missing helper: '"+arguments[arguments.length-1].name+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(k(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=q(c.data);g.contextPath=f.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){if(!b)throw new g("Must pass iterator to #each");var c,d,e=b.fn,h=b.inverse,i=0,j="";if(b.data&&b.ids&&(d=f.appendContextPath(b.data.contextPath,b.ids[0])+"."),l(a)&&(a=a.call(this)),b.data&&(c=q(b.data)),a&&"object"==typeof a)if(k(a))for(var m=a.length;m>i;i++)c&&(c.index=i,c.first=0===i,c.last=i===a.length-1,d&&(c.contextPath=d+i)),j+=e(a[i],{data:c});else for(var n in a)a.hasOwnProperty(n)&&(c&&(c.key=n,c.index=i,c.first=0===i,d&&(c.contextPath=d+n)),j+=e(a[n],{data:c}),i++);return 0===i&&(j=h(this)),j}),a.registerHelper("if",function(a,b){return l(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||f.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){l(a)&&(a=a.call(this));var c=b.fn;if(f.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=q(b.data);d.contextPath=f.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}var f=c(123),g=c(125)["default"],h="2.0.0";b.VERSION=h;var i=6;b.COMPILER_REVISION=i;var j={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};b.REVISION_CHANGES=j;var k=f.isArray,l=f.isFunction,m=f.toString,n="[object Object]";b.HandlebarsEnvironment=d,d.prototype={constructor:d,logger:o,log:p,registerHelper:function(a,b){if(m.call(a)===n){if(b)throw new g("Arg not supported with multiple helpers");f.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){m.call(a)===n?f.extend(this.partials,a):this.partials[a]=b},unregisterPartial:function(a){delete this.partials[a]}};var o={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(o.level<=a){var c=o.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};b.logger=o;var p=o.log;b.log=p;var q=function(a){var b=f.extend({},a);return b._parent=a,b};b.createFrame=q},function(a,b,c){"use strict";function d(a){return j[a]}function e(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function f(a){return a instanceof i?a.toString():null==a?"":a?(a=""+a,l.test(a)?a.replace(k,d):a):a+""}function g(a){return a||0===a?o(a)&&0===a.length?!0:!1:!0}function h(a,b){return(a?a+".":"")+b}var i=c(124)["default"],j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},k=/[&<>"'`]/g,l=/[&<>"'`]/;b.extend=e;var m=Object.prototype.toString;b.toString=m;var n=function(a){return"function"==typeof a};n(/x/)&&(n=function(a){return"function"==typeof a&&"[object Function]"===m.call(a)});var n;b.isFunction=n;var o=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===m.call(a):!1};b.isArray=o,b.escapeExpression=f,b.isEmpty=g,b.appendContextPath=h},function(a,b){"use strict";function c(a){this.string=a}c.prototype.toString=function(){return""+this.string},b["default"]=c},function(a,b){"use strict";function c(a,b){var c;b&&b.firstLine&&(c=b.firstLine,a+=" - "+c+":"+b.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<d.length;f++)this[d[f]]=e[d[f]];c&&(this.lineNumber=c,this.column=b.firstColumn)}var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b["default"]=c},function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=l;if(b!==c){if(c>b){var d=m[c],e=m[b];throw new k("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new k("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new k("No environment passed to template");if(!a||!a.main)throw new k("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var c=function(c,d,e,f,g,h,i,l,m){g&&(f=j.extend({},f,g));var n=b.VM.invokePartial.call(this,c,e,f,h,i,l,m);if(null==n&&b.compile){var o={helpers:h,partials:i,data:l,depths:m};i[e]=b.compile(c,{data:void 0!==l,compat:a.compat},b),n=i[e](f,o)}if(null!=n){if(d){for(var p=n.split("\n"),q=0,r=p.length;r>q&&(p[q]||q+1!==r);q++)p[q]=d+p[q];n=p.join("\n")}return n}throw new k("The partial "+e+" could not be compiled when running in runtime-only mode")},d={lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:j.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c){var d=this.programs[a],e=this.fn(a);return b||c?d=f(this,a,e,b,c):d||(d=this.programs[a]=f(this,a,e)),d},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=j.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler},e=function(b,c){c=c||{};var f=c.data;e._setup(c),!c.partial&&a.useData&&(f=i(b,f));
var g;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(d,b,d.helpers,d.partials,f,g)};return e.isTop=!0,e._setup=function(c){c.partial?(d.helpers=c.helpers,d.partials=c.partials):(d.helpers=d.merge(c.helpers,b.helpers),a.usePartial&&(d.partials=d.merge(c.partials,b.partials)))},e._child=function(b,c,e){if(a.useDepths&&!e)throw new k("must pass parent depths");return f(d,b,a[b],c,e)},e}function f(a,b,c,d,e){var f=function(b,f){return f=f||{},c.call(a,b,a.helpers,a.partials,f.data||d,e&&[b].concat(e))};return f.program=b,f.depth=e?e.length:0,f}function g(a,b,c,d,e,f,g){var h={partial:!0,helpers:d,partials:e,data:f,depths:g};if(void 0===a)throw new k("The partial "+b+" could not be found");return a instanceof Function?a(c,h):void 0}function h(){return""}function i(a,b){return b&&"root"in b||(b=b?n(b):{},b.root=a),b}var j=c(123),k=c(125)["default"],l=c(122).COMPILER_REVISION,m=c(122).REVISION_CHANGES,n=c(122).createFrame;b.checkRevision=d,b.template=e,b.program=f,b.invokePartial=g,b.noop=h},function(a,b,c){var d,e;d=[c(47),c(46),c(45),c(48)],e=function(a,b,c,d){function e(a,b){return/touch/.test(a.type)?(a.originalEvent||a).changedTouches[0]["page"+b]:a["page"+b]}function f(a){var b=a||window.event;return a instanceof MouseEvent?"which"in b?3===b.which:"button"in b?2===b.button:!1:!1}function g(a,b,c){var d;return d=b instanceof MouseEvent||!b.touches&&!b.changedTouches?b:b.touches&&b.touches.length?b.touches[0]:b.changedTouches[0],{type:a,target:b.target,currentTarget:c,pageX:d.pageX,pageY:d.pageY}}function h(a){(a instanceof MouseEvent||a instanceof window.TouchEvent)&&(a.preventManipulation&&a.preventManipulation(),a.cancelable&&a.preventDefault&&a.preventDefault())}var i=!c.isUndefined(window.PointerEvent),j=!i&&d.isMobile(),k=!i&&!j,l=d.isFF()&&d.isOSX(),m=function(a,d){function j(a){(k||i&&"touch"!==a.pointerType)&&r(b.touchEvents.OVER,a)}function m(a){(k||i&&"touch"!==a.pointerType)&&r(b.touchEvents.MOVE,a)}function n(c){(k||i&&"touch"!==c.pointerType&&!a.contains(document.elementFromPoint(c.x,c.y)))&&r(b.touchEvents.OUT,c)}function o(b){s=b.target,w=e(b,"X"),x=e(b,"Y"),f(b)||(i?b.isPrimary&&(d.preventScrolling&&(t=b.pointerId,a.setPointerCapture(t)),a.addEventListener("pointermove",p),a.addEventListener("pointercancel",q),a.addEventListener("pointerup",q)):k&&(document.addEventListener("mousemove",p),l&&"object"===b.target.nodeName.toLowerCase()?a.addEventListener("click",q):document.addEventListener("mouseup",q)),s.addEventListener("touchmove",p),s.addEventListener("touchcancel",q),s.addEventListener("touchend",q))}function p(a){var c=b.touchEvents,f=6;if(v)r(c.DRAG,a);else{var g=e(a,"X"),i=e(a,"Y"),j=g-w,k=i-x;j*j+k*k>f*f&&(r(c.DRAG_START,a),v=!0,r(c.DRAG,a))}d.preventScrolling&&h(a)}function q(c){var e=b.touchEvents;i?(d.preventScrolling&&a.releasePointerCapture(t),a.removeEventListener("pointermove",p),a.removeEventListener("pointercancel",q),a.removeEventListener("pointerup",q)):k&&(document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",q)),s.removeEventListener("touchmove",p),s.removeEventListener("touchcancel",q),s.removeEventListener("touchend",q),v?r(e.DRAG_END,c):d.directSelect&&c.target!==a||-1!==c.type.indexOf("cancel")||(i&&c instanceof window.PointerEvent?"touch"===c.pointerType?r(e.TAP,c):r(e.CLICK,c):k?r(e.CLICK,c):(r(e.TAP,c),h(c))),s=null,v=!1}function r(a,e){var f;if(d.enableDoubleTap&&(a===b.touchEvents.CLICK||a===b.touchEvents.TAP))if(c.now()-y<z){var h=a===b.touchEvents.CLICK?b.touchEvents.DOUBLE_CLICK:b.touchEvents.DOUBLE_TAP;f=g(h,e,u),A.trigger(h,f),y=0}else y=c.now();f=g(a,e,u),A.trigger(a,f)}var s,t,u=a,v=!1,w=0,x=0,y=0,z=300;d=d||{},i?(a.addEventListener("pointerdown",o),d.useHover&&(a.addEventListener("pointerover",j),a.addEventListener("pointerout",n)),d.useMove&&a.addEventListener("pointermove",m)):k&&(a.addEventListener("mousedown",o),d.useHover&&(a.addEventListener("mouseover",j),a.addEventListener("mouseout",n)),d.useMove&&a.addEventListener("mousemove",m)),a.addEventListener("touchstart",o);var A=this;return this.triggerEvent=r,this.destroy=function(){a.removeEventListener("touchstart",o),a.removeEventListener("mousedown",o),s&&(s.removeEventListener("touchmove",p),s.removeEventListener("touchcancel",q),s.removeEventListener("touchend",q)),i&&(d.preventScrolling&&a.releasePointerCapture(t),a.removeEventListener("pointerover",j),a.removeEventListener("pointerdown",o),a.removeEventListener("pointermove",p),a.removeEventListener("pointermove",m),a.removeEventListener("pointercancel",q),a.removeEventListener("pointerout",n),a.removeEventListener("pointerup",q)),a.removeEventListener("click",q),a.removeEventListener("mouseover",j),a.removeEventListener("mousemove",m),a.removeEventListener("mouseout",n),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",q)},this};return c.extend(m.prototype,a),m}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(55),c(62),c(45)],e=function(a,b,c,d){var e=b.style,f={back:!0,fontSize:15,fontFamily:"Arial,sans-serif",fontOpacity:100,color:"#FFF",backgroundColor:"#000",backgroundOpacity:100,edgeStyle:null,windowColor:"#FFF",windowOpacity:0,preprocessor:d.identity},g=function(g){function h(b){b=b||"";var c="jw-captions-window jw-reset";b?(s.innerHTML=b,r.className=c+" jw-captions-window-active"):(r.className=c,a.empty(s))}function i(a){p=a,k(n,p)}function j(a,b){var c=a.source,e=b.metadata;return c?e&&d.isNumber(e[c])?e[c]:!1:b.position}function k(a,b){if(a&&a.data&&b){var c=j(a,b);if(c!==!1){var d=a.data;if(!(o>=0&&l(d,o,c))){for(var e=-1,f=0;f<d.length;f++)if(l(d,f,c)){e=f;break}-1===e?h(""):e!==o&&(o=e,h(t.preprocessor(d[o].text)))}}}}function l(a,b,c){return a[b].begin<=c&&(!a[b].end||a[b].end>=c)&&(b===a.length-1||a[b+1].begin>=c)}function m(a,c,d){var e=b.hexToRgba("#000000",d);"dropshadow"===a?c.textShadow="0 2px 1px "+e:"raised"===a?c.textShadow="0 0 5px "+e+", 0 1px 5px "+e+", 0 2px 5px "+e:"depressed"===a?c.textShadow="0 -2px 1px "+e:"uniform"===a&&(c.textShadow="-2px 0 1px "+e+",2px 0 1px "+e+",0 -2px 1px "+e+",0 2px 1px "+e+",-1px 1px 1px "+e+",1px 1px 1px "+e+",1px -1px 1px "+e+",1px 1px 1px "+e)}var n,o,p,q,r,s,t={};q=document.createElement("div"),q.className="jw-captions jw-reset",this.show=function(){q.className="jw-captions jw-captions-enabled jw-reset"},this.hide=function(){q.className="jw-captions jw-reset"},this.populate=function(a){return o=-1,n=a,a?void k(a,p):void h("")},this.resize=function(){var a=q.clientWidth,b=Math.pow(a/400,.6);if(b){var c=t.fontSize*b;e(q,{fontSize:Math.round(c)+"px"})}},this.setup=function(a){if(r=document.createElement("div"),s=document.createElement("span"),r.className="jw-captions-window jw-reset",s.className="jw-captions-text jw-reset",t=d.extend({},f,a),a){var c=t.fontOpacity,h=t.windowOpacity,i=t.edgeStyle,j=t.backgroundColor,k={},l={color:b.hexToRgba(t.color,c),fontFamily:t.fontFamily,fontStyle:t.fontStyle,fontWeight:t.fontWeight,textDecoration:t.textDecoration};h&&(k.backgroundColor=b.hexToRgba(t.windowColor,h)),m(i,l,c),t.back?l.backgroundColor=b.hexToRgba(j,t.backgroundOpacity):null===i&&m("uniform",l),e(r,k),e(s,l)}r.appendChild(s),q.appendChild(r),this.populate(g.get("captionsTrack"))},this.element=function(){return q},g.on("change:playlistItem",function(){p=null,o=-1,h("")},this),g.on("change:captionsTrack",function(a,b){this.populate(b)},this),g.mediaController.on("seek",function(){o=-1},this),g.mediaController.on("time seek",i,this),g.mediaController.on("subtitlesTrackData",function(){k(n,p)},this),g.on("change:state",function(a,b){switch(b){case c.IDLE:case c.ERROR:case c.COMPLETE:this.hide();break;default:this.show()}},this)};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(127),c(46),c(47),c(45)],e=function(a,b,c,d){var e=function(e,f,g){function h(a){return e.get("flashBlocked")?void 0:k?void k(a):void o.trigger(a.type===b.touchEvents.CLICK?"click":"tap")}function i(){return l?void l():void o.trigger("doubleClick")}var j,k,l,m={enableDoubleTap:!0,useMove:!0};d.extend(this,c),j=f,this.element=function(){return j};var n=new a(j,d.extend(m,g));n.on("click tap",h),n.on("doubleClick doubleTap",i),n.on("move",function(){o.trigger("move")}),n.on("over",function(){o.trigger("over")}),n.on("out",function(){o.trigger("out")}),this.clickHandler=h;var o=this;this.setAlternateClickHandlers=function(a,b){k=a,l=b||null},this.revertAlternateClickHandlers=function(){k=null,l=null}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(47),c(127),c(131),c(45)],e=function(a,b,c,d,e){var f=function(f){e.extend(this,b),this.model=f,this.el=a.createElement(d({}));var g=this;this.iconUI=new c(this.el).on("click tap",function(a){g.trigger(a.type)})};return e.extend(f.prototype,{element:function(){return this.el}}),f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){return'<div class="jw-display-icon-container jw-background-color jw-reset">\n    <div class="jw-icon jw-icon-display jw-button-color jw-reset"></div>\n</div>\n'},useData:!0})},function(a,b,c){var d,e;d=[c(127),c(48),c(46),c(45),c(47),c(133)],e=function(a,b,c,d,e,f){var g=b.style,h={linktarget:"_blank",margin:8,hide:!1,position:"top-right"},i=function(i){var j,k,l=new Image,m=d.extend({},i.get("logo"));return d.extend(this,e),this.setup=function(e){if(k=d.extend({},h,m),k.hide="true"===k.hide.toString(),j=b.createElement(f()),k.file){k.hide&&b.addClass(j,"jw-hide"),b.addClass(j,"jw-logo-"+(k.position||h.position)),"top-right"===k.position&&(i.on("change:dock",this.topRight,this),i.on("change:controls",this.topRight,this),this.topRight(i)),i.set("logo",k),l.onload=function(){var a={backgroundImage:'url("'+this.src+'")',width:this.width,height:this.height};if(k.margin!==h.margin){var b=/(\w+)-(\w+)/.exec(k.position);3===b.length&&(a["margin-"+b[1]]=k.margin,a["margin-"+b[2]]=k.margin)}g(j,a),i.set("logoWidth",a.width)},l.src=k.file;var n=new a(j);n.on("click tap",function(a){b.exists(a)&&a.stopPropagation&&a.stopPropagation(),this.trigger(c.JWPLAYER_LOGO_CLICK,{link:k.link,linktarget:k.linktarget})},this),e.appendChild(j)}},this.topRight=function(a){var b=a.get("controls"),c=a.get("dock"),d=b&&(c&&c.length||a.get("sharing")||a.get("related"));g(j,{top:d?"3.5em":0})},this.element=function(){return j},this.position=function(){return k.position},this.destroy=function(){l.onload=null},this};return i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){return'<div class="jw-logo jw-reset"></div>'},useData:!0})},function(a,b,c){var d,e;d=[c(48),c(45),c(47),c(58),c(127),c(136),c(135),c(142),c(144),c(146),c(147)],e=function(a,b,c,d,e,f,g,h,i,j,k){function l(a,b){var c=document.createElement("div");return c.className="jw-icon jw-icon-inline jw-button-color jw-reset "+a,c.style.display="none",b&&new e(c).on("click tap",function(){b()}),{element:function(){return c},toggle:function(a){a?this.show():this.hide()},show:function(){c.style.display=""},hide:function(){c.style.display="none"}}}function m(a){var b=document.createElement("span");return b.className="jw-text jw-reset "+a,b}function n(a){var b=new h(a);return b}function o(a,c){var d=document.createElement("div");return d.className="jw-group jw-controlbar-"+a+"-group jw-reset",b.each(c,function(a){a.element&&(a=a.element()),d.appendChild(a)}),d}function p(b,c){this._api=b,this._model=c,this._isMobile=a.isMobile(),this._compactModeMaxSize=400,this._maxCompactWidth=-1,this.setup()}return b.extend(p.prototype,c,{setup:function(){this.build(),this.initialize()},build:function(){var a,c,d,e,h=new g(this._model,this._api),p=new k("jw-icon-more");this._model.get("visualplaylist")!==!1&&(a=new i("jw-icon-playlist")),this._isMobile||(e=l("jw-icon-volume",this._api.setMute),c=new f("jw-slider-volume","horizontal"),d=new j(this._model,"jw-icon-volume")),this.elements={alt:m("jw-text-alt"),play:l("jw-icon-playback",this._api.play.bind(this,{reason:"interaction"})),prev:l("jw-icon-prev",this._api.playlistPrev.bind(this,{reason:"interaction"})),next:l("jw-icon-next",this._api.playlistNext.bind(this,{reason:"interaction"})),playlist:a,elapsed:m("jw-text-elapsed"),time:h,duration:m("jw-text-duration"),drawer:p,hd:n("jw-icon-hd"),cc:n("jw-icon-cc"),audiotracks:n("jw-icon-audio-tracks"),mute:e,volume:c,volumetooltip:d,cast:l("jw-icon-cast jw-off",this._api.castToggle),fullscreen:l("jw-icon-fullscreen",this._api.setFullscreen)},this.layout={left:[this.elements.play,this.elements.prev,this.elements.playlist,this.elements.next,this.elements.elapsed],center:[this.elements.time,this.elements.alt],right:[this.elements.duration,this.elements.hd,this.elements.cc,this.elements.audiotracks,this.elements.drawer,this.elements.mute,this.elements.cast,this.elements.volume,this.elements.volumetooltip,this.elements.fullscreen],drawer:[this.elements.hd,this.elements.cc,this.elements.audiotracks]},this.menus=b.compact([this.elements.playlist,this.elements.hd,this.elements.cc,this.elements.audiotracks,this.elements.volumetooltip]),this.layout.left=b.compact(this.layout.left),this.layout.center=b.compact(this.layout.center),this.layout.right=b.compact(this.layout.right),this.layout.drawer=b.compact(this.layout.drawer),this.el=document.createElement("div"),this.el.className="jw-controlbar jw-background-color jw-reset",this.elements.left=o("left",this.layout.left),this.elements.center=o("center",this.layout.center),this.elements.right=o("right",this.layout.right),this.el.appendChild(this.elements.left),this.el.appendChild(this.elements.center),this.el.appendChild(this.elements.right)},initialize:function(){this.elements.play.show(),this.elements.fullscreen.show(),this.elements.mute&&this.elements.mute.show(),this.onVolume(this._model,this._model.get("volume")),this.onPlaylist(this._model,this._model.get("playlist")),this.onPlaylistItem(this._model,this._model.get("playlistItem")),this.onMediaModel(this._model,this._model.get("mediaModel")),this.onCastAvailable(this._model,this._model.get("castAvailable")),this.onCastActive(this._model,this._model.get("castActive")),this.onCaptionsList(this._model,this._model.get("captionsList")),this._model.on("change:volume",this.onVolume,this),this._model.on("change:mute",this.onMute,this),this._model.on("change:playlist",this.onPlaylist,this),this._model.on("change:playlistItem",this.onPlaylistItem,this),this._model.on("change:mediaModel",this.onMediaModel,this),this._model.on("change:castAvailable",this.onCastAvailable,this),this._model.on("change:castActive",this.onCastActive,this),this._model.on("change:duration",this.onDuration,this),this._model.on("change:position",this.onElapsed,this),this._model.on("change:fullscreen",this.onFullscreen,this),this._model.on("change:captionsList",this.onCaptionsList,this),this._model.on("change:captionsIndex",this.onCaptionsIndex,this),this._model.on("change:compactUI",this.onCompactUI,this),this.elements.volume&&this.elements.volume.on("update",function(a){var b=a.percentage;this._api.setVolume(b)},this),this.elements.volumetooltip&&(this.elements.volumetooltip.on("update",function(a){var b=a.percentage;this._api.setVolume(b)},this),this.elements.volumetooltip.on("toggleValue",function(){this._api.setMute()},this)),this.elements.playlist&&this.elements.playlist.on("select",function(a){this._model.once("itemReady",function(){this._api.play({reason:"interaction"})},this),this._api.load(a)},this),this.elements.hd.on("select",function(a){this._model.getVideo().setCurrentQuality(a)},this),this.elements.hd.on("toggleValue",function(){this._model.getVideo().setCurrentQuality(0===this._model.getVideo().getCurrentQuality()?1:0)},this),this.elements.cc.on("select",function(a){this._api.setCurrentCaptions(a)},this),this.elements.cc.on("toggleValue",function(){var a=this._model.get("captionsIndex");this._api.setCurrentCaptions(a?0:1)},this),this.elements.audiotracks.on("select",function(a){this._model.getVideo().setCurrentAudioTrack(a)},this),new e(this.elements.duration).on("click tap",function(){if("DVR"===a.adaptiveType(this._model.get("duration"))){var b=this._model.get("position");this._api.seek(Math.max(d.dvrSeekLimit,b))}},this),new e(this.el).on("click tap drag",function(){this.trigger("userAction")},this),this.elements.drawer.on("open-drawer close-drawer",function(b,c){a.toggleClass(this.el,"jw-drawer-expanded",c.isOpen),c.isOpen||this.closeMenus()},this),b.each(this.menus,function(a){a.on("open-tooltip",this.closeMenus,this)},this)},onCaptionsList:function(a,b){var c=a.get("captionsIndex");this.elements.cc.setup(b,c),this.clearCompactMode()},onCaptionsIndex:function(a,b){this.elements.cc.selectItem(b)},onPlaylist:function(a,b){var c=b.length>1;this.elements.next.toggle(c),this.elements.prev.toggle(c),this.elements.playlist&&this.elements.playlist.setup(b,a.get("item"))},onPlaylistItem:function(a){this.elements.time.updateBuffer(0),this.elements.time.render(0),this.elements.duration.innerHTML="00:00",this.elements.elapsed.innerHTML="00:00",this.clearCompactMode();var b=a.get("item");this.elements.playlist&&this.elements.playlist.selectItem(b),this.elements.audiotracks.setup()},onMediaModel:function(c,d){d.on("change:levels",function(a,b){this.elements.hd.setup(b,a.get("currentLevel")),this.clearCompactMode()},this),d.on("change:currentLevel",function(a,b){this.elements.hd.selectItem(b)},this),d.on("change:audioTracks",function(a,c){var d=b.map(c,function(a){return{label:a.name}});this.elements.audiotracks.setup(d,a.get("currentAudioTrack"),{toggle:!1}),this.clearCompactMode()},this),d.on("change:currentAudioTrack",function(a,b){this.elements.audiotracks.selectItem(b)},this),d.on("change:state",function(b,c){"complete"===c&&(this.elements.drawer.closeTooltip(),a.removeClass(this.el,"jw-drawer-expanded"))},this)},onVolume:function(a,b){this.renderVolume(a.get("mute"),b)},onMute:function(a,b){this.renderVolume(b,a.get("volume"))},renderVolume:function(b,c){this.elements.mute&&a.toggleClass(this.elements.mute.element(),"jw-off",b),this.elements.volume&&this.elements.volume.render(b?0:c),this.elements.volumetooltip&&(this.elements.volumetooltip.volumeSlider.render(b?0:c),a.toggleClass(this.elements.volumetooltip.element(),"jw-off",b))},onCastAvailable:function(a,b){this.elements.cast.toggle(b),this.clearCompactMode()},onCastActive:function(b,c){a.toggleClass(this.elements.cast.element(),"jw-off",!c)},onElapsed:function(b,c){var d,e=b.get("duration");d="DVR"===a.adaptiveType(e)?"-"+a.timeFormat(-e):a.timeFormat(c),this.elements.elapsed.innerHTML=d},onDuration:function(b,c){var d;"DVR"===a.adaptiveType(c)?(d="Live",this.clearCompactMode()):d=a.timeFormat(c),this.elements.duration.innerHTML=d},onFullscreen:function(b,c){a.toggleClass(this.elements.fullscreen.element(),"jw-off",c)},element:function(){return this.el},getVisibleBounds:function(){var b,c=this.el,d=getComputedStyle?getComputedStyle(c):c.currentStyle;return"table"===d.display?a.bounds(c):(c.style.visibility="hidden",c.style.display="table",b=a.bounds(c),c.style.visibility=c.style.display="",b)},setAltText:function(a){this.elements.alt.innerHTML=a},addCues:function(a){this.elements.time&&(b.each(a,function(a){this.elements.time.addCue(a)},this),this.elements.time.drawCues())},closeMenus:function(a){b.each(this.menus,function(b){a&&a.target===b.el||b.closeTooltip(a)})},hideComponents:function(){this.closeMenus(),this.elements.drawer.closeTooltip(),a.removeClass(this.el,"jw-drawer-expanded")},clearCompactMode:function(){this._maxCompactWidth=-1,this._model.set("compactUI",!1),this._containerWidth&&this.checkCompactMode(this._containerWidth)},setCompactModeBounds:function(){if(this.element().offsetWidth>0){var b=this.elements.left.offsetWidth+this.elements.right.offsetWidth;if("LIVE"===a.adaptiveType(this._model.get("duration")))this._maxCompactWidth=b+this.elements.alt.offsetWidth;else{var c=b+(this.elements.center.offsetWidth-this.elements.time.el.offsetWidth),d=.2;this._maxCompactWidth=c/(1-d)}}},checkCompactMode:function(a){-1===this._maxCompactWidth&&this.setCompactModeBounds(),this._containerWidth=a,-1!==this._maxCompactWidth&&(a>=this._compactModeMaxSize&&a>this._maxCompactWidth?this._model.set("compactUI",!1):(a<this._compactModeMaxSize||a<=this._maxCompactWidth)&&this._model.set("compactUI",!0))},onCompactUI:function(c,d){a.removeClass(this.el,"jw-drawer-expanded"),this.elements.drawer.setup(this.layout.drawer,d),(!d||this.elements.drawer.activeContents.length<2)&&b.each(this.layout.drawer,function(a){this.elements.right.insertBefore(a.el,this.elements.drawer.el)},this)}}),p}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48),c(58),c(136),c(139),c(140),c(141)],e=function(a,b,c,d,e,f,g){var h=e.extend({setup:function(){this.text=document.createElement("span"),this.text.className="jw-text jw-reset",this.img=document.createElement("div"),this.img.className="jw-reset";var a=document.createElement("div");a.className="jw-time-tip jw-background-color jw-reset",a.appendChild(this.img),a.appendChild(this.text),b.removeClass(this.el,"jw-hidden"),this.addContent(a)},image:function(a){b.style(this.img,a)},update:function(a){this.text.innerHTML=a}}),i=d.extend({constructor:function(b,c){this._model=b,this._api=c,this.timeTip=new h("jw-tooltip-time"),this.timeTip.setup(),this.cues=[],this.seekThrottled=a.throttle(this.performSeek,400),this._model.on("change:playlistItem",this.onPlaylistItem,this).on("change:position",this.onPosition,this).on("change:duration",this.onDuration,this).on("change:buffer",this.onBuffer,this),d.call(this,"jw-slider-time","horizontal")},setup:function(){d.prototype.setup.apply(this,arguments),this._model.get("playlistItem")&&this.onPlaylistItem(this._model,this._model.get("playlistItem")),this.elementRail.appendChild(this.timeTip.element()),this.el.addEventListener("mousemove",this.showTimeTooltip.bind(this),!1),this.el.addEventListener("mouseout",this.hideTimeTooltip.bind(this),!1)},limit:function(d){if(this.activeCue&&a.isNumber(this.activeCue.pct))return this.activeCue.pct;var e=this._model.get("duration"),f=b.adaptiveType(e);if("DVR"===f){var g=(1-d/100)*e,h=this._model.get("position"),i=Math.min(g,Math.max(c.dvrSeekLimit,h)),j=100*i/e;return 100-j}return d},update:function(a){this.seekTo=a,this.seekThrottled(),d.prototype.update.apply(this,arguments)},dragStart:function(){this._model.set("scrubbing",!0),d.prototype.dragStart.apply(this,arguments)},dragEnd:function(){d.prototype.dragEnd.apply(this,arguments),this._model.set("scrubbing",!1)},onSeeked:function(){this._model.get("scrubbing")&&this.performSeek()},onBuffer:function(a,b){this.updateBuffer(b)},onPosition:function(a,b){this.updateTime(b,a.get("duration"))},onDuration:function(a,b){this.updateTime(a.get("position"),b)},updateTime:function(a,c){var d=0;if(c){var e=b.adaptiveType(c);"DVR"===e?d=(c-a)/c*100:"VOD"===e&&(d=a/c*100)}this.render(d)},onPlaylistItem:function(b,c){this.reset(),b.mediaModel.on("seeked",this.onSeeked,this);var d=c.tracks;a.each(d,function(a){a&&a.kind&&"thumbnails"===a.kind.toLowerCase()?this.loadThumbnails(a.file):a&&a.kind&&"chapters"===a.kind.toLowerCase()&&this.loadChapters(a.file)},this)},performSeek:function(){var a,c=this.seekTo,d=this._model.get("duration"),e=b.adaptiveType(d);0===d?this._api.play():"DVR"===e?(a=(100-c)/100*d,this._api.seek(a)):(a=c/100*d,this._api.seek(Math.min(a,d-.25)))},showTimeTooltip:function(a){var d=this._model.get("duration");if(0!==d){var e=b.bounds(this.elementRail),f=a.pageX?a.pageX-e.left:a.x;f=b.between(f,0,e.width);var g=f/e.width,h=d*g;0>d&&(h=d-h);var i;if(this.activeCue)i=this.activeCue.text;else{var j=!0;i=b.timeFormat(h,j),0>d&&h>c.dvrSeekLimit&&(i="Live")}this.timeTip.update(i),this.showThumbnail(h),b.addClass(this.timeTip.el,"jw-open"),this.timeTip.el.style.left=100*g+"%"}},hideTimeTooltip:function(){b.removeClass(this.timeTip.el,"jw-open")},reset:function(){this.resetChapters(),this.resetThumbnails()}});return a.extend(i.prototype,f,g),i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(137),c(127),c(138),c(48)],e=function(a,b,c,d){var e=a.extend({constructor:function(a,b){this.className=a+" jw-background-color jw-reset",this.orientation=b,this.dragStartListener=this.dragStart.bind(this),this.dragMoveListener=this.dragMove.bind(this),this.dragEndListener=this.dragEnd.bind(this),this.tapListener=this.tap.bind(this),this.setup()},setup:function(){var a={"default":this["default"],className:this.className,orientation:"jw-slider-"+this.orientation};this.el=d.createElement(c(a)),this.elementRail=this.el.getElementsByClassName("jw-slider-container")[0],this.elementBuffer=this.el.getElementsByClassName("jw-buffer")[0],this.elementProgress=this.el.getElementsByClassName("jw-progress")[0],this.elementThumb=this.el.getElementsByClassName("jw-knob")[0],this.userInteract=new b(this.element(),{preventScrolling:!0}),this.userInteract.on("dragStart",this.dragStartListener),this.userInteract.on("drag",this.dragMoveListener),this.userInteract.on("dragEnd",this.dragEndListener),this.userInteract.on("tap click",this.tapListener)},dragStart:function(){this.trigger("dragStart"),this.railBounds=d.bounds(this.elementRail)},dragEnd:function(a){this.dragMove(a),this.trigger("dragEnd")},dragMove:function(a){var b,c,e=this.railBounds=this.railBounds?this.railBounds:d.bounds(this.elementRail);"horizontal"===this.orientation?(b=a.pageX,c=b<e.left?0:b>e.right?100:100*d.between((b-e.left)/e.width,0,1)):(b=a.pageY,c=b>=e.bottom?0:b<=e.top?100:100*d.between((e.height-(b-e.top))/e.height,0,1));var f=this.limit(c);return this.render(f),this.update(f),!1},tap:function(a){this.railBounds=d.bounds(this.elementRail),this.dragMove(a)},limit:function(a){return a},update:function(a){this.trigger("update",{percentage:a})},render:function(a){a=Math.max(0,Math.min(a,100)),"horizontal"===this.orientation?(this.elementThumb.style.left=a+"%",this.elementProgress.style.width=a+"%"):(this.elementThumb.style.bottom=a+"%",this.elementProgress.style.height=a+"%")},updateBuffer:function(a){this.elementBuffer.style.width=a+"%"},element:function(){return this.el}});return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(47),c(45)],e=function(a,b){function c(){}var d=function(a,c){var d,e=this;d=a&&b.has(a,"constructor")?a.constructor:function(){return e.apply(this,arguments)},b.extend(d,e,c);var f=function(){this.constructor=d};return f.prototype=e.prototype,d.prototype=new f,a&&b.extend(d.prototype,a),d.__super__=e.prototype,d};return c.extend=d,b.extend(c.prototype,a),c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'<div class="'+h((e=null!=(e=b.className||(null!=a?a.className:a))?e:g,typeof e===f?e.call(a,{name:"className",hash:{},data:d}):e))+" "+h((e=null!=(e=b.orientation||(null!=a?a.orientation:a))?e:g,typeof e===f?e.call(a,{name:"orientation",hash:{},data:d}):e))+' jw-reset">\n    <div class="jw-slider-container jw-reset">\n        <div class="jw-rail jw-reset"></div>\n        <div class="jw-buffer jw-reset"></div>\n        <div class="jw-progress jw-reset"></div>\n        <div class="jw-knob jw-reset"></div>\n    </div>\n</div>'},useData:!0})},function(a,b,c){var d,e;d=[c(137),c(48)],e=function(a,b){var c=a.extend({constructor:function(a){this.el=document.createElement("div"),this.el.className="jw-icon jw-icon-tooltip "+a+" jw-button-color jw-reset jw-hidden",this.container=document.createElement("div"),this.container.className="jw-overlay jw-reset",this.openClass="jw-open",this.componentType="tooltip",this.el.appendChild(this.container)},addContent:function(a){this.content&&this.removeContent(),this.content=a,this.container.appendChild(a)},removeContent:function(){this.content&&(this.container.removeChild(this.content),this.content=null)},hasContent:function(){return!!this.content},element:function(){return this.el},openTooltip:function(a){this.trigger("open-"+this.componentType,a,{isOpen:!0}),this.isOpen=!0,b.toggleClass(this.el,this.openClass,this.isOpen)},closeTooltip:function(a){this.trigger("close-"+this.componentType,a,{isOpen:!1}),this.isOpen=!1,b.toggleClass(this.el,this.openClass,this.isOpen)},toggleOpenState:function(a){this.isOpen?this.closeTooltip(a):this.openTooltip(a)}});return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48),c(112)],e=function(a,b,c){function d(a,b){this.time=a,this.text=b,this.el=document.createElement("div"),this.el.className="jw-cue jw-reset"}a.extend(d.prototype,{align:function(a){if("%"===this.time.toString().slice(-1))this.pct=this.time;else{var b=this.time/a*100;this.pct=b+"%"}this.el.style.left=this.pct}});var e={loadChapters:function(a){b.ajax(a,this.chaptersLoaded.bind(this),this.chaptersFailed,{plainText:!0})},chaptersLoaded:function(b){var d=c(b.responseText);a.isArray(d)&&(a.each(d,this.addCue,this),this.drawCues())},chaptersFailed:function(){},addCue:function(a){this.cues.push(new d(a.begin,a.text))},drawCues:function(){var b=this._model.mediaModel.get("duration");if(!b||0>=b)return void this._model.mediaModel.once("change:duration",this.drawCues,this);var c=this;a.each(this.cues,function(a){a.align(b),a.el.addEventListener("mouseover",function(){c.activeCue=a}),a.el.addEventListener("mouseout",function(){c.activeCue=null}),c.elementRail.appendChild(a.el)})},resetChapters:function(){a.each(this.cues,function(a){a.el.parentNode&&a.el.parentNode.removeChild(a.el)},this),this.cues=[]}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48),c(112)],e=function(a,b,c){function d(a){this.begin=a.begin,this.end=a.end,this.img=a.text}var e={loadThumbnails:function(a){a&&(this.vttPath=a.split("?")[0].split("/").slice(0,-1).join("/"),this.individualImage=null,b.ajax(a,this.thumbnailsLoaded.bind(this),this.thumbnailsFailed.bind(this),{plainText:!0}))},thumbnailsLoaded:function(b){var e=c(b.responseText);a.isArray(e)&&(a.each(e,function(a){this.thumbnails.push(new d(a))},this),this.drawCues())},thumbnailsFailed:function(){},chooseThumbnail:function(b){var c=a.sortedIndex(this.thumbnails,{end:b},a.property("end"));c>=this.thumbnails.length&&(c=this.thumbnails.length-1);var d=this.thumbnails[c].img;return d.indexOf("://")<0&&(d=this.vttPath?this.vttPath+"/"+d:d),d},loadThumbnail:function(b){var c=this.chooseThumbnail(b),d={display:"block",margin:"0 auto",backgroundPosition:"0 0"},e=c.indexOf("#xywh");if(e>0)try{var f=/(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(c);c=f[1],d.backgroundPosition=-1*f[2]+"px "+-1*f[3]+"px",d.width=f[4],d.height=f[5]}catch(g){return}else this.individualImage||(this.individualImage=new Image,this.individualImage.onload=a.bind(function(){this.individualImage.onload=null,this.timeTip.image({width:this.individualImage.width,height:this.individualImage.height})},this),this.individualImage.src=c);return d.backgroundImage='url("'+c+'")',d},showThumbnail:function(a){this.thumbnails.length<1||this.timeTip.image(this.loadThumbnail(a))},resetThumbnails:function(){this.timeTip.image({backgroundImage:"",width:0,height:0}),this.thumbnails=[]}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(139),c(48),c(45),c(127),c(143)],e=function(a,b,c,d,e){var f=a.extend({setup:function(a,f,g){this.iconUI||(this.iconUI=new d(this.el,{useHover:!0,directSelect:!0}),this.toggleValueListener=this.toggleValue.bind(this),this.toggleOpenStateListener=this.toggleOpenState.bind(this),this.openTooltipListener=this.openTooltip.bind(this),this.closeTooltipListener=this.closeTooltip.bind(this),this.selectListener=this.select.bind(this)),this.reset(),a=c.isArray(a)?a:[],b.toggleClass(this.el,"jw-hidden",a.length<2);var h=a.length>2||2===a.length&&g&&g.toggle===!1,i=!h&&2===a.length;
if(b.toggleClass(this.el,"jw-toggle",i),b.toggleClass(this.el,"jw-button-color",!i),this.isActive=h||i,h){b.removeClass(this.el,"jw-off"),this.iconUI.on("tap",this.toggleOpenStateListener).on("over",this.openTooltipListener).on("out",this.closeTooltipListener);var j=e(a),k=b.createElement(j);this.addContent(k),this.contentUI=new d(this.content).on("click tap",this.selectListener)}else i&&this.iconUI.on("click tap",this.toggleValueListener);this.selectItem(f)},toggleValue:function(){this.trigger("toggleValue")},select:function(a){if(a.target.parentElement===this.content){var d=b.classList(a.target),e=c.find(d,function(a){return 0===a.indexOf("jw-item")});e&&(this.trigger("select",parseInt(e.split("-")[2])),this.closeTooltipListener())}},selectItem:function(a){if(this.content)for(var c=0;c<this.content.children.length;c++)b.toggleClass(this.content.children[c],"jw-active-option",a===c);else b.toggleClass(this.el,"jw-off",0===a)},reset:function(){b.addClass(this.el,"jw-off"),this.iconUI.off(),this.contentUI&&this.contentUI.off().destroy(),this.removeContent()}});return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e=this.lambda,f=this.escapeExpression;return"        <li class='jw-text jw-option jw-item-"+f(e(d&&d.index,a))+" jw-reset'>"+f(e(null!=a?a.label:a,a))+"</li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<ul class="jw-menu jw-background-color jw-reset">\n';return e=b.each.call(a,a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"</ul>"},useData:!0})},function(a,b,c){var d,e;d=[c(48),c(45),c(139),c(127),c(145)],e=function(a,b,c,d,e){var f=c.extend({setup:function(c,e){if(this.iconUI||(this.iconUI=new d(this.el,{useHover:!0}),this.toggleOpenStateListener=this.toggleOpenState.bind(this),this.openTooltipListener=this.openTooltip.bind(this),this.closeTooltipListener=this.closeTooltip.bind(this),this.selectListener=this.onSelect.bind(this)),this.reset(),c=b.isArray(c)?c:[],a.toggleClass(this.el,"jw-hidden",c.length<2),c.length>=2){this.iconUI=new d(this.el,{useHover:!0}).on("tap",this.toggleOpenStateListener).on("over",this.openTooltipListener).on("out",this.closeTooltipListener);var f=this.menuTemplate(c,e),g=a.createElement(f);this.addContent(g),this.contentUI=new d(this.content),this.contentUI.on("click tap",this.selectListener)}this.originalList=c},menuTemplate:function(a,c){var d=b.map(a,function(a,b){return{active:b===c,label:b+1+".",title:a.title}});return e(d)},onSelect:function(c){var d=c.target;if("UL"!==d.tagName){"LI"!==d.tagName&&(d=d.parentElement);var e=a.classList(d),f=b.find(e,function(a){return 0===a.indexOf("jw-item")});f&&(this.trigger("select",parseInt(f.split("-")[2])),this.closeTooltip())}},selectItem:function(a){this.setup(this.originalList,a)},reset:function(){this.iconUI.off(),this.contentUI&&this.contentUI.off().destroy(),this.removeContent()}});return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e,f="";return e=b["if"].call(a,null!=a?a.active:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.program(4,d),data:d}),null!=e&&(f+=e),f},2:function(a,b,c,d){var e=this.lambda,f=this.escapeExpression;return"                <li class='jw-option jw-text jw-active-option jw-item-"+f(e(d&&d.index,a))+' jw-reset\'>\n                    <span class="jw-label jw-reset"><span class="jw-icon jw-icon-play jw-reset"></span></span>\n                    <span class="jw-name jw-reset">'+f(e(null!=a?a.title:a,a))+"</span>\n                </li>\n"},4:function(a,b,c,d){var e=this.lambda,f=this.escapeExpression;return"                <li class='jw-option jw-text jw-item-"+f(e(d&&d.index,a))+' jw-reset\'>\n                    <span class="jw-label jw-reset">'+f(e(null!=a?a.label:a,a))+'</span>\n                    <span class="jw-name jw-reset">'+f(e(null!=a?a.title:a,a))+"</span>\n                </li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="jw-menu jw-playlist-container jw-background-color jw-reset">\n\n    <div class="jw-tooltip-title jw-reset">\n        <span class="jw-icon jw-icon-inline jw-icon-playlist jw-reset"></span>\n        <span class="jw-text jw-reset">PLAYLIST</span>\n    </div>\n\n    <ul class="jw-playlist jw-reset">\n';return e=b.each.call(a,a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"    </ul>\n</div>"},useData:!0})},function(a,b,c){var d,e;d=[c(139),c(136),c(127),c(48)],e=function(a,b,c,d){var e=a.extend({constructor:function(e,f){this._model=e,a.call(this,f),this.volumeSlider=new b("jw-slider-volume jw-volume-tip","vertical"),this.addContent(this.volumeSlider.element()),this.volumeSlider.on("update",function(a){this.trigger("update",a)},this),d.removeClass(this.el,"jw-hidden"),new c(this.el,{useHover:!0,directSelect:!0}).on("click",this.toggleValue,this).on("tap",this.toggleOpenState,this).on("over",this.openTooltip,this).on("out",this.closeTooltip,this),this._model.on("change:volume",this.onVolume,this)},toggleValue:function(){this.trigger("toggleValue")}});return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(139),c(48),c(45),c(127)],e=function(a,b,c,d){var e=a.extend({constructor:function(b){a.call(this,b),this.container.className="jw-overlay-horizontal jw-reset",this.openClass="jw-open-drawer",this.componentType="drawer"},setup:function(a,e){this.iconUI||(this.iconUI=new d(this.el,{useHover:!0,directSelect:!0}),this.toggleOpenStateListener=this.toggleOpenState.bind(this),this.openTooltipListener=this.openTooltip.bind(this),this.closeTooltipListener=this.closeTooltip.bind(this)),this.reset(),a=c.isArray(a)?a:[],this.activeContents=c.filter(a,function(a){return a.isActive}),b.toggleClass(this.el,"jw-hidden",!e||this.activeContents.length<2),e&&this.activeContents.length>1&&(b.removeClass(this.el,"jw-off"),this.iconUI.on("tap",this.toggleOpenStateListener).on("over",this.openTooltipListener).on("out",this.closeTooltipListener),c.each(a,function(a){this.container.appendChild(a.el)},this))},reset:function(){b.addClass(this.el,"jw-off"),this.iconUI.off(),this.contentUI&&this.contentUI.off().destroy(),this.removeContent()}});return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48)],e=function(a,b){function c(a,b){b.off("change:mediaType",null,this),b.on("change:mediaType",function(b,c){"audio"===c&&this.setImage(a.get("playlistItem").image)},this)}function d(a,c){var d=a.get("autostart")&&!b.isMobile()||a.get("item")>0;return d?(this.setImage(null),a.off("change:state",null,this),void a.on("change:state",function(a,b){("complete"===b||"idle"===b||"error"===b)&&this.setImage(c.image)},this)):void this.setImage(c.image)}var e=function(a){this.model=a,a.on("change:playlistItem",d,this),a.on("change:mediaModel",c,this)};return a.extend(e.prototype,{setup:function(a){this.el=a;var b=this.model.get("playlistItem");b&&this.setImage(b.image)},setImage:function(c){this.model.off("change:state",null,this);var d="";a.isString(c)&&(d='url("'+c+'")'),b.style(this.el,{backgroundImage:d})},element:function(){return this.el}}),e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(150),c(45),c(59)],e=function(a,b,c){var d={free:"f",premium:"r",enterprise:"e",ads:"a",unlimited:"u",trial:"t"},e=function(){};return b.extend(e.prototype,a.prototype,{buildArray:function(){var b=a.prototype.buildArray.apply(this,arguments),e=this.model.get("edition"),f="https://jwplayer.com/learn-more/?m=h&e="+(d[e]||e)+"&v="+c;if(b.items[0].link=f,this.model.get("abouttext")){b.items[0].showLogo=!1,b.items.push(b.items.shift());var g={title:this.model.get("abouttext"),link:this.model.get("aboutlink")||f};b.items.unshift(g)}return b}}),e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(151),c(45),c(127),c(59)],e=function(a,b,c,d,e){var f=function(){};return c.extend(f.prototype,{buildArray:function(){var b=e.split("+"),c=b[0],d={items:[{title:"Powered by JW Player "+c,featured:!0,showLogo:!0,link:"https://jwplayer.com/learn-more/?m=h&e=o&v="+e}]},f=c.indexOf("-")>0,g=b[1];if(f&&g){var h=g.split(".");d.items.push({title:"build: ("+h[0]+"."+h[1]+")",link:"#"})}var i=this.model.get("provider").name;if(i.indexOf("flash")>=0){var j="Flash Version "+a.flashVersion();d.items.push({title:j,link:"http://www.adobe.com/software/flash/about/"})}return d},buildMenu:function(){var c=this.buildArray();return a.createElement(b(c))},updateHtml:function(){this.el.innerHTML=this.buildMenu().innerHTML},rightClick:function(a){return this.lazySetup(),this.mouseOverContext?!1:(this.hideMenu(),this.showMenu(a),!1)},getOffset:function(a){for(var b=a.target,c=a.offsetX||a.layerX,d=a.offsetY||a.layerY;b!==this.playerElement;)c+=b.offsetLeft,d+=b.offsetTop,b=b.parentNode;return{x:c,y:d}},showMenu:function(b){var c=this.getOffset(b);return this.el.style.left=c.x+"px",this.el.style.top=c.y+"px",a.addClass(this.playerElement,"jw-flag-rightclick-open"),a.addClass(this.el,"jw-open"),!1},hideMenu:function(){this.mouseOverContext||(a.removeClass(this.playerElement,"jw-flag-rightclick-open"),a.removeClass(this.el,"jw-open"))},lazySetup:function(){this.el||(this.el=this.buildMenu(),this.layer.appendChild(this.el),this.hideMenuHandler=this.hideMenu.bind(this),this.addOffListener(this.playerElement),this.addOffListener(document),this.model.on("change:provider",this.updateHtml,this),this.elementUI=new d(this.el,{useHover:!0}).on("over",function(){this.mouseOverContext=!0},this).on("out",function(){this.mouseOverContext=!1},this))},setup:function(a,b,c){this.playerElement=b,this.model=a,this.mouseOverContext=!1,this.layer=c,b.oncontextmenu=this.rightClick.bind(this)},addOffListener:function(a){a.addEventListener("mousedown",this.hideMenuHandler),a.addEventListener("touchstart",this.hideMenuHandler),a.addEventListener("pointerdown",this.hideMenuHandler)},removeOffListener:function(a){a.removeEventListener("mousedown",this.hideMenuHandler),a.removeEventListener("touchstart",this.hideMenuHandler),a.removeEventListener("pointerdown",this.hideMenuHandler)},destroy:function(){this.el&&(this.hideMenu(),this.elementUI.off(),this.removeOffListener(this.playerElement),this.removeOffListener(document),this.hideMenuHandler=null,this.el=null),this.playerElement&&(this.playerElement.oncontextmenu=null,this.playerElement=null),this.model&&(this.model.off("change:provider",this.updateHtml),this.model=null)}}),f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='        <li class="jw-reset';return e=b["if"].call(a,null!=a?a.featured:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='">\n            <a href="'+i((f=null!=(f=b.link||(null!=a?a.link:a))?f:h,typeof f===g?f.call(a,{name:"link",hash:{},data:d}):f))+'" class="jw-reset" target="_top">\n',e=b["if"].call(a,null!=a?a.showLogo:a,{name:"if",hash:{},fn:this.program(4,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"                "+i((f=null!=(f=b.title||(null!=a?a.title:a))?f:h,typeof f===g?f.call(a,{name:"title",hash:{},data:d}):f))+"\n            </a>\n        </li>\n"},2:function(a,b,c,d){return" jw-featured"},4:function(a,b,c,d){return'                <span class="jw-icon jw-rightclick-logo jw-reset"></span>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="jw-rightclick jw-reset">\n    <ul class="jw-reset">\n';return e=b.each.call(a,null!=a?a.items:a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"    </ul>\n</div>"},useData:!0})},function(a,b,c){var d,e;d=[c(45),c(48)],e=function(a,b){var c=function(a){this.model=a,this.model.on("change:playlistItem",this.playlistItem,this)};return a.extend(c.prototype,{hide:function(){this.el.style.display="none"},show:function(){this.el.style.display=""},setup:function(a){this.el=a;var b=this.el.getElementsByTagName("div");this.title=b[0],this.description=b[1],this.model.get("playlistItem")&&this.playlistItem(this.model,this.model.get("playlistItem")),this.model.on("change:logoWidth",this.update,this),this.model.on("change:dock",this.update,this)},update:function(a){var c={paddingLeft:0,paddingRight:0},d=a.get("controls"),e=a.get("dock"),f=a.get("logo");if(f){var g=1*(""+f.margin).replace("px",""),h=a.get("logoWidth")+(isNaN(g)?0:g);"top-left"===f.position?c.paddingLeft=h:"top-right"===f.position&&(c.paddingRight=h)}if(d&&e&&e.length){var i=56*e.length;c.paddingRight=Math.max(c.paddingRight,i)}b.style(this.el,c)},playlistItem:function(a,b){if(a.get("displaytitle")||a.get("displaydescription")){var c="",d="";b.title&&a.get("displaytitle")&&(c=b.title),b.description&&a.get("displaydescription")&&(d=b.description),this.updateText(c,d)}else this.hide()},updateText:function(a,b){this.title.innerHTML=a,this.description.innerHTML=b,this.title.firstChild||this.description.firstChild?this.show():this.hide()},element:function(){return this.el}}),c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'<div id="'+h((e=null!=(e=b.id||(null!=a?a.id:a))?e:g,typeof e===f?e.call(a,{name:"id",hash:{},data:d}):e))+'" class="jwplayer jw-reset" tabindex="0">\n    <div class="jw-aspect jw-reset"></div>\n    <div class="jw-media jw-reset"></div>\n    <div class="jw-preview jw-reset"></div>\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset"></div>\n        <div class="jw-title-secondary jw-reset"></div>\n    </div>\n    <div class="jw-overlays jw-reset"></div>\n    <div class="jw-controls jw-reset"></div>\n</div>'},useData:!0})},function(a,b,c){var d,e;d=[c(48),c(46),c(127),c(47),c(45),c(155)],e=function(a,b,c,d,e,f){var g=function(a){this.model=a,this.setup()};return e.extend(g.prototype,d,{setup:function(){this.destroy(),this.skipMessage=this.model.get("skipText"),this.skipMessageCountdown=this.model.get("skipMessage"),this.setWaitTime(this.model.get("skipOffset"));var b=f();this.el=a.createElement(b),this.skiptext=this.el.getElementsByClassName("jw-skiptext")[0],this.skipAdOnce=e.once(this.skipAd.bind(this)),new c(this.el).on("click tap",e.bind(function(){this.skippable&&this.skipAdOnce()},this)),this.model.on("change:duration",this.onChangeDuration,this),this.model.on("change:position",this.onChangePosition,this),this.onChangeDuration(this.model,this.model.get("duration")),this.onChangePosition(this.model,this.model.get("position"))},updateMessage:function(a){this.skiptext.innerHTML=a},updateCountdown:function(a){this.updateMessage(this.skipMessageCountdown.replace(/xx/gi,Math.ceil(this.waitTime-a)))},onChangeDuration:function(b,c){if(c){if(this.waitPercentage){if(!c)return;this.itemDuration=c,this.setWaitTime(this.waitPercentage),delete this.waitPercentage}a.removeClass(this.el,"jw-hidden")}},onChangePosition:function(b,c){this.waitTime-c>0?this.updateCountdown(c):(this.updateMessage(this.skipMessage),this.skippable=!0,a.addClass(this.el,"jw-skippable"))},element:function(){return this.el},setWaitTime:function(b){if(e.isString(b)&&"%"===b.slice(-1)){var c=parseFloat(b);return void(this.itemDuration&&!isNaN(c)?this.waitTime=this.itemDuration*c/100:this.waitPercentage=b)}e.isNumber(b)?this.waitTime=b:"string"===a.typeOf(b)?this.waitTime=a.seconds(b):isNaN(Number(b))?this.waitTime=0:this.waitTime=Number(b)},skipAd:function(){this.trigger(b.JWPLAYER_AD_SKIPPED)},destroy:function(){this.el&&(this.el.removeEventListener("click",this.skipAdOnce),this.el.parentElement&&this.el.parentElement.removeChild(this.el)),delete this.skippable,delete this.itemDuration,delete this.waitPercentage}}),g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){return'<div class="jw-skip jw-background-color jw-hidden jw-reset">\n    <span class="jw-text jw-skiptext jw-reset"></span>\n    <span class="jw-icon-inline jw-skip-icon jw-reset"></span>\n</div>'},useData:!0})},function(a,b,c){var d,e;d=[c(157)],e=function(a){function b(b,c,d,e){return a({id:b,skin:c,title:d,body:e})}return b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'<div id="'+h((e=null!=(e=b.id||(null!=a?a.id:a))?e:g,typeof e===f?e.call(a,{name:"id",hash:{},data:d}):e))+'"class="jw-skin-'+h((e=null!=(e=b.skin||(null!=a?a.skin:a))?e:g,typeof e===f?e.call(a,{name:"skin",hash:{},data:d}):e))+' jw-error jw-reset">\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset">'+h((e=null!=(e=b.title||(null!=a?a.title:a))?e:g,typeof e===f?e.call(a,{name:"title",hash:{},data:d}):e))+'</div>\n        <div class="jw-title-secondary jw-reset">'+h((e=null!=(e=b.body||(null!=a?a.body:a))?e:g,typeof e===f?e.call(a,{name:"body",hash:{},data:d}):e))+'</div>\n    </div>\n\n    <div class="jw-icon-container jw-reset">\n        <div class="jw-display-icon-container jw-background-color jw-reset">\n            <div class="jw-icon jw-icon-display jw-reset"></div>\n        </div>\n    </div>\n</div>\n'},useData:!0})},function(a,b,c){var d,e;d=[],e=function(){function a(){var a=document.createElement("div");return a.className=c,a.innerHTML="&nbsp;",a.style.width="1px",a.style.height="1px",a.style.position="absolute",a.style.background="transparent",a}function b(){function b(){var a=this,b=a._view.element();b.appendChild(f),d()&&a.trigger("adBlock")}function d(){return e?!0:((""===f.innerHTML||f.className!==c||null===f.offsetParent||0===f.clientHeight)&&(e=!0),e)}var e=!1,f=a();return{onReady:b,checkAdBlock:d}}var c="afs_ads";return{setup:b}}.apply(b,d),!(void 0!==e&&(a.exports=e))},,,,function(a,b,c){var d,e;d=[],e=function(){var a=window.chrome,b={};return b.NS="urn:x-cast:com.longtailvideo.jwplayer",b.debug=!1,b.availability=null,b.available=function(c){c=c||b.availability;var d="available";return a&&a.cast&&a.cast.ReceiverAvailability&&(d=a.cast.ReceiverAvailability.AVAILABLE),c===d},b.log=function(){if(b.debug){var a=Array.prototype.slice.call(arguments,0);console.log.apply(console,a)}},b.error=function(){var a=Array.prototype.slice.call(arguments,0);console.error.apply(console,a)},b}.apply(b,d),!(void 0!==e&&(a.exports=e))},,,function(a,b,c){var d,e;d=[c(98),c(45)],e=function(a,b){return function(c,d){var e=["seek","skipAd","stop","playlistNext","playlistPrev","playlistItem","resize","addButton","removeButton","registerPlugin","attachMedia"];b.each(e,function(a){c[a]=function(){return d[a].apply(d,arguments),c}}),c.registerPlugin=a.registerPlugin}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){return function(b,c){var d=["buffer","controls","position","duration","fullscreen","volume","mute","item","stretching","playlist"];a.each(d,function(a){var d=a.slice(0,1).toUpperCase()+a.slice(1);b["get"+d]=function(){return c._model.get(a)}});var e=["getAudioTracks","getCaptionsList","getWidth","getHeight","getCurrentAudioTrack","setCurrentAudioTrack","getCurrentCaptions","setCurrentCaptions","getCurrentQuality","setCurrentQuality","getQualityLevels","getVisualQuality","getConfig","getState","getSafeRegion","isBeforeComplete","isBeforePlay","getProvider","detachMedia"],f=["setControls","setFullscreen","setVolume","setMute","setCues"];a.each(e,function(a){b[a]=function(){return c[a]?c[a].apply(c,arguments):null}}),a.each(f,function(a){b[a]=function(){return c[a].apply(c,arguments),b}})}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(46)],e=function(a,b){return function(c){var d={onBufferChange:b.JWPLAYER_MEDIA_BUFFER,onBufferFull:b.JWPLAYER_MEDIA_BUFFER_FULL,onError:b.JWPLAYER_ERROR,onSetupError:b.JWPLAYER_SETUP_ERROR,onFullscreen:b.JWPLAYER_FULLSCREEN,onMeta:b.JWPLAYER_MEDIA_META,onMute:b.JWPLAYER_MEDIA_MUTE,onPlaylist:b.JWPLAYER_PLAYLIST_LOADED,onPlaylistItem:b.JWPLAYER_PLAYLIST_ITEM,onPlaylistComplete:b.JWPLAYER_PLAYLIST_COMPLETE,onReady:b.JWPLAYER_READY,onResize:b.JWPLAYER_RESIZE,onComplete:b.JWPLAYER_MEDIA_COMPLETE,onSeek:b.JWPLAYER_MEDIA_SEEK,onTime:b.JWPLAYER_MEDIA_TIME,onVolume:b.JWPLAYER_MEDIA_VOLUME,onBeforePlay:b.JWPLAYER_MEDIA_BEFOREPLAY,onBeforeComplete:b.JWPLAYER_MEDIA_BEFORECOMPLETE,onDisplayClick:b.JWPLAYER_DISPLAY_CLICK,onControls:b.JWPLAYER_CONTROLS,onQualityLevels:b.JWPLAYER_MEDIA_LEVELS,onQualityChange:b.JWPLAYER_MEDIA_LEVEL_CHANGED,onCaptionsList:b.JWPLAYER_CAPTIONS_LIST,onCaptionsChange:b.JWPLAYER_CAPTIONS_CHANGED,onAdError:b.JWPLAYER_AD_ERROR,onAdClick:b.JWPLAYER_AD_CLICK,onAdImpression:b.JWPLAYER_AD_IMPRESSION,onAdTime:b.JWPLAYER_AD_TIME,onAdComplete:b.JWPLAYER_AD_COMPLETE,onAdCompanions:b.JWPLAYER_AD_COMPANIONS,onAdSkipped:b.JWPLAYER_AD_SKIPPED,onAdPlay:b.JWPLAYER_AD_PLAY,onAdPause:b.JWPLAYER_AD_PAUSE,onAdMeta:b.JWPLAYER_AD_META,onCast:b.JWPLAYER_CAST_SESSION,onAudioTrackChange:b.JWPLAYER_AUDIO_TRACK_CHANGED,onAudioTracks:b.JWPLAYER_AUDIO_TRACKS},e={onBuffer:"buffer",onPause:"pause",onPlay:"play",onIdle:"idle"};a.each(e,function(b,d){c[d]=a.partial(c.on,b,a)}),a.each(d,function(b,d){c[d]=a.partial(c.on,b,a)})}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(169);"string"==typeof d&&(d=[[a.id,d,""]]);c(173)(d,{});d.locals&&(a.exports=d.locals)},function(a,b,c){b=a.exports=c(170)(),b.push([a.id,".jw-reset{color:inherit;background-color:transparent;padding:0;margin:0;float:none;font-family:Arial,Helvetica,sans-serif;font-size:1em;line-height:1em;list-style:none;text-align:left;text-transform:none;vertical-align:baseline;border:0;direction:ltr;font-variant:inherit;font-stretch:inherit;-webkit-tap-highlight-color:rgba(255,255,255,0)}@font-face{font-family:'jw-icons';src:url("+c(171)+") format('woff'),url("+c(172)+') format(\'truetype\');font-weight:normal;font-style:normal}.jw-icon-inline,.jw-icon-tooltip,.jw-icon-display,.jw-controlbar .jw-menu .jw-option:before{font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-icon-audio-tracks:before{content:"\\e600"}.jw-icon-buffer:before{content:"\\e601"}.jw-icon-cast:before{content:"\\e603"}.jw-icon-cast.jw-off:before{content:"\\e602"}.jw-icon-cc:before{content:"\\e605"}.jw-icon-cue:before{content:"\\e606"}.jw-icon-menu-bullet:before{content:"\\e606"}.jw-icon-error:before{content:"\\e607"}.jw-icon-fullscreen:before{content:"\\e608"}.jw-icon-fullscreen.jw-off:before{content:"\\e613"}.jw-icon-hd:before{content:"\\e60a"}.jw-watermark:before,.jw-rightclick-logo:before{content:"\\e60b"}.jw-icon-next:before{content:"\\e60c"}.jw-icon-pause:before{content:"\\e60d"}.jw-icon-play:before{content:"\\e60e"}.jw-icon-prev:before{content:"\\e60f"}.jw-icon-replay:before{content:"\\e610"}.jw-icon-volume:before{content:"\\e612"}.jw-icon-volume.jw-off:before{content:"\\e611"}.jw-icon-more:before{content:"\\e614"}.jw-icon-close:before{content:"\\e615"}.jw-icon-playlist:before{content:"\\e616"}.jwplayer{width:100%;font-size:16px;position:relative;display:block;min-height:0;overflow:hidden;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;background-color:#000;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jwplayer *{box-sizing:inherit}.jwplayer.jw-flag-aspect-mode{height:auto !important}.jwplayer.jw-flag-aspect-mode .jw-aspect{display:block}.jwplayer .jw-aspect{display:none}.jwplayer.jw-no-focus:focus,.jwplayer .jw-swf{outline:none}.jwplayer.jw-ie:focus{outline:#585858 dotted 1px}.jwplayer:hover .jw-display-icon-container{background-color:#333;background:#333;background-size:#333}.jw-media,.jw-preview,.jw-overlays,.jw-controls{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jw-media{overflow:hidden;cursor:pointer}.jw-overlays{cursor:auto}.jw-media.jw-media-show{visibility:visible;opacity:1}.jw-controls.jw-controls-disabled{display:none}.jw-controls .jw-controls-right{position:absolute;top:0;right:0;left:0;bottom:2em}.jw-text{height:1em;font-family:Arial,Helvetica,sans-serif;font-size:.75em;font-style:normal;font-weight:normal;color:white;text-align:center;font-variant:normal;font-stretch:normal}.jw-plugin{position:absolute;bottom:2.5em}.jw-plugin .jw-banner{max-width:100%;opacity:0;cursor:pointer;position:absolute;margin:auto auto 0 auto;left:0;right:0;bottom:0;display:block}.jw-cast-screen{width:100%;height:100%}.jw-instream{position:absolute;top:0;right:0;bottom:0;left:0;display:none}.jw-icon-playback:before{content:"\\e60e"}.jw-preview,.jw-captions,.jw-title,.jw-overlays,.jw-controls{pointer-events:none}.jw-overlays>div,.jw-media,.jw-controlbar,.jw-dock,.jw-logo,.jw-skip,.jw-display-icon-container{pointer-events:all}.jwplayer video{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;margin:auto;background:transparent}.jwplayer video::-webkit-media-controls-start-playback-button{display:none}.jwplayer video::-webkit-media-text-track-display{-webkit-transform:translateY(-1.5em);transform:translateY(-1.5em)}.jwplayer.jw-flag-user-inactive.jw-state-playing video::-webkit-media-text-track-display{-webkit-transform:translateY(0);transform:translateY(0)}.jwplayer.jw-stretch-uniform video{-o-object-fit:contain;object-fit:contain}.jwplayer.jw-stretch-none video{-o-object-fit:none;object-fit:none}.jwplayer.jw-stretch-fill video{-o-object-fit:cover;object-fit:cover}.jwplayer.jw-stretch-exactfit video{-o-object-fit:fill;object-fit:fill}.jw-click{position:absolute;width:100%;height:100%}.jw-preview{position:absolute;display:none;opacity:1;visibility:visible;width:100%;height:100%;background:#000 no-repeat 50% 50%}.jwplayer .jw-preview,.jw-error .jw-preview,.jw-stretch-uniform .jw-preview{background-size:contain}.jw-stretch-none .jw-preview{background-size:auto auto}.jw-stretch-fill .jw-preview{background-size:cover}.jw-stretch-exactfit .jw-preview{background-size:100% 100%}.jw-display-icon-container{position:relative;top:50%;display:table;height:3.5em;width:3.5em;margin:-1.75em auto 0;cursor:pointer}.jw-display-icon-container .jw-icon-display{position:relative;display:table-cell;text-align:center;vertical-align:middle !important;background-position:50% 50%;background-repeat:no-repeat;font-size:2em}.jw-flag-audio-player .jw-display-icon-container,.jw-flag-dragging .jw-display-icon-container{display:none}.jw-icon{font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-controlbar{display:table;position:absolute;right:0;left:0;bottom:0;height:2em;padding:0 .25em}.jw-controlbar .jw-hidden{display:none}.jw-controlbar.jw-drawer-expanded .jw-controlbar-left-group,.jw-controlbar.jw-drawer-expanded .jw-controlbar-center-group{opacity:0}.jw-background-color{background-color:#414040}.jw-group{display:table-cell}.jw-controlbar-center-group{width:100%;padding:0 .25em}.jw-controlbar-center-group .jw-slider-time,.jw-controlbar-center-group .jw-text-alt{padding:0}.jw-controlbar-center-group .jw-text-alt{display:none}.jw-controlbar-left-group,.jw-controlbar-right-group{white-space:nowrap}.jw-knob:hover,.jw-icon-inline:hover,.jw-icon-tooltip:hover,.jw-icon-display:hover,.jw-option:before:hover{color:#eee}.jw-icon-inline,.jw-icon-tooltip,.jw-slider-horizontal,.jw-text-elapsed,.jw-text-duration{display:inline-block;height:2em;position:relative;line-height:2em;vertical-align:middle;cursor:pointer}.jw-icon-inline,.jw-icon-tooltip{min-width:1.25em;text-align:center}.jw-icon-playback{min-width:2.25em}.jw-icon-volume{min-width:1.75em;text-align:left}.jw-time-tip{line-height:1em;pointer-events:none}.jw-icon-inline:after,.jw-icon-tooltip:after{width:100%;height:100%;font-size:1em}.jw-icon-cast{display:none}.jw-slider-volume.jw-slider-horizontal,.jw-icon-inline.jw-icon-volume{display:none}.jw-dock{margin:.75em;display:block;opacity:1;clear:right}.jw-dock:after{content:\'\';clear:both;display:block}.jw-dock-button{cursor:pointer;float:right;position:relative;width:2.5em;height:2.5em;margin:.5em}.jw-dock-button .jw-arrow{display:none;position:absolute;bottom:-0.2em;width:.5em;height:.2em;left:50%;margin-left:-0.25em}.jw-dock-button .jw-overlay{display:none;position:absolute;top:2.5em;right:0;margin-top:.25em;padding:.5em;white-space:nowrap}.jw-dock-button:hover .jw-overlay,.jw-dock-button:hover .jw-arrow{display:block}.jw-dock-image{width:100%;height:100%;background-position:50% 50%;background-repeat:no-repeat;opacity:.75}.jw-title{display:none;position:absolute;top:0;width:100%;font-size:.875em;height:8em;background:-webkit-linear-gradient(top, #000 0, #000 18%, rgba(0,0,0,0) 100%);background:linear-gradient(to bottom, #000 0, #000 18%, rgba(0,0,0,0) 100%)}.jw-title-primary,.jw-title-secondary{padding:.75em 1.5em;min-height:2.5em;width:100%;color:white;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.jw-title-primary{font-weight:bold}.jw-title-secondary{margin-top:-0.5em}.jw-slider-container{display:inline-block;height:1em;position:relative;-ms-touch-action:none;touch-action:none}.jw-rail,.jw-buffer,.jw-progress{position:absolute;cursor:pointer}.jw-progress{background-color:#fff}.jw-rail{background-color:#aaa}.jw-buffer{background-color:#202020}.jw-cue,.jw-knob{position:absolute;cursor:pointer}.jw-cue{background-color:#fff;width:.1em;height:.4em}.jw-knob{background-color:#aaa;width:.4em;height:.4em}.jw-slider-horizontal{width:4em;height:1em}.jw-slider-horizontal.jw-slider-volume{margin-right:5px}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress{width:100%;height:.4em}.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-buffer{width:0}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-slider-container{width:100%}.jw-slider-horizontal .jw-knob{left:0;margin-left:-0.325em}.jw-slider-vertical{width:.75em;height:4em;bottom:0;position:absolute;padding:1em}.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-buffer,.jw-slider-vertical .jw-progress{bottom:0;height:100%}.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-buffer{height:0}.jw-slider-vertical .jw-slider-container,.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-progress{bottom:0;width:.75em;height:100%;left:0;right:0;margin:0 auto}.jw-slider-vertical .jw-slider-container{height:4em;position:relative}.jw-slider-vertical .jw-knob{bottom:0;left:0;right:0;margin:0 auto}.jw-slider-time{right:0;left:0;width:100%}.jw-tooltip-time{position:absolute}.jw-slider-volume .jw-buffer{display:none}.jw-captions{position:absolute;display:none;margin:0 auto;width:100%;left:0;bottom:3em;right:0;max-width:90%;text-align:center}.jw-captions.jw-captions-enabled{display:block}.jw-captions-window{display:none;padding:.25em;border-radius:.25em}.jw-captions-window.jw-captions-window-active{display:inline-block}.jw-captions-text{display:inline-block;color:white;background-color:black;word-wrap:break-word;white-space:pre-line;font-style:normal;font-weight:normal;text-align:center;text-decoration:none;line-height:1.3em;padding:.1em .8em}.jw-rightclick{display:none;position:absolute;white-space:nowrap}.jw-rightclick.jw-open{display:block}.jw-rightclick ul{list-style:none;font-weight:bold;border-radius:.15em;margin:0;border:1px solid #444;padding-left:0}.jw-rightclick .jw-rightclick-logo{font-size:2em;color:#ff0147;vertical-align:middle;padding-right:.3em;margin-right:.3em;border-right:1px solid #444}.jw-rightclick li{background-color:#000;border-bottom:1px solid #444;margin:0}.jw-rightclick a{color:#fff;text-decoration:none;padding:1em;display:block;font-size:.6875em}.jw-rightclick li:last-child{border-bottom:none}.jw-rightclick li:hover{background-color:#1a1a1a;cursor:pointer}.jw-rightclick .jw-featured{background-color:#252525;vertical-align:middle}.jw-rightclick .jw-featured a{color:#777}.jw-logo{position:absolute;margin:.75em;cursor:pointer;pointer-events:all;background-repeat:no-repeat;background-size:contain;top:auto;right:auto;left:auto;bottom:auto}.jw-logo .jw-flag-audio-player{display:none}.jw-logo-top-right{top:0;right:0}.jw-logo-top-left{top:0;left:0}.jw-logo-bottom-left{bottom:0;left:0}.jw-logo-bottom-right{bottom:0;right:0}.jw-watermark{position:absolute;top:50%;left:0;right:0;bottom:0;text-align:center;font-size:14em;color:#eee;opacity:.33;pointer-events:none}.jw-icon-tooltip.jw-open .jw-overlay{opacity:1;visibility:visible}.jw-icon-tooltip.jw-hidden{display:none}.jw-overlay-horizontal{display:none}.jw-icon-tooltip.jw-open-drawer:before{display:none}.jw-icon-tooltip.jw-open-drawer .jw-overlay-horizontal{opacity:1;display:inline-block;vertical-align:top}.jw-overlay:before{position:absolute;top:0;bottom:0;left:-50%;width:100%;background-color:rgba(0,0,0,0);content:" "}.jw-slider-time .jw-overlay:before{height:1em;top:auto}.jw-time-tip,.jw-volume-tip,.jw-menu{position:relative;left:-50%;border:solid 1px #000;margin:0}.jw-volume-tip{width:100%;height:100%;display:block}.jw-time-tip{text-align:center;font-family:inherit;color:#aaa;bottom:1em;border:solid 4px #000}.jw-time-tip .jw-text{line-height:1em}.jw-controlbar .jw-overlay{margin:0;position:absolute;bottom:2em;left:50%;opacity:0;visibility:hidden}.jw-controlbar .jw-overlay .jw-contents{position:relative}.jw-controlbar .jw-option{position:relative;white-space:nowrap;cursor:pointer;list-style:none;height:1.5em;font-family:inherit;line-height:1.5em;color:#aaa;padding:0 .5em;font-size:.8em}.jw-controlbar .jw-option:hover,.jw-controlbar .jw-option:before:hover{color:#eee}.jw-controlbar .jw-option:before{padding-right:.125em}.jw-playlist-container ::-webkit-scrollbar-track{background-color:#333;border-radius:10px}.jw-playlist-container ::-webkit-scrollbar{width:5px;border:10px solid black;border-bottom:0;border-top:0}.jw-playlist-container ::-webkit-scrollbar-thumb{background-color:white;border-radius:5px}.jw-tooltip-title{border-bottom:1px solid #444;text-align:left;padding-left:.7em}.jw-playlist{max-height:11em;min-height:4.5em;overflow-x:hidden;overflow-y:scroll;width:calc(100% - 4px)}.jw-playlist .jw-option{height:3em;margin-right:5px;color:white;padding-left:1em;font-size:.8em}.jw-playlist .jw-label,.jw-playlist .jw-name{display:inline-block;line-height:3em;text-align:left;overflow:hidden;white-space:nowrap}.jw-playlist .jw-label{width:1em}.jw-playlist .jw-name{width:11em}.jw-skip{cursor:default;position:absolute;float:right;display:inline-block;right:.75em;bottom:3em}.jw-skip.jw-skippable{cursor:pointer}.jw-skip.jw-hidden{visibility:hidden}.jw-skip .jw-skip-icon{display:none;margin-left:-0.75em}.jw-skip .jw-skip-icon:before{content:"\\e60c"}.jw-skip .jw-text,.jw-skip .jw-skip-icon{color:#aaa;vertical-align:middle;line-height:1.5em;font-size:.7em}.jw-skip.jw-skippable:hover{cursor:pointer}.jw-skip.jw-skippable:hover .jw-text,.jw-skip.jw-skippable:hover .jw-skip-icon{color:#eee}.jw-skip.jw-skippable .jw-skip-icon{display:inline;margin:0}.jwplayer.jw-state-playing.jw-flag-casting .jw-display-icon-container,.jwplayer.jw-state-paused.jw-flag-casting .jw-display-icon-container{display:table}.jwplayer.jw-flag-casting .jw-display-icon-container{border-radius:0;border:1px solid white;position:absolute;top:auto;left:.5em;right:.5em;bottom:50%;margin-bottom:-12.5%;height:50%;width:50%;padding:0;background-repeat:no-repeat;background-position:center}.jwplayer.jw-flag-casting .jw-display-icon-container .jw-icon{font-size:3em}.jwplayer.jw-flag-casting.jw-state-complete .jw-preview{display:none}.jw-cast{position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:auto;background-position:50% 50%}.jw-cast-label{position:absolute;left:.5em;right:.5em;bottom:75%;margin-bottom:1.5em;text-align:center}.jw-cast-name{color:#ccc}.jw-state-idle .jw-preview{display:block}.jw-state-idle .jw-icon-display:before{content:"\\e60e"}.jw-state-idle .jw-controlbar{display:none}.jw-state-idle .jw-captions{display:none}.jw-state-idle .jw-title{display:block}.jwplayer.jw-state-playing .jw-display-icon-container{display:none}.jwplayer.jw-state-playing .jw-display-icon-container .jw-icon-display:before{content:"\\e60d"}.jwplayer.jw-state-playing .jw-icon-playback:before{content:"\\e60d"}.jwplayer.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-state-paused .jw-display-icon-container .jw-icon-display:before{content:"\\e60e"}.jwplayer.jw-state-paused .jw-icon-playback:before{content:"\\e60e"}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display:before{content:"\\e601"}@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg)}}@keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-buffering .jw-icon-playback:before{content:"\\e60d"}.jwplayer.jw-state-complete .jw-preview{display:block}.jwplayer.jw-state-complete .jw-display-icon-container .jw-icon-display:before{content:"\\e610"}.jwplayer.jw-state-complete .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-complete .jw-icon-playback:before{content:"\\e60e"}.jwplayer.jw-state-complete .jw-captions{display:none}body .jw-error .jw-title,.jwplayer.jw-state-error .jw-title{display:block}body .jw-error .jw-title .jw-title-primary,.jwplayer.jw-state-error .jw-title .jw-title-primary{white-space:normal}body .jw-error .jw-preview,.jwplayer.jw-state-error .jw-preview{display:block}body .jw-error .jw-controlbar,.jwplayer.jw-state-error .jw-controlbar{display:none}body .jw-error .jw-captions,.jwplayer.jw-state-error .jw-captions{display:none}body .jw-error:hover .jw-display-icon-container,.jwplayer.jw-state-error:hover .jw-display-icon-container{cursor:default;color:#fff;background:#000}body .jw-error .jw-icon-display,.jwplayer.jw-state-error .jw-icon-display{cursor:default;font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}body .jw-error .jw-icon-display:before,.jwplayer.jw-state-error .jw-icon-display:before{content:"\\e607"}body .jw-error .jw-icon-display:hover,.jwplayer.jw-state-error .jw-icon-display:hover{color:#fff}body .jw-error{font-size:16px;background-color:#000;color:#eee;width:100%;height:100%;display:table;opacity:1;position:relative}body .jw-error .jw-icon-container{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jwplayer.jw-flag-cast-available .jw-controlbar{display:table}.jwplayer.jw-flag-cast-available .jw-icon-cast{display:inline-block}.jwplayer.jw-flag-skin-loading .jw-captions,.jwplayer.jw-flag-skin-loading .jw-controls,.jwplayer.jw-flag-skin-loading .jw-title{display:none}.jwplayer.jw-flag-fullscreen{width:100% !important;height:100% !important;top:0;right:0;bottom:0;left:0;z-index:1000;margin:0;position:fixed}.jwplayer.jw-flag-fullscreen.jw-flag-user-inactive{cursor:none;-webkit-cursor-visibility:auto-hide}.jwplayer.jw-flag-live .jw-controlbar .jw-text-elapsed,.jwplayer.jw-flag-live .jw-controlbar .jw-text-duration,.jwplayer.jw-flag-live .jw-controlbar .jw-slider-time{display:none}.jwplayer.jw-flag-live .jw-controlbar .jw-text-alt{display:inline}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-controlbar,.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-dock{display:none}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-logo.jw-hide{display:none}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-plugin,.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-captions{bottom:.5em}.jwplayer.jw-flag-user-inactive.jw-state-buffering .jw-controlbar{display:none}.jwplayer.jw-flag-media-audio .jw-controlbar{display:table}.jwplayer.jw-flag-media-audio.jw-flag-user-inactive .jw-controlbar{display:table}.jw-flag-media-audio .jw-preview{display:block}.jwplayer.jw-flag-ads .jw-preview,.jwplayer.jw-flag-ads .jw-dock{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip,.jwplayer.jw-flag-ads .jw-controlbar .jw-text,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-horizontal{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-playback,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-fullscreen{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-text-alt{display:inline}.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume.jw-slider-horizontal,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline.jw-icon-volume{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-ads .jw-logo,.jwplayer.jw-flag-ads .jw-captions{display:none}.jwplayer.jw-flag-ads-googleima .jw-controlbar{display:table;bottom:0}.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-controlbar{font-size:1em}.jwplayer.jw-flag-ads-googleima.jw-flag-touch.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-flag-ads-googleima.jw-skin-seven .jw-controlbar{font-size:.9em}.jwplayer.jw-flag-ads-vpaid .jw-controlbar{display:none}.jwplayer.jw-flag-ads-hide-controls .jw-controls{display:none !important}.jwplayer.jw-flag-ads.jw-flag-touch .jw-controlbar{display:table}.jwplayer.jw-flag-overlay-open .jw-title{display:none}.jwplayer.jw-flag-overlay-open .jw-controls-right .jw-logo{display:none}.jwplayer.jw-flag-overlay-open-sharing .jw-controls,.jwplayer.jw-flag-overlay-open-related .jw-controls,.jwplayer.jw-flag-overlay-open-sharing .jw-title,.jwplayer.jw-flag-overlay-open-related .jw-title{display:none}.jwplayer.jw-flag-rightclick-open{overflow:visible}.jwplayer.jw-flag-rightclick-open .jw-rightclick{z-index:16777215}.jw-flag-controls-disabled .jw-controls{visibility:hidden}.jw-flag-controls-disabled .jw-logo{visibility:visible}.jw-flag-controls-disabled .jw-media{cursor:auto}body .jwplayer.jw-flag-flash-blocked .jw-title{display:block}body .jwplayer.jw-flag-flash-blocked .jw-controls,body .jwplayer.jw-flag-flash-blocked .jw-overlays,body .jwplayer.jw-flag-flash-blocked .jw-preview{display:none}.jw-flag-touch .jw-controlbar,.jw-flag-touch .jw-skip,.jw-flag-touch .jw-plugin{font-size:1.5em}.jw-flag-touch .jw-captions{bottom:4.25em}.jw-flag-touch .jw-icon-tooltip.jw-open-drawer:before{display:inline}.jw-flag-touch .jw-icon-tooltip.jw-open-drawer:before{content:"\\e615"}.jw-flag-touch .jw-display-icon-container{pointer-events:none}.jw-flag-touch.jw-state-paused .jw-display-icon-container{display:table}.jw-flag-touch.jw-state-paused.jw-flag-dragging .jw-display-icon-container{display:none}.jw-flag-compact-player .jw-icon-playlist,.jw-flag-compact-player .jw-text-elapsed,.jw-flag-compact-player .jw-text-duration{display:none}.jwplayer.jw-flag-audio-player{background-color:transparent}.jwplayer.jw-flag-audio-player .jw-media{visibility:hidden}.jwplayer.jw-flag-audio-player .jw-media object{width:1px;height:1px}.jwplayer.jw-flag-audio-player .jw-preview,.jwplayer.jw-flag-audio-player .jw-display-icon-container{display:none}.jwplayer.jw-flag-audio-player .jw-controlbar{display:table;height:auto;left:0;bottom:0;margin:0;width:100%;min-width:100%;opacity:1}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-fullscreen,.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip{display:none}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-slider-volume.jw-slider-horizontal,.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-inline.jw-icon-volume{display:inline-block}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-audio-player.jw-flag-user-inactive .jw-controlbar{display:table}.jw-skin-seven .jw-background-color{background:#000}.jw-skin-seven .jw-controlbar{border-top:#333 1px solid;height:2.5em}.jw-skin-seven .jw-group{vertical-align:middle}.jw-skin-seven .jw-playlist{background-color:rgba(0,0,0,0.5)}.jw-skin-seven .jw-playlist-container{left:-43%;background-color:rgba(0,0,0,0.5)}.jw-skin-seven .jw-playlist-container .jw-option{border-bottom:1px solid #444}.jw-skin-seven .jw-playlist-container .jw-option:hover,.jw-skin-seven .jw-playlist-container .jw-option.jw-active-option{background-color:black}.jw-skin-seven .jw-playlist-container .jw-option:hover .jw-label{color:#ff0046}.jw-skin-seven .jw-playlist-container .jw-icon-playlist{margin-left:0}.jw-skin-seven .jw-playlist-container .jw-label .jw-icon-play{color:#ff0046}.jw-skin-seven .jw-playlist-container .jw-label .jw-icon-play:before{padding-left:0}.jw-skin-seven .jw-tooltip-title{background-color:#000;color:#fff}.jw-skin-seven .jw-text{color:#fff}.jw-skin-seven .jw-button-color{color:#fff}.jw-skin-seven .jw-button-color:hover{color:#ff0046}.jw-skin-seven .jw-toggle{color:#ff0046}.jw-skin-seven .jw-toggle.jw-off{color:#fff}.jw-skin-seven .jw-controlbar .jw-icon:before,.jw-skin-seven .jw-text-elapsed,.jw-skin-seven .jw-text-duration{padding:0 .7em}.jw-skin-seven .jw-controlbar .jw-icon-prev:before{padding-right:.25em}.jw-skin-seven .jw-controlbar .jw-icon-playlist:before{padding:0 .45em}.jw-skin-seven .jw-controlbar .jw-icon-next:before{padding-left:.25em}.jw-skin-seven .jw-icon-prev,.jw-skin-seven .jw-icon-next{font-size:.7em}.jw-skin-seven .jw-icon-prev:before{border-left:1px solid #666}.jw-skin-seven .jw-icon-next:before{border-right:1px solid #666}.jw-skin-seven .jw-icon-display{color:#fff}.jw-skin-seven .jw-icon-display:before{padding-left:0}.jw-skin-seven .jw-display-icon-container{border-radius:50%;border:1px solid #333}.jw-skin-seven .jw-rail{background-color:#384154;box-shadow:none}.jw-skin-seven .jw-buffer{background-color:#666f82}.jw-skin-seven .jw-progress{background:#ff0046}.jw-skin-seven .jw-knob{width:.6em;height:.6em;background-color:#fff;box-shadow:0 0 0 1px #000;border-radius:1em}.jw-skin-seven .jw-slider-horizontal .jw-slider-container{height:.95em}.jw-skin-seven .jw-slider-horizontal .jw-rail,.jw-skin-seven .jw-slider-horizontal .jw-buffer,.jw-skin-seven .jw-slider-horizontal .jw-progress{height:.2em;border-radius:0}.jw-skin-seven .jw-slider-horizontal .jw-knob{top:-0.2em}.jw-skin-seven .jw-slider-horizontal .jw-cue{top:-0.05em;width:.3em;height:.3em;background-color:#fff;border-radius:50%}.jw-skin-seven .jw-slider-vertical .jw-rail,.jw-skin-seven .jw-slider-vertical .jw-buffer,.jw-skin-seven .jw-slider-vertical .jw-progress{width:.2em}.jw-skin-seven .jw-slider-vertical .jw-knob{margin-bottom:-0.3em}.jw-skin-seven .jw-volume-tip{width:100%;left:-45%;padding-bottom:.7em}.jw-skin-seven .jw-text-duration{color:#666f82}.jw-skin-seven .jw-controlbar-right-group .jw-icon-tooltip:before,.jw-skin-seven .jw-controlbar-right-group .jw-icon-inline:before{border-left:1px solid #666}.jw-skin-seven .jw-controlbar-right-group .jw-icon-inline:first-child:before{border:none}.jw-skin-seven .jw-dock .jw-dock-button{border-radius:50%;border:1px solid #333}.jw-skin-seven .jw-dock .jw-overlay{border-radius:2.5em}.jw-skin-seven .jw-icon-tooltip .jw-active-option{background-color:#ff0046;color:#fff}.jw-skin-seven .jw-icon-volume{min-width:2.6em}.jw-skin-seven .jw-time-tip,.jw-skin-seven .jw-menu,.jw-skin-seven .jw-volume-tip,.jw-skin-seven .jw-skip{border:1px solid #333}.jw-skin-seven .jw-time-tip{padding:.2em;bottom:1.3em}.jw-skin-seven .jw-menu,.jw-skin-seven .jw-volume-tip{bottom:.24em}.jw-skin-seven .jw-skip{padding:.4em;border-radius:1.75em}.jw-skin-seven .jw-skip .jw-text,.jw-skin-seven .jw-skip .jw-icon-inline{color:#fff;line-height:1.75em}.jw-skin-seven .jw-skip.jw-skippable:hover .jw-text,.jw-skin-seven .jw-skip.jw-skippable:hover .jw-icon-inline{color:#ff0046}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon:before,.jw-skin-seven.jw-flag-touch .jw-text-elapsed,.jw-skin-seven.jw-flag-touch .jw-text-duration{padding:0 .35em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-prev:before{padding:0 .125em 0 .7em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-next:before{padding:0 .7em 0 .125em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-playlist:before{padding:0 .225em}',""]);
},function(a,b){a.exports=function(){var a=[];return a.toString=function(){for(var a=[],b=0;b<this.length;b++){var c=this[b];c[2]?a.push("@media "+c[2]+"{"+c[1]+"}"):a.push(c[1])}return a.join("")},a.i=function(b,c){"string"==typeof b&&(b=[[null,b,""]]);for(var d={},e=0;e<this.length;e++){var f=this[e][0];"number"==typeof f&&(d[f]=!0)}for(e=0;e<b.length;e++){var g=b[e];"number"==typeof g[0]&&d[g[0]]||(c&&!g[2]?g[2]=c:c&&(g[2]="("+g[2]+") and ("+c+")"),a.push(g))}},a}},function(a,b){a.exports="data:application/font-woff;base64,d09GRgABAAAAABQ4AAsAAAAAE+wAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxID2WNtYXAAAAFoAAAAVAAAAFQaVsydZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAD3AAAA9wKJaoQ2hlYWQAABE0AAAANgAAADYIhqKNaGhlYQAAEWwAAAAkAAAAJAmCBdxobXR4AAARkAAAAGwAAABscmAHPWxvY2EAABH8AAAAOAAAADg2EDnwbWF4cAAAEjQAAAAgAAAAIAAiANFuYW1lAAASVAAAAcIAAAHCwZOZtHBvc3QAABQYAAAAIAAAACAAAwAAAAMEmQGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA5hYDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOYW//3//wAAAAAAIOYA//3//wAB/+MaBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAABABgAAAFoAOAADoAPwBEAEkAACUVIi4CNTQ2Ny4BNTQ+AjMyHgIVFAYHHgEVFA4CIxEyFhc+ATU0LgIjIg4CFRQWFz4BMxExARUhNSEXFSE1IRcVITUhAUAuUj0jCgoKCkZ6o11do3pGCgoKCiM9Ui4qSh4BAjpmiE1NiGY6AQIeSioCVQIL/fWWAXX+i0oBK/7VHh4jPVIuGS4VH0MiXaN6RkZ6o10iQx8VLhkuUj0jAcAdGQ0bDk2IZjo6ZohNDhsNGR3+XgNilZXglZXglZUAAAABAEAAAAPAA4AAIQAAExQeAjMyPgI1MxQOAiMiLgI1ND4CMxUiDgIVMYs6ZohNTYhmOktGeqNdXaN6RkZ6o11NiGY6AcBNiGY6OmaITV2jekZGeqNdXaN6Rks6ZohNAAAEAEAAAATAA4AADgAcACoAMQAAJS4BJyERIREuAScRIREhByMuAyc1HgMXMSsBLgMnNR4DFzErATUeARcxAn8DBQQCDPxGCysLBDz9v1NaCERrjE9irINTCLVbByc6Sio9a1I1CLaBL0YMQgsoCgLB/ukDCgIBSPzCQk6HaEIIWAhQgKdgKUg5JgdYBzRRZzx9C0QuAAAAAAUAQAAABMADgAAOABkAJwA1ADwAACUuASchESERLgEnESERIQE1IREhLgMnMQEjLgMnNR4DFzErAS4DJzUeAxcxKwE1HgEXMQKAAgYFAg38QAwqCgRA/cD+gANA/iAYRVlsPgEtWghFa4xPYq2DUgmzWgcnO0oqPGpSNgm6gDBEDEAMKAwCwP7tAggDAUb8wAHQ8P3APWdUQRf98E2IaEIHWghQgKhgKUg4JgdaCDVRZzt9DEMuAAAEAEAAAAXAA4AABAAJAGcAxQAANxEhESEBIREhEQU+ATc+ATMyFhceARceARceARcjLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3Mw4BBw4BBw4BBw4BIyImJy4BJy4BJy4BNTQ2Nz4BNzEhPgE3PgEzMhYXHgEXHgEXHgEXIy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNzMOAQcOAQcOAQcOASMiJicuAScuAScuATU0Njc+ATcxQAWA+oAFNvsUBOz8Iw4hExQsGBIhEA8cDQwUCAgLAlsBBQUECgYHDggIEAkQGgsLEgcHCgMDAwMDAwoHBxILCxoQFiEMDA8DWgIJBwgTDQwcERAkFBgsFBMhDg0VBwcHBwcHFQ0Bug0hFBMsGREhEBAcDAwVCAgKAloCBQQECwYGDggIEQgQGwsLEgcHCgMDAwMDAwoHBxILCxsQFSIMDA4DWwIJCAcUDAwdEBEkExksExQhDQ4UBwcICAcHFA4AA4D8gAM1/RYC6tcQGAgJCQUFBQ8KChgPDiETCQ4HBwwFBQgDAwIGBgYRCgoYDQ0cDg0aDQ0XCgoRBgYGDQ0OIhYUJBEQHAsLEgYGBgkICRcPDyQUFCwXGC0VFCQPEBgICQkFBQUPCgoYDw4hEwkOBwcMBQUIAwMCBgYGEQoKGA0NHA4NGg0NFwoKEQYGBg0NDiIWFCQREBwLCxIGBgYJCAkXDw8kFBQsFxgtFRQkDwAAAAADAEAAAAXAA4AAEABvAM4AACUhIiY1ETQ2MyEyFhURFAYjAT4BNz4BNz4BMzIWFx4BFx4BFx4BFzMuAScuAScuAScuASMiBgcOAQcOAQcOARUUFhceARceARceATMyNjc+ATc+ATc+ATcjDgEHDgEjIiYnLgEnLgEnLgE1NDY3OQEhPgE3PgE3PgEzMhYXHgEXHgEXHgEXMy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNz4BNz4BNyMOAQcOASMiJicuAScuAScuATU0Njc5AQUs+6g9V1c9BFg9V1c9/JoDCgcGEgsLGxAJEAgIDgYHCgQEBgFaAgoICBQNDBwQDyESGCwUEyEODRUHBwcHBwcVDQ4hExQrGRQkEBAdDAwUCAcJAloDDwwMIhUQGwsLEgYHCgMEAwMEAbkDCgcHEgsLGxAIEQgHDwYGCwQEBQFbAgoICBUMDBwQECERGSwTFCENDhQHBwgIBwcUDg0hFBMsGRMkERAdDAwUBwgJAlsDDgwNIRUQGwsLEgcHCgMDAwMDAFc+AlY+V1c+/ao+VwH0DRgKCxAGBgYCAwMIBQUMBwcOCRMhDg8YCgoOBgUFCQkIGBAPJBQVLRgXLBQUJA8PFwkICQYGBhILCxwQESQUFiIODQ0GBgYRCgoXDQ0aDg4bDQ0YCgsQBgYGAgMDCAUFDAcHDgkTIQ4PGAoKDgYFBQkJCBgQDyQUFS0YFywUFCQPDxcJCAkGBgYSCwscEBEkFBYiDg0NBgYGEQoKFw0NGg4OGw0AAAABAOAAoAMgAuAAFAAAARQOAiMiLgI1ND4CMzIeAhUDIC1OaTw8aU4tLU5pPDxpTi0BwDxpTi0tTmk8PGlOLS1OaTwAAAMAQAAQBEADkAADABAAHwAANwkBISUyNjU0JiMiBhUUFjMTNCYjIgYVERQWMzI2NRFAAgACAPwAAgAOFRUODhUVDiMVDg4VFQ4OFRADgPyAcBYQDxgWERAWAeYPGBYR/tcPGBYRASkAAgBAAAADwAOAAAcADwAANxEXNxcHFyEBIREnByc3J0CAsI2wgP5zAfMBjYCwjbCAAAGNgLCNsIADgP5zgLCNsIAAAAAFAEAAAAXAA4AABAAJABYAMwBPAAA3ESERIQEhESERATM1MxEjNSMVIxEzFSUeARceARceARUUBgcOAQcOAQcOASsBETMeARcxBxEzMjY3PgE3PgE3PgE1NCYnLgEnLgEnLgErAUAFgPqABTb7FATs/FS2YGC2ZGQCXBQeDg8UBwcJBgcHEwwMIRMTLBuwsBYqE6BHCRcJChIIBw0FBQUEAwINBwcTDAwgETcAA4D8gAM2/RcC6f7Arf5AwMABwK2dBxQODyIWFTAbGC4TFiIPDhgKCQcBwAIHB0P+5gQDAg0HBxcMDCETER0PDhgKCQ8EBQUABAA9AAAFwAOAABAAHQA7AFkAACUhIiY1ETQ2MyEyFhURFAYjASMVIzUjETM1MxUzEQUuAScuAScuASsBETMyNjc+ATc+ATc+ATUuASc5AQcOAQcOASsBETMyFhceARceARceARUUBgcOAQc5AQUq+6k+WFg+BFc+WFg+/bNgs2Rks2ABsAcXDA4fExMnFrCwGywTEx4PDBMHBwYCCAl3CBIKCRQMRzcTHgwMEwcHCwQDBAUFBQ0HAFg+AlQ+WFg+/aw+WAKdra3+QMDAAcB9FiIODxQHBwb+QAkHCRgPDiUTFiwYHTAW4ggNAgMEAR8EBQUPCgoYDw4fERMfDwwXBwAAAAABAEMABgOgA3oAjwAAExQiNScwJic0JicuAQcOARUcARUeARceATc+ATc+ATE2MhUwFAcUFhceARceATMyNjc+ATc+ATc+AzE2MhUwDgIVFBYXHgEXFjY3PgE3PgE3PgE3PgM3PAE1NCYnJgYHDgMxBiI1MDwCNTQmJyYGBw4BBw4DMQYiNTAmJy4BJyYGBw4BMRWQBgQIBAgCBQ4KBwkDFgcHIQ8QDwcHNgUEAwMHBQsJChcMBQ0FBwsHDBMICR8cFQUFAwQDCAUHFRERJBEMEwgJEgUOGQwGMjgvBAkHDBYEAz1IPAQFLyQRIhEQFgoGIiUcBQUEAgMYKCcmCgcsAboFBQwYDwUKBwUEAgMNBwcLBxRrDhENBwggDxOTCgqdMBM1EQwTCAcFBAIFCgcPIw4UQ0IxCgpTc3glEyMREBgIBwEKBxUKESUQJ00mE6/JrA8FBgIHDQMECAkGla2PCQk1VGYxNTsHAgUKChwQC2BqVQoKehYfTwUDRx8TkAMAAAAAAgBGAAAENgOAAAQACAAAJREzESMJAhEDxnBw/IADgPyAAAOA/IADgP5A/kADgAAAAgCAAAADgAOAAAQACQAAJREhESEBIREhEQKAAQD/AP4AAQD/AAADgPyAA4D8gAOAAAAAAAEAgAAABAADgAADAAAJAREBBAD8gAOAAcD+QAOA/kAAAgBKAAAEOgOAAAQACAAANxEjETMJAhG6cHADgPyAA4AAA4D8gAOA/kD+QAOAAAAAAQBDACADQwOgACkAAAEeARUUDgIjIi4CNTQ+AjM1DQE1Ig4CFRQeAjMyPgI1NCYnNwMNGhw8aYxPT4xoPT1ojE8BQP7APGlOLS1OaTw8aU4tFhNTAmMrYzVPjGg9PWiMT0+MaD2ArbOALU5pPDxpTi0tTmk8KUsfMAAAAAEAQABmAiADEwAGAAATETMlESUjQM0BE/7tzQEzARPN/VPNAAQAQAAABJADgAAXACsAOgBBAAAlJz4DNTQuAic3HgMVFA4CBzEvAT4BNTQmJzceAxUOAwcxJz4BNTQmJzceARUUBgcnBREzJRElIwPaKiY+KxcXKz4mKipDMBkZMEMqpCk5REQ5KSE0JBQBFCQzIcMiKCgiKiYwMCYq/c3NARP+7c0AIyheaXI8PHFpXikjK2ZyfEFBfHJmK4MjNZFUVJE1Ix5IUFgvL1lRRx2zFkgpK0YVIxxcNDVZHykDARPN/VPNAAACAEAAAAPDA4AABwAPAAABFyERFzcXBwEHJzcnIREnAypw/qlwl3mZ/iaWepZwAVdtAnNwAVdwlnqT/iOWepZw/qpsAAMAQAETBcACYAAMABkAJgAAARQGIyImNTQ2MzIWFSEUBiMiJjU0NjMyFhUhFAYjIiY1NDYzMhYVAY1iRUVhYUVFYgIWYUVFYmJFRWECHWFFRWJiRUVhAbpFYmJFRWFhRUViYkVFYWFFRWJiRUVhYUUAAAAAAQBmACYDmgNaACAAAAEXFhQHBiIvAQcGIicmND8BJyY0NzYyHwE3NjIXFhQPAQKj9yQkJGMd9vYkYx0kJPf3JCQkYx329iRjHSQk9wHA9iRjHSQk9/ckJCRjHfb2JGMdJCT39yQkJGMd9gAABgBEAAQDvAN8AAQACQAOABMAGAAdAAABIRUhNREhFSE1ESEVITUBMxUjNREzFSM1ETMVIzUBpwIV/esCFf3rAhX96/6dsrKysrKyA3xZWf6dWVn+nVlZAsaysv6dsrL+nbKyAAEAAAABGZqh06s/Xw889QALBAAAAAAA0dQiKwAAAADR1CIrAAAAAAXAA6AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABgAAAAAABcAAAQAAAAAAAAAAAAAAAAAAABsEAAAAAAAAAAAAAAACAAAABgAAYAQAAEAFAABABQAAQAYAAEAGAABABAAA4ASAAEAEAABABgAAQAYAAD0D4ABDBIAARgQAAIAEAACABIAASgOAAEMEwABABMAAQAQAAEAGAABABAAAZgQAAEQAAAAAAAoAFAAeAIgAuAEEAWAChgOyA9QECAQqBKQFJgXoBgAGGgYqBkIGgAaSBvQHFgdQB4YHuAABAAAAGwDPAAYAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADAAAAAEAAAAAAAIABwCNAAEAAAAAAAMADABFAAEAAAAAAAQADACiAAEAAAAAAAUACwAkAAEAAAAAAAYADABpAAEAAAAAAAoAGgDGAAMAAQQJAAEAGAAMAAMAAQQJAAIADgCUAAMAAQQJAAMAGABRAAMAAQQJAAQAGACuAAMAAQQJAAUAFgAvAAMAAQQJAAYAGAB1AAMAAQQJAAoANADganctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzVmVyc2lvbiAxLjEAVgBlAHIAcwBpAG8AbgAgADEALgAxanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQByanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="},function(a,b){a.exports="data:application/octet-stream;base64,AAEAAAALAIAAAwAwT1MvMg8SA9kAAAC8AAAAYGNtYXAaVsydAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZiiWqEMAAAF4AAAPcGhlYWQIhqKNAAAQ6AAAADZoaGVhCYIF3AAAESAAAAAkaG10eHJgBz0AABFEAAAAbGxvY2E2EDnwAAARsAAAADhtYXhwACIA0QAAEegAAAAgbmFtZcGTmbQAABIIAAABwnBvc3QAAwAAAAATzAAAACAAAwSZAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmFgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg5hb//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAEAGAAAAWgA4AAOgA/AEQASQAAJRUiLgI1NDY3LgE1ND4CMzIeAhUUBgceARUUDgIjETIWFz4BNTQuAiMiDgIVFBYXPgEzETEBFSE1IRcVITUhFxUhNSEBQC5SPSMKCgoKRnqjXV2jekYKCgoKIz1SLipKHgECOmaITU2IZjoBAh5KKgJVAgv99ZYBdf6LSgEr/tUeHiM9Ui4ZLhUfQyJdo3pGRnqjXSJDHxUuGS5SPSMBwB0ZDRsOTYhmOjpmiE0OGw0ZHf5eA2KVleCVleCVlQAAAAEAQAAAA8ADgAAhAAATFB4CMzI+AjUzFA4CIyIuAjU0PgIzFSIOAhUxizpmiE1NiGY6S0Z6o11do3pGRnqjXU2IZjoBwE2IZjo6ZohNXaN6RkZ6o11do3pGSzpmiE0AAAQAQAAABMADgAAOABwAKgAxAAAlLgEnIREhES4BJxEhESEHIy4DJzUeAxcxKwEuAyc1HgMXMSsBNR4BFzECfwMFBAIM/EYLKwsEPP2/U1oIRGuMT2Ksg1MItVsHJzpKKj1rUjUItoEvRgxCCygKAsH+6QMKAgFI/MJCTodoQghYCFCAp2ApSDkmB1gHNFFnPH0LRC4AAAAABQBAAAAEwAOAAA4AGQAnADUAPAAAJS4BJyERIREuAScRIREhATUhESEuAycxASMuAyc1HgMXMSsBLgMnNR4DFzErATUeARcxAoACBgUCDfxADCoKBED9wP6AA0D+IBhFWWw+AS1aCEVrjE9irYNSCbNaByc7Sio8alI2CbqAMEQMQAwoDALA/u0CCAMBRvzAAdDw/cA9Z1RBF/3wTYhoQgdaCFCAqGApSDgmB1oINVFnO30MQy4AAAQAQAAABcADgAAEAAkAZwDFAAA3ESERIQEhESERBT4BNz4BMzIWFx4BFx4BFx4BFyMuAScuAScuAScuASMiBgcOAQcOAQcOARUUFhceARceARceATMyNjc+ATczDgEHDgEHDgEHDgEjIiYnLgEnLgEnLgE1NDY3PgE3MSE+ATc+ATMyFhceARceARceARcjLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3Mw4BBw4BBw4BBw4BIyImJy4BJy4BJy4BNTQ2Nz4BNzFABYD6gAU2+xQE7PwjDiETFCwYEiEQDxwNDBQICAsCWwEFBQQKBgcOCAgQCRAaCwsSBwcKAwMDAwMDCgcHEgsLGhAWIQwMDwNaAgkHCBMNDBwRECQUGCwUEyEODRUHBwcHBwcVDQG6DSEUEywZESEQEBwMDBUICAoCWgIFBAQLBgYOCAgRCBAbCwsSBwcKAwMDAwMDCgcHEgsLGxAVIgwMDgNbAgkIBxQMDB0QESQTGSwTFCENDhQHBwgIBwcUDgADgPyAAzX9FgLq1xAYCAkJBQUFDwoKGA8OIRMJDgcHDAUFCAMDAgYGBhEKChgNDRwODRoNDRcKChEGBgYNDQ4iFhQkERAcCwsSBgYGCQgJFw8PJBQULBcYLRUUJA8QGAgJCQUFBQ8KChgPDiETCQ4HBwwFBQgDAwIGBgYRCgoYDQ0cDg0aDQ0XCgoRBgYGDQ0OIhYUJBEQHAsLEgYGBgkICRcPDyQUFCwXGC0VFCQPAAAAAAMAQAAABcADgAAQAG8AzgAAJSEiJjURNDYzITIWFREUBiMBPgE3PgE3PgEzMhYXHgEXHgEXHgEXMy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNz4BNz4BNyMOAQcOASMiJicuAScuAScuATU0Njc5ASE+ATc+ATc+ATMyFhceARceARceARczLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3PgE3PgE3Iw4BBw4BIyImJy4BJy4BJy4BNTQ2NzkBBSz7qD1XVz0EWD1XVz38mgMKBwYSCwsbEAkQCAgOBgcKBAQGAVoCCggIFA0MHBAPIRIYLBQTIQ4NFQcHBwcHBxUNDiETFCsZFCQQEB0MDBQIBwkCWgMPDAwiFRAbCwsSBgcKAwQDAwQBuQMKBwcSCwsbEAgRCAcPBgYLBAQFAVsCCggIFQwMHBAQIREZLBMUIQ0OFAcHCAgHBxQODSEUEywZEyQREB0MDBQHCAkCWwMODA0hFRAbCwsSBwcKAwMDAwMAVz4CVj5XVz79qj5XAfQNGAoLEAYGBgIDAwgFBQwHBw4JEyEODxgKCg4GBQUJCQgYEA8kFBUtGBcsFBQkDw8XCQgJBgYGEgsLHBARJBQWIg4NDQYGBhEKChcNDRoODhsNDRgKCxAGBgYCAwMIBQUMBwcOCRMhDg8YCgoOBgUFCQkIGBAPJBQVLRgXLBQUJA8PFwkICQYGBhILCxwQESQUFiIODQ0GBgYRCgoXDQ0aDg4bDQAAAAEA4ACgAyAC4AAUAAABFA4CIyIuAjU0PgIzMh4CFQMgLU5pPDxpTi0tTmk8PGlOLQHAPGlOLS1OaTw8aU4tLU5pPAAAAwBAABAEQAOQAAMAEAAfAAA3CQEhJTI2NTQmIyIGFRQWMxM0JiMiBhURFBYzMjY1EUACAAIA/AACAA4VFQ4OFRUOIxUODhUVDg4VEAOA/IBwFhAPGBYREBYB5g8YFhH+1w8YFhEBKQACAEAAAAPAA4AABwAPAAA3ERc3FwcXIQEhEScHJzcnQICwjbCA/nMB8wGNgLCNsIAAAY2AsI2wgAOA/nOAsI2wgAAAAAUAQAAABcADgAAEAAkAFgAzAE8AADcRIREhASERIREBMzUzESM1IxUjETMVJR4BFx4BFx4BFRQGBw4BBw4BBw4BKwERMx4BFzEHETMyNjc+ATc+ATc+ATU0JicuAScuAScuASsBQAWA+oAFNvsUBOz8VLZgYLZkZAJcFB4ODxQHBwkGBwcTDAwhExMsG7CwFioToEcJFwkKEggHDQUFBQQDAg0HBxMMDCARNwADgPyAAzb9FwLp/sCt/kDAwAHArZ0HFA4PIhYVMBsYLhMWIg8OGAoJBwHAAgcHQ/7mBAMCDQcHFwwMIRMRHQ8OGAoJDwQFBQAEAD0AAAXAA4AAEAAdADsAWQAAJSEiJjURNDYzITIWFREUBiMBIxUjNSMRMzUzFTMRBS4BJy4BJy4BKwERMzI2Nz4BNz4BNz4BNS4BJzkBBw4BBw4BKwERMzIWFx4BFx4BFx4BFRQGBw4BBzkBBSr7qT5YWD4EVz5YWD79s2CzZGSzYAGwBxcMDh8TEycWsLAbLBMTHg8MEwcHBgIICXcIEgoJFAxHNxMeDAwTBwcLBAMEBQUFDQcAWD4CVD5YWD79rD5YAp2trf5AwMABwH0WIg4PFAcHBv5ACQcJGA8OJRMWLBgdMBbiCA0CAwQBHwQFBQ8KChgPDh8REx8PDBcHAAAAAAEAQwAGA6ADegCPAAATFCI1JzAmJzQmJy4BBw4BFRwBFR4BFx4BNz4BNz4BMTYyFTAUBxQWFx4BFx4BMzI2Nz4BNz4BNz4DMTYyFTAOAhUUFhceARcWNjc+ATc+ATc+ATc+Azc8ATU0JicmBgcOAzEGIjUwPAI1NCYnJgYHDgEHDgMxBiI1MCYnLgEnJgYHDgExFZAGBAgECAIFDgoHCQMWBwchDxAPBwc2BQQDAwcFCwkKFwwFDQUHCwcMEwgJHxwVBQUDBAMIBQcVEREkEQwTCAkSBQ4ZDAYyOC8ECQcMFgQDPUg8BAUvJBEiERAWCgYiJRwFBQQCAxgoJyYKBywBugUFDBgPBQoHBQQCAw0HBwsHFGsOEQ0HCCAPE5MKCp0wEzURDBMIBwUEAgUKBw8jDhRDQjEKClNzeCUTIxEQGAgHAQoHFQoRJRAnTSYTr8msDwUGAgcNAwQICQaVrY8JCTVUZjE1OwcCBQoKHBALYGpVCgp6Fh9PBQNHHxOQAwAAAAACAEYAAAQ2A4AABAAIAAAlETMRIwkCEQPGcHD8gAOA/IAAA4D8gAOA/kD+QAOAAAACAIAAAAOAA4AABAAJAAAlESERIQEhESERAoABAP8A/gABAP8AAAOA/IADgPyAA4AAAAAAAQCAAAAEAAOAAAMAAAkBEQEEAPyAA4ABwP5AA4D+QAACAEoAAAQ6A4AABAAIAAA3ESMRMwkCEbpwcAOA/IADgAADgPyAA4D+QP5AA4AAAAABAEMAIANDA6AAKQAAAR4BFRQOAiMiLgI1ND4CMzUNATUiDgIVFB4CMzI+AjU0Jic3Aw0aHDxpjE9PjGg9PWiMTwFA/sA8aU4tLU5pPDxpTi0WE1MCYytjNU+MaD09aIxPT4xoPYCts4AtTmk8PGlOLS1OaTwpSx8wAAAAAQBAAGYCIAMTAAYAABMRMyURJSNAzQET/u3NATMBE839U80ABABAAAAEkAOAABcAKwA6AEEAACUnPgM1NC4CJzceAxUUDgIHMS8BPgE1NCYnNx4DFQ4DBzEnPgE1NCYnNx4BFRQGBycFETMlESUjA9oqJj4rFxcrPiYqKkMwGRkwQyqkKTlERDkpITQkFAEUJDMhwyIoKCIqJjAwJir9zc0BE/7tzQAjKF5pcjw8cWleKSMrZnJ8QUF8cmYrgyM1kVRUkTUjHkhQWC8vWVFHHbMWSCkrRhUjHFw0NVkfKQMBE839U80AAAIAQAAAA8MDgAAHAA8AAAEXIREXNxcHAQcnNychEScDKnD+qXCXeZn+JpZ6lnABV20Cc3ABV3CWepP+I5Z6lnD+qmwAAwBAARMFwAJgAAwAGQAmAAABFAYjIiY1NDYzMhYVIRQGIyImNTQ2MzIWFSEUBiMiJjU0NjMyFhUBjWJFRWFhRUViAhZhRUViYkVFYQIdYUVFYmJFRWEBukViYkVFYWFFRWJiRUVhYUVFYmJFRWFhRQAAAAABAGYAJgOaA1oAIAAAARcWFAcGIi8BBwYiJyY0PwEnJjQ3NjIfATc2MhcWFA8BAqP3JCQkYx329iRjHSQk9/ckJCRjHfb2JGMdJCT3AcD2JGMdJCT39yQkJGMd9vYkYx0kJPf3JCQkYx32AAAGAEQABAO8A3wABAAJAA4AEwAYAB0AAAEhFSE1ESEVITURIRUhNQEzFSM1ETMVIzURMxUjNQGnAhX96wIV/esCFf3r/p2ysrKysrIDfFlZ/p1ZWf6dWVkCxrKy/p2ysv6dsrIAAQAAAAEZmqHTqz9fDzz1AAsEAAAAAADR1CIrAAAAANHUIisAAAAABcADoAAAAAgAAgAAAAAAAAABAAADwP/AAAAGAAAAAAAFwAABAAAAAAAAAAAAAAAAAAAAGwQAAAAAAAAAAAAAAAIAAAAGAABgBAAAQAUAAEAFAABABgAAQAYAAEAEAADgBIAAQAQAAEAGAABABgAAPQPgAEMEgABGBAAAgAQAAIAEgABKA4AAQwTAAEAEwABABAAAQAYAAEAEAABmBAAARAAAAAAACgAUAB4AiAC4AQQBYAKGA7ID1AQIBCoEpAUmBegGAAYaBioGQgaABpIG9AcWB1AHhge4AAEAAAAbAM8ABgAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAMAAAAAQAAAAAAAgAHAI0AAQAAAAAAAwAMAEUAAQAAAAAABAAMAKIAAQAAAAAABQALACQAAQAAAAAABgAMAGkAAQAAAAAACgAaAMYAAwABBAkAAQAYAAwAAwABBAkAAgAOAJQAAwABBAkAAwAYAFEAAwABBAkABAAYAK4AAwABBAkABQAWAC8AAwABBAkABgAYAHUAAwABBAkACgA0AOBqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNWZXJzaW9uIDEuMQBWAGUAcgBzAGkAbwBuACAAMQAuADFqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNSZWd1bGFyAFIAZQBnAHUAbABhAHJqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNGb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},function(a,b,c){function d(a,b){for(var c=0;c<a.length;c++){var d=a[c],e=l[d.id];if(e){e.refs++;for(var f=0;f<e.parts.length;f++)e.parts[f](d.parts[f]);for(;f<d.parts.length;f++)e.parts.push(h(d.parts[f],b))}else{for(var g=[],f=0;f<d.parts.length;f++)g.push(h(d.parts[f],b));l[d.id]={id:d.id,refs:1,parts:g}}}}function e(a){for(var b=[],c={},d=0;d<a.length;d++){var e=a[d],f=e[0],g=e[1],h=e[2],i=e[3],j={css:g,media:h,sourceMap:i};c[f]?c[f].parts.push(j):b.push(c[f]={id:f,parts:[j]})}return b}function f(){var a=document.createElement("style"),b=o();return a.type="text/css",b.appendChild(a),a}function g(){var a=document.createElement("link"),b=o();return a.rel="stylesheet",b.appendChild(a),a}function h(a,b){var c,d,e;if(b.singleton){var h=q++;c=p||(p=f()),d=i.bind(null,c,h,!1),e=i.bind(null,c,h,!0)}else a.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(c=g(),d=k.bind(null,c),e=function(){c.parentNode.removeChild(c),c.href&&URL.revokeObjectURL(c.href)}):(c=f(),d=j.bind(null,c),e=function(){c.parentNode.removeChild(c)});return d(a),function(b){if(b){if(b.css===a.css&&b.media===a.media&&b.sourceMap===a.sourceMap)return;d(a=b)}else e()}}function i(a,b,c,d){var e=c?"":d.css;if(a.styleSheet)a.styleSheet.cssText=r(b,e);else{var f=document.createTextNode(e),g=a.childNodes;g[b]&&a.removeChild(g[b]),g.length?a.insertBefore(f,g[b]):a.appendChild(f)}}function j(a,b){var c=b.css,d=b.media;b.sourceMap;if(d&&a.setAttribute("media",d),a.styleSheet)a.styleSheet.cssText=c;else{for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(c))}}function k(a,b){var c=b.css,d=(b.media,b.sourceMap);d&&(c+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(d))))+" */");var e=new Blob([c],{type:"text/css"}),f=a.href;a.href=URL.createObjectURL(e),f&&URL.revokeObjectURL(f)}var l={},m=function(a){var b;return function(){return"undefined"==typeof b&&(b=a.apply(this,arguments)),b}},n=m(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),o=m(function(){return document.head||document.getElementsByTagName("head")[0]}),p=null,q=0;a.exports=function(a,b){b=b||{},"undefined"==typeof b.singleton&&(b.singleton=n());var c=e(a);return d(c,b),function(a){for(var f=[],g=0;g<c.length;g++){var h=c[g],i=l[h.id];i.refs--,f.push(i)}if(a){var j=e(a);d(j,b)}for(var g=0;g<f.length;g++){var i=f[g];if(0===i.refs){for(var k=0;k<i.parts.length;k++)i.parts[k]();delete l[i.id]}}}};var r=function(){var a=[];return function(b,c){return a[b]=c,a.filter(Boolean).join("\n")}}()},function(a,b,c){var d,e;d=[c(42),c(45),c(59),c(48),c(89),c(51),c(127),c(95),c(101),c(96),c(83),c(46),c(62),c(114),c(70),c(162),c(67),c(98)],e=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s={};return s.api=a,s._=b,s.version=c,s.utils=b.extend(d,f,{canCast:p.available,key:h,extend:b.extend,scriptloader:i,rssparser:q,tea:j,UI:g}),s.utils.css.style=s.utils.style,s.vid=k,s.events=b.extend({},l,{state:m}),s.playlist=b.extend({},n,{item:o}),s.plugins=r,s.cast=p,s}.apply(b,d),!(void 0!==e&&(a.exports=e))}])});// Version: 3.7.8
/* =-====================================================================-= */
/* =-====================================================================-= */
/* =-=========================     JSON     =============================-= */
/* =-====================================================================-= */
/* =-====================================================================-= */

(window['JSON'] && window['JSON']['stringify']) || (function () {
    window['JSON'] || (window['JSON'] = {});

    function toJSON(key) {
        try      { return this.valueOf() }
        catch(e) { return null }
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }

    function str(key, holder) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            partial,
            mind  = gap,
            value = holder[key];

        if (value && typeof value === 'object') {
            value = toJSON.call( value, key );
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':
            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':
            return String(value);

        case 'object':

            if (!value) {
                return 'null';
            }

            gap += indent;
            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSON['stringify'] !== 'function') {
        JSON['stringify'] = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }

    if (typeof JSON['parse'] !== 'function') {
        // JSON is parsed on the server for security.
        JSON['parse'] = function (text) {return eval('('+text+')')};
    }
}());
var NOW             = 1
,   READY           = false
,   READY_BUFFER    = []
,   PRESENCE_SUFFIX = '-pnpres'
,   DEF_WINDOWING   = 10     // MILLISECONDS.
,   DEF_TIMEOUT     = 10000  // MILLISECONDS.
,   DEF_SUB_TIMEOUT = 310    // SECONDS.
,   DEF_KEEPALIVE   = 60     // SECONDS (FOR TIMESYNC).
,   SECOND          = 1000   // A THOUSAND MILLISECONDS.
,   URLBIT          = '/'
,   PARAMSBIT       = '&'
,   PRESENCE_HB_THRESHOLD = 5
,   PRESENCE_HB_DEFAULT  = 30
,   SDK_VER         = '3.7.8'
,   REPL            = /{([\w\-]+)}/g;

/**
 * UTILITIES
 */
function unique() { return'x'+ ++NOW+''+(+new Date) }
function rnow()   { return+new Date }

/**
 * NEXTORIGIN
 * ==========
 * var next_origin = nextorigin();
 */
var nextorigin = (function() {
    var max = 20
    ,   ori = Math.floor(Math.random() * max);
    return function( origin, failover ) {
        return origin.indexOf('pubsub.') > 0
            && origin.replace(
             'pubsub', 'ps' + (
                failover ? uuid().split('-')[0] :
                (++ori < max? ori : ori=1)
            ) ) || origin;
    }
})();


/**
 * Build Url
 * =======
 *
 */
function build_url( url_components, url_params ) {
    var url    = url_components.join(URLBIT)
    ,   params = [];

    if (!url_params) return url;

    each( url_params, function( key, value ) {
        var value_str = (typeof value == 'object')?JSON['stringify'](value):value;
        (typeof value != 'undefined' &&
            value != null && encode(value_str).length > 0
        ) && params.push(key + "=" + encode(value_str));
    } );

    url += "?" + params.join(PARAMSBIT);
    return url;
}

/**
 * UPDATER
 * =======
 * var timestamp = unique();
 */
function updater( fun, rate ) {
    var timeout
    ,   last   = 0
    ,   runnit = function() {
        if (last + rate > rnow()) {
            clearTimeout(timeout);
            timeout = setTimeout( runnit, rate );
        }
        else {
            last = rnow();
            fun();
        }
    };

    return runnit;
}

/**
 * GREP
 * ====
 * var list = grep( [1,2,3], function(item) { return item % 2 } )
 */
function grep( list, fun ) {
    var fin = [];
    each( list || [], function(l) { fun(l) && fin.push(l) } );
    return fin
}

/**
 * SUPPLANT
 * ========
 * var text = supplant( 'Hello {name}!', { name : 'John' } )
 */
function supplant( str, values ) {
    return str.replace( REPL, function( _, match ) {
        return values[match] || _
    } );
}

/**
 * timeout
 * =======
 * timeout( function(){}, 100 );
 */
function timeout( fun, wait ) {
    return setTimeout( fun, wait );
}

/**
 * uuid
 * ====
 * var my_uuid = uuid();
 */
function uuid(callback) {
    var u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    if (callback) callback(u);
    return u;
}

function isArray(arg) {
  return !!arg && typeof arg !== 'string' && (Array.isArray && Array.isArray(arg) || typeof(arg.length) === "number")
  //return !!arg && (Array.isArray && Array.isArray(arg) || typeof(arg.length) === "number")
}

/**
 * EACH
 * ====
 * each( [1,2,3], function(item) { } )
 */
function each( o, f) {
    if ( !o || !f ) return;

    if ( isArray(o) )
        for ( var i = 0, l = o.length; i < l; )
            f.call( o[i], o[i], i++ );
    else
        for ( var i in o )
            o.hasOwnProperty    &&
            o.hasOwnProperty(i) &&
            f.call( o[i], i, o[i] );
}

/**
 * MAP
 * ===
 * var list = map( [1,2,3], function(item) { return item + 1 } )
 */
function map( list, fun ) {
    var fin = [];
    each( list || [], function( k, v ) { fin.push(fun( k, v )) } );
    return fin;
}

/**
 * ENCODE
 * ======
 * var encoded_data = encode('path');
 */
function encode(path) { return encodeURIComponent(path) }

/**
 * Generate Subscription Channel List
 * ==================================
 * generate_channel_list(channels_object);
 */
function generate_channel_list(channels, nopresence) {
    var list = [];
    each( channels, function( channel, status ) {
        if (nopresence) {
            if(channel.search('-pnpres') < 0) {
                if (status.subscribed) list.push(channel);
            }
        } else {
            if (status.subscribed) list.push(channel);
        }
    });
    return list.sort();
}

/**
 * Generate Subscription Channel Groups List
 * ==================================
 * generate_channel_group_list(channels_groups object);
 */
function generate_channel_group_list(channel_groups, nopresence) {
    var list = [];
    each(channel_groups, function( channel_group, status ) {
        if (nopresence) {
            if(channel_group.search('-pnpres') < 0) {
                if (status.subscribed) list.push(channel_group);
            }
        } else {
            if (status.subscribed) list.push(channel_group);
        }
    });
    return list.sort();
}

// PUBNUB READY TO CONNECT
function ready() { timeout( function() {
    if (READY) return;
    READY = 1;
    each( READY_BUFFER, function(connect) { connect() } );
}, SECOND ); }

function PNmessage(args) {
    msg = args || {'apns' : {}},
    msg['getPubnubMessage'] = function() {
        var m = {};

        if (Object.keys(msg['apns']).length) {
            m['pn_apns'] = {
                    'aps' : {
                        'alert' : msg['apns']['alert'] ,
                        'badge' : msg['apns']['badge']
                    }
            }
            for (var k in msg['apns']) {
                m['pn_apns'][k] = msg['apns'][k];
            }
            var exclude1 = ['badge','alert'];
            for (var k in exclude1) {
                delete m['pn_apns'][exclude1[k]];
            }
        }



        if (msg['gcm']) {
            m['pn_gcm'] = {
                'data' : msg['gcm']
            }
        }

        for (var k in msg) {
            m[k] = msg[k];
        }
        var exclude = ['apns','gcm','publish', 'channel','callback','error'];
        for (var k in exclude) {
            delete m[exclude[k]];
        }

        return m;
    };
    msg['publish'] = function() {

        var m = msg.getPubnubMessage();

        if (msg['pubnub'] && msg['channel']) {
            msg['pubnub'].publish({
                'message' : m,
                'channel' : msg['channel'],
                'callback' : msg['callback'],
                'error' : msg['error']
            })
        }
    };
    return msg;
}

function PN_API(setup) {
    var SUB_WINDOWING =  +setup['windowing']   || DEF_WINDOWING
    ,   SUB_TIMEOUT   = (+setup['timeout']     || DEF_SUB_TIMEOUT) * SECOND
    ,   KEEPALIVE     = (+setup['keepalive']   || DEF_KEEPALIVE)   * SECOND
    ,   TIME_CHECK    = setup['timecheck']     || 0
    ,   NOLEAVE       = setup['noleave']       || 0
    ,   PUBLISH_KEY   = setup['publish_key']   || 'demo'
    ,   SUBSCRIBE_KEY = setup['subscribe_key'] || 'demo'
    ,   AUTH_KEY      = setup['auth_key']      || ''
    ,   SECRET_KEY    = setup['secret_key']    || ''
    ,   hmac_SHA256   = setup['hmac_SHA256']
    ,   SSL           = setup['ssl']            ? 's' : ''
    ,   ORIGIN        = 'http'+SSL+'://'+(setup['origin']||'pubsub.pubnub.com')
    ,   STD_ORIGIN    = nextorigin(ORIGIN)
    ,   SUB_ORIGIN    = nextorigin(ORIGIN)
    ,   CONNECT       = function(){}
    ,   PUB_QUEUE     = []
    ,   CLOAK         = true
    ,   TIME_DRIFT    = 0
    ,   SUB_CALLBACK  = 0
    ,   SUB_CHANNEL   = 0
    ,   SUB_RECEIVER  = 0
    ,   SUB_RESTORE   = setup['restore'] || 0
    ,   SUB_BUFF_WAIT = 0
    ,   TIMETOKEN     = 0
    ,   RESUMED       = false
    ,   CHANNELS      = {}
    ,   CHANNEL_GROUPS       = {}
    ,   STATE         = {}
    ,   PRESENCE_HB_TIMEOUT  = null
    ,   PRESENCE_HB          = validate_presence_heartbeat(
        setup['heartbeat'] || setup['pnexpires'] || 0, setup['error']
    )
    ,   PRESENCE_HB_INTERVAL = setup['heartbeat_interval'] || PRESENCE_HB - 3
    ,   PRESENCE_HB_RUNNING  = false
    ,   NO_WAIT_FOR_PENDING  = setup['no_wait_for_pending']
    ,   COMPATIBLE_35 = setup['compatible_3.5']  || false
    ,   xdr           = setup['xdr']
    ,   params        = setup['params'] || {}
    ,   error         = setup['error']      || function() {}
    ,   _is_online    = setup['_is_online'] || function() { return 1 }
    ,   jsonp_cb      = setup['jsonp_cb']   || function() { return 0 }
    ,   db            = setup['db']         || {'get': function(){}, 'set': function(){}}
    ,   CIPHER_KEY    = setup['cipher_key']
    ,   UUID          = setup['uuid'] || ( !setup['unique_uuid'] && db && db['get'](SUBSCRIBE_KEY+'uuid') || '')
    ,   _poll_timer
    ,   _poll_timer2;

    var crypto_obj    = setup['crypto_obj'] ||
        {
            'encrypt' : function(a,key){ return a},
            'decrypt' : function(b,key){return b}
        };

    function _get_url_params(data) {
        if (!data) data = {};
        each( params , function( key, value ) {
            if (!(key in data)) data[key] = value;
        });
        return data;
    }

    function _object_to_key_list(o) {
        var l = []
        each( o , function( key, value ) {
            l.push(key);
        });
        return l;
    }
    function _object_to_key_list_sorted(o) {
        return _object_to_key_list(o).sort();
    }

    function _get_pam_sign_input_from_params(params) {
        var si = "";
        var l = _object_to_key_list_sorted(params);

        for (var i in l) {
            var k = l[i]
            si += k + "=" + encode(params[k]) ;
            if (i != l.length - 1) si += "&"
        }
        return si;
    }

    function validate_presence_heartbeat(heartbeat, cur_heartbeat, error) {
        var err = false;

        if (typeof heartbeat === 'number') {
            if (heartbeat > PRESENCE_HB_THRESHOLD || heartbeat == 0)
                err = false;
            else
                err = true;
        } else if(typeof heartbeat === 'boolean'){
            if (!heartbeat) {
                return 0;
            } else {
                return PRESENCE_HB_DEFAULT;
            }
        } else {
            err = true;
        }

        if (err) {
            error && error("Presence Heartbeat value invalid. Valid range ( x > " + PRESENCE_HB_THRESHOLD + " or x = 0). Current Value : " + (cur_heartbeat || PRESENCE_HB_THRESHOLD));
            return cur_heartbeat || PRESENCE_HB_THRESHOLD;
        } else return heartbeat;
    }

    function encrypt(input, key) {
        return crypto_obj['encrypt'](input, key || CIPHER_KEY) || input;
    }
    function decrypt(input, key) {
        return crypto_obj['decrypt'](input, key || CIPHER_KEY) ||
               crypto_obj['decrypt'](input, CIPHER_KEY) ||
               input;
    }

    function error_common(message, callback) {
        callback && callback({ 'error' : message || "error occurred"});
        error && error(message);
    }
    function _presence_heartbeat() {

        clearTimeout(PRESENCE_HB_TIMEOUT);

        if (!PRESENCE_HB_INTERVAL || PRESENCE_HB_INTERVAL >= 500 ||
            PRESENCE_HB_INTERVAL < 1 ||
            (!generate_channel_list(CHANNELS,true).length  && !generate_channel_group_list(CHANNEL_GROUPS, true).length ) )
        {
            PRESENCE_HB_RUNNING = false;
            return;
        }

        PRESENCE_HB_RUNNING = true;
        SELF['presence_heartbeat']({
            'callback' : function(r) {
                PRESENCE_HB_TIMEOUT = timeout( _presence_heartbeat, (PRESENCE_HB_INTERVAL) * SECOND );
            },
            'error' : function(e) {
                error && error("Presence Heartbeat unable to reach Pubnub servers." + JSON.stringify(e));
                PRESENCE_HB_TIMEOUT = timeout( _presence_heartbeat, (PRESENCE_HB_INTERVAL) * SECOND );
            }
        });
    }

    function start_presence_heartbeat() {
        !PRESENCE_HB_RUNNING && _presence_heartbeat();
    }

    function publish(next) {

        if (NO_WAIT_FOR_PENDING) {
            if (!PUB_QUEUE.length) return;
        } else {
            if (next) PUB_QUEUE.sending = 0;
            if ( PUB_QUEUE.sending || !PUB_QUEUE.length ) return;
            PUB_QUEUE.sending = 1;
        }

        xdr(PUB_QUEUE.shift());
    }
    function each_channel_group(callback) {
        var count = 0;

        each( generate_channel_group_list(CHANNEL_GROUPS), function(channel_group) {
            var chang = CHANNEL_GROUPS[channel_group];

            if (!chang) return;

            count++;
            (callback||function(){})(chang);
        } );

        return count;
    }

    function each_channel(callback) {
        var count = 0;

        each( generate_channel_list(CHANNELS), function(channel) {
            var chan = CHANNELS[channel];

            if (!chan) return;

            count++;
            (callback||function(){})(chan);
        } );

        return count;
    }
    function _invoke_callback(response, callback, err) {
        if (typeof response == 'object') {
            if (response['error']) {
                var callback_data = {};

                if (response['message']) {
                    callback_data['message'] = response['message'];
                }

                if (response['payload']) {
                    callback_data['payload'] = response['payload'];
                }

                err && err(callback_data);
                return;

            }
            if (response['payload']) {
                if (response['next_page'])
                    callback && callback(response['payload'], response['next_page']);
                else
                    callback && callback(response['payload']);
                return;
            }
        }
        callback && callback(response);
    }

    function _invoke_error(response,err) {

        if (typeof response == 'object' && response['error']) {
                var callback_data = {};

                if (response['message']) {
                    callback_data['message'] = response['message'];
                }

                if (response['payload']) {
                    callback_data['payload'] = response['payload'];
                }
                
                err && err(callback_data);
                return;
        } else {
            err && err(response);
        }
    }
    function CR(args, callback, url1, data) {
            var callback        = args['callback']      || callback
            ,   err             = args['error']         || error
            ,   jsonp           = jsonp_cb();

            data = data || {};
            
            if (!data['auth']) {
                data['auth'] = args['auth_key'] || AUTH_KEY;
            }
            
            var url = [
                    STD_ORIGIN, 'v1', 'channel-registration',
                    'sub-key', SUBSCRIBE_KEY
                ];

            url.push.apply(url,url1);
            
            if (jsonp) data['callback']              = jsonp;
            
            xdr({
                callback : jsonp,
                data     : _get_url_params(data),
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : url
            });

    }

    // Announce Leave Event
    var SELF = {
        'LEAVE' : function( channel, blocking, auth_key, callback, error ) {

            var data   = { 'uuid' : UUID, 'auth' : auth_key || AUTH_KEY }
            ,   origin = nextorigin(ORIGIN)
            ,   callback = callback || function(){}
            ,   err      = error    || function(){}
            ,   jsonp  = jsonp_cb();

            // Prevent Leaving a Presence Channel
            if (channel.indexOf(PRESENCE_SUFFIX) > 0) return true;

            if (COMPATIBLE_35) {
                if (!SSL)         return false;
                if (jsonp == '0') return false;
            }

            if (NOLEAVE)  return false;

            if (jsonp != '0') data['callback'] = jsonp;

            xdr({
                blocking : blocking || SSL,
                timeout  : 2000,
                callback : jsonp,
                data     : _get_url_params(data),
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : [
                    origin, 'v2', 'presence', 'sub_key',
                    SUBSCRIBE_KEY, 'channel', encode(channel), 'leave'
                ]
            });
            return true;
        },
        'LEAVE_GROUP' : function( channel_group, blocking, auth_key, callback, error ) {

            var data   = { 'uuid' : UUID, 'auth' : auth_key || AUTH_KEY }
            ,   origin = nextorigin(ORIGIN)
            ,   callback = callback || function(){}
            ,   err      = error    || function(){}
            ,   jsonp  = jsonp_cb();

            // Prevent Leaving a Presence Channel Group
            if (channel_group.indexOf(PRESENCE_SUFFIX) > 0) return true;

            if (COMPATIBLE_35) {
                if (!SSL)         return false;
                if (jsonp == '0') return false;
            }

            if (NOLEAVE)  return false;

            if (jsonp != '0') data['callback'] = jsonp;

            if (channel_group && channel_group.length > 0) data['channel-group'] = channel_group;

            xdr({
                blocking : blocking || SSL,
                timeout  : 5000,
                callback : jsonp,
                data     : _get_url_params(data),
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : [
                    origin, 'v2', 'presence', 'sub_key',
                    SUBSCRIBE_KEY, 'channel', encode(','), 'leave'
                ]
            });
            return true;
        },
        'set_resumed' : function(resumed) {
                RESUMED = resumed;
        },
        'get_cipher_key' : function() {
            return CIPHER_KEY;
        },
        'set_cipher_key' : function(key) {
            CIPHER_KEY = key;
        },
        'raw_encrypt' : function(input, key) {
            return encrypt(input, key);
        },
        'raw_decrypt' : function(input, key) {
            return decrypt(input, key);
        },
        'get_heartbeat' : function() {
            return PRESENCE_HB;
        },
        'set_heartbeat' : function(heartbeat) {
            PRESENCE_HB = validate_presence_heartbeat(heartbeat, PRESENCE_HB_INTERVAL, error);
            PRESENCE_HB_INTERVAL = (PRESENCE_HB - 3 >= 1)?PRESENCE_HB - 3:1;
            CONNECT();
            _presence_heartbeat();
        },
        'get_heartbeat_interval' : function() {
            return PRESENCE_HB_INTERVAL;
        },
        'set_heartbeat_interval' : function(heartbeat_interval) {
            PRESENCE_HB_INTERVAL = heartbeat_interval;
            _presence_heartbeat();
        },
        'get_version' : function() {
            return SDK_VER;
        },
        'getGcmMessageObject' : function(obj) {
            return {
                'data' : obj
            }
        },
        'getApnsMessageObject' : function(obj) {
            var x =  {
                'aps' : { 'badge' : 1, 'alert' : ''}
            }
            for (k in obj) {
                k[x] = obj[k];
            }
            return x;
        },
        'newPnMessage' : function() {
            var x = {};
            if (gcm) x['pn_gcm'] = gcm;
            if (apns) x['pn_apns'] = apns;
            for ( k in n ) {
                x[k] = n[k];
            }
            return x;
        },

        '_add_param' : function(key,val) {
            params[key] = val;
        },

        'channel_group' : function(args, callback) {
            var ns_ch       = args['channel_group']
            ,   channels    = args['channels'] || args['channel']
            ,   cloak       = args['cloak']
            ,   namespace
            ,   channel_group
            ,   url = []
            ,   data = {}
            ,   mode = args['mode'] || 'add';


            if (ns_ch) {
                var ns_ch_a = ns_ch.split(':');

                if (ns_ch_a.length > 1) {
                    namespace = (ns_ch_a[0] === '*')?null:ns_ch_a[0];

                    channel_group = ns_ch_a[1];
                } else {
                    channel_group = ns_ch_a[0];
                }
            }

            namespace && url.push('namespace') && url.push(encode(namespace));

            url.push('channel-group');

            if (channel_group && channel_group !== '*') {
                url.push(channel_group);
            }

            if (channels ) {
                if (isArray(channels)) {
                    channels = channels.join(',');
                }
                data[mode] = channels;
                data['cloak'] = (CLOAK)?'true':'false';
            } else {
                if (mode === 'remove') url.push('remove');
            }

            if (typeof cloak != 'undefined') data['cloak'] = (cloak)?'true':'false';

            CR(args, callback, url, data);
        },

        'channel_group_list_groups' : function(args, callback) {
            var namespace;

            namespace = args['namespace'] || args['ns'] || args['channel_group'] || null;
            if (namespace) {
                args["channel_group"] = namespace + ":*";
            }

            SELF['channel_group'](args, callback);
        },

        'channel_group_list_channels' : function(args, callback) {
            if (!args['channel_group']) return error('Missing Channel Group');
            SELF['channel_group'](args, callback);
        },

        'channel_group_remove_channel' : function(args, callback) {
            if (!args['channel_group']) return error('Missing Channel Group');
            if (!args['channel'] && !args['channels'] ) return error('Missing Channel');

            args['mode'] = 'remove';
            SELF['channel_group'](args,callback);
        },

        'channel_group_remove_group' : function(args, callback) {
            if (!args['channel_group']) return error('Missing Channel Group');
            if (args['channel']) return error('Use channel_group_remove_channel if you want to remove a channel from a group.');

            args['mode'] = 'remove';
            SELF['channel_group'](args,callback);
        },

        'channel_group_add_channel' : function(args, callback) {
           if (!args['channel_group']) return error('Missing Channel Group');
           if (!args['channel'] && !args['channels'] ) return error('Missing Channel');
            SELF['channel_group'](args,callback);
        },

        'channel_group_cloak' : function(args, callback) {
            if (typeof args['cloak'] == 'undefined') {
                callback(CLOAK);
                return;
            }
            CLOAK = args['cloak'];
            SELF['channel_group'](args,callback);
        },

        'channel_group_list_namespaces' : function(args, callback) {
            var url = ['namespace'];
            CR(args, callback, url);
        },
        'channel_group_remove_namespace' : function(args, callback) {
            var url = ['namespace',args['namespace'],'remove'];
            CR(args, callback, url);
        },

        /*
            PUBNUB.history({
                channel  : 'my_chat_channel',
                limit    : 100,
                callback : function(history) { }
            });
        */
        'history' : function( args, callback ) {
            var callback         = args['callback'] || callback
            ,   count            = args['count']    || args['limit'] || 100
            ,   reverse          = args['reverse']  || "false"
            ,   err              = args['error']    || function(){}
            ,   auth_key         = args['auth_key'] || AUTH_KEY
            ,   cipher_key       = args['cipher_key']
            ,   channel          = args['channel']
            ,   channel_group    = args['channel_group']
            ,   start            = args['start']
            ,   end              = args['end']
            ,   include_token    = args['include_token']
            ,   params           = {}
            ,   jsonp            = jsonp_cb();

            // Make sure we have a Channel
            if (!channel && !channel_group) return error('Missing Channel');
            if (!callback)      return error('Missing Callback');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');

            params['stringtoken'] = 'true';
            params['count']       = count;
            params['reverse']     = reverse;
            params['auth']        = auth_key;

            if (channel_group) {
                params['channel-group'] = channel_group;
                if (!channel) {
                    channel = ','; 
                }
            }
            if (jsonp) params['callback']              = jsonp;
            if (start) params['start']                 = start;
            if (end)   params['end']                   = end;
            if (include_token) params['include_token'] = 'true';

            // Send Message
            xdr({
                callback : jsonp,
                data     : _get_url_params(params),
                success  : function(response) {
                    if (typeof response == 'object' && response['error']) {
                        err({'message' : response['message'], 'payload' : response['payload']});
                        return;
                    }
                    var messages = response[0];
                    var decrypted_messages = [];
                    for (var a = 0; a < messages.length; a++) {
                        var new_message = decrypt(messages[a],cipher_key);
                        try {
                            decrypted_messages['push'](JSON['parse'](new_message));
                        } catch (e) {
                            decrypted_messages['push']((new_message));
                        }
                    }
                    callback([decrypted_messages, response[1], response[2]]);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : [
                    STD_ORIGIN, 'v2', 'history', 'sub-key',
                    SUBSCRIBE_KEY, 'channel', encode(channel)
                ]
            });
        },

        /*
            PUBNUB.replay({
                source      : 'my_channel',
                destination : 'new_channel'
            });
        */
        'replay' : function(args, callback) {
            var callback    = callback || args['callback'] || function(){}
            ,   auth_key    = args['auth_key'] || AUTH_KEY
            ,   source      = args['source']
            ,   destination = args['destination']
            ,   stop        = args['stop']
            ,   start       = args['start']
            ,   end         = args['end']
            ,   reverse     = args['reverse']
            ,   limit       = args['limit']
            ,   jsonp       = jsonp_cb()
            ,   data        = {}
            ,   url;

            // Check User Input
            if (!source)        return error('Missing Source Channel');
            if (!destination)   return error('Missing Destination Channel');
            if (!PUBLISH_KEY)   return error('Missing Publish Key');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');

            // Setup URL Params
            if (jsonp != '0') data['callback'] = jsonp;
            if (stop)         data['stop']     = 'all';
            if (reverse)      data['reverse']  = 'true';
            if (start)        data['start']    = start;
            if (end)          data['end']      = end;
            if (limit)        data['count']    = limit;

            data['auth'] = auth_key;

            // Compose URL Parts
            url = [
                STD_ORIGIN, 'v1', 'replay',
                PUBLISH_KEY, SUBSCRIBE_KEY,
                source, destination
            ];

            // Start (or Stop) Replay!
            xdr({
                callback : jsonp,
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function() { callback([ 0, 'Disconnected' ]) },
                url      : url,
                data     : _get_url_params(data)
            });
        },

        /*
            PUBNUB.auth('AJFLKAJSDKLA');
        */
        'auth' : function(auth) {
            AUTH_KEY = auth;
            CONNECT();
        },

        /*
            PUBNUB.time(function(time){ });
        */
        'time' : function(callback) {
            var jsonp = jsonp_cb();
            xdr({
                callback : jsonp,
                data     : _get_url_params({ 'uuid' : UUID, 'auth' : AUTH_KEY }),
                timeout  : SECOND * 5,
                url      : [STD_ORIGIN, 'time', jsonp],
                success  : function(response) { callback(response[0]) },
                fail     : function() { callback(0) }
            });
        },

        /*
            PUBNUB.publish({
                channel : 'my_chat_channel',
                message : 'hello!'
            });
        */
        'publish' : function( args, callback ) {
            var msg      = args['message'];
            if (!msg) return error('Missing Message');

            var callback = callback || args['callback'] || msg['callback'] || function(){}
            ,   channel  = args['channel'] || msg['channel']
            ,   auth_key = args['auth_key'] || AUTH_KEY
            ,   cipher_key = args['cipher_key']
            ,   err      = args['error'] || msg['error'] || function() {}
            ,   post     = args['post'] || false
            ,   store    = ('store_in_history' in args) ? args['store_in_history']: true
            ,   jsonp    = jsonp_cb()
            ,   add_msg  = 'push'
            ,   url;

            if (args['prepend']) add_msg = 'unshift'

            if (!channel)       return error('Missing Channel');
            if (!PUBLISH_KEY)   return error('Missing Publish Key');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');

            if (msg['getPubnubMessage']) {
                msg = msg['getPubnubMessage']();
            }

            // If trying to send Object
            msg = JSON['stringify'](encrypt(msg, cipher_key));

            // Create URL
            url = [
                STD_ORIGIN, 'publish',
                PUBLISH_KEY, SUBSCRIBE_KEY,
                0, encode(channel),
                jsonp, encode(msg)
            ];

            params = { 'uuid' : UUID, 'auth' : auth_key }

            if (!store) params['store'] ="0"

            // Queue Message Send
            PUB_QUEUE[add_msg]({
                callback : jsonp,
                timeout  : SECOND * 5,
                url      : url,
                data     : _get_url_params(params),
                fail     : function(response){
                    _invoke_error(response, err);
                    publish(1);
                },
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                    publish(1);
                },
                mode     : (post)?'POST':'GET'
            });

            // Send Message
            publish();
        },

        /*
            PUBNUB.unsubscribe({ channel : 'my_chat' });
        */
        'unsubscribe' : function(args, callback) {
            var channel       = args['channel']
            ,   channel_group = args['channel_group']
            ,   auth_key      = args['auth_key']    || AUTH_KEY
            ,   callback      = callback            || args['callback'] || function(){}
            ,   err           = args['error']       || function(){};

            TIMETOKEN   = 0;
            //SUB_RESTORE = 1;    REVISIT !!!!

            if (channel) {
                // Prepare Channel(s)
                channel = map( (
                    channel.join ? channel.join(',') : ''+channel
                ).split(','), function(channel) {
                    if (!CHANNELS[channel]) return;
                    return channel + ',' + channel + PRESENCE_SUFFIX;
                } ).join(',');

                // Iterate over Channels
                each( channel.split(','), function(ch) {
                    var CB_CALLED = true;
                    if (!ch) return;
                    CHANNELS[ch] = 0;
                    if (ch in STATE) delete STATE[ch];
                    if (READY) {
                        CB_CALLED = SELF['LEAVE']( ch, 0 , auth_key, callback, err);
                    }
                    if (!CB_CALLED) callback({action : "leave"});

                    
                } );
            }

            if (channel_group) {
                // Prepare channel group(s)
                channel_group = map( (
                    channel_group.join ? channel_group.join(',') : ''+channel_group
                ).split(','), function(channel_group) {
                    if (!CHANNEL_GROUPS[channel_group]) return;
                    return channel_group + ',' + channel_group + PRESENCE_SUFFIX;
                } ).join(',');

                // Iterate over channel groups
                each( channel_group.split(','), function(chg) {
                    var CB_CALLED = true;
                    if (!chg) return;
                    CHANNEL_GROUPS[chg] = 0;
                    if (chg in STATE) delete STATE[chg];
                    if (READY) {
                        CB_CALLED = SELF['LEAVE_GROUP']( chg, 0 , auth_key, callback, err);
                    }
                    if (!CB_CALLED) callback({action : "leave"});

                } );
            }

            // Reset Connection if Count Less
            CONNECT();
        },

        /*
            PUBNUB.subscribe({
                channel  : 'my_chat'
                callback : function(message) { }
            });
        */
        'subscribe' : function( args, callback ) {
            var channel         = args['channel']
            ,   channel_group   = args['channel_group']
            ,   callback        = callback            || args['callback']
            ,   callback        = callback            || args['message']
            ,   auth_key        = args['auth_key']    || AUTH_KEY
            ,   connect         = args['connect']     || function(){}
            ,   reconnect       = args['reconnect']   || function(){}
            ,   disconnect      = args['disconnect']  || function(){}
            ,   errcb           = args['error']       || function(){}
            ,   idlecb          = args['idle']        || function(){}
            ,   presence        = args['presence']    || 0
            ,   noheresync      = args['noheresync']  || 0
            ,   backfill        = args['backfill']    || 0
            ,   timetoken       = args['timetoken']   || 0
            ,   sub_timeout     = args['timeout']     || SUB_TIMEOUT
            ,   windowing       = args['windowing']   || SUB_WINDOWING
            ,   state           = args['state']
            ,   heartbeat       = args['heartbeat'] || args['pnexpires']
            ,   restore         = args['restore'] || SUB_RESTORE;

            // Restore Enabled?
            SUB_RESTORE = restore;

            // Always Reset the TT
            TIMETOKEN = timetoken;

            // Make sure we have a Channel
            if (!channel && !channel_group) {
                return error('Missing Channel');
            }

            if (!callback)      return error('Missing Callback');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');

            if (heartbeat || heartbeat === 0) {
                SELF['set_heartbeat'](heartbeat);
            }

            // Setup Channel(s)
            if (channel) {
                each( (channel.join ? channel.join(',') : ''+channel).split(','),
                function(channel) {
                    var settings = CHANNELS[channel] || {};

                    // Store Channel State
                    CHANNELS[SUB_CHANNEL = channel] = {
                        name         : channel,
                        connected    : settings.connected,
                        disconnected : settings.disconnected,
                        subscribed   : 1,
                        callback     : SUB_CALLBACK = callback,
                        'cipher_key' : args['cipher_key'],
                        connect      : connect,
                        disconnect   : disconnect,
                        reconnect    : reconnect
                    };

                    if (state) {
                        if (channel in state) {
                            STATE[channel] = state[channel];
                        } else {
                            STATE[channel] = state;
                        }
                    }

                    // Presence Enabled?
                    if (!presence) return;

                    // Subscribe Presence Channel
                    SELF['subscribe']({
                        'channel'  : channel + PRESENCE_SUFFIX,
                        'callback' : presence,
                        'restore'  : restore
                    });

                    // Presence Subscribed?
                    if (settings.subscribed) return;

                    // See Who's Here Now?
                    if (noheresync) return;
                    SELF['here_now']({
                        'channel'  : channel,
                        'callback' : function(here) {
                            each( 'uuids' in here ? here['uuids'] : [],
                            function(uid) { presence( {
                                'action'    : 'join',
                                'uuid'      : uid,
                                'timestamp' : Math.floor(rnow() / 1000),
                                'occupancy' : here['occupancy'] || 1
                            }, here, channel ); } );
                        }
                    });
                } );
            }

            // Setup Channel Groups
            if (channel_group) {
                each( (channel_group.join ? channel_group.join(',') : ''+channel_group).split(','),
                function(channel_group) {
                    var settings = CHANNEL_GROUPS[channel_group] || {};

                    CHANNEL_GROUPS[channel_group] = {
                        name         : channel_group,
                        connected    : settings.connected,
                        disconnected : settings.disconnected,
                        subscribed   : 1,
                        callback     : SUB_CALLBACK = callback,
                        'cipher_key' : args['cipher_key'],
                        connect      : connect,
                        disconnect   : disconnect,
                        reconnect    : reconnect
                    };

                    // Presence Enabled?
                    if (!presence) return;

                    // Subscribe Presence Channel
                    SELF['subscribe']({
                        'channel_group'  : channel_group + PRESENCE_SUFFIX,
                        'callback' : presence,
                        'restore'  : restore
                    });

                    // Presence Subscribed?
                    if (settings.subscribed) return;

                    // See Who's Here Now?
                    if (noheresync) return;
                    SELF['here_now']({
                        'channel_group'  : channel_group,
                        'callback' : function(here) {
                            each( 'uuids' in here ? here['uuids'] : [],
                            function(uid) { presence( {
                                'action'    : 'join',
                                'uuid'      : uid,
                                'timestamp' : Math.floor(rnow() / 1000),
                                'occupancy' : here['occupancy'] || 1
                            }, here, channel_group ); } );
                        }
                    });
                } );
            }


            // Test Network Connection
            function _test_connection(success) {
                if (success) {
                    // Begin Next Socket Connection
                    timeout( CONNECT, SECOND );
                }
                else {
                    // New Origin on Failed Connection
                    STD_ORIGIN = nextorigin( ORIGIN, 1 );
                    SUB_ORIGIN = nextorigin( ORIGIN, 1 );

                    // Re-test Connection
                    timeout( function() {
                        SELF['time'](_test_connection);
                    }, SECOND );
                }

                // Disconnect & Reconnect
                each_channel(function(channel){
                    // Reconnect
                    if (success && channel.disconnected) {
                        channel.disconnected = 0;
                        return channel.reconnect(channel.name);
                    }

                    // Disconnect
                    if (!success && !channel.disconnected) {
                        channel.disconnected = 1;
                        channel.disconnect(channel.name);
                    }
                });
                
                // Disconnect & Reconnect for channel groups
                each_channel_group(function(channel_group){
                    // Reconnect
                    if (success && channel_group.disconnected) {
                        channel_group.disconnected = 0;
                        return channel_group.reconnect(channel_group.name);
                    }

                    // Disconnect
                    if (!success && !channel_group.disconnected) {
                        channel_group.disconnected = 1;
                        channel_group.disconnect(channel_group.name);
                    }
                });
            }

            // Evented Subscribe
            function _connect() {
                var jsonp           = jsonp_cb()
                ,   channels        = generate_channel_list(CHANNELS).join(',')
                ,   channel_groups  = generate_channel_group_list(CHANNEL_GROUPS).join(',');

                // Stop Connection
                if (!channels && !channel_groups) return;

                if (!channels) channels = ',';

                // Connect to PubNub Subscribe Servers
                _reset_offline();

                var data = _get_url_params({ 'uuid' : UUID, 'auth' : auth_key });

                if (channel_groups) {
                    data['channel-group'] = channel_groups;
                }


                var st = JSON.stringify(STATE);
                if (st.length > 2) data['state'] = JSON.stringify(STATE);

                if (PRESENCE_HB) data['heartbeat'] = PRESENCE_HB;

                start_presence_heartbeat();
                SUB_RECEIVER = xdr({
                    timeout  : sub_timeout,
                    callback : jsonp,
                    fail     : function(response) {
                        if (response['error'] && response['service']) {
                            _invoke_error(response, errcb);
                            _test_connection(1);
                        } else {
                            SELF['time'](function(success){
                                !success && ( _invoke_error(response, errcb));
                                _test_connection(success);
                            });
                        }
                    },
                    data     : _get_url_params(data),
                    url      : [
                        SUB_ORIGIN, 'subscribe',
                        SUBSCRIBE_KEY, encode(channels),
                        jsonp, TIMETOKEN
                    ],
                    success : function(messages) {

                        // Check for Errors
                        if (!messages || (
                            typeof messages == 'object' &&
                            'error' in messages         &&
                            messages['error']
                        )) {
                            errcb(messages['error']);
                            return timeout( CONNECT, SECOND );
                        }

                        // User Idle Callback
                        idlecb(messages[1]);

                        // Restore Previous Connection Point if Needed
                        TIMETOKEN = !TIMETOKEN               &&
                                    SUB_RESTORE              &&
                                    db['get'](SUBSCRIBE_KEY) || messages[1];

                        /*
                        // Connect
                        each_channel_registry(function(registry){
                            if (registry.connected) return;
                            registry.connected = 1;
                            registry.connect(channel.name);
                        });
                        */

                        // Connect
                        each_channel(function(channel){
                            if (channel.connected) return;
                            channel.connected = 1;
                            channel.connect(channel.name);
                        });

                        // Connect for channel groups
                        each_channel_group(function(channel_group){
                            if (channel_group.connected) return;
                            channel_group.connected = 1;
                            channel_group.connect(channel_group.name);
                        });

                        if (RESUMED && !SUB_RESTORE) {
                                TIMETOKEN = 0;
                                RESUMED = false;
                                // Update Saved Timetoken
                                db['set']( SUBSCRIBE_KEY, 0 );
                                timeout( _connect, windowing );
                                return;
                        }

                        // Invoke Memory Catchup and Receive Up to 100
                        // Previous Messages from the Queue.
                        if (backfill) {
                            TIMETOKEN = 10000;
                            backfill  = 0;
                        }

                        // Update Saved Timetoken
                        db['set']( SUBSCRIBE_KEY, messages[1] );

                        // Route Channel <---> Callback for Message
                        var next_callback = (function() {
                            var channels = '';
                            var channels2 = '';

                            if (messages.length > 3) {
                                channels  = messages[3];
                                channels2 = messages[2];
                            } else if (messages.length > 2) {
                                channels = messages[2];
                            } else {
                                channels =  map(
                                    generate_channel_list(CHANNELS), function(chan) { return map(
                                        Array(messages[0].length)
                                        .join(',').split(','),
                                        function() { return chan; }
                                    ) }).join(',')
                            }

                            var list  = channels.split(',');
                            var list2 = (channels2)?channels2.split(','):[];

                            return function() {
                                var channel  = list.shift()||SUB_CHANNEL;
                                var channel2 = list2.shift();

                                var chobj = {};

                                if (channel2) {
                                    if (channel && channel.indexOf('-pnpres') >= 0 
                                        && channel2.indexOf('-pnpres') < 0) {
                                        channel2 += '-pnpres';
                                    }
                                    chobj = CHANNEL_GROUPS[channel2] || CHANNELS[channel2] || {'callback' : function(){}};
                                } else {
                                    chobj = CHANNELS[channel];
                                }

                                var r = [
                                    chobj
                                    .callback||SUB_CALLBACK,
                                    channel.split(PRESENCE_SUFFIX)[0]
                                ];
                                channel2 && r.push(channel2.split(PRESENCE_SUFFIX)[0]);
                                return r;
                            };
                        })();

                        var latency = detect_latency(+messages[1]);
                        each( messages[0], function(msg) {
                            var next = next_callback();
                            var decrypted_msg = decrypt(msg,
                                (CHANNELS[next[1]])?CHANNELS[next[1]]['cipher_key']:null);
                            next[0] && next[0]( decrypted_msg, messages, next[2] || next[1], latency, next[1]);
                        });

                        timeout( _connect, windowing );
                    }
                });
            }

            CONNECT = function() {
                _reset_offline();
                timeout( _connect, windowing );
            };

            // Reduce Status Flicker
            if (!READY) return READY_BUFFER.push(CONNECT);

            // Connect Now
            CONNECT();
        },

        /*
            PUBNUB.here_now({ channel : 'my_chat', callback : fun });
        */
        'here_now' : function( args, callback ) {
            var callback = args['callback'] || callback
            ,   err      = args['error']    || function(){}
            ,   auth_key = args['auth_key'] || AUTH_KEY
            ,   channel  = args['channel']
            ,   channel_group = args['channel_group']
            ,   jsonp    = jsonp_cb()
            ,   uuids    = ('uuids' in args) ? args['uuids'] : true
            ,   state    = args['state']
            ,   data     = { 'uuid' : UUID, 'auth' : auth_key };

            if (!uuids) data['disable_uuids'] = 1;
            if (state) data['state'] = 1;

            // Make sure we have a Channel
            if (!callback)      return error('Missing Callback');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');

            var url = [
                    STD_ORIGIN, 'v2', 'presence',
                    'sub_key', SUBSCRIBE_KEY
                ];

            channel && url.push('channel') && url.push(encode(channel));

            if (jsonp != '0') { data['callback'] = jsonp; }

            if (channel_group) {
                data['channel-group'] = channel_group;
                !channel && url.push('channel') && url.push(','); 
            }


            xdr({
                callback : jsonp,
                data     : _get_url_params(data),
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : url
            });
        },

        /*
            PUBNUB.current_channels_by_uuid({ channel : 'my_chat', callback : fun });
        */
        'where_now' : function( args, callback ) {
            var callback = args['callback'] || callback
            ,   err      = args['error']    || function(){}
            ,   auth_key = args['auth_key'] || AUTH_KEY
            ,   jsonp    = jsonp_cb()
            ,   uuid     = args['uuid']     || UUID
            ,   data     = { 'auth' : auth_key };

            // Make sure we have a Channel
            if (!callback)      return error('Missing Callback');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');

            if (jsonp != '0') { data['callback'] = jsonp; }

            xdr({
                callback : jsonp,
                data     : _get_url_params(data),
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : [
                    STD_ORIGIN, 'v2', 'presence',
                    'sub_key', SUBSCRIBE_KEY,
                    'uuid', encode(uuid)
                ]
            });
        },

        'state' : function(args, callback) {
            var callback = args['callback'] || callback || function(r) {}
            ,   err      = args['error']    || function(){}
            ,   auth_key = args['auth_key'] || AUTH_KEY
            ,   jsonp    = jsonp_cb()
            ,   state    = args['state']
            ,   uuid     = args['uuid'] || UUID
            ,   channel  = args['channel']
            ,   channel_group = args['channel_group']
            ,   url
            ,   data     = _get_url_params({ 'auth' : auth_key });

            // Make sure we have a Channel
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
            if (!uuid) return error('Missing UUID');
            if (!channel && !channel_group) return error('Missing Channel');

            if (jsonp != '0') { data['callback'] = jsonp; }

            if (typeof channel != 'undefined'
                && CHANNELS[channel] && CHANNELS[channel].subscribed ) {
                if (state) STATE[channel] = state;
            }

            if (typeof channel_group != 'undefined'
                && CHANNEL_GROUPS[channel_group]
                && CHANNEL_GROUPS[channel_group].subscribed
                ) {
                if (state) STATE[channel_group] = state;
                data['channel-group'] = channel_group;

                if (!channel) {
                    channel = ',';
                }
            }

            data['state'] = JSON.stringify(state);

            if (state) {
                url      = [
                    STD_ORIGIN, 'v2', 'presence',
                    'sub-key', SUBSCRIBE_KEY,
                    'channel', channel,
                    'uuid', uuid, 'data'
                ]
            } else {
                url      = [
                    STD_ORIGIN, 'v2', 'presence',
                    'sub-key', SUBSCRIBE_KEY,
                    'channel', channel,
                    'uuid', encode(uuid)
                ]
            }

            xdr({
                callback : jsonp,
                data     : _get_url_params(data),
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : url

            });

        },

        /*
            PUBNUB.grant({
                channel  : 'my_chat',
                callback : fun,
                error    : fun,
                ttl      : 24 * 60, // Minutes
                read     : true,
                write    : true,
                auth_key : '3y8uiajdklytowsj'
            });
        */
        'grant' : function( args, callback ) {
            var callback        = args['callback'] || callback
            ,   err             = args['error']    || function(){}
            ,   channel         = args['channel']
            ,   channel_group   = args['channel_group']
            ,   jsonp           = jsonp_cb()
            ,   ttl             = args['ttl']
            ,   r               = (args['read'] )?"1":"0"
            ,   w               = (args['write'])?"1":"0"
            ,   m               = (args['manage'])?"1":"0"
            ,   auth_key        = args['auth_key'];

            if (!callback)      return error('Missing Callback');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
            if (!PUBLISH_KEY)   return error('Missing Publish Key');
            if (!SECRET_KEY)    return error('Missing Secret Key');

            var timestamp  = Math.floor(new Date().getTime() / 1000)
            ,   sign_input = SUBSCRIBE_KEY + "\n" + PUBLISH_KEY + "\n"
                    + "grant" + "\n";

            var data = {
                'w'         : w,
                'r'         : r,
                'timestamp' : timestamp
            };
            if (args['manage']) {
                data['m'] = m;
            }
            if (typeof channel != 'undefined' && channel != null && channel.length > 0) data['channel'] = channel;
            if (typeof channel_group != 'undefined' && channel_group != null && channel_group.length > 0) {
                data['channel-group'] = channel_group;
            }
            if (jsonp != '0') { data['callback'] = jsonp; }
            if (ttl || ttl === 0) data['ttl'] = ttl;

            if (auth_key) data['auth'] = auth_key;

            data = _get_url_params(data)

            if (!auth_key) delete data['auth'];

            sign_input += _get_pam_sign_input_from_params(data);

            var signature = hmac_SHA256( sign_input, SECRET_KEY );

            signature = signature.replace( /\+/g, "-" );
            signature = signature.replace( /\//g, "_" );

            data['signature'] = signature;

            xdr({
                callback : jsonp,
                data     : data,
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : [
                    STD_ORIGIN, 'v1', 'auth', 'grant' ,
                    'sub-key', SUBSCRIBE_KEY
                ]
            });
        },

        /*
         PUBNUB.mobile_gw_provision ({
         device_id: 'A655FBA9931AB',
         op       : 'add' | 'remove',
         gw_type  : 'apns' | 'gcm',
         channel  : 'my_chat',
         callback : fun,
         error    : fun,
         });
         */

        'mobile_gw_provision' : function( args ) {

            var callback = args['callback'] || function(){}
                ,   auth_key       = args['auth_key'] || AUTH_KEY
                ,   err            = args['error'] || function() {}
                ,   jsonp          = jsonp_cb()
                ,   channel        = args['channel']
                ,   op             = args['op']
                ,   gw_type        = args['gw_type']
                ,   device_id      = args['device_id']
                ,   url;

            if (!device_id)     return error('Missing Device ID (device_id)');
            if (!gw_type)       return error('Missing GW Type (gw_type: gcm or apns)');
            if (!op)            return error('Missing GW Operation (op: add or remove)');
            if (!channel)       return error('Missing gw destination Channel (channel)');
            if (!PUBLISH_KEY)   return error('Missing Publish Key');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');

            // Create URL
            url = [
                STD_ORIGIN, 'v1/push/sub-key',
                SUBSCRIBE_KEY, 'devices', device_id
            ];

            params = { 'uuid' : UUID, 'auth' : auth_key, 'type': gw_type};

            if (op == "add") {
                params['add'] = channel;
            } else if (op == "remove") {
                params['remove'] = channel;
            }

            xdr({
                callback : jsonp,
                data     : params,
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : url
            });

        },

        /*
            PUBNUB.audit({
                channel  : 'my_chat',
                callback : fun,
                error    : fun,
                read     : true,
                write    : true,
                auth_key : '3y8uiajdklytowsj'
            });
        */
        'audit' : function( args, callback ) {
            var callback        = args['callback'] || callback
            ,   err             = args['error']    || function(){}
            ,   channel         = args['channel']
            ,   channel_group   = args['channel_group']
            ,   auth_key        = args['auth_key']
            ,   jsonp           = jsonp_cb();

            // Make sure we have a Channel
            if (!callback)      return error('Missing Callback');
            if (!SUBSCRIBE_KEY) return error('Missing Subscribe Key');
            if (!PUBLISH_KEY)   return error('Missing Publish Key');
            if (!SECRET_KEY)    return error('Missing Secret Key');

            var timestamp  = Math.floor(new Date().getTime() / 1000)
            ,   sign_input = SUBSCRIBE_KEY + "\n"
                + PUBLISH_KEY + "\n"
                + "audit" + "\n";

            var data = {'timestamp' : timestamp };
            if (jsonp != '0') { data['callback'] = jsonp; }
            if (typeof channel != 'undefined' && channel != null && channel.length > 0) data['channel'] = channel;
            if (typeof channel_group != 'undefined' && channel_group != null && channel_group.length > 0) {
                data['channel-group'] = channel_group;
            }
            if (auth_key) data['auth']    = auth_key;

            data = _get_url_params(data);

            if (!auth_key) delete data['auth'];

            sign_input += _get_pam_sign_input_from_params(data);

            var signature = hmac_SHA256( sign_input, SECRET_KEY );

            signature = signature.replace( /\+/g, "-" );
            signature = signature.replace( /\//g, "_" );

            data['signature'] = signature;
            xdr({
                callback : jsonp,
                data     : data,
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) {
                    _invoke_error(response, err);
                },
                url      : [
                    STD_ORIGIN, 'v1', 'auth', 'audit' ,
                    'sub-key', SUBSCRIBE_KEY
                ]
            });
        },

        /*
            PUBNUB.revoke({
                channel  : 'my_chat',
                callback : fun,
                error    : fun,
                auth_key : '3y8uiajdklytowsj'
            });
        */
        'revoke' : function( args, callback ) {
            args['read']  = false;
            args['write'] = false;
            SELF['grant']( args, callback );
        },
        'set_uuid' : function(uuid) {
            UUID = uuid;
            CONNECT();
        },
        'get_uuid' : function() {
            return UUID;
        },
        'isArray'  : function(arg) {
            return isArray(arg);
        },
        'get_subscibed_channels' : function() {
            return generate_channel_list(CHANNELS, true);
        },
        'presence_heartbeat' : function(args) {
            var callback = args['callback'] || function() {}
            var err      = args['error']    || function() {}
            var jsonp    = jsonp_cb();
            var data     = { 'uuid' : UUID, 'auth' : AUTH_KEY };

            var st = JSON['stringify'](STATE);
            if (st.length > 2) data['state'] = JSON['stringify'](STATE);

            if (PRESENCE_HB > 0 && PRESENCE_HB < 320) data['heartbeat'] = PRESENCE_HB;

            if (jsonp != '0') { data['callback'] = jsonp; }

            var channels        = encode(generate_channel_list(CHANNELS, true)['join'](','));
            var channel_groups  = generate_channel_group_list(CHANNEL_GROUPS, true)['join'](',');

            if (!channels) channels = ',';
            if (channel_groups) data['channel-group'] = channel_groups;

            xdr({
                callback : jsonp,
                data     : _get_url_params(data),
                timeout  : SECOND * 5,
                url      : [
                    STD_ORIGIN, 'v2', 'presence',
                    'sub-key', SUBSCRIBE_KEY,
                    'channel' , channels,
                    'heartbeat'
                ],
                success  : function(response) {
                    _invoke_callback(response, callback, err);
                },
                fail     : function(response) { _invoke_error(response, err); }
            });
        },
        'stop_timers': function () {
            clearTimeout(_poll_timer);
            clearTimeout(_poll_timer2);
        },

        // Expose PUBNUB Functions
        'xdr'           : xdr,
        'ready'         : ready,
        'db'            : db,
        'uuid'          : uuid,
        'map'           : map,
        'each'          : each,
        'each-channel'  : each_channel,
        'grep'          : grep,
        'offline'       : function(){ _reset_offline(
            1, { "message" : "Offline. Please check your network settings." })
        },
        'supplant'      : supplant,
        'now'           : rnow,
        'unique'        : unique,
        'updater'       : updater
    };

    function _poll_online() {
        _is_online() || _reset_offline( 1, {
            "error" : "Offline. Please check your network settings. "
        });
        _poll_timer && clearTimeout(_poll_timer);
        _poll_timer = timeout( _poll_online, SECOND );
    }

    function _poll_online2() {
        if (!TIME_CHECK) return;
        SELF['time'](function(success){
            detect_time_detla( function(){}, success );
            success || _reset_offline( 1, {
                "error" : "Heartbeat failed to connect to Pubnub Servers." +
                    "Please check your network settings."
                });
            _poll_timer2 && clearTimeout(_poll_timer2);
            _poll_timer2 = timeout( _poll_online2, KEEPALIVE );
        });
    }

    function _reset_offline(err, msg) {
        SUB_RECEIVER && SUB_RECEIVER(err, msg);
        SUB_RECEIVER = null;

        clearTimeout(_poll_timer);
        clearTimeout(_poll_timer2);
    }

    if (!UUID) UUID = SELF['uuid']();
    db['set']( SUBSCRIBE_KEY + 'uuid', UUID );

    _poll_timer  = timeout( _poll_online,  SECOND    );
    _poll_timer2 = timeout( _poll_online2, KEEPALIVE );
    PRESENCE_HB_TIMEOUT = timeout(
        start_presence_heartbeat,
        ( PRESENCE_HB_INTERVAL - 3 ) * SECOND
    );

    // Detect Age of Message
    function detect_latency(tt) {
        var adjusted_time = rnow() - TIME_DRIFT;
        return adjusted_time - tt / 10000;
    }

    detect_time_detla();
    function detect_time_detla( cb, time ) {
        var stime = rnow();

        time && calculate(time) || SELF['time'](calculate);

        function calculate(time) {
            if (!time) return;
            var ptime   = time / 10000
            ,   latency = (rnow() - stime) / 2;
            TIME_DRIFT = rnow() - (ptime + latency);
            cb && cb(TIME_DRIFT);
        }
    }

    return SELF;
}

var CRYPTO = (function(){
    var Nr = 14,
    /* Default to 256 Bit Encryption */
    Nk = 8,
    Decrypt = false,

    enc_utf8 = function(s)
    {
        try {
            return unescape(encodeURIComponent(s));
        }
        catch(e) {
            throw 'Error on UTF-8 encode';
        }
    },

    dec_utf8 = function(s)
    {
        try {
            return decodeURIComponent(escape(s));
        }
        catch(e) {
            throw ('Bad Key');
        }
    },

    padBlock = function(byteArr)
    {
        var array = [], cpad, i;
        if (byteArr.length < 16) {
            cpad = 16 - byteArr.length;
            array = [cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad];
        }
        for (i = 0; i < byteArr.length; i++)
        {
            array[i] = byteArr[i];
        }
        return array;
    },

    block2s = function(block, lastBlock)
    {
        var string = '', padding, i;
        if (lastBlock) {
            padding = block[15];
            if (padding > 16) {
                throw ('Decryption error: Maybe bad key');
            }
            if (padding == 16) {
                return '';
            }
            for (i = 0; i < 16 - padding; i++) {
                string += String.fromCharCode(block[i]);
            }
        } else {
            for (i = 0; i < 16; i++) {
                string += String.fromCharCode(block[i]);
            }
        }
        return string;
    },

    a2h = function(numArr)
    {
        var string = '', i;
        for (i = 0; i < numArr.length; i++) {
            string += (numArr[i] < 16 ? '0': '') + numArr[i].toString(16);
        }
        return string;
    },

    h2a = function(s)
    {
        var ret = [];
        s.replace(/(..)/g,
        function(s) {
            ret.push(parseInt(s, 16));
        });
        return ret;
    },

    s2a = function(string, binary) {
        var array = [], i;

        if (! binary) {
            string = enc_utf8(string);
        }

        for (i = 0; i < string.length; i++)
        {
            array[i] = string.charCodeAt(i);
        }

        return array;
    },

    size = function(newsize)
    {
        switch (newsize)
        {
        case 128:
            Nr = 10;
            Nk = 4;
            break;
        case 192:
            Nr = 12;
            Nk = 6;
            break;
        case 256:
            Nr = 14;
            Nk = 8;
            break;
        default:
            throw ('Invalid Key Size Specified:' + newsize);
        }
    },

    randArr = function(num) {
        var result = [], i;
        for (i = 0; i < num; i++) {
            result = result.concat(Math.floor(Math.random() * 256));
        }
        return result;
    },

    openSSLKey = function(passwordArr, saltArr) {
        // Number of rounds depends on the size of the AES in use
        // 3 rounds for 256
        //        2 rounds for the key, 1 for the IV
        // 2 rounds for 128
        //        1 round for the key, 1 round for the IV
        // 3 rounds for 192 since it's not evenly divided by 128 bits
        var rounds = Nr >= 12 ? 3: 2,
        key = [],
        iv = [],
        md5_hash = [],
        result = [],
        data00 = passwordArr.concat(saltArr),
        i;
        md5_hash[0] = GibberishAES.Hash.MD5(data00);
        result = md5_hash[0];
        for (i = 1; i < rounds; i++) {
            md5_hash[i] = GibberishAES.Hash.MD5(md5_hash[i - 1].concat(data00));
            result = result.concat(md5_hash[i]);
        }
        key = result.slice(0, 4 * Nk);
        iv = result.slice(4 * Nk, 4 * Nk + 16);
        return {
            key: key,
            iv: iv
        };
    },

    rawEncrypt = function(plaintext, key, iv) {
        // plaintext, key and iv as byte arrays
        key = expandKey(key);
        var numBlocks = Math.ceil(plaintext.length / 16),
        blocks = [],
        i,
        cipherBlocks = [];
        for (i = 0; i < numBlocks; i++) {
            blocks[i] = padBlock(plaintext.slice(i * 16, i * 16 + 16));
        }
        if (plaintext.length % 16 === 0) {
            blocks.push([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]);
            // CBC OpenSSL padding scheme
            numBlocks++;
        }
        for (i = 0; i < blocks.length; i++) {
            blocks[i] = (i === 0) ? xorBlocks(blocks[i], iv) : xorBlocks(blocks[i], cipherBlocks[i - 1]);
            cipherBlocks[i] = encryptBlock(blocks[i], key);
        }
        return cipherBlocks;
    },

    rawDecrypt = function(cryptArr, key, iv, binary) {
        //  cryptArr, key and iv as byte arrays
        key = expandKey(key);
        var numBlocks = cryptArr.length / 16,
        cipherBlocks = [],
        i,
        plainBlocks = [],
        string = '';
        for (i = 0; i < numBlocks; i++) {
            cipherBlocks.push(cryptArr.slice(i * 16, (i + 1) * 16));
        }
        for (i = cipherBlocks.length - 1; i >= 0; i--) {
            plainBlocks[i] = decryptBlock(cipherBlocks[i], key);
            plainBlocks[i] = (i === 0) ? xorBlocks(plainBlocks[i], iv) : xorBlocks(plainBlocks[i], cipherBlocks[i - 1]);
        }
        for (i = 0; i < numBlocks - 1; i++) {
            string += block2s(plainBlocks[i]);
        }
        string += block2s(plainBlocks[i], true);
        return binary ? string : dec_utf8(string);
    },

    encryptBlock = function(block, words) {
        Decrypt = false;
        var state = addRoundKey(block, words, 0),
        round;
        for (round = 1; round < (Nr + 1); round++) {
            state = subBytes(state);
            state = shiftRows(state);
            if (round < Nr) {
                state = mixColumns(state);
            }
            //last round? don't mixColumns
            state = addRoundKey(state, words, round);
        }

        return state;
    },

    decryptBlock = function(block, words) {
        Decrypt = true;
        var state = addRoundKey(block, words, Nr),
        round;
        for (round = Nr - 1; round > -1; round--) {
            state = shiftRows(state);
            state = subBytes(state);
            state = addRoundKey(state, words, round);
            if (round > 0) {
                state = mixColumns(state);
            }
            //last round? don't mixColumns
        }

        return state;
    },

    subBytes = function(state) {
        var S = Decrypt ? SBoxInv: SBox,
        temp = [],
        i;
        for (i = 0; i < 16; i++) {
            temp[i] = S[state[i]];
        }
        return temp;
    },

    shiftRows = function(state) {
        var temp = [],
        shiftBy = Decrypt ? [0, 13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3] : [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11],
        i;
        for (i = 0; i < 16; i++) {
            temp[i] = state[shiftBy[i]];
        }
        return temp;
    },

    mixColumns = function(state) {
        var t = [],
        c;
        if (!Decrypt) {
            for (c = 0; c < 4; c++) {
                t[c * 4] = G2X[state[c * 4]] ^ G3X[state[1 + c * 4]] ^ state[2 + c * 4] ^ state[3 + c * 4];
                t[1 + c * 4] = state[c * 4] ^ G2X[state[1 + c * 4]] ^ G3X[state[2 + c * 4]] ^ state[3 + c * 4];
                t[2 + c * 4] = state[c * 4] ^ state[1 + c * 4] ^ G2X[state[2 + c * 4]] ^ G3X[state[3 + c * 4]];
                t[3 + c * 4] = G3X[state[c * 4]] ^ state[1 + c * 4] ^ state[2 + c * 4] ^ G2X[state[3 + c * 4]];
            }
        }else {
            for (c = 0; c < 4; c++) {
                t[c*4] = GEX[state[c*4]] ^ GBX[state[1+c*4]] ^ GDX[state[2+c*4]] ^ G9X[state[3+c*4]];
                t[1+c*4] = G9X[state[c*4]] ^ GEX[state[1+c*4]] ^ GBX[state[2+c*4]] ^ GDX[state[3+c*4]];
                t[2+c*4] = GDX[state[c*4]] ^ G9X[state[1+c*4]] ^ GEX[state[2+c*4]] ^ GBX[state[3+c*4]];
                t[3+c*4] = GBX[state[c*4]] ^ GDX[state[1+c*4]] ^ G9X[state[2+c*4]] ^ GEX[state[3+c*4]];
            }
        }

        return t;
    },

    addRoundKey = function(state, words, round) {
        var temp = [],
        i;
        for (i = 0; i < 16; i++) {
            temp[i] = state[i] ^ words[round][i];
        }
        return temp;
    },

    xorBlocks = function(block1, block2) {
        var temp = [],
        i;
        for (i = 0; i < 16; i++) {
            temp[i] = block1[i] ^ block2[i];
        }
        return temp;
    },

    expandKey = function(key) {
        // Expects a 1d number array
        var w = [],
        temp = [],
        i,
        r,
        t,
        flat = [],
        j;

        for (i = 0; i < Nk; i++) {
            r = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
            w[i] = r;
        }

        for (i = Nk; i < (4 * (Nr + 1)); i++) {
            w[i] = [];
            for (t = 0; t < 4; t++) {
                temp[t] = w[i - 1][t];
            }
            if (i % Nk === 0) {
                temp = subWord(rotWord(temp));
                temp[0] ^= Rcon[i / Nk - 1];
            } else if (Nk > 6 && i % Nk == 4) {
                temp = subWord(temp);
            }
            for (t = 0; t < 4; t++) {
                w[i][t] = w[i - Nk][t] ^ temp[t];
            }
        }
        for (i = 0; i < (Nr + 1); i++) {
            flat[i] = [];
            for (j = 0; j < 4; j++) {
                flat[i].push(w[i * 4 + j][0], w[i * 4 + j][1], w[i * 4 + j][2], w[i * 4 + j][3]);
            }
        }
        return flat;
    },

    subWord = function(w) {
        // apply SBox to 4-byte word w
        for (var i = 0; i < 4; i++) {
            w[i] = SBox[w[i]];
        }
        return w;
    },

    rotWord = function(w) {
        // rotate 4-byte word w left by one byte
        var tmp = w[0],
        i;
        for (i = 0; i < 4; i++) {
            w[i] = w[i + 1];
        }
        w[3] = tmp;
        return w;
    },

// jlcooke: 2012-07-12: added strhex + invertArr to compress G2X/G3X/G9X/GBX/GEX/SBox/SBoxInv/Rcon saving over 7KB, and added encString, decString
    strhex = function(str,size) {
        var ret = [];
        for (i=0; i<str.length; i+=size)
            ret[i/size] = parseInt(str.substr(i,size), 16);
        return ret;
    },
    invertArr = function(arr) {
        var ret = [];
        for (i=0; i<arr.length; i++)
            ret[arr[i]] = i;
        return ret;
    },
    Gxx = function(a, b) {
        var i, ret;

        ret = 0;
        for (i=0; i<8; i++) {
            ret = ((b&1)==1) ? ret^a : ret;
            /* xmult */
            a = (a>0x7f) ? 0x11b^(a<<1) : (a<<1);
            b >>>= 1;
        }

        return ret;
    },
    Gx = function(x) {
        var r = [];
        for (var i=0; i<256; i++)
            r[i] = Gxx(x, i);
        return r;
    },

    // S-box
/*
    SBox = [
    99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171,
    118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164,
    114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113,
    216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226,
    235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214,
    179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203,
    190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69,
    249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245,
    188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68,
    23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42,
    144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73,
    6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109,
    141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37,
    46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62,
    181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225,
    248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223,
    140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187,
    22], //*/ SBox = strhex('637c777bf26b6fc53001672bfed7ab76ca82c97dfa5947f0add4a2af9ca472c0b7fd9326363ff7cc34a5e5f171d8311504c723c31896059a071280e2eb27b27509832c1a1b6e5aa0523bd6b329e32f8453d100ed20fcb15b6acbbe394a4c58cfd0efaafb434d338545f9027f503c9fa851a3408f929d38f5bcb6da2110fff3d2cd0c13ec5f974417c4a77e3d645d197360814fdc222a908846eeb814de5e0bdbe0323a0a4906245cc2d3ac629195e479e7c8376d8dd54ea96c56f4ea657aae08ba78252e1ca6b4c6e8dd741f4bbd8b8a703eb5664803f60e613557b986c11d9ee1f8981169d98e949b1e87e9ce5528df8ca1890dbfe6426841992d0fb054bb16',2),

    // Precomputed lookup table for the inverse SBox
/*    SBoxInv = [
    82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215,
    251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222,
    233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66,
    250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73,
    109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92,
    204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21,
    70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247,
    228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2,
    193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220,
    234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173,
    53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29,
    41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75,
    198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168,
    51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81,
    127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160,
    224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97,
    23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12,
    125], //*/ SBoxInv = invertArr(SBox),

    // Rijndael Rcon
/*
    Rcon = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94,
    188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145],
//*/ Rcon = strhex('01020408102040801b366cd8ab4d9a2f5ebc63c697356ad4b37dfaefc591',2),

/*
    G2X = [
    0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16,
    0x18, 0x1a, 0x1c, 0x1e, 0x20, 0x22, 0x24, 0x26, 0x28, 0x2a, 0x2c, 0x2e,
    0x30, 0x32, 0x34, 0x36, 0x38, 0x3a, 0x3c, 0x3e, 0x40, 0x42, 0x44, 0x46,
    0x48, 0x4a, 0x4c, 0x4e, 0x50, 0x52, 0x54, 0x56, 0x58, 0x5a, 0x5c, 0x5e,
    0x60, 0x62, 0x64, 0x66, 0x68, 0x6a, 0x6c, 0x6e, 0x70, 0x72, 0x74, 0x76,
    0x78, 0x7a, 0x7c, 0x7e, 0x80, 0x82, 0x84, 0x86, 0x88, 0x8a, 0x8c, 0x8e,
    0x90, 0x92, 0x94, 0x96, 0x98, 0x9a, 0x9c, 0x9e, 0xa0, 0xa2, 0xa4, 0xa6,
    0xa8, 0xaa, 0xac, 0xae, 0xb0, 0xb2, 0xb4, 0xb6, 0xb8, 0xba, 0xbc, 0xbe,
    0xc0, 0xc2, 0xc4, 0xc6, 0xc8, 0xca, 0xcc, 0xce, 0xd0, 0xd2, 0xd4, 0xd6,
    0xd8, 0xda, 0xdc, 0xde, 0xe0, 0xe2, 0xe4, 0xe6, 0xe8, 0xea, 0xec, 0xee,
    0xf0, 0xf2, 0xf4, 0xf6, 0xf8, 0xfa, 0xfc, 0xfe, 0x1b, 0x19, 0x1f, 0x1d,
    0x13, 0x11, 0x17, 0x15, 0x0b, 0x09, 0x0f, 0x0d, 0x03, 0x01, 0x07, 0x05,
    0x3b, 0x39, 0x3f, 0x3d, 0x33, 0x31, 0x37, 0x35, 0x2b, 0x29, 0x2f, 0x2d,
    0x23, 0x21, 0x27, 0x25, 0x5b, 0x59, 0x5f, 0x5d, 0x53, 0x51, 0x57, 0x55,
    0x4b, 0x49, 0x4f, 0x4d, 0x43, 0x41, 0x47, 0x45, 0x7b, 0x79, 0x7f, 0x7d,
    0x73, 0x71, 0x77, 0x75, 0x6b, 0x69, 0x6f, 0x6d, 0x63, 0x61, 0x67, 0x65,
    0x9b, 0x99, 0x9f, 0x9d, 0x93, 0x91, 0x97, 0x95, 0x8b, 0x89, 0x8f, 0x8d,
    0x83, 0x81, 0x87, 0x85, 0xbb, 0xb9, 0xbf, 0xbd, 0xb3, 0xb1, 0xb7, 0xb5,
    0xab, 0xa9, 0xaf, 0xad, 0xa3, 0xa1, 0xa7, 0xa5, 0xdb, 0xd9, 0xdf, 0xdd,
    0xd3, 0xd1, 0xd7, 0xd5, 0xcb, 0xc9, 0xcf, 0xcd, 0xc3, 0xc1, 0xc7, 0xc5,
    0xfb, 0xf9, 0xff, 0xfd, 0xf3, 0xf1, 0xf7, 0xf5, 0xeb, 0xe9, 0xef, 0xed,
    0xe3, 0xe1, 0xe7, 0xe5
    ], //*/ G2X = Gx(2),

/*    G3X = [
    0x00, 0x03, 0x06, 0x05, 0x0c, 0x0f, 0x0a, 0x09, 0x18, 0x1b, 0x1e, 0x1d,
    0x14, 0x17, 0x12, 0x11, 0x30, 0x33, 0x36, 0x35, 0x3c, 0x3f, 0x3a, 0x39,
    0x28, 0x2b, 0x2e, 0x2d, 0x24, 0x27, 0x22, 0x21, 0x60, 0x63, 0x66, 0x65,
    0x6c, 0x6f, 0x6a, 0x69, 0x78, 0x7b, 0x7e, 0x7d, 0x74, 0x77, 0x72, 0x71,
    0x50, 0x53, 0x56, 0x55, 0x5c, 0x5f, 0x5a, 0x59, 0x48, 0x4b, 0x4e, 0x4d,
    0x44, 0x47, 0x42, 0x41, 0xc0, 0xc3, 0xc6, 0xc5, 0xcc, 0xcf, 0xca, 0xc9,
    0xd8, 0xdb, 0xde, 0xdd, 0xd4, 0xd7, 0xd2, 0xd1, 0xf0, 0xf3, 0xf6, 0xf5,
    0xfc, 0xff, 0xfa, 0xf9, 0xe8, 0xeb, 0xee, 0xed, 0xe4, 0xe7, 0xe2, 0xe1,
    0xa0, 0xa3, 0xa6, 0xa5, 0xac, 0xaf, 0xaa, 0xa9, 0xb8, 0xbb, 0xbe, 0xbd,
    0xb4, 0xb7, 0xb2, 0xb1, 0x90, 0x93, 0x96, 0x95, 0x9c, 0x9f, 0x9a, 0x99,
    0x88, 0x8b, 0x8e, 0x8d, 0x84, 0x87, 0x82, 0x81, 0x9b, 0x98, 0x9d, 0x9e,
    0x97, 0x94, 0x91, 0x92, 0x83, 0x80, 0x85, 0x86, 0x8f, 0x8c, 0x89, 0x8a,
    0xab, 0xa8, 0xad, 0xae, 0xa7, 0xa4, 0xa1, 0xa2, 0xb3, 0xb0, 0xb5, 0xb6,
    0xbf, 0xbc, 0xb9, 0xba, 0xfb, 0xf8, 0xfd, 0xfe, 0xf7, 0xf4, 0xf1, 0xf2,
    0xe3, 0xe0, 0xe5, 0xe6, 0xef, 0xec, 0xe9, 0xea, 0xcb, 0xc8, 0xcd, 0xce,
    0xc7, 0xc4, 0xc1, 0xc2, 0xd3, 0xd0, 0xd5, 0xd6, 0xdf, 0xdc, 0xd9, 0xda,
    0x5b, 0x58, 0x5d, 0x5e, 0x57, 0x54, 0x51, 0x52, 0x43, 0x40, 0x45, 0x46,
    0x4f, 0x4c, 0x49, 0x4a, 0x6b, 0x68, 0x6d, 0x6e, 0x67, 0x64, 0x61, 0x62,
    0x73, 0x70, 0x75, 0x76, 0x7f, 0x7c, 0x79, 0x7a, 0x3b, 0x38, 0x3d, 0x3e,
    0x37, 0x34, 0x31, 0x32, 0x23, 0x20, 0x25, 0x26, 0x2f, 0x2c, 0x29, 0x2a,
    0x0b, 0x08, 0x0d, 0x0e, 0x07, 0x04, 0x01, 0x02, 0x13, 0x10, 0x15, 0x16,
    0x1f, 0x1c, 0x19, 0x1a
    ], //*/ G3X = Gx(3),

/*
    G9X = [
    0x00, 0x09, 0x12, 0x1b, 0x24, 0x2d, 0x36, 0x3f, 0x48, 0x41, 0x5a, 0x53,
    0x6c, 0x65, 0x7e, 0x77, 0x90, 0x99, 0x82, 0x8b, 0xb4, 0xbd, 0xa6, 0xaf,
    0xd8, 0xd1, 0xca, 0xc3, 0xfc, 0xf5, 0xee, 0xe7, 0x3b, 0x32, 0x29, 0x20,
    0x1f, 0x16, 0x0d, 0x04, 0x73, 0x7a, 0x61, 0x68, 0x57, 0x5e, 0x45, 0x4c,
    0xab, 0xa2, 0xb9, 0xb0, 0x8f, 0x86, 0x9d, 0x94, 0xe3, 0xea, 0xf1, 0xf8,
    0xc7, 0xce, 0xd5, 0xdc, 0x76, 0x7f, 0x64, 0x6d, 0x52, 0x5b, 0x40, 0x49,
    0x3e, 0x37, 0x2c, 0x25, 0x1a, 0x13, 0x08, 0x01, 0xe6, 0xef, 0xf4, 0xfd,
    0xc2, 0xcb, 0xd0, 0xd9, 0xae, 0xa7, 0xbc, 0xb5, 0x8a, 0x83, 0x98, 0x91,
    0x4d, 0x44, 0x5f, 0x56, 0x69, 0x60, 0x7b, 0x72, 0x05, 0x0c, 0x17, 0x1e,
    0x21, 0x28, 0x33, 0x3a, 0xdd, 0xd4, 0xcf, 0xc6, 0xf9, 0xf0, 0xeb, 0xe2,
    0x95, 0x9c, 0x87, 0x8e, 0xb1, 0xb8, 0xa3, 0xaa, 0xec, 0xe5, 0xfe, 0xf7,
    0xc8, 0xc1, 0xda, 0xd3, 0xa4, 0xad, 0xb6, 0xbf, 0x80, 0x89, 0x92, 0x9b,
    0x7c, 0x75, 0x6e, 0x67, 0x58, 0x51, 0x4a, 0x43, 0x34, 0x3d, 0x26, 0x2f,
    0x10, 0x19, 0x02, 0x0b, 0xd7, 0xde, 0xc5, 0xcc, 0xf3, 0xfa, 0xe1, 0xe8,
    0x9f, 0x96, 0x8d, 0x84, 0xbb, 0xb2, 0xa9, 0xa0, 0x47, 0x4e, 0x55, 0x5c,
    0x63, 0x6a, 0x71, 0x78, 0x0f, 0x06, 0x1d, 0x14, 0x2b, 0x22, 0x39, 0x30,
    0x9a, 0x93, 0x88, 0x81, 0xbe, 0xb7, 0xac, 0xa5, 0xd2, 0xdb, 0xc0, 0xc9,
    0xf6, 0xff, 0xe4, 0xed, 0x0a, 0x03, 0x18, 0x11, 0x2e, 0x27, 0x3c, 0x35,
    0x42, 0x4b, 0x50, 0x59, 0x66, 0x6f, 0x74, 0x7d, 0xa1, 0xa8, 0xb3, 0xba,
    0x85, 0x8c, 0x97, 0x9e, 0xe9, 0xe0, 0xfb, 0xf2, 0xcd, 0xc4, 0xdf, 0xd6,
    0x31, 0x38, 0x23, 0x2a, 0x15, 0x1c, 0x07, 0x0e, 0x79, 0x70, 0x6b, 0x62,
    0x5d, 0x54, 0x4f, 0x46
    ], //*/ G9X = Gx(9),

/*    GBX = [
    0x00, 0x0b, 0x16, 0x1d, 0x2c, 0x27, 0x3a, 0x31, 0x58, 0x53, 0x4e, 0x45,
    0x74, 0x7f, 0x62, 0x69, 0xb0, 0xbb, 0xa6, 0xad, 0x9c, 0x97, 0x8a, 0x81,
    0xe8, 0xe3, 0xfe, 0xf5, 0xc4, 0xcf, 0xd2, 0xd9, 0x7b, 0x70, 0x6d, 0x66,
    0x57, 0x5c, 0x41, 0x4a, 0x23, 0x28, 0x35, 0x3e, 0x0f, 0x04, 0x19, 0x12,
    0xcb, 0xc0, 0xdd, 0xd6, 0xe7, 0xec, 0xf1, 0xfa, 0x93, 0x98, 0x85, 0x8e,
    0xbf, 0xb4, 0xa9, 0xa2, 0xf6, 0xfd, 0xe0, 0xeb, 0xda, 0xd1, 0xcc, 0xc7,
    0xae, 0xa5, 0xb8, 0xb3, 0x82, 0x89, 0x94, 0x9f, 0x46, 0x4d, 0x50, 0x5b,
    0x6a, 0x61, 0x7c, 0x77, 0x1e, 0x15, 0x08, 0x03, 0x32, 0x39, 0x24, 0x2f,
    0x8d, 0x86, 0x9b, 0x90, 0xa1, 0xaa, 0xb7, 0xbc, 0xd5, 0xde, 0xc3, 0xc8,
    0xf9, 0xf2, 0xef, 0xe4, 0x3d, 0x36, 0x2b, 0x20, 0x11, 0x1a, 0x07, 0x0c,
    0x65, 0x6e, 0x73, 0x78, 0x49, 0x42, 0x5f, 0x54, 0xf7, 0xfc, 0xe1, 0xea,
    0xdb, 0xd0, 0xcd, 0xc6, 0xaf, 0xa4, 0xb9, 0xb2, 0x83, 0x88, 0x95, 0x9e,
    0x47, 0x4c, 0x51, 0x5a, 0x6b, 0x60, 0x7d, 0x76, 0x1f, 0x14, 0x09, 0x02,
    0x33, 0x38, 0x25, 0x2e, 0x8c, 0x87, 0x9a, 0x91, 0xa0, 0xab, 0xb6, 0xbd,
    0xd4, 0xdf, 0xc2, 0xc9, 0xf8, 0xf3, 0xee, 0xe5, 0x3c, 0x37, 0x2a, 0x21,
    0x10, 0x1b, 0x06, 0x0d, 0x64, 0x6f, 0x72, 0x79, 0x48, 0x43, 0x5e, 0x55,
    0x01, 0x0a, 0x17, 0x1c, 0x2d, 0x26, 0x3b, 0x30, 0x59, 0x52, 0x4f, 0x44,
    0x75, 0x7e, 0x63, 0x68, 0xb1, 0xba, 0xa7, 0xac, 0x9d, 0x96, 0x8b, 0x80,
    0xe9, 0xe2, 0xff, 0xf4, 0xc5, 0xce, 0xd3, 0xd8, 0x7a, 0x71, 0x6c, 0x67,
    0x56, 0x5d, 0x40, 0x4b, 0x22, 0x29, 0x34, 0x3f, 0x0e, 0x05, 0x18, 0x13,
    0xca, 0xc1, 0xdc, 0xd7, 0xe6, 0xed, 0xf0, 0xfb, 0x92, 0x99, 0x84, 0x8f,
    0xbe, 0xb5, 0xa8, 0xa3
    ], //*/ GBX = Gx(0xb),

/*
    GDX = [
    0x00, 0x0d, 0x1a, 0x17, 0x34, 0x39, 0x2e, 0x23, 0x68, 0x65, 0x72, 0x7f,
    0x5c, 0x51, 0x46, 0x4b, 0xd0, 0xdd, 0xca, 0xc7, 0xe4, 0xe9, 0xfe, 0xf3,
    0xb8, 0xb5, 0xa2, 0xaf, 0x8c, 0x81, 0x96, 0x9b, 0xbb, 0xb6, 0xa1, 0xac,
    0x8f, 0x82, 0x95, 0x98, 0xd3, 0xde, 0xc9, 0xc4, 0xe7, 0xea, 0xfd, 0xf0,
    0x6b, 0x66, 0x71, 0x7c, 0x5f, 0x52, 0x45, 0x48, 0x03, 0x0e, 0x19, 0x14,
    0x37, 0x3a, 0x2d, 0x20, 0x6d, 0x60, 0x77, 0x7a, 0x59, 0x54, 0x43, 0x4e,
    0x05, 0x08, 0x1f, 0x12, 0x31, 0x3c, 0x2b, 0x26, 0xbd, 0xb0, 0xa7, 0xaa,
    0x89, 0x84, 0x93, 0x9e, 0xd5, 0xd8, 0xcf, 0xc2, 0xe1, 0xec, 0xfb, 0xf6,
    0xd6, 0xdb, 0xcc, 0xc1, 0xe2, 0xef, 0xf8, 0xf5, 0xbe, 0xb3, 0xa4, 0xa9,
    0x8a, 0x87, 0x90, 0x9d, 0x06, 0x0b, 0x1c, 0x11, 0x32, 0x3f, 0x28, 0x25,
    0x6e, 0x63, 0x74, 0x79, 0x5a, 0x57, 0x40, 0x4d, 0xda, 0xd7, 0xc0, 0xcd,
    0xee, 0xe3, 0xf4, 0xf9, 0xb2, 0xbf, 0xa8, 0xa5, 0x86, 0x8b, 0x9c, 0x91,
    0x0a, 0x07, 0x10, 0x1d, 0x3e, 0x33, 0x24, 0x29, 0x62, 0x6f, 0x78, 0x75,
    0x56, 0x5b, 0x4c, 0x41, 0x61, 0x6c, 0x7b, 0x76, 0x55, 0x58, 0x4f, 0x42,
    0x09, 0x04, 0x13, 0x1e, 0x3d, 0x30, 0x27, 0x2a, 0xb1, 0xbc, 0xab, 0xa6,
    0x85, 0x88, 0x9f, 0x92, 0xd9, 0xd4, 0xc3, 0xce, 0xed, 0xe0, 0xf7, 0xfa,
    0xb7, 0xba, 0xad, 0xa0, 0x83, 0x8e, 0x99, 0x94, 0xdf, 0xd2, 0xc5, 0xc8,
    0xeb, 0xe6, 0xf1, 0xfc, 0x67, 0x6a, 0x7d, 0x70, 0x53, 0x5e, 0x49, 0x44,
    0x0f, 0x02, 0x15, 0x18, 0x3b, 0x36, 0x21, 0x2c, 0x0c, 0x01, 0x16, 0x1b,
    0x38, 0x35, 0x22, 0x2f, 0x64, 0x69, 0x7e, 0x73, 0x50, 0x5d, 0x4a, 0x47,
    0xdc, 0xd1, 0xc6, 0xcb, 0xe8, 0xe5, 0xf2, 0xff, 0xb4, 0xb9, 0xae, 0xa3,
    0x80, 0x8d, 0x9a, 0x97
    ], //*/ GDX = Gx(0xd),

/*
    GEX = [
    0x00, 0x0e, 0x1c, 0x12, 0x38, 0x36, 0x24, 0x2a, 0x70, 0x7e, 0x6c, 0x62,
    0x48, 0x46, 0x54, 0x5a, 0xe0, 0xee, 0xfc, 0xf2, 0xd8, 0xd6, 0xc4, 0xca,
    0x90, 0x9e, 0x8c, 0x82, 0xa8, 0xa6, 0xb4, 0xba, 0xdb, 0xd5, 0xc7, 0xc9,
    0xe3, 0xed, 0xff, 0xf1, 0xab, 0xa5, 0xb7, 0xb9, 0x93, 0x9d, 0x8f, 0x81,
    0x3b, 0x35, 0x27, 0x29, 0x03, 0x0d, 0x1f, 0x11, 0x4b, 0x45, 0x57, 0x59,
    0x73, 0x7d, 0x6f, 0x61, 0xad, 0xa3, 0xb1, 0xbf, 0x95, 0x9b, 0x89, 0x87,
    0xdd, 0xd3, 0xc1, 0xcf, 0xe5, 0xeb, 0xf9, 0xf7, 0x4d, 0x43, 0x51, 0x5f,
    0x75, 0x7b, 0x69, 0x67, 0x3d, 0x33, 0x21, 0x2f, 0x05, 0x0b, 0x19, 0x17,
    0x76, 0x78, 0x6a, 0x64, 0x4e, 0x40, 0x52, 0x5c, 0x06, 0x08, 0x1a, 0x14,
    0x3e, 0x30, 0x22, 0x2c, 0x96, 0x98, 0x8a, 0x84, 0xae, 0xa0, 0xb2, 0xbc,
    0xe6, 0xe8, 0xfa, 0xf4, 0xde, 0xd0, 0xc2, 0xcc, 0x41, 0x4f, 0x5d, 0x53,
    0x79, 0x77, 0x65, 0x6b, 0x31, 0x3f, 0x2d, 0x23, 0x09, 0x07, 0x15, 0x1b,
    0xa1, 0xaf, 0xbd, 0xb3, 0x99, 0x97, 0x85, 0x8b, 0xd1, 0xdf, 0xcd, 0xc3,
    0xe9, 0xe7, 0xf5, 0xfb, 0x9a, 0x94, 0x86, 0x88, 0xa2, 0xac, 0xbe, 0xb0,
    0xea, 0xe4, 0xf6, 0xf8, 0xd2, 0xdc, 0xce, 0xc0, 0x7a, 0x74, 0x66, 0x68,
    0x42, 0x4c, 0x5e, 0x50, 0x0a, 0x04, 0x16, 0x18, 0x32, 0x3c, 0x2e, 0x20,
    0xec, 0xe2, 0xf0, 0xfe, 0xd4, 0xda, 0xc8, 0xc6, 0x9c, 0x92, 0x80, 0x8e,
    0xa4, 0xaa, 0xb8, 0xb6, 0x0c, 0x02, 0x10, 0x1e, 0x34, 0x3a, 0x28, 0x26,
    0x7c, 0x72, 0x60, 0x6e, 0x44, 0x4a, 0x58, 0x56, 0x37, 0x39, 0x2b, 0x25,
    0x0f, 0x01, 0x13, 0x1d, 0x47, 0x49, 0x5b, 0x55, 0x7f, 0x71, 0x63, 0x6d,
    0xd7, 0xd9, 0xcb, 0xc5, 0xef, 0xe1, 0xf3, 0xfd, 0xa7, 0xa9, 0xbb, 0xb5,
    0x9f, 0x91, 0x83, 0x8d
    ], //*/ GEX = Gx(0xe),

    enc = function(string, pass, binary) {
        // string, password in plaintext
        var salt = randArr(8),
        pbe = openSSLKey(s2a(pass, binary), salt),
        key = pbe.key,
        iv = pbe.iv,
        cipherBlocks,
        saltBlock = [[83, 97, 108, 116, 101, 100, 95, 95].concat(salt)];
        string = s2a(string, binary);
        cipherBlocks = rawEncrypt(string, key, iv);
        // Spells out 'Salted__'
        cipherBlocks = saltBlock.concat(cipherBlocks);
        return Base64.encode(cipherBlocks);
    },

    dec = function(string, pass, binary) {
        // string, password in plaintext
        var cryptArr = Base64.decode(string),
        salt = cryptArr.slice(8, 16),
        pbe = openSSLKey(s2a(pass, binary), salt),
        key = pbe.key,
        iv = pbe.iv;
        cryptArr = cryptArr.slice(16, cryptArr.length);
        // Take off the Salted__ffeeddcc
        string = rawDecrypt(cryptArr, key, iv, binary);
        return string;
    },

    MD5 = function(numArr) {

        function rotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function addUnsigned(lX, lY) {
            var lX4,
            lY4,
            lX8,
            lY8,
            lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function f(x, y, z) {
            return (x & y) | ((~x) & z);
        }
        function g(x, y, z) {
            return (x & z) | (y & (~z));
        }
        function h(x, y, z) {
            return (x ^ y ^ z);
        }
        function funcI(x, y, z) {
            return (y ^ (x | (~z)));
        }

        function ff(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function gg(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function hh(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function ii(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(funcI(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function convertToWordArray(numArr) {
            var lWordCount,
            lMessageLength = numArr.length,
            lNumberOfWords_temp1 = lMessageLength + 8,
            lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64,
            lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16,
            lWordArray = [],
            lBytePosition = 0,
            lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (numArr[lByteCount] << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }

        function wordToHex(lValue) {
            var lByte,
            lCount,
            wordToHexArr = [];
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                wordToHexArr = wordToHexArr.concat(lByte);
             }
            return wordToHexArr;
        }

        /*function utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "",
            n,
            c;

            for (n = 0; n < string.length; n++) {

                c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        }*/

        var x = [],
        k,
        AA,
        BB,
        CC,
        DD,
        a,
        b,
        c,
        d,
        rnd = strhex('67452301efcdab8998badcfe10325476d76aa478e8c7b756242070dbc1bdceeef57c0faf4787c62aa8304613fd469501698098d88b44f7afffff5bb1895cd7be6b901122fd987193a679438e49b40821f61e2562c040b340265e5a51e9b6c7aad62f105d02441453d8a1e681e7d3fbc821e1cde6c33707d6f4d50d87455a14eda9e3e905fcefa3f8676f02d98d2a4c8afffa39428771f6816d9d6122fde5380ca4beea444bdecfa9f6bb4b60bebfbc70289b7ec6eaa127fad4ef308504881d05d9d4d039e6db99e51fa27cf8c4ac5665f4292244432aff97ab9423a7fc93a039655b59c38f0ccc92ffeff47d85845dd16fa87e4ffe2ce6e0a30143144e0811a1f7537e82bd3af2352ad7d2bbeb86d391',8);

        x = convertToWordArray(numArr);

        a = rnd[0];
        b = rnd[1];
        c = rnd[2];
        d = rnd[3]

        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = ff(a, b, c, d, x[k + 0], 7, rnd[4]);
            d = ff(d, a, b, c, x[k + 1], 12, rnd[5]);
            c = ff(c, d, a, b, x[k + 2], 17, rnd[6]);
            b = ff(b, c, d, a, x[k + 3], 22, rnd[7]);
            a = ff(a, b, c, d, x[k + 4], 7, rnd[8]);
            d = ff(d, a, b, c, x[k + 5], 12, rnd[9]);
            c = ff(c, d, a, b, x[k + 6], 17, rnd[10]);
            b = ff(b, c, d, a, x[k + 7], 22, rnd[11]);
            a = ff(a, b, c, d, x[k + 8], 7, rnd[12]);
            d = ff(d, a, b, c, x[k + 9], 12, rnd[13]);
            c = ff(c, d, a, b, x[k + 10], 17, rnd[14]);
            b = ff(b, c, d, a, x[k + 11], 22, rnd[15]);
            a = ff(a, b, c, d, x[k + 12], 7, rnd[16]);
            d = ff(d, a, b, c, x[k + 13], 12, rnd[17]);
            c = ff(c, d, a, b, x[k + 14], 17, rnd[18]);
            b = ff(b, c, d, a, x[k + 15], 22, rnd[19]);
            a = gg(a, b, c, d, x[k + 1], 5, rnd[20]);
            d = gg(d, a, b, c, x[k + 6], 9, rnd[21]);
            c = gg(c, d, a, b, x[k + 11], 14, rnd[22]);
            b = gg(b, c, d, a, x[k + 0], 20, rnd[23]);
            a = gg(a, b, c, d, x[k + 5], 5, rnd[24]);
            d = gg(d, a, b, c, x[k + 10], 9, rnd[25]);
            c = gg(c, d, a, b, x[k + 15], 14, rnd[26]);
            b = gg(b, c, d, a, x[k + 4], 20, rnd[27]);
            a = gg(a, b, c, d, x[k + 9], 5, rnd[28]);
            d = gg(d, a, b, c, x[k + 14], 9, rnd[29]);
            c = gg(c, d, a, b, x[k + 3], 14, rnd[30]);
            b = gg(b, c, d, a, x[k + 8], 20, rnd[31]);
            a = gg(a, b, c, d, x[k + 13], 5, rnd[32]);
            d = gg(d, a, b, c, x[k + 2], 9, rnd[33]);
            c = gg(c, d, a, b, x[k + 7], 14, rnd[34]);
            b = gg(b, c, d, a, x[k + 12], 20, rnd[35]);
            a = hh(a, b, c, d, x[k + 5], 4, rnd[36]);
            d = hh(d, a, b, c, x[k + 8], 11, rnd[37]);
            c = hh(c, d, a, b, x[k + 11], 16, rnd[38]);
            b = hh(b, c, d, a, x[k + 14], 23, rnd[39]);
            a = hh(a, b, c, d, x[k + 1], 4, rnd[40]);
            d = hh(d, a, b, c, x[k + 4], 11, rnd[41]);
            c = hh(c, d, a, b, x[k + 7], 16, rnd[42]);
            b = hh(b, c, d, a, x[k + 10], 23, rnd[43]);
            a = hh(a, b, c, d, x[k + 13], 4, rnd[44]);
            d = hh(d, a, b, c, x[k + 0], 11, rnd[45]);
            c = hh(c, d, a, b, x[k + 3], 16, rnd[46]);
            b = hh(b, c, d, a, x[k + 6], 23, rnd[47]);
            a = hh(a, b, c, d, x[k + 9], 4, rnd[48]);
            d = hh(d, a, b, c, x[k + 12], 11, rnd[49]);
            c = hh(c, d, a, b, x[k + 15], 16, rnd[50]);
            b = hh(b, c, d, a, x[k + 2], 23, rnd[51]);
            a = ii(a, b, c, d, x[k + 0], 6, rnd[52]);
            d = ii(d, a, b, c, x[k + 7], 10, rnd[53]);
            c = ii(c, d, a, b, x[k + 14], 15, rnd[54]);
            b = ii(b, c, d, a, x[k + 5], 21, rnd[55]);
            a = ii(a, b, c, d, x[k + 12], 6, rnd[56]);
            d = ii(d, a, b, c, x[k + 3], 10, rnd[57]);
            c = ii(c, d, a, b, x[k + 10], 15, rnd[58]);
            b = ii(b, c, d, a, x[k + 1], 21, rnd[59]);
            a = ii(a, b, c, d, x[k + 8], 6, rnd[60]);
            d = ii(d, a, b, c, x[k + 15], 10, rnd[61]);
            c = ii(c, d, a, b, x[k + 6], 15, rnd[62]);
            b = ii(b, c, d, a, x[k + 13], 21, rnd[63]);
            a = ii(a, b, c, d, x[k + 4], 6, rnd[64]);
            d = ii(d, a, b, c, x[k + 11], 10, rnd[65]);
            c = ii(c, d, a, b, x[k + 2], 15, rnd[66]);
            b = ii(b, c, d, a, x[k + 9], 21, rnd[67]);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }

        return wordToHex(a).concat(wordToHex(b), wordToHex(c), wordToHex(d));
    },

    encString = function(plaintext, key, iv) {
        plaintext = s2a(plaintext);

        key = s2a(key);
        for (var i=key.length; i<32; i++)
            key[i] = 0;

        if (iv == null) {
            iv = genIV();
        } else {
            iv = s2a(iv);
            for (var i=iv.length; i<16; i++)
                iv[i] = 0;
        }

        var ct = rawEncrypt(plaintext, key, iv);
        var ret = [iv];
        for (var i=0; i<ct.length; i++)
            ret[ret.length] = ct[i];
        return Base64.encode(ret);
    },

    decString = function(ciphertext, key) {
        var tmp = Base64.decode(ciphertext);
        var iv = tmp.slice(0, 16);
        var ct = tmp.slice(16, tmp.length);

        key = s2a(key);
        for (var i=key.length; i<32; i++)
            key[i] = 0;

        var pt = rawDecrypt(ct, key, iv, false);
        return pt;
    },

    Base64 = (function(){
        // Takes a Nx16x1 byte array and converts it to Base64
        var _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        chars = _chars.split(''),

        encode = function(b, withBreaks) {
            var flatArr = [],
            b64 = '',
            i,
            broken_b64;
            var totalChunks = Math.floor(b.length * 16 / 3);
            for (i = 0; i < b.length * 16; i++) {
                flatArr.push(b[Math.floor(i / 16)][i % 16]);
            }
            for (i = 0; i < flatArr.length; i = i + 3) {
                b64 += chars[flatArr[i] >> 2];
                b64 += chars[((flatArr[i] & 3) << 4) | (flatArr[i + 1] >> 4)];
                if (! (flatArr[i + 1] === undefined)) {
                    b64 += chars[((flatArr[i + 1] & 15) << 2) | (flatArr[i + 2] >> 6)];
                } else {
                    b64 += '=';
                }
                if (! (flatArr[i + 2] === undefined)) {
                    b64 += chars[flatArr[i + 2] & 63];
                } else {
                    b64 += '=';
                }
            }
            // OpenSSL is super particular about line breaks
            broken_b64 = b64.slice(0, 64); // + '\n';
            for (i = 1; i < (Math['ceil'](b64.length / 64)); i++) {
                broken_b64 += b64.slice(i * 64, i * 64 + 64) + (Math.ceil(b64.length / 64) == i + 1 ? '': '\n');
            }
            return broken_b64;
        },

        decode = function(string) {
            string = string['replace'](/\n/g, '');
            var flatArr = [],
            c = [],
            b = [],
            i;
            for (i = 0; i < string.length; i = i + 4) {
                c[0] = _chars.indexOf(string.charAt(i));
                c[1] = _chars.indexOf(string.charAt(i + 1));
                c[2] = _chars.indexOf(string.charAt(i + 2));
                c[3] = _chars.indexOf(string.charAt(i + 3));

                b[0] = (c[0] << 2) | (c[1] >> 4);
                b[1] = ((c[1] & 15) << 4) | (c[2] >> 2);
                b[2] = ((c[2] & 3) << 6) | c[3];
                flatArr.push(b[0], b[1], b[2]);
            }
            flatArr = flatArr.slice(0, flatArr.length - (flatArr.length % 16));
            return flatArr;
        };

        //internet explorer
        if(typeof Array.indexOf === "function") {
            _chars = chars;
        }

        /*
        //other way to solve internet explorer problem
        if(!Array.indexOf){
            Array.prototype.indexOf = function(obj){
                for(var i=0; i<this.length; i++){
                    if(this[i]===obj){
                        return i;
                    }
                }
                return -1;
            }
        }
        */


        return {
            "encode": encode,
            "decode": decode
        };
    })();

    return {
        "size": size,
        "h2a":h2a,
        "expandKey":expandKey,
        "encryptBlock":encryptBlock,
        "decryptBlock":decryptBlock,
        "Decrypt":Decrypt,
        "s2a":s2a,
        "rawEncrypt":rawEncrypt,
        "rawDecrypt":rawDecrypt,
        "dec":dec,
        "openSSLKey":openSSLKey,
        "a2h":a2h,
        "enc":enc,
        "Hash":{"MD5":MD5},
        "Base64":Base64
    };

})();

function crypto_obj (){


function SHA256(s) {

    var chrsz = 8;
    var hexcase = 0;

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S(X, n) {
        return ( X >>> n ) | (X << (32 - n));
    }

    function R(X, n) {
        return ( X >>> n );
    }

    function Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z));
    }

    function Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    }

    function Sigma0256(x) {
        return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
    }

    function Sigma1256(x) {
        return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
    }

    function Gamma0256(x) {
        return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
    }

    function Gamma1256(x) {
        return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
    }

    function core_sha256(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string['replace'](/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string['length']; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8  )) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
    var crypto = CRYPTO;
    crypto['size'](256);

    var cipher_key = "";
    var iv = crypto['s2a']("0123456789012345");

    return {

        'encrypt' : function(data, key) {
            if (!key) return data;
            var cipher_key = crypto['s2a'](SHA256(key)['slice'](0,32));
            var hex_message = crypto['s2a'](JSON['stringify'](data));
            var encryptedHexArray = crypto['rawEncrypt'](hex_message, cipher_key, iv);
            var base_64_encrypted = crypto['Base64']['encode'](encryptedHexArray);
            return base_64_encrypted || data;
        } ,

        'decrypt' : function(data, key) {
            if (!key) return data;
            var cipher_key = crypto['s2a'](SHA256(key)['slice'](0,32));
            try {
                var binary_enc = crypto['Base64']['decode'](data);
                var json_plain = crypto['rawDecrypt'](binary_enc, cipher_key, iv, false);
                var plaintext = JSON['parse'](json_plain);
                return plaintext;
            }
            catch (e) {
                return undefined;
            }
        }
    };
}
/* =-====================================================================-= */
/* =-====================================================================-= */
/* =-=========================     UTIL     =============================-= */
/* =-====================================================================-= */
/* =-====================================================================-= */

window['PUBNUB'] || (function() {

/**
 * UTIL LOCALS
 */

var SWF             = 'https://pubnub.a.ssl.fastly.net/pubnub.swf'
,   ASYNC           = 'async'
,   UA              = navigator.userAgent
,   PNSDK           = 'PubNub-JS-' + 'Web' + '/' + '3.7.8'
,   XORIGN          = UA.indexOf('MSIE 6') == -1;

/**
 * CONSOLE COMPATIBILITY
 */
window.console || (window.console=window.console||{});
console.log    || (
    console.log   =
    console.error =
    ((window.opera||{}).postError||function(){})
);

/**
 * LOCAL STORAGE OR COOKIE
 */
var db = (function(){
    var store = {};
    var ls = false;
    try {
        ls = window['localStorage'];
    } catch (e) { }
    var cookieGet = function(key) {
        if (document.cookie.indexOf(key) == -1) return null;
        return ((document.cookie||'').match(
            RegExp(key+'=([^;]+)')
        )||[])[1] || null;
    };
    var cookieSet = function( key, value ) {
        document.cookie = key + '=' + value +
            '; expires=Thu, 1 Aug 2030 20:00:00 UTC; path=/';
    };
    var cookieTest = (function() {
        try {
            cookieSet('pnctest', '1');
            return cookieGet('pnctest') === '1';
        } catch (e) {
            return false;
        }
    }());
    return {
        'get' : function(key) {
            try {
                if (ls) return ls.getItem(key);
                if (cookieTest) return cookieGet(key);
                return store[key];
            } catch(e) {
                return store[key];
            }
        },
        'set' : function( key, value ) {
            try {
                if (ls) return ls.setItem( key, value ) && 0;
                if (cookieTest) cookieSet( key, value );
                store[key] = value;
            } catch(e) {
                store[key] = value;
            }
        }
    };
})();

function get_hmac_SHA256(data,key) {
    var hash = CryptoJS['HmacSHA256'](data, key);
    return hash.toString(CryptoJS['enc']['Base64']);
}

/**
 * $
 * =
 * var div = $('divid');
 */
function $(id) { return document.getElementById(id) }

/**
 * ERROR
 * =====
 * error('message');
 */
function error(message) { console['error'](message) }

/**
 * SEARCH
 * ======
 * var elements = search('a div span');
 */
function search( elements, start) {
    var list = [];
    each( elements.split(/\s+/), function(el) {
        each( (start || document).getElementsByTagName(el), function(node) {
            list.push(node);
        } );
    });
    return list;
}

/**
 * BIND
 * ====
 * bind( 'keydown', search('a')[0], function(element) {
 *     ...
 * } );
 */
function bind( type, el, fun ) {
    each( type.split(','), function(etype) {
        var rapfun = function(e) {
            if (!e) e = window.event;
            if (!fun(e)) {
                e.cancelBubble = true;
                e.preventDefault  && e.preventDefault();
                e.stopPropagation && e.stopPropagation();
            }
        };

        if ( el.addEventListener ) el.addEventListener( etype, rapfun, false );
        else if ( el.attachEvent ) el.attachEvent( 'on' + etype, rapfun );
        else  el[ 'on' + etype ] = rapfun;
    } );
}

/**
 * UNBIND
 * ======
 * unbind( 'keydown', search('a')[0] );
 */
function unbind( type, el, fun ) {
    if ( el.removeEventListener ) el.removeEventListener( type, false );
    else if ( el.detachEvent ) el.detachEvent( 'on' + type, false );
    else  el[ 'on' + type ] = null;
}

/**
 * HEAD
 * ====
 * head().appendChild(elm);
 */
function head() { return search('head')[0] }

/**
 * ATTR
 * ====
 * var attribute = attr( node, 'attribute' );
 */
function attr( node, attribute, value ) {
    if (value) node.setAttribute( attribute, value );
    else return node && node.getAttribute && node.getAttribute(attribute);
}

/**
 * CSS
 * ===
 * var obj = create('div');
 */
function css( element, styles ) {
    for (var style in styles) if (styles.hasOwnProperty(style))
        try {element.style[style] = styles[style] + (
            '|width|height|top|left|'.indexOf(style) > 0 &&
            typeof styles[style] == 'number'
            ? 'px' : ''
        )}catch(e){}
}

/**
 * CREATE
 * ======
 * var obj = create('div');
 */
function create(element) { return document.createElement(element) }


/**
 * jsonp_cb
 * ========
 * var callback = jsonp_cb();
 */
function jsonp_cb() { return XORIGN || FDomainRequest() ? 0 : unique() }



/**
 * EVENTS
 * ======
 * PUBNUB.events.bind( 'you-stepped-on-flower', function(message) {
 *     // Do Stuff with message
 * } );
 *
 * PUBNUB.events.fire( 'you-stepped-on-flower', "message-data" );
 * PUBNUB.events.fire( 'you-stepped-on-flower', {message:"data"} );
 * PUBNUB.events.fire( 'you-stepped-on-flower', [1,2,3] );
 *
 */
var events = {
    'list'   : {},
    'unbind' : function( name ) { events.list[name] = [] },
    'bind'   : function( name, fun ) {
        (events.list[name] = events.list[name] || []).push(fun);
    },
    'fire' : function( name, data ) {
        each(
            events.list[name] || [],
            function(fun) { fun(data) }
        );
    }
};

/**
 * XDR Cross Domain Request
 * ========================
 *  xdr({
 *     url     : ['http://www.blah.com/url'],
 *     success : function(response) {},
 *     fail    : function() {}
 *  });
 */
function xdr( setup ) {
    if (XORIGN || FDomainRequest()) return ajax(setup);

    var script    = create('script')
    ,   callback  = setup.callback
    ,   id        = unique()
    ,   finished  = 0
    ,   xhrtme    = setup.timeout || DEF_TIMEOUT
    ,   timer     = timeout( function(){done(1, {"message" : "timeout"})}, xhrtme )
    ,   fail      = setup.fail    || function(){}
    ,   data      = setup.data    || {}
    ,   success   = setup.success || function(){}
    ,   append    = function() { head().appendChild(script) }
    ,   done      = function( failed, response ) {
            if (finished) return;
            finished = 1;

            script.onerror = null;
            clearTimeout(timer);

            (failed || !response) || success(response);

            timeout( function() {
                failed && fail();
                var s = $(id)
                ,   p = s && s.parentNode;
                p && p.removeChild(s);
            }, SECOND );
        };

    window[callback] = function(response) {
        done( 0, response );
    };

    if (!setup.blocking) script[ASYNC] = ASYNC;

    script.onerror = function() { done(1) };
    script.src     = build_url( setup.url, data );

    attr( script, 'id', id );

    append();
    return done;
}

/**
 * CORS XHR Request
 * ================
 *  xdr({
 *     url     : ['http://www.blah.com/url'],
 *     success : function(response) {},
 *     fail    : function() {}
 *  });
 */
function ajax( setup ) {
    var xhr, response
    ,   finished = function() {
            if (loaded) return;
            loaded = 1;

            clearTimeout(timer);

            try       { response = JSON['parse'](xhr.responseText); }
            catch (r) { return done(1); }

            complete = 1;
            success(response);
        }
    ,   complete = 0
    ,   loaded   = 0
    ,   xhrtme   = setup.timeout || DEF_TIMEOUT
    ,   timer    = timeout( function(){done(1, {"message" : "timeout"})}, xhrtme )
    ,   fail     = setup.fail    || function(){}
    ,   data     = setup.data    || {}
    ,   success  = setup.success || function(){}
    ,   async    = !(setup.blocking)
    ,   done     = function(failed,response) {
            if (complete) return;
            complete = 1;

            clearTimeout(timer);

            if (xhr) {
                xhr.onerror = xhr.onload = null;
                xhr.abort && xhr.abort();
                xhr = null;
            }

            failed && fail(response);
        };

    // Send
    try {
        xhr = FDomainRequest()      ||
              window.XDomainRequest &&
              new XDomainRequest()  ||
              new XMLHttpRequest();

        xhr.onerror = xhr.onabort   = function(){ done(
            1, xhr.responseText || { "error" : "Network Connection Error"}
        ) };
        xhr.onload  = xhr.onloadend = finished;
        xhr.onreadystatechange = function() {
            if (xhr && xhr.readyState == 4) {
                switch(xhr.status) {
                    case 401:
                    case 402:
                    case 403:
                        try {
                            response = JSON['parse'](xhr.responseText);
                            done(1,response);
                        }
                        catch (r) { return done(1, xhr.responseText); }
                        break;
                    default:
                        break;
                }
            }
        }

        var url = build_url(setup.url,data);

        xhr.open( 'GET', url, async );
        if (async) xhr.timeout = xhrtme;
        xhr.send();
    }
    catch(eee) {
        done(0);
        XORIGN = 0;
        return xdr(setup);
    }

    // Return 'done'
    return done;
}

// Test Connection State
function _is_online() {
    if (!('onLine' in navigator)) return 1;
    try       { return navigator['onLine'] }
    catch (e) { return true }
}

/* =-====================================================================-= */
/* =-====================================================================-= */
/* =-=========================     PUBNUB     ===========================-= */
/* =-====================================================================-= */
/* =-====================================================================-= */

var PDIV          = $('pubnub') || 0
,   CREATE_PUBNUB = function(setup) {

    // Force JSONP if requested from user.
    if (setup['jsonp'])  XORIGN = 0;
    else                 XORIGN = UA.indexOf('MSIE 6') == -1;

    var SUBSCRIBE_KEY = setup['subscribe_key'] || ''
    ,   KEEPALIVE     = (+setup['keepalive']   || DEF_KEEPALIVE)   * SECOND
    ,   UUID          = setup['uuid'] || db['get'](SUBSCRIBE_KEY+'uuid')||'';

    var leave_on_unload = setup['leave_on_unload'] || 0;

    setup['xdr']        = xdr;
    setup['db']         = db;
    setup['error']      = setup['error'] || error;
    setup['_is_online'] = _is_online;
    setup['jsonp_cb']   = jsonp_cb;
    setup['hmac_SHA256']= get_hmac_SHA256;
    setup['crypto_obj'] = crypto_obj();
    setup['params']     = { 'pnsdk' : PNSDK }

    var SELF = function(setup) {
        return CREATE_PUBNUB(setup);
    };

    var PN = PN_API(setup);

    for (var prop in PN) {
        if (PN.hasOwnProperty(prop)) {
            SELF[prop] = PN[prop];
        }
    }
    SELF['css']         = css;
    SELF['$']           = $;
    SELF['create']      = create;
    SELF['bind']        = bind;
    SELF['head']        = head;
    SELF['search']      = search;
    SELF['attr']        = attr;
    SELF['events']      = events;
    SELF['init']        = SELF;
    SELF['secure']      = SELF;


    // Add Leave Functions
    bind( 'beforeunload', window, function() {
        if (leave_on_unload) SELF['each-channel'](function(ch){ SELF['LEAVE']( ch.name, 0 ) });
        return true;
    } );

    // Return without Testing
    if (setup['notest']) return SELF;

    bind( 'offline', window,   SELF['offline'] );
    bind( 'offline', document, SELF['offline'] );

    // Return PUBNUB Socket Object
    return SELF;
};
CREATE_PUBNUB['init']   = CREATE_PUBNUB;
CREATE_PUBNUB['secure'] = CREATE_PUBNUB;

// Bind for PUBNUB Readiness to Subscribe
if (document.readyState === 'complete') {
    timeout( ready, 0 );
}
else {
    bind( 'load', window, function(){ timeout( ready, 0 ) } );
}

var pdiv = PDIV || {};

// CREATE A PUBNUB GLOBAL OBJECT
PUBNUB = CREATE_PUBNUB({
    'notest'        : 1,
    'publish_key'   : attr( pdiv, 'pub-key' ),
    'subscribe_key' : attr( pdiv, 'sub-key' ),
    'ssl'           : !document.location.href.indexOf('https') ||
                      attr( pdiv, 'ssl' ) == 'on',
    'origin'        : attr( pdiv, 'origin' ),
    'uuid'          : attr( pdiv, 'uuid' )
});

// jQuery Interface
window['jQuery'] && (window['jQuery']['PUBNUB'] = CREATE_PUBNUB);

// For Modern JS + Testling.js - http://testling.com/
typeof(module) !== 'undefined' && (module['exports'] = PUBNUB) && ready();

var pubnubs = $('pubnubs') || 0;

// LEAVE NOW IF NO PDIV.
if (!PDIV) return;

// PUBNUB Flash Socket
css( PDIV, { 'position' : 'absolute', 'top' : -SECOND } );

if ('opera' in window || attr( PDIV, 'flash' )) PDIV['innerHTML'] =
    '<object id=pubnubs data='  + SWF +
    '><param name=movie value=' + SWF +
    '><param name=allowscriptaccess value=always></object>';

// Create Interface for Opera Flash
PUBNUB['rdx'] = function( id, data ) {
    if (!data) return FDomainRequest[id]['onerror']();
    FDomainRequest[id]['responseText'] = unescape(data);
    FDomainRequest[id]['onload']();
};

function FDomainRequest() {
    if (!pubnubs || !pubnubs['get']) return 0;

    var fdomainrequest = {
        'id'    : FDomainRequest['id']++,
        'send'  : function() {},
        'abort' : function() { fdomainrequest['id'] = {} },
        'open'  : function( method, url ) {
            FDomainRequest[fdomainrequest['id']] = fdomainrequest;
            pubnubs['get']( fdomainrequest['id'], url );
        }
    };

    return fdomainrequest;
}
FDomainRequest['id'] = SECOND;

})();
(function(){

// ---------------------------------------------------------------------------
// WEBSOCKET INTERFACE
// ---------------------------------------------------------------------------
var WS = PUBNUB['ws'] = function( url, protocols ) {
    if (!(this instanceof WS)) return new WS( url, protocols );

    var self     = this
    ,   url      = self.url      = url || ''
    ,   protocol = self.protocol = protocols || 'Sec-WebSocket-Protocol'
    ,   bits     = url.split('/')
    ,   setup    = {
         'ssl'           : bits[0] === 'wss:'
        ,'origin'        : bits[2]
        ,'publish_key'   : bits[3]
        ,'subscribe_key' : bits[4]
        ,'channel'       : bits[5]
    };

    // READY STATES
    self['CONNECTING'] = 0; // The connection is not yet open.
    self['OPEN']       = 1; // The connection is open and ready to communicate.
    self['CLOSING']    = 2; // The connection is in the process of closing.
    self['CLOSED']     = 3; // The connection is closed or couldn't be opened.

    // CLOSE STATES
    self['CLOSE_NORMAL']         = 1000; // Normal Intended Close; completed.
    self['CLOSE_GOING_AWAY']     = 1001; // Closed Unexpecttedly.
    self['CLOSE_PROTOCOL_ERROR'] = 1002; // Server: Not Supported.
    self['CLOSE_UNSUPPORTED']    = 1003; // Server: Unsupported Protocol.
    self['CLOSE_TOO_LARGE']      = 1004; // Server: Too Much Data.
    self['CLOSE_NO_STATUS']      = 1005; // Server: No reason.
    self['CLOSE_ABNORMAL']       = 1006; // Abnormal Disconnect.

    // Events Default
    self['onclose']   = self['onerror'] =
    self['onmessage'] = self['onopen']  =
    self['onsend']    =  function(){};

    // Attributes
    self['binaryType']     = '';
    self['extensions']     = '';
    self['bufferedAmount'] = 0;
    self['trasnmitting']   = false;
    self['buffer']         = [];
    self['readyState']     = self['CONNECTING'];

    // Close if no setup.
    if (!url) {
        self['readyState'] = self['CLOSED'];
        self['onclose']({
            'code'     : self['CLOSE_ABNORMAL'],
            'reason'   : 'Missing URL',
            'wasClean' : true
        });
        return self;
    }

    // PubNub WebSocket Emulation
    self.pubnub       = PUBNUB['init'](setup);
    self.pubnub.setup = setup;
    self.setup        = setup;

    self.pubnub['subscribe']({
        'restore'    : false,
        'channel'    : setup['channel'],
        'disconnect' : self['onerror'],
        'reconnect'  : self['onopen'],
        'error'      : function() {
            self['onclose']({
                'code'     : self['CLOSE_ABNORMAL'],
                'reason'   : 'Missing URL',
                'wasClean' : false
            });
        },
        'callback'   : function(message) {
            self['onmessage']({ 'data' : message });
        },
        'connect'    : function() {
            self['readyState'] = self['OPEN'];
            self['onopen']();
        }
    });
};

// ---------------------------------------------------------------------------
// WEBSOCKET SEND
// ---------------------------------------------------------------------------
WS.prototype.send = function(data) {
    var self = this;
    self.pubnub['publish']({
        'channel'  : self.pubnub.setup['channel'],
        'message'  : data,
        'callback' : function(response) {
            self['onsend']({ 'data' : response });
        }
    });
};

// ---------------------------------------------------------------------------
// WEBSOCKET CLOSE
// ---------------------------------------------------------------------------
WS.prototype.close = function() {
    var self = this;
    self.pubnub['unsubscribe']({ 'channel' : self.pubnub.setup['channel'] });
    self['readyState'] = self['CLOSED'];
    self['onclose']({});
};

})();
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,s){var f={},g=f.lib={},q=function(){},m=g.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=g.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=f.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
2),16)<<24-4*(b%8);return new r.init(d,c/2)}},n=l.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(d,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},
u=g.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);c.sigBytes-=b}return new r.init(g,b)},clone:function(){var a=m.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});g.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new t.HMAC.init(a,
d)).finalize(c)}}});var t=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,g=f.WordArray,q=f.Hasher,f=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],f=f.SHA256=q.extend({_doReset:function(){this._hash=new g.init(m.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],g=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
c[d+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&g^f&g);q=n;n=m;m=h;h=j+k|0;j=g;g=f;f=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+g|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(f);s.HmacSHA256=q._createHmacHelper(f)})(Math);
(function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(f,g){f=this._hasher=new f.init;"string"==typeof g&&(g=s.parse(g));var h=f.blockSize,m=4*h;g.sigBytes>m&&(g=f.finalize(g));g.clamp();for(var r=this._oKey=g.clone(),l=this._iKey=g.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
this._hasher;f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
