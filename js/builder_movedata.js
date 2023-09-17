function getMoveData(move, type, target)
{
    move = move.replaceAll('*', '');

    if (type === 'quick') {
        move = move.split(" (")[0];
        data = quickMoveDB[move];
    }

    var buffs = '';
    if (type === 'charge1' || type === 'charge2') {
        move = move.split(" (")[0];
        data = chargeMoveDB[move];
        if (data.buffs) {
            $('#' + type + '_moveBuff-' + target)
                .html("");
            buffs = formatBuff(data.buffs)
        }
    }
    
    if (data == undefined) {
    	return;
    }

    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + data.type.toUpperCase() + '.png';

    $('#' + type + '_move_type-' + target).html("<img src='" + imgSrc + "' height='25px' width='25px'/>");
    $('#' + type + '_move_type-' + target).css('display', 'revert');

    $('#' + type + '_goodAgainst-' + target).html('');
    $('#' + type + '_goodAgainst-' + target).css('display', 'block');
    $('#' + type + '_weakAgainst-' + target).html('');
    $('#' + type + '_weakAgainst-' + target).css('display', 'block');


	$('#' + type + '_goodAgainst-' + target).append('&nbsp;');
    $.each(data.goodAgainst, function (index,value){
        $('#' + type + '_goodAgainst-' + target).append(value);

        if (index != data.goodAgainst.length - 1) {
            $('#' + type + '_goodAgainst-' + target).append(" | ");
        }
    });

	$('#' + type + '_weakAgainst-' + target).append('&nbsp;');
    $.each(data.weakAgainst, function (index,value){
        $('#' + type + '_weakAgainst-' + target).append(value);

        if (index != data.weakAgainst.length - 1) {
            $('#' + type + '_weakAgainst-' + target).append(" | ");
        }
    });

	$('#' + type + '_moveBuff-' + target).append(buffs);
}
