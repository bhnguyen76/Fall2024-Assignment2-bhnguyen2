let firstResultUrl = '';
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': 'API-KEY'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                if (i == 0) firstResultUrl = data.webPages.value[0].url;
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').show();
        })
        .fail(function () {
            alert('error');
        });
}
function search() {
    apiSearch()
}

function displayTime() {
    // Get current time
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    // Load the result into the p element in the time div
    $("#currentTime").text(formattedTime);

    // Show the dialog
    $("#time").dialog({
        modal: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
}

const images = [
    'url("images/moon.jpg")',
    'url("images/mountain.jpg")',
];
let imageIndex = 0;
function changeBackground() {
    imageIndex = (imageIndex + 1) % images.length;
    document.body.style.backgroundImage = images[imageIndex];
}

function feelingLucky() {
    if (firstResultUrl) {
        window.location.href = firstResultUrl; 
    } else {
        alert('Perform a search first.');
    }
}
// Event listeners
//document.getElementById("searchButton").addEventListener("click", search());
