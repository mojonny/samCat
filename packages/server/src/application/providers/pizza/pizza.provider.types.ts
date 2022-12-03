import { Topping } from '../toppings/topping.provider.types';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppings: Topping[];
  toppingIds: string[];
  priceCents: number;
}
export interface CreatePizzaInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: string[];
}

export interface UpdatePizzaInput {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: string[];
}
