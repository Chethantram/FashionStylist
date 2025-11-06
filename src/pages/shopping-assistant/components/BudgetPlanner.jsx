import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BudgetPlanner = ({ isOpen, onClose, onBudgetSet }) => {
  const [budgetData, setBudgetData] = useState({
    monthlyBudget: '',
    priorities: [],
    timeframe: '3months',
    currentSpent: 0
  });

  const [selectedPriorities, setSelectedPriorities] = useState([]);

  if (!isOpen) return null;

  const priorityOptions = [
    { id: 'workwear', label: 'Professional Workwear', icon: 'Briefcase', description: 'Blazers, dress pants, professional tops' },
    { id: 'basics', label: 'Wardrobe Basics', icon: 'Package', description: 'T-shirts, jeans, versatile pieces' },
    { id: 'seasonal', label: 'Seasonal Updates', icon: 'Calendar', description: 'Weather-appropriate clothing' },
    { id: 'special', label: 'Special Occasions', icon: 'Star', description: 'Formal wear, party outfits' },
    { id: 'accessories', label: 'Accessories', icon: 'Watch', description: 'Bags, jewelry, shoes' },
    { id: 'sustainable', label: 'Sustainable Fashion', icon: 'Leaf', description: 'Eco-friendly, ethical brands' }
  ];

  const timeframeOptions = [
    { value: '1month', label: '1 Month', multiplier: 1 },
    { value: '3months', label: '3 Months', multiplier: 3 },
    { value: '6months', label: '6 Months', multiplier: 6 },
    { value: '1year', label: '1 Year', multiplier: 12 }
  ];

  const handlePriorityToggle = (priorityId) => {
    setSelectedPriorities(prev => 
      prev?.includes(priorityId)
        ? prev?.filter(id => id !== priorityId)
        : [...prev, priorityId]
    );
  };

  const handleSubmit = () => {
    const totalBudget = parseFloat(budgetData?.monthlyBudget) * 
      timeframeOptions?.find(t => t?.value === budgetData?.timeframe)?.multiplier;
    
    onBudgetSet({
      ...budgetData,
      priorities: selectedPriorities,
      totalBudget
    });
    onClose();
  };

  const getTotalBudget = () => {
    if (!budgetData?.monthlyBudget) return 0;
    const multiplier = timeframeOptions?.find(t => t?.value === budgetData?.timeframe)?.multiplier;
    return parseFloat(budgetData?.monthlyBudget) * multiplier;
  };

  const getBudgetAllocation = () => {
    const total = getTotalBudget();
    if (!total || selectedPriorities?.length === 0) return [];
    
    const allocation = total / selectedPriorities?.length;
    return selectedPriorities?.map(priorityId => ({
      priority: priorityOptions?.find(p => p?.id === priorityId),
      amount: allocation
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-brand-modal max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-brand-text-primary">
            Smart Budget Planner
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Monthly Budget Input */}
            <div>
              <h3 className="text-lg font-semibold text-brand-text-primary mb-3">
                Set Your Budget
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Monthly Fashion Budget"
                  type="number"
                  placeholder="Enter amount"
                  value={budgetData?.monthlyBudget}
                  onChange={(e) => setBudgetData(prev => ({
                    ...prev,
                    monthlyBudget: e?.target?.value
                  }))}
                  description="How much do you want to spend per month?"
                />
                
                <div>
                  <label className="block text-sm font-medium text-brand-text-primary mb-2">
                    Planning Timeframe
                  </label>
                  <div className="space-y-2">
                    {timeframeOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => setBudgetData(prev => ({
                          ...prev,
                          timeframe: option?.value
                        }))}
                        className={`w-full p-3 rounded-lg text-left transition-smooth ${
                          budgetData?.timeframe === option?.value
                            ? 'bg-brand-cream border-2 border-brand-gold' :'bg-muted hover:bg-brand-cream border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-brand-text-primary">
                            {option?.label}
                          </span>
                          <Icon 
                            name={budgetData?.timeframe === option?.value ? "CheckCircle" : "Circle"} 
                            size={18} 
                            className={budgetData?.timeframe === option?.value ? "text-brand-gold" : "text-brand-text-secondary"} 
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {budgetData?.monthlyBudget && (
                <div className="mt-4 p-4 bg-brand-cream rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-text-secondary">
                      Total Budget ({timeframeOptions?.find(t => t?.value === budgetData?.timeframe)?.label}):
                    </span>
                    <span className="text-lg font-bold text-brand-text-primary">
                      ${getTotalBudget()?.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Priority Selection */}
            <div>
              <h3 className="text-lg font-semibold text-brand-text-primary mb-3">
                Shopping Priorities
              </h3>
              <p className="text-sm text-brand-text-secondary mb-4">
                Select your top fashion priorities to help us allocate your budget effectively.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {priorityOptions?.map((priority) => (
                  <button
                    key={priority?.id}
                    onClick={() => handlePriorityToggle(priority?.id)}
                    className={`p-4 rounded-lg text-left transition-smooth ${
                      selectedPriorities?.includes(priority?.id)
                        ? 'bg-brand-cream border-2 border-brand-gold' :'bg-muted hover:bg-brand-cream border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedPriorities?.includes(priority?.id)
                          ? 'bg-brand-gold text-white' :'bg-white text-brand-text-secondary'
                      }`}>
                        <Icon name={priority?.icon} size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-brand-text-primary mb-1">
                          {priority?.label}
                        </h4>
                        <p className="text-xs text-brand-text-secondary">
                          {priority?.description}
                        </p>
                      </div>
                      <Icon 
                        name={selectedPriorities?.includes(priority?.id) ? "CheckCircle" : "Circle"} 
                        size={20} 
                        className={selectedPriorities?.includes(priority?.id) ? "text-brand-gold" : "text-brand-text-secondary"} 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Allocation Preview */}
            {budgetData?.monthlyBudget && selectedPriorities?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-brand-text-primary mb-3">
                  Suggested Budget Allocation
                </h3>
                <div className="space-y-3">
                  {getBudgetAllocation()?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center">
                          <Icon name={item?.priority?.icon} size={16} color="white" />
                        </div>
                        <span className="font-medium text-brand-text-primary">
                          {item?.priority?.label}
                        </span>
                      </div>
                      <span className="font-bold text-brand-text-primary">
                        ${item?.amount?.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Insights */}
            <div className="p-4 bg-brand-cream rounded-lg border border-brand-gold/20">
              <div className="flex items-start gap-2">
                <Icon name="Sparkles" size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-brand-text-primary mb-1">
                    AI Budget Insight
                  </p>
                  <p className="text-sm text-brand-text-secondary">
                    Based on your selections, we recommend focusing on versatile pieces that can be mixed and matched. This approach maximizes your cost-per-wear and creates more outfit combinations within your budget.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                size="default"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="default"
                className="flex-1"
                onClick={handleSubmit}
                disabled={!budgetData?.monthlyBudget || selectedPriorities?.length === 0}
                iconName="Check"
                iconPosition="left"
              >
                Set Budget Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;