function forceChange(input) {

	loadDataInput = input.split("&")

	dataToLoad = []

	for (loadData in loadDataInput) {
		loadData = loadDataInput[loadData].split(",")
		dataToLoad.push(loadData)
	}

	for (data in dataToLoad) {
		slot = dataToLoad[data][0]
		pkm = dataToLoad[data][1]
		quick = dataToLoad[data][2]
		charge1 = dataToLoad[data][3]
		charge2 = dataToLoad[data][4]

		if (pkm == undefined) {
			return
		}

		pkmData = getPokemonData(pkm, "pokemonList_slot" + slot)
		
		if (pkmData == undefined) {
			return
		}

		$("#pokemonList_slot" + slot).val(pkmData.id.padStart(3, '0') + " - " + pkmData.name)

		if (quick != undefined && quick.match(/[a-z]/i)) {
			for (move of pkmData.moveset.quick) {				
				if (move === quick) {
					$("#quick_move-slot" + slot).val(move)
					$("#quick_move-slot" + slot).trigger("change")
				}
			}
		}

		if (charge1 != undefined && charge1.match(/[a-z]/i)) {
			for (move of pkmData.moveset.charge) {				
				if (move === charge1) {
					$("#charge1_move-slot" + slot).val(move)
					$("#charge1_move-slot" + slot).trigger("change")
				}
			}
		}

		if (charge2 != undefined && charge2.match(/[a-z]/i)) {
			for (move of pkmData.moveset.charge) {				
				if (move === charge2) {
					$("#charge2_move-slot" + slot).val(move)
					$("#charge2_move-slot" + slot).trigger("change")
				}
			}
		}
	}
}
