import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, stepTitles, completedSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  const motivationalMessages = [
    "Let\'s discover your style DNA...",
    "Building your style profile...",
    "Understanding your preferences...",
    "Crafting your unique look...",
    "Almost there! Finalizing your style...",
    "Your style journey is complete!"
  ];

  const getCurrentMessage = () => {
    const messageIndex = Math.min(currentStep - 1, motivationalMessages?.length - 1);
    return motivationalMessages?.[messageIndex] || motivationalMessages?.[0];
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-brand border border-border">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-brand-text-primary">
            Style Assessment Progress
          </h3>
          <p className="text-sm text-brand-text-secondary">
            {getCurrentMessage()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand-gold">
            {Math.round(progress)}%
          </div>
          <div className="text-xs text-brand-text-secondary">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-border rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-gold to-brand-cta rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {stepTitles?.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps?.includes(stepNumber);
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div
              key={stepNumber}
              className={`text-center p-2 rounded-lg transition-all duration-300 ${
                isCurrent 
                  ? 'bg-brand-cream border-2 border-brand-gold' 
                  : isCompleted 
                    ? 'bg-green-50 border border-green-200' :'bg-muted border border-border'
              }`}
            >
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                isCurrent 
                  ? 'bg-brand-gold text-white' 
                  : isCompleted 
                    ? 'bg-green-500 text-white' :'bg-border text-brand-text-secondary'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-xs font-semibold">{stepNumber}</span>
                )}
              </div>
              
              <div className={`text-xs font-medium ${
                isCurrent 
                  ? 'text-brand-text-primary' 
                  : isCompleted 
                    ? 'text-green-700' :'text-brand-text-secondary'
              }`}>
                {title}
              </div>
            </div>
          );
        })}
      </div>
      {/* Completion Rewards Preview */}
      {progress > 80 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-brand-gold/10 to-brand-cta/10 rounded-lg border border-brand-gold/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
              <Icon name="Gift" size={20} color="white" />
            </div>
            <div>
              <h4 className="font-semibold text-brand-text-primary">Almost There!</h4>
              <p className="text-sm text-brand-text-secondary">
                Complete your assessment to unlock personalized outfit recommendations and your style archetype!
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-2 bg-muted rounded-lg">
          <div className="text-lg font-bold text-brand-text-primary">
            {completedSteps?.length}
          </div>
          <div className="text-xs text-brand-text-secondary">Completed</div>
        </div>
        
        <div className="p-2 bg-muted rounded-lg">
          <div className="text-lg font-bold text-brand-text-primary">
            {totalSteps - currentStep}
          </div>
          <div className="text-xs text-brand-text-secondary">Remaining</div>
        </div>
        
        <div className="p-2 bg-muted rounded-lg">
          <div className="text-lg font-bold text-brand-text-primary">
            {Math.round((completedSteps?.length / totalSteps) * 100)}%
          </div>
          <div className="text-xs text-brand-text-secondary">Complete</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;