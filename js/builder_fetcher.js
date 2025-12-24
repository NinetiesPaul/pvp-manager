function getPokemonData(pokemon, slot)
{
	if (pokemon.indexOf(" - ") > -1) {
		pokemon = pokemon.split(" - ");
		pokemon = pokemon[1]
	}

    slot = slot.split("_");
    slot = slot[1];
    clearLayout(slot);

	data = pokeDB[pokemon]
	if ($.isNumeric(pokemon)) {
    	for (pokemonDb in pokeDB){
    		if (pokeDB[pokemonDb].id == pokemon) {
    			data = pokeDB[pokeDB[pokemonDb].name]
    			break
    		}
    	}
    }
    
    if (data == undefined) {
    	return
    }

    pokemonTypeA =  data.type[0];

    $('.defense_typeA-' + slot)
        .attr('colspan', 2)
        .addClass('defense_one_type_style-' + slot)
        .css('background-color', colors[pokemonTypeA])
        .html(pokemonTypeA)


    if (data.type.length > 1) {
        $('.defense_typeA-' + slot)
            .removeAttr('colspan')
            .removeClass('defense_one_type_style-' + slot)
            .addClass('defense_typeA_style-' + slot);
        $('.defense_type_row-' + slot).append("<td class='defense_typeB-" + slot + "'>&nbsp;</td>");
        $('.defense_typeB-' + slot)
            .addClass('defense_typeB_style-' + slot)
            .css('background-color', colors[data.type[1]])
            .html(data.type[1]);
    }

    $('#atk-' + slot).html(data.stats.atk)
    $('#def-' + slot).html(data.stats.def)
    $('#sta-' + slot).html(data.stats.sta)

    if (data.is_shadow) {
        $("[data-shadow=\"" + slot + "\"]").html("<input type=\"checkbox\"> Shadow</input>");
    }

    imageSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.imgurl + ".png";
    $('#pokemon_img-' + slot).attr('src', imageSrc)

    $.each(data.defense_data.resistant_to, function (index,value){
        $('.resistant_to-' + slot).append("<span class='badge' style='font-size: 100%; font-weight: normal;'>" + index + " | " + value + "</span><br>")
    });

    $.each(data.defense_data.vulnerable_to, function (index,value){
        $('.vulnerable_to-' + slot).append("<span class='badge' style='font-size: 100%; font-weight: normal;'>" + index + " | " + value + "</span><br>")
    });

    $.each(data.moveset.quick, function (index,value){
        cleanName = value.replaceAll('*', '');

        let finalDpt = quickMoveDB[cleanName].dpt;
        let bold = "";
        if (data.type.includes(quickMoveDB[cleanName].type)) {
            finalDpt = (quickMoveDB[cleanName].dpt * 1.2).toFixed(2);
            bold = "style=\"font-weight: bold;\"";
        }

        var formattedMoveName = "EPT " + quickMoveDB[cleanName].ept + "/DPT " + finalDpt + "/T " + quickMoveDB[cleanName].turns;
        $('#quick_move-' + slot).append("<option " + bold + " id='" + cleanName + "'>" + value + " (" + formattedMoveName + ")</option>")
    });

    $.each(data.moveset.charge, function (index,value){
        cleanName = value.replaceAll('*', '');

        let finalDpe = chargeMoveDB[cleanName].dpe;
        let bold = "";
        if (data.type.includes(chargeMoveDB[cleanName].type)) {
            finalDpe = (chargeMoveDB[cleanName].dpe * 1.2).toFixed(2);
            bold = "style=\"font-weight: bold;\"";
        }

        let qtf = 0;

        var formattedMoveName = "ENG " + chargeMoveDB[cleanName].energy + "/DPE " + finalDpe + "/QTF " + qtf;
        $('#charge1_move-' + slot).append("<option " + bold + " id='" + cleanName + "'>" + value + " (" + formattedMoveName + ")</option>")
        $('#charge2_move-' + slot).append("<option " + bold + " id='" + cleanName + "'>" + value + " (" + formattedMoveName + ")</option>")
    });

    $("#pokemonList_" + slot + "_alternatives").html("");
    $("#pokemonList_" + slot + "_alternatives").append("<option>-- Alternatives to this type --</option>")

    let thisPokemonType = structuredClone(data.type);
    for (var key in pokeDB) {
        let candidateType = structuredClone(pokeDB[key].type)
        if (JSON.stringify(candidateType.sort()) === JSON.stringify(thisPokemonType.sort())) {
            let alternativeName = pokeDB[key].id + " - " + pokeDB[key].name
            $("#pokemonList_" + slot + "_alternatives").append("<option>" + alternativeName + "</option>")
        }
    }

    standardHeights();

    updateCtv();
}

function getMoveData(move, type, target)
{
    move = move.replaceAll('*', '');
    move = move.split(" (")[0];

    if (type === 'quick') {
        data = quickMoveDB[move];

        let poke = $('#pokemonList_' + target).val();
        poke = poke.split(" - ")[1];

        let qtf = 0;
        $('#charge1_move-' + target + " option").each(function(index) {
            if ($(this).val() != '-- Charge I --') {
                let optionText = $(this).val();
                let moveName = optionText.split(" (")[0];
                let cleanMoveName = moveName.replaceAll('*', '');
                //let moveData = optionText.split(" (")[1].replace(")", "");

                qtf = Math.ceil(Math.abs(chargeMoveDB[cleanMoveName].energy)/data.energy);
                let newLabel = moveName + " (ENG " + chargeMoveDB[cleanMoveName].energy + "/DPE " + chargeMoveDB[cleanMoveName].dpe + "/QTF " + qtf + ")";

                $(this).text(newLabel);
            };
        });

        $('#charge2_move-' + target + " option").each(function(index) {
            if ($(this).val() != '-- Charge II --') {
                let optionText = $(this).val();
                let moveName = optionText.split(" (")[0];
                let cleanMoveName = moveName.replaceAll('*', '');
                //let moveData = optionText.split(" (")[1].replace(")", "");

                qtf = Math.ceil(Math.abs(chargeMoveDB[cleanMoveName].energy)/data.energy);
                let newLabel = moveName + " (ENG " + chargeMoveDB[cleanMoveName].energy + "/DPE " + chargeMoveDB[cleanMoveName].dpe + "/QTF " + qtf + ")";

                $(this).text(newLabel);
            };
        });
        
    }

    var buffs = '';
    if (type === 'charge1' || type === 'charge2') {
        data = chargeMoveDB[move];
        if (data.buffs) {
            $('#' + type + '_moveBuff-' + target)
                .html("");
            buffs = formatBuff(data.buffs)
        }
    }
    
    if (data == undefined) {
    	return;
    }

    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + data.type.toUpperCase() + '.png';

    $('#' + type + '_move_type-' + target).html("<img src='" + imgSrc + "' height='40px'/>");
    $('#' + type + '_move_type-' + target).css('display', 'block');

    $('#' + type + '_goodAgainst-' + target).html('');
    $('#' + type + '_goodAgainst-' + target).css('display', 'block');
    $('#' + type + '_weakAgainst-' + target).html('');
    $('#' + type + '_weakAgainst-' + target).css('display', 'block');


	$('#' + type + '_goodAgainst-' + target).append("<small style='float: left; margin-left: 0.5em; margin-top: 3px; margin-right: 1em; height: 27px;'>Good Against:</small>");
    $.each(data.goodAgainst, function (index,value){
        let imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + value.toUpperCase() + '.png';
        $('#' + type + '_goodAgainst-' + target).append("<img src='" + imgSrc + "' height='25px' width='25px' />");

        if (index != data.goodAgainst.length - 1) {
            $('#' + type + '_goodAgainst-' + target).append(" ");
        }
    });

    $('#' + type + '_weakAgainst-' + target).append("<small style='float: left; margin-left: 0.5em; margin-top: 3px; margin-right: 1em;'>Weak Against:</small>");
    $.each(data.weakAgainst, function (index,value){
        let imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + value.toUpperCase() + '.png';
        $('#' + type + '_weakAgainst-' + target).append("<img src='" + imgSrc + "' height='25px' width='25px'/>");

        if (index != data.weakAgainst.length - 1) {
            $('#' + type + '_weakAgainst-' + target).append(" ");
        }
    });

	$('#' + type + '_moveBuff-' + target).append(buffs);
    standardHeights();
}

function updateCtv()
{
    let slot1Option = ($("#pokemonList_slot1").val() !== "-- Pick an option --") ? $("#pokemonList_slot1").val().split(" - ")[1] : false;
    let slot2Option = ($("#pokemonList_slot2").val() !== "-- Pick an option --") ? $("#pokemonList_slot2").val().split(" - ")[1] : false;
    let slot3Option = ($("#pokemonList_slot3").val() !== "-- Pick an option --") ? $("#pokemonList_slot3").val().split(" - ")[1] : false;

    let slot1V = []
    if (slot1Option) {
        slot1V = Object.keys(pokeDB[slot1Option].defense_data.vulnerable_to)
    }

    let slot2V = []
    if (slot2Option) {
        slot2V = Object.keys(pokeDB[slot2Option].defense_data.vulnerable_to)
    }

    let slot3V = []
    if (slot3Option) {
        slot3V = Object.keys(pokeDB[slot3Option].defense_data.vulnerable_to)
    }

    let ctv = [];

    $('.vulnerable_to-slot1 span').each(function() {
        let type = $(this)[0].innerHTML.split(" | ")[0];
        if (slot2V.includes(type) && !ctv.includes(type)) {
            ctv.push(type);
        }
        if (slot3V.includes(type) && !ctv.includes(type)) {
            ctv.push(type);
        }
    })
    
    $('.vulnerable_to-slot2 span').each(function() {
        let type = $(this)[0].innerHTML.split(" | ")[0];
        if (slot1V.includes(type) && !ctv.includes(type)) {
            ctv.push(type);
        }
        if (slot3V.includes(type) && !ctv.includes(type)) {
            ctv.push(type);
        }
    })

    $('.vulnerable_to-slot3 span').each(function() {
        let type = $(this)[0].innerHTML.split(" | ")[0];
        if (slot1V.includes(type) && !ctv.includes(type)) {
            ctv.push(type);
        }
        if (slot2V.includes(type) && !ctv.includes(type)) {
            ctv.push(type);
        }
    })

    $('.vulnerable_to-slot1 span').each(function() {
        let type = $(this)[0].innerHTML.split(" | ")[0];
        if (ctv.includes(type)) {
            $(this)[0].classList.add('badge-danger')
        } else {
            $(this)[0].classList.remove('badge-danger')
        }
    })

    $('.vulnerable_to-slot2 span').each(function() {
        let type = $(this)[0].innerHTML.split(" | ")[0];
        if (ctv.includes(type)) {
            $(this)[0].classList.add('badge-danger')
        } else {
            $(this)[0].classList.remove('badge-danger')
        }
    })

    $('.vulnerable_to-slot3 span').each(function() {
        let type = $(this)[0].innerHTML.split(" | ")[0];
        if (ctv.includes(type)) {
            $(this)[0].classList.add('badge-danger')
        } else {
            $(this)[0].classList.remove('badge-danger')
        }
    })
}