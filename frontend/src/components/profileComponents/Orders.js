import React from "react";
// import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";
// import React from "react";
// const Orders = (props) => {

// };

// export default Orders;

const Orders = (props) => {
  const { loading, error, orders } = props;

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {orders.length === 0 ? (
              <div className="col-12 alert alert-info text-center mt-3">
                No Orders
                {/* <Link
                  className="btn btn-success mx-2 px-3 py-2"
                  to="/"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  START SHOPPING */}
                {/* </Link> */}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>STATUS</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                    </tr>
                    ID
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        className={`${
                          order.isPaid ? "alert-success" : "alert-danger"
                        }`}
                      >
                        <td>
                          <a href={`/orders/${order._id}`} className="link">
                            {order._id}
                          </a>
                        </td>
                        <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                        <td>
                          {order.isPaid
                            ? moment(order.isPaid).calendar()
                            : moment(order.createdAt).calendar()}
                        </td>
                        <td>${order.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      );
    </div>
  );
};

export default Orders;
