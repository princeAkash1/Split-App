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
    existingContacts.push(contacts);
    localStorage.setItem("contacts", JSON.stringify(existingContacts));
    updateTable();
}

function clearForm() {
    document.getElementById('contactForm').reset();
}

function updateTable() {
    var tbody = document.querySelector('#contactTable tbody');
    tbody.innerHTML = ""; // Clear table body
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.forEach(function(contact, index) { // Added 'index' parameter
        var newRow = "<tr><td>" + contact.name + "</td><td>" + contact.phone + "</td><td>" + contact.email + "</td><td><button class='btn btn-danger' onclick='confirmDelete(" + index + ")'>Delete</button></td></tr>"; // Passed 'index' to confirmDelete()
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

// Call updateTable() on page load
updateTable();

// Assume userData contains the list of participants who went on the tour
const userData = JSON.parse(localStorage.getItem('contacts'));
const checkboxContainer = document.getElementById('checkboxContainer');

if (userData && userData.length > 0) {
    // Populate checkboxes for each participant
    userData.forEach(user => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'personsInvolved[]';
        checkbox.value = user.name; // Assuming 'name' is the property that holds the user's name

        const label = document.createElement('label');
        label.textContent = user.name;

        const lineBreak = document.createElement('br');

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(lineBreak);
    });

    // Limit the selection to only 100 participants
    const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            var checkedCount = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked').length;
            if (checkedCount > 100) {
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
            option.value = user.name; // Assuming 'name' is the property that should be displayed in the dropdown
            option.textContent = user.name; // Assuming 'name' is the property that should be displayed in the dropdown
            dropdown.appendChild(option);
        });
    }
}

// Call dropdown function with the appropriate dropdown ID
dropdown('paidBy');

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

document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var amount = document.getElementById('number').value;
    var purpose = document.getElementById('purpose').value;
    var paidBy = document.getElementById('paidBy').value;
    var personsInvolved = getCheckedPersons(); // Call a function to retrieve checked persons

    var transaction = {
        amount: amount,
        purpose: purpose,
        paidBy: paidBy,
        personsInvolved: personsInvolved
    };


    saveTransaction(transaction); // Save the transaction to localStorage
    appendTransactionToTable(transaction); // Append the transaction to the table

    clearForm();

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
function appendTransactionToTable(transaction) {
    var newRow = "<tr>";
    newRow += "<td>" + (document.querySelectorAll('#transactionsTable tbody tr').length + 1) + "</td>";
    newRow += "<td>" + transaction.amount + "</td>";
    newRow += "<td>" + transaction.purpose + "</td>";
    newRow += "<td>" + transaction.paidBy + "</td>";
    newRow += "<td>" + transaction.personsInvolved.join(', ') + "</td>";
    newRow += "<td>" + calculateSplitAmount(transaction.amount, transaction.personsInvolved.length) + "</td>";
    newRow += "<td><button class='btn btn-danger' onclick='confirmDelete(this.parentNode.parentNode.rowIndex)'>Delete</button></td>";
    newRow += "<td><button class='btn btn-primary send-button'>Send</button></td>";
    newRow += "</tr>";

    document.getElementById('transactionsTable').getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', newRow);

    // Add event listener for the send button in this row
    var sendButton = document.querySelector('#transactionsTable tbody tr:last-child .send-button');
    sendButton.addEventListener('click', function() {
        sendMessage(transaction.amount, transaction.purpose);
    });
}



function sendMessage(amount, purpose) {
    // Logic to send message with payment details
    var message = "You need to pay " + amount + " rupees for " + purpose;
    alert("Message sent: " + message); // For demonstration, you can replace this with your actual message sending logic
}
function saveTransaction(transaction) {
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
function loadTransactions() {
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(function(transaction) {
        appendTransactionToTable(transaction);
    });
}

loadTransactions();





function calculateSplitAmount(amount, numberOfPersons) {
    // Ensure numberOfPersons is greater than 0 to avoid division by zero
    if (numberOfPersons > 0) {
        return amount / numberOfPersons;
    } else {
        return 0; // Handle the case where numberOfPersons is 0 or less
    }
}
function saveContact(contacts) {
    var existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    existingContacts.push(contacts);
    localStorage.setItem("contacts", JSON.stringify(existingContacts));
    updateTable();
}

function clearForm() {
    document.getElementById('contactForm').reset();
}

function updateTable() {
    var tbody = document.querySelector('#contactTable tbody');
    tbody.innerHTML = ""; // Clear table body
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.forEach(function(contact, index) { // Added 'index' parameter
        var newRow = "<tr><td>" + contact.name + "</td><td>" + contact.phone + "</td><td>" + contact.email + "</td><td><button class='btn btn-danger' onclick='confirmDelete(" + index + ")'>Delete</button></td></tr>"; // Passed 'index' to confirmDelete()
        tbody.innerHTML += newRow;
    });
}

function confirmDelete(index) {
    if (confirm("Are you sure you want to delete this data?")) {
        deleteContact(index);
    }
}

function deleteContact(index) {
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    updateTable();
}
