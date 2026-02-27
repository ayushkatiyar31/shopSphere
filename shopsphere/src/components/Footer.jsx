function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-xl font-bold mb-3">ShopSphere</h3>
          <p className="text-gray-400">
            Premium shopping experience with quality products.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-gray-400">
            support@shopsphere.com
          </p>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-8">
        © 2026 ShopSphere. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer