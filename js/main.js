'use strict';

const ul = document.getElementById("sarjalista");
const hakuteksti = document.getElementById("hakuteksti");
const hakunappi = document.getElementById("hakunappi");

const haeTVSarja = async (haku) => {
  ul.innerHTML += '';
  const fetchOptions = {
    /*method: 'GET',
    headers: {
      'content-type': 'applicagtion/json',
      'Authorization': 'Bearer: tähän',
    },
    body: JSON.stringify(objekti)*/
  };
  try {
    const vastaus = await fetch('http://api.tvmaze.com/search/shows?q=' +haku, /*fetchOptions*/);
    if (!vastaus.ok) throw new Error('jokin meni pieleen');
    const sarjat = await vastaus.json();
    console.log(sarjat);
    sarjat.forEach((sarja)=>{
      ul.innerHTML += `
      <li>
      <h2>${sarja.show.name}</h2>
      <a href="${sarja.show.officialSite}">Linkki kotisivulle</a>
      <img src="${sarja.show.image === null? 'http://placekitten.com/320/200' : 
          sarja.show.image.medium}" alt="${sarja.show.name}">
      <p>${sarja.show.summary}</p>
      </li>
        `;
    });
  } catch (error) {
    console.log(error);
  }
};

hakunappi.addEventListener("click", function() {
  let hakuvalue = hakuteksti.value;
  console.log("Hakusana: " +hakuvalue);
  haeTVSarja(hakuvalue);
});


