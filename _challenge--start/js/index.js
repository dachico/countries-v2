async function getCountryPopulation(country) {
  try {
    const url = `https://countriesnow.space/api/v0.1/countries/population`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country }),
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (json?.data?.populationCounts)
      return json.data.populationCounts.at(-1).value;
    else throw new Error(`My Error: no data for ${country}`); //app logic error message
  } catch (err) {
    console.log("Error::", err.message);
    throw err;
  }

  // .catch(err => reject(err)) // network error - server is down for example...
  // // .catch(reject)  // same same, only shorter...
}

// function getCountryPopulation(country){
//     return new Promise((resolve,reject)=> {
//         const url = `https://countriesnow.space/api/v0.1/countries/population`;
//         const options = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({country})
//         };
//         fetch(url,options)
//             .then(res => res.json())
//             .then(json => {
//                 if (json?.data?.populationCounts) resolve(json.data.populationCounts.at(-1).value);
//                 else reject(new Error(`My Error: no data for ${country}`)) //app logic error message
//             })
//             .catch(err => reject(err)) // network error - server is down for example...
//             // .catch(reject)  // same same, only shorter...
//     })
// }

//--------------------------------------------------------
//  Manual - call one by one...
//--------------------------------------------------------
async function manual() {
  try {
    let population = await getCountryPopulation("France");
    console.log(`population of France is ${population}`);
    population = await getCountryPopulation("Germany");
    console.log(`population of Germany is ${population}`);
  } catch (err) {
    console.log("Error in manual: ", err.message);
    throw err;
  }
}
// manual();

//------------------------------
//   Sequential processing
//------------------------------
const countries = [
  "France",
  "Russia",
  "Germany",
  "United Kingdom",
  "Portugal",
  "Spain",
  "Netherlands",
  "Sweden",
  "Greece",
  "Czechia",
  "Romania",
  "Israel",
];

async function sequence() {
  for ( let country of countries)
  try {
    let population = await getCountryPopulation(country);
    console.log(`population of ${country} is ${population}`);
  }catch(err){
    console.error(`Error: no data found for ${country}`);
  }
  console.log("all done! 🏋️");
}
// sequence();

//--------------------------------------------------------
//  Parallel processing
//--------------------------------------------------------
async function parallel() {
  const output = [];

  for (let i = 0; i < countries.length; i++){
    const country = countries[i];

    try {
      let population = await getCountryPopulation(country);
      console.log(`population of ${country} is ${population}`);
      output.push({country , population});
    }catch(err){
      console.error(`Error: no data found for ${country}`);
    }
  }
  console.log("all done! 🏋️");
}
parallel();
