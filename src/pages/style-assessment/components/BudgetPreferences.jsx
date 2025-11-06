import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BudgetPreferences = ({ onSelectionChange, budgetData }) => {
  const [activeTab, setActiveTab] = useState('budget');

  const budgetRanges = [
    { id: 'budget-friendly', label: 'Budget-Friendly', range: '$0 - $50', description: 'Great finds without breaking the bank' },
    { id: 'moderate', label: 'Moderate', range: '$50 - $150', description: 'Quality pieces at reasonable prices' },
    { id: 'premium', label: 'Premium', range: '$150 - $300', description: 'Investment pieces for your wardrobe' },
    { id: 'luxury', label: 'Luxury', range: '$300+', description: 'High-end designer and luxury items' },
    { id: 'mixed', label: 'Mixed Budget', range: 'Varies', description: 'I like to mix high and low price points' }
  ];

  const shoppingFrequencies = [
    { id: 'monthly', label: 'Monthly', description: 'I love refreshing my wardrobe regularly' },
    { id: 'seasonal', label: 'Seasonally', description: 'I shop for new pieces each season' },
    { id: 'as-needed', label: 'As Needed', description: 'I buy items when I need them' },
    { id: 'rarely', label: 'Rarely', description: 'I prefer to invest in timeless pieces' }
  ];

  const shoppingPriorities = [
    { id: 'quality', label: 'Quality', icon: 'Award', description: 'Long-lasting, well-made pieces' },
    { id: 'trendy', label: 'Trendy', icon: 'TrendingUp', description: 'Latest fashion trends and styles' },
    { id: 'versatile', label: 'Versatile', icon: 'Shuffle', description: 'Pieces that work for multiple occasions' },
    { id: 'unique', label: 'Unique', icon: 'Star', description: 'One-of-a-kind and distinctive items' },
    { id: 'sustainable', label: 'Sustainable', icon: 'Leaf', description: 'Eco-friendly and ethical fashion' },
    { id: 'comfort', label: 'Comfort', icon: 'Heart', description: 'Comfortable and easy to wear' }
  ];

  const handleBudgetChange = (budgetId) => {
    onSelectionChange({
      ...budgetData,
      budget: budgetId
    });
  };

  const handleFrequencyChange = (frequencyId) => {
    onSelectionChange({
      ...budgetData,
      frequency: frequencyId
    });
  };

  const handlePriorityToggle = (priorityId) => {
    const currentPriorities = budgetData?.priorities || [];
    const updatedPriorities = currentPriorities?.includes(priorityId)
      ? currentPriorities?.filter(id => id !== priorityId)
      : [...currentPriorities, priorityId];
    
    onSelectionChange({
      ...budgetData,
      priorities: updatedPriorities
    });
  };

  const handleMonthlyBudgetChange = (value) => {
    onSelectionChange({
      ...budgetData,
      monthlyBudget: value
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-brand-text-primary mb-2">
          Shopping Preferences
        </h2>
        <p className="text-brand-text-secondary">
          Help us understand your budget and shopping style
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'budget' ?'bg-card text-brand-text-primary shadow-sm' :'text-brand-text-secondary hover:text-brand-text-primary'
            }`}
          >
            Budget Range
          </button>
          <button
            onClick={() => setActiveTab('frequency')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'frequency' ?'bg-card text-brand-text-primary shadow-sm' :'text-brand-text-secondary hover:text-brand-text-primary'
            }`}
          >
            Shopping Habits
          </button>
          <button
            onClick={() => setActiveTab('priorities')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'priorities' ?'bg-card text-brand-text-primary shadow-sm' :'text-brand-text-secondary hover:text-brand-text-primary'
            }`}
          >
            Priorities
          </button>
        </div>
      </div>
      {/* Budget Range Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-brand-text-primary text-center">
            What's your typical budget per item?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetRanges?.map((budget) => {
              const isSelected = budgetData?.budget === budget?.id;
              
              return (
                <div
                  key={budget?.id}
                  onClick={() => handleBudgetChange(budget?.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-elevated ${
                    isSelected 
                      ? 'border-brand-gold bg-brand-cream shadow-brand' 
                      : 'border-border bg-card hover:border-brand-gold/50'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <h4 className="font-semibold text-brand-text-primary">{budget?.label}</h4>
                    <p className="text-lg font-bold text-brand-gold">{budget?.range}</p>
                    <p className="text-sm text-brand-text-secondary">{budget?.description}</p>
                    
                    {isSelected && (
                      <div className="flex justify-center mt-3">
                        <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                          <Icon name="Check" size={16} color="white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Budget Slider */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h4 className="font-semibold text-brand-text-primary mb-4">
              Monthly Shopping Budget: ${budgetData?.monthlyBudget || 100}
            </h4>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={budgetData?.monthlyBudget || 100}
              onChange={(e) => handleMonthlyBudgetChange(parseInt(e?.target?.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-brand-text-secondary mt-2">
              <span>$0</span>
              <span>$500</span>
              <span>$1000+</span>
            </div>
          </div>
        </div>
      )}
      {/* Shopping Frequency Tab */}
      {activeTab === 'frequency' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-brand-text-primary text-center">
            How often do you shop for clothes?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shoppingFrequencies?.map((frequency) => {
              const isSelected = budgetData?.frequency === frequency?.id;
              
              return (
                <div
                  key={frequency?.id}
                  onClick={() => handleFrequencyChange(frequency?.id)}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-elevated ${
                    isSelected 
                      ? 'border-brand-gold bg-brand-cream shadow-brand' 
                      : 'border-border bg-card hover:border-brand-gold/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-brand-text-primary">{frequency?.label}</h4>
                      {isSelected && (
                        <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                          <Icon name="Check" size={16} color="white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-brand-text-secondary">{frequency?.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Shopping Priorities Tab */}
      {activeTab === 'priorities' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-brand-text-primary text-center">
            What matters most when you shop? (Select all that apply)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoppingPriorities?.map((priority) => {
              const isSelected = (budgetData?.priorities || [])?.includes(priority?.id);
              
              return (
                <div
                  key={priority?.id}
                  onClick={() => handlePriorityToggle(priority?.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-elevated ${
                    isSelected 
                      ? 'border-brand-gold bg-brand-cream shadow-brand' 
                      : 'border-border bg-card hover:border-brand-gold/50'
                  }`}
                >
                  <div className="text-center space-y-3">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-brand-gold text-white' : 'bg-muted text-brand-text-secondary'
                    }`}>
                      <Icon name={priority?.icon} size={20} />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-brand-text-primary mb-1">{priority?.label}</h4>
                      <p className="text-sm text-brand-text-secondary">{priority?.description}</p>
                    </div>
                    
                    {isSelected && (
                      <div className="flex justify-center">
                        <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                          <Icon name="Check" size={16} color="white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Summary */}
      {(budgetData?.budget || budgetData?.frequency || (budgetData?.priorities && budgetData?.priorities?.length > 0)) && (
        <div className="bg-brand-cream p-6 rounded-xl">
          <h4 className="font-semibold text-brand-text-primary mb-3">Your Shopping Profile</h4>
          <div className="space-y-2 text-sm text-brand-text-secondary">
            {budgetData?.budget && (
              <p>• Budget: {budgetRanges?.find(b => b?.id === budgetData?.budget)?.label}</p>
            )}
            {budgetData?.frequency && (
              <p>• Shopping Frequency: {shoppingFrequencies?.find(f => f?.id === budgetData?.frequency)?.label}</p>
            )}
            {budgetData?.monthlyBudget && (
              <p>• Monthly Budget: ${budgetData?.monthlyBudget}</p>
            )}
            {budgetData?.priorities && budgetData?.priorities?.length > 0 && (
              <p>• Priorities: {budgetData?.priorities?.map(p => 
                shoppingPriorities?.find(sp => sp?.id === p)?.label
              )?.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPreferences;