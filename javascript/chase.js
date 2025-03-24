import methods from "./methods.js";
const { showLoader } = methods;
const { hideLoader } = methods;
const { load_transaction_history } = methods;
const { showGreenLoader } = methods;
const { hideGreenLoader } = methods;
let restrictedmes = document.querySelector(".account-restricted");
const confirmtransfer = document.querySelector(".confirm-transfer");
let user;

try {
  user = JSON.parse(localStorage.getItem("active-user"));
} catch (error) {
  console.error("Error parsing user data:", error);
  user = null;
}
console.log(user);
if (!user) {
  document.location = "index.html";
}
document.querySelector(".outgoing-transfer").innerHTML = user[0].outgoingamount;
document.querySelector(".user-cash-balance").innerHTML = user[0].balance;
document.querySelector(
  ".greetings"
).innerHTML = ` Welcome ${user[0].user_Name} `;
(async () => {
  const transaction_history = await load_transaction_history("pending");

  let table = document.querySelector("table");
  transaction_history.map((el) => {
    table.innerHTML += `
                        <tr>
                            <td>${el.date}</td>
                            <td>${el.category} </td>
                            <td>${el.type}</td>
                            <td>$${el.amount.toLocaleString()}</td>
                            <td>$${el.balance.toLocaleString()}</td>
                        </tr>
`;
  });
})();

const signoutbtn = document.querySelectorAll(".sign-out-button");
signoutbtn.forEach((button) => {
  button.addEventListener("click", () => {
    showLoader();
    setTimeout(() => {
      localStorage.removeItem("active-user");
      document.location = "index.html";
    }, 2000);
  });
});

// fetch("https://cash.app/$john").then((data) => {
//   console.log(data);
// });
// const number = 2000000;
// const comnum = number.toLocaleString();
// console.log(comnum);
document.querySelectorAll("#cash-balance").forEach((el) => {
  let balance = user[0].balance + 0.02;
  const newbalance = "$" + balance.toLocaleString();
  el.innerHTML = newbalance;
});
function cashapp() {
  let screen = document.querySelector(".cash-amount-screen");
  let amountString = " ";
  let amount;
  let newstring;
  let newamount;
  document.querySelectorAll(".input-buttons").forEach((button) => {
    button.addEventListener("click", () => {
      let data = button.innerHTML;
      amountString += data;
      amount = Number(amountString);
      if (amount > 50000) {
        amountString = " ";
      }
      newstring = amount.toLocaleString();
      if (newstring == "NaN") {
        amountString = " ";
        return;
      }
      screen.innerHTML = newstring;
    });
  });
  document.querySelector("#cancel").addEventListener("click", () => {
    amountString = amountString.slice(0, -1);
    newstring = newstring.slice(0, -1);
    newamount = amount.toString();
    let newamount2 = newamount.slice(0, -1);

    screen.innerHTML = newstring;

    amount = newstring;
    amount = Number(newstring.replace(/[^\d.-]/g, ""));
  });
  document.querySelector(".pay").addEventListener("click", () => {
    document.querySelector(".cash-transfer").classList.remove("hide-item");

    document.querySelector(".cashapp-home").classList.remove("view-item-block");
    document.querySelector(".cashapp-home").classList.add("hide-item");
    showGreenLoader();
    setTimeout(() => {
      document.querySelector(".transfering-amount").innerHTML = `$${amount}`;
      hideGreenLoader();
    }, 1000);
  });
}
cashapp();

document.querySelector(".load-more").addEventListener("click", () => {
  document.querySelector(".bottom-second-container").style =
    "overflow-y:scroll";
});
document
  .querySelector(".close-account-restricted")
  .addEventListener("click", () => {
    restrictedmes.classList.remove("view-item-block");
    restrictedmes.classList.add("hide-item");
  });
document.querySelector("#tocashapp").addEventListener("click", () => {
  showGreenLoader();

  setTimeout(() => {
    hideGreenLoader();
    if (user[0].outstatus == "Pending") {
      restrictedmes.classList.remove("hide-item");
      restrictedmes.classList.add("view-item-block");

      document.querySelector(".failed-message").innerHTML = `
        <h2>Sorry transactions can't be made at this moment</h2>
            <p>
                Please complete your transaction with ${user[0].outto}
            </p>`;
      return;
    }
    document.querySelector(".cash-app").classList.remove("hide-item");
    document.querySelector(".cash-app").classList.add("view-item");
  }, 1000);
});

const pinInputs = document.querySelectorAll(".pin-container input");

pinInputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    if (e.target.value.length === 1 && index < 3) {
      if (e.key * 1 == "NaN") {
        return;
      }
      pinInputs[index + 1].focus();
    }
  });
  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[a-zA-Z]/g, "");
  });
});
document
  .querySelector(".cash-pin-confirm-transaction button ")
  .addEventListener("click", () => {
    const tDetails = JSON.parse(localStorage.getItem("transaction"));

    let amount = document.querySelector(".transfering-amount").innerHTML;
    let pin =
      document.querySelector("#pin1").value +
      document.querySelector("#pin2").value +
      document.querySelector("#pin3").value +
      document.querySelector("#pin4").value;
    console.log(pin, user[0].pin);
    // if (pin != user[0].pin) {
    //   window.alert("incorrect pin");
    //   return;
    // }
    showGreenLoader();
    setTimeout(() => {
      hideGreenLoader();
      document.querySelector(".cash-transfer").classList.add("hide-item");
      document.querySelector(".receipt").classList.remove("hide-item");
      document.querySelector(".receipt").classList.add("view-item-block");

      let newGoingamount = Number(amount.slice(1));
      let outamount = "$" + newGoingamount.toLocaleString();
      const apiKey =
        "$2a$10$5Z8CYzyQKJzCpIWtV7ZAx.Juv1qbvrZH/iHUkZnJog/DwDXtY2GWW";
      const apiURL = "https://api.jsonbin.io/v3/b/676a9c37e41b4d34e46a77fc";
      user[0].balance -= newGoingamount;
      user[0].outgoingamount = outamount;
      user[0].outto = tDetails[0].name;
      user[0].outstatus = "Pending";

      let posting = JSON.stringify(user);
      console.log(posting);

      fetch(`${apiURL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-master-key": apiKey,
        },

        body: posting,
      })
        .then((response) => response.json)
        .then((data) => console.log(data));
      localStorage.removeItem("active-user");

      localStorage.setItem("active-user", posting);
      document.querySelector(".receipt").innerHTML = `
       <div class="success-image">
      <img src="./assets/done.png">
  </div>
  <div class="receiver">
      You sent ${amount} to ${tDetails[0].name}
  </div>
  <div class="done"><button onclick="location.reload()">Done</button></div>
      `;
    }, 2000);
  });

const apiKey = "$2a$10$5Z8CYzyQKJzCpIWtV7ZAx.Juv1qbvrZH/iHUkZnJog/DwDXtY2GWW";
const response = await fetch(
  "https://api.jsonbin.io/v3/b/677ad0f2ad19ca34f8e61200/latest",
  {
    headers: {
      "X-master-key": apiKey,
    },
  }
);
let data = await response.json();
let users = await data.record;

let gettingtag = document.querySelector("#cashtag");
gettingtag.addEventListener("keydown", async (e) => {
  let information;
  let container = document.querySelector(".cash-transfer-bottom");
  users.map((el) => {
    let searching = gettingtag.value;
    information = el.email + el.cashtag;
    if (information.includes(searching)) {
      container.innerHTML = `
      <div class="receipient" data-name="${el.name}" data-tag="${el.cashtag}">

                          <p class="receipient-name">
                              ${el.name}
                          </p>
                          <p class="receipient-email">
                              ${el.email}
                          </p>
                      </div>
    `;
    }

    const receipient = document.querySelector(".receipient");
    receipient.addEventListener("click", () => {
      let name = receipient.dataset.name;
      let tag = receipient.dataset.tag;
      gettingtag.value = tag;
      confirmtransfer.classList.remove("button-disabled");
      const transactiondetails = [
        {
          name,
          tag,
        },
      ];
      localStorage.setItem("transaction", JSON.stringify(transactiondetails));
    });
  });
});
confirmtransfer.addEventListener("click", () => {
  if (confirmtransfer.classList.contains("button-disabled")) {
    return;
  }
  document.querySelector(".cash-pin-confirm").classList.remove("hide-item");
});
