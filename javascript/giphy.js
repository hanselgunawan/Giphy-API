/**
 * Created by hansel.tritama on 9/19/17.
 */

function populateButton(superheroArr)
{
    $(".superhero-buttons").empty();
    for(let i in superheroArr)
    {
        $(".superhero-buttons").append("<button class='superheroBtn hvr-grow'>" + superheroArr[i] + "</button>");
    }
}

function pushHero(hero, superheroArr)
{
    if(superheroArr.indexOf(hero.toLowerCase()) > -1)
    {
        alert("Hero already exist!\nTry another hero.");
    }
    else
    {
        superheroArr.push(hero);
        populateButton(superheroArr);
    }
}

function populateGiphy(event, gif_arr_move, gif_arr_still)
{
    const PUBLIC_KEY = 'dc6zaTOxFJmzC';
    const BASE_URL = '//api.giphy.com/v1/gifs/';
    const ENDPOINT = 'search';
    const LIMIT = 10;
    let results = 0;
    let query = {
        text: $(event.target).text(),
        offset: 0,
        request() {
            return `${BASE_URL}${ENDPOINT}?q=${this.text}&limit=${LIMIT}&offset=${this.offset}&api_key=${PUBLIC_KEY}`;
        },
        fetch(callback) {
            $.getJSON(this.request())
                .success(data => {
                    results = data.data;
                    if (results.length) {
                        callback(results);
                    } else {
                        callback('');
                    }
                })
                .fail(error => {
                    console.log(error);
                });
        }
    };

        query.fetch(url => {
            console.log(results);
            $(".giphyGallery").empty();
            for(let i in results)
            {
                let containerDiv = $("<div>");

                let ratingParagraph = $("<p>");
                ratingParagraph.addClass("giphyRating-p");
                ratingParagraph.text("rating:");

                let ratingSpan = $("<span>");
                ratingSpan.addClass("giphyRating-span");
                ratingSpan.text(" "+ results[i].rating +"");

                let giphyContainer = $("<img>");
                giphyContainer.addClass("giphyImage-Container");
                giphyContainer.attr("value", i);
                giphyContainer.attr("data-state", "still");
                giphyContainer.attr("src", results[i].images.downsized_still.url);

                $(".giphyGallery").append(containerDiv);

                containerDiv.append(ratingParagraph);
                ratingParagraph.append(ratingSpan);
                containerDiv.append(giphyContainer);

                gif_arr_move.push(results[i].images.downsized.url);
                gif_arr_still.push(results[i].images.downsized_still.url);
            }
        });

}

$(document).ready(function() {
    let arrVal = -1;
    let superheroArr = ["spiderman", "superman", "batman", "wonder woman"];
    let gif_arr_move = [];
    let gif_arr_still = [];
    populateButton(superheroArr);

    $("#addBtn").on("click", function (event) {
        event.preventDefault();
        let hero = $("#input-hero").val().trim();
        pushHero(hero, superheroArr);
    });

    $(document).on("click", ".superheroBtn", function (event) {
        gif_arr_move = [];
        gif_arr_still = [];
        populateGiphy(event, gif_arr_move, gif_arr_still);
    });

    $(document).on("click", ".giphyImage-Container", function (event) {
        let status = $(event.target).attr("data-state");
        arrVal = $(event.target).attr("value");
        if(status==="still")
        {
            $(event.target).attr("src", gif_arr_move[arrVal]);
            $(event.target).attr("data-state", "move");
        }
        else
        {
            $(event.target).attr("src", gif_arr_still[arrVal]);
            $(event.target).attr("data-state", "still");
        }
    });
})