import { gql } from '@apollo/client';

export const CREATE_PIZZA = gql`
  mutation ($createPizzaInput: CreatePizzaInput!) {
    createPizza(input: $createPizzaInput) {
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
