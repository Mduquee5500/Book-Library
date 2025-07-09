import { BookSearch } from "./components/bookSearch.jsx";
import "./App.css";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("browse");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-orange-50">
      {/* Academic Header */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-amber-100 mb-4 tracking-tight">
              My Virtual Library
            </h1>
            <div className="w-32 h-1 bg-amber-400 mx-auto mb-4"></div>
            <p className="text-xl text-amber-200 font-medium max-w-3xl mx-auto leading-relaxed">
              A comprehensive digital collection for academic research and
              scholarly discovery
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => handleTabChange("browse")}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === "browse"
                ? "bg-red-800 text-amber-100"
                : "bg-amber-100 text-red-800 hover:bg-amber-200"
            }`}
          >
            Browse Books
          </button>
          <button
            onClick={() => handleTabChange("library")}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === "library"
                ? "bg-red-800 text-amber-100"
                : "bg-amber-100 text-red-800 hover:bg-amber-200"
            }`}
          >
            My Library
          </button>
        </div>
      </div>

      {/* Conditional Content */}
      {activeTab === "browse" && <BookSearch />}
      {activeTab === "library" && <div>My Library Component</div>}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-red-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-amber-200 text-sm">
              © 2024 Virtual Academic Library - Empowering Knowledge Discovery
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
