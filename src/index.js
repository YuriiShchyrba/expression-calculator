function eval() {
    // Do not use eval!!!
    return;
}

function validParentheses(braces) {
    var sum = 0;
    if (braces[0] == "}" || braces[0] == "]" || braces[0] == ")") return false;
    var map = { "{": "}", "[": "]", "(": ")" };
    for (var i = 0; i < braces.length; i++) {
        if (braces[i] == "(") {
            sum++;
        }
        else if (braces[i] == ")") {
            sum--;
        }
    }

    if (sum == 0) return true;

    return false;
}

function expressionCalculator(expr) {
    var arr = [];
    var num = "";
    if (!validParentheses(expr)) { throw ("ExpressionError: Brackets must be paired"); }
    var index = [0];
    arr = makearray(expr, index);
    var res = arr.arr;
     calcul(res);
    return res[0];

}

function makearray(expr,index) {
    var q = expr;
    var arr = [];
    var num = "";
    for (index[0]; index[0] < expr.length; index[0]++) {
        if (expr[index[0]] == "(") {
            var a = q.substring(index[0] + 1, q.length - index[0]);
            arr.push(makearray(a, index));
            continue;
        }
        
        if (parseInt(expr[index[0]]) || (parseInt(expr[index[0]]) == 0 && expr[index[0]] != " ")) {
            while (parseInt(expr[index[0]]) || (parseInt(expr[index[0]]) == 0 && expr[index[0]] != " ")) {
                num += expr[index[0]++];
            }
            arr.push(num);
            num = "";
        }
        if (expr[index[0]] == ")") { index[0]++; return { arr: arr, index: index }; }
        if (expr[index[0]] == "+" || expr[index[0]] == "-" || expr[index[0]] == "*" || expr[index[0]] == "/" || parseInt(expr[index[0]]) == 0) {
            arr.push(expr[index[0]]);
        }
    }
    return { arr: arr, index: index };
}

function calcul(arr) {
    while (arr.length != 1) {
        var ind;
        var exp;
        var first;
        var second;
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
                    if (typeof (arr[ind - 1]) == "object") { calcul(arr[ind - 1].arr); first = arr[ind - 1].arr[0]; }
                    else { first = arr[ind - 1]; }
                    if (typeof (arr[ind + 1]) == "object") { calcul(arr[ind + 1].arr); second = arr[ind + 1].arr[0]; }
                    else { second = arr[ind + 1];}
                    var mul = parseFloat(first) * parseFloat(second);
                    arr.splice(ind - 1, 0, mul);
                    arr.splice(ind, 3);
                    break;
                case "/":
                    if (typeof (arr[ind - 1]) == "object") { calcul(arr[ind - 1].arr); first = arr[ind - 1].arr[0]; }
                    else { first = arr[ind - 1]; }
                    if (typeof (arr[ind + 1]) == "object") { calcul(arr[ind + 1].arr); second = arr[ind + 1].arr[0]; }
                    else { second = arr[ind + 1]; }
                    if (arr[ind + 1] == 0) throw new Error("TypeError: Division by zero.");
                    var div = parseFloat(first) / parseFloat(second);
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
                    if (typeof (arr[ind - 1]) == "object") { calcul(arr[ind - 1].arr); first = arr[ind - 1].arr[0]; }
                    else { first = arr[ind - 1]; }
                    if (typeof (arr[ind + 1]) == "object") { calcul(arr[ind + 1].arr); second = arr[ind + 1].arr[0]; }
                    else { second = arr[ind + 1]; }
                    var add = parseFloat(first) + parseFloat(second);
                    arr.splice(ind - 1, 0, add);
                    arr.splice(ind, 3);
                    break;
                case "-":
                    if (typeof (arr[ind - 1]) == "object") { calcul(arr[ind - 1].arr); first = arr[ind - 1].arr[0]; }
                    else { first = arr[ind - 1]; }
                    if (typeof (arr[ind + 1]) == "object") { calcul(arr[ind + 1].arr); second = arr[ind + 1].arr[0]; }
                    else { second = arr[ind + 1]; }
                    var sub = parseFloat(first) - parseFloat(second);
                    arr.splice(ind - 1, 0, sub);
                    arr.splice(ind, 3);
                    break;
            }
        }
    }

    return arr.arr;
}

module.exports = {
    expressionCalculator
}