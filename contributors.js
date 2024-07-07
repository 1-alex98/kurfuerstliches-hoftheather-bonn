async function go () {
    let sink = document.getElementById("contributors");

    let data = await fetch("contributors.json")
        .then(
            value => value.json()
        )
    let htmlTemplate = await fetch("contributor.html")
        .then(
            value => value.text()
        )

    let html = ""

    function formatHtml(actor) {
        let localTemplate = htmlTemplate;
        for (let variable in actor) {
            if(actor[variable] ==="") {
                localTemplate = localTemplate.replace(`\${${variable}-missing}`, "d-none")
                localTemplate = localTemplate.replace(`\${${variable}}`, "")
            }else {
                localTemplate = localTemplate.replace(`\${${variable}-missing}`, "")
                localTemplate = localTemplate.replace(`\${${variable}}`, actor[variable])
            }
        }
        localTemplate = localTemplate.replaceAll(/[$][{][^}]*missing[^}]*[}]/gi, "d-none")
        localTemplate = localTemplate.replaceAll(/[$][{][^}]*[}]/gi, "")
        return localTemplate
    }

    for (const actor of data) {
        let innerHTML = formatHtml(actor) + "\n";
        console.log(`Adding ${innerHTML}`)
        document.getElementById("contributors").innerHTML = document.getElementById("contributors").innerHTML + innerHTML
    }
}
go()