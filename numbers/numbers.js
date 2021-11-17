const numbersUrl = "http://numbersapi.com";


/********************************************************
 * Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.
 ********************************************************/

// async function getNumberFact(number) {
//     const res = await axios.get(`${numbersUrl}/${number}?json`);
//     const fact = res.data.text;
//     $("#fact-list").append(`<li>${fact}</li>`);
// }



/********************************************************
 * Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
********************************************************/

// async function getManyNumberFacts(num1, num2) {
//     const res = await axios.get(`${numbersUrl}/${num1}..${num2}?json`);
//     const factObj = res.data;
//     for (const number in factObj) {
//         $("#fact-list").append(`<li>${factObj[number]}</li>`);
//     }
// }



/********************************************************
 * Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
 ********************************************************/

async function getFourFacts(number) {
    let numberFacts = await Promise.all([
        axios.get(`${numbersUrl}/${number}?json`),
        axios.get(`${numbersUrl}/${number}?json`),
        axios.get(`${numbersUrl}/${number}?json`),
        axios.get(`${numbersUrl}/${number}?json`)
    ])

    numberFacts.forEach(f => {
        const fact = f.data.text;
        $("#fact-list").append(`<li>${fact}</li>`);
    });
}
