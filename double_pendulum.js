window.addEventListener("load", main, false);
function main(){
	var ctx = canvas_example.getContext('2d');
	var w = canvas_example.width;
	var h = canvas_example.height;
	var g = 9.8;
	var l1 = w/5;
	var l2 = w/5;
	var time = 0;
	var dt = 0.1;
	var k = 0.1; 
	var delta1 = Math.PI/2;
	var delta2 = Math.PI/2;
	var x11 = l1*Math.sin(delta1);
	var y11 = l1 - l1*Math.cos(delta1);
	var x1 = w/2 + x11;
	var y1 = h/4 + l1 - y11;
	var x22 = l1*Math.sin(delta1)+l2*Math.sin(delta2);
	var y22 = l2 - l1*Math.cos(delta1) - l2*Math.cos(delta2);
	var x2 = w/2 + x22;
	var y2 = h/4 + l2 - y22;
	var m1 = 5;
	var m2 = 5; 
	var a12 = Q1*l1*l2/g/10000;
	var a22 = Q2*(l2/100)^2/g;
	var c11 = (Q1+Q2)*l1/100;
	var c22 = Q2*l2/100;
	var k1 = 0.86*Math.sqrt(g/l1);
 	var  k2 = 2.3*Math.sqrt(g/l2);
 

	var ball_1 = {
		x: [x1,],
		y: [y1,],
		r: m1,
	}
	var ball_2 = {
		x: [x2,],
		y: [y2,],
		r: m2,
	}

	let t1 = setInterval(control, dt*100)
    clearInterval(t1)
   //clearInterval(t)
    function timer1() { t1 = setInterval(control, dt*100); 
    }
    
		
		

	function phys(){
		time+=dt;
		var alfa = m2*l2/((m1+m2)*l1);
		var beta = l1/l2;
		var b1 = (delta1 - delta2*alfa*k2^2/(n1^2-k2^2))/(alfa*(k1^2/(n1^2-k1^2)-k2^2/(n1^2-k2^2)));
		var b2 = delta2 - b1;
		var a1 = b1*k1^2*m2*l2/((m1+m2)*l1*(n1^2-k1^2));
		var a2 = b2*k2^2*m2*l2/((m1+m2)*l1*(n1^2-k2^2));
		var a10 = delta1/2*a1;
		var a20 = delta1/2*a2;
		var b10 = delta2*b1/2;
		var b20 = delta2*b2/2;



		//phi_1 = (c22 - k1^2*a22)*Math.sin(k1*dt) + (c22 - k2^2*a22)*Math.sin(k2*dt);
		//phi_2 = k1^2*a12*Math.sin(k1*dt) + k2^2*a12*Math.sin(k2*dt);
		//phi_1 = a1*Math.exp(-0.01*dt)*Math.cos(k1*dt+2*delta1) + a2*Math.exp(-0.01*dt)*Math.cos(k2*dt+2*delta1);
		//phi_2 = b1*Math.exp(-0.01*dt)*Math.cos(k1*dt+2*delta2) + b2*Math.exp(-0.01*dt)*Math.cos(k2*dt+2*delta2);
		phi_1 = a10*Math.cos(k1*time) + a20*Math.cos(k2*time);
		phi_2 = b1*Math.cos(k1*time) + b2*Math.cos(k2*time);
		ball_1.x = w/2 + l1*Math.sin(phi_1);
		ball_1.y = h/4 + l1*Math.cos(phi_1);
		ball_2.x = w/2 + l1*Math.sin(phi_1) + l2*Math.sin(phi_2);
		ball_2.y = h/4 + l1*Math.cos(phi_1) + l2*Math.cos(phi_2);
		

		
	}


// метод Рунге-Кутта
	function physForNumberic(){ 

	   var a = - l2/l1*m2/(m1+m2);
	   var b = - l1/l2;
	  	var theta_1 = [];
	  	var theta_2 = [];
	  	var phei_1 = [];
	  	var phei_2 = [];
	  	var ath_1 = [];
	  	var ath_2 = [];
	  	var dh =0.1;
	  	theta_1[0] = delta1;
	  	theta_2[0] = delta2;
	  	phei_1[0] = 0;
	  	phei_2[0] = 0;

	  	k01 = phei_1[0];
	  	k02 = phei_2[0];

	  	ath_1[0] = (a*(phei_2[0]**2*Math.sin(theta_1[0]-theta_2[0])-b*phei_1[0]**2*Math.sin(theta_1[0]-theta_2[0])*Math.cos(theta_1[0]-theta_2[0])-
	   	g/l2*Math.sin(theta_2[0])*Math.cos(theta_1[0]-theta_2[0]))-g/l2*Math.sin(theta_1[0]))/(1-a*b*Math.cos(theta_1[0]-theta_2[0])**2);

	    ath_2[0] = (b*(-(phei_1[0]**2*Math.sin(theta_1[0]-theta_2[0])) + a*phei_2[0]**2*Math.sin(theta_1[0]-theta_2[0])*Math.cos(theta_1[0]-theta_2[0])-
	   	g/l2*Math.sin(theta_1[0])*Math.cos(theta_1[0]-theta_2[0]))-g/l2*Math.sin(theta_2[0]))/(1-a*b*Math.cos(theta_1[0]-theta_2[0])**2);

	  	q01 = ath_1[0];
	  	q02 = ath_2[0];

	  	k11 = phei_1[0] + q01*dh/2;
	  	k12 = phei_2[0] + q02*dh/2;

	  	q11 = (a*((phei_2[0]+q02*dh/2)**2*Math.sin(theta_1[0]+k01*dh/2-theta_2[0] - k02*dh/2)-b*(phei_1[0]+q01*dh/2)**2*Math.sin(theta_1[0]+k01*dh/2-theta_2[0]-k02*dh/2)*Math.cos(theta_1[0] + k01*dh/2-theta_2[0]- k02*dh/2)-
	   	g/l2*Math.sin(theta_2[0]+k02*dh/2)*Math.cos(theta_1[0]+k01*dh/2-theta_2[0]-k02*dh/2))-g/l2*Math.sin(theta_1[0]+k01*dh/2))/(1-a*b*Math.cos(theta_1[0]+ k01*dh/2-theta_2[0]- k02*dh/2)**2);

	    
	  	q12 = (b*(-((phei_1[0]+q01*dh/2)**2)*Math.sin(theta_1[0]+k01*dh/2-theta_2[0] - k02*dh/2)+a*(phei_2[0]+q02*dh/2)**2*Math.sin(theta_1[0]+k01*dh/2-theta_2[0]-k02*dh/2)*Math.cos(theta_1[0] + k01*dh/2-theta_2[0]- k02*dh/2)-
	   	g/l2*Math.sin(theta_1[0]+k01*dh/2)*Math.cos(theta_1[0]+k01*dh/2-theta_2[0]-k02*dh/2))-g/l2*Math.sin(theta_2[0]+k02*dh/2))/(1-a*b*Math.cos(theta_1[0]+ k01*dh/2-theta_2[0]- k02*dh/2)**2);

	  	k21 = phei_1[0]+q11*dh/2;
	  	k22 = phei_2[0]+q12*dh/2;

	  	q21 = (a*((phei_2[0]+q12*dh/2)**2*Math.sin(theta_1[0]+k11*dh/2-theta_2[0] - k12*dh/2)-b*(phei_1[0]+q11*dh/2)**2*Math.sin(theta_1[0]+k11*dh/2-theta_2[0]-k12*dh/2)*Math.cos(theta_1[0] + k11*dh/2-theta_2[0]- k12*h/2)-
	   	g/l2*Math.sin(theta_2[0]+k12*dh/2)*Math.cos(theta_1[0]+k11*dh/2-theta_2[0]-k12*dh/2))-g/l2*Math.sin(theta_1[0]+k11*dh/2))/(1-a*b*Math.cos(theta_1[0]+ k11*dh/2-theta_2[0]- k12*dh/2)**2);

	    
	  	q22 = (b*(-((phei_1[0]+q11*dh/2)**2)*Math.sin(theta_1[0]+k11*dh/2-theta_2[0] - k12*dh/2)+a*(phei_2[0]+q12*dh/2)**2*Math.sin(theta_1[0]+k11*dh/2-theta_2[0]-k12*dh/2)*Math.cos(theta_1[0] + k11*dh/2-theta_2[0]- k12*dh/2)-
	   	g/l2*Math.sin(theta_1[0]+k11*dh/2)*Math.cos(theta_1[0]+k11*dh/2-theta_2[0]-k12*dh/2))-g/l2*Math.sin(theta_2[0]+k12*dh/2))/(1-a*b*Math.cos(theta_1[0]+ k11*dh/2-theta_2[0]- k12*dh/2)**2);

	  	k31 = phei_1[0]+q21*dh/2;
	  	k32 = phei_2[0]+q22*dh/2;

	  	q31 = (a*((phei_2[0]+q22*dh/2)**2*Math.sin(theta_1[0]+k21*dh/2-theta_2[0] - k22*dh/2)-b*(phei_1[0]+q21*dh/2)**2*Math.sin(theta_1[0]+k21*dh/2-theta_2[0]-k22*dh/2)*Math.cos(theta_1[0] + k21*dh/2-theta_2[0]- k22*dh/2)-
	   	g/l2*Math.sin(theta_2[0]+k22*dh/2)*Math.cos(theta_1[0]+k21*dh/2-theta_2[0]-k22*dh/2))-g/l2*Math.sin(theta_1[0]+k21*dh/2))/(1-a*b*Math.cos(theta_1[0]+ k21*dh/2-theta_2[0]- k22*dh/2)**2);

	    
	  	q32 = (b*(-((phei_1[0]+q21*dh/2)**2)*Math.sin(theta_1[0]+k21*dh/2-theta_2[0] - k22*dh/2)+a*(phei_2[0]+q22*dh/2)**2*Math.sin(theta_1[0]+k21*dh/2-theta_2[0]-k22*dh/2)*Math.cos(theta_1[0] + k21*dh/2-theta_2[0]- k22*dh/2)-
	   	g/l2*Math.sin(theta_1[0]+k21*dh/2)*Math.cos(theta_1[0]+k21*dh/2-theta_2[0]-k22*dh/2))-g/l2*Math.sin(theta_2[0]+k22*dh/2))/(1-a*b*Math.cos(theta_1[0]+ k21*dh/2-theta_2[0]- k22*dh/2)**2);


	  
	  for (i = 1; i < 10000; i++){
	  	phei_1[i] = phei_1[i-1]+dh/6*(q01 + 2*q11 +2*q21 + q31);
		phei_2[i] = phei_2[i-1]+dh/6*(q02 + 2*q12 +2*q22 + q32);
	  	theta_1[i] = theta_1[i-1]+dh/6*(k01 + 2*k11 + 2*k21 + k31);
	  	theta_2[i] = theta_2[i-1]+dh/6*(k02 + 2*k12 +  2*k22 + k32);

	  	
	  	k01 = phei_1[i];
	  	k02 = phei_2[i];

	  	ath_1[i] = (a*(phei_2[i]**2*Math.sin(theta_1[i]-theta_2[i])-b*phei_1[i]**2*Math.sin(theta_1[i]-theta_2[i])*Math.cos(theta_1[i]-theta_2[i])-
	   	g/l2*Math.sin(theta_2[i])*Math.cos(theta_1[i]-theta_2[i]))-g/l2*Math.sin(theta_1[i]))/(1-a*b*Math.cos(theta_1[i]-theta_2[i])**2);

	    ath_2[i] = (b*(-(phei_1[i]**2*Math.sin(theta_1[i]-theta_2[i])) + a*phei_2[i]**2*Math.sin(theta_1[i]-theta_2[i])*Math.cos(theta_1[i]-theta_2[i])-
	   	g/l2*Math.sin(theta_1[i])*Math.cos(theta_1[i]-theta_2[i]))-g/l2*Math.sin(theta_2[i]))/(1-a*b*Math.cos(theta_1[i]-theta_2[i])**2);
	  	
	  	q01 = ath_1[i];
	  	q02 = ath_2[i];

	  	k11 = phei_1[i] + q01*dh/2;
	  	k12 = phei_2[i] + q02*dh/2;

	  	q11 = (a*((phei_2[i]+q02*dh/2)**2*Math.sin(theta_1[i]+k01*dh/2-theta_2[i] - k02*dh/2)-b*(phei_1[i]+q01*dh/2)**2*Math.sin(theta_1[i]+k01*dh/2-theta_2[i]-k02*dh/2)*Math.cos(theta_1[i] + k01*dh/2-theta_2[i]- k02*dh/2)-
	   	g/l2*Math.sin(theta_2[i]+k02*dh/2)*Math.cos(theta_1[i]+k01*dh/2-theta_2[i]-k02*dh/2))-g/l2*Math.sin(theta_1[i]+k01*dh/2))/(1-a*b*Math.cos(theta_1[i]+ k01*dh/2-theta_2[i]- k02*dh/2)**2);

	    
	  	q12 = (b*(-((phei_1[i]+q01*dh/2)**2)*Math.sin(theta_1[i]+k01*dh/2-theta_2[i] - k02*dh/2)+a*(phei_2[i]+q02*dh/2)**2*Math.sin(theta_1[i]+k01*dh/2-theta_2[i]-k02*dh/2)*Math.cos(theta_1[i] + k01*dh/2-theta_2[i]- k02*dh/2)-
	   	g/l2*Math.sin(theta_1[i]+k01*dh/2)*Math.cos(theta_1[i]+k01*dh/2-theta_2[i]- k02*dh/2))-g/l2*Math.sin(theta_2[i]+k02*dh/2))/(1-a*b*Math.cos(theta_1[i]+ k01*dh/2-theta_2[i]- k02*dh/2)**2);

	  	k21 = phei_1[i]+q11*dh/2;
	  	k22 = phei_2[i]+q12*dh/2;

	  	q21 = (a*((phei_2[i]+q12*dh/2)**2*Math.sin(theta_1[i]+k11*dh/2-theta_2[i] - k12*dh/2)-b*(phei_1[i]+q11*dh/2)**2*Math.sin(theta_1[i]+k11*dh/2-theta_2[i]-k12*dh/2)*Math.cos(theta_1[i] + k11*dh/2-theta_2[i]- k12*dh/2)-
	   	g/l2*Math.sin(theta_2[i]+k12*dh/2)*Math.cos(theta_1[i]+k11*dh/2-theta_2[i]-k12*dh/2))-g/l2*Math.sin(theta_1[i]+k11*dh/2))/(1-a*b*Math.cos(theta_1[i]+ k11*dh/2-theta_2[i]- k12*dh/2)**2);

	    
	  	q22 = (b*(-((phei_1[i]+q11*dh/2)**2)*Math.sin(theta_1[i]+k11*dh/2-theta_2[i] - k12*dh/2)+a*(phei_2[i]+q12*dh/2)**2*Math.sin(theta_1[i]+k11*dh/2-theta_2[i]-k12*dh/2)*Math.cos(theta_1[i] + k11*dh/2-theta_2[i]- k12*dh/2)-
	   	g/l2*Math.sin(theta_1[i]+k11*dh/2)*Math.cos(theta_1[i]+k11*dh/2-theta_2[i]-k12*dh/2))-g/l2*Math.sin(theta_2[i]+k12*dh/2))/(1-a*b*Math.cos(theta_1[i]+ k11*dh/2-theta_2[i]- k12*dh/2)**2);

	  	k31 = phei_1[i]+q21*dh/2;
	  	k32 = phei_2[i]+q22*dh/2;

	  	q31 = (a*((phei_2[i]+q22*dh/2)**2*Math.sin(theta_1[i]+k21*dh/2-theta_2[i] - k22*dh/2)-b*(phei_1[i]+q21*dh/2)**2*Math.sin(theta_1[i]+k21*dh/2-theta_2[i]-k22*dh/2)*Math.cos(theta_1[i] + k21*dh/2-theta_2[i]- k22*dh/2)-
	   	g/l2*Math.sin(theta_2[i]+k22*dh/2)*Math.cos(theta_1[i]+k21*dh/2-theta_2[i]-k22*dh/2))-g/l2*Math.sin(theta_1[i]+k21*dh/2))/(1-a*b*Math.cos(theta_1[i]+ k21*dh/2-theta_2[i]- k22*dh/2)**2);

	    
	  	q32 = (b*(-((phei_1[i]+q21*dh/2)**2)*Math.sin(theta_1[i]+k21*dh/2-theta_2[i] - k22*dh/2)+a*(phei_2[i]+q22*dh/2)**2*Math.sin(theta_1[i]+k21*dh/2-theta_2[i]-k22*dh/2)*Math.cos(theta_1[i] + k21*dh/2-theta_2[i]- k22*dh/2)-
	   	g/l2*Math.sin(theta_1[i]+k21*dh/2)*Math.cos(theta_1[i]+k21*dh/2-theta_2[i]-k22*dh/2))-g/l2*Math.sin(theta_2[i]+k22*dh/2))/(1-a*b*Math.cos(theta_1[i]+ k21*dh/2-theta_2[i]- k22*dh/2)**2);

	  	ball_1.x[i] = w/2 + l1*Math.sin(theta_1[i]);
		ball_1.y[i] = h/4 + l1*Math.cos(theta_1[i]);
		ball_2.x[i] = w/2 + l1*Math.sin(theta_1[i]) + l2*Math.sin(theta_2[i]);
		ball_2.y[i] = h/4 + l1*Math.cos(theta_1[i]) + l2*Math.cos(theta_2[i]);

	   }
	    
	 }
	physForNumberic();
	
	
	
	
	function draw(){ // отрисовка
		
	    ctx.strokeStyle = 'black';
	    ctx.fillStyle = 'lime';
	    ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(w/2, h/4 - 15);
		ctx.lineTo(w/2-15, h/4 -15);
		ctx.lineTo(w/2, h/4);
		ctx.lineTo(w/2+15, h/4 - 15);
		ctx.lineTo(w/2, h/4 - 15);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(w/2, h/4);
		ctx.lineTo(ball_1.x[Math.round(10*time)], ball_1.y[Math.round(10*time)]);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(ball_1.x[Math.round(10*time)], ball_1.y[Math.round(10*time)], ball_1.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(ball_1.x[Math.round(10*time)], ball_1.y[Math.round(10*time)]);
		ctx.lineTo(ball_2.x[Math.round(10*time)], ball_2.y[Math.round(10*time)]);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(ball_2.x[Math.round(10*time)], ball_2.y[Math.round(10*time)], ball_2.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		time += dt
		
		for (var i = 0; i< Math.round(10*time); i++){ // отрисовка
		ctx.beginPath();
		ctx.moveTo(ball_2.x[i], ball_2.y[i]);
		ctx.lineTo(ball_2.x[i+1], ball_2.y[i+1]);
		ctx.stroke();
}  
	}
	draw()

	/*function linedraw(){
		for (var i = 0; i< arr.length-1 ; i++){
		ctx.beginPath();
		ctx.moveTo(arr[i].x, arr[i].y);
		ctx.lineTo(arr[i + 1].x, arr[i + 1].y);
		ctx.strokeStyle = 'red';
		ctx.stroke();
		
		
		}
	}
	*/


	


	function control(){
		
		draw()
		//linedraw();

	}
	document.getElementById("start").onclick = function (){
		clearInterval(t1);
	    //clearInterval(t);
	    timer1()
		//timer()

	}
	document.getElementById("pause").onclick = function (){
		clearInterval(t1);
		//clearInterval(t);

	}
	document.getElementById("restart").onclick = function(){
		clearInterval(t1);
		//clearInterval(t);
		time = 0;
		ball_1.x[0] = x1;
		ball_1.y[0] = y1;
		ball_2.x[0] = x2;
		ball_2.y[0] = y2;
		ctx.clearRect(0,0,w,h);
		draw();
		
	}
 window.onkeydown = (e)=>{ 
	 	if (e.keyCode ===32){ //pause
	 		clearInterval(t1);
		//clearInterval(t);

	 		}
	 	 if (e.keyCode === 13){ // start
	 		clearInterval(t1);
	   // clearInterval(t);
	    timer1()
		//timer()

	 	} if (e.keyCode === 8){ // restart
	 		clearInterval(t1);
		//clearInterval(t);
		time = 0;
		ball_1.x[0] = x1;
		ball_1.y[0] = y1;
		ball_2.x[0] = x2;
		ball_2.y[0] = y2;
		
		ctx.clearRect(0,0,w,h);
		draw();

	 	}
	 }
	
}