// variabili globali
let url = "https://jsonplaceholder.typicode.com/users";
let input = document.getElementById("inputGroupSelect01");
let inputUtente = document.getElementById("inputUtente");
let dataOriginal = [];

// evento per caricare i dati quando la pagina è caricata
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

// funzione per fetchare i dati dall'API
async function fetchData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        creazioneTabella(data);
    } catch (error) {
        console.log("errore", error);
    }
    
}


const creazioneTabella = (data) => {
    let container = document.getElementById("tabella");
    container.innerHTML = `<table>`
    container.innerHTML += `<tr><th>Name</th><th>Username</th><th>Email</th><th>Address</th></tr>`;
    data.forEach(user => {
        container.innerHTML += `<tr><td class="col-md-3 py-2">${user.name}</td><td class="col-md-3 py-2">${user.username}</td><td class="col-md-3 py-2">${user.email}</td><td class="col-md-3 py-2">${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td></tr>`;
    });
    container.innerHTML += `</table>`
    inputUtente.addEventListener("input", () => filtro(data));
    input.addEventListener("change", () => filtro(data));
    return tabella;
}


const filtro = (data) => {
    
    //controllo se data è un array
    if(!Array.isArray(data)) {
        console.log("non è un array", data);
        return;
    }

    if(dataOriginal.length === 0) {
        dataOriginal = [...data];
        return dataOriginal;
    }
    
    //prendo il valore dell'input selezionato
    let option = input.value.toLowerCase();
    console.log(option);
    //prendo il valore dell'input utente
    let valueInput = inputUtente.value;
    console.log(valueInput);

    // Se l'input è vuoto, mostra tutti i dati originali
    if (!valueInput) {
        creazioneTabella(dataOriginal); // Mostra tutti i dati
        return;
    }
    
    //filtro i dati in base all'opzione selezionata e al valore dell'input
    let filteredData = data.filter(user => {
        
        return user[option] && user[option].toLowerCase().includes(valueInput.toLowerCase());
    });
    console.log(filteredData);

    //creo la tabella con i dati filtrati
    if(filteredData.length === 0) {
        let container = document.getElementById("tabella");
        container.innerHTML = `<h1 class="text-danger">Nessun risultato</h1>`;
    } else {
        creazioneTabella(filteredData);
    }
}
