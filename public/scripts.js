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
    }).fail(function(error){
        console.error("Created failed", error)
    });
}

var getMemoListForUserId = function(){

    userId = $("#authId").val();

    $.get("/api/memo/list/" + userId, function(response){
        console.info("Got a list", response);

        $("#list-container").empty();

        //got a list, appending html blocks for each memo
        for(var i = 0; i < response.memos.length; i++){
            var currentMemo = response.memos[i];
            var memoHtml = "<div>" +
                                "<div>" + currentMemo.createDate + "</div>" +
                                   "<div>" + currentMemo.title + "</div>" +
                                    "<div>" + currentMemo.memo + "</div>" +
                                "</div>" +
                            "</div>" +
                            "<div><button onclick=restartMemo('" + currentMemo._id  + "')>Restart Memo</button></div>" +
                            "<div><button onclick=deleteMemo('" + currentMemo._id + "')>Delete Memo</button></div><br/><br/>" ;

            $("#list-container").append(memoHtml)
        }
    }).fail(function(error){
        console.error("List failed", error);
    });

//TEST DATA FOR WINDOWS SYSTEMS THAT ARE UNABLE TO RUN MONGO
//    var testResponse = {"error":false,"authId":"test","memos":[{"_id":"5762d82f5781df3c5359546d","authId":"test",
//        "memoId":"1","title":"Something to remember","memo":"member me please","v":0,"createDate":"2016-06-16T16:47:43.626Z"},
//        {"_id":"5762d9265781df3c5359546e","authId":"test","memoId":"1","title":"Something to remember","memo":"member me please","v":0,
//        "createDate":"2016-06-16T16:51:50.452Z"}]}

}

var restartMemo = function(memoId){
    $.get("/api/memo/startover/" + memoId, function(response){
        console.info("Startover SUCCESS", response)
    }).fail(function(error){
        console.error("Startover FAIL", error);
    });
}

var deleteMemo = function(memoId){
    $.get("/api/memo/delete/" + memoId, function(response){
        console.info("Delete SUCCESS", response)
    }).fail(function(error){
        console.error("Delete FAIL", error);
    });
}
