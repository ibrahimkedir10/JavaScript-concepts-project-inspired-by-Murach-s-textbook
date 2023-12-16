document.addEventListener("DOMContentLoaded", function() {
    // declare variables => ids
    const destination = document.getElementById("inputDestination");
    const miles = document.getElementById("inputMilesDriven");
    const gallons = document.getElementById("inputGallonsUsed");
    const addTrip = document.getElementById("addTrip");
    const tripLog = document.getElementById("tripLog");
    const clear = document.getElementById("clear");

    // trip constructor function
    var Trip = function(destination, miles, gallons) {
        this.destination = destination;
        this.miles = parseFloat(miles);
        this.gallons = parseFloat(gallons);
    };

    // check if input is valid
    Trip.prototype.isValid = function() {
        if (this.destination === "" || isNaN(this.gallons) || isNaN(this.miles)) {
            return false;
        } else if (this.gallons <= 0 || this.miles <= 0) {
            return false;
        } else {
            return true;
        }
    };

    Trip.prototype.calculateMPG = function() {
        return this.miles / this.gallons;
    };

    Trip.prototype.toString = function() {
        return `${this.destination} ${this.miles} ${this.gallons} ${this.calculateMPG().toFixed(1)}`;
    };

    // making list of trips
    var trips = [];

    // make a display function
    var displayTrips = function() {
        var displayString = "";
        var mpgTotal = 0;

        for (var i in trips) {
            displayString += trips[i].toString() + "\n";
            mpgTotal += trips[i].calculateMPG();
        }

        var cumulativeMpg = mpgTotal / trips.length;
        displayString += `\nAverage MPG: ${cumulativeMpg.toFixed(1)}`;

        tripLog.value = displayString;
        destination.select();
    };

    addTrip.onclick = function() {
        var trip = new Trip(destination.value, miles.value, gallons.value);
        if (!trip.isValid()) {
            alert("Invalid input");
        } else {
            trips.push(trip);
            displayTrips();
        }
    };

    
});
