import { gql } from "@apollo/client";

export const  GET_PRODUCTS = gql`
    query allProducts($category: $string) {
        category(input: {title: $category}) {
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