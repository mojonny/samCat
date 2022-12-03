import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaItem, { PizzaItemProps } from '../PizzaItem';
import { act } from 'react-dom/test-utils';

describe('PizzaItem', () => {
  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzaItem {...props} />);

    return {
      ...view,
      $getName: () => screen.getByTestId(/^pizza-name/),
      $getDescription: () => screen.getByTestId(/^pizza-description/),
      $getPrice: () => screen.getByTestId(/^pizza-price/),
      $getToppings: () => screen.getByTestId(/^pizza-toppings/),
      $getImage: () => screen.getByRole('img'),
      $getModifyButton: () => screen.getByRole('button'),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    pizza: createTestPizza(),
  };

  test('should display all components of the pizza item', async () => {
    const { $getImage, $getDescription, $getToppings, $getPrice, $getName, $getModifyButton } = renderPizzaList(props);

    expect($getImage()).toBeVisible();
    expect($getName()).toBeVisible();
    expect($getDescription()).toBeVisible();
    expect($getToppings()).toBeVisible();
    expect($getPrice()).toBeVisible();
    expect($getModifyButton()).toContain('Create or Edit Pizza!');
  });

  test('should call handleOpen when the modify button is clicked', async () => {
    const { $getModifyButton } = renderPizzaList(props);

    act(() => userEvent.click($getModifyButton()));

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});
