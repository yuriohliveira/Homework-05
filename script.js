var today = moment();

$("#currentDay").text(today.format("dddd, MMMM Do")); 

$("textarea").each(function() {

    var idSubstr = $(this).parent().attr("id"); 
    
    if(idSubstr.substr(0,2) === "10" || idSubstr.substr(0,2) === "11" || idSubstr.substr(0,2) === "12") {
        idSubstr = idSubstr.substr(0,4); 
    } 
    else {
        idSubstr = idSubstr.substr(0,3);
    }
    Planner(idSubstr); 
    Colors(idSubstr); 
}); 

function Planner(timeStr) {
    var text = localStorage.getItem(timeStr); 
    if(text) {
        var textAreaID = "#" + timeStr + "TextArea"; 
        var textarea = $(textAreaID).find("textarea"); 
        textarea.val(text); 
    }
}

function Colors(timeStr) {

    var textAreaID = "#" + timeStr + "TextArea"; 
    var currentTime = today.format("ha"); 

    currentTime = moment(currentTime,"ha"); 

    var plannerTime = moment(timeStr,"ha"); 

    if(currentTime.isBefore(plannerTime)) {
        $(textAreaID).addClass("future");
    }
    else if(plannerTime.isBefore(currentTime)) {
        $(textAreaID).addClass("past"); 
    }
    else {
        $(textAreaID).addClass("present"); 
    }
}

$(".saveButton").on("click",function() {

    var a = $(this).parent().parent(); 
    var timeStr = a.attr("id"); 

    var text = a.find("textarea").val(); 
    
    localStorage.setItem(timeStr,text); 
}); 
