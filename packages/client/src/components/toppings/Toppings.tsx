import React from 'react';
import { useQuery } from '@apollo/client/react/hooks';
import Box from '@mui/material/Box';

import { Topping } from '../../types';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import PageHeader from '../common/PageHeader';
import ToppingModal from './ToppingModal';
import ToppingItem from './ToppingItem';

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
        display: 'flex',
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 300,
      }}
    >
      <PageHeader pageHeader={'Toppings'} />
      <ul>
        <li>
          <h2>Topping</h2>
          <div>
            <h2>Price</h2>
            <h2>Modify</h2>
          </div>
        </li>
        <ToppingItem key="add-topping" handleOpen={handleOpen} />
        {toppingList}
      </ul>

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
