var scores1 = [90, 98, 89, 100, 100, 86, 94];

function average(scores) {
    
    var sum = 0;
    var average = 0;
    
    for (var i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    average = sum / scores.length;
    
    console.log(Math.round(average));
}

average(scores1);