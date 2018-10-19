var normal = (function(){

	var config;
	var candidates;
	var questions;

	var answers=[];
	var afinidad=[];

	var navPos=0;
	var summaryDone=false;

	var cantOpt = 4;

	function setCards(){
		$("#normal-partial-summary").hide();		
		$("#normal-footer").hide();
		$("#normal-next-btn").hide();
		$("#normal-quest").show();
		$("#yes_btn p").text(questions[navPos]['yes']);
		$("#yes_but_btn p").text(questions[navPos]['yes_but']);
		$("#no_btn p").text(questions[navPos]['no']);
		$("#no_but_btn p").text(questions[navPos]['no_but']);

		$("#normal-pregunta").text(questions[navPos]['question']);
	}

	function SetSummary(){
		if(summaryDone){
			gameApp.mainMenu();
		}else{
			for(let i=0;i<candidates.length;i++){
				let puntos=0;
				let cantQ=0;
				for(let j=0;j<answers.length;j++){
					if(candidates[i]["sort_answer"][questions[j]["originalIndex"]]>-1){
						puntos+=Math.abs(answers[j]-candidates[i]["sort_answer"][questions[j]["originalIndex"]]);
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

			//console.log(afinidad);

			let html="<h2>RESULTADOS</h2>";

			for(let i=0;i<afinidad.length;i++){
				if(i==0){
					html+="<div class='summary-item' name='"+i+"'><div class='summary-img first'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
						"<div class='summary-text first'><h1>"+afinidad[i]["porcentaje"].toFixed(2)+"%</h1><h2>"+candidates[afinidad[i]["id"]]["full_name"]+"</h2></div></div>";
				}else{
					if(+afinidad[i]["porcentaje"]==+afinidad[0]["porcentaje"]){
						html+="<div class='summary-item' name='"+i+"'><div class='summary-img first'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
							"<div class='summary-text first'><h1>"+afinidad[i]["porcentaje"].toFixed(2)+"%</h1><h2>"+candidates[afinidad[i]["id"]]["full_name"]+"</h2></div></div>";
					}else{
						html+="<div class='summary-item' name='"+i+"'><div class='summary-img'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
							"<div class='summary-text'><h3>"+afinidad[i]["porcentaje"].toFixed(2)+"%</h3><h4>"+candidates[afinidad[i]["id"]]["full_name"]+"</h4></div></div>";
					}
				}
			}

			$("#normal-partial-summary").hide();
			$("#normal-summary").show();
			$("#normal-summary").html(html);

			$("#normal-summary .summary-item").unbind().click(function(){
				summaryDetail($(this).attr("name"))
			});

			$("#normal-header").hide();			
			summaryDone=true;
		}
	}

	function summaryDetail(i){
		var html="";
	
		html+="<div id='summary-detail-header'><div class='summary-img'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
		"<div class='summary-text'><h3>"+afinidad[i]["porcentaje"].toFixed(2)+"%</h3><h4>"+candidates[afinidad[i]["id"]]["full_name"]+"</h4></div></div>";

		for(let j=0;j<questions.length;j++){
			html+="<div class='normal-detail-quest'><p>"+questions[j]['question']+"</p></div>";
			html+="<div class='normal-detail-answ'><p>"+candidates[afinidad[i]["id"]]["long_answer"][questions[j]['originalIndex']]+"</p></div>";			
		}
		$("#normal-footer").show();
		$("#normal-summary-detail").show();
		$("#normal-summary-detail").html(html);	
		$("#normal-next-btn").hide();
		$("#normal-back-btn").show();
		$("#normal-summary").hide();		
	}

	function partialSummary(){
		$("#normal-partial-summary").show();
		$("#normal-partial-pregunta").text(questions[navPos]['question']);
		var html = "";
		for(let i=0;i<candidates.length;i++){
			html+="<div class='summary-item'><div class='summary-img'><img src='"+candidates[i]["photo"]+"'></div>"+
			"<div class='summary-text'><h7>"+candidates[i]["full_name"]+"</h7><h8>"+candidates[i]["politic_party"]+"</h8>"+
			"<p>"+candidates[i]["long_answer"][questions[navPos]['originalIndex']]+"</div></div>";	
		}
		$("#normal-partial-options").html(html);
		$("#normal-quest").hide();
		$("#normal-footer").show();
		$("#normal-next-btn").show();
		//setTimeout(function(){setCards()}, 5000);		
	}

	function Next(){
		navPos++;
		if(navPos>=config.questNumber){
			SetSummary();
		}else{
			SetNavigatorPos("header-normal",navPos);				
			setTimeout(function(){setCards()}, 100);		
		}
	}

	function Back(){
		$("#normal-summary-detail").hide();
		$("#normal-summary").show();
		$("#normal-back-btn").hide();
		$("#normal-next-btn").show();
	}

	return {//funcion de inicio de la aplicación
		init : function(c,q,casualConfig){
			navPos=0;
			answers=[];
			summaryDone=false;
			$("#normal-summary").hide();
			config = casualConfig;
			candidates = c;			

			questions = randomSubArray(q,config["questNumber"]);

			//console.log(c);
			//console.log(questions);

			setCards();

			CreateNavigator("header-normal",config.questNumber);

			$("#normal-next-btn").unbind().click(function(){
				Next();	
			});			

			/*$("#game-normal").unbind().on( "swipeleft", function(){
				//console.log("left");
				answers.push(-1);
				Next();	
			});*/

			$("#normal-back-btn").unbind().click(function(){
				Back();	
			});

			$("#normal-back-btn").hide();

			$(".normal-btn").unbind().click(function(){
				//console.log("click: "+$(this).attr("name"));
				answers.push($(this).attr("name"));
				partialSummary();	
			});
			
		}	
	};
})();
