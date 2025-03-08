function buildPagination(totalData, currentPage = 1)
{
    let pageSize = 20;
    let numberOfPages = Math.ceil(totalData.length/pageSize)

    // makes an array with the numbers of pages
    let listOfPages = []
    for (k = 1; k <= numberOfPages ; k++) {
        listOfPages.push(k)
    }

    let showListOfPages = [];
    if (numberOfPages > 5) {
        // if current page is below or equal to three, shows the first four pages and the last
        if (currentPage <= 3) {
            showListOfPages = listOfPages.slice(0, 4)
            showListOfPages.push(listOfPages[listOfPages.length - 1])
        // if current page is one of the last three possible pages, shows the first page, the fourth-to-last
        } else if (listOfPages.slice([listOfPages.length - 3]).includes(currentPage)){
            showListOfPages = listOfPages.slice([listOfPages.length - 3]);
            showListOfPages.splice(0, 0, 1)
            showListOfPages.splice(1, 0, listOfPages[listOfPages.length - 4])
        // if not at amont the first or the last page numbers, shows the first, the one before the current page, the current page, the one after it, and the last page
        } else {
            showListOfPages = [ 1, (currentPage - 1), currentPage, (currentPage + 1), listOfPages[listOfPages.length - 1]];
        }
    }

    let startAt = (currentPage - 1) * pageSize;
    let endAt = currentPage * pageSize;
    let currentPageData = totalData.slice(startAt, endAt);

    let pagesHtml = "";
    showListOfPages.forEach((page) => {
        pageText = (page === currentPage) ? "<b>" + page + "</b>" : page;
        pagesHtml += "&nbsp;<button class='pageButton btn btn-sm' data-page='" + page + "'>" + pageText + "</button>";
    })

    $(".dataPagination").html(pagesHtml);

    showPageData(currentPageData);
}

function showPageData(pageData)
{
    textToAppend = "";
    pageData.forEach((team) => {
		team = team.split(",");
		
		var slot1 = team[0].trim(),
			slot2 = team[1].trim(),
			slot3 = team[2].trim();

        var slot1VulnerableTo = Object.keys(pokeDB[slot1].defense_data.vulnerable_to),
			slot2VulnerableTo = Object.keys(pokeDB[slot2].defense_data.vulnerable_to),
			slot3VulnerableTo = Object.keys(pokeDB[slot3].defense_data.vulnerable_to),
			slot1SharedVulnerability = slot1VulnerableTo.filter(value => slot2VulnerableTo.concat(slot3VulnerableTo).includes(value)),
			slot2SharedVulnerability = slot2VulnerableTo.filter(value => slot1VulnerableTo.concat(slot3VulnerableTo).includes(value)),
			slot3SharedVulnerability = slot3VulnerableTo.filter(value => slot1VulnerableTo.concat(slot2VulnerableTo).includes(value)),
			teamSharedVulnerability = slot1SharedVulnerability.concat(slot2SharedVulnerability).concat(slot3SharedVulnerability),
			teamSharedVulnerability = [...new Set(teamSharedVulnerability)],
			combinedVulnerabilites = [...new Set(slot1VulnerableTo.concat(slot2VulnerableTo).concat(slot3VulnerableTo))],
			combinedResistances = [...new Set(
                Object.keys(pokeDB[slot1].defense_data.resistant_to).concat(Object.keys(pokeDB[slot2].defense_data.resistant_to)).concat(Object.keys(pokeDB[slot3].defense_data.resistant_to))
            )];

        if (teamSharedVulnerability.length > 0 && $("#hide_ctv").is(":checked")) {
            return true;
        }

        var ctVulnerabilityIcon = (teamSharedVulnerability.length > 0) ? "glyphicon glyphicon-thumbs-down" : "glyphicon glyphicon-thumbs-up";

        let slot1SharedVulnerabilityIcons = '';
        slot1SharedVulnerability.sort();
        $.each(slot1SharedVulnerability, function(k,v) {
            imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + v.toUpperCase() + '.png';
            slot1SharedVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + v + "'/>";
        });
    
        let slot2SharedVulnerabilityIcons = '';
        slot2SharedVulnerability.sort();
        $.each(slot2SharedVulnerability, function(k,v) {
            imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + v.toUpperCase() + '.png';
            slot2SharedVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + v + "'/>";
        });
    
        let slot3SharedVulnerabilityIcons = '';
        slot3SharedVulnerability.sort();
        $.each(slot3SharedVulnerability, function(k,v) {
            imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + v.toUpperCase() + '.png';
            slot3SharedVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + v + "'/>";
        });
    
        let slot1HighlightResistanceIcons = "";
        let slot2HighlightResistanceIcons = "";
        let slot3HighlightResistanceIcons = "";
        let slot1HighlightVulnerabilityIcons = "";
        let slot2HighlightVulnerabilityIcons = "";
        let slot3HighlightVulnerabilityIcons = "";
        
        if (highlightDefenseDetails.length > 0) {
            highlightDefenseDetails.forEach((type) => {
                if (Object.keys(pokeDB[slot1].defense_data.resistant_to).includes(type)) {
                    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + type.toUpperCase() + '.png';
                    slot1HighlightResistanceIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + type + "'/>";
                }
                if (Object.keys(pokeDB[slot1].defense_data.vulnerable_to).includes(type)) {
                    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + type.toUpperCase() + '.png';
                    slot1HighlightVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + type + "'/>";
                }
            });
            
            highlightDefenseDetails.forEach((type) => {
                if (Object.keys(pokeDB[slot2].defense_data.resistant_to).includes(type)) {
                    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + type.toUpperCase() + '.png';
                    slot2HighlightResistanceIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + type + "'/>";
                }
                if (Object.keys(pokeDB[slot2].defense_data.vulnerable_to).includes(type)) {
                    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + type.toUpperCase() + '.png';
                    slot2HighlightVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + type + "'/>";
                }
            });
            
            highlightDefenseDetails.forEach((type) => {
                if (Object.keys(pokeDB[slot3].defense_data.resistant_to).includes(type)) {
                    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + type.toUpperCase() + '.png';
                    slot3HighlightResistanceIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + type + "'/>";
                }
                if (Object.keys(pokeDB[slot3].defense_data.vulnerable_to).includes(type)) {
                    imgSrc = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/POKEMON_TYPE_' + type.toUpperCase() + '.png';
                    slot3HighlightVulnerabilityIcons += "<img src='" + imgSrc + "' height='25px' width='25px' title='" + type + "'/>";
                }
            });
        }
    
        let slot1HighlightResistances = "&nbsp;"
        if (slot1HighlightResistanceIcons !== "") {
            slot1HighlightResistances = "Is resistant to:<br/>" + slot1HighlightResistanceIcons
        }
    
        let slot2HighlightResistances = "&nbsp;"
        if (slot2HighlightResistanceIcons !== "") {
            slot2HighlightResistances = "Is resistant to:<br/>" + slot2HighlightResistanceIcons
        }
    
        let slot3HighlightResistances = "&nbsp;"
        if (slot3HighlightResistanceIcons !== "") {
            slot3HighlightResistances = "Is resistant to:<br/>" + slot3HighlightResistanceIcons
        }
    
        let slot1HighlightVulnerabitilies = "&nbsp;"
        if (slot1HighlightVulnerabilityIcons !== "") {
            slot1HighlightVulnerabitilies = "Is vulnerable to:<br/>" + slot1HighlightVulnerabilityIcons
        }
    
        let slot2HighlightVulnerabitilies = "&nbsp;"
        if (slot2HighlightVulnerabilityIcons !== "") {
            slot2HighlightVulnerabitilies = "Is vulnerable to:<br/>" + slot2HighlightVulnerabilityIcons
        }
    
        let slot3HighlightVulnerabitilies = "&nbsp;"
        if (slot3HighlightVulnerabilityIcons !== "") {
            slot3HighlightVulnerabitilies = "Is vulnerable to:<br/>" + slot3HighlightVulnerabilityIcons
        }
    
        textToAppend += 
        "<tr>" +
            "<td rowspan=\"3\"><button class=\"btn btn-sm\" id=\"paste_pkms\" data-slot1='" + slot1 + "' data-slot2='" + slot2 + "' data-slot3='" + slot3 + "'><span class=\"glyphicon glyphicon-paste\" aria-hidden=\"true\"></button><br/><br/><span class=\"" + ctVulnerabilityIcon + "\" aria-hidden=\"true\"></span></td>" +
            "<td><span><b>" + slot1 + "</b></span><br><small>" + retrieveType(slot1) + "<br/></small></td>" +
            "<td><span><b>" + slot2 + "</b></span><br><small>" + retrieveType(slot2) + "<br/></small></td>" +
            "<td><span><b>" + slot3 + "</b></span><br><small>" + retrieveType(slot3) + "<br/></small></td>" +
            "<td rowspan=\"3\"><small><b>Team's Resis.:</b> " + (new Set(combinedResistances).size) + "<br/><b>Team's Vul.:</b> " + (new Set(combinedVulnerabilites).size) + "</small></td>" +
        "</tr>" + 
        "<tr class='row-no-border'>" +
            "<td><small>Cross team vulnerability:</small><br/>" + ((slot1SharedVulnerabilityIcons !== "") ? slot1SharedVulnerabilityIcons : "&nbsp;") + "</td>" +
            "<td><small>Cross team vulnerability:</small><br/>" + ((slot2SharedVulnerabilityIcons !== "") ? slot2SharedVulnerabilityIcons : "&nbsp;") + "</td>" +
            "<td><small>Cross team vulnerability:</small><br/>" + ((slot3SharedVulnerabilityIcons !== "") ? slot3SharedVulnerabilityIcons : "&nbsp;") + "</td>" +
        "</tr>" +
        "<tr class='row-no-border'>" +
            "<td><small><span class='spanLeftHighlights'>" + slot1HighlightResistances + "</span><span class='spanRightHighlights'>" + slot1HighlightVulnerabitilies + "</span></small></td>" +
            "<td><small><span class='spanLeftHighlights'>" + slot2HighlightResistances + "</span><span class='spanRightHighlights'>" + slot2HighlightVulnerabitilies + "</span></small></td>" +
            "<td><small><span class='spanLeftHighlights'>" + slot3HighlightResistances + "</span><span class='spanRightHighlights'>" + slot3HighlightVulnerabitilies + "</span></small></td>" +
        "</tr>";

    })
    $("#assembler-tbody").html("");
    $("#assembler-tbody").append(textToAppend);

    
}