/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { PlayableAdvergame } from './components/PlayableAdvergame';
import { BriefingLab } from './components/BriefingLab';
import { AssetsGallery } from './components/AssetsGallery';
import { RubricChecklist } from './components/RubricChecklist';
import { PracticeGuide } from './components/PracticeGuide';
import { Footer } from './components/Footer';
import { DEFAULT_BRIEFING } from './data/pipelineData';
import { BrandBriefing } from './types/advergame';
import { sound } from './utils/audioSystem';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('game');
  const [briefing, setBriefing] = useState<BrandBriefing>(DEFAULT_BRIEFING);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleToggleSound = () => {
    const isNowOn = sound.toggleSound();
    setSoundEnabled(isNowOn);
  };

  const handleUpdateBriefing = (updated: BrandBriefing) => {
    setBriefing(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onPlayNow={() => setActiveTab('game')}
      />

      {/* Main App Content */}
      <main className="flex-1">
        {/* Playable Advergame: Passo Livre Nuvem */}
        {activeTab === 'game' && (
          <PlayableAdvergame
            briefing={briefing}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onGoToBriefing={() => setActiveTab('briefing')}
          />
        )}

        {/* Mini-GDD & Lab */}
        {activeTab === 'briefing' && (
          <BriefingLab
            briefing={briefing}
            onUpdateBriefing={handleUpdateBriefing}
            onLaunchGame={() => setActiveTab('game')}
          />
        )}

        {/* Assets Gallery & GitHub Delivery Center */}
        {activeTab === 'assets' && (
          <AssetsGallery />
        )}

        {/* Evaluation Rubric & 7-Section Report */}
        {activeTab === 'checklist' && (
          <RubricChecklist
            onGoToGame={() => setActiveTab('game')}
          />
        )}

        {/* Official Practice Guide & Brand Chooser */}
        {activeTab === 'guide' && (
          <PracticeGuide
            currentBriefing={briefing}
            onSelectBrandProposal={(bp) => {
              setBriefing(bp);
            }}
            onPlayDemo={() => setActiveTab('game')}
          />
        )}
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
