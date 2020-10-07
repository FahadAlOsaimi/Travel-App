async function geo(city, country) {
  await fetch("http://localhost:5500/geoNames", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city: city, country: country }),
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
    });
}

export { geo };
