function clearLayout(slot) {
    $('.resistant_to-' + slot).html('');
    $('.vulnerable_to-' + slot).html('');
    $('.defense_type_row-' + slot).html("<td class='defense_typeA-" + slot + "'>&nbsp;</td>");
    $('#quick_move-' + slot).html("<option>-- Quick  --</option>");
    $('#charge1_move-' + slot).html("<option>-- Charge I  --</option>");
    $('#charge2_move-' + slot).html("<option>-- Charge II  --</option>");
    $('#quick_goodAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#quick_weakAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge1_goodAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge1_weakAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge2_goodAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge2_weakAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#quick_move_type-' + slot)
        .html("");
    $('#charge1_move_type-' + slot)
        .html("");
    $('#charge2_move_type-' + slot)
        .html("");
}

function getPokemonData(pokemon, slot) {

    slot = slot.split("_");
    slot = slot[1];
    clearLayout(slot);

    data = pokeDB[pokemon]

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
    $('#atk-' + slot).html(data.name.indexOf('Shadow') >= 0 ? Math.round(data.stats.atk * 1.2) : data.stats.atk)
    $('#def-' + slot).html(data.name.indexOf('Shadow') >= 0 ? Math.round(data.stats.def * 0.833) : data.stats.def)
    $('#sta-' + slot).html(data.stats.sta)

    imageSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.imgurl + ".png";
    $('#pokemon_img-' + slot).attr('src', imageSrc)

    $.each(data.defense_data.resistant_to, function (index,value){
        $('.resistant_to-' + slot).append(index + " | " + value + "<br>")
    });
    $.each(data.defense_data.vulnerable_to, function (index,value){
        $('.vulnerable_to-' + slot).append(index + " | " + value + "<br>")
    });
    $.each(data.moveset.quick, function (index,value){
        $('#quick_move-' + slot).append("<option>" + value + "</option>")
    });
    $.each(data.moveset.charge, function (index,value){
        $('#charge1_move-' + slot).append("<option>" + value + "</option>")
        $('#charge2_move-' + slot).append("<option>" + value + "</option>")
    });
}
