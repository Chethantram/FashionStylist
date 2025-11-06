import { useRef, useState } from 'react';

/**
 * React hook for managing cancellable API requests with progress tracking.
 * Designed specifically for fashion AI interactions that may take time.
 * @returns {Object} Hook utilities for request management
 */
export function useCancellableRequest() {
  const abortControllerRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);

  const startRequest = async (requestFunction) => {
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingStage('Thinking about your style...');

    try {
      // Fashion-specific progress stages for better UX
      const progressStages = [
        { stage: 'Understanding your preferences...', progress: 15 },
        { stage: 'Analyzing fashion trends...', progress: 30 },
        { stage: 'Creating personalized recommendations...', progress: 60 },
        { stage: 'Finalizing your style advice...', progress: 85 },
        { stage: 'Almost ready!', progress: 95 }
      ];

      // Start progress simulation
      let currentStageIndex = 0;
      const progressInterval = setInterval(() => {
        if (currentStageIndex < progressStages?.length) {
          const stage = progressStages?.[currentStageIndex];
          setProcessingStage(stage?.stage);
          setProcessingProgress(stage?.progress);
          currentStageIndex++;
        }
      }, 800);

      // Execute the actual request
      const result = await requestFunction(abortControllerRef?.current?.signal);
      
      // Clean up progress simulation
      clearInterval(progressInterval);
      setProcessingProgress(100);
      setProcessingStage('Complete!');
      
      return result;
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef?.current) {
      abortControllerRef?.current?.abort();
      setIsProcessing(false);
      setProcessingStage('Cancelled');
      setProcessingProgress(0);
    }
  };

  return {
    startRequest,
    cancelRequest,
    isProcessing,
    processingStage,
    processingProgress
  };
}