import { Search } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface GovernmentSchemesFilterProps {
  categories: { value: string; label: string }[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

const GovernmentSchemesFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange
}: GovernmentSchemesFilterProps) => {
  const themeClasses = useThemeClasses()

  return (
    <div className={`${themeClasses.card} rounded-xl p-6 ${themeClasses.border} border mb-8`}>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className={`absolute left-3 top-3 ${themeClasses.text.secondary}`} size={20} />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg ${themeClasses.input} border ${themeClasses.border} focus:outline-none focus:border-green-500 transition-colors`}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <p className={`text-sm font-medium mb-3 ${themeClasses.text.primary}`}>Filter by Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-green-600 text-white'
                  : `${themeClasses.bg} ${themeClasses.text.secondary} hover:bg-green-600/20`
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GovernmentSchemesFilter
