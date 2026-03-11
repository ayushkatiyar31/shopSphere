import { User, Package, Settings, LogOut, CheckCircle2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"

function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-max animate-fade-in">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-indigo-50/50">
            <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
              JD
            </div>
            <div>
              <h3 className="font-bold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Premium Member</p>
            </div>
          </div>
          
          <div className="p-4 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
              <User size={18} /> Account Details
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl transition-colors">
              <Package size={18} /> Orders & Tracking
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
              <Settings size={18} /> Preferences
            </button>
            <hr className="my-2 border-gray-100" />
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut size={18} /> Log Out
            </button>
          </div>
        </div>

        {/* Main Content - Orders */}
        <div className="flex-1 space-y-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Recent Orders</h2>

          {/* Mock Order 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order #ORD-84392-XT</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">₹14,999</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-sm">Placed on Oct 24, 2023</span>
                </div>
              </div>
              <Badge variant="default" className="w-max bg-green-500 hover:bg-green-600 shadow-none -mt-1 sm:mt-0">Delivered</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                <Package className="text-gray-400" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Premium Wireless Headphones</h4>
                <p className="text-sm text-gray-500 mt-1">Qty: 1</p>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex self-start sm:self-center">Write Review</Button>
            </div>

            {/* Tracking Flow Mock completely delivered */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between relative px-2">
                <div className="absolute top-3 left-8 right-8 h-1 bg-green-500 rounded-full -z-10" />
                {["Ordered", "Shipped", "Out for Delivery", "Delivered"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                    <div className="h-7 w-7 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-xs font-semibold text-gray-900">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mock Order 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order #ORD-12942-AB</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">₹8,499</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-sm">Placed on Nov 2, 2023</span>
                </div>
              </div>
              <Badge variant="secondary" className="w-max shadow-none text-indigo-700 bg-indigo-100 border border-indigo-200 -mt-1 sm:mt-0">In Transit</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                <Package className="text-gray-400" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Mechanical Keyboard Pro</h4>
                <p className="text-sm text-gray-500 mt-1">Qty: 1</p>
              </div>
              <Button size="sm" className="hidden sm:flex self-start sm:self-center bg-indigo-600">Track Order</Button>
            </div>

            {/* Tracking Flow Mock In progress */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between relative px-2">
                <div className="absolute top-3 left-8 right-8 h-1 bg-gray-100 rounded-full -z-10" />
                <div className="absolute top-3 left-8 right-1/2 h-1 bg-indigo-600 rounded-full -z-10" />
                
                {["Ordered", "Shipped", "Out for Delivery", "Delivered"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center shadow-sm ${i < 2 ? 'bg-indigo-600 text-white' : i === 2 ? 'border-2 border-indigo-600 bg-white ring-4 ring-indigo-50' : 'border-2 border-gray-200 bg-white'}`}>
                      {i < 2 && <CheckCircle2 size={16} />}
                      {i === 2 && <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />}
                    </div>
                    <span className={`text-xs font-semibold ${i <= 2 ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Profile
