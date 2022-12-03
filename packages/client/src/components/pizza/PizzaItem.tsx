import CardItem from '../common/CardItem';
import { Pizza } from '../../types';
import toDollars from '../../lib/format-dollars';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton } from '@mui/material';
import { AddCircle, Edit } from '@material-ui/icons';
export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  return (
    <CardItem {...props}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            height="200"
            image={pizza?.imgSrc}
            src="https://img5.goodfon.com/original/2500x1280/e/f1/minimalizm-stil-fon-art-art-style-background-illustration--4.jpg"
            component="div"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" data-testid={`pizza-name-${pizza?.id}`}>
              {pizza?.name}
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
          <IconButton
            key="modify"
            edge="end"
            aria-label="modify"
            type="button"
            size="small"
            color="primary"
            onClick={(): void => handleOpen(pizza)}
          >
            Create or Edit Pizza!
            {pizza ? <Edit /> : <AddCircle />}
          </IconButton>
        </CardActions>
      </Card>
    </CardItem>
  );
};

export default PizzaItem;
