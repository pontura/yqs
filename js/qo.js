var qo = (function(){

	var config;
	var selCandidate = -1;
	var selQuestion = -1;
	var candidates;
	var questions;
	var candidatesSel;

	var navPos=0;
	var correctAns=0;
	var summaryDone=false;

	function setOptions(){
		let html = "";
		for(let i=0;i<candidatesSel.length;i++){
			html+="<div class='qo_option'><button class='interactable' name="+i+"><img src='img/hide.png'><p>"+
				candidatesSel[i]["long_answer"]+
				"</p></button></div>";		
		}
		$("#qo-options").html(html);
	}

	function checkCorrect(){

	}

	function Reset(){
		candidatesSel = randomSubArray(candidates,config["candidates"]);
		selCandidate = parseInt(candidatesSel.length * Math.random());
		selQuestion =  parseInt(questions.length * Math.random());
		//console.log(questions[selQuestion]);
		console.log(candidatesSel);
		
		$("#qo_question").html(questions[selQuestion]["question"]);
		$("#qo-header img").attr("src",candidatesSel[selCandidate]["photo"]);
		$("#qo-candidate-name").html(candidatesSel[selCandidate]["full_name"]+" sobre...");
		
		setOptions();

		$(".qo_option button").click(function(){
			if($(this).hasClass("interactable")){
				if(selCandidate==$(this).attr('name')){
					$(this).addClass('right-answ');
					
					correctAns++;
				}else{
					$(this).addClass('wrong-answ');
				}

				$(this).children('img').attr("src",candidatesSel[$(this).attr('name')]["photo"]);
				$(".qo_option button").removeClass("interactable");
				setTimeout(function(){Next()}, 1000);
			}
		});	
	}

	function SetSummary(){
		if(summaryDone){
			gameApp.mainMenu();
		}else{
			let percent = correctAns*100/config.questNumber;
			let html="<div id='qo-summary'><h2>Lograste "+percent+"% de respuestas correctas</h2></div>";
			$("#qo-options").html(html);
			$("#qo-header").hide();
			summaryDone=true;
		}
	}

	function Next(){
		navPos++;
		if(navPos>=config.questNumber){
			SetSummary();
		}else{
			SetNavigatorPos("header-qo",navPos);				
			Reset();
		}
	}

	return {//funcion de inicio de la aplicación
		init : function(c,q,qdqConfig){
			navPos=0;
			correctAns=0;
			summaryDone=false;
			config = qdqConfig;
			candidates = c;
			questions = q;

			$("#qo-header").show();

			Reset();

			CreateNavigator("header-qo",config.questNumber);

			$("#qo-next-btn").unbind().click(function(){
				Next();	
			});

			$("#game-qo").unbind().on( "swipeleft", function(){
				Next();	
			});
		}	
	};
})();
