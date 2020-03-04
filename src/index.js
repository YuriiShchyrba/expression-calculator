function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    var arr = [];
    var num = "";
 
    for (var i = 0; i < expr.length; i++) {
        if (parseInt(expr[i]) || (parseInt(expr[i]) == 0 && expr[i] != " ")) {
            while (parseInt(expr[i]) || (parseInt(expr[i]) == 0 && expr[i] !=" ") ) {
                num += expr[i++];
            }
            arr.push(num);
            num = "";
        }

            if (expr[i] == "+" || expr[i] == "-" || expr[i] == "*" || expr[i] == "/" || parseInt(expr[i]) == 0) {
            arr.push(expr[i]);
        }
    }

    return calcul(arr);
    
}

function calcul(arr) {
    while (arr.length != 1) {
        var ind;
        var exp;
        if (arr.indexOf("*") != -1 || arr.indexOf("/") != -1) {
            if (arr.indexOf("*") != -1 && arr.indexOf("/") != -1) {
                exp = arr.indexOf("*") < arr.indexOf("/") ? "*" : "/";
            }
            else if (arr.indexOf("*") != -1) {
                exp = "*";
            }
            else {
                exp = "/";
            }

            ind = arr.indexOf(exp);

            switch (exp) {
                case "*":
                    var mul = parseFloat(arr[ind - 1]) * parseFloat(arr[ind + 1]);
                    arr.splice(ind - 1, 0, mul);
                    arr.splice(ind, 3);
                    break;
                case "/":
                    var div = parseFloat(arr[ind - 1]) / parseFloat(arr[ind + 1]);
                    arr.splice(ind - 1, 0, div);
                    arr.splice(ind, 3);
                    break;
            }
        }
        else {
            if (arr.indexOf("+") != -1 && arr.indexOf("-") != -1) {
                exp = arr.indexOf("+") < arr.indexOf("-") ? "+" : "-";
            }
            else if (arr.indexOf("+") != -1) {
                exp = "+";
            }
            else {
                exp = "-";
            }
            ind = arr.indexOf(exp);

            switch (exp) {
                case "+":
                    var add = parseFloat(arr[ind - 1]) + parseFloat(arr[ind + 1]);
                    arr.splice(ind - 1, 0, add);
                    arr.splice(ind, 3);
                    break;
                case "-":
                    var sub = parseFloat(arr[ind - 1]) - parseFloat(arr[ind + 1]);
                    arr.splice(ind - 1, 0, sub);
                    arr.splice(ind, 3);
                    break;
            }
        }
    }

    return arr[0];
}

module.exports = {
    expressionCalculator
}