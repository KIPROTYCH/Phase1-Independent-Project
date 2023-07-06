
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

        const teamALogo = document.createElement('img');
        teamALogo.src = match.teamA.logo;
        teamALogo.alt = match.teamA.name;
        matchCard.appendChild(teamALogo);

        const teamBLogo = document.createElement('img');
        teamBLogo.src = match.teamB.logo;
        teamBLogo.alt = match.teamB.name;
        matchCard.appendChild(teamBLogo);

        const title = document.createElement('h2');
        title.textContent = match.teamA.name + ' vs ' + match.teamB.name;
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
        title.textContent = match.teamA.name + ' vs ' + match.teamB.name;
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

                alert('Ticket purchased! Check your mail.');
            }
        });

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = 'Cancel Ticket';
        matchDetails.appendChild(cancelButton);

        // Handle cancel button click
        cancelButton.addEventListener('click', function () {
            if (match.tickets < 100) {
                match.tickets++;
                ticketCount.textContent = 'Tickets Remaining: ' + match.tickets;

                if (match.tickets === 1) {
                    buyButton.disabled = false;
                    buyButton.textContent = 'Buy Ticket';
                }

                alert('Ticket Canceled!');
            }
        });
    }
});
