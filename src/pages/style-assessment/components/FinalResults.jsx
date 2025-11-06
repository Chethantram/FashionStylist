import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

import Button from "../../../components/ui/Button";
import {
  generateStyleProfile,
  handleGeminiError,
} from "../../../services/geminiStyleService";
import { useCancellableRequest } from "../../../hooks/useCancellableRequest";
import axios from "axios";
import Image from "components/AppImage";

const FinalResults = ({ assessmentData }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [styleProfile, setStyleProfile] = useState(null);
  const [error, setError] = useState(null);
  const { startRequest, isProcessing, processingStage, processingProgress } =
    useCancellableRequest();

  // ✅ Move this outside all conditions
  const generatePersonalizedProfile = async () => {
    try {
      setError(null);
      const result = await startRequest(async () => {
        return await generateStyleProfile(assessmentData);
      });

      setStyleProfile(result);

      // Save AI result to backend
      await axios.put(
        "http://localhost:5000/api/auth/ai-style",
        { aiStyleProfile: result },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error generating style profile:", error);
      setError(handleGeminiError(error));

    }
  };

  useEffect(() => {
    const isAssessmentComplete = () => {
      const data = assessmentData || {};
      return (
        data.selectedImages &&
        data.selectedImages.length > 0 &&
        data.selectedBodyType &&
        data.selectedBodyType !== "" &&
        (data.selectedColors?.favorites?.length > 0 ||
          data.selectedColors?.maybe?.length > 0 ||
          data.selectedColors?.avoid?.length > 0)
      );
    };

    const fetchAIProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/ai-style", {
          withCredentials: true,
        });
        if (res.data.success && res.data.aiStyleProfile) {
          setStyleProfile(res.data.aiStyleProfile);
        } else {
          generatePersonalizedProfile();
        }
      } catch (error) {
        console.error("Error fetching AI profile:", error);
        generatePersonalizedProfile();
      }
    };

    // ✅ Only proceed if user has completed the assessment
    if (isAssessmentComplete()) {
      fetchAIProfile();
    } else {
      setError("Please complete your style assessment before viewing results.");
    }
  }, [assessmentData]);

  // ✅ All hooks are now at the top — no conditional hook calls

  const handleShare = async () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      alert("Your style profile has been copied to clipboard!");
    }, 1500);
  };

  // ✅ Conditional UI rendering only
  if (!styleProfile && isProcessing) {
    return (
      <div className="space-y-8 text-center">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-brand-gold to-brand-cta flex items-center justify-center shadow-brand-modal">
          <Icon name="Sparkles" size={48} color="white" />
        </div>
        <h1 className="text-3xl font-bold">
          Creating Your Personal Style Profile...
        </h1>
        <p className="text-lg text-brand-text-secondary">
          Our AI is analyzing your responses and generating personalized
          recommendations just for you.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span>{processingStage}</span>
            <span>{processingProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-brand-gold to-brand-cta h-2 rounded-full transition-all duration-300"
              style={{ width: `${processingProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error && !styleProfile) {
    return (
      <div className="text-center space-y-6">
        <div className="w-32 h-32 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <Icon name="AlertCircle" size={48} color="#DC2626" />
        </div>
        <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
        <p className="text-lg text-brand-text-secondary">{error}</p>
        <Button onClick={generatePersonalizedProfile}>Try Again</Button>
      </div>
    );
  }

  if (!styleProfile) return null;

  const {
    styleArchetype,
    detailedAnalysis,
    colorPalette,
    outfitRecommendations,
    shoppingGuide,
  } = styleProfile;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-brand-gold to-brand-cta flex items-center justify-center shadow-brand-modal">
          <Image src="/logo.png" alt="logo" className="w-30 h-30" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-brand-text-primary mb-2">
            Congratulations! You're...
          </h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-brand-gold to-brand-cta bg-clip-text text-transparent mb-4">
            {styleArchetype?.name}
          </h2>
          <p className="text-lg text-brand-text-secondary max-w-2xl mx-auto">
            {styleArchetype?.description}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-brand-cream px-6 py-3 rounded-full">
            <p className="text-brand-text-primary font-medium italic">
              "{styleArchetype?.motto}"
            </p>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      {detailedAnalysis && (
        <div className="bg-card p-6 rounded-2xl shadow-brand border border-border">
          <h3 className="text-xl font-semibold text-brand-text-primary mb-4 flex items-center">
            <Icon name="Brain" size={20} className="mr-2 text-brand-gold" />
            AI Style Analysis
          </h3>
          <p className="text-brand-text-secondary leading-relaxed">
            {detailedAnalysis}
          </p>
        </div>
      )}

      {/* Style Traits */}
      <div className="bg-card p-6 rounded-2xl shadow-brand border border-border">
        <h3 className="text-xl font-semibold text-brand-text-primary mb-4 text-center">
          Your Style DNA
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {styleArchetype?.traits?.map((trait, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-xl">
              <div className="w-12 h-12 mx-auto bg-brand-gold rounded-full flex items-center justify-center mb-2">
                <Icon name="Star" size={20} color="white" />
              </div>
              <p className="font-semibold text-brand-text-primary">{trait}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      {colorPalette && (
        <div className="bg-card p-6 rounded-2xl shadow-brand border border-border">
          <h3 className="text-xl font-semibold text-brand-text-primary mb-4 text-center">
            Your Personalized Color Palette
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-brand-text-primary mb-2">
                Primary Colors
              </h4>
              <div className="flex flex-wrap gap-2">
                {colorPalette?.primary?.map((color, index) => (
                  <input
                    type="color"
                    value={color}
                    key={index}
                    className="w-16 h-10  rounded-md"
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-brand-text-primary mb-2">
                Accent Colors
              </h4>
              <div className="flex flex-wrap gap-2">
                {colorPalette?.accent?.map((color, index) => (
                  <input
                    type="color"
                    value={color}
                    key={index}
                    className="w-16 h-10  rounded-md"
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-brand-text-primary mb-2">
                Neutral Base
              </h4>
              <div className="flex flex-wrap gap-2">
                {colorPalette?.neutral?.map((color, index) => (
                  <input
                    type="color"
                    value={color}
                    key={index}
                    className="w-16 h-10  rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI-Generated Outfit Recommendations */}
      {outfitRecommendations && outfitRecommendations?.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-brand-text-primary mb-2">
              Your AI-Curated Outfit Recommendations
            </h3>
            <p className="text-brand-text-secondary">
              Personalized specifically for your style archetype and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outfitRecommendations?.map((outfit, index) => (
              <div
                key={index}
                className="bg-card rounded-xl shadow-brand border border-border overflow-hidden hover:shadow-elevated transition-shadow"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-brand-cream to-muted flex items-center justify-center">
                  <Icon
                    name="Shirt"
                    size={48}
                    color="var(--color-brand-text-secondary)"
                  />
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-brand-text-primary mb-1">
                    {outfit?.title}
                  </h4>
                  <p className="text-xs text-brand-gold mb-2">
                    {outfit?.occasion}
                  </p>
                  <p className="text-sm text-brand-text-secondary mb-3">
                    {outfit?.description}
                  </p>

                  <div className="space-y-1 mb-3">
                    <h5 className="text-xs font-medium text-brand-text-primary">
                      Key Pieces:
                    </h5>
                    {outfit?.items?.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center text-sm text-brand-text-secondary"
                      >
                        <Icon
                          name="Check"
                          size={14}
                          className="text-brand-gold mr-2 flex-shrink-0"
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  {outfit?.stylingTips && (
                    <div className="mt-3 p-2 bg-muted rounded text-xs text-brand-text-secondary">
                      <strong>Styling Tip:</strong> {outfit?.stylingTips}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shopping Guide */}
      {shoppingGuide && (
        <div className="bg-card p-6 rounded-2xl shadow-brand border border-border">
          <h3 className="text-xl font-semibold text-brand-text-primary mb-4 flex items-center">
            <Icon
              name="ShoppingBag"
              size={20}
              className="mr-2 text-brand-gold"
            />
            Your Personalized Shopping Guide
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-brand-text-primary mb-3">
                Key Investment Pieces
              </h4>
              <div className="space-y-2">
                {shoppingGuide?.keyPieces?.map((piece, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-brand-text-secondary"
                  >
                    <Icon
                      name="Star"
                      size={14}
                      className="text-brand-gold mr-2 flex-shrink-0"
                    />
                    {piece}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-brand-text-primary mb-3">
                Budget Tips
              </h4>
              <p className="text-sm text-brand-text-secondary">
                {shoppingGuide?.budgetTips}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Summary */}
      <div className="bg-card p-6 rounded-xl shadow-brand border border-border">
        <h4 className="font-semibold text-brand-text-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Your Assessment Summary
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-brand-gold mb-1">
              {assessmentData?.selectedImages?.length || 0}
            </div>
            <div className="text-sm text-brand-text-secondary">
              Lifestyle Scenarios
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-brand-gold mb-1">
              {assessmentData?.likedOutfits?.length || 0}
            </div>
            <div className="text-sm text-brand-text-secondary">
              Loved Styles
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-brand-gold mb-1">
              {assessmentData?.selectedColors?.favorites?.length || 0}
            </div>
            <div className="text-sm text-brand-text-secondary">
              Favorite Colors
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-brand-gold mb-1">100%</div>
            <div className="text-sm text-brand-text-secondary">AI-Powered</div>
          </div>
        </div>
      </div>
      {/* Footer Message */}
      <div className="text-center py-8">
        <div className="max-w-2xl mx-auto">
          <Icon
            name="Heart"
            size={24}
            className="text-brand-gold mx-auto mb-4"
          />
          <h4 className="text-lg font-semibold text-brand-text-primary mb-2">
            Welcome to Your AI-Powered Style Journey!
          </h4>
          <p className="text-brand-text-secondary">
            Your personalized style assessment is complete! StyleMind AI will
            continue learning your preferences and evolving your recommendations
            as you explore and experiment with your newfound style identity.
            Every interaction helps me understand you better and provide more
            accurate fashion advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalResults;
