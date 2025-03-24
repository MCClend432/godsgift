let button = document.querySelector(".add-to-payroll");
let cashtag = document.querySelector(".r-tag");
let email = document.querySelector(".r-email");
let Uname = document.querySelector(".r-name");
let masterkey = "$2a$10$5Z8CYzyQKJzCpIWtV7ZAx.Juv1qbvrZH/iHUkZnJog/DwDXtY2GWW";
button.addEventListener("click", () => {
  if (email.value == " " || Uname.value == " " || cashtag.value == " ") {
    return;
  }

  (async () => {
    let goingdata = {
      email: email.value,
      cashtag: cashtag.value,
      name: Uname.value,
    };
    let data = await fetch(
      "https://api.jsonbin.io/v3/b/677ad0f2ad19ca34f8e61200",
      {
        headers: {
          "X-Master-Key": masterkey,
        },
      }
    );
    let Rarray = await data.json();
    Rarray.record.push(goingdata);
    localStorage.setItem("Rarray", JSON.stringify(Rarray));

    fetch("https://api.jsonbin.io/v3/b/677ad0f2ad19ca34f8e61200", {
      method: "PUT",
      headers: {
        "X-Master-Key": masterkey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Rarray.record),
    });
    console.log(Rarray.record);
    alert(`${Uname.value} has been succesfully added to your payroll`);
    email.value = " ";
    cashtag.value = " ";
    Uname.value = " ";
  })();
});
