const API_BASE_URL = "http://localhost:5000";

const token = localStorage.getItem("token");

if(token){
    showDashboard();
}

function showLogin(){
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("registerForm").classList.add("hidden");
}   

function showRegister(){    
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
}

async function register(){

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const res = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }
    );

    const data = await res.json();

    alert(data.message);

    if(data.token){
        localStorage.setItem("token",data.token);
        showDashboard();
    }
}

async function login(){

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const res = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await res.json();

    if(data.token){
        localStorage.setItem("token",data.token);
        showDashboard();
    }else{
        alert(data.message);
    }
}

function logout(){
    localStorage.removeItem("token");
    location.reload();
}

function showDashboard(){

    document
      .getElementById("authSection")
      .classList.add("hidden");

    document
      .getElementById("dashboard")
      .classList.remove("hidden");

    fetchCountries();
}

async function addCountry(){

    const formData = new FormData();

    formData.append(
        "name",
        document.getElementById("name").value
    );

    formData.append(
        "capital",
        document.getElementById("capital").value
    );

    formData.append(
        "continent",
        document.getElementById("continent").value
    );

    formData.append(
        "population",
        document.getElementById("population").value
    );

    formData.append(
        "area",
        document.getElementById("area").value
    );

    formData.append(
        "currency",
        document.getElementById("currency").value
    );

    formData.append(
        "language",
        document.getElementById("language").value
    );

    formData.append(
        "description",
        document.getElementById("description").value
    );

    const flag =
        document.getElementById("flag").files[0];

    if(flag){
        formData.append("flag",flag);
    }

    const res = await fetch(
        `${API_BASE_URL}/api/countries`,
        {
            method:"POST",
            headers:{
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            },
            body:formData
        }
    );

    const data = await res.json();

    alert(data.message);

    fetchCountries();
}

async function fetchCountries(){

    const res = await fetch(
        `${API_BASE_URL}/api/countries`
    );

    const data = await res.json();

    const container =
        document.getElementById("countriesContainer");

    container.innerHTML = "";

    data.countries.forEach(country => {

        container.innerHTML += `
            <div class="country-card">

                <img
                src="${country.flag?.url || ''}"
                alt=""
                >

                <h3>${country.name}</h3>

                <p><b>Capital:</b>
                ${country.capital}</p>

                <p><b>Continent:</b>
                ${country.continent}</p>

                <p><b>Population:</b>
                ${country.population}</p>

                <p><b>Currency:</b>
                ${country.currency}</p>

                <p><b>Language:</b>
                ${country.language}</p>

                <br>

                <button
                    onclick="deleteCountry('${country._id}')"
                >
                    Delete
                </button>

            </div>
        `;
    });
}

async function deleteCountry(id){

    if(!confirm("Delete country?")) return;

    const res = await fetch(
        `${API_BASE_URL}/api/countries/${id}`,
        {
            method:"DELETE",
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    const data = await res.json();

    alert(data.message);

    fetchCountries();
}

async function searchCountries(){

    const query =
      document.getElementById("searchInput").value;

    if(!query){
        fetchCountries();
        return;
    }

    const res = await fetch(
        `${API_BASE_URL}/api/countries/search?query=${query}`
    );

    const data = await res.json();

    const container =
        document.getElementById("countriesContainer");

    container.innerHTML = "";

    data.countries.forEach(country => {

        container.innerHTML += `
        <div class="country-card">
            <img src="${country.flag?.url || ''}">
            <h3>${country.name}</h3>
            <p>${country.capital}</p>
        </div>
        `;
    });
}