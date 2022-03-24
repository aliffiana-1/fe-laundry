const base_url = "http://localhost:2000/laundry"
const image_url = "http://localhost:2000/image"

const formatNumber = (num) => {
    return parseFloat(num).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const authorization = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
}
export {
    formatNumber, 
    authorization,
    base_url,
    image_url
}
