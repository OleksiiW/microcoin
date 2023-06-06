document.getElementById('changeButton').addEventListener('click', function() {
    const userId = document.getElementById('userId').value;
    const login = document.getElementById('login').value;
    const fullName = document.getElementById('fullName').value;
    const passportNumber = document.getElementById('passportNumber').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    let data = {"user_id": userId};

    if (login) data["login"] = login;
    if (fullName) data["full_name"] = fullName;
    if (passportNumber) data["passport_number"] = passportNumber;
    if (cardNumber) data["card_number"] = cardNumber;
    if (dob) data["date_of_birth"] = dob;
    if (email) data["email"] = email;
    if (phoneNumber) data["phone_number"] = phoneNumber;

    const jwtToken = localStorage.getItem('jwtToken');

    fetch('http://127.0.0.1:5000/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    })
    .then(data => {
        alert('User has been updated successfully.');
    })
    .catch(err => {
        if (err.status === 404) {
            alert("Error 404: User not found");
        } else if (err.status === 403) {
            alert("Error 403: Forbidden, because user with this like data already exists!");
        } else if (err.status === 405) {
            alert("Error 405: Validation error");
        } else if (err.status === 401) {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userId');
            window.location.replace("C:/microcoin/login.html");
            alert("Session timed out, please log in again");
        }
    });
});
