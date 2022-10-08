import { defibank } from "../../declarations/defibank";

window.addEventListener("load", async function () {
  update();
});

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const btn = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(
      document.getElementById("input-amount").value
    );
    const withDrewAmount = parseFloat(
      document.getElementById("withdrawal-amount").value
    );
    btn.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0) {
      await defibank.topUp(inputAmount);
    }
    if (document.getElementById("withdrawal-amount").value.length != 0) {
      await defibank.withDraw(withDrewAmount);
    }

    defibank.compound();
    update();
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    btn.removeAttribute("disabled");
  });

async function update() {
  let currentBalance = await defibank.checkbalance();
  document.getElementById("value").innerText =
    Math.round(currentBalance * 100) / 100;
}
