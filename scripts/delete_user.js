document.addEventListener('DOMContentLoaded', () => {
    const aboutUserButton = document.getElementById('aboutUserButton');
    const deleteButton = document.getElementById('deleteButton');

    aboutUserButton.addEventListener('click', getUserInfo);
    deleteButton.addEventListener('click', deleteUser);
});

function getUserInfo() {
    const userId = document.getElementById('userID').value;
    const jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://127.0.0.1:5000/user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    }).then(handleResponse)
    .then(showUserInfo)
    .catch(handleError);
}

function deleteUser() {
    const userId = document.getElementById('userID').value;
    const jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://127.0.0.1:5000/user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    }).then(handleResponse)
    .then(() => alert('User deleted successfully!'))
    .catch(handleError);
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else if (response.status === 404) {
        alert("Error 404: User not found");
    } else if (response.status === 401) {
        handleUnauthorized();
    } else {
        throw new Error('Server response was not ok.');
    }
}

function showUserInfo(data) {
    const hiddenUserInfo = document.querySelector('.hiddenUserInfo');
    const deleteButton = document.getElementById('deleteButton');

    document.getElementById('login').textContent = data.login;
    document.getElementById('fullName').textContent = data.full_name;
    document.getElementById('passportNumber').textContent = data.passport_number;
    document.getElementById('cardNumber').textContent = data.card_number;
    document.getElementById('dob').textContent = data.date_of_birth;
    document.getElementById('email').textContent = data.email;
    document.getElementById('phoneNumber').textContent = data.phone_number;

    hiddenUserInfo.style.display = 'block';
    deleteButton.style.display = 'block';
}

function handleUnauthorized() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    window.location.replace("C:/microcoin/login.html");
    alert("Session timed out, please log in again");
}

function handleError(err) {
    console.log('There was an error:', err);
}
