import methods from "./methods.js";
const { showLoader, hideLoader, hidecashapp } = methods;

let accounts = document.querySelector(".first-container");
let secondCont = document.querySelector(".second-container");
let cashbank = document.querySelector(".top-second-container");
let history = document.querySelector(".bottom-second-container");
let headers = document.querySelector(".mobile-headers");
let seestatement = document.querySelector(".see-statement");
let toaccounts = document.querySelector(".toaccounts");
let tocashbank = document.querySelector(".tocashbank");
seestatement.addEventListener("click", () => {
  showLoader();
  hidecashapp();
  setTimeout(() => {
    headers.innerHTML = "Payment history";
    accounts.style = "display:none";
    secondCont.style = "display:block";
    history.style = "display:block !important";
    cashbank.style = "display:none";
    hideLoader();
    toaccounts.classList.remove("active-link-reg");
    tocashbank.classList.remove("active-link-reg");
    seestatement.classList.add("active-link");
  }, 1000);
});

toaccounts.addEventListener("click", () => {
  showLoader();
  hidecashapp();
  setTimeout(() => {
    headers.innerHTML = "Accounts";
    accounts.style = "display:block";
    secondCont.style = "display:none";
    history.style = "display:block !important";
    cashbank.style = "display:none !important";
    hideLoader();
    toaccounts.classList.add("active-link-reg");
    tocashbank.classList.remove("active-link-reg");
    seestatement.classList.remove("active-link");
  }, 1000);
});
tocashbank.addEventListener("click", () => {
  showLoader();
  hidecashapp();
  setTimeout(() => {
    headers.innerHTML = "Pay & Transfer";
    accounts.style = "display:none";
    secondCont.style = "display:block";
    history.style = "display:none !important";
    cashbank.style = "display:block !important";
    hideLoader();
    toaccounts.classList.remove("active-link-reg");
    tocashbank.classList.add("active-link-reg");
    seestatement.classList.remove("active-link");
  }, 1000);
});
