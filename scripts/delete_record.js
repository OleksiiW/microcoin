document.getElementById("deleteButton").addEventListener("click", function() {
    const loanId = document.getElementById("loanId").value;
    
    if (!loanId) {
        alert('Loan ID cannot be empty');
        return;
    }

    const jwtToken = localStorage.getItem('jwtToken');

    const url = `http://127.0.0.1:5000/loan/${loanId}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        },
    })
    .then(response => {
        if(response.status === 401){
            alert("Session timed out, please log in again");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userId');
            window.location.href = "C:/microcoin/login";
            throw new Error('Unauthorized');
        } else if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(`Loan ID: ${loanId} successfully deleted`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
