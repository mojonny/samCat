import React from 'react';
import { useQuery } from '@apollo/client/react/hooks';
import Box from '@mui/material/Box';

import { Topping } from '../../types';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import PageHeader from '../common/PageHeader';
import ToppingModal from './ToppingModal';
import ToppingItem from './ToppingItem';
import { theme } from '../../theme/theme';

const Toppings: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedTopping, setSelectedTopping] = React.useState<Partial<Topping>>();

  const { loading, data } = useQuery(GET_TOPPINGS);

  const handleOpen = (topping?: Topping): void => {
    setSelectedTopping(topping);
    setOpen(true);
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  const toppingList = data?.toppings.map((topping: Topping) => (
    <ToppingItem
      data-testid={`topping-item-${topping?.id}`}
      key={topping.id}
      handleOpen={handleOpen}
      topping={topping}
    />
  ));

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 400,
      }}
    >
      <PageHeader pageHeader={'Toppings'} />

      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium', minWidth: theme.typography.pxToRem(375) }}
        >
          Topping
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            minWidth: theme.typography.pxToRem(260),
          }}
        >
          Price
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            minWidth: theme.typography.pxToRem(500),
          }}
        >
          Modify
        </Box>
      </Box>

      <ToppingItem key="add-topping" handleOpen={handleOpen} />
      {toppingList}

      <ToppingModal
        selectedTopping={selectedTopping}
        setSelectedTopping={setSelectedTopping}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default Toppings;
