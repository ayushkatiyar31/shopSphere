import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
  } = useContext(CartContext)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div style={styles.emptyBox}>
          <h3>Your cart is empty 🛒</h3>
          <p>Add some amazing products!</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.title} style={styles.image} />

              <div style={styles.details}>
                <h4>{item.title}</h4>
                <p>₹{item.price}</p>

                <div style={styles.quantityBox}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={styles.totalBox}>
            <h3>Total: ₹{totalPrice}</h3>

            <button onClick={clearCart} style={styles.clearBtn}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4"
  },
  heading: {
    marginBottom: "30px"
  },
  emptyBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  item: {
    display: "flex",
    gap: "30px",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  image: {
    width: "120px",
    borderRadius: "8px"
  },
  details: {
    flex: 1
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px"
  },
  qtyBtn: {
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#eee"
  },
  removeBtn: {
    marginTop: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  totalBox: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    textAlign: "right",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  clearBtn: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
}

export default Cart