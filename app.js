"use strict";
function createTable(divID){
    $('#'+divID).append('<table></table>');
    var matrix = 15;
    var table = $('#'+divID+" table");

    for(var i = 0; i < matrix; i++){
        var tr = $("<tr>");
        $(tr).attr('data-i',i);
        for(var j = 0; j < matrix; j++){
            var td = $("<td>");
            $(td).attr('data-j',j+i*matrix);
            tr.append(td);
        }
        table.append(tr);
    }

    $("#"+divID+" table").on("click", "td", function() {
        var i = $( this ).parent().data("i");
        var j = $( this ).data("j");

        if($(this).hasClass('on')){
            $( this).removeClass('on');
        }else{
            $( this).addClass('on');
        }
        console.log("i "+i+" j"+j);
    });


    $("#B table td").mouseout(function() {
        if(down) {
            $( this).addClass('on');
        }
        else {
            down = false;
        }
    });
}
createTable("A");
createTable("B");
//$("#B table").addClass('pull-right');

function clearTable(div){
    div = div || 'B';
    $("#"+div+" table").remove();
    createTable(div);
}

var down = false;

$(document).mousedown(function() {
    down = true;
}).mouseup(function() {
    down = false;
});

function drawPattern(div,pattern){
    for(var i = 0; i < pattern.length; i++){
        var td = $("#"+div+' table [data-j='+i+']');
        if(pattern[i] > 0){
            $(td).addClass('on');
        }else{
            $(td).removeClass('on');
        }
    }
}

function extractPattern(div){
    var pattern = [];
    var matrix = 15;
    for(var i = 0; i < matrix*matrix; i++){
        pattern.push(-1);
    }
    var bits = $("#"+div+" table .on");
    for(var idx = 0; idx < bits.length; idx++){
        var j = $(bits[idx]).attr('data-j');
        pattern[$(bits[idx]).attr('data-j')] = 1;
    }
//                console.log(JSON.stringify(pattern));
    return pattern;
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function run(){
    var net = new Network();
    var check = net.learn();
    var nombreResultado = check(extractPattern('B'));

    $("#result").html("Result: "+nombreResultado);
    console.log("nombre resultado " +nombreResultado);
    //drawPattern('A',patternsLoaded[nombreResultado]);
    console.log("PASOS "+steps.length);
    //for(var i = 0; i < steps.length; i++){
        //drawPattern('B',steps[i]);
        //sleep(500);
    //}
}

//            var aPattern = [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1];

var patternsLoaded = {
    "A":[-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1]
    ,"B":[1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1]
};

function initApp(){
    for(var key in patternsLoaded){
        vectoresDeAprendizaje.push(patternsLoaded[key]);
    }
    drawPattern('A',vectoresDeAprendizaje[0]);
}

function next(){

}
function prev(){

}