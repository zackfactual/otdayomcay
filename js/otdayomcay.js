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
        if (paragraphArray[k].length == 0)
        {
            document.getElementById("translation").innerHTML += "<br>";
        }
        else {
            // deal with indentation
            if(paragraphArray[k].startsWith("\t")) {
                document.getElementById("translation").innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            var wordArray = paragraphArray[k].split(" "); 
            
            for (i = 0; i < wordArray.length; i++) {
                // deal with extra whitespace
                if(wordArray[i].trim().length == 0) {
                    document.getElementById("translation").innerHTML += " "; 
                }
                else {
                    var latinWord = "";
                    // split each word into a character array
                    charArray = wordArray[i].split("");
                    // regex to deal with non-alphabetical "words"
                    if (/^[\W_0-9]+$/.test(charArray)) {
                        document.getElementById("translation").append(charArray.join("") + " ");
                    }
                    else {
                        var firstHalf = "";
                        var secondHalf = "";
                        // trim and store leading and trailing punctuation from wordArray
                        var leadingPunctuation = "";
                        var trailingPunctuation = "";
                        [charArray, leadingPunctuation] = trimLeadingPunctuation(charArray, leadingPunctuation);
                        [charArray, trailingPunctuation] = trimTrailingPunctuation(charArray, trailingPunctuation);
                        
                        suffix = readSuffix();
                        // if word starts with a vowel
                        if(VOWELS.includes(charArray[0])) {
                            latinWord = charArray.join("") + suffix;
                        }
                        // if word starts with a consonant or consonant cluster
                        else {
                            for (j = 0; j < charArray.length; j++) {
                                // build up consonant cluster
                                if (CONSONANTS.includes(charArray[j]) && j != charArray.length - 1) {
                                    secondHalf += charArray[j];
                                }
                                // if the word has no vowels
                                else if (CONSONANTS.includes(charArray[j]) && j == charArray.length - 1) {
                                    latinWord = charArray.join("") + suffix
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
                        if (document.getElementById("english").checked && /[A-Z]/.test(latinWord)) {
                            latinWord = capitalize(latinWord);
                        }
                        // display results
                        document.getElementById("translation").append(leadingPunctuation + latinWord +  trailingPunctuation + " ");
                    }
                }
            }
            document.getElementById("translation").innerHTML += "<br>";
        } 
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

function readSuffix() {
    var suffix = "";
    if (document.getElementById("ay").checked) {
        suffix = "ay";
    }
    else if (document.getElementById("way").checked) {
        suffix = "way";
    }
    else {
        suffix = "yay";
    }
    return suffix;
}

function capitalize(latinWord) {
    latinWord = latinWord.toLowerCase();
    return latinWord.charAt(0).toUpperCase() + latinWord.substr(1);
}

// auto-update copyright
$('document').ready(function copyright() {
    var year = (new Date).getFullYear();
    $("#copy").append("&copy; " + year + " — Zachary Velcoff");
});