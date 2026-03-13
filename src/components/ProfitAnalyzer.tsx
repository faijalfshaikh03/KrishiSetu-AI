import { TrendingUp } from 'lucide-react'
import { FormEvent } from 'react'

interface ProfitAnalyzerProps {
  onAnalyze: (data: { crop: string; mandi: string; quantity: number }) => void
}

const ProfitAnalyzer = ({ onAnalyze }: ProfitAnalyzerProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onAnalyze({
      crop: formData.get('crop') as string,
      mandi: formData.get('mandi') as string,
      quantity: Number(formData.get('quantity'))
    })
  }

  return (
    <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="text-green-700" size={20} />
        <h2 className="text-lg font-semibold text-green-800">Profit Analyzer</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs uppercase text-gray-600 font-semibold mb-2 tracking-wide">
            Select Crop
          </label>
          <select 
            name="crop"
            className="w-full px-4 py-3 bg-gray-300 text-gray-800 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-500"
            defaultValue="wheat"
          >
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="corn">Corn</option>
            <option value="potato">Potato</option>
            <option value="tomato">Tomato</option>
            <option value="onion">Onion</option>
            <option value="cotton">Cotton</option>
            <option value="sugarcane">Sugarcane</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-600 font-semibold mb-2 tracking-wide">
            Select Mandi
          </label>
          <select 
            name="mandi"
            className="w-full px-4 py-3 bg-gray-300 text-gray-800 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-500"
            defaultValue="nashik"
          >
            <option value="nashik">Nashik Mandi</option>
            <option value="delhi">Delhi Mandi</option>
            <option value="mumbai">Mumbai Mandi</option>
            <option value="bangalore">Bangalore Mandi</option>
            <option value="kolkata">Kolkata Mandi</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-600 font-semibold mb-2 tracking-wide">
            Quantity (KG)
          </label>
          <input 
            type="number" 
            name="quantity"
            placeholder="10" 
            defaultValue="10"
            min="1"
            className="w-full px-4 py-3 bg-gray-300 text-gray-800 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex items-end">
          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp size={18} />
            Analyze Profit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfitAnalyzer
