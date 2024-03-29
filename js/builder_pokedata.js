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
        $(".shadow_" + slot).css('display', 'inline')
    }

    imageSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.imgurl + ".png";
    $('#pokemon_img-' + slot).attr('src', imageSrc)

    $.each(data.defense_data.resistant_to, function (index,value){
        $('.resistant_to-' + slot).append(index + " | " + value + "<br>")
    });

    $.each(data.defense_data.vulnerable_to, function (index,value){
        $('.vulnerable_to-' + slot).append(index + " | " + value + "<br>")
    });

    $.each(data.moveset.quick, function (index,value){
        cleanName = value.replaceAll('*', '');
        var formattedMoveName = "EPT " + quickMoveDB[cleanName].ept + "/DPT " + quickMoveDB[cleanName].dpt;

        $('#quick_move-' + slot).append("<option>" + value + " (" + formattedMoveName + ")</option>")
    });

    $.each(data.moveset.charge, function (index,value){
        cleanName = value.replaceAll('*', '');
        var formattedMoveName = "ENG " + chargeMoveDB[cleanName].energy + "/DPE " + chargeMoveDB[cleanName].dpe;

        $('#charge1_move-' + slot).append("<option>" + value + " (" + formattedMoveName + ")</option>")
        $('#charge2_move-' + slot).append("<option>" + value + " (" + formattedMoveName + ")</option>")
    });
    
    return data;
}
