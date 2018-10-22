var casual = (function(){

	var config;
	var candidates;
	var questions;

	var answers=[];
	var afinidad=[];

	var navPos=0;
	var summaryDone=false;

	var cantOpt = 4;

	function setCards(){
		let html = "<div id='casual-card-container'>";
		let stepAlpha = 1.0/questions.length;
		for(let i=navPos;i<questions.length;i++){
			html+="<div class='cards' id='c"+i+"' style=";
			if(i>navPos){
				html+="'transform: perspective(500px) translate3d(0px,"+((i-navPos)*20)+"px,"+((i-navPos)*-20)+"px);background-color:rgba(255,168,0,"+((questions.length-i+navPos)*stepAlpha)+");'";
				html+="><h4></h4></div>";
			}else{
				html+="><div class='casualField'>"+decodeURIComponent(questions[i]["question"])+"</div></div>";
			}
		}
		html+="</div>";
		$("#game-casual .game-central").html(html);
		$("#c"+navPos+".cards").css('z-index',10);

	}

	function SetAnswerVal(val){
		let ans = { sort_answer:val, originalIndex:questions[navPos]["originalIndex"]};
		answers.push(ans);
		gameApp.addAnswer(ans);
	}

	function setAfinidad(){
		for(let i=0;i<candidates.length;i++){
			let puntos=0;
			let cantQ=0;
			for(let j=0;j<answers.length;j++){
				if(candidates[i]["sort_answer"][answers[j]["originalIndex"]]>-1){
					puntos+=Math.abs(answers[j]["sort_answer"]-candidates[i]["sort_answer"][answers[j]["originalIndex"]]);
					cantQ++;
				}
			}
			let perc = 100*(cantQ*(cantOpt-1)-puntos)/(cantQ*(cantOpt-1));
			afinidad[i] = {					
				"porcentaje":perc,
				"id":i
			}

			/*afinidad[i]["porcentaje"] =100*puntos*factor;
				afinidad[i]["id"]=i;*/

			//console.log(candidates[i]["full_name"]+": "+afinidad[i]["porcentaje"]+" cantQ:"+cantQ+" totalP:"+cantQ*(cantOpt-1)+" puntos:"+(cantQ*(cantOpt-1)-puntos));
		}

		afinidad.sort(function(a, b) {
			return b.porcentaje - a.porcentaje;
		});
	}

	function SetSummary(){
		if(summaryDone){
			gameApp.mainMenu();
		}else{
			/*let factor = 1.0/questions.length;
			for(let i=0;i<candidates.length;i++){
				let puntos=0;
				for(let j=0;j<answers.length;j++){
					if(answers[j]["sort_answer"]==1){
						if(answers[j]["sort_answer"]<=candidates[i]["sort_answer"][questions[j]["originalIndex"]])
							puntos++;
					}else{
						if(answers[j]["sort_answer"]>=candidates[i]["sort_answer"][questions[j]["originalIndex"]])
							puntos++;
					}
				}

				afinidad[i] = {
					"porcentaje":100*puntos*factor,
					"id":i
				}

				//afinidad[i]["porcentaje"] =100*puntos*factor;
				//afinidad[i]["id"]=i;
				
				//console.log(candidates[i]["full_name"]+": "+afinidad[i]["porcentaje"]);
			}

			afinidad.sort(function(a, b) {
				return b.porcentaje - a.porcentaje;
			});*/

			setAfinidad();

			//console.log(answers);
			//console.log(afinidad);

			//console.log(afinidad);

			let html="<div id='casual-summary'><h2>RESULTADOS</h2>";

			for(let i=0;i<afinidad.length;i++){
				if(i==0){
					html+="<div class='summary-item'><div class='summary-img first'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
						"<div class='summary-text first'><h1>"+Math.round(afinidad[i]["porcentaje"])+" %</h1><h2>"+candidates[afinidad[i]["id"]]["full_name"]+"</h2></div></div>";
				}else{
					if(+afinidad[i]["porcentaje"]==+afinidad[0]["porcentaje"]){
						html+="<div class='summary-item'><div class='summary-img first'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
							"<div class='summary-text first'><h1>"+Math.round(afinidad[i]["porcentaje"])+" %</h1><h2>"+candidates[afinidad[i]["id"]]["full_name"]+"</h2></div></div>";
					}else{
						html+="<div class='summary-item'><div class='summary-img'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
							"<div class='summary-text'><h3>"+Math.round(afinidad[i]["porcentaje"])+" %</h3><h4>"+candidates[afinidad[i]["id"]]["full_name"]+"</h4></div></div>";
					}
				}
			}

			html+="</div>";

			$("#game-casual .game-central").html(html);
			$("#casual-header").hide();
			summaryDone=true;
			$("#casual-next-btn").show();
		}
	}

	function Next(dir){

		$("#c"+navPos+".cards").animate({    			
			left: dir
		}, 1000, function() {
			$(this).remove()	
		});

		navPos++;
		if(navPos>=config.questNumber){
			SetSummary();
		}else{
			SetNavigatorPos("header-casual",navPos);				
			setTimeout(function(){setCards()}, 500);		
		}
	}

	return {//funcion de inicio de la aplicación
		init : function(c,q,casualConfig){
			navPos=0;
			answers=[];
			summaryDone=false;
			$("#casual-summary").hide();
			config = casualConfig;
			candidates = c;			

			questions = randomSubArray(q,config["questNumber"]);

			//console.log(c);
			//console.log(questions);

			setCards();

			CreateNavigator("header-casual",config.questNumber);

			$("#casual-next-btn").unbind().click(function(){
				Next();	
			});

			$("#casual-next-btn").hide();

			$("#game-casual").unbind().on( "swipeleft", function(){
				//console.log("left");
				//answers.push(2);
				SetAnswerVal(2);
				//console.log(answers);
				Next("-=1000");	
			});

			$("#game-casual").on( "swiperight", function(){
				//console.log("right");
				//answers.push(1);
				SetAnswerVal(1);
				//console.log(answers);
				Next("+=1000");	
			});
		}	
	};
})();
