import React, { useState, useEffect } from 'react';
import ModernLayout from './components/ModernLayout';
import ModernEditor from './components/ModernEditor';
import ModernHistory from './components/ModernHistory';
import AboutPage from './components/AboutPage';
import AuthPage from './components/AuthPage';
import AccountPage from './components/AccountPage';
import HowToPage from './components/HowToPage';
import RepulsionBackground from './components/RepulsionBackground';
import { generateStorySegment } from './services/storyWeaverAI';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('write');

  useEffect(() => {
    // Check for logged in user
    const savedUser = localStorage.getItem('storyWeaver_currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    // Load stories for specific user
    if (user) {
      const savedStories = localStorage.getItem(`storyWeaver_stories_${user.username}`);
      if (savedStories) {
        setStories(JSON.parse(savedStories));
      } else {
        setStories([]);
      }
    }
  }, [user]);

  useEffect(() => {
    // Save stories for specific user
    if (user) {
      localStorage.setItem(`storyWeaver_stories_${user.username}`, JSON.stringify(stories));
    }
  }, [stories, user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('storyWeaver_currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('storyWeaver_currentUser');
    setStories([]);
    setActiveTab('write');
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      const users = JSON.parse(localStorage.getItem('storyWeaver_users') || '{}');
      delete users[user.username];
      localStorage.setItem('storyWeaver_users', JSON.stringify(users));
      localStorage.removeItem(`storyWeaver_stories_${user.username}`);
      handleLogout();
    }
  };

  const handleDeleteStory = (id) => {
    setStories(prev => prev.filter(story => story.id !== id));
  };

  const handleWeaveStory = async (dayText) => {
    setIsGenerating(true);
    try {
      const context = stories.map(s => s.generatedText).join(" ");
      const newSegment = await generateStorySegment(dayText, context, new Date());

      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        originalText: dayText,
        generatedText: newSegment
      };

      setStories(prev => [newEntry, ...prev]);
      setActiveTab('history');
    } catch (error) {
      console.error("Failed to weave story:", error);
      alert("Alas, ink troubles. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    if (stories.length === 0) {
      alert("Nothing to export yet!");
      return;
    }
    const storyText = stories.map(s =>
      `Date: ${s.date}\nOriginal: ${s.originalText}\nStory: ${s.generatedText}\n-------------------\n`
    ).join('\n');
    const blob = new Blob([storyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StoryWeaver_Export_${user?.username || 'Guest'}.txt`;
    link.click();
  };

  if (!user) {
    return (
      <>
        <RepulsionBackground />
        <AuthPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <ModernLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onExport={handleExport}
      onLogout={handleLogout}
      user={user}
      mainContent={
        activeTab === 'write' ? (
          <ModernEditor
            onWeave={handleWeaveStory}
            isGenerating={isGenerating}
          />
        ) : activeTab === 'history' ? (
          <ModernHistory stories={stories} onDelete={handleDeleteStory} />
        ) : activeTab === 'account' ? (
          <AccountPage
            user={user}
            stories={stories}
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
          />
        ) : activeTab === 'howto' ? (
          <HowToPage />
        ) : (
          <AboutPage />
        )
      }
    />
  );
}

export default App;
