document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = 'admin.html';
        } else {
            const data = await response.json();
            errorMessage.textContent = data.detail;
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Đã xảy ra lỗi. Vui lòng thử lại.';
    }
});
