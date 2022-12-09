import { Pizza } from '../../types';
import toDollars from '../../lib/format-dollars';
import * as React from 'react';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
//import Typography from '@mui/material/Typography';
//import { CardActionArea, CardActions, IconButton } from '@mui/material';
import { IconButton } from '@mui/material';
import { AddCircle, Edit } from '@material-ui/icons';
import CardItem from '../common/CardItem';
export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  return (
    <CardItem {...props}>
      <div>
        <p data-testid={`pizza-name-${pizza?.id}`}>{pizza?.name}</p>
        <p data-testid={`pizza-description-${pizza?.id}`}>{pizza?.description}</p>
        <img
          src={pizza?.imgSrc}
          style={{ maxWidth: 300, maxHeight: 300 }}
          data-testid={`pizza-image-${pizza?.id}`}
        ></img>
        <p data-testid={`pizza-toppings-${pizza?.id}`}>{pizza?.toppings.map((topping) => topping.name).join(', ')}</p>
        <p data-testid={`pizza-price-${pizza?.id}`}>{pizza?.priceCents ? toDollars(pizza.priceCents) : ''}</p>
        <IconButton edge="end" aria-label="modify" type="button" onClick={(): void => handleOpen(pizza)}>
          {pizza ? <Edit /> : <AddCircle />}
        </IconButton>
      </div>
    </CardItem>
  );
};

export default PizzaItem;

/*
 <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza?.id} handleOpen={handleOpen} pizza={pizza}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            height="200"
            image={pizza?.imgSrc}
            src="https://img5.goodfon.com/original/2500x1280/e/f1/minimalizm-stil-fon-art-art-style-background-illustration--4.jpg"
            component="div"
            data-testid={`pizza-image-${pizza?.id}`}
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
            data-testid="mod-button"
            onClick={(): void => handleOpen(pizza)}
          >
            Create or Edit Pizza!
            {pizza ? <Edit /> : <AddCircle />}
          </IconButton>
        </CardActions>
      </Card>
    </PizzaItem>
    */
