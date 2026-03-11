import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { ToastContext } from "../context/ToastContext"
import CheckoutStepper from "../components/CheckoutStepper"
import { Button } from "../components/ui/Button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
  } = useContext(CartContext)
  
  const { addToast } = useContext(ToastContext)

  const [checkoutStep, setCheckoutStep] = useState(1)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    clearCart()
    setCheckoutStep(1)
    window.scrollTo(0,0)
    addToast({
      title: "Order Placed Successfully",
      description: "You will receive an email confirmation shortly.",
      type: "success"
    })
  }

  const handleRemoveItem = (id, title) => {
    removeItem(id)
    addToast({
      title: "Removed from Cart",
      description: title ? `${title} was removed.` : "Item removed from your cart.",
      type: "info"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
          <p className="text-gray-500 mt-2 md:mt-0 font-medium">{cartItems.length} items in your order</p>
        </div>

        {cartItems.length > 0 && <CheckoutStepper currentStep={checkoutStep} />}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 max-w-sm mb-8">
              Looks like you haven't added any premium products to your cart yet. Let's change that!
            </p>
            <Link to="/">
              <Button size="lg" className="px-8 gap-2">
                Start Shopping <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group transition-all hover:shadow-md"
                >
                  <div className="w-full sm:w-32 h-32 shrink-0 bg-gray-50 rounded-xl p-4 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900 whitespace-nowrap">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-200">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id, item.title)}
                        className="text-red-500 hover:text-red-600 flex items-center gap-1.5 text-sm font-semibold transition-colors bg-red-50 px-3 py-2 rounded-lg"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-4">
                <Button variant="ghost" onClick={clearCart} className="text-gray-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 size={16} className="mr-2" /> Clear Entire Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-gray-600 pb-6 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-medium">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping estimate</span>
                    <span className="text-gray-900 font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax estimate</span>
                    <span className="text-gray-900 font-medium text-green-600">Included</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-6">
                  <span className="text-lg font-bold text-gray-900">Order Total</span>
                  <span className="text-3xl font-extrabold text-indigo-600">₹{totalPrice}</span>
                </div>

                {checkoutStep === 1 ? (
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6 shadow-xl shadow-indigo-200"
                    onClick={() => setCheckoutStep(2)}
                  >
                    Proceed to Checkout
                  </Button>
                ) : checkoutStep === 2 ? (
                  <div className="space-y-4 animate-fade-in-up">
                    <p className="text-sm font-medium text-gray-500 mb-4">Select Payment Method</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <Button variant="outline" className="h-14 font-semibold hover:border-indigo-600 hover:bg-indigo-50" onClick={() => setCheckoutStep(3)}>Card</Button>
                      <Button variant="outline" className="h-14 font-semibold hover:border-indigo-600 hover:bg-indigo-50" onClick={() => setCheckoutStep(3)}>UPI</Button>
                    </div>
                    <Button variant="ghost" className="w-full text-gray-500" onClick={() => setCheckoutStep(1)}>Back</Button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in-up">
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-6 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-200"
                      onClick={handleCheckout}
                    >
                      Confirm Payment
                    </Button>
                    <Button variant="ghost" className="w-full text-gray-500" onClick={() => setCheckoutStep(2)}>Back</Button>
                  </div>
                )}
                
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ShieldCheck size={16} /> Secure Encrypted Checkout
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cart