const rankingData = () => {
    let data_ranking = [];
    fetch('http://localhost:4000/ranking', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            data_ranking = data
        })
        .catch(error => {
            console.log(error);
        });
    return data_ranking;
}






document.addEventListener('DOMContentLoaded', (event) => {

});