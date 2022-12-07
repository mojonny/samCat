import { screen } from '@testing-library/react';
import { graphql } from 'msw';
import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { server } from '../../../lib/test/msw-server';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import Pizzas from '../Pizzas';
import { Pizza } from '../../../types';

describe('Pizzas', () => {
  const renderPizzaList = () => {
    const view = renderWithProviders(<Pizzas />);

    return {
      ...view,
      $findPizzaItems: () => screen.findAllByTestId('{`pizza-item-${pizza?.id}`}'),
      $findPizzaItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockPizzasQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
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

    expect(await $findPizzaItems()).toHaveLength(2);
  });
});
