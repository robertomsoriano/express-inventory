export const currentCartTotal = (cart) => {
    if (cart.length) {
        let quant = cart.map((item) => item.item_total);
        quant = quant.reduce((acc, curr) => acc + curr);
        let result = Math.round(quant * 100) / 100
        return result
    }
}