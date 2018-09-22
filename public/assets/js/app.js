$("#save").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/scrapes/save/" + thisId
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