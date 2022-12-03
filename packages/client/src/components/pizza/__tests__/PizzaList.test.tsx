import { screen, waitFor, render } from '@testing-library/react';
import { graphql } from 'msw';
import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { server } from '../../../lib/test/msw-server';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import Pizzas from '../Pizzas';
import { Pizza } from '../../../types';

describe('PizzaList', () => {
  const renderPizzaList = () => {
    const view = renderWithProviders(<Pizzas />);

    return {
      ...view,
      $findPizzaItems: () => screen.findAllByTestId(/^pizza-item-/),
      $findPizzaItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockPizzasQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('GetPizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            pizzas: [...data],
          })
        );
      })
    );
  };

  beforeEach(() => {
    const pizza1 = createTestPizza();
    const pizza2 = createTestPizza();
    mockPizzasQuery([pizza1, pizza2]);
  });

  test('should display a list of pizzas', async () => {
    const { $findPizzaItems } = renderPizzaList();

    await waitFor(async () => {
      expect(await $findPizzaItems()).toHaveLength(2);
    });
  });

  test('to see if loading works', async () => {
    render(<Pizzas />);

    await waitFor(() => {
      expect(screen.queryByTestId('pizza-list-loading')).toBeVisible();
    });
  });
});
