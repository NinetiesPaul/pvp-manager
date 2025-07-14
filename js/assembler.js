function applyFilter(pkms, toRemove) {
	$.each(toRemove, function(id,removePkm) {
		pkms.splice(pkms.findIndex(x => x == removePkm), 1)
	});

	return pkms;
}

function checkIfHeavyHitter(slot) {
	let slotHeavyHitter = 0;
	let unusableSlot = false;

	eligibleFastMoves = pokeDB[slot].moveset.quick.filter((move) => {
		cleanName = move.replaceAll('*', '');
		let damageMultiplier = (pokeDB[slot].type.includes(quickMoveDB[cleanName].type)) ? 1.2 : 1;
		return parseFloat(quickMoveDB[cleanName].ept) >= 3 && (quickMoveDB[cleanName].dpt * damageMultiplier).toFixed(2) >= 4.00;
	})

	if (eligibleFastMoves.length > 0) {
		filter = pokeDB[slot].moveset.charge.filter((move) => {
			cleanChargeName = move.replaceAll('*', '');
			return chargeMoveDB[cleanChargeName].energy > -50;
		})

		if (filter.length > 1 && !unusableSlot) {
			slotHeavyHitter += 1;
		}
	} else {
		unusableSlot = true;
	}

	return (!unusableSlot) ? slotHeavyHitter : unusableSlot;
}

function checkIfFastHitter(slot) {
	let slotFastHitter = 0
	let unusableSlot = false;

	eligibleFastMoves = pokeDB[slot].moveset.quick.filter((move) => {
		cleanName = move.replaceAll('*', '');
		return parseFloat(quickMoveDB[cleanName].ept) >= 4.00;
	})

	if (eligibleFastMoves.length > 0) {
		filter = pokeDB[slot].moveset.charge.filter((move) => {
			cleanChargeName = move.replaceAll('*', '');
			return chargeMoveDB[cleanChargeName].energy >= -50;
		})

		if (filter.length > 1 && !unusableSlot) {
			slotFastHitter += 1;
		}
	} else {
		unusableSlot = true;
	}

	return (!unusableSlot) ? slotFastHitter : unusableSlot;
}

function assembleTeams(){
	$(".teamassembler-table tbody").html("");

	var pkms = $(".pkm-list").val();
	pkms = pkms.split(',');

	pkms = pkms.map((pokemon) => { return pokemon.trim() });
	pkms = Object.keys(pokeDB).filter(realPkm => pkms.includes(realPkm));

	var totalPkms = pkms.length;

	var toRemove = [];
	var toRemoveList = [];

	if (hideTypes.length > 0) {
		$.each(pkms, function(id,pkm) {
			if ($("#filter_opt").val() == "filterOut") {
				// if pokemon type intersects with hideTypes content, filter out
				if (pokeDB[pkm].type.filter(x => hideTypes.includes(x)).length > 0) {
					toRemove.push(pkm)
				}
			} else {
				// if pokemon type doesnt intersects with hideTypes content, filter out
				if (pokeDB[pkm].type.filter(x => hideTypes.includes(x)).length == 0) {
					toRemove.push(pkm)
				}
			}
		});

		pkms = applyFilter(pkms, toRemove);
		toRemove.forEach((item) => toRemoveList.push(item))
		toRemove = [];
	}

	if ($("#hide_dv").is(":checked")) {
		$.each(pkms, function(id,pkm) {
			if (jQuery.inArray("256%", Object.values(pokeDB[pkm].defense_data.vulnerable_to)) > -1) {
				toRemove.push(pkm);
			}
		});

		pkms = applyFilter(pkms, toRemove);
		toRemove.forEach((item) => toRemoveList.push(item))
		toRemove = [];
	}

	if ($("#hide_dt").is(":checked"))
	{
		$.each(pkms, function(id,pkm) {
			if (pokeDB[pkm].type.length > 1) {
				toRemove.push(pkm)
			}
		});

		pkms = applyFilter(pkms, toRemove);
		toRemove.forEach((item) => toRemoveList.push(item))
		toRemove = [];
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

		pkms = applyFilter(pkms, toRemove);
		toRemove.forEach((item) => toRemoveList.push(item))
		toRemove = [];
	}

	if ($("#filterByRegion").val() !== "All") {
		let searchRegions = ($("#filterByRegion").val() == "Hisui" || $("#filterByRegion").val() == "Sinnoh") ? [  "Hisui", "Sinnoh" ] : [ $("#filterByRegion").val() ];
		$.each(pkms, function(id,pkm) {
			if (!searchRegions.includes(pokeDB[pkm].region)) {
				toRemove.push(pkm)
			}
		});

		pkms = applyFilter(pkms, toRemove);
		toRemove.forEach((item) => toRemoveList.push(item))
		toRemove = [];
	}

	var leftOutEpt = [];
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

		// listing all pokemon marked to be filterd out due to not meeting EPT criteria
		// todo: simplify this using toRemove variable set earlier
		leftOutEpt = pkms.filter(x => toKeep.includes(x) == false);

		pkms = [...new Set(toKeep)];
	}

	var pkmsFinalList = pkms;

	var filteredPkms = pkms.length;

	var teams = [];

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

	let averageCombinedVulnerabilities = 0;
	let averageCombinedResistances = 0;

	$.each(teams, function(mk,v) {
		team = v.split(",");

		var slot1 = team[0].trim(),
			slot2 = team[1].trim(),
			slot3 = team[2].trim();

        var slot1VulnerableTo = Object.keys(pokeDB[slot1].defense_data.vulnerable_to),
			slot2VulnerableTo = Object.keys(pokeDB[slot2].defense_data.vulnerable_to),
			slot3VulnerableTo = Object.keys(pokeDB[slot3].defense_data.vulnerable_to),
			slot1SharedVulnerability = slot1VulnerableTo.filter(value => slot2VulnerableTo.concat(slot3VulnerableTo).includes(value)),
			slot2SharedVulnerability = slot2VulnerableTo.filter(value => slot1VulnerableTo.concat(slot3VulnerableTo).includes(value)),
			slot3SharedVulnerability = slot3VulnerableTo.filter(value => slot1VulnerableTo.concat(slot2VulnerableTo).includes(value)),
			teamSharedVulnerability = slot1SharedVulnerability.concat(slot2SharedVulnerability).concat(slot3SharedVulnerability),
			teamSharedVulnerability = [...new Set(teamSharedVulnerability)]

		if (teamSharedVulnerability.length > 0 && $("#hide_ctv").is(":checked")) {
			return true;
		}


		combinedVulnerabilites = [...new Set(slot1VulnerableTo.concat(slot2VulnerableTo).concat(slot3VulnerableTo))];
		averageCombinedVulnerabilities += (new Set(combinedVulnerabilites).size)
		
		combinedResistances = [...new Set(
			Object.keys(pokeDB[slot1].defense_data.resistant_to).concat(Object.keys(pokeDB[slot2].defense_data.resistant_to)).concat(Object.keys(pokeDB[slot3].defense_data.resistant_to))
		)];

		averageCombinedResistances += (new Set(combinedResistances).size)

		totalData.push([ v, new Set(combinedResistances).size, new Set(combinedVulnerabilites).size]);
	});

	if ($("#ordering").val() == "resistance") {
		totalData.sort((function(index){
			return function(a, b){
				return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
			};
		})(1));
	} else {
		totalData.sort((function(index){
			return function(a, b){
				return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
			};
		})(2));
	}

	$("#pkmTotalSize").html(totalPkms);
	$("#finalSize").html(filteredPkms);
	$("#finalList").html(pkmsFinalList.sort().join(", "));
	$("#leftOutSize").html(toRemoveList.length + leftOutEpt.length);
	$("#leftOutList").html(toRemoveList.concat(leftOutEpt).sort().join(", "));
	$("#teamsCombination").html(totalData.length);
};

function pasteTeam(e) {
	pkmSlot1 = pokeDB[e[0].dataset['slot1']].id + " - " + pokeDB[e[0].dataset['slot1']].name
	$("#pokemonList_slot1").val(pkmSlot1)
	$("#pokemonList_slot1").trigger("change")

	pkmSlot2 = pokeDB[e[0].dataset['slot2']].id + " - " + pokeDB[e[0].dataset['slot2']].name
	$("#pokemonList_slot2").val(pkmSlot2)
	$("#pokemonList_slot2").trigger("change")

	pkmSlot3 = pokeDB[e[0].dataset['slot3']].id + " - " + pokeDB[e[0].dataset['slot3']].name
	$("#pokemonList_slot3").val(pkmSlot3)
	$("#pokemonList_slot3").trigger("change")

	$("#pvp-teambuilder-tab").trigger("click")
};

function retrieveType(slot)
{
	let slotPkmType = "";
	$.each(pokeDB[slot].type, function (k,v) {
		width = 15 / pokeDB[slot].type.length
		color = colors[v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()]
		slotPkmType += "<span class='badge' style='width: " + width + "em; background-color: " + color + "; color: white;'>" + v + "</span>"
	});

	return slotPkmType;
};