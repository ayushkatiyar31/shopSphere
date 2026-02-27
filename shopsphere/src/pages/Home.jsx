import products from "../data/products"
import ProductCard from "../components/ProductCard"

function Home() {
  return (
    <div style={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "40px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh"
  }
}

export default Home