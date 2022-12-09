import React from 'react';
import { useQuery } from '@apollo/client/react/hooks';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PizzaItem from './PizzaItem';
import CardItemSkeleton from '../common/CardItemSkeleton';
import PizzaModal from './PizzaModal';
import PageHeader from '../common/PageHeader';
//import Box from '@mui/material/Box';
//import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';

const Pizzas: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();

  const { loading, data, error } = useQuery(GET_PIZZAS);

  const handleOpen = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  if (loading) {
    return <CardItemSkeleton data-testid={'pizza-list-loading'}>Pizza-list loading!</CardItemSkeleton>;
  }

  if (error) {
    return <div>`Error! ${error.message}`</div>;
  }

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} handleOpen={handleOpen} pizza={pizza} />
  ));
  console.log(PizzaList);

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizzas'} />
      <PizzaItem key="Create-pizza?" handleOpen={handleOpen} />
      {PizzaList}
      <PizzaModal selectedPizza={selectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Pizzas;

/*
  <div>
      <Box sx={{ flexGrow: 1 }}>
        <PageHeader pageHeader={'Pizzas'} />
          <PizzaItem handleOpen={handleOpen} />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(data?.pizzas.map((pizza: Pizza) => (
              <Grid item xs={4} sm={4} md={4}>
                <PizzaItem
                  data-testid={`pizza-item-${pizza?.id}`}
                  key={pizza.id}
                  handleOpen={handleOpen}
                  pizza={pizza}
                />
              </Grid>
            ))
          )}
        </Grid>
        <PizzaModal selectedPizza={selectedPizza} open={open} setOpen={setOpen} />
      </Box>
    </div>
Save this for later when I want to clean things up!
    */
