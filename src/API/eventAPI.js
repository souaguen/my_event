export const getEvents = (locat) => {
    return fetch("http://localhost:8000/"+locat).then((res) => {
        return res.json();
    });
}

export const getPlaces = (query) => {
    return fetch("http://localhost:8000/address/"+query).then((res) => {
        return res.json();
    });
}

export const getCategories = () => {
    return fetch("http://localhost:8000/categories/c=").then((res) => {
        return res.json();
    });
}

export const loginSign = (data) => {
    console.log(data);
    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}