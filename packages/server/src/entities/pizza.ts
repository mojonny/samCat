import { Document } from 'mongodb';
import { Pizza } from '/application/providers/pizza/pizza.provider.types';

interface PizzaDocument extends Document, Omit<Pizza, 'toppingIds'> {}

const toPizzaObject = (pizza: PizzaDocument): Pizza => {
  return {
    id: pizza._id,
    name: pizza.name,
    description: pizza.description,
    toppings: pizza.toppings,
    toppingIds: pizza.toppingIds,
    imgSrc: pizza.imgSrc,
    priceCents: pizza.totalPriceOfToppings,
  };
};

export { PizzaDocument, toPizzaObject };
