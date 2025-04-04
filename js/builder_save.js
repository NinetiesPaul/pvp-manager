function saveTeam(switchPositions = false, target = null)
{
	pkmSlot1 = $("#pokemonList_slot1").find(":selected").text()
	pkmSlot2 = $("#pokemonList_slot2").find(":selected").text()
	pkmSlot3 = $("#pokemonList_slot3").find(":selected").text()

	dataToSave = ''

	if (pkmSlot1 !== "-- Pick an option --") {
		pkmSlot1 = slotToObject(pkmSlot1, 1);
		pkmSlot1 = pkmSlot1.join(",");
		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot1 : dataToSave += "&" + pkmSlot1;
	}

	if (pkmSlot2 !== "-- Pick an option --") {
		pkmSlot2 = slotToObject(pkmSlot2, 2);
		pkmSlot2 = pkmSlot2.join(",");
		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot2 : dataToSave += "&" + pkmSlot2
	}

	if (pkmSlot3 !== "-- Pick an option --") {
		pkmSlot3 = slotToObject(pkmSlot3, 3);
		pkmSlot3 = pkmSlot3.join(",");
		dataToSave = (dataToSave == '') ? dataToSave += pkmSlot3 : dataToSave += "&" + pkmSlot3
	}

	if (switchPositions) {
		if (target == "1_and_2") {
			inputToChange = pkmSlot2.replace('2', '1') + "&" + pkmSlot1.replace('1', '2')
			forceChange(inputToChange)
		} else {
			inputToChange = pkmSlot3.replace('3', '2') + "&" + pkmSlot2.replace('2', '3')
			forceChange(inputToChange)
		}
	} else {
		$("#saveData").val(dataToSave)
		new ClipboardJS('.saveBtn');
	}
}

function slotToObject(pkmSlot, slot)
{
	pkmSlot = pkmSlot.split(" - ")
	pkmSlot = [slot, pokeDB[pkmSlot[1]].name]

	quick = $("#quick_move-slot" + slot).find(":selected").text()
	if (quick !== "-- Quick --") {
		quick = quick.split(" (")[0];
		pkmSlot.push(quick)
	}

	charge1 = $("#charge1_move-slot" + slot).find(":selected").text()
	if (charge1 !== "-- Charge I --") {
		charge1 = charge1.split(" (")[0];
		pkmSlot.push(charge1)
	}

	charge2 = $("#charge2_move-slot" + slot).find(":selected").text()
	if (charge2 !== "-- Charge II --") {
		charge2 = charge2.split(" (")[0];
		pkmSlot.push(charge2)
	}

	return pkmSlot;
}
