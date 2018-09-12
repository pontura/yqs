var qo = (function(){

	var selCandidate = -1;
	var candidates;

	function setOptions(){
		let html = "";
		for(let c of candidates){
			let src = c["photo"].replace('git','');
			html+="<div class='w3-col s6 m6 l6'><button name="+c["full_name"]+" class='qdq-btn'>"+
				"<img src="+"../"+src+">"+
				"<p>"+c["full_name"]+"</p>"+
				"<p>"+c["politic_party"]+"</p>"+
				"</button></div>";
		}
		$("#qdq-options").html(html);
	}

	function checkCorrect(){

	}
	
	return {//funcion de inicio de la aplicación
		init : function(c){
			candidates = randomSubArray(c,4);
			selCandidate = parseInt(candidates.length * Math.random());
			console.log(candidates);
			let frase = ""
			while(frase==""){
				frase = candidates[selCandidate]["long_answer"][ parseInt(candidates[selCandidate]["long_answer"].length * Math.random())];
			}
			$("#qdq-frase").html(frase);
			console.log(frase);
			setOptions();

			$(".qdq-btn").click(function(){
				console.log(candidates[selCandidate]["full_name"]);
				console.log($(this).attr('name'));
				if(candidates[selCandidate]["full_name"]==$(this).attr('name')){
					$(this).css('background-color','green');
				}else{
					$(this).css('background-color','red');
				}
			});	
		}	
	};
})();
