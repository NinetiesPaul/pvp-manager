function saveTeam() {
	pkmSlot1 = $("#pokemonList_slot1").find(":selected").text()
	pkmSlot2 = $("#pokemonList_slot2").find(":selected").text()
	pkmSlot3 = $("#pokemonList_slot3").find(":selected").text()

	dataToSave = ''

	if (pkmSlot1 !== "-- Pick an option --") {
		pkmSlot1 = pkmSlot1.split(" - ")
		pkmSlot1 = [1, pokeDB[pkmSlot1[1]].name]

		quick = $("#quick_move-slot1").find(":selected").text()
		if (quick !== "-- Quick --") {
			pkmSlot1.push(quick)
		}

		charge1 = $("#charge1_move-slot1").find(":selected").text()
		if (charge1 !== "-- Charge I --") {
			pkmSlot1.push(charge1)
		}

		charge2 = $("#charge2_move-slot1").find(":selected").text()
		if (charge2 !== "-- Charge II --") {
			pkmSlot1.push(charge2)
		}

		pkmSlot1 = pkmSlot1.join(",")

		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot1 : dataToSave += "&" + pkmSlot1
	}

	if (pkmSlot2 !== "-- Pick an option --") {
		pkmSlot2 = pkmSlot2.split(" - ")
		pkmSlot2 = [2, pokeDB[pkmSlot2[1]].name]

		quick = $("#quick_move-slot2").find(":selected").text()
		if (quick !== "-- Quick --") {
			pkmSlot2.push(quick)
		}

		charge1 = $("#charge1_move-slot2").find(":selected").text()
		if (charge1 !== "-- Charge I --") {
			pkmSlot2.push(charge1)
		}

		charge2 = $("#charge2_move-slot2").find(":selected").text()
		if (charge2 !== "-- Charge II --") {
			pkmSlot2.push(charge2)
		}

		pkmSlot2 = pkmSlot2.join(",")

		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot2 : dataToSave += "&" + pkmSlot2
	}

	if (pkmSlot3 !== "-- Pick an option --") {
		pkmSlot3 = pkmSlot3.split(" - ")
		pkmSlot3 = [3, pokeDB[pkmSlot3[1]].name]
		
		quick = $("#quick_move-slot3").find(":selected").text()
		if (quick !== "-- Quick --") {
			pkmSlot3.push(quick)
		}

		charge1 = $("#charge1_move-slot3").find(":selected").text()
		if (charge1 !== "-- Charge I --") {
			pkmSlot3.push(charge1)
		}

		charge2 = $("#charge2_move-slot3").find(":selected").text()
		if (charge2 !== "-- Charge II --") {
			pkmSlot3.push(charge2)
		}

		pkmSlot3 = pkmSlot3.join(",")

		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot3 : dataToSave += "&" + pkmSlot3
	}

	$("#saveData").val(dataToSave)

	new ClipboardJS('.saveBtn');
}
