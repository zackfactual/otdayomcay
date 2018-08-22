// initialize letter arrays
var VOWELS = ["a","e","i","o","u","A","E","I","O","U"]
var CONSONANTS = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z","B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"];

function translateText() {    
    // clear translation div
    document.getElementById("translation").innerHTML = "";
    
    // assign input to a variable
    var textBlock = document.getElementById("textToTranslate").value;
    
    // split input into array of paragraphs
    paragraphArray = textBlock.split("\n")

    // split each paragraph into an array of words
    for (k = 0; k < paragraphArray.length; k++) {
        var wordArray = paragraphArray[k].split(" ");
        
        // split each word into a character array
        for (i = 0; i < wordArray.length; i++) { 
            var latinWord = "";
            charArray = wordArray[i].split("");
            var firstHalf = "";
            var secondHalf = "";
    
            // trim and store leading and trailing punctuation from wordArray
            var leadingPunctuation = "";
            var trailingPunctuation = "";
            [charArray, leadingPunctuation] = trimLeadingPunctuation(charArray, leadingPunctuation);
            [charArray, trailingPunctuation] = trimTrailingPunctuation(charArray, trailingPunctuation);
    
            // if word starts with a vowel
            if(VOWELS.includes(charArray[0])) {
                latinWord = charArray.join("") + "ay";
            }
            // if word starts with a consonant or consonant cluster
            else {
                for (j = 0; j < charArray.length; j++) {
                    // build up consonant cluster
                    if (CONSONANTS.includes(charArray[j])) {
                        secondHalf += charArray[j];
                    }
                    // assign firstHalf the joined wordArray from its current index to its end
                    else {
                        firstHalf = charArray.slice(j, charArray.length).join("");
                        secondHalf += "ay";
                        latinWord = firstHalf + secondHalf;
                        break;
                    }
                }
            }
            // display results
            document.getElementById("translation").append(leadingPunctuation + latinWord +  trailingPunctuation + " ");
        }
        document.getElementById("translation").innerHTML += "<br>";
    }
}

// recursive function to trim leading punctuation from an array of characters
function trimLeadingPunctuation(charArray, leadingPunct) {
    if(!VOWELS.includes(charArray[0]) && !CONSONANTS.includes(charArray[0])) {
        leadingPunct += charArray[0];
        charArray = charArray.slice(1);
        return trimLeadingPunctuation(charArray, leadingPunct);
    }
    return [charArray, leadingPunct];
}

// recursive function to trim trailing punctuation from an array of characters
function trimTrailingPunctuation(charArray, trailingPunct) {
    if(!VOWELS.includes(charArray[charArray.length - 1]) && !CONSONANTS.includes(charArray[charArray.length - 1])) {
        trailingPunct = charArray[charArray.length - 1] + trailingPunct;
        charArray.splice(-1);
        return trimTrailingPunctuation(charArray, trailingPunct);
    }
    return [charArray, trailingPunct];
}