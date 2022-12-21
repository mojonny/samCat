import { merge } from 'lodash/fp';
import { toppingResolver } from './topping.resolver';
import { pizzaResolver } from './pizza.resolver';

const resolvers = merge(toppingResolver, pizzaResolver);

export { resolvers };
