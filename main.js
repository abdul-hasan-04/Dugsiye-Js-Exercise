let form = document.querySelector("form")
let languageSelect = document.querySelectorAll("select");
let translatedTextHolder = document.querySelector(".translated-text");

form.addEventListener("click", async (e) => {
  e.preventDefault();
});

async function getLanguages() {
  let url = "https://smarttranslate-api.p.rapidapi.com/support_language";

  let options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "10161c9bb8msh7d2306b07da83abp1d1aebjsn96c3da5faf6e",
      "x-rapidapi-host": "smarttranslate-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const request = await fetch(url, options);

    // ✅ check HTTP response first
    if (!request.ok) {
      throw new Error(`HTTP error! Status: ${request.status}`);
    }

    const respond = await request.json();
    let listLanguages = respond.languages;
    displayLanguage(listLanguages);
  } catch (error) {
    console.error("Error:", error);
  }
}

// getLanguages();

const displayLanguage = (languages) => {
  for (let key in languages) {
    languageSelect.forEach((lang) => {
      let option = document.createElement("option");
      option.value = `${languages[key]}`;
      option.textContent = languages[key];
      lang.append(option);
    });
  }
};


form.addEventListener("submit",(e) => {
  e.preventDefault();

  console.log("✅ submit working");


});
