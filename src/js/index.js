// get domain value from the input, put it into the url and send the request.
// first is adding event listener and getting the name and then updating the url and running the request.
const domainInput = document.getElementById("domain-name");
const sumbitButton = document.querySelector(".submit-button");
const container = document.querySelector(".content-container");
const heading = document.querySelector(".heading-text");
const loader = document.querySelector("#loader");
const overlay = document.querySelector(".overlay");
const plusBtn = document.querySelector(".menu-button");
const plus = plusBtn.childNodes[1];
const gitLink = document.querySelector(".git-link");
const container2 = document.querySelector(".container-2");

// adding event listener for changin the icon
plusBtn.addEventListener("click", function (e) {
  if (gitLink.classList.contains("noActive")) {
    plus.name = "remove-circle-outline";
    gitLink.className = "git-link activate";
  } else {
    gitLink.className = "git-link noActive";
    plus.name = "add-circle-outline";
  }
});

sumbitButton.addEventListener("click", submitUrl);

// regex for domain validity
const regexDomain =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

const domainSearchUrl =
  "https://api.tomba.io/v1/domain-search?domain=stripe.com";

function submitUrl(e) {
  if (domainInput.value.length === 0) {
    domainInput.setCustomValidity("I am expecting an e-mail address!");
    domainInput.reportValidity();
  } else {
    const url = domainInput.value;
    const regUrl = regexDomain.test(url);
    if (regUrl) {
      e.preventDefault();
      console.log(regUrl);
      runFetching(url);
      domainInput.value = "";
      domainInput.blur();
      domainInput.setCustomValidity("");
    } else {
      domainInput.setCustomValidity("Please enter valid URL");
    }
  }
}

const data = {
  organization: {
    location: null,
    social_links: null,
    disposable: false,
    webmail: true,
    website_url: "gmail.com",
  },
  emails: [],
};
// next step is putting the url to the the end of the domain.
function runFetching(url) {
  const SearchUrl = `https://api.tomba.io/v1/domain-search?domain=${url}`;

  const request = new XMLHttpRequest();
  request.addEventListener("load", function () {
    const { data } = JSON.parse(this.responseText);
    console.log(this.responseText);
    if (data.emails.length > 0) {
      createDom(data);
      console.log("Data is valid");
    } else {
      loader.className = "hide-loader";
      overlay.style.display = "none";
      container2.innerHTML = "";
      alert(`sorry, we couldn't find ${url} data.`);
    }
  });

  request.open("GET", SearchUrl);
  request.setRequestHeader("content-type", "application/json");
  request.setRequestHeader(
    "X-Tomba-Key",
    "ta_9ec34bdc7d2005e9a93ede63cb62341bf1425"
  );
  request.setRequestHeader(
    "X-Tomba-Secret",
    "ts_8d5210c5-fb4e-4c7d-8f5d-4a3581c18a73"
  );
  request.send();
  loader.className = "loader";
  overlay.style.display = "block";
}

const html = ` <div class="search-result-div">
<div class="email-Box">
  <h1>Email List</h1>
  <div class="email-results">
  <div class="email-content">
  <div class="email-info">
      <p>Email: <a href="mailto:#" class="email-link"/>mianzawar@gmail.com</a></p>
      <p>Position: <span class="position email-span">Senior Manager</span></p>
      <p>Last Updated: <span class="last-date email-span">2022-5-18</span></p>
  </div>
  <div class="linkedin-icon">
      <a href="#" target="_blank"><ion-icon name="logo-linkedin"></ion-icon></a>
  </div>
</div>
    
  </div>
</div>
<div class="orgainzation-result">
  <div class="organization">
      <h2>Domain Information</h2>
      <div class="about-domain">
          <p>Website Url: <span class="organization-data url">dawn.com</span></p>
          <p>Organization: <span class="organization-data url">DAWN International inc.</span></p>
          <p>Contact No: <span class="organization-data contact">+923000414720</span></p>
          <p>Industry: <span class="organization-data news">Newspaper</span></p>
          <div>
          <div class="organization-social-icons">
              <a href="#" target="_blank"><ion-icon name="logo-linkedin"></a>
                  <a href="#" target="_blank"><ion-icon name="logo-twitter"></ion-icon></a>
                  <a href="#" target="_blank"><ion-icon name="logo-facebook"></ion-icon></a>
                  
          </div>
  </div>
</div>
</div>`;

const backBonehtml = `<div class="search-result-div">
<div class="email-Box">
  <h2>Organization Email List:</h2>
  <div class="email-results">
  </div>
  </div>
  <div class="orgainzation-result">
  </div>
  </div>
  `;

function createSkelton(html) {
  heading.innerHTML = "";
  container2.innerHTML = "";
  container2.innerHTML = html;
}

function createDom(data) {
  createSkelton(backBonehtml);
  const emailBody = document.querySelector(".email-results");
  const orgBody = document.querySelector(".orgainzation-result");
  const org = data.organization;
  const emails = data.emails;
  if (Array.isArray(emails)) {
    for (let x = 0; x < emails.length; x++) {
      const emailUI = ` <div class="email-content">
  <div class="email-info">
      <p>Email: <a href="mailto:${emails[x].email}" class="email-link"/>${
        emails[x].email
      }</a></p>
      <p>Position: <span class="position email-span">${
        emails[x].position ? emails[x].position : "Data not available"
      }</span></p>
      <p>Last Updated: <span class="last-date email-span">${emails[
        x
      ].last_updated.slice(0, 10)}</span></p>
  </div>
  <div class="linkedin-icon">
      <a href="${emails[x].linkedin}" target="_blank" aria-disabled="${
        emails[x].linkedin ? "false" : "true"
      }" class="${emails[x].linkedin ? "" : "disabled"}"><ion-icon class="${
        emails[x].linkedin ? emails[x].linkedin : "disabled"
      }" name="logo-linkedin"></ion-icon></a>
  </div>
</div>`;
      emailBody.innerHTML += emailUI;
    }
  }
  const domainUI = `
  <div class="organization">
      <h2>Domain Information</h2>
      <div class="about-domain">
          <p>Website Url: <a href="${
            org.website_url
          }"><span class="organization-data url">${
    org.website_url
  }</span></a></p>
          <p>Organization: <span class="organization-data url">${
            org.organization
          }</span></p>
          <p>Contact No: <a href="tel${
            org.phone_number
          }"><span class="organization-data contact">${
    org.phone_number
  }</span></a></p>
          <p>Industry: <span class="organization-data news">${
            org.industries
          }</span></p>
          <div>
          <div class="organization-social-icons">
              <a href="${org.social_links.linkedin_url}" class="${
    org.social_links.linkedin_url ? "" : "org-disabled"
  }" target="_blank"><ion-icon name="logo-linkedin"></a>
                  <a href="${org.social_links.twitter_url}" class="${
    org.social_links.twitter_url ? "" : "org-disabled"
  }" target="_blank"><ion-icon name="logo-twitter"></ion-icon></a>
                  <a href="${org.social_links.facebook_url}" class="${
    org.social_links.facebook_url ? "" : "org-disabled"
  }" target="_blank"><ion-icon name="logo-facebook"></ion-icon></a>
          </div>
  </div>`;
  orgBody.innerHTML = domainUI;
  loader.className = "hide-loader";
  overlay.style.display = "none";
}
