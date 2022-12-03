import { gql } from '../../../../node_modules/apollo-server-core';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { pizzaProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from '../../src/application/schema/types/schema';

import { createMockTopping } from '../helpers/topping.helper';
import { createMockPizza } from '../helpers/pizza.helper';
import { TestClient } from '../helpers/client.helper';
import { ObjectId } from 'bson';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));
const mockTopping = createMockTopping();
const mockPizza = createMockPizza({ id: new ObjectId().toHexString(), toppings: [mockTopping] });

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, pizzaResolver);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query getPizzas {
          pizzas {
            id
            name
            description
            toppingIds
            toppings {
              id
              name
              priceCents
            }
            imgSrc
            priceCents
          }
        }
      `;
      test('should get all pizzas', async () => {
        jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue([mockPizza]);

        const result = await client.query({ query });

        expect(result.data).toEqual({
          pizzas: [
            {
              __typename: 'Pizza',
              id: mockPizza.id,
              name: mockPizza.name,
              description: mockPizza.description,
              toppingIds: mockPizza.toppingIds,
              toppings: mockPizza.toppings,
              imgSrc: mockPizza.imgSrc,
              priceCents: mockPizza.priceCents,
            },
          ],
        });

        expect(pizzaProvider.getPizzas).toHaveBeenCalledTimes(1);
      });
    });
  });
});
describe('Mutation', () => {
  describe('createPizza', () => {
    const mutation = gql`
      mutation ($input: CreatePizzaInput!) {
        createPizza(input: $input) {
          description
          imgSrc
          name
          toppingIds
        }
      }
    `;

    const validPizza = createMockPizza({
      name: 'test Pizza',
      description: 'E-Z-CHEESE-E',
      imgSrc:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      toppingIds: ['564f0184537878b57efcb703', 'a10d50e732a0b1d4f2c5e506'],
    });

    beforeEach(() => {
      jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(validPizza);
    });

    test('should call create a pizza when passed a valid input', async () => {
      const variables: MutationCreatePizzaArgs = {
        input: {
          name: validPizza.name,
          description: validPizza.description,
          imgSrc: validPizza.imgSrc,
          toppingIds: validPizza.toppingIds,
        },
      };

      await client.mutate({ mutation, variables });

      expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
    });
    test('should return created ZA when passed a valid input', async () => {
      const variables: MutationCreatePizzaArgs = {
        input: {
          name: validPizza.name,
          description: validPizza.description,
          imgSrc: validPizza.imgSrc,
          toppingIds: validPizza.toppingIds,
        },
      };

      const result = await client.mutate({ mutation, variables });

      expect(result.data).toEqual({
        createPizza: {
          __typename: 'Pizza',
          name: validPizza.name,
          description: validPizza.description,
          imgSrc: validPizza.imgSrc,
          toppingIds: validPizza.toppingIds,
        },
      });
    });
  });

  describe('deletePizza', () => {
    const mutation = gql`
      mutation ($input: DeletePizzaInput!) {
        deletePizza(input: $input)
      }
    `;

    const variables: MutationDeletePizzaArgs = { input: { id: mockPizza.id } };

    beforeEach(() => {
      jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(mockPizza.id);
    });

    test('should call deletePizza with id', async () => {
      await client.mutate({ mutation, variables });

      expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input.id);
    });

    test('should return deleted pizza id', async () => {
      const result = await client.mutate({ mutation, variables });

      expect(result.data).toEqual({
        deletePizza: mockPizza.id,
      });
    });
  });

  describe('updatePizza', () => {
    const mutation = gql`
      mutation ($input: UpdatePizzaInput!) {
        updatePizza(input: $input) {
          description
          id
          imgSrc
          name
          toppingIds
          priceCents
          toppings
        }
      }
    `;
    const updatedPizza = createMockPizza({
      name: 'UPDATED Pizza',
      description: 'E-Z-CHEESE-E',
      imgSrc:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      toppingIds: ['564f0184537878b57efcb703', 'a10d50e732a0b1d4f2c5e506'],
      toppings: [],
      priceCents: 450,
    });
    const variables: MutationUpdatePizzaArgs = {
      input: {
        id: mockPizza.id,
        name: updatedPizza.name,
        description: updatedPizza.description,
        imgSrc: updatedPizza.imgSrc,
        toppingIds: updatedPizza.toppingIds,
      },
    };

    beforeEach(() => {
      jest.spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatedPizza);
    });

    test('should call updatePizza with input', async () => {
      await client.mutate({ mutation, variables });

      expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
    });

    test('should return updated pizza', async () => {
      const result = await client.mutate({ mutation, variables });

      expect(result.data).toEqual({
        updatePizza: {
          ...updatedPizza,
        },
      });
    });
  });
});
