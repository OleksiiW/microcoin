window.onload = function() {
    // Access the necessary DOM elements
    const loanAmountElement = document.getElementById('loanAmount');
    const loanDurationElement = document.getElementById('loanDuration');
    const repaymentAmountElement = document.getElementById('repaymentAmount');
    const submitButton = document.querySelector('button');
    const rangeValue = document.getElementById('rangeValue');

    loanAmountElement.oninput = updateRepaymentAmount;
    loanDurationElement.oninput = updateRepaymentAmount;
    submitButton.onclick = postLoanData;

    function updateRepaymentAmount() {
        let loanAmount = loanAmountElement.value ? Number(loanAmountElement.value) : 0;
        let loanDuration = Number(loanDurationElement.value);
        rangeValue.textContent = loanDuration;

        let repaymentAmount = loanAmount * Math.pow(1.3, loanDuration);
        repaymentAmountElement.value = repaymentAmount.toFixed(2);
    }

	function postLoanData() {
			
		let jwtToken = localStorage.getItem('jwtToken');
		let userId = localStorage.getItem('userId');

		// Get today's date in SQL format (YYYY-MM-DD)
		let today = new Date();
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

		let data = {
			// token: jwtToken,
			user_id: userId,
			debt: Number(loanAmountElement.value),
			date: date,
		};

        fetch('http://127.0.0.1:5000/loan', {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + jwtToken
			},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                window.location.href = 'C:/microcoin/waiting_room.html';
            } else if (response.status === 401) {
				window.location.href = 'C:/microcoin/login.html';
				localStorage.removeItem('jwtToken');
				localStorage.removeItem('userId');
                alert('Please log in again, your session has expired');
            } else if (response.status === 402) {
                alert('Bank has no reserve');
            } else if (response.status === 406) {
                alert('The minimum amount is 100 hryvnias');
			} else {
                alert('Try again later, if the problem persists, contact technical support');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}
