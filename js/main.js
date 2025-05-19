function showMessage() {
    alert("SpendWise допоможе вам краще контролювати ваші фінанси!");
}

function addIncome(event) {
    event.preventDefault();
    const source = document.getElementById("incomeSource").value;
    const amount = parseFloat(document.getElementById("incomeAmount").value);

    if (!source || isNaN(amount)) return;

    const entry = document.createElement("li");
    entry.textContent = `${source}: ${amount} грн`;
    document.getElementById("incomeList").appendChild(entry);

    saveToLocalStorage("incomes", { source, amount });
    document.getElementById("incomeSource").value = "";
    document.getElementById("incomeAmount").value = "";
}

function addSpending(event) {
    event.preventDefault();
    const item = document.getElementById("spendingItem").value;
    const amount = parseFloat(document.getElementById("spendingAmount").value);

    if (!item || isNaN(amount)) return;

    const entry = document.createElement("li");
    entry.textContent = `${item}: ${amount} грн`;
    document.getElementById("spendingList").appendChild(entry);

    saveToLocalStorage("spendings", { item, amount });
    document.getElementById("spendingItem").value = "";
    document.getElementById("spendingAmount").value = "";
}

function saveToLocalStorage(key, value) {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(value);
    localStorage.setItem(key, JSON.stringify(existing));
}

function loadBudgetSummary() {
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const spendings = JSON.parse(localStorage.getItem("spendings")) || [];

    const totalIncome = incomes.reduce((sum, entry) => sum + entry.amount, 0);
    const totalSpending = spendings.reduce((sum, entry) => sum + entry.amount, 0);

    const summary = `Загальний дохід: ${totalIncome} грн, Витрати: ${totalSpending} грн`;
    const summaryElement = document.getElementById("budgetSummary");
    if (summaryElement) summaryElement.textContent = summary;
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("budgetSummary")) {
        loadBudgetSummary();
    }

    // Автозаповнення списків при перезавантаженні сторінки
    if (document.getElementById("incomeList")) {
        const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
        incomes.forEach(({ source, amount }) => {
            const entry = document.createElement("li");
            entry.textContent = `${source}: ${amount} грн`;
            document.getElementById("incomeList").appendChild(entry);
        });
    }

    if (document.getElementById("spendingList")) {
        const spendings = JSON.parse(localStorage.getItem("spendings")) || [];
        spendings.forEach(({ item, amount }) => {
            const entry = document.createElement("li");
            entry.textContent = `${item}: ${amount} грн`;
            document.getElementById("spendingList").appendChild(entry);
        });
    }
});