import { ObjectId } from 'bson';
import { Pizza } from '../../src/application/schema/types/schema';
import { PizzaDocument } from '../../src/entities/pizza';

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId().toHexString(),
    name: 'Cheese',
    description: 'Simple',
    toppingIds: ['564f0184537878b57efcb703', 'a10d50e732a0b1d4f2c5e506'],
    toppings: [],
    imgSrc:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    priceCents: 450,
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    id: new ObjectId().toHexString(),
    name: 'Cheese',
    description: 'Simple',
    toppings: [],
    toppingIds: ['564f0184537878b57efcb703', 'a10d50e732a0b1d4f2c5e506'],
    imgSrc:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    priceCents: 450,
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument };
