export function GetApi(apiName) {
    return fetch('https://footballbet.com.ua/api/' + apiName + '/')
    .then((res) => {
        return res.json()
    }).then((answer) => {
        return answer.result
    })
}