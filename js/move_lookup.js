function filterPokemonByMove(move, pokemons, wholeDatabase)
{
    if (move in quickMoveDB) {
        type = "quick"
    }
    if (move in chargeMoveDB) {
        type = "charge"
    }

    $("#pokemondb-movedata-tbody").html("");

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

    var moveGoodAgainst = ''
    var moveWeakAgainst = ''
    var moveColorType = ''
    var moveType = '';

    var embeddedString = type + 'MoveDB'
    var embedded = {embeddedString}[move]
    console.log(embedded)

    if (type == 'quick') {
        moveColorType = colors[quickMoveDB[move].type]
        moveType = quickMoveDB[move].type
        $.each(quickMoveDB[move].goodAgainst, function (k,v) {
            moveGoodAgainst += "<span class='badge' style='width: 5em; background-color: " + colors[v] + "; color: white;'>" + v + "</span> "
        });

        $.each(quickMoveDB[move].weakAgainst, function (k,v) {
            moveWeakAgainst += "<span class='badge' style='width: 5em; background-color: " + colors[v] + "; color: white;'>" + v + "</span> "
        });
    } else {
        moveColorType = colors[chargeMoveDB[move].type]
        moveType = chargeMoveDB[move].type
        $.each(chargeMoveDB[move].goodAgainst, function (k,v) {
            moveGoodAgainst += "<span class='badge' style='width: 5em; background-color: " + colors[v] + "; color: white;'>" + v + "</span> "
        });

        $.each(chargeMoveDB[move].weakAgainst, function (k,v) {
            moveWeakAgainst += "<span class='badge' style='width: 5em; background-color: " + colors[v] + "; color: white;'>" + v + "</span> "
        });
    }

    var moveTextToAppend = 
    "<tr><td><b>Type</b></td><td>" + "<span class='badge' style='width: 5em; background-color: " + moveColorType + "; color: white;'>" + moveType + "</span> " + "</td></tr>" + 
    "<tr><td><b>Good against</b></td><td>" + moveGoodAgainst + "</td></tr>" +
    "<tr><td><b>Weak against</b></td><td>" + moveWeakAgainst + "</td></tr>";

    if (type == 'quick') {
        moveTextToAppend += 
            "<tr><td><b>EPT</b></td><td>" + quickMoveDB[move].ept + "</td></tr>" + 
            "<tr><td><b>DPT</b></td><td>" + quickMoveDB[move].dpt + "</td></tr>"
            ;
    } else {
        moveTextToAppend += 
            "<tr><td><b>Energy</b></td><td>" + chargeMoveDB[move].energy + "</td></tr>" + 
            "<tr><td><b>Power</b></td><td>" + chargeMoveDB[move].power + "</td></tr>" + 
            "<tr><td><b>DPE</b></td><td>" + chargeMoveDB[move].dpe + "</td></tr>"
            ;
        if (chargeMoveDB[move].buffs) {
            var buffs = chargeMoveDB[move].buffs

            var activationChance = buffs.activationChance * 100 + "% chance of ";
            var buffFullEffectDescription = '';
            var buffEffectDescription = '';

            $.each(buffs.effects, function(k, effect) {
                var changeDirection = (effect > 0) ? "increase" : "decrease";
                if (k.includes('attackerAttack')) {
                    buffEffectDescription = " self ATK by "
                }
                if (k.includes('attackerDefense')) {
                    buffEffectDescription = " self DEF by "
                }
                if (k.includes('targetAttack')) {
                    buffEffectDescription = " rival's ATK by "
                }
                if (k.includes('targetDefense')) {
                    buffEffectDescription = " rival's DEF by "
                }
                buffEffectDescription += Math.abs(effect)  + " stage(s)"
                buffFullEffectDescription += activationChance + " " + changeDirection + " " + buffEffectDescription +"<br>"// + " " + effect + "<br>"
            });
            moveTextToAppend += "<tr><td colspan=2>" + buffFullEffectDescription + "</td></tr>"
        }
    }

	$("#pokemondb-movedata-tbody").append(moveTextToAppend);
	$("#pokemondb-tbody").append(textToAppend);
}
