import React from 'react';
import { useQuery } from '@apollo/client/react/hooks';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PizzaItem from './PizzaItem';
import PizzaModal from './PizzaModal';
import PageHeader from '../common/PageHeader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Pizzas: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();

  const { loading, data, error } = useQuery(GET_PIZZAS);

  const handleOpen = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  if (loading) {
    return <Box data-testid={'pizza-list-loading'}>Pizza-list loading!</Box>;
  }

  if (error) {
    return <div>`Error! ${error.message}`</div>;
  }

  const pizzaList = data?.pizzas.map((pizza: Pizza) => (
    <Grid item xs={4} sm={4} md={4} key="Grid">
      <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} handleOpen={handleOpen} pizza={pizza} />
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }} key="box">
      <PageHeader pageHeader={'Pizzas'} />
      <PizzaItem handleOpen={handleOpen} />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} key="Grid">
        {Array.from(`${pizzaList}`)}
      </Grid>
      <PizzaModal selectedPizza={selectedPizza} open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Pizzas;
