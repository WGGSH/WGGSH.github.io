(window.webpackJsonp=window.webpackJsonp||[]).push([[11,4],{400:function(t,e,n){var content=n(403);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("56f44eb8",content,!0,{sourceMap:!1})},402:function(t,e,n){"use strict";n(400)},403:function(t,e,n){var r=n(20)(!1);r.push([t.i,".btn{text-align:left;display:block!important;white-space:normal!important;word-wrap:anywhere!important;height:auto!important;padding:0!important;text-transform:none;background:var(--v-primary-background)}.btn .subtitle{font-size:16px;padding:0}.btn.link .subtitle .text{text-decoration:underline}.btn.link .subtitle .icon{text-decoration:none!important}.card>.title{padding:4px;background-color:var(--v-primary-base);color:#000;text-decoration:underline}.card>.content,.card>.image{margin-bottom:16px}.card>.content>.subtitle{padding:0 16px;margin:0;font-size:16px}.card>.content>.texts{padding:0 16px}.card>.content>.texts>.text{padding:0 0 0 16px;font-size:12px}",""]),t.exports=r},405:function(t,e,n){"use strict";n.r(e);var r=n(262),c=n(423),o=n(399),l=n(186),f=n(160),d=n(29),h=n(30),m=n(42),x=n(38),v=n(27),y=n(22),_=(n(15),n(5),n(81),n(401));function O(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(v.a)(t);if(e){var c=Object(v.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(x.a)(this,n)}}var j=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(y.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},R=function(t){Object(m.a)(n,t);var e=O(n);function n(){return Object(d.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"hasLink",value:function(content){return!!content.url}}]),n}(_.c);j([Object(_.b)({type:Object,required:!0})],R.prototype,"item",void 0);var k=R=j([_.a],R),w=(n(402),n(90)),component=Object(w.a)(k,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(c.a,{staticClass:"card",attrs:{width:"100%",height:"100%",elevation:"24"}},[e(o.c,{staticClass:"title"},[t._v("\n    "+t._s(t.item.header)+"\n  ")]),t._v(" "),t.item.image?e(f.a,{staticClass:"image",attrs:{src:t.item.image}}):t._e(),t._v(" "),t._l(t.item.contents,(function(content,n){return e("div",{key:n,staticClass:"content"},[e(o.a,{staticClass:"subtitle"},[t.hasLink(content)?e(r.a,{staticClass:"btn",class:{link:t.hasLink(content)},attrs:{nuxt:"",href:content.url,text:"","x-small":"",target:"_blank"}},[e(o.b,{staticClass:"subtitle"},[e("span",{staticClass:"text"},[t._v("\n            "+t._s(content.title)+"\n          ")]),t._v(" "),e(l.a,{staticClass:"icon",attrs:{small:"",color:"accent"}},[t._v("\n            mdi-open-in-new\n          ")])],1)],1):[t._v("\n        "+t._s(content.title)+"\n      ")]],2),t._v(" "),e("div",{staticClass:"texts"},t._l(content.texts,(function(text){return e(o.b,{key:text,staticClass:"text"},[t._v("\n        "+t._s(text)+"\n      ")])})),1)],1)}))],2)}),[],!1,null,null,null);e.default=component.exports},457:function(t,e,n){"use strict";n.r(e);var r=n(454),c=n(398),o=n(453),l=(n(81),n(30)),f=n(29),d=n(42),h=n(38),m=n(27),x=n(22),v=(n(15),n(5),n(37),n(401));function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(m.a)(t);if(e){var c=Object(m.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var _=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(x.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},O=function(t){Object(d.a)(n,t);var e=y(n);function n(){var t;return Object(f.a)(this,n),(t=e.apply(this,arguments)).name="Profile",t.cards=[{header:"About",contents:[{title:"Name",texts:["安田 直樹(YASUDA Naoki)"]},{title:"Twitter",url:"https://twitter.com/wgg_sh",texts:["@WGG_SH"]},{title:"Github",url:"https://github.com/wggsh",texts:["@WGGSH"]},{title:"Age",texts:["26"]},{title:"Education",texts:["立命館大学 情報理工学部 (Information Science)"]},{title:"Like",texts:["Game","Programming","CG","VR","Running"]}]},{header:"History 2020",contents:[{title:"Processing Community Day Tokyo 2020",url:"https://pcd-tokyo.github.io/2020/",texts:["LT: プログラミング初学者向けのp5.jsを用いた弾幕プログラミングのすすめ"]}]},{header:"2019",contents:[{title:"Gotanda.js #13",url:"https://gotandajs.connpass.com/event/144221/",texts:["LT: JavaScriptで広げるxRの世界"]}]},{header:"2018",contents:[{title:"マスコットアプリ文化祭 2018",url:"https://mascot-apps-contest.azurewebsites.net/2018/About",texts:["GMOインターネット株式会社 このは&あんず賞"]}]},{header:"2017",contents:[{title:"株式会社エイチーム ゲームプログラマインターン",texts:["エイチームマインド賞"]},{title:"マスコットアプリ文化祭2017",url:"https://mascot-apps-contest.azurewebsites.net/2017/About",texts:["株式会社ポケット・クエリーズ あいぼりぃたん賞","GMOインターネット株式会社 美雲あんず賞"]},{title:"立命館大学主催 あいちゃれグローバル2017",texts:["ファイナリスト選出"]},{title:"SECCON 2017 Online CTF",url:"https://2017.seccon.jp/",texts:["177位 (Team RiST)"]}]},{header:"2016",contents:[{title:"マスコットアプリ文化祭2016",url:"https://mascot-apps-contest.azurewebsites.net/2016/About",texts:["株式会社ポケット・クエリーズ 最先端技術賞","株式会社ディー・エヌ・エー ハッカドール賞 - MMD利用部門","きみわたプロジェクト 君と私とせんばこき賞"]}]},{header:"2015",contents:[{title:"マスコットアプリ文化祭2015",url:"https://mascot-apps-contest.azurewebsites.net/2015/About",texts:["株式会社ポケット・クエリーズ リズちゃん賞","株式会社DMM.comラボ DMM.comラボ賞","京都府精華町役場 京町セイカ賞"]},{title:"株式会社コロプラ主催 VRHACK祭",url:"https://be-ars.colopl.co.jp/company/vr_hackathon/000290.html",texts:["優勝 - 作品:清水DIVE"]}]}],t}return Object(l.a)(n)}(v.c),j=O=_([v.a],O),R=n(90),component=Object(R.a)(j,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(c.a,{staticClass:"profile"},[e(o.a,t._l(t.cards,(function(t,n){return e(r.a,{key:n,attrs:{cols:"12",sm:"6"}},[e("Card",{attrs:{item:t}})],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Card:n(405).default})}}]);