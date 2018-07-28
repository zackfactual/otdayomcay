$(document).ready(function() { 
    // auto-update copyright
    var year = (new Date).getFullYear();
    $("#copy").append("&copy; " + year + " — Zachary Velcoff");
});

function translateText() {
    document.getElementById("translation").append(document.getElementById("textToTranslate").value);
}

