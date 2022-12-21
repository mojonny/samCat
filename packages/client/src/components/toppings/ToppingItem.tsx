import { IconButton, ListItem } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import Box from '@mui/material/Box';
import toDollars from '../../lib/format-dollars';
import { theme } from '../../theme/theme';
import { Topping } from '../../types';

export interface ToppingItemProps {
  topping?: Topping;
  handleOpen: (topping?: Topping) => void;
}

const ToppingItem: React.FC<ToppingItemProps> = ({ topping, handleOpen, ...props }) => {
  return (
    <ListItem {...props}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          minWidth: theme.typography.pxToRem(500),
        }}
        data-testid={`topping-name-${topping?.id}`}
      >
        <Box sx={{ color: 'text.primary', fontSize: 30, minWidth: theme.typography.pxToRem(400) }}>
          {' '}
          {topping?.name ?? 'Add topping'}
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Box> {topping?.priceCents ? toDollars(topping.priceCents) : ''}</Box>
          <IconButton aria-label="modify" type="button" onClick={(): void => handleOpen(topping)}>
            {topping ? <Edit /> : <AddCircle />}
          </IconButton>
        </Box>
      </Box>
    </ListItem>
  );
};

export default ToppingItem;
