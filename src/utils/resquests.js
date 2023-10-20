import axios, { headerConfig } from "./baseUrl";

export const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: headerConfig(),
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
}

export const postRequest = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(
            url,
            data,
            {
                headers: headerConfig(),
            }
        ).then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export const uploadFile = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(
            url,
            data,
            {
                headers: {
                    "x-access-token": sessionStorage.getItem("x-access-token"),
                    "Content-Type": "multipart/form-data"
                },
            }
        ).then((response) => {
            resolve(response)
        })
            .catch((error) => {
                reject(error)
            });
    })
}

export const getReports = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.get(
            url,
            data,
            {
                headers: headerConfig(),
            }
        ).then((response) => {
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            })
    }