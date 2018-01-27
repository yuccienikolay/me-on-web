var src = $("#SYKABLUAD").attr("src") + "?v=" + Math.random().toString();
$("#SYKABLUAD").attr("src", src);

// COMMANDER

$("#commandsubmit").click(function() {
    var expression = $('#command').val();
    var result = new Function(expression)();
    alert(result);
    $('#command').val("");
})