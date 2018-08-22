// initialize letter arrays
var VOWELS = ["a","e","i","o","u","A","E","I","O","U"]
var CONSONANTS = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z","B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"];

function translateText(){    
    // clear translation div
    document.getElementById("translation").innerHTML = "";
    
    // assign input to a variable
    var textBlock = document.getElementById("textToTranslate").value;
    
    // split input into an array of words
    textBlock = textBlock.split(" ");

    // iterate over words
    for (i = 0; i < textBlock.length; i++) { 
        var latinWord = "";
        // split the word into a character array
        var wordArray = textBlock[i].split("");
        var firstHalf = "";
        var secondHalf = "";

        // trim and store leading and trailing punctuation from wordArray
        var leadingPunctuation = "";
        var trailingPunctuation = "";
        // FIX
        wordArray = trimLeadingPunctuation(wordArray);
        wordArray = trimTrailingPunctuation(wordArray);

        // if word starts with a vowel
        if(VOWELS.includes(wordArray[0])) {
            // append "ay" (way? yay?) to it and move on with your life
            latinWord = textBlock[i] + "ay";
        }
        // if word starts with a consonant or consonant cluster
        else {
            for (j = 0; j < wordArray.length; j++) {
                // build up consonant cluster
                if (CONSONANTS.includes(wordArray[j])) {
                    secondHalf += wordArray[j];
                }
                // assign firstHalf the joined wordArray from its current index to its end
                else {
                    firstHalf = wordArray.slice(j, wordArray.length).join("");
                    secondHalf += "ay";
                    latinWord = firstHalf + secondHalf;
                    break;
                }
            }
        }
        // display results
        document.getElementById("translation").append(leadingPunctuation + latinWord +  trailingPunctuation + " ");
    }
}

// recursive function to trim leading punctuation from an array of characters
function trimLeadingPunctuation(charArray) {
    if(!VOWELS.includes(charArray[0]) && !CONSONANTS.includes(charArray[0])) {
        //leadingPunctuation += charArray[0];
        charArray = charArray.slice(1);
        trimLeadingPunctuation(charArray);
    }
    return charArray;
}

// recursive function to trim trailing punctuation from an array of characters
function trimTrailingPunctuation(charArray) {
    if(!VOWELS.includes(charArray[charArray.length - 1]) && !CONSONANTS.includes(charArray[charArray.length - 1])) {
        //trailingPunctuation += charArray[charArray.length];
        charArray.splice(-1);
        trimTrailingPunctuation(charArray);
    }
    return charArray;
}