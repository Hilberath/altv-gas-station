let fuelSelected = false;
let isPumping = false;
let pumpInterval = null;
let litersPumped = 0;
let pricePerLiter = 0;
let startTime = null;
const litersPerMillisecond = 1 / 1000;

function selectFuel(fuelType, price) {
  if (fuelSelected) return;

  pricePerLiter = price;
  document.getElementById("price-per-liter").textContent = price.toFixed(2);
  document.getElementById(`${fuelType}-img`).style.visibility = "hidden";
  document.getElementById(`${fuelType}-hr`).style.visibility = "hidden";

  if (fuelType === "benzin") {
    const benzinHeader = document.querySelector(".benzin p");
    benzinHeader.classList.add("glow-effect");
    benzinHeader.style.color = "white";
  } else if (fuelType === "diesel") {
    const dieselHeader = document.querySelector(".diesel p");
    dieselHeader.classList.add("glow-effect");
    dieselHeader.style.color = "white";
  } else if (fuelType === "strom") {
    const stromHeader = document.querySelector(".strom p");
    stromHeader.classList.add("glow-effect");
    stromHeader.style.color = "white";
  } else if (fuelType === "gas") {
    const gasHeader = document.querySelector(".gas p");
    gasHeader.classList.add("glow-effect");
    gasHeader.style.color = "white";
  }

  fuelSelected = true;
}

function togglePump() {
  const btn = document.getElementById("start-stop-btn");

  if (!fuelSelected) {
    document.querySelectorAll(".item-two img").forEach((img) => img.classList.add("glow-effect"));
    document.querySelectorAll(".item-two hr").forEach((hr) => hr.classList.add("glow-effect-hr"));

    setTimeout(() => {
      document.querySelectorAll(".item-two img").forEach((img) => img.classList.remove("glow-effect"));
      document.querySelectorAll(".item-two hr").forEach((hr) => hr.classList.remove("glow-effect-hr"));
    }, 500);

    alert("Bitte wählen Sie zuerst eine Zapfpistole aus!");
    return;
  }

  if (!isPumping) {
    btn.textContent = "Tankvorgang Stoppen";
    btn.classList.remove("start-gradient", "pay-gradient");
    btn.classList.add("stop-gradient");
    startPumping();
  } else {
    btn.textContent = "Bezahlen";
    btn.classList.remove("stop-gradient", "start-gradient");
    btn.classList.add("pay-gradient");
    stopPumping();
  }
}

function startPumping() {
  isPumping = true;
  startTime = Date.now();

  pumpInterval = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    litersPumped = elapsedTime * litersPerMillisecond;
    const amount = litersPumped * pricePerLiter;

    document.getElementById("liter").textContent = litersPumped.toFixed(2);
    document.getElementById("betrag").textContent = amount.toFixed(2);
  }, 10);
}

function stopPumping() {
  clearInterval(pumpInterval);
  isPumping = false;

  document.querySelectorAll(".item-two img").forEach((img) => (img.style.visibility = "visible"));
  document.querySelectorAll(".item-two hr").forEach((hr) => (hr.style.visibility = "visible"));

  document.getElementById("start-stop-btn").onclick = showPaymentPopup;
}

function showPaymentPopup() {
  document.getElementById("payment-popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("payment-popup").classList.add("hidden");
}

function pay(method) {
  alert(`Sie haben mit ${method === "cash" ? "Barzahlung" : "Kartenzahlung"} bezahlt.`);
  closePopup();
}
