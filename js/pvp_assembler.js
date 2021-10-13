$(document).on('click', '.pkm-list-btn', function() {
	$(".teamassembler-table tbody").html("");
	$(".pkm-list-btn").attr("disabled", true)

	var pkms = $(".pkm-list").val();
	pkms = pkms.split(',');

	var teams = [];

	$.each(pkms, function(k1,v1){
		$.each(pkms, function(k2,v2){
			$.each(pkms, function(k3,v3){
				if (v1 != v2 && v2 != v3 && v1 != v3){
					team = [v1,v2,v3];
					team.sort();
					team = team.join(',');
					teams.push(team);
				}
			});
		});
	});

	teams = [...new Set(teams)];

	var textToAppend = '';

	$.each(teams, function(mk,v) {
		pkms = v.split(",");
		var slot1 = pkms[0],
			slot2 = pkms[1],
			slot3 = pkms[2],
			resistances = 0,vulnerabilities = 0, itVulnerability = false, combinedVulnerabilites = [];
		$.each(pkms, function(k,v) {
			resistances += Object.keys(pokeDB[v].defense_data.resistant_to).length;
			vulnerabilities += Object.keys(pokeDB[v].defense_data.vulnerable_to).length;
			vulnerableToTypes = $.map(pokeDB[v].defense_data.vulnerable_to, function(element,index) {return index});
			$.each(vulnerableToTypes, function(k,v) {
				combinedVulnerabilites.push(v);
			})
		});

		ctVulnerability = ((new Set(combinedVulnerabilites).size) !== combinedVulnerabilites.length) ? "glyphicon glyphicon-thumbs-down" : "glyphicon glyphicon-thumbs-up";
		//console.log(itVulnerability)

		textToAppend += "<tr><td><b>"+slot1+"</b><br><small>"+pokeDB[slot1].type.join("/")+"</small></td><td><b>"+slot2+"</b><br><small>"+pokeDB[slot2].type.join("/")+"</small></td><td><b>"+slot3+"</b><br><small>"+pokeDB[slot3].type.join("/")+"</small></td><td>"+resistances+"</td><td>"+vulnerabilities+"</td><td><span class=\""+ctVulnerability+"\" aria-hidden=\"true\"></span></tr>";
	});

	$("#assembler-tbody").append(textToAppend);
	$(".pkm-list-btn").attr("disabled", false);

});