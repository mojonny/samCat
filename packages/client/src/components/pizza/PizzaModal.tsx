/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useQuery } from '@apollo/client/react/hooks';
import { Delete } from '@material-ui/icons';
import {
  Backdrop,
  createStyles,
  makeStyles,
  Modal,
  Theme,
  TextField,
  Paper,
  Fade,
  Select,
  FormControl,
  IconButton,
  MenuItem,
  Button,
} from '@material-ui/core';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { Formik, Form, FormikProps } from 'formik';
import { Topping } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PizzaModal = ({ selectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();

  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();

  const { loading, data } = useQuery(GET_TOPPINGS);
  if (loading) {
    return <div>Loading ...</div>;
  }
  const toppingList = data?.toppings;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(): void => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <Formik
            initialValues={{
              name: selectedPizza?.name || '',
              description: selectedPizza?.description || '',
              imgSrc: selectedPizza?.imgSrc || '',
              toppings: selectedPizza?.toppings?.map((topping: any) => topping.id) ?? [],
            }}
            onSubmit={(values) => {
              selectedPizza ? onUpdatePizza({ ...values, id: selectedPizza.id }) : onCreatePizza(values);
              setOpen(false);
            }}
          >
            {(props: FormikProps<any>): JSX.Element => (
              <Form onSubmit={props.handleSubmit}>
                <h1>Pizzas!</h1>
                <label htmlFor="name">Pizza name</label>
                <TextField
                  id="name"
                  name="name"
                  placeholder="Pizza name"
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.name}
                />

                <label htmlFor="description">Description</label>
                <TextField
                  id="description"
                  name="description"
                  placeholder="Describe pizza"
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.description}
                />

                <label htmlFor="imgSrc">Image URL</label>
                <TextField
                  id="imgSrc"
                  name="imgSrc"
                  placeholder="Image url"
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.imgSrc}
                />

                <label htmlFor="toppings">Toppings</label>
                <FormControl>
                  <Select
                    id="toppings"
                    fullWidth
                    label="Toppings"
                    name="toppingIds"
                    multiple
                    defaultValue={props.values.toppings}
                    onChange={props.handleChange}
                  >
                    {toppingList.map((topping: Topping) => (
                      <MenuItem value={topping.id}>{topping.name}</MenuItem>
                    ))}
                    {console.log(props.values)}
                  </Select>
                </FormControl>
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
                <IconButton
                  aria-label="delete"
                  type="button"
                  onClick={(): void => {
                    onDeletePizza(selectedPizza);
                    setOpen(false);
                  }}
                >
                  <Delete />
                </IconButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;
