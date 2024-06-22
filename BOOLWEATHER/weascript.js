// RECUPERO ELEMENTI DI INTERESSE
const htmlElement = document.documentElement;
const suggestion = document.querySelector('.suggestion');
const weaIcon = document.querySelector('.wea-icon');
const weaLoc = document.querySelector('.wea-loc');
const weaTemp = document.querySelector('.wea-temp');

// RECUPERO LA MIA POSIZIONE
navigator.geolocation.getCurrentPosition(posSuccess, onError);

// FUNZIONE IN CASO DI SUCCESSO
async function posSuccess(position) {
    // RECUPERO COSTANTI LATITUDINE & LONGITUDINE
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const units = 'metric';
    const lang = 'it';

    // CHIAMATA API DI OPEN WEATHER

    const API_KEY = '6649353f74f0ee9e22db6087fb4e12de';
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;


    // EFFETTUARE CHIAMATA API OPEN WEATHER
    const response = await fetch(endpoint);
    const data = await response.json();

    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    // INSERISCO GLI ELEMENTI
    weaLoc.innerText = data.name;
    weaIcon.alt = description;
    weaIcon.src = `weaicons/${iconCode}.png`;
    weaTemp.innerText = `${Math.floor(data.main.temp)}°`;
    suggestion.innerText = getSuggestion(iconCode);

    // DISATTIVARE IL LOADING HTML
    htmlElement.className = '';
};

// FUNZIONE IN CASO DI IMPOSSIBILITà A RECUPERARE POSIZIONE
function onError() {
    // PREPARAZIONE ELEMENTI PER FAR CAPIRE ALL'UTENTE L'ERRORE
    weaLoc.innerText = '';
    weaIcon.alt = 'Attivare la geolocalizzazione';
    weaIcon.src = "weaicons/geolocation_disabled.png";
    suggestion.innerText = 'Attiva la geolocalizzazione per usufruire del servizio';

    //DISATTIVARE LA CLASSE HTML PER VISUALIZZARE IMMAGINE NOGEO
    htmlElement.className = '';
}

// FUNZIONE PER INSERIRE FRASE CORRISPONDENTE AL TEMPO

function getSuggestion(iconCode) {


    const suggestions = {
        '01d': 'Ricordati la crema solare!',
        '01n': 'Buonanotte!',
        '02d': 'Oggi il sole va e viene...',
        '02n': 'Attenti ai lupi mannari...',
        '03d': 'Luce perfetta per fare foto!',
        '03n': 'Dormi sereno :)',
        '04d': 'Che cielo grigio :(',
        '04n': 'Non si vede nemmeno la luna!',
        '09d': 'Prendi l\'ombrello',
        '09n': 'Copriti bene!',
        '10d': 'Prendi l\'ombrello',
        '10n': 'Copriti bene!',
        '11d': 'Attento ai fulmini!',
        '11n': 'I lampi accendono la notte!',
        '13d': 'Esci a fare un pupazzo di neve!',
        '13n': 'Notte perfetta per stare sotto il piumone!',
        '50d': 'Accendi i fendinebbia!',
        '50n': 'Guida con prudenza!'
    };

    return suggestions[iconCode];
};