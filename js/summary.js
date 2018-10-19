var summary = (function(){

	var config;
	var candidates;
	var questions;

	var answers=[];
	var afinidad=[];

	var cantOpt = 4;

	function SetSummary(){	
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

			//console.log(afinidad);

			let html="<h1>AFINIDAD</h1>";

			for(let i=0;i<afinidad.length;i++){
				if(i==0){
					html+="<div class='summary-item' name='"+i+"'><div class='summary-img first'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
						"<div class='summary-text first'><h1>"+Math.round(afinidad[i]["porcentaje"])+" %</h1><h2>"+candidates[afinidad[i]["id"]]["full_name"]+"</h2></div></div>";
				}else{
					if(+afinidad[i]["porcentaje"]==+afinidad[0]["porcentaje"]){
						html+="<div class='summary-item' name='"+i+"'><div class='summary-img first'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
							"<div class='summary-text first'><h1>"+Math.round(afinidad[i]["porcentaje"])+" %</h1><h2>"+candidates[afinidad[i]["id"]]["full_name"]+"</h2></div></div>";
					}else{
						html+="<div class='summary-item' name='"+i+"'><div class='summary-img'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
							"<div class='summary-text'><h3>"+Math.round(afinidad[i]["porcentaje"])+" %</h3><h4>"+candidates[afinidad[i]["id"]]["full_name"]+"</h4></div></div>";
					}
				}
			}

			$("#summary").show();
			$("#summary").html(html);

			$("#summary .summary-item").unbind().click(function(){
				summaryDetail($(this).attr("name"))
			});

			//$("#summary-header").hide();			
		
	}

	function summaryDetail(i){
		var html="";
	
		html+="<div id='summary-detail-header'><div class='summary-img'><img src='"+candidates[afinidad[i]["id"]]["photo"]+"'></div>"+
		"<div class='summary-text'><h3>"+Math.round(afinidad[i]["porcentaje"])+" %</h3><h4>"+candidates[afinidad[i]["id"]]["full_name"]+"</h4></div></div>";

		for(let j=0;j<answers.length;j++){
			html+="<div class='summary-detail-quest'><p>"+questions[answers[j]["originalIndex"]]['question']+"</p></div>";
			html+="<div class='summary-detail-answ'><p>"+candidates[afinidad[i]["id"]]["long_answer"][questions[j]['originalIndex']]+"</p></div>";			
		}
		$("#summary-footer").show();
		$("#summary-detail").show();
		$("#summary-detail").html(html);	
		$("#summary-next-btn").hide();
		$("#summary-back-btn").show();
		$("#summary").hide();		
	}	

	function Next(){
		gameApp.mainMenu();
	}

	function Back(){
		$("#summary-detail").hide();
		$("#summary").show();
		$("#summary-back-btn").hide();
		$("#summary-next-btn").show();
	}

	return {//funcion de inicio de la aplicación
		init : function(c,q,ans){
			answers=ans;
			candidates = c;			

			questions = q;

			console.log(ans);
			//console.log(questions);



			$("#summary-next-btn").unbind().click(function(){
				Next();	
			});			
			

			$("#summary-back-btn").unbind().click(function(){
				Back();	
			});

			$("#summary-back-btn").hide();


			SetSummary();
		}	
	};
})();
