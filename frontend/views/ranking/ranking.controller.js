const rankingData = () => {
    return fetch('http://localhost:4000/ranking', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.ranking; 
        })
        .catch(error => {
            console.log(error);
        });
}





document.addEventListener('DOMContentLoaded', async (event) => {
    console.log(await rankingData());
});