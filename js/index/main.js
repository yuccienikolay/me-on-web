var src = $("#SYKABLUAD").attr("src") + "?v=" + Math.random().toString();
$("#SYKABLUAD").attr("src", src);

// COMMANDER

$("#command").keyup(function(event){
    if(event.keyCode == 13){
        eval($('#command').val());
        $('#command').val("");
    }
});