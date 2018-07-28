$(document).ready(function(){ 
    // auto-update copyright
    var year = (new Date).getFullYear();
    $("#copy").append("&copy; " + year + " — Zachary Velcoff");
    
    
});

function translateText(){
    // initialize letter arrays — make these global ASAP
    var vowels = ["a","e","i","o","u","A","E","I","O","U"];
    var consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z","B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"];
    
    // clear translation div
    document.getElementById("translation").innerHTML = "";
    
    // assign input to a variable
    var textblock = document.getElementById("textToTranslate").value;
    
    // split input into an array of words
    textblock = textblock.split(" ");
    
    // iterate over words
    for (i = 0; i < textblock.length; i++){
        var word = textblock[i].split("");
        var afterHyphen = "-"; 
        
        for (j = 0; j < word.length; j++){
            if (consonants.includes(word[j])){
                afterHyphen += word[j];
            }
            else if (vowels.includes(word[j])){
                var beforeHyphen = word.slice(j,word.length + 1);
                break;      
            }
        }
        afterHyphen += "ay";
        beforeHyphen = beforeHyphen.join("");
        var latinWord = beforeHyphen + afterHyphen;
        document.getElementById("translation").append(latinWord + " ");
    }
}

