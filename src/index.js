function eval() {
    // Do not use eval!!!
    return;
}

function validParentheses(braces) {
    var sum = 0;
    if (braces[0] == "}" || braces[0] == "]" || braces[0] == ")") return false;
    var map = { "{": "}", "[": "]", "(": ")" };
    for (var i = 0; i < braces.length; i++) {
        var q = map[arr[arr.length - 1]];
        var qq = braces[i];
        if (braces[i] == "{" || braces[i] == "[" || braces[i] == "(") {
            sum++;
        }
        else if (map[arr[arr.length - 1]] == braces[i]) {
            sum--;
        }
    }

    if (sum == 0) return true;

    return false;
}

function expressionCalculator(expr) {
    var arr = [];
    var num = "";
    if (!validParentheses(expr)) { throw ("ExpressionError: Brackets must be paired");}
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
                    if (arr[ind + 1]==0) throw new Error("TypeError: Division by zero.");
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