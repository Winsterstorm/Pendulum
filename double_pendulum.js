window.addEventListener("load", main, false);
function main(){
	var ctx = canvas_example.getContext('2d');
	var w = canvas_example.width;
	var h = canvas_example.height;
	var sl_m1 = document.getElementById("sl_m1");
	var sl_m2 = document.getElementById("sl_m2");
	var check_1 = document.getElementById("num");
	var check_2 = document.getElementById("anal");
	var winDelta1 = document.getElementById("forDelta1");
	var winDelta2 = document.getElementById("forDelta2");
	var m1_v = document.getElementById("m1_v");
	var m2_v = document.getElementById("m2_v");
	var g = 9.8;
	var p = 1.1;
	var l1 = w/5;
	var l2 = w/5;
	var time = 0;
	var dt = 0.1;
	var k = 0.1; 
	var delta1 = Math.PI/4;
	var delta2 = Math.PI/4;
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
	var n1 = Math.sqrt(g/l1);
	var n2 = Math.sqrt(g/l2);
	var k1 = 0.86*Math.sqrt(g/l1);
 	var k2 = 2.3*Math.sqrt(g/l2);
 	var d = false;
 	var go = false;
 

 	var ball1first = {
		x: x1,
		y: y1,
		r: m1,
	}
	var ball2first = {
		x: x2,
		y: y2,
		r: m2,
	}
    
	var ball_1 = {
		x: [x1,],
		y: [y1,],
		r: m1*p,
	}
	var ball_2 = {
		x: [x2,],
		y: [y2,],
		r: m2*p,
	}

	let t1 = setInterval(control, dt*100);
	
    clearInterval(t1);
   
    function timer1() { t1 = setInterval(control, dt*100); 
    }
    
		
		

	function phys(){
		
		
		/*var a11 = (m1+m2)*l1^2;
		var a12 = m1*l1*l2;
		var a22 = m2*l2^2;
		var c11 = (m1+m2)*g*l1;
		var c22 = m2*g*l2;
		var n1 = Math.sqrt(g/l1);
		var n2 = Math.sqrt(g/l2);
		var kp = Math.sqrt(m2/(m1+m2));
		var k1 = (n1**2 + n2**2 + Math.sqrt((n2**2-n1**2)**2+ 4*kp**2*n1**2*n2**2))/(2*(1-kp^2));
		var k2 = (n1**2 + n2**2 - Math.sqrt((n2**2-n1**2)**2+ 4*kp**2*n1**2*n2**2))/(2*(1-kp^2));
		var a1 = (c22 - k1**2*a22);
		var a2 = (c22 - k2**2*a22);*/
		

		/*phi1first = delta1*(a1*Math.cos(k1*time) + a2*Math.cos(k2*time));
		phi2first = delta2*(a1*Math.cos(k1*time) + a2*Math.cos(k2*time));
		
		

		ball1first.x = w/2 + l1*Math.sin(phi1first);
		ball1first.y = h/4 + l1*Math.cos(phi1first);
		ball2first.x = w/2 + l1*Math.sin(phi1first) + l2*Math.sin(phi2first);
		ball2first.y = h/4 + l1*Math.cos(phi1first) + l2*Math.cos(phi2first);*/
		
		var alfa = m2*l2/((m1+m2)*l1);
		var beta = l1/l2;
		var b1 = (delta1 - delta2*alfa*(k2**2)/(n2**2-k2**2))/(alfa*((k1**2)/(n1**2-k1**2)-(k2**2)/(n2**2-k2**2)));
		var b2 = delta2 - b1;
		var a1 = b1*(k1**2)*m2*l2/((m1+m2)*l1*(n1**2-k1**2));
		var a2 = b2*(k2**2)*m2*l2/((m1+m2)*l1*(n2**2-k2**2));
		
		
		phi1first = a1*Math.cos(k1*time) + a2*Math.cos(k2*time);
		phi2first = b1*Math.cos(k1*time) + b2*Math.cos(k2*time);
	

		ball1first.x = w/2 + l1*Math.sin(phi1first);
		ball1first.y = h/4 + l1*Math.cos(phi1first);
		ball2first.x = w/2 + l1*Math.sin(phi1first) + l2*Math.sin(phi2first);
		ball2first.y = h/4 + l1*Math.cos(phi1first) + l2*Math.cos(phi2first);
		
		
	}


	function physForNumberic(){ 		// метод Рунге-Кутта
	    var a = - l2/l1*m2/(m1+m2);
	    var b = - l1/l2;
	  	var theta_1 = [];
	  	var theta_2 = [];
	  	var phei_1 = [];
	  	var phei_2 = [];
	  	var ath_1 = [];
	  	var ath_2 = [];
	  	var dh = 0.1;
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


	  
	  for (i = 1; i < 20000; i++){
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
	
	
	
	function draw(){ 			// отрисовка
		if (check_2.checked){
		ctx.clearRect(0,0,w,h)
		ctx.fillStyle = 'grey';
		ctx.beginPath();
		ctx.moveTo(w/2, h/4 - 15);
		ctx.lineTo(w/2-15, h/4 -15);
		ctx.lineTo(w/2, h/4);
		ctx.lineTo(w/2+15, h/4 - 15);
		ctx.lineTo(w/2, h/4 - 15);
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(w/2, h/4);
		ctx.lineTo(ball1first.x, ball1first.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(ball1first.x, ball1first.y, ball1first.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(ball1first.x, ball1first.y);
		ctx.lineTo(ball2first.x, ball2first.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(ball2first.x, ball2first.y, ball2first.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		}
		if (check_1.checked){
	    ctx.strokeStyle = 'black';
	    ctx.fillStyle = 'grey';
	    ctx.clearRect(0,0,w,h)
		ctx.beginPath();
		ctx.moveTo(w/2, h/4 - 15);
		ctx.lineTo(w/2-15, h/4 -15);
		ctx.lineTo(w/2, h/4);
		ctx.lineTo(w/2+15, h/4 - 15);
		ctx.lineTo(w/2, h/4 - 15);
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = 'lime';
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
		

		if (time>10){
			for (var i = Math.round(10*time)-100; i< Math.round(10*time); i++){ // траектория
				ctx.beginPath();
				ctx.moveTo(ball_2.x[i], ball_2.y[i]);
				ctx.lineTo(ball_2.x[i+1], ball_2.y[i+1]);
				ctx.stroke();
				
			} 
		} else {
				for (var i = 1; i< Math.round(10*time); i++){ 
					ctx.beginPath();
					ctx.moveTo(ball_2.x[i], ball_2.y[i]);
					ctx.lineTo(ball_2.x[i+1], ball_2.y[i+1]);
					ctx.stroke();
				}
			}
		}
		if (check_1.checked && check_2.checked){
		ctx.clearRect(0,0,w,h)
		ctx.fillStyle = 'grey';
		ctx.beginPath();
		ctx.moveTo(w/2, h/4 - 15);
		ctx.lineTo(w/2-15, h/4 -15);
		ctx.lineTo(w/2, h/4);
		ctx.lineTo(w/2+15, h/4 - 15);
		ctx.lineTo(w/2, h/4 - 15);
		ctx.stroke();
		ctx.fill()
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(w/2, h/4);
		ctx.lineTo(ball1first.x, ball1first.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(ball1first.x, ball1first.y, ball1first.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(ball1first.x, ball1first.y);
		ctx.lineTo(ball2first.x, ball2first.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(ball2first.x, ball2first.y, ball2first.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		

	    ctx.strokeStyle = 'black';
	    ctx.fillStyle = 'lime';
	    
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
		

		if (time>10){
			for (var i = Math.round(10*time)-100; i< Math.round(10*time); i++){ // траектория
				ctx.beginPath();
				ctx.moveTo(ball_2.x[i], ball_2.y[i]);
				ctx.lineTo(ball_2.x[i+1], ball_2.y[i+1]);
				ctx.stroke();
				
			} 
		} else {
				for (var i = 1; i< Math.round(10*time); i++){ // траектория
					ctx.beginPath();
					ctx.moveTo(ball_2.x[i], ball_2.y[i]);
					ctx.lineTo(ball_2.x[i+1], ball_2.y[i+1]);
					ctx.stroke();
				}
			}
		}
		
		
		time += dt
	}
	draw()


	check_1.onclick = function(){
		time = 0;
		ctx.clearRect(0,0,w,h)
		draw();

	}
	check_2.onclick = function(){
		time = 0;
		ctx.clearRect(0,0,w,h)
		draw();

	}

		

	function control(){
		phys();
		draw();

	}

	sl_m1.oninput = function(){
		time = 0;
		ball_1.r = p*sl_m1.value;
		m1 = Number(sl_m1.value);
		m1_v.value = sl_m1.value;
		
		physForNumberic();
		ctx.clearRect(0,0,w,h);
		draw();
	}
	sl_m2.oninput = function(){
		time = 0;
		ball_2.r = p*sl_m2.value;
		m2 = Number(sl_m2.value);
		m2_v.value = sl_m2.value;
		physForNumberic();
		
		ctx.clearRect(0,0,w,h);
		draw();
	}


	canvas_example.onmousedown = (e) =>{
		if((e.offsetX - ball_2.x[0])**2 + (e.offsetY - ball_2.y[0])**2 <= ball_2.r**2){
			d = true;
		}
		if ((e.offsetX - ball_1.x[0])**2 + (e.offsetY - ball_1.y[0])**2 <= ball_1.r**2){
			go = true;
		}
	}
	canvas_example.onmousemove = (e) =>{
		if (d){
			
  			ball_2.y[0] = ball_1.y[0] + l2/Math.sqrt((e.offsetY - ball_1.y[0])**2 + (e.offsetX -ball_1.x[0])**2)*
				(e.offsetY - ball_1.y[0]);
			ball_2.x[0] = ball_1.x[0] + l2/Math.sqrt((e.offsetY - ball_1.y[0])**2 + (e.offsetX -ball_1.x[0])**2)* 
				(e.offsetX -ball_1.x[0]);
				if(ball_2.x[0] - ball_1.x[0] > 0 && ball_2.y[0] - ball_1.y[0] > 0){
			delta2 = Math.atan((ball_2.x[0] - ball_1.x[0])/(ball_2.y[0] - ball_1.y[0]));
			} if(ball_2.x[0] - ball_1.x[0] > 0 && ball_2.y[0] - ball_1.y[0] < 0){
			delta2 = Math.PI + Math.atan((ball_2.x[0] - ball_1.x[0])/(ball_2.y[0] - ball_1.y[0]));
			}if(ball_2.x[0] - ball_1.x[0] < 0 && ball_2.y[0] - ball_1.y[0] > 0){
			delta2 = Math.atan((ball_2.x[0] - ball_1.x[0])/(ball_2.y[0] - ball_1.y[0]));
			}if(ball_2.x[0] - ball_1.x[0] < 0 && ball_2.y[0] - ball_1.y[0] < 0){
			delta2 = -Math.PI+Math.atan((ball_2.x[0] - ball_1.x[0])/(ball_2.y[0] - ball_1.y[0]));
			}
			winDelta2.value = Math.round(delta2/Math.PI*180);
			ctx.clearRect(0,0,w,h);
			time = 0;
			draw();
		}
		if (go){
			ball_1.y[0] = h/4 + l1/Math.sqrt((e.offsetY - h/4)**2 + (e.offsetX - w/2)**2)*
				(e.offsetY - h/4);
			ball_1.x[0] = w/2 + l1/Math.sqrt((e.offsetY - h/4)**2 + (e.offsetX - w/2)**2)* 
				(e.offsetX -w/2);
			ball_2.x[0] = ball_1.x[0] + l2*Math.sin(delta2);
			ball_2.y[0] = ball_1.y[0] + l2*Math.cos(delta2);

			if(ball_1.x[0] - w/2 > 0 && ball_1.y[0] - h/4 > 0){
			delta1 = Math.atan((ball_1.x[0] - w/2)/(ball_1.y[0] - h/4));
			} if(ball_1.x[0] - w/2 > 0 && ball_1.y[0] - h/4 < 0){
			delta1 = Math.PI + Math.atan((ball_1.x[0] - w/2)/(ball_1.y[0] - h/4));
			}if(ball_1.x[0] - w/2 < 0 && ball_1.y[0] - h/4 > 0){
			delta1 = Math.atan((ball_1.x[0] - w/2)/(ball_1.y[0] - h/4));
			}if(ball_1.x[0] - w/2 < 0 && ball_1.y[0] - h/4 < 0){
			delta1 = - Math.PI + Math.atan((ball_1.x[0] - w/2)/(ball_1.y[0] - h/4));
			}
			winDelta1.value = Math.round(delta1/Math.PI*180);
			ctx.clearRect(0,0,w,h);
			time = 0;
			draw();
		}
	}
	canvas_example.onmouseup = (e) =>{
		if (d){
		d = false;
		physForNumberic();
		
		}
		if (go){
			go = false;
			physForNumberic();

			}
	}
	document.getElementById("start").onclick = function (){
		clearInterval(t1);
	    timer1()
		

	}
	document.getElementById("pause").onclick = function (){
		clearInterval(t1);
		
	}
	document.getElementById("restart").onclick = function(){
		clearInterval(t1);
		time = 0;
		ball_1.x[0] = x1;
		ball_1.y[0] = y1;
		ball_2.x[0] = x2;
		ball_2.y[0] = y2;
		ball1first.x = x1;
		ball2first.x= x2;
		ball1first.y = y1;
		ball2first.y = y2;
		ctx.clearRect(0,0,w,h);
		draw();
		
	}
 	window.onkeydown = (e)=>{ 
	 	if (e.keyCode ===32){ //pause
	 		clearInterval(t1);
		

	 		}
	 	 if (e.keyCode === 13){ // start
	 		clearInterval(t1);
	  
	    	timer1()
			

	 	} if (e.keyCode === 8){ // restart
	 		clearInterval(t1);
		
		time = 0;
		ball_1.x[0] = x1;
		ball_1.y[0] = y1;
		ball_2.x[0] = x2;
		ball_2.y[0] = y2;
		ball1first.x = x1;
		ball2first.x= x2;
		ball1first.y = y1;
		ball2first.y = y2;
		
		ctx.clearRect(0,0,w,h);
		draw();

	 	}
	 }
	
}