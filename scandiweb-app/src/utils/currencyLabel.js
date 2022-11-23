

function currencyLabel(items, currencies) {
    return items[0]?.prices[items[0]?.prices.findIndex((element) => element.currency.label === currencies[1].label)].currency.symbol 
}
export default currencyLabel