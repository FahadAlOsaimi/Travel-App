import moment, { min } from "moment"; // To deal with the dates easily.
let cityName;
let countryName;
let tripDate;
let endDate;
let diff;
let diff2;
let weatherData;
let pixData;
let savedTrips;
async function handle() {
  cityName = document.getElementById("city").value;
  countryName = document.getElementById("country").value;
  tripDate = document.getElementById("date").value;
  endDate = document.getElementById("date-end").value;
  const currentDate = new Date();
  diff = moment(tripDate).diff(currentDate, "days");
  diff2 = moment(endDate).diff(tripDate, "days");

  if (diff > 16) {
    alert("The trip is too far please choose a closer one.");
  } else if (diff < 0) {
    alert("You can't go back to the past! :D");
  } else {
    await Client.geo(cityName, countryName);
    await weather();
    await pix();
    updateUI();
  }
}

// To run on submission.
document.getElementById("generate").addEventListener("click", () => {
  handle();
});

//document.getElementById("save").addEventListener("click", () => {});

function updateUI() {
  for (let i = 0; i < 16; i++) {
    if (moment(tripDate).isSame(weatherData.data[i].valid_date)) {
      document.getElementById("destination").innerHTML =
        "Destination, info: " +
        countryName +
        ", " +
        cityName +
        " ( " +
        diff +
        " days left ) " +
        "And it is " +
        diff2 +
        " days Long.";
      document.getElementById("high").innerHTML =
        "Highest temperature » " + weatherData.data[i].max_temp;
      document.getElementById("lowest").innerHTML =
        "Lowest temperature » " + weatherData.data[i].low_temp;
      document.getElementById("desc").innerHTML =
        "Description » " + weatherData.data[i].weather.description;
    }
  }

  document.getElementById("load").setAttribute("src", pixData.hits[0].webformatURL);
}

async function weather() {
  await fetch("http://localhost:5500/weatherBit", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .then(function (res) {
      weatherData = res;
      console.log(weatherData);
    });
}

async function pix() {
  await fetch("http://localhost:5500/pix", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city: cityName }),
  })
    .then((res) => res.json())
    .then(function (res) {
      pixData = res;
      console.log(pixData);
    });
}

export { handle };
