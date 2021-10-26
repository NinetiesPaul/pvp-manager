$(document).on('click', '.pkm-list-btn', function() {
	$(".teamassembler-table tbody").html("");
	//$(".pkm-list-btn").attr("disabled", true)

	var pkms = $(".pkm-list").val();
	pkms = pkms.split(',');

	var totalPkms = pkms.length;

	var teams = [];

	$.each(pkms, function(k1,v1){
		$.each(pkms, function(k2,v2){
			$.each(pkms, function(k3,v3){
				if (v1 != v2 && v2 != v3 && v1 != v3){
					team = [v1,v2,v3];
					team.sort();
					team = team.join(',');
					teams.push(team);
				}
			});
		});
	});

	teams = [...new Set(teams)];

	var textToAppend = "",
		teamCounter = 0;

	$.each(teams, function(mk,v) {
		pkms = v.split(",");
		var slot1 = pkms[0],
			slot2 = pkms[1],
			slot3 = pkms[2],
			combinedVulnerabilites = [],
			combinedResistances = [],
			ctVulnerability = true,
			skip = false;

		$.each(pkms, function(k,v) {
			var ept = $("#ept_limit option:selected").val();

			if (ept != "-") {
				var hasFastMoves = false;
				$.map(pokeDB[v].moveset.quick, function(element,index) {
					moveEpt = quickMoveDB[element.replace('*', "")].ept;
					if (!hasFastMoves) {
						switch ($("#ept_comparison option:selected").val()) {
							case ">=":
								if (moveEpt >= ept) {
									hasFastMoves = true
								}
								break;
							case ">":
								if (moveEpt > ept) {
									hasFastMoves = true
								}
								break;
						}
					}
				});

				if (!hasFastMoves) {
					skip = true;
				}
			}

			if ($("#hide_dv").is(":checked")) {
				if (jQuery.inArray("256%", Object.values(pokeDB[v].defense_data.vulnerable_to)) > -1) {
					skip = true;
				}
			}

			if (skip) {
				return false;
			}

			$.each(pokeDB[v].defense_data.vulnerable_to, function(k,v) {
				if (jQuery.inArray(k, combinedVulnerabilites) == -1){
					combinedVulnerabilites.push(k);
				} else {
					ctVulnerability = false;
				}
			})

			$.each(pokeDB[v].defense_data.resistant_to, function(k,v) {
				if (jQuery.inArray(k, combinedResistances) == -1){
					combinedResistances.push(k);
				}
			})
		});

		if (skip) {
			return true;
		}

		if ($("#hide_ctv").is(":checked") && !ctVulnerability) {
			return true;
		}

		teamCounter++;

		var ctVulnerabilityIcon = (ctVulnerability) ? "glyphicon glyphicon-thumbs-up" : "glyphicon glyphicon-thumbs-down";

		textToAppend += 
		"<tr>"+
			"<th><button class=\"btn btn-sm\" id=\"paste_pkms\"><span class=\"glyphicon glyphicon-paste\" aria-hidden=\"true\"></button></th>"+
			"<td><span id=\"slot1\"><b>"+slot1+"</b></span><br><small>" + pokeDB[slot1].type.join("/") + "</small></td>"+
			"<td><span id=\"slot2\"><b>"+slot2+"</b></span><br><small>" + pokeDB[slot2].type.join("/") + "</small></td>"+
			"<td><span id=\"slot3\"><b>"+slot3+"</b></span><br><small>" + pokeDB[slot3].type.join("/") + "</small></td>"+
			"<td>" + (new Set(combinedResistances).size) + "</td><td>" + (new Set(combinedVulnerabilites).size) + "</td>"+
			"<td><span class=\"" + ctVulnerabilityIcon + "\" aria-hidden=\"true\"></span></td>"+
		"</tr>";
		
	});

	var description = "<b>Number of pokemons:</b> " + totalPkms + "<br><b>Possible teams:</b> " + teamCounter + "<br>";

	$("#assembler_result").html(description);
	$("#assembler-tbody").append(textToAppend);
	//$(".pkm-list-btn").attr("disabled", false);
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