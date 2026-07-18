const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("historyList");
const themeBtn = document.getElementById("themeBtn");

// Theme Toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});

// Calculator Buttons
buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        switch (value) {

            case "AC":
                display.value = "";
                break;

            case "DEL":
                display.value = display.value.slice(0, -1);
                break;

            case "=":

                calculate();

                break;

            default:

                display.value += value;

        }

    });

});

// Calculate Function

function calculate() {

    try {

        let expression = display.value.replace(/%/g, "/100");

        const result = eval(expression);

        historyList.innerHTML =
            `<li>${display.value} = ${result}</li>` +
            historyList.innerHTML;

        display.value = result;

    }

    catch {

        display.value = "Error";

        setTimeout(() => {

            display.value = "";

        }, 1000);

    }

}

// Keyboard Support

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {

        display.value += key;

    }

    else if (key === "Enter") {

        e.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        display.value = display.value.slice(0, -1);

    }

    else if (key === "Escape") {

        display.value = "";

    }

});                    