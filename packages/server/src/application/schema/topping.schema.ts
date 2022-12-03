import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    toppings: [Topping!]!
  }

  type Topping {
    id: ObjectID!
    name: String!
    priceCents: Int!
  }

  input ToppingQueryArgs {
    id: ObjectID!
  }

  type Mutation {
    createTopping(input: CreateToppingInput!): Topping!
    deleteTopping(input: DeleteToppingInput!): ObjectID!
    updateTopping(input: UpdateToppingInput!): Topping!
  }

  input CreateToppingInput {
    name: String!
    priceCents: Int!
  }

  input DeleteToppingInput {
    id: ObjectID!
  }

  input UpdateToppingInput {
    id: ObjectID!
    name: String
    priceCents: Int
  }
`;

export { typeDefs };
