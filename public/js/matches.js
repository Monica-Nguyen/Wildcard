

async function getMatchByUser() {
    let response = await fetch(`http://localhost:3000/message/matches_user/all/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();
    let matchList = ``;
    console.log(data);
    let matchArray = data.matches;
    if (matchArray.length > 0) {
        matchArray.forEach(match =>{
            let chatURL = "/chat/" + match;
            matchList +=
                `
            <div>
                <a class="match_link"href=${chatURL}><span class="dot">Oracle</span></a>
            </div>
            
            `
        });
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