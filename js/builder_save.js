function saveTeam(target = false)
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

	if (target) {
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
	quick = (quick !== "-- Quick --") ? quick.split(" (")[0] : "";
	pkmSlot.push(quick)

	charge1 = $("#charge1_move-slot" + slot).find(":selected").text()
	charge1 = (charge1 !== "-- Charge I --") ? charge1.split(" (")[0] : "";
	pkmSlot.push(charge1)

	charge2 = $("#charge2_move-slot" + slot).find(":selected").text()
	charge2 = (charge2 !== "-- Charge II --") ? charge2.split(" (")[0] : "";
	pkmSlot.push(charge2)

	return pkmSlot;
}

function updateHistory(slot)
{
	slot = (slot == "slot1") ? 1 : (slot == "slot2") ? 2 : 3;
	pkmName = $("#pokemonList_slot" + slot).find(":selected").text();
	pkmData = slotToObject(pkmName, slot)

	switch (slot) {
		case 1:
			slot1History[pkmName] = pkmData;
			break;
		case 2:
			slot2History[pkmName] = pkmData;
			break;
		case 3:
			slot3History[pkmName] = pkmData;
			break;
	}
}
