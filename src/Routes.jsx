import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingAssistant from './pages/shopping-assistant';
import StyleAssessment from './pages/style-assessment';
import AIStylistChat from './pages/ai-stylist-chat';
import VirtualWardrobe from './pages/virtual-wardrobe';
import Homepage from './pages/homepage';
import AuthPage from "pages/auth";
import ProfilePage from "pages/profile";
import AboutUs from "pages/AboutUs";
import FavoritePage from "pages/Favorite/faviorite";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shopping-assistant" element={<ShoppingAssistant />} />
        <Route path="/style-assessment" element={<StyleAssessment />} />
        <Route path="/ai-stylist-chat/:userId" element={<AIStylistChat />} />
        {/* <Route path="/virtual-wardrobe" element={<VirtualWardrobe />} /> */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/wishlist" element={<FavoritePage/>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
