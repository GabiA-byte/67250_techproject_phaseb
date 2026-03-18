var now = new Date();
var hours = now.getHours();
function greeting(h){
    if (h < 5 || h >= 20) {
        return "Good night";
    } else if (h < 12) {
        return "Good morning";
    } else if (h < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}
document.getElementById("greeting").textContent = greeting(hours) + ", Welcome to the MonoMuse Museum";

function addYear(now){
    var year =now.getFullYear()
    return year;
}
document.getElementById("copyYear").textContent = "CopyRight" + addYear(now);
    


function sumnPrint(x1, x2) {
    let result = x1 + x2;
    console.log(result);
    return result;
}

if (C.length > z) {
    consolge.log(C);
    if ( C.length < z) {
        console.log(z);
    }
        // Code block for nested true
    }
    // End of nested check block
 else {
    console.log("Good job!");
    // Code block for initial condition false
}


function findTheBanana(L){
    for (let i = 0; i < L.length; i++) {
        if (L[i]=="Banana"){
            alert("Found the banana!");
        }
}
}
L1 = ["Watermelon","Pineapple","Pear","Banana"];
L2 = ["Apple","Banana","Kiwi","Orange"];
L1.forEach(findTheBanana)
L2.forEach(findTheBanana)

