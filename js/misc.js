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
