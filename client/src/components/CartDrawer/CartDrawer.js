import React, { useContext } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Badge, Divider, IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { CartContext } from "../../contexts/CartContext.js";
import CartItem from "../CartItem/CartItem.js";
import PaymentIcon from "@material-ui/icons/Payment";
import { AuthContext } from "../../contexts/AuthContext.js";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  payment: {
    padding: "10px",
  },
  nostyle: {
    display: "content",
    padding: "0",
  },
});

export default function CartDrawer() {
  const { cart, itemsInCart, totalPrice } = useContext(CartContext);
  const { loggedIn } = useContext(AuthContext);

  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    console.log(anchor, open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {cart.length > 0
          ? cart.map((product) => (
              <ListItem className={classes.nostyle}>
                <CartItem props={product} />
              </ListItem>
            ))
          : null}
      </List>

      {Math.round(totalPrice * 100) / 100 > 0 ? (
        <div className={classes.payment}>
          <p style={{ padding: "5px" }}>
            Total Price: {Math.round(totalPrice * 100) / 100}$
          </p>

          <Button
            color={"primary"}
            variant="contained"
            endIcon={<PaymentIcon />}
            onClick={() => setState({ right: false })}
            component={Link}
            to={loggedIn ? "/profile" : "/login"}
          >
            {" "}
            advance to payment
          </Button>
        </div>
      ) : (
        <p style={{ padding: "5px" }}>Your cart is empty...</p>
      )}
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton style={{ color: "#FFFFFF" }}>
            <Badge
              badgeContent={itemsInCart}
              color="secondary"
              onClick={toggleDrawer(anchor, true)}
            >
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
