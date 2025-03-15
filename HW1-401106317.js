document.addEventListener("DOMContentLoaded", function () { // we use DOMContentLoaded in our js file

    function evaluateFormula(formulaTag, formulaExpression) {
        try {
            let scope = { // this object contains the values of the input fields
                fee: parseFloat(document.getElementById("fee")?.value) || 0,
                count: parseFloat(document.getElementById("count")?.value) || 0,
                discount: parseFloat(document.getElementById("discount")?.value) || 0,
                firstNumber: parseFloat(document.getElementById("firstNumber")?.value) || 0,
                secondNumber: parseFloat(document.getElementById("secondNumber")?.value) || 0,
                thirdNumber: parseFloat(document.getElementById("thirdNumber")?.value) || 0,
                fourthNumber: parseFloat(document.getElementById("fourthNumber")?.value) || 0,
                a: parseFloat(document.getElementById("a")?.value) || 0,
                b: parseFloat(document.getElementById("b")?.value) || 0,
                c: parseFloat(document.getElementById("c")?.value) || 0,
                x: parseFloat(document.getElementById("x")?.value) || 0,
            };
            
            let result = new Function("with(this) { return " + formulaExpression + " }").call(scope); // this is the section that we mainly evaluate the formulas, we create function for each formula
            
            formulaTag.textContent = `Result: ${result}`;
        } catch (error) { // if we have an error in our formula, it gets here
            formulaTag.textContent = "Invalid Formula";
        }
    }

    function attachListeners() { // this section is for event listeners, if any of the inputs gets triggered, the eventListener calls evaluateFormula
        document.querySelectorAll("formula").forEach(formulaTag => {
            let formulaExpression = formulaTag.getAttribute("evaluator");
            let inputIds = formulaExpression.match(/[a-zA-Z]+/g) || [];
            
            inputIds.forEach(id => {
                let inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.addEventListener("input", () => evaluateFormula(formulaTag, formulaExpression));
                }
            });
            
            evaluateFormula(formulaTag, formulaExpression);
        });
    }
    
    attachListeners();
});
