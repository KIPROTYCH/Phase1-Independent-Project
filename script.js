document.addEventListener('DOMContentLoaded', function () {
    const matchList = document.getElementById('matchList');
    const matchDetails = document.getElementById('matchDetails');

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            for (let match of data.matches) {
                matchList.appendChild(createMatchCard(match));
            }
        });

    function createMatchCard(match) {
        const matchCard = document.createElement('div');
        matchCard.classList.add('match-card');

        const team1Logo = document.createElement('img');
        team1Logo.src = match.team1Logo;
        team1Logo.alt = match.team1;
        matchCard.appendChild(team1Logo);

        const team2Logo = document.createElement('img');
        team2Logo.src = match.team2Logo;
        team2Logo.alt = match.team2;
        matchCard.appendChild(team2Logo);

        const title = document.createElement('h2');
        title.textContent = match.team1 + ' vs ' + match.team2;
        matchCard.appendChild(title);

        const details = document.createElement('p');
        details.textContent = 'Date: ' + match.date + ', Time: ' + match.time;
        matchCard.appendChild(details);

        // Handle match card click
        matchCard.addEventListener('click', function () {
            displayMatchDetails(match);
        });

        return matchCard;
    }

    function displayMatchDetails(match) {
        matchDetails.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = match.team1 + ' vs ' + match.team2;
        matchDetails.appendChild(title);

        const details = document.createElement('p');
        details.textContent = 'Date: ' + match.date + ', Time: ' + match.time;
        matchDetails.appendChild(details);

        const ticketCount = document.createElement('p');
        ticketCount.classList.add('ticket-count');
        ticketCount.textContent = 'Tickets Remaining: ' + match.tickets;
        matchDetails.appendChild(ticketCount);

        const buyButton = document.createElement('button');
        buyButton.classList.add('buy-button');
        buyButton.textContent = 'Buy Ticket';
        matchDetails.appendChild(buyButton);

        // Handle buy button click
        buyButton.addEventListener('click', function () {
            if (match.tickets > 0) {
                match.tickets--;
                ticketCount.textContent = 'Tickets Remaining: ' + match.tickets;

                if (match.tickets === 0) {
                    buyButton.disabled = true;
                    buyButton.textContent = 'Sold Out';
                }
            }
        });
    }
});
