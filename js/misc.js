function clearLayout(slot) {
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
        .html("").css('display', 'none');
    $('#charge1_move_type-' + slot)
        .html("").css('display', 'none');
    $('#charge2_move_type-' + slot)
        .html("").css('display', 'none');
}

function getMoveInitials(name) {
	name = name.toLowerCase().split(" ")
	return (name.length > 1) ? name[0].substring(0,2) + name[1].substring(0,2) : name[0][0]
}

function disableMove(value, target) {
    $('#' + target + " option").each(function(){
        if ($(this).val() == value) {
            $(this).attr('disabled', 'disabled')
        } else {
            $(this).removeAttr('disabled')
        }
    });
}
