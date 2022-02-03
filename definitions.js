//https://www.atomurl.net/math/
//desmos can also be used
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function initialize() {
    window.m_dx = function(string) { return `\\frac{d}{dx}\\${string}` }
    window.m_defOfdx = function(func) {
        //return "\\lim_{h \\rightarrow 0} \\frac{" + func("x+h") + "-" + func("x") + "}{h}";
        return `\\lim_{h \\rightarrow 0} \\frac{${func("x+h")}-${func("x")}}{h}`;
    }
    window.m_int = function(a, b, string) {
        return `\\int_${a}^${b} ${string}`
    }
    window.m_int_inf = function(a, b, string) {
        return `\\int_{${a}}^{${b}}${string}`
    }
    window.m_sinx = function(x) { return "sin" + x}
    window.m_cosx = function(x) { return "cos" + x}
    window.m_tanx = function(x) { return "tan" + x}
    window.m_cotx = function(x) { return "cot" + x}
    window.m_secx = function(x) { return "sec" + x}
    window.m_cscx = function(x) { return "csc" + x}
    window.m_sinx_en = function(x) { return "sin(" + x +")"}
    window.m_cosx_en = function(x) { return "cos(" + x +")"}
    window.m_tanx_en = function(x) { return "tan(" + x +")"}
    window.m_cotx_en = function(x) { return "cot(" + x +")"}
    window.m_secx_en = function(x) { return "sec(" + x +")"}
    window.m_cscx_en = function(x) { return "csc(" + x +")"}


    window.derivatives = {
        "sin(x)": "cos(x)",
        "cos(x)": "-sin(x)",
        "tan(x)": "sec^{2}(x)",
        "cot(x)": "-csc^{2}(x)",
        "sec(x)": "sec(x)tan(x)",
        "csc(x)": "csc(x)cot(x)",
    }
    window.quiz = []
    //window.m_int = 
}
function money(x) {
    return "$" + x + "$";
}

function generate() {
    console.log("Generating")
    initialize();
    //document.getElementById("element1").innerHTML = "$\\frac{d}{dx}\\sin x$";
    //document.getElementById("element1").innerHTML = "$\\lim_{h \\rightarrow 0} \\frac{sin(x+h)-sin(x)}{h} $"
    //document.getElementById("element1").innerHTML = money(window.m_defOfdx(window.m_cosx_en));
    //document.getElementById("element1").innerHTML = money(window.m_defOfdx(function(x) { return "\\left(\\tan x\\right)".replace("x", x)}));
    //let string = money(window.m_int("0","1",`${window.m_sinx_en("x")}dt`));
    //document.getElementById("element1").innerHTML = string
    //console.log(MathJax)
    for(let i = 0; i < 5; i++) {
        generate_trig_eval()
    }
    for(let i = 0; i < 5; i++) {
        generate_ddx()
    }
    clear_value()
    display_key()
    MathJax.typeset();
}
function display_key() {
    for(let i = 0; i < 10; i++) {
        document.getElementById(`${i}key`).innerHTML = money(window.quiz[i][0])
    }
}
function display_value() {
    for(let i = 0; i < 10; i++) {
        document.getElementById(`${i}value`).innerHTML = money(window.quiz[i][1])
    }
}
function clear_key() {
    for(let i = 0; i < 10; i++) {
        document.getElementById(`${i}key`).innerHTML = ""
    }
}
function clear_value() {
    for(let i = 0; i < 10; i++) {
        document.getElementById(`${i}value`).innerHTML = ""
    }
}
function generate_definition_of_a_derivative() {
    console.log("generating def of a dx")
    let key_value = get_key_value_of_dict(getRandomInt(6), window.derivatives)
    let key = window.m_defOfdx(function(x) {return key_value[0].replace("x", x)}) + "= "
    let value = key_value[1]
    window.quiz.push([key,value])
}
function generate_ddx() {
    console.log("generating dx")
    let key_value = get_key_value_of_dict(getRandomInt(6), window.derivatives)
    let key = window.m_dx(key_value[0]) + "= "
    let value = key_value[1]
    window.quiz.push([key,value])
}
function generate_trig_eval() {
    let ratio = 0;
    if (getRandomInt(2) == 0) {
        ratio = getRandomInt(15) / 4.0
    }
    else {
        ratio = getRandomInt(18) / 6.0
    }
    let radian = ratio * Math.PI
    let ratioFraction = math.fraction(ratio)
    let radianString = `\\frac{${ratioFraction.n}\\pi}{${ratioFraction.d}}`
    let key_value = get_key_value_of_dict(getRandomInt(6), window.derivatives)
    let key = key_value[0].replace("x", radianString) + "= "
    let value = ""
    switch(key_value[1]) {
        case "cos(x)": value = math.cos(radian); break;
        case "-sin(x)": value = -math.sin(radian); break;
        case "sec^{2}(x)": value = math.pow(math.sec(radian), 2); break;
        case "-csc^{2}(x)": value = -math.pow(math.csc(radian), 2); break;
        case "sec(x)tan(x)": value = math.sec(radian) * math.tan(radian); break;
        case "csc(x)cot(x)": value = -1 * math.csc(radian) * math.cot(radian); break;
    }
    value = math.fraction(value)
    value = `\\frac{${value.n}}{${value.d}}`
    console.log(`${key},${value}`)
    window.quiz.push([key,value])
}
function get_key_value_of_dict(index, dict) {
    i = 0
    for(let key in dict) {
        if (i == index) {return [key, dict[key]]}
        i++
     }
}
function reveal() {
    display_value()
    MathJax.typeset();
}