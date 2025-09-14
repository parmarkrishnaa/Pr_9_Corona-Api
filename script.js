const API_URL = "https://api.rootnet.in/covid19-in/stats/latest";
const stateInput = document.getElementById("stateInput");
const summaryResult = document.getElementById("summaryResult");
const regionalResult = document.getElementById("regionalResult");

async function fetchCovidIndia() {
    const res = await fetch(API_URL);
    const obj = await res.json();
    return obj.data;
}

function displaySummary(summary) {
    summaryResult.innerHTML = `
        <p><strong>Total Cases:</strong> ${summary.total.toLocaleString()}</p>
        <p><strong>Confirmed Cases (Indian):</strong> ${summary.confirmedCasesIndian.toLocaleString()}</p>
        <p><strong>Recovered:</strong> ${summary.discharged.toLocaleString()}</p>
        <p><strong>Deaths:</strong> ${summary.deaths.toLocaleString()}</p>
    `;
}

function displayState(state) {
    regionalResult.innerHTML = `
        <div class="card">
          <h3>${state.loc}</h3>
          <p><strong>Confirmed:</strong> ${state.totalConfirmed.toLocaleString()}</p>
          <p><strong>Recovered:</strong> ${state.discharged.toLocaleString()}</p>
          <p><strong>Deaths:</strong> ${state.deaths.toLocaleString()}</p>
        </div>
    `;
}

async function renderCovid() {
    const data = await fetchCovidIndia();

    displaySummary(data.summary);

    const query = stateInput.value.trim().toLowerCase();
    regionalResult.innerHTML = "";

    if (query) {
        const found = data.regional.find(s => s.loc.toLowerCase() === query);
        if (found) {
            displayState(found);
        } else {
            regionalResult.innerHTML = `<p>❌ State not found</p>`;
        }
    }
}

window.onload = async () => {
    const data = await fetchCovidIndia();
    displaySummary(data.summary);
};