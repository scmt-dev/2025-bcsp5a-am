const API_URL = 'https://wpitfaredsxfeudbwuzd.auth.ap-southeast-1.nhost.run/v1';

const message = document.getElementById('message');

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    message.style.display = 'none';
    if(!email) {
        message.style.display = 'block';
        message.style.color = 'red';
        message.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        message.innerText = 'Please enter email';
        return;
    }
    // request to api
    const req = await fetch(`${API_URL}/signin/email-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if(req.status === 401) {
        message.style.display = 'block';
        message.style.color = 'red';
        message.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        message.innerText = 'Invalid email or password';
        return;
    }

    // get response from api
    const data = await req.json();
    if(req.status === 200) {
        message.style.display = 'block';
        message.style.color = 'green';
        message.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        message.innerText = 'Sign in successfully';
        // save session to local storage
        localStorage.setItem('session', JSON.stringify(data.session));
        localStorage.setItem('token', data.session.accessToken);
        localStorage.setItem('user', JSON.stringify(data.session.user));
        // go to home
        window.location.href = 'index.html';
        return;
    }
    console.log(data);
}