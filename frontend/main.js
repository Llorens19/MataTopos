const verifyJWT = () => {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('http://localhost:4000/user', {
            headers: {
                'Authorization': 'Token ' + token,
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify(data));
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    } else {
        localStorage.removeItem('user');
        window.location.href = 'views/home/home.view.html';
    }
}









document.addEventListener('DOMContentLoaded', (event) => {
    verifyJWT();
});