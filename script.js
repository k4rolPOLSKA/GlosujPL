const API_KEY = "$2a$10$9DqQ0FVw3E7VMLQfTky0m.dGK/dfEG5KKNafbyH2eUnjTJvfQbjLm";
const BIN_ID = "69d2701536566621a87f7910";

async function getVotes() {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": API_KEY }
    });
    const data = await res.json();
    return data.record;
}

async function vote(option) {
    let data = await getVotes();

    data[option]++;

    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify(data)
    });

    alert("Zagłosowano!");
    showVotes();
}

async function showVotes() {
    let data = await getVotes();

    document.getElementById("wyniki").innerHTML =
        `A: ${data.A} | B: ${data.B}`;
}
