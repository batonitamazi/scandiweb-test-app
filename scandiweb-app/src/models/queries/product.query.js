import {gql} from '@apollo/client'

export const GET_PRODUCT = gql`
    query getProductById($productId: String!){
        product(id: $productId){
            id
            name
            brand
            inStock
            category
            prices {
                currency {
                    symbol
                }
                amount
            }
            gallery
            description
            attributes {
                id
                name
                type
                items {
                    id
                    displayValue
                    value
                }
            }
        }
    }
`