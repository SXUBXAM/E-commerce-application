import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { addToCart, removefromcart } from "../redux/Actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const cartItem = cart;
  const total = cartItem.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = () => {
    // e.preventDefault();
    history.push("/login?redirect=shipping");
  };
  const removeFromCartHandle = () => {
    dispatch(removefromcart());
  };

  console.log(productId);
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItem.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div>
              <div className=" alert alert-info text-center mt-3">
                Total Cart Products
                <Link className="text-success mx-2" to="/cart">
                  (4)
                </Link>
              </div>
              {/* cartiterm */}
              <div
                onClick={() => removeFromCartHandle(cartItem.product)}
                className="cart-iterm row"
              >
                <div className="remove-button d-flex justify-content-center align-items-center">
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src="/images/2.png" alt="nike" />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to="#">
                    <h4>Nike Girls Shoe</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>QUANTITY</h6>
                  <select
                    value={qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(cartItem.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(cartItem.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>SUBTOTAL</h6>
                  <h4>`${cartItem.price}`</h4>
                </div>
              </div>

              {/* End of cart iterms */}
              <div className="total">
                <span className="sub">total:</span>
                <span className="total-price">$567</span>
              </div>
              <hr />
              <div className="cart-buttons d-flex align-items-center row">
                <Link to="/" className="col-md-6 ">
                  <button>Continue To Shopping</button>
                </Link>
                {total > 0 && (
                  <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                    <button onClick={checkOutHandler}>
                      <Link to="/shipping" className="text-white">
                        Checkout
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {/* <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default CartScreen;
