import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query GetPizzas {
    pizzas {
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

export { GET_PIZZAS };
