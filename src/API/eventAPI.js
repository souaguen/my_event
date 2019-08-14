export const getEvents = (locat) => {
    return fetch("http://localhost:8000/"+locat, {
    }).then((res) => {
        return res.json();
    });
}