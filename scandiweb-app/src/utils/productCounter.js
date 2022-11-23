
export default function productCounter(items) {
    let quantity = items.reduce((acumulator, curValue) => {
        acumulator += Number(curValue.quantity)
        return acumulator
      }, 0)
    return quantity
}