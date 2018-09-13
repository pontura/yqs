var qdq = (function(){

	var config;
	var selCandidate = -1;
	var candidates;
	var candidatesSel;

	var navPos=0;
	var correctAns=0;
	var summaryDone=false;

	function setOptions(){
		let html = "";
		for(let c of candidatesSel){
			let src = c["photo"].replace('git','');
			html+="<div class='w3-col s6 m6 l6'><button name="+c["full_name"]+" class='qdq-btn interactable'>"+
				"<img src="+c["photo"]+">"+
				"<p class='candidato'>"+c["full_name"]+"</p>"+
				"<p class='partido'>"+c["politic_party"]+"</p>"+
				"</button></div>";
		}
		$("#qdq-options").html(html);
	}

	function checkCorrect(){

	}

	function Reset(){
		candidatesSel = randomSubArray(candidates,config["candidates"]);
		selCandidate = parseInt(candidatesSel.length * Math.random());
		//console.log(candidatesSel);

		let frase = ""
		while(frase==""){
			frase = candidatesSel[selCandidate]["long_answer"][ parseInt(candidatesSel[selCandidate]["long_answer"].length * Math.random())];
		}
		$("#qdq-frase").html(frase);
		setOptions();

		$(".qdq-btn").click(function(){
			if($(this).hasClass("interactable")){
				if(candidatesSel[selCandidate]["full_name"]==$(this).attr('name')){
					$(this).addClass('right');
					correctAns++;
				}else{
					$(this).addClass('wrong');
				}
				$(".qdq-btn").removeClass("interactable");
			}
		});	
	}

	function SetSummary(){
		if(summaryDone){
			gameApp.mainMenu();
		}else{
			let percent = correctAns*100/config.questNumber;
			let html="<div id='qdq-summary'><h2>Lograste "+percent+"% de respuestas correctas</h2></div>";
			$("#qdq-frase").html("");
			$("#qdq-options").html(html);
			summaryDone=true;
		}
	}

	return {//funcion de inicio de la aplicación
		init : function(c,qdqConfig){
			navPos=0;
			correctAns=0;
			summaryDone=false;
			config = qdqConfig;
			candidates = c;

			Reset();

			CreateNavigator("header-qdq",config.questNumber);

			$("#qdq-next-btn").unbind().click(function(){
				navPos++;
				if(navPos>=config.questNumber){
					SetSummary();
				}else{
					SetNavigatorPos("header-qdq",navPos);				
					Reset();
				}
			});
		}	
	};
})();
