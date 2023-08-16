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
        pkmMoves = []

        $.each(pokeDB[pkm].moveset[type], function (id, move) {
            pkmMove = move.replaceAll('*', '');
            pkmMoves.push(pkmMove)
        });

        if (jQuery.inArray(move, pkmMoves) > -1)
        {
            var imageSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeDB[pkm].imgurl + ".png";

            var pkmImage = "<br><img class='' id='pokemon_img-slot1' src='"+imageSrc+"' style='margin: 0 auto;' alt='&nbsp;'></img>"

            if (type == "quick") {
                var isStab = jQuery.inArray(quickMoveDB[move].type, pokeDB[pkm].type) > -1 ? "style='font-weight: bold;'" : "";
            } else {
                var isStab = jQuery.inArray(chargeMoveDB[move].type, pokeDB[pkm].type) > -1 ? "style='font-weight: bold;'" : "";
            }

            pkmType = '';

            $.each(pokeDB[pkm].type, function (k,v) {
                width = 15 / pokeDB[pkm].type.length
                color = colors[v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()]
                pkmType += "<span class='badge' style='width: " + width + "em; background-color: " + color + "; color: white;'>" + v + "</span>"
            });

            textToAppend += 
                "<tr>"+
                    "<td " + isStab + ">" +
                    pkm +
                    "<br/>" + pkmType +
                    "<Br/>" + pkmImage +
                    "<br/>" +
                    "<span class='badge badge-danger full-pill' style='width: 5em;'>" + pokeDB[pkm].stats.atk + "</span>" + 
                    "<span class='badge badge-success full-pill' style='width: 5em;'>" + pokeDB[pkm].stats.def + "</span>" + 
                    "<span class='badge  badge-primary full-pill' style='width: 5em;'>" + pokeDB[pkm].stats.sta + "</span>" + 
                    "</td>" +
                "</tr>";
        }
    });

	$("#pokemondb-tbody").append(textToAppend);
}
