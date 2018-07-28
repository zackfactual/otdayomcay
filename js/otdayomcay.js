$(document).ready(function(){ 
    // auto-update copyright
    var year = (new Date).getFullYear();
    $("#copy").append("&copy; " + year + " — Zachary Velcoff");
    
    
});

function translateText(){
    // initialize letter arrays — don't do this in the function unless you have to
    var vowels = ["a","e","i","o","u"];
    var consonants = ["b","c","d","f","g","h","i","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
    
    // assign input to a variable
    var textblock = document.getElementById("textToTranslate").value;
    
    // split input into an array of words
    textblock = textblock.split(" ");
    
    // iterate over words
    for (i = 0; i < textblock.length; i++){
        var word = textblock[i].split("");
        var newword = "-"; 
        
        for (j = 0; j < word.length; j++){
            if (consonants.includes(word[j])){
                newword += word[j];
            }
            else if (vowels.includes(word[j])){
                var front = word.slice(word[j],word.length + 1);
                break;      
            }
        }
        newword += "ay";
        front += newword;
        document.getElementById("translation").append(front);
    }
}

