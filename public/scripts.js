var submitTheForm = function(){

    userId = $("#authId").val();
    memoTitle = $("#title").val()
    memo = $("#memo").val()

    memoData = {
        authId: userId,
        title: memoTitle,
        memo: memo,
    }

    $.post("/api/memo", memoData, function(response){
        console.info("Success", response);
    }).done(function(){
        //done callback
    }).fail(function(error){
        console.error("Created failed", error)
    });
}

var getMemoListForUserId = function(){

    userId = $("#authId").val();

    $.get("/api/memo/list/" + userId, function(response){
        console.info("Got a list", response);
    }).done(function(){
        //done callback
    }).fail(function(error){
        console.error("List failed", error);
    });
}
