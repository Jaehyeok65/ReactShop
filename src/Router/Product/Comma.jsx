




export const Comma = (price) => {
    let prices = parseInt(price); //toLocaleString을 사용하기 위해 int형으로로 형변환함
    let result = prices.toLocaleString();
    return result;
}
