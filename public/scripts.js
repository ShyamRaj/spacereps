var submitTheForm = function(){

    userId = $("#authId").val();
    memoTitle = $("#title").val()
    memo = $("#memo").val()

    memoData = {
        userId: userId,
        memoTitle: memoTitle,
        memo: memo,
    }

    $.post("/api/memo", memoData, function(response){
        //success callback here
    }).done(function(){
        //done callback
    }).fail(function(){
        //failure callback
    });
}

var getMemoListForUserId = function(){

    userId = $("#authId").val();

    $.get("/api/memo/list/" + userId, function(response){
        //success callback here
    }).done(function(){
        //done callback
    }).fail(function(){
        //failure callback
    });
}