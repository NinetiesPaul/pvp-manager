function saveTeam() {
	pkmSlot1 = $("#pokemonList_slot1").find(":selected").text()
	pkmSlot2 = $("#pokemonList_slot2").find(":selected").text()
	pkmSlot3 = $("#pokemonList_slot3").find(":selected").text()
	
	if (pkmSlot1 !== "-- Selecione um pokemon --") {
		pkmSlot1 = pkmSlot1.split(" - ")
		pkmSlot1 = [1, pokeDB[pkmSlot1[1]].imgurl]
		
		quick = $("#quick_move-slot1").find(":selected").text()
		if (quick !== "-- Quick --") {
			pkmSlot1.push(quick.toLowerCase()[0])
		}
		
		charge1 = $("#charge1_move-slot1").find(":selected").text()
		if (charge1 !== "-- Charge I --") {
			pkmSlot1.push(charge1.toLowerCase()[0])
		}		
		
		charge2 = $("#charge2_move-slot1").find(":selected").text()
		if (charge2 !== "-- Charge II --") {
			pkmSlot1.push(charge2.toLowerCase()[0])
		}		
		
		pkmSlot1 = pkmSlot1.join(",")
	}
	
	//format pokemons escolhidos e salvar
	
	$("#saveData").val(pkmSlot1)
	
	new ClipboardJS('.saveBtn');
}
