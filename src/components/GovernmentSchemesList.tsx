import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, Users, FileText, Globe } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'
import { GovernmentScheme } from '../pages/GovernmentSchemes'

interface GovernmentSchemesListProps {
  schemes: GovernmentScheme[]
}

const GovernmentSchemesList = ({ schemes }: GovernmentSchemesListProps) => {
  const themeClasses = useThemeClasses()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'loan-waiver': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'subsidy': 'bg-green-500/10 text-green-400 border-green-500/20',
      'insurance': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'pension': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'direct-benefit': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'infrastructure': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    }
    return colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'loan-waiver': 'Loan Waiver',
      'subsidy': 'Subsidy',
      'insurance': 'Insurance',
      'pension': 'Pension',
      'direct-benefit': 'Direct Benefit',
      'infrastructure': 'Infrastructure'
    }
    return labels[category] || category
  }

  return (
    <div className="space-y-4">
      {schemes.map((scheme) => (
        <div
          key={scheme.id}
          className={`${themeClasses.card} rounded-xl ${themeClasses.border} border overflow-hidden`}
        >
          {/* Header */}
          <button
            onClick={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)}
            className={`w-full p-6 flex items-start justify-between hover:${themeClasses.bg} transition-colors`}
          >
            <div className="flex-1 text-left">
              <div className="flex items-center gap-3 mb-2">
                <h3 className={`text-xl font-bold ${themeClasses.text.primary}`}>{scheme.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(scheme.category)}`}>
                  {getCategoryLabel(scheme.category)}
                </span>
              </div>
              <p className={`${themeClasses.text.secondary} text-sm`}>{scheme.description}</p>
            </div>
            <div className={`ml-4 flex-shrink-0 ${themeClasses.text.secondary}`}>
              {expandedId === scheme.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
          </button>

          {/* Expanded Content */}
          {expandedId === scheme.id && (
            <div className={`px-6 pb-6 ${themeClasses.border} border-t space-y-6`}>
              {/* Benefits */}
              <div>
                <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${themeClasses.text.primary}`}>
                  <CheckCircle size={20} className="text-green-400" />
                  Key Benefits
                </h4>
                <ul className="space-y-2">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className={`flex items-start gap-2 ${themeClasses.text.secondary}`}>
                      <span className="text-green-400 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${themeClasses.text.primary}`}>
                  <Users size={20} className="text-blue-400" />
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2">
                  {scheme.eligibility.map((criterion, index) => (
                    <li key={index} className={`flex items-start gap-2 ${themeClasses.text.secondary}`}>
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Process */}
              <div>
                <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${themeClasses.text.primary}`}>
                  <FileText size={20} className="text-orange-400" />
                  How to Apply
                </h4>
                <p className={themeClasses.text.secondary}>{scheme.applicationProcess}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scheme.budget && (
                  <div className={`${themeClasses.bg} rounded-lg p-4`}>
                    <p className={`text-xs ${themeClasses.text.secondary} mb-1`}>Budget Allocation</p>
                    <p className={`font-semibold ${themeClasses.text.primary}`}>{scheme.budget}</p>
                  </div>
                )}
                {scheme.targetBeneficiaries && (
                  <div className={`${themeClasses.bg} rounded-lg p-4`}>
                    <p className={`text-xs ${themeClasses.text.secondary} mb-1`}>Target Beneficiaries</p>
                    <p className={`font-semibold ${themeClasses.text.primary}`}>{scheme.targetBeneficiaries}</p>
                  </div>
                )}
                {scheme.website && (
                  <div className={`${themeClasses.bg} rounded-lg p-4`}>
                    <p className={`text-xs ${themeClasses.text.secondary} mb-1`}>Official Website</p>
                    <a
                      href={scheme.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-green-400 hover:text-green-300 flex items-center gap-1"
                    >
                      <Globe size={16} />
                      Visit
                    </a>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Learn More & Apply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default GovernmentSchemesList
