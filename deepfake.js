import React, { useState, useCallback } from 'react';
import { Shield, Cpu, Zap, Users, Github, Twitter } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingAnimation } from './components/LoadingAnimation';
import { classifyImage, ClassificationResult } from './utils/mockClassifier';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const handleImageSelect = useCallback(async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setResult(null);
    setIsProcessing(true);

    try {
      const classification = await classifyImage(file);
      setResult(classification);
    } catch (error) {
      console.error('Classification failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setResult(null);
    setIsProcessing(false);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-lime-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-lime-500 rounded-xl flex items-center justify-center shadow-lg">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DeepFake Detector</h1>
                <p className="text-sm text-gray-500">AI-Powered Image Authenticity</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                <Github size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                <Twitter size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Detect AI-Generated
            <span className="bg-gradient-to-r from-teal-600 to-lime-500 bg-clip-text text-transparent"> Images</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upload any image and our advanced GAN-based discriminator will analyze it to determine 
            if it's authentic or artificially generated with high accuracy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <Cpu size={24} className="text-teal-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced AI</h3>
              <p className="text-gray-600 text-sm text-center">Powered by state-of-the-art GAN discriminator technology</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                <Zap size={24} className="text-lime-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm text-center">Get results in seconds with our optimized processing</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} className="text-cyan-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trusted by Thousands</h3>
              <p className="text-gray-600 text-sm text-center">Join the community fighting against deepfake misinformation</p>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClear={handleClear}
              isProcessing={isProcessing}
            />
          </div>
          
          {(isProcessing || result) && (
            <div className="mt-8">
              {isProcessing ? (
                <LoadingAnimation />
              ) : result ? (
                <ResultDisplay result={result} />
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-lime-500 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">DeepFake Detector</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Helping you identify AI-generated content with cutting-edge machine learning technology. 
              Built with advanced GAN discriminator networks for reliable authenticity detection.
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2025 DeepFake Detector. Powered by advanced AI technology.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;