window.onload = function() {
  let userId = localStorage.getItem('userId'); 
  let token = localStorage.getItem('jwtToken'); 

  fetch(`http://127.0.0.1:5000/user/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    document.querySelector('#login').textContent = data.login || 'No data available';
    document.querySelector('#full_name').textContent = data.full_name || 'No data available';
    document.querySelector('#passport_number').textContent = data.passport_number || 'No data available';
    document.querySelector('#card_number').textContent = data.card_number || 'No data available';
    document.querySelector('#date_of_birth').textContent = data.date_of_birth || 'No data available';
    document.querySelector('#credit_history').textContent = data.credit_history || 'No data available';
    document.querySelector('#email').textContent = data.email || 'No data available';
    document.querySelector('#phone_number').textContent = data.phone_number || 'No data available';
  })
  .catch((error) => {
    console.error('Error:', error);
    window.location.href = "C:/microcoin/login.html";
	localStorage.removeItem('jwtToken');
	localStorage.removeItem('userId');
	alert('Connection timed out. Please log in again');
  });
}
