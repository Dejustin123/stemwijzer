var vraag = 0;
var answers = {};
var teller = 1;
var partijNaam = [];
var i = 0;
var ExtraPunt = 0;
var partijteller = [];

const partijGrote = 5;

eens.style.display = "none";
oneens.style.display = "none";
geen.style.display = "none";
terug.style.display = "none";
slaover.style.display = "none";
partiesButton.style.display = "none";
bigPartiesButton.style.display = "none";
secularPartiesButton.style.display = "none";
extra.style.display = "none";
pq.style.display = "none";

//haalt een vraag op en begint de stemwijzer
function StartStemmen() {
    start.style.display = "none";
    stemwijzer.style.display = "none";
    title.style.display = "none";
    eens.style.display = "inline-block";
    oneens.style.display = "inline-block";
    geen.style.display = "inline-block";
    slaover.style.display = "inline-block";
    partiesButton.style.display = "inline-block";
    bigPartiesButton.style.display = "inline-block";
    secularPartiesButton.style.display = "inline-block";
    extra.style.display = "inline-block";
    laadVraag(vraag);
    partijOpinies();
    laadGrotePartijen();
    laadSeculairePartijen();
    toggleAllPartijen('all');
    blockMKR();
}

//score telling
function PuntenTelling() {
    var i = 0;
    partijNaam.forEach(function (key, value) {
        var som = partijNaam[i]['score'] / 30 * 100;

        addDiv = document.createElement('div');

        partyName = document.createElement('h5');
        partyScore = document.createElement('h5');

        partyName.innerText = partijNaam[i]['name'];

        partyScore.innerText = ' - ' + som.toFixed(0) + ' %';

        partijNaam.sort(function (a, b) {
            var keyA = new Date(a.score),
                keyB = new Date(b.score);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });

        buttons.appendChild(addDiv);
        addDiv.setAttribute('class', 'row m-1');
        addDiv.appendChild(partyName);
        addDiv.appendChild(partyScore);
        i++;
    });

}

//laden van een vraag
function laadVraag(question) {
    collEens.innerText = "";
    collOneens.innerText = "";
    collGeen.innerText = "";
    if (vraag >= 1) {
        terug.style.display = "inline-block";
    } else if (vraag <= 1) {
        terug.style.display = "none";
    }
    opinionParties.style.display = "none";
    bigParties.style.display = "none";
    secularParties.style.display = "none";
    titel.innerText = teller + '. ' + subjects[question]['title'];
    stelling.innerText = subjects[question]['statement'];
}
//eindigt het segment en vervolgens opent met de blockmkr zie extra.js
function stem(stemmen) {
    answers[vraag] = stemmen;
    if (teller <= 29) {
        vraag++;
        teller++;
        laadVraag(vraag);
        partijOpinies();
        pq.style.display = "none";
    } else {
        titel.innerText = 'De test is voltooid';
        stelling.innerText = 'hier zijn de resultaten';
        terug.style.display = 'none';
        eens.style.display = 'none';
        oneens.style.display = 'none';
        geen.style.display = 'none';
        slaover.style.display = 'none';
        partiesButton.style.display = 'none';
        bigPartiesButton.style.display = 'none';
        secularPartiesButton.style.display = 'none';
        extra.style.display = 'none';
        tellerPunten();
        PuntenTelling();
    }
    blockMKR();
}
//terug function
function back() {
    if (vraag > 0) {
        vraag--;
        teller--;
        laadVraag(vraag);
        partijOpinies();
        pq.innerText = answers[vraag];
        pq.style.display = 'inline-block'
    }
}
//laat partijen zien
function toggleAllPartijen(button) {
    if (button === 'opinion') {
        opinionParties.style.display = "block";
        bigParties.style.display = "none";
        secularParties.style.display = "none";
    } else if (button === 'big') {
        opinionParties.style.display = "none";
        bigParties.style.display = "block";
        secularParties.style.display = "none";
    } else if (button === 'secular') {
        opinionParties.style.display = "none";
        bigParties.style.display = "none";
        secularParties.style.display = "block";
    } else if (button === 'all') {
        opinionParties.style.display = "none";
        bigParties.style.display = "none";
        secularParties.style.display = "none";
    }
}
//laden van grote partijen
function laadGrotePartijen() {
    var i = 0;
    parties.forEach(function () {
            if (parties[i]['size'] >= partijGrote) {
                partyName = document.createElement('h5');
                partyLong = document.createElement('p');

                partyName.innerText = parties[i]['name'];

                if (parties[i]['long']) {
                    partyLong.innerText = parties[i]['long'];
                }

                bigParties.appendChild(partyName);
                bigParties.appendChild(partyLong);
                i++;
            }
        }
    );
}

//laden van seculaire partijen
function laadSeculairePartijen() {
    var i = 0;
    parties.forEach(function () {
            if (parties[i]['secular'] === true) {
                partyName = document.createElement('h5');
                partyLong = document.createElement('p');

                partyName.innerText = parties[i]['name'];

                if (parties[i]['long']) {
                    partyLong.innerText = parties[i]['long'];
                }

                secularParties.appendChild(partyName);
                secularParties.appendChild(partyLong);
                i++;
            } else {
                i++;
            }
        }
    );
}

//laden van wat de pratijen van de vraag vinden
function partijOpinies() {
    collEens.innerText = "Eens";
    collOneens.innerText = "Oneens";
    collGeen.innerText = "Geen van beide";
    subjects[vraag]['parties'].forEach(function (value, key) {
            addButton = document.createElement('button');
            addDiv = document.createElement('div');
            addP = document.createElement('p');

            addButton.innerText = value['name'];
            addP.innerText = value['opinion'];

            if (partijNaam.length <= 23) {
                partijNaam.push({name: value['name'], score: 0});
            }

            if ('pro' === value['position']) {
                collumn = collEens;
            } else if ('contra' === value['position']) {
                collumn = collOneens;
            } else if ('none' === value['position']) {
                collumn = collGeen;
            }
            collumn.appendChild(addButton).setAttribute("class", "blockMKR");
            var divContainer = collumn.appendChild(addDiv);
            divContainer.setAttribute("class", "panel");
            divContainer.setAttribute("style", "display: none;");
            addDiv.appendChild(addP);
        }
    );
}

//extra gewicht toevoegen op de vraag
function extraWeight() {
    if (extra.innerText === 'Extra gewicht op deze vraag?') {
        extra.innerText = 'Minder gewicht op deze vraag?';
        ExtraPunt = 1;
    } else {
        extra.innerText = 'Extra gewicht op deze vraag?';
        ExtraPunt = 0;
    }
}

function tellerPunten() {
    for (var i = 0; i < 30; i++) {
        if (answers[i] === 'eens') {
            subjects[i]['parties'].forEach(function (value, key) {
                if (value['position'] === 'pro') {
                    for (var a = 0; a < partijNaam.length; a++) {
                        if (value['name'] === partijNaam[a]['name']) {
                            partijNaam[a]['score'] = partijNaam[a]['score'] + 1 + ExtraPunt;
                        }
                    }
                }
            });
        }
    }
}
