import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CropsPage } from "../modules/crops/CropsPage";
import { CameraPage } from "../modules/camera/CameraPage";
import { AiAssistantPage } from "../modules/ai-assistant/AiAssistantPage";
import { ContentPage } from "../modules/content/ContentPage";
import { AnalyticsPage } from "../modules/analytics/AnalyticsPage";
import { StorePage } from "../modules/store/StorePage";
import { CommunityPage } from "../modules/community/CommunityPage";
import { ProfilePage } from "../modules/profile/ProfilePage";

import { MainLayout } from "../layouts/MainLayout";

export function AppRoutes() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CropsPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/ai" element={<AiAssistantPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
