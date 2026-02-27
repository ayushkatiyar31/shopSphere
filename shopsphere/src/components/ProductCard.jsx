import { Link } from "react-router-dom"

function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>

      <Link to={`/product/${product.id}`} style={styles.button}>
        View Details
      </Link>
    </div>
  )
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "white"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#111",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px"
  }
}

export default ProductCard