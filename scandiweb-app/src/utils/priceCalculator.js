

function priceCalculator(items, currencies) {
    let calculatedPrice = items && items.reduce((acumulator, curValue) => {
        acumulator += Number(curValue.prices[curValue.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * curValue.quantity);
        return acumulator
    }, 0)
    return calculatedPrice.toFixed(2)

}
export default priceCalculator