import { gql } from '@apollo/client';

export const UPDATE_PIZZA = gql`
  mutation ($updatePizzaInput: UpdatePizzaInput!) {
    updatePizza(input: $updatePizzaInput) {
      description
      id
      imgSrc
      name
      priceCents
      toppings {
        id
        name
        priceCents
      }
    }
  }
`;
