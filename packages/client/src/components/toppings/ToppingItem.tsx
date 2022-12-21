import { IconButton, ListItem } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';

import toDollars from '../../lib/format-dollars';
import { Topping } from '../../types';

export interface ToppingItemProps {
  topping?: Topping;
  handleOpen: (topping?: Topping) => void;
}

const ToppingItem: React.FC<ToppingItemProps> = ({ topping, handleOpen, ...props }) => {
  return (
    <ListItem {...props}>
      <p data-testid={`topping-name-${topping?.id}`}>{topping?.name ?? 'Add topping'}</p>
      <div>
        <p data-testid={`topping-price-${topping?.id}`}>{topping?.priceCents ? toDollars(topping.priceCents) : ''}</p>
        <IconButton edge="end" aria-label="modify" type="button" onClick={(): void => handleOpen(topping)}>
          {topping ? <Edit /> : <AddCircle />}
        </IconButton>
      </div>
    </ListItem>
  );
};

export default ToppingItem;
