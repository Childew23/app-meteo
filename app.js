const apiKey = '1d07d855cb436fc0f66211af3700464c';  //Clé API OpenWeather
let city;   //Variable qui va contenir le nom de la ville
const searchBox = document.querySelector('.search input');  //Barre de recherche
const searchForm = document.querySelector('.search');   //Formulaire
const weatherIcon = document.querySelector('.weather-icon');    //Image Météo

//Quand on soumet le formulaire, il va lancer la fonction checkWeather
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); //Empêche au formulaire de recharger la page
    checkWeather(searchBox.value);  //checkWeather qui se lance en prenant en paramètre la ville qu'on a soumit dans la barre de recherche
})

// Fonction asynchrone checkWeather
async function checkWeather(city) {
    // Cherche les infos météos de la ville qu'on recherche et nous affiche les infos en français
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${city}&lang=fr`;
    const response = await fetch(apiURL);

    // Si la ville n'existe pas ça nous lance une erreur
    if (response.status == 404) {
        document.querySelector(".error").style.display = 'block';
        document.querySelector(".weather").style.display = 'none';
    } else {
    // Si l'API nous trouve la ville
        
        let data = await response.json();   // Transforme notre réponse sous format JSON

        const desc = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);    // Description du temps qu'il fait dans la ville qu'on recherche 
        document.querySelector('.city').innerHTML = data.name;  // On affiche le nom de la ville qu'on recherche
        document.querySelector('.desc').innerHTML = desc;   // On affiche la description
        document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°c`;  // Température qui est arrondie pour éviter d'afficher des nombres décimaux
        document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;   // Taux d'humidité
        document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;  // Vitesse du vent en km/h

        //Image de la météo qui change en fonction du temps qu'il fait
        switch (data.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = "images/clouds.png";
                break;
            case 'Clear':
                weatherIcon.src = "images/clear.png";
                break;
            case 'Rain':
                weatherIcon.src = "images/rain.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "images/drizzle.png";
                break;
            case 'Mist':
                weatherIcon.src = "images/mist.png";
                break;
            case 'Snow':
                weatherIcon.src = "images/snow.png";
                break;
        }

        // Affiche toutes nos infos et enlève le message d'erreur 
        document.querySelector('.weather').style.display = "block";
        document.querySelector(".error").style.display = 'none';
    }
}
