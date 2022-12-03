import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_PIZZAS } from '../graphql/pizza/queries/get-pizzas';
import { CREATE_PIZZA } from '../graphql/pizza/mutations/create-pizza';
import { DELETE_PIZZA } from '../graphql/pizza/mutations/delete-pizza';
import { UPDATE_PIZZA } from '../graphql/pizza/mutations/update-pizza';
import { Topping } from '../../types';
import { ObjectId } from 'bson';

interface UsePizzaMutationsOutput {
  onCreatePizza: (selectedPizza: any) => void;
  onDeletePizza: (selectedPizza: any) => Promise<void>;
  onUpdatePizza: (selectedPizza: any) => void;
}

const usePizzaMutations = (): UsePizzaMutationsOutput => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'GetPizzas'] });
  const [deletePizza] = useMutation(DELETE_PIZZA, { refetchQueries: [GET_PIZZAS, 'GetPizzas'] });
  const [updatePizza] = useMutation(UPDATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'GetPizzas'] });

  const onCreatePizza = useCallback(
    (selectedPizza) => {
      console.log(selectedPizza);
      try {
        createPizza({
          variables: {
            createPizzaInput: {
              name: selectedPizza.name,
              description: selectedPizza.description,
              imgSrc: selectedPizza.imgSrc,
              toppingIds:
                selectedPizza.toppingIds ?? selectedPizza.toppings.map((topping: Topping) => new ObjectId(topping.id)),
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [createPizza]
  );

  const onDeletePizza = useCallback(
    async (selectedPizza) => {
      try {
        await deletePizza({
          variables: {
            deletePizzaInput: {
              id: selectedPizza.id,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [deletePizza]
  );

  const onUpdatePizza = useCallback(
    (selectedPizza) => {
      console.log(selectedPizza);
      try {
        updatePizza({
          variables: {
            updatePizzaInput: {
              id: selectedPizza.id,
              name: selectedPizza.name,
              description: selectedPizza.description,
              imgSrc: selectedPizza.imgSrc,
              toppingIds:
                selectedPizza.toppingIds ?? selectedPizza.toppings.map((topping: Topping) => new ObjectId(topping.id)),
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [updatePizza]
  );

  return { onCreatePizza, onDeletePizza, onUpdatePizza };
};

export default usePizzaMutations;
