function forceChange(input){

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
		pkmData = getPokemonData(pkm.padStart(3, '0'), "pokemonList_slot" + slot)
		
		console.log("#select2-pokemonList_slot" + slot + '-container')
		console.log(pkmData.name)
		$("#select2-pokemonList_slot" + slot + '-container').val(pkmData.name)
		
		if (quick != undefined && quick.match(/[a-z]/i)) {
			for (move of pkmData.moveset.quick) {						
				if (move[0].toLowerCase() === quick.toLowerCase()) {
					$("#quick_move-slot" + slot).val(move)
					$("#quick_move-slot" + slot).trigger("change")
					break
				}
			}
		}
		
		if (charge1 != undefined && charge1.match(/[a-z]/i)) {
			for (move of pkmData.moveset.charge) {						
				if (move[0].toLowerCase() === charge1.toLowerCase()) {
					$("#charge1_move-slot" + slot).val(move)
					$("#charge1_move-slot" + slot).trigger("change")
					break
				}
			}
		}
		
		if (charge2 != undefined && charge2.match(/[a-z]/i)) {
			for (move of pkmData.moveset.charge) {						
				if (move[0].toLowerCase() === charge2.toLowerCase()) {
					$("#charge2_move-slot" + slot).val(move)
					$("#charge2_move-slot" + slot).trigger("change")
					break
				}
			}
		}
	}
}
