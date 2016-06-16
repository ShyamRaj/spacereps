var submitTheForm = function(){

    userId = $("#authId").val();
    memoTitle = $("#title").val()
    memo = $("#memo").val()

    dataObject = {
        userId: userId,
        memoTitle: memoTitle,
        memo: memo,
    }

    console.log(dataObject)
    $.post("/api/memo", dataObject, function(response){
        //success callback here
    }).done(function(){
        console.log(dataObject)
    }).fail(function(){
        //failure callback
    });
}