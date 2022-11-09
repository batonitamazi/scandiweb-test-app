import { gql } from "@apollo/client";

const  GET_PRODUCTS = gql`
    query allProducts($category: $string) {
        category(input: {title: $title}) {
            products {
                id
                name
                brand
                gallery
                inStock
                prices {
                    currencies {
                        label
                        symbol
                    }
                    amount
                }
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
`
export default GET_PRODUCTS