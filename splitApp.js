document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userName = document.getElementById('name').value;
    var userPhoneNumber = document.getElementById('phone').value;
    var userEmail = document.getElementById('email').value;

    var contacts = {
        name: userName,
        phone: userPhoneNumber,
        email: userEmail
    };

    saveContact(contacts);
    clearForm();
});

function saveContact(contacts) {
    var existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    alert(existingContacts)
    existingContacts.push(contacts);
    localStorage.setItem("contacts", JSON.stringify(existingContacts));
    updateTable();
}

function clearForm() {
    document.getElementById('contactForm').reset();
}

function updateTable() {
    let tbody = document.getElementById('tableBody');
    tbody.innerHTML = ""; 
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.forEach(function(contact, index) { 
        var newRow = "<tr><td>" + contact.name + "</td><td>" + contact.phone + "</td><td>" + contact.email + "</td><td><button class='btn btn-danger' onclick='confirmDelete(" + index + ")'>Delete</button></td></tr>";
        tbody.innerHTML += newRow;
    });
}




function confirmDelete(index) {
    if (confirm("Are you sure you want to delete this contact?")) {
        deleteContact(index);
    }
}

function deleteContact(index) {
    
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    updateTable();
}

updateTable();

const userData = JSON.parse(localStorage.getItem('contacts'));
const checkboxContainer = document.getElementById('checkboxContainer');

if (userData && userData.length > 0) {
    userData.forEach(user => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'personsInvolved[]';
        checkbox.value = user.name; 
        const label = document.createElement('label');
        label.textContent = user.name;

        const lineBreak = document.createElement('br');

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(lineBreak);
    });

    const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            var checkedCount = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked').length;
            if (checkedCount > 10) {
                this.checked = false;
            }
        });
    });
}

function dropdown(dropdownId) {
    const userData = JSON.parse(localStorage.getItem('contacts'));
    if (userData && Array.isArray(userData)) {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select an Option';
        dropdown.appendChild(defaultOption);

        userData.forEach(user => {
            const option = document.createElement('option');
            option.value = user.name; 
            option.textContent = user.name; 
            dropdown.appendChild(option);
        });
    }
}

dropdown('paidBy');


document.getElementById('transactionForm').addEventListener('submit', function(event) {
    debugger;
    event.preventDefault();
    var amount = document.getElementById('number').value;
    var purpose = document.getElementById('purpose').value;
    var paidBy = document.getElementById('paidBy').value;
    var personsInvolved = getCheckedPersons(); 

    var transaction = {
        amount: amount,
        purpose: purpose,
        paidBy: paidBy,
        personsInvolved: personsInvolved
    };


    saveTransaction(transaction); 

    clearForm();

});

function getCheckedPersons() {
    var checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked');
    var checkedPersons = [];
    checkboxes.forEach(function(checkbox) {
        checkedPersons.push(checkbox.value);
    });
    return checkedPersons;
}

function sendMessage(amount, purpose) {
    var message = "You need to pay " + amount + " rupees for " + purpose;
    alert("Message sent: " + message); 
}
function saveTransaction(transaction) {
    debugger
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateTransactionTable();

}

function calculateSplitAmount(amount, numberOfPersons) {
    if (numberOfPersons > 0) {
        return amount / numberOfPersons;
    } else {
        return 0; 
    }
}

function clearForm() {
    document.getElementById('transactionForm').reset();
}



document.addEventListener('DOMContentLoaded', function() {
    updateTransactionTable();
});


function updateTransactionTable() {
    let tbody = document.getElementById('tableTransactionBody');
    tbody.innerHTML = ""; 
    var transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.forEach(function(transaction, index) {
        var newRow1 =
        
                    + "<td>" + transaction.amount + "</td>"
                    + "<td>" + transaction.purpose + "</td>"
                    + "<td>" + transaction.paidBy + "</td>"
                    + "<td>" + (transaction.personsInvolved ? transaction.personsInvolved.join(', ') : '') + "</td>"
                    + "<td>" + calculateSplitAmount(transaction.amount, transaction.personsInvolved ? transaction.personsInvolved.length : 0) + "</td>"
                    + "<td><button class='btn btn-danger' onclick='deleteTransaction("+index+")'>Delete</button></td>"
                    + "<td><button class='btn btn-primary send-button' onclick='sendMessage(" + transaction.amount + ", \"" + transaction.purpose + "\")'>Send</button></td>"
                    + "</tr>";
        tbody.innerHTML += newRow1;
    });
}

function deleteTransaction(index) {
    if (confirm("Are you sure you want to delete this column?")) {
        deleteTransactionColumn(index);
    }
}

function deleteTransactionColumn(index) {
    
    var transaction = JSON.parse(localStorage.getItem("transactions")) || [];
    transaction.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transaction));
    updateTransactionTable();
}

