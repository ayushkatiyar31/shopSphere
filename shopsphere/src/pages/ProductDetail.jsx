import { useParams } from "react-router-dom"
import { useContext } from "react"
import products from "../data/products"
import { CartContext } from "../context/CartContext"

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const product = products.find(
    (item) => item.id === parseInt(id)
  )

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product Not Found</h2>
  }

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.title} style={styles.image} />

      <div style={styles.details}>
        <h2>{product.title}</h2>
        <p style={styles.price}>₹{product.price}</p>

        <p style={styles.description}>
          This is a high-quality product available at the best price.
          Premium build, modern design, and reliable performance.
        </p>

        <button
          style={styles.button}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "40px",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    alignItems: "center"
  },
  image: {
    width: "400px",
    borderRadius: "8px"
  },
  details: {
    maxWidth: "400px"
  },
  price: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  description: {
    marginBottom: "20px",
    color: "#555"
  },
  button: {
    padding: "12px 18px",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
}

export default ProductDetail