document.addEventListener("DOMContentLoaded", function () {
  const loginPage = document.getElementById('loginPage');
  const investmentPage = document.getElementById('investmentPage');
  const logoutPage = document.getElementById('logoutPage');

  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');
  const loginAgainLink = document.getElementById('loginAgainLink');
  const longTermTab = document.getElementById('longTermTab');

  loginButton.addEventListener("click", login);
  logoutButton.addEventListener("click", logout);
  loginAgainLink.addEventListener("click", goToLoginPage);
  longTermTab.addEventListener("click", function () {
    showTabContent("longTermContent");
    calculateTotal();
  });

  // Attach the function to input change events for short-term investments
  ["ppfInvested", "ppfCurrent", "epfInvested", "epfCurrent", "npsInvested", "npsCurrent", "stocksInvested", "stocksCurrent", "mfInvested", "mfCurrent", "savingsInvested", "savingsCurrent", "peerFDInvested", "peerFDCurrent", "savingsAccountInvested", "savingsAccountCurrent", "goldInvested", "goldCurrent", "govtECSInvested", "govtECSCurrent", "rentInvested", "rentCurrent"].forEach(id => {
    document.getElementById(id).addEventListener("input", calculateTotal);
  });

  function showPage(pageElement) {
    [loginPage, investmentPage, logoutPage].forEach(page => {
      page.style.display = (page === pageElement) ? 'block' : 'none';
    });
  }

  function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'Sridhar' && password === '123456') {
      showPage(investmentPage);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

  function goToLoginPage() {
    showPage(loginPage);
  }

  function logout() {
    showPage(logoutPage);
  }

  function showTabContent(tabId) {
    const tabContents = document.querySelectorAll(".tabContent");
    tabContents.forEach(content => {
      content.style.display = (content.id === tabId) ? "block" : "none";
    });
  }

  function calculateProfitLoss() {
    var investedAmount = parseFloat(document.getElementById("investedAmount").value) || 0;
    var currentAmount = parseFloat(document.getElementById("currentAmount").value) || 0;
    var profitLoss = currentAmount - investedAmount;
    var percentageChange = (profitLoss / investedAmount) * 100;
    document.getElementById("profitLoss").innerHTML = profitLoss.toFixed(2);
    document.getElementById("profitLoss").style.color = (profitLoss >= 0) ? "green" : "red";
    document.getElementById("percentageChange").innerHTML = percentageChange.toFixed(2) + "%";
    document.getElementById("percentageChange").style.color = (percentageChange >= 0) ? "green" : "red";
  }

  function calculateTotal() {
    var longTermInvestedInputs = document.querySelectorAll(".longTermTable .amountInput[id$='Invested']");
    var longTermCurrentInputs = document.querySelectorAll(".longTermTable .amountInput[id$='Current']");
    var shortTermInvestedInputs = document.querySelectorAll(".shortTermTable .amountInput[id$='Invested']");
    var shortTermCurrentInputs = document.querySelectorAll(".shortTermTable .amountInput[id$='Current']");

    var totalLongTermInvested = calculateTotalForInputs(longTermInvestedInputs);
    var totalLongTermCurrent = calculateTotalForInputs(longTermCurrentInputs);
    var totalShortTermInvested = calculateTotalForInputs(shortTermInvestedInputs);
    var totalShortTermCurrent = calculateTotalForInputs(shortTermCurrentInputs);

    var totalInvested = totalLongTermInvested + totalShortTermInvested;
    var totalCurrent = totalLongTermCurrent + totalShortTermCurrent;

    document.getElementById("investedAmount").value = totalInvested.toFixed(2);
    document.getElementById("currentAmount").value = totalCurrent.toFixed(2);

    calculateProfitLoss();
  }

  function calculateTotalForInputs(inputs) {
    var total = 0;
    inputs.forEach(function (input) {
      total += parseFloat(input.value) || 0;
    });
    return total;
  }

  calculateProfitLoss();
  calculateTotal();
  showPage(loginPage);
});
