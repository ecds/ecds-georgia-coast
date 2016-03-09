// TOGGLE ICON IN YELLOW COLLAPSE MAP BUTTON
$('#hideMap').click(function() {
    $('#cont').toggle();
    $(this).toggleClass("fa-caret-right collapse");
});

function formatIsotope() {
    var allTags = ""
    var allTagsArray = []
    $("#elements > .element").each(function() {
        var theseContentTags = ""
        allTags = ""
        theseTags = ""
        var thisElement = $(this)
        var thisContentType = $(this).attr("data-content-type")
        if (thisContentType == 'photos') {
            $(this).find("i").addClass('fa fa-camera')
        }
        else if (thisContentType == 'videos') {
            $(this).find("i").addClass('fa fa-video-camera')
        }
        else if (thisContentType == 'article') {
            $(this).find("i").addClass('fa fa-file-text-o')
        }
        else {
            $(this).find("i").css("display","none")
        }
        $(this).addClass(thisContentType)
        var theseContentTags = $(this).attr("data-tags")
        theseContentTags = theseContentTags.toString()
        
        $(this).addClass(theseContentTags)
        allTags = allTags + theseContentTags.split(" ")
        theseTags = allTags.split(",")
        console.log(theseTags)
        $.each(theseTags, function( index, value ) {
          $(thisElement).find("#tags").append("<a class='tag'>"+value+"</a>")
        });
        allTagsArray.push(allTags.split(","))
    });

    var processedTags = []

    $.each(allTagsArray, function(key1, value1) {
        $.each(value1, function(key1, value1) {
            if($.inArray(value1, processedTags) == -1){
                $("#isotope-tags").append("<button class='tag' data-filter='"+value1+"'>"+value1+"</button>")
                processedTags.push(value1)   
            }
        });
    });

    var $boxs = $("#elements > .element");
    var $btns = $(".filter .tag").on("click", function() {
        var active =
            $btns.removeClass("active")
                .filter(this)
                .addClass("active")
                .data("filter");
            $boxs
                .hide()
                .filter("." + active)
                .fadeIn(100);
    });
}
