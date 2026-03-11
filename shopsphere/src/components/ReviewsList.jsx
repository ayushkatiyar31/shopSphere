import { Star, ThumbsUp } from "lucide-react"

function ReviewsList() {
  const reviews = [
    { id: 1, name: "Sarah Jenkins", date: "2 days ago", rating: 5, text: "Absolutely stunning quality. I was blown away by the attention to detail. Highly recommend it to anyone looking for a premium experience." },
    { id: 2, name: "Michael Chang", date: "1 week ago", rating: 4, text: "Great product overall. The delivery was slightly delayed but the customer service was excellent and kept me informed." },
    { id: 3, name: "Emma Wilson", date: "2 weeks ago", rating: 5, text: "Exactly what I was looking for. The premium feel is definitely there. You get what you pay for!" }
  ]

  return (
    <div className="mt-16 pt-12 border-t border-gray-100 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Customer Reviews</h2>
        <span className="text-indigo-600 font-medium hover:underline cursor-pointer">Write a review</span>
      </div>
      
      <div className="space-y-8">
        {reviews.map(review => (
          <div key={review.id} className="pb-8 border-b border-gray-50 last:border-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-100">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-gray-200"} />
                      ))}
                    </div>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed pl-14">
              "{review.text}"
            </p>
            <div className="pl-14 mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 cursor-pointer w-max transition-colors">
              <ThumbsUp size={14} /> Helpful
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewsList
