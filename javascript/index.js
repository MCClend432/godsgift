import methods from "./methods.js";
const { hideLoader } = methods;
const { showLoader } = methods;
const { logindetails } = methods;
const loginInput = document.querySelector(".login-inputs");
const signInbtn = document.querySelector(".sign-in-button");
function removerIerror() {
  username.addEventListener("keydown", (event) => {
    if (event.key !== "spacebar") {
      if (loginInput.classList.contains("inputError")) {
        document.querySelector("#usernameNote").innerHTML = "";
        document.querySelector("#passwordNote").innerHTML = "";
        loginInput.classList.remove("inputError");
      }
    }
  });
}
removerIerror();
signInbtn.addEventListener("click", () => {
  const apiKey = "$2a$10$5Z8CYzyQKJzCpIWtV7ZAx.Juv1qbvrZH/iHUkZnJog/DwDXtY2GWW";
  const apiURL = "https://api.jsonbin.io/v3/b/676a9c37e41b4d34e46a77fc";
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");

  if (username.value == "" || password.value == "") {
    document.querySelector(
      "#usernameNote"
    ).innerHTML = ` <i class='bx bxs-error-circle'></i> <span> Please tell us your username </span>`;
    document.querySelector(
      "#passwordNote"
    ).innerHTML = ` <i class='bx bxs-error-circle'></i> <span> Please tell us your password </span>`;
    loginInput.classList.add("inputError");
    return;
  }
  (async () => {
    let database;
    showLoader();
    const data = await fetch(`${apiURL}/latest`, {
      headers: {
        "X-Master-Key": apiKey,
      },
    });

    if (data.status) {
      hideLoader();
    }
    database = await data.json();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let user = " ";
    database.record.map((data) => {
      if (username == data.username && password == data.password) {
        user = data;
        console.log(user);
        const activeuser = [
          {
            username: user.username,
            password: user.password,
            logStatus: "active",
            balance: user.balance,
            user_Name: user.user_Name,
            pin: user.pin,
            outgoingamount: 0,
            outto: " ",
            outstatus: " ",
          },
        ];

        localStorage.setItem("active-user", JSON.stringify(activeuser));
        document.location = "cha.html";
        return;
      }
      if (username !== data.username && password !== data.password) {
        document.querySelector(".login-noti").innerHTML = `
        <i class='bx bxs-error-circle'></i> <span>We can't find that username and password. Try again.</span>`;
        return;
      }
      document.querySelector(".login-noti").innerHTML = `
      <i class='bx bxs-error-circle'></i> <span>Incorrect username or password.</span>`;
    });
  })();
});
