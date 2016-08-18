//文字时钟
function toDou(n){
	return n<10?'0'+n:''+n;
}
function time(){
	var arr = ['日','一','二','三','四','五','六'];
	var oDate = new Date();
	var year = oDate.getFullYear();
	var month =oDate.getMonth()+1;
	var week = oDate.getDay();
	var date = oDate.getDate();
	
	var h = oDate.getHours();
	var m = oDate.getMinutes();
	var s = oDate.getSeconds();
	var oTime = document.getElementById('time');
	oTime.innerHTML = year+'年 '+toDou(month)+'月'+toDou(date)+'日 <br/>星期'+arr[week]+' '+toDou(h)+':'+toDou(m)+':'+toDou(s);
}	

//nav
function tab(obj){
	for(var i=0;i<obj.length;i++){
		obj[i].onmouseover=function(){
			for(var i=0;i<obj.length;i++){
				obj[i].className='nav_li';
			}
			this.className='nav_li active';
		};
	}
}

//skill
function createCircle(obj){	
	var R = obj.offsetWidth/2;
	var a = 0;
	var N = 8;
	function d2a(n){
		return n*Math.PI/180;
	}
	function a2d(n){
		return n*180/Math.PI;
	}
	//创建了8个小球
	for(var i = 0;i<N;i++){
		var oS = document.createElement('span');
		var x = R+R*Math.sin(d2a(i*360/N));
		var y = R-R*Math.cos(d2a(i*360/N));
		oS.style.left = x+'px';
		oS.style.top = y+'px';
		obj.appendChild(oS);
	}
}

//works
function through(obj){
	function a2d(n){
		return 	n*180/Math.PI;
	}
	function rnd(m,n){
		return Math.floor(m+Math.random()*(n-m));
	}
	//判断鼠标从哪个边移入
	function hoverDir(obj,ev){
		var sT = document.documentElement.scrollTop ||document.body.scrollTop;
		var x = obj.offsetLeft+obj.offsetWidth/2 - ev.clientX;
		var y = obj.offsetTop+obj.offsetHeight/2 - (ev.clientY+sT);
		return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
	}
	function moveIn(ev){
		var oEvent = ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[1];
		oS.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				oS.style.left = '180px';
				oS.style.top = 0;
			break;
			case 1:
				oS.style.top = '220px';
				oS.style.left = 0;
			break;
			case 2:
				oS.style.left = '-180px';
				oS.style.top = 0;
			break;
			case 3:
				oS.style.top = '-220px';
				oS.style.left = 0;
			break;
		}
		move(oS,{left:0,top:0});
	}
	obj.addEventListener('mouseover',moveIn,false);
	
	function moveOut(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[1];
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				move(oS,{left:180,top:0});
			break;
			case 1:
				move(oS,{left:0,top:220});
			break;
			case 2:
				move(oS,{left:-180,top:0});
			break;
			case 3:
				move(oS,{left:0,top:-220});
			break;
		}
	}
	obj.addEventListener('mouseout',moveOut,false);
}