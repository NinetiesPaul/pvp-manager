function filterPokemonByMove(move, pokemons, wholeDatabase)
{
    if (move in quickMoveDB) {
        type = "quick"
    }
    if (move in chargeMoveDB) {
        type = "charge"
    }

	$(".pokemondb-table tbody").html("");

    var pokemons = (wholeDatabase) ? Object.keys(pokeDB) : pokemons.split(",")

    var textToAppend = "";

    $.each(pokemons, function (id, pkm) {
        if (jQuery.inArray(move, pokeDB[pkm].moveset[type]) > -1)
        {
            var imageSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeDB[pkm].imgurl + ".png";

            var pkmImage = "<br><img class='' id='pokemon_img-slot1' src='"+imageSrc+"' style='margin: 0 auto;' alt='&nbsp;'></img>"

            if (type == "quick") {
                var isStab = jQuery.inArray(quickMoveDB[move].type, pokeDB[pkm].type) > -1 ? "style='font-weight: bold;'" : "";
            } else {
                var isStab = jQuery.inArray(chargeMoveDB[move].type, pokeDB[pkm].type) > -1 ? "style='font-weight: bold;'" : "";
            }

            textToAppend += 
                "<tr>"+
                    "<th></th>"+
                    "<td " + isStab + ">"+pkm+"<Br/>"+pkmImage+"</td>"+
                "</tr>";
        }
    });

	$("#pokemondb-tbody").append(textToAppend);
}
