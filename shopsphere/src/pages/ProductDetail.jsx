import { useParams } from "react-router-dom"
import products from "../data/products"

function ProductDetail() {
  const { id } = useParams()

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
        <p>
          This is a high-quality product available at the best price.
        </p>

        <button style={styles.button}>
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
    backgroundColor: "#f4f4f4"
  },
  image: {
    width: "400px",
    borderRadius: "8px"
  },
  details: {
    maxWidth: "400px"
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold"
  },
  button: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
}

export default ProductDetail