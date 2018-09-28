$(document).ready(function(){
    
$(".save").on("click", function () {

    var thisId = $(this).attr("data-id");
    console.log(thisId);

    $.ajax({
        method: "POST",
        url: "/scrapes/save/" + thisId
    }).done(function (data) {
        window.location = "/saved"
    })

});

$(".remove").on("click", function() {

    var thisId = $(this).attr("data-id");
    console.log(thisId);

    $.ajax({
        method: "POST",
        url: "scrapes/unsave/" + thisId
    }).done(function (data) {
        window.location = "/saved"
    })

});

$("#clear").on("click", function () {

    $.ajax({
        method: "GET",
        url: "/clear"
    }).done(function (data) {
        console.log(data);
        window.location = "/";
    })

});

$("#scrape").on("click", function() {

    $.ajax({
        method: "POST",
        url: "/scrape"
    }).done(function(data) {
        console.log(data);
        window.location = "/";
    })

});

$(".submit").on("click", function() {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/comments/" + thisId,
        data: {
            text: $("#commentText" + thisId).val(),
            user: $(".username" + thisId).val()
        }
    }).done(function(data) {
        console.log(data);
        window.location.reload(true);
    })

});

$('.sidenav').sidenav();

});