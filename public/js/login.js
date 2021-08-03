//login user
const loginFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const username = document.querySelector('#user').value.trim();
    const password = document.querySelector('#pwd').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        }); 
        if (response.ok) {
            document.location.replace('/dashboard');
            response.json().then(data => {
                alert(data.message);
            }) 
        } else {
            document.location.replace('/login');
            response.json().then(data => {
                alert(data.message);
            })
        };
    } else {
        document.location.reload('/login');
        alert('Username and/or password invalid.  Please try again.');
        };
;}

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);

