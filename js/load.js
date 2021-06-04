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
		
		pkmData = getPokemonData(pkm.padStart(3, '0'), "pokemonList_slot" + slot)
		
		if (pkmData == undefined) {
			return
		}
		
		$("#pokemonList_slot" + slot).val(pkmData.id.padStart(3, '0') + " - " + pkmData.name)
			
		if (quick != undefined && quick.match(/[a-z]/i)) {
			for (move of pkmData.moveset.quick) {
				formattedMove = move.toLowerCase().split(" ")
				formattedMove = (formattedMove.length > 1) ? formattedMove[0].substring(0,2) + formattedMove[1].substring(0,2) : formattedMove[0][0]
				
				if (formattedMove === quick) {
					$("#quick_move-slot" + slot).val(move)
					$("#quick_move-slot" + slot).trigger("change")
					break
				}
			}
		}
		
		if (charge1 != undefined && charge1.match(/[a-z]/i)) {
			for (move of pkmData.moveset.charge) {
				formattedMove = move.toLowerCase().split(" ")
				formattedMove = (formattedMove.length > 1) ? formattedMove[0].substring(0,2) + formattedMove[1].substring(0,2) : formattedMove[0][0]
				
				if (formattedMove === charge1) {
					$("#charge1_move-slot" + slot).val(move)
					$("#charge1_move-slot" + slot).trigger("change")
					break
				}
			}
		}
		
		if (charge2 != undefined && charge2.match(/[a-z]/i)) {
			for (move of pkmData.moveset.charge) {
				formattedMove = move.toLowerCase().split(" ")
				formattedMove = (formattedMove.length > 1) ? formattedMove[0].substring(0,2) + formattedMove[1].substring(0,2) : formattedMove[0][0]
				
				if (formattedMove === charge2) {
					$("#charge2_move-slot" + slot).val(move)
					$("#charge2_move-slot" + slot).trigger("change")
					break
				}
			}
		}
	}
}
