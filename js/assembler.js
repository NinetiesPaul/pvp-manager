$(document).on('click', '.pkm-list-btn', function() {
	$(".teamassembler-table tbody").html("");

	var pkms = $(".pkm-list").val();
	pkms = pkms.split(',');

	/*$.each(pkms, function(id, pkm) {
		if (pkm.indexOf(" ") > -1) {
			innerPkm = pkm.split(" ");

			$.each(innerPkm, function(k, j) {
				namePart = j.charAt(0).toUpperCase() + j.slice(1).toLowerCase()

				if (namePart == "Ho-oh") {
					namePart = "Ho-Oh"
				}

				innerPkm[k] = namePart
			});

			pkms[id] = innerPkm.join(" ")
		} else {
			pkms[id] = pkm.charAt(0).toUpperCase() + pkm.slice(1).toLowerCase()
		}
	})*/

	var totalPkms = pkms.length;

	if (hideTypes.length > 0) {
		if ($("#filter_opt").val() == "filterOut") {
			toRemove = []

			$.each(hideTypes, function(idt,type) {
				$.each(pkms, function(id,pkm) {
					if (pokeDB[pkm].type.join(",").includes(type)) {
						toRemove.push(pkm)
						//pkms.splice(pkms.findIndex(x => x == pkm), 1)
					}
				});
			});

			$.each(toRemove, function(id,removePkm) {
				pkms.splice(pkms.findIndex(x => x == removePkm), 1)
			});
		} else {
			toKeep = []

			$.each(hideTypes, function(idt,type) {
				$.each(pkms, function(id,pkm) {
					if (pokeDB[pkm].type.join(",").includes(type)) {
						toKeep.push(pkm)
						//pkms.splice(pkms.findIndex(x => x == pkm), 1)
					}
				});
			});

			pkms = [...new Set(toKeep)];
		}
	}

	var toRemove = [];

	if ($("#hide_dv").is(":checked")) {
		$.each(pkms, function(id,pkm) {
			if (jQuery.inArray("256%", Object.values(pokeDB[pkm].defense_data.vulnerable_to)) > -1) {
				toRemove.push(pkm);
			}
		});
	}

	if ($("#hide_dt").is(":checked"))
	{
		$.each(pkms, function(id,pkm) {
			if (pokeDB[pkm].type.length > 1) {
				toRemove.push(pkm)
			}
		});
	}

	if ($("#hide_irrelevant").is(":checked"))
	{
		$.each(pkms, function(id,pkm) {
			var relevantChargeMoves = 0;

			$.each(pokeDB[pkm].moveset.charge, function(id,move) {
				move = move.replace('*', "")

				if (chargeMoveDB[move].energy <= -35 && chargeMoveDB[move].energy > -60 && chargeMoveDB[move].dpe > 1.2) {
					relevantChargeMoves += 1;
				}
			});

			if (relevantChargeMoves < 2) {
				toRemove.push(pkm)
			}
		});
	}

	$.each(toRemove, function(id,removePkm) {
		pkms.splice(pkms.findIndex(x => x == removePkm), 1)
	});

	var ept = $("#ept_limit option:selected").val();

	if (ept != "-") {
		toKeep = [];

		$.each(pkms, function(id,pkm) {
			$.map(pokeDB[pkm].moveset.quick, function(element,index) {
				moveEpt = quickMoveDB[element.replace('*', "")].ept;

				switch ($("#ept_comparison option:selected").val()) {
					case "=":
						if (parseFloat(moveEpt) === parseFloat(ept)) {
							toKeep.push(pkm)
						}
						break;
					case ">=":
						if (parseFloat(moveEpt) >= parseFloat(ept)) {
							toKeep.push(pkm)
						}
						break;
					case ">":
						if (parseFloat(moveEpt) > parseFloat(ept)) {
							toKeep.push(pkm)
						}
						break;
				}
			});
		});

		pkms = [...new Set(toKeep)];
	}

	var pkmsFinalList = pkms;

	var filteredPkms = pkms.length;

	var teams = [];

	teams = []

	// the length of skipping after n0; eg: n0 n1 n2, n0 n2 n3, n0 n3 n4
	sliceSkip = pkms.length - 3
	
	pkms.forEach((item, idx) => {
		arrayOrder = pkms.slice(idx, pkms.length)
	
		// changes the array's item order skipping 1 item to the left; eg: a b c d, b c d a, c d a b
		if (arrayOrder.length < pkms.length) {
			arrayOrder = arrayOrder.concat(pkms.slice(0, pkms.length - arrayOrder.length))
		}
	
		//console.log(arrayOrder)
		combination = [];
		for(k = 0; k <= sliceSkip; k++) {
			// creates the combination, slicing at k + 2 and pushing the item at arrayOrder index 0 at the beggining
			combination = arrayOrder.slice(k + 1, k + 3)
			combination.splice(0,0,arrayOrder[0])
			combination.sort()
			//console.log(combination)
	
			joinedCombination = combination.join(",")
			if (teams.includes(joinedCombination) === false) {
				//console.log(joinedCombination)
				teams.push(joinedCombination);
			}
		}
	
	});
	
	teams.sort()

	var textToAppend = "",
		teamCounter = 0;

	$.each(teams, function(mk,v) {
		pkms = v.split(",");
		
		var slot1 = pkms[0].trim(),
			slot2 = pkms[1].trim(),
			slot3 = pkms[2].trim();

		if (Object.keys(pokeDB).includes(slot1) === false) {
			throw new Error(slot1," not found");
		}
		if (Object.keys(pokeDB).includes(slot2) === false) {
			throw new Error(slot2," not found");
		}
		if (Object.keys(pokeDB).includes(slot3) === false) {
			throw new Error(slot3," not found");
		}

		var slot1VulnerableTo = Object.keys(pokeDB[slot1].defense_data.vulnerable_to),
			slot2VulnerableTo = Object.keys(pokeDB[slot2].defense_data.vulnerable_to),
			slot3VulnerableTo = Object.keys(pokeDB[slot3].defense_data.vulnerable_to),
			slot1SharedVulnerability = slot1VulnerableTo.filter(value => slot2VulnerableTo.concat(slot3VulnerableTo).includes(value))
			slot2SharedVulnerability = slot2VulnerableTo.filter(value => slot1VulnerableTo.concat(slot3VulnerableTo).includes(value))
			slot3SharedVulnerability = slot3VulnerableTo.filter(value => slot1VulnerableTo.concat(slot2VulnerableTo).includes(value))
			teamSharedVulnerability = slot1SharedVulnerability.concat(slot2SharedVulnerability).concat(slot3SharedVulnerability)
			teamSharedVulnerability = [...new Set(teamSharedVulnerability)]
			combinedVulnerabilites = [],
			combinedResistances = [],
			ctVulnerability = true,
			skip = false;

		$.each(pkms, function(k,v) {

			$.each(pokeDB[v.trim()].defense_data.vulnerable_to, function(k,v) {
				if (jQuery.inArray(k, combinedVulnerabilites) == -1){
					combinedVulnerabilites.push(k);
				} else {
					if ($("#hide_ctv").is(":checked")) {
						skip = true;
						return false;
					}
					ctVulnerability = false;
				}
			})

			$.each(pokeDB[v.trim()].defense_data.resistant_to, function(k,v) {
				if (jQuery.inArray(k, combinedResistances) == -1){
					combinedResistances.push(k);
				}
			})
		});

		if (skip) {
			return true;
		}

		teamCounter++;

		var ctVulnerabilityIcon = (ctVulnerability) ? "glyphicon glyphicon-thumbs-up" : "glyphicon glyphicon-thumbs-down";

		/*slot1SharedVulnerabilityIcons = '';
		$.each(slot1SharedVulnerability, function(k,v) {
			imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + v.toUpperCase() + '.png';
			slot1SharedVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + v + "'/>";
		});
		slot2SharedVulnerabilityIcons = '';
		$.each(slot2SharedVulnerability, function(k,v) {
			imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + v.toUpperCase() + '.png';
			slot2SharedVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + v + "'/>";
		});
		slot3SharedVulnerabilityIcons = '';
		$.each(slot3SharedVulnerability, function(k,v) {
			imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + v.toUpperCase() + '.png';
			slot3SharedVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + v + "'/>";
		});*/

		teamSharedVulnerabilityIcons = '';
		$.each(teamSharedVulnerability, function(k,v) {
			imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + v.toUpperCase() + '.png';
			teamSharedVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + v + "'/>";
		});

		textToAppend += 
		"<tr>"+
			"<th><button class=\"btn btn-sm\" id=\"paste_pkms\"><span class=\"glyphicon glyphicon-paste\" aria-hidden=\"true\"></button></th>"+
			"<td><span id=\"slot1\"><b>"+slot1+"</b></span><br><small>" + pokeDB[slot1].type.join("/") + "</small></td>"+
			"<td><span id=\"slot2\"><b>"+slot2+"</b></span><br><small>" + pokeDB[slot2].type.join("/") + "</small></td>"+
			"<td><span id=\"slot3\"><b>"+slot3+"</b></span><br><small>" + pokeDB[slot3].type.join("/") + "</small></td>"+
			"<td>" + teamSharedVulnerabilityIcons + "</td>"+
			"<td>" + (new Set(combinedResistances).size) + "</td><td>" + (new Set(combinedVulnerabilites).size) + "</td>"+
			"<td><span class=\"" + ctVulnerabilityIcon + "\" aria-hidden=\"true\"></span></td>"+
		"</tr>";
	});

	var description = "<b>Number of pokemons:</b> " + totalPkms + "<br><b>Filtered pokemons:</b> " + filteredPkms + "<br><b>Possible teams:</b> <span class='teamCounter'>" + teamCounter + "</span><br><b>Final list:</b> " + pkmsFinalList.join(",");

	$("#assembler_result").html(description);
	$("#assembler-tbody").append(textToAppend);
});

$(document).on('click', '#paste_pkms', function() {
	var pkmSlot1 = $(this).parent().parent().find("#slot1").text()
	pkmSlot1 = pokeDB[pkmSlot1].id + " - " + pokeDB[pkmSlot1].name
	$("#pokemonList_slot1").val(pkmSlot1)
	$("#pokemonList_slot1").trigger("change")

	var pkmSlot2 = $(this).parent().parent().find("#slot2").text()
	pkmSlot2 = pokeDB[pkmSlot2].id + " - " + pokeDB[pkmSlot2].name
	$("#pokemonList_slot2").val(pkmSlot2)
	$("#pokemonList_slot2").trigger("change")

	var pkmSlot3 = $(this).parent().parent().find("#slot3").text()
	pkmSlot3 = pokeDB[pkmSlot3].id + " - " + pokeDB[pkmSlot3].name
	$("#pokemonList_slot3").val(pkmSlot3)
	$("#pokemonList_slot3").trigger("change")

	$("#pvp-teambuilder-tab").trigger("click")
});