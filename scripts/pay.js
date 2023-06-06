document.getElementById("payButton").addEventListener("click", function() {
    var loanId = document.getElementById("loanId").value;
    var amount = document.getElementById("amount").value;
	
	var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


    if (!loanId || !amount) {
        alert("Please fill in all the fields.");
        return;
    }

    var url = 'http://127.0.0.1:5000/loan';

    var data = {
        loan_id: loanId,
		//date: date,
        debt: amount	
    };

    var jwtToken = localStorage.getItem('jwtToken');

    fetch(url, {
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
        alert(data.Message);
    })
    .catch(err => {
        if (err.status === 401) {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userId');
            alert("Session timed out, please log in again");
            window.location.href = 'C:/microcoin/login.html';
        } else if (err.status === 404) {
            err.json().then(errorMessage => {
                alert(errorMessage.Error);
            });
        } else {
            console.log(err);
        }
    });
});
