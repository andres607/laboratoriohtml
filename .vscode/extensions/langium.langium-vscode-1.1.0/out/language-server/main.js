"use strict";var _$=Object.create;var Pu=Object.defineProperty;var T$=Object.getOwnPropertyDescriptor;var R$=Object.getOwnPropertyNames,jR=Object.getOwnPropertySymbols,b$=Object.getPrototypeOf,GR=Object.prototype.hasOwnProperty,A$=Object.prototype.propertyIsEnumerable;var UR=(t,e,r)=>e in t?Pu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,HR=(t,e)=>{for(var r in e||={})GR.call(e,r)&&UR(t,r,e[r]);if(jR)for(var r of jR(e))A$.call(e,r)&&UR(t,r,e[r]);return t};var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),P$=(t,e)=>{for(var r in e)Pu(t,r,{get:e[r],enumerable:!0})},WR=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of R$(e))!GR.call(t,i)&&i!==r&&Pu(t,i,{get:()=>e[i],enumerable:!(n=T$(e,i))||n.enumerable});return t};var hi=(t,e,r)=>(r=t!=null?_$(b$(t)):{},WR(e||!t||!t.__esModule?Pu(r,"default",{value:t,enumerable:!0}):r,t)),S$=t=>WR(Pu({},"__esModule",{value:!0}),t);var dl=d(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.thenable=Rt.typedArray=Rt.stringArray=Rt.array=Rt.func=Rt.error=Rt.number=Rt.string=Rt.boolean=void 0;function C$(t){return t===!0||t===!1}Rt.boolean=C$;function BR(t){return typeof t=="string"||t instanceof String}Rt.string=BR;function E$(t){return typeof t=="number"||t instanceof Number}Rt.number=E$;function N$(t){return t instanceof Error}Rt.error=N$;function KR(t){return typeof t=="function"}Rt.func=KR;function zR(t){return Array.isArray(t)}Rt.array=zR;function k$(t){return zR(t)&&t.every(e=>BR(e))}Rt.stringArray=k$;function w$(t,e){return Array.isArray(t)&&t.every(e)}Rt.typedArray=w$;function O$(t){return t&&KR(t.then)}Rt.thenable=O$});var mi=d(wh=>{"use strict";Object.defineProperty(wh,"__esModule",{value:!0});var Nh;function kh(){if(Nh===void 0)throw new Error("No runtime abstraction layer installed");return Nh}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Nh=r}t.install=e})(kh||(kh={}));wh.default=kh});var Oh=d(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.Disposable=void 0;var D$;(function(t){function e(r){return{dispose:r}}t.create=e})(D$=Su.Disposable||(Su.Disposable={}))});var VR=d(pl=>{"use strict";Object.defineProperty(pl,"__esModule",{value:!0});pl.AbstractMessageBuffer=void 0;var I$=13,x$=10,q$=`\r
`,Dh=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case I$:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case x$:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let o=this._read(i+n),a=new Map,s=this.toString(o,"ascii").split(q$);if(s.length<2)return a;for(let u=0;u<s.length-2;u++){let c=s[u],l=c.indexOf(":");if(l===-1)throw new Error("Message header must separate key and value using :");let f=c.substr(0,l),h=c.substr(l+1).trim();a.set(f,h)}return a}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],a=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,a}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let a=o.slice(0,e);r.set(a,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};pl.AbstractMessageBuffer=Dh});var JR=d(Lh=>{"use strict";Object.defineProperty(Lh,"__esModule",{value:!0});var L$=mi(),XR=require("util"),Mo=Oh(),M$=VR(),Da=class extends M$.AbstractMessageBuffer{constructor(e="utf-8"){super(e)}emptyBuffer(){return Da.emptyBuffer}fromString(e,r){return Buffer.from(e,r)}toString(e,r){return e instanceof Buffer?e.toString(r):new XR.TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e instanceof Buffer?e:Buffer.from(e):e instanceof Buffer?e.slice(0,r):Buffer.from(e,0,r)}allocNative(e){return Buffer.allocUnsafe(e)}};Da.emptyBuffer=Buffer.allocUnsafe(0);var Ih=class{constructor(e){this.stream=e}onClose(e){return this.stream.on("close",e),Mo.Disposable.create(()=>this.stream.off("close",e))}onError(e){return this.stream.on("error",e),Mo.Disposable.create(()=>this.stream.off("error",e))}onEnd(e){return this.stream.on("end",e),Mo.Disposable.create(()=>this.stream.off("end",e))}onData(e){return this.stream.on("data",e),Mo.Disposable.create(()=>this.stream.off("data",e))}},xh=class{constructor(e){this.stream=e}onClose(e){return this.stream.on("close",e),Mo.Disposable.create(()=>this.stream.off("close",e))}onError(e){return this.stream.on("error",e),Mo.Disposable.create(()=>this.stream.off("error",e))}onEnd(e){return this.stream.on("end",e),Mo.Disposable.create(()=>this.stream.off("end",e))}write(e,r){return new Promise((n,i)=>{let o=a=>{a==null?n():i(a)};typeof e=="string"?this.stream.write(e,r,o):this.stream.write(e,o)})}end(){this.stream.end()}},YR=Object.freeze({messageBuffer:Object.freeze({create:t=>new Da(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{try{return Promise.resolve(Buffer.from(JSON.stringify(t,void 0,0),e.charset))}catch(r){return Promise.reject(r)}}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{try{return t instanceof Buffer?Promise.resolve(JSON.parse(t.toString(e.charset))):Promise.resolve(JSON.parse(new XR.TextDecoder(e.charset).decode(t)))}catch(r){return Promise.reject(r)}}})}),stream:Object.freeze({asReadableStream:t=>new Ih(t),asWritableStream:t=>new xh(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setImmediate(t,...e);return{dispose:()=>clearImmediate(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function qh(){return YR}(function(t){function e(){L$.default.install(YR)}t.install=e})(qh||(qh={}));Lh.default=qh});var Ia=d(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});Zt.stringArray=Zt.array=Zt.func=Zt.error=Zt.number=Zt.string=Zt.boolean=void 0;function $$(t){return t===!0||t===!1}Zt.boolean=$$;function QR(t){return typeof t=="string"||t instanceof String}Zt.string=QR;function F$(t){return typeof t=="number"||t instanceof Number}Zt.number=F$;function j$(t){return t instanceof Error}Zt.error=j$;function U$(t){return typeof t=="function"}Zt.func=U$;function ZR(t){return Array.isArray(t)}Zt.array=ZR;function G$(t){return ZR(t)&&t.every(e=>QR(e))}Zt.stringArray=G$});var om=d(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.Message=X.NotificationType9=X.NotificationType8=X.NotificationType7=X.NotificationType6=X.NotificationType5=X.NotificationType4=X.NotificationType3=X.NotificationType2=X.NotificationType1=X.NotificationType0=X.NotificationType=X.RequestType9=X.RequestType8=X.RequestType7=X.RequestType6=X.RequestType5=X.RequestType4=X.RequestType3=X.RequestType2=X.RequestType1=X.RequestType=X.RequestType0=X.AbstractMessageSignature=X.ParameterStructures=X.ResponseError=X.ErrorCodes=void 0;var $o=Ia(),e0;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(e0=X.ErrorCodes||(X.ErrorCodes={}));var Cu=class extends Error{constructor(e,r,n){super(r),this.code=$o.number(e)?e:e0.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,Cu.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};X.ResponseError=Cu;var Lt=class{constructor(e){this.kind=e}static is(e){return e===Lt.auto||e===Lt.byName||e===Lt.byPosition}toString(){return this.kind}};X.ParameterStructures=Lt;Lt.auto=new Lt("auto");Lt.byPosition=new Lt("byPosition");Lt.byName=new Lt("byName");var Je=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Lt.auto}};X.AbstractMessageSignature=Je;var Mh=class extends Je{constructor(e){super(e,0)}};X.RequestType0=Mh;var $h=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType=$h;var Fh=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType1=Fh;var jh=class extends Je{constructor(e){super(e,2)}};X.RequestType2=jh;var Uh=class extends Je{constructor(e){super(e,3)}};X.RequestType3=Uh;var Gh=class extends Je{constructor(e){super(e,4)}};X.RequestType4=Gh;var Hh=class extends Je{constructor(e){super(e,5)}};X.RequestType5=Hh;var Wh=class extends Je{constructor(e){super(e,6)}};X.RequestType6=Wh;var Bh=class extends Je{constructor(e){super(e,7)}};X.RequestType7=Bh;var Kh=class extends Je{constructor(e){super(e,8)}};X.RequestType8=Kh;var zh=class extends Je{constructor(e){super(e,9)}};X.RequestType9=zh;var Vh=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType=Vh;var Xh=class extends Je{constructor(e){super(e,0)}};X.NotificationType0=Xh;var Yh=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType1=Yh;var Jh=class extends Je{constructor(e){super(e,2)}};X.NotificationType2=Jh;var Qh=class extends Je{constructor(e){super(e,3)}};X.NotificationType3=Qh;var Zh=class extends Je{constructor(e){super(e,4)}};X.NotificationType4=Zh;var em=class extends Je{constructor(e){super(e,5)}};X.NotificationType5=em;var tm=class extends Je{constructor(e){super(e,6)}};X.NotificationType6=tm;var rm=class extends Je{constructor(e){super(e,7)}};X.NotificationType7=rm;var nm=class extends Je{constructor(e){super(e,8)}};X.NotificationType8=nm;var im=class extends Je{constructor(e){super(e,9)}};X.NotificationType9=im;var H$;(function(t){function e(i){let o=i;return o&&$o.string(o.method)&&($o.string(o.id)||$o.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&$o.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&($o.string(o.id)||$o.number(o.id)||o.id===null)}t.isResponse=n})(H$=X.Message||(X.Message={}))});var sm=d(gi=>{"use strict";var t0;Object.defineProperty(gi,"__esModule",{value:!0});gi.LRUCache=gi.LinkedMap=gi.Touch=void 0;var cr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(cr=gi.Touch||(gi.Touch={}));var hl=class{constructor(){this[t0]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=cr.None){let n=this._map.get(e);if(n)return r!==cr.None&&this.touch(n,r),n.value}set(e,r,n=cr.None){let i=this._map.get(e);if(i)i.value=r,n!==cr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case cr.None:this.addItemLast(i);break;case cr.First:this.addItemFirst(i);break;case cr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(t0=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==cr.First&&r!==cr.Last)){if(r===cr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===cr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};gi.LinkedMap=hl;var am=class extends hl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=cr.AsNew){return super.get(e,r)}peek(e){return super.get(e,cr.None)}set(e,r){return super.set(e,r,cr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};gi.LRUCache=am});var qa=d(Fo=>{"use strict";Object.defineProperty(Fo,"__esModule",{value:!0});Fo.Emitter=Fo.Event=void 0;var W$=mi(),B$;(function(t){let e={dispose(){}};t.None=function(){return e}})(B$=Fo.Event||(Fo.Event={}));var um=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,a=n.length;o<a;o++)try{r.push(n[o].apply(i[o],e))}catch(s){(0,W$.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},xa=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new um),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=xa._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};Fo.Emitter=xa;xa._noop=function(){}});var dm=d(jo=>{"use strict";Object.defineProperty(jo,"__esModule",{value:!0});jo.CancellationTokenSource=jo.CancellationToken=void 0;var K$=mi(),z$=Ia(),cm=qa(),lm;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:cm.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:cm.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||z$.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(lm=jo.CancellationToken||(jo.CancellationToken={}));var V$=Object.freeze(function(t,e){let r=(0,K$.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),ml=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?V$:(this._emitter||(this._emitter=new cm.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},fm=class{get token(){return this._token||(this._token=new ml),this._token}cancel(){this._token?this._token.cancel():this._token=lm.Cancelled}dispose(){this._token?this._token instanceof ml&&this._token.dispose():this._token=lm.None}};jo.CancellationTokenSource=fm});var r0=d(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.ReadableStreamMessageReader=yi.AbstractMessageReader=yi.MessageReader=void 0;var hm=mi(),La=Ia(),pm=qa(),X$;(function(t){function e(r){let n=r;return n&&La.func(n.listen)&&La.func(n.dispose)&&La.func(n.onError)&&La.func(n.onClose)&&La.func(n.onPartialMessage)}t.is=e})(X$=yi.MessageReader||(yi.MessageReader={}));var gl=class{constructor(){this.errorEmitter=new pm.Emitter,this.closeEmitter=new pm.Emitter,this.partialMessageEmitter=new pm.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${La.string(e.message)?e.message:"unknown"}`)}};yi.AbstractMessageReader=gl;var mm;(function(t){function e(r){let n,i,o,a=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,a.set(o.name,o)),r.contentDecoders!==void 0)for(let c of r.contentDecoders)a.set(c.name,c);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let c of r.contentTypeDecoders)u.set(c.name,c)}return s===void 0&&(s=(0,hm.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:o,contentDecoders:a,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(mm||(mm={}));var gm=class extends gl{constructor(e,r){super(),this.readable=e,this.options=mm.fromOptions(r),this.buffer=(0,hm.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let a=parseInt(o);if(isNaN(a))throw new Error("Content-Length value must be a number.");this.nextMessageLength=a}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,hm.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};yi.ReadableStreamMessageReader=gm});var n0=d(yl=>{"use strict";Object.defineProperty(yl,"__esModule",{value:!0});yl.Semaphore=void 0;var Y$=mi(),ym=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,Y$.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};yl.Semaphore=ym});var s0=d(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.WriteableStreamMessageWriter=vi.AbstractMessageWriter=vi.MessageWriter=void 0;var i0=mi(),Eu=Ia(),J$=n0(),o0=qa(),Q$="Content-Length: ",a0=`\r
`,Z$;(function(t){function e(r){let n=r;return n&&Eu.func(n.dispose)&&Eu.func(n.onClose)&&Eu.func(n.onError)&&Eu.func(n.write)}t.is=e})(Z$=vi.MessageWriter||(vi.MessageWriter={}));var vl=class{constructor(){this.errorEmitter=new o0.Emitter,this.closeEmitter=new o0.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Eu.string(e.message)?e.message:"unknown"}`)}};vi.AbstractMessageWriter=vl;var vm;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,i0.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,i0.default)().applicationJson.encoder}}t.fromOptions=e})(vm||(vm={}));var _m=class extends vl{constructor(e,r){super(),this.writable=e,this.options=vm.fromOptions(r),this.errorCount=0,this.writeSemaphore=new J$.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(Q$,n.byteLength.toString(),a0),i.push(a0),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};vi.WriteableStreamMessageWriter=_m});var p0=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createMessageConnection=Q.ConnectionOptions=Q.CancellationStrategy=Q.CancellationSenderStrategy=Q.CancellationReceiverStrategy=Q.ConnectionStrategy=Q.ConnectionError=Q.ConnectionErrors=Q.LogTraceNotification=Q.SetTraceNotification=Q.TraceFormat=Q.TraceValues=Q.Trace=Q.NullLogger=Q.ProgressType=Q.ProgressToken=void 0;var u0=mi(),It=Ia(),ee=om(),c0=sm(),Nu=qa(),Tm=dm(),wu;(function(t){t.type=new ee.NotificationType("$/cancelRequest")})(wu||(wu={}));var l0;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(l0=Q.ProgressToken||(Q.ProgressToken={}));var ku;(function(t){t.type=new ee.NotificationType("$/progress")})(ku||(ku={}));var Rm=class{constructor(){}};Q.ProgressType=Rm;var bm;(function(t){function e(r){return It.func(r)}t.is=e})(bm||(bm={}));Q.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ie;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ie=Q.Trace||(Q.Trace={}));var eF;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(eF=Q.TraceValues||(Q.TraceValues={}));(function(t){function e(n){if(!It.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ie=Q.Trace||(Q.Trace={}));var fn;(function(t){t.Text="text",t.JSON="json"})(fn=Q.TraceFormat||(Q.TraceFormat={}));(function(t){function e(r){return It.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(fn=Q.TraceFormat||(Q.TraceFormat={}));var f0;(function(t){t.type=new ee.NotificationType("$/setTrace")})(f0=Q.SetTraceNotification||(Q.SetTraceNotification={}));var Am;(function(t){t.type=new ee.NotificationType("$/logTrace")})(Am=Q.LogTraceNotification||(Q.LogTraceNotification={}));var _l;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(_l=Q.ConnectionErrors||(Q.ConnectionErrors={}));var Ki=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,Ki.prototype)}};Q.ConnectionError=Ki;var d0;(function(t){function e(r){let n=r;return n&&It.func(n.cancelUndispatched)}t.is=e})(d0=Q.ConnectionStrategy||(Q.ConnectionStrategy={}));var Pm;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Tm.CancellationTokenSource}});function e(r){let n=r;return n&&It.func(n.createCancellationTokenSource)}t.is=e})(Pm=Q.CancellationReceiverStrategy||(Q.CancellationReceiverStrategy={}));var Sm;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(wu.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}t.is=e})(Sm=Q.CancellationSenderStrategy||(Q.CancellationSenderStrategy={}));var Cm;(function(t){t.Message=Object.freeze({receiver:Pm.Message,sender:Sm.Message});function e(r){let n=r;return n&&Pm.is(n.receiver)&&Sm.is(n.sender)}t.is=e})(Cm=Q.CancellationStrategy||(Q.CancellationStrategy={}));var tF;(function(t){function e(r){let n=r;return n&&(Cm.is(n.cancellationStrategy)||d0.is(n.connectionStrategy))}t.is=e})(tF=Q.ConnectionOptions||(Q.ConnectionOptions={}));var dn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(dn||(dn={}));function rF(t,e,r,n){let i=r!==void 0?r:Q.NullLogger,o=0,a=0,s=0,u="2.0",c,l=new Map,f,h=new Map,y=new Map,m,R=new c0.LinkedMap,E=new Map,S=new Set,A=new Map,b=Ie.Off,O=fn.Text,$,W=dn.New,Z=new Nu.Emitter,Ee=new Nu.Emitter,Ne=new Nu.Emitter,Ye=new Nu.Emitter,K=new Nu.Emitter,ce=n&&n.cancellationStrategy?n.cancellationStrategy:Cm.Message;function L(P){if(P===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+P.toString()}function q(P){return P===null?"res-unknown-"+(++s).toString():"res-"+P.toString()}function F(){return"not-"+(++a).toString()}function B(P,x){ee.Message.isRequest(x)?P.set(L(x.id),x):ee.Message.isResponse(x)?P.set(q(x.id),x):P.set(F(),x)}function ne(P){}function ie(){return W===dn.Listening}function J(){return W===dn.Closed}function lt(){return W===dn.Disposed}function Ze(){(W===dn.New||W===dn.Listening)&&(W=dn.Closed,Ee.fire(void 0))}function Dt(P){Z.fire([P,void 0,void 0])}function on(P){Z.fire(P)}t.onClose(Ze),t.onError(Dt),e.onClose(Ze),e.onError(on);function wr(){m||R.size===0||(m=(0,u0.default)().timer.setImmediate(()=>{m=void 0,Sa()}))}function Sa(){if(R.size===0)return;let P=R.shift();try{ee.Message.isRequest(P)?Ca(P):ee.Message.isNotification(P)?Na(P):ee.Message.isResponse(P)?Ea(P):bu(P)}finally{wr()}}let ur=P=>{try{if(ee.Message.isNotification(P)&&P.method===wu.type.method){let x=P.params.id,j=L(x),z=R.get(j);if(ee.Message.isRequest(z)){let je=n?.connectionStrategy,et=je&&je.cancelUndispatched?je.cancelUndispatched(z,ne):void 0;if(et&&(et.error!==void 0||et.result!==void 0)){R.delete(j),A.delete(x),et.id=z.id,In(et,P.method,Date.now()),e.write(et).catch(()=>i.error("Sending response for canceled message failed."));return}}let Fe=A.get(x);if(Fe!==void 0){Fe.cancel(),xn(P);return}else S.add(x)}B(R,P)}finally{wr()}};function Ca(P){if(lt())return;function x(me,We,ve){let gt={jsonrpc:u,id:P.id};me instanceof ee.ResponseError?gt.error=me.toJson():gt.result=me===void 0?null:me,In(gt,We,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}function j(me,We,ve){let gt={jsonrpc:u,id:P.id,error:me.toJson()};In(gt,We,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}function z(me,We,ve){me===void 0&&(me=null);let gt={jsonrpc:u,id:P.id,result:me};In(gt,We,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}qo(P);let Fe=l.get(P.method),je,et;Fe&&(je=Fe.type,et=Fe.handler);let Tt=Date.now();if(et||c){let me=P.id??String(Date.now()),We=ce.receiver.createCancellationTokenSource(me);P.id!==null&&S.has(P.id)&&We.cancel(),P.id!==null&&A.set(me,We);try{let ve;if(et)if(P.params===void 0){if(je!==void 0&&je.numberOfParams!==0){j(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${P.method} defines ${je.numberOfParams} params but received none.`),P.method,Tt);return}ve=et(We.token)}else if(Array.isArray(P.params)){if(je!==void 0&&je.parameterStructures===ee.ParameterStructures.byName){j(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${P.method} defines parameters by name but received parameters by position`),P.method,Tt);return}ve=et(...P.params,We.token)}else{if(je!==void 0&&je.parameterStructures===ee.ParameterStructures.byPosition){j(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${P.method} defines parameters by position but received parameters by name`),P.method,Tt);return}ve=et(P.params,We.token)}else c&&(ve=c(P.method,P.params,We.token));let gt=ve;ve?gt.then?gt.then(Qt=>{A.delete(me),x(Qt,P.method,Tt)},Qt=>{A.delete(me),Qt instanceof ee.ResponseError?j(Qt,P.method,Tt):Qt&&It.string(Qt.message)?j(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${P.method} failed with message: ${Qt.message}`),P.method,Tt):j(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${P.method} failed unexpectedly without providing any details.`),P.method,Tt)}):(A.delete(me),x(ve,P.method,Tt)):(A.delete(me),z(ve,P.method,Tt))}catch(ve){A.delete(me),ve instanceof ee.ResponseError?x(ve,P.method,Tt):ve&&It.string(ve.message)?j(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${P.method} failed with message: ${ve.message}`),P.method,Tt):j(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${P.method} failed unexpectedly without providing any details.`),P.method,Tt)}}else j(new ee.ResponseError(ee.ErrorCodes.MethodNotFound,`Unhandled method ${P.method}`),P.method,Tt)}function Ea(P){if(!lt())if(P.id===null)P.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(P.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=P.id,j=E.get(x);if(Lo(P,j),j!==void 0){E.delete(x);try{if(P.error){let z=P.error;j.reject(new ee.ResponseError(z.code,z.message,z.data))}else if(P.result!==void 0)j.resolve(P.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${j.method}' failed with message: ${z.message}`):i.error(`Response handler '${j.method}' failed unexpectedly.`)}}}}function Na(P){if(lt())return;let x,j;if(P.method===wu.type.method){let z=P.params.id;S.delete(z),xn(P);return}else{let z=h.get(P.method);z&&(j=z.handler,x=z.type)}if(j||f)try{if(xn(P),j)if(P.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==ee.ParameterStructures.byName&&i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received none.`),j();else if(Array.isArray(P.params)){let z=P.params;P.method===ku.type.method&&z.length===2&&l0.is(z[0])?j({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===ee.ParameterStructures.byName&&i.error(`Notification ${P.method} defines parameters by name but received parameters by position`),x.numberOfParams!==P.params.length&&i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),j(...z))}else x!==void 0&&x.parameterStructures===ee.ParameterStructures.byPosition&&i.error(`Notification ${P.method} defines parameters by position but received parameters by name`),j(P.params);else f&&f(P.method,P.params)}catch(z){z.message?i.error(`Notification handler '${P.method}' failed with message: ${z.message}`):i.error(`Notification handler '${P.method}' failed unexpectedly.`)}else Ne.fire(P)}function bu(P){if(!P){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(P,null,4)}`);let x=P;if(It.string(x.id)||It.number(x.id)){let j=x.id,z=E.get(j);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function mt(P){if(P!=null)switch(b){case Ie.Verbose:return JSON.stringify(P,null,4);case Ie.Compact:return JSON.stringify(P);default:return}}function fi(P){if(!(b===Ie.Off||!$))if(O===fn.Text){let x;(b===Ie.Verbose||b===Ie.Compact)&&P.params&&(x=`Params: ${mt(P.params)}

`),$.log(`Sending request '${P.method} - (${P.id})'.`,x)}else Fr("send-request",P)}function Au(P){if(!(b===Ie.Off||!$))if(O===fn.Text){let x;(b===Ie.Verbose||b===Ie.Compact)&&(P.params?x=`Params: ${mt(P.params)}

`:x=`No parameters provided.

`),$.log(`Sending notification '${P.method}'.`,x)}else Fr("send-notification",P)}function In(P,x,j){if(!(b===Ie.Off||!$))if(O===fn.Text){let z;(b===Ie.Verbose||b===Ie.Compact)&&(P.error&&P.error.data?z=`Error data: ${mt(P.error.data)}

`:P.result?z=`Result: ${mt(P.result)}

`:P.error===void 0&&(z=`No result returned.

`)),$.log(`Sending response '${x} - (${P.id})'. Processing request took ${Date.now()-j}ms`,z)}else Fr("send-response",P)}function qo(P){if(!(b===Ie.Off||!$))if(O===fn.Text){let x;(b===Ie.Verbose||b===Ie.Compact)&&P.params&&(x=`Params: ${mt(P.params)}

`),$.log(`Received request '${P.method} - (${P.id})'.`,x)}else Fr("receive-request",P)}function xn(P){if(!(b===Ie.Off||!$||P.method===Am.type.method))if(O===fn.Text){let x;(b===Ie.Verbose||b===Ie.Compact)&&(P.params?x=`Params: ${mt(P.params)}

`:x=`No parameters provided.

`),$.log(`Received notification '${P.method}'.`,x)}else Fr("receive-notification",P)}function Lo(P,x){if(!(b===Ie.Off||!$))if(O===fn.Text){let j;if((b===Ie.Verbose||b===Ie.Compact)&&(P.error&&P.error.data?j=`Error data: ${mt(P.error.data)}

`:P.result?j=`Result: ${mt(P.result)}

`:P.error===void 0&&(j=`No result returned.

`)),x){let z=P.error?` Request failed: ${P.error.message} (${P.error.code}).`:"";$.log(`Received response '${x.method} - (${P.id})' in ${Date.now()-x.timerStart}ms.${z}`,j)}else $.log(`Received response ${P.id} without active response promise.`,j)}else Fr("receive-response",P)}function Fr(P,x){if(!$||b===Ie.Off)return;let j={isLSPMessage:!0,type:P,message:x,timestamp:Date.now()};$.log(j)}function an(){if(J())throw new Ki(_l.Closed,"Connection is closed.");if(lt())throw new Ki(_l.Disposed,"Connection is disposed.")}function ka(){if(ie())throw new Ki(_l.AlreadyListening,"Connection is already listening")}function wa(){if(!ie())throw new Error("Call listen() first.")}function Or(P){return P===void 0?null:P}function qn(P){if(P!==null)return P}function qt(P){return P!=null&&!Array.isArray(P)&&typeof P=="object"}function sn(P,x){switch(P){case ee.ParameterStructures.auto:return qt(x)?qn(x):[Or(x)];case ee.ParameterStructures.byName:if(!qt(x))throw new Error("Received parameters by name but param is not an object literal.");return qn(x);case ee.ParameterStructures.byPosition:return[Or(x)];default:throw new Error(`Unknown parameter structure ${P.toString()}`)}}function un(P,x){let j,z=P.numberOfParams;switch(z){case 0:j=void 0;break;case 1:j=sn(P.parameterStructures,x[0]);break;default:j=[];for(let Fe=0;Fe<x.length&&Fe<z;Fe++)j.push(Or(x[Fe]));if(x.length<z)for(let Fe=x.length;Fe<z;Fe++)j.push(null);break}return j}let Ln={sendNotification:(P,...x)=>{an();let j,z;if(It.string(P)){j=P;let je=x[0],et=0,Tt=ee.ParameterStructures.auto;ee.ParameterStructures.is(je)&&(et=1,Tt=je);let me=x.length,We=me-et;switch(We){case 0:z=void 0;break;case 1:z=sn(Tt,x[et]);break;default:if(Tt===ee.ParameterStructures.byName)throw new Error(`Received ${We} parameters for 'by Name' notification parameter structure.`);z=x.slice(et,me).map(ve=>Or(ve));break}}else{let je=x;j=P.method,z=un(P,je)}let Fe={jsonrpc:u,method:j,params:z};return Au(Fe),e.write(Fe).catch(()=>i.error("Sending notification failed."))},onNotification:(P,x)=>{an();let j;return It.func(P)?f=P:x&&(It.string(P)?(j=P,h.set(P,{type:void 0,handler:x})):(j=P.method,h.set(P.method,{type:P,handler:x}))),{dispose:()=>{j!==void 0?h.delete(j):f=void 0}}},onProgress:(P,x,j)=>{if(y.has(x))throw new Error(`Progress handler for token ${x} already registered`);return y.set(x,j),{dispose:()=>{y.delete(x)}}},sendProgress:(P,x,j)=>Ln.sendNotification(ku.type,{token:x,value:j}),onUnhandledProgress:Ye.event,sendRequest:(P,...x)=>{an(),wa();let j,z,Fe;if(It.string(P)){j=P;let me=x[0],We=x[x.length-1],ve=0,gt=ee.ParameterStructures.auto;ee.ParameterStructures.is(me)&&(ve=1,gt=me);let Qt=x.length;Tm.CancellationToken.is(We)&&(Qt=Qt-1,Fe=We);let di=Qt-ve;switch(di){case 0:z=void 0;break;case 1:z=sn(gt,x[ve]);break;default:if(gt===ee.ParameterStructures.byName)throw new Error(`Received ${di} parameters for 'by Name' request parameter structure.`);z=x.slice(ve,Qt).map(Mn=>Or(Mn));break}}else{let me=x;j=P.method,z=un(P,me);let We=P.numberOfParams;Fe=Tm.CancellationToken.is(me[We])?me[We]:void 0}let je=o++,et;return Fe&&(et=Fe.onCancellationRequested(()=>{let me=ce.sender.sendCancellation(Ln,je);return me===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${je}`),Promise.resolve()):me.catch(()=>{i.log(`Sending cancellation messages for id ${je} failed`)})})),new Promise((me,We)=>{let ve={jsonrpc:u,id:je,method:j,params:z},gt=Mn=>{me(Mn),ce.sender.cleanup(je),et?.dispose()},Qt=Mn=>{We(Mn),ce.sender.cleanup(je),et?.dispose()},di={method:j,timerStart:Date.now(),resolve:gt,reject:Qt};fi(ve);try{e.write(ve).catch(()=>i.error("Sending request failed."))}catch(Mn){di.reject(new ee.ResponseError(ee.ErrorCodes.MessageWriteError,Mn.message?Mn.message:"Unknown reason")),di=null}di&&E.set(je,di)})},onRequest:(P,x)=>{an();let j=null;return bm.is(P)?(j=void 0,c=P):It.string(P)?(j=null,x!==void 0&&(j=P,l.set(P,{handler:x,type:void 0}))):x!==void 0&&(j=P.method,l.set(P.method,{type:P,handler:x})),{dispose:()=>{j!==null&&(j!==void 0?l.delete(j):c=void 0)}}},hasPendingResponse:()=>E.size>0,trace:async(P,x,j)=>{let z=!1,Fe=fn.Text;j!==void 0&&(It.boolean(j)?z=j:(z=j.sendNotification||!1,Fe=j.traceFormat||fn.Text)),b=P,O=Fe,b===Ie.Off?$=void 0:$=x,z&&!J()&&!lt()&&await Ln.sendNotification(f0.type,{value:Ie.toString(P)})},onError:Z.event,onClose:Ee.event,onUnhandledNotification:Ne.event,onDispose:K.event,end:()=>{e.end()},dispose:()=>{if(lt())return;W=dn.Disposed,K.fire(void 0);let P=new ee.ResponseError(ee.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of E.values())x.reject(P);E=new Map,A=new Map,S=new Set,R=new c0.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(t.dispose)&&t.dispose()},listen:()=>{an(),ka(),W=dn.Listening,t.listen(ur)},inspect:()=>{(0,u0.default)().console.log("inspect")}};return Ln.onNotification(Am.type,P=>{if(b===Ie.Off||!$)return;let x=b===Ie.Verbose||b===Ie.Compact;$.log(P.message,x?P.verbose:void 0)}),Ln.onNotification(ku.type,P=>{let x=y.get(P.token);x?x(P.value):Ye.fire(P)}),Ln}Q.createMessageConnection=rF});var wm=d(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});D.TraceFormat=D.TraceValues=D.Trace=D.ProgressType=D.ProgressToken=D.createMessageConnection=D.NullLogger=D.ConnectionOptions=D.ConnectionStrategy=D.WriteableStreamMessageWriter=D.AbstractMessageWriter=D.MessageWriter=D.ReadableStreamMessageReader=D.AbstractMessageReader=D.MessageReader=D.CancellationToken=D.CancellationTokenSource=D.Emitter=D.Event=D.Disposable=D.LRUCache=D.Touch=D.LinkedMap=D.ParameterStructures=D.NotificationType9=D.NotificationType8=D.NotificationType7=D.NotificationType6=D.NotificationType5=D.NotificationType4=D.NotificationType3=D.NotificationType2=D.NotificationType1=D.NotificationType0=D.NotificationType=D.ErrorCodes=D.ResponseError=D.RequestType9=D.RequestType8=D.RequestType7=D.RequestType6=D.RequestType5=D.RequestType4=D.RequestType3=D.RequestType2=D.RequestType1=D.RequestType0=D.RequestType=D.Message=D.RAL=void 0;D.CancellationStrategy=D.CancellationSenderStrategy=D.CancellationReceiverStrategy=D.ConnectionError=D.ConnectionErrors=D.LogTraceNotification=D.SetTraceNotification=void 0;var Ke=om();Object.defineProperty(D,"Message",{enumerable:!0,get:function(){return Ke.Message}});Object.defineProperty(D,"RequestType",{enumerable:!0,get:function(){return Ke.RequestType}});Object.defineProperty(D,"RequestType0",{enumerable:!0,get:function(){return Ke.RequestType0}});Object.defineProperty(D,"RequestType1",{enumerable:!0,get:function(){return Ke.RequestType1}});Object.defineProperty(D,"RequestType2",{enumerable:!0,get:function(){return Ke.RequestType2}});Object.defineProperty(D,"RequestType3",{enumerable:!0,get:function(){return Ke.RequestType3}});Object.defineProperty(D,"RequestType4",{enumerable:!0,get:function(){return Ke.RequestType4}});Object.defineProperty(D,"RequestType5",{enumerable:!0,get:function(){return Ke.RequestType5}});Object.defineProperty(D,"RequestType6",{enumerable:!0,get:function(){return Ke.RequestType6}});Object.defineProperty(D,"RequestType7",{enumerable:!0,get:function(){return Ke.RequestType7}});Object.defineProperty(D,"RequestType8",{enumerable:!0,get:function(){return Ke.RequestType8}});Object.defineProperty(D,"RequestType9",{enumerable:!0,get:function(){return Ke.RequestType9}});Object.defineProperty(D,"ResponseError",{enumerable:!0,get:function(){return Ke.ResponseError}});Object.defineProperty(D,"ErrorCodes",{enumerable:!0,get:function(){return Ke.ErrorCodes}});Object.defineProperty(D,"NotificationType",{enumerable:!0,get:function(){return Ke.NotificationType}});Object.defineProperty(D,"NotificationType0",{enumerable:!0,get:function(){return Ke.NotificationType0}});Object.defineProperty(D,"NotificationType1",{enumerable:!0,get:function(){return Ke.NotificationType1}});Object.defineProperty(D,"NotificationType2",{enumerable:!0,get:function(){return Ke.NotificationType2}});Object.defineProperty(D,"NotificationType3",{enumerable:!0,get:function(){return Ke.NotificationType3}});Object.defineProperty(D,"NotificationType4",{enumerable:!0,get:function(){return Ke.NotificationType4}});Object.defineProperty(D,"NotificationType5",{enumerable:!0,get:function(){return Ke.NotificationType5}});Object.defineProperty(D,"NotificationType6",{enumerable:!0,get:function(){return Ke.NotificationType6}});Object.defineProperty(D,"NotificationType7",{enumerable:!0,get:function(){return Ke.NotificationType7}});Object.defineProperty(D,"NotificationType8",{enumerable:!0,get:function(){return Ke.NotificationType8}});Object.defineProperty(D,"NotificationType9",{enumerable:!0,get:function(){return Ke.NotificationType9}});Object.defineProperty(D,"ParameterStructures",{enumerable:!0,get:function(){return Ke.ParameterStructures}});var Em=sm();Object.defineProperty(D,"LinkedMap",{enumerable:!0,get:function(){return Em.LinkedMap}});Object.defineProperty(D,"LRUCache",{enumerable:!0,get:function(){return Em.LRUCache}});Object.defineProperty(D,"Touch",{enumerable:!0,get:function(){return Em.Touch}});var nF=Oh();Object.defineProperty(D,"Disposable",{enumerable:!0,get:function(){return nF.Disposable}});var h0=qa();Object.defineProperty(D,"Event",{enumerable:!0,get:function(){return h0.Event}});Object.defineProperty(D,"Emitter",{enumerable:!0,get:function(){return h0.Emitter}});var m0=dm();Object.defineProperty(D,"CancellationTokenSource",{enumerable:!0,get:function(){return m0.CancellationTokenSource}});Object.defineProperty(D,"CancellationToken",{enumerable:!0,get:function(){return m0.CancellationToken}});var Nm=r0();Object.defineProperty(D,"MessageReader",{enumerable:!0,get:function(){return Nm.MessageReader}});Object.defineProperty(D,"AbstractMessageReader",{enumerable:!0,get:function(){return Nm.AbstractMessageReader}});Object.defineProperty(D,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Nm.ReadableStreamMessageReader}});var km=s0();Object.defineProperty(D,"MessageWriter",{enumerable:!0,get:function(){return km.MessageWriter}});Object.defineProperty(D,"AbstractMessageWriter",{enumerable:!0,get:function(){return km.AbstractMessageWriter}});Object.defineProperty(D,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return km.WriteableStreamMessageWriter}});var er=p0();Object.defineProperty(D,"ConnectionStrategy",{enumerable:!0,get:function(){return er.ConnectionStrategy}});Object.defineProperty(D,"ConnectionOptions",{enumerable:!0,get:function(){return er.ConnectionOptions}});Object.defineProperty(D,"NullLogger",{enumerable:!0,get:function(){return er.NullLogger}});Object.defineProperty(D,"createMessageConnection",{enumerable:!0,get:function(){return er.createMessageConnection}});Object.defineProperty(D,"ProgressToken",{enumerable:!0,get:function(){return er.ProgressToken}});Object.defineProperty(D,"ProgressType",{enumerable:!0,get:function(){return er.ProgressType}});Object.defineProperty(D,"Trace",{enumerable:!0,get:function(){return er.Trace}});Object.defineProperty(D,"TraceValues",{enumerable:!0,get:function(){return er.TraceValues}});Object.defineProperty(D,"TraceFormat",{enumerable:!0,get:function(){return er.TraceFormat}});Object.defineProperty(D,"SetTraceNotification",{enumerable:!0,get:function(){return er.SetTraceNotification}});Object.defineProperty(D,"LogTraceNotification",{enumerable:!0,get:function(){return er.LogTraceNotification}});Object.defineProperty(D,"ConnectionErrors",{enumerable:!0,get:function(){return er.ConnectionErrors}});Object.defineProperty(D,"ConnectionError",{enumerable:!0,get:function(){return er.ConnectionError}});Object.defineProperty(D,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return er.CancellationReceiverStrategy}});Object.defineProperty(D,"CancellationSenderStrategy",{enumerable:!0,get:function(){return er.CancellationSenderStrategy}});Object.defineProperty(D,"CancellationStrategy",{enumerable:!0,get:function(){return er.CancellationStrategy}});var iF=mi();D.RAL=iF.default});var _i=d(Pe=>{"use strict";var oF=Pe&&Pe.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),aF=Pe&&Pe.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&oF(e,t,r)};Object.defineProperty(Pe,"__esModule",{value:!0});Pe.createMessageConnection=Pe.createServerSocketTransport=Pe.createClientSocketTransport=Pe.createServerPipeTransport=Pe.createClientPipeTransport=Pe.generateRandomPipeName=Pe.StreamMessageWriter=Pe.StreamMessageReader=Pe.SocketMessageWriter=Pe.SocketMessageReader=Pe.IPCMessageWriter=Pe.IPCMessageReader=void 0;var Ma=JR();Ma.default.install();var $n=wm(),g0=require("path"),sF=require("os"),uF=require("crypto"),bl=require("net");aF(wm(),Pe);var Om=class extends $n.AbstractMessageReader{constructor(e){super(),this.process=e;let r=this.process;r.on("error",n=>this.fireError(n)),r.on("close",()=>this.fireClose())}listen(e){return this.process.on("message",e),$n.Disposable.create(()=>this.process.off("message",e))}};Pe.IPCMessageReader=Om;var Dm=class extends $n.AbstractMessageWriter{constructor(e){super(),this.process=e,this.errorCount=0;let r=this.process;r.on("error",n=>this.fireError(n)),r.on("close",()=>this.fireClose)}write(e){try{return typeof this.process.send=="function"&&this.process.send(e,void 0,void 0,r=>{r?(this.errorCount++,this.handleError(r,e)):this.errorCount=0}),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Pe.IPCMessageWriter=Dm;var Uo=class extends $n.ReadableStreamMessageReader{constructor(e,r="utf-8"){super((0,Ma.default)().stream.asReadableStream(e),r)}};Pe.SocketMessageReader=Uo;var Go=class extends $n.WriteableStreamMessageWriter{constructor(e,r){super((0,Ma.default)().stream.asWritableStream(e),r),this.socket=e}dispose(){super.dispose(),this.socket.destroy()}};Pe.SocketMessageWriter=Go;var Tl=class extends $n.ReadableStreamMessageReader{constructor(e,r){super((0,Ma.default)().stream.asReadableStream(e),r)}};Pe.StreamMessageReader=Tl;var Rl=class extends $n.WriteableStreamMessageWriter{constructor(e,r){super((0,Ma.default)().stream.asWritableStream(e),r)}};Pe.StreamMessageWriter=Rl;var y0=process.env.XDG_RUNTIME_DIR,cF=new Map([["linux",107],["darwin",103]]);function lF(){let t=(0,uF.randomBytes)(21).toString("hex");if(process.platform==="win32")return`\\\\.\\pipe\\vscode-jsonrpc-${t}-sock`;let e;y0?e=g0.join(y0,`vscode-ipc-${t}.sock`):e=g0.join(sF.tmpdir(),`vscode-${t}.sock`);let r=cF.get(process.platform);return r!==void 0&&e.length>=r&&(0,Ma.default)().console.warn(`WARNING: IPC handle "${e}" is longer than ${r} characters.`),e}Pe.generateRandomPipeName=lF;function fF(t,e="utf-8"){let r,n=new Promise((i,o)=>{r=i});return new Promise((i,o)=>{let a=(0,bl.createServer)(s=>{a.close(),r([new Uo(s,e),new Go(s,e)])});a.on("error",o),a.listen(t,()=>{a.removeListener("error",o),i({onConnected:()=>n})})})}Pe.createClientPipeTransport=fF;function dF(t,e="utf-8"){let r=(0,bl.createConnection)(t);return[new Uo(r,e),new Go(r,e)]}Pe.createServerPipeTransport=dF;function pF(t,e="utf-8"){let r,n=new Promise((i,o)=>{r=i});return new Promise((i,o)=>{let a=(0,bl.createServer)(s=>{a.close(),r([new Uo(s,e),new Go(s,e)])});a.on("error",o),a.listen(t,"127.0.0.1",()=>{a.removeListener("error",o),i({onConnected:()=>n})})})}Pe.createClientSocketTransport=pF;function hF(t,e="utf-8"){let r=(0,bl.createConnection)(t,"127.0.0.1");return[new Uo(r,e),new Go(r,e)]}Pe.createServerSocketTransport=hF;function mF(t){let e=t;return e.read!==void 0&&e.addListener!==void 0}function gF(t){let e=t;return e.write!==void 0&&e.addListener!==void 0}function yF(t,e,r,n){r||(r=$n.NullLogger);let i=mF(t)?new Tl(t):t,o=gF(e)?new Rl(e):e;return $n.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,$n.createMessageConnection)(i,o,r,n)}Pe.createMessageConnection=yF});var Im=d((jfe,v0)=>{"use strict";v0.exports=_i()});var $a=d((_0,Al)=>{(function(t){if(typeof Al=="object"&&typeof Al.exports=="object"){var e=t(require,_0);e!==void 0&&(Al.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function C(N){return typeof N=="string"}g.is=C})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function C(N){return typeof N=="string"}g.is=C})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function C(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=C})(i=e.integer||(e.integer={}));var o;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function C(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=C})(o=e.uinteger||(e.uinteger={}));var a;(function(g){function C(T,p){return T===Number.MAX_VALUE&&(T=o.MAX_VALUE),p===Number.MAX_VALUE&&(p=o.MAX_VALUE),{line:T,character:p}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&k.uinteger(p.line)&&k.uinteger(p.character)}g.is=N})(a=e.Position||(e.Position={}));var s;(function(g){function C(T,p,w,I){if(k.uinteger(T)&&k.uinteger(p)&&k.uinteger(w)&&k.uinteger(I))return{start:a.create(T,p),end:a.create(w,I)};if(a.is(T)&&a.is(p))return{start:T,end:p};throw new Error("Range#create called with invalid arguments[".concat(T,", ").concat(p,", ").concat(w,", ").concat(I,"]"))}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&a.is(p.start)&&a.is(p.end)}g.is=N})(s=e.Range||(e.Range={}));var u;(function(g){function C(T,p){return{uri:T,range:p}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&s.is(p.range)&&(k.string(p.uri)||k.undefined(p.uri))}g.is=N})(u=e.Location||(e.Location={}));var c;(function(g){function C(T,p,w,I){return{targetUri:T,targetRange:p,targetSelectionRange:w,originSelectionRange:I}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&s.is(p.targetRange)&&k.string(p.targetUri)&&s.is(p.targetSelectionRange)&&(s.is(p.originSelectionRange)||k.undefined(p.originSelectionRange))}g.is=N})(c=e.LocationLink||(e.LocationLink={}));var l;(function(g){function C(T,p,w,I){return{red:T,green:p,blue:w,alpha:I}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&k.numberRange(p.red,0,1)&&k.numberRange(p.green,0,1)&&k.numberRange(p.blue,0,1)&&k.numberRange(p.alpha,0,1)}g.is=N})(l=e.Color||(e.Color={}));var f;(function(g){function C(T,p){return{range:T,color:p}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&s.is(p.range)&&l.is(p.color)}g.is=N})(f=e.ColorInformation||(e.ColorInformation={}));var h;(function(g){function C(T,p,w){return{label:T,textEdit:p,additionalTextEdits:w}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&k.string(p.label)&&(k.undefined(p.textEdit)||$.is(p))&&(k.undefined(p.additionalTextEdits)||k.typedArray(p.additionalTextEdits,$.is))}g.is=N})(h=e.ColorPresentation||(e.ColorPresentation={}));var y;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(y=e.FoldingRangeKind||(e.FoldingRangeKind={}));var m;(function(g){function C(T,p,w,I,re,ft){var Be={startLine:T,endLine:p};return k.defined(w)&&(Be.startCharacter=w),k.defined(I)&&(Be.endCharacter=I),k.defined(re)&&(Be.kind=re),k.defined(ft)&&(Be.collapsedText=ft),Be}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&k.uinteger(p.startLine)&&k.uinteger(p.startLine)&&(k.undefined(p.startCharacter)||k.uinteger(p.startCharacter))&&(k.undefined(p.endCharacter)||k.uinteger(p.endCharacter))&&(k.undefined(p.kind)||k.string(p.kind))}g.is=N})(m=e.FoldingRange||(e.FoldingRange={}));var R;(function(g){function C(T,p){return{location:T,message:p}}g.create=C;function N(T){var p=T;return k.defined(p)&&u.is(p.location)&&k.string(p.message)}g.is=N})(R=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var E;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(E=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var S;(function(g){g.Unnecessary=1,g.Deprecated=2})(S=e.DiagnosticTag||(e.DiagnosticTag={}));var A;(function(g){function C(N){var T=N;return k.objectLiteral(T)&&k.string(T.href)}g.is=C})(A=e.CodeDescription||(e.CodeDescription={}));var b;(function(g){function C(T,p,w,I,re,ft){var Be={range:T,message:p};return k.defined(w)&&(Be.severity=w),k.defined(I)&&(Be.code=I),k.defined(re)&&(Be.source=re),k.defined(ft)&&(Be.relatedInformation=ft),Be}g.create=C;function N(T){var p,w=T;return k.defined(w)&&s.is(w.range)&&k.string(w.message)&&(k.number(w.severity)||k.undefined(w.severity))&&(k.integer(w.code)||k.string(w.code)||k.undefined(w.code))&&(k.undefined(w.codeDescription)||k.string((p=w.codeDescription)===null||p===void 0?void 0:p.href))&&(k.string(w.source)||k.undefined(w.source))&&(k.undefined(w.relatedInformation)||k.typedArray(w.relatedInformation,R.is))}g.is=N})(b=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function C(T,p){for(var w=[],I=2;I<arguments.length;I++)w[I-2]=arguments[I];var re={title:T,command:p};return k.defined(w)&&w.length>0&&(re.arguments=w),re}g.create=C;function N(T){var p=T;return k.defined(p)&&k.string(p.title)&&k.string(p.command)}g.is=N})(O=e.Command||(e.Command={}));var $;(function(g){function C(w,I){return{range:w,newText:I}}g.replace=C;function N(w,I){return{range:{start:w,end:w},newText:I}}g.insert=N;function T(w){return{range:w,newText:""}}g.del=T;function p(w){var I=w;return k.objectLiteral(I)&&k.string(I.newText)&&s.is(I.range)}g.is=p})($=e.TextEdit||(e.TextEdit={}));var W;(function(g){function C(T,p,w){var I={label:T};return p!==void 0&&(I.needsConfirmation=p),w!==void 0&&(I.description=w),I}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&k.string(p.label)&&(k.boolean(p.needsConfirmation)||p.needsConfirmation===void 0)&&(k.string(p.description)||p.description===void 0)}g.is=N})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var Z;(function(g){function C(N){var T=N;return k.string(T)}g.is=C})(Z=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(g){function C(w,I,re){return{range:w,newText:I,annotationId:re}}g.replace=C;function N(w,I,re){return{range:{start:w,end:w},newText:I,annotationId:re}}g.insert=N;function T(w,I){return{range:w,newText:"",annotationId:I}}g.del=T;function p(w){var I=w;return $.is(I)&&(W.is(I.annotationId)||Z.is(I.annotationId))}g.is=p})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ne;(function(g){function C(T,p){return{textDocument:T,edits:p}}g.create=C;function N(T){var p=T;return k.defined(p)&&J.is(p.textDocument)&&Array.isArray(p.edits)}g.is=N})(Ne=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Ye;(function(g){function C(T,p,w){var I={kind:"create",uri:T};return p!==void 0&&(p.overwrite!==void 0||p.ignoreIfExists!==void 0)&&(I.options=p),w!==void 0&&(I.annotationId=w),I}g.create=C;function N(T){var p=T;return p&&p.kind==="create"&&k.string(p.uri)&&(p.options===void 0||(p.options.overwrite===void 0||k.boolean(p.options.overwrite))&&(p.options.ignoreIfExists===void 0||k.boolean(p.options.ignoreIfExists)))&&(p.annotationId===void 0||Z.is(p.annotationId))}g.is=N})(Ye=e.CreateFile||(e.CreateFile={}));var K;(function(g){function C(T,p,w,I){var re={kind:"rename",oldUri:T,newUri:p};return w!==void 0&&(w.overwrite!==void 0||w.ignoreIfExists!==void 0)&&(re.options=w),I!==void 0&&(re.annotationId=I),re}g.create=C;function N(T){var p=T;return p&&p.kind==="rename"&&k.string(p.oldUri)&&k.string(p.newUri)&&(p.options===void 0||(p.options.overwrite===void 0||k.boolean(p.options.overwrite))&&(p.options.ignoreIfExists===void 0||k.boolean(p.options.ignoreIfExists)))&&(p.annotationId===void 0||Z.is(p.annotationId))}g.is=N})(K=e.RenameFile||(e.RenameFile={}));var ce;(function(g){function C(T,p,w){var I={kind:"delete",uri:T};return p!==void 0&&(p.recursive!==void 0||p.ignoreIfNotExists!==void 0)&&(I.options=p),w!==void 0&&(I.annotationId=w),I}g.create=C;function N(T){var p=T;return p&&p.kind==="delete"&&k.string(p.uri)&&(p.options===void 0||(p.options.recursive===void 0||k.boolean(p.options.recursive))&&(p.options.ignoreIfNotExists===void 0||k.boolean(p.options.ignoreIfNotExists)))&&(p.annotationId===void 0||Z.is(p.annotationId))}g.is=N})(ce=e.DeleteFile||(e.DeleteFile={}));var L;(function(g){function C(N){var T=N;return T&&(T.changes!==void 0||T.documentChanges!==void 0)&&(T.documentChanges===void 0||T.documentChanges.every(function(p){return k.string(p.kind)?Ye.is(p)||K.is(p)||ce.is(p):Ne.is(p)}))}g.is=C})(L=e.WorkspaceEdit||(e.WorkspaceEdit={}));var q=function(){function g(C,N){this.edits=C,this.changeAnnotations=N}return g.prototype.insert=function(C,N,T){var p,w;if(T===void 0?p=$.insert(C,N):Z.is(T)?(w=T,p=Ee.insert(C,N,T)):(this.assertChangeAnnotations(this.changeAnnotations),w=this.changeAnnotations.manage(T),p=Ee.insert(C,N,w)),this.edits.push(p),w!==void 0)return w},g.prototype.replace=function(C,N,T){var p,w;if(T===void 0?p=$.replace(C,N):Z.is(T)?(w=T,p=Ee.replace(C,N,T)):(this.assertChangeAnnotations(this.changeAnnotations),w=this.changeAnnotations.manage(T),p=Ee.replace(C,N,w)),this.edits.push(p),w!==void 0)return w},g.prototype.delete=function(C,N){var T,p;if(N===void 0?T=$.del(C):Z.is(N)?(p=N,T=Ee.del(C,N)):(this.assertChangeAnnotations(this.changeAnnotations),p=this.changeAnnotations.manage(N),T=Ee.del(C,p)),this.edits.push(T),p!==void 0)return p},g.prototype.add=function(C){this.edits.push(C)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(C){if(C===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),F=function(){function g(C){this._annotations=C===void 0?Object.create(null):C,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(C,N){var T;if(Z.is(C)?T=C:(T=this.nextId(),N=C),this._annotations[T]!==void 0)throw new Error("Id ".concat(T," is already in use."));if(N===void 0)throw new Error("No annotation provided for id ".concat(T));return this._annotations[T]=N,this._size++,T},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(C){var N=this;this._textEditChanges=Object.create(null),C!==void 0?(this._workspaceEdit=C,C.documentChanges?(this._changeAnnotations=new F(C.changeAnnotations),C.changeAnnotations=this._changeAnnotations.all(),C.documentChanges.forEach(function(T){if(Ne.is(T)){var p=new q(T.edits,N._changeAnnotations);N._textEditChanges[T.textDocument.uri]=p}})):C.changes&&Object.keys(C.changes).forEach(function(T){var p=new q(C.changes[T]);N._textEditChanges[T]=p})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(C){if(J.is(C)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var N={uri:C.uri,version:C.version},T=this._textEditChanges[N.uri];if(!T){var p=[],w={textDocument:N,edits:p};this._workspaceEdit.documentChanges.push(w),T=new q(p,this._changeAnnotations),this._textEditChanges[N.uri]=T}return T}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var T=this._textEditChanges[C];if(!T){var p=[];this._workspaceEdit.changes[C]=p,T=new q(p),this._textEditChanges[C]=T}return T}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new F,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(C,N,T){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var p;W.is(N)||Z.is(N)?p=N:T=N;var w,I;if(p===void 0?w=Ye.create(C,T):(I=Z.is(p)?p:this._changeAnnotations.manage(p),w=Ye.create(C,T,I)),this._workspaceEdit.documentChanges.push(w),I!==void 0)return I},g.prototype.renameFile=function(C,N,T,p){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var w;W.is(T)||Z.is(T)?w=T:p=T;var I,re;if(w===void 0?I=K.create(C,N,p):(re=Z.is(w)?w:this._changeAnnotations.manage(w),I=K.create(C,N,p,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},g.prototype.deleteFile=function(C,N,T){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var p;W.is(N)||Z.is(N)?p=N:T=N;var w,I;if(p===void 0?w=ce.create(C,T):(I=Z.is(p)?p:this._changeAnnotations.manage(p),w=ce.create(C,T,I)),this._workspaceEdit.documentChanges.push(w),I!==void 0)return I},g}();e.WorkspaceChange=B;var ne;(function(g){function C(T){return{uri:T}}g.create=C;function N(T){var p=T;return k.defined(p)&&k.string(p.uri)}g.is=N})(ne=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var ie;(function(g){function C(T,p){return{uri:T,version:p}}g.create=C;function N(T){var p=T;return k.defined(p)&&k.string(p.uri)&&k.integer(p.version)}g.is=N})(ie=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var J;(function(g){function C(T,p){return{uri:T,version:p}}g.create=C;function N(T){var p=T;return k.defined(p)&&k.string(p.uri)&&(p.version===null||k.integer(p.version))}g.is=N})(J=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var lt;(function(g){function C(T,p,w,I){return{uri:T,languageId:p,version:w,text:I}}g.create=C;function N(T){var p=T;return k.defined(p)&&k.string(p.uri)&&k.string(p.languageId)&&k.integer(p.version)&&k.string(p.text)}g.is=N})(lt=e.TextDocumentItem||(e.TextDocumentItem={}));var Ze;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function C(N){var T=N;return T===g.PlainText||T===g.Markdown}g.is=C})(Ze=e.MarkupKind||(e.MarkupKind={}));var Dt;(function(g){function C(N){var T=N;return k.objectLiteral(N)&&Ze.is(T.kind)&&k.string(T.value)}g.is=C})(Dt=e.MarkupContent||(e.MarkupContent={}));var on;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(on=e.CompletionItemKind||(e.CompletionItemKind={}));var wr;(function(g){g.PlainText=1,g.Snippet=2})(wr=e.InsertTextFormat||(e.InsertTextFormat={}));var Sa;(function(g){g.Deprecated=1})(Sa=e.CompletionItemTag||(e.CompletionItemTag={}));var ur;(function(g){function C(T,p,w){return{newText:T,insert:p,replace:w}}g.create=C;function N(T){var p=T;return p&&k.string(p.newText)&&s.is(p.insert)&&s.is(p.replace)}g.is=N})(ur=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var Ca;(function(g){g.asIs=1,g.adjustIndentation=2})(Ca=e.InsertTextMode||(e.InsertTextMode={}));var Ea;(function(g){function C(N){var T=N;return T&&(k.string(T.detail)||T.detail===void 0)&&(k.string(T.description)||T.description===void 0)}g.is=C})(Ea=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Na;(function(g){function C(N){return{label:N}}g.create=C})(Na=e.CompletionItem||(e.CompletionItem={}));var bu;(function(g){function C(N,T){return{items:N||[],isIncomplete:!!T}}g.create=C})(bu=e.CompletionList||(e.CompletionList={}));var mt;(function(g){function C(T){return T.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=C;function N(T){var p=T;return k.string(p)||k.objectLiteral(p)&&k.string(p.language)&&k.string(p.value)}g.is=N})(mt=e.MarkedString||(e.MarkedString={}));var fi;(function(g){function C(N){var T=N;return!!T&&k.objectLiteral(T)&&(Dt.is(T.contents)||mt.is(T.contents)||k.typedArray(T.contents,mt.is))&&(N.range===void 0||s.is(N.range))}g.is=C})(fi=e.Hover||(e.Hover={}));var Au;(function(g){function C(N,T){return T?{label:N,documentation:T}:{label:N}}g.create=C})(Au=e.ParameterInformation||(e.ParameterInformation={}));var In;(function(g){function C(N,T){for(var p=[],w=2;w<arguments.length;w++)p[w-2]=arguments[w];var I={label:N};return k.defined(T)&&(I.documentation=T),k.defined(p)?I.parameters=p:I.parameters=[],I}g.create=C})(In=e.SignatureInformation||(e.SignatureInformation={}));var qo;(function(g){g.Text=1,g.Read=2,g.Write=3})(qo=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var xn;(function(g){function C(N,T){var p={range:N};return k.number(T)&&(p.kind=T),p}g.create=C})(xn=e.DocumentHighlight||(e.DocumentHighlight={}));var Lo;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})(Lo=e.SymbolKind||(e.SymbolKind={}));var Fr;(function(g){g.Deprecated=1})(Fr=e.SymbolTag||(e.SymbolTag={}));var an;(function(g){function C(N,T,p,w,I){var re={name:N,kind:T,location:{uri:w,range:p}};return I&&(re.containerName=I),re}g.create=C})(an=e.SymbolInformation||(e.SymbolInformation={}));var ka;(function(g){function C(N,T,p,w){return w!==void 0?{name:N,kind:T,location:{uri:p,range:w}}:{name:N,kind:T,location:{uri:p}}}g.create=C})(ka=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var wa;(function(g){function C(T,p,w,I,re,ft){var Be={name:T,detail:p,kind:w,range:I,selectionRange:re};return ft!==void 0&&(Be.children=ft),Be}g.create=C;function N(T){var p=T;return p&&k.string(p.name)&&k.number(p.kind)&&s.is(p.range)&&s.is(p.selectionRange)&&(p.detail===void 0||k.string(p.detail))&&(p.deprecated===void 0||k.boolean(p.deprecated))&&(p.children===void 0||Array.isArray(p.children))&&(p.tags===void 0||Array.isArray(p.tags))}g.is=N})(wa=e.DocumentSymbol||(e.DocumentSymbol={}));var Or;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(Or=e.CodeActionKind||(e.CodeActionKind={}));var qn;(function(g){g.Invoked=1,g.Automatic=2})(qn=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var qt;(function(g){function C(T,p,w){var I={diagnostics:T};return p!=null&&(I.only=p),w!=null&&(I.triggerKind=w),I}g.create=C;function N(T){var p=T;return k.defined(p)&&k.typedArray(p.diagnostics,b.is)&&(p.only===void 0||k.typedArray(p.only,k.string))&&(p.triggerKind===void 0||p.triggerKind===qn.Invoked||p.triggerKind===qn.Automatic)}g.is=N})(qt=e.CodeActionContext||(e.CodeActionContext={}));var sn;(function(g){function C(T,p,w){var I={title:T},re=!0;return typeof p=="string"?(re=!1,I.kind=p):O.is(p)?I.command=p:I.edit=p,re&&w!==void 0&&(I.kind=w),I}g.create=C;function N(T){var p=T;return p&&k.string(p.title)&&(p.diagnostics===void 0||k.typedArray(p.diagnostics,b.is))&&(p.kind===void 0||k.string(p.kind))&&(p.edit!==void 0||p.command!==void 0)&&(p.command===void 0||O.is(p.command))&&(p.isPreferred===void 0||k.boolean(p.isPreferred))&&(p.edit===void 0||L.is(p.edit))}g.is=N})(sn=e.CodeAction||(e.CodeAction={}));var un;(function(g){function C(T,p){var w={range:T};return k.defined(p)&&(w.data=p),w}g.create=C;function N(T){var p=T;return k.defined(p)&&s.is(p.range)&&(k.undefined(p.command)||O.is(p.command))}g.is=N})(un=e.CodeLens||(e.CodeLens={}));var Ln;(function(g){function C(T,p){return{tabSize:T,insertSpaces:p}}g.create=C;function N(T){var p=T;return k.defined(p)&&k.uinteger(p.tabSize)&&k.boolean(p.insertSpaces)}g.is=N})(Ln=e.FormattingOptions||(e.FormattingOptions={}));var P;(function(g){function C(T,p,w){return{range:T,target:p,data:w}}g.create=C;function N(T){var p=T;return k.defined(p)&&s.is(p.range)&&(k.undefined(p.target)||k.string(p.target))}g.is=N})(P=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function C(T,p){return{range:T,parent:p}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&s.is(p.range)&&(p.parent===void 0||g.is(p.parent))}g.is=N})(x=e.SelectionRange||(e.SelectionRange={}));var j;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(j=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var Fe;(function(g){function C(N){var T=N;return k.objectLiteral(T)&&(T.resultId===void 0||typeof T.resultId=="string")&&Array.isArray(T.data)&&(T.data.length===0||typeof T.data[0]=="number")}g.is=C})(Fe=e.SemanticTokens||(e.SemanticTokens={}));var je;(function(g){function C(T,p){return{range:T,text:p}}g.create=C;function N(T){var p=T;return p!=null&&s.is(p.range)&&k.string(p.text)}g.is=N})(je=e.InlineValueText||(e.InlineValueText={}));var et;(function(g){function C(T,p,w){return{range:T,variableName:p,caseSensitiveLookup:w}}g.create=C;function N(T){var p=T;return p!=null&&s.is(p.range)&&k.boolean(p.caseSensitiveLookup)&&(k.string(p.variableName)||p.variableName===void 0)}g.is=N})(et=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var Tt;(function(g){function C(T,p){return{range:T,expression:p}}g.create=C;function N(T){var p=T;return p!=null&&s.is(p.range)&&(k.string(p.expression)||p.expression===void 0)}g.is=N})(Tt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var me;(function(g){function C(T,p){return{frameId:T,stoppedLocation:p}}g.create=C;function N(T){var p=T;return k.defined(p)&&s.is(T.stoppedLocation)}g.is=N})(me=e.InlineValueContext||(e.InlineValueContext={}));var We;(function(g){g.Type=1,g.Parameter=2;function C(N){return N===1||N===2}g.is=C})(We=e.InlayHintKind||(e.InlayHintKind={}));var ve;(function(g){function C(T){return{value:T}}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&(p.tooltip===void 0||k.string(p.tooltip)||Dt.is(p.tooltip))&&(p.location===void 0||u.is(p.location))&&(p.command===void 0||O.is(p.command))}g.is=N})(ve=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var gt;(function(g){function C(T,p,w){var I={position:T,label:p};return w!==void 0&&(I.kind=w),I}g.create=C;function N(T){var p=T;return k.objectLiteral(p)&&a.is(p.position)&&(k.string(p.label)||k.typedArray(p.label,ve.is))&&(p.kind===void 0||We.is(p.kind))&&p.textEdits===void 0||k.typedArray(p.textEdits,$.is)&&(p.tooltip===void 0||k.string(p.tooltip)||Dt.is(p.tooltip))&&(p.paddingLeft===void 0||k.boolean(p.paddingLeft))&&(p.paddingRight===void 0||k.boolean(p.paddingRight))}g.is=N})(gt=e.InlayHint||(e.InlayHint={}));var Qt;(function(g){function C(N){var T=N;return k.objectLiteral(T)&&n.is(T.uri)&&k.string(T.name)}g.is=C})(Qt=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var di;(function(g){function C(w,I,re,ft){return new Mn(w,I,re,ft)}g.create=C;function N(w){var I=w;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}g.is=N;function T(w,I){for(var re=w.getText(),ft=p(I,function(Oa,fl){var FR=Oa.range.start.line-fl.range.start.line;return FR===0?Oa.range.start.character-fl.range.start.character:FR}),Be=re.length,cn=ft.length-1;cn>=0;cn--){var ln=ft[cn],pi=w.offsetAt(ln.range.start),ge=w.offsetAt(ln.range.end);if(ge<=Be)re=re.substring(0,pi)+ln.newText+re.substring(ge,re.length);else throw new Error("Overlapping edit");Be=pi}return re}g.applyEdits=T;function p(w,I){if(w.length<=1)return w;var re=w.length/2|0,ft=w.slice(0,re),Be=w.slice(re);p(ft,I),p(Be,I);for(var cn=0,ln=0,pi=0;cn<ft.length&&ln<Be.length;){var ge=I(ft[cn],Be[ln]);ge<=0?w[pi++]=ft[cn++]:w[pi++]=Be[ln++]}for(;cn<ft.length;)w[pi++]=ft[cn++];for(;ln<Be.length;)w[pi++]=Be[ln++];return w}})(di=e.TextDocument||(e.TextDocument={}));var Mn=function(){function g(C,N,T,p){this._uri=C,this._languageId=N,this._version=T,this._content=p,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(C){if(C){var N=this.offsetAt(C.start),T=this.offsetAt(C.end);return this._content.substring(N,T)}return this._content},g.prototype.update=function(C,N){this._content=C.text,this._version=N,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var C=[],N=this._content,T=!0,p=0;p<N.length;p++){T&&(C.push(p),T=!1);var w=N.charAt(p);T=w==="\r"||w===`
`,w==="\r"&&p+1<N.length&&N.charAt(p+1)===`
`&&p++}T&&N.length>0&&C.push(N.length),this._lineOffsets=C}return this._lineOffsets},g.prototype.positionAt=function(C){C=Math.max(Math.min(C,this._content.length),0);var N=this.getLineOffsets(),T=0,p=N.length;if(p===0)return a.create(0,C);for(;T<p;){var w=Math.floor((T+p)/2);N[w]>C?p=w:T=w+1}var I=T-1;return a.create(I,C-N[I])},g.prototype.offsetAt=function(C){var N=this.getLineOffsets();if(C.line>=N.length)return this._content.length;if(C.line<0)return 0;var T=N[C.line],p=C.line+1<N.length?N[C.line+1]:this._content.length;return Math.max(Math.min(T+C.character,p),T)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),k;(function(g){var C=Object.prototype.toString;function N(ge){return typeof ge<"u"}g.defined=N;function T(ge){return typeof ge>"u"}g.undefined=T;function p(ge){return ge===!0||ge===!1}g.boolean=p;function w(ge){return C.call(ge)==="[object String]"}g.string=w;function I(ge){return C.call(ge)==="[object Number]"}g.number=I;function re(ge,Oa,fl){return C.call(ge)==="[object Number]"&&Oa<=ge&&ge<=fl}g.numberRange=re;function ft(ge){return C.call(ge)==="[object Number]"&&-2147483648<=ge&&ge<=2147483647}g.integer=ft;function Be(ge){return C.call(ge)==="[object Number]"&&0<=ge&&ge<=2147483647}g.uinteger=Be;function cn(ge){return C.call(ge)==="[object Function]"}g.func=cn;function ln(ge){return ge!==null&&typeof ge=="object"}g.objectLiteral=ln;function pi(ge,Oa){return Array.isArray(ge)&&ge.every(Oa)}g.typedArray=pi})(k||(k={}))})});var ut=d(lr=>{"use strict";Object.defineProperty(lr,"__esModule",{value:!0});lr.ProtocolNotificationType=lr.ProtocolNotificationType0=lr.ProtocolRequestType=lr.ProtocolRequestType0=lr.RegistrationType=lr.MessageDirection=void 0;var Fa=_i(),vF;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(vF=lr.MessageDirection||(lr.MessageDirection={}));var xm=class{constructor(e){this.method=e}};lr.RegistrationType=xm;var qm=class extends Fa.RequestType0{constructor(e){super(e)}};lr.ProtocolRequestType0=qm;var Lm=class extends Fa.RequestType{constructor(e){super(e,Fa.ParameterStructures.byName)}};lr.ProtocolRequestType=Lm;var Mm=class extends Fa.NotificationType0{constructor(e){super(e)}};lr.ProtocolNotificationType0=Mm;var $m=class extends Fa.NotificationType{constructor(e){super(e,Fa.ParameterStructures.byName)}};lr.ProtocolNotificationType=$m});var Pl=d(bt=>{"use strict";Object.defineProperty(bt,"__esModule",{value:!0});bt.objectLiteral=bt.typedArray=bt.stringArray=bt.array=bt.func=bt.error=bt.number=bt.string=bt.boolean=void 0;function _F(t){return t===!0||t===!1}bt.boolean=_F;function T0(t){return typeof t=="string"||t instanceof String}bt.string=T0;function TF(t){return typeof t=="number"||t instanceof Number}bt.number=TF;function RF(t){return t instanceof Error}bt.error=RF;function bF(t){return typeof t=="function"}bt.func=bF;function R0(t){return Array.isArray(t)}bt.array=R0;function AF(t){return R0(t)&&t.every(e=>T0(e))}bt.stringArray=AF;function PF(t,e){return Array.isArray(t)&&t.every(e)}bt.typedArray=PF;function SF(t){return t!==null&&typeof t=="object"}bt.objectLiteral=SF});var A0=d(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.ImplementationRequest=void 0;var b0=ut(),CF;(function(t){t.method="textDocument/implementation",t.messageDirection=b0.MessageDirection.clientToServer,t.type=new b0.ProtocolRequestType(t.method)})(CF=Ou.ImplementationRequest||(Ou.ImplementationRequest={}))});var S0=d(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.TypeDefinitionRequest=void 0;var P0=ut(),EF;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=P0.MessageDirection.clientToServer,t.type=new P0.ProtocolRequestType(t.method)})(EF=Du.TypeDefinitionRequest||(Du.TypeDefinitionRequest={}))});var C0=d(zi=>{"use strict";Object.defineProperty(zi,"__esModule",{value:!0});zi.DidChangeWorkspaceFoldersNotification=zi.WorkspaceFoldersRequest=void 0;var Sl=ut(),NF;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Sl.MessageDirection.serverToClient,t.type=new Sl.ProtocolRequestType0(t.method)})(NF=zi.WorkspaceFoldersRequest||(zi.WorkspaceFoldersRequest={}));var kF;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Sl.MessageDirection.clientToServer,t.type=new Sl.ProtocolNotificationType(t.method)})(kF=zi.DidChangeWorkspaceFoldersNotification||(zi.DidChangeWorkspaceFoldersNotification={}))});var N0=d(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.ConfigurationRequest=void 0;var E0=ut(),wF;(function(t){t.method="workspace/configuration",t.messageDirection=E0.MessageDirection.serverToClient,t.type=new E0.ProtocolRequestType(t.method)})(wF=Iu.ConfigurationRequest||(Iu.ConfigurationRequest={}))});var k0=d(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.ColorPresentationRequest=Vi.DocumentColorRequest=void 0;var Cl=ut(),OF;(function(t){t.method="textDocument/documentColor",t.messageDirection=Cl.MessageDirection.clientToServer,t.type=new Cl.ProtocolRequestType(t.method)})(OF=Vi.DocumentColorRequest||(Vi.DocumentColorRequest={}));var DF;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Cl.MessageDirection.clientToServer,t.type=new Cl.ProtocolRequestType(t.method)})(DF=Vi.ColorPresentationRequest||(Vi.ColorPresentationRequest={}))});var O0=d(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.FoldingRangeRequest=void 0;var w0=ut(),IF;(function(t){t.method="textDocument/foldingRange",t.messageDirection=w0.MessageDirection.clientToServer,t.type=new w0.ProtocolRequestType(t.method)})(IF=xu.FoldingRangeRequest||(xu.FoldingRangeRequest={}))});var I0=d(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.DeclarationRequest=void 0;var D0=ut(),xF;(function(t){t.method="textDocument/declaration",t.messageDirection=D0.MessageDirection.clientToServer,t.type=new D0.ProtocolRequestType(t.method)})(xF=qu.DeclarationRequest||(qu.DeclarationRequest={}))});var q0=d(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.SelectionRangeRequest=void 0;var x0=ut(),qF;(function(t){t.method="textDocument/selectionRange",t.messageDirection=x0.MessageDirection.clientToServer,t.type=new x0.ProtocolRequestType(t.method)})(qF=Lu.SelectionRangeRequest||(Lu.SelectionRangeRequest={}))});var L0=d(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.WorkDoneProgressCancelNotification=pn.WorkDoneProgressCreateRequest=pn.WorkDoneProgress=void 0;var LF=_i(),El=ut(),MF;(function(t){t.type=new LF.ProgressType;function e(r){return r===t.type}t.is=e})(MF=pn.WorkDoneProgress||(pn.WorkDoneProgress={}));var $F;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=El.MessageDirection.serverToClient,t.type=new El.ProtocolRequestType(t.method)})($F=pn.WorkDoneProgressCreateRequest||(pn.WorkDoneProgressCreateRequest={}));var FF;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=El.MessageDirection.clientToServer,t.type=new El.ProtocolNotificationType(t.method)})(FF=pn.WorkDoneProgressCancelNotification||(pn.WorkDoneProgressCancelNotification={}))});var M0=d(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.CallHierarchyOutgoingCallsRequest=hn.CallHierarchyIncomingCallsRequest=hn.CallHierarchyPrepareRequest=void 0;var ja=ut(),jF;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=ja.MessageDirection.clientToServer,t.type=new ja.ProtocolRequestType(t.method)})(jF=hn.CallHierarchyPrepareRequest||(hn.CallHierarchyPrepareRequest={}));var UF;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=ja.MessageDirection.clientToServer,t.type=new ja.ProtocolRequestType(t.method)})(UF=hn.CallHierarchyIncomingCallsRequest||(hn.CallHierarchyIncomingCallsRequest={}));var GF;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=ja.MessageDirection.clientToServer,t.type=new ja.ProtocolRequestType(t.method)})(GF=hn.CallHierarchyOutgoingCallsRequest||(hn.CallHierarchyOutgoingCallsRequest={}))});var $0=d(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.SemanticTokensRefreshRequest=At.SemanticTokensRangeRequest=At.SemanticTokensDeltaRequest=At.SemanticTokensRequest=At.SemanticTokensRegistrationType=At.TokenFormat=void 0;var Ti=ut(),HF;(function(t){t.Relative="relative"})(HF=At.TokenFormat||(At.TokenFormat={}));var Nl;(function(t){t.method="textDocument/semanticTokens",t.type=new Ti.RegistrationType(t.method)})(Nl=At.SemanticTokensRegistrationType||(At.SemanticTokensRegistrationType={}));var WF;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Ti.MessageDirection.clientToServer,t.type=new Ti.ProtocolRequestType(t.method),t.registrationMethod=Nl.method})(WF=At.SemanticTokensRequest||(At.SemanticTokensRequest={}));var BF;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Ti.MessageDirection.clientToServer,t.type=new Ti.ProtocolRequestType(t.method),t.registrationMethod=Nl.method})(BF=At.SemanticTokensDeltaRequest||(At.SemanticTokensDeltaRequest={}));var KF;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Ti.MessageDirection.clientToServer,t.type=new Ti.ProtocolRequestType(t.method),t.registrationMethod=Nl.method})(KF=At.SemanticTokensRangeRequest||(At.SemanticTokensRangeRequest={}));var zF;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Ti.MessageDirection.clientToServer,t.type=new Ti.ProtocolRequestType0(t.method)})(zF=At.SemanticTokensRefreshRequest||(At.SemanticTokensRefreshRequest={}))});var j0=d(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.ShowDocumentRequest=void 0;var F0=ut(),VF;(function(t){t.method="window/showDocument",t.messageDirection=F0.MessageDirection.serverToClient,t.type=new F0.ProtocolRequestType(t.method)})(VF=Mu.ShowDocumentRequest||(Mu.ShowDocumentRequest={}))});var G0=d($u=>{"use strict";Object.defineProperty($u,"__esModule",{value:!0});$u.LinkedEditingRangeRequest=void 0;var U0=ut(),XF;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=U0.MessageDirection.clientToServer,t.type=new U0.ProtocolRequestType(t.method)})(XF=$u.LinkedEditingRangeRequest||($u.LinkedEditingRangeRequest={}))});var H0=d(ct=>{"use strict";Object.defineProperty(ct,"__esModule",{value:!0});ct.WillDeleteFilesRequest=ct.DidDeleteFilesNotification=ct.DidRenameFilesNotification=ct.WillRenameFilesRequest=ct.DidCreateFilesNotification=ct.WillCreateFilesRequest=ct.FileOperationPatternKind=void 0;var jr=ut(),YF;(function(t){t.file="file",t.folder="folder"})(YF=ct.FileOperationPatternKind||(ct.FileOperationPatternKind={}));var JF;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(JF=ct.WillCreateFilesRequest||(ct.WillCreateFilesRequest={}));var QF;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(QF=ct.DidCreateFilesNotification||(ct.DidCreateFilesNotification={}));var ZF;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(ZF=ct.WillRenameFilesRequest||(ct.WillRenameFilesRequest={}));var ej;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(ej=ct.DidRenameFilesNotification||(ct.DidRenameFilesNotification={}));var tj;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(tj=ct.DidDeleteFilesNotification||(ct.DidDeleteFilesNotification={}));var rj;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(rj=ct.WillDeleteFilesRequest||(ct.WillDeleteFilesRequest={}))});var B0=d(mn=>{"use strict";Object.defineProperty(mn,"__esModule",{value:!0});mn.MonikerRequest=mn.MonikerKind=mn.UniquenessLevel=void 0;var W0=ut(),nj;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(nj=mn.UniquenessLevel||(mn.UniquenessLevel={}));var ij;(function(t){t.$import="import",t.$export="export",t.local="local"})(ij=mn.MonikerKind||(mn.MonikerKind={}));var oj;(function(t){t.method="textDocument/moniker",t.messageDirection=W0.MessageDirection.clientToServer,t.type=new W0.ProtocolRequestType(t.method)})(oj=mn.MonikerRequest||(mn.MonikerRequest={}))});var K0=d(gn=>{"use strict";Object.defineProperty(gn,"__esModule",{value:!0});gn.TypeHierarchySubtypesRequest=gn.TypeHierarchySupertypesRequest=gn.TypeHierarchyPrepareRequest=void 0;var Ua=ut(),aj;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Ua.MessageDirection.clientToServer,t.type=new Ua.ProtocolRequestType(t.method)})(aj=gn.TypeHierarchyPrepareRequest||(gn.TypeHierarchyPrepareRequest={}));var sj;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Ua.MessageDirection.clientToServer,t.type=new Ua.ProtocolRequestType(t.method)})(sj=gn.TypeHierarchySupertypesRequest||(gn.TypeHierarchySupertypesRequest={}));var uj;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Ua.MessageDirection.clientToServer,t.type=new Ua.ProtocolRequestType(t.method)})(uj=gn.TypeHierarchySubtypesRequest||(gn.TypeHierarchySubtypesRequest={}))});var z0=d(Xi=>{"use strict";Object.defineProperty(Xi,"__esModule",{value:!0});Xi.InlineValueRefreshRequest=Xi.InlineValueRequest=void 0;var kl=ut(),cj;(function(t){t.method="textDocument/inlineValue",t.messageDirection=kl.MessageDirection.clientToServer,t.type=new kl.ProtocolRequestType(t.method)})(cj=Xi.InlineValueRequest||(Xi.InlineValueRequest={}));var lj;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=kl.MessageDirection.clientToServer,t.type=new kl.ProtocolRequestType0(t.method)})(lj=Xi.InlineValueRefreshRequest||(Xi.InlineValueRefreshRequest={}))});var V0=d(yn=>{"use strict";Object.defineProperty(yn,"__esModule",{value:!0});yn.InlayHintRefreshRequest=yn.InlayHintResolveRequest=yn.InlayHintRequest=void 0;var Ga=ut(),fj;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Ga.MessageDirection.clientToServer,t.type=new Ga.ProtocolRequestType(t.method)})(fj=yn.InlayHintRequest||(yn.InlayHintRequest={}));var dj;(function(t){t.method="inlayHint/resolve",t.messageDirection=Ga.MessageDirection.clientToServer,t.type=new Ga.ProtocolRequestType(t.method)})(dj=yn.InlayHintResolveRequest||(yn.InlayHintResolveRequest={}));var pj;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Ga.MessageDirection.clientToServer,t.type=new Ga.ProtocolRequestType0(t.method)})(pj=yn.InlayHintRefreshRequest||(yn.InlayHintRefreshRequest={}))});var Y0=d(Bt=>{"use strict";Object.defineProperty(Bt,"__esModule",{value:!0});Bt.DiagnosticRefreshRequest=Bt.WorkspaceDiagnosticRequest=Bt.DocumentDiagnosticRequest=Bt.DocumentDiagnosticReportKind=Bt.DiagnosticServerCancellationData=void 0;var X0=_i(),hj=Pl(),Ha=ut(),mj;(function(t){function e(r){let n=r;return n&&hj.boolean(n.retriggerRequest)}t.is=e})(mj=Bt.DiagnosticServerCancellationData||(Bt.DiagnosticServerCancellationData={}));var gj;(function(t){t.Full="full",t.Unchanged="unchanged"})(gj=Bt.DocumentDiagnosticReportKind||(Bt.DocumentDiagnosticReportKind={}));var yj;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Ha.MessageDirection.clientToServer,t.type=new Ha.ProtocolRequestType(t.method),t.partialResult=new X0.ProgressType})(yj=Bt.DocumentDiagnosticRequest||(Bt.DocumentDiagnosticRequest={}));var vj;(function(t){t.method="workspace/diagnostic",t.messageDirection=Ha.MessageDirection.clientToServer,t.type=new Ha.ProtocolRequestType(t.method),t.partialResult=new X0.ProgressType})(vj=Bt.WorkspaceDiagnosticRequest||(Bt.WorkspaceDiagnosticRequest={}));var _j;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Ha.MessageDirection.clientToServer,t.type=new Ha.ProtocolRequestType0(t.method)})(_j=Bt.DiagnosticRefreshRequest||(Bt.DiagnosticRefreshRequest={}))});var Z0=d(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.DidCloseNotebookDocumentNotification=Te.DidSaveNotebookDocumentNotification=Te.DidChangeNotebookDocumentNotification=Te.NotebookCellArrayChange=Te.DidOpenNotebookDocumentNotification=Te.NotebookDocumentSyncRegistrationType=Te.NotebookDocument=Te.NotebookCell=Te.ExecutionSummary=Te.NotebookCellKind=void 0;var Fu=$a(),vn=Pl(),Fn=ut(),J0;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(J0=Te.NotebookCellKind||(Te.NotebookCellKind={}));var Q0;(function(t){function e(i,o){let a={executionOrder:i};return(o===!0||o===!1)&&(a.success=o),a}t.create=e;function r(i){let o=i;return vn.objectLiteral(o)&&Fu.uinteger.is(o.executionOrder)&&(o.success===void 0||vn.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Q0=Te.ExecutionSummary||(Te.ExecutionSummary={}));var Fm;(function(t){function e(o,a){return{kind:o,document:a}}t.create=e;function r(o){let a=o;return vn.objectLiteral(a)&&J0.is(a.kind)&&Fu.DocumentUri.is(a.document)&&(a.metadata===void 0||vn.objectLiteral(a.metadata))}t.is=r;function n(o,a){let s=new Set;return o.document!==a.document&&s.add("document"),o.kind!==a.kind&&s.add("kind"),o.executionSummary!==a.executionSummary&&s.add("executionSummary"),(o.metadata!==void 0||a.metadata!==void 0)&&!i(o.metadata,a.metadata)&&s.add("metadata"),(o.executionSummary!==void 0||a.executionSummary!==void 0)&&!Q0.equals(o.executionSummary,a.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(o,a){if(o===a)return!0;if(o==null||a===null||a===void 0||typeof o!=typeof a||typeof o!="object")return!1;let s=Array.isArray(o),u=Array.isArray(a);if(s!==u)return!1;if(s&&u){if(o.length!==a.length)return!1;for(let c=0;c<o.length;c++)if(!i(o[c],a[c]))return!1}if(vn.objectLiteral(o)&&vn.objectLiteral(a)){let c=Object.keys(o),l=Object.keys(a);if(c.length!==l.length||(c.sort(),l.sort(),!i(c,l)))return!1;for(let f=0;f<c.length;f++){let h=c[f];if(!i(o[h],a[h]))return!1}}return!0}})(Fm=Te.NotebookCell||(Te.NotebookCell={}));var Tj;(function(t){function e(n,i,o,a){return{uri:n,notebookType:i,version:o,cells:a}}t.create=e;function r(n){let i=n;return vn.objectLiteral(i)&&vn.string(i.uri)&&Fu.integer.is(i.version)&&vn.typedArray(i.cells,Fm.is)}t.is=r})(Tj=Te.NotebookDocument||(Te.NotebookDocument={}));var ju;(function(t){t.method="notebookDocument/sync",t.messageDirection=Fn.MessageDirection.clientToServer,t.type=new Fn.RegistrationType(t.method)})(ju=Te.NotebookDocumentSyncRegistrationType||(Te.NotebookDocumentSyncRegistrationType={}));var Rj;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Fn.MessageDirection.clientToServer,t.type=new Fn.ProtocolNotificationType(t.method),t.registrationMethod=ju.method})(Rj=Te.DidOpenNotebookDocumentNotification||(Te.DidOpenNotebookDocumentNotification={}));var bj;(function(t){function e(n){let i=n;return vn.objectLiteral(i)&&Fu.uinteger.is(i.start)&&Fu.uinteger.is(i.deleteCount)&&(i.cells===void 0||vn.typedArray(i.cells,Fm.is))}t.is=e;function r(n,i,o){let a={start:n,deleteCount:i};return o!==void 0&&(a.cells=o),a}t.create=r})(bj=Te.NotebookCellArrayChange||(Te.NotebookCellArrayChange={}));var Aj;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Fn.MessageDirection.clientToServer,t.type=new Fn.ProtocolNotificationType(t.method),t.registrationMethod=ju.method})(Aj=Te.DidChangeNotebookDocumentNotification||(Te.DidChangeNotebookDocumentNotification={}));var Pj;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Fn.MessageDirection.clientToServer,t.type=new Fn.ProtocolNotificationType(t.method),t.registrationMethod=ju.method})(Pj=Te.DidSaveNotebookDocumentNotification||(Te.DidSaveNotebookDocumentNotification={}));var Sj;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Fn.MessageDirection.clientToServer,t.type=new Fn.ProtocolNotificationType(t.method),t.registrationMethod=ju.method})(Sj=Te.DidCloseNotebookDocumentNotification||(Te.DidCloseNotebookDocumentNotification={}))});var ub=d(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});v.WorkspaceSymbolRequest=v.CodeActionResolveRequest=v.CodeActionRequest=v.DocumentSymbolRequest=v.DocumentHighlightRequest=v.ReferencesRequest=v.DefinitionRequest=v.SignatureHelpRequest=v.SignatureHelpTriggerKind=v.HoverRequest=v.CompletionResolveRequest=v.CompletionRequest=v.CompletionTriggerKind=v.PublishDiagnosticsNotification=v.WatchKind=v.RelativePattern=v.FileChangeType=v.DidChangeWatchedFilesNotification=v.WillSaveTextDocumentWaitUntilRequest=v.WillSaveTextDocumentNotification=v.TextDocumentSaveReason=v.DidSaveTextDocumentNotification=v.DidCloseTextDocumentNotification=v.DidChangeTextDocumentNotification=v.TextDocumentContentChangeEvent=v.DidOpenTextDocumentNotification=v.TextDocumentSyncKind=v.TelemetryEventNotification=v.LogMessageNotification=v.ShowMessageRequest=v.ShowMessageNotification=v.MessageType=v.DidChangeConfigurationNotification=v.ExitNotification=v.ShutdownRequest=v.InitializedNotification=v.InitializeErrorCodes=v.InitializeRequest=v.WorkDoneProgressOptions=v.TextDocumentRegistrationOptions=v.StaticRegistrationOptions=v.PositionEncodingKind=v.FailureHandlingKind=v.ResourceOperationKind=v.UnregistrationRequest=v.RegistrationRequest=v.DocumentSelector=v.NotebookCellTextDocumentFilter=v.NotebookDocumentFilter=v.TextDocumentFilter=void 0;v.TypeHierarchySubtypesRequest=v.TypeHierarchyPrepareRequest=v.MonikerRequest=v.MonikerKind=v.UniquenessLevel=v.WillDeleteFilesRequest=v.DidDeleteFilesNotification=v.WillRenameFilesRequest=v.DidRenameFilesNotification=v.WillCreateFilesRequest=v.DidCreateFilesNotification=v.FileOperationPatternKind=v.LinkedEditingRangeRequest=v.ShowDocumentRequest=v.SemanticTokensRegistrationType=v.SemanticTokensRefreshRequest=v.SemanticTokensRangeRequest=v.SemanticTokensDeltaRequest=v.SemanticTokensRequest=v.TokenFormat=v.CallHierarchyPrepareRequest=v.CallHierarchyOutgoingCallsRequest=v.CallHierarchyIncomingCallsRequest=v.WorkDoneProgressCancelNotification=v.WorkDoneProgressCreateRequest=v.WorkDoneProgress=v.SelectionRangeRequest=v.DeclarationRequest=v.FoldingRangeRequest=v.ColorPresentationRequest=v.DocumentColorRequest=v.ConfigurationRequest=v.DidChangeWorkspaceFoldersNotification=v.WorkspaceFoldersRequest=v.TypeDefinitionRequest=v.ImplementationRequest=v.ApplyWorkspaceEditRequest=v.ExecuteCommandRequest=v.PrepareRenameRequest=v.RenameRequest=v.PrepareSupportDefaultBehavior=v.DocumentOnTypeFormattingRequest=v.DocumentRangeFormattingRequest=v.DocumentFormattingRequest=v.DocumentLinkResolveRequest=v.DocumentLinkRequest=v.CodeLensRefreshRequest=v.CodeLensResolveRequest=v.CodeLensRequest=v.WorkspaceSymbolResolveRequest=void 0;v.DidCloseNotebookDocumentNotification=v.DidSaveNotebookDocumentNotification=v.DidChangeNotebookDocumentNotification=v.NotebookCellArrayChange=v.DidOpenNotebookDocumentNotification=v.NotebookDocumentSyncRegistrationType=v.NotebookDocument=v.NotebookCell=v.ExecutionSummary=v.NotebookCellKind=v.DiagnosticRefreshRequest=v.WorkspaceDiagnosticRequest=v.DocumentDiagnosticRequest=v.DocumentDiagnosticReportKind=v.DiagnosticServerCancellationData=v.InlayHintRefreshRequest=v.InlayHintResolveRequest=v.InlayHintRequest=v.InlineValueRefreshRequest=v.InlineValueRequest=v.TypeHierarchySupertypesRequest=void 0;var M=ut(),eb=$a(),Kt=Pl(),Cj=A0();Object.defineProperty(v,"ImplementationRequest",{enumerable:!0,get:function(){return Cj.ImplementationRequest}});var Ej=S0();Object.defineProperty(v,"TypeDefinitionRequest",{enumerable:!0,get:function(){return Ej.TypeDefinitionRequest}});var tb=C0();Object.defineProperty(v,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return tb.WorkspaceFoldersRequest}});Object.defineProperty(v,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return tb.DidChangeWorkspaceFoldersNotification}});var Nj=N0();Object.defineProperty(v,"ConfigurationRequest",{enumerable:!0,get:function(){return Nj.ConfigurationRequest}});var rb=k0();Object.defineProperty(v,"DocumentColorRequest",{enumerable:!0,get:function(){return rb.DocumentColorRequest}});Object.defineProperty(v,"ColorPresentationRequest",{enumerable:!0,get:function(){return rb.ColorPresentationRequest}});var kj=O0();Object.defineProperty(v,"FoldingRangeRequest",{enumerable:!0,get:function(){return kj.FoldingRangeRequest}});var wj=I0();Object.defineProperty(v,"DeclarationRequest",{enumerable:!0,get:function(){return wj.DeclarationRequest}});var Oj=q0();Object.defineProperty(v,"SelectionRangeRequest",{enumerable:!0,get:function(){return Oj.SelectionRangeRequest}});var jm=L0();Object.defineProperty(v,"WorkDoneProgress",{enumerable:!0,get:function(){return jm.WorkDoneProgress}});Object.defineProperty(v,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return jm.WorkDoneProgressCreateRequest}});Object.defineProperty(v,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return jm.WorkDoneProgressCancelNotification}});var Um=M0();Object.defineProperty(v,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Um.CallHierarchyIncomingCallsRequest}});Object.defineProperty(v,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Um.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(v,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Um.CallHierarchyPrepareRequest}});var Wa=$0();Object.defineProperty(v,"TokenFormat",{enumerable:!0,get:function(){return Wa.TokenFormat}});Object.defineProperty(v,"SemanticTokensRequest",{enumerable:!0,get:function(){return Wa.SemanticTokensRequest}});Object.defineProperty(v,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Wa.SemanticTokensDeltaRequest}});Object.defineProperty(v,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Wa.SemanticTokensRangeRequest}});Object.defineProperty(v,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Wa.SemanticTokensRefreshRequest}});Object.defineProperty(v,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Wa.SemanticTokensRegistrationType}});var Dj=j0();Object.defineProperty(v,"ShowDocumentRequest",{enumerable:!0,get:function(){return Dj.ShowDocumentRequest}});var Ij=G0();Object.defineProperty(v,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return Ij.LinkedEditingRangeRequest}});var Ho=H0();Object.defineProperty(v,"FileOperationPatternKind",{enumerable:!0,get:function(){return Ho.FileOperationPatternKind}});Object.defineProperty(v,"DidCreateFilesNotification",{enumerable:!0,get:function(){return Ho.DidCreateFilesNotification}});Object.defineProperty(v,"WillCreateFilesRequest",{enumerable:!0,get:function(){return Ho.WillCreateFilesRequest}});Object.defineProperty(v,"DidRenameFilesNotification",{enumerable:!0,get:function(){return Ho.DidRenameFilesNotification}});Object.defineProperty(v,"WillRenameFilesRequest",{enumerable:!0,get:function(){return Ho.WillRenameFilesRequest}});Object.defineProperty(v,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return Ho.DidDeleteFilesNotification}});Object.defineProperty(v,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return Ho.WillDeleteFilesRequest}});var Gm=B0();Object.defineProperty(v,"UniquenessLevel",{enumerable:!0,get:function(){return Gm.UniquenessLevel}});Object.defineProperty(v,"MonikerKind",{enumerable:!0,get:function(){return Gm.MonikerKind}});Object.defineProperty(v,"MonikerRequest",{enumerable:!0,get:function(){return Gm.MonikerRequest}});var Hm=K0();Object.defineProperty(v,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return Hm.TypeHierarchyPrepareRequest}});Object.defineProperty(v,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return Hm.TypeHierarchySubtypesRequest}});Object.defineProperty(v,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return Hm.TypeHierarchySupertypesRequest}});var nb=z0();Object.defineProperty(v,"InlineValueRequest",{enumerable:!0,get:function(){return nb.InlineValueRequest}});Object.defineProperty(v,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return nb.InlineValueRefreshRequest}});var Wm=V0();Object.defineProperty(v,"InlayHintRequest",{enumerable:!0,get:function(){return Wm.InlayHintRequest}});Object.defineProperty(v,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Wm.InlayHintResolveRequest}});Object.defineProperty(v,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Wm.InlayHintRefreshRequest}});var Uu=Y0();Object.defineProperty(v,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Uu.DiagnosticServerCancellationData}});Object.defineProperty(v,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Uu.DocumentDiagnosticReportKind}});Object.defineProperty(v,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Uu.DocumentDiagnosticRequest}});Object.defineProperty(v,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Uu.WorkspaceDiagnosticRequest}});Object.defineProperty(v,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Uu.DiagnosticRefreshRequest}});var jn=Z0();Object.defineProperty(v,"NotebookCellKind",{enumerable:!0,get:function(){return jn.NotebookCellKind}});Object.defineProperty(v,"ExecutionSummary",{enumerable:!0,get:function(){return jn.ExecutionSummary}});Object.defineProperty(v,"NotebookCell",{enumerable:!0,get:function(){return jn.NotebookCell}});Object.defineProperty(v,"NotebookDocument",{enumerable:!0,get:function(){return jn.NotebookDocument}});Object.defineProperty(v,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return jn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(v,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return jn.DidOpenNotebookDocumentNotification}});Object.defineProperty(v,"NotebookCellArrayChange",{enumerable:!0,get:function(){return jn.NotebookCellArrayChange}});Object.defineProperty(v,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return jn.DidChangeNotebookDocumentNotification}});Object.defineProperty(v,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return jn.DidSaveNotebookDocumentNotification}});Object.defineProperty(v,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return jn.DidCloseNotebookDocumentNotification}});var ib;(function(t){function e(r){let n=r;return Kt.string(n.language)||Kt.string(n.scheme)||Kt.string(n.pattern)}t.is=e})(ib=v.TextDocumentFilter||(v.TextDocumentFilter={}));var ob;(function(t){function e(r){let n=r;return Kt.objectLiteral(n)&&(Kt.string(n.notebookType)||Kt.string(n.scheme)||Kt.string(n.pattern))}t.is=e})(ob=v.NotebookDocumentFilter||(v.NotebookDocumentFilter={}));var ab;(function(t){function e(r){let n=r;return Kt.objectLiteral(n)&&(Kt.string(n.notebook)||ob.is(n.notebook))&&(n.language===void 0||Kt.string(n.language))}t.is=e})(ab=v.NotebookCellTextDocumentFilter||(v.NotebookCellTextDocumentFilter={}));var sb;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Kt.string(n)&&!ib.is(n)&&!ab.is(n))return!1;return!0}t.is=e})(sb=v.DocumentSelector||(v.DocumentSelector={}));var xj;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(xj=v.RegistrationRequest||(v.RegistrationRequest={}));var qj;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(qj=v.UnregistrationRequest||(v.UnregistrationRequest={}));var Lj;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(Lj=v.ResourceOperationKind||(v.ResourceOperationKind={}));var Mj;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(Mj=v.FailureHandlingKind||(v.FailureHandlingKind={}));var $j;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})($j=v.PositionEncodingKind||(v.PositionEncodingKind={}));var Fj;(function(t){function e(r){let n=r;return n&&Kt.string(n.id)&&n.id.length>0}t.hasId=e})(Fj=v.StaticRegistrationOptions||(v.StaticRegistrationOptions={}));var jj;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||sb.is(n.documentSelector))}t.is=e})(jj=v.TextDocumentRegistrationOptions||(v.TextDocumentRegistrationOptions={}));var Uj;(function(t){function e(n){let i=n;return Kt.objectLiteral(i)&&(i.workDoneProgress===void 0||Kt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Kt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(Uj=v.WorkDoneProgressOptions||(v.WorkDoneProgressOptions={}));var Gj;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(Gj=v.InitializeRequest||(v.InitializeRequest={}));var Hj;(function(t){t.unknownProtocolVersion=1})(Hj=v.InitializeErrorCodes||(v.InitializeErrorCodes={}));var Wj;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(Wj=v.InitializedNotification||(v.InitializedNotification={}));var Bj;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(Bj=v.ShutdownRequest||(v.ShutdownRequest={}));var Kj;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(Kj=v.ExitNotification||(v.ExitNotification={}));var zj;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(zj=v.DidChangeConfigurationNotification||(v.DidChangeConfigurationNotification={}));var Vj;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(Vj=v.MessageType||(v.MessageType={}));var Xj;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(Xj=v.ShowMessageNotification||(v.ShowMessageNotification={}));var Yj;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(Yj=v.ShowMessageRequest||(v.ShowMessageRequest={}));var Jj;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(Jj=v.LogMessageNotification||(v.LogMessageNotification={}));var Qj;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(Qj=v.TelemetryEventNotification||(v.TelemetryEventNotification={}));var Zj;(function(t){t.None=0,t.Full=1,t.Incremental=2})(Zj=v.TextDocumentSyncKind||(v.TextDocumentSyncKind={}));var eU;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(eU=v.DidOpenTextDocumentNotification||(v.DidOpenTextDocumentNotification={}));var tU;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(tU=v.TextDocumentContentChangeEvent||(v.TextDocumentContentChangeEvent={}));var rU;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(rU=v.DidChangeTextDocumentNotification||(v.DidChangeTextDocumentNotification={}));var nU;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(nU=v.DidCloseTextDocumentNotification||(v.DidCloseTextDocumentNotification={}));var iU;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(iU=v.DidSaveTextDocumentNotification||(v.DidSaveTextDocumentNotification={}));var oU;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(oU=v.TextDocumentSaveReason||(v.TextDocumentSaveReason={}));var aU;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(aU=v.WillSaveTextDocumentNotification||(v.WillSaveTextDocumentNotification={}));var sU;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(sU=v.WillSaveTextDocumentWaitUntilRequest||(v.WillSaveTextDocumentWaitUntilRequest={}));var uU;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(uU=v.DidChangeWatchedFilesNotification||(v.DidChangeWatchedFilesNotification={}));var cU;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(cU=v.FileChangeType||(v.FileChangeType={}));var lU;(function(t){function e(r){let n=r;return Kt.objectLiteral(n)&&(eb.URI.is(n.baseUri)||eb.WorkspaceFolder.is(n.baseUri))&&Kt.string(n.pattern)}t.is=e})(lU=v.RelativePattern||(v.RelativePattern={}));var fU;(function(t){t.Create=1,t.Change=2,t.Delete=4})(fU=v.WatchKind||(v.WatchKind={}));var dU;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(dU=v.PublishDiagnosticsNotification||(v.PublishDiagnosticsNotification={}));var pU;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(pU=v.CompletionTriggerKind||(v.CompletionTriggerKind={}));var hU;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(hU=v.CompletionRequest||(v.CompletionRequest={}));var mU;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(mU=v.CompletionResolveRequest||(v.CompletionResolveRequest={}));var gU;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(gU=v.HoverRequest||(v.HoverRequest={}));var yU;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(yU=v.SignatureHelpTriggerKind||(v.SignatureHelpTriggerKind={}));var vU;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(vU=v.SignatureHelpRequest||(v.SignatureHelpRequest={}));var _U;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(_U=v.DefinitionRequest||(v.DefinitionRequest={}));var TU;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(TU=v.ReferencesRequest||(v.ReferencesRequest={}));var RU;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(RU=v.DocumentHighlightRequest||(v.DocumentHighlightRequest={}));var bU;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(bU=v.DocumentSymbolRequest||(v.DocumentSymbolRequest={}));var AU;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(AU=v.CodeActionRequest||(v.CodeActionRequest={}));var PU;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(PU=v.CodeActionResolveRequest||(v.CodeActionResolveRequest={}));var SU;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(SU=v.WorkspaceSymbolRequest||(v.WorkspaceSymbolRequest={}));var CU;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(CU=v.WorkspaceSymbolResolveRequest||(v.WorkspaceSymbolResolveRequest={}));var EU;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(EU=v.CodeLensRequest||(v.CodeLensRequest={}));var NU;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(NU=v.CodeLensResolveRequest||(v.CodeLensResolveRequest={}));var kU;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(kU=v.CodeLensRefreshRequest||(v.CodeLensRefreshRequest={}));var wU;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(wU=v.DocumentLinkRequest||(v.DocumentLinkRequest={}));var OU;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(OU=v.DocumentLinkResolveRequest||(v.DocumentLinkResolveRequest={}));var DU;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(DU=v.DocumentFormattingRequest||(v.DocumentFormattingRequest={}));var IU;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(IU=v.DocumentRangeFormattingRequest||(v.DocumentRangeFormattingRequest={}));var xU;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(xU=v.DocumentOnTypeFormattingRequest||(v.DocumentOnTypeFormattingRequest={}));var qU;(function(t){t.Identifier=1})(qU=v.PrepareSupportDefaultBehavior||(v.PrepareSupportDefaultBehavior={}));var LU;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(LU=v.RenameRequest||(v.RenameRequest={}));var MU;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(MU=v.PrepareRenameRequest||(v.PrepareRenameRequest={}));var $U;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})($U=v.ExecuteCommandRequest||(v.ExecuteCommandRequest={}));var FU;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(FU=v.ApplyWorkspaceEditRequest||(v.ApplyWorkspaceEditRequest={}))});var lb=d(wl=>{"use strict";Object.defineProperty(wl,"__esModule",{value:!0});wl.createProtocolConnection=void 0;var cb=_i();function jU(t,e,r,n){return cb.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,cb.createMessageConnection)(t,e,r,n)}wl.createProtocolConnection=jU});var fb=d(fr=>{"use strict";var UU=fr&&fr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ol=fr&&fr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&UU(e,t,r)};Object.defineProperty(fr,"__esModule",{value:!0});fr.LSPErrorCodes=fr.createProtocolConnection=void 0;Ol(_i(),fr);Ol($a(),fr);Ol(ut(),fr);Ol(ub(),fr);var GU=lb();Object.defineProperty(fr,"createProtocolConnection",{enumerable:!0,get:function(){return GU.createProtocolConnection}});var HU;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(HU=fr.LSPErrorCodes||(fr.LSPErrorCodes={}))});var yt=d(Un=>{"use strict";var WU=Un&&Un.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),db=Un&&Un.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&WU(e,t,r)};Object.defineProperty(Un,"__esModule",{value:!0});Un.createProtocolConnection=void 0;var BU=Im();db(Im(),Un);db(fb(),Un);function KU(t,e,r,n){return(0,BU.createMessageConnection)(t,e,r,n)}Un.createProtocolConnection=KU});var Bm=d(Ur=>{"use strict";Object.defineProperty(Ur,"__esModule",{value:!0});Ur.generateUuid=Ur.parse=Ur.isUUID=Ur.v4=Ur.empty=void 0;var Gu=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},oe=class extends Gu{constructor(){super([oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),"-",oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),"-","4",oe._randomHex(),oe._randomHex(),oe._randomHex(),"-",oe._oneOf(oe._timeHighBits),oe._randomHex(),oe._randomHex(),oe._randomHex(),"-",oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return oe._oneOf(oe._chars)}};oe._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];oe._timeHighBits=["8","9","a","b"];Ur.empty=new Gu("00000000-0000-0000-0000-000000000000");function pb(){return new oe}Ur.v4=pb;var zU=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function hb(t){return zU.test(t)}Ur.isUUID=hb;function VU(t){if(!hb(t))throw new Error("invalid uuid");return new Gu(t)}Ur.parse=VU;function XU(){return pb().asHex()}Ur.generateUuid=XU});var mb=d(Ji=>{"use strict";Object.defineProperty(Ji,"__esModule",{value:!0});Ji.attachPartialResult=Ji.ProgressFeature=Ji.attachWorkDone=void 0;var Yi=yt(),YU=Bm(),Gn=class{constructor(e,r){this._connection=e,this._token=r,Gn.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Yi.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Yi.WorkDoneProgress.type,this._token,n)}done(){Gn.Instances.delete(this._token),this._connection.sendProgress(Yi.WorkDoneProgress.type,this._token,{kind:"end"})}};Gn.Instances=new Map;var Dl=class extends Gn{constructor(e,r){super(e,r),this._source=new Yi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Hu=class{constructor(){}begin(){}report(){}done(){}},Il=class extends Hu{constructor(){super(),this._source=new Yi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function JU(t,e){if(e===void 0||e.workDoneToken===void 0)return new Hu;let r=e.workDoneToken;return delete e.workDoneToken,new Gn(t,r)}Ji.attachWorkDone=JU;var QU=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Yi.WorkDoneProgressCancelNotification.type,r=>{let n=Gn.Instances.get(r.token);(n instanceof Dl||n instanceof Il)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Hu:new Gn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,YU.generateUuid)();return this.connection.sendRequest(Yi.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Dl(this.connection,e))}else return Promise.resolve(new Il)}};Ji.ProgressFeature=QU;var Km;(function(t){t.type=new Yi.ProgressType})(Km||(Km={}));var zm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Km.type,this._token,e)}};function ZU(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new zm(t,r)}Ji.attachPartialResult=ZU});var gb=d(xl=>{"use strict";Object.defineProperty(xl,"__esModule",{value:!0});xl.ConfigurationFeature=void 0;var eG=yt(),tG=dl(),rG=t=>class extends t{getConfiguration(e){return e?tG.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(eG.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};xl.ConfigurationFeature=rG});var yb=d(Ll=>{"use strict";Object.defineProperty(Ll,"__esModule",{value:!0});Ll.WorkspaceFoldersFeature=void 0;var ql=yt(),nG=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new ql.Emitter,this.connection.onNotification(ql.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(ql.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(ql.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Ll.WorkspaceFoldersFeature=nG});var vb=d(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.CallHierarchyFeature=void 0;var Vm=yt(),iG=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Vm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Vm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Vm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ml.CallHierarchyFeature=iG});var Ym=d(Qi=>{"use strict";Object.defineProperty(Qi,"__esModule",{value:!0});Qi.SemanticTokensBuilder=Qi.SemanticTokensDiff=Qi.SemanticTokensFeature=void 0;var $l=yt(),oG=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest($l.SemanticTokensRefreshRequest.type),on:e=>{let r=$l.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=$l.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=$l.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Qi.SemanticTokensFeature=oG;var Fl=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let a=i-n+1,s=this.modifiedSequence.slice(n,o+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:a-1}]:[{start:n,deleteCount:a,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Qi.SemanticTokensDiff=Fl;var Xm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let a=e,s=r;this._dataLen>0&&(a-=this._prevLine,a===0&&(s-=this._prevChar)),this._data[this._dataLen++]=a,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Fl(this._prevData,this._data).computeDiff()}:this.build()}};Qi.SemanticTokensBuilder=Xm});var _b=d(jl=>{"use strict";Object.defineProperty(jl,"__esModule",{value:!0});jl.ShowDocumentFeature=void 0;var aG=yt(),sG=t=>class extends t{showDocument(e){return this.connection.sendRequest(aG.ShowDocumentRequest.type,e)}};jl.ShowDocumentFeature=sG});var Tb=d(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.FileOperationsFeature=void 0;var Ba=yt(),uG=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Ba.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Ba.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Ba.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Ba.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Ba.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Ba.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Ul.FileOperationsFeature=uG});var Rb=d(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.LinkedEditingRangeFeature=void 0;var cG=yt(),lG=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(cG.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Gl.LinkedEditingRangeFeature=lG});var bb=d(Hl=>{"use strict";Object.defineProperty(Hl,"__esModule",{value:!0});Hl.TypeHierarchyFeature=void 0;var Jm=yt(),fG=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Jm.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Jm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Jm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Hl.TypeHierarchyFeature=fG});var Pb=d(Wl=>{"use strict";Object.defineProperty(Wl,"__esModule",{value:!0});Wl.InlineValueFeature=void 0;var Ab=yt(),dG=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(Ab.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(Ab.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Wl.InlineValueFeature=dG});var Sb=d(Bl=>{"use strict";Object.defineProperty(Bl,"__esModule",{value:!0});Bl.InlayHintFeature=void 0;var Qm=yt(),pG=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Qm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Qm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Qm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Bl.InlayHintFeature=pG});var Cb=d(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.DiagnosticFeature=void 0;var Wu=yt(),hG=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Wu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Wu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Wu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Wu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Wu.WorkspaceDiagnosticRequest.partialResult,r)))}}};Kl.DiagnosticFeature=hG});var eg=d(zl=>{"use strict";Object.defineProperty(zl,"__esModule",{value:!0});zl.TextDocuments=void 0;var Wo=yt(),Zm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new Wo.Emitter,this._onDidOpen=new Wo.Emitter,this._onDidClose=new Wo.Emitter,this._onDidSave=new Wo.Emitter,this._onWillSave=new Wo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=Wo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let a=Object.freeze({document:o});this._onDidOpen.fire(a),this._onDidChangeContent.fire(a)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:a}=i;if(a==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,o,a),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),Wo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};zl.TextDocuments=Zm});var rg=d(Ka=>{"use strict";Object.defineProperty(Ka,"__esModule",{value:!0});Ka.NotebookDocuments=Ka.NotebookSyncFeature=void 0;var Gr=yt(),Eb=eg(),mG=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Gr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Gr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Gr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Gr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Ka.NotebookSyncFeature=mG;var Zi=class{onDidOpenTextDocument(e){return this.openHandler=e,Gr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Gr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Gr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return Zi.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return Zi.NULL_DISPOSE}onDidSaveTextDocument(){return Zi.NULL_DISPOSE}};Zi.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var tg=class{constructor(e){e instanceof Eb.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new Eb.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Gr.Emitter,this._onDidChange=new Gr.Emitter,this._onDidSave=new Gr.Emitter,this._onDidClose=new Gr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Zi,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let a=o.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,o.metadata=u.metadata);let c=[],l=[],f=[],h=[];if(u.cells!==void 0){let S=u.cells;if(S.structure!==void 0){let A=S.structure.array;if(o.cells.splice(A.start,A.deleteCount,...A.cells!==void 0?A.cells:[]),S.structure.didOpen!==void 0)for(let b of S.structure.didOpen)r.openTextDocument({textDocument:b}),c.push(b.uri);if(S.structure.didClose)for(let b of S.structure.didClose)r.closeTextDocument({textDocument:b}),l.push(b.uri)}if(S.data!==void 0){let A=new Map(S.data.map(b=>[b.document,b]));for(let b=0;b<=o.cells.length;b++){let O=A.get(o.cells[b].document);if(O!==void 0){let $=o.cells.splice(b,1,O);if(f.push({old:$[0],new:O}),A.delete(O.document),A.size===0)break}}}if(S.textContent!==void 0)for(let A of S.textContent)r.changeTextDocument({textDocument:A.document,contentChanges:A.changes}),h.push(A.document.uri)}this.updateCellMap(o);let y={notebookDocument:o};s&&(y.metadata={old:a,new:o.metadata});let m=[];for(let S of c)m.push(this.getNotebookCell(S));let R=[];for(let S of l)R.push(this.getNotebookCell(S));let E=[];for(let S of h)E.push(this.getNotebookCell(S));(m.length>0||R.length>0||f.length>0||E.length>0)&&(y.cells={added:m,removed:R,changed:{data:f,textContent:E}}),(y.metadata!==void 0||y.cells!==void 0)&&this._onDidChange.fire(y)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let a of i.cellTextDocuments)r.closeTextDocument({textDocument:a});this.notebookDocuments.delete(i.notebookDocument.uri);for(let a of o.cells)this.notebookCellMap.delete(a.document)}})),Gr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Ka.NotebookDocuments=tg});var Nb=d(Vl=>{"use strict";Object.defineProperty(Vl,"__esModule",{value:!0});Vl.MonikerFeature=void 0;var gG=yt(),yG=t=>class extends t{get moniker(){return{on:e=>{let r=gG.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Vl.MonikerFeature=yG});var ug=d(ye=>{"use strict";Object.defineProperty(ye,"__esModule",{value:!0});ye.createConnection=ye.combineFeatures=ye.combineNotebooksFeatures=ye.combineLanguagesFeatures=ye.combineWorkspaceFeatures=ye.combineWindowFeatures=ye.combineClientFeatures=ye.combineTracerFeatures=ye.combineTelemetryFeatures=ye.combineConsoleFeatures=ye._NotebooksImpl=ye._LanguagesImpl=ye.BulkUnregistration=ye.BulkRegistration=ye.ErrorMessageTracker=void 0;var G=yt(),Hr=dl(),ig=Bm(),te=mb(),vG=gb(),_G=yb(),TG=vb(),RG=Ym(),bG=_b(),AG=Tb(),PG=Rb(),SG=bb(),CG=Pb(),EG=Sb(),NG=Cb(),kG=rg(),wG=Nb();function ng(t){if(t!==null)return t}var og=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ye.ErrorMessageTracker=og;var Xl=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(G.MessageType.Error,e)}warn(e){this.send(G.MessageType.Warning,e)}info(e){this.send(G.MessageType.Info,e)}log(e){this.send(G.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(G.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,G.RAL)().console.error("Sending log message failed")})}},ag=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:G.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(G.ShowMessageRequest.type,n).then(ng)}showWarningMessage(e,...r){let n={type:G.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(G.ShowMessageRequest.type,n).then(ng)}showInformationMessage(e,...r){let n={type:G.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(G.ShowMessageRequest.type,n).then(ng)}},kb=(0,bG.ShowDocumentFeature)((0,te.ProgressFeature)(ag)),OG;(function(t){function e(){return new Yl}t.create=e})(OG=ye.BulkRegistration||(ye.BulkRegistration={}));var Yl=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Hr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=ig.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},DG;(function(t){function e(){return new Bu(void 0,[])}t.create=e})(DG=ye.BulkUnregistration||(ye.BulkUnregistration={}));var Bu=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(G.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Hr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(G.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Jl=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Yl?this.registerMany(e):e instanceof Bu?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Hr.string(r)?r:r.method,o=ig.generateUuid(),a={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(G.RegistrationRequest.type,a).then(s=>(e.add({id:o,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=Hr.string(e)?e:e.method,i=ig.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(G.RegistrationRequest.type,o).then(a=>G.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),a=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(a)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(G.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(G.RegistrationRequest.type,r).then(()=>new Bu(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},sg=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(G.ApplyWorkspaceEditRequest.type,n)}},wb=(0,AG.FileOperationsFeature)((0,_G.WorkspaceFoldersFeature)((0,vG.ConfigurationFeature)(sg))),Ql=class{constructor(){this._trace=G.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==G.Trace.Off&&this.connection.sendNotification(G.LogTraceNotification.type,{message:e,verbose:this._trace===G.Trace.Verbose?r:void 0}).catch(()=>{})}},Zl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(G.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},ef=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};ye._LanguagesImpl=ef;var Ob=(0,wG.MonikerFeature)((0,NG.DiagnosticFeature)((0,EG.InlayHintFeature)((0,CG.InlineValueFeature)((0,SG.TypeHierarchyFeature)((0,PG.LinkedEditingRangeFeature)((0,RG.SemanticTokensFeature)((0,TG.CallHierarchyFeature)(ef)))))))),tf=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};ye._NotebooksImpl=tf;var Db=(0,kG.NotebookSyncFeature)(tf);function Ib(t,e){return function(r){return e(t(r))}}ye.combineConsoleFeatures=Ib;function xb(t,e){return function(r){return e(t(r))}}ye.combineTelemetryFeatures=xb;function qb(t,e){return function(r){return e(t(r))}}ye.combineTracerFeatures=qb;function Lb(t,e){return function(r){return e(t(r))}}ye.combineClientFeatures=Lb;function Mb(t,e){return function(r){return e(t(r))}}ye.combineWindowFeatures=Mb;function $b(t,e){return function(r){return e(t(r))}}ye.combineWorkspaceFeatures=$b;function Fb(t,e){return function(r){return e(t(r))}}ye.combineLanguagesFeatures=Fb;function jb(t,e){return function(r){return e(t(r))}}ye.combineNotebooksFeatures=jb;function IG(t,e){function r(i,o,a){return i&&o?a(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,Ib),tracer:r(t.tracer,e.tracer,qb),telemetry:r(t.telemetry,e.telemetry,xb),client:r(t.client,e.client,Lb),window:r(t.window,e.window,Mb),workspace:r(t.workspace,e.workspace,$b),languages:r(t.languages,e.languages,Fb),notebooks:r(t.notebooks,e.notebooks,jb)}}ye.combineFeatures=IG;function xG(t,e,r){let n=r&&r.console?new(r.console(Xl)):new Xl,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Ql)):new Ql,a=r&&r.telemetry?new(r.telemetry(Zl)):new Zl,s=r&&r.client?new(r.client(Jl)):new Jl,u=r&&r.window?new(r.window(kb)):new kb,c=r&&r.workspace?new(r.workspace(wb)):new wb,l=r&&r.languages?new(r.languages(Ob)):new Ob,f=r&&r.notebooks?new(r.notebooks(Db)):new Db,h=[n,o,a,s,u,c,l,f];function y(A){return A instanceof Promise?A:Hr.thenable(A)?new Promise((b,O)=>{A.then($=>b($),$=>O($))}):Promise.resolve(A)}let m,R,E,S={listen:()=>i.listen(),sendRequest:(A,...b)=>i.sendRequest(Hr.string(A)?A:A.method,...b),onRequest:(A,b)=>i.onRequest(A,b),sendNotification:(A,b)=>{let O=Hr.string(A)?A:A.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,b)},onNotification:(A,b)=>i.onNotification(A,b),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:A=>(R=A,{dispose:()=>{R=void 0}}),onInitialized:A=>i.onNotification(G.InitializedNotification.type,A),onShutdown:A=>(m=A,{dispose:()=>{m=void 0}}),onExit:A=>(E=A,{dispose:()=>{E=void 0}}),get console(){return n},get telemetry(){return a},get tracer(){return o},get client(){return s},get window(){return u},get workspace(){return c},get languages(){return l},get notebooks(){return f},onDidChangeConfiguration:A=>i.onNotification(G.DidChangeConfigurationNotification.type,A),onDidChangeWatchedFiles:A=>i.onNotification(G.DidChangeWatchedFilesNotification.type,A),__textDocumentSync:void 0,onDidOpenTextDocument:A=>i.onNotification(G.DidOpenTextDocumentNotification.type,A),onDidChangeTextDocument:A=>i.onNotification(G.DidChangeTextDocumentNotification.type,A),onDidCloseTextDocument:A=>i.onNotification(G.DidCloseTextDocumentNotification.type,A),onWillSaveTextDocument:A=>i.onNotification(G.WillSaveTextDocumentNotification.type,A),onWillSaveTextDocumentWaitUntil:A=>i.onRequest(G.WillSaveTextDocumentWaitUntilRequest.type,A),onDidSaveTextDocument:A=>i.onNotification(G.DidSaveTextDocumentNotification.type,A),sendDiagnostics:A=>i.sendNotification(G.PublishDiagnosticsNotification.type,A),onHover:A=>i.onRequest(G.HoverRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),void 0)),onCompletion:A=>i.onRequest(G.CompletionRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onCompletionResolve:A=>i.onRequest(G.CompletionResolveRequest.type,A),onSignatureHelp:A=>i.onRequest(G.SignatureHelpRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),void 0)),onDeclaration:A=>i.onRequest(G.DeclarationRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onDefinition:A=>i.onRequest(G.DefinitionRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onTypeDefinition:A=>i.onRequest(G.TypeDefinitionRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onImplementation:A=>i.onRequest(G.ImplementationRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onReferences:A=>i.onRequest(G.ReferencesRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onDocumentHighlight:A=>i.onRequest(G.DocumentHighlightRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onDocumentSymbol:A=>i.onRequest(G.DocumentSymbolRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onWorkspaceSymbol:A=>i.onRequest(G.WorkspaceSymbolRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onWorkspaceSymbolResolve:A=>i.onRequest(G.WorkspaceSymbolResolveRequest.type,A),onCodeAction:A=>i.onRequest(G.CodeActionRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onCodeActionResolve:A=>i.onRequest(G.CodeActionResolveRequest.type,(b,O)=>A(b,O)),onCodeLens:A=>i.onRequest(G.CodeLensRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onCodeLensResolve:A=>i.onRequest(G.CodeLensResolveRequest.type,(b,O)=>A(b,O)),onDocumentFormatting:A=>i.onRequest(G.DocumentFormattingRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),void 0)),onDocumentRangeFormatting:A=>i.onRequest(G.DocumentRangeFormattingRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),void 0)),onDocumentOnTypeFormatting:A=>i.onRequest(G.DocumentOnTypeFormattingRequest.type,(b,O)=>A(b,O)),onRenameRequest:A=>i.onRequest(G.RenameRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),void 0)),onPrepareRename:A=>i.onRequest(G.PrepareRenameRequest.type,(b,O)=>A(b,O)),onDocumentLinks:A=>i.onRequest(G.DocumentLinkRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onDocumentLinkResolve:A=>i.onRequest(G.DocumentLinkResolveRequest.type,(b,O)=>A(b,O)),onDocumentColor:A=>i.onRequest(G.DocumentColorRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onColorPresentation:A=>i.onRequest(G.ColorPresentationRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onFoldingRanges:A=>i.onRequest(G.FoldingRangeRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onSelectionRanges:A=>i.onRequest(G.SelectionRangeRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),(0,te.attachPartialResult)(i,b))),onExecuteCommand:A=>i.onRequest(G.ExecuteCommandRequest.type,(b,O)=>A(b,O,(0,te.attachWorkDone)(i,b),void 0)),dispose:()=>i.dispose()};for(let A of h)A.attach(S);return i.onRequest(G.InitializeRequest.type,A=>{e.initialize(A),Hr.string(A.trace)&&(o.trace=G.Trace.fromString(A.trace));for(let b of h)b.initialize(A.capabilities);if(R){let b=R(A,new G.CancellationTokenSource().token,(0,te.attachWorkDone)(i,A),void 0);return y(b).then(O=>{if(O instanceof G.ResponseError)return O;let $=O;$||($={capabilities:{}});let W=$.capabilities;W||(W={},$.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=Hr.number(S.__textDocumentSync)?S.__textDocumentSync:G.TextDocumentSyncKind.None:!Hr.number(W.textDocumentSync)&&!Hr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=Hr.number(S.__textDocumentSync)?S.__textDocumentSync:G.TextDocumentSyncKind.None);for(let Z of h)Z.fillServerCapabilities(W);return $})}else{let b={capabilities:{textDocumentSync:G.TextDocumentSyncKind.None}};for(let O of h)O.fillServerCapabilities(b.capabilities);return b}}),i.onRequest(G.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,m)return m(new G.CancellationTokenSource().token)}),i.onNotification(G.ExitNotification.type,()=>{try{E&&E()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(G.SetTraceNotification.type,A=>{o.trace=G.Trace.fromString(A.value)}),S}ye.createConnection=xG});var Gb=d(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.resolveModulePath=dr.FileSystem=dr.resolveGlobalYarnPath=dr.resolveGlobalNodePath=dr.resolve=dr.uriToFilePath=void 0;var qG=require("url"),_n=require("path"),cg=require("fs"),dg=require("child_process");function LG(t){let e=qG.parse(t);if(e.protocol!=="file:"||!e.path)return;let r=e.path.split("/");for(var n=0,i=r.length;n<i;n++)r[n]=decodeURIComponent(r[n]);if(process.platform==="win32"&&r.length>1){let o=r[0],a=r[1];o.length===0&&a.length>1&&a[1]===":"&&r.shift()}return _n.normalize(r.join("/"))}dr.uriToFilePath=LG;function lg(){return process.platform==="win32"}function rf(t,e,r,n){let i="NODE_PATH",o=["var p = process;","p.on('message',function(m){","if(m.c==='e'){","p.exit(0);","}","else if(m.c==='rs'){","try{","var r=require.resolve(m.a);","p.send({c:'r',s:true,r:r});","}","catch(err){","p.send({c:'r',s:false});","}","}","});"].join("");return new Promise((a,s)=>{let u=process.env,c=Object.create(null);Object.keys(u).forEach(l=>c[l]=u[l]),e&&cg.existsSync(e)&&(c[i]?c[i]=e+_n.delimiter+c[i]:c[i]=e,n&&n(`NODE_PATH value is: ${c[i]}`)),c.ELECTRON_RUN_AS_NODE="1";try{let l=(0,dg.fork)("",[],{cwd:r,env:c,execArgv:["-e",o]});if(l.pid===void 0){s(new Error(`Starting process to resolve node module  ${t} failed`));return}l.on("error",h=>{s(h)}),l.on("message",h=>{h.c==="r"&&(l.send({c:"e"}),h.s?a(h.r):s(new Error(`Failed to resolve module: ${t}`)))});let f={c:"rs",a:t};l.send(f)}catch(l){s(l)}})}dr.resolve=rf;function fg(t){let e="npm",r=Object.create(null);Object.keys(process.env).forEach(o=>r[o]=process.env[o]),r.NO_UPDATE_NOTIFIER="true";let n={encoding:"utf8",env:r};lg()&&(e="npm.cmd",n.shell=!0);let i=()=>{};try{process.on("SIGPIPE",i);let o=(0,dg.spawnSync)(e,["config","get","prefix"],n).stdout;if(!o){t&&t("'npm config get prefix' didn't return a value.");return}let a=o.trim();return t&&t(`'npm config get prefix' value is: ${a}`),a.length>0?lg()?_n.join(a,"node_modules"):_n.join(a,"lib","node_modules"):void 0}catch{return}finally{process.removeListener("SIGPIPE",i)}}dr.resolveGlobalNodePath=fg;function MG(t){let e="yarn",r={encoding:"utf8"};lg()&&(e="yarn.cmd",r.shell=!0);let n=()=>{};try{process.on("SIGPIPE",n);let i=(0,dg.spawnSync)(e,["global","dir","--json"],r),o=i.stdout;if(!o){t&&(t("'yarn global dir' didn't return a value."),i.stderr&&t(i.stderr));return}let a=o.trim().split(/\r?\n/);for(let s of a)try{let u=JSON.parse(s);if(u.type==="log")return _n.join(u.data,"node_modules")}catch{}return}catch{return}finally{process.removeListener("SIGPIPE",n)}}dr.resolveGlobalYarnPath=MG;var Ub;(function(t){let e;function r(){return e!==void 0||(process.platform==="win32"?e=!1:e=!cg.existsSync(__filename.toUpperCase())||!cg.existsSync(__filename.toLowerCase())),e}t.isCaseSensitive=r;function n(i,o){return r()?_n.normalize(o).indexOf(_n.normalize(i))===0:_n.normalize(o).toLowerCase().indexOf(_n.normalize(i).toLowerCase())===0}t.isParent=n})(Ub=dr.FileSystem||(dr.FileSystem={}));function $G(t,e,r,n){return r?(_n.isAbsolute(r)||(r=_n.join(t,r)),rf(e,r,r,n).then(i=>Ub.isParent(r,i)?i:Promise.reject(new Error(`Failed to load ${e} from node path location.`))).then(void 0,i=>rf(e,fg(n),t,n))):rf(e,fg(n),t,n)}dr.resolveModulePath=$G});var pg=d((Bde,Hb)=>{"use strict";Hb.exports=yt()});var Bb=d(zt=>{"use strict";var FG=zt&&zt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Wb=zt&&zt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&FG(e,t,r)};Object.defineProperty(zt,"__esModule",{value:!0});zt.ProposedFeatures=zt.NotebookDocuments=zt.TextDocuments=zt.SemanticTokensBuilder=void 0;var jG=Ym();Object.defineProperty(zt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return jG.SemanticTokensBuilder}});Wb(yt(),zt);var UG=eg();Object.defineProperty(zt,"TextDocuments",{enumerable:!0,get:function(){return UG.TextDocuments}});var GG=rg();Object.defineProperty(zt,"NotebookDocuments",{enumerable:!0,get:function(){return GG.NotebookDocuments}});Wb(ug(),zt);var HG;(function(t){t.all={__brand:"features"}})(HG=zt.ProposedFeatures||(zt.ProposedFeatures={}))});var xe=d(Dr=>{"use strict";var WG=Dr&&Dr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),zb=Dr&&Dr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&WG(e,t,r)};Object.defineProperty(Dr,"__esModule",{value:!0});Dr.createConnection=Dr.Files=void 0;var hg=dl(),BG=ug(),Ku=Gb(),Bo=pg();zb(pg(),Dr);zb(Bb(),Dr);var KG;(function(t){t.uriToFilePath=Ku.uriToFilePath,t.resolveGlobalNodePath=Ku.resolveGlobalNodePath,t.resolveGlobalYarnPath=Ku.resolveGlobalYarnPath,t.resolve=Ku.resolve,t.resolveModulePath=Ku.resolveModulePath})(KG=Dr.Files||(Dr.Files={}));var Kb;function nf(){if(Kb!==void 0)try{Kb.end()}catch{}}var za=!1,Vb;function zG(){let t="--clientProcessId";function e(r){try{let n=parseInt(r);isNaN(n)||(Vb=setInterval(()=>{try{process.kill(n,0)}catch{nf(),process.exit(za?0:1)}},3e3))}catch{}}for(let r=2;r<process.argv.length;r++){let n=process.argv[r];if(n===t&&r+1<process.argv.length){e(process.argv[r+1]);return}else{let i=n.split("=");i[0]===t&&e(i[1])}}}zG();var VG={initialize:t=>{let e=t.processId;hg.number(e)&&Vb===void 0&&setInterval(()=>{try{process.kill(e,0)}catch{process.exit(za?0:1)}},3e3)},get shutdownReceived(){return za},set shutdownReceived(t){za=t},exit:t=>{nf(),process.exit(t)}};function XG(t,e,r,n){let i,o,a,s;return t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Bo.ConnectionStrategy.is(t)||Bo.ConnectionOptions.is(t)?s=t:(o=t,a=e,s=r),YG(o,a,s,i)}Dr.createConnection=XG;function YG(t,e,r,n){if(!t&&!e&&process.argv.length>2){let s,u,c=process.argv.slice(2);for(let l=0;l<c.length;l++){let f=c[l];if(f==="--node-ipc"){t=new Bo.IPCMessageReader(process),e=new Bo.IPCMessageWriter(process);break}else if(f==="--stdio"){t=process.stdin,e=process.stdout;break}else if(f==="--socket"){s=parseInt(c[l+1]);break}else if(f==="--pipe"){u=c[l+1];break}else{var i=f.split("=");if(i[0]==="--socket"){s=parseInt(i[1]);break}else if(i[0]==="--pipe"){u=i[1];break}}}if(s){let l=(0,Bo.createServerSocketTransport)(s);t=l[0],e=l[1]}else if(u){let l=(0,Bo.createServerPipeTransport)(u);t=l[0],e=l[1]}}var o="Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";if(!t)throw new Error("Connection input stream is not set. "+o);if(!e)throw new Error("Connection output stream is not set. "+o);if(hg.func(t.read)&&hg.func(t.on)){let s=t;s.on("end",()=>{nf(),process.exit(za?0:1)}),s.on("close",()=>{nf(),process.exit(za?0:1)})}let a=s=>(0,Bo.createProtocolConnection)(t,e,s,r);return(0,BG.createConnection)(a,VG,n)}});var mg=d((af,of)=>{var JG=af&&af.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,o;n<i;n++)(o||!(n in e))&&(o||(o=Array.prototype.slice.call(e,0,n)),o[n]=e[n]);return t.concat(o||Array.prototype.slice.call(e))};(function(t){if(typeof of=="object"&&typeof of.exports=="object"){var e=t(require,af);e!==void 0&&(of.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(c,l,f,h){this._uri=c,this._languageId=l,this._version=f,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(c){if(c){var l=this.offsetAt(c.start),f=this.offsetAt(c.end);return this._content.substring(l,f)}return this._content},u.prototype.update=function(c,l){for(var f=0,h=c;f<h.length;f++){var y=h[f];if(u.isIncremental(y)){var m=a(y.range),R=this.offsetAt(m.start),E=this.offsetAt(m.end);this._content=this._content.substring(0,R)+y.text+this._content.substring(E,this._content.length);var S=Math.max(m.start.line,0),A=Math.max(m.end.line,0),b=this._lineOffsets,O=o(y.text,!1,R);if(A-S===O.length)for(var $=0,W=O.length;$<W;$++)b[$+S+1]=O[$];else O.length<1e4?b.splice.apply(b,JG([S+1,A-S],O,!1)):this._lineOffsets=b=b.slice(0,S+1).concat(O,b.slice(A+1));var Z=y.text.length-(E-R);if(Z!==0)for(var $=S+1+O.length,W=b.length;$<W;$++)b[$]=b[$]+Z}else if(u.isFull(y))this._content=y.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=l},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=o(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(c){c=Math.max(Math.min(c,this._content.length),0);var l=this.getLineOffsets(),f=0,h=l.length;if(h===0)return{line:0,character:c};for(;f<h;){var y=Math.floor((f+h)/2);l[y]>c?h=y:f=y+1}var m=f-1;return{line:m,character:c-l[m]}},u.prototype.offsetAt=function(c){var l=this.getLineOffsets();if(c.line>=l.length)return this._content.length;if(c.line<0)return 0;var f=l[c.line],h=c.line+1<l.length?l[c.line+1]:this._content.length;return Math.max(Math.min(f+c.character,h),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(c){var l=c;return l!=null&&typeof l.text=="string"&&l.range!==void 0&&(l.rangeLength===void 0||typeof l.rangeLength=="number")},u.isFull=function(c){var l=c;return l!=null&&typeof l.text=="string"&&l.range===void 0&&l.rangeLength===void 0},u}(),n;(function(u){function c(h,y,m,R){return new r(h,y,m,R)}u.create=c;function l(h,y,m){if(h instanceof r)return h.update(y,m),h;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=l;function f(h,y){for(var m=h.getText(),R=i(y.map(s),function(W,Z){var Ee=W.range.start.line-Z.range.start.line;return Ee===0?W.range.start.character-Z.range.start.character:Ee}),E=0,S=[],A=0,b=R;A<b.length;A++){var O=b[A],$=h.offsetAt(O.range.start);if($<E)throw new Error("Overlapping edit");$>E&&S.push(m.substring(E,$)),O.newText.length&&S.push(O.newText),E=h.offsetAt(O.range.end)}return S.push(m.substr(E)),S.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,c){if(u.length<=1)return u;var l=u.length/2|0,f=u.slice(0,l),h=u.slice(l);i(f,c),i(h,c);for(var y=0,m=0,R=0;y<f.length&&m<h.length;){var E=c(f[y],h[m]);E<=0?u[R++]=f[y++]:u[R++]=h[m++]}for(;y<f.length;)u[R++]=f[y++];for(;m<h.length;)u[R++]=h[m++];return u}function o(u,c,l){l===void 0&&(l=0);for(var f=c?[l]:[],h=0;h<u.length;h++){var y=u.charCodeAt(h);(y===13||y===10)&&(y===13&&h+1<u.length&&u.charCodeAt(h+1)===10&&h++,f.push(l+h+1))}return f}function a(u){var c=u.start,l=u.end;return c.line>l.line||c.line===l.line&&c.character>l.character?{start:l,end:c}:u}function s(u){var c=a(u.range);return c!==u.range?{newText:u.newText,range:c}:u}})});var tr=d(Mt=>{"use strict";Object.defineProperty(Mt,"__esModule",{value:!0});Mt.isRootCstNode=Mt.isLeafCstNode=Mt.isCompositeCstNode=Mt.AbstractAstReflection=Mt.isLinkingError=Mt.isAstNodeDescription=Mt.isReference=Mt.isAstNode=void 0;function yg(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}Mt.isAstNode=yg;function Xb(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}Mt.isReference=Xb;function QG(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}Mt.isAstNodeDescription=QG;function ZG(t){return typeof t=="object"&&t!==null&&yg(t.container)&&Xb(t.reference)&&typeof t.message=="string"}Mt.isLinkingError=ZG;var gg=class{constructor(){this.subtypes={}}isInstance(e,r){return yg(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}};Mt.AbstractAstReflection=gg;function Yb(t){return typeof t=="object"&&t!==null&&"children"in t}Mt.isCompositeCstNode=Yb;function eH(t){return typeof t=="object"&&t!==null&&"tokenType"in t}Mt.isLeafCstNode=eH;function tH(t){return Yb(t)&&"fullText"in t}Mt.isRootCstNode=tH});var $t=d(ze=>{"use strict";Object.defineProperty(ze,"__esModule",{value:!0});ze.Reduction=ze.TreeStreamImpl=ze.stream=ze.DONE_RESULT=ze.EMPTY_STREAM=ze.StreamImpl=void 0;var Vt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new Vt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return ze.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=rH(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new Vt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?ze.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new Vt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return ze.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new Vt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(sf(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return ze.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new Vt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let a=n.iterator.next();if(a.done)n.iterator=void 0;else return a}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(sf(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return ze.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new Vt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new Vt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?ze.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};ze.StreamImpl=Vt;function rH(t){return typeof t=="string"?t:typeof t=="undefined"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function sf(t){return!!t&&typeof t[Symbol.iterator]=="function"}ze.EMPTY_STREAM=new Vt(()=>{},()=>ze.DONE_RESULT);ze.DONE_RESULT=Object.freeze({done:!0,value:void 0});function nH(...t){if(t.length===1){let e=t[0];if(e instanceof Vt)return e;if(sf(e))return new Vt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Vt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:ze.DONE_RESULT)}return t.length>1?new Vt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];sf(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return ze.DONE_RESULT}):ze.EMPTY_STREAM}ze.stream=nH;var vg=class extends Vt{constructor(e,r,n){super(()=>({iterators:n!=null&&n.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let a=i.iterators[i.iterators.length-1].next();if(a.done)i.iterators.pop();else return i.iterators.push(r(a.value)[Symbol.iterator]()),a}return ze.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};ze.TreeStreamImpl=vg;var iH;(function(t){function e(o){return o.reduce((a,s)=>a+s,0)}t.sum=e;function r(o){return o.reduce((a,s)=>a*s,0)}t.product=r;function n(o){return o.reduce((a,s)=>Math.min(a,s))}t.min=n;function i(o){return o.reduce((a,s)=>Math.max(a,s))}t.max=i})(iH=ze.Reduction||(ze.Reduction={}))});var Le=d(se=>{"use strict";Object.defineProperty(se,"__esModule",{value:!0});se.getInteriorNodes=se.getStartlineNode=se.getNextNode=se.getPreviousNode=se.findLeafNodeAtOffset=se.isCommentNode=se.findCommentNode=se.findDeclarationNodeAtOffset=se.DefaultNameRegexp=se.inRange=se.compareRange=se.RangeComparison=se.toDocumentSegment=se.tokenToRange=se.isCstChildNode=se.flattenCst=se.streamCst=void 0;var Va=tr(),oH=$t();function Qb(t){return new oH.TreeStreamImpl(t,e=>(0,Va.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}se.streamCst=Qb;function aH(t){return Qb(t).filter(Va.isLeafCstNode)}se.flattenCst=aH;function sH(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}se.isCstChildNode=sH;function uH(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}se.tokenToRange=uH;function cH(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}se.toDocumentSegment=cH;var Ko;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Ko=se.RangeComparison||(se.RangeComparison={}));function Zb(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Ko.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Ko.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Ko.Inside:r?Ko.OverlapBack:Ko.OverlapFront}se.compareRange=Zb;function lH(t,e){return Zb(t,e)>Ko.After}se.inRange=lH;se.DefaultNameRegexp=/^[\w\p{L}]$/u;function fH(t,e,r=se.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return uf(t,e)}}se.findDeclarationNodeAtOffset=fH;function dH(t,e){if(t){let r=eA(t,!0);if(r&&_g(r,e))return r;if((0,Va.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.children[i];if(_g(o,e))return o}}}}se.findCommentNode=dH;function _g(t,e){return(0,Va.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}se.isCommentNode=_g;function uf(t,e){if((0,Va.isLeafCstNode)(t))return t;if((0,Va.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.children[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return uf(o,e)}if(r===n)return uf(t.children[r],e)}}se.findLeafNodeAtOffset=uf;function eA(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}se.getPreviousNode=eA;function pH(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}se.getNextNode=pH;function hH(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,o=n!=null?n:i.children.indexOf(t);if(o===0?(t=i,n=void 0):(n=o-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}se.getStartlineNode=hH;function mH(t,e){let r=gH(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}se.getInteriorNodes=mH;function gH(t,e){let r=Jb(t),n=Jb(e),i;for(let o=0;o<r.length&&o<n.length;o++){let a=r[o],s=n[o];if(a.parent===s.parent)i={parent:a.parent,a:a.index,b:s.index};else break}return i}function Jb(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var Wr=d((zu,Tg)=>{(function(t,e){if(typeof zu=="object"&&typeof Tg=="object")Tg.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof zu=="object"?zu:t)[n]=r[n]}})(zu,()=>(()=>{"use strict";var t={470:i=>{function o(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function a(u,c){for(var l,f="",h=0,y=-1,m=0,R=0;R<=u.length;++R){if(R<u.length)l=u.charCodeAt(R);else{if(l===47)break;l=47}if(l===47){if(!(y===R-1||m===1))if(y!==R-1&&m===2){if(f.length<2||h!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var E=f.lastIndexOf("/");if(E!==f.length-1){E===-1?(f="",h=0):h=(f=f.slice(0,E)).length-1-f.lastIndexOf("/"),y=R,m=0;continue}}else if(f.length===2||f.length===1){f="",h=0,y=R,m=0;continue}}c&&(f.length>0?f+="/..":f="..",h=2)}else f.length>0?f+="/"+u.slice(y+1,R):f=u.slice(y+1,R),h=R-y-1;y=R,m=0}else l===46&&m!==-1?++m:m=-1}return f}var s={resolve:function(){for(var u,c="",l=!1,f=arguments.length-1;f>=-1&&!l;f--){var h;f>=0?h=arguments[f]:(u===void 0&&(u=process.cwd()),h=u),o(h),h.length!==0&&(c=h+"/"+c,l=h.charCodeAt(0)===47)}return c=a(c,!l),l?c.length>0?"/"+c:"/":c.length>0?c:"."},normalize:function(u){if(o(u),u.length===0)return".";var c=u.charCodeAt(0)===47,l=u.charCodeAt(u.length-1)===47;return(u=a(u,!c)).length!==0||c||(u="."),u.length>0&&l&&(u+="/"),c?"/"+u:u},isAbsolute:function(u){return o(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,c=0;c<arguments.length;++c){var l=arguments[c];o(l),l.length>0&&(u===void 0?u=l:u+="/"+l)}return u===void 0?".":s.normalize(u)},relative:function(u,c){if(o(u),o(c),u===c||(u=s.resolve(u))===(c=s.resolve(c)))return"";for(var l=1;l<u.length&&u.charCodeAt(l)===47;++l);for(var f=u.length,h=f-l,y=1;y<c.length&&c.charCodeAt(y)===47;++y);for(var m=c.length-y,R=h<m?h:m,E=-1,S=0;S<=R;++S){if(S===R){if(m>R){if(c.charCodeAt(y+S)===47)return c.slice(y+S+1);if(S===0)return c.slice(y+S)}else h>R&&(u.charCodeAt(l+S)===47?E=S:S===0&&(E=0));break}var A=u.charCodeAt(l+S);if(A!==c.charCodeAt(y+S))break;A===47&&(E=S)}var b="";for(S=l+E+1;S<=f;++S)S!==f&&u.charCodeAt(S)!==47||(b.length===0?b+="..":b+="/..");return b.length>0?b+c.slice(y+E):(y+=E,c.charCodeAt(y)===47&&++y,c.slice(y))},_makeLong:function(u){return u},dirname:function(u){if(o(u),u.length===0)return".";for(var c=u.charCodeAt(0),l=c===47,f=-1,h=!0,y=u.length-1;y>=1;--y)if((c=u.charCodeAt(y))===47){if(!h){f=y;break}}else h=!1;return f===-1?l?"/":".":l&&f===1?"//":u.slice(0,f)},basename:function(u,c){if(c!==void 0&&typeof c!="string")throw new TypeError('"ext" argument must be a string');o(u);var l,f=0,h=-1,y=!0;if(c!==void 0&&c.length>0&&c.length<=u.length){if(c.length===u.length&&c===u)return"";var m=c.length-1,R=-1;for(l=u.length-1;l>=0;--l){var E=u.charCodeAt(l);if(E===47){if(!y){f=l+1;break}}else R===-1&&(y=!1,R=l+1),m>=0&&(E===c.charCodeAt(m)?--m==-1&&(h=l):(m=-1,h=R))}return f===h?h=R:h===-1&&(h=u.length),u.slice(f,h)}for(l=u.length-1;l>=0;--l)if(u.charCodeAt(l)===47){if(!y){f=l+1;break}}else h===-1&&(y=!1,h=l+1);return h===-1?"":u.slice(f,h)},extname:function(u){o(u);for(var c=-1,l=0,f=-1,h=!0,y=0,m=u.length-1;m>=0;--m){var R=u.charCodeAt(m);if(R!==47)f===-1&&(h=!1,f=m+1),R===46?c===-1?c=m:y!==1&&(y=1):c!==-1&&(y=-1);else if(!h){l=m+1;break}}return c===-1||f===-1||y===0||y===1&&c===f-1&&c===l+1?"":u.slice(c,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(c,l){var f=l.dir||l.root,h=l.base||(l.name||"")+(l.ext||"");return f?f===l.root?f+h:f+"/"+h:h}(0,u)},parse:function(u){o(u);var c={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return c;var l,f=u.charCodeAt(0),h=f===47;h?(c.root="/",l=1):l=0;for(var y=-1,m=0,R=-1,E=!0,S=u.length-1,A=0;S>=l;--S)if((f=u.charCodeAt(S))!==47)R===-1&&(E=!1,R=S+1),f===46?y===-1?y=S:A!==1&&(A=1):y!==-1&&(A=-1);else if(!E){m=S+1;break}return y===-1||R===-1||A===0||A===1&&y===R-1&&y===m+1?R!==-1&&(c.base=c.name=m===0&&h?u.slice(1,R):u.slice(m,R)):(m===0&&h?(c.name=u.slice(1,y),c.base=u.slice(1,R)):(c.name=u.slice(m,y),c.base=u.slice(m,R)),c.ext=u.slice(y,R)),m>0?c.dir=u.slice(0,m-1):h&&(c.dir="/"),c},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,o)=>{if(Object.defineProperty(o,"__esModule",{value:!0}),o.isWindows=void 0,typeof process=="object")o.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var a=navigator.userAgent;o.isWindows=a.indexOf("Windows")>=0}},796:function(i,o,a){var s,u,c=this&&this.__extends||(s=function(L,q){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(F,B){F.__proto__=B}||function(F,B){for(var ne in B)Object.prototype.hasOwnProperty.call(B,ne)&&(F[ne]=B[ne])},s(L,q)},function(L,q){if(typeof q!="function"&&q!==null)throw new TypeError("Class extends value "+String(q)+" is not a constructor or null");function F(){this.constructor=L}s(L,q),L.prototype=q===null?Object.create(q):(F.prototype=q.prototype,new F)});Object.defineProperty(o,"__esModule",{value:!0}),o.uriToFsPath=o.URI=void 0;var l=a(674),f=/^\w[\w\d+.-]*$/,h=/^\//,y=/^\/\//;function m(L,q){if(!L.scheme&&q)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(L.authority,'", path: "').concat(L.path,'", query: "').concat(L.query,'", fragment: "').concat(L.fragment,'"}'));if(L.scheme&&!f.test(L.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(L.path){if(L.authority){if(!h.test(L.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(y.test(L.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var R="",E="/",S=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,A=function(){function L(q,F,B,ne,ie,J){J===void 0&&(J=!1),typeof q=="object"?(this.scheme=q.scheme||R,this.authority=q.authority||R,this.path=q.path||R,this.query=q.query||R,this.fragment=q.fragment||R):(this.scheme=function(lt,Ze){return lt||Ze?lt:"file"}(q,J),this.authority=F||R,this.path=function(lt,Ze){switch(lt){case"https":case"http":case"file":Ze?Ze[0]!==E&&(Ze=E+Ze):Ze=E}return Ze}(this.scheme,B||R),this.query=ne||R,this.fragment=ie||R,m(this,J))}return L.isUri=function(q){return q instanceof L||!!q&&typeof q.authority=="string"&&typeof q.fragment=="string"&&typeof q.path=="string"&&typeof q.query=="string"&&typeof q.scheme=="string"&&typeof q.fsPath=="string"&&typeof q.with=="function"&&typeof q.toString=="function"},Object.defineProperty(L.prototype,"fsPath",{get:function(){return Ee(this,!1)},enumerable:!1,configurable:!0}),L.prototype.with=function(q){if(!q)return this;var F=q.scheme,B=q.authority,ne=q.path,ie=q.query,J=q.fragment;return F===void 0?F=this.scheme:F===null&&(F=R),B===void 0?B=this.authority:B===null&&(B=R),ne===void 0?ne=this.path:ne===null&&(ne=R),ie===void 0?ie=this.query:ie===null&&(ie=R),J===void 0?J=this.fragment:J===null&&(J=R),F===this.scheme&&B===this.authority&&ne===this.path&&ie===this.query&&J===this.fragment?this:new O(F,B,ne,ie,J)},L.parse=function(q,F){F===void 0&&(F=!1);var B=S.exec(q);return B?new O(B[2]||R,ce(B[4]||R),ce(B[5]||R),ce(B[7]||R),ce(B[9]||R),F):new O(R,R,R,R,R)},L.file=function(q){var F=R;if(l.isWindows&&(q=q.replace(/\\/g,E)),q[0]===E&&q[1]===E){var B=q.indexOf(E,2);B===-1?(F=q.substring(2),q=E):(F=q.substring(2,B),q=q.substring(B)||E)}return new O("file",F,q,R,R)},L.from=function(q){var F=new O(q.scheme,q.authority,q.path,q.query,q.fragment);return m(F,!0),F},L.prototype.toString=function(q){return q===void 0&&(q=!1),Ne(this,q)},L.prototype.toJSON=function(){return this},L.revive=function(q){if(q){if(q instanceof L)return q;var F=new O(q);return F._formatted=q.external,F._fsPath=q._sep===b?q.fsPath:null,F}return q},L}();o.URI=A;var b=l.isWindows?1:void 0,O=function(L){function q(){var F=L!==null&&L.apply(this,arguments)||this;return F._formatted=null,F._fsPath=null,F}return c(q,L),Object.defineProperty(q.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=Ee(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),q.prototype.toString=function(F){return F===void 0&&(F=!1),F?Ne(this,!0):(this._formatted||(this._formatted=Ne(this,!1)),this._formatted)},q.prototype.toJSON=function(){var F={$mid:1};return this._fsPath&&(F.fsPath=this._fsPath,F._sep=b),this._formatted&&(F.external=this._formatted),this.path&&(F.path=this.path),this.scheme&&(F.scheme=this.scheme),this.authority&&(F.authority=this.authority),this.query&&(F.query=this.query),this.fragment&&(F.fragment=this.fragment),F},q}(A),$=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(L,q,F){for(var B=void 0,ne=-1,ie=0;ie<L.length;ie++){var J=L.charCodeAt(ie);if(J>=97&&J<=122||J>=65&&J<=90||J>=48&&J<=57||J===45||J===46||J===95||J===126||q&&J===47||F&&J===91||F&&J===93||F&&J===58)ne!==-1&&(B+=encodeURIComponent(L.substring(ne,ie)),ne=-1),B!==void 0&&(B+=L.charAt(ie));else{B===void 0&&(B=L.substr(0,ie));var lt=$[J];lt!==void 0?(ne!==-1&&(B+=encodeURIComponent(L.substring(ne,ie)),ne=-1),B+=lt):ne===-1&&(ne=ie)}}return ne!==-1&&(B+=encodeURIComponent(L.substring(ne))),B!==void 0?B:L}function Z(L){for(var q=void 0,F=0;F<L.length;F++){var B=L.charCodeAt(F);B===35||B===63?(q===void 0&&(q=L.substr(0,F)),q+=$[B]):q!==void 0&&(q+=L[F])}return q!==void 0?q:L}function Ee(L,q){var F;return F=L.authority&&L.path.length>1&&L.scheme==="file"?"//".concat(L.authority).concat(L.path):L.path.charCodeAt(0)===47&&(L.path.charCodeAt(1)>=65&&L.path.charCodeAt(1)<=90||L.path.charCodeAt(1)>=97&&L.path.charCodeAt(1)<=122)&&L.path.charCodeAt(2)===58?q?L.path.substr(1):L.path[1].toLowerCase()+L.path.substr(2):L.path,l.isWindows&&(F=F.replace(/\//g,"\\")),F}function Ne(L,q){var F=q?Z:W,B="",ne=L.scheme,ie=L.authority,J=L.path,lt=L.query,Ze=L.fragment;if(ne&&(B+=ne,B+=":"),(ie||ne==="file")&&(B+=E,B+=E),ie){var Dt=ie.indexOf("@");if(Dt!==-1){var on=ie.substr(0,Dt);ie=ie.substr(Dt+1),(Dt=on.lastIndexOf(":"))===-1?B+=F(on,!1,!1):(B+=F(on.substr(0,Dt),!1,!1),B+=":",B+=F(on.substr(Dt+1),!1,!0)),B+="@"}(Dt=(ie=ie.toLowerCase()).lastIndexOf(":"))===-1?B+=F(ie,!1,!0):(B+=F(ie.substr(0,Dt),!1,!0),B+=ie.substr(Dt))}if(J){if(J.length>=3&&J.charCodeAt(0)===47&&J.charCodeAt(2)===58)(wr=J.charCodeAt(1))>=65&&wr<=90&&(J="/".concat(String.fromCharCode(wr+32),":").concat(J.substr(3)));else if(J.length>=2&&J.charCodeAt(1)===58){var wr;(wr=J.charCodeAt(0))>=65&&wr<=90&&(J="".concat(String.fromCharCode(wr+32),":").concat(J.substr(2)))}B+=F(J,!0,!1)}return lt&&(B+="?",B+=F(lt,!1,!1)),Ze&&(B+="#",B+=q?Ze:W(Ze,!1,!1)),B}function Ye(L){try{return decodeURIComponent(L)}catch{return L.length>3?L.substr(0,3)+Ye(L.substr(3)):L}}o.uriToFsPath=Ee;var K=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function ce(L){return L.match(K)?L.replace(K,function(q){return Ye(q)}):L}},679:function(i,o,a){var s=this&&this.__spreadArray||function(h,y,m){if(m||arguments.length===2)for(var R,E=0,S=y.length;E<S;E++)!R&&E in y||(R||(R=Array.prototype.slice.call(y,0,E)),R[E]=y[E]);return h.concat(R||Array.prototype.slice.call(y))};Object.defineProperty(o,"__esModule",{value:!0}),o.Utils=void 0;var u,c=a(470),l=c.posix||c,f="/";(u=o.Utils||(o.Utils={})).joinPath=function(h){for(var y=[],m=1;m<arguments.length;m++)y[m-1]=arguments[m];return h.with({path:l.join.apply(l,s([h.path],y,!1))})},u.resolvePath=function(h){for(var y=[],m=1;m<arguments.length;m++)y[m-1]=arguments[m];var R=h.path,E=!1;R[0]!==f&&(R=f+R,E=!0);var S=l.resolve.apply(l,s([R],y,!1));return E&&S[0]===f&&!h.authority&&(S=S.substring(1)),h.with({path:S})},u.dirname=function(h){if(h.path.length===0||h.path===f)return h;var y=l.dirname(h.path);return y.length===1&&y.charCodeAt(0)===46&&(y=""),h.with({path:y})},u.basename=function(h){return l.basename(h.path)},u.extname=function(h){return l.extname(h.path)}}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var a=e[i]={exports:{}};return t[i].call(a.exports,a,a.exports,r),a.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var o=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return o.URI}});var a=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return a.Utils}})})(),n})())});var Vu=d(Xa=>{"use strict";Object.defineProperty(Xa,"__esModule",{value:!0});Xa.eagerLoad=Xa.inject=void 0;function yH(t,e,r,n){let i=[t,e,r,n].reduce(oA,{});return iA(i)}Xa.inject=yH;var Rg=Symbol("isProxy");function nA(t){if(t&&t[Rg])for(let e of Object.values(t))nA(e);return t}Xa.eagerLoad=nA;function iA(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>rA(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(rA(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Rg]});return r[Rg]=!0,r}var tA=Symbol();function rA(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===tA)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=tA;try{t[e]=typeof i=="function"?i(n):iA(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function oA(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=oA(i,n):t[r]=n}}return t}});var Tn=d(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.MultiMap=void 0;var Ya=$t(),bg=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ya.Reduction.sum((0,Ya.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,Ya.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,Ya.stream)(this.map.keys())}values(){return(0,Ya.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,Ya.stream)(this.map.entries())}};cf.MultiMap=bg});var ke=d(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isUnionType=_.UnionType=_.isTypeAttribute=_.TypeAttribute=_.isType=_.Type=_.isTerminalRule=_.TerminalRule=_.isSimpleType=_.SimpleType=_.isReturnType=_.ReturnType=_.isReferenceType=_.ReferenceType=_.isParserRule=_.ParserRule=_.isParameterReference=_.ParameterReference=_.isParameter=_.Parameter=_.isNegation=_.Negation=_.isNamedArgument=_.NamedArgument=_.isLiteralCondition=_.LiteralCondition=_.isInterface=_.Interface=_.isInferredType=_.InferredType=_.isGrammarImport=_.GrammarImport=_.isGrammar=_.Grammar=_.isDisjunction=_.Disjunction=_.isConjunction=_.Conjunction=_.isArrayType=_.ArrayType=_.isAbstractElement=_.AbstractElement=_.isTypeDefinition=_.TypeDefinition=_.isCondition=_.Condition=_.isAbstractType=_.AbstractType=_.isAbstractRule=_.AbstractRule=void 0;_.reflection=_.LangiumGrammarAstReflection=_.isWildcard=_.Wildcard=_.isUntilToken=_.UntilToken=_.isUnorderedGroup=_.UnorderedGroup=_.isTerminalRuleCall=_.TerminalRuleCall=_.isTerminalGroup=_.TerminalGroup=_.isTerminalAlternatives=_.TerminalAlternatives=_.isRuleCall=_.RuleCall=_.isRegexToken=_.RegexToken=_.isNegatedToken=_.NegatedToken=_.isKeyword=_.Keyword=_.isGroup=_.Group=_.isCrossReference=_.CrossReference=_.isCharacterRange=_.CharacterRange=_.isAssignment=_.Assignment=_.isAlternatives=_.Alternatives=_.isAction=_.Action=void 0;var vH=tr();_.AbstractRule="AbstractRule";function _H(t){return _.reflection.isInstance(t,_.AbstractRule)}_.isAbstractRule=_H;_.AbstractType="AbstractType";function TH(t){return _.reflection.isInstance(t,_.AbstractType)}_.isAbstractType=TH;_.Condition="Condition";function RH(t){return _.reflection.isInstance(t,_.Condition)}_.isCondition=RH;_.TypeDefinition="TypeDefinition";function bH(t){return _.reflection.isInstance(t,_.TypeDefinition)}_.isTypeDefinition=bH;_.AbstractElement="AbstractElement";function AH(t){return _.reflection.isInstance(t,_.AbstractElement)}_.isAbstractElement=AH;_.ArrayType="ArrayType";function PH(t){return _.reflection.isInstance(t,_.ArrayType)}_.isArrayType=PH;_.Conjunction="Conjunction";function SH(t){return _.reflection.isInstance(t,_.Conjunction)}_.isConjunction=SH;_.Disjunction="Disjunction";function CH(t){return _.reflection.isInstance(t,_.Disjunction)}_.isDisjunction=CH;_.Grammar="Grammar";function EH(t){return _.reflection.isInstance(t,_.Grammar)}_.isGrammar=EH;_.GrammarImport="GrammarImport";function NH(t){return _.reflection.isInstance(t,_.GrammarImport)}_.isGrammarImport=NH;_.InferredType="InferredType";function kH(t){return _.reflection.isInstance(t,_.InferredType)}_.isInferredType=kH;_.Interface="Interface";function wH(t){return _.reflection.isInstance(t,_.Interface)}_.isInterface=wH;_.LiteralCondition="LiteralCondition";function OH(t){return _.reflection.isInstance(t,_.LiteralCondition)}_.isLiteralCondition=OH;_.NamedArgument="NamedArgument";function DH(t){return _.reflection.isInstance(t,_.NamedArgument)}_.isNamedArgument=DH;_.Negation="Negation";function IH(t){return _.reflection.isInstance(t,_.Negation)}_.isNegation=IH;_.Parameter="Parameter";function xH(t){return _.reflection.isInstance(t,_.Parameter)}_.isParameter=xH;_.ParameterReference="ParameterReference";function qH(t){return _.reflection.isInstance(t,_.ParameterReference)}_.isParameterReference=qH;_.ParserRule="ParserRule";function LH(t){return _.reflection.isInstance(t,_.ParserRule)}_.isParserRule=LH;_.ReferenceType="ReferenceType";function MH(t){return _.reflection.isInstance(t,_.ReferenceType)}_.isReferenceType=MH;_.ReturnType="ReturnType";function $H(t){return _.reflection.isInstance(t,_.ReturnType)}_.isReturnType=$H;_.SimpleType="SimpleType";function FH(t){return _.reflection.isInstance(t,_.SimpleType)}_.isSimpleType=FH;_.TerminalRule="TerminalRule";function jH(t){return _.reflection.isInstance(t,_.TerminalRule)}_.isTerminalRule=jH;_.Type="Type";function UH(t){return _.reflection.isInstance(t,_.Type)}_.isType=UH;_.TypeAttribute="TypeAttribute";function GH(t){return _.reflection.isInstance(t,_.TypeAttribute)}_.isTypeAttribute=GH;_.UnionType="UnionType";function HH(t){return _.reflection.isInstance(t,_.UnionType)}_.isUnionType=HH;_.Action="Action";function WH(t){return _.reflection.isInstance(t,_.Action)}_.isAction=WH;_.Alternatives="Alternatives";function BH(t){return _.reflection.isInstance(t,_.Alternatives)}_.isAlternatives=BH;_.Assignment="Assignment";function KH(t){return _.reflection.isInstance(t,_.Assignment)}_.isAssignment=KH;_.CharacterRange="CharacterRange";function zH(t){return _.reflection.isInstance(t,_.CharacterRange)}_.isCharacterRange=zH;_.CrossReference="CrossReference";function VH(t){return _.reflection.isInstance(t,_.CrossReference)}_.isCrossReference=VH;_.Group="Group";function XH(t){return _.reflection.isInstance(t,_.Group)}_.isGroup=XH;_.Keyword="Keyword";function YH(t){return _.reflection.isInstance(t,_.Keyword)}_.isKeyword=YH;_.NegatedToken="NegatedToken";function JH(t){return _.reflection.isInstance(t,_.NegatedToken)}_.isNegatedToken=JH;_.RegexToken="RegexToken";function QH(t){return _.reflection.isInstance(t,_.RegexToken)}_.isRegexToken=QH;_.RuleCall="RuleCall";function ZH(t){return _.reflection.isInstance(t,_.RuleCall)}_.isRuleCall=ZH;_.TerminalAlternatives="TerminalAlternatives";function eW(t){return _.reflection.isInstance(t,_.TerminalAlternatives)}_.isTerminalAlternatives=eW;_.TerminalGroup="TerminalGroup";function tW(t){return _.reflection.isInstance(t,_.TerminalGroup)}_.isTerminalGroup=tW;_.TerminalRuleCall="TerminalRuleCall";function rW(t){return _.reflection.isInstance(t,_.TerminalRuleCall)}_.isTerminalRuleCall=rW;_.UnorderedGroup="UnorderedGroup";function nW(t){return _.reflection.isInstance(t,_.UnorderedGroup)}_.isUnorderedGroup=nW;_.UntilToken="UntilToken";function iW(t){return _.reflection.isInstance(t,_.UntilToken)}_.isUntilToken=iW;_.Wildcard="Wildcard";function oW(t){return _.reflection.isInstance(t,_.Wildcard)}_.isWildcard=oW;var lf=class extends vH.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case _.Action:return this.isSubtype(_.AbstractElement,r)||this.isSubtype(_.AbstractType,r);case _.Alternatives:case _.Assignment:case _.CharacterRange:case _.CrossReference:case _.Group:case _.Keyword:case _.NegatedToken:case _.RegexToken:case _.RuleCall:case _.TerminalAlternatives:case _.TerminalGroup:case _.TerminalRuleCall:case _.UnorderedGroup:case _.UntilToken:case _.Wildcard:return this.isSubtype(_.AbstractElement,r);case _.ArrayType:case _.ReferenceType:case _.SimpleType:case _.UnionType:return this.isSubtype(_.TypeDefinition,r);case _.Conjunction:case _.Disjunction:case _.LiteralCondition:case _.Negation:case _.ParameterReference:return this.isSubtype(_.Condition,r);case _.Interface:case _.Type:return this.isSubtype(_.AbstractType,r);case _.ParserRule:return this.isSubtype(_.AbstractRule,r)||this.isSubtype(_.AbstractType,r);case _.TerminalRule:return this.isSubtype(_.AbstractRule,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return _.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return _.AbstractRule;case"Grammar:usedGrammars":return _.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return _.Parameter;case"TerminalRuleCall:rule":return _.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};_.LangiumGrammarAstReflection=lf;_.reflection=new lf});var Re=d(tt=>{"use strict";Object.defineProperty(tt,"__esModule",{value:!0});tt.copyAstNode=tt.findLocalReferences=tt.streamReferences=tt.streamAst=tt.streamAllContents=tt.streamContents=tt.findRootNode=tt.getDocument=tt.hasContainerOfType=tt.getContainerOfType=tt.linkContentToContainer=void 0;var Hn=tr(),eo=$t(),aW=Le();function aA(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,Hn.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,Hn.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}tt.linkContentToContainer=aA;function sW(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}tt.getContainerOfType=sW;function uW(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}tt.hasContainerOfType=uW;function sA(t){let r=uA(t).$document;if(!r)throw new Error("AST node has no document.");return r}tt.getDocument=sA;function uA(t){for(;t.$container;)t=t.$container;return t}tt.findRootNode=uA;function Sg(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e==null?void 0:e.range;return new eo.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if((0,Hn.isAstNode)(o)){if(n.keyIndex++,Ag(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let a=n.arrayIndex++,s=o[a];if((0,Hn.isAstNode)(s)&&Ag(s,r))return{done:!1,value:s}}n.arrayIndex=0}}n.keyIndex++}return eo.DONE_RESULT})}tt.streamContents=Sg;function cW(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new eo.TreeStreamImpl(t,r=>Sg(r,e))}tt.streamAllContents=cW;function cA(t,e){if(t){if(e!=null&&e.range&&!Ag(t,e.range))return new eo.TreeStreamImpl(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new eo.TreeStreamImpl(t,r=>Sg(r,e),{includeRoot:!0})}tt.streamAst=cA;function Ag(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?(0,aW.inRange)(n,e):!1}function lA(t){return new eo.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,Hn.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if((0,Hn.isReference)(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return eo.DONE_RESULT})}tt.streamReferences=lA;function lW(t,e=sA(t).parseResult.value){let r=[];return cA(e).forEach(n=>{lA(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,eo.stream)(r)}tt.findLocalReferences=lW;function Pg(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,Hn.isAstNode)(i))r[n]=Pg(i,e);else if((0,Hn.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let o=[];for(let a of i)(0,Hn.isAstNode)(a)?o.push(Pg(a,e)):(0,Hn.isReference)(a)?o.push(e(r,n,a.$refNode,a.$refText)):o.push(a);r[n]=o}else r[n]=i;return aA(r),r}tt.copyAstNode=Pg});var pA=d(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.getSourceRegion=void 0;var fA=Re(),fW=vt(),dW=$t();function pW(t){var e,r;if(t){if("astNode"in t)return gW(t);if(Array.isArray(t))return t.reduce(dA,void 0);{let n=t,i=hW(n)?mW((r=(e=n==null?void 0:n.root)===null||e===void 0?void 0:e.element)!==null&&r!==void 0?r:n==null?void 0:n.element):void 0;return Ja(n,i)}}else return}ff.getSourceRegion=pW;function hW(t){return typeof t!="undefined"&&"element"in t&&"text"in t}function mW(t){try{return(0,fA.getDocument)(t).uri.toString()}catch(e){return}}function gW(t){var e,r;let{astNode:n,property:i,index:o}=t!=null?t:{},a=(e=n==null?void 0:n.$cstNode)!==null&&e!==void 0?e:n==null?void 0:n.$textRegion;if(!(n===void 0||a===void 0)){if(i===void 0)return Ja(a,Cg(n));{let s=u=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<u.length?u[o]:void 0:u.reduce(dA,void 0);if(!((r=a.assignments)===null||r===void 0)&&r[i]){let u=s(a.assignments[i]);return u&&Ja(u,Cg(n))}else if(n.$cstNode){let u=s((0,fW.findNodesForProperty)(n.$cstNode,i));return u&&Ja(u,Cg(n))}else return}}}function Cg(t){var e,r,n,i;return t.$cstNode?(r=(e=(0,fA.getDocument)(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new dW.TreeStreamImpl(t,o=>o.$container?[o.$container]:[]).find(o=>{var a;return(a=o.$textRegion)===null||a===void 0?void 0:a.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function Ja(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e!=null||(e=t.fileURI),e&&(i.fileURI=e),i}function dA(t,e){var r,n;if(t){if(!e)return t&&Ja(t)}else return e&&Ja(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,a=Math.min(t.offset,e.offset),s=Math.max(i,o),u=s-a,c={offset:a,end:s,length:u};if(t.range&&e.range&&(c.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let l=t.fileURI,f=e.fileURI,h=l&&f&&l!==f?`<unmergable text regions of ${l}, ${f}>`:l!=null?l:f;c.fileURI=h}return c}});var vA=d(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.processGeneratorNode=void 0;var Xu=zo(),yW=pA(),Eg=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=vW(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function vW(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,a;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((a=n.targetRegion)===null||a===void 0)&&a.length&&r(n),delete n.complete,n}};return n}function _W(t,e){let r=new Eg(e),n=r.pushTraceRegion(void 0);hA(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i==null?void 0:i.targetRegion,a=n.targetRegion;return o&&i.sourceRegion&&o.offset===a.offset&&o.length===a.length?{text:r.content,trace:i}:{text:r.content,trace:n}}df.processGeneratorNode=_W;function hA(t,e){typeof t=="string"?TW(t,e):t instanceof Xu.IndentNode?RW(t,e):t instanceof Xu.CompositeGeneratorNode?yA(t,e):t instanceof Xu.NewLineNode&&bW(t,e)}function mA(t,e){return typeof t=="string"?t.length!==0:t instanceof Xu.CompositeGeneratorNode?t.contents.some(r=>mA(r,e)):t instanceof Xu.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function TW(t,e){t&&(e.pendingIndent&&gA(e,!1),e.append(t))}function gA(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function yA(t,e){let r,n=(0,yW.getSourceRegion)(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)hA(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&(n==null?void 0:n.fileURI)===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function RW(t,e){var r;if(mA(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),yA(t,e)}finally{e.decreaseIndent()}}}function bW(t,e){t.ifNotEmpty&&!AW(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&gA(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function AW(t){return t.trimStart()!==""}});var pf=d(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.normalizeEOL=Pt.findIndentation=Pt.NEWLINE_REGEXP=Pt.SNLE=Pt.expandToString=Pt.expandToStringWithNL=void 0;var Yu=zo();function PW(t,...e){return _A(t,...e)+Yu.EOL}Pt.expandToStringWithNL=PW;function _A(t,...e){let r=e.reduce((a,s,u)=>{var c;return a+(s===void 0?Pt.SNLE:CW((0,Yu.toString)(s),a))+((c=t[u+1])!==null&&c!==void 0?c:"")},t[0]).split(Pt.NEWLINE_REGEXP).filter(a=>a.trim()!==Pt.SNLE).map(a=>a.replace(Pt.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let o=TA(r);return r.map(a=>a.slice(o).trimRight()).join(Yu.EOL)}Pt.expandToString=_A;Pt.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");Pt.NEWLINE_REGEXP=/\r?\n/g;var SW=/\S|$/;function CW(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(Pt.NEWLINE_REGEXP,Yu.EOL+n)}function TA(t){let e=t.filter(n=>n.length>0).map(n=>n.search(SW)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Pt.findIndentation=TA;function EW(t){return t.replace(Pt.NEWLINE_REGEXP,Yu.EOL)}Pt.normalizeEOL=EW});var wg=d(to=>{"use strict";Object.defineProperty(to,"__esModule",{value:!0});to.expandTracedToNodeIf=to.expandTracedToNode=to.expandToNode=void 0;var mf=zo(),kg=pf();function RA(t,...e){let r=kW(t),n=wW(t,e,r);return DW(n)}to.expandToNode=RA;function bA(t,e,r){return(n,...i)=>(0,mf.traceToNode)(t,e,r)(RA(n,...i))}to.expandTracedToNode=bA;function NW(t,e,r,n){return t?bA(typeof e=="function"?e():e,r,n):()=>{}}to.expandTracedToNodeIf=NW;function kW(t){let e=t.join("_").split(kg.NEWLINE_REGEXP),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(a=>a.length!==0);let o=(0,kg.findIndentation)(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function wW(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let a=[];t.forEach((c,l)=>{a.push(...c.split(kg.NEWLINE_REGEXP).map((f,h)=>h===0||f.length<r?f:f.substring(r)).reduce(l===0?(f,h,y)=>y===0?n?[]:[h]:y===1&&f.length===0?[h]:f.concat(hf,h):(f,h,y)=>y===0?[h]:f.concat(hf,h),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,mf.isGeneratorNode)(e[l])?e[l]:e[l]!==void 0?new mf.CompositeGeneratorNode(String(e[l])):l<e.length?AA:[]))});let s=a.length,u=s!==0?a[s-1]:void 0;return(i||o)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&a[s-2]===hf?a.slice(0,s-2):a.slice(0,s-1):a}var hf={isNewLine:!0},AA={isUndefinedSegment:!0},Ng=t=>t===hf,OW=t=>t===AA;function DW(t){return t.reduce((r,n,i)=>OW(n)?r:Ng(n)?{node:i===0||Ng(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>{var o;let a=(i===0||Ng(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):"",s;return{node:r.indented?r.node:a.length!==0?r.node.indent({indentation:a,indentImmediately:!1,indentedChildren:u=>s=u.append(n)}):r.node.append(n),indented:s!=null?s:(o=r.indented)===null||o===void 0?void 0:o.append(n)}})(),{node:new mf.CompositeGeneratorNode}).node}});var zo=d(we=>{"use strict";Object.defineProperty(we,"__esModule",{value:!0});we.NLEmpty=we.NL=we.NewLineNode=we.IndentNode=we.traceToNodeIf=we.traceToNode=we.CompositeGeneratorNode=we.toStringAndTrace=we.toString=we.isNewLineNode=we.isGeneratorNode=we.EOL=void 0;var IW=tr(),SA=vA(),PA=wg();we.EOL=typeof process=="undefined"?`
`:process.platform==="win32"?`\r
`:`
`;function CA(t){return t instanceof Ri||t instanceof Ju||t instanceof Vo}we.isGeneratorNode=CA;function xW(t){return t instanceof Vo}we.isNewLineNode=xW;function qW(t,e){return CA(t)?(0,SA.processGeneratorNode)(t,e).text:String(t)}we.toString=qW;function LW(t,e){return(0,SA.processGeneratorNode)(t,e)}we.toStringAndTrace=LW;var Ri=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if((0,IW.isAstNode)(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(we.NL)}appendNewLineIf(e){return e?this.append(we.NL):this}appendNewLineIfNotEmpty(){return this.append(we.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append((0,PA.expandToNode)(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},a=new Ju(n,o,i);return this.contents.push(a),Array.isArray(r)?a.append(...r):r&&a.append(r),this}appendTraced(e,r,n){return i=>this.append(new Ri().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append((0,PA.expandTracedToNode)(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};we.CompositeGeneratorNode=Ri;function EA(t,e,r){return n=>n instanceof Ri&&n.tracedSource===void 0?n.trace(t,e,r):new Ri().trace(t,e,r).append(n)}we.traceToNode=EA;function MW(t,e,r,n){return t?EA(typeof e=="function"?e():e,r,n):()=>{}}we.traceToNodeIf=MW;var Ju=class extends Ri{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};we.IndentNode=Ju;var Vo=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e!=null?e:we.EOL,this.ifNotEmpty=r}};we.NewLineNode=Vo;we.NL=new Vo;we.NLEmpty=new Vo(void 0,!0)});var es=d(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.propertyTypeToString=Oe.isTypeAssignable=Oe.TypeResolutionError=Oe.InterfaceType=Oe.UnionType=Oe.isInterfaceType=Oe.isUnionType=Oe.isStringType=Oe.isPrimitiveType=Oe.isValueType=Oe.flattenPropertyUnion=Oe.isPropertyUnion=Oe.isArrayType=Oe.isReferenceType=void 0;var rt=zo(),Qa=ts();function Zu(t){return"referenceType"in t}Oe.isReferenceType=Zu;function ec(t){return"elementType"in t}Oe.isArrayType=ec;function Jo(t){return"types"in t}Oe.isPropertyUnion=Jo;function kA(t){if(Jo(t)){let e=[];for(let r of t.types)e.push(...kA(r));return e}else return[t]}Oe.flattenPropertyUnion=kA;function Qu(t){return"value"in t}Oe.isValueType=Qu;function Za(t){return"primitive"in t}Oe.isPrimitiveType=Za;function gf(t){return"string"in t}Oe.isStringType=gf;function Dg(t){return t&&"type"in t}Oe.isUnionType=Dg;function qg(t){return t&&"properties"in t}Oe.isInterfaceType=qg;var Ig=class{constructor(e,r){var n,i;this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.name=e,this.reflection=(n=r==null?void 0:r.reflection)!==null&&n!==void 0?n:!1,this.declared=(i=r==null?void 0:r.declared)!==null&&i!==void 0?i:!1}toAstTypesString(e){let r=new rt.CompositeGeneratorNode;return r.append(`export type ${this.name} = ${Yo(this.type,"AstType")};`,rt.NL),this.reflection&&e&&(r.append(rt.NL),DA(r,this.name)),(0,rt.toString)(r)}toDeclaredTypesString(e){let r=new rt.CompositeGeneratorNode;return r.append(`type ${Lg(this.name,e)} = ${Yo(this.type,"DeclaredType")};`,rt.NL),(0,rt.toString)(r)}};Oe.UnionType=Ig;var tc=class{get superProperties(){let e=new Map;for(let r of this.properties)e.set(r.name,r);for(let r of this.interfaceSuperTypes){let n=r.superProperties;for(let i of n)e.has(i.name)||e.set(i.name,i)}return Array.from(e.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e);return Array.from(e.values())}getSubTypeProperties(e,r){let n=qg(e)?e.properties:[];for(let i of n)r.has(i.name)||r.set(i.name,i);for(let i of e.subTypes)this.getSubTypeProperties(i,r)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof tc)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new rt.CompositeGeneratorNode,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?(0,Qa.distinctAndSorted)([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,rt.NL),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${(0,Qa.distinctAndSorted)([...this.containerTypes].map(a=>a.name)).join(" | ")};`,rt.NL),this.typeNames.size>0&&o.append(`readonly $type: ${(0,Qa.distinctAndSorted)([...this.typeNames]).map(a=>`'${a}'`).join(" | ")};`,rt.NL),NA(o,this.properties,"AstType")}),r.append("}",rt.NL),e&&(r.append(rt.NL),DA(r,this.name)),(0,rt.toString)(r)}toDeclaredTypesString(e){let r=new rt.CompositeGeneratorNode,n=Lg(this.name,e),i=(0,Qa.distinctAndSorted)(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,rt.NL),r.indent(o=>NA(o,this.properties,"DeclaredType",e)),r.append("}",rt.NL),(0,rt.toString)(r)}};Oe.InterfaceType=tc;var xg=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};Oe.TypeResolutionError=xg;function Xo(t,e){return Jo(t)?t.types.every(r=>Xo(r,e)):Jo(e)?e.types.some(r=>Xo(t,r)):Zu(t)?Zu(e)&&Xo(t.referenceType,e.referenceType):ec(t)?ec(e)&&Xo(t.elementType,e.elementType):Qu(t)?Dg(t.value)?Qu(e)&&e.value.name===t.value.name?!0:Xo(t.value.type,e):Qu(e)?Dg(e.value)?Xo(t,e.value.type):wA(t.value,e.value,new Set):!1:Za(t)?Za(e)&&t.primitive===e.primitive:gf(t)?Za(e)&&e.primitive==="string"||gf(e)&&e.string===t.string:!1}Oe.isTypeAssignable=Xo;function wA(t,e,r){if(r.has(t.name)||(r.add(t.name),t.name===e.name))return!0;for(let n of t.superTypes)if(qg(n)&&wA(n,e,r))return!0;return!1}function Yo(t,e="AstType"){if(Zu(t)){let r=Yo(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Og(t.referenceType,r)}`}else if(ec(t)){let r=Yo(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Og(t.elementType,r)}[]`}else if(Jo(t)){let r=t.types.map(n=>Og(n,Yo(n,e)));return(0,Qa.distinctAndSorted)(r).join(" | ")}else{if(Qu(t))return t.value.name;if(Za(t))return t.primitive;if(gf(t))return`'${t.string}'`}throw new Error("Invalid type")}Oe.propertyTypeToString=Yo;function Og(t,e){return Jo(t)&&(e=`(${e})`),e}function NA(t,e,r,n=new Set){function i(o){let a=r==="AstType"?o.name:Lg(o.name,n),s=o.optional&&!OA(o.type),u=Yo(o.type,r);return`${a}${s?"?":""}: ${u}`}(0,Qa.distinctAndSorted)(e,(o,a)=>o.name.localeCompare(a.name)).forEach(o=>t.append(i(o),rt.NL))}function OA(t){return ec(t)?!0:Zu(t)?!1:Jo(t)?t.types.every(e=>OA(e)):Za(t)?t.primitive==="boolean":!1}function DA(t,e){t.append(`export const ${e} = '${e}';`,rt.NL),t.append(rt.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,rt.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,rt.NL)),t.append("}",rt.NL)}function Lg(t,e){return e.has(t)?`^${t}`:t}});var ts=d(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.findReferenceTypes=nt.hasBooleanType=nt.hasArrayType=nt.sortInterfacesTopologically=nt.mergeTypesAndInterfaces=nt.mergeInterfaces=nt.collectSuperTypes=nt.collectTypeHierarchy=nt.collectChildrenTypes=nt.distinctAndSorted=nt.collectAllPlainProperties=void 0;var rc=Tn(),bi=ke(),ro=es();function $W(t){let e=new rc.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.superTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}nt.collectAllPlainProperties=$W;function FW(t,e){return Array.from(new Set(t)).sort(e)}nt.distinctAndSorted=FW;function IA(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(a=>{let s=r.getOrCreateDocument(a.sourceUri),u=n.getAstNode(s.parseResult.value,a.sourcePath);(0,bi.isInterface)(u)?(i.add(u),IA(u,e,r,n).forEach(l=>i.add(l))):u&&(0,bi.isType)(u.$container)&&i.add(u.$container)}),i}nt.collectChildrenTypes=IA;function jW(t){let e=new rc.MultiMap,r=new rc.MultiMap;for(let o of t){for(let a of o.superTypes)e.add(o.name,a.name),r.add(a.name,o.name);for(let a of o.subTypes)e.add(a.name,o.name),r.add(o.name,a.name)}let n=new rc.MultiMap,i=new rc.MultiMap;for(let[o,a]of Array.from(e.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))n.addAll(o,Array.from(new Set(a)));for(let[o,a]of Array.from(r.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))i.addAll(o,Array.from(new Set(a)));return{superTypes:n,subTypes:i}}nt.collectTypeHierarchy=jW;function Mg(t){let e=new Set;if((0,bi.isInterface)(t))e.add(t),t.superTypes.forEach(r=>{if((0,bi.isInterface)(r.ref)){e.add(r.ref);let n=Mg(r.ref);for(let i of n)e.add(i)}});else if((0,bi.isType)(t)){let r=xA(t.type);for(let n of r){let i=Mg(n);for(let o of i)e.add(o)}}return e}nt.collectSuperTypes=Mg;function xA(t){var e;if((0,bi.isUnionType)(t))return t.types.flatMap(r=>xA(r));if((0,bi.isSimpleType)(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if((0,bi.isType)(r)||(0,bi.isInterface)(r))return[r]}return[]}function UW(t,e){return t.interfaces.concat(e.interfaces)}nt.mergeInterfaces=UW;function GW(t){return t.interfaces.concat(t.unions)}nt.mergeTypesAndInterfaces=GW;function HW(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}nt.sortInterfacesTopologically=HW;function qA(t){return(0,ro.isPropertyUnion)(t)?t.types.some(e=>qA(e)):!!(0,ro.isArrayType)(t)}nt.hasArrayType=qA;function LA(t){return(0,ro.isPropertyUnion)(t)?t.types.some(e=>LA(e)):(0,ro.isPrimitiveType)(t)?t.primitive==="boolean":!1}nt.hasBooleanType=LA;function $g(t){if((0,ro.isPropertyUnion)(t))return t.types.flatMap(e=>$g(e));if((0,ro.isReferenceType)(t)){let e=t.referenceType;if((0,ro.isValueType)(e))return[e.value.name]}else if((0,ro.isArrayType)(t))return $g(t.elementType);return[]}nt.findReferenceTypes=$g});var ns=d(rs=>{"use strict";Object.defineProperty(rs,"__esModule",{value:!0});rs.DefaultNameProvider=rs.isNamed=void 0;var WW=vt();function MA(t){return typeof t.name=="string"}rs.isNamed=MA;var Fg=class{getName(e){if(MA(e))return e.name}getNameNode(e){return(0,WW.findNodeForProperty)(e.$cstNode,"name")}};rs.DefaultNameProvider=Fg});var nc=d(($A,yf)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof yf=="object"&&yf.exports?yf.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:$A,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(m){this.idx=m.idx,this.input=m.input,this.groupIdx=m.groupIdx},t.prototype.pattern=function(m){this.idx=0,this.input=m,this.groupIdx=0,this.consumeChar("/");var R=this.disjunction();this.consumeChar("/");for(var E={type:"Flags",loc:{begin:this.idx,end:m.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":a(E,"global");break;case"i":a(E,"ignoreCase");break;case"m":a(E,"multiLine");break;case"u":a(E,"unicode");break;case"y":a(E,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:E,value:R,loc:this.loc(0)}},t.prototype.disjunction=function(){var m=[],R=this.idx;for(m.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),m.push(this.alternative());return{type:"Disjunction",value:m,loc:this.loc(R)}},t.prototype.alternative=function(){for(var m=[],R=this.idx;this.isTerm();)m.push(this.term());return{type:"Alternative",value:m,loc:this.loc(R)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var m=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(m)};case"$":return{type:"EndAnchor",loc:this.loc(m)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(m)};case"B":return{type:"NonWordBoundary",loc:this.loc(m)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var R;switch(this.popChar()){case"=":R="Lookahead";break;case"!":R="NegativeLookahead";break}s(R);var E=this.disjunction();return this.consumeChar(")"),{type:R,value:E,loc:this.loc(m)}}u()},t.prototype.quantifier=function(m){var R,E=this.idx;switch(this.popChar()){case"*":R={atLeast:0,atMost:1/0};break;case"+":R={atLeast:1,atMost:1/0};break;case"?":R={atLeast:0,atMost:1};break;case"{":var S=this.integerIncludingZero();switch(this.popChar()){case"}":R={atLeast:S,atMost:S};break;case",":var A;this.isDigit()?(A=this.integerIncludingZero(),R={atLeast:S,atMost:A}):R={atLeast:S,atMost:1/0},this.consumeChar("}");break}if(m===!0&&R===void 0)return;s(R);break}if(!(m===!0&&R===void 0))return s(R),this.peekChar(0)==="?"?(this.consumeChar("?"),R.greedy=!1):R.greedy=!0,R.type="Quantifier",R.loc=this.loc(E),R},t.prototype.atom=function(){var m,R=this.idx;switch(this.peekChar()){case".":m=this.dotAll();break;case"\\":m=this.atomEscape();break;case"[":m=this.characterClass();break;case"(":m=this.group();break}return m===void 0&&this.isPatternCharacter()&&(m=this.patternCharacter()),s(m),m.loc=this.loc(R),this.isQuantifier()&&(m.quantifier=this.quantifier()),m},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var m=this.positiveInteger();return{type:"GroupBackReference",value:m}},t.prototype.characterClassEscape=function(){var m,R=!1;switch(this.popChar()){case"d":m=l;break;case"D":m=l,R=!0;break;case"s":m=h;break;case"S":m=h,R=!0;break;case"w":m=f;break;case"W":m=f,R=!0;break}return s(m),{type:"Set",value:m,complement:R}},t.prototype.controlEscapeAtom=function(){var m;switch(this.popChar()){case"f":m=i("\f");break;case"n":m=i(`
`);break;case"r":m=i("\r");break;case"t":m=i("	");break;case"v":m=i("\v");break}return s(m),{type:"Character",value:m}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var m=this.popChar();if(/[a-zA-Z]/.test(m)===!1)throw Error("Invalid ");var R=m.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:R}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var m=this.popChar();return{type:"Character",value:i(m)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var m=this.popChar();return{type:"Character",value:i(m)}}},t.prototype.characterClass=function(){var m=[],R=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),R=!0);this.isClassAtom();){var E=this.classAtom(),S=E.type==="Character";if(S&&this.isRangeDash()){this.consumeChar("-");var A=this.classAtom(),b=A.type==="Character";if(b){if(A.value<E.value)throw Error("Range out of order in character class");m.push({from:E.value,to:A.value})}else o(E.value,m),m.push(i("-")),o(A.value,m)}else o(E.value,m)}return this.consumeChar("]"),{type:"Set",complement:R,value:m}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var m=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),m=!1;break;default:this.groupIdx++;break}var R=this.disjunction();this.consumeChar(")");var E={type:"Group",capturing:m,value:R};return m&&(E.idx=this.groupIdx),E},t.prototype.positiveInteger=function(){var m=this.popChar();if(n.test(m)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)m+=this.popChar();return parseInt(m,10)},t.prototype.integerIncludingZero=function(){var m=this.popChar();if(r.test(m)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)m+=this.popChar();return parseInt(m,10)},t.prototype.patternCharacter=function(){var m=this.popChar();switch(m){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(m)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(m){switch(m===void 0&&(m=0),this.peekChar(m)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var m=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(m)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(m){for(var R="",E=0;E<m;E++){var S=this.popChar();if(e.test(S)===!1)throw Error("Expecting a HexDecimal digits");R+=S}var A=parseInt(R,16);return{type:"Character",value:A}},t.prototype.peekChar=function(m){return m===void 0&&(m=0),this.input[this.idx+m]},t.prototype.popChar=function(){var m=this.peekChar(0);return this.consumeChar(),m},t.prototype.consumeChar=function(m){if(m!==void 0&&this.input[this.idx]!==m)throw Error("Expected: '"+m+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(m){return{begin:m,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(m){return m.charCodeAt(0)}function o(m,R){m.length!==void 0?m.forEach(function(E){R.push(E)}):R.push(m)}function a(m,R){if(m[R]===!0)throw"duplicate flag "+R;m[R]=!0}function s(m){if(m===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var c,l=[];for(c=i("0");c<=i("9");c++)l.push(c);var f=[i("_")].concat(l);for(c=i("a");c<=i("z");c++)f.push(c);for(c=i("A");c<=i("Z");c++)f.push(c);var h=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function y(){}return y.prototype.visitChildren=function(m){for(var R in m){var E=m[R];m.hasOwnProperty(R)&&(E.type!==void 0?this.visit(E):Array.isArray(E)&&E.forEach(function(S){this.visit(S)},this))}},y.prototype.visit=function(m){switch(m.type){case"Pattern":this.visitPattern(m);break;case"Flags":this.visitFlags(m);break;case"Disjunction":this.visitDisjunction(m);break;case"Alternative":this.visitAlternative(m);break;case"StartAnchor":this.visitStartAnchor(m);break;case"EndAnchor":this.visitEndAnchor(m);break;case"WordBoundary":this.visitWordBoundary(m);break;case"NonWordBoundary":this.visitNonWordBoundary(m);break;case"Lookahead":this.visitLookahead(m);break;case"NegativeLookahead":this.visitNegativeLookahead(m);break;case"Character":this.visitCharacter(m);break;case"Set":this.visitSet(m);break;case"Group":this.visitGroup(m);break;case"GroupBackReference":this.visitGroupBackReference(m);break;case"Quantifier":this.visitQuantifier(m);break}this.visitChildren(m)},y.prototype.visitPattern=function(m){},y.prototype.visitFlags=function(m){},y.prototype.visitDisjunction=function(m){},y.prototype.visitAlternative=function(m){},y.prototype.visitStartAnchor=function(m){},y.prototype.visitEndAnchor=function(m){},y.prototype.visitWordBoundary=function(m){},y.prototype.visitNonWordBoundary=function(m){},y.prototype.visitLookahead=function(m){},y.prototype.visitNegativeLookahead=function(m){},y.prototype.visitCharacter=function(m){},y.prototype.visitSet=function(m){},y.prototype.visitGroup=function(m){},y.prototype.visitGroupBackReference=function(m){},y.prototype.visitQuantifier=function(m){},{RegExpParser:t,BaseRegExpVisitor:y,VERSION:"0.5.0"}})});var Zo=d(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.partialRegex=rr.partialMatches=rr.getCaseInsensitivePattern=rr.escapeRegExp=rr.isWhitespaceRegExp=rr.isMultilineComment=rr.getTerminalParts=void 0;var FA=nc(),jA=new FA.RegExpParser,jg=class extends FA.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=Ug(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},Qo=new jg;function BW(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=jA.pattern(t),r=[];for(let n of e.value.value)Qo.reset(t),Qo.visit(n),r.push({start:Qo.startRegex,end:Qo.endRegex});return r}catch(e){return[]}}rr.getTerminalParts=BW;function KW(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Qo.reset(t),Qo.visit(jA.pattern(t)),Qo.multiline}catch(e){return!1}}rr.isMultilineComment=KW;function zW(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}rr.isWhitespaceRegExp=zW;function Ug(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}rr.escapeRegExp=Ug;function VW(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:Ug(e)).join("")}rr.getCaseInsensitivePattern=VW;function XW(t,e){let r=UA(t),n=e.match(r);return!!n&&n[0].length>0}rr.partialMatches=XW;function UA(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",a;function s(c){o+=r.substr(n,c),n+=c}function u(c){o+="(?:"+r.substr(n,c)+"|$)",n+=c}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":a=/\[(?:\\.|.)*?\]/g,a.lastIndex=n,a=a.exec(r)||[],u(a[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":a=/\{\d+,?\d*\}/g,a.lastIndex=n,a=a.exec(r),a?s(a[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":a=n,n+=3,i(),o+=r.substr(a,n-a);break;case"<":switch(r[n+3]){case"=":case"!":a=n,n+=4,i(),o+=r.substr(a,n-a);break;default:s(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else s(1),o+=i()+"|$)";break;case")":return++n,o;default:u(1);break}return o}return new RegExp(i(),t.flags)}rr.partialRegex=UA});var Ft=d(ae=>{"use strict";var YW=ae&&ae.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),JW=ae&&ae.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),QW=ae&&ae.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&YW(e,t,r);return JW(e,t),e};Object.defineProperty(ae,"__esModule",{value:!0});ae.isPrimitiveType=ae.extractAssignments=ae.resolveTransitiveImports=ae.resolveImport=ae.resolveImportUri=ae.terminalRegex=ae.getRuleType=ae.getActionType=ae.getExplicitRuleType=ae.getTypeNameWithoutError=ae.getTypeName=ae.getActionAtElement=ae.isDataTypeRule=ae.isArrayOperator=ae.isArrayCardinality=ae.isOptionalCardinality=void 0;var be=QW(ke()),GA=Wr(),vf=Re(),ZW=es(),eB=Zo();function tB(t){return t==="?"||t==="*"}ae.isOptionalCardinality=tB;function rB(t){return t==="*"||t==="+"}ae.isArrayCardinality=rB;function nB(t){return t==="+="}ae.isArrayOperator=nB;function Wg(t){return HA(t,new Set)}ae.isDataTypeRule=Wg;function HA(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,vf.streamAllContents)(t))if(be.isRuleCall(r)){if(!r.rule.ref||be.isParserRule(r.rule.ref)&&!HA(r.rule.ref,e))return!1}else{if(be.isAssignment(r))return!1;if(be.isAction(r))return!1}return Boolean(t.definition)}function WA(t){let e=t.$container;if(be.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(be.isAction(o))return o;{let a=(0,vf.streamAllContents)(r[i]).find(be.isAction);if(a)return a}}}if(be.isAbstractElement(e))return WA(e)}ae.getActionAtElement=WA;function Bg(t){var e;if(be.isParserRule(t))return Wg(t)?t.name:(e=Kg(t))!==null&&e!==void 0?e:t.name;if(be.isInterface(t)||be.isType(t)||be.isReturnType(t))return t.name;if(be.isAction(t)){let r=BA(t);if(r)return r}else if(be.isInferredType(t))return t.name;throw new ZW.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}ae.getTypeName=Bg;function iB(t){if(t)try{return Bg(t)}catch(e){return}}ae.getTypeNameWithoutError=iB;function Kg(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(be.isParserRule(e))return e.name;if(be.isInterface(e)||be.isType(e))return e.name}}}ae.getExplicitRuleType=Kg;function BA(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Bg(t.type.ref)}ae.getActionType=BA;function oB(t){var e,r,n;return be.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Wg(t)?t.name:(n=Kg(t))!==null&&n!==void 0?n:t.name}ae.getRuleType=oB;function KA(t){return ic(t.definition)}ae.terminalRegex=KA;var zg=/[\s\S]/.source;function ic(t){if(be.isTerminalAlternatives(t))return aB(t);if(be.isTerminalGroup(t))return sB(t);if(be.isCharacterRange(t))return lB(t);if(be.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return Ai(KA(e),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(be.isNegatedToken(t))return cB(t);if(be.isUntilToken(t))return uB(t);if(be.isRegexToken(t))return Ai(t.regex,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1});if(be.isWildcard(t))return Ai(zg,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t==null?void 0:t.$type}`)}}function aB(t){return Ai(t.elements.map(ic).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function sB(t){return Ai(t.elements.map(ic).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function uB(t){return Ai(`${zg}*?${ic(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function cB(t){return Ai(`(?!${ic(t.terminal)})${zg}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function lB(t){return t.right?Ai(`[${Gg(t.left)}-${Gg(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):Ai(Gg(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Gg(t){return(0,eB.escapeRegExp)(t.value)}function Ai(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function zA(t){if(t.path===void 0||t.path.length===0)return;let e=GA.Utils.dirname((0,vf.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),GA.Utils.resolvePath(e,r)}ae.resolveImportUri=zA;function Vg(t,e){let r=zA(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(be.isGrammar(i))return i}}catch(n){}}ae.resolveImport=Vg;function fB(t,e){if(be.isGrammarImport(e)){let r=Vg(t,e);if(r){let n=Hg(t,r);return n.push(r),n}return[]}else return Hg(t,e)}ae.resolveTransitiveImports=fB;function Hg(t,e,r=e,n=new Set,i=new Set){let o=(0,vf.getDocument)(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let a of e.imports){let s=Vg(t,a);s&&Hg(t,s,r,n,i)}}return Array.from(i)}function VA(t){return be.isAssignment(t)?[t]:be.isAlternatives(t)||be.isGroup(t)||be.isUnorderedGroup(t)?t.elements.flatMap(e=>VA(e)):[]}ae.extractAssignments=VA;var dB=["string","number","boolean","Date","bigint"];function pB(t){return dB.includes(t)}ae.isPrimitiveType=pB});var Af=d(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.flattenPlainType=it.mergePropertyTypes=it.plainToTypes=it.isPlainStringType=it.isPlainPrimitiveType=it.isPlainValueType=it.isPlainPropertyUnion=it.isPlainArrayType=it.isPlainReferenceType=it.isPlainUnion=it.isPlainInterface=void 0;var XA=es();function hB(t){return!YA(t)}it.isPlainInterface=hB;function YA(t){return"type"in t}it.isPlainUnion=YA;function _f(t){return"referenceType"in t}it.isPlainReferenceType=_f;function Tf(t){return"elementType"in t}it.isPlainArrayType=Tf;function Yg(t){return"types"in t}it.isPlainPropertyUnion=Yg;function Rf(t){return"value"in t}it.isPlainValueType=Rf;function JA(t){return"primitive"in t}it.isPlainPrimitiveType=JA;function QA(t){return"string"in t}it.isPlainStringType=QA;function mB(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new XA.InterfaceType(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new XA.UnionType(n.name,{reflection:n.reflection,declared:n.declared});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let a=e.get(o)||r.get(o);a&&i.superTypes.add(a)}for(let o of n.subTypes){let a=e.get(o)||r.get(o);a&&i.subTypes.add(a)}for(let o of n.properties){let a=gB(o,e,r);i.properties.push(a)}}for(let n of t.unions){let i=r.get(n.name);i.type=oc(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}it.plainToTypes=mB;function gB(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:oc(t.type,void 0,e,r)}}function oc(t,e,r,n){if(Tf(t))return{elementType:oc(t.elementType,e,r,n)};if(_f(t))return{referenceType:oc(t.referenceType,void 0,r,n)};if(Yg(t))return{types:t.types.map(i=>oc(i,e,r,n))};if(QA(t))return{string:t.string};if(JA(t))return{primitive:t.primitive};if(Rf(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function yB(t,e){let r=bf(t),n=bf(e);for(let i of n)vB(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}it.mergePropertyTypes=yB;function vB(t,e){return t.some(r=>Xg(r,e))}function Xg(t,e){return Tf(t)&&Tf(e)?Xg(t.elementType,e.elementType):_f(t)&&_f(e)?Xg(t.referenceType,e.referenceType):Rf(t)&&Rf(e)?t.value===e.value:!1}function bf(t){return Yg(t)?t.types.flatMap(e=>bf(e)):[t]}it.flattenPlainType=bf});var oP=d(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.collectInferredTypes=void 0;var _B=ns(),ey=Tn(),dt=ke(),Pi=Ft(),eP=Af(),Jg=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let a=n[o],s=r.next[o];s.actionWithAssignment&&i.push({alt:ZA(a),next:[]}),s.name!==void 0&&s.name!==a.name&&(s.actionWithAssignment?(a.properties=[],a.ruleCalls=[],a.super=[e.name],a.name=s.name):(a.super=[a.name,...a.ruleCalls],a.properties=[],a.ruleCalls=[],a.name=s.name)),a.properties.push(...s.properties),a.ruleCalls.push(...s.ruleCalls);let u={alt:a,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(c=>c!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return iP(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(ZA(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=ea();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function TB(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(tP)}}function ZA(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>tP(e))}}function tP(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function RB(t,e,r){let n=[],i={fragments:new Map};for(let u of t)n.push(...rP(i,u));let o=EB(n),a=NB(o),s=kB(o,a,r);for(let u of e){let c=bB(u);s.unions.push({name:u.name,reflection:!1,declared:!1,type:c,subTypes:new Set,superTypes:new Set})}return s}Pf.collectInferredTypes=RB;function bB(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=Qg(t.definition,r);return e?{primitive:"string"}:n}function Qg(t,e){var r,n,i;if(t.cardinality)return e();if((0,dt.isAlternatives)(t))return{types:t.elements.map(o=>Qg(o,e))};if((0,dt.isGroup)(t)||(0,dt.isUnorderedGroup)(t))return t.elements.length!==1?e():Qg(t.elements[0],e);if((0,dt.isRuleCall)(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?(0,dt.isTerminalRule)(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string"}:{value:o.name}:e()}else if((0,dt.isKeyword)(t))return{string:t.value};return e()}function rP(t,e){let r=ea(e),n=new Jg(t,r);return e.definition&&Zg(n,n.root,e.definition),n.getTypes()}function ea(t){return{name:(0,dt.isParserRule)(t)||(0,dt.isAction)(t)?(0,Pi.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Zg(t,e,r){let n=(0,Pi.isOptionalCardinality)(r.cardinality);if((0,dt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,ea()));for(let o of r.elements){let a=t.connect(e,ea());i.push(Zg(t,a,o))}return t.merge(...i)}else if((0,dt.isGroup)(r)||(0,dt.isUnorderedGroup)(r)){let i=t.connect(e,ea()),o;n&&(o=t.connect(e,ea()));for(let a of r.elements)i=Zg(t,i,a);return o?t.merge(o,i):i}else{if((0,dt.isAction)(r))return AB(t,e,r);(0,dt.isAssignment)(r)?PB(e,r):(0,dt.isRuleCall)(r)&&SB(t,e,r)}return e}function AB(t,e,r){var n;if(!t.hasLeafNode(e)){let o=TB(e);t.connect(e,o)}let i=t.connect(e,ea(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&(0,_B.isNamed)(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:ta(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function PB(t,e){let r={types:new Set,reference:!1};nP(e.terminal,r);let n=ta(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,Pi.isOptionalCardinality)(e.cardinality),type:n,astNodes:new Set([e])})}function nP(t,e){if((0,dt.isAlternatives)(t)||(0,dt.isUnorderedGroup)(t)||(0,dt.isGroup)(t))for(let r of t.elements)nP(r,e);else if((0,dt.isKeyword)(t))e.types.add(`'${t.value}'`);else if((0,dt.isRuleCall)(t)&&t.rule.ref)e.types.add((0,Pi.getRuleType)(t.rule.ref));else if((0,dt.isCrossReference)(t)&&t.type.ref){let r=(0,Pi.getTypeNameWithoutError)(t.type.ref);r&&e.types.add(r),e.reference=!0}}function SB(t,e,r){let n=r.rule.ref;if((0,dt.isParserRule)(n)&&n.fragment){let i=CB(n,t.context);(0,Pi.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else(0,dt.isParserRule)(n)&&e.ruleCalls.push((0,Pi.getRuleType)(n))}function CB(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,Pi.getTypeNameWithoutError)(t),o=rP(e,t).filter(a=>a.alt.name===i);return n.push(...o.flatMap(a=>a.alt.properties)),n}function EB(t){let e=new Map,r=[],n=iP(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(a=>{a!==o.name&&o.subTypes.add(a)}))}for(let i of r)for(let o of i.ruleCalls){let a=e.get(o);a&&a.name!==i.name&&a.superTypes.add(i.name)}return Array.from(e.values())}function iP(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new ey.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],a=new Set,s={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let u of i){let c=u.alt;s.alt.super.push(...c.super),s.next.push(...u.next);let l=c.properties;for(let f of l){let h=o.find(y=>y.name===f.name);h?(h.type=(0,eP.mergePropertyTypes)(h.type,f.type),f.astNodes.forEach(y=>h.astNodes.add(y))):o.push(Object.assign({},f))}c.ruleCalls.forEach(f=>a.add(f))}for(let u of i){let c=u.alt;if(c.ruleCalls.length===0)for(let l of o)c.properties.find(f=>f.name===l.name)||(l.optional=!0)}s.alt.ruleCalls=Array.from(a),r.push(s)}return r}function NB(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new ey.MultiMap;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let a={declared:!1,name:i,reflection:!0,subTypes:new Set,superTypes:new Set,type:ta(!1,!1,o)};r.push(a)}return r}function kB(t,e,r){let n=new ey.MultiMap;for(let s of t)for(let u of s.superTypes)n.add(u,s.name);let i=new Set(r.interfaces.map(s=>s.name)),o={interfaces:[],unions:e},a=new Map(e.map(s=>[s.name,s]));for(let s of t){let u=new Set(n.get(s.name));if(s.properties.length===0&&u.size>0)if(i.has(s.name))s.abstract=!0,o.interfaces.push(s);else{let c=ta(!1,!1,Array.from(u)),l=a.get(s.name);if(l)l.type=(0,eP.mergePropertyTypes)(l.type,c);else{let f={name:s.name,declared:!1,reflection:!0,subTypes:u,superTypes:s.superTypes,type:c};o.unions.push(f),a.set(s.name,f)}}else o.interfaces.push(s)}for(let s of o.interfaces)s.superTypes=new Set([...s.superTypes].filter(u=>!a.has(u)));return o}function ta(t,e,r){if(t)return{elementType:ta(!1,e,r)};if(e)return{referenceType:ta(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:(0,Pi.isPrimitiveType)(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>ta(!1,!1,[n]))}}});var ry=d(os=>{"use strict";Object.defineProperty(os,"__esModule",{value:!0});os.typeDefinitionToPropertyType=os.collectDeclaredTypes=void 0;var Sf=ke(),ty=Ft();function wB(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let s of n.attributes)i.push({name:s.name,optional:s.isOptional,astNodes:new Set([s]),type:is(s.type)});let o=new Set;for(let s of n.superTypes)s.ref&&o.add((0,ty.getTypeName)(s.ref));let a={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(a)}for(let n of e){let i={name:n.name,declared:!0,reflection:!0,type:is(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}os.collectDeclaredTypes=wB;function is(t){if((0,Sf.isArrayType)(t))return{elementType:is(t.elementType)};if((0,Sf.isReferenceType)(t))return{referenceType:is(t.referenceType)};if((0,Sf.isUnionType)(t))return{types:t.types.map(is)};if((0,Sf.isSimpleType)(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=(0,ty.getTypeNameWithoutError)(r);if(n)return(0,ty.isPrimitiveType)(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}os.typeDefinitionToPropertyType=is});var sP=d(as=>{"use strict";Object.defineProperty(as,"__esModule",{value:!0});as.collectAllAstResources=as.collectTypeResources=void 0;var OB=oP(),DB=ry(),IB=Re(),xB=ke(),aP=Ft();function qB(t,e){let r=ny(t,e),n=(0,DB.collectDeclaredTypes)(r.interfaces,r.types),i=(0,OB.collectInferredTypes)(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}as.collectTypeResources=qB;function ny(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=(0,IB.getDocument)(i);if(!r.has(o.uri)){r.add(o.uri);for(let a of i.rules)(0,xB.isParserRule)(a)&&!a.fragment&&((0,aP.isDataTypeRule)(a)?n.datatypeRules.push(a):n.parserRules.push(a));if(i.interfaces.forEach(a=>n.interfaces.push(a)),i.types.forEach(a=>n.types.push(a)),e){let a=i.imports.map(s=>(0,aP.resolveImport)(e,s)).filter(s=>s!==void 0);ny(a,e,r,n)}}}return n}as.collectAllAstResources=ny});var ay=d(Wn=>{"use strict";Object.defineProperty(Wn,"__esModule",{value:!0});Wn.specifyAstNodeProperties=Wn.createAstTypes=Wn.collectValidationAst=Wn.collectAst=void 0;var cP=ts(),Si=es(),lP=sP(),LB=Af();function MB(t,e){let{inferred:r,declared:n}=(0,lP.collectTypeResources)(t,e);return Cf(r,n)}Wn.collectAst=MB;function $B(t,e){let{inferred:r,declared:n,astResources:i}=(0,lP.collectTypeResources)(t,e);return{astResources:i,inferred:Cf(n,r),declared:Cf(r,n)}}Wn.collectValidationAst=$B;function Cf(t,e){var r,n;let i={interfaces:(0,cP.sortInterfacesTopologically)(uP(...t.interfaces,...(r=e==null?void 0:e.interfaces)!==null&&r!==void 0?r:[])),unions:uP(...t.unions,...(n=e==null?void 0:e.unions)!==null&&n!==void 0?n:[])},o=(0,LB.plainToTypes)(i);return fP(o),o}Wn.createAstTypes=Cf;function uP(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function fP(t){let e=jB(t),r=Array.from(e.values());UB(r),GB(r),FB(e)}Wn.specifyAstNodeProperties=fP;function FB(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeNames.add(n.name);let i=Array.from(n.superTypes).map(o=>t.get(o.name)).filter(o=>o!==void 0);for(let o of i)n.typeNames.forEach(a=>o.typeNames.add(a));e.push(...i.filter(o=>!r.has(o)))}}function jB({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,iy(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function iy(t,e){if(e.has(t))return!0;if(e.add(t),(0,Si.isPropertyUnion)(t))return t.types.every(r=>iy(r,e));if((0,Si.isValueType)(t)){let r=t.value;return(0,Si.isUnionType)(r)?iy(r.type,e):!1}else return(0,Si.isPrimitiveType)(t)||(0,Si.isStringType)(t)}function UB(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function GB(t){let e=t.filter(Si.isInterfaceType);for(let n of e){let i=n.properties.flatMap(o=>oy(o.type,new Set));for(let o of i)o.containerTypes.add(n)}let r=HB(t);WB(r)}function oy(t,e){return(0,Si.isPropertyUnion)(t)?t.types.flatMap(r=>oy(r,e)):(0,Si.isValueType)(t)?e.has(t.value)?[]:(e.add(t.value),[t.value]):(0,Si.isArrayType)(t)?oy(t.elementType,e):[]}function HB(t){function e(a){let s=[a];o.add(a);let u=[...i.subTypes.get(a.name),...i.superTypes.get(a.name)];for(let c of u){let l=r.get(c);l&&!o.has(l)&&s.push(...e(l))}return s}let r=new Map(t.map(a=>[a.name,a])),n=[],i=(0,cP.collectTypeHierarchy)(t),o=new Set;for(let a of t)o.has(a)||n.push(e(a));return n}function WB(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var uy=d(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.interpretAstReflection=void 0;var BB=tr(),KB=Tn(),zB=ke(),VB=ay(),ss=ts();function XB(t,e){let r;(0,zB.isGrammar)(t)?r=(0,VB.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=YB(r),o=JB(r),a=(0,ss.collectTypeHierarchy)((0,ss.mergeTypesAndInterfaces)(r)).superTypes;return new sy({allTypes:n,references:i,metaData:o,superTypes:a})}Ef.interpretAstReflection=XB;var sy=class extends BB.AbstractAstReflection{constructor(e){super(),this.allTypes=e.allTypes,this.references=e.references,this.metaData=e.metaData,this.superTypes=e.superTypes}getAllTypes(){return this.allTypes}getReferenceType(e){let r=`${e.container.$type}:${e.property}`,n=this.references.get(r);if(n)return n;throw new Error("Could not find reference type for "+r)}getTypeMetaData(e){var r;return(r=this.metaData.get(e))!==null&&r!==void 0?r:{name:e,mandatory:[]}}computeIsSubtype(e,r){let n=this.superTypes.get(e);for(let i of n)if(this.isSubtype(i,r))return!0;return!1}};function YB(t){let e=new KB.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let o of(0,ss.findReferenceTypes)(i.type))e.add(n.name,[i.name,o]);for(let i of n.interfaceSuperTypes){let o=e.get(i.name);e.addAll(n.name,o)}}let r=new Map;for(let[n,[i,o]]of e)r.set(`${n}:${i}`,o);return r}function JB(t){let e=new Map;for(let r of t.interfaces){let n=r.superProperties,i=n.filter(a=>(0,ss.hasArrayType)(a.type)),o=n.filter(a=>!(0,ss.hasArrayType)(a.type)&&(0,ss.hasBooleanType)(a.type));(i.length>0||o.length>0)&&e.set(r.name,{name:r.name,mandatory:QB(i,o)})}return e}function QB(t,e){let r=[],n=t.concat(e).sort((i,o)=>i.name.localeCompare(o.name));for(let i of n){let o=t.includes(i)?"array":"boolean";r.push({name:i.name,type:o})}return r}});var dP=d(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.LangiumGrammarGrammar=void 0;var ZB=vt(),Nf,eK=()=>Nf!=null?Nf:Nf=(0,ZB.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "LangiumGrammar",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Grammar",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "isDeclared",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "grammar"
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@59"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "with"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "usedGrammars",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "usedGrammars",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "definesHiddenTokens",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "hidden"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "("
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": ","
                          },
                          {
                            "$type": "Assignment",
                            "feature": "hiddenTokens",
                            "operator": "+=",
                            "terminal": {
                              "$type": "CrossReference",
                              "type": {
                                "$ref": "#/rules@11"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@59"
                                },
                                "arguments": []
                              },
                              "deprecatedSyntax": false
                            }
                          }
                        ],
                        "cardinality": "*"
                      }
                    ],
                    "cardinality": "?"
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ],
                "cardinality": "?"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "imports",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "rules",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@11"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "interfaces",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "types",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@10"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Interface",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "extends"
              },
              {
                "$type": "Assignment",
                "feature": "superTypes",
                "operator": "+=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "superTypes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SchemaType",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "attributes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeAttribute",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "isOptional",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "?"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeDefinition",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@5"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnionType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnionType"
                },
                "feature": "types",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "types",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@6"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArrayType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ArrayType"
                },
                "feature": "elementType",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "["
              },
              {
                "$type": "Keyword",
                "value": "]"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReferenceType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ReferenceType"
                }
              },
              {
                "$type": "Keyword",
                "value": "@"
              },
              {
                "$type": "Assignment",
                "feature": "referenceType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SimpleType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@4"
                },
                "arguments": []
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "SimpleType"
                }
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "typeRef",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "primitiveType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@9"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "stringType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@60"
                      },
                      "arguments": []
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimitiveType",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "string"
          },
          {
            "$type": "Keyword",
            "value": "number"
          },
          {
            "$type": "Keyword",
            "value": "boolean"
          },
          {
            "$type": "Keyword",
            "value": "Date"
          },
          {
            "$type": "Keyword",
            "value": "bigint"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractRule",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GrammarImport",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Assignment",
            "feature": "path",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParserRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "entry",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "entry"
                }
              },
              {
                "$type": "Assignment",
                "feature": "fragment",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "fragment"
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "wildcard",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "*"
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "returns"
                  },
                  {
                    "$type": "Alternatives",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "returnType",
                        "operator": "=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/types@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Assignment",
                        "feature": "dataType",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@9"
                          },
                          "arguments": []
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": false
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "definesHiddenTokens",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "hidden"
                }
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "hiddenTokens",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@11"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InferredType",
      "parameters": [
        {
          "$type": "Parameter",
          "name": "imperative"
        }
      ],
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "ParameterReference",
                  "parameter": {
                    "$ref": "#/rules@14/parameters@0"
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infer"
                  }
                ]
              },
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "Negation",
                  "value": {
                    "$type": "ParameterReference",
                    "parameter": {
                      "$ref": "#/rules@14/parameters@0"
                    }
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infers"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleNameAndParams",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@16"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "parameters",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@16"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@59"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Alternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@18"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConditionalBranch",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                }
              },
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "guardCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@29"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ">"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnorderedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnorderedGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "&"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@20"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Group",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTokenWithCardinality",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@37"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@24"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Action",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Action"
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "type",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": true
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "feature",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@58"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "="
                    },
                    {
                      "$type": "Keyword",
                      "value": "+="
                    }
                  ]
                }
              },
              {
                "$type": "Keyword",
                "value": "current"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Keyword",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@60"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleCall",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NamedArgument",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@16"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "calledByName",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "="
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@29"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LiteralCondition",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "true",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Disjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Disjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Conjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Conjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "&"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Negation",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Negation"
                }
              },
              {
                "$type": "Keyword",
                "value": "!"
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Atom",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedCondition",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterReference",
      "definition": {
        "$type": "Assignment",
        "feature": "parameter",
        "operator": "=",
        "terminal": {
          "$type": "CrossReference",
          "type": {
            "$ref": "#/rules@16"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          },
          "deprecatedSyntax": false
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedKeyword",
      "inferredType": {
        "$type": "InferredType",
        "name": "Keyword"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "RuleCall"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignment",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Assignment"
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "feature",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "+="
                },
                {
                  "$type": "Keyword",
                  "value": "="
                },
                {
                  "$type": "Keyword",
                  "value": "?="
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedAssignableElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@38"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReference",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CrossReference"
            }
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/types@0"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "deprecatedSyntax",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "|"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": ":"
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "terminal",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@42"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReferenceableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "Group"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnType",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "hidden",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "hidden"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "fragment",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "fragment"
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "returns"
                      },
                      {
                        "$type": "Assignment",
                        "feature": "type",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@45"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "?"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalAlternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@48"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalTokenElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedTerminalElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "lookahead",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?="
                },
                {
                  "$type": "Keyword",
                  "value": "?!"
                }
              ]
            },
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "TerminalRuleCall"
            }
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@46"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NegatedToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "NegatedToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "!"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UntilToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "UntilToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "->"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RegexToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "RegexToken"
            }
          },
          {
            "$type": "Assignment",
            "feature": "regex",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@61"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Wildcard",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Wildcard"
            }
          },
          {
            "$type": "Keyword",
            "value": "."
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CharacterRange",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CharacterRange"
            }
          },
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ".."
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@25"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FeatureName",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "current"
          },
          {
            "$type": "Keyword",
            "value": "entry"
          },
          {
            "$type": "Keyword",
            "value": "extends"
          },
          {
            "$type": "Keyword",
            "value": "false"
          },
          {
            "$type": "Keyword",
            "value": "fragment"
          },
          {
            "$type": "Keyword",
            "value": "grammar"
          },
          {
            "$type": "Keyword",
            "value": "hidden"
          },
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Keyword",
            "value": "returns"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Keyword",
            "value": "infer"
          },
          {
            "$type": "Keyword",
            "value": "infers"
          },
          {
            "$type": "Keyword",
            "value": "with"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\^?[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "RegexLiteral",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "AbstractType",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@1"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@10"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@23/definition/elements@0"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@13"
            }
          }
        ]
      }
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "usedGrammars": []
}`);kf.LangiumGrammarGrammar=eK});var cy=d(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.LangiumGrammarGeneratedModule=Br.LangiumGrammarGeneratedSharedModule=Br.LangiumGrammarParserConfig=Br.LangiumGrammarLanguageMetaData=void 0;var tK=ke(),rK=dP();Br.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Br.LangiumGrammarParserConfig={maxLookahead:3};Br.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new tK.LangiumGrammarAstReflection};Br.LangiumGrammarGeneratedModule={Grammar:()=>(0,rK.LangiumGrammarGrammar)(),LanguageMetaData:()=>Br.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Br.LangiumGrammarParserConfig}}});var br=d(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.Deferred=St.MutexLock=St.interruptAndCheck=St.isOperationCancelled=St.OperationCancelled=St.setInterruptionPeriod=St.startCancelableOperation=St.delayNextTick=void 0;var wf=_i();function pP(){return new Promise(t=>{typeof setImmediate=="undefined"?setTimeout(t,0):setImmediate(t)})}St.delayNextTick=pP;var ly=0,hP=10;function nK(){return ly=Date.now(),new wf.CancellationTokenSource}St.startCancelableOperation=nK;function iK(t){hP=t}St.setInterruptionPeriod=iK;St.OperationCancelled=Symbol("OperationCancelled");function mP(t){return t===St.OperationCancelled}St.isOperationCancelled=mP;async function oK(t){if(t===wf.CancellationToken.None)return;let e=Date.now();if(e-ly>=hP&&(ly=e,await pP()),t.isCancellationRequested)throw St.OperationCancelled}St.interruptAndCheck=oK;var fy=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new wf.CancellationTokenSource}lock(e){this.cancel();let r=new wf.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{mP(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};St.MutexLock=fy;var dy=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};St.Deferred=dy});var Df=d(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.DefaultScopeComputation=void 0;var py=_i(),gP=Re(),aK=Tn(),yP=br(),hy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=py.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=gP.streamContents,i=py.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let a of n(e))await(0,yP.interruptAndCheck)(i),this.exportNode(a,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=py.CancellationToken.None){let n=e.parseResult.value,i=new aK.MultiMap;for(let o of(0,gP.streamAllContents)(n))await(0,yP.interruptAndCheck)(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};Of.DefaultScopeComputation=hy});var xf=d(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.DefaultScopeProvider=no.EMPTY_SCOPE=no.StreamScope=void 0;var sK=Re(),If=$t(),us=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n==null?void 0:n.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};no.StreamScope=us;no.EMPTY_SCOPE={getElement(){},getAllElements(){return If.EMPTY_STREAM}};var my=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,sK.getDocument)(e.container).precomputedScopes;if(i){let a=e.container;do{let s=i.get(a);s.length>0&&r.push((0,If.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),a=a.$container}while(a)}let o=this.getGlobalScope(n,e);for(let a=r.length-1;a>=0;a--)o=this.createScope(r[a],o);return o}createScope(e,r,n){return new us((0,If.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,If.stream)(e).map(o=>{let a=this.nameProvider.getName(o);if(a)return this.descriptions.createDescription(o,a)}).nonNullable();return new us(i,r,n)}getGlobalScope(e,r){return new us(this.indexManager.allElements(e))}};no.DefaultScopeProvider=my});var Ci=d(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.relativeURI=cs.equalURI=void 0;function uK(t,e){return(t==null?void 0:t.toString())===(e==null?void 0:e.toString())}cs.equalURI=uK;function cK(t,e){let r=t.path,n=e.path,i=r.split("/").filter(c=>c.length>0),o=n.split("/").filter(c=>c.length>0),a=0;for(;a<i.length&&i[a]===o[a];a++);let s="../".repeat(i.length-a),u=o.slice(a).join("/");return s+u}cs.relativeURI=cK});var TP=d(fs=>{"use strict";Object.defineProperty(fs,"__esModule",{value:!0});fs.LangiumGrammarScopeComputation=fs.LangiumGrammarScopeProvider=void 0;var lK=Df(),gy=xf(),ls=Re(),vP=Le(),_P=$t(),fK=Ci(),Kr=ke(),yy=Ft(),vy=class extends gy.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Kr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,ls.getDocument)(r.container).precomputedScopes,o=(0,ls.findRootNode)(r.container);if(i&&o){let s=i.get(o);s.length>0&&(n=(0,_P.stream)(s).filter(u=>u.type===Kr.Interface||u.type===Kr.Type))}let a=this.getGlobalScope(e,r);return n?this.createScope(n,a):a}getGlobalScope(e,r){let n=(0,ls.getContainerOfType)(r.container,Kr.isGrammar);if(!n)return gy.EMPTY_SCOPE;let i=(0,_P.stream)(n.imports).map(yy.resolveImportUri).nonNullable(),o=this.indexManager.allElements(e).filter(a=>i.some(s=>(0,fK.equalURI)(a.documentUri,s)));return e===Kr.AbstractType&&(o=o.filter(a=>a.type===Kr.Interface||a.type===Kr.Type)),new gy.StreamScope(o)}};fs.LangiumGrammarScopeProvider=vy;var _y=class extends lK.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Kr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}(0,ls.streamAllContents)(e).forEach(o=>{if((0,Kr.isAction)(o)&&o.inferredType){let a=(0,yy.getActionType)(o);a&&r.push(this.createInterfaceDescription(o,a,n))}})}}processNode(e,r,n){(0,Kr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&(0,Kr.isParserRule)(e)&&!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(a,a.name,r))}}processActionNode(e,r,n){let i=(0,ls.findRootNode)(e);if(i&&(0,Kr.isAction)(e)&&e.inferredType){let o=(0,yy.getActionType)(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=(0,ls.getDocument)(e)){var i;let o=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,vP.toDocumentSegment)(o),selectionSegment:(0,vP.toDocumentSegment)(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};fs.LangiumGrammarScopeComputation=_y});var Cy=d(hr=>{"use strict";var dK=hr&&hr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pK=hr&&hr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),hK=hr&&hr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&dK(e,t,r);return pK(e,t),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.LangiumGrammarValidator=hr.IssueCodes=hr.registerValidationChecks=void 0;var Ty=$a(),io=Re(),oo=Tn(),Ry=Le(),ao=vt(),by=$t(),Ve=hK(ke()),Ay=ke(),jt=Ft(),mK=ry(),Py=Af();function gK(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion};e.register(n,r)}hr.registerValidationChecks=gK;var pr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(pr=hr.IssueCodes||(hr.IssueCodes={}));var Sy=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:pr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Ve.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>Ve.isParserRule(o)&&!(0,jt.isDataTypeRule)(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:pr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,jt.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,by.stream)(i.rules).filter(o=>!ac(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,by.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new oo.MultiMap;n(e).forEach(u=>o.add(u.name,u));for(let[,u]of o.entriesGroupedByKey())u.length>1&&u.forEach(c=>{r("error",`A ${i}'s name has to be unique.`,{node:c,property:"name"})});let a=new Set,s=(0,jt.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(c=>a.add(c.name));for(let u of o.keys())a.has(u)&&o.get(u).forEach(l=>{r("error",`A ${i} with the name '${l.name}' already exists in an imported grammar.`,{node:l,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new oo.MultiMap;for(let i of e.imports){let o=(0,jt.resolveImport)(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,a)=>{a>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[Ty.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let a=(0,jt.resolveTransitiveImports)(this.documents,o);n.set(o,a)}let i=new oo.MultiMap;for(let o of e.imports){let a=n.get(o);for(let s of e.imports){if(o===s)continue;let u=n.get(s),c=this.getDuplicateExportedRules(a,u);for(let l of c)i.add(o,l)}}for(let o of e.imports){let a=i.get(o);a.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,by.stream)(a).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),o=r.flatMap(s=>s.rules),a=new Set;for(let s of i){let u=s.name;for(let c of o){let l=c.name;u===l&&a.add(c.name)}}return a}checkGrammarTypeInfer(e,r){var n,i,o;let a=new Set;for(let u of e.types)a.add(u.name);for(let u of e.interfaces)a.add(u.name);(0,jt.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(c=>a.add(c.name)),u.interfaces.forEach(c=>a.add(c.name))});for(let u of e.rules.filter(Ve.isParserRule)){if(ac(u))continue;let c=(0,jt.isDataTypeRule)(u),l=!u.returnType&&!u.dataType,f=(0,jt.getTypeNameWithoutError)(u);if(!c&&f&&a.has(f)===l){if((l||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,l),{node:u,property:"name",code:pr.MissingReturns});else if(l||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let h=(0,ao.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,l),{node:u.inferredType,property:"name",code:pr.InvalidInfers,data:(0,Ry.toDocumentSegment)(h)})}}else if(c&&l){let h=(0,ao.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:pr.InvalidInfers,data:(0,Ry.toDocumentSegment)(h)})}}for(let u of(0,io.streamAllContents)(e).filter(Ve.isAction)){let c=this.getActionType(u);if(c){let l=Boolean(u.inferredType),f=(0,jt.getTypeNameWithoutError)(u);if(u.type&&f&&a.has(f)===l){let h=l?(0,ao.findNodeForKeyword)(u.$cstNode,"infer"):(0,ao.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,l),{node:u,property:"type",code:l?pr.SuperfluousInfer:pr.MissingInfer,data:(0,Ry.toDocumentSegment)(h)})}else if(c&&f&&a.has(f)&&l&&u.$cstNode){let h=(0,ao.findNodeForProperty)((o=u.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),y=(0,ao.findNodeForKeyword)(u.$cstNode,"{");h&&y&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:pr.SuperfluousInfer,data:{start:y.range.end,end:h.range.start}})}}}function s(u,c){return c?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:pr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,jt.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch(n){}}checkUsedHiddenTerminalRule(e,r){let n=(0,io.getContainerOfType)(e,i=>Ve.isTerminalRule(i)||Ve.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ve.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ve.isTerminalRule(n)&&n.fragment&&(0,io.getContainerOfType)(e,Ve.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:pr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,jt.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:pr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:pr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,ao.getAllReachableRules)(e,!0);for(let i of e.rules)Ve.isTerminalRule(i)&&i.hidden||ac(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[Ty.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new oo.MultiMap,i=new Set;for(let c of e.rules)Ve.isTerminalRule(c)&&c.name&&n.add(c.name,c),Ve.isParserRule(c)&&(0,io.streamAllContents)(c).filter(Ve.isKeyword).forEach(f=>i.add(f.value));let o=new oo.MultiMap,a=new oo.MultiMap;for(let c of e.imports){let l=(0,jt.resolveTransitiveImports)(this.documents,c);for(let f of l)for(let h of f.rules)Ve.isTerminalRule(h)&&h.name?o.add(h.name,c):Ve.isParserRule(h)&&h.name&&(0,io.streamAllContents)(h).filter(Ve.isKeyword).forEach(m=>a.add(m.value,c))}for(let c of n.values())if(i.has(c.name))r("error","Terminal name clashes with existing keyword.",{node:c,property:"name"});else if(a.has(c.name)){let l=a.get(c.name);r("error",`Terminal name clashes with imported keyword from "${l[0].path}".`,{node:c,property:"name"})}let s=new oo.MultiMap;for(let c of i)for(let l of o.get(c))s.add(l,c);for(let[c,l]of s.entriesGroupedByKey())l.length>0&&r("error",`Imported terminals (${l.join(", ")}) clash with locally defined keywords.`,{node:c,property:"path"});let u=new oo.MultiMap;for(let[c,l]of o.entriesGroupedByKey()){let f=a.get(c);f.length>0&&l.filter(h=>!f.includes(h)).forEach(h=>u.add(h,c))}for(let[c,l]of u.entriesGroupedByKey())l.length>0&&r("error",`Imported terminals (${l.join(", ")}) clash with imported keywords.`,{node:c,property:"path"})}checkRuleName(e,r){if(e.name&&!ac(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:pr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&yK.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,io.getContainerOfType)(e,Ay.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,jt.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:pr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,io.streamAllContents)(e).filter(Ve.isParameterReference);for(let o of n)i.some(a=>a.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[Ty.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(ac(e))return;let n=e.dataType,i=(0,jt.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,Ay.isRuleCall)(e.terminal)&&(0,Ay.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,io.streamAllContents)(e.terminal).map(o=>Ve.isCrossReference(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=(0,mK.typeDefinitionToPropertyType)(n.type),o=(0,Py.flattenPlainType)(i),a=!1,s=!1;for(let u of o)(0,Py.isPlainReferenceType)(u)?a=!0:(0,Py.isPlainReferenceType)(u)||(s=!0);a&&s&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,jt.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Ve.isParserRule(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else Ve.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,ao.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Ve.isRuleCall(e.terminal)&&Ve.isParserRule(e.terminal.rule.ref)&&!(0,jt.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e==null?void 0:e.type);n&&r("error",n,{node:e,property:"type"})}checkFragmentsInTypes(e,r){var n,i;Ve.isParserRule((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){Ve.isSimpleType(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&Ve.isParserRule(e.ref)&&!(0,jt.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,jt.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Ve.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};hr.LangiumGrammarValidator=Sy;function ac(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var yK=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var Mf=d(Rn=>{"use strict";Object.defineProperty(Rn,"__esModule",{value:!0});Rn.DocumentValidator=Rn.toDiagnosticSeverity=Rn.getDiagnosticRange=Rn.DefaultDocumentValidator=void 0;var zr=xe(),RP=vt(),vK=Re(),_K=Le(),qf=br(),Ey=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=zr.CancellationToken.None){let n=e.parseResult,i=[];await(0,qf.interruptAndCheck)(r);for(let o of n.lexerErrors){let a={severity:zr.DiagnosticSeverity.Error,range:{start:{line:o.line-1,character:o.column-1},end:{line:o.line-1,character:o.column+o.length-1}},message:o.message,code:Lf.LexingError,source:this.getSource()};i.push(a)}for(let o of n.parserErrors){let a;if(isNaN(o.token.startOffset)){if("previousToken"in o){let s=o.previousToken;if(isNaN(s.startOffset))a=zr.Range.create(0,0,0,0);else{let u=zr.Position.create(s.endLine-1,s.endColumn);a=zr.Range.create(u,u)}}}else a=(0,_K.tokenToRange)(o.token);if(a){let s={severity:zr.DiagnosticSeverity.Error,range:a,message:o.message,code:Lf.ParsingError,source:this.getSource()};i.push(s)}}for(let o of e.references){let a=o.error;if(a){let s={containerType:a.container.$type,property:a.property,refText:a.reference.$refText},u={node:a.container,property:a.property,index:a.index,code:Lf.LinkingError,data:s};i.push(this.toDiagnostic("error",a.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(o){if((0,qf.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o)}return await(0,qf.interruptAndCheck)(r),i}async validateAst(e,r,n=zr.CancellationToken.None){let i=[],o=(a,s,u)=>{i.push(this.toDiagnostic(a,s,u))};return await Promise.all((0,vK.streamAst)(e).map(async a=>{await(0,qf.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(a.$type);for(let u of s)await u(a,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:bP(n),severity:AP(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};Rn.DefaultDocumentValidator=Ey;function bP(t){if(zr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,RP.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,RP.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e!=null||(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}Rn.getDiagnosticRange=bP;function AP(t){switch(t){case"error":return zr.DiagnosticSeverity.Error;case"warning":return zr.DiagnosticSeverity.Warning;case"info":return zr.DiagnosticSeverity.Information;case"hint":return zr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}Rn.toDiagnosticSeverity=AP;var Lf;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Lf=Rn.DocumentValidator||(Rn.DocumentValidator={}))});var NP=d(Bn=>{"use strict";var TK=Bn&&Bn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),RK=Bn&&Bn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),bK=Bn&&Bn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&TK(e,t,r);return RK(e,t),e};Object.defineProperty(Bn,"__esModule",{value:!0});Bn.LangiumGrammarCodeActionProvider=void 0;var Vr=xe(),AK=Wr(),PP=Re(),SP=Le(),PK=vt(),CP=Zo(),EP=Ci(),SK=Mf(),Ny=bK(ke()),Xr=Cy(),ky=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Xr.IssueCodes.GrammarNameUppercase:case Xr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Xr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Xr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Xr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Xr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Xr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Xr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Xr.IssueCodes.InvalidInfers:case Xr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Xr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Xr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case SK.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=(0,SP.findLeafNodeAtOffset)(i,n),a=(0,PP.getContainerOfType)(o==null?void 0:o.element,Ny.isCharacterRange);if(a&&a.right&&a.$cstNode){let s=a.left.value,u=a.right.value;return{title:"Refactor into regular expression",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:a.$cstNode.range,newText:`/[${(0,CP.escapeRegExp)(s)}-${(0,CP.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],a=(0,PK.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(a){let s=a.range.start,u=a.offset,c=n.$cstNode.text.indexOf(")",u)+1;o.push({newText:"",range:{start:s,end:r.textDocument.positionAt(c)}})}for(let s of i){let u=s.ref;if(u&&Ny.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let c=u.$cstNode.range.start;o.push({newText:"hidden ",range:{start:c,end:c}})}}return{title:"Fix hidden terminals",kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let a=(0,SP.findLeafNodeAtOffset)(o,i),s=(0,PP.getContainerOfType)(a==null?void 0:a.element,Ny.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let a={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(a),u=this.indexManager.allElements(s).filter(h=>h.name===r.refText),c=[],l=-1,f=-1;for(let h of u){if((0,EP.equalURI)(h.documentUri,n.uri))continue;let y=CK(n.uri,h.documentUri),m,R="",E=n.parseResult.value,S=E.imports.find(A=>A.path&&y<A.path);if(S)m=(i=S.$cstNode)===null||i===void 0?void 0:i.range.start;else if(E.imports.length>0){let A=E.imports[E.imports.length-1].$cstNode.range.end;A&&(m={line:A.line+1,character:0})}else E.rules.length>0&&(m=(o=E.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,R=`
`);m&&((l<0||y.length<f)&&(l=c.length,f=y.length),c.push({title:`Add import to '${y}'`,kind:Vr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:m,end:m},newText:`import '${y}'
${R}`}]}}}))}return l>=0&&(c[l].isPreferred=!0),c}};Bn.LangiumGrammarCodeActionProvider=ky;function CK(t,e){let r=AK.Utils.dirname(t),n=(0,EP.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var Ff=d($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.DefaultFoldingRangeProvider=void 0;var wy=xe(),EK=Re(),NK=Le(),Oy=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=(0,EK.streamAllContents)(i).iterator(),a;do if(a=o.next(),!a.done){let s=a.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||o.prune()}while(!a.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of(0,NK.flattenCst)(i))if(this.commentNames.includes(o.tokenType.name)){let a=this.toFoldingRange(e,o,wy.FoldingRangeKind.Comment);a&&n(a)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,a=i.end;if(!(a.line-o.line<2))return this.includeLastFoldingLine(r,n)||(a=e.textDocument.positionAt(e.textDocument.offsetAt({line:a.line,character:0})-1)),wy.FoldingRange.create(o.line,a.line,o.character,a.character,n)}includeLastFoldingLine(e,r){if(r===wy.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};$f.DefaultFoldingRangeProvider=Oy});var kP=d(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.LangiumGrammarFoldingRangeProvider=void 0;var kK=Ff(),wK=ke(),Dy=class extends kK.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,wK.isParserRule)(e)}};jf.LangiumGrammarFoldingRangeProvider=Dy});var qy=d(bn=>{"use strict";Object.defineProperty(bn,"__esModule",{value:!0});bn.Formatting=bn.FormattingRegion=bn.DefaultNodeFormatter=bn.AbstractFormatter=void 0;var Uf=vt(),Iy=tr(),OK=Re(),wP=Le(),sc=$t(),xy=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Gf(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(s,u,c)=>{var l,f;let h=this.nodeModeToKey(s,u),y=i.get(h),m=(l=c.options.priority)!==null&&l!==void 0?l:0,R=(f=y==null?void 0:y.options.priority)!==null&&f!==void 0?f:0;(!y||R<=m)&&i.set(h,c)};this.collector=o,this.iterateAstFormatting(e,n);let a=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,a)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let a=e.offsetAt(i.range.start),s=e.offsetAt(o.range.end);a<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,OK.streamAllContents)(n).iterator(),o;do if(o=i.next(),!o.done){let a=o.value;this.insideRange(a.$cstNode.range,r)?this.format(a):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},a=[],u=this.iterateCstTree(e,o).iterator(),c,l;do if(l=u.next(),!l.done){let f=l.value,h=(0,Iy.isLeafCstNode)(f),y=this.nodeModeToKey(f,"prepend"),m=r.get(y);if(r.delete(y),m){let S=this.createTextEdit(c,f,m,o);for(let A of S)A&&this.insideRange(A.range,i)&&this.isNecessary(A,e.textDocument)&&a.push(A)}let R=this.nodeModeToKey(f,"append"),E=r.get(R);if(r.delete(R),E){let S=(0,wP.getNextNode)(f);if(S){let A=this.createTextEdit(f,S,E,o);for(let b of A)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&a.push(b)}}if(!m&&f.hidden){let S=this.createHiddenTextEdits(c,f,void 0,o);for(let A of S)A&&this.insideRange(A.range,i)&&this.isNecessary(A,e.textDocument)&&a.push(A)}h&&(c=f)}while(!l.done);return a}createHiddenTextEdits(e,r,n,i){var o;let a=r.range.start.line;if(e&&e.range.end.line===a)return[];let s=[],u={start:{character:0,line:a},end:r.range.start},c=i.document.getText(u),l=this.findFittingMove(u,(o=n==null?void 0:n.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(c,i),y=this.getIndentationCharacterCount(i,l)-f;if(y===0)return[];let m="";y>0&&(m=(i.options.insertSpaces?" ":"	").repeat(y));let R=r.text.split(`
`);R[0]=c+R[0];for(let E=0;E<R.length;E++){let S=a+E,A={character:0,line:S};if(y>0)s.push({newText:m,range:{start:A,end:A}});else{let b=R[E],O=0;for(;O<b.length;O++){let $=b.charAt(O);if($!==" "&&$!=="	")break}s.push({newText:"",range:{start:A,end:{line:S,character:Math.min(O,Math.abs(y))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let a={start:(o=e==null?void 0:e.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},s=this.findFittingMove(a,n.moves,i);if(!s)return[];let u=s.characters,c=s.lines,l=s.tabs,f=i.indentation;i.indentation+=l!=null?l:0;let h=[];return u!==void 0?h.push(this.createSpaceTextEdit(a,u,n.options)):c!==void 0?h.push(this.createLineTextEdit(a,c,i,n.options)):l!==void 0&&h.push(this.createTabTextEdit(a,Boolean(e),i)),(0,Iy.isLeafCstNode)(r)&&(i.indentation=f),h}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),a=r?1:0,s=Math.max(e.end.line-e.start.line,a);return{newText:`${`
`.repeat(s)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new sc.TreeStreamImpl(i,o=>this.iterateCst(o,r)):sc.EMPTY_STREAM}iterateCst(e,r){if(!(0,Iy.isCompositeCstNode)(e))return sc.EMPTY_STREAM;let n=r.indentation;return new sc.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,sc.DONE_RESULT))}};bn.AbstractFormatter=xy;var Gf=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new Ar(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new Ar(r,this.collector)}property(e,r){let n=(0,Uf.findNodeForProperty)(this.astNode.$cstNode,e,r);return new Ar(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,Uf.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new Ar(r,this.collector)}keyword(e,r){let n=(0,Uf.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new Ar(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,Uf.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new Ar(r,this.collector)}cst(e){return new Ar([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new Ar([],this.collector);let o=n[0],a=i[0];if(o.offset>a.offset){let s=o;o=a,a=s}return new Ar((0,wP.getInteriorNodes)(o,a),this.collector)}};bn.DefaultNodeFormatter=Gf;var Ar=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new Ar(this.nodes.slice(e,r),this.collector)}};bn.FormattingRegion=Ar;var DK;(function(t){function e(...l){return{options:{},moves:l.flatMap(f=>f.moves).sort(c)}}t.fit=e;function r(l){return i(0,l)}t.noSpace=r;function n(l){return i(1,l)}t.oneSpace=n;function i(l,f){return{options:f!=null?f:{},moves:[{characters:l}]}}t.spaces=i;function o(l){return a(1,l)}t.newLine=o;function a(l,f){return{options:f!=null?f:{},moves:[{lines:l}]}}t.newLines=a;function s(l){return{options:l!=null?l:{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(l){return{options:l!=null?l:{},moves:[{tabs:0}]}}t.noIndent=u;function c(l,f){var h,y,m,R,E,S;let A=(h=l.lines)!==null&&h!==void 0?h:0,b=(y=f.lines)!==null&&y!==void 0?y:0,O=(m=l.tabs)!==null&&m!==void 0?m:0,$=(R=f.tabs)!==null&&R!==void 0?R:0,W=(E=l.characters)!==null&&E!==void 0?E:0,Z=(S=f.characters)!==null&&S!==void 0?S:0;return A<b?-1:A>b?1:O<$?-1:O>$?1:W<Z?-1:W>Z?1:0}})(DK=bn.Formatting||(bn.Formatting={}))});var OP=d(Kn=>{"use strict";var IK=Kn&&Kn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),xK=Kn&&Kn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),qK=Kn&&Kn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&IK(e,t,r);return xK(e,t),e};Object.defineProperty(Kn,"__esModule",{value:!0});Kn.LangiumGrammarFormatter=void 0;var Se=qy(),so=qK(ke()),Ly=class extends Se.AbstractFormatter{format(e){if(so.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(Se.Formatting.noSpace());else if(so.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Se.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Se.Formatting.oneSpace()):r.property("name").append(Se.Formatting.noSpace()),r.properties("parameters").append(Se.Formatting.noSpace()),r.keywords(",").append(Se.Formatting.oneSpace()),r.keywords("<").append(Se.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Se.Formatting.noSpace()),r.interior(i,n).prepend(Se.Formatting.indent()),n.prepend(Se.Formatting.fit(Se.Formatting.noSpace(),Se.Formatting.newLine())),r.node(e).prepend(Se.Formatting.noIndent())}else if(so.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Se.Formatting.oneSpace()),r.keyword("returns").append(Se.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(Se.Formatting.oneSpace()),r.keyword(":").prepend(Se.Formatting.noSpace()),r.keyword(";").prepend(Se.Formatting.fit(Se.Formatting.noSpace(),Se.Formatting.newLine())),r.node(e).prepend(Se.Formatting.noIndent())}else if(so.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Se.Formatting.noSpace()),r.keywords(".","+=","=").surround(Se.Formatting.noSpace()),r.keyword("}").prepend(Se.Formatting.noSpace())}else if(so.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(Se.Formatting.oneSpace());else if(so.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Se.Formatting.noSpace());else if(so.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Se.Formatting.noSpace()),r.keyword(",").append(Se.Formatting.oneSpace()),r.properties("arguments").append(Se.Formatting.noSpace())}so.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Se.Formatting.noSpace())}};Kn.LangiumGrammarFormatter=Ly});var Bf=d(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.SemanticTokensDecoder=Ct.AbstractSemanticTokenProvider=Ct.SemanticTokensBuilder=Ct.DefaultSemanticTokenOptions=Ct.AllSemanticTokenModifiers=Ct.AllSemanticTokenTypes=void 0;var fe=xe(),Hf=vt(),LK=Re(),MK=br(),$K=Le();Ct.AllSemanticTokenTypes={[fe.SemanticTokenTypes.class]:0,[fe.SemanticTokenTypes.comment]:1,[fe.SemanticTokenTypes.enum]:2,[fe.SemanticTokenTypes.enumMember]:3,[fe.SemanticTokenTypes.event]:4,[fe.SemanticTokenTypes.function]:5,[fe.SemanticTokenTypes.interface]:6,[fe.SemanticTokenTypes.keyword]:7,[fe.SemanticTokenTypes.macro]:8,[fe.SemanticTokenTypes.method]:9,[fe.SemanticTokenTypes.modifier]:10,[fe.SemanticTokenTypes.namespace]:11,[fe.SemanticTokenTypes.number]:12,[fe.SemanticTokenTypes.operator]:13,[fe.SemanticTokenTypes.parameter]:14,[fe.SemanticTokenTypes.property]:15,[fe.SemanticTokenTypes.regexp]:16,[fe.SemanticTokenTypes.string]:17,[fe.SemanticTokenTypes.struct]:18,[fe.SemanticTokenTypes.type]:19,[fe.SemanticTokenTypes.typeParameter]:20,[fe.SemanticTokenTypes.variable]:21};Ct.AllSemanticTokenModifiers={[fe.SemanticTokenModifiers.abstract]:1<<0,[fe.SemanticTokenModifiers.async]:1<<1,[fe.SemanticTokenModifiers.declaration]:1<<2,[fe.SemanticTokenModifiers.defaultLibrary]:1<<3,[fe.SemanticTokenModifiers.definition]:1<<4,[fe.SemanticTokenModifiers.deprecated]:1<<5,[fe.SemanticTokenModifiers.documentation]:1<<6,[fe.SemanticTokenModifiers.modification]:1<<7,[fe.SemanticTokenModifiers.readonly]:1<<8,[fe.SemanticTokenModifiers.static]:1<<9};Ct.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Ct.AllSemanticTokenTypes),tokenModifiers:Object.keys(Ct.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var Wf=class extends fe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Ct.SemanticTokensBuilder=Wf;var My=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=fe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=fe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=fe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Wf;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=(0,LK.streamAst)(i,{range:this.currentRange}).iterator(),a;do if(a=o.next(),!a.done){await(0,MK.interruptAndCheck)(n);let s=a.value;this.highlightElement(s,r)==="prune"&&o.prune()}while(!a.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!(0,$K.inRange)(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let a=Ct.AllSemanticTokenTypes[i],s=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let l of o){let f=Ct.AllSemanticTokenModifiers[l];s|=f}}let u=n.start.line,c=n.end.line;if(u===c){let l=n.start.character,f=n.end.character-l;this.currentTokensBuilder.push(u,l,f,a,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let l=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),h=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,l,h-f,a,s)}else{let l=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(l.line,l.character,f-l.character-1,a,s);for(let h=u+1;h<c;h++){let y=f;f=this.currentDocument.textDocument.offsetAt({line:h+1,character:0}),this.currentTokensBuilder.push(h,0,f-y-1,a,s)}this.currentTokensBuilder.push(c,0,n.end.character,a,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=(0,Hf.findNodeForProperty)(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...(0,Hf.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:a}=e,s=[];if(typeof o=="number"){let u=(0,Hf.findNodeForKeyword)(r.$cstNode,n,o);u&&s.push(u)}else s.push(...(0,Hf.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:a})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}};Ct.AbstractSemanticTokenProvider=My;var FK;(function(t){function e(n,i){let o=new Map;Object.entries(Ct.AllSemanticTokenTypes).forEach(([u,c])=>o.set(c,u));let a=0,s=0;return r(n.data,5).map(u=>{a+=u[0],u[0]!==0&&(s=0),s+=u[1];let c=u[2];return{offset:i.textDocument.offsetAt({line:a,character:s}),tokenType:o.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:a,character:s},end:{line:a,character:s+c}})}})}t.decode=e;function r(n,i){let o=[];for(let a=0;a<n.length;a+=i){let s=n.slice(a,a+i);o.push(s)}return o}})(FK=Ct.SemanticTokensDecoder||(Ct.SemanticTokensDecoder={}))});var DP=d(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.LangiumGrammarSemanticTokenProvider=void 0;var uo=xe(),jK=Bf(),co=ke(),$y=class extends jK.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,co.isAssignment)(e)?r({node:e,property:"feature",type:uo.SemanticTokenTypes.property}):(0,co.isAction)(e)?e.feature&&r({node:e,property:"feature",type:uo.SemanticTokenTypes.property}):(0,co.isReturnType)(e)?r({node:e,property:"name",type:uo.SemanticTokenTypes.type}):(0,co.isSimpleType)(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:uo.SemanticTokenTypes.type}):(0,co.isParameter)(e)?r({node:e,property:"name",type:uo.SemanticTokenTypes.parameter}):(0,co.isParameterReference)(e)?r({node:e,property:"parameter",type:uo.SemanticTokenTypes.parameter}):(0,co.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:uo.SemanticTokenTypes.type}):(0,co.isTypeAttribute)(e)&&r({node:e,property:"name",type:uo.SemanticTokenTypes.property})}};Kf.LangiumGrammarSemanticTokenProvider=$y});var xP=d(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.LangiumGrammarNameProvider=void 0;var UK=ns(),GK=vt(),IP=ke(),Fy=class extends UK.DefaultNameProvider{getName(e){return(0,IP.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,IP.isAssignment)(e)?(0,GK.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};zf.LangiumGrammarNameProvider=Fy});var Xf=d(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.DefaultReferences=void 0;var HK=vt(),qP=tr(),lo=Re(),jy=Le(),LP=$t(),WK=Ci(),Uy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,HK.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,qP.isReference)(i))return i.ref;if(Array.isArray(i)){for(let o of i)if((0,qP.isReference)(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,jy.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r!=null&&r.$cstNode){let n=this.nameProvider.getNameNode(r);return n!=null?n:r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,LP.stream)(n)}findLocalReferences(e,r=!1){let i=(0,lo.getDocument)(e).parseResult.value,o=[];if(r){let a=this.getReferenceToSelf(e);a&&o.push(a)}return(0,lo.streamAst)(i).forEach(a=>{(0,lo.streamReferences)(a).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;o.push({sourceUri:(0,lo.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,lo.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,jy.toDocumentSegment)(u),local:(0,WK.equalURI)((0,lo.getDocument)(u.element).uri,(0,lo.getDocument)(e).uri)})}})}),(0,LP.stream)(o)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,lo.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,jy.toDocumentSegment)(r),local:!0}}}};Vf.DefaultReferences=Uy});var UP=d(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.LangiumGrammarReferences=void 0;var BK=Xf(),nr=Re(),MP=Le(),$P=vt(),FP=$t(),Gy=Ci(),Xt=ke(),jP=Ft(),Yf=ts(),Hy=class extends BK.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,$P.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Xt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Xt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Xt.isTypeAttribute)(e)){let i=(0,nr.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Xt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],o=(0,nr.getContainerOfType)(e,Xt.isInterface);if(o){let a=(0,Yf.collectChildrenTypes)(o,this,this.documents,this.nodeLocator),s=[];if(a.forEach(u=>{let c=this.findLocalRulesWithReturnType(u,r);s.push(...c)}),(0,Gy.equalURI)((0,nr.getDocument)(e).uri,(0,nr.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let c=this.createReferencesToAttribute(u,e);i.push(...c)})}return(0,FP.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,nr.getContainerOfType)(e,Xt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let o=(0,Yf.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),a=[];o.forEach(s=>{let u=this.findRulesWithReturnType(s);a.push(...u)}),a.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,FP.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Xt.isParserRule)(e)){let i=(0,jP.extractAssignments)(e.definition).find(o=>o.feature===r.name);if(i!=null&&i.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:(0,nr.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,nr.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,MP.toDocumentSegment)(o),local:(0,Gy.equalURI)((0,nr.getDocument)(i).uri,(0,nr.getDocument)(r).uri)})}}else{if(e.feature===r.name){let o=(0,$P.findNodeForProperty)(e.$cstNode,"feature");o&&n.push({sourceUri:(0,nr.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,nr.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,MP.toDocumentSegment)(o),local:(0,Gy.equalURI)((0,nr.getDocument)(e).uri,(0,nr.getDocument)(r).uri)})}let i=(0,nr.getContainerOfType)(e,Xt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,nr.getContainerOfType)(e,Xt.isParserRule),i=(0,jP.getActionAtElement)(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n==null?void 0:n.returnType)===null||r===void 0)&&r.ref&&((0,Xt.isInterface)(n.returnType.ref)||(0,Xt.isType)(n.returnType.ref))){let o=(0,Yf.collectSuperTypes)(n.returnType.ref);for(let a of o){let s=a.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r!=null?r:e.feature,o=(0,Yf.collectSuperTypes)(e.type.ref);for(let a of o){let s=a.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),a=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);((0,Xt.isParserRule)(a)||(0,Xt.isAction)(a))&&r.push(a)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,nr.streamAst)(r).filter(o=>{var a,s;return(0,Xt.isParserRule)(o)&&((a=o.returnType)===null||a===void 0?void 0:a.ref)===e||(0,Xt.isAction)(o)&&((s=o.type)===null||s===void 0?void 0:s.ref)===e}).forEach(o=>{((0,Xt.isParserRule)(o)||(0,Xt.isAction)(o))&&n.push(o)}),n}};Jf.LangiumGrammarReferences=Hy});var Ky=d(Yr=>{"use strict";var KK=Yr&&Yr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),zK=Yr&&Yr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),VK=Yr&&Yr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&KK(e,t,r);return zK(e,t),e};Object.defineProperty(Yr,"__esModule",{value:!0});Yr.findFirstFeatures=Yr.findNextFeatures=void 0;var ir=VK(ke()),Ei=Ft(),XK=tr(),YK=Re(),JK=vt();function QK(t,e){let r={stacks:t,tokens:e};return ZK(r),r.stacks.flat().forEach(i=>{i.property=void 0}),WP(r.stacks).map(i=>i[i.length-1])}Yr.findNextFeatures=QK;function Wy(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],a=e.feature;if(n.has(a))return[];n.add(a);let s,u=a;for(;u.$container;)if(ir.isGroup(u.$container)){s=u.$container;break}else if(ir.isAbstractElement(u.$container))u=u.$container;else break;if((0,Ei.isArrayCardinality)(u.cardinality)){let c=ds({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let l of c)i.add(l.feature);o.push(...c)}if(s){let c=s.elements.indexOf(u);c!==void 0&&c<s.elements.length-1&&o.push(...HP({feature:s,type:e.type,new:!1},c+1,r,n,i)),o.every(l=>(0,Ei.isOptionalCardinality)(l.feature.cardinality)||(0,Ei.isOptionalCardinality)(r.get(l.feature))||i.has(l.feature))&&o.push(...Wy({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function GP(t){return(0,XK.isAstNode)(t)&&(t={feature:t}),ds({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Yr.findFirstFeatures=GP;function ds(t){var e,r,n;let{next:i,cardinalities:o,visited:a,plus:s}=t;if(i===void 0)return[];let{feature:u,type:c}=i;if(ir.isGroup(u)){if(a.has(u))return[];a.add(u)}if(ir.isGroup(u))return HP(i,0,o,a,s).map(l=>Qf(l,u.cardinality,o));if(ir.isAlternatives(u)||ir.isUnorderedGroup(u))return u.elements.flatMap(l=>ds({next:{feature:l,new:!1,type:c},cardinalities:o,visited:a,plus:s})).map(l=>Qf(l,u.cardinality,o));if(ir.isAssignment(u)){let l={feature:u.terminal,new:!1,type:c,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return ds({next:l,cardinalities:o,visited:a,plus:s}).map(f=>Qf(f,u.cardinality,o))}else{if(ir.isAction(u))return Wy({next:{feature:u,new:!0,type:(0,Ei.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:o,visited:a,plus:s});if(ir.isRuleCall(u)&&ir.isParserRule(u.rule.ref)){let l=u.rule.ref,f={feature:l.definition,new:!0,type:l.fragment?void 0:(n=(0,Ei.getExplicitRuleType)(l))!==null&&n!==void 0?n:l.name,property:i.property};return ds({next:f,cardinalities:o,visited:a,plus:s}).map(h=>Qf(h,u.cardinality,o))}else return[i]}}function Qf(t,e,r){return r.set(t.feature,e),t}function HP(t,e,r,n,i){var o;let a=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},a.push(...ds({next:s,cardinalities:r,visited:n,plus:i})),!!(0,Ei.isOptionalCardinality)((o=s.feature.cardinality)!==null&&o!==void 0?o:r.get(s.feature))););return a}function ZK(t){for(let e of t.tokens){let r=WP(t.stacks,e);t.stacks=r}}function WP(t,e){let r=[];for(let n of t)r.push(...ez(n,e));return r}function ez(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(tz)),i=[];for(;t.length>0;){let o=t.pop(),a=Wy({next:o,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?By(s.feature,e):!0);for(let s of a)i.push([...t,s]);if(!a.every(s=>(0,Ei.isOptionalCardinality)(s.feature.cardinality)||(0,Ei.isOptionalCardinality)(r.get(s.feature))))break}return i}function tz(t){if(t.cardinality==="+")return!0;let e=(0,YK.getContainerOfType)(t,ir.isAssignment);return!!(e&&e.cardinality==="+")}function By(t,e){if(ir.isKeyword(t))return t.value===e.image;if(ir.isRuleCall(t))return rz(t.rule.ref,e);if(ir.isCrossReference(t)){let r=(0,JK.getCrossReferenceTerminal)(t);if(r)return By(r,e)}return!1}function rz(t,e){return ir.isParserRule(t)?GP(t.definition).some(n=>By(n.feature,e)):ir.isTerminalRule(t)?new RegExp((0,Ei.terminalRegex)(t)).test(e.image):!1}});var ed=d(Jr=>{"use strict";var nz=Jr&&Jr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),iz=Jr&&Jr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),oz=Jr&&Jr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&nz(e,t,r);return iz(e,t),e};Object.defineProperty(Jr,"__esModule",{value:!0});Jr.DefaultCompletionProvider=Jr.mergeCompletionProviderOptions=void 0;var uc=xe(),cc=oz(ke()),az=Ft(),sz=Re(),uz=Le(),BP=vt(),KP=$t(),Zf=Ky();function cz(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n==null?void 0:n.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n==null?void 0:n.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}Jr.mergeCompletionProviderOptions=cz;var zy=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let o=[],a=e.textDocument,s=a.getText(),u=a.offsetAt(r.position),c=S=>{let A=this.fillCompletionItem(a,u,S);A&&o.push(A)},l=(0,uz.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),f={document:e,textDocument:a,node:l==null?void 0:l.element,offset:u,position:r.position};if(!l){let S=(0,BP.getEntryRule)(this.grammar);return await this.completionForRule(f,S,c),uc.CompletionList.create(o,!0)}let h=this.backtrackToTokenStart(s,u),y=this.findFeaturesAt(a,h),m=[],R=this.canReparse()&&u!==h;R&&(m=this.findFeaturesAt(a,u));let E=S=>cc.isKeyword(S.feature)?S.feature.value:S.feature;return await Promise.all((0,KP.stream)(y).distinct(E).map(S=>this.completionFor(f,S,c))),R&&await Promise.all((0,KP.stream)(m).exclude(y,E).distinct(E).map(S=>this.completionFor(f,S,c))),uc.CompletionList.create(o,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:uc.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let u=(0,BP.getEntryRule)(this.grammar),c=(0,Zf.findFirstFeatures)({feature:u.definition,new:!0,type:(0,az.getExplicitRuleType)(u)});return o.length>0?(o.shift(),(0,Zf.findNextFeatures)(c.map(l=>[l]),o)):c}let a=[...o].splice(i.tokenIndex);return(0,Zf.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],a)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(cc.isParserRule(r)){let i=(0,Zf.findFirstFeatures)(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(cc.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(cc.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,sz.getContainerOfType)(r.feature,cc.isAssignment),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let a={reference:{},container:o,property:i.feature};try{let s=this.scopeProvider.getScope(a),u=new Set;s.getAllElements().forEach(c=>{!u.has(c.name)&&this.filterCrossReference(c)&&(n(this.createReferenceCompletionItem(c)),u.add(c.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:uc.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:uc.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,o;let a;if(typeof n.label=="string")a=n.label;else if("node"in n){let l=this.nameProvider.getName(n.node);if(!l)return;a=l}else if("nodeDescription"in n)a=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=a;let u=(o=n.textEdit)!==null&&o!==void 0?o:this.buildCompletionTextEdit(e,r,a,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:a}:void 0}buildCompletionTextEdit(e,r,n,i){let o=e.getText(),a=this.backtrackToTokenStart(o,r),s=o.substring(a,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(a),c=e.positionAt(r);return{newText:i,range:{start:u,end:c}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,a=r.length;for(let s=0;s<a;s++){let u=r.charCodeAt(s),c=e.charCodeAt(o);if((u===c||this.toUpperCharCode(u)===this.toUpperCharCode(c))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&o++,o===e.length))return!0;i=u}return!1}isWordTransition(e,r){return zP<=e&&e<=VP&&lz<=r&&r<=fz||e===XP&&r!==XP}toUpperCharCode(e){return zP<=e&&e<=VP?e-32:e}};Jr.DefaultCompletionProvider=zy;var zP="a".charCodeAt(0),VP="z".charCodeAt(0),lz="A".charCodeAt(0),fz="Z".charCodeAt(0),XP="_".charCodeAt(0)});var Yy=d(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.AbstractCallHierarchyProvider=void 0;var dz=xe(),YP=Wr(),Vy=Le(),Xy=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,Vy.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:dz.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(YP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,Vy.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(YP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,Vy.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};td.AbstractCallHierarchyProvider=Xy});var QP=d(JP=>{"use strict";Object.defineProperty(JP,"__esModule",{value:!0})});var eS=d(ZP=>{"use strict";Object.defineProperty(ZP,"__esModule",{value:!0})});var rS=d(tS=>{"use strict";Object.defineProperty(tS,"__esModule",{value:!0})});var Qy=d(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.DefaultDefinitionProvider=void 0;var pz=xe(),hz=Re(),mz=Le(),Jy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=(0,mz.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[pz.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r!=null&&r.element){let n=(0,hz.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};rd.DefaultDefinitionProvider=Jy});var ev=d(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.DefaultDocumentHighlightProvider=void 0;var gz=xe(),yz=Re(),vz=Le(),_z=Ci(),Zy=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,vz.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let a=[],u={onlyLocal:!0,includeDeclaration:(0,_z.equalURI)((0,yz.getDocument)(o).uri,e.uri)};return this.references.findReferences(o,u).forEach(c=>{a.push(this.createDocumentHighlight(c))}),a}}createDocumentHighlight(e){return gz.DocumentHighlight.create(e.segment.range)}};nd.DefaultDocumentHighlightProvider=Zy});var iS=d(nS=>{"use strict";Object.defineProperty(nS,"__esModule",{value:!0})});var rv=d(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.DefaultDocumentSymbolProvider=void 0;var Tz=xe(),Rz=Re(),tv=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:o!=null?o:i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,Rz.streamContents)(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}getSymbolKind(e){return Tz.SymbolKind.Field}};id.DefaultDocumentSymbolProvider=tv});var oS=d(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.AbstractExecuteCommandHandler=void 0;var bz=xe(),nv=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=bz.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};od.AbstractExecuteCommandHandler=nv});var ov=d(ps=>{"use strict";Object.defineProperty(ps,"__esModule",{value:!0});ps.MultilineCommentHoverProvider=ps.AstNodeHoverProvider=void 0;var Az=Le(),ad=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let a=e.textDocument.offsetAt(r.position),s=(0,Az.findDeclarationNodeAtOffset)(o,a,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>a){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};ps.AstNodeHoverProvider=ad;var iv=class extends ad{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};ps.MultilineCommentHoverProvider=iv});var aS=d(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.AbstractGoToImplementationProvider=void 0;var Pz=xe(),Sz=Le(),av=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=Pz.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let o=(0,Sz.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o){let a=this.references.findDeclaration(o);if(a)return this.collectGoToImplementationLocationLinks(a,n)}}}};sd.AbstractGoToImplementationProvider=av});var sS=d(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.AbstractInlayHintProvider=void 0;var Cz=xe(),Ez=Re(),Nz=br(),sv=class{async getInlayHints(e,r,n=Cz.CancellationToken.None){let i=e.parseResult.value,o=[],a=s=>o.push(s);for(let s of(0,Ez.streamAst)(i,{range:r.range}))await(0,Nz.interruptAndCheck)(n),this.computeInlayHint(s,a);return o}};ud.AbstractInlayHintProvider=sv});var fo=d(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.DefaultLangiumDocuments=Ni.DefaultLangiumDocumentFactory=Ni.DocumentState=void 0;var kz=mg(),wz=Wr(),Oz=$t(),hs;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(hs=Ni.DocumentState||(Ni.DocumentState={}));var uv=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r!=null?r:wz.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r!=null||(r=this.textDocuments.get(e.toString())),r!=null||(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:hs.Parsed,references:[],textDocument:n};else{let a=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:hs.Parsed,references:[],get textDocument(){return a()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=hs.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i!=null?i:i=kz.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r!=null?r:"")}};Ni.DefaultLangiumDocumentFactory=uv;var cv=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,Oz.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=hs.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=hs.Changed,this.documentMap.delete(r)),n}};Ni.DefaultLangiumDocuments=cv});var fv=d(ms=>{"use strict";Object.defineProperty(ms,"__esModule",{value:!0});ms.mergeSignatureHelpOptions=ms.AbstractSignatureHelpProvider=void 0;var Dz=xe(),Iz=Le(),lv=class{provideSignatureHelp(e,r,n=Dz.CancellationToken.None){let o=e.parseResult.value.$cstNode;if(o){let a=(0,Iz.findLeafNodeAtOffset)(o,e.textDocument.offsetAt(r.position));if(a)return this.getSignatureFromElement(a.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};ms.AbstractSignatureHelpProvider=lv;function xz(t){let e=[],r=[];t.forEach(i=>{i!=null&&i.triggerCharacters&&e.push(...i.triggerCharacters),i!=null&&i.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}ms.mergeSignatureHelpOptions=xz});var hv=d(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createRequestHandler=Y.createServerRequestHandler=Y.createCallHierarchyRequestHandler=Y.addCallHierarchyHandler=Y.addCodeLensHandler=Y.addSignatureHelpHandler=Y.addDocumentLinkHandler=Y.addExecuteCommandHandler=Y.addConfigurationChangeHandler=Y.addSemanticTokenHandler=Y.addInlayHintHandler=Y.addRenameHandler=Y.addFormattingHandler=Y.addFoldingRangeHandler=Y.addHoverHandler=Y.addDocumentHighlightsHandler=Y.addGoToDeclarationHandler=Y.addGoToImplementationHandler=Y.addGoToTypeDefinitionHandler=Y.addGotoDefinitionHandler=Y.addDocumentSymbolHandler=Y.addCodeActionHandler=Y.addFindReferencesHandler=Y.addCompletionHandler=Y.addDiagnosticsHandler=Y.addDocumentsHandler=Y.startLanguageServer=Y.DefaultLanguageServer=void 0;var ra=xe(),lc=Wr(),uS=Vu(),qz=br(),Lz=fo(),Mz=ed(),$z=Bf(),Fz=fv(),dv=class{constructor(e){this.onInitializeEmitter=new ra.Emitter,this.onInitializedEmitter=new ra.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,uS.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,uS.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(K=>K.lsp.Formatter),o=n.map(K=>{var ce;return(ce=K.lsp.Formatter)===null||ce===void 0?void 0:ce.formatOnTypeOptions}).find(K=>Boolean(K)),a=this.hasService(K=>K.lsp.CodeActionProvider),s=this.hasService(K=>K.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,c=this.services.lsp.DocumentLinkProvider,l=(0,Fz.mergeSignatureHelpOptions)(n.map(K=>{var ce;return(ce=K.lsp.SignatureHelp)===null||ce===void 0?void 0:ce.signatureHelpOptions})),f=this.hasService(K=>K.lsp.TypeProvider),h=this.hasService(K=>K.lsp.ImplementationProvider),y=this.hasService(K=>K.lsp.CompletionProvider),m=(0,Mz.mergeCompletionProviderOptions)(n.map(K=>{var ce;return(ce=K.lsp.CompletionProvider)===null||ce===void 0?void 0:ce.completionOptions})),R=this.hasService(K=>K.lsp.ReferencesProvider),E=this.hasService(K=>K.lsp.DocumentSymbolProvider),S=this.hasService(K=>K.lsp.DefinitionProvider),A=this.hasService(K=>K.lsp.DocumentHighlightProvider),b=this.hasService(K=>K.lsp.FoldingRangeProvider),O=this.hasService(K=>K.lsp.HoverProvider),$=this.hasService(K=>K.lsp.RenameProvider),W=this.hasService(K=>K.lsp.CallHierarchyProvider),Z=this.services.lsp.CodeLensProvider,Ee=this.hasService(K=>K.lsp.DeclarationProvider),Ne=this.services.lsp.InlayHintProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:ra.TextDocumentSyncKind.Incremental,completionProvider:y?m:void 0,referencesProvider:R,documentSymbolProvider:E,definitionProvider:S,typeDefinitionProvider:f,documentHighlightProvider:A,codeActionProvider:a,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:b,hoverProvider:O,renameProvider:$?{prepareProvider:!0}:void 0,semanticTokensProvider:s?$z.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:l,implementationProvider:h,callHierarchyProvider:W?{}:void 0,documentLinkProvider:c?{resolveProvider:Boolean(c.resolveDocumentLink)}:void 0,codeLensProvider:Z?{resolveProvider:Boolean(Z.resolveCodeLens)}:void 0,declarationProvider:Ee,inlayHintProvider:Ne?{resolveProvider:Boolean(Ne.resolveInlayHint)}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};Y.DefaultLanguageServer=dv;function jz(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");cS(e,t),lS(e,t),fS(e,t),dS(e,t),hS(e,t),mS(e,t),gS(e,t),yS(e,t),_S(e,t),RS(e,t),bS(e,t),pS(e,t),AS(e,t),TS(e,t),PS(e,t),SS(e,t),ES(e,t),kS(e,t),OS(e,t),wS(e,t),NS(e,t),CS(e,t),vS(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}Y.startLanguageServer=jz;function cS(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(a,s){n.lock(u=>r.update(a,s,u))}e.workspace.TextDocuments.onDidChangeContent(a=>{i([lc.URI.parse(a.document.uri)],[])}),t.onDidChangeWatchedFiles(a=>{let s=[],u=[];for(let c of a.changes){let l=lc.URI.parse(c.uri);c.type===ra.FileChangeType.Deleted?u.push(l):s.push(l)}i(s,u)})}Y.addDocumentsHandler=cS;function lS(t,e){e.workspace.DocumentBuilder.onBuildPhase(Lz.DocumentState.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}Y.addDiagnosticsHandler=lS;function fS(t,e){t.onCompletion(Yt((r,n,i,o)=>{var a;return(a=r.lsp.CompletionProvider)===null||a===void 0?void 0:a.getCompletion(n,i,o)},e))}Y.addCompletionHandler=fS;function dS(t,e){t.onReferences(Yt((r,n,i,o)=>{var a;return(a=r.lsp.ReferencesProvider)===null||a===void 0?void 0:a.findReferences(n,i,o)},e))}Y.addFindReferencesHandler=dS;function pS(t,e){t.onCodeAction(Yt((r,n,i,o)=>{var a;return(a=r.lsp.CodeActionProvider)===null||a===void 0?void 0:a.getCodeActions(n,i,o)},e))}Y.addCodeActionHandler=pS;function hS(t,e){t.onDocumentSymbol(Yt((r,n,i,o)=>{var a;return(a=r.lsp.DocumentSymbolProvider)===null||a===void 0?void 0:a.getSymbols(n,i,o)},e))}Y.addDocumentSymbolHandler=hS;function mS(t,e){t.onDefinition(Yt((r,n,i,o)=>{var a;return(a=r.lsp.DefinitionProvider)===null||a===void 0?void 0:a.getDefinition(n,i,o)},e))}Y.addGotoDefinitionHandler=mS;function gS(t,e){t.onTypeDefinition(Yt((r,n,i,o)=>{var a;return(a=r.lsp.TypeProvider)===null||a===void 0?void 0:a.getTypeDefinition(n,i,o)},e))}Y.addGoToTypeDefinitionHandler=gS;function yS(t,e){t.onImplementation(Yt((r,n,i,o)=>{var a;return(a=r.lsp.ImplementationProvider)===null||a===void 0?void 0:a.getImplementation(n,i,o)},e))}Y.addGoToImplementationHandler=yS;function vS(t,e){t.onDeclaration(Yt((r,n,i,o)=>{var a;return(a=r.lsp.DeclarationProvider)===null||a===void 0?void 0:a.getDeclaration(n,i,o)},e))}Y.addGoToDeclarationHandler=vS;function _S(t,e){t.onDocumentHighlight(Yt((r,n,i,o)=>{var a;return(a=r.lsp.DocumentHighlightProvider)===null||a===void 0?void 0:a.getDocumentHighlight(n,i,o)},e))}Y.addDocumentHighlightsHandler=_S;function TS(t,e){t.onHover(Yt((r,n,i,o)=>{var a;return(a=r.lsp.HoverProvider)===null||a===void 0?void 0:a.getHoverContent(n,i,o)},e))}Y.addHoverHandler=TS;function RS(t,e){t.onFoldingRanges(Yt((r,n,i,o)=>{var a;return(a=r.lsp.FoldingRangeProvider)===null||a===void 0?void 0:a.getFoldingRanges(n,i,o)},e))}Y.addFoldingRangeHandler=RS;function bS(t,e){t.onDocumentFormatting(Yt((r,n,i,o)=>{var a;return(a=r.lsp.Formatter)===null||a===void 0?void 0:a.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(Yt((r,n,i,o)=>{var a;return(a=r.lsp.Formatter)===null||a===void 0?void 0:a.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(Yt((r,n,i,o)=>{var a;return(a=r.lsp.Formatter)===null||a===void 0?void 0:a.formatDocumentOnType(n,i,o)},e))}Y.addFormattingHandler=bS;function AS(t,e){t.onRenameRequest(Yt((r,n,i,o)=>{var a;return(a=r.lsp.RenameProvider)===null||a===void 0?void 0:a.rename(n,i,o)},e)),t.onPrepareRename(Yt((r,n,i,o)=>{var a;return(a=r.lsp.RenameProvider)===null||a===void 0?void 0:a.prepareRename(n,i,o)},e))}Y.addRenameHandler=AS;function PS(t,e){var r;let n=e.lsp.InlayHintProvider;if(n){t.languages.inlayHint.on(ki((o,a,s,u)=>n.getInlayHints(a,s,u),e));let i=(r=n.resolveInlayHint)===null||r===void 0?void 0:r.bind(n);i&&t.languages.inlayHint.resolve(async(o,a)=>{try{return await i(o,a)}catch(s){return na(s)}})}}Y.addInlayHintHandler=PS;function SS(t,e){let r={data:[]};t.languages.semanticTokens.on(ki((n,i,o,a)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,a):r,e)),t.languages.semanticTokens.onDelta(ki((n,i,o,a)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,a):r,e)),t.languages.semanticTokens.onRange(ki((n,i,o,a)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,a):r,e))}Y.addSemanticTokenHandler=SS;function CS(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}Y.addConfigurationChangeHandler=CS;function ES(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(a){return na(a)}})}Y.addExecuteCommandHandler=ES;function NS(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(ki((o,a,s,u)=>n.getDocumentLinks(a,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(o,a)=>{try{return await i(o,a)}catch(s){return na(s)}})}}Y.addDocumentLinkHandler=NS;function kS(t,e){t.onSignatureHelp(ki((r,n,i,o)=>{var a;return(a=r.lsp.SignatureHelp)===null||a===void 0?void 0:a.provideSignatureHelp(n,i,o)},e))}Y.addSignatureHelpHandler=kS;function wS(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(ki((o,a,s,u)=>n.provideCodeLens(a,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(o,a)=>{try{return await i(o,a)}catch(s){return na(s)}})}}Y.addCodeLensHandler=wS;function OS(t,e){t.languages.callHierarchy.onPrepare(ki((r,n,i,o)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&a!==void 0?a:null},e)),t.languages.callHierarchy.onIncomingCalls(pv((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(pv((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}Y.addCallHierarchyHandler=OS;function pv(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=lc.URI.parse(n.item.uri),a=r.getServices(o);if(!a){let s=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(s),new Error(s)}try{return await t(a,n,i)}catch(s){return na(s)}}}Y.createCallHierarchyRequestHandler=pv;function ki(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let a=lc.URI.parse(i.textDocument.uri),s=n.getServices(a);if(!s)throw console.error(`Could not find service instance for uri: '${a.toString()}'`),new Error;let u=r.getOrCreateDocument(a);if(!u)throw new Error;try{return await t(s,u,i,o)}catch(c){return na(c)}}}Y.createServerRequestHandler=ki;function Yt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let a=lc.URI.parse(i.textDocument.uri),s=n.getServices(a);if(!s)return console.error(`Could not find service instance for uri: '${a.toString()}'`),null;let u=r.getOrCreateDocument(a);if(!u)return null;try{return await t(s,u,i,o)}catch(c){return na(c)}}}Y.createRequestHandler=Yt;function na(t){if((0,qz.isOperationCancelled)(t))return new ra.ResponseError(ra.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof ra.ResponseError)return t;throw t}});var gv=d(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.DefaultReferencesProvider=void 0;var Uz=xe(),Gz=Le(),mv=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,Gz.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let a={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,a).forEach(s=>{i.push(Uz.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};cd.DefaultReferencesProvider=mv});var vv=d(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.DefaultRenameProvider=void 0;var Hz=xe(),Wz=ns(),DS=Le(),yv=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),a=(0,DS.findDeclarationNodeAtOffset)(i,o,this.grammarConfig.nameRegexp);if(!a)return;let s=this.references.findDeclaration(a);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(l=>{let f=Hz.TextEdit.replace(l.segment.range,r.newName),h=l.sourceUri.toString();n[h]?n[h].push(f):n[h]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=(0,DS.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return(e==null?void 0:e.element)&&(0,Wz.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};ld.DefaultRenameProvider=yv});var IS=d(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.AbstractTypeDefinitionProvider=void 0;var Bz=xe(),Kz=Le(),_v=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=Bz.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let o=(0,Kz.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(o){let a=this.references.findDeclaration(o);if(a)return this.collectGoToTypeLocationLinks(a,n)}}}};fd.AbstractTypeDefinitionProvider=_v});var Tv=d(Me=>{"use strict";var zz=Me&&Me.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pt=Me&&Me.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&zz(e,t,r)};Object.defineProperty(Me,"__esModule",{value:!0});pt(ed(),Me);pt(Ky(),Me);pt(Yy(),Me);pt(QP(),Me);pt(eS(),Me);pt(rS(),Me);pt(Qy(),Me);pt(ev(),Me);pt(iS(),Me);pt(rv(),Me);pt(oS(),Me);pt(Ff(),Me);pt(qy(),Me);pt(ov(),Me);pt(aS(),Me);pt(sS(),Me);pt(hv(),Me);pt(gv(),Me);pt(vv(),Me);pt(Bf(),Me);pt(fv(),Me);pt(IS(),Me)});var xS=d(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.LangiumGrammarDefinitionProvider=void 0;var Rv=xe(),Vz=Tv(),Xz=Re(),Yz=vt(),Jz=ke(),Qz=Ft(),bv=class extends Vz.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,a,s,u;let c="path";if((0,Jz.isGrammarImport)(e.element)&&((n=(0,Yz.findAssignment)(e))===null||n===void 0?void 0:n.feature)===c){let l=(0,Qz.resolveImport)(this.documents,e.element);if(l!=null&&l.$document){let f=(i=this.findTargetObject(l))!==null&&i!==void 0?i:l,h=(a=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&a!==void 0?a:Rv.Range.create(0,0,0,0),y=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:Rv.Range.create(0,0,0,0);return[Rv.LocationLink.create(l.$document.uri.toString(),y,h,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,Xz.streamContents)(e).head()}};dd.LangiumGrammarDefinitionProvider=bv});var LS=d(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.LangiumGrammarCallHierarchyProvider=void 0;var qS=xe(),Zz=Yy(),Av=Re(),e2=Le(),pd=ke(),Pv=class extends Zz.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,pd.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!a.$cstNode)return;let s=(0,e2.findLeafNodeAtOffset)(a.$cstNode,i.segment.offset);if(!s)return;let u=(0,Av.getContainerOfType)(s.element,pd.isParserRule);if(!u||!u.$cstNode)return;let c=this.nameProvider.getNameNode(u);if(!c)return;let l=i.sourceUri.toString(),f=l+"@"+c.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:c,targetNodes:[...n.get(f).targetNodes,s],docUri:l}):n.set(f,{parserRule:u.$cstNode,nameNode:c,targetNodes:[s],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:qS.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!(0,pd.isParserRule)(e))return;let r=(0,Av.streamAllContents)(e).filter(pd.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var o;let a=i.$cstNode;if(!a)return;let s=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let c=(0,Av.getDocument)(s.element).uri.toString(),l=c+"@"+u.text;n.has(l)?n.set(l,{refCstNode:s,to:u,from:[...n.get(l).from,a.range],docUri:c}):n.set(l,{refCstNode:s,to:u,from:[a.range],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:qS.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};hd.LangiumGrammarCallHierarchyProvider=Pv});var FS=d(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.LangiumGrammarValidationResourcesCollector=void 0;var t2=Tn(),$S=$t(),md=ke(),MS=Ft(),gd=ts(),r2=ay(),Sv=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,r2.collectValidationAst)(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=n2(e);for(let s of(0,gd.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:o.get(s.name)});let a=(0,$S.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,gd.mergeTypesAndInterfaces)(n)){let u=a.get(s.name);if(u){let c=i.get(s.name);i.set(s.name,Object.assign(Object.assign({},c!=null?c:{}),{declared:s,declaredNode:u}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=(0,gd.mergeInterfaces)(e,r),o=new Map(i.map(a=>[a.name,a]));for(let a of(0,gd.mergeInterfaces)(e,r))n.set(a.name,this.addSuperProperties(a,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let a=r.get(o.name);a&&i.push(...this.addSuperProperties(a,r,n))}return i}};yd.LangiumGrammarValidationResourcesCollector=Sv;function n2({parserRules:t,datatypeRules:e}){let r=new t2.MultiMap;(0,$S.stream)(t).concat(e).forEach(i=>r.add((0,MS.getRuleType)(i),i));function n(i){if((0,md.isAction)(i)){let o=(0,MS.getActionType)(i);o&&r.add(o,i)}((0,md.isAlternatives)(i)||(0,md.isGroup)(i)||(0,md.isUnorderedGroup)(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}});var jS=d(po=>{"use strict";Object.defineProperty(po,"__esModule",{value:!0});po.isInferredAndDeclared=po.isInferred=po.isDeclared=void 0;function i2(t){return t&&"declared"in t}po.isDeclared=i2;function o2(t){return t&&"inferred"in t}po.isInferred=o2;function a2(t){return t&&"inferred"in t&&"declared"in t}po.isInferredAndDeclared=a2});var US=d(Qr=>{"use strict";var s2=Qr&&Qr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),u2=Qr&&Qr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),c2=Qr&&Qr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&s2(e,t,r);return u2(e,t),e};Object.defineProperty(Qr,"__esModule",{value:!0});Qr.LangiumGrammarTypesValidator=Qr.registerTypeValidationChecks=void 0;var gs=c2(ke()),l2=Tn(),f2=Ft(),Et=es(),Cv=jS();function d2(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}Qr.registerTypeValidationChecks=d2;var Ev=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if((0,Cv.isDeclared)(o)&&(0,Et.isInterfaceType)(o.declared)&&gs.isInterface(o.declaredNode)){let a=o;h2(a,r),m2(a,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())(0,Cv.isInferred)(o)&&o.inferred instanceof Et.InterfaceType&&p2(o.inferred,r),(0,Cv.isInferredAndDeclared)(o)&&v2(o,r)}checkActionIsNotUnionType(e,r){gs.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};Qr.LangiumGrammarTypesValidator=Ev;function p2(t,e){t.properties.forEach(r=>{var n;let i=(0,Et.flattenPropertyUnion)(r.type);if(i.length>1){let o=s=>(0,Et.isReferenceType)(s)?"ref":"other",a=o(i[0]);if(i.slice(1).some(s=>o(s)!==a)){let s=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;s&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:s})}}})}function h2({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&((0,Et.isUnionType)(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function m2({declared:t,declaredNode:e},r){let n=t.properties.reduce((a,s)=>a.add(s.name,s),new l2.MultiMap);for(let[a,s]of n.entriesGroupedByKey())if(s.length>1)for(let u of s)r("error",`Cannot have two properties with the same name '${a}'.`,{node:Array.from(u.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let a=0;a<i.length;a++)for(let s=a+1;s<i.length;s++){let u=i[a],c=i[s],l=(0,Et.isInterfaceType)(u)?u.superProperties:[],f=(0,Et.isInterfaceType)(c)?c.superProperties:[],h=g2(l,f);h.length>0&&r("error",`Cannot simultaneously inherit from '${u}' and '${c}'. Their ${h.map(y=>"'"+y+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let a of i){let s=(0,Et.isInterfaceType)(a)?a.superProperties:[];for(let u of s)o.add(u.name)}for(let a of t.properties)if(o.has(a.name)){let s=e.attributes.find(u=>u.name===a.name);s&&r("error",`Cannot redeclare property '${a.name}'. It is already inherited from another interface.`,{node:s,property:"name"})}}function g2(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!y2(n,i)&&r.push(n.name)}return r}function y2(t,e){return(0,Et.isTypeAssignable)(t.type,e.type)&&(0,Et.isTypeAssignable)(e.type,t.type)}function v2(t,e){let{inferred:r,declared:n,declaredNode:i,inferredNodes:o}=t,a=n.name,s=l=>f=>o.forEach(h=>e("error",`${f}${l?` ${l}`:""}.`,h!=null&&h.inferredType?{node:h==null?void 0:h.inferredType,property:"name"}:{node:h,property:gs.isAction(h)?"type":"name"})),u=(l,f)=>l.forEach(h=>e("error",f,{node:h,property:gs.isAssignment(h)||gs.isAction(h)?"feature":"name"})),c=l=>{o.forEach(f=>{gs.isParserRule(f)&&(0,f2.extractAssignments)(f.definition).find(y=>y.feature===l)===void 0&&e("error",`Property '${l}' is missing in a rule '${f.name}', but is required in type '${a}'.`,{node:f,property:"parameters"})})};if((0,Et.isUnionType)(r)&&(0,Et.isUnionType)(n))_2(r.type,n.type,s(`in a rule that returns type '${a}'`));else if((0,Et.isInterfaceType)(r)&&(0,Et.isInterfaceType)(n))T2(r,n,s(`in a rule that returns type '${a}'`),u,c);else{let l=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;s()(l),e("error",l,{node:i,property:"name"})}}function _2(t,e,r){(0,Et.isTypeAssignable)(t,e)||r(`Cannot assign type '${(0,Et.propertyTypeToString)(t,"DeclaredType")}' to '${(0,Et.propertyTypeToString)(e,"DeclaredType")}'`)}function T2(t,e,r,n,i){let o=new Set(t.properties.map(c=>c.name)),a=new Map(t.allProperties.map(c=>[c.name,c])),s=new Map(e.superProperties.map(c=>[c.name,c]));for(let[c,l]of a.entries()){let f=s.get(c);if(f){let h=(0,Et.propertyTypeToString)(l.type,"DeclaredType"),y=(0,Et.propertyTypeToString)(f.type,"DeclaredType");if(!(0,Et.isTypeAssignable)(l.type,f.type)){let R=`The assigned type '${h}' is not compatible with the declared property '${c}' of type '${y}'.`;n(l.astNodes,R)}!f.optional&&l.optional&&i(c)}else o.has(c)&&n(l.astNodes,`A property '${c}' is not expected.`)}let u=new Set;for(let[c,l]of s.entries())!a.get(c)&&!l.optional&&u.add(c);if(u.size>0){let c=u.size>1?"Properties":"A property",l=u.size>1?"are expected":"is expected",f=Array.from(u).map(h=>`'${h}'`).sort().join(", ");r(`${c} ${f} ${l}.`)}}});var Nv=d(ia=>{"use strict";Object.defineProperty(ia,"__esModule",{value:!0});ia.createLangiumGrammarServices=ia.LangiumGrammarModule=void 0;var GS=vd(),HS=Vu(),WS=cy(),BS=TP(),KS=Cy(),R2=NP(),b2=kP(),A2=OP(),P2=DP(),S2=xP(),C2=UP(),E2=xS(),N2=LS(),k2=FS(),zS=US(),w2=br(),O2=fo();ia.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new KS.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new k2.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new zS.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new b2.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new R2.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new P2.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new A2.LangiumGrammarFormatter,DefinitionProvider:t=>new E2.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new N2.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new BS.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new BS.LangiumGrammarScopeProvider(t),References:t=>new C2.LangiumGrammarReferences(t),NameProvider:()=>new S2.LangiumGrammarNameProvider}};function D2(t,e){let r=(0,HS.inject)((0,GS.createDefaultSharedModule)(t),WS.LangiumGrammarGeneratedSharedModule,e),n=(0,HS.inject)((0,GS.createDefaultModule)({shared:r}),WS.LangiumGrammarGeneratedModule,ia.LangiumGrammarModule);return I2(r,n),r.ServiceRegistry.register(n),(0,KS.registerValidationChecks)(n),(0,zS.registerTypeValidationChecks)(n),{shared:r,grammar:n}}ia.createLangiumGrammarServices=D2;function I2(t,e){t.workspace.DocumentBuilder.onBuildPhase(O2.DocumentState.IndexedReferences,async(n,i)=>{for(let o of n){await(0,w2.interruptAndCheck)(i);let a=e.validation.ValidationResourcesCollector,s=o.parseResult.value;o.validationResources=a.collectValidationResources(s)}})}});var kv=d(ys=>{"use strict";Object.defineProperty(ys,"__esModule",{value:!0});ys.EmptyFileSystem=ys.EmptyFileSystemProvider=void 0;var _d=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};ys.EmptyFileSystemProvider=_d;ys.EmptyFileSystem={fileSystemProvider:()=>new _d}});var vt=d(de=>{"use strict";var x2=de&&de.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),q2=de&&de.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),L2=de&&de.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&x2(e,t,r);return q2(e,t),e};Object.defineProperty(de,"__esModule",{value:!0});de.createServicesForGrammar=de.loadGrammarFromJson=de.findNameAssignment=de.findAssignment=de.findNodesForKeywordInternal=de.findNodeForKeyword=de.findNodesForKeyword=de.findNodeForProperty=de.findNodesForProperty=de.isCommentTerminal=de.getCrossReferenceTerminal=de.getAllReachableRules=de.getHiddenRules=de.getEntryRule=void 0;var YS=Wr(),VS=vd(),XS=Vu(),M2=uy(),mr=L2(ke()),$2=Ft(),JS=Nv(),F2=tr(),vs=Re(),j2=Le(),wv=kv();function QS(t){return t.rules.find(e=>mr.isParserRule(e)&&e.entry)}de.getEntryRule=QS;function ZS(t){return t.rules.filter(e=>mr.isTerminalRule(e)&&e.hidden)}de.getHiddenRules=ZS;function U2(t,e){let r=new Set,n=QS(t);if(!n)return new Set(t.rules);let i=[n].concat(ZS(t));for(let a of i)eC(a,r,e);let o=new Set;for(let a of t.rules)(r.has(a.name)||mr.isTerminalRule(a)&&a.hidden)&&o.add(a);return o}de.getAllReachableRules=U2;function eC(t,e,r){e.add(t.name),(0,vs.streamAllContents)(t).forEach(n=>{if(mr.isRuleCall(n)||r&&mr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&eC(i,e,r)}})}function G2(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=tC(t.type.ref);return e==null?void 0:e.terminal}}de.getCrossReferenceTerminal=G2;function H2(t){return t.hidden&&!" ".match((0,$2.terminalRegex)(t))}de.isCommentTerminal=H2;function W2(t,e){return!t||!e?[]:Ov(t,e,t.element,!0)}de.findNodesForProperty=W2;function B2(t,e,r){if(!t||!e)return;let n=Ov(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}de.findNodeForProperty=B2;function Ov(t,e,r,n){if(!n){let i=(0,vs.getContainerOfType)(t.feature,mr.isAssignment);if(i&&i.feature===e)return[t]}return(0,F2.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>Ov(i,e,r,!1)):[]}function K2(t,e){return t?Dv(t,e,t==null?void 0:t.element):[]}de.findNodesForKeyword=K2;function z2(t,e,r){if(!t)return;let n=Dv(t,e,t==null?void 0:t.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}de.findNodeForKeyword=z2;function Dv(t,e,r){if(t.element!==r)return[];if(mr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,j2.streamCst)(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let a=i.value;a.element===r?mr.isKeyword(a.feature)&&a.feature.value===e&&o.push(a):n.prune()}while(!i.done);return o}de.findNodesForKeywordInternal=Dv;function V2(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,vs.getContainerOfType)(t.feature,mr.isAssignment);if(n)return n;t=t.parent}}de.findAssignment=V2;function tC(t){return mr.isInferredType(t)&&(t=t.$container),rC(t,new Map)}de.findNameAssignment=tC;function rC(t,e){var r;function n(i,o){let a;return(0,vs.getContainerOfType)(i,mr.isAssignment)||(a=rC(o,e)),e.set(t,a),a}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,vs.streamAllContents)(t)){if(mr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(mr.isRuleCall(i)&&mr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(mr.isSimpleType(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function X2(t){var e;let r=(0,JS.createLangiumGrammarServices)(wv.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,YS.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}de.loadGrammarFromJson=X2;async function Y2(t){var e,r,n,i,o,a;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,JS.createLangiumGrammarServices)(wv.EmptyFileSystem).grammar,u=YS.URI.parse("memory:///grammar.langium"),c=s.shared.workspace.LangiumDocumentFactory,l=typeof t.grammar=="string"?c.fromString(t.grammar,u):(0,vs.getDocument)(t.grammar),f=l.parseResult.value;await s.shared.workspace.DocumentBuilder.build([l],{validationChecks:"none"});let y=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},m=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(o=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&o!==void 0?o:"unknown"}`],languageId:(a=f.name)!==null&&a!==void 0?a:"UNKNOWN"},R={AstReflection:()=>(0,M2.interpretAstReflection)(f)},E={Grammar:()=>f,LanguageMetaData:()=>m,parser:{ParserConfig:()=>y}},S=(0,XS.inject)((0,VS.createDefaultSharedModule)(wv.EmptyFileSystem),R,t.sharedModule),A=(0,XS.inject)((0,VS.createDefaultModule)({shared:S}),E,t.module);return S.ServiceRegistry.register(A),A}de.createServicesForGrammar=Y2});var Iv=d(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.createGrammarConfig=void 0;var J2=Le(),Q2=vt(),Z2=Zo(),eV=ke(),tV=Ft();function rV(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,eV.isTerminalRule)(n)&&(0,Q2.isCommentTerminal)(n)&&(0,Z2.isMultilineComment)((0,tV.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:J2.DefaultNameRegexp}}Td.createGrammarConfig=rV});var xv=d(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.VERSION=void 0;Rd.VERSION="10.4.2"});var _s=d((phe,nC)=>{var nV=Object.prototype;function iV(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||nV;return t===r}nC.exports=iV});var qv=d((hhe,iC)=>{function oV(t,e){return function(r){return t(e(r))}}iC.exports=oV});var aC=d((mhe,oC)=>{var aV=qv(),sV=aV(Object.keys,Object);oC.exports=sV});var Lv=d((ghe,sC)=>{var uV=_s(),cV=aC(),lV=Object.prototype,fV=lV.hasOwnProperty;function dV(t){if(!uV(t))return cV(t);var e=[];for(var r in Object(t))fV.call(t,r)&&r!="constructor"&&e.push(r);return e}sC.exports=dV});var Mv=d((yhe,uC)=>{var pV=typeof global=="object"&&global&&global.Object===Object&&global;uC.exports=pV});var An=d((vhe,cC)=>{var hV=Mv(),mV=typeof self=="object"&&self&&self.Object===Object&&self,gV=hV||mV||Function("return this")();cC.exports=gV});var oa=d((_he,lC)=>{var yV=An(),vV=yV.Symbol;lC.exports=vV});var hC=d((The,pC)=>{var fC=oa(),dC=Object.prototype,_V=dC.hasOwnProperty,TV=dC.toString,fc=fC?fC.toStringTag:void 0;function RV(t){var e=_V.call(t,fc),r=t[fc];try{t[fc]=void 0;var n=!0}catch{}var i=TV.call(t);return n&&(e?t[fc]=r:delete t[fc]),i}pC.exports=RV});var gC=d((Rhe,mC)=>{var bV=Object.prototype,AV=bV.toString;function PV(t){return AV.call(t)}mC.exports=PV});var ho=d((bhe,_C)=>{var yC=oa(),SV=hC(),CV=gC(),EV="[object Null]",NV="[object Undefined]",vC=yC?yC.toStringTag:void 0;function kV(t){return t==null?t===void 0?NV:EV:vC&&vC in Object(t)?SV(t):CV(t)}_C.exports=kV});var Pn=d((Ahe,TC)=>{function wV(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}TC.exports=wV});var Ts=d((Phe,RC)=>{var OV=ho(),DV=Pn(),IV="[object AsyncFunction]",xV="[object Function]",qV="[object GeneratorFunction]",LV="[object Proxy]";function MV(t){if(!DV(t))return!1;var e=OV(t);return e==xV||e==qV||e==IV||e==LV}RC.exports=MV});var AC=d((She,bC)=>{var $V=An(),FV=$V["__core-js_shared__"];bC.exports=FV});var CC=d((Che,SC)=>{var $v=AC(),PC=function(){var t=/[^.]+$/.exec($v&&$v.keys&&$v.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function jV(t){return!!PC&&PC in t}SC.exports=jV});var Fv=d((Ehe,EC)=>{var UV=Function.prototype,GV=UV.toString;function HV(t){if(t!=null){try{return GV.call(t)}catch{}try{return t+""}catch{}}return""}EC.exports=HV});var kC=d((Nhe,NC)=>{var WV=Ts(),BV=CC(),KV=Pn(),zV=Fv(),VV=/[\\^$.*+?()[\]{}|]/g,XV=/^\[object .+?Constructor\]$/,YV=Function.prototype,JV=Object.prototype,QV=YV.toString,ZV=JV.hasOwnProperty,e3=RegExp("^"+QV.call(ZV).replace(VV,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function t3(t){if(!KV(t)||BV(t))return!1;var e=WV(t)?e3:XV;return e.test(zV(t))}NC.exports=t3});var OC=d((khe,wC)=>{function r3(t,e){return t?.[e]}wC.exports=r3});var mo=d((whe,DC)=>{var n3=kC(),i3=OC();function o3(t,e){var r=i3(t,e);return n3(r)?r:void 0}DC.exports=o3});var xC=d((Ohe,IC)=>{var a3=mo(),s3=An(),u3=a3(s3,"DataView");IC.exports=u3});var bd=d((Dhe,qC)=>{var c3=mo(),l3=An(),f3=c3(l3,"Map");qC.exports=f3});var MC=d((Ihe,LC)=>{var d3=mo(),p3=An(),h3=d3(p3,"Promise");LC.exports=h3});var jv=d((xhe,$C)=>{var m3=mo(),g3=An(),y3=m3(g3,"Set");$C.exports=y3});var jC=d((qhe,FC)=>{var v3=mo(),_3=An(),T3=v3(_3,"WeakMap");FC.exports=T3});var bs=d((Lhe,zC)=>{var Uv=xC(),Gv=bd(),Hv=MC(),Wv=jv(),Bv=jC(),KC=ho(),Rs=Fv(),UC="[object Map]",R3="[object Object]",GC="[object Promise]",HC="[object Set]",WC="[object WeakMap]",BC="[object DataView]",b3=Rs(Uv),A3=Rs(Gv),P3=Rs(Hv),S3=Rs(Wv),C3=Rs(Bv),aa=KC;(Uv&&aa(new Uv(new ArrayBuffer(1)))!=BC||Gv&&aa(new Gv)!=UC||Hv&&aa(Hv.resolve())!=GC||Wv&&aa(new Wv)!=HC||Bv&&aa(new Bv)!=WC)&&(aa=function(t){var e=KC(t),r=e==R3?t.constructor:void 0,n=r?Rs(r):"";if(n)switch(n){case b3:return BC;case A3:return UC;case P3:return GC;case S3:return HC;case C3:return WC}return e});zC.exports=aa});var Sn=d((Mhe,VC)=>{function E3(t){return t!=null&&typeof t=="object"}VC.exports=E3});var YC=d(($he,XC)=>{var N3=ho(),k3=Sn(),w3="[object Arguments]";function O3(t){return k3(t)&&N3(t)==w3}XC.exports=O3});var dc=d((Fhe,ZC)=>{var JC=YC(),D3=Sn(),QC=Object.prototype,I3=QC.hasOwnProperty,x3=QC.propertyIsEnumerable,q3=JC(function(){return arguments}())?JC:function(t){return D3(t)&&I3.call(t,"callee")&&!x3.call(t,"callee")};ZC.exports=q3});var qe=d((jhe,eE)=>{var L3=Array.isArray;eE.exports=L3});var Ad=d((Uhe,tE)=>{var M3=9007199254740991;function $3(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=M3}tE.exports=$3});var Cn=d((Ghe,rE)=>{var F3=Ts(),j3=Ad();function U3(t){return t!=null&&j3(t.length)&&!F3(t)}rE.exports=U3});var iE=d((Hhe,nE)=>{function G3(){return!1}nE.exports=G3});var hc=d((pc,As)=>{var H3=An(),W3=iE(),sE=typeof pc=="object"&&pc&&!pc.nodeType&&pc,oE=sE&&typeof As=="object"&&As&&!As.nodeType&&As,B3=oE&&oE.exports===sE,aE=B3?H3.Buffer:void 0,K3=aE?aE.isBuffer:void 0,z3=K3||W3;As.exports=z3});var cE=d((Whe,uE)=>{var V3=ho(),X3=Ad(),Y3=Sn(),J3="[object Arguments]",Q3="[object Array]",Z3="[object Boolean]",e4="[object Date]",t4="[object Error]",r4="[object Function]",n4="[object Map]",i4="[object Number]",o4="[object Object]",a4="[object RegExp]",s4="[object Set]",u4="[object String]",c4="[object WeakMap]",l4="[object ArrayBuffer]",f4="[object DataView]",d4="[object Float32Array]",p4="[object Float64Array]",h4="[object Int8Array]",m4="[object Int16Array]",g4="[object Int32Array]",y4="[object Uint8Array]",v4="[object Uint8ClampedArray]",_4="[object Uint16Array]",T4="[object Uint32Array]",Qe={};Qe[d4]=Qe[p4]=Qe[h4]=Qe[m4]=Qe[g4]=Qe[y4]=Qe[v4]=Qe[_4]=Qe[T4]=!0;Qe[J3]=Qe[Q3]=Qe[l4]=Qe[Z3]=Qe[f4]=Qe[e4]=Qe[t4]=Qe[r4]=Qe[n4]=Qe[i4]=Qe[o4]=Qe[a4]=Qe[s4]=Qe[u4]=Qe[c4]=!1;function R4(t){return Y3(t)&&X3(t.length)&&!!Qe[V3(t)]}uE.exports=R4});var Ps=d((Bhe,lE)=>{function b4(t){return function(e){return t(e)}}lE.exports=b4});var yc=d((mc,Ss)=>{var A4=Mv(),fE=typeof mc=="object"&&mc&&!mc.nodeType&&mc,gc=fE&&typeof Ss=="object"&&Ss&&!Ss.nodeType&&Ss,P4=gc&&gc.exports===fE,Kv=P4&&A4.process,S4=function(){try{var t=gc&&gc.require&&gc.require("util").types;return t||Kv&&Kv.binding&&Kv.binding("util")}catch{}}();Ss.exports=S4});var Pd=d((Khe,hE)=>{var C4=cE(),E4=Ps(),dE=yc(),pE=dE&&dE.isTypedArray,N4=pE?E4(pE):C4;hE.exports=N4});var Ir=d((zhe,mE)=>{var k4=Lv(),w4=bs(),O4=dc(),D4=qe(),I4=Cn(),x4=hc(),q4=_s(),L4=Pd(),M4="[object Map]",$4="[object Set]",F4=Object.prototype,j4=F4.hasOwnProperty;function U4(t){if(t==null)return!0;if(I4(t)&&(D4(t)||typeof t=="string"||typeof t.splice=="function"||x4(t)||L4(t)||O4(t)))return!t.length;var e=w4(t);if(e==M4||e==$4)return!t.size;if(q4(t))return!k4(t).length;for(var r in t)if(j4.call(t,r))return!1;return!0}mE.exports=U4});var Cs=d((Vhe,gE)=>{function G4(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}gE.exports=G4});var vE=d((Xhe,yE)=>{function H4(){this.__data__=[],this.size=0}yE.exports=H4});var Es=d((Yhe,_E)=>{function W4(t,e){return t===e||t!==t&&e!==e}_E.exports=W4});var vc=d((Jhe,TE)=>{var B4=Es();function K4(t,e){for(var r=t.length;r--;)if(B4(t[r][0],e))return r;return-1}TE.exports=K4});var bE=d((Qhe,RE)=>{var z4=vc(),V4=Array.prototype,X4=V4.splice;function Y4(t){var e=this.__data__,r=z4(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():X4.call(e,r,1),--this.size,!0}RE.exports=Y4});var PE=d((Zhe,AE)=>{var J4=vc();function Q4(t){var e=this.__data__,r=J4(e,t);return r<0?void 0:e[r][1]}AE.exports=Q4});var CE=d((eme,SE)=>{var Z4=vc();function e6(t){return Z4(this.__data__,t)>-1}SE.exports=e6});var NE=d((tme,EE)=>{var t6=vc();function r6(t,e){var r=this.__data__,n=t6(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}EE.exports=r6});var _c=d((rme,kE)=>{var n6=vE(),i6=bE(),o6=PE(),a6=CE(),s6=NE();function Ns(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ns.prototype.clear=n6;Ns.prototype.delete=i6;Ns.prototype.get=o6;Ns.prototype.has=a6;Ns.prototype.set=s6;kE.exports=Ns});var OE=d((nme,wE)=>{var u6=_c();function c6(){this.__data__=new u6,this.size=0}wE.exports=c6});var IE=d((ime,DE)=>{function l6(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}DE.exports=l6});var qE=d((ome,xE)=>{function f6(t){return this.__data__.get(t)}xE.exports=f6});var ME=d((ame,LE)=>{function d6(t){return this.__data__.has(t)}LE.exports=d6});var Tc=d((sme,$E)=>{var p6=mo(),h6=p6(Object,"create");$E.exports=h6});var UE=d((ume,jE)=>{var FE=Tc();function m6(){this.__data__=FE?FE(null):{},this.size=0}jE.exports=m6});var HE=d((cme,GE)=>{function g6(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}GE.exports=g6});var BE=d((lme,WE)=>{var y6=Tc(),v6="__lodash_hash_undefined__",_6=Object.prototype,T6=_6.hasOwnProperty;function R6(t){var e=this.__data__;if(y6){var r=e[t];return r===v6?void 0:r}return T6.call(e,t)?e[t]:void 0}WE.exports=R6});var zE=d((fme,KE)=>{var b6=Tc(),A6=Object.prototype,P6=A6.hasOwnProperty;function S6(t){var e=this.__data__;return b6?e[t]!==void 0:P6.call(e,t)}KE.exports=S6});var XE=d((dme,VE)=>{var C6=Tc(),E6="__lodash_hash_undefined__";function N6(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=C6&&e===void 0?E6:e,this}VE.exports=N6});var JE=d((pme,YE)=>{var k6=UE(),w6=HE(),O6=BE(),D6=zE(),I6=XE();function ks(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}ks.prototype.clear=k6;ks.prototype.delete=w6;ks.prototype.get=O6;ks.prototype.has=D6;ks.prototype.set=I6;YE.exports=ks});var eN=d((hme,ZE)=>{var QE=JE(),x6=_c(),q6=bd();function L6(){this.size=0,this.__data__={hash:new QE,map:new(q6||x6),string:new QE}}ZE.exports=L6});var rN=d((mme,tN)=>{function M6(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}tN.exports=M6});var Rc=d((gme,nN)=>{var $6=rN();function F6(t,e){var r=t.__data__;return $6(e)?r[typeof e=="string"?"string":"hash"]:r.map}nN.exports=F6});var oN=d((yme,iN)=>{var j6=Rc();function U6(t){var e=j6(this,t).delete(t);return this.size-=e?1:0,e}iN.exports=U6});var sN=d((vme,aN)=>{var G6=Rc();function H6(t){return G6(this,t).get(t)}aN.exports=H6});var cN=d((_me,uN)=>{var W6=Rc();function B6(t){return W6(this,t).has(t)}uN.exports=B6});var fN=d((Tme,lN)=>{var K6=Rc();function z6(t,e){var r=K6(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}lN.exports=z6});var Sd=d((Rme,dN)=>{var V6=eN(),X6=oN(),Y6=sN(),J6=cN(),Q6=fN();function ws(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}ws.prototype.clear=V6;ws.prototype.delete=X6;ws.prototype.get=Y6;ws.prototype.has=J6;ws.prototype.set=Q6;dN.exports=ws});var hN=d((bme,pN)=>{var Z6=_c(),e9=bd(),t9=Sd(),r9=200;function n9(t,e){var r=this.__data__;if(r instanceof Z6){var n=r.__data__;if(!e9||n.length<r9-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new t9(n)}return r.set(t,e),this.size=r.size,this}pN.exports=n9});var Cd=d((Ame,mN)=>{var i9=_c(),o9=OE(),a9=IE(),s9=qE(),u9=ME(),c9=hN();function Os(t){var e=this.__data__=new i9(t);this.size=e.size}Os.prototype.clear=o9;Os.prototype.delete=a9;Os.prototype.get=s9;Os.prototype.has=u9;Os.prototype.set=c9;mN.exports=Os});var yN=d((Pme,gN)=>{var l9="__lodash_hash_undefined__";function f9(t){return this.__data__.set(t,l9),this}gN.exports=f9});var _N=d((Sme,vN)=>{function d9(t){return this.__data__.has(t)}vN.exports=d9});var Nd=d((Cme,TN)=>{var p9=Sd(),h9=yN(),m9=_N();function Ed(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new p9;++e<r;)this.add(t[e])}Ed.prototype.add=Ed.prototype.push=h9;Ed.prototype.has=m9;TN.exports=Ed});var zv=d((Eme,RN)=>{function g9(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}RN.exports=g9});var kd=d((Nme,bN)=>{function y9(t,e){return t.has(e)}bN.exports=y9});var Vv=d((kme,AN)=>{var v9=Nd(),_9=zv(),T9=kd(),R9=1,b9=2;function A9(t,e,r,n,i,o){var a=r&R9,s=t.length,u=e.length;if(s!=u&&!(a&&u>s))return!1;var c=o.get(t),l=o.get(e);if(c&&l)return c==e&&l==t;var f=-1,h=!0,y=r&b9?new v9:void 0;for(o.set(t,e),o.set(e,t);++f<s;){var m=t[f],R=e[f];if(n)var E=a?n(R,m,f,e,t,o):n(m,R,f,t,e,o);if(E!==void 0){if(E)continue;h=!1;break}if(y){if(!_9(e,function(S,A){if(!T9(y,A)&&(m===S||i(m,S,r,n,o)))return y.push(A)})){h=!1;break}}else if(!(m===R||i(m,R,r,n,o))){h=!1;break}}return o.delete(t),o.delete(e),h}AN.exports=A9});var Xv=d((wme,PN)=>{var P9=An(),S9=P9.Uint8Array;PN.exports=S9});var CN=d((Ome,SN)=>{function C9(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}SN.exports=C9});var wd=d((Dme,EN)=>{function E9(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}EN.exports=E9});var DN=d((Ime,ON)=>{var NN=oa(),kN=Xv(),N9=Es(),k9=Vv(),w9=CN(),O9=wd(),D9=1,I9=2,x9="[object Boolean]",q9="[object Date]",L9="[object Error]",M9="[object Map]",$9="[object Number]",F9="[object RegExp]",j9="[object Set]",U9="[object String]",G9="[object Symbol]",H9="[object ArrayBuffer]",W9="[object DataView]",wN=NN?NN.prototype:void 0,Yv=wN?wN.valueOf:void 0;function B9(t,e,r,n,i,o,a){switch(r){case W9:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case H9:return!(t.byteLength!=e.byteLength||!o(new kN(t),new kN(e)));case x9:case q9:case $9:return N9(+t,+e);case L9:return t.name==e.name&&t.message==e.message;case F9:case U9:return t==e+"";case M9:var s=w9;case j9:var u=n&D9;if(s||(s=O9),t.size!=e.size&&!u)return!1;var c=a.get(t);if(c)return c==e;n|=I9,a.set(t,e);var l=k9(s(t),s(e),n,i,o,a);return a.delete(t),l;case G9:if(Yv)return Yv.call(t)==Yv.call(e)}return!1}ON.exports=B9});var Od=d((xme,IN)=>{function K9(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}IN.exports=K9});var Jv=d((qme,xN)=>{var z9=Od(),V9=qe();function X9(t,e,r){var n=e(t);return V9(t)?n:z9(n,r(t))}xN.exports=X9});var Dd=d((Lme,qN)=>{function Y9(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var a=t[r];e(a,r,t)&&(o[i++]=a)}return o}qN.exports=Y9});var Qv=d((Mme,LN)=>{function J9(){return[]}LN.exports=J9});var Id=d(($me,$N)=>{var Q9=Dd(),Z9=Qv(),e8=Object.prototype,t8=e8.propertyIsEnumerable,MN=Object.getOwnPropertySymbols,r8=MN?function(t){return t==null?[]:(t=Object(t),Q9(MN(t),function(e){return t8.call(t,e)}))}:Z9;$N.exports=r8});var jN=d((Fme,FN)=>{function n8(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}FN.exports=n8});var bc=d((jme,UN)=>{var i8=9007199254740991,o8=/^(?:0|[1-9]\d*)$/;function a8(t,e){var r=typeof t;return e=e??i8,!!e&&(r=="number"||r!="symbol"&&o8.test(t))&&t>-1&&t%1==0&&t<e}UN.exports=a8});var Zv=d((Ume,GN)=>{var s8=jN(),u8=dc(),c8=qe(),l8=hc(),f8=bc(),d8=Pd(),p8=Object.prototype,h8=p8.hasOwnProperty;function m8(t,e){var r=c8(t),n=!r&&u8(t),i=!r&&!n&&l8(t),o=!r&&!n&&!i&&d8(t),a=r||n||i||o,s=a?s8(t.length,String):[],u=s.length;for(var c in t)(e||h8.call(t,c))&&!(a&&(c=="length"||i&&(c=="offset"||c=="parent")||o&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||f8(c,u)))&&s.push(c);return s}GN.exports=m8});var xr=d((Gme,HN)=>{var g8=Zv(),y8=Lv(),v8=Cn();function _8(t){return v8(t)?g8(t):y8(t)}HN.exports=_8});var e_=d((Hme,WN)=>{var T8=Jv(),R8=Id(),b8=xr();function A8(t){return T8(t,b8,R8)}WN.exports=A8});var zN=d((Wme,KN)=>{var BN=e_(),P8=1,S8=Object.prototype,C8=S8.hasOwnProperty;function E8(t,e,r,n,i,o){var a=r&P8,s=BN(t),u=s.length,c=BN(e),l=c.length;if(u!=l&&!a)return!1;for(var f=u;f--;){var h=s[f];if(!(a?h in e:C8.call(e,h)))return!1}var y=o.get(t),m=o.get(e);if(y&&m)return y==e&&m==t;var R=!0;o.set(t,e),o.set(e,t);for(var E=a;++f<u;){h=s[f];var S=t[h],A=e[h];if(n)var b=a?n(A,S,h,e,t,o):n(S,A,h,t,e,o);if(!(b===void 0?S===A||i(S,A,r,n,o):b)){R=!1;break}E||(E=h=="constructor")}if(R&&!E){var O=t.constructor,$=e.constructor;O!=$&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof $=="function"&&$ instanceof $)&&(R=!1)}return o.delete(t),o.delete(e),R}KN.exports=E8});var tk=d((Bme,ek)=>{var t_=Cd(),N8=Vv(),k8=DN(),w8=zN(),VN=bs(),XN=qe(),YN=hc(),O8=Pd(),D8=1,JN="[object Arguments]",QN="[object Array]",xd="[object Object]",I8=Object.prototype,ZN=I8.hasOwnProperty;function x8(t,e,r,n,i,o){var a=XN(t),s=XN(e),u=a?QN:VN(t),c=s?QN:VN(e);u=u==JN?xd:u,c=c==JN?xd:c;var l=u==xd,f=c==xd,h=u==c;if(h&&YN(t)){if(!YN(e))return!1;a=!0,l=!1}if(h&&!l)return o||(o=new t_),a||O8(t)?N8(t,e,r,n,i,o):k8(t,e,u,r,n,i,o);if(!(r&D8)){var y=l&&ZN.call(t,"__wrapped__"),m=f&&ZN.call(e,"__wrapped__");if(y||m){var R=y?t.value():t,E=m?e.value():e;return o||(o=new t_),i(R,E,r,n,o)}}return h?(o||(o=new t_),w8(t,e,r,n,i,o)):!1}ek.exports=x8});var r_=d((Kme,ik)=>{var q8=tk(),rk=Sn();function nk(t,e,r,n,i){return t===e?!0:t==null||e==null||!rk(t)&&!rk(e)?t!==t&&e!==e:q8(t,e,r,n,nk,i)}ik.exports=nk});var ak=d((zme,ok)=>{var L8=Cd(),M8=r_(),$8=1,F8=2;function j8(t,e,r,n){var i=r.length,o=i,a=!n;if(t==null)return!o;for(t=Object(t);i--;){var s=r[i];if(a&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<o;){s=r[i];var u=s[0],c=t[u],l=s[1];if(a&&s[2]){if(c===void 0&&!(u in t))return!1}else{var f=new L8;if(n)var h=n(c,l,u,t,e,f);if(!(h===void 0?M8(l,c,$8|F8,n,f):h))return!1}}return!0}ok.exports=j8});var n_=d((Vme,sk)=>{var U8=Pn();function G8(t){return t===t&&!U8(t)}sk.exports=G8});var ck=d((Xme,uk)=>{var H8=n_(),W8=xr();function B8(t){for(var e=W8(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,H8(i)]}return e}uk.exports=B8});var i_=d((Yme,lk)=>{function K8(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}lk.exports=K8});var dk=d((Jme,fk)=>{var z8=ak(),V8=ck(),X8=i_();function Y8(t){var e=V8(t);return e.length==1&&e[0][2]?X8(e[0][0],e[0][1]):function(r){return r===t||z8(r,t,e)}}fk.exports=Y8});var Ds=d((Qme,pk)=>{var J8=ho(),Q8=Sn(),Z8="[object Symbol]";function e5(t){return typeof t=="symbol"||Q8(t)&&J8(t)==Z8}pk.exports=e5});var qd=d((Zme,hk)=>{var t5=qe(),r5=Ds(),n5=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,i5=/^\w*$/;function o5(t,e){if(t5(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||r5(t)?!0:i5.test(t)||!n5.test(t)||e!=null&&t in Object(e)}hk.exports=o5});var yk=d((ege,gk)=>{var mk=Sd(),a5="Expected a function";function o_(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(a5);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var a=t.apply(this,n);return r.cache=o.set(i,a)||o,a};return r.cache=new(o_.Cache||mk),r}o_.Cache=mk;gk.exports=o_});var _k=d((tge,vk)=>{var s5=yk(),u5=500;function c5(t){var e=s5(t,function(n){return r.size===u5&&r.clear(),n}),r=e.cache;return e}vk.exports=c5});var Rk=d((rge,Tk)=>{var l5=_k(),f5=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,d5=/\\(\\)?/g,p5=l5(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(f5,function(r,n,i,o){e.push(i?o.replace(d5,"$1"):n||r)}),e});Tk.exports=p5});var Ek=d((nge,Ck)=>{var bk=oa(),h5=Cs(),m5=qe(),g5=Ds(),y5=1/0,Ak=bk?bk.prototype:void 0,Pk=Ak?Ak.toString:void 0;function Sk(t){if(typeof t=="string")return t;if(m5(t))return h5(t,Sk)+"";if(g5(t))return Pk?Pk.call(t):"";var e=t+"";return e=="0"&&1/t==-y5?"-0":e}Ck.exports=Sk});var a_=d((ige,Nk)=>{var v5=Ek();function _5(t){return t==null?"":v5(t)}Nk.exports=_5});var Ac=d((oge,kk)=>{var T5=qe(),R5=qd(),b5=Rk(),A5=a_();function P5(t,e){return T5(t)?t:R5(t,e)?[t]:b5(A5(t))}kk.exports=P5});var Is=d((age,wk)=>{var S5=Ds(),C5=1/0;function E5(t){if(typeof t=="string"||S5(t))return t;var e=t+"";return e=="0"&&1/t==-C5?"-0":e}wk.exports=E5});var Ld=d((sge,Ok)=>{var N5=Ac(),k5=Is();function w5(t,e){e=N5(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[k5(e[r++])];return r&&r==n?t:void 0}Ok.exports=w5});var Ik=d((uge,Dk)=>{var O5=Ld();function D5(t,e,r){var n=t==null?void 0:O5(t,e);return n===void 0?r:n}Dk.exports=D5});var qk=d((cge,xk)=>{function I5(t,e){return t!=null&&e in Object(t)}xk.exports=I5});var s_=d((lge,Lk)=>{var x5=Ac(),q5=dc(),L5=qe(),M5=bc(),$5=Ad(),F5=Is();function j5(t,e,r){e=x5(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var a=F5(e[n]);if(!(o=t!=null&&r(t,a)))break;t=t[a]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&$5(i)&&M5(a,i)&&(L5(t)||q5(t)))}Lk.exports=j5});var $k=d((fge,Mk)=>{var U5=qk(),G5=s_();function H5(t,e){return t!=null&&G5(t,e,U5)}Mk.exports=H5});var jk=d((dge,Fk)=>{var W5=r_(),B5=Ik(),K5=$k(),z5=qd(),V5=n_(),X5=i_(),Y5=Is(),J5=1,Q5=2;function Z5(t,e){return z5(t)&&V5(e)?X5(Y5(t),e):function(r){var n=B5(r,t);return n===void 0&&n===e?K5(r,t):W5(e,n,J5|Q5)}}Fk.exports=Z5});var sa=d((pge,Uk)=>{function eX(t){return t}Uk.exports=eX});var Hk=d((hge,Gk)=>{function tX(t){return function(e){return e?.[t]}}Gk.exports=tX});var Bk=d((mge,Wk)=>{var rX=Ld();function nX(t){return function(e){return rX(e,t)}}Wk.exports=nX});var zk=d((gge,Kk)=>{var iX=Hk(),oX=Bk(),aX=qd(),sX=Is();function uX(t){return aX(t)?iX(sX(t)):oX(t)}Kk.exports=uX});var Zr=d((yge,Vk)=>{var cX=dk(),lX=jk(),fX=sa(),dX=qe(),pX=zk();function hX(t){return typeof t=="function"?t:t==null?fX:typeof t=="object"?dX(t)?lX(t[0],t[1]):cX(t):pX(t)}Vk.exports=hX});var Yk=d((vge,Xk)=>{function mX(t){return function(e,r,n){for(var i=-1,o=Object(e),a=n(e),s=a.length;s--;){var u=a[t?s:++i];if(r(o[u],u,o)===!1)break}return e}}Xk.exports=mX});var Qk=d((_ge,Jk)=>{var gX=Yk(),yX=gX();Jk.exports=yX});var ew=d((Tge,Zk)=>{var vX=Qk(),_X=xr();function TX(t,e){return t&&vX(t,e,_X)}Zk.exports=TX});var rw=d((Rge,tw)=>{var RX=Cn();function bX(t,e){return function(r,n){if(r==null)return r;if(!RX(r))return t(r,n);for(var i=r.length,o=e?i:-1,a=Object(r);(e?o--:++o<i)&&n(a[o],o,a)!==!1;);return r}}tw.exports=bX});var go=d((bge,nw)=>{var AX=ew(),PX=rw(),SX=PX(AX);nw.exports=SX});var ow=d((Age,iw)=>{var CX=go(),EX=Cn();function NX(t,e){var r=-1,n=EX(t)?Array(t.length):[];return CX(t,function(i,o,a){n[++r]=e(i,o,a)}),n}iw.exports=NX});var Ut=d((Pge,aw)=>{var kX=Cs(),wX=Zr(),OX=ow(),DX=qe();function IX(t,e){var r=DX(t)?kX:OX;return r(t,wX(e,3))}aw.exports=IX});var u_=d((Sge,sw)=>{function xX(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}sw.exports=xX});var cw=d((Cge,uw)=>{var qX=sa();function LX(t){return typeof t=="function"?t:qX}uw.exports=LX});var Gt=d((Ege,lw)=>{var MX=u_(),$X=go(),FX=cw(),jX=qe();function UX(t,e){var r=jX(t)?MX:$X;return r(t,FX(e))}lw.exports=UX});var dw=d((Nge,fw)=>{var GX=Cs();function HX(t,e){return GX(e,function(r){return t[r]})}fw.exports=HX});var zn=d((kge,pw)=>{var WX=dw(),BX=xr();function KX(t){return t==null?[]:WX(t,BX(t))}pw.exports=KX});var mw=d((wge,hw)=>{var zX=Object.prototype,VX=zX.hasOwnProperty;function XX(t,e){return t!=null&&VX.call(t,e)}hw.exports=XX});var qr=d((Oge,gw)=>{var YX=mw(),JX=s_();function QX(t,e){return t!=null&&JX(t,e,YX)}gw.exports=QX});var c_=d((Dge,yw)=>{var ZX=mo(),eY=function(){try{var t=ZX(Object,"defineProperty");return t({},"",{}),t}catch{}}();yw.exports=eY});var Md=d((Ige,_w)=>{var vw=c_();function tY(t,e,r){e=="__proto__"&&vw?vw(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}_w.exports=tY});var Pc=d((xge,Tw)=>{var rY=Md(),nY=Es(),iY=Object.prototype,oY=iY.hasOwnProperty;function aY(t,e,r){var n=t[e];(!(oY.call(t,e)&&nY(n,r))||r===void 0&&!(e in t))&&rY(t,e,r)}Tw.exports=aY});var xs=d((qge,Rw)=>{var sY=Pc(),uY=Md();function cY(t,e,r,n){var i=!r;r||(r={});for(var o=-1,a=e.length;++o<a;){var s=e[o],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?uY(r,s,u):sY(r,s,u)}return r}Rw.exports=cY});var Aw=d((Lge,bw)=>{var lY=xs(),fY=xr();function dY(t,e){return t&&lY(e,fY(e),t)}bw.exports=dY});var Sw=d((Mge,Pw)=>{function pY(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}Pw.exports=pY});var Ew=d(($ge,Cw)=>{var hY=Pn(),mY=_s(),gY=Sw(),yY=Object.prototype,vY=yY.hasOwnProperty;function _Y(t){if(!hY(t))return gY(t);var e=mY(t),r=[];for(var n in t)n=="constructor"&&(e||!vY.call(t,n))||r.push(n);return r}Cw.exports=_Y});var Sc=d((Fge,Nw)=>{var TY=Zv(),RY=Ew(),bY=Cn();function AY(t){return bY(t)?TY(t,!0):RY(t)}Nw.exports=AY});var ww=d((jge,kw)=>{var PY=xs(),SY=Sc();function CY(t,e){return t&&PY(e,SY(e),t)}kw.exports=CY});var qw=d((Cc,qs)=>{var EY=An(),xw=typeof Cc=="object"&&Cc&&!Cc.nodeType&&Cc,Ow=xw&&typeof qs=="object"&&qs&&!qs.nodeType&&qs,NY=Ow&&Ow.exports===xw,Dw=NY?EY.Buffer:void 0,Iw=Dw?Dw.allocUnsafe:void 0;function kY(t,e){if(e)return t.slice();var r=t.length,n=Iw?Iw(r):new t.constructor(r);return t.copy(n),n}qs.exports=kY});var Mw=d((Uge,Lw)=>{function wY(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}Lw.exports=wY});var Fw=d((Gge,$w)=>{var OY=xs(),DY=Id();function IY(t,e){return OY(t,DY(t),e)}$w.exports=IY});var l_=d((Hge,jw)=>{var xY=qv(),qY=xY(Object.getPrototypeOf,Object);jw.exports=qY});var f_=d((Wge,Uw)=>{var LY=Od(),MY=l_(),$Y=Id(),FY=Qv(),jY=Object.getOwnPropertySymbols,UY=jY?function(t){for(var e=[];t;)LY(e,$Y(t)),t=MY(t);return e}:FY;Uw.exports=UY});var Hw=d((Bge,Gw)=>{var GY=xs(),HY=f_();function WY(t,e){return GY(t,HY(t),e)}Gw.exports=WY});var d_=d((Kge,Ww)=>{var BY=Jv(),KY=f_(),zY=Sc();function VY(t){return BY(t,zY,KY)}Ww.exports=VY});var Kw=d((zge,Bw)=>{var XY=Object.prototype,YY=XY.hasOwnProperty;function JY(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&YY.call(t,"index")&&(r.index=t.index,r.input=t.input),r}Bw.exports=JY});var $d=d((Vge,Vw)=>{var zw=Xv();function QY(t){var e=new t.constructor(t.byteLength);return new zw(e).set(new zw(t)),e}Vw.exports=QY});var Yw=d((Xge,Xw)=>{var ZY=$d();function e7(t,e){var r=e?ZY(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}Xw.exports=e7});var Qw=d((Yge,Jw)=>{var t7=/\w*$/;function r7(t){var e=new t.constructor(t.source,t7.exec(t));return e.lastIndex=t.lastIndex,e}Jw.exports=r7});var nO=d((Jge,rO)=>{var Zw=oa(),eO=Zw?Zw.prototype:void 0,tO=eO?eO.valueOf:void 0;function n7(t){return tO?Object(tO.call(t)):{}}rO.exports=n7});var oO=d((Qge,iO)=>{var i7=$d();function o7(t,e){var r=e?i7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}iO.exports=o7});var sO=d((Zge,aO)=>{var a7=$d(),s7=Yw(),u7=Qw(),c7=nO(),l7=oO(),f7="[object Boolean]",d7="[object Date]",p7="[object Map]",h7="[object Number]",m7="[object RegExp]",g7="[object Set]",y7="[object String]",v7="[object Symbol]",_7="[object ArrayBuffer]",T7="[object DataView]",R7="[object Float32Array]",b7="[object Float64Array]",A7="[object Int8Array]",P7="[object Int16Array]",S7="[object Int32Array]",C7="[object Uint8Array]",E7="[object Uint8ClampedArray]",N7="[object Uint16Array]",k7="[object Uint32Array]";function w7(t,e,r){var n=t.constructor;switch(e){case _7:return a7(t);case f7:case d7:return new n(+t);case T7:return s7(t,r);case R7:case b7:case A7:case P7:case S7:case C7:case E7:case N7:case k7:return l7(t,r);case p7:return new n;case h7:case y7:return new n(t);case m7:return u7(t);case g7:return new n;case v7:return c7(t)}}aO.exports=w7});var lO=d((eye,cO)=>{var O7=Pn(),uO=Object.create,D7=function(){function t(){}return function(e){if(!O7(e))return{};if(uO)return uO(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();cO.exports=D7});var dO=d((tye,fO)=>{var I7=lO(),x7=l_(),q7=_s();function L7(t){return typeof t.constructor=="function"&&!q7(t)?I7(x7(t)):{}}fO.exports=L7});var hO=d((rye,pO)=>{var M7=bs(),$7=Sn(),F7="[object Map]";function j7(t){return $7(t)&&M7(t)==F7}pO.exports=j7});var vO=d((nye,yO)=>{var U7=hO(),G7=Ps(),mO=yc(),gO=mO&&mO.isMap,H7=gO?G7(gO):U7;yO.exports=H7});var TO=d((iye,_O)=>{var W7=bs(),B7=Sn(),K7="[object Set]";function z7(t){return B7(t)&&W7(t)==K7}_O.exports=z7});var PO=d((oye,AO)=>{var V7=TO(),X7=Ps(),RO=yc(),bO=RO&&RO.isSet,Y7=bO?X7(bO):V7;AO.exports=Y7});var kO=d((aye,NO)=>{var J7=Cd(),Q7=u_(),Z7=Pc(),eJ=Aw(),tJ=ww(),rJ=qw(),nJ=Mw(),iJ=Fw(),oJ=Hw(),aJ=e_(),sJ=d_(),uJ=bs(),cJ=Kw(),lJ=sO(),fJ=dO(),dJ=qe(),pJ=hc(),hJ=vO(),mJ=Pn(),gJ=PO(),yJ=xr(),vJ=Sc(),_J=1,TJ=2,RJ=4,SO="[object Arguments]",bJ="[object Array]",AJ="[object Boolean]",PJ="[object Date]",SJ="[object Error]",CO="[object Function]",CJ="[object GeneratorFunction]",EJ="[object Map]",NJ="[object Number]",EO="[object Object]",kJ="[object RegExp]",wJ="[object Set]",OJ="[object String]",DJ="[object Symbol]",IJ="[object WeakMap]",xJ="[object ArrayBuffer]",qJ="[object DataView]",LJ="[object Float32Array]",MJ="[object Float64Array]",$J="[object Int8Array]",FJ="[object Int16Array]",jJ="[object Int32Array]",UJ="[object Uint8Array]",GJ="[object Uint8ClampedArray]",HJ="[object Uint16Array]",WJ="[object Uint32Array]",Xe={};Xe[SO]=Xe[bJ]=Xe[xJ]=Xe[qJ]=Xe[AJ]=Xe[PJ]=Xe[LJ]=Xe[MJ]=Xe[$J]=Xe[FJ]=Xe[jJ]=Xe[EJ]=Xe[NJ]=Xe[EO]=Xe[kJ]=Xe[wJ]=Xe[OJ]=Xe[DJ]=Xe[UJ]=Xe[GJ]=Xe[HJ]=Xe[WJ]=!0;Xe[SJ]=Xe[CO]=Xe[IJ]=!1;function Fd(t,e,r,n,i,o){var a,s=e&_J,u=e&TJ,c=e&RJ;if(r&&(a=i?r(t,n,i,o):r(t)),a!==void 0)return a;if(!mJ(t))return t;var l=dJ(t);if(l){if(a=cJ(t),!s)return nJ(t,a)}else{var f=uJ(t),h=f==CO||f==CJ;if(pJ(t))return rJ(t,s);if(f==EO||f==SO||h&&!i){if(a=u||h?{}:fJ(t),!s)return u?oJ(t,tJ(a,t)):iJ(t,eJ(a,t))}else{if(!Xe[f])return i?t:{};a=lJ(t,f,s)}}o||(o=new J7);var y=o.get(t);if(y)return y;o.set(t,a),gJ(t)?t.forEach(function(E){a.add(Fd(E,e,r,E,t,o))}):hJ(t)&&t.forEach(function(E,S){a.set(S,Fd(E,e,r,S,t,o))});var m=c?u?sJ:aJ:u?vJ:yJ,R=l?void 0:m(t);return Q7(R||t,function(E,S){R&&(S=E,E=t[S]),Z7(a,S,Fd(E,e,r,S,t,o))}),a}NO.exports=Fd});var wi=d((sye,wO)=>{var BJ=kO(),KJ=4;function zJ(t){return BJ(t,KJ)}wO.exports=zJ});var OO=d(Ls=>{"use strict";Object.defineProperty(Ls,"__esModule",{value:!0});Ls.PRINT_WARNING=Ls.PRINT_ERROR=void 0;function VJ(t){console&&console.error&&console.error("Error: ".concat(t))}Ls.PRINT_ERROR=VJ;function XJ(t){console&&console.warn&&console.warn("Warning: ".concat(t))}Ls.PRINT_WARNING=XJ});var DO=d(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.timer=void 0;function YJ(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}jd.timer=YJ});var IO=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var Ms=d(Vn=>{"use strict";Object.defineProperty(Vn,"__esModule",{value:!0});Vn.toFastProperties=Vn.timer=Vn.PRINT_ERROR=Vn.PRINT_WARNING=void 0;var xO=OO();Object.defineProperty(Vn,"PRINT_WARNING",{enumerable:!0,get:function(){return xO.PRINT_WARNING}});Object.defineProperty(Vn,"PRINT_ERROR",{enumerable:!0,get:function(){return xO.PRINT_ERROR}});var JJ=DO();Object.defineProperty(Vn,"timer",{enumerable:!0,get:function(){return JJ.timer}});var QJ=IO();Object.defineProperty(Vn,"toFastProperties",{enumerable:!0,get:function(){return QJ.toFastProperties}})});var Ud=d((fye,qO)=>{function ZJ(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}qO.exports=ZJ});var MO=d((dye,LO)=>{var eQ=/\s/;function tQ(t){for(var e=t.length;e--&&eQ.test(t.charAt(e)););return e}LO.exports=tQ});var FO=d((pye,$O)=>{var rQ=MO(),nQ=/^\s+/;function iQ(t){return t&&t.slice(0,rQ(t)+1).replace(nQ,"")}$O.exports=iQ});var HO=d((hye,GO)=>{var oQ=FO(),jO=Pn(),aQ=Ds(),UO=0/0,sQ=/^[-+]0x[0-9a-f]+$/i,uQ=/^0b[01]+$/i,cQ=/^0o[0-7]+$/i,lQ=parseInt;function fQ(t){if(typeof t=="number")return t;if(aQ(t))return UO;if(jO(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=jO(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=oQ(t);var r=uQ.test(t);return r||cQ.test(t)?lQ(t.slice(2),r?2:8):sQ.test(t)?UO:+t}GO.exports=fQ});var KO=d((mye,BO)=>{var dQ=HO(),WO=1/0,pQ=17976931348623157e292;function hQ(t){if(!t)return t===0?t:0;if(t=dQ(t),t===WO||t===-WO){var e=t<0?-1:1;return e*pQ}return t===t?t:0}BO.exports=hQ});var $s=d((gye,zO)=>{var mQ=KO();function gQ(t){var e=mQ(t),r=e%1;return e===e?r?e-r:e:0}zO.exports=gQ});var Gd=d((yye,VO)=>{var yQ=Ud(),vQ=$s();function _Q(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:vQ(e),yQ(t,e<0?0:e,n)):[]}VO.exports=_Q});var Ec=d((vye,XO)=>{var TQ=ho(),RQ=qe(),bQ=Sn(),AQ="[object String]";function PQ(t){return typeof t=="string"||!RQ(t)&&bQ(t)&&TQ(t)==AQ}XO.exports=PQ});var JO=d((_ye,YO)=>{var SQ=ho(),CQ=Sn(),EQ="[object RegExp]";function NQ(t){return CQ(t)&&SQ(t)==EQ}YO.exports=NQ});var p_=d((Tye,eD)=>{var kQ=JO(),wQ=Ps(),QO=yc(),ZO=QO&&QO.isRegExp,OQ=ZO?wQ(ZO):kQ;eD.exports=OQ});var nD=d((Rye,rD)=>{var DQ=Pc(),IQ=Ac(),xQ=bc(),tD=Pn(),qQ=Is();function LQ(t,e,r,n){if(!tD(t))return t;e=IQ(e,t);for(var i=-1,o=e.length,a=o-1,s=t;s!=null&&++i<o;){var u=qQ(e[i]),c=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=a){var l=s[u];c=n?n(l,u,s):void 0,c===void 0&&(c=tD(l)?l:xQ(e[i+1])?[]:{})}DQ(s,u,c),s=s[u]}return t}rD.exports=LQ});var oD=d((bye,iD)=>{var MQ=Ld(),$Q=nD(),FQ=Ac();function jQ(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var a=e[n],s=MQ(t,a);r(s,a)&&$Q(o,FQ(a,t),s)}return o}iD.exports=jQ});var h_=d((Aye,aD)=>{var UQ=Cs(),GQ=Zr(),HQ=oD(),WQ=d_();function BQ(t,e){if(t==null)return{};var r=UQ(WQ(t),function(n){return[n]});return e=GQ(e),HQ(t,r,function(n,i){return e(n,i[0])})}aD.exports=BQ});var uD=d((Pye,sD)=>{function KQ(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}sD.exports=KQ});var fD=d((Sye,lD)=>{var zQ=uD(),cD=Math.max;function VQ(t,e,r){return e=cD(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=cD(n.length-e,0),a=Array(o);++i<o;)a[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(a),zQ(t,this,s)}}lD.exports=VQ});var pD=d((Cye,dD)=>{function XQ(t){return function(){return t}}dD.exports=XQ});var gD=d((Eye,mD)=>{var YQ=pD(),hD=c_(),JQ=sa(),QQ=hD?function(t,e){return hD(t,"toString",{configurable:!0,enumerable:!1,value:YQ(e),writable:!0})}:JQ;mD.exports=QQ});var vD=d((Nye,yD)=>{var ZQ=800,eZ=16,tZ=Date.now;function rZ(t){var e=0,r=0;return function(){var n=tZ(),i=eZ-(n-r);if(r=n,i>0){if(++e>=ZQ)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}yD.exports=rZ});var TD=d((kye,_D)=>{var nZ=gD(),iZ=vD(),oZ=iZ(nZ);_D.exports=oZ});var Hd=d((wye,RD)=>{var aZ=sa(),sZ=fD(),uZ=TD();function cZ(t,e){return uZ(sZ(t,e,aZ),t+"")}RD.exports=cZ});var Nc=d((Oye,bD)=>{var lZ=Es(),fZ=Cn(),dZ=bc(),pZ=Pn();function hZ(t,e,r){if(!pZ(r))return!1;var n=typeof e;return(n=="number"?fZ(r)&&dZ(e,r.length):n=="string"&&e in r)?lZ(r[e],t):!1}bD.exports=hZ});var PD=d((Dye,AD)=>{var mZ=Hd(),gZ=Nc();function yZ(t){return mZ(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,a=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,a&&gZ(r[0],r[1],a)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,o)}return e})}AD.exports=yZ});var kc=d((Iye,SD)=>{var vZ=Pc(),_Z=xs(),TZ=PD(),RZ=Cn(),bZ=_s(),AZ=xr(),PZ=Object.prototype,SZ=PZ.hasOwnProperty,CZ=TZ(function(t,e){if(bZ(e)||RZ(e)){_Z(e,AZ(e),t);return}for(var r in e)SZ.call(e,r)&&vZ(t,r,e[r])});SD.exports=CZ});var Bd=d(Ae=>{"use strict";var Oi=Ae&&Ae.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Fs=Ae&&Ae.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ae,"__esModule",{value:!0});Ae.serializeProduction=Ae.serializeGrammar=Ae.Terminal=Ae.Alternation=Ae.RepetitionWithSeparator=Ae.Repetition=Ae.RepetitionMandatoryWithSeparator=Ae.RepetitionMandatory=Ae.Option=Ae.Alternative=Ae.Rule=Ae.NonTerminal=Ae.AbstractProduction=void 0;var CD=Fs(Ut()),EZ=Fs(Gt()),m_=Fs(Ec()),NZ=Fs(p_()),Xn=Fs(h_()),Yn=Fs(kc());function kZ(t){return wZ(t)?t.LABEL:t.name}function wZ(t){return(0,m_.default)(t.LABEL)&&t.LABEL!==""}var Jn=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,EZ.default)(this.definition,function(r){r.accept(e)})},t}();Ae.AbstractProduction=Jn;var ED=function(t){Oi(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(Jn);Ae.NonTerminal=ED;var ND=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return e}(Jn);Ae.Rule=ND;var kD=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return e}(Jn);Ae.Alternative=kD;var wD=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return e}(Jn);Ae.Option=wD;var OD=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return e}(Jn);Ae.RepetitionMandatory=OD;var DD=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return e}(Jn);Ae.RepetitionMandatoryWithSeparator=DD;var ID=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return e}(Jn);Ae.Repetition=ID;var xD=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return e}(Jn);Ae.RepetitionWithSeparator=xD;var qD=function(t){Oi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,Yn.default)(n,(0,Xn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(Jn);Ae.Alternation=qD;var Wd=function(){function t(e){this.idx=1,(0,Yn.default)(this,(0,Xn.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Ae.Terminal=Wd;function OZ(t){return(0,CD.default)(t,wc)}Ae.serializeGrammar=OZ;function wc(t){function e(o){return(0,CD.default)(o,wc)}if(t instanceof ED){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,m_.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof kD)return{type:"Alternative",definition:e(t.definition)};if(t instanceof wD)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof OD)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof DD)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:wc(new Wd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof xD)return{type:"RepetitionWithSeparator",idx:t.idx,separator:wc(new Wd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof ID)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof qD)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof Wd){var n={type:"Terminal",name:t.terminalType.name,label:kZ(t.terminalType),idx:t.idx};(0,m_.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,NZ.default)(i)?i.source:i),n}else{if(t instanceof ND)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Ae.serializeProduction=wc});var LD=d(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.GAstVisitor=void 0;var Qn=Bd(),DZ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case Qn.NonTerminal:return this.visitNonTerminal(r);case Qn.Alternative:return this.visitAlternative(r);case Qn.Option:return this.visitOption(r);case Qn.RepetitionMandatory:return this.visitRepetitionMandatory(r);case Qn.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case Qn.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case Qn.Repetition:return this.visitRepetition(r);case Qn.Alternation:return this.visitAlternation(r);case Qn.Terminal:return this.visitTerminal(r);case Qn.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();Kd.GAstVisitor=DZ});var $D=d((Lye,MD)=>{var IZ=go();function xZ(t,e){var r;return IZ(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}MD.exports=xZ});var zd=d((Mye,FD)=>{var qZ=zv(),LZ=Zr(),MZ=$D(),$Z=qe(),FZ=Nc();function jZ(t,e,r){var n=$Z(t)?qZ:MZ;return r&&FZ(t,e,r)&&(e=void 0),n(t,LZ(e,3))}FD.exports=jZ});var UD=d(($ye,jD)=>{function UZ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}jD.exports=UZ});var HD=d((Fye,GD)=>{var GZ=go();function HZ(t,e){var r=!0;return GZ(t,function(n,i,o){return r=!!e(n,i,o),r}),r}GD.exports=HZ});var Oc=d((jye,WD)=>{var WZ=UD(),BZ=HD(),KZ=Zr(),zZ=qe(),VZ=Nc();function XZ(t,e,r){var n=zZ(t)?WZ:BZ;return r&&VZ(t,e,r)&&(e=void 0),n(t,KZ(e,3))}WD.exports=XZ});var g_=d((Uye,BD)=>{function YZ(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}BD.exports=YZ});var zD=d((Gye,KD)=>{function JZ(t){return t!==t}KD.exports=JZ});var XD=d((Hye,VD)=>{function QZ(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}VD.exports=QZ});var Vd=d((Wye,YD)=>{var ZZ=g_(),eee=zD(),tee=XD();function ree(t,e,r){return e===e?tee(t,e,r):ZZ(t,eee,r)}YD.exports=ree});var Di=d((Bye,JD)=>{var nee=Vd(),iee=Cn(),oee=Ec(),aee=$s(),see=zn(),uee=Math.max;function cee(t,e,r,n){t=iee(t)?t:see(t),r=r&&!n?aee(r):0;var i=t.length;return r<0&&(r=uee(i+r,0)),oee(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&nee(t,e,r)>-1}JD.exports=cee});var QD=d(en=>{"use strict";var v_=en&&en.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(en,"__esModule",{value:!0});en.getProductionDslName=en.isBranchingProd=en.isOptionalProd=en.isSequenceProd=void 0;var lee=v_(zd()),fee=v_(Oc()),dee=v_(Di()),ot=Bd();function pee(t){return t instanceof ot.Alternative||t instanceof ot.Option||t instanceof ot.Repetition||t instanceof ot.RepetitionMandatory||t instanceof ot.RepetitionMandatoryWithSeparator||t instanceof ot.RepetitionWithSeparator||t instanceof ot.Terminal||t instanceof ot.Rule}en.isSequenceProd=pee;function y_(t,e){e===void 0&&(e=[]);var r=t instanceof ot.Option||t instanceof ot.Repetition||t instanceof ot.RepetitionWithSeparator;return r?!0:t instanceof ot.Alternation?(0,lee.default)(t.definition,function(n){return y_(n,e)}):t instanceof ot.NonTerminal&&(0,dee.default)(e,t)?!1:t instanceof ot.AbstractProduction?(t instanceof ot.NonTerminal&&e.push(t),(0,fee.default)(t.definition,function(n){return y_(n,e)})):!1}en.isOptionalProd=y_;function hee(t){return t instanceof ot.Alternation}en.isBranchingProd=hee;function mee(t){if(t instanceof ot.NonTerminal)return"SUBRULE";if(t instanceof ot.Option)return"OPTION";if(t instanceof ot.Alternation)return"OR";if(t instanceof ot.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof ot.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof ot.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof ot.Repetition)return"MANY";if(t instanceof ot.Terminal)return"CONSUME";throw Error("non exhaustive match")}en.getProductionDslName=mee});var _t=d(pe=>{"use strict";Object.defineProperty(pe,"__esModule",{value:!0});pe.isSequenceProd=pe.isBranchingProd=pe.isOptionalProd=pe.getProductionDslName=pe.GAstVisitor=pe.serializeProduction=pe.serializeGrammar=pe.Alternative=pe.Alternation=pe.RepetitionWithSeparator=pe.RepetitionMandatoryWithSeparator=pe.RepetitionMandatory=pe.Repetition=pe.Option=pe.NonTerminal=pe.Terminal=pe.Rule=void 0;var tn=Bd();Object.defineProperty(pe,"Rule",{enumerable:!0,get:function(){return tn.Rule}});Object.defineProperty(pe,"Terminal",{enumerable:!0,get:function(){return tn.Terminal}});Object.defineProperty(pe,"NonTerminal",{enumerable:!0,get:function(){return tn.NonTerminal}});Object.defineProperty(pe,"Option",{enumerable:!0,get:function(){return tn.Option}});Object.defineProperty(pe,"Repetition",{enumerable:!0,get:function(){return tn.Repetition}});Object.defineProperty(pe,"RepetitionMandatory",{enumerable:!0,get:function(){return tn.RepetitionMandatory}});Object.defineProperty(pe,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return tn.RepetitionMandatoryWithSeparator}});Object.defineProperty(pe,"RepetitionWithSeparator",{enumerable:!0,get:function(){return tn.RepetitionWithSeparator}});Object.defineProperty(pe,"Alternation",{enumerable:!0,get:function(){return tn.Alternation}});Object.defineProperty(pe,"Alternative",{enumerable:!0,get:function(){return tn.Alternative}});Object.defineProperty(pe,"serializeGrammar",{enumerable:!0,get:function(){return tn.serializeGrammar}});Object.defineProperty(pe,"serializeProduction",{enumerable:!0,get:function(){return tn.serializeProduction}});var gee=LD();Object.defineProperty(pe,"GAstVisitor",{enumerable:!0,get:function(){return gee.GAstVisitor}});var Xd=QD();Object.defineProperty(pe,"getProductionDslName",{enumerable:!0,get:function(){return Xd.getProductionDslName}});Object.defineProperty(pe,"isOptionalProd",{enumerable:!0,get:function(){return Xd.isOptionalProd}});Object.defineProperty(pe,"isBranchingProd",{enumerable:!0,get:function(){return Xd.isBranchingProd}});Object.defineProperty(pe,"isSequenceProd",{enumerable:!0,get:function(){return Xd.isSequenceProd}})});var Yd=d(js=>{"use strict";var tI=js&&js.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(js,"__esModule",{value:!0});js.RestWalker=void 0;var yee=tI(Gd()),ZD=tI(Gt()),Pr=_t(),vee=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,ZD.default)(e.definition,function(i,o){var a=(0,yee.default)(e.definition,o+1);if(i instanceof Pr.NonTerminal)n.walkProdRef(i,a,r);else if(i instanceof Pr.Terminal)n.walkTerminal(i,a,r);else if(i instanceof Pr.Alternative)n.walkFlat(i,a,r);else if(i instanceof Pr.Option)n.walkOption(i,a,r);else if(i instanceof Pr.RepetitionMandatory)n.walkAtLeastOne(i,a,r);else if(i instanceof Pr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,a,r);else if(i instanceof Pr.RepetitionWithSeparator)n.walkManySep(i,a,r);else if(i instanceof Pr.Repetition)n.walkMany(i,a,r);else if(i instanceof Pr.Alternation)n.walkOr(i,a,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new Pr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=eI(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new Pr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=eI(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,o=r.concat(n);(0,ZD.default)(e.definition,function(a){var s=new Pr.Alternative({definition:[a]});i.walk(s,o)})},t}();js.RestWalker=vee;function eI(t,e,r){var n=[new Pr.Option({definition:[new Pr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var oI=d((Xye,iI)=>{var rI=oa(),_ee=dc(),Tee=qe(),nI=rI?rI.isConcatSpreadable:void 0;function Ree(t){return Tee(t)||_ee(t)||!!(nI&&t&&t[nI])}iI.exports=Ree});var Jd=d((Yye,sI)=>{var bee=Od(),Aee=oI();function aI(t,e,r,n,i){var o=-1,a=t.length;for(r||(r=Aee),i||(i=[]);++o<a;){var s=t[o];e>0&&r(s)?e>1?aI(s,e-1,r,n,i):bee(i,s):n||(i[i.length]=s)}return i}sI.exports=aI});var En=d((Jye,uI)=>{var Pee=Jd();function See(t){var e=t==null?0:t.length;return e?Pee(t,1):[]}uI.exports=See});var __=d((Qye,cI)=>{var Cee=Vd();function Eee(t,e){var r=t==null?0:t.length;return!!r&&Cee(t,e,0)>-1}cI.exports=Eee});var T_=d((Zye,lI)=>{function Nee(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}lI.exports=Nee});var Qd=d((eve,fI)=>{function kee(){}fI.exports=kee});var pI=d((tve,dI)=>{var R_=jv(),wee=Qd(),Oee=wd(),Dee=1/0,Iee=R_&&1/Oee(new R_([,-0]))[1]==Dee?function(t){return new R_(t)}:wee;dI.exports=Iee});var b_=d((rve,hI)=>{var xee=Nd(),qee=__(),Lee=T_(),Mee=kd(),$ee=pI(),Fee=wd(),jee=200;function Uee(t,e,r){var n=-1,i=qee,o=t.length,a=!0,s=[],u=s;if(r)a=!1,i=Lee;else if(o>=jee){var c=e?null:$ee(t);if(c)return Fee(c);a=!1,i=Mee,u=new xee}else u=e?[]:s;e:for(;++n<o;){var l=t[n],f=e?e(l):l;if(l=r||l!==0?l:0,a&&f===f){for(var h=u.length;h--;)if(u[h]===f)continue e;e&&u.push(f),s.push(l)}else i(u,f,r)||(u!==s&&u.push(f),s.push(l))}return s}hI.exports=Uee});var Zd=d((nve,mI)=>{var Gee=b_();function Hee(t){return t&&t.length?Gee(t):[]}mI.exports=Hee});var S_=d(rn=>{"use strict";var P_=rn&&rn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(rn,"__esModule",{value:!0});rn.firstForTerminal=rn.firstForBranching=rn.firstForSequence=rn.first=void 0;var Wee=P_(En()),yI=P_(Zd()),Bee=P_(Ut()),gI=_t(),A_=_t();function ep(t){if(t instanceof gI.NonTerminal)return ep(t.referencedRule);if(t instanceof gI.Terminal)return TI(t);if((0,A_.isSequenceProd)(t))return vI(t);if((0,A_.isBranchingProd)(t))return _I(t);throw Error("non exhaustive match")}rn.first=ep;function vI(t){for(var e=[],r=t.definition,n=0,i=r.length>n,o,a=!0;i&&a;)o=r[n],a=(0,A_.isOptionalProd)(o),e=e.concat(ep(o)),n=n+1,i=r.length>n;return(0,yI.default)(e)}rn.firstForSequence=vI;function _I(t){var e=(0,Bee.default)(t.definition,function(r){return ep(r)});return(0,yI.default)((0,Wee.default)(e))}rn.firstForBranching=_I;function TI(t){return[t.terminalType]}rn.firstForTerminal=TI});var C_=d(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});tp.IN=void 0;tp.IN="_~IN~_"});var SI=d(Sr=>{"use strict";var Kee=Sr&&Sr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),RI=Sr&&Sr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Sr,"__esModule",{value:!0});Sr.buildInProdFollowPrefix=Sr.buildBetweenProdsFollowPrefix=Sr.computeAllProdsFollows=Sr.ResyncFollowsWalker=void 0;var zee=Yd(),Vee=S_(),Xee=RI(Gt()),Yee=RI(kc()),bI=C_(),Jee=_t(),AI=function(t){Kee(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var o=PI(r.referencedRule,r.idx)+this.topProd.name,a=n.concat(i),s=new Jee.Alternative({definition:a}),u=(0,Vee.first)(s);this.follows[o]=u},e}(zee.RestWalker);Sr.ResyncFollowsWalker=AI;function Qee(t){var e={};return(0,Xee.default)(t,function(r){var n=new AI(r).startWalking();(0,Yee.default)(e,n)}),e}Sr.computeAllProdsFollows=Qee;function PI(t,e){return t.name+e+bI.IN}Sr.buildBetweenProdsFollowPrefix=PI;function Zee(t){var e=t.terminalType.name;return e+t.idx+bI.IN}Sr.buildInProdFollowPrefix=Zee});var ua=d((sve,CI)=>{function ete(t){return t===void 0}CI.exports=ete});var NI=d((uve,EI)=>{function tte(t){return t&&t.length?t[0]:void 0}EI.exports=tte});var Us=d((cve,kI)=>{kI.exports=NI()});var Dc=d((lve,wI)=>{function rte(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}wI.exports=rte});var E_=d((fve,OI)=>{var nte=go();function ite(t,e){var r=[];return nte(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}OI.exports=ite});var II=d((dve,DI)=>{var ote="Expected a function";function ate(t){if(typeof t!="function")throw new TypeError(ote);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}DI.exports=ate});var rp=d((pve,xI)=>{var ste=Dd(),ute=E_(),cte=Zr(),lte=qe(),fte=II();function dte(t,e){var r=lte(t)?ste:ute;return r(t,fte(cte(e,3)))}xI.exports=dte});var LI=d((hve,qI)=>{var pte=Nd(),hte=__(),mte=T_(),gte=Cs(),yte=Ps(),vte=kd(),_te=200;function Tte(t,e,r,n){var i=-1,o=hte,a=!0,s=t.length,u=[],c=e.length;if(!s)return u;r&&(e=gte(e,yte(r))),n?(o=mte,a=!1):e.length>=_te&&(o=vte,a=!1,e=new pte(e));e:for(;++i<s;){var l=t[i],f=r==null?l:r(l);if(l=n||l!==0?l:0,a&&f===f){for(var h=c;h--;)if(e[h]===f)continue e;u.push(l)}else o(e,f,n)||u.push(l)}return u}qI.exports=Tte});var $I=d((mve,MI)=>{var Rte=Cn(),bte=Sn();function Ate(t){return bte(t)&&Rte(t)}MI.exports=Ate});var np=d((gve,jI)=>{var Pte=LI(),Ste=Jd(),Cte=Hd(),FI=$I(),Ete=Cte(function(t,e){return FI(t)?Pte(t,Ste(e,1,FI,!0)):[]});jI.exports=Ete});var GI=d((yve,UI)=>{var Nte=Vd(),kte=$s(),wte=Math.max;function Ote(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:kte(r);return i<0&&(i=wte(n+i,0)),Nte(t,e,i)}UI.exports=Ote});var WI=d((vve,HI)=>{var Dte=Zr(),Ite=Cn(),xte=xr();function qte(t){return function(e,r,n){var i=Object(e);if(!Ite(e)){var o=Dte(r,3);e=xte(e),r=function(s){return o(i[s],s,i)}}var a=t(e,r,n);return a>-1?i[o?e[a]:a]:void 0}}HI.exports=qte});var KI=d((_ve,BI)=>{var Lte=g_(),Mte=Zr(),$te=$s(),Fte=Math.max;function jte(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:$te(r);return i<0&&(i=Fte(n+i,0)),Lte(t,Mte(e,3),i)}BI.exports=jte});var ip=d((Tve,zI)=>{var Ute=WI(),Gte=KI(),Hte=Ute(Gte);zI.exports=Hte});var Ic=d((Rve,VI)=>{var Wte=Dd(),Bte=E_(),Kte=Zr(),zte=qe();function Vte(t,e){var r=zte(t)?Wte:Bte;return r(t,Kte(e,3))}VI.exports=Vte});var N_=d((bve,YI)=>{var Xte=Hd(),Yte=Es(),Jte=Nc(),Qte=Sc(),XI=Object.prototype,Zte=XI.hasOwnProperty,ere=Xte(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Jte(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],a=Qte(o),s=-1,u=a.length;++s<u;){var c=a[s],l=t[c];(l===void 0||Yte(l,XI[c])&&!Zte.call(t,c))&&(t[c]=o[c])}return t});YI.exports=ere});var QI=d((Ave,JI)=>{function tre(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}JI.exports=tre});var ex=d((Pve,ZI)=>{function rre(t,e,r,n,i){return i(t,function(o,a,s){r=n?(n=!1,o):e(r,o,a,s)}),r}ZI.exports=rre});var Ii=d((Sve,tx)=>{var nre=QI(),ire=go(),ore=Zr(),are=ex(),sre=qe();function ure(t,e,r){var n=sre(t)?nre:are,i=arguments.length<3;return n(t,ore(e,4),r,i,ire)}tx.exports=ure});var ap=d(Gs=>{"use strict";Object.defineProperty(Gs,"__esModule",{value:!0});Gs.clearRegExpParserCache=Gs.getRegExpAst=void 0;var cre=nc(),op={},lre=new cre.RegExpParser;function fre(t){var e=t.toString();if(op.hasOwnProperty(e))return op[e];var r=lre.pattern(e);return op[e]=r,r}Gs.getRegExpAst=fre;function dre(){op={}}Gs.clearRegExpParserCache=dre});var sx=d(or=>{"use strict";var pre=or&&or.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Hs=or&&or.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(or,"__esModule",{value:!0});or.canMatchCharCode=or.firstCharOptimizedIndices=or.getOptimizedStartCodesIndices=or.failedOptimizationPrefixMsg=void 0;var ix=nc(),hre=Hs(qe()),mre=Hs(Oc()),gre=Hs(Gt()),k_=Hs(ip()),yre=Hs(zn()),O_=Hs(Di()),rx=Ms(),ox=ap(),xi=D_(),ax="Complement Sets are not supported for first char optimization";or.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function vre(t,e){e===void 0&&(e=!1);try{var r=(0,ox.getRegExpAst)(t),n=up(r.value,{},r.flags.ignoreCase);return n}catch(o){if(o.message===ax)e&&(0,rx.PRINT_WARNING)("".concat(or.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,rx.PRINT_ERROR)("".concat(or.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(ix.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}or.getOptimizedStartCodesIndices=vre;function up(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)up(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var o=i[n];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var a=o;switch(a.type){case"Character":sp(a.value,e,r);break;case"Set":if(a.complement===!0)throw Error(ax);(0,gre.default)(a.value,function(c){if(typeof c=="number")sp(c,e,r);else{var l=c;if(r===!0)for(var f=l.from;f<=l.to;f++)sp(f,e,r);else{for(var f=l.from;f<=l.to&&f<xi.minOptimizationVal;f++)sp(f,e,r);if(l.to>=xi.minOptimizationVal)for(var h=l.from>=xi.minOptimizationVal?l.from:xi.minOptimizationVal,y=l.to,m=(0,xi.charCodeToOptimizedIndex)(h),R=(0,xi.charCodeToOptimizedIndex)(y),E=m;E<=R;E++)e[E]=E}}});break;case"Group":up(a.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=a.quantifier!==void 0&&a.quantifier.atLeast===0;if(a.type==="Group"&&w_(a)===!1||a.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,yre.default)(e)}or.firstCharOptimizedIndices=up;function sp(t,e,r){var n=(0,xi.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&_re(t,e)}function _re(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,xi.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var o=r.toLowerCase();if(o!==r){var i=(0,xi.charCodeToOptimizedIndex)(o.charCodeAt(0));e[i]=i}}}function nx(t,e){return(0,k_.default)(t.value,function(r){if(typeof r=="number")return(0,O_.default)(e,r);var n=r;return(0,k_.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function w_(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,hre.default)(t.value)?(0,mre.default)(t.value,w_):w_(t.value):!1}var Tre=function(t){pre(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,O_.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?nx(r,this.targetCharCodes)===void 0&&(this.found=!0):nx(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(ix.BaseRegExpVisitor);function Rre(t,e){if(e instanceof RegExp){var r=(0,ox.getRegExpAst)(e),n=new Tre(t);return n.visit(r),n.found}else return(0,k_.default)(e,function(i){return(0,O_.default)(t,i.charCodeAt(0))})!==void 0}or.canMatchCharCode=Rre});var D_=d(H=>{"use strict";var lx=H&&H.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ht=H&&H.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(H,"__esModule",{value:!0});H.charCodeToOptimizedIndex=H.minOptimizationVal=H.buildLineBreakIssueMessage=H.LineTerminatorOptimizedTester=H.isShortPattern=H.isCustomPattern=H.cloneEmptyGroups=H.performWarningRuntimeChecks=H.performRuntimeChecks=H.addStickyFlag=H.addStartOfInput=H.findUnreachablePatterns=H.findModesThatDoNotExist=H.findInvalidGroupType=H.findDuplicatePatterns=H.findUnsupportedFlags=H.findStartOfInputAnchor=H.findEmptyMatchRegExps=H.findEndOfInputAnchor=H.findInvalidPatterns=H.findMissingPatterns=H.validatePatterns=H.analyzeTokenTypes=H.enableSticky=H.disableSticky=H.SUPPORT_STICKY=H.MODES=H.DEFAULT_MODE=void 0;var fx=nc(),$e=xc(),bre=ht(Us()),dx=ht(Ir()),px=ht(Dc()),lp=ht(qe()),Are=ht(zn()),Pre=ht(En()),hx=ht(rp()),mx=ht(np()),ux=ht(GI()),at=ht(Ut()),qi=ht(Gt()),Li=ht(Ec()),dp=ht(Ts()),x_=ht(ua()),Sre=ht(ip()),ar=ht(qr()),Cre=ht(xr()),yo=ht(p_()),Zn=ht(Ic()),Ere=ht(N_()),fp=ht(Ii()),pp=ht(Di()),cx=Ms(),Ws=sx(),gx=ap(),ca="PATTERN";H.DEFAULT_MODE="defaultMode";H.MODES="modes";H.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function Nre(){H.SUPPORT_STICKY=!1}H.disableSticky=Nre;function kre(){H.SUPPORT_STICKY=!0}H.enableSticky=kre;function wre(t,e){e=(0,Ere.default)(e,{useSticky:H.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(A,b){return b()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){jre()});var n;r("Reject Lexer.NA",function(){n=(0,hx.default)(t,function(A){return A[ca]===$e.Lexer.NA})});var i=!1,o;r("Transform Patterns",function(){i=!1,o=(0,at.default)(n,function(A){var b=A[ca];if((0,yo.default)(b)){var O=b.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!b.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,pp.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?L_(b):q_(b)}else{if((0,dp.default)(b))return i=!0,{exec:b};if(typeof b=="object")return i=!0,b;if(typeof b=="string"){if(b.length===1)return b;var $=b.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp($);return e.useSticky?L_(W):q_(W)}else throw Error("non exhaustive match")}})});var a,s,u,c,l;r("misc mapping",function(){a=(0,at.default)(n,function(A){return A.tokenTypeIdx}),s=(0,at.default)(n,function(A){var b=A.GROUP;if(b!==$e.Lexer.SKIPPED){if((0,Li.default)(b))return b;if((0,x_.default)(b))return!1;throw Error("non exhaustive match")}}),u=(0,at.default)(n,function(A){var b=A.LONGER_ALT;if(b){var O=(0,lp.default)(b)?(0,at.default)(b,function($){return(0,ux.default)(n,$)}):[(0,ux.default)(n,b)];return O}}),c=(0,at.default)(n,function(A){return A.PUSH_MODE}),l=(0,at.default)(n,function(A){return(0,ar.default)(A,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var A=wx(e.lineTerminatorCharacters);f=(0,at.default)(n,function(b){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,at.default)(n,function(b){return(0,ar.default)(b,"LINE_BREAKS")?!!b.LINE_BREAKS:Nx(b,A)===!1&&(0,Ws.canMatchCharCode)(A,b.PATTERN)}))});var h,y,m,R;r("Misc Mapping #2",function(){h=(0,at.default)(n,$_),y=(0,at.default)(o,Ex),m=(0,fp.default)(n,function(A,b){var O=b.GROUP;return(0,Li.default)(O)&&O!==$e.Lexer.SKIPPED&&(A[O]=[]),A},{}),R=(0,at.default)(o,function(A,b){return{pattern:o[b],longerAlt:u[b],canLineTerminator:f[b],isCustom:h[b],short:y[b],group:s[b],push:c[b],pop:l[b],tokenTypeIdx:a[b],tokenType:n[b]}})});var E=!0,S=[];return e.safeMode||r("First Char Optimization",function(){S=(0,fp.default)(n,function(A,b,O){if(typeof b.PATTERN=="string"){var $=b.PATTERN.charCodeAt(0),W=M_($);I_(A,W,R[O])}else if((0,lp.default)(b.START_CHARS_HINT)){var Z;(0,qi.default)(b.START_CHARS_HINT,function(Ne){var Ye=typeof Ne=="string"?Ne.charCodeAt(0):Ne,K=M_(Ye);Z!==K&&(Z=K,I_(A,K,R[O]))})}else if((0,yo.default)(b.PATTERN))if(b.PATTERN.unicode)E=!1,e.ensureOptimizations&&(0,cx.PRINT_ERROR)("".concat(Ws.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(b.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var Ee=(0,Ws.getOptimizedStartCodesIndices)(b.PATTERN,e.ensureOptimizations);(0,dx.default)(Ee)&&(E=!1),(0,qi.default)(Ee,function(Ne){I_(A,Ne,R[O])})}else e.ensureOptimizations&&(0,cx.PRINT_ERROR)("".concat(Ws.failedOptimizationPrefixMsg)+"	TokenType: <".concat(b.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),E=!1;return A},[])}),{emptyGroups:m,patternIdxToConfig:R,charCodeToPatternIdxToConfig:S,hasCustom:i,canBeOptimized:E}}H.analyzeTokenTypes=wre;function Ore(t,e){var r=[],n=yx(t);r=r.concat(n.errors);var i=vx(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(Dre(o)),r=r.concat(Px(o)),r=r.concat(Sx(o,e)),r=r.concat(Cx(o)),r}H.validatePatterns=Ore;function Dre(t){var e=[],r=(0,Zn.default)(t,function(n){return(0,yo.default)(n[ca])});return e=e.concat(_x(r)),e=e.concat(Rx(r)),e=e.concat(bx(r)),e=e.concat(Ax(r)),e=e.concat(Tx(r)),e}function yx(t){var e=(0,Zn.default)(t,function(i){return!(0,ar.default)(i,ca)}),r=(0,at.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:$e.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,mx.default)(t,e);return{errors:r,valid:n}}H.findMissingPatterns=yx;function vx(t){var e=(0,Zn.default)(t,function(i){var o=i[ca];return!(0,yo.default)(o)&&!(0,dp.default)(o)&&!(0,ar.default)(o,"exec")&&!(0,Li.default)(o)}),r=(0,at.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:$e.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,mx.default)(t,e);return{errors:r,valid:n}}H.findInvalidPatterns=vx;var Ire=/[^\\][$]/;function _x(t){var e=function(i){lx(o,i);function o(){var a=i!==null&&i.apply(this,arguments)||this;return a.found=!1,a}return o.prototype.visitEndAnchor=function(a){this.found=!0},o}(fx.BaseRegExpVisitor),r=(0,Zn.default)(t,function(i){var o=i.PATTERN;try{var a=(0,gx.getRegExpAst)(o),s=new e;return s.visit(a),s.found}catch{return Ire.test(o.source)}}),n=(0,at.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:$e.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}H.findEndOfInputAnchor=_x;function Tx(t){var e=(0,Zn.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,at.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:$e.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}H.findEmptyMatchRegExps=Tx;var xre=/[^\\[][\^]|^\^/;function Rx(t){var e=function(i){lx(o,i);function o(){var a=i!==null&&i.apply(this,arguments)||this;return a.found=!1,a}return o.prototype.visitStartAnchor=function(a){this.found=!0},o}(fx.BaseRegExpVisitor),r=(0,Zn.default)(t,function(i){var o=i.PATTERN;try{var a=(0,gx.getRegExpAst)(o),s=new e;return s.visit(a),s.found}catch{return xre.test(o.source)}}),n=(0,at.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:$e.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}H.findStartOfInputAnchor=Rx;function bx(t){var e=(0,Zn.default)(t,function(n){var i=n[ca];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,at.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:$e.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}H.findUnsupportedFlags=bx;function Ax(t){var e=[],r=(0,at.default)(t,function(o){return(0,fp.default)(t,function(a,s){return o.PATTERN.source===s.PATTERN.source&&!(0,pp.default)(e,s)&&s.PATTERN!==$e.Lexer.NA&&(e.push(s),a.push(s)),a},[])});r=(0,px.default)(r);var n=(0,Zn.default)(r,function(o){return o.length>1}),i=(0,at.default)(n,function(o){var a=(0,at.default)(o,function(u){return u.name}),s=(0,bre.default)(o).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(a.join(", ")," <-"),type:$e.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}});return i}H.findDuplicatePatterns=Ax;function Px(t){var e=(0,Zn.default)(t,function(n){if(!(0,ar.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==$e.Lexer.SKIPPED&&i!==$e.Lexer.NA&&!(0,Li.default)(i)}),r=(0,at.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:$e.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}H.findInvalidGroupType=Px;function Sx(t,e){var r=(0,Zn.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,pp.default)(e,i.PUSH_MODE)}),n=(0,at.default)(r,function(i){var o="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:o,type:$e.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}H.findModesThatDoNotExist=Sx;function Cx(t){var e=[],r=(0,fp.default)(t,function(n,i,o){var a=i.PATTERN;return a===$e.Lexer.NA||((0,Li.default)(a)?n.push({str:a,idx:o,tokenType:i}):(0,yo.default)(a)&&Lre(a)&&n.push({str:a.source,idx:o,tokenType:i})),n},[]);return(0,qi.default)(t,function(n,i){(0,qi.default)(r,function(o){var a=o.str,s=o.idx,u=o.tokenType;if(i<s&&qre(a,n.PATTERN)){var c="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:$e.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}H.findUnreachablePatterns=Cx;function qre(t,e){if((0,yo.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,dp.default)(e))return e(t,0,[],{});if((0,ar.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function Lre(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,Sre.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function q_(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}H.addStartOfInput=q_;function L_(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}H.addStickyFlag=L_;function Mre(t,e,r){var n=[];return(0,ar.default)(t,H.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+H.DEFAULT_MODE+`> property in its definition
`,type:$e.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,ar.default)(t,H.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+H.MODES+`> property in its definition
`,type:$e.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,ar.default)(t,H.MODES)&&(0,ar.default)(t,H.DEFAULT_MODE)&&!(0,ar.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(H.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:$e.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,ar.default)(t,H.MODES)&&(0,qi.default)(t.modes,function(i,o){(0,qi.default)(i,function(a,s){if((0,x_.default)(a))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(o,"> at index: <").concat(s,`>
`),type:$e.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,ar.default)(a,"LONGER_ALT")){var u=(0,lp.default)(a.LONGER_ALT)?a.LONGER_ALT:[a.LONGER_ALT];(0,qi.default)(u,function(c){!(0,x_.default)(c)&&!(0,pp.default)(i,c)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(c.name,"> on token <").concat(a.name,"> outside of mode <").concat(o,`>
`),type:$e.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}H.performRuntimeChecks=Mre;function $re(t,e,r){var n=[],i=!1,o=(0,px.default)((0,Pre.default)((0,Are.default)(t.modes))),a=(0,hx.default)(o,function(u){return u[ca]===$e.Lexer.NA}),s=wx(r);return e&&(0,qi.default)(a,function(u){var c=Nx(u,s);if(c!==!1){var l=kx(u,c),f={message:l,type:c.issue,tokenType:u};n.push(f)}else(0,ar.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,Ws.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:$e.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}H.performWarningRuntimeChecks=$re;function Fre(t){var e={},r=(0,Cre.default)(t);return(0,qi.default)(r,function(n){var i=t[n];if((0,lp.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}H.cloneEmptyGroups=Fre;function $_(t){var e=t.PATTERN;if((0,yo.default)(e))return!1;if((0,dp.default)(e))return!0;if((0,ar.default)(e,"exec"))return!0;if((0,Li.default)(e))return!1;throw Error("non exhaustive match")}H.isCustomPattern=$_;function Ex(t){return(0,Li.default)(t)&&t.length===1?t.charCodeAt(0):!1}H.isShortPattern=Ex;H.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function Nx(t,e){if((0,ar.default)(t,"LINE_BREAKS"))return!1;if((0,yo.default)(t.PATTERN)){try{(0,Ws.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:$e.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,Li.default)(t.PATTERN))return!1;if($_(t))return{issue:$e.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function kx(t,e){if(e.issue===$e.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===$e.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}H.buildLineBreakIssueMessage=kx;function wx(t){var e=(0,at.default)(t,function(r){return(0,Li.default)(r)?r.charCodeAt(0):r});return e}function I_(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}H.minOptimizationVal=256;var cp=[];function M_(t){return t<H.minOptimizationVal?t:cp[t]}H.charCodeToOptimizedIndex=M_;function jre(){if((0,dx.default)(cp)){cp=new Array(65536);for(var t=0;t<65536;t++)cp[t]=t>255?255+~~(t/255):t}}});var hp=d((kve,Ox)=>{function Ure(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}Ox.exports=Ure});var fa=d(ue=>{"use strict";var ei=ue&&ue.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ue,"__esModule",{value:!0});ue.isTokenType=ue.hasExtendingTokensTypesMapProperty=ue.hasExtendingTokensTypesProperty=ue.hasCategoriesProperty=ue.hasShortKeyProperty=ue.singleAssignCategoriesToksMap=ue.assignCategoriesMapProp=ue.assignCategoriesTokensProp=ue.assignTokenDefaultProps=ue.expandCategories=ue.augmentTokenTypes=ue.tokenIdxToClass=ue.tokenShortNameIdx=ue.tokenStructuredMatcherNoCategories=ue.tokenStructuredMatcher=void 0;var Gre=ei(Ir()),Hre=ei(Dc()),Wre=ei(qe()),Bre=ei(En()),Kre=ei(np()),zre=ei(Ut()),la=ei(Gt()),qc=ei(qr()),Vre=ei(Di()),Xre=ei(wi());function Yre(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}ue.tokenStructuredMatcher=Yre;function Jre(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}ue.tokenStructuredMatcherNoCategories=Jre;ue.tokenShortNameIdx=1;ue.tokenIdxToClass={};function Qre(t){var e=Dx(t);Ix(e),qx(e),xx(e),(0,la.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}ue.augmentTokenTypes=Qre;function Dx(t){for(var e=(0,Xre.default)(t),r=t,n=!0;n;){r=(0,Hre.default)((0,Bre.default)((0,zre.default)(r,function(o){return o.CATEGORIES})));var i=(0,Kre.default)(r,e);e=e.concat(i),(0,Gre.default)(i)?n=!1:r=i}return e}ue.expandCategories=Dx;function Ix(t){(0,la.default)(t,function(e){Lx(e)||(ue.tokenIdxToClass[ue.tokenShortNameIdx]=e,e.tokenTypeIdx=ue.tokenShortNameIdx++),F_(e)&&!(0,Wre.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),F_(e)||(e.CATEGORIES=[]),Mx(e)||(e.categoryMatches=[]),$x(e)||(e.categoryMatchesMap={})})}ue.assignTokenDefaultProps=Ix;function xx(t){(0,la.default)(t,function(e){e.categoryMatches=[],(0,la.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(ue.tokenIdxToClass[n].tokenTypeIdx)})})}ue.assignCategoriesTokensProp=xx;function qx(t){(0,la.default)(t,function(e){j_([],e)})}ue.assignCategoriesMapProp=qx;function j_(t,e){(0,la.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,la.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,Vre.default)(n,r)||j_(n,r)})}ue.singleAssignCategoriesToksMap=j_;function Lx(t){return(0,qc.default)(t,"tokenTypeIdx")}ue.hasShortKeyProperty=Lx;function F_(t){return(0,qc.default)(t,"CATEGORIES")}ue.hasCategoriesProperty=F_;function Mx(t){return(0,qc.default)(t,"categoryMatches")}ue.hasExtendingTokensTypesProperty=Mx;function $x(t){return(0,qc.default)(t,"categoryMatchesMap")}ue.hasExtendingTokensTypesMapProperty=$x;function Zre(t){return(0,qc.default)(t,"tokenTypeIdx")}ue.isTokenType=Zre});var U_=d(mp=>{"use strict";Object.defineProperty(mp,"__esModule",{value:!0});mp.defaultLexerErrorProvider=void 0;mp.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var xc=d($i=>{"use strict";var Lr=$i&&$i.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($i,"__esModule",{value:!0});$i.Lexer=$i.LexerDefinitionErrorType=void 0;var Mi=D_(),G_=Lr(Qd()),gp=Lr(Ir()),ene=Lr(qe()),tne=Lr(hp()),rne=Lr(rp()),Fx=Lr(Ut()),H_=Lr(Gt()),nne=Lr(xr()),ine=Lr(ua()),jx=Lr(sa()),Ux=Lr(kc()),one=Lr(Ii()),Gx=Lr(wi()),W_=Ms(),ane=fa(),sne=U_(),une=ap(),cne;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(cne=$i.LexerDefinitionErrorType||($i.LexerDefinitionErrorType={}));var Lc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:sne.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Lc);var lne=function(){function t(e,r){r===void 0&&(r=Lc);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(o,a){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(o,">"));var u=(0,W_.timer)(a),c=u.time,l=u.value,f=c>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(o,"> time: ").concat(c,"ms")),n.traceInitIndent--,l}else return a()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,Ux.default)({},Lc,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var o,a=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===Lc.lineTerminatorsPattern)n.config.lineTerminatorsPattern=Mi.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===Lc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,ene.default)(e)?o={modes:{defaultMode:(0,Gx.default)(e)},defaultMode:Mi.DEFAULT_MODE}:(a=!1,o=(0,Gx.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Mi.performRuntimeChecks)(o,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,Mi.performWarningRuntimeChecks)(o,n.trackStartLines,n.config.lineTerminatorCharacters))})),o.modes=o.modes?o.modes:{},(0,H_.default)(o.modes,function(l,f){o.modes[f]=(0,rne.default)(l,function(h){return(0,ine.default)(h)})});var s=(0,nne.default)(o.modes);if((0,H_.default)(o.modes,function(l,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Mi.validatePatterns)(l,s))}),(0,gp.default)(n.lexerDefinitionErrors)){(0,ane.augmentTokenTypes)(l);var h;n.TRACE_INIT("analyzeTokenTypes",function(){h=(0,Mi.analyzeTokenTypes)(l,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=h.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=h.charCodeToPatternIdxToConfig,n.emptyGroups=(0,Ux.default)({},n.emptyGroups,h.emptyGroups),n.hasCustom=h.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=h.canBeOptimized}})}),n.defaultMode=o.defaultMode,!(0,gp.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,Fx.default)(n.lexerDefinitionErrors,function(l){return l.message}),c=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}(0,H_.default)(n.lexerDefinitionWarning,function(l){(0,W_.PRINT_WARNING)(l.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(Mi.SUPPORT_STICKY?(n.chopInput=jx.default,n.match=n.matchWithTest):(n.updateLastIndex=G_.default,n.match=n.matchWithExec),a&&(n.handleModes=G_.default),n.trackStartLines===!1&&(n.computeNewColumn=jx.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=G_.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var l=(0,one.default)(n.canModeBeOptimized,function(f,h,y){return h===!1&&f.push(y),f},[]);if(r.ensureOptimizations&&!(0,gp.default)(l))throw Error("Lexer Modes: < ".concat(l.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,une.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,W_.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,gp.default)(this.lexerDefinitionErrors)){var n=(0,Fx.default)(this.lexerDefinitionErrors,function(o){return o.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,o,a,s,u,c,l,f,h,y,m,R,E,S,A,b,O=e,$=O.length,W=0,Z=0,Ee=this.hasCustom?0:Math.floor(e.length/10),Ne=new Array(Ee),Ye=[],K=this.trackStartLines?1:void 0,ce=this.trackStartLines?1:void 0,L=(0,Mi.cloneEmptyGroups)(this.emptyGroups),q=this.trackStartLines,F=this.config.lineTerminatorsPattern,B=0,ne=[],ie=[],J=[],lt=[];Object.freeze(lt);var Ze;function Dt(){return ne}function on(qt){var sn=(0,Mi.charCodeToOptimizedIndex)(qt),un=ie[sn];return un===void 0?lt:un}var wr=function(qt){if(J.length===1&&qt.tokenType.PUSH_MODE===void 0){var sn=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(qt);Ye.push({offset:qt.startOffset,line:qt.startLine,column:qt.startColumn,length:qt.image.length,message:sn})}else{J.pop();var un=(0,tne.default)(J);ne=n.patternIdxToConfig[un],ie=n.charCodeToPatternIdxToConfig[un],B=ne.length;var Ln=n.canModeBeOptimized[un]&&n.config.safeMode===!1;ie&&Ln?Ze=on:Ze=Dt}};function Sa(qt){J.push(qt),ie=this.charCodeToPatternIdxToConfig[qt],ne=this.patternIdxToConfig[qt],B=ne.length,B=ne.length;var sn=this.canModeBeOptimized[qt]&&this.config.safeMode===!1;ie&&sn?Ze=on:Ze=Dt}Sa.call(this,r);for(var ur,Ca=this.config.recoveryEnabled;W<$;){c=null;var Ea=O.charCodeAt(W),Na=Ze(Ea),bu=Na.length;for(i=0;i<bu;i++){ur=Na[i];var mt=ur.pattern;l=null;var fi=ur.short;if(fi!==!1?Ea===fi&&(c=mt):ur.isCustom===!0?(b=mt.exec(O,W,Ne,L),b!==null?(c=b[0],b.payload!==void 0&&(l=b.payload)):c=null):(this.updateLastIndex(mt,W),c=this.match(mt,e,W)),c!==null){if(u=ur.longerAlt,u!==void 0){var Au=u.length;for(a=0;a<Au;a++){var In=ne[u[a]],qo=In.pattern;if(f=null,In.isCustom===!0?(b=qo.exec(O,W,Ne,L),b!==null?(s=b[0],b.payload!==void 0&&(f=b.payload)):s=null):(this.updateLastIndex(qo,W),s=this.match(qo,e,W)),s&&s.length>c.length){c=s,l=f,ur=In;break}}}break}}if(c!==null){if(h=c.length,y=ur.group,y!==void 0&&(m=ur.tokenTypeIdx,R=this.createTokenInstance(c,W,m,ur.tokenType,K,ce,h),this.handlePayload(R,l),y===!1?Z=this.addToken(Ne,Z,R):L[y].push(R)),e=this.chopInput(e,h),W=W+h,ce=this.computeNewColumn(ce,h),q===!0&&ur.canLineTerminator===!0){var xn=0,Lo=void 0,Fr=void 0;F.lastIndex=0;do Lo=F.test(c),Lo===!0&&(Fr=F.lastIndex-1,xn++);while(Lo===!0);xn!==0&&(K=K+xn,ce=h-Fr,this.updateTokenEndLineColumnLocation(R,y,Fr,xn,K,ce,h))}this.handleModes(ur,wr,Sa,R)}else{for(var an=W,ka=K,wa=ce,Or=Ca===!1;Or===!1&&W<$;)for(e=this.chopInput(e,1),W++,o=0;o<B;o++){var qn=ne[o],mt=qn.pattern,fi=qn.short;if(fi!==!1?O.charCodeAt(W)===fi&&(Or=!0):qn.isCustom===!0?Or=mt.exec(O,W,Ne,L)!==null:(this.updateLastIndex(mt,W),Or=mt.exec(e)!==null),Or===!0)break}if(E=W-an,A=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,an,E,ka,wa),Ye.push({offset:an,line:ka,column:wa,length:E,message:A}),Ca===!1)break}}return this.hasCustom||(Ne.length=Z),{tokens:Ne,groups:L,errors:Ye}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,o,a,s){var u,c;r!==void 0&&(u=n===s-1,c=u?-1:0,i===1&&u===!0||(e.endLine=o+c,e.endColumn=a-1+-c))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,o,a){return{image:e,startOffset:r,startLine:o,startColumn:a,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,o,a,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:o,endLine:o,startColumn:a,endColumn:a+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();$i.Lexer=lne});var da=d(xt=>{"use strict";var B_=xt&&xt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(xt,"__esModule",{value:!0});xt.tokenMatcher=xt.createTokenInstance=xt.EOF=xt.createToken=xt.hasTokenLabel=xt.tokenName=xt.tokenLabel=void 0;var fne=B_(Ec()),Fi=B_(qr()),dne=B_(ua()),pne=xc(),K_=fa();function hne(t){return Jx(t)?t.LABEL:t.name}xt.tokenLabel=hne;function mne(t){return t.name}xt.tokenName=mne;function Jx(t){return(0,fne.default)(t.LABEL)&&t.LABEL!==""}xt.hasTokenLabel=Jx;var gne="parent",Hx="categories",Wx="label",Bx="group",Kx="push_mode",zx="pop_mode",Vx="longer_alt",Xx="line_breaks",Yx="start_chars_hint";function Qx(t){return yne(t)}xt.createToken=Qx;function yne(t){var e=t.pattern,r={};if(r.name=t.name,(0,dne.default)(e)||(r.PATTERN=e),(0,Fi.default)(t,gne))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,Fi.default)(t,Hx)&&(r.CATEGORIES=t[Hx]),(0,K_.augmentTokenTypes)([r]),(0,Fi.default)(t,Wx)&&(r.LABEL=t[Wx]),(0,Fi.default)(t,Bx)&&(r.GROUP=t[Bx]),(0,Fi.default)(t,zx)&&(r.POP_MODE=t[zx]),(0,Fi.default)(t,Kx)&&(r.PUSH_MODE=t[Kx]),(0,Fi.default)(t,Vx)&&(r.LONGER_ALT=t[Vx]),(0,Fi.default)(t,Xx)&&(r.LINE_BREAKS=t[Xx]),(0,Fi.default)(t,Yx)&&(r.START_CHARS_HINT=t[Yx]),r}xt.EOF=Qx({name:"EOF",pattern:pne.Lexer.NA});(0,K_.augmentTokenTypes)([xt.EOF]);function vne(t,e,r,n,i,o,a,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:a,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}xt.createTokenInstance=vne;function _ne(t,e){return(0,K_.tokenStructuredMatcher)(t,e)}xt.tokenMatcher=_ne});var Ks=d(Nn=>{"use strict";var X_=Nn&&Nn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Nn,"__esModule",{value:!0});Nn.defaultGrammarValidatorErrorProvider=Nn.defaultGrammarResolverErrorProvider=Nn.defaultParserErrorProvider=void 0;var Bs=da(),V_=X_(Us()),vo=X_(Ut()),Tne=X_(Ii()),z_=_t(),Zx=_t();Nn.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,o=(0,Bs.hasTokenLabel)(e),a=o?"--> ".concat((0,Bs.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(a," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,o=t.ruleName,a="Expecting: ",s=(0,V_.default)(r).image,u=`
but found: '`+s+"'";if(i)return a+i+u;var c=(0,Tne.default)(e,function(y,m){return y.concat(m)},[]),l=(0,vo.default)(c,function(y){return"[".concat((0,vo.default)(y,function(m){return(0,Bs.tokenLabel)(m)}).join(", "),"]")}),f=(0,vo.default)(l,function(y,m){return"  ".concat(m+1,". ").concat(y)}),h=`one of these possible Token sequences:
`.concat(f.join(`
`));return a+h+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,o="Expecting: ",a=(0,V_.default)(r).image,s=`
but found: '`+a+"'";if(n)return o+n+s;var u=(0,vo.default)(e,function(l){return"[".concat((0,vo.default)(l,function(f){return(0,Bs.tokenLabel)(f)}).join(","),"]")}),c=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return o+c+s}};Object.freeze(Nn.defaultParserErrorProvider);Nn.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};Nn.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(l){return l instanceof z_.Terminal?l.terminalType.name:l instanceof z_.NonTerminal?l.nonTerminalName:""}var n=t.name,i=(0,V_.default)(e),o=i.idx,a=(0,Zx.getProductionDslName)(i),s=r(i),u=o>0,c="->".concat(a).concat(u?o:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return c=c.replace(/[ \t]+/g," "),c=c.replace(/\s\s+/g,`
`),c},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,vo.default)(t.prefixPath,function(i){return(0,Bs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,vo.default)(t.prefixPath,function(i){return(0,Bs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,Zx.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,vo.default)(t.leftRecursionPath,function(o){return o.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof z_.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var rq=d(ti=>{"use strict";var Rne=ti&&ti.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),eq=ti&&ti.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ti,"__esModule",{value:!0});ti.GastRefResolverVisitor=ti.resolveGrammar=void 0;var bne=Cr(),Ane=eq(Gt()),Pne=eq(zn()),Sne=_t();function Cne(t,e){var r=new tq(t,e);return r.resolveRefs(),r.errors}ti.resolveGrammar=Cne;var tq=function(t){Rne(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,Ane.default)((0,Pne.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:bne.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(Sne.GAstVisitor);ti.GastRefResolverVisitor=tq});var iq=d((Lve,nq)=>{function Ene(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var a=t[i];e(n,a,r(a),t)}return n}nq.exports=Ene});var aq=d((Mve,oq)=>{var Nne=go();function kne(t,e,r,n){return Nne(t,function(i,o,a){e(n,i,r(i),a)}),n}oq.exports=kne});var uq=d(($ve,sq)=>{var wne=iq(),One=aq(),Dne=Zr(),Ine=qe();function xne(t,e){return function(r,n){var i=Ine(r)?wne:One,o=e?e():{};return i(r,t,Dne(n,2),o)}}sq.exports=xne});var Y_=d((Fve,cq)=>{var qne=Md(),Lne=uq(),Mne=Object.prototype,$ne=Mne.hasOwnProperty,Fne=Lne(function(t,e,r){$ne.call(t,r)?t[r].push(e):qne(t,r,[e])});cq.exports=Fne});var yp=d((jve,lq)=>{var jne=Jd(),Une=Ut();function Gne(t,e){return jne(Une(t,e),1)}lq.exports=Gne});var vp=d((Uve,fq)=>{var Hne=Ud(),Wne=$s();function Bne(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Wne(e),e=n-e,Hne(t,0,e<0?0:e)):[]}fq.exports=Bne});var $c=d(st=>{"use strict";var ha=st&&st.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ma=st&&st.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(st,"__esModule",{value:!0});st.nextPossibleTokensAfter=st.possiblePathsFrom=st.NextTerminalAfterAtLeastOneSepWalker=st.NextTerminalAfterAtLeastOneWalker=st.NextTerminalAfterManySepWalker=st.NextTerminalAfterManyWalker=st.AbstractNextTerminalAfterProductionWalker=st.NextAfterTokenWalker=st.AbstractNextPossibleTokensWalker=void 0;var pq=Yd(),Tp=ma(Us()),_p=ma(Ir()),dq=ma(vp()),gr=ma(Gd()),Kne=ma(hp()),zne=ma(Gt()),pa=ma(wi()),Vne=S_(),le=_t(),hq=function(t){ha(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,pa.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,pa.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var o=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,o)}},e.prototype.updateExpectedNext=function(){(0,_p.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(pq.RestWalker);st.AbstractNextPossibleTokensWalker=hq;var Xne=function(t){ha(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var o=n.concat(i),a=new le.Alternative({definition:o});this.possibleTokTypes=(0,Vne.first)(a),this.found=!0}},e}(hq);st.NextAfterTokenWalker=Xne;var Mc=function(t){ha(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(pq.RestWalker);st.AbstractNextTerminalAfterProductionWalker=Mc;var Yne=function(t){ha(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var o=(0,Tp.default)(n.concat(i));this.result.isEndOfRule=o===void 0,o instanceof le.Terminal&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(Mc);st.NextTerminalAfterManyWalker=Yne;var Jne=function(t){ha(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var o=(0,Tp.default)(n.concat(i));this.result.isEndOfRule=o===void 0,o instanceof le.Terminal&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(Mc);st.NextTerminalAfterManySepWalker=Jne;var Qne=function(t){ha(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var o=(0,Tp.default)(n.concat(i));this.result.isEndOfRule=o===void 0,o instanceof le.Terminal&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(Mc);st.NextTerminalAfterAtLeastOneWalker=Qne;var Zne=function(t){ha(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var o=(0,Tp.default)(n.concat(i));this.result.isEndOfRule=o===void 0,o instanceof le.Terminal&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(Mc);st.NextTerminalAfterAtLeastOneSepWalker=Zne;function mq(t,e,r){r===void 0&&(r=[]),r=(0,pa.default)(r);var n=[],i=0;function o(c){return c.concat((0,gr.default)(t,i+1))}function a(c){var l=mq(o(c),e,r);return n.concat(l)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof le.Alternative)return a(s.definition);if(s instanceof le.NonTerminal)return a(s.definition);if(s instanceof le.Option)n=a(s.definition);else if(s instanceof le.RepetitionMandatory){var u=s.definition.concat([new le.Repetition({definition:s.definition})]);return a(u)}else if(s instanceof le.RepetitionMandatoryWithSeparator){var u=[new le.Alternative({definition:s.definition}),new le.Repetition({definition:[new le.Terminal({terminalType:s.separator})].concat(s.definition)})];return a(u)}else if(s instanceof le.RepetitionWithSeparator){var u=s.definition.concat([new le.Repetition({definition:[new le.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=a(u)}else if(s instanceof le.Repetition){var u=s.definition.concat([new le.Repetition({definition:s.definition})]);n=a(u)}else{if(s instanceof le.Alternation)return(0,zne.default)(s.definition,function(c){(0,_p.default)(c.definition)===!1&&(n=a(c.definition))}),n;if(s instanceof le.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,gr.default)(t,i)}),n}st.possiblePathsFrom=mq;function eie(t,e,r,n){var i="EXIT_NONE_TERMINAL",o=[i],a="EXIT_ALTERNATIVE",s=!1,u=e.length,c=u-n-1,l=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,_p.default)(f);){var h=f.pop();if(h===a){s&&(0,Kne.default)(f).idx<=c&&f.pop();continue}var y=h.def,m=h.idx,R=h.ruleStack,E=h.occurrenceStack;if(!(0,_p.default)(y)){var S=y[0];if(S===i){var A={idx:m,def:(0,gr.default)(y),ruleStack:(0,dq.default)(R),occurrenceStack:(0,dq.default)(E)};f.push(A)}else if(S instanceof le.Terminal)if(m<u-1){var b=m+1,O=e[b];if(r(O,S.terminalType)){var A={idx:b,def:(0,gr.default)(y),ruleStack:R,occurrenceStack:E};f.push(A)}}else if(m===u-1)l.push({nextTokenType:S.terminalType,nextTokenOccurrence:S.idx,ruleStack:R,occurrenceStack:E}),s=!0;else throw Error("non exhaustive match");else if(S instanceof le.NonTerminal){var $=(0,pa.default)(R);$.push(S.nonTerminalName);var W=(0,pa.default)(E);W.push(S.idx);var A={idx:m,def:S.definition.concat(o,(0,gr.default)(y)),ruleStack:$,occurrenceStack:W};f.push(A)}else if(S instanceof le.Option){var Z={idx:m,def:(0,gr.default)(y),ruleStack:R,occurrenceStack:E};f.push(Z),f.push(a);var Ee={idx:m,def:S.definition.concat((0,gr.default)(y)),ruleStack:R,occurrenceStack:E};f.push(Ee)}else if(S instanceof le.RepetitionMandatory){var Ne=new le.Repetition({definition:S.definition,idx:S.idx}),Ye=S.definition.concat([Ne],(0,gr.default)(y)),A={idx:m,def:Ye,ruleStack:R,occurrenceStack:E};f.push(A)}else if(S instanceof le.RepetitionMandatoryWithSeparator){var K=new le.Terminal({terminalType:S.separator}),Ne=new le.Repetition({definition:[K].concat(S.definition),idx:S.idx}),Ye=S.definition.concat([Ne],(0,gr.default)(y)),A={idx:m,def:Ye,ruleStack:R,occurrenceStack:E};f.push(A)}else if(S instanceof le.RepetitionWithSeparator){var Z={idx:m,def:(0,gr.default)(y),ruleStack:R,occurrenceStack:E};f.push(Z),f.push(a);var K=new le.Terminal({terminalType:S.separator}),ce=new le.Repetition({definition:[K].concat(S.definition),idx:S.idx}),Ye=S.definition.concat([ce],(0,gr.default)(y)),Ee={idx:m,def:Ye,ruleStack:R,occurrenceStack:E};f.push(Ee)}else if(S instanceof le.Repetition){var Z={idx:m,def:(0,gr.default)(y),ruleStack:R,occurrenceStack:E};f.push(Z),f.push(a);var ce=new le.Repetition({definition:S.definition,idx:S.idx}),Ye=S.definition.concat([ce],(0,gr.default)(y)),Ee={idx:m,def:Ye,ruleStack:R,occurrenceStack:E};f.push(Ee)}else if(S instanceof le.Alternation)for(var L=S.definition.length-1;L>=0;L--){var q=S.definition[L],F={idx:m,def:q.definition.concat((0,gr.default)(y)),ruleStack:R,occurrenceStack:E};f.push(F),f.push(a)}else if(S instanceof le.Alternative)f.push({idx:m,def:S.definition.concat((0,gr.default)(y)),ruleStack:R,occurrenceStack:E});else if(S instanceof le.Rule)f.push(tie(S,m,R,E));else throw Error("non exhaustive match")}}return l}st.nextPossibleTokensAfter=eie;function tie(t,e,r,n){var i=(0,pa.default)(r);i.push(t.name);var o=(0,pa.default)(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}});var zs=d(_e=>{"use strict";var _q=_e&&_e.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),va=_e&&_e.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_e,"__esModule",{value:!0});_e.areTokenCategoriesNotUsed=_e.isStrictPrefixOfPath=_e.containsPath=_e.getLookaheadPathsForOptionalProd=_e.getLookaheadPathsForOr=_e.lookAheadSequenceFromAlternatives=_e.buildSingleAlternativeLookaheadFunction=_e.buildAlternativesLookAheadFunc=_e.buildLookaheadFuncForOptionalProd=_e.buildLookaheadFuncForOr=_e.getLookaheadPaths=_e.getProdType=_e.PROD_TYPE=void 0;var Q_=va(Ir()),Tq=va(En()),ya=va(Oc()),Rp=va(Ut()),ga=va(Gt()),gq=va(qr()),Rq=va(Ii()),yq=$c(),rie=Yd(),bp=fa(),_o=_t(),nie=_t(),Nt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(Nt=_e.PROD_TYPE||(_e.PROD_TYPE={}));function bq(t){if(t instanceof _o.Option||t==="Option")return Nt.OPTION;if(t instanceof _o.Repetition||t==="Repetition")return Nt.REPETITION;if(t instanceof _o.RepetitionMandatory||t==="RepetitionMandatory")return Nt.REPETITION_MANDATORY;if(t instanceof _o.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return Nt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof _o.RepetitionWithSeparator||t==="RepetitionWithSeparator")return Nt.REPETITION_WITH_SEPARATOR;if(t instanceof _o.Alternation||t==="Alternation")return Nt.ALTERNATION;throw Error("non exhaustive match")}_e.getProdType=bq;function iie(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,o=bq(n);return o===Nt.ALTERNATION?eT(e,r,i):tT(e,r,o,i)}_e.getLookaheadPaths=iie;function oie(t,e,r,n,i,o){var a=eT(t,e,r),s=rT(a)?bp.tokenStructuredMatcherNoCategories:bp.tokenStructuredMatcher;return o(a,n,s,i)}_e.buildLookaheadFuncForOr=oie;function aie(t,e,r,n,i,o){var a=tT(t,e,i,r),s=rT(a)?bp.tokenStructuredMatcherNoCategories:bp.tokenStructuredMatcher;return o(a[0],s,n)}_e.buildLookaheadFuncForOptionalProd=aie;function sie(t,e,r,n){var i=t.length,o=(0,ya.default)(t,function(u){return(0,ya.default)(u,function(c){return c.length===1})});if(e)return function(u){for(var c=(0,Rp.default)(u,function(b){return b.GATE}),l=0;l<i;l++){var f=t[l],h=f.length,y=c[l];if(y!==void 0&&y.call(this)===!1)continue;e:for(var m=0;m<h;m++){for(var R=f[m],E=R.length,S=0;S<E;S++){var A=this.LA(S+1);if(r(A,R[S])===!1)continue e}return l}}};if(o&&!n){var a=(0,Rp.default)(t,function(u){return(0,Tq.default)(u)}),s=(0,Rq.default)(a,function(u,c,l){return(0,ga.default)(c,function(f){(0,gq.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=l),(0,ga.default)(f.categoryMatches,function(h){(0,gq.default)(u,h)||(u[h]=l)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var c=t[u],l=c.length;e:for(var f=0;f<l;f++){for(var h=c[f],y=h.length,m=0;m<y;m++){var R=this.LA(m+1);if(r(R,h[m])===!1)continue e}return u}}}}_e.buildAlternativesLookAheadFunc=sie;function uie(t,e,r){var n=(0,ya.default)(t,function(c){return c.length===1}),i=t.length;if(n&&!r){var o=(0,Tq.default)(t);if(o.length===1&&(0,Q_.default)(o[0].categoryMatches)){var a=o[0],s=a.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,Rq.default)(o,function(c,l,f){return c[l.tokenTypeIdx]=!0,(0,ga.default)(l.categoryMatches,function(h){c[h]=!0}),c},[]);return function(){var c=this.LA(1);return u[c.tokenTypeIdx]===!0}}}else return function(){e:for(var c=0;c<i;c++){for(var l=t[c],f=l.length,h=0;h<f;h++){var y=this.LA(h+1);if(e(y,l[h])===!1)continue e}return!0}return!1}}_e.buildSingleAlternativeLookaheadFunction=uie;var cie=function(t){_q(e,t);function e(r,n,i){var o=t.call(this)||this;return o.topProd=r,o.targetOccurrence=n,o.targetProdType=i,o}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,o){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(o),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,Nt.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(rie.RestWalker),Aq=function(t){_q(e,t);function e(r,n,i){var o=t.call(this)||this;return o.targetOccurrence=r,o.targetProdType=n,o.targetRef=i,o.result=[],o}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,Nt.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,Nt.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,Nt.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,Nt.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,Nt.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,Nt.ALTERNATION)},e}(nie.GAstVisitor);function vq(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function J_(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],o=0;o<e.length;o++){var a=e[o];i.push(a+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(a+u)}}e=i}return e}function lie(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],o=0;o<e.length;o++){var a=e[o];if(i[a]===!0)return!1}return!0}function Z_(t,e){for(var r=(0,Rp.default)(t,function(l){return(0,yq.possiblePathsFrom)([l],1)}),n=vq(r.length),i=(0,Rp.default)(r,function(l){var f={};return(0,ga.default)(l,function(h){var y=J_(h.partialPath);(0,ga.default)(y,function(m){f[m]=!0})}),f}),o=r,a=1;a<=e;a++){var s=o;o=vq(s.length);for(var u=function(l){for(var f=s[l],h=0;h<f.length;h++){var y=f[h].partialPath,m=f[h].suffixDef,R=J_(y),E=lie(i,R,l);if(E||(0,Q_.default)(m)||y.length===e){var S=n[l];if(Pq(S,y)===!1){S.push(y);for(var A=0;A<R.length;A++){var b=R[A];i[l][b]=!0}}}else{var O=(0,yq.possiblePathsFrom)(m,a+1,y);o[l]=o[l].concat(O),(0,ga.default)(O,function($){var W=J_($.partialPath);(0,ga.default)(W,function(Z){i[l][Z]=!0})})}}},c=0;c<s.length;c++)u(c)}return n}_e.lookAheadSequenceFromAlternatives=Z_;function eT(t,e,r,n){var i=new Aq(t,Nt.ALTERNATION,n);return e.accept(i),Z_(i.result,r)}_e.getLookaheadPathsForOr=eT;function tT(t,e,r,n){var i=new Aq(t,r);e.accept(i);var o=i.result,a=new cie(e,t,r),s=a.startWalking(),u=new _o.Alternative({definition:o}),c=new _o.Alternative({definition:s});return Z_([u,c],n)}_e.getLookaheadPathsForOptionalProd=tT;function Pq(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var o=e[i],a=n[i],s=o===a||a.categoryMatchesMap[o.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}_e.containsPath=Pq;function fie(t,e){return t.length<e.length&&(0,ya.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}_e.isStrictPrefixOfPath=fie;function rT(t){return(0,ya.default)(t,function(e){return(0,ya.default)(e,function(r){return(0,ya.default)(r,function(n){return(0,Q_.default)(n.categoryMatches)})})})}_e.areTokenCategoriesNotUsed=rT});var Uc=d(he=>{"use strict";var iT=he&&he.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),nT=he&&he.__assign||function(){return nT=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},nT.apply(this,arguments)},Ht=he&&he.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(he,"__esModule",{value:!0});he.checkPrefixAlternativesAmbiguities=he.validateSomeNonEmptyLookaheadPath=he.validateTooManyAlts=he.RepetitionCollector=he.validateAmbiguousAlternationAlternatives=he.validateEmptyOrAlternative=he.getFirstNoneTerminal=he.validateNoLeftRecursion=he.validateRuleIsOverridden=he.validateRuleDoesNotAlreadyExist=he.OccurrenceValidationCollector=he.identifyProductionForDuplicates=he.validateGrammar=he.validateLookahead=void 0;var Sq=Ht(Us()),Ap=Ht(Ir()),die=Ht(Gd()),Cq=Ht(En()),pie=Ht(Ic()),hie=Ht(rp()),mie=Ht(np()),To=Ht(Ut()),jc=Ht(Gt()),gie=Ht(Y_()),oT=Ht(Ii()),yie=Ht(h_()),vie=Ht(zn()),aT=Ht(Di()),ji=Ht(yp()),_ie=Ht(wi()),wn=Cr(),sT=_t(),Vs=zs(),Tie=$c(),kn=_t(),uT=_t(),Rie=Ht(vp()),bie=Ht(Dc()),Aie=fa();function Pie(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,To.default)(e,function(r){return nT({type:wn.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}he.validateLookahead=Pie;function Sie(t,e,r,n){var i=(0,ji.default)(t,function(u){return Cie(u,r)}),o=Die(t,e,r),a=(0,ji.default)(t,function(u){return Iq(u,r)}),s=(0,ji.default)(t,function(u){return wq(u,t,n,r)});return i.concat(o,a,s)}he.validateGrammar=Sie;function Cie(t,e){var r=new kq;t.accept(r);var n=r.allProductions,i=(0,gie.default)(n,Eq),o=(0,yie.default)(i,function(s){return s.length>1}),a=(0,To.default)((0,vie.default)(o),function(s){var u=(0,Sq.default)(s),c=e.buildDuplicateFoundError(t,s),l=(0,sT.getProductionDslName)(u),f={message:c,type:wn.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:l,occurrence:u.idx},h=Nq(u);return h&&(f.parameter=h),f});return a}function Eq(t){return"".concat((0,sT.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(Nq(t))}he.identifyProductionForDuplicates=Eq;function Nq(t){return t instanceof kn.Terminal?t.terminalType.name:t instanceof kn.NonTerminal?t.nonTerminalName:""}var kq=function(t){iT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(uT.GAstVisitor);he.OccurrenceValidationCollector=kq;function wq(t,e,r,n){var i=[],o=(0,oT.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(o>1){var a=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:a,type:wn.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}he.validateRuleDoesNotAlreadyExist=wq;function Eie(t,e,r){var n=[],i;return(0,aT.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:wn.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}he.validateRuleIsOverridden=Eie;function Oq(t,e,r,n){n===void 0&&(n=[]);var i=[],o=Fc(e.definition);if((0,Ap.default)(o))return[];var a=t.name,s=(0,aT.default)(o,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:wn.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:a});var u=(0,mie.default)(o,n.concat([t])),c=(0,ji.default)(u,function(l){var f=(0,_ie.default)(n);return f.push(l),Oq(t,l,r,f)});return i.concat(c)}he.validateNoLeftRecursion=Oq;function Fc(t){var e=[];if((0,Ap.default)(t))return e;var r=(0,Sq.default)(t);if(r instanceof kn.NonTerminal)e.push(r.referencedRule);else if(r instanceof kn.Alternative||r instanceof kn.Option||r instanceof kn.RepetitionMandatory||r instanceof kn.RepetitionMandatoryWithSeparator||r instanceof kn.RepetitionWithSeparator||r instanceof kn.Repetition)e=e.concat(Fc(r.definition));else if(r instanceof kn.Alternation)e=(0,Cq.default)((0,To.default)(r.definition,function(a){return Fc(a.definition)}));else if(!(r instanceof kn.Terminal))throw Error("non exhaustive match");var n=(0,sT.isOptionalProd)(r),i=t.length>1;if(n&&i){var o=(0,die.default)(t);return e.concat(Fc(o))}else return e}he.getFirstNoneTerminal=Fc;var cT=function(t){iT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(uT.GAstVisitor);function Nie(t,e){var r=new cT;t.accept(r);var n=r.alternations,i=(0,ji.default)(n,function(o){var a=(0,Rie.default)(o.definition);return(0,ji.default)(a,function(s,u){var c=(0,Tie.nextPossibleTokensAfter)([s],[],Aie.tokenStructuredMatcher,1);return(0,Ap.default)(c)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:u}),type:wn.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:u+1}]:[]})});return i}he.validateEmptyOrAlternative=Nie;function kie(t,e,r){var n=new cT;t.accept(n);var i=n.alternations;i=(0,hie.default)(i,function(a){return a.ignoreAmbiguities===!0});var o=(0,ji.default)(i,function(a){var s=a.idx,u=a.maxLookahead||e,c=(0,Vs.getLookaheadPathsForOr)(s,t,u,a),l=Oie(c,a,t,r),f=xq(c,a,t,r);return l.concat(f)});return o}he.validateAmbiguousAlternationAlternatives=kie;var Dq=function(t){iT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(uT.GAstVisitor);he.RepetitionCollector=Dq;function Iq(t,e){var r=new cT;t.accept(r);var n=r.alternations,i=(0,ji.default)(n,function(o){return o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:wn.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[]});return i}he.validateTooManyAlts=Iq;function wie(t,e,r){var n=[];return(0,jc.default)(t,function(i){var o=new Dq;i.accept(o);var a=o.allProductions;(0,jc.default)(a,function(s){var u=(0,Vs.getProdType)(s),c=s.maxLookahead||e,l=s.idx,f=(0,Vs.getLookaheadPathsForOptionalProd)(l,i,u,c),h=f[0];if((0,Ap.default)((0,Cq.default)(h))){var y=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:y,type:wn.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}he.validateSomeNonEmptyLookaheadPath=wie;function Oie(t,e,r,n){var i=[],o=(0,oT.default)(t,function(s,u,c){return e.definition[c].ignoreAmbiguities===!0||(0,jc.default)(u,function(l){var f=[c];(0,jc.default)(t,function(h,y){c!==y&&(0,Vs.containsPath)(h,l)&&e.definition[y].ignoreAmbiguities!==!0&&f.push(y)}),f.length>1&&!(0,Vs.containsPath)(i,l)&&(i.push(l),s.push({alts:f,path:l}))}),s},[]),a=(0,To.default)(o,function(s){var u=(0,To.default)(s.alts,function(l){return l+1}),c=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:c,type:wn.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return a}function xq(t,e,r,n){var i=(0,oT.default)(t,function(a,s,u){var c=(0,To.default)(s,function(l){return{idx:u,path:l}});return a.concat(c)},[]),o=(0,bie.default)((0,ji.default)(i,function(a){var s=e.definition[a.idx];if(s.ignoreAmbiguities===!0)return[];var u=a.idx,c=a.path,l=(0,pie.default)(i,function(h){return e.definition[h.idx].ignoreAmbiguities!==!0&&h.idx<u&&(0,Vs.isStrictPrefixOfPath)(h.path,c)}),f=(0,To.default)(l,function(h){var y=[h.idx+1,u+1],m=e.idx===0?"":e.idx,R=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:y,prefixPath:h.path});return{message:R,type:wn.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:m,alternatives:y}});return f}));return o}he.checkPrefixAlternativesAmbiguities=xq;function Die(t,e,r){var n=[],i=(0,To.default)(e,function(o){return o.name});return(0,jc.default)(t,function(o){var a=o.name;if((0,aT.default)(i,a)){var s=r.buildNamespaceConflictError(o);n.push({message:s,type:wn.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:a})}}),n}});var $q=d(Ro=>{"use strict";var qq=Ro&&Ro.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ro,"__esModule",{value:!0});Ro.validateGrammar=Ro.resolveGrammar=void 0;var Iie=qq(Gt()),Lq=qq(N_()),xie=rq(),qie=Uc(),Mq=Ks();function Lie(t){var e=(0,Lq.default)(t,{errMsgProvider:Mq.defaultGrammarResolverErrorProvider}),r={};return(0,Iie.default)(t.rules,function(n){r[n.name]=n}),(0,xie.resolveGrammar)(r,e.errMsgProvider)}Ro.resolveGrammar=Lie;function Mie(t){return t=(0,Lq.default)(t,{errMsgProvider:Mq.defaultGrammarValidatorErrorProvider}),(0,qie.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}Ro.validateGrammar=Mie});var Xs=d(sr=>{"use strict";var Gc=sr&&sr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),$ie=sr&&sr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(sr,"__esModule",{value:!0});sr.EarlyExitException=sr.NotAllInputParsedException=sr.NoViableAltException=sr.MismatchedTokenException=sr.isRecognitionException=void 0;var Fie=$ie(Di()),Fq="MismatchedTokenException",jq="NoViableAltException",Uq="EarlyExitException",Gq="NotAllInputParsedException",Hq=[Fq,jq,Uq,Gq];Object.freeze(Hq);function jie(t){return(0,Fie.default)(Hq,t.name)}sr.isRecognitionException=jie;var Pp=function(t){Gc(e,t);function e(r,n){var i=this.constructor,o=t.call(this,r)||this;return o.token=n,o.resyncedTokens=[],Object.setPrototypeOf(o,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,o.constructor),o}return e}(Error),Uie=function(t){Gc(e,t);function e(r,n,i){var o=t.call(this,r,n)||this;return o.previousToken=i,o.name=Fq,o}return e}(Pp);sr.MismatchedTokenException=Uie;var Gie=function(t){Gc(e,t);function e(r,n,i){var o=t.call(this,r,n)||this;return o.previousToken=i,o.name=jq,o}return e}(Pp);sr.NoViableAltException=Gie;var Hie=function(t){Gc(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=Gq,i}return e}(Pp);sr.NotAllInputParsedException=Hie;var Wie=function(t){Gc(e,t);function e(r,n,i){var o=t.call(this,r,n)||this;return o.previousToken=i,o.name=Uq,o}return e}(Pp);sr.EarlyExitException=Wie});var fT=d(kt=>{"use strict";var Bie=kt&&kt.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),bo=kt&&kt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(kt,"__esModule",{value:!0});kt.attemptInRepetitionRecovery=kt.Recoverable=kt.InRuleRecoveryException=kt.IN_RULE_RECOVERY_EXCEPTION=kt.EOF_FOLLOW_KEY=void 0;var Hc=da(),Kie=bo(Ir()),Wq=bo(vp()),zie=bo(En()),lT=bo(Ut()),Bq=bo(ip()),Vie=bo(qr()),Xie=bo(Di()),Yie=bo(wi()),Jie=Xs(),Qie=C_(),Zie=Cr();kt.EOF_FOLLOW_KEY={};kt.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var Kq=function(t){Bie(e,t);function e(r){var n=t.call(this,r)||this;return n.name=kt.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);kt.InRuleRecoveryException=Kq;var eoe=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,Vie.default)(e,"recoveryEnabled")?e.recoveryEnabled:Zie.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=zq)},t.prototype.getTokenToInsert=function(e){var r=(0,Hc.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var o=this,a=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],c=!1,l=this.LA(1),f=this.LA(1),h=function(){var y=o.LA(0),m=o.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:y,ruleName:o.getCurrRuleFullName()}),R=new Jie.MismatchedTokenException(m,l,o.LA(0));R.resyncedTokens=(0,Wq.default)(u),o.SAVE_ERROR(R)};!c;)if(this.tokenMatcher(f,i)){h();return}else if(n.call(this)){h(),e.apply(this,r);return}else this.tokenMatcher(f,a)?c=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new Kq("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,Kie.default)(r))return!1;var i=this.LA(1),o=(0,Bq.default)(r,function(a){return n.tokenMatcher(i,a)})!==void 0;return o},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,Xie.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,Bq.default)(e,function(o){var a=(0,Hc.tokenMatcher)(r,o);return a});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return kt.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,lT.default)(r,function(i,o){return o===0?kt.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[o],inRule:e.shortRuleNameToFullName(r[o-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,lT.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,zie.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===kt.EOF_FOLLOW_KEY)return[Hc.EOF];var r=e.ruleName+e.idxInCallingRule+Qie.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,Hc.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,Wq.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,o,a,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,Yie.default)(this.RULE_OCCURRENCE_STACK),o={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return o},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,lT.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();kt.Recoverable=eoe;function zq(t,e,r,n,i,o,a){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var c=this.getCurrRuleFullName(),l=this.getGAstProductions()[c],f=new o(l,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var h=u.token,y=u.occurrence,m=u.isEndOfRule;this.RULE_STACK.length===1&&m&&h===void 0&&(h=Hc.EOF,y=1),!(h===void 0||y===void 0)&&this.shouldInRepetitionRecoveryBeTried(h,y,a)&&this.tryInRepetitionRecovery(t,e,r,h)}kt.attemptInRepetitionRecovery=zq});var Sp=d(Ce=>{"use strict";Object.defineProperty(Ce,"__esModule",{value:!0});Ce.getKeyForAutomaticLookahead=Ce.AT_LEAST_ONE_SEP_IDX=Ce.MANY_SEP_IDX=Ce.AT_LEAST_ONE_IDX=Ce.MANY_IDX=Ce.OPTION_IDX=Ce.OR_IDX=Ce.BITS_FOR_ALT_IDX=Ce.BITS_FOR_RULE_IDX=Ce.BITS_FOR_OCCURRENCE_IDX=Ce.BITS_FOR_METHOD_TYPE=void 0;Ce.BITS_FOR_METHOD_TYPE=4;Ce.BITS_FOR_OCCURRENCE_IDX=8;Ce.BITS_FOR_RULE_IDX=12;Ce.BITS_FOR_ALT_IDX=8;Ce.OR_IDX=1<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.OPTION_IDX=2<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.MANY_IDX=3<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.AT_LEAST_ONE_IDX=4<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.MANY_SEP_IDX=5<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.AT_LEAST_ONE_SEP_IDX=6<<Ce.BITS_FOR_OCCURRENCE_IDX;function toe(t,e,r){return r|e|t}Ce.getKeyForAutomaticLookahead=toe;var Vve=32-Ce.BITS_FOR_ALT_IDX});var pT=d(Ao=>{"use strict";var Cp=Ao&&Ao.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,o;n<i;n++)(o||!(n in e))&&(o||(o=Array.prototype.slice.call(e,0,n)),o[n]=e[n]);return t.concat(o||Array.prototype.slice.call(e))},Vq=Ao&&Ao.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ao,"__esModule",{value:!0});Ao.LLkLookaheadStrategy=void 0;var dT=Vq(yp()),roe=Vq(Ir()),Ep=Ks(),noe=Cr(),Np=Uc(),Wc=zs(),ioe=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:noe.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,roe.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),a=Cp(Cp(Cp(Cp([],r,!0),n,!0),i,!0),o,!0);return a}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,dT.default)(e,function(r){return(0,Np.validateNoLeftRecursion)(r,r,Ep.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,dT.default)(e,function(r){return(0,Np.validateEmptyOrAlternative)(r,Ep.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,dT.default)(e,function(n){return(0,Np.validateAmbiguousAlternationAlternatives)(n,r,Ep.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,Np.validateSomeNonEmptyLookaheadPath)(e,r,Ep.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,Wc.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,Wc.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,Wc.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,Wc.getProdType)(e.prodType),Wc.buildSingleAlternativeLookaheadFunction)},t}();Ao.LLkLookaheadStrategy=ioe});var Qq=d(ri=>{"use strict";var ooe=ri&&ri.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Yq=ri&&ri.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ri,"__esModule",{value:!0});ri.collectMethods=ri.LooksAhead=void 0;var _a=Yq(Gt()),hT=Yq(qr()),Xq=Cr(),Ui=Sp(),aoe=_t(),Ys=_t(),soe=pT(),uoe=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,hT.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:Xq.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,hT.default)(e,"maxLookahead")?e.maxLookahead:Xq.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,hT.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new soe.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,_a.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=Jq(n),o=i.alternation,a=i.repetition,s=i.option,u=i.repetitionMandatory,c=i.repetitionMandatoryWithSeparator,l=i.repetitionWithSeparator;(0,_a.default)(o,function(f){var h=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,Ys.getProductionDslName)(f)).concat(h),function(){var y=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),m=(0,Ui.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Ui.OR_IDX,f.idx);r.setLaFuncCache(m,y)})}),(0,_a.default)(a,function(f){r.computeLookaheadFunc(n,f.idx,Ui.MANY_IDX,"Repetition",f.maxLookahead,(0,Ys.getProductionDslName)(f))}),(0,_a.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,Ui.OPTION_IDX,"Option",f.maxLookahead,(0,Ys.getProductionDslName)(f))}),(0,_a.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,Ui.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,Ys.getProductionDslName)(f))}),(0,_a.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,Ui.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,Ys.getProductionDslName)(f))}),(0,_a.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,Ui.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,Ys.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,o,a){var s=this;this.TRACE_INIT("".concat(a).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),c=(0,Ui.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(c,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Ui.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();ri.LooksAhead=uoe;var coe=function(t){ooe(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(aoe.GAstVisitor),kp=new coe;function Jq(t){kp.reset(),t.accept(kp);var e=kp.dslMethods;return kp.reset(),e}ri.collectMethods=Jq});var Zq=d(ni=>{"use strict";Object.defineProperty(ni,"__esModule",{value:!0});ni.addNoneTerminalToCst=ni.addTerminalToCst=ni.setNodeLocationFull=ni.setNodeLocationOnlyOffset=void 0;function loe(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}ni.setNodeLocationOnlyOffset=loe;function foe(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}ni.setNodeLocationFull=foe;function doe(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}ni.addTerminalToCst=doe;function poe(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}ni.addNoneTerminalToCst=poe});var eL=d(wp=>{"use strict";Object.defineProperty(wp,"__esModule",{value:!0});wp.defineNameProp=void 0;var hoe="name";function moe(t,e){Object.defineProperty(t,hoe,{enumerable:!1,configurable:!0,writable:!1,value:e})}wp.defineNameProp=moe});var sL=d(Jt=>{"use strict";var Gi=Jt&&Jt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Jt,"__esModule",{value:!0});Jt.validateMissingCstMethods=Jt.validateVisitor=Jt.CstVisitorDefinitionError=Jt.createBaseVisitorConstructorWithDefaults=Jt.createBaseSemanticVisitorConstructor=Jt.defaultVisit=void 0;var goe=Gi(Ir()),yoe=Gi(Dc()),voe=Gi(qe()),tL=Gi(Ut()),_oe=Gi(Gt()),Toe=Gi(Ic()),Roe=Gi(xr()),boe=Gi(Ts()),Aoe=Gi(ua()),rL=eL();function nL(t,e){for(var r=(0,Roe.default)(t),n=r.length,i=0;i<n;i++)for(var o=r[i],a=t[o],s=a.length,u=0;u<s;u++){var c=a[u];c.tokenTypeIdx===void 0&&this[c.name](c.children,e)}}Jt.defaultVisit=nL;function Poe(t,e){var r=function(){};(0,rL.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,o){if((0,voe.default)(i)&&(i=i[0]),!(0,Aoe.default)(i))return this[i.name](i.children,o)},validateVisitor:function(){var i=oL(this,e);if(!(0,goe.default)(i)){var o=(0,tL.default)(i,function(a){return a.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(o.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}Jt.createBaseSemanticVisitorConstructor=Poe;function Soe(t,e,r){var n=function(){};(0,rL.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,_oe.default)(e,function(o){i[o]=nL}),n.prototype=i,n.prototype.constructor=n,n}Jt.createBaseVisitorConstructorWithDefaults=Soe;var iL;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(iL=Jt.CstVisitorDefinitionError||(Jt.CstVisitorDefinitionError={}));function oL(t,e){var r=aL(t,e);return r}Jt.validateVisitor=oL;function aL(t,e){var r=(0,Toe.default)(e,function(i){return(0,boe.default)(t[i])===!1}),n=(0,tL.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:iL.MISSING_METHOD,methodName:i}});return(0,yoe.default)(n)}Jt.validateMissingCstMethods=aL});var fL=d(Qs=>{"use strict";var Op=Qs&&Qs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Qs,"__esModule",{value:!0});Qs.TreeBuilder=void 0;var Js=Zq(),yr=Op(Qd()),Coe=Op(qr()),uL=Op(xr()),cL=Op(ua()),lL=sL(),Eoe=Cr(),Noe=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,Coe.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:Eoe.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=yr.default,this.cstFinallyStateUpdate=yr.default,this.cstPostTerminal=yr.default,this.cstPostNonTerminal=yr.default,this.cstPostRule=yr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Js.setNodeLocationFull,this.setNodeLocationFromNode=Js.setNodeLocationFull,this.cstPostRule=yr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=yr.default,this.setNodeLocationFromNode=yr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Js.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Js.setNodeLocationOnlyOffset,this.cstPostRule=yr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=yr.default,this.setNodeLocationFromNode=yr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=yr.default,this.setNodeLocationFromNode=yr.default,this.cstPostRule=yr.default,this.setInitialNodeLocation=yr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Js.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Js.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,cL.default)(this.baseCstVisitorConstructor)){var e=(0,lL.createBaseSemanticVisitorConstructor)(this.className,(0,uL.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,cL.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,lL.createBaseVisitorConstructorWithDefaults)(this.className,(0,uL.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();Qs.TreeBuilder=Noe});var pL=d(Dp=>{"use strict";Object.defineProperty(Dp,"__esModule",{value:!0});Dp.LexerAdapter=void 0;var dL=Cr(),koe=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):dL.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?dL.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();Dp.LexerAdapter=koe});var mL=d(Zs=>{"use strict";var hL=Zs&&Zs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Zs,"__esModule",{value:!0});Zs.RecognizerApi=void 0;var woe=hL(zn()),Ooe=hL(Di()),Doe=Xs(),mT=Cr(),Ioe=Ks(),xoe=Uc(),qoe=_t(),Loe=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=mT.DEFAULT_RULE_CONFIG),(0,Ooe.default)(this.definedRulesNames,e)){var i=Ioe.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),o={message:i,type:mT.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(o)}this.definedRulesNames.push(e);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=mT.DEFAULT_RULE_CONFIG);var i=(0,xoe.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,Doe.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,qoe.serializeGrammar)((0,woe.default)(this.gastProductionsCache))},t}();Zs.RecognizerApi=Loe});var AL=d(tu=>{"use strict";var ii=tu&&tu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(tu,"__esModule",{value:!0});tu.RecognizerEngine=void 0;var gL=ii(Ir()),gT=ii(qe()),yT=ii(En()),yL=ii(Oc()),Moe=ii(Zd()),$oe=ii(Pn()),Bc=ii(qr()),Kc=ii(zn()),vL=ii(Ii()),_L=ii(wi()),Mr=Sp(),Ip=Xs(),TL=zs(),eu=$c(),RL=Cr(),Foe=fT(),bL=da(),zc=fa(),joe=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=zc.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,Bc.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,gT.default)(e)){if((0,gL.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,gT.default)(e))this.tokensMap=(0,vL.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,Bc.default)(e,"modes")&&(0,yL.default)((0,yT.default)((0,Kc.default)(e.modes)),zc.isTokenType)){var n=(0,yT.default)((0,Kc.default)(e.modes)),i=(0,Moe.default)(n);this.tokensMap=(0,vL.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,$oe.default)(e))this.tokensMap=(0,_L.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=bL.EOF;var o=(0,Bc.default)(e,"modes")?(0,yT.default)((0,Kc.default)(e.modes)):(0,Kc.default)(e),a=(0,yL.default)(o,function(s){return(0,gL.default)(s.categoryMatches)});this.tokenMatcher=a?zc.tokenStructuredMatcherNoCategories:zc.tokenStructuredMatcher,(0,zc.augmentTokenTypes)((0,Kc.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,Bc.default)(n,"resyncEnabled")?n.resyncEnabled:RL.DEFAULT_RULE_CONFIG.resyncEnabled,o=(0,Bc.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:RL.DEFAULT_RULE_CONFIG.recoveryValueFunc,a=this.ruleShortNameIdx<<Mr.BITS_FOR_METHOD_TYPE+Mr.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[a]=e,this.fullRuleNameToShort[e]=a;var s;this.outputCst===!0?s=function(){for(var l=[],f=0;f<arguments.length;f++)l[f]=arguments[f];try{this.ruleInvocationStateUpdate(a,e,this.subruleIdx),r.apply(this,l);var h=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(h),h}catch(y){return this.invokeRuleCatch(y,i,o)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var l=[],f=0;f<arguments.length;f++)l[f]=arguments[f];try{return this.ruleInvocationStateUpdate(a,e,this.subruleIdx),r.apply(this,l)}catch(h){return this.invokeRuleCatch(h,i,o)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Ip.isRecognitionException)(e)){var a=e;if(o){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(a.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,a.partialCstResult=u}throw a}}else{if(i)return this.moveToTerminatedState(),n();throw a}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Mr.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,o=this.getLaFuncFromCache(n),a;if(typeof e!="function"){a=e.DEF;var s=e.GATE;if(s!==void 0){var u=o;o=function(){return s.call(i)&&u.call(i)}}}else a=e;if(o.call(this)===!0)return a.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Mr.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,o=this.getLaFuncFromCache(n),a;if(typeof r!="function"){a=r.DEF;var s=r.GATE;if(s!==void 0){var u=o;o=function(){return s.call(i)&&u.call(i)}}}else a=r;if(o.call(this)===!0)for(var c=this.doSingleRepetition(a);o.call(this)===!0&&c===!0;)c=this.doSingleRepetition(a);else throw this.raiseEarlyExitException(e,TL.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],o,Mr.AT_LEAST_ONE_IDX,e,eu.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Mr.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,o=r.DEF,a=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){o.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),a)};this.tokenMatcher(this.LA(1),a)===!0;)this.CONSUME(a),o.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,a,u,o,eu.NextTerminalAfterAtLeastOneSepWalker],u,Mr.AT_LEAST_ONE_SEP_IDX,e,eu.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,TL.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Mr.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,o=this.getLaFuncFromCache(n),a;if(typeof r!="function"){a=r.DEF;var s=r.GATE;if(s!==void 0){var u=o;o=function(){return s.call(i)&&u.call(i)}}}else a=r;for(var c=!0;o.call(this)===!0&&c===!0;)c=this.doSingleRepetition(a);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],o,Mr.MANY_IDX,e,eu.NextTerminalAfterManyWalker,c)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Mr.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,o=r.DEF,a=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){o.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),a)};this.tokenMatcher(this.LA(1),a)===!0;)this.CONSUME(a),o.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,a,u,o,eu.NextTerminalAfterManySepWalker],u,Mr.MANY_SEP_IDX,e,eu.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,Mr.AT_LEAST_ONE_SEP_IDX,e,o)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Mr.OR_IDX,r),i=(0,gT.default)(e)?e:e.DEF,o=this.getLaFuncFromCache(n),a=o.call(this,i);if(a!==void 0){var s=i[a];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Ip.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(a){throw this.subruleInternalError(a,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Ip.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(a){i=this.consumeInternalRecovery(e,r,a)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Ip.MismatchedTokenException(i,r,o))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===Foe.IN_RULE_RECOVERY_EXCEPTION?n:o}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,_L.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),bL.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();tu.RecognizerEngine=joe});var EL=d(ru=>{"use strict";var CL=ru&&ru.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ru,"__esModule",{value:!0});ru.ErrorHandler=void 0;var vT=Xs(),Uoe=CL(qr()),PL=CL(wi()),SL=zs(),Goe=Cr(),Hoe=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,Uoe.default)(e,"errorMessageProvider")?e.errorMessageProvider:Goe.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,vT.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,PL.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,PL.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=(0,SL.getLookaheadPathsForOptionalProd)(e,o,r,this.maxLookahead),s=a[0],u=[],c=1;c<=this.maxLookahead;c++)u.push(this.LA(c));var l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new vT.EarlyExitException(l,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=(0,SL.getLookaheadPathsForOr)(e,i,this.maxLookahead),a=[],s=1;s<=this.maxLookahead;s++)a.push(this.LA(s));var u=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:a,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new vT.NoViableAltException(c,this.LA(1),u))},t}();ru.ErrorHandler=Hoe});var wL=d(nu=>{"use strict";var kL=nu&&nu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(nu,"__esModule",{value:!0});nu.ContentAssist=void 0;var NL=$c(),Woe=kL(Us()),Boe=kL(ua()),Koe=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,Boe.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,NL.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,Woe.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],o=new NL.NextAfterTokenWalker(i,e).startWalking();return o},t}();nu.ContentAssist=Koe});var FL=d(iu=>{"use strict";var ou=iu&&iu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(iu,"__esModule",{value:!0});iu.GastRecorder=void 0;var xp=ou(hp()),zoe=ou(qe()),Voe=ou(zd()),Xoe=ou(Gt()),xL=ou(Ts()),Xc=ou(qr()),oi=_t(),Yoe=xc(),qL=fa(),LL=da(),Joe=Cr(),Qoe=Sp(),Lp={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Lp);var OL=!0,DL=Math.pow(2,Qoe.BITS_FOR_OCCURRENCE_IDX)-1,ML=(0,LL.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:Yoe.Lexer.NA});(0,qL.augmentTokenTypes)([ML]);var $L=(0,LL.createTokenInstance)(ML,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze($L);var Zoe={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},eae=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var o=i>0?i:"";e["CONSUME".concat(o)]=function(a,s){return this.consumeInternalRecord(a,i,s)},e["SUBRULE".concat(o)]=function(a,s){return this.subruleInternalRecord(a,i,s)},e["OPTION".concat(o)]=function(a){return this.optionInternalRecord(a,i)},e["OR".concat(o)]=function(a){return this.orInternalRecord(a,i)},e["MANY".concat(o)]=function(a){this.manyInternalRecord(i,a)},e["MANY_SEP".concat(o)]=function(a){this.manySepFirstInternalRecord(i,a)},e["AT_LEAST_ONE".concat(o)]=function(a){this.atLeastOneInternalRecord(i,a)},e["AT_LEAST_ONE_SEP".concat(o)]=function(a){this.atLeastOneSepFirstInternalRecord(i,a)}},n=0;n<10;n++)r(n);e.consume=function(i,o,a){return this.consumeInternalRecord(o,i,a)},e.subrule=function(i,o,a){return this.subruleInternalRecord(o,i,a)},e.option=function(i,o){return this.optionInternalRecord(o,i)},e.or=function(i,o){return this.orInternalRecord(o,i)},e.many=function(i,o){this.manyInternalRecord(i,o)},e.atLeastOne=function(i,o){this.atLeastOneInternalRecord(i,o)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return Joe.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new oi.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return Vc.call(this,oi.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){Vc.call(this,oi.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){Vc.call(this,oi.RepetitionMandatoryWithSeparator,r,e,OL)},t.prototype.manyInternalRecord=function(e,r){Vc.call(this,oi.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){Vc.call(this,oi.RepetitionWithSeparator,r,e,OL)},t.prototype.orInternalRecord=function(e,r){return tae.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(qp(r),!e||(0,Xc.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(IL(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var o=(0,xp.default)(this.recordingProdStack),a=e.ruleName,s=new oi.NonTerminal({idx:r,nonTerminalName:a,label:n?.LABEL,referencedRule:void 0});return o.definition.push(s),this.outputCst?Zoe:Lp},t.prototype.consumeInternalRecord=function(e,r,n){if(qp(r),!(0,qL.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(IL(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var o=(0,xp.default)(this.recordingProdStack),a=new oi.Terminal({idx:r,terminalType:e,label:n?.LABEL});return o.definition.push(a),$L},t}();iu.GastRecorder=eae;function Vc(t,e,r,n){n===void 0&&(n=!1),qp(r);var i=(0,xp.default)(this.recordingProdStack),o=(0,xL.default)(e)?e:e.DEF,a=new t({definition:[],idx:r});return n&&(a.separator=e.SEP),(0,Xc.default)(e,"MAX_LOOKAHEAD")&&(a.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(a),o.call(this),i.definition.push(a),this.recordingProdStack.pop(),Lp}function tae(t,e){var r=this;qp(e);var n=(0,xp.default)(this.recordingProdStack),i=(0,zoe.default)(t)===!1,o=i===!1?t:t.DEF,a=new oi.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,Xc.default)(t,"MAX_LOOKAHEAD")&&(a.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,Voe.default)(o,function(u){return(0,xL.default)(u.GATE)});return a.hasPredicates=s,n.definition.push(a),(0,Xoe.default)(o,function(u){var c=new oi.Alternative({definition:[]});a.definition.push(c),(0,Xc.default)(u,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,Xc.default)(u,"GATE")&&(c.ignoreAmbiguities=!0),r.recordingProdStack.push(c),u.ALT.call(r),r.recordingProdStack.pop()}),Lp}function IL(t){return t===0?"":"".concat(t)}function qp(t){if(t<0||t>DL){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(DL+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var jL=d(au=>{"use strict";var rae=au&&au.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(au,"__esModule",{value:!0});au.PerformanceTracer=void 0;var nae=rae(qr()),iae=Ms(),oae=Cr(),aae=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,nae.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=oae.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,iae.timer)(r),o=i.time,a=i.value,s=o>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(o,"ms")),this.traceInitIndent--,a}else return r()},t}();au.PerformanceTracer=aae});var UL=d(Mp=>{"use strict";Object.defineProperty(Mp,"__esModule",{value:!0});Mp.applyMixins=void 0;function sae(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]}})})}Mp.applyMixins=sae});var Cr=d(Ue=>{"use strict";var BL=Ue&&Ue.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),su=Ue&&Ue.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ue,"__esModule",{value:!0});Ue.EmbeddedActionsParser=Ue.CstParser=Ue.Parser=Ue.EMPTY_ALT=Ue.ParserDefinitionErrorType=Ue.DEFAULT_RULE_CONFIG=Ue.DEFAULT_PARSER_CONFIG=Ue.END_OF_FILE=void 0;var _T=su(Ir()),uae=su(Ut()),cae=su(Gt()),Po=su(zn()),GL=su(qr()),KL=su(wi()),lae=Ms(),fae=SI(),HL=da(),zL=Ks(),WL=$q(),dae=fT(),pae=Qq(),hae=fL(),mae=pL(),gae=mL(),yae=AL(),vae=EL(),_ae=wL(),Tae=FL(),Rae=jL(),bae=UL(),Aae=Uc();Ue.END_OF_FILE=(0,HL.createTokenInstance)(HL.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Ue.END_OF_FILE);Ue.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:zL.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Ue.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var Pae;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Pae=Ue.ParserDefinitionErrorType||(Ue.ParserDefinitionErrorType={}));function Sae(t){return t===void 0&&(t=void 0),function(){return t}}Ue.EMPTY_ALT=Sae;var $p=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,GL.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,GL.default)(r,"skipValidations")?r.skipValidations:Ue.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,lae.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,cae.default)(e.definedRulesNames,function(o){var a=e[o],s=a.originalGrammarAction,u;e.TRACE_INIT("".concat(o," Rule"),function(){u=e.topLevelRuleRecord(o,s)}),e.gastProductionsCache[o]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,WL.resolveGrammar)({rules:(0,Po.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,_T.default)(i)&&e.skipValidations===!1){var o=(0,WL.validateGrammar)({rules:(0,Po.default)(e.gastProductionsCache),tokenTypes:(0,Po.default)(e.tokensMap),errMsgProvider:zL.defaultGrammarValidatorErrorProvider,grammarName:n}),a=(0,Aae.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,Po.default)(e.gastProductionsCache),tokenTypes:(0,Po.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(o,a)}}),(0,_T.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var o=(0,fae.computeAllProdsFollows)((0,Po.default)(e.gastProductionsCache));e.resyncFollows=o}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var o,a;(a=(o=e.lookaheadStrategy).initialize)===null||a===void 0||a.call(o,{rules:(0,Po.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,Po.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,_T.default)(e.definitionErrors))throw r=(0,uae.default)(e.definitionErrors,function(o){return o.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Ue.Parser=$p;(0,bae.applyMixins)($p,[dae.Recoverable,pae.LooksAhead,hae.TreeBuilder,mae.LexerAdapter,yae.RecognizerEngine,gae.RecognizerApi,vae.ErrorHandler,_ae.ContentAssist,Tae.GastRecorder,Rae.PerformanceTracer]);var Cae=function(t){BL(e,t);function e(r,n){n===void 0&&(n=Ue.DEFAULT_PARSER_CONFIG);var i=(0,KL.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}($p);Ue.CstParser=Cae;var Eae=function(t){BL(e,t);function e(r,n){n===void 0&&(n=Ue.DEFAULT_PARSER_CONFIG);var i=(0,KL.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}($p);Ue.EmbeddedActionsParser=Eae});var XL=d(So=>{"use strict";var Nae=So&&So.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),uu=So&&So.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(So,"__esModule",{value:!0});So.buildModel=void 0;var VL=_t(),Yc=uu(Ut()),kae=uu(En()),wae=uu(zn()),Oae=uu(zd()),Dae=uu(Y_()),Iae=uu(kc());function xae(t){var e=new qae,r=(0,wae.default)(t);return(0,Yc.default)(r,function(n){return e.visitRule(n)})}So.buildModel=xae;var qae=function(t){Nae(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,Dae.default)(n,function(a){return a.propertyName}),o=(0,Yc.default)(i,function(a,s){var u=!(0,Oae.default)(a,function(l){return!l.canBeNull}),c=a[0].type;return a.length>1&&(c=(0,Yc.default)(a,function(l){return l.type})),{name:s,type:c,optional:u}});return{name:r.name,properties:o}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Fp(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Fp(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Fp(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Fp(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,Yc.default)(this.visitEach(r),function(i){return(0,Iae.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,kae.default)((0,Yc.default)(r,function(i){return n.visit(i)}))},e}(VL.GAstVisitor);function Fp(t){return t instanceof VL.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var JL=d((d_e,YL)=>{var Lae=Ud();function Mae(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:Lae(t,e,r)}YL.exports=Mae});var TT=d((p_e,QL)=>{var $ae="\\ud800-\\udfff",Fae="\\u0300-\\u036f",jae="\\ufe20-\\ufe2f",Uae="\\u20d0-\\u20ff",Gae=Fae+jae+Uae,Hae="\\ufe0e\\ufe0f",Wae="\\u200d",Bae=RegExp("["+Wae+$ae+Gae+Hae+"]");function Kae(t){return Bae.test(t)}QL.exports=Kae});var eM=d((h_e,ZL)=>{function zae(t){return t.split("")}ZL.exports=zae});var uM=d((m_e,sM)=>{var tM="\\ud800-\\udfff",Vae="\\u0300-\\u036f",Xae="\\ufe20-\\ufe2f",Yae="\\u20d0-\\u20ff",Jae=Vae+Xae+Yae,Qae="\\ufe0e\\ufe0f",Zae="["+tM+"]",RT="["+Jae+"]",bT="\\ud83c[\\udffb-\\udfff]",ese="(?:"+RT+"|"+bT+")",rM="[^"+tM+"]",nM="(?:\\ud83c[\\udde6-\\uddff]){2}",iM="[\\ud800-\\udbff][\\udc00-\\udfff]",tse="\\u200d",oM=ese+"?",aM="["+Qae+"]?",rse="(?:"+tse+"(?:"+[rM,nM,iM].join("|")+")"+aM+oM+")*",nse=aM+oM+rse,ise="(?:"+[rM+RT+"?",RT,nM,iM,Zae].join("|")+")",ose=RegExp(bT+"(?="+bT+")|"+ise+nse,"g");function ase(t){return t.match(ose)||[]}sM.exports=ase});var lM=d((g_e,cM)=>{var sse=eM(),use=TT(),cse=uM();function lse(t){return use(t)?cse(t):sse(t)}cM.exports=lse});var dM=d((y_e,fM)=>{var fse=JL(),dse=TT(),pse=lM(),hse=a_();function mse(t){return function(e){e=hse(e);var r=dse(e)?pse(e):void 0,n=r?r[0]:e.charAt(0),i=r?fse(r,1).join(""):e.slice(1);return n[t]()+i}}fM.exports=mse});var hM=d((v_e,pM)=>{var gse=dM(),yse=gse("toUpperCase");pM.exports=yse});var vM=d(cu=>{"use strict";var lu=cu&&cu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(cu,"__esModule",{value:!0});cu.genDts=void 0;var vse=lu(En()),_se=lu(qe()),jp=lu(Ut()),Tse=lu(Ii()),Rse=lu(Zd()),gM=lu(hM());function bse(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,vse.default)((0,jp.default)(t,function(n){return Ase(n)}))),e.includeVisitorInterface&&(r=r.concat(Ese(e.visitorInterfaceName,t))),r.join(`

`)+`
`}cu.genDts=bse;function Ase(t){var e=Pse(t),r=Sse(t);return[e,r]}function Pse(t){var e=yM(t.name),r=AT(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function Sse(t){var e=AT(t.name);return"export type ".concat(e,` = {
  `).concat((0,jp.default)(t.properties,function(r){return Cse(r)}).join(`
  `),`
};`)}function Cse(t){var e=kse(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function Ese(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,jp.default)(e,function(r){return Nse(r)}).join(`
  `),`
}`)}function Nse(t){var e=AT(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function kse(t){if((0,_se.default)(t)){var e=(0,Rse.default)((0,jp.default)(t,function(n){return mM(n)})),r=(0,Tse.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return mM(t)}function mM(t){return t.kind==="token"?"IToken":yM(t.name)}function yM(t){return(0,gM.default)(t)+"CstNode"}function AT(t){return(0,gM.default)(t)+"CstChildren"}});var _M=d(fu=>{"use strict";var Up=fu&&fu.__assign||function(){return Up=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Up.apply(this,arguments)};Object.defineProperty(fu,"__esModule",{value:!0});fu.generateCstDts=void 0;var wse=XL(),Ose=vM(),Dse={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function Ise(t,e){var r=Up(Up({},Dse),e),n=(0,wse.buildModel)(t);return(0,Ose.genDts)(n,r)}fu.generateCstDts=Ise});var RM=d(Gp=>{"use strict";Object.defineProperty(Gp,"__esModule",{value:!0});Gp.createSyntaxDiagramsCode=void 0;var TM=xv();function xse(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(TM.VERSION,"/diagrams/"):n,o=r.css,a=o===void 0?"https://unpkg.com/chevrotain@".concat(TM.VERSION,"/diagrams/diagrams.css"):o,s=`
<!-- This is a generated file -->
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body {
    background-color: hsl(30, 20%, 95%)
  }
</style>

`,u=`
<link rel='stylesheet' href='`.concat(a,`'>
`),c=`
<script src='`.concat(i,`vendor/railroad-diagrams.js'></script>
<script src='`).concat(i,`src/diagrams_builder.js'></script>
<script src='`).concat(i,`src/diagrams_behavior.js'></script>
<script src='`).concat(i,`src/main.js'></script>
`),l=`
<div id="diagrams" align="center"></div>    
`,f=`
<script>
    window.serializedGrammar = `.concat(JSON.stringify(t,null,"  "),`;
</script>
`),h=`
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
</script>
`;return s+u+c+l+f+h}Gp.createSyntaxDiagramsCode=xse});var Ta=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var qse=xv();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return qse.VERSION}});var Hp=Cr();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return Hp.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return Hp.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return Hp.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return Hp.EMPTY_ALT}});var bM=xc();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return bM.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return bM.LexerDefinitionErrorType}});var du=da();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return du.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return du.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return du.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return du.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return du.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return du.tokenName}});var Lse=zs();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return Lse.getLookaheadPaths}});var Mse=pT();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return Mse.LLkLookaheadStrategy}});var $se=Ks();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return $se.defaultParserErrorProvider}});var Jc=Xs();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return Jc.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return Jc.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return Jc.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return Jc.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return Jc.NoViableAltException}});var Fse=U_();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return Fse.defaultLexerErrorProvider}});var ai=_t();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return ai.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return ai.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return ai.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return ai.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return ai.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return ai.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return ai.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return ai.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return ai.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return ai.Terminal}});var PT=_t();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return PT.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return PT.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return PT.GAstVisitor}});var jse=_M();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return jse.generateCstDts}});function Use(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=Use;var Gse=RM();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return Gse.createSyntaxDiagramsCode}});var Hse=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=Hse});var NM=d(V=>{"use strict";var AM=V&&V.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(V,"__esModule",{value:!0});V.createATN=V.RuleTransition=V.EpsilonTransition=V.AtomTransition=V.AbstractTransition=V.ATN_LOOP_END=V.ATN_PLUS_LOOP_BACK=V.ATN_STAR_LOOP_ENTRY=V.ATN_STAR_LOOP_BACK=V.ATN_BLOCK_END=V.ATN_RULE_STOP=V.ATN_TOKEN_START=V.ATN_STAR_BLOCK_START=V.ATN_PLUS_BLOCK_START=V.ATN_RULE_START=V.ATN_BASIC=V.ATN_INVALID_TYPE=V.buildATNKey=void 0;var PM=AM(Ut()),Wse=AM(Ic()),Er=Ta();function Zc(t,e,r){return`${t.name}_${e}_${r}`}V.buildATNKey=Zc;V.ATN_INVALID_TYPE=0;V.ATN_BASIC=1;V.ATN_RULE_START=2;V.ATN_PLUS_BLOCK_START=4;V.ATN_STAR_BLOCK_START=5;V.ATN_TOKEN_START=6;V.ATN_RULE_STOP=7;V.ATN_BLOCK_END=8;V.ATN_STAR_LOOP_BACK=9;V.ATN_STAR_LOOP_ENTRY=10;V.ATN_PLUS_LOOP_BACK=11;V.ATN_LOOP_END=12;var pu=class{constructor(e){this.target=e}isEpsilon(){return!1}};V.AbstractTransition=pu;var Wp=class extends pu{constructor(e,r){super(e),this.tokenType=r}};V.AtomTransition=Wp;var Bp=class extends pu{constructor(e){super(e)}isEpsilon(){return!0}};V.EpsilonTransition=Bp;var Qc=class extends pu{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};V.RuleTransition=Qc;function Bse(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Kse(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Ra(e,i,i);o!==void 0&&nue(e,i,o)}return e}V.createATN=Bse;function Kse(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Wt(t,i,void 0,{type:V.ATN_RULE_START}),a=Wt(t,i,void 0,{type:V.ATN_RULE_STOP});o.stop=a,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,a)}}function SM(t,e,r){return r instanceof Er.Terminal?ST(t,e,r.terminalType,r):r instanceof Er.NonTerminal?rue(t,e,r):r instanceof Er.Alternation?Jse(t,e,r):r instanceof Er.Option?Qse(t,e,r):r instanceof Er.Repetition?zse(t,e,r):r instanceof Er.RepetitionWithSeparator?Vse(t,e,r):r instanceof Er.RepetitionMandatory?Xse(t,e,r):r instanceof Er.RepetitionMandatoryWithSeparator?Yse(t,e,r):Ra(t,e,r)}function zse(t,e,r){let n=Wt(t,e,r,{type:V.ATN_STAR_BLOCK_START});Co(t,n);let i=hu(t,e,n,r,Ra(t,e,r));return EM(t,e,r,i)}function Vse(t,e,r){let n=Wt(t,e,r,{type:V.ATN_STAR_BLOCK_START});Co(t,n);let i=hu(t,e,n,r,Ra(t,e,r)),o=ST(t,e,r.separator,r);return EM(t,e,r,i,o)}function Xse(t,e,r){let n=Wt(t,e,r,{type:V.ATN_PLUS_BLOCK_START});Co(t,n);let i=hu(t,e,n,r,Ra(t,e,r));return CM(t,e,r,i)}function Yse(t,e,r){let n=Wt(t,e,r,{type:V.ATN_PLUS_BLOCK_START});Co(t,n);let i=hu(t,e,n,r,Ra(t,e,r)),o=ST(t,e,r.separator,r);return CM(t,e,r,i,o)}function Jse(t,e,r){let n=Wt(t,e,r,{type:V.ATN_BASIC});Co(t,n);let i=(0,PM.default)(r.definition,a=>SM(t,e,a));return hu(t,e,n,r,...i)}function Qse(t,e,r){let n=Wt(t,e,r,{type:V.ATN_BASIC});Co(t,n);let i=hu(t,e,n,r,Ra(t,e,r));return Zse(t,e,r,i)}function Ra(t,e,r){let n=(0,Wse.default)((0,PM.default)(r.definition,i=>SM(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:tue(t,n)}function CM(t,e,r,n,i){let o=n.left,a=n.right,s=Wt(t,e,r,{type:V.ATN_PLUS_LOOP_BACK});Co(t,s);let u=Wt(t,e,r,{type:V.ATN_LOOP_END});return o.loopback=s,u.loopback=s,t.decisionMap[Zc(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,wt(a,s),i===void 0?(wt(s,o),wt(s,u)):(wt(s,u),wt(s,i.left),wt(i.right,o)),{left:o,right:u}}function EM(t,e,r,n,i){let o=n.left,a=n.right,s=Wt(t,e,r,{type:V.ATN_STAR_LOOP_ENTRY});Co(t,s);let u=Wt(t,e,r,{type:V.ATN_LOOP_END}),c=Wt(t,e,r,{type:V.ATN_STAR_LOOP_BACK});return s.loopback=c,u.loopback=c,wt(s,o),wt(s,u),wt(a,c),i!==void 0?(wt(c,u),wt(c,i.left),wt(i.right,o)):wt(c,s),t.decisionMap[Zc(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function Zse(t,e,r,n){let i=n.left,o=n.right;return wt(i,o),t.decisionMap[Zc(e,"Option",r.idx)]=i,n}function Co(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function hu(t,e,r,n,...i){let o=Wt(t,e,n,{type:V.ATN_BLOCK_END,start:r});r.end=o;for(let s of i)s!==void 0?(wt(r,s.left),wt(s.right,o)):wt(r,o);let a={left:r,right:o};return t.decisionMap[Zc(e,eue(n),n.idx)]=r,a}function eue(t){if(t instanceof Er.Alternation)return"Alternation";if(t instanceof Er.Option)return"Option";if(t instanceof Er.Repetition)return"Repetition";if(t instanceof Er.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Er.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Er.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function tue(t,e){let r=e.length;for(let o=0;o<r-1;o++){let a=e[o],s;a.left.transitions.length===1&&(s=a.left.transitions[0]);let u=s instanceof Qc,c=s,l=e[o+1].left;a.left.type===V.ATN_BASIC&&a.right.type===V.ATN_BASIC&&s!==void 0&&(u&&c.followState===a.right||s.target===a.right)?(u?c.followState=l:s.target=l,iue(t,a.right)):wt(a.right,l)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function ST(t,e,r,n){let i=Wt(t,e,n,{type:V.ATN_BASIC}),o=Wt(t,e,n,{type:V.ATN_BASIC});return CT(i,new Wp(o,r)),{left:i,right:o}}function rue(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Wt(t,e,r,{type:V.ATN_BASIC}),a=Wt(t,e,r,{type:V.ATN_BASIC}),s=new Qc(i,n,a);return CT(o,s),{left:o,right:a}}function nue(t,e,r){let n=t.ruleToStartState.get(e);wt(n,r.left);let i=t.ruleToStopState.get(e);return wt(r.right,i),{left:n,right:i}}function wt(t,e){let r=new Bp(e);CT(t,r)}function Wt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function CT(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function iue(t,e){t.states.splice(t.states.indexOf(e),1)}});var wM=d(si=>{"use strict";var oue=si&&si.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(si,"__esModule",{value:!0});si.getATNConfigKey=si.ATNConfigSet=si.DFA_ERROR=void 0;var aue=oue(Ut());si.DFA_ERROR={};var ET=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=kM(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,aue.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};si.ATNConfigSet=ET;function kM(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}si.getATNConfigKey=kM});var DM=d((S_e,OM)=>{var sue=Ds();function uue(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],a=e(o);if(a!=null&&(s===void 0?a===a&&!sue(a):r(a,s)))var s=a,u=o}return u}OM.exports=uue});var xM=d((C_e,IM)=>{function cue(t,e){return t<e}IM.exports=cue});var LM=d((E_e,qM)=>{var lue=DM(),fue=xM(),due=sa();function pue(t){return t&&t.length?lue(t,due,fue):void 0}qM.exports=pue});var $M=d((N_e,MM)=>{var hue=Zr(),mue=b_();function gue(t,e){return t&&t.length?mue(t,hue(e,2)):[]}MM.exports=gue});var BM=d(mu=>{"use strict";var No=mu&&mu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(mu,"__esModule",{value:!0});mu.LLStarLookaheadStrategy=void 0;var $r=Ta(),On=NM(),Eo=wM(),yue=No(LM()),vue=No(yp()),_ue=No($M()),el=No(Ut()),Tue=No(En()),NT=No(Gt()),Rue=No(Ir()),FM=No(Ii());function bue(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var Kp=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},jM=new Kp,wT=class extends $r.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,On.createATN)(e.rules),this.dfas=Aue(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,a=this.dfas,s=this.logging,u=(0,On.buildATNKey)(n,"Alternation",r),l=this.atn.decisionMap[u].decision,f=(0,el.default)((0,$r.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),h=>(0,el.default)(h,y=>y[0]));if(UM(f,!1)&&!o){let h=(0,FM.default)(f,(y,m,R)=>((0,NT.default)(m,E=>{E&&(y[E.tokenTypeIdx]=R,(0,NT.default)(E.categoryMatches,S=>{y[S]=R}))}),y),{});return i?function(y){var m;let R=this.LA(1),E=h[R.tokenTypeIdx];if(y!==void 0&&E!==void 0){let S=(m=y[E])===null||m===void 0?void 0:m.GATE;if(S!==void 0&&S.call(this)===!1)return}return E}:function(){let y=this.LA(1);return h[y.tokenTypeIdx]}}else return i?function(h){let y=new Kp,m=h===void 0?0:h.length;for(let E=0;E<m;E++){let S=h?.[E].GATE;y.set(E,S===void 0||S.call(this))}let R=kT.call(this,a,l,y,s);return typeof R=="number"?R:void 0}:function(){let h=kT.call(this,a,l,jM,s);return typeof h=="number"?h:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,a=this.dfas,s=this.logging,u=(0,On.buildATNKey)(n,i,r),l=this.atn.decisionMap[u].decision,f=(0,el.default)((0,$r.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),h=>(0,el.default)(h,y=>y[0]));if(UM(f)&&f[0][0]&&!o){let h=f[0],y=(0,Tue.default)(h);if(y.length===1&&(0,Rue.default)(y[0].categoryMatches)){let R=y[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===R}}else{let m=(0,FM.default)(y,(R,E)=>(E!==void 0&&(R[E.tokenTypeIdx]=!0,(0,NT.default)(E.categoryMatches,S=>{R[S]=!0})),R),{});return function(){let R=this.LA(1);return m[R.tokenTypeIdx]===!0}}}return function(){let h=kT.call(this,a,l,jM,s);return typeof h=="object"?!1:h===0}}};mu.LLStarLookaheadStrategy=wT;function UM(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let a=[o.tokenTypeIdx].concat(o.categoryMatches);for(let s of a)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function Aue(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=bue(t.decisionStates[n],n);return r}function kT(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let s=xue(i.atnStartState);o=WM(i,HM(s)),i.start=o}return Pue.apply(this,[i,o,r,n])}function Pue(t,e,r,n){let i=e,o=1,a=[],s=this.LA(o++);for(;;){let u=wue(i,s);if(u===void 0&&(u=Sue.apply(this,[t,i,s,o,r,n])),u===Eo.DFA_ERROR)return kue(a,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,a.push(s),s=this.LA(o++)}}function Sue(t,e,r,n,i,o){let a=Oue(e.configs,r,i);if(a.size===0)return GM(t,e,r,Eo.DFA_ERROR),Eo.DFA_ERROR;let s=HM(a),u=Iue(a,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if($ue(a)){let c=(0,yue.default)(a.alts);s.isAcceptState=!0,s.prediction=c,s.configs.uniqueAlt=c,Cue.apply(this,[t,n,a.alts,o])}return s=GM(t,e,r,s),s}function Cue(t,e,r,n){let i=[];for(let c=1;c<=e;c++)i.push(this.LA(c).tokenType);let o=t.atnStartState,a=o.rule,s=o.production,u=Eue({topLevelRule:a,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function Eue(t){let e=(0,el.default)(t.prefixPath,i=>(0,$r.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${Nue(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function Nue(t){if(t instanceof $r.NonTerminal)return"SUBRULE";if(t instanceof $r.Option)return"OPTION";if(t instanceof $r.Alternation)return"OR";if(t instanceof $r.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof $r.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof $r.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof $r.Repetition)return"MANY";if(t instanceof $r.Terminal)return"CONSUME";throw Error("non exhaustive match")}function kue(t,e,r){let n=(0,vue.default)(e.configs.elements,o=>o.state.transitions),i=(0,_ue.default)(n.filter(o=>o instanceof On.AtomTransition).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function wue(t,e){return t.edges[e.tokenTypeIdx]}function Oue(t,e,r){let n=new Eo.ATNConfigSet,i=[];for(let a of t.elements){if(r.is(a.alt)===!1)continue;if(a.state.type===On.ATN_RULE_STOP){i.push(a);continue}let s=a.state.transitions.length;for(let u=0;u<s;u++){let c=a.state.transitions[u],l=Due(c,e);l!==void 0&&n.add({state:l,alt:a.alt,stack:a.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new Eo.ATNConfigSet;for(let a of n.elements)zp(a,o)}if(i.length>0&&!Lue(o))for(let a of i)o.add(a);return o}function Due(t,e){if(t instanceof On.AtomTransition&&(0,$r.tokenMatcher)(e,t.tokenType))return t.target}function Iue(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function HM(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function GM(t,e,r,n){return n=WM(t,n),e.edges[r.tokenTypeIdx]=n,n}function WM(t,e){if(e===Eo.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function xue(t){let e=new Eo.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};zp(o,e)}return e}function zp(t,e){let r=t.state;if(r.type===On.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],a={state:i.pop(),alt:t.alt,stack:i};zp(a,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],a=que(t,o);a!==void 0&&zp(a,e)}}function que(t,e){if(e instanceof On.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof On.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function Lue(t){for(let e of t.elements)if(e.state.type===On.ATN_RULE_STOP)return!0;return!1}function Mue(t){for(let e of t.elements)if(e.state.type!==On.ATN_RULE_STOP)return!1;return!0}function $ue(t){if(Mue(t))return!0;let e=Fue(t.elements);return jue(e)&&!Uue(e)}function Fue(t){let e=new Map;for(let r of t){let n=(0,Eo.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function jue(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function Uue(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var KM=d(Vp=>{"use strict";Object.defineProperty(Vp,"__esModule",{value:!0});Vp.LLStarLookaheadStrategy=void 0;var Gue=BM();Object.defineProperty(Vp,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return Gue.LLStarLookaheadStrategy}})});var DT=d(nn=>{"use strict";Object.defineProperty(nn,"__esModule",{value:!0});nn.RootCstNodeImpl=nn.CompositeCstNodeImpl=nn.LeafCstNodeImpl=nn.AbstractCstNode=nn.CstNodeBuilder=void 0;var zM=$a(),Hue=tr(),VM=Le(),OT=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new Xp(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new nl;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new rl(e.startOffset,e.image.length,(0,VM.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();(n==null?void 0:n.children.length)===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new rl(r.startOffset,r.image.length,(0,VM.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.children.length;o++){let a=e.children[o],{offset:s,end:u}=a;if((0,Hue.isCompositeCstNode)(a)&&n>s&&i<u){this.addHiddenToken(a,r);return}else if(i<=s){e.children.splice(o,0,r);return}}e.children.push(r)}};nn.CstNodeBuilder=OT;var tl=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};nn.AbstractCstNode=tl;var rl=class extends tl{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};nn.LeafCstNodeImpl=rl;var nl=class extends tl{constructor(){super(...arguments),this.children=new il(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:zM.Position.create(0,0),end:zM.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};nn.CompositeCstNodeImpl=nl;var il=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,il.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},Xp=class extends nl{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e!=null?e:""}};nn.RootCstNodeImpl=Xp});var Zp=d(vr=>{"use strict";Object.defineProperty(vr,"__esModule",{value:!0});vr.LangiumCompletionParser=vr.LangiumParserErrorMessageProvider=vr.LangiumParser=vr.AbstractLangiumParser=vr.DatatypeSymbol=void 0;var Jp=Ta(),Wue=KM(),Yp=ke(),XM=Ft(),YM=Re(),Bue=DT();vr.DatatypeSymbol=Symbol("Datatype");function IT(t){return t.$type===vr.DatatypeSymbol}var JM="\u200B",QM=t=>t.endsWith(JM)?t:t+JM,ol=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new LT(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};vr.AbstractLangiumParser=ol;var xT=class extends ol{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Bue.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,XM.isDataTypeRule)(e)?vr.DatatypeSymbol:(0,XM.getTypeName)(e),i=this.wrapper.DEFINE_RULE(QM(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===vr.DatatypeSymbol&&(o.value="")}let i;try{i=r(n)}catch(o){i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:a,isCrossRef:s}=this.getAssignment(n),u=this.current;if(a){let c=(0,Yp.isKeyword)(n)?i.image:this.converter.convert(i.image,o);this.assign(a.operator,a.feature,c,o,s)}else if(IT(u)){let c=i.image;(0,Yp.isKeyword)(n)||(c=this.converter.convert(c,o).toString()),u.value+=c}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let a=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(a,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let a=this.current;if(IT(a))a.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,a);s&&(u.$type=s);let c=u;this.stack.pop(),this.stack.push(c)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,YM.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),IT(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,YM.getContainerOfType)(e,Yp.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,Yp.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let a=this.current,s;switch(o&&typeof n=="string"?s=this.linker.buildReference(a,r,i,n):s=n,e){case"=":{a[r]=s;break}case"?=":{a[r]=!0;break}case"+=":Array.isArray(a[r])||(a[r]=[]),a[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}};vr.LangiumParser=xT;var Qp=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return Jp.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return Jp.defaultParserErrorProvider.buildEarlyExitMessage(e)}};vr.LangiumParserErrorMessageProvider=Qp;var qT=class extends ol{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(QM(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};vr.LangiumCompletionParser=qT;var Kue={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Qp},LT=class extends Jp.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},Kue),{lookaheadStrategy:n?new Jp.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new Wue.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var $T=d(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.assertUnreachable=gu.ErrorWithLocation=void 0;var MT=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};gu.ErrorWithLocation=MT;function zue(t){throw new Error("Error! The input value was not handled.")}gu.assertUnreachable=zue});var jT=d(th=>{"use strict";Object.defineProperty(th,"__esModule",{value:!0});th.createParser=void 0;var ZM=Ta(),Ge=ke(),al=$T(),Vue=$t(),e1=Ft(),t1=vt();function Xue(t,e,r){return Yue({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}th.createParser=Xue;function Yue(t,e){let r=(0,t1.getAllReachableRules)(e,!1),n=(0,Vue.stream)(e.rules).filter(Ge.isParserRule).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,ba(o,i.definition)))}}function ba(t,e,r=!1){let n;if((0,Ge.isKeyword)(e))n=nce(t,e);else if((0,Ge.isAction)(e))n=Jue(t,e);else if((0,Ge.isAssignment)(e))n=ba(t,e.terminal);else if((0,Ge.isCrossReference)(e))n=r1(t,e);else if((0,Ge.isRuleCall)(e))n=Que(t,e);else if((0,Ge.isAlternatives)(e))n=ece(t,e);else if((0,Ge.isUnorderedGroup)(e))n=tce(t,e);else if((0,Ge.isGroup)(e))n=rce(t,e);else throw new al.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return n1(t,r?void 0:eh(e),n,e.cardinality)}function Jue(t,e){let r=(0,e1.getTypeName)(e);return()=>t.parser.action(r,e)}function Que(t,e){let r=e.rule.ref;if((0,Ge.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?Zue(r,e.arguments):()=>({});return o=>t.parser.subrule(n,i1(t,r),e,i(o))}else if((0,Ge.isTerminalRule)(r)){let n=t.consume++,i=FT(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,al.assertUnreachable)(r);else throw new al.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function Zue(t,e){let r=e.map(n=>Hi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let a=t.parameters[o],s=r[o];i[a.name]=s(n)}return i}}function Hi(t){if((0,Ge.isDisjunction)(t)){let e=Hi(t.left),r=Hi(t.right);return n=>e(n)||r(n)}else if((0,Ge.isConjunction)(t)){let e=Hi(t.left),r=Hi(t.right);return n=>e(n)&&r(n)}else if((0,Ge.isNegation)(t)){let e=Hi(t.value);return r=>!e(r)}else if((0,Ge.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Ge.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,al.assertUnreachable)(t)}function ece(t,e){if(e.elements.length===1)return ba(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:ba(t,i,!0)},a=eh(i);a&&(o.GATE=Hi(a)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let a={ALT:()=>o.ALT(i)},s=o.GATE;return s&&(a.GATE=()=>s(i)),a}))}}function tce(t,e){if(e.elements.length===1)return ba(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:ba(t,s,!0)},c=eh(s);c&&(u.GATE=Hi(c)),r.push(u)}let n=t.or++,i=(s,u)=>{let c=u.getRuleStack().join("-");return`uGroup_${s}_${c}`},o=s=>t.parser.alternatives(n,r.map((u,c)=>{let l={ALT:()=>!0},f=t.parser;l.ALT=()=>{if(u.ALT(s),!f.isRecording()){let y=i(n,f);f.unorderedGroups.get(y)||f.unorderedGroups.set(y,[]);let m=f.unorderedGroups.get(y);typeof(m==null?void 0:m[c])=="undefined"&&(m[c]=!0)}};let h=u.GATE;return h?l.GATE=()=>h(s):l.GATE=()=>{let y=f.unorderedGroups.get(i(n,f));return!(y!=null&&y[c])},l})),a=n1(t,eh(e),o,"*");return s=>{a(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function rce(t,e){let r=e.elements.map(n=>ba(t,n));return n=>r.forEach(i=>i(n))}function eh(t){if((0,Ge.isGroup)(t))return t.guardCondition}function r1(t,e,r=e.terminal){if(r)if((0,Ge.isRuleCall)(r)&&(0,Ge.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,i1(t,r.rule.ref),e,i)}else if((0,Ge.isRuleCall)(r)&&(0,Ge.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=FT(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Ge.isKeyword)(r)){let n=t.consume++,i=FT(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,t1.findNameAssignment)(e.type.ref),i=n==null?void 0:n.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,e1.getTypeName)(e.type.ref));return r1(t,e,i)}}function nce(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function n1(t,e,r,n){let i=e&&Hi(e);if(!n)if(i){let o=t.or++;return a=>t.parser.alternatives(o,[{ALT:()=>r(a),GATE:()=>i(a)},{ALT:(0,ZM.EMPTY_ALT)(),GATE:()=>!i(a)}])}else return r;if(n==="*"){let o=t.many++;return a=>t.parser.many(o,{DEF:()=>r(a),GATE:i?()=>i(a):void 0})}else if(n==="+"){let o=t.many++;if(i){let a=t.or++;return s=>t.parser.alternatives(a,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,ZM.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return a=>t.parser.atLeastOne(o,{DEF:()=>r(a)})}else if(n==="?"){let o=t.optional++;return a=>t.parser.optional(o,{DEF:()=>r(a),GATE:i?()=>i(a):void 0})}else(0,al.assertUnreachable)(n)}function i1(t,e){let r=ice(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function ice(t,e){if((0,Ge.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Ge.isParserRule)(n);)((0,Ge.isGroup)(n)||(0,Ge.isAlternatives)(n)||(0,Ge.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function FT(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var UT=d(rh=>{"use strict";Object.defineProperty(rh,"__esModule",{value:!0});rh.createCompletionParser=void 0;var oce=Zp(),ace=jT();function sce(t){let e=t.Grammar,r=t.parser.Lexer,n=new oce.LangiumCompletionParser(t);return(0,ace.createParser)(e,n,r.definition),n.finalize(),n}rh.createCompletionParser=sce});var GT=d(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.prepareLangiumParser=yu.createLangiumParser=void 0;var uce=Zp(),cce=jT();function lce(t){let e=o1(t);return e.finalize(),e}yu.createLangiumParser=lce;function o1(t){let e=t.Grammar,r=t.parser.Lexer,n=new uce.LangiumParser(t);return(0,cce.createParser)(e,n,r.definition)}yu.prepareLangiumParser=o1});var BT=d(ih=>{"use strict";Object.defineProperty(ih,"__esModule",{value:!0});ih.DefaultTokenBuilder=void 0;var fce=Ta(),HT=ke(),dce=Ft(),pce=Re(),hce=vt(),nh=Zo(),mce=$t(),WT=class{buildTokens(e,r){let n=(0,mce.stream)((0,hce.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(a=>{let s=a.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,nh.isWhitespaceRegExp)(s)?o.unshift(a):o.push(a)}),o}buildTerminalTokens(e){return e.filter(HT.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,dce.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,nh.isWhitespaceRegExp)(r)?fce.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(HT.isParserRule).flatMap(i=>(0,pce.streamAllContents)(i).filter(HT.isKeyword)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n==null?void 0:n.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,nh.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i==null?void 0:i.PATTERN;return o!=null&&o.source&&(0,nh.partialMatches)("^"+o.source+"$",e.value)&&n.push(i),n},[])}};ih.DefaultTokenBuilder=WT});var zT=d(Ot=>{"use strict";Object.defineProperty(Ot,"__esModule",{value:!0});Ot.convertBoolean=Ot.convertNumber=Ot.convertDate=Ot.convertBigint=Ot.convertInt=Ot.convertID=Ot.convertRegexLiteral=Ot.convertString=Ot.DefaultValueConverter=void 0;var a1=ke(),gce=Ft(),yce=vt(),KT=class{convert(e,r){let n=r.feature;if((0,a1.isCrossReference)(n)&&(n=(0,yce.getCrossReferenceTerminal)(n)),(0,a1.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return l1(r);case"STRING":return s1(r);case"ID":return c1(r);case"REGEXLITERAL":return u1(r)}switch((i=(0,gce.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return p1(r);case"boolean":return h1(r);case"bigint":return f1(r);case"date":return d1(r);default:return r}}};Ot.DefaultValueConverter=KT;function s1(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=vce(i)}else e+=n}return e}Ot.convertString=s1;function vce(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function u1(t){return t.substring(1,t.length-1)}Ot.convertRegexLiteral=u1;function c1(t){return t.charAt(0)==="^"?t.substring(1):t}Ot.convertID=c1;function l1(t){return parseInt(t)}Ot.convertInt=l1;function f1(t){return BigInt(t)}Ot.convertBigint=f1;function d1(t){return new Date(t)}Ot.convertDate=d1;function p1(t){return Number(t)}Ot.convertNumber=p1;function h1(t){return t.toLowerCase()==="true"}Ot.convertBoolean=h1});var YT=d(ah=>{"use strict";Object.defineProperty(ah,"__esModule",{value:!0});ah.DefaultLinker=void 0;var _ce=xe(),vu=tr(),oh=Re(),Tce=br(),VT=fo(),XT=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=_ce.CancellationToken.None){for(let n of(0,oh.streamAst)(e.parseResult.value))await(0,Tce.interruptAndCheck)(r),(0,oh.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=VT.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,vu.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o!=null?o:this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n!=null?n:this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,a={$refNode:n,$refText:i,get ref(){var s;if((0,vu.isAstNode)(this._ref))return this._ref;if((0,vu.isAstNodeDescription)(this._nodeDescription)){let u=o.loadAstNode(this._nodeDescription);this._ref=u!=null?u:o.createLinkingError({reference:a,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=o.getLinkedNode({reference:a,container:e,property:r});if(u.error&&(0,oh.getDocument)(e).state<VT.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,vu.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,vu.isLinkingError)(this._ref)?this._ref:void 0}};return a}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,vu.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,oh.getDocument)(e.container);n.state<VT.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};ah.DefaultLinker=XT});var QT=d(sh=>{"use strict";Object.defineProperty(sh,"__esModule",{value:!0});sh.DefaultJsonSerializer=void 0;var sl=tr(),Rce=Re(),bce=vt();function m1(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var JT=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){let n=r==null?void 0:r.replacer,i=(a,s)=>this.replacer(a,s,r);return JSON.stringify(e,n?(a,s)=>n(a,s,i):i,r==null?void 0:r.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o}={}){var a,s,u;if(!this.ignoreProperties.has(e))if((0,sl.isReference)(r)){let c=r.ref,l=n?r.$refText:void 0;return c?{$refText:l,$ref:"#"+(c&&this.astNodeLocator.getAstNodePath(c))}:{$refText:l,$error:(s=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&s!==void 0?s:"Could not resolve reference"}}else{let c;if(o&&(0,sl.isAstNode)(r)&&(c=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&(c!=null&&c.$textRegion)))try{c.$textRegion.documentURI=(0,Rce.getDocument)(r).uri.toString()}catch(l){}return i&&!e&&(0,sl.isAstNode)(r)&&(c!=null||(c=Object.assign({},r)),c.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),c!=null?c:r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let a=(0,bce.findNodesForProperty)(e.$cstNode,o).map(r);a.length!==0&&(i[o]=a)}),e}}linkNode(e,r,n,i,o){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let c=0;c<u.length;c++){let l=u[c];m1(l)?u[c]=this.reviveReference(e,s,r,l):(0,sl.isAstNode)(l)&&this.linkNode(l,r,e,s,c)}else m1(u)?e[s]=this.reviveReference(e,s,r,u):(0,sl.isAstNode)(u)&&this.linkNode(u,r,e,s);let a=e;a.$container=n,a.$containerProperty=i,a.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let a=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(a)),{$refText:o!=null?o:"",ref:a}}else if(i.$error){let a={$refText:o!=null?o:""};return a.error={container:e,property:r,message:i.$error,reference:a},a}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};sh.DefaultJsonSerializer=JT});var eR=d(uh=>{"use strict";Object.defineProperty(uh,"__esModule",{value:!0});uh.DefaultServiceRegistry=void 0;var Ace=Wr(),ZT=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=Ace.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};uh.DefaultServiceRegistry=ZT});var rR=d(ch=>{"use strict";Object.defineProperty(ch,"__esModule",{value:!0});ch.ValidationRegistry=void 0;var Pce=Tn(),Sce=br(),tR=class{constructor(e){this.validationChecks=new Pce.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let o=i;if(Array.isArray(o))for(let a of o)this.doRegister(n,this.wrapValidationException(a,r));else typeof o=="function"&&this.doRegister(n,this.wrapValidationException(o,r))}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(a){if((0,Sce.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a);let s=a instanceof Error?a.message:String(a);a instanceof Error&&a.stack&&console.error(a.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};ch.ValidationRegistry=tR});var aR=d(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.DefaultReferenceDescriptionProvider=_u.DefaultAstNodeDescriptionProvider=void 0;var Cce=xe(),Ece=tr(),lh=Re(),nR=Le(),Nce=br(),kce=Ci(),iR=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=(0,lh.getDocument)(e)){var i;r!=null||(r=this.nameProvider.getName(e));let o=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${o} has no name.`);let a=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,nR.toDocumentSegment)(a),selectionSegment:(0,nR.toDocumentSegment)(e.$cstNode),type:e.$type,documentUri:n.uri,path:o}}};_u.DefaultAstNodeDescriptionProvider=iR;var oR=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Cce.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of(0,lh.streamAst)(i))await(0,Nce.interruptAndCheck)(r),(0,lh.streamReferences)(o).filter(a=>!(0,Ece.isLinkingError)(a)).forEach(a=>{let s=this.createDescription(a);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,lh.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,nR.toDocumentSegment)(n),local:(0,kce.equalURI)(r.documentUri,i)}}};_u.DefaultReferenceDescriptionProvider=oR});var uR=d(fh=>{"use strict";Object.defineProperty(fh,"__esModule",{value:!0});fh.DefaultAstNodeLocator=void 0;var sR=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let a=o.indexOf(this.indexSeparator);if(a>0){let s=o.substring(0,a),u=parseInt(o.substring(a+1)),c=i[s];return c==null?void 0:c[u]}return i[o]},e)}};fh.DefaultAstNodeLocator=sR});var lR=d(dh=>{"use strict";Object.defineProperty(dh,"__esModule",{value:!0});dh.DefaultConfigurationProvider=void 0;var wce=yt(),cR=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(wce.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};dh.DefaultConfigurationProvider=cR});var pR=d(hh=>{"use strict";Object.defineProperty(hh,"__esModule",{value:!0});hh.DefaultDocumentBuilder=void 0;var ph=xe(),Oce=Tn(),fR=br(),ui=fo(),dR=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new Oce.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=ph.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=ph.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,fR.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),o=this.collectDocuments(i,r),a={validationChecks:"all"};await this.buildDocuments(o,a,n)}onUpdate(e){return this.updateListeners.push(e),ph.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(a=>a.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(a=>{this.serviceRegistry.getServices(a.uri).references.Linker.unlink(a),a.state=Math.min(a.state,ui.DocumentState.ComputedScopes)});let o=new Set([...e,...i,...this.langiumDocuments.all.filter(a=>a.state<ui.DocumentState.Validated)]);return Array.from(o)}async buildDocuments(e,r,n){await this.runCancelable(e,ui.DocumentState.Parsed,n,o=>this.langiumDocumentFactory.update(o)),await this.runCancelable(e,ui.DocumentState.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,ui.DocumentState.ComputedScopes,n,o=>this.computeScopes(o,n)),await this.runCancelable(e,ui.DocumentState.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,ui.DocumentState.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o,r));await this.runCancelable(i,ui.DocumentState.Validated,n,o=>this.validate(o,n))}async runCancelable(e,r,n,i){let o=e.filter(a=>a.state<r);for(let a of o)await(0,fR.interruptAndCheck)(n),await i(a);await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),ph.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await(0,fR.interruptAndCheck)(n),await o(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=ui.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=ui.DocumentState.Validated}};hh.DefaultDocumentBuilder=dR});var yR=d(mh=>{"use strict";Object.defineProperty(mh,"__esModule",{value:!0});mh.DefaultIndexManager=void 0;var g1=xe(),Dce=Re(),hR=$t(),mR=Ci(),y1=fo(),gR=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,Dce.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(a=>{(0,mR.equalURI)(a.targetUri,n)&&a.targetPath===r&&i.push(a)})}),(0,hR.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,hR.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,hR.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=g1.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let o of i)o.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=y1.DocumentState.IndexedContent}async updateReferences(e,r=g1.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=y1.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,mR.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(a=>a.error!==void 0))return!0;let o=this.referenceIndex.get(i);return o?o.filter(a=>!a.local).some(a=>(0,mR.equalURI)(a.targetUri,n)):!1}};mh.DefaultIndexManager=gR});var yh=d(gh=>{"use strict";Object.defineProperty(gh,"__esModule",{value:!0});gh.DefaultWorkspaceManager=void 0;var Ice=xe(),vR=Wr(),xce=br(),_R=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Ice.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(a=>a.LanguageMetaData.fileExtensions),i=[],o=a=>{i.push(a),this.langiumDocuments.hasDocument(a.uri)||this.langiumDocuments.addDocument(a)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(a=>[a,this.getRootFolder(a)]).map(async a=>this.traverseFolder(...a,n,o))),await(0,xce.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return vR.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async a=>{if(this.includeEntry(e,a,n)){if(a.isDirectory)await this.traverseFolder(e,a.uri,n,i);else if(a.isFile){let s=this.langiumDocuments.getOrCreateDocument(a.uri);i(s)}}}))}includeEntry(e,r,n){let i=vR.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=vR.Utils.extname(r.uri);return n.includes(o)}return!1}};gh.DefaultWorkspaceManager=_R});var AR=d(ci=>{"use strict";Object.defineProperty(ci,"__esModule",{value:!0});ci.isTokenTypeDictionary=ci.isIMultiModeLexerDefinition=ci.isTokenTypeArray=ci.DefaultLexer=void 0;var qce=Ta(),TR=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=RR(r)?Object.values(r):r;this.chevrotainLexer=new qce.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(RR(e))return e;let r=bR(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};ci.DefaultLexer=TR;function v1(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}ci.isTokenTypeArray=v1;function bR(t){return t&&"modes"in t&&"defaultMode"in t}ci.isIMultiModeLexerDefinition=bR;function RR(t){return!v1(t)&&!bR(t)}ci.isTokenTypeDictionary=RR});var ER=d(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.isJSDoc=Tu.parseJSDoc=void 0;var De=xe(),Lce=Wr(),Mce=pf(),$ce=Zo();function Fce(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=De.Position.create(0,0));let o=R1(t),a=CR(n),s=Gce({lines:o,position:i,options:a});return zce({index:0,tokens:s,position:i})}Tu.parseJSDoc=Fce;function jce(t,e){let r=CR(e),n=R1(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],a=r.start,s=r.end;return Boolean(a==null?void 0:a.exec(i))&&Boolean(s==null?void 0:s.exec(o))}Tu.isJSDoc=jce;function R1(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Mce.NEWLINE_REGEXP)}var _1=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,Uce=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Gce(t){var e,r,n;let i=[],o=t.position.line,a=t.position.character;for(let s=0;s<t.lines.length;s++){let u=s===0,c=s===t.lines.length-1,l=t.lines[s],f=0;if(u&&t.options.start){let y=(e=t.options.start)===null||e===void 0?void 0:e.exec(l);y&&(f=y.index+y[0].length)}else{let y=(r=t.options.line)===null||r===void 0?void 0:r.exec(l);y&&(f=y.index+y[0].length)}if(c){let y=(n=t.options.end)===null||n===void 0?void 0:n.exec(l);y&&(l=l.substring(0,y.index))}if(l=l.substring(0,Kce(l)),SR(l,0)>=l.length){if(i.length>0){let y=De.Position.create(o,a);i.push({type:"break",content:"",range:De.Range.create(y,y)})}}else{_1.lastIndex=f;let y=_1.exec(l);if(y){let m=y[0],R=y[1],E=De.Position.create(o,a+f),S=De.Position.create(o,a+f+m.length);i.push({type:"tag",content:R,range:De.Range.create(E,S)}),f+=m.length,f=SR(l,f)}if(f<l.length){let m=l.substring(f),R=Array.from(m.matchAll(Uce));i.push(...Hce(R,m,o,a+f))}}o++,a=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Hce(t,e,r,n){let i=[];if(t.length===0){let o=De.Position.create(r,n),a=De.Position.create(r,n+e.length);i.push({type:"text",content:e,range:De.Range.create(o,a)})}else{let o=0;for(let s of t){let u=s.index,c=e.substring(o,u);c.length>0&&i.push({type:"text",content:e.substring(o,u),range:De.Range.create(De.Position.create(r,o+n),De.Position.create(r,u+n))});let l=c.length+1,f=s[1];if(i.push({type:"inline-tag",content:f,range:De.Range.create(De.Position.create(r,o+l+n),De.Position.create(r,o+l+f.length+n))}),l+=f.length,s.length===4){l+=s[2].length;let h=s[3];i.push({type:"text",content:h,range:De.Range.create(De.Position.create(r,o+l+n),De.Position.create(r,o+l+h.length+n))})}else i.push({type:"text",content:"",range:De.Range.create(De.Position.create(r,o+l+n),De.Position.create(r,o+l+n))});o=u+s[0].length}let a=e.substring(o);a.length>0&&i.push({type:"text",content:a,range:De.Range.create(De.Position.create(r,o+n),De.Position.create(r,o+n+a.length))})}return i}var Wce=/\S/,Bce=/\s*$/;function SR(t,e){let r=t.substring(e).match(Wce);return r?e+r.index:t.length}function Kce(t){let e=t.match(Bce);if(e&&typeof e.index=="number")return e.index}function zce(t){var e,r,n,i;let o=De.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new vh([],De.Range.create(o,o));let a=[];for(;t.index<t.tokens.length;){let c=Vce(t,a[a.length-1]);c&&a.push(c)}let s=(r=(e=a[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,u=(i=(n=a[a.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new vh(a,De.Range.create(s,u))}function Vce(t,e){let r=t.tokens[t.index];if(r.type==="tag")return A1(t,!1);if(r.type==="text"||r.type==="inline-tag")return b1(t);Xce(r,e),t.index++}function Xce(t,e){if(e){let r=new _h("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function b1(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Yce(t)),n=e,e=t.tokens[t.index];return new cl(i,De.Range.create(r.range.start,n.range.end))}function Yce(t){return t.tokens[t.index].type==="inline-tag"?A1(t,!0):P1(t)}function A1(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if((i==null?void 0:i.type)==="text")if(e){let o=P1(t);return new ul(n,new cl([o],o.range),e,De.Range.create(r.range.start,o.range.end))}else{let o=b1(t);return new ul(n,o,e,De.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new ul(n,new cl([],o),e,o)}}function P1(t){let e=t.tokens[t.index++];return new _h(e.content,e.range)}function CR(t){if(!t)return CR({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:PR(e,!0),end:PR(r,!1),line:PR(n,!0)}}function PR(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?(0,$ce.escapeRegExp)(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var vh=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=T1(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=T1(r)+i}return r.trim()}},ul=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=Jce(this.name,r,e!=null?e:{});if(typeof o=="string")return o}let n="";(e==null?void 0:e.tag)==="italic"||(e==null?void 0:e.tag)===void 0?n="*":(e==null?void 0:e.tag)==="bold"?n="**":(e==null?void 0:e.tag)==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Jce(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),a=e;if(o>0){let u=SR(e,o);a=e.substring(u),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(a=`\`${a}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,a))!==null&&i!==void 0?i:Qce(e,a)}}function Qce(t,e){try{return Lce.URI.parse(t,!0),`[${e}](${t})`}catch(r){return t}}var cl=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},_h=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function T1(t){return t.endsWith(`
`)?`
`:`

`}});var C1=d(Th=>{"use strict";Object.defineProperty(Th,"__esModule",{value:!0});Th.JSDocDocumentationProvider=void 0;var Zce=tr(),ele=Re(),tle=Le(),S1=ER(),NR=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.grammarConfig=e.parser.GrammarConfig}getDocumentation(e){let r=(0,tle.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules);if((0,Zce.isLeafCstNode)(r)&&(0,S1.isJSDoc)(r))return(0,S1.parseJSDoc)(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let a=o.nameSegment.range.start.line+1,s=o.nameSegment.range.start.character+1,u=o.documentUri.with({fragment:`L${a},${s}`});return`[${n}](${u.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=(0,ele.getDocument)(e).precomputedScopes;if(!i)return;let o=e;do{let s=i.get(o).find(u=>u.name===r);if(s)return s;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};Th.JSDocDocumentationProvider=NR});var kR=d(ko=>{"use strict";var rle=ko&&ko.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),E1=ko&&ko.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&rle(e,t,r)};Object.defineProperty(ko,"__esModule",{value:!0});E1(C1(),ko);E1(ER(),ko)});var vd=d(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.createDefaultSharedModule=Ru.createDefaultModule=void 0;var nle=xe(),ile=mg(),ole=Iv(),ale=UT(),sle=ed(),ule=ev(),cle=rv(),lle=Ff(),fle=Qy(),dle=ov(),ple=hv(),hle=gv(),mle=vv(),gle=GT(),yle=BT(),vle=zT(),_le=YT(),Tle=ns(),Rle=Xf(),ble=Df(),Ale=xf(),Ple=QT(),Sle=eR(),Cle=br(),Ele=Mf(),Nle=rR(),N1=aR(),kle=uR(),wle=lR(),Ole=pR(),k1=fo(),Dle=yR(),Ile=yh(),xle=AR(),qle=kR();function Lle(t){return{documentation:{DocumentationProvider:e=>new qle.JSDocDocumentationProvider(e)},parser:{GrammarConfig:e=>(0,ole.createGrammarConfig)(e),LangiumParser:e=>(0,gle.createLangiumParser)(e),CompletionParser:e=>(0,ale.createCompletionParser)(e),ValueConverter:()=>new vle.DefaultValueConverter,TokenBuilder:()=>new yle.DefaultTokenBuilder,Lexer:e=>new xle.DefaultLexer(e)},lsp:{CompletionProvider:e=>new sle.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new cle.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new dle.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new lle.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new hle.DefaultReferencesProvider(e),DefinitionProvider:e=>new fle.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new ule.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new mle.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new kle.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new N1.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new N1.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new _le.DefaultLinker(e),NameProvider:()=>new Tle.DefaultNameProvider,ScopeProvider:e=>new Ale.DefaultScopeProvider(e),ScopeComputation:e=>new ble.DefaultScopeComputation(e),References:e=>new Rle.DefaultReferences(e)},serializer:{JsonSerializer:e=>new Ple.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new Ele.DefaultDocumentValidator(e),ValidationRegistry:e=>new Nle.ValidationRegistry(e)},shared:()=>t.shared}}Ru.createDefaultModule=Lle;function Mle(t){return{ServiceRegistry:()=>new Sle.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new ple.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new k1.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new k1.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Ole.DefaultDocumentBuilder(e),TextDocuments:()=>new nle.TextDocuments(ile.TextDocument),IndexManager:e=>new Dle.DefaultIndexManager(e),WorkspaceManager:e=>new Ile.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Cle.MutexLock,ConfigurationProvider:e=>new wle.DefaultConfigurationProvider(e)}}}Ru.createDefaultSharedModule=Mle});var O1=d(w1=>{"use strict";Object.defineProperty(w1,"__esModule",{value:!0})});var x1=d(wo=>{"use strict";Object.defineProperty(wo,"__esModule",{value:!0});wo.joinTracedToNodeIf=wo.joinTracedToNode=wo.joinToNode=void 0;var wR=zo();function D1(t,e=String,{filter:r,prefix:n,suffix:i,separator:o,appendNewLineIfNotEmpty:a}={}){return Fle(t,(s,u,c,l)=>{if(r&&!r(u,c,l))return s;let f=e(u,c,l);return(s!=null?s:s=new wR.CompositeGeneratorNode).append(n&&n(u,c,l)).append(f).append(i&&i(u,c,l)).appendIf(!l&&f!==void 0,o).appendNewLineIfNotEmptyIf(!s.isEmpty()&&!!a)})}wo.joinToNode=D1;function I1(t,e){return(r,n=String,i)=>(0,wR.traceToNode)(t,e)(D1(r,t&&e?(o,a,s)=>(0,wR.traceToNode)(t,e,a)(n(o,a,s)):n,i))}wo.joinTracedToNode=I1;function $le(t,e,r){return t?I1(typeof e=="function"?e():e,r):()=>{}}wo.joinTracedToNodeIf=$le;function Fle(t,e,r){let n=t[Symbol.iterator](),i=n.next(),o=0,a=r;for(;!i.done;){let s=n.next();a=e(a,i.value,o,Boolean(s.done)),i=s,o++}return a}});var q1=d(_r=>{"use strict";var jle=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),OR=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&jle(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.normalizeEOL=_r.expandToStringWithNL=_r.expandToString=void 0;OR(zo(),_r);OR(x1(),_r);OR(wg(),_r);var DR=pf();Object.defineProperty(_r,"expandToString",{enumerable:!0,get:function(){return DR.expandToString}});Object.defineProperty(_r,"expandToStringWithNL",{enumerable:!0,get:function(){return DR.expandToStringWithNL}});Object.defineProperty(_r,"normalizeEOL",{enumerable:!0,get:function(){return DR.normalizeEOL}})});var M1=d(L1=>{"use strict";Object.defineProperty(L1,"__esModule",{value:!0})});var $1=d(li=>{"use strict";var Ule=li&&li.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Rh=li&&li.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ule(e,t,r)};Object.defineProperty(li,"__esModule",{value:!0});Rh(uy(),li);Rh(Iv(),li);Rh(Nv(),li);Rh(M1(),li)});var j1=d(F1=>{"use strict";Object.defineProperty(F1,"__esModule",{value:!0})});var U1=d(Nr=>{"use strict";var Gle=Nr&&Nr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Oo=Nr&&Nr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Gle(e,t,r)};Object.defineProperty(Nr,"__esModule",{value:!0});Oo(UT(),Nr);Oo(DT(),Nr);Oo(GT(),Nr);Oo(Zp(),Nr);Oo(AR(),Nr);Oo(j1(),Nr);Oo(BT(),Nr);Oo(zT(),Nr)});var G1=d(Dn=>{"use strict";var Hle=Dn&&Dn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ll=Dn&&Dn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Hle(e,t,r)};Object.defineProperty(Dn,"__esModule",{value:!0});ll(YT(),Dn);ll(ns(),Dn);ll(Xf(),Dn);ll(Df(),Dn);ll(xf(),Dn)});var H1=d(Aa=>{"use strict";var Wle=Aa&&Aa.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ble=Aa&&Aa.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Wle(e,t,r)};Object.defineProperty(Aa,"__esModule",{value:!0});Ble(QT(),Aa)});var W1=d(Tr=>{"use strict";var Kle=Tr&&Tr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Wi=Tr&&Tr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Kle(e,t,r)};Object.defineProperty(Tr,"__esModule",{value:!0});Wi(Re(),Tr);Wi(Tn(),Tr);Wi(Le(),Tr);Wi($T(),Tr);Wi(vt(),Tr);Wi(br(),Tr);Wi(Zo(),Tr);Wi($t(),Tr);Wi(Ci(),Tr)});var K1=d(Do=>{"use strict";var zle=Do&&Do.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),B1=Do&&Do.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&zle(e,t,r)};Object.defineProperty(Do,"__esModule",{value:!0});B1(Mf(),Do);B1(rR(),Do)});var z1=d(kr=>{"use strict";var Vle=kr&&kr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Io=kr&&kr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Vle(e,t,r)};Object.defineProperty(kr,"__esModule",{value:!0});Io(aR(),kr);Io(uR(),kr);Io(lR(),kr);Io(pR(),kr);Io(fo(),kr);Io(kv(),kr);Io(yR(),kr);Io(yh(),kr)});var X1=d(He=>{"use strict";var V1=He&&He.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Xle=He&&He.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Rr=He&&He.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&V1(e,t,r)},Yle=He&&He.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&V1(e,t,r);return Xle(e,t),e};Object.defineProperty(He,"__esModule",{value:!0});He.GrammarAST=void 0;Rr(vd(),He);Rr(Vu(),He);Rr(eR(),He);Rr(O1(),He);Rr(tr(),He);Rr(kR(),He);Rr(q1(),He);Rr($1(),He);Rr(Tv(),He);Rr(U1(),He);Rr(G1(),He);Rr(H1(),He);Rr(W1(),He);Rr(K1(),He);Rr(z1(),He);var Jle=Yle(ke());He.GrammarAST=Jle});var Y1=d(xo=>{"use strict";var Qle=xo&&xo.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(xo,"__esModule",{value:!0});xo.NodeFileSystem=xo.NodeFileSystemProvider=void 0;var IR=Qle(require("fs")),Zle=Wr(),bh=class{constructor(){this.encoding="utf-8"}readFile(e){return IR.default.promises.readFile(e.fsPath,this.encoding)}readFileSync(e){return IR.default.readFileSync(e.fsPath,this.encoding)}async readDirectory(e){return(await IR.default.promises.readdir(e.fsPath,{withFileTypes:!0})).map(n=>({dirent:n,isFile:n.isFile(),isDirectory:n.isDirectory(),uri:Zle.Utils.joinPath(e,n.name)}))}};xo.NodeFileSystemProvider=bh;xo.NodeFileSystem={fileSystemProvider:()=>new bh}});var J1=d(Pa=>{"use strict";var efe=Pa&&Pa.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),tfe=Pa&&Pa.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&efe(e,t,r)};Object.defineProperty(Pa,"__esModule",{value:!0});tfe(Y1(),Pa)});var Z1=d((mTe,Q1)=>{Q1.exports=J1()});var t$=d((gTe,e$)=>{"use strict";e$.exports=xe()});var f$=d((yTe,l$)=>{function r$(t){return Array.isArray(t)?t:[t]}var a$="",n$=" ",xR="\\",rfe=/^\s+$/,nfe=/(?:[^\\]|^)\\$/,ife=/^\\!/,ofe=/^\\#/,afe=/\r?\n/g,sfe=/^\.*\/|^\.+$/,qR="/",s$="node-ignore";typeof Symbol<"u"&&(s$=Symbol.for("node-ignore"));var i$=s$,ufe=(t,e,r)=>Object.defineProperty(t,e,{value:r}),cfe=/([0-z])-([0-z])/g,u$=()=>!1,lfe=t=>t.replace(cfe,(e,r,n)=>r.charCodeAt(0)<=n.charCodeAt(0)?e:a$),ffe=t=>{let{length:e}=t;return t.slice(0,e-e%2)},dfe=[[/\\?\s+$/,t=>t.indexOf("\\")===0?n$:a$],[/\\\s/g,()=>n$],[/[\\$.|*+(){^]/g,t=>`\\${t}`],[/(?!\\)\?/g,()=>"[^/]"],[/^\//,()=>"^"],[/\//g,()=>"\\/"],[/^\^*\\\*\\\*\\\//,()=>"^(?:.*\\/)?"],[/^(?=[^^])/,function(){return/\/(?!$)/.test(this)?"^":"(?:^|\\/)"}],[/\\\/\\\*\\\*(?=\\\/|$)/g,(t,e,r)=>e+6<r.length?"(?:\\/[^\\/]+)*":"\\/.+"],[/(^|[^\\]+)(\\\*)+(?=.+)/g,(t,e,r)=>{let n=r.replace(/\\\*/g,"[^\\/]*");return e+n}],[/\\\\\\(?=[$.|*+(){^])/g,()=>xR],[/\\\\/g,()=>xR],[/(\\)?\[([^\]/]*?)(\\*)($|\])/g,(t,e,r,n,i)=>e===xR?`\\[${r}${ffe(n)}${i}`:i==="]"&&n.length%2===0?`[${lfe(r)}${n}]`:"[]"],[/(?:[^*])$/,t=>/\/$/.test(t)?`${t}$`:`${t}(?=$|\\/$)`],[/(\^|\\\/)?\\\*$/,(t,e)=>`${e?`${e}[^/]+`:"[^/]*"}(?=$|\\/$)`]],o$=Object.create(null),pfe=(t,e)=>{let r=o$[t];return r||(r=dfe.reduce((n,i)=>n.replace(i[0],i[1].bind(t)),t),o$[t]=r),e?new RegExp(r,"i"):new RegExp(r)},$R=t=>typeof t=="string",hfe=t=>t&&$R(t)&&!rfe.test(t)&&!nfe.test(t)&&t.indexOf("#")!==0,mfe=t=>t.split(afe),LR=class{constructor(e,r,n,i){this.origin=e,this.pattern=r,this.negative=n,this.regex=i}},gfe=(t,e)=>{let r=t,n=!1;t.indexOf("!")===0&&(n=!0,t=t.substr(1)),t=t.replace(ife,"!").replace(ofe,"#");let i=pfe(t,e);return new LR(r,t,n,i)},yfe=(t,e)=>{throw new e(t)},Bi=(t,e,r)=>$R(t)?t?Bi.isNotRelative(t)?r(`path should be a \`path.relative()\`d string, but got "${e}"`,RangeError):!0:r("path must not be empty",TypeError):r(`path must be a string, but got \`${e}\``,TypeError),c$=t=>sfe.test(t);Bi.isNotRelative=c$;Bi.convert=t=>t;var MR=class{constructor({ignorecase:e=!0,ignoreCase:r=e,allowRelativePaths:n=!1}={}){ufe(this,i$,!0),this._rules=[],this._ignoreCase=r,this._allowRelativePaths=n,this._initCache()}_initCache(){this._ignoreCache=Object.create(null),this._testCache=Object.create(null)}_addPattern(e){if(e&&e[i$]){this._rules=this._rules.concat(e._rules),this._added=!0;return}if(hfe(e)){let r=gfe(e,this._ignoreCase);this._added=!0,this._rules.push(r)}}add(e){return this._added=!1,r$($R(e)?mfe(e):e).forEach(this._addPattern,this),this._added&&this._initCache(),this}addPattern(e){return this.add(e)}_testOne(e,r){let n=!1,i=!1;return this._rules.forEach(o=>{let{negative:a}=o;if(i===a&&n!==i||a&&!n&&!i&&!r)return;o.regex.test(e)&&(n=!a,i=a)}),{ignored:n,unignored:i}}_test(e,r,n,i){let o=e&&Bi.convert(e);return Bi(o,e,this._allowRelativePaths?u$:yfe),this._t(o,r,n,i)}_t(e,r,n,i){if(e in r)return r[e];if(i||(i=e.split(qR)),i.pop(),!i.length)return r[e]=this._testOne(e,n);let o=this._t(i.join(qR)+qR,r,n,i);return r[e]=o.ignored?o:this._testOne(e,n)}ignores(e){return this._test(e,this._ignoreCache,!1).ignored}createFilter(){return e=>!this.ignores(e)}filter(e){return r$(e).filter(this.createFilter())}test(e){return this._test(e,this._testCache,!0)}},Ah=t=>new MR(t),vfe=t=>Bi(t&&Bi.convert(t),t,u$);Ah.isPathValid=vfe;Ah.default=Ah;l$.exports=Ah;if(typeof process<"u"&&(process.env&&process.env.IGNORE_TEST_WIN32||process.platform==="win32")){let t=r=>/^\\\\\?\\/.test(r)||/["<>|\u0000-\u001F]+/u.test(r)?r:r.replace(/\\/g,"/");Bi.convert=t;let e=/^[a-z]:\//i;Bi.isNotRelative=r=>e.test(r)||c$(r)}});var bfe={};P$(bfe,{LangiumGrammarSharedModule:()=>v$});module.exports=S$(bfe);var Ch=hi(X1()),y$=hi(Z1()),Eh=hi(t$());var d$=hi(f$()),p$=hi(cy()),h$=hi(yh()),m$=hi(require("path")),g$=hi(yt()),Sh=hi(Wr()),_fe="build",Ph=class extends h$.DefaultWorkspaceManager{constructor(r){super(r);this.configurationProvider=r.workspace.ConfigurationProvider}async initializeWorkspace(r,n=g$.CancellationToken.None){var a,s,u;let o=(u=(s=(a=(await this.configurationProvider.getConfiguration(p$.LangiumGrammarLanguageMetaData.languageId,_fe)).ignorePatterns)==null?void 0:a.split(","))==null?void 0:s.map(c=>c.trim()))==null?void 0:u.filter(c=>c.length>0);return this.matcher=o?(0,d$.default)().add(o):void 0,super.initializeWorkspace(r,n)}includeEntry(r,n,i){if(this.matcher){let o=m$.relative(Sh.URI.parse(r.uri).path,n.uri.path);return!this.matcher.ignores(o)&&(n.isDirectory||n.isFile&&i.includes(Sh.Utils.extname(n.uri)))}return super.includeEntry(r,n,i)}};var Tfe=(0,Eh.createConnection)(Eh.ProposedFeatures.all),v$={workspace:{WorkspaceManager:t=>new Ph(t)}},{shared:Rfe}=(0,Ch.createLangiumGrammarServices)(HR({connection:Tfe},y$.NodeFileSystem),v$);(0,Ch.startLanguageServer)(Rfe);0&&(module.exports={LangiumGrammarSharedModule});
