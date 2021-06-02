function disableMove(value, target) {
    $('#' + target + " option").each(function(){
        if ($(this).val() == value) {
            $(this).attr('disabled', 'disabled')
        } else {
            $(this).removeAttr('disabled')
        }
    });
}

function getMoveData(move, type, target) {
    move = move.replaceAll('*', '');

    if (type === 'quick') {
        data = quickMoveDB[move];
    }

    if (type === 'charge1' || type === 'charge2') {
        data = chargeMoveDB[move];
    }

    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + data.type + '.png';
    $('#' + type + '_move_type-' + target).html("<img src='" + imgSrc + "' height='25px' width='25px'/>");

    $('#' + type + '_goodAgainst-' + target).html('');
    $('#' + type + '_goodAgainst-' + target).css('display', 'revert');
    $('#' + type + '_weakAgainst-' + target).html('');
    $('#' + type + '_weakAgainst-' + target).css('display', 'revert');

    $.each(data.goodAgainst, function (index,value){

        $('#' + type + '_goodAgainst-' + target).append(value);

        if (index != data.goodAgainst.length - 1) {
            $('#' + type + '_goodAgainst-' + target).append(" | ");
        }
    });

    $.each(data.weakAgainst, function (index,value){
        $('#' + type + '_weakAgainst-' + target).append(value);

        if (index != data.weakAgainst.length - 1) {
            $('#' + type + '_weakAgainst-' + target).append(" | ");
        }
    });
}
