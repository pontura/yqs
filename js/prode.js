var prode = (function(){

	var config;
	var selCandidate = -1;
	var candidates;
	var questions;
	var candidatesSel;

	var answers=[];
	var afinidad;

	var navPos=0;
	var correctAns=0;
	var summaryDone=false;

	var cantOpt = 4;
	var randStep = 2;

	var h;

	var animTime = 3000;

	function setOptions(){
		let html = "";
		for(let c of candidatesSel){
			let src = c["photo"].replace('git','');
			html+="<div class='w3-col s6 m6 l6'><button name="+c["full_name"]+" class='prode-btn interactable'>"+
				"<img src="+c["photo"]+">"+
				"<p class='candidato'>"+c["full_name"]+"</p>"+
				"<p class='partido'>"+c["politic_party"]+"</p>"+
				"</button></div>";
		}
		$("#prode-options").html(html);
	}

	function SetAnswerVal(val){
		let puntos = 0;
		if(candidatesSel[navPos]["sort_answer"][questions[selQuestion]["originalIndex"]]>-1){
			puntos=Math.abs(val-candidates[navPos]["sort_answer"][questions[selQuestion]["originalIndex"]]);
		}
		let perc = 100*((cantOpt-1)-puntos)/(cantOpt-1);
		answers.push(perc);
	}

	function Reset(){
		candidatesSel = randomSubArray(candidates,candidates.length);
		selQuestion =  parseInt(questions.length * Math.random());
		//console.log(candidatesSel);

		AddAvatar();

		$("#prode-frase").html(questions[selQuestion]["question"]);

		$("#prode-summary").hide();
		$("#prode-options").show();

		//setOptions();

		$(".prode-btn").click(function(e){
			if($(this).hasClass("interactable")){
				let posX = $(this).parent().parent().offset().left;
				let posY = $(this).parent().parent().offset().top;

				$("#avatar_"+navPos+" .candidato").hide();
				$("#avatar_"+navPos+" .partido").hide();

				SetAnswerVal($(this).attr("name"));

				//	$(".avatar").css({top: e.pageY-posY, left: e.pageX-posX});
				
				h = parseInt($("#avatar_"+navPos).children(".avatar-cuerpo").css("height"));

				$("#avatar_"+navPos).animate({    			
					left: e.pageX-posX,
					top: e.pageY-posY
				},
				{
					duration:animTime,
					step: function( now, fx ) {
						let p = fx.pos.toFixed(5);
						let r = Math.round(Math.sin(p*Math.PI*animTime))*randStep;
						r+=h;					
						$(this).children(".avatar-cuerpo").css("height",r+"px");
						},
					complete: function() {
						$(this).children(".avatar-cuerpo").css("height",h+"px");
						//console.log("anim end");						
					}
				});


				$(".prode-btn").removeClass("interactable");
				setTimeout(function(){Next()}, (animTime));
			}
		});	
	}

	function AddAvatar(){				
		let html = "<div id='avatar_"+navPos+"' class='avatar'><p class='candidato'>"+candidatesSel[navPos]["full_name"]+"</p><img class='avatar-cuerpo' src='img/cuerpo.png'><img class='avatar-cabeza' src='img/"+candidatesSel[navPos]["last_name"]+".png'>"+
				"<p class='partido'>"+candidatesSel[navPos]["politic_party"]+"</p></div>";
		$("#prode-options").append( html );
		let hue = 360*navPos/candidatesSel.length;
		$("#avatar_"+navPos+" .avatar-cuerpo").css({'-webkit-filter': 'hue-rotate('+hue+'deg)', 'filter': 'hue-rotate('+hue+'deg)'});
		$("#avatar_"+navPos+" .avatar-cabeza").css({'-webkit-filter': 'hue-rotate(0deg)', 'filter': 'hue-rotate(0deg)'});
		$("#avatar_"+navPos).css({"top":"-500vw","left":"-500vh"});

		$("#avatar_"+navPos+" img.avatar-cabeza").load(function(){
			$("#avatar_"+navPos).css({"top":"30vh","left":"50vw"});
			$(".prode-btn").addClass("interactable");
		});
		
		/*$("#avatar_"+navPos+" img" ).ready( function() {
			console.log("aca");
  			//$("#avatar_"+navPos).show();
		});*/
	}

	function SetSummary(){
		if(summaryDone){
			gameApp.mainMenu();
		}else{
			afinidad=0;
			for(let a of answers){
				afinidad+=a;
			}

			//console.log(afinidad);

			let percent = afinidad/candidatesSel.length;
			let html="<h2>Lograste "+Math.round(percent)+"% de respuestas correctas</h2>";
			$("#prode-frase").html("");
			$("#prode-summary").show();
			$("#prode-summary").html(html);
			$("#prode-options").hide();
			summaryDone=true;
			answers = [];
			$(".avatar").remove();
		}
	}

	function Next(){
		navPos++;		
		if(navPos>=candidatesSel.length){
			SetSummary();
		}else{
			SetNavigatorPos("header-prode",navPos);			
			AddAvatar();
		}
		
	}

	return {//funcion de inicio de la aplicación
		init : function(c,q,prodeConfig){
			navPos=0;
			correctAns=0;
			summaryDone=false;
			config = prodeConfig;
			//console.log(prodeConfig);
			candidates = c;
			questions = q;
			//console.log(questions);
			//console.log(candidates);

			Reset();

			CreateNavigator("header-prode",candidates.length);

			$("#prode-next-btn").unbind().click(function(){
				Next();
			});

			$("#game-prode").unbind().on( "swipeleft", function(){
				Next();	
			});
		}	
	};
})();
