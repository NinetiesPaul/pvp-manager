function clearLayout(slot)
{
    $('.resistant_to-' + slot).html('');
    $('.vulnerable_to-' + slot).html('');
    $('.defense_type_row-' + slot).html("<td class='defense_typeA-" + slot + "'>&nbsp;</td>");

    $('#quick_move-' + slot).html("<option>-- Quick --</option>");
    $('#charge1_move-' + slot).html("<option>-- Charge I --</option>");
    $('#charge2_move-' + slot).html("<option>-- Charge II --</option>");

    $('#quick_goodAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#quick_weakAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#quick_move_type-' + slot)
        .html("")
        .css('display', 'none');

    $('#charge1_goodAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge1_weakAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge1_move_type-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge1_moveBuff-' + slot)
        .html("");

    $('#charge2_goodAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge2_weakAgainst-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge2_move_type-' + slot)
        .html("")
        .css('display', 'none');
    $('#charge2_moveBuff-' + slot)
        .html("");

    $("[data-shadow=\"" + slot + "\"]").html("&nbsp;");
}

function disableMove(value, target)
{
    $('#' + target + " option").each(function(){
        if ($(this).val() == value) {
            $(this).attr('disabled', 'disabled')
        } else {
            $(this).removeAttr('disabled')
        }
    });
}

function formatBuff(buffs) {
    if (buffs == "") {
        return "";
    }
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
        buffFullEffectDescription += activationChance + " " + changeDirection + " " + buffEffectDescription + "<br>"
    });

    return buffFullEffectDescription
}

function standardHeights()
{
    cardSlot1 = $('#cardSlot1').outerHeight();
    cardSlot2 = $('#cardSlot2').outerHeight();
    cardSlot3 = $('#cardSlot3').outerHeight();

    highest = Math.max(cardSlot1, cardSlot2, cardSlot3)

    $('#cardSlot1').css("min-height", highest);
    $('#cardSlot2').css("min-height", highest);
    $('#cardSlot3').css("min-height", highest);
}

function formatOptionDetails(move, poke, moveType)
{
    cleanName = move.replaceAll('*', '');

    let moveDetails = "";
    let finalDpt = 0;
    let bold = false;
    let moveTypeIcon = "";

    if (moveType === 'quick') {
        if (pokeDB[poke].type.includes(quickMoveDB[cleanName].type)) {
            finalDpt = (quickMoveDB[cleanName].dpt * 1.2).toFixed(2);
            bold = true;
        }
        moveTypeIcon = quickMoveDB[cleanName].type.toUpperCase();
        moveDetails = "EPT " + quickMoveDB[cleanName].ept + "/DPT " + finalDpt + "/T " + quickMoveDB[cleanName].turns;
    } else {
        if (pokeDB[poke].type.includes(chargeMoveDB[cleanName].type)) {
            finalDpt = (chargeMoveDB[cleanName].dpt * 1.2).toFixed(2);
            bold = true;
        }

        moveTypeIcon = chargeMoveDB[cleanName].type.toUpperCase();
        let qtf = 0;
        moveDetails = "ENG " + chargeMoveDB[cleanName].energy + "/DPE " + chargeMoveDB[cleanName].dpe + "/QTF " + qtf;
    }
    
    let optionLabel = (bold) ?
        "<p style='border-bottom: 1px solid rgba(255, 255, 255, 0.4);'><b>" + move + "</b></p><i><small>" + moveDetails + "</small></i>" :
        "<p style='border-bottom: 1px solid rgba(255, 255, 255, 0.4);'>" + move + "</p><i><small>" + moveDetails + "</small></i>";
    let optionType = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + moveTypeIcon + '.png';

    return [optionLabel, optionType];
}

function formatOptionEffectiveness(move, moveType)
{
    cleanName = move.replaceAll('*', '');

    let defaultOptionGoodAgainst = "";
    let defaultOptionWeakAgainst = "";

    if (moveType === 'quick') {
        $.each(quickMoveDB[cleanName].goodAgainst, function (gIndex,gValue){
            if (defaultOptionGoodAgainst.indexOf(gValue) === -1) {
                defaultOptionGoodAgainst += "<img src='https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_" + gValue.toUpperCase() + ".png' height=\"25px\" width=\"25px\">";
            }
        });

        $.each(quickMoveDB[cleanName].weakAgainst, function (wIndex,wValue){
            if (defaultOptionWeakAgainst.indexOf(wValue) === -1) {
                defaultOptionWeakAgainst += "<img src='https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_" + wValue.toUpperCase() + ".png' height=\"25px\" width=\"25px\">";
            }
        });
    } else {
        $.each(chargeMoveDB[cleanName].goodAgainst, function (gIndex,gValue){
            if (defaultOptionGoodAgainst.indexOf(gValue) === -1) {
                defaultOptionGoodAgainst += "<img src='https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_" + gValue.toUpperCase() + ".png' height=\"25px\" width=\"25px\">";
            }
        });

        $.each(chargeMoveDB[cleanName].weakAgainst, function (wIndex,wValue){
            if (defaultOptionWeakAgainst.indexOf(wValue) === -1) {
                defaultOptionWeakAgainst += "<img src='https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_" + wValue.toUpperCase() + ".png' height=\"25px\" width=\"25px\">";
            }
        });
    }

    return [defaultOptionGoodAgainst, defaultOptionWeakAgainst];
}