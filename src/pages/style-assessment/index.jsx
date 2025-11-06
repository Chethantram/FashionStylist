import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

// Import all components
import LifestyleImageSelector from "./components/LifestyleImageSelector";
import BodyTypeSelector from "./components/BodyTypeSelector";
import ColorPaletteFinder from "./components/ColorPaletteFinder";
import StyleInspirationBoard from "./components/StyleInspirationBoard";
import BudgetPreferences from "./components/BudgetPreferences";
import StyleProfileBuilder from "./components/StyleProfileBuilder";
import ProgressIndicator from "./components/ProgressIndicator";
import FinalResults from "./components/FinalResults";
import axios from "axios";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'
import LoaderHanger from "components/Loader";

const StyleAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isEditable, setIsEditable] = useState(true);
  const [assessmentData, setAssessmentData] = useState({
    selectedImages: [],
    selectedBodyType: "",
    selectedColors: { favorites: [], maybe: [], avoid: [] },
    likedOutfits: [],
    dislikedOutfits: [],
    budgetData: {
      budget: "",
      frequency: "",
      priorities: [],
      monthlyBudget: 100,
    },
  });
  const [loading, setLoading] = useState(true);


  const totalSteps = 6;
  const stepTitles = [
    "Lifestyle",
    "Body Type",
    "Colors",
    "Style Inspiration",
    "Budget",
    "Results",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleStepData = (stepNumber, data) => {
    setAssessmentData((prev) => {
      switch (stepNumber) {
        case 1:
          return { ...prev, selectedImages: data };
        case 2:
          return { ...prev, selectedBodyType: data };
        case 3:
          return { ...prev, selectedColors: data };
        case 4:
          return {
            ...prev,
            likedOutfits: data?.[0],
            dislikedOutfits: data?.[1],
          };
        case 5:
          return { ...prev, budgetData: data };
        default:
          return prev;
      }
    });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return assessmentData?.selectedImages?.length >= 2;
      case 2:
        return assessmentData?.selectedBodyType !== "";
      case 3:
        return assessmentData?.selectedColors?.favorites?.length > 0;
      case 4:
        return assessmentData?.likedOutfits?.length >= 2;
      case 5:
        return assessmentData?.budgetData?.budget !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceedToNext() && currentStep < totalSteps) {
      if (!completedSteps?.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep || completedSteps?.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <LifestyleImageSelector
            selectedImages={assessmentData?.selectedImages}
            onSelectionChange={(data) => handleStepData(1, data)}
            disabled={!isEditable}
          />
        );
      case 2:
        return (
          <BodyTypeSelector
            selectedBodyType={assessmentData?.selectedBodyType}
            onSelectionChange={(data) => handleStepData(2, data)}
            disabled={!isEditable}
          />
        );
      case 3:
        return (
          <ColorPaletteFinder
            selectedColors={assessmentData?.selectedColors}
            onSelectionChange={(data) => handleStepData(3, data)}
            disabled={!isEditable}
          />
        );
      case 4:
        return (
          <StyleInspirationBoard
            likedOutfits={assessmentData?.likedOutfits}
            dislikedOutfits={assessmentData?.dislikedOutfits}
            onSelectionChange={(liked, disliked) =>
              handleStepData(4, [liked, disliked])
            }
            disabled={!isEditable}
          />
        );
      case 5:
        return (
          <BudgetPreferences
            budgetData={assessmentData?.budgetData}
            onSelectionChange={(data) => handleStepData(5, data)}
            disabled={!isEditable}
          />
        );
      case 6:
        return <FinalResults assessmentData={assessmentData} />;
      default:
        return null;
    }
  };

  const saveAssessmentData = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/assessment",
        { assessmentData },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(
          response?.data?.message || "Assessment saved successfully!"
        );
        setIsEditable(false); // lock editing
      } else {
        toast.error(response?.data?.message || "Failed to save assessment.");
      }
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("Failed to save your assessment. Please try again.");
    }
  };

  useEffect(() => {
    if (currentStep === totalSteps) {
      saveAssessmentData();
    }
  }, [currentStep]);

// useEffect(() => {
//   const fetchAssessment = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/get-assessment", {
//         withCredentials: true,
//       });

//       const data = res.data.assessmentData;

//       if (!data) {
//         // 🆕 New user → start from Step 1
//         setAssessmentData({
//           selectedImages: [],
//           selectedBodyType: "",
//           selectedColors: { favorites: [], maybe: [], avoid: [] },
//           likedOutfits: [],
//           dislikedOutfits: [],
//           budgetData: { budget: "", frequency: "", priorities: [], monthlyBudget: 100 },
//         });
//         setCurrentStep(1);
//         setIsEditable(true);
//         return;
//       }

//       // 🧠 Existing user → go to final results
//       setAssessmentData(data);
//       setCurrentStep(totalSteps);
//       setIsEditable(false);
//     } catch (error) {
//       console.error("Error fetching assessment:", error);
//       // Default to step 1 if something fails
//       setAssessmentData({
//         selectedImages: [],
//         selectedBodyType: "",
//         selectedColors: { favorites: [], maybe: [], avoid: [] },
//         likedOutfits: [],
//         dislikedOutfits: [],
//         budgetData: { budget: "", frequency: "", priorities: [], monthlyBudget: 100 },
//       });
//       setCurrentStep(1);
//       setIsEditable(true);
//     }
//   };

//   fetchAssessment();
// }, []);




  // useEffect(() => {
  //   setAssessmentData(savedData);
  //   setIsEditable(false);
  //   setCurrentStep(totalSteps); // show Final Results
  // }, []);

  useEffect(() => {
  const fetchAssessment = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/get-assessment", {
        withCredentials: true,
      });

      const data = res.data.assessmentData;

      if (!data) {
        // 🆕 New user → start from Step 1
        resetAssessmentToDefaults();
        return;
      }

      // 🧩 Check if the assessment is fully completed
      const isAssessmentComplete =
        data.selectedImages?.length >= 2 &&
        data.selectedBodyType &&
        data.selectedColors?.favorites?.length > 0 &&
        data.likedOutfits?.length >= 2 &&
        data.budgetData?.budget;

      setAssessmentData(data);

      if (isAssessmentComplete) {
        // ✅ Completed → Go to final step
        setCurrentStep(totalSteps);
        setIsEditable(false);
      } else {
        // ⚠️ Incomplete → Start where they left off
        const nextStep = getNextIncompleteStep(data);
        setCurrentStep(nextStep);
        setIsEditable(true);
      }
    } catch (error) {
      console.error("Error fetching assessment:", error);
      resetAssessmentToDefaults();
    }finally{
      setLoading(false);
    }
  };

  const resetAssessmentToDefaults = () => {
    setAssessmentData({
      selectedImages: [],
      selectedBodyType: "",
      selectedColors: { favorites: [], maybe: [], avoid: [] },
      likedOutfits: [],
      dislikedOutfits: [],
      budgetData: {
        budget: "",
        frequency: "",
        priorities: [],
        monthlyBudget: 100,
      },
    });
    setCurrentStep(1);
    setIsEditable(true);
  };

  const getNextIncompleteStep = (data) => {
    if (!data.selectedImages?.length) return 1;
    if (!data.selectedBodyType) return 2;
    if (!data.selectedColors?.favorites?.length) return 3;
    if (!data.likedOutfits?.length) return 4;
    if (!data.budgetData?.budget) return 5;
    return 6;
  };

  fetchAssessment();
}, []);

if (loading) {
  return <LoaderHanger/>;
}

  return (
    <motion.div initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }} className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Link
                to="/"
                className="text-brand-text-secondary hover:text-brand-text-primary transition-colors"
              >
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <h1 className="text-3xl font-bold text-brand-text-primary">
                Style Assessment
              </h1>
            </div>
            

            <p className="text-lg text-brand-text-secondary max-w-2xl mx-auto">
              Discover your unique style DNA through our comprehensive
              assessment. Answer a few questions and let AI create your
              personalized style profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl shadow-brand border border-border p-6 lg:p-8">
                {renderStepContent()}

                {/* Navigation Buttons */}
                {currentStep < totalSteps && (
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-brand-text-secondary">
                        {currentStep === 1 &&
                          assessmentData?.selectedImages?.length < 2 &&
                          "Select at least 2 scenarios to continue"}
                        {currentStep === 2 &&
                          !assessmentData?.selectedBodyType &&
                          "Please select your body type"}
                        {currentStep === 3 &&
                          (!assessmentData?.selectedColors?.favorites ||
                            assessmentData?.selectedColors?.favorites
                              ?.length === 0) &&
                          "Add some colors to your favorites"}
                        {currentStep === 4 &&
                          assessmentData?.likedOutfits?.length < 2 &&
                          "Heart at least 2 styles to continue"}
                        {currentStep === 5 &&
                          !assessmentData?.budgetData?.budget &&
                          "Please select your budget preference"}
                      </p>
                    </div>

                    <Button
                      variant="default"
                      onClick={handleNext}
                      disabled={!canProceedToNext()}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      {currentStep === totalSteps - 1 ? "See Results" : "Next"}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Progress Indicator */}
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepTitles={stepTitles}
                completedSteps={completedSteps}
              />

              {/* Style Profile Builder */}
              {(assessmentData?.selectedImages?.length > 0 ||
                assessmentData?.selectedBodyType ||
                assessmentData?.selectedColors?.favorites?.length > 0 ||
                assessmentData?.likedOutfits?.length > 0) && (
                <StyleProfileBuilder assessmentData={assessmentData} />
              )}

              {/* Quick Tips */}
              <div className="bg-card p-4 rounded-xl shadow-brand border border-border">
                <h4 className="font-semibold text-brand-text-primary mb-3 flex items-center">
                  <Icon
                    name="Lightbulb"
                    size={18}
                    className="mr-2 text-brand-gold"
                  />
                  Style Tips
                </h4>

                <div className="space-y-3 text-sm text-brand-text-secondary">
                  {currentStep === 1 && (
                    <p>
                      💡 Choose scenarios that represent 70% or more of your
                      typical week for the most accurate recommendations.
                    </p>
                  )}
                  {currentStep === 2 && (
                    <p>
                      💡 Remember, every body is beautiful! This helps us
                      suggest the most flattering silhouettes for you.
                    </p>
                  )}
                  {currentStep === 3 && (
                    <p>
                      💡 Don't overthink it - go with your gut feeling. Colors
                      that make you feel confident are your best colors!
                    </p>
                  )}
                  {currentStep === 4 && (
                    <p>
                      💡 Focus on the overall vibe rather than specific pieces.
                      We're learning about your style personality!
                    </p>
                  )}
                  {currentStep === 5 && (
                    <p>
                      💡 Be honest about your budget - we'll help you look
                      amazing at any price point!
                    </p>
                  )}
                  {currentStep === 6 && (
                    <p>
                      🎉 Congratulations! Your style journey with AI begins now.
                      Save this profile to track your evolution!
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Navigation */}
              {currentStep < totalSteps && (
                <div className="bg-card p-4 rounded-xl shadow-brand border border-border">
                  <h4 className="font-semibold text-brand-text-primary mb-3">
                    Quick Navigation
                  </h4>
                  <div className="space-y-2">
                    {stepTitles?.slice(0, -1)?.map((title, index) => {
                      const stepNumber = index + 1;
                      const isCompleted = completedSteps?.includes(stepNumber);
                      const isCurrent = stepNumber === currentStep;
                      const isAccessible =
                        stepNumber <= currentStep || isCompleted;

                      return (
                        <button
                          key={stepNumber}
                          onClick={() => handleStepClick(stepNumber)}
                          disabled={!isAccessible}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                            isCurrent
                              ? "bg-brand-cream text-brand-text-primary font-medium"
                              : isCompleted
                              ? "text-green-700 hover:bg-green-50"
                              : isAccessible
                              ? "text-brand-text-secondary hover:bg-muted"
                              : "text-brand-trust cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                                isCurrent
                                  ? "bg-brand-gold text-white"
                                  : isCompleted
                                  ? "bg-green-500 text-white"
                                  : "bg-border text-brand-text-secondary"
                              }`}
                            >
                              {isCompleted ? (
                                <Icon name="Check" size={10} />
                              ) : (
                                stepNumber
                              )}
                            </div>
                            <span>{title}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StyleAssessment;
