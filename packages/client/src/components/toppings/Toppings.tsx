import React from 'react';
import { useQuery } from '@apollo/client/react/hooks';
import makeStyles from '@material-ui/styles/makeStyles';
import { Container, createStyles, List, ListItem, Theme } from '@material-ui/core';

import { Topping } from '../../types';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import PageHeader from '../common/PageHeader';
import ToppingModal from './ToppingModal';
import ToppingItem from './ToppingItem';
import { theme } from '../../theme/theme';

const StatWrapper = styled('div')(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)};
  min-width: 300px;
`
);

const StatHeader = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
`
);

const StyledTrend = styled(TrendingUpIcon)(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  font-size: 16px;
  vertical-alignment: sub;
`
);

const StatValue = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: 34px;
  font-weight: ${theme.typography.fontWeightMedium};
`
);

const StatDiff = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  display: inline;
  font-weight: ${theme.typography.fontWeightMedium};
  margin-left: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(0.5)};
`
);

const StatPrevious = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  display: inline;
  font-size: 12px;
`
);

return (
  <StatWrapper>
    <StatHeader>Sessions</StatHeader>
    <StatValue>98.3 K</StatValue>
    <StyledTrend />
    <StatDiff>18.77%</StatDiff>
    <StatPrevious>vs last week</StatPrevious>
  </StatWrapper>
);

const useStyles = styled(({ typography }: Theme) =>
  createStyles({
    container: {
      minWidth: theme.typography.pxToRem(650),
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    header: {
      display: 'flex',
    },
    name: {
      minWidth: theme.typography.pxToRem(500),
    },
    right: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
  })
);

const Toppings: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedTopping, setSelectedTopping] = React.useState<Partial<Topping>>();

  const { loading, data } = useQuery(GET_TOPPINGS);

  const handleOpen = (topping?: Topping): void => {
    setSelectedTopping(topping);
    setOpen(true);
  };

  if (loading) {
    return <div className={classes.skeleton}>Loading ...</div>;
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
    <Container maxWidth="md">
      <PageHeader pageHeader={'Toppings'} />
      <List className={classes.container}>
        <ListItem className={classes.header}>
          <h2 className={classes.name}>Topping</h2>
          <div className={classes.right}>
            <h2>Price</h2>
            <h2>Modify</h2>
          </div>
        </ListItem>
        <ToppingItem key="add-topping" handleOpen={handleOpen} />
        {toppingList}
      </List>

      <ToppingModal
        selectedTopping={selectedTopping}
        setSelectedTopping={setSelectedTopping}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
};

export default Toppings;
