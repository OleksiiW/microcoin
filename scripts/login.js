document.getElementById('loginButton').addEventListener('click', (event) => {
    event.preventDefault();

    let uname = document.getElementsByName('uname')[0];
    let psw = document.getElementsByName('psw')[0];
    
    fetch('http://127.0.0.1:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'login': uname.value,
            'password': psw.value
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    })
    .then(json => {
        if(json.access_token && !json.role) {
            localStorage.setItem('jwtToken', json.access_token);
			localStorage.setItem('userId', json.user_id);
			window.location.href = 'C:/microcoin/home_user.html';
        } else if (json.access_token && json.role === "Admin") {
			localStorage.setItem('jwtToken', json.access_token);
			localStorage.setItem('userId', json.user_id);
			window.location.href = 'C:/microcoin/admin/panel.html';
		}
		
    })
    .catch(response => {
        response.json().then(error => {
            if (response.status === 404) {
                uname.value = '';
                uname.placeholder = error.message;
                psw.value = '';
                psw.placeholder = 'Enter Password';
            } else if (response.status === 403) {
                psw.value = '';
                psw.placeholder = error.message;
            }
        });
    });
});
