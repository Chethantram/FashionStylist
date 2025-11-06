import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylingGoalsSection = ({ goals, onGoalSelect, activeGoal }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedGoals = showAll ? goals : goals?.slice(0, 3);

  const getGoalIcon = (goalType) => {
    const iconMap = {
      'capsule': 'Package',
      'trending': 'TrendingUp',
      'gaps': 'Target',
      'seasonal': 'Calendar',
      'occasion': 'Star',
      'budget': 'DollarSign',
      'sustainable': 'Leaf',
      'versatile': 'Shuffle'
    };
    return iconMap?.[goalType] || 'Sparkles';
  };

  const getGoalColor = (goalType) => {
    const colorMap = {
      'capsule': 'bg-blue-50 text-blue-700 border-blue-200',
      'trending': 'bg-pink-50 text-pink-700 border-pink-200',
      'gaps': 'bg-purple-50 text-purple-700 border-purple-200',
      'seasonal': 'bg-green-50 text-green-700 border-green-200',
      'occasion': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'budget': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'sustainable': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'versatile': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colorMap?.[goalType] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-brand-text-primary">
          Your Styling Goals
        </h2>
        {goals?.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `Show All (${goals?.length})`}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedGoals?.map((goal) => (
          <div
            key={goal?.id}
            className={`
              p-4 rounded-xl border-2 cursor-pointer transition-smooth hover:shadow-brand
              ${activeGoal === goal?.id 
                ? 'border-brand-gold bg-brand-cream' 
                : `border-border bg-card hover:border-brand-gold/30`
              }
            `}
            onClick={() => onGoalSelect(goal?.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                ${getGoalColor(goal?.type)}
              `}>
                <Icon name={getGoalIcon(goal?.type)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-brand-text-primary mb-1">
                  {goal?.title}
                </h3>
                <p className="text-sm text-brand-text-secondary mb-2 line-clamp-2">
                  {goal?.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
                  <Icon name="Target" size={12} />
                  <span>{goal?.itemCount} items recommended</span>
                </div>
                
                {goal?.progress && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-brand-text-secondary">Progress</span>
                      <span className="font-medium text-brand-text-primary">
                        {goal?.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-brand-gold h-1.5 rounded-full transition-smooth"
                        style={{ width: `${goal?.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {goal?.tags && goal?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {goal?.tags?.slice(0, 2)?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-xs text-brand-text-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {goal?.tags?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-xs text-brand-text-secondary rounded-full">
                    +{goal?.tags?.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {activeGoal && (
        <div className="mt-4 p-4 bg-brand-cream rounded-lg border border-brand-gold/20">
          <div className="flex items-start gap-2">
            <Icon name="Sparkles" size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-brand-text-primary mb-1">
                AI Styling Insight
              </p>
              <p className="text-sm text-brand-text-secondary">
                {goals?.find(g => g?.id === activeGoal)?.aiInsight || 
                 "Based on your style profile and wardrobe analysis, these recommendations will help you achieve your styling goals more effectively."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylingGoalsSection;