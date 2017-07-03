'use strict';

// CONTROL FLOW //

window.resultTemplate = Handlebars.compile(document.getElementById('result-template').innerHTML);
window.searchTemplate = Handlebars.compile(document.getElementById('search-template').innerHTML);

if(!localStorage["results"]){
  $.ajax({
    url: 'http://thinblueline.run/results.json',
    type: 'GET',
    dataType: 'JSON',
    success: function(resp){
      localStorage["results"] = JSON.stringify(resp);
      window.results = resp;
    },
    error: function(resp){
      console.log(resp);
    }
  });
}
else{
  window.results = JSON.parse(localStorage["results"]);
}

// END CONTROL FLOW //

// FUNCTION DECLARATIONS //
function getNodes(text){
    // return document.createRange().createContextualFragment(text);
    return new DOMParser().parseFromString(text, 'text/html').body.childNodes;
}

function resultListener(){

    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-input').value       = '';

    var bib = this.getAttribute('data-identifier');

    var result = window.results.filter(function(result){
        return result["bib"] == bib;
    })[0]

    document.getElementById('result-container').innerHTML = window.resultTemplate(result);
}

function searchResults(str){

    var searchResults = document.getElementById('search-results'),
        frag = document.createDocumentFragment();

    searchResults.innerHTML = '';

    if(str.length > 1){
        window.results.filter(function(result){
            if(result["name"].toLowerCase().search(str.toLowerCase()) != -1 || result["bib"].search(str) != -1){
                return result;
            }
        })
        .map(function(result){
            frag.appendChild(getNodes(window.searchTemplate(result))[0])
        });

        searchResults.appendChild(frag);
    }
}

// END FUNCTION DECLARATIONS //
