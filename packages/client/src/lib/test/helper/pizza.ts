import { ObjectId } from 'bson';

import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'Cheese',
  priceCents: 3_50,
  description: 'Simple',
  imgSrc: 'imageURL',
  toppings: [{ id: new ObjectId().toHexString(), name: 'A topping', priceCents: 3_50 }],
  toppingIds: ['564f0184537878b57efcb703', 'a10d50e732a0b1d4f2c5e506'],
  ...data,
});
