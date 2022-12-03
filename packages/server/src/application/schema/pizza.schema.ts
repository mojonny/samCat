import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    pizzas: [Pizza!]!
  }

  type Topping {
    id: ObjectID!
    name: String!
    priceCents: Int!
  }

  type Pizza {
    description: String!
    id: ObjectID!
    imgSrc: String!
    name: String!
    priceCents: Float!
    toppings: [Topping!]!
    toppingIds: [String!]!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
    updatePizza(input: UpdatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [String!]!
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [String!]!
  }
`;

export { typeDefs };

/* export type Pizza = {
  __typename?: 'Pizza';
  description: Scalars['String'];
  id: Scalars['ObjectID'];
  imgSrc: Scalars['String'];
  name: Scalars['String'];
  priceCents: Scalars['Long'];
  toppings: Array<Topping>;
};
};
*/
