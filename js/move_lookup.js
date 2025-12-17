function filterPokemonByMoveName(moveName)
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

    var pokemons = null;
    pokemons = $(".pkm-list-db").val().split(",");
    pokemons = pokemons.map((pokemon) => { return pokemon.trim() });

    if (pokemons[0] == "") {
        console.log("Using whole database")
        pokemons = Object.keys(pokeDB);
    }

    var textToAppend = "";

    $.each(pokemons, function (id, pkm) {
        allMoves = []

        pkm = pkm.trim()
                $.each(pokeDB[pkm].moveset[type], function (id, pkmMove) {
            sanitizedMove = pkmMove.replaceAll('*', '');
            allMoves.push(sanitizedMove)
        });

        if (jQuery.inArray(moveName, allMoves) > -1)
        {
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
                    "<br/>" + pkmImage +
                    "<br/>" +
                    "<span class='badge badge-pill badge-danger' style='width: 7em;'><span style='color: black'>Atk</span> " + pokeDB[pkm].stats.atk + "</span> " + 
                    "<span class='badge badge-pill badge-success' style='width: 7em;'><span style='color: black'>Atk</span> " + pokeDB[pkm].stats.def + "</span> " + 
                    "<span class='badge badge-pill badge-primary' style='width: 7em;'><span style='color: black'>Atk</span> " + pokeDB[pkm].stats.sta + "</span>" + 
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
            "<tr><td><b>DPT</b></td><td>" + move.dpt + "</td></tr>" + 
            "<tr><td><b>Turns</b></td><td>" + move.turns + "</td></tr>"
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

function filterPokemonByMoveType(type)
{
    $("#pokemondb-movedata-tbody").html("");

	$(".pokemondb-table tbody").html("");

    var pokemons = null;
    pokemons = $(".pkm-list-db").val().split(",");
    pokemons = pokemons.map((pokemon) => { return pokemon.trim() });

    if (pokemons[0] == "") {
        console.log("Using whole database")
        pokemons = Object.keys(pokeDB);
    }

    var textToAppend = "";

    $.each(pokemons, function (id, pkm) {

        var skip = true;
        pkm = pkm.trim();

        var matchedMoves = "";
        var pokemonMoves = structuredClone(pokeDB[pkm].moveset.quick.concat(pokeDB[pkm].moveset.charge));
        pokemonMoves.filter(function(move) {
            sanitizedMove = move.replaceAll('*', '');
            if (sanitizedMove !== "Transform") {
                if (Object.keys(quickMoveDB).includes(sanitizedMove) && quickMoveDB[sanitizedMove].type === type ||
                    Object.keys(chargeMoveDB).includes(sanitizedMove) && chargeMoveDB[sanitizedMove].type === type) {
                    skip = false;
                    moveType = (Object.keys(quickMoveDB).includes(sanitizedMove)) ? quickMoveDB[sanitizedMove].type : chargeMoveDB[sanitizedMove].type;
                    isStab = (pokeDB[pkm].type).includes(moveType) ? "<b>" + move + "</b>" : move;
                    matchedMoves += (Object.keys(quickMoveDB).includes(sanitizedMove)) ? "Quick attack " + isStab : "Charge attack " + isStab;
                    matchedMoves += "<br/>";
                }
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
                "<td ><span style='float: right;'>" +
                pkm +
                "<br/>" + pkmType +
                "<br/>" + pkmImage +
                "<br/>" +
                "<span class='badge badge-pill badge-danger' style='width: 7em;'><span style='color: black'>Atk</span> " + pokeDB[pkm].stats.atk + "</span> " + 
                "<span class='badge badge-pill badge-success' style='width: 7em;'><span style='color: black'>Def</span> " + pokeDB[pkm].stats.def + "</span> " + 
                "<span class='badge badge-pill badge-primary' style='width: 7em;'><span style='color: black'>Sta</span> " + pokeDB[pkm].stats.sta + "</span>" + 
                "</span></td>" +
                "<td style='float: left; text-align: left;'>" + matchedMoves + "</td>" +
            "</tr>";
        
    });

	$("#pokemondb-tbody").append(textToAppend);
}
