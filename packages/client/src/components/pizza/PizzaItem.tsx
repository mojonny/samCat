import { Pizza } from '../../types';
import toDollars from '../../lib/format-dollars';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton, ListItem } from '@mui/material';
import { AddCircle, Edit } from '@material-ui/icons';
export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
  key?: string;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  return (
    <ListItem {...props}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <CardMedia component="img" height="194" image={pizza?.imgSrc} data-testid={`pizza-image-${pizza?.id}`} />

            <Typography variant="h5" color="text.primary" data-testid={`pizza-name-${pizza?.id}`}>
              {pizza?.name == undefined && <h2>Create your own pizza?</h2>}
            </Typography>
            <Typography variant="body2" color="text.secondary" data-testid={`pizza-description-${pizza?.id}`}>
              {pizza?.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" data-testid={`pizza-toppings-${pizza?.id}`}>
              {pizza?.toppings.map((topping) => topping.name).join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary" data-testid={`pizza-price-${pizza?.id}`}>
              {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="modify" type="button" onClick={(): void => handleOpen(pizza)}>
            {pizza ? <Edit /> : <AddCircle />}
          </IconButton>
        </CardActions>
      </Card>
    </ListItem>
  );
};

export default PizzaItem;

//"https://img5.goodfon.com/original/2500x1280/e/f1/minimalizm-stil-fon-art-art-style-background-illustration--4.jpg"
