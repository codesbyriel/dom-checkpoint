//HTML Button variables
var budgetAssignBtn = document.querySelector(".budget-submit");
var createExpenseBtn = document.querySelector(".check-amount");

//Total Budget, Expense & Balance Display - InnerHTML
var totalBudgetMenu = document.querySelector(".toteBudget");
var totalBalanceMenu = document.querySelector(".BalBudget");
var totalExpenseMenu = document.querySelector(".ExpBudget");
var expenseDisplay = document.querySelector(".expenseDetails");

//Input Field Variables
var budgetAmountInput = document.querySelector(".budget-input");
var productTitleInput = document.querySelector(".product-title");
var productCostInput = document.querySelector(".product-cost");

//HTML Defaults
totalBudgetMenu.innerHTML = `<h4>Total Budget</h4>
<h4>0</h4>`;

totalBalanceMenu.innerHTML = `<h4>Balance</h4>
<h4>0</h4>`;

totalExpenseMenu.innerHTML = `<h4>Expenses</h4>
<h4>0</h4>`;

// Get value of the Budget inputed by the user in our HTML when we click on the button
budgetAssignBtn.addEventListener("click", function () {
    const budgetAmountValue = budgetAmountInput.value;
    assignBudget(budgetAmountValue);
});

createExpenseBtn.addEventListener("click", function () {
    const productTitle = productTitleInput.value;
    const productCost = productCostInput.value;

    assignExpenses(productTitle, productCost);
    calculateBalance();
});

var totalBudget = 0;
//assign budget variable to budget tab
function assignBudget(value) {
    if (value !== "") {
        totalBudget += parseInt(value);
        totalBudgetMenu.innerHTML = `<h4>Total Budget</h4>
        <h4>${totalBudget}</h4>`;
        budgetAmountInput.value = "";
    } else {
        alert("Input a Budget Amount");
    }
    calculateBalance();
}

var expenseTotalValue = 0;
//assign Expense variable to expense tab
function assignExpenses(expenseTitle, expensePrice) {
    if (totalBudget != 0) {
        if (expensePrice == "" && expenseTitle == "") {
            alert("Input an Expense");
            return "";
        }
        expenseTotalValue += parseInt(expensePrice);

        console.log(expenseTitle + " " + expensePrice);
        totalExpenseMenu.innerHTML = `<h4>Expenses</h4>
        <h4>${expenseTotalValue}</h4>`;

        productTitleInput.value = "";
        productCostInput.value = "";
        transferExpenseDetails(expenseTitle, expensePrice);
    } else {
        alert("Input your Budget");
        return 0;
    }
}

var expenseListDetails = [];

function transferExpenseDetails(detail1, detail2) {
    const date = new Date();
    const id = date.getMilliseconds();

    var expensePush = {
        id, // unique identity
        expTitle: detail1,
        expCost: detail2,
    };
    expenseListDetails.push(expensePush);
    addToExpenseList();
}

var totalBalance = 0;

//Sum and calculate balance in balance tab
function calculateBalance() {
    totalBalance = totalBudget - expenseTotalValue;
    totalBalanceMenu.innerHTML = `<h4>Balance</h4>
    <h4>${totalBalance}</h4>`;
}

function addToExpenseList() {
    console.log(expenseListDetails);
    expenseDisplay.innerHTML = "";
    for (let index = 0; index < expenseListDetails.length; index++) {
        const { expTitle, expCost, id } = expenseListDetails[index];

        expenseDisplay.innerHTML += `<div class="list"> ${index}
        <h5>${expTitle}</h5>
        <h5>$${expCost}</h5>
        <div>
        <span class="material-symbols-outlined edit_button" data-id="${id}">
        edit_note
        </span>
        <span class="material-symbols-outlined delete-button" data-id="${id}">
        delete_forever
        </span>
        </div>
        </div>`;
    }
}

expenseDisplay.addEventListener("click", function (event) {
    let deleteButton = event.target.classList.contains("delete-button");nodfe 
    let editButton = event.target.classList.contains("edit_button")
    let getExpenseID = event.target.getAttribute("data-id");

    if (deleteButton) {
        var IDforExpense = expenseListDetails.findIndex(function (ExpDetails) {
            return ExpDetails.id == getExpenseID;
        });
        edit(IDforExpense);
    }

    if (editButton) {
        var IDforExpDetails = expenseListDetails.findIndex(function (expenseDet) {
            return expenseDet.id == getExpenseID;
        })
        productCostInput.value = expenseListDetails[IDforExpDetails].expCost;
        productTitleInput.value = expenseListDetails[IDforExpDetails].expTitle;

        edit(IDforExpDetails);
    }

    function edit(deleteID) {
        totalBalance += parseInt(expenseListDetails[deleteID].expCost);
        //Re-updateHTML for Balance
        totalBalanceMenu.innerHTML = `<h4>Balance</h4>
        <h4>${totalBalance}</h4>`;
        
        expenseTotalValue -= expenseListDetails[deleteID].expCost;
        // Re-update HTML for Expense
        totalExpenseMenu.innerHTML = `<h4>Expenses</h4>
        <h4>${expenseTotalValue}</h4>`;

        expenseListDetails.splice(deleteID, 1);
        addToExpenseList();
    }
});



// Switch Theme Modes
var mainBody = document.querySelector(".theme-light");

var switchEffect = document.querySelector(".dark-circle");

var darkMode_Btn = document.querySelector("#dark");
var lightMode_Btn = document.querySelector("#light");

darkMode_Btn.addEventListener('click', function (theme_mode) {
    mainBody.classList.add("theme-dark");
    switchEffect.classList.add("dark-circle-animate")
    setTimeout(() => {
        switchEffect.classList.add("dark-circle-remove")
    }, 1000);

    console.log(switchEffect)
})

lightMode_Btn.addEventListener('click', function (theme_mode) {
    mainBody.classList.remove("theme-dark");
    switchEffect.classList.remove("dark-circle-remove");
    switchEffect.classList.remove("dark-circle-animate");

})
// expenseDisplay.addEventListener('click', function(event){
//     let element = event.target.classList.contains('delete-button');

//     if (element) {
//         var expenseID = event.target.getAttribute("data-id");

//         console.log(expenseID)
//         const filtered_exp = expenseListDetails.filter((exp) => exp.id.toString() !== expenseID);
//     }
//     console.log(typeof filtered_exp)
//     updateExpenses(filtered_exp);
// })
