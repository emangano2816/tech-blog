const loginFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const username = document.querySelector('#user').value.trim();
    const password = document.querySelector('#pwd').value.trim();

    console.log(username);
    console.log(password);

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        }); 
        if (response.ok) {
            document.location.replace('/dashboard');
            alert('Login successful.');
        } 
    } else {
        alert('Not able to login.');
        console.log('not logged in');
        };
;}

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);