function filterPokemonByMoveName(moveName, pokemons, wholeDatabase)
{
    var move = {}

    if (moveName in quickMoveDB) {
        type = "quick"
        move = quickMoveDB[moveName]
    }
    if (moveName in chargeMoveDB) {
        type = "charge"
        move = chargeMoveDB[moveName]
    }

    $("#pokemondb-movedata-tbody").html("");

	$(".pokemondb-table tbody").html("");

    var pokemons = (wholeDatabase) ? Object.keys(pokeDB) : pokemons.split(",")

    var textToAppend = "";

    $.each(pokemons, function (id, pkm) {
        allMoves = []

        $.each(pokeDB[pkm].moveset[type], function (id, pkmMove) {
            sanitizedMove = pkmMove.replaceAll('*', '');
            allMoves.push(sanitizedMove)
        });

        if (jQuery.inArray(moveName, allMoves) > -1)
        {
            var imageSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeDB[pkm].imgurl + ".png";
            var pkmImage = "<br><img class='' id='pokemon_img-slot1' src='" + imageSrc + "' style='margin: 0 auto;' alt='&nbsp;'></img>"
            var isStab = jQuery.inArray(move.type, pokeDB[pkm].type) > -1 ? "style='font-weight: bold;'" : "";
            var pkmType = '';

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

    var moveGoodAgainst = ''
    var moveWeakAgainst = ''
    var moveColorType = ''
    var moveType = '';

    moveColorType = colors[move.type]
    moveType = move.type
    $.each(move.goodAgainst, function (k,v) {
        moveGoodAgainst += "<span class='badge' style='width: 5em; background-color: " + colors[v] + "; color: white;'>" + v + "</span> "
    });

    $.each(move.weakAgainst, function (k,v) {
        moveWeakAgainst += "<span class='badge' style='width: 5em; background-color: " + colors[v] + "; color: white;'>" + v + "</span> "
    });

    var moveTextToAppend = 
    "<tr><td><b>Type</b></td><td>" + "<span class='badge' style='width: 5em; background-color: " + moveColorType + "; color: white;'>" + moveType + "</span> " + "</td></tr>" + 
    "<tr><td><b>Good against</b></td><td>" + moveGoodAgainst + "</td></tr>" +
    "<tr><td><b>Weak against</b></td><td>" + moveWeakAgainst + "</td></tr>";

    if (type == 'quick') {
        moveTextToAppend += 
            "<tr><td><b>EPT</b></td><td>" + move.ept + "</td></tr>" + 
            "<tr><td><b>DPT</b></td><td>" + move.dpt + "</td></tr>"
            ;
    } else {
        moveTextToAppend += 
            "<tr><td><b>Energy</b></td><td>" + move.energy + "</td></tr>" + 
            "<tr><td><b>Power</b></td><td>" + move.power + "</td></tr>" + 
            "<tr><td><b>DPE</b></td><td>" + move.dpe + "</td></tr>"
            ;

        if (move.buffs) {
            buffFullEffectDescription = formatBuff(move.buffs)
            moveTextToAppend += "<tr><td><b>Buff</b></td><td>" + buffFullEffectDescription + "</td></tr>"
        }
    }

	$("#pokemondb-movedata-tbody").append(moveTextToAppend);
	$("#pokemondb-tbody").append(textToAppend);
}

function filterPokemonByMoveType(type, pokemons, wholeDatabase)
{
    $("#pokemondb-movedata-tbody").html("");

	$(".pokemondb-table tbody").html("");

    var pokemons = (wholeDatabase) ? Object.keys(pokeDB) : pokemons.split(",")

    var textToAppend = "";

    $.each(pokemons, function (id, pkm) {

        var skip = true;
        pokeDB[pkm].moveset.quick.filter(function(move) {
            sanitizedMove = move.replaceAll('*', '');
            if (skip && quickMoveDB[sanitizedMove].type === type){
                skip = false;
            }
        });

        if (skip) {
            return true;
        }

        var imageSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeDB[pkm].imgurl + ".png";
        var pkmImage = "<br><img class='' id='pokemon_img-slot1' src='" + imageSrc + "' style='margin: 0 auto;' alt='&nbsp;'></img>"
        var pkmType = '';

        $.each(pokeDB[pkm].type, function (k,v) {
            width = 15 / pokeDB[pkm].type.length
            color = colors[v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()]
            pkmType += "<span class='badge' style='width: " + width + "em; background-color: " + color + "; color: white;'>" + v + "</span>"
        });

        textToAppend += 
            "<tr>"+
                "<td>" +
                pkm +
                "<br/>" + pkmType +
                "<Br/>" + pkmImage +
                "<br/>" +
                "<span class='badge badge-danger full-pill' style='width: 5em;'>" + pokeDB[pkm].stats.atk + "</span>" + 
                "<span class='badge badge-success full-pill' style='width: 5em;'>" + pokeDB[pkm].stats.def + "</span>" + 
                "<span class='badge  badge-primary full-pill' style='width: 5em;'>" + pokeDB[pkm].stats.sta + "</span>" + 
                "</td>" +
            "</tr>";
        
    });

	$("#pokemondb-tbody").append(textToAppend);
}
