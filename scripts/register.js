document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();

    var login = document.querySelector('input[name="uname"]').value;
    var password = document.querySelector('input[name="psw"]').value;
    var fullname = document.querySelector('input[name="fullname"]').value;
    var passport = document.querySelector('input[name="passport"]').value;
    var cardnum = document.querySelector('input[name="cardnum"]').value;
    var dob = document.querySelector('input[name="dob"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var phone = document.querySelector('input[name="phone"]').value;

    var data = {
        login: login,
        password: password,
        full_name: fullname,
        passport_number: passport,
        card_number: cardnum,
        date_of_birth: dob
    };
	
	// Validate required fields
    if (!login || !password || !fullname || !passport || !cardnum || !dob) {
        alert('Please fill in all mandatory fields');
        return;
    }

    if (email) data.email = email;
    if (phone) data.phone_number = phone;

    fetch('http://127.0.0.1:5000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
			window.location.href = 'C:/microcoin/login.html';
            alert('Registration successful');
        } else if (data.Error) {
            alert(data.Error);
        } else if (data['Validation errors']) {
            alert(data['Validation errors'].join('\n'));
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
