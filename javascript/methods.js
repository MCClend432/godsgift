const methods = {
  showLoader: () => {
    document.querySelector(".loader-container").classList.add("view-loader");
    document.querySelector(".loader-container").classList.remove("hide-loader");
  },

  hideLoader: () => {
    document.querySelector(".loader-container").classList.remove("view-loader");
    document.querySelector(".loader-container").classList.add("hide-loader");
  },
  showGreenLoader: () => {
    document
      .querySelector(".green-loader-container")
      .classList.add("view-loader");
    document
      .querySelector(".green-loader-container")
      .classList.remove("hide-loader");
  },

  hideGreenLoader: () => {
    document
      .querySelector(".green-loader-container")
      .classList.remove("view-loader");
    document
      .querySelector(".green-loader-container")
      .classList.add("hide-loader");
  },
  logindetails: () => {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let details = {
      username,
      password,
    };
    return details;
  },
  
  load_transaction_history: async () => {
    const apiKey =
      "$2a$10$5Z8CYzyQKJzCpIWtV7ZAx.Juv1qbvrZH/iHUkZnJog/DwDXtY2GWW";
    let apiURL = " https://api.jsonbin.io/v3/b/677411bfe41b4d34e46df3c9";
    const history = await fetch(`${apiURL}/latest`, {
      headers: {
        "X-Master-key": apiKey,
      },
    });
    let transaction_history = await history.json();
    return transaction_history.record;
  },
  hidecashapp: () => {
    const cashapp = document.querySelector(".cash-app");
    if (cashapp.classList.contains("view-item")) {
      cashapp.classList.remove("view-item");
      cashapp.classList.add("hide-item");
    }
  },
};
export default methods;
