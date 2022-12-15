

async function getMatchByUser() {
    let response = await fetch(`http://localhost:3000/message/matches_user/all/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let matchArray = await response.json();
    let matchList = ``;
    if (matchArray.length > 0) {
        for (let i=0; i < matchArray.length; i++) {
            let response = await fetch (`http://localhost:3000/matches/getNames/`+ matchArray[i], {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let matchNames = await response.json();
            let chatURL = "/chat/" + matchArray[i];
            matchList +=
                `
                <a class="match_link" href=${chatURL}><span class="dot"><p style="margin-top: 80px">${matchNames.employee} and ${matchNames.employer}</p></span></a>
            
            `
        }
    }
    else {
        matchList +=
        `
        <div>
            <p>No matches!</p>
        </div>
        `
    }
    document.getElementById('matches-list').innerHTML = matchList;

}