import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query getProductsByCategory($category: String!) {
        category(input: { title: $category }) {
            products {
                id
                name
                brand
                gallery
                inStock
                prices {
                    currency {
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
`;