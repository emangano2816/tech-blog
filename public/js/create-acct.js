//create account for user
const createAccountFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const username = document.querySelector('#user').value.trim();
    const password = document.querySelector('#pwd').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/createaccount', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        }); 
        if (response.ok) {
            document.location.replace('/login');
            response.json().then(data => {
                alert(data.message);
            }) 
        } else {
            document.location.reload('/createaccount');
            response.json().then(data => {
                alert(data.message);
            });
        } 
    } else {
        document.location.reload('/createaccount');
        alert('Please provide a valid username and password.')   
    };
};

document
    .querySelector("#login-form")
    .addEventListener("submit", createAccountFormHandler);