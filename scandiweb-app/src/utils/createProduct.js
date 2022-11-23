
function createProductWithSelectedAttribtues(product, activeAttributes) {

    const newProduct = structuredClone(product);
    if (!activeAttributes) {
        if (newProduct.attributes) {
            newProduct.attributes.map((attr) => (
                newProduct.activeAttributes = { ...newProduct.activeAttributes, [attr.id]: attr.items[0].value }
            ));
            newProduct.unicalId = newProduct.id.slice(0, 6)
            return newProduct
        } else {
            newProduct.unicalId = newProduct.id.slice(0, 6) + Object.values(newProduct.activeAttributes)
            return newProduct
        }
    } else {
        newProduct.activeAttributes = activeAttributes;
        newProduct.unicalId = newProduct.id.slice(0, 6) + Object.values(activeAttributes)
        if (Object.keys(newProduct.activeAttributes).length < newProduct.attributes.length) {
            alert("missing attributes")
        }
        else {
            return newProduct
        }
    }

}
export default createProductWithSelectedAttribtues