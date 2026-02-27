function Contact() {
  return (
    <div className="min-h-screen px-10 py-16">
      <h2 className="text-4xl font-bold mb-6">Contact Us</h2>

      <form className="max-w-lg space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 border rounded-lg"
        />
        <button className="bg-black text-white px-6 py-2 rounded-lg">
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact