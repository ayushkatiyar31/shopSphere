import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Navbar() {
  const { totalItems } = useContext(CartContext)

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>ShopSphere</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/cart" style={styles.cartLink}>
          Cart
          {totalItems > 0 && (
            <span style={styles.badge}>{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 50px",
    backgroundColor: "#111",
    color: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
  },
  logo: {
    margin: 0,
    fontSize: "22px",
    letterSpacing: "1px"
  },
  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px"
  },
  cartLink: {
    position: "relative",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px"
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-15px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "4px 8px",
    fontSize: "12px",
    fontWeight: "bold"
  }
}

export default Navbar