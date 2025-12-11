let burger = document.getElementById("hamburger");
let ht = 90;


let data1= null;

let options = [];

burger.addEventListener("click", ()=>{
    if(burger.innerHTML==='<i class="material-icons">close</i>'){
        burger.innerHTML = '<i class="material-icons">menu</i>';
        document.getElementById('menu').style.transition = "0.5s";
        document.getElementById('menu').style.height = "0px";
        return;
    }
    else{
        burger.innerHTML = '<i class="material-icons">close</i>';
        document.getElementById('menu').style.transition = "0.5s";
        document.getElementById('menu').style.height = `${ht}px`;

    }
});

function showHistory(username){
    let html = "";
    let hist = JSON.parse(localStorage.getItem(`${username}`) || "[]");
    if(Object.keys(hist).length !==0){
        hist.forEach(element => html += `
            <div onclick="getData('${element.location.name}')" class="history-card">
                <div class="text-content">
                    <h3>${element.location.name}, ${element.location.country}</h3>
                    <p>Temp: ${element.current.temp_c}&deg;C, Condition: ${element.current.condition.text}</p>
                </div>
                <div class="icon-content">
                    <img src="https:${element.current.condition.icon}" alt="weather-icon" style="width:40px; height:40px;"/>
                </div>
            </div>`
        );
    }
    else{
        html = `<h2 style="text-align: center;color: #c4c4c4;">No History Yet! Explore!!</h2>`;
    }
    try{
        document.getElementById("history").innerHTML = html;
    }
    catch(error){

    }
    let x= "";
    if(options.length !== 0){
        options.forEach(option => {
            x+= `<option value="${option}">`;
        });
    }
    document.getElementById("cityOpt").innerHTML= x;
}

function togglePassword(){
    document.getElementById("password").type = document.getElementById("password").type === "password" ? "text" : "password";
}
function togglePasswords(){
    document.getElementById("signup-password").type = document.getElementById("signup-password").type === "password" ? "text" : "password";
    document.getElementById("signup-confirm-password").type = document.getElementById("signup-confirm-password").type === "password" ? "text" : "password";
}
function validateLogin(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let flag = false;
    let users = JSON.parse(localStorage.getItem("users-data") || "[]");
    users.forEach(user => {
        if(user.username === username && user.password === password){
            flag = true;
            return;
        }});

    if(flag){
        onLogin(username);
    }
    else{
        showPopup("Invalid Credentials");
    }
}
function showLogin(){
    document.getElementById("displayer").innerHTML = `
        <div class="login" id="login">
            <h1>Welcome back to WeatherMate</h1>
            <label for="username">Username:</label>
            <input type="text" id="username" placeholder="Enter Username" class="bar">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter Password" class="bar">
            <div style="margin: 0px 10%;">
            <input type="checkbox" id="show-password" onclick="togglePassword()"> Show Password
            </div>
            <button class="login-btn" id="login-btn" onclick="validateLogin()">Login</button>
            <p style="margin: 0px 10%;">Don't have an account? <a onclick="showSignup()" href="#" style="color: white">Sign Up</a></p>
        </div>
    `;
}
function createUser(){
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let confirmPassword = document.getElementById("signup-confirm-password").value;
    if(password !== confirmPassword){
        showPopup("Passwords do not match");
        return;
    }
    let flag = false;
    let users = JSON.parse(localStorage.getItem("users-data") || "[]");
    users.forEach(user => {
        if(user.username === username){
            showPopup("Username already exists");
            flag = true;
            return;
        }});
    if(flag){
        return;
    }
    users.push({username: username, password: password});
    localStorage.setItem("users-data", JSON.stringify(users));
    showPopup("User created successfully! Please login.",1);
    showLogin();
}
function showSignup(){
    document.getElementById("displayer").innerHTML = `
        <div class="login" id="login">
            <h1>Welcome to WeatherMate</h1>
            <label for="signup-username">Username:</label>
            <input type="text" id="signup-username" placeholder="Enter Username" class="bar">
            <label for="signup-password">Password:</label>
            <input type="password" id="signup-password" placeholder="Enter Password" class="bar">
            <label for="signup-confirm-password">Confirm Password:</label>
            <input type="password" id="signup-confirm-password" placeholder="Confirm Password" class="bar">
            <div style="margin: 0px 10%;">
            <input type="checkbox" id="show-password" onclick="togglePasswords()"> Show Password
            </div>
            <button class="login-btn" id="signup-btn" onclick="createUser()">SignUp</button>
        </div>
    `;
}

function onLogin(username){
    options = JSON.parse(localStorage.getItem(`options-${username}`) || "[]");
    ht = 90;
    let temp = `
        <a href="#" onclick = "onLogin('${username}')">Home</a>
        <a href="#about">About</a>
    `;
    document.getElementById("categories").innerHTML = temp;
    document.getElementById("menu").innerHTML = temp;
    document.getElementById("displayer").innerHTML = `
        <h2>Welcome to WeatherMate</h2>
        <div class="main">
            <input id="city" type="text" placeholder="Enter city name" class="city-input" list="cityOpt">
            <datalist id="cityOpt">

            </datalist>
            <button onclick="getData(0,'${username}')" class="get-weather-btn">Get Weather</button>
        </div>
        <h1 style="text-align: center;"><i class="material-icons">history</i> History</h1>
        <div id="history" class="history">
            <h2 style="text-align: center;color: #c4c4c4;">No History Yet! Explore!!</h2>
        </div>
        <div id="btn">
            <button onclick="localStorage.removeItem('${username}'); showHistory('${username}');" class="clear-history-btn">Clear History</button>
        </div>
    `
    showHistory(username);
}

function showPopup(message, type=0){
    if (type===0){
        document.getElementById("popup").innerHTML = `
            <i style="color: red;" class="material-icons close-btn">close</i>
            <div id="popup-content" class="popup-content">
                <h3>Error!</h3>
                <p id="error-message"></p>
            </div>
        `;
    }
    else{
        document.getElementById("popup").innerHTML = `
            <i style="color: green;" class="material-icons close-btn">done</i>
            <div id="popup-content" class="popup-content">
                <h3>Success!</h3>
                <p id="error-message"></p>
            </div>
        `;
    }
    let popup = document.getElementById("popup");
    let popupMessage = document.getElementById("error-message");
    popupMessage.innerText = message;
    popup.style.height = "50px";
    setTimeout(()=>{
        popup.style.height = "0px";
    }, 3000);
}

function convertToFahrenheit(){
    let tempDiv = document.getElementById("current-temperature");
    tempDiv.innerHTML = `
        <h1>${data1.current.temp_f}&deg;F.</h1>
        <button onclick="convertToCelsius()">To &deg;C</button>
    `;
}

function convertToCelsius(){
    let tempDiv = document.getElementById("current-temperature");
    tempDiv.innerHTML = `
        <h1>${data1.current.temp_c}&deg;C.</h1>
        <button onclick="convertToFahrenheit()">To &deg;F</button>
    `;
}

function displayData(data,username){
    data1 = data;
    let categories = document.getElementById("categories");
    let menu = document.getElementById("menu");

    let html = `
        <a href="#" onclick="onLogin('${username}')" id="back">Home</a>
        <a href="#location-info">Current Weather</a>
        <a href ="#forecast-info">Hour-forecast</a>
        <a href ="#weekly-weather">7-Day Forecast</a>
        <a href ="#about">About</a>
    `;

    categories.innerHTML = html;
    menu.innerHTML = html;

    let displayer = document.getElementById("displayer");
    displayer.style.display = "flex";
    displayer.style.flexDirection = "column";
    ht = 225;
    displayer.innerHTML = `
        <div id="location-info" class="location-info">
            <div id="location-name" class="location-name">
                <h1 id="city-name">${data.location.name},</h1>
                <p id="country-name">${data.location.region},${data.location.country}.</p>
                <p id="local-time">Local Time: ${data.location.localtime}</p>
                <div id="current-temperature" class="current-temperature">
                    <h1>${data.current.temp_c}&deg;C.</h1>
                    <button onclick="convertToFahrenheit()">To &deg;F</button>
                </div>
                <div id="current-condition" class="current-condition"><h2>${data.current.condition.text}</h2></div>
            </div>
            <div id="current-weather" class="current-weather">
                <img id="current-weather-icon" class="current-weather-icon" src="https:${data.current.condition.icon}" alt="weather-icon">
                
            </div>
        </div>
        <div id="air-quality" class="air-quality">
            <h1>Air Info</h1>
            <div id="air-info" class="air-info">
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <p><i class="material-icons">thermostat</i></p>
                        <h4>Temperature</h4>
                    </div>
                    <h3>${data.current.temp_c} &deg;C.</h3>
                </div>
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <p><i class="material-icons">thermostat</i></p>
                        <h4>Feels like</h4>
                    </div>
                    <h3>${data.current.feelslike_c} &deg;C.</h3>
                </div>
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <p><i class="material-icons">air</i></p>
                        <h4>Wind Speed</h4>
                    </div>
                    <h3>${data.current.wind_kph} Kmph.</h3>
                </div>
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <p><i class="material-icons">arrow_outward</i></p>
                        <h4>Wind Direction</h4>
                    </div>
                    <h3>${data.current.wind_degree}&deg; - ${data.current.wind_dir}.</h3>
                </div>
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <p><i class="material-icons">water_drop</i></p>
                        <h4>Humidity</h4>
                    </div>
                    <h3>${data.current.humidity}</h3>
                </div>
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <p><span class="material-symbols-outlined">dew_point</span></p>
                        <h4>Precipitation</h4>
                    </div>
                    <h3>${data.current.precip_mm} mm.</h3>
                </div>
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <p><i class="material-icons">visibility</i></p>
                        <h4>Visibility</h4>
                    </div>
                    <h3>${data.current.vis_km} Km.</h3>
                </div>
                <div class="air-quality-card">
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;color: #c4c4c4;">
                        <img src="./rainy_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="rain-icon" style="width:24px; height:24px;">
                        <h4>Chance of Rain</h4>
                    </div>
                    <h3>${data.forecast.forecastday[0].day.daily_chance_of_rain}%.</h3>
                </div>
            </div>
        </div>
    
        <div style="width: calc(100%-40px); height: 50px;" id="forecast-info" class="forecast-info">
            ${data.forecast.forecastday[0].hour.map(h => `
            <div class="forecast-card">
                <h5>${h.time.split(" ")[1]}</h5>
                <img src="https:${h.condition.icon}" 
                     alt="weather-icon" 
                     style="width:40px; height:40px;">
                <p>${h.condition.text}</p>
                <p>${h.temp_c}&deg;C</p>
                <p style="font-size: 12px">Chance of Rain: ${h.chance_of_rain}%</p>
            </div>
        `)
        .join("")}
        </div>
        <div id="weekly-weather" class="weekly-weather">
            <h1>7-Day Forecast</h1>
            <div id="weekly-forecast-cards" class="weekly-forecast-cards">
                ${data.forecast.forecastday.map(day => `
                    <div class="weekly-forecast-card">
                        <h3>${day.date}</h3>
                        <img src="https:${day.day.condition.icon}" alt="weather-icon" style="width:50px; height:50px;">
                        <p>${day.day.condition.text}</p>
                        <p>Max: ${day.day.maxtemp_c}&deg;C</p>
                        <p>Min: ${day.day.mintemp_c}&deg;C</p>
                        <p style="font-size: 12px">Chance of Rain: ${day.day.daily_chance_of_rain}%</p>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="back-to-top" title="Back to Top">
            <a href="#body"><i class="material-icons">arrow_upward</i></a>
        </div>
    `;
}

function addToList(data,username){
    let cityList = JSON.parse(localStorage.getItem(`${username}`) || "[]");
    cityList.push({
        location: data.location,
        current: data.current
    });
    localStorage.setItem(`${username}`, JSON.stringify(cityList));
    let flag = false;
    options.forEach(option => {
        if(data.location.name === option){flag=true;}
    });
    if(!flag){
        options = [data.location.name, ...options];
        localStorage.setItem(`options-${username}`,JSON.stringify(options));
    }
}


function getData(x,username){
    let city = "";
    if(x===0){
        city = document.getElementById("city").value;
    }
    else{
        city = x;
        // console.log(typeof(city));
    }
    try{
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=74d8bbb347044e2385a63950250312&q=${city}&days=7&aqi=yes&alerts=yes`)
        .then(response =>{
            // console.log(response);
            if (!response.ok) {
                throw new Error("Invalid City Name");
            }
            return response.json();})
        .then(data => {
            console.log(data);
            addToList(data, username);
            displayData(data,username);
            console.log(options);
        })
        .catch(error => {
            showPopup(error.message);
            // document.getElementById("city").style.boxShadow = "0px 0px 10px red";
        });
    }
    catch(error){
        showPopup(error.message);
    }
}
// console.log(options);
