var gameApp = (function(){

	var gameConfig;

	var currentCountry = "Brasil";
	var currentElection = "Presidente Segunda Vuelta";

	var candidates;
	var questions;

	var categories = [];

	var answers=[];

	var lastGamePlayed;

	var stars = {
		casual:0,
		normal:0,
		qo:0,
		qdq:0
	};

	var candidatesAnsw = {};

	function showHeader( divToShow )
	{
		/*$("#header-home").hide();
		$("#header-qdq").hide();
		$("#header-qo").hide();*/
		$(".sectionHeader").hide();

		$(divToShow).show();
	}

	function getCategories(quest){
		//console.log(quest);
		$.get(gameConfig.achievements.url, function( data ) {
			let achievTexts = cvs2JSO(data);
			for(q of quest){
				let cat = categories.filter(function (item) {
					return item.category == q["category"];
				});				
				if(cat.length==0){
					let catConfig = achievTexts.filter(function (item) {
						return item.category == q["category"];
					});

					let savedAchivs = achievements.getAchievements();

					let savedAchiv = null;
					if(savedAchivs!=null){
						savedAchiv = savedAchivs.filter(function (item) {
							return item.category == q["category"];
						});
					}

					//console.log(savedAchiv[0]);

					let c = { category:q["category"],cant:0,logro:savedAchiv[0]!=undefined,cant2show:catConfig[0]["cant_resp"],text:catConfig[0]["text_achievement"]};
					//console.log(c);
					categories.push(c);
				}
			}
			//console.log(categories);			
		});
	}

	function setCategories(id){
		let cat = categories.filter(function (item) {
			return item.category == questions["all"][id]["category"];
		});
		if(cat.length>0){
			//console.log(cat);
			cat[0]["cant"]++;
		}

		for(c of categories){
			if(!c["logro"]){
				if(c["cant"]==c["cant2show"]){
					c["logro"]=true;
					let candid = summary.getCategoryBestWorstCandidatesIds();
					/*$("#achievement-popup").show();
					$("#achiev-img").attr("src",candid[0]["photo"]);
					$("#achievement-popup h4").text("sos el mejor "+c["category"]);*/
					//console.log(candidates);
					//console.log(candid[0]);
					if(stars[lastGamePlayed]<3){
						let star = "star"+stars[lastGamePlayed]+"-"+lastGamePlayed;
						$("#"+star).attr("src","img/star1.png");
						stars[lastGamePlayed]++;
						localStorage.setItem("stars",  JSON.stringify(stars));
					}
					achievements.setAchiev(c["text"]+" "+candidates[currentElection][candid[0]]["full_name"],c["category"],candid[0]);
					ShowAchievPopup(candidates[currentElection][candid[0]]["photo"],c["text"]+" "+candidates[currentElection][candid[0]]["full_name"]);
				}
			}
		}

		//console.log(categories);
	}

	function ShowAchievPopup(src,text){
		console.log(src+" - "+text);
		$("#achievement-popup").show();
		$("#achiev-img").attr("src",src);
		$("#share").jsSocials("option", "text", "Tive "+text+" na YVI !!! ");

		$("#achievement-popup h4").text(text);
	}

	function getCandidates4Achiv(candid){
		for(let i=0;i<candid[currentElection].length;i++){
			candidatesAnsw[candid[currentElection][i]["full_name"]] = {
				positive:0,
				negative:0,
			};
		}
		candidatesAnsw["achiev1"] = 2;
		candidatesAnsw["achiev2"] = 4;
		//console.log(candidatesAnsw);
	}

	return {//funcion de inicio de la aplicación
		init : function(){
			//localStorage.clear();
			$.get('static/gameConfig.json', function( data ) {
				gameConfig = data;
				//console.log(gameConfig);

				YQS.init(function(){
					achievements.loadAchievData(gameConfig.achievements);

					let data = localStorage.getItem("answers");
					if(data!=null){
						answers = JSON.parse(data);
						$("#footerHomeBtn3").removeClass("blocked");
					}

					candidates = YQS.getCandidatesByCountry(currentCountry,getCandidates4Achiv);
					questions = YQS.getQuestionsByElection(currentElection,getCategories);				
					//console.log(candidates);
					//console.log(questions);

					let data2 = localStorage.getItem("stars");
					if(data2!=null){
						stars = JSON.parse(data2);
						for(let key in stars){
							for(let i=0;i<stars[key];i++){
								let star = "star"+i+"-"+key;
								$("#"+star).attr("src","img/star1.png");
							}							
						}						
					}

					gameApp.mainMenu();
				});
			});			

			setTimeout(function(){$.mobile.loading( "show", {
				text: "loading",
				textVisible: true,
				theme: "b",
				textonly: null,
				html: ""   });}, 1000);


		},

		mainMenu : function(){			
			showHeader("#header-home");
			$(".game-section").hide();
			$("#game-menu").show();
		},

		loadCasual : function(){
			showHeader("#header-casual");
			$(".game-section").hide();
			$("#game-casual").show();
			lastGamePlayed = "casual";
			casual.init(candidates[currentElection],questions["all"],gameConfig.casual);
		},

		loadNormal : function(){
			showHeader("#header-normal");
			$(".game-section").hide();
			$("#game-normal").show();
			lastGamePlayed = "normal";
			normal.init(candidates[currentElection],questions["all"],gameConfig.normal);
		},	

		loadQO : function(){
			showHeader("#header-qo");

			$(".game-section").hide();
			$("#game-qo").show();
			lastGamePlayed = "qo";
			qo.init(candidates[currentElection],questions["all"],gameConfig.qdq);

		},
		loadQDQ : function(){

			showHeader("#header-qdq");

			$(".game-section").hide();
			$("#game-qdq").show();
			lastGamePlayed = "qdq";
			qdq.init(candidates[currentElection],gameConfig.qdq);
			/*let selCandidate = parseInt(candidates[currentElection].length * Math.random());
			//console.log(selCandidate);
			let frase = ""
			while(frase==""){
				frase = candidates[currentElection][selCandidate]["long_answer"][ parseInt(candidates[currentElection][selCandidate]["long_answer"].length * Math.random())];
			}
			$("#qdq-frase").html(frase);
			console.log(frase);*/
		},

		loadSummary : function(){
			if(answers.length>0){
				showHeader("#header-summary");
				$(".game-section").hide();
				$("#game-summary").show();
				summary.init(candidates[currentElection],questions["all"],answers);
			}
		},

		loadAchievements : function(){
			showHeader("#header-summary");
			$(".game-section").hide();
			$("#game-achievements").show();
			achievements.init(candidates[currentElection]);
		},

		setCountry : function(country){
			currentCountry=country;
		},

		setElection : function(election){
			currentElection=election;
		},

		getCountry : function(){
			return currentCountry;
		},

		getElection : function(){
			return currentElection;
		},

		addAnswer : function(ans){
			if(answers.length==0)
				$("#footerHomeBtn3").removeClass("blocked");
			answers.push(ans);
			localStorage.setItem("answers",  JSON.stringify(answers));
			setCategories(ans["originalIndex"]);
		},

		getAnswers : function(){
			return answers;
		},

		addCandidAnsw : function(name,val){
			console.log(candidates[currentElection]);
			console.log(name+" : "+val);
			if(val<0){
				candidatesAnsw[name]["positive"]=0;
				candidatesAnsw[name]["negative"]++;
			}else if(val>0){
				candidatesAnsw[name]["positive"]++;
				candidatesAnsw[name]["negative"]=0;
				if(candidatesAnsw[name]["positive"]==candidatesAnsw["achiev1"]){
					let cand = candidates[currentElection].filter(function (item) {
						return item["full_name"] == name;
					});
					if(stars[lastGamePlayed]<3){
						let star = "star"+stars[lastGamePlayed]+"-"+lastGamePlayed;
						$("#"+star).attr("src","img/star1.png");
						stars[lastGamePlayed]++;
						localStorage.setItem("stars",  JSON.stringify(stars));
					}
					achievements.setAchiev("Especialista en "+cand[0]["full_name"],"Especialista",candidates[currentElection].indexOf(cand[0]));
					ShowAchievPopup(cand[0]["photo"],"Especialista en "+cand[0]["full_name"]);
				}else if(candidatesAnsw[name]["positive"]==candidatesAnsw["achiev2"]){
					let cand = candidates[currentElection].filter(function (item) {
						return item["full_name"] == name;
					});

					if(stars[lastGamePlayed]<3){
						let star = "star"+stars[lastGamePlayed]+"-"+lastGamePlayed;
						$("#"+star).attr("src","img/star1.png");
						stars[lastGamePlayed]++;
						localStorage.setItem("stars",  JSON.stringify(stars));
					}
					achievements.setAchiev("Experto en "+cand[0]["full_name"],"Experto",candidates[currentElection].indexOf(cand[0]));
					ShowAchievPopup(cand[0]["photo"],"Experto en "+cand[0]["full_name"]);
				}				
			}else{
				candidatesAnsw[name]["positive"]=0;
				candidatesAnsw[name]["negative"]=0;
			}
			console.log(candidatesAnsw);
		},

		getCandidates : function(){
			return candidates[currentElection];
		},

		getQuestions : function(){
			return questions["all"];
		},

		showAchievPopup: ShowAchievPopup

	};

})();

