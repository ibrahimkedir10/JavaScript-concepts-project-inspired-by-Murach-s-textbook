document.addEventListener("DOMContentLoaded", function () {

    function mpg() {

        const miles = document.getElementById("milesDriven");
        const gallons = document.getElementById("gallonsPurchased");
        const submit = document.getElementById("submit");
        const output = document.getElementById("output");

        submit.onclick = function () {
            const mileValue = parseFloat(miles.value);
            const gallonsValue = parseFloat(gallons.value);
            const mpg = mileValue / gallonsValue;
            output.innerHTML = mpg;
            return output;
        }

    }
    mpg();

});