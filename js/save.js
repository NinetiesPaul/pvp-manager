function getMoveInitials(name) {
	name = name.toLowerCase().split(" ")
	return (name.length > 1) ? name[0].substring(0,2) + name[1].substring(0,2) : name[0][0]
}

function saveTeam() {
	pkmSlot1 = $("#pokemonList_slot1").find(":selected").text()
	pkmSlot2 = $("#pokemonList_slot2").find(":selected").text()
	pkmSlot3 = $("#pokemonList_slot3").find(":selected").text()
	
	dataToSave = ''

	if (pkmSlot1 !== "-- Selecione um pokemon --") {
		pkmSlot1 = pkmSlot1.split(" - ")
		pkmSlot1 = [1, pokeDB[pkmSlot1[1]].imgurl]
		
		quick = $("#quick_move-slot1").find(":selected").text()
		if (quick !== "-- Quick --") {
			pkmSlot1.push(getMoveInitials(quick))
		}
		
		charge1 = $("#charge1_move-slot1").find(":selected").text()
		if (charge1 !== "-- Charge I --") {
			pkmSlot1.push(getMoveInitials(charge1))
		}		
		
		charge2 = $("#charge2_move-slot1").find(":selected").text()
		if (charge2 !== "-- Charge II --") {
			pkmSlot1.push(getMoveInitials(charge2))
		}		
		
		pkmSlot1 = pkmSlot1.join(",")

		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot1 : dataToSave += "&" + pkmSlot1
	} else {
		pkmSlot1 = ''
	}

	if (pkmSlot2 !== "-- Selecione um pokemon --") {
		pkmSlot2 = pkmSlot2.split(" - ")
		pkmSlot2 = [2, pokeDB[pkmSlot2[1]].imgurl]
		
		quick = $("#quick_move-slot2").find(":selected").text()
		if (quick !== "-- Quick --") {
			pkmSlot2.push(getMoveInitials(quick))
		}
		
		charge1 = $("#charge1_move-slot2").find(":selected").text()
		if (charge1 !== "-- Charge I --") {
			pkmSlot2.push(getMoveInitials(charge1))
		}		
		
		charge2 = $("#charge2_move-slot2").find(":selected").text()
		if (charge2 !== "-- Charge II --") {
			pkmSlot2.push(getMoveInitials(charge2))
		}		
		
		pkmSlot2 = pkmSlot2.join(",")

		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot2 : dataToSave += "&" + pkmSlot2
	} else {
		pkmSlot2 = ''
	}

	if (pkmSlot3 !== "-- Selecione um pokemon --") {
		pkmSlot3 = pkmSlot3.split(" - ")
		pkmSlot3 = [3, pokeDB[pkmSlot3[1]].imgurl]
		
		quick = $("#quick_move-slot3").find(":selected").text()
		if (quick !== "-- Quick --") {
			pkmSlot3.push(getMoveInitials(quick))
		}
		
		charge1 = $("#charge1_move-slot3").find(":selected").text()
		if (charge1 !== "-- Charge I --") {
			pkmSlot3.push(getMoveInitials(charge1))
		}		
		
		charge2 = $("#charge2_move-slot3").find(":selected").text()
		if (charge2 !== "-- Charge II --") {
			pkmSlot3.push(getMoveInitials(charge2))
		}		
		
		pkmSlot3 = pkmSlot3.join(",")

		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot3 : dataToSave += "&" + pkmSlot3
	} else {
		pkmSlot3 = ''
	}
	
	$("#saveData").val(dataToSave)
	
	new ClipboardJS('.saveBtn');
}
