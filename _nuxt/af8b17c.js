(window.webpackJsonp=window.webpackJsonp||[]).push([[8,4],{400:function(t,e,n){var content=n(403);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("56f44eb8",content,!0,{sourceMap:!1})},402:function(t,e,n){"use strict";n(400)},403:function(t,e,n){var r=n(20)(!1);r.push([t.i,".btn{text-align:left;display:block!important;white-space:normal!important;word-wrap:anywhere!important;height:auto!important;padding:0!important;text-transform:none;background:var(--v-primary-background)}.btn .subtitle{font-size:16px;padding:0}.btn.link .subtitle .text{text-decoration:underline}.btn.link .subtitle .icon{text-decoration:none!important}.card>.title{padding:4px;background-color:var(--v-primary-base);color:#000;text-decoration:underline}.card>.content,.card>.image{margin-bottom:16px}.card>.content>.subtitle{padding:0 16px;margin:0;font-size:16px}.card>.content>.texts{padding:0 16px}.card>.content>.texts>.text{padding:0 0 0 16px;font-size:12px}",""]),t.exports=r},405:function(t,e,n){"use strict";n.r(e);var r=n(262),c=n(423),o=n(399),l=n(186),f=n(160),d=n(29),v=n(30),h=n(42),y=n(38),m=n(27),x=n(22),_=(n(15),n(5),n(81),n(401));function O(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(m.a)(t);if(e){var c=Object(m.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(y.a)(this,n)}}var j=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(x.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},k=function(t){Object(h.a)(n,t);var e=O(n);function n(){return Object(d.a)(this,n),e.apply(this,arguments)}return Object(v.a)(n,[{key:"hasLink",value:function(content){return!!content.url}}]),n}(_.c);j([Object(_.b)({type:Object,required:!0})],k.prototype,"item",void 0);var R=k=j([_.a],k),C=(n(402),n(90)),component=Object(C.a)(R,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(c.a,{staticClass:"card",attrs:{width:"100%",height:"100%",elevation:"24"}},[e(o.c,{staticClass:"title"},[t._v("\n    "+t._s(t.item.header)+"\n  ")]),t._v(" "),t.item.image?e(f.a,{staticClass:"image",attrs:{src:t.item.image}}):t._e(),t._v(" "),t._l(t.item.contents,(function(content,n){return e("div",{key:n,staticClass:"content"},[e(o.a,{staticClass:"subtitle"},[t.hasLink(content)?e(r.a,{staticClass:"btn",class:{link:t.hasLink(content)},attrs:{nuxt:"",href:content.url,text:"","x-small":"",target:"_blank"}},[e(o.b,{staticClass:"subtitle"},[e("span",{staticClass:"text"},[t._v("\n            "+t._s(content.title)+"\n          ")]),t._v(" "),e(l.a,{staticClass:"icon",attrs:{small:"",color:"accent"}},[t._v("\n            mdi-open-in-new\n          ")])],1)],1):[t._v("\n        "+t._s(content.title)+"\n      ")]],2),t._v(" "),e("div",{staticClass:"texts"},t._l(content.texts,(function(text){return e(o.b,{key:text,staticClass:"text"},[t._v("\n        "+t._s(text)+"\n      ")])})),1)],1)}))],2)}),[],!1,null,null,null);e.default=component.exports},454:function(t,e,n){"use strict";n.r(e);var r=n(453),c=n(398),o=n(452),l=(n(81),n(30)),f=n(29),d=n(42),v=n(38),h=n(27),y=n(22),m=(n(15),n(5),n(37),n(401));function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(h.a)(t);if(e){var c=Object(h.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(v.a)(this,n)}}var _=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(y.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},O=function(t){Object(d.a)(n,t);var e=x(n);function n(){var t;return Object(f.a)(this,n),(t=e.apply(this,arguments)).name="Contact ",t.cards=[{header:"Contact",contents:[{texts:["Twitter: @WGG_SH","naokipgt<at>gmail.com","まで連絡ください"]}]}],t}return Object(l.a)(n)}(m.c),j=O=_([m.a],O),k=n(90),component=Object(k.a)(j,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(c.a,{staticClass:"contact"},[e(o.a,t._l(t.cards,(function(t,n){return e(r.a,{key:n,attrs:{cols:"12",sm:"12"}},[e("Card",{attrs:{item:t}})],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Card:n(405).default})}}]);