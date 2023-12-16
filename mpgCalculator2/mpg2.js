document.addEventListener("DOMContentLoaded", function () {

    //assigning id to varable 
    const destination = document.getElementById("inputDestination");
    const miles = document.getElementById("inputMilesDriven");
    const gallons = document.getElementById("inputGallonsUsed");
    const addTrip = document.getElementById("addTrip");
    const tripLog = document.getElementById("tripLog");
    const clear = document.getElementById("clear");

    addTrip.onclick = function () {
        const milesValue = parseFloat(miles.value)
        const gallonValue = parseFloat(gallons.value);
        if (isNaN(milesValue) || isNaN(gallonValue) || gallonValue == 0) {
            alert("Enter In Information");
        } else {
            const mpg = (milesValue / gallonValue);
            tripLog.value += destination.value + " " + mpg.toFixed(2) + " " + "\n";
            // Save to localStorage with the key "tripLog"
            localStorage.setItem("tripLog", tripLog.value);
        }

    }

    clear.onclick = function () {
        tripLog.value = "";
        destination.value = " ";
        miles.value = "0";
        gallons.value = "0";
        // Remove from localStorage
        localStorage.removeItem("tripLog");

    }
});