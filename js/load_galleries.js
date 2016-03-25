$(document).ready(function() {
    $.ajax({
  type: "GET",
  dataType: "json",
  url: "js/alligator_pond.json",
})
  .done(function(data) {
      console.log(data)
    })
    .fail(function() {
      console.log("Ajax failed to fetch data")
});

    $("#alligator_pond").html("this is from load galleries")
    console.log($("#alligator_pond"))
});
