const $ = function(id){
    return document.getElementById(id);
}

let calculateMpg = function(miles, gallons){
    const mpg = parseFloat(miles / gallons);
    return isNaN(mpg) ? "Invalid input" : mpg.toFixed(2);
}

const inputs = function(){
    const miles = parseFloat($("miles").value);
    const gallons = parseFloat($("gallons").value);

    $("output").value = calculateMpg(miles, gallons);
}

window.onload = function(){
    $("btncalculator").onclick = inputs;
   // $("miles").addEventListener("input", inputs);
  //  $("gallons").addEventListener("input", inputs);
    $("miles").focus();
}