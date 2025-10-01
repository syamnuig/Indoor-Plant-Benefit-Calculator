const plantData = {
  "Calathea": { oxygen: 4, carbon: 0.18, savings: 1.3, wellbeing: 5, airPurity: 4,sleepSupport: 5 },
  "Eucalyptus": { oxygen: 9, carbon: 0.38, savings: 2.4, wellbeing: 3, airPurity: 4,sleepSupport: 2 },
  "Philodendron": { oxygen: 6, carbon: 0.26, savings: 1.9, wellbeing: 4, airPurity: 4,sleepSupport: 3 },
  "Money Plant": { oxygen: 5, carbon: 0.22, savings: 1.6, wellbeing: 3, airPurity: 4,sleepSupport: 3 },
  "Snake Plant": { oxygen: 5, carbon: 0.2, savings: 1.5, wellbeing: 3, airPurity: 4,sleepSupport: 5 },
  "Weeping Fig": { oxygen: 8, carbon: 0.3, savings: 2.0, wellbeing: 4, airPurity: 4,sleepSupport: 2 },
  "Golden Pothos": { oxygen: 6, carbon: 0.25, savings: 1.8, wellbeing: 3, airPurity: 5,sleepSupport: 3 },
  "Bird’s Nest Fern": { oxygen: 4, carbon: 0.15, savings: 1.2, wellbeing: 4, airPurity: 3,sleepSupport: 2 },
  "English Ivy": { oxygen: 7, carbon: 0.28, savings: 1.6, wellbeing: 3, airPurity: 5,sleepSupport: 2 },
  "Peace Lily": { oxygen: 6, carbon: 0.22, savings: 1.7, wellbeing: 5, airPurity: 5,sleepSupport: 5 },
  "Kentia Palm": { oxygen: 9, carbon: 0.35, savings: 2.2, wellbeing: 5, airPurity: 4,sleepSupport: 3 },
  "Dragon Tree": { oxygen: 5, carbon: 0.2, savings: 1.5, wellbeing: 4, airPurity: 4,sleepSupport: 2 },
  "Monstera": { oxygen: 7, carbon: 0.3, savings: 2.0, wellbeing: 5, airPurity: 4,sleepSupport: 3 },
  "Olive Tree": { oxygen: 10, carbon: 0.4, savings: 2.5, wellbeing: 2, airPurity: 2,sleepSupport: 1 },
  "Prayer Plant": { oxygen: 4, carbon: 0.18, savings: 1.3, wellbeing: 4, airPurity: 3,sleepSupport: 4 },
  "Bamboo Palm": { oxygen: 8, carbon: 0.32, savings: 2.1, wellbeing: 5, airPurity: 5,sleepSupport: 4 }
};

const plantInputs = document.getElementById("plantInputs");
const maxPlants = 10;

function createPlantSelectors() {
  const species = Object.keys(plantData);
  plantInputs.innerHTML = "";
  for (let i = 0; i < maxPlants; i++) {
    const div = document.createElement("div");
    div.className = "row";
    div.innerHTML = `
      <div>
        <label>Plant ${i + 1}</label>
        <select id="plant${i}">
          <option value="">— Select —</option>
          ${species.map(p => `<option value="${p}">${p}</option>`).join("")}
        </select>
      </div>
      <div>
        <label>Number of plants</label>
        <input id="count${i}" type="number" value="0" min="0" />
      </div>
    `;
    plantInputs.appendChild(div);
  }
}

function fmt(v) {
  return isFinite(v) ? v.toFixed(1) : "—";
}

function getAirQualityDescription(score) {
  if (score <= 10) return "Minimal impact — your air could benefit from more purifying plants.";
  if (score <= 25) return "Moderate improvement — your plants are helping clean the air.";
  if (score <= 40) return "Strong purification — your indoor air is noticeably fresher.";
  return "Exceptional — your plant setup is a natural air filtration system.";
}

function getSleepSupportDescription(score) {
  if (score <= 10) return "Low support — consider adding calming plants to improve sleep.";
  if (score <= 25) return "Moderate support — your plants contribute to a restful environment.";
  if (score <= 40) return "Strong support — your space promotes deep relaxation.";
  return "Exceptional — your plant setup is a sleep sanctuary.";
}

function getWellnessBadge(score) {
  if (score <= 10) return { badge: "🪴 Starter Sprout", text: "Minimal impact — consider adding more greenery." };
  if (score <= 25) return { badge: "🌿 Green Guardian", text: "Moderate benefit — your plants are helping!" };
  if (score <= 40) return { badge: "🌱 Zen Zone", text: "Strong impact — your space is thriving." };
  return { badge: "🌳 Air Hero", text: "Exceptional — your home is a botanical sanctuary!" };
 }

function calculate() {
  let totalOxygen = 0, totalCarbon = 0, totalSavings = 0;

  for (let i = 0; i < maxPlants; i++) {
    const plant = document.getElementById(`plant${i}`).value;
    const count = parseInt(document.getElementById(`count${i}`).value);
    if (plant && count > 0) {
      const data = plantData[plant];
      totalOxygen += data.oxygen * count;
      totalCarbon += data.carbon * count;
      totalSavings += data.savings * count;
    }
  }
    
  function getNextBadgeGap(score) {
	if (score < 11) return 11 - score;
	if (score < 26) return 26 - score;
	if (score < 41) return 41 - score;
	return 0;
  }
  
  let totalWellbeing = 0;
  let totalAirQuality = 0;
  let totalSleepSupport = 0;
  for (let i = 0; i < maxPlants; i++) {
	const plant = document.getElementById(`plant${i}`).value;
	const count = parseInt(document.getElementById(`count${i}`).value);
	if (plant && count > 0) {
		const data = plantData[plant];
		totalOxygen += data.oxygen * count;
		totalCarbon += data.carbon * count;
		totalSavings += data.savings * count;
		totalWellbeing += data.wellbeing * count;
		totalAirQuality += data.airPurity * count;
		totalSleepSupport += data.sleepSupport * count;
	}
  }
  
  const wellness = getWellnessBadge(totalWellbeing);
  const nextGap = getNextBadgeGap(totalWellbeing);
  const airGap = getNextBadgeGap(totalAirQuality);
  const sleepGap = getNextBadgeGap(totalSleepSupport);

  document.getElementById("airQualityDescription").textContent = getAirQualityDescription(totalAirQuality);
  document.getElementById("sleepSupportDescription").textContent = getSleepSupportDescription(totalSleepSupport);
  document.getElementById("outNextBadge").textContent = nextGap > 0 ? `${nextGap} more points` : "Max badge achieved";
  document.getElementById("wellnessDescription").textContent = `${wellness.badge} ${wellness.text}`;
  document.getElementById("outWellbeing").textContent = fmt(totalWellbeing);
  document.getElementById("outOxygen").textContent = fmt(totalOxygen) + " g";
  document.getElementById("outCarbon").textContent = fmt(totalCarbon) + " kg";
  document.getElementById("outSavings").textContent = "€" + fmt(totalSavings);
  document.getElementById("outAirQuality").textContent = fmt(totalAirQuality);
  document.getElementById("outSleepSupport").textContent = fmt(totalSleepSupport);
  document.getElementById("outAirNext").textContent = airGap > 0 ? `${airGap} more points` : "Max badge achieved";
  document.getElementById("outSleepNext").textContent = sleepGap > 0 ? `${sleepGap} more points` : "Max badge achieved";
  
  drawChart(totalOxygen, totalCarbon, totalSavings);
}


function reset() {
  createPlantSelectors();
  document.getElementById("outOxygen").textContent = "—";
  document.getElementById("outCarbon").textContent = "—";
  document.getElementById("outSavings").textContent = "—";
  document.getElementById("chart").innerHTML = "";
}

document.getElementById("calculateBtn").addEventListener("click", calculate);
document.getElementById("resetBtn").addEventListener("click", reset);

createPlantSelectors();