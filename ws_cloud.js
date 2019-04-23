"use strict";
/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 4


   Filename: ws_cloud.js

   Author: Gabriel Fuentes 
   Date: 4.23.19    
   
   Function List
   =============
   
   findUnique(arr)
      Returns the unique values in the "arr" array in the form of
      a two-dimension array
      array[i][j]
      where i is the ith unique entry, array[i][0] provides the
      value of the entry and array[i][1] provides the number 
      of repetitons of that value
   
   sortByCount(a,b)
      Compare function used in a two-dimensional arrays to be sorted
      in descending order of the values in the array's 2nd column
      
   sortByWord(a, b)
      Compare function used in a two-dimensional array to be sorted
      in ascending alphabetical order of the vlaues in the array's
      first column
   
   randomValue(minVal, maxVal)
      Returns a randome integer between minVal and maxVal

*/
// Steps 5-18 
window.addEventListener('load', function() {
  var wordContent = document.getElementById('speech').textContent.toLowerCase().replace(/[.,\\\/#!?$%\^&\*;:{}=\-_`'"~()\d]/g, "");
  for (var i = 0; i < stopWords.length; i++) {
  var stopWordsRE = new RegExp(`\\b${stopWords[i]}\\b`,'g');
  wordContent = wordContent.replace(stopWordsRE, "");
  }
  wordContent = wordContent.trim();
  wordContent = wordContent.replace(/\s+/g, " ");
  var wordArray = wordContent.split(" ");
  var uniqueWords = findUnique(wordArray);
  uniqueWords.sort(sortByCount)
  for (var i = uniqueWords.length; i > 100; i--) {
    uniqueWords.pop();
  }
  var minimumCount = uniqueWords[99][1];
  var top3Count = uniqueWords[2][1];
  uniqueWords.sort(sortByWord);
  for (var i = 0; i < uniqueWords.length; i++) {
    var cloudWord = document.createElement("span");
    cloudWord.textContent = uniqueWords[i][0];
    var wordSize = 0.45 * (uniqueWords[i][1]/minimumCount);
    if (wordSize >= 6) {
      wordSize = 6;
    }
    cloudWord.style.fontSize = wordSize + "em";
    cloudWord.style.transform = "rotate(" + randomValue(-30, 30) + "deg)";
    if (uniqueWords[i][1] >= top3Count) {
      cloudWord.style.color = "rgb(251, 191, 191)";
      cloudWord.style.textShadow = "2px 2px 5px rgb(51, 51, 51)";
    }
    var cloud =  document.getElementById('cloud');
    cloud.appendChild(cloudWord);
  }

});





// Division --------------------------------------
function findUnique(arr) {
   var prevWord;
   var unique = [];
   var listNum = -1;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prevWord ) {
           listNum++;           
           unique[listNum] = [];
           unique[listNum][0] = arr[i];
           unique[listNum][1] = 1;
        } else {
            unique[listNum][1] = unique[listNum][1]+1;
        }
        prevWord = arr[i];
    }

    return unique;  
}

function sortByCount(a,b) {
   return b[1]-a[1];
}

function sortByWord(a, b) {
   if (a[0] < b[0]) {
      return -1;
   } else if (a[0] > b[0]) {
      return 1;
   } else {
      return 0;
   }
}

function randomValue(minVal, maxVal) {
   var interval = maxVal - minVal;
   return Math.floor(minVal + interval*Math.random());
}

