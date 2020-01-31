/*===================================================================
動く時計　Silly Clock - http://www.btinternet.com/~kurt.grigg/javascript（閉鎖済）
掲載サイト：http://www.kurtsdhtml.talktalk.net/　　★ソースを簡略化。2016/05/29
====================================================================*/
(function (){  //即時関数で囲んでグローバル変数を消すため、この行はこのままで
//Configure here... //Clock colours

var dCol='#0f0'; //date colour.★一番外の円周の色
var fCol='#fff'; //face colour.★内側の円周の色
var sCol='#acf'; //seconds colour.★秒針の色
var mCol='#f0f'; //minutes colour.★分針の色
var hCol='#f00'; //hours colour.★時間針の色

//Controls
var del=0.6;     //follow mouse speed.★原本0.6。マウスが変形する速度。1で円のままになり0で停止。数値が小さいほど遅い
var rep=30;      //run speed (setTimeout).★原本30。マウスを追う速度。数値が大きいほど遅い

//End.指定ここまで---------------------------------------------------------------------------------------------------
var theDays=["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
var theMonths=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var r,h,w;
var my=10;
var mx=10;
var timer=null;
var vis=true;//消え付けのスイッチ
var ofy=-7;
var ofx=-3;
var ofst=70;
var date=new Date();
var day=date.getDate();
var year=date.getFullYear();//最新修正
var dt=" "+theDays[date.getDay()]+" "+day+" "+theMonths[date.getMonth()]+" "+year;
var todaysDate=dt.split(""), tdlen=todaysDate.length;
var clockFace="3 4 5 6 7 8 9 10 11 12 1 2", cfa=clockFace.split(" "), cflen=cfa.length;
var _h="...", hourfin=_h.split(""), hlen=hourfin.length;
var _m="....", minfin=_m.split(""), mlen=minfin.length;
var _s=".....", secfin=_s.split(""), slen=secfin.length;
var dims = 40;
var Q1 = 360/cflen;
var Q2 = 360/todaysDate.length;
var handlen = dims/5.5;
var dy=[], dx=[], zy=[], zx=[], S=[], M=[], H=[], Da=[], Dt=[];
var sum = tdlen + cflen + hlen + mlen + slen + 1;
for (i=0; i<sum; i++){dy[i]=0;dx[i]=0;zy[i]=0;zx[i]=0;}
var cssk='position:absolute; top:0; left:0; font-family:Arial,sans-serif;text-align:center;';//■時計の共通のCSS指定
var css1=cssk+'width:16px; height:16px; font-size:16px; font-weight:bold;';//■色以外の時計の針のCSS指定
var css2=cssk+'width:10px; height:10px; font-size:10px;';//■色以外の時計の数字のCSS指定
for (i=0; i<tdlen; i++){document.write('<div id="_date'+i+'" style="color:'+dCol+';'+css2+'">'+todaysDate[i]+'<\/div>');}
for (i=0; i<cflen; i++){document.write('<div id="_face'+i+'" style="color:'+fCol+';'+css2+'">'+cfa[i]+'<\/div>');}
for (i=0; i<hlen; i++){document.write('<div id="_hours'+i+'" style="color:'+hCol+';'+css1+'">'+hourfin[i]+'<\/div>');}
for (i=0; i<mlen; i++){document.write('<div id="_minutes'+i+'" style="color:'+mCol+';'+css1+'">'+minfin[i]+'<\/div>');}
for (i=0; i<slen; i++){document.write('<div id="_seconds'+i+'" style="color:'+sCol+';'+css1+'">'+secfin[i]+'<\/div>');}
function winsize(){ h=window.innerHeight-18; w=window.innerWidth-18;}
function scrl(yx){var y,x; y=window.pageYOffset; x=window.pageXOffset;return (yx===0)?y:x;}
function mouse(e){var msy=window.pageYOffset; my=e.pageY+ofst-msy; mx= e.pageX+ofst;}
document.onmousemove=mouse;
function theClock(){ 
var time=new Date();
var secs=time.getSeconds();
var sec=Math.PI * ((secs-15)/30);
var mins=time.getMinutes();
var min=Math.PI * ((mins-15)/30);
var hrs=time.getHours();
var hr=Math.PI * ((hrs-3)/6)+Math.PI * time.getMinutes()/360;
for (i=0; i<slen; i++){
S[i].top=dy[tdlen+cflen+hlen+mlen+i]+ofy+(i*handlen) * Math.sin(sec)+scrl(0)+"px";
S[i].left=dx[tdlen+cflen+hlen+mlen+i]+ofx+(i*handlen) * Math.cos(sec)+"px";
}
for (i=0; i<mlen; i++){
M[i].top=dy[tdlen+cflen+hlen+i]+ofy+(i*handlen) * Math.sin(min)+scrl(0)+"px";
M[i].left=dx[tdlen+cflen+hlen+i]+ofx+(i*handlen) * Math.cos(min)+"px";
}
for (i=0; i<hlen; i++){
H[i].top=dy[tdlen+cflen+i]+ofy+(i*handlen) * Math.sin(hr)+scrl(0)+"px";
H[i].left=dx[tdlen+cflen+i]+ofx+(i*handlen) * Math.cos(hr)+"px";
}
for (i=0; i<cflen; i++){
Da[i].top=dy[tdlen+i]+dims * Math.sin(i*Q1*Math.PI/180)+scrl(0)+"px";
Da[i].left=dx[tdlen+i]+dims * Math.cos(i*Q1*Math.PI/180)+"px";
}
for (i=0; i<tdlen; i++){
Dt[i].top=dy[i]+dims*1.5 * Math.sin(-sec+i*Q2*Math.PI/180)+scrl(0)+"px";
Dt[i].left=dx[i]+dims*1.5 * Math.cos(-sec+i*Q2*Math.PI/180)+"px";
}
if (!vis){clearTimeout(timer)}
}
function OnOff(){
vis=!vis;
document.getElementById("clockcontrol").value =vis? "Clock Off":"Clock On";
document.onmousemove=vis? mouse:null;
if (vis){init();}
}
function Delay(){
if (!vis){ dy[0]=-100; dx[0]=-100;}
else{ zy[0]=Math.round(dy[0]+=((my)-dy[0])*del); zx[0]=Math.round(dx[0]+=((mx)-dx[0])*del);}
for (i=1; i < sum; i++){
if (!vis){ dy[i]=-100; dx[i]=-100;}
else{ zy[i]=Math.round(dy[i]+=(zy[i-1]-dy[i])*del); zx[i]=Math.round(dx[i]+=(zx[i-1]-dx[i])*del); }
if (dy[i-1] >= h-80) dy[i-1]=h-80;
if (dx[i-1] >= w-80) dx[i-1]=w-80;
}
timer = setTimeout(Delay,rep);
theClock();
}
function init(){
for (i=0; i<tdlen; i++){ Dt[i]=document.getElementById("_date"+i).style;}
for (i=0; i<cflen; i++){ Da[i]=document.getElementById("_face"+i).style;}
for (i=0; i<hlen; i++){ H[i]=document.getElementById("_hours"+i).style;}
for (i=0; i<mlen; i++){ M[i]=document.getElementById("_minutes"+i).style;}
for (i=0; i<slen; i++){ S[i]=document.getElementById("_seconds"+i).style;}
winsize();
Delay();
}
init();
}())//即時関数終了
