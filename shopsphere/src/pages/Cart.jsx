import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
  } = useContext(CartContext)

  const [showCheckout, setShowCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    clearCart()
    setShowCheckout(false)
    setOrderPlaced(true)

    setTimeout(() => {
      setOrderPlaced(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 md:px-12 py-12">

      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        Your Cart
      </h2>

      {orderPlaced && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Order Placed Successfully 🎉
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl text-center shadow-lg max-w-xl mx-auto">
          <h3 className="text-xl font-semibold mb-2">
            Your cart is empty 🛒
          </h3>
          <p className="text-gray-500">
            Add some amazing products!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-2xl shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h4 className="text-lg font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-indigo-600 font-bold mt-2">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-4 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg text-right max-w-3xl ml-auto">
            <h3 className="text-2xl font-bold">
              Total: <span className="text-indigo-600">₹{totalPrice}</span>
            </h3>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
              >
                Clear Cart
              </button>

              <button
                onClick={() => setShowCheckout(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-4">
              Confirm Your Order
            </h3>

            <p className="text-gray-600 mb-6">
              Total Amount: <span className="font-bold text-indigo-600">₹{totalPrice}</span>
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCheckout}
                className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart