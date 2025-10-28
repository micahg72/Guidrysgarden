const INDEX_HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guidry's Garden Ai: Plan • Design • Visualize</title>
    <script src="https://cdn.tailwindcss.com"></script>
  <script type="importmap">
{
  "imports": {
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "@google/genai": "https://aistudiocdn.com/@google/genai@^1.27.0"
  }
}
</script>
</head>
  <body class="bg-green-50/50">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
`;

const INDEX_TSX_CONTENT = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

const METADATA_JSON_CONTENT = `{
  "name": "Guidry's Garden Ai: Plan • Design • Visualize",
  "description": "Guidry's Garden Ai: Plan • Design • Visualize is an AI-powered garden planning assistant. Design your dream garden with visual layouts, get plant suggestions, visualize results by uploading a photo of your space, and interact using a conversational voice interface.",
  "requestFramePermissions": [
    "microphone"
  ]
}
`;

const TYPES_TS_CONTENT = `
export interface Plant {
  id: string;
  name: string;
  description: string;
  careLevel: 'Easy' | 'Medium' | 'Hard';
  season: string;
  type: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string; // Optional image for model's response
}

export interface PlacedPlant {
  instanceId: string;
  plant: Plant;
  position: { x: number; y: number };
}
`;

const ICONS_TSX_CONTENT = `import React from 'react';

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Zm0 12a5 5 0 0 1-5-5V5a5 5 0 0 1 10 0v6a5 5 0 0 1-5 5Z" />
    <path d="M19 11a1 1 0 0 1 1 1v.5a8 8 0 0 1-16 0V12a1 1 0 0 1 2 0v.5a6 6 0 0 0 12 0V12a1 1 0 0 1 1-1Z" />
  </svg>
);

export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-2 4v8h8v-8H8Z"/>
    </svg>
);


export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 15.182 15.182 0 01-1.06-1.012c-.31-.433-.6-1.015-.8-1.766-1.8-7.222 5.068-11.54 9.39-7.221a.75.75 0 01-1.06 1.062 10.536 10.536 0 00-6.736-2.94c-4.482 0-8.08 3.582-8.08 8.082 0 1.228.32 2.404.9 3.492l.02.032.02.031.025.035c.18.24.39.47.62.693a13.785 13.785 0 001.319 1.118l.002.001.002.001.002.001a.75.75 0 01-1.06 1.062zM20.57 4.43a.75.75 0 011.06 1.06l-6.97 6.97a.75.75 0 01-1.06 0l-3.47-3.47a.75.75 0 011.06-1.06l2.94 2.94 6.44-6.44z" />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM12 14.25a.75.75 0 0 1-.75-.75V8.56l-1.628 1.628a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06L12.75 8.56v4.94c0 .414-.336.75-.75.75Zm-5.25 3a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H6.75Z" />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M10.5 3.75a2.25 2.25 0 00-2.25 2.25v10.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V6a2.25 2.25 0 00-2.25-2.25z" clipRule="evenodd" />
    <path d="M6.75 12a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-1.76 1.44-3.2 3.2-3.2s3.2 1.44 3.2 3.2v2.268c.262-.102.53-.192.802-.286V15c0-2.652-2.148-4.8-4.8-4.8s-4.8 2.148-4.8 4.8v.006c-.346.03-.69.066-1.034.102V15c0-4.142 3.358-7.5 7.5-7.5 1.135 0 2.212.253 3.185.717a.75.75 0 01-1.04 1.086A5.98 5.98 0 0017.25 9c-3.313 0-6 2.687-6 6v.089c-.563.083-1.112.19-1.65.317V15a6.75 6.75 0 01-6.75-6.75.75.75 0 01.75-.75c2.69 0 5.151 1.04 7.014 2.754a.75.75 0 01-1.056 1.056z" clipRule="evenodd" />
  </svg>
);

export const GoogleDriveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.22 3.125L3 8.375l8.938 12.5h5.812L8.812 3.125H6.22zM8.406 4.375l8.344 14.375L21 11.25l-4.5-7.813-8.094.938zM5.53 9.375l-1.5 2.625 7.938 5.469 1.5-2.625-7.938-5.469z"/>
  </svg>
);

export const DeployIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.401 3.949c.426-.233.955-.233 1.381 0l8.25 4.5a.75.75 0 010 1.302l-8.25 4.5a.75.75 0 01-1.38-.651V8.651L3.901 12l5.5 3.001v3.698a.75.75 0 01-1.38.651l-8.25-4.5a.75.75 0 010-1.302l8.25-4.5zM8.25 7.933 5.401 9.5 8.25 11.067V7.933zm1.5 1.134v6.866L15.601 12 9.75 9.067z" clipRule="evenodd" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 00-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
);
`;

const UTILS_TS_CONTENT = `export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the data:image/...;base64, prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Audio decoding functions for Live API
export const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

// Audio encoding function for Live API
export const encode = (bytes: Uint8Array) => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
`;

const GEMINI_SERVICE_TS_CONTENT = `import { GoogleGenAI, Type, Modality, GenerateContentResponse, LiveServerMessage, Blob } from "@google/genai";
import { Plant } from '../types';
import { encode } from './utils';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A simple alert for demonstration purposes. In a real app, handle this more gracefully.
  alert("API_KEY environment variable not set. Please set it to use the application.");
  throw new Error("API_KEY not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getPlantSuggestions = async (prompt: string): Promise<Plant[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: \`Based on the following query, provide a list of 5 suitable plants. Query: "\${prompt}"\`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique identifier for the plant." },
              name: { type: Type.STRING, description: "The common name of the plant." },
              description: { type: Type.STRING, description: "A brief description of the plant." },
              careLevel: { type: Type.STRING, description: "Care level: Easy, Medium, or Hard." },
              season: { type: Type.STRING, description: "The primary season for the plant (e.g., Spring, Summer)." },
              type: { type: Type.STRING, description: "The type of plant (e.g., Flower, Shrub, Tree)." },
            },
            required: ["id", "name", "description", "careLevel", "season", "type"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const plants = JSON.parse(jsonText);
    return plants;
  } catch (error) {
    console.error("Error fetching plant suggestions:", error);
    return [];
  }
};

export const visualizeGarden = async (prompt: string, baseImage: { data: string, mimeType: string } | null): Promise<string> => {
  try {
    if (baseImage) {
      // Image editing with gemini-2.5-flash-image
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: baseImage.data, mimeType: baseImage.mimeType } },
            { text: prompt },
          ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
      });

      if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
        return response.candidates[0].content.parts[0].inlineData.data;
      }
      throw new Error("No image data in response for editing.");

    } else {
      // Image generation with imagen-4.0
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: \`A beautiful and realistic garden design featuring: \${prompt}\`,
        config: {
          numberOfImages: 1,
          aspectRatio: '16:9',
          outputMimeType: 'image/jpeg',
        },
      });
      if (response.generatedImages?.[0]?.image?.imageBytes) {
        return response.generatedImages[0].image.imageBytes;
      }
      throw new Error("No image data in response for generation.");
    }
  } catch (error) {
    console.error("Error visualizing garden:", error);
    throw error;
  }
};

export const getSimpleChatResponse = async (prompt: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting chat response:", error);
        return "Sorry, I encountered an error. Please try again."
    }
};

export const startVoiceConversation = (callbacks: {
    onMessage: (message: LiveServerMessage) => void,
    onOpen: () => void,
    onError: (e: ErrorEvent) => void,
    onClose: (e: CloseEvent) => void,
}) => {
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
            onopen: callbacks.onOpen,
            onmessage: callbacks.onMessage,
            onerror: callbacks.onError,
            onclose: callbacks.onClose,
        },
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            systemInstruction: 'You are a friendly and helpful garden design assistant. Keep your responses concise and conversational.'
        }
    });
};

export const createAudioBlob = (data: Float32Array): Blob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
};
`;

const PLANT_CARD_TSX_CONTENT = `import React from 'react';
import { Plant } from '../types';
import { HeartIcon } from './Icons';

interface PlantCardProps {
  plant: Plant;
  isFavorite: boolean;
  onToggleFavorite: (plantId: string) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, isFavorite, onToggleFavorite }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/json', JSON.stringify(plant));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-grab"
    >
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-green-800">{plant.name}</h3>
          <button
            onClick={() => onToggleFavorite(plant.id)}
            className={\`p-1 rounded-full transition-colors \${isFavorite ? 'text-red-500 bg-red-100' : 'text-gray-400 hover:bg-gray-100'}\`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">{plant.description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{plant.type}</span>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{plant.season}</span>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Care: {plant.careLevel}</span>
      </div>
    </div>
  );
};

export default PlantCard;
`;

const PLANT_LIBRARY_TSX_CONTENT = `import React, { useState } from 'react';
import { Plant } from '../types';
import PlantCard from './PlantCard';
import { SparklesIcon } from './Icons';

interface PlantLibraryProps {
  plants: Plant[];
  favorites: string[];
  onToggleFavorite: (plantId: string) => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const PlantLibrary: React.FC<PlantLibraryProps> = ({ plants, favorites, onToggleFavorite, onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-2xl shadow-lg flex flex-col h-full">
      <div className="p-4 border-b border-green-200/50">
        <h2 className="text-2xl font-bold text-green-900">Plant Library</h2>
        <p className="text-sm text-gray-600">Discover plants for your garden.</p>
      </div>
      <form onSubmit={handleSearch} className="p-4 border-b border-green-200/50">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'low-maintenance flowers for shade'"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={isLoading || !query.trim()}
          >
            <SparklesIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
      <div className="flex-grow p-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : plants.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                isFavorite={favorites.includes(plant.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>No plants found.</p>
            <p className="text-sm">Try searching for something!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantLibrary;
`;

const GARDEN_CANVAS_TSX_CONTENT = `import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { DownloadIcon, UploadIcon, SparklesIcon, GoogleDriveIcon, CloseIcon } from './Icons';
import { Plant, PlacedPlant } from '../types';

interface GardenCanvasProps {
  image: string | null;
  isLoading: boolean;
  onImageUpload: (file: File) => void;
  isSignedIn: boolean;
  onSaveToDrive: () => void;
  onSignIn: () => void;
  isSavingToDrive: boolean;
  isAuthReady: boolean;
}

export interface GardenCanvasRef {
  generateLayoutImage: () => Promise<string | null>;
}

const GardenCanvas = forwardRef<GardenCanvasRef, GardenCanvasProps>(({ image, isLoading, onImageUpload, isSignedIn, onSaveToDrive, onSignIn, isSavingToDrive, isAuthReady }, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [placedPlants, setPlacedPlants] = useState<PlacedPlant[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useImperativeHandle(ref, () => ({
    generateLayoutImage: async () => {
      if (!image) return null;
      
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);

        const bgImage = new Image();
        bgImage.src = \`data:image/jpeg;base64,\${image}\`;
        bgImage.onload = () => {
          canvas.width = bgImage.naturalWidth;
          canvas.height = bgImage.naturalHeight;
          
          ctx.drawImage(bgImage, 0, 0);

          // Render plants on the canvas
          placedPlants.forEach(({ plant, position }) => {
            const containerRect = canvasContainerRef.current?.getBoundingClientRect();
            if(!containerRect) return;

            // Scale position from container dimensions to canvas dimensions
            const x = (position.x / containerRect.width) * canvas.width;
            const y = (position.y / containerRect.height) * canvas.height;
            
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#15803d'; // green-700
            ctx.stroke();

            ctx.fillStyle = '#14532d'; // green-900
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(plant.name.charAt(0).toUpperCase(), x, y);
          });

          resolve(canvas.toDataURL('image/jpeg').split(',')[1]);
        };
        bgImage.onerror = () => resolve(null);
      });
    },
  }));
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPlacedPlants([]); // Clear plants when new image is uploaded
      onImageUpload(file);
    }
  };

  const handleDownload = async () => {
    const finalImage = await (ref as React.RefObject<GardenCanvasRef>)?.current?.generateLayoutImage();
    if (finalImage) {
      const link = document.createElement('a');
      link.href = \`data:image/jpeg;base64,\${finalImage}\`;
      link.download = 'guidrys-garden-layout.jpeg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const containerRect = canvasContainerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate drop position relative to the container
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Check if we are moving an existing plant
    const movedPlantData = e.dataTransfer.getData('text/plain');
    if (movedPlantData) {
        const {instanceId, offsetX, offsetY} = JSON.parse(movedPlantData);
        setPlacedPlants(prev => prev.map(p => p.instanceId === instanceId ? {...p, position: {x: x - offsetX, y: y- offsetY}} : p));
        return;
    }

    // Check if we are adding a new plant
    const plantData = e.dataTransfer.getData('application/json');
    if (plantData) {
        const plant: Plant = JSON.parse(plantData);
        const newPlacedPlant: PlacedPlant = {
            instanceId: \`\${plant.id}-\${Date.now()}\`,
            plant,
            position: { x, y: y },
        };
        setPlacedPlants(prev => [...prev, newPlacedPlant]);
    }
  };

  const handlePlantDragStart = (e: React.DragEvent<HTMLDivElement>, plant: PlacedPlant) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData('text/plain', JSON.stringify({instanceId: plant.instanceId, offsetX, offsetY}));
    e.dataTransfer.effectAllowed = 'move';
  };

  const removePlant = (instanceId: string) => {
    setPlacedPlants(prev => prev.filter(p => p.instanceId !== instanceId));
  };


  return (
    <div 
        ref={canvasContainerRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={() => setIsDraggingOver(false)}
        className={\`relative w-full h-full bg-green-100/50 rounded-2xl shadow-inner overflow-hidden flex items-center justify-center transition-all duration-300 \${isDraggingOver ? 'ring-4 ring-green-500 ring-offset-2' : ''}\`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          <p className="text-white text-lg mt-4">AI is creating your garden...</p>
        </div>
      )}
      {image ? (
        <img src={\`data:image/jpeg;base64,\${image}\`} alt="Generated Garden" className="w-full h-full object-contain pointer-events-none" />
      ) : (
        <div className="text-center text-green-800 p-8">
          <SparklesIcon className="w-24 h-24 mx-auto text-green-300" />
          <h2 className="mt-4 text-3xl font-bold">Design Your Dream Garden</h2>
          <p className="mt-2 text-lg">Use the chat to describe your perfect garden, or upload a photo of your space to get started! You can then drag plants from the library onto your design.</p>
        </div>
      )}

      {/* Render Placed Plants */}
      {placedPlants.map((p) => (
        <div
            key={p.instanceId}
            draggable
            onDragStart={(e) => handlePlantDragStart(e, p)}
            style={{ 
                position: 'absolute', 
                left: \`\${p.position.x}px\`, 
                top: \`\${p.position.y}px\`,
                transform: 'translate(-50%, -50%)',
            }}
            className="group w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center cursor-grab ring-2 ring-green-700 hover:ring-4 transition-all"
            title={p.plant.name}
        >
            <span className="text-lg font-bold text-green-900 select-none">{p.plant.name.charAt(0).toUpperCase()}</span>
            <button 
                onClick={() => removePlant(p.instanceId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={\`Remove \${p.plant.name}\`}
            >
                <CloseIcon className="w-5 h-5"/>
            </button>
        </div>
      ))}


      <div className="absolute top-4 right-4 flex gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={handleUploadClick}
          className="bg-white/80 backdrop-blur-sm text-green-800 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-white transition-all duration-300 flex items-center gap-2"
        >
          <UploadIcon className="w-5 h-5" />
          Upload Space
        </button>
        <button
          onClick={handleDownload}
          disabled={!image}
          className="bg-white/80 backdrop-blur-sm text-green-800 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-white transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DownloadIcon className="w-5 h-5" />
          Download
        </button>
        {isAuthReady && (
          isSignedIn ? (
            <button
              onClick={onSaveToDrive}
              disabled={!image || isSavingToDrive}
              className="bg-white/80 backdrop-blur-sm text-green-800 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-white transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleDriveIcon className="w-5 h-5" />
              {isSavingToDrive ? 'Saving...' : 'Save to Drive'}
            </button>
          ) : (
            <button
              onClick={onSignIn}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
            >
              <GoogleDriveIcon className="w-5 h-5" />
              Sign in to Save
            </button>
          )
        )}
      </div>
    </div>
  );
});

export default GardenCanvas;
`;

const CHAT_PANEL_TSX_CONTENT = `import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SendIcon, MicIcon, StopIcon, SparklesIcon, DeployIcon } from './Icons';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  currentTranscription: string;
  isLoading: boolean;
  onUploadApp: () => void;
  isUploadingApp: boolean;
  isSignedIn: boolean;
  isAuthReady: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isRecording, onToggleRecording, currentTranscription, isLoading, onUploadApp, isUploadingApp, isSignedIn, isAuthReady }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, currentTranscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-2xl shadow-lg flex flex-col h-full">
      <div className="p-4 border-b border-green-200/50 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-green-600"/>
            AI Assistant
            </h2>
            <p className="text-sm text-gray-600">Your personal garden designer.</p>
        </div>
        {isAuthReady && (
            <button
                onClick={onUploadApp}
                disabled={!isSignedIn || isUploadingApp}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                title={isSignedIn ? "Upload app files to Google Drive" : "Sign in to upload app files"}
            >
                <DeployIcon className="w-5 h-5" />
                {isUploadingApp ? 'Uploading...' : 'Upload App'}
            </button>
        )}
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
            <div className={\`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl \${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}\`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {currentTranscription && (
           <div className="flex justify-end">
            <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-green-200 text-green-800 rounded-br-none italic">
              <p>{currentTranscription}...</p>
            </div>
          </div>
        )}
         {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-green-200/50">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isRecording ? "Listening..." : "Describe your garden..."}
            className="flex-1 w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            disabled={isRecording}
          />
          <button
            type="button"
            onClick={onToggleRecording}
            className={\`p-3 rounded-full text-white transition-colors \${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-green-600 hover:bg-green-700'}\`}
          >
            {isRecording ? <StopIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
          </button>
          <button
            type="submit"
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={isRecording || !inputText.trim()}
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
`;

const APP_TSX_CONTENT = `import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { LiveSession, LiveServerMessage } from "@google/genai";
import ChatPanel from './components/ChatPanel';
import GardenCanvas, { GardenCanvasRef } from './components/GardenCanvas';
import PlantLibrary from './components/PlantLibrary';
import { Plant, ChatMessage } from './types';
import * as geminiService from './services/geminiService';
import { fileToBase64, decode, decodeAudioData } from './services/utils';
import { APP_SOURCE_FILES } from './sourceData';


declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GEMINI_API_KEY = process.env.API_KEY;
const DRIVE_SCOPES = 'https://www.googleapis.com/auth/drive.file';

const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! How can I help you design your dream garden today? You can describe what you want, or upload a photo of your space." }
  ]);
  const [gardenImage, setGardenImage] = useState<string | null>(null);
  const [uploadedImageInfo, setUploadedImageInfo] = useState<{data: string, mimeType: string} | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState('');
  
  // Google Drive State
  const [gapiReady, setGapiReady] = useState(false);
  const [gisReady, setGisReady] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSavingToDrive, setIsSavingToDrive] = useState(false);
  const [isUploadingApp, setIsUploadingApp] = useState(false);


  const liveSessionRef = useRef<Promise<LiveSession> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const gardenCanvasRef = useRef<GardenCanvasRef>(null);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  // Google Drive Integration Effect
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !GEMINI_API_KEY) {
        console.warn("Google credentials (GOOGLE_CLIENT_ID or API_KEY) are not set. Google Drive features are disabled.");
        return;
    }

    const gapiScript = document.createElement('script');
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = () => {
        window.gapi.load('client', async () => {
            await window.gapi.client.init({
                apiKey: GEMINI_API_KEY,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            });
            setGapiReady(true);
        });
    };
    document.body.appendChild(gapiScript);

    const gisScript = document.createElement('script');
    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => {
        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: DRIVE_SCOPES,
            callback: (tokenResponse: any) => {
                if (tokenResponse && tokenResponse.access_token) {
                    window.gapi.client.setToken(tokenResponse);
                    setIsSignedIn(true);
                } else {
                    console.error("Error getting access token", tokenResponse);
                    setIsSignedIn(false);
                }
            },
        });
        setTokenClient(client);
        setGisReady(true);
    };
    document.body.appendChild(gisScript);

    return () => {
        const gapi = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
        const gis = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (gapi) document.body.removeChild(gapi);
        if (gis) document.body.removeChild(gis);
    };
  }, []);

  const handleSignIn = () => {
    if (tokenClient) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    }
  };

  const handleSaveToDrive = async () => {
    if (!isSignedIn || !gardenCanvasRef.current) return;
    setIsSavingToDrive(true);
    addMessage({ role: 'model', text: 'Saving your garden layout to Google Drive...' });

    try {
        const finalImage = await gardenCanvasRef.current.generateLayoutImage();

        if (!finalImage) {
            addMessage({ role: 'model', text: 'Could not generate the layout image. Please add a background image to the canvas first.' });
            setIsSavingToDrive(false);
            return;
        }
        
        const boundary = '-------314159265358979323846';
        const delimiter = \`\\r\\n--\${boundary}\\r\\n\`;
        const close_delim = \`\\r\\n--\${boundary}--\`;

        const metadata = {
            'name': 'guidrys-garden-layout.jpeg',
            'mimeType': 'image/jpeg'
        };

        const multipartRequestBody =
            delimiter +
            'Content-Type: application/json\\r\\n\\r\\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: image/jpeg\\r\\n' +
            'Content-Transfer-Encoding: base64\\r\\n' +
            '\\r\\n' +
            finalImage +
            close_delim;

        const request = window.gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': { 'uploadType': 'multipart' },
            'headers': {
                'Content-Type': \`multipart/related; boundary="\${boundary}"\`
            },
            'body': multipartRequestBody
        });
        
        await request;
        addMessage({ role: 'model', text: 'Successfully saved to your Google Drive!' });

    } catch (error) {
        console.error("Error saving to drive:", error);
        addMessage({ role: 'model', text: 'Sorry, there was an error saving to Google Drive.' });
    } finally {
        setIsSavingToDrive(false);
    }
  };

  const handleUploadApp = async () => {
    if (!isSignedIn) return;
    setIsUploadingApp(true);
    addMessage({ role: 'model', text: 'Preparing to upload app source code to Google Drive...' });

    try {
        const folderName = \`Guidrys Garden Ai Source - \${new Date().toISOString()}\`;
        const folderMetadata = {
            'name': folderName,
            'mimeType': 'application/vnd.google-apps.folder'
        };
        const folderResponse = await window.gapi.client.drive.files.create({
            resource: folderMetadata,
            fields: 'id'
        });
        const folderId = folderResponse.result.id;

        addMessage({ role: 'model', text: \`Created folder "\${folderName}". Now uploading files...\` });

        for (const file of APP_SOURCE_FILES) {
            const fileMetadata = {
                'name': file.name,
                'mimeType': file.mimeType,
                'parents': [folderId]
            };
            
            const boundary = '-------314159265358979323846';
            const delimiter = \`\\r\\n--\${boundary}\\r\\n\`;
            const close_delim = \`\\r\\n--\${boundary}--\`;

            const multipartRequestBody =
                delimiter +
                'Content-Type: application/json; charset=UTF-8\\r\\n\\r\\n' +
                JSON.stringify(fileMetadata) +
                delimiter +
                \`Content-Type: \${file.mimeType}; charset=UTF-8\\r\\n\` +
                '\\r\\n' +
                file.content +
                close_delim;
            
            await window.gapi.client.request({
                'path': '/upload/drive/v3/files',
                'method': 'POST',
                'params': { 'uploadType': 'multipart' },
                'headers': {
                    'Content-Type': \`multipart/related; boundary="\${boundary}"\`
                },
                'body': multipartRequestBody
            });
        }

        addMessage({ role: 'model', text: 'All files have been successfully uploaded to your Google Drive!' });

    } catch (error) {
        console.error("Error uploading app to drive:", error);
        addMessage({ role: 'model', text: 'Sorry, there was an error uploading the app files.' });
    } finally {
        setIsUploadingApp(false);
    }
  };

  const processUserMessage = useCallback(async (text: string) => {
    addMessage({ role: 'user', text });
    setIsLoading(true);

    try {
        if (text.toLowerCase().includes('visualize') || text.toLowerCase().includes('generate') || text.toLowerCase().includes('show me') || text.toLowerCase().includes('add') || text.toLowerCase().includes('put')) {
            const newImage = await geminiService.visualizeGarden(text, uploadedImageInfo);
            setGardenImage(newImage);
            addMessage({ role: 'model', text: "Here is your visualized garden! What do you think?", image: newImage });
        } else if (text.toLowerCase().includes('plant') || text.toLowerCase().includes('flower') || text.toLowerCase().includes('tree') || text.toLowerCase().includes('shrub')) {
            handlePlantSearch(text);
            addMessage({ role: 'model', text: "I've found some plants that might fit your needs. You can see them in the Plant Library." });
        } else {
            const responseText = await geminiService.getSimpleChatResponse(text);
            addMessage({ role: 'model', text: responseText });
        }
    } catch (error) {
        console.error("Error processing message:", error);
        addMessage({ role: 'model', text: "I'm sorry, I had trouble with that request. Please try again." });
    } finally {
        setIsLoading(false);
    }
  }, [uploadedImageInfo]);

  const handleSendMessage = (text: string) => {
    processUserMessage(text);
  };

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const base64 = await fileToBase64(file);
      setGardenImage(base64);
      setUploadedImageInfo({ data: base64, mimeType: file.type });
      addMessage({ role: 'model', text: "Great! I've loaded your photo. Now you can drag plants from the library to design your garden." });
    } catch (error) {
      console.error("Error uploading image:", error);
      addMessage({ role: 'model', text: "Sorry, I couldn't upload that image. Please try another one." });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlantSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const suggestedPlants = await geminiService.getPlantSuggestions(query);
      setPlants(suggestedPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (plantId: string) => {
    setFavorites(prev =>
      prev.includes(plantId)
        ? prev.filter(id => id !== plantId)
        : [...prev, plantId]
    );
  };

  const stopRecording = useCallback(() => {
    if (liveSessionRef.current) {
        liveSessionRef.current.then(session => session.close());
        liveSessionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if(audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
    }
    setIsRecording(false);
  }, []);

  const handleVoiceMessage = useCallback(async (message: LiveServerMessage) => {
    if (message.serverContent?.outputTranscription) {
      // For simplicity, we are not displaying live output transcription.
      // This is where you would handle it.
    }
    if (message.serverContent?.inputTranscription) {
      setCurrentTranscription(prev => prev + message.serverContent.inputTranscription.text);
    }

    if (message.serverContent?.turnComplete) {
      const finalTranscription = currentTranscription + (message.serverContent?.inputTranscription?.text || '');
      setCurrentTranscription('');
      if(finalTranscription.trim()){
         processUserMessage(finalTranscription.trim());
      }
    }

    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
    if (base64Audio) {
        const audioCtx = outputAudioContextRef.current;
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);

        const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        
        source.addEventListener('ended', () => {
            sourcesRef.current.delete(source);
        });

        source.start(nextStartTimeRef.current);
        nextStartTimeRef.current += audioBuffer.duration;
        sourcesRef.current.add(source);
    }
     if (message.serverContent?.interrupted) {
        for (const source of sourcesRef.current.values()) {
          source.stop();
          sourcesRef.current.delete(source);
        }
        nextStartTimeRef.current = 0;
      }

  }, [currentTranscription, processUserMessage]);

  const startRecording = useCallback(async () => {
    try {
      if (isRecording) return;
      setIsRecording(true);
      setCurrentTranscription('');

      // FIX: Cast window to \`any\` to access \`webkitAudioContext\` for Safari compatibility.
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      nextStartTimeRef.current = 0;
      sourcesRef.current.clear();

      liveSessionRef.current = geminiService.startVoiceConversation({
        onOpen: async () => {
          mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
          // FIX: Cast window to \`any\` to access \`webkitAudioContext\` for Safari compatibility.
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
          const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
          scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

          scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
            const pcmBlob = geminiService.createAudioBlob(inputData);
            if(liveSessionRef.current){
                liveSessionRef.current.then((session) => {
                    session.sendRealtimeInput({ media: pcmBlob });
                });
            }
          };
          source.connect(scriptProcessorRef.current);
          scriptProcessorRef.current.connect(audioContextRef.current.destination);
        },
        onMessage: handleVoiceMessage,
        onError: (e) => {
          console.error("Voice session error:", e);
          addMessage({role: 'model', text: "There was a voice connection error."});
          stopRecording();
        },
        onClose: () => {
          console.log("Voice session closed.");
        }
      });

    } catch (err) {
      console.error('Error starting recording:', err);
      addMessage({role: 'model', text: "Could not start microphone. Please check permissions."});
      setIsRecording(false);
    }
  }, [isRecording, handleVoiceMessage, stopRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="h-screen w-screen p-2 md:p-4 bg-gradient-to-br from-green-100 to-blue-100 font-sans">
      <main className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 h-full min-h-[300px] lg:min-h-0">
          <ChatPanel 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
            currentTranscription={currentTranscription}
            isLoading={isLoading || isSavingToDrive || isUploadingApp}
            isSignedIn={isSignedIn}
            isAuthReady={gapiReady && gisReady}
            onUploadApp={handleUploadApp}
            isUploadingApp={isUploadingApp}
          />
        </div>
        <div className="lg:col-span-6 h-full min-h-[400px] lg:min-h-0">
          <GardenCanvas 
            ref={gardenCanvasRef}
            image={gardenImage} 
            isLoading={isLoading} 
            onImageUpload={handleImageUpload}
            isSignedIn={isSignedIn}
            onSignIn={handleSignIn}
            onSaveToDrive={handleSaveToDrive}
            isSavingToDrive={isSavingToDrive}
            isAuthReady={gapiReady && gisReady}
          />
        </div>
        <div className="lg:col-span-3 h-full min-h-[300px] lg:min-h-0">
          <PlantLibrary
            plants={plants}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSearch={handlePlantSearch}
            isLoading={isLoading && !gardenImage} // Show loader only on plant search
          />
        </div>
      </main>
    </div>
  );
};

export default App;
`;

export const APP_SOURCE_FILES = [
    { name: 'index.html', content: INDEX_HTML_CONTENT, mimeType: 'text/html' },
    { name: 'index.tsx', content: INDEX_TSX_CONTENT, mimeType: 'text/plain' },
    { name: 'metadata.json', content: METADATA_JSON_CONTENT, mimeType: 'application/json' },
    { name: 'types.ts', content: TYPES_TS_CONTENT, mimeType: 'text/plain' },
    { name: 'sourceData.ts', content: `export const APP_SOURCE_FILES = []; // This file's content is generated dynamically`, mimeType: 'text/plain'},
    { name: 'services/utils.ts', content: UTILS_TS_CONTENT, mimeType: 'text/plain' },
    { name: 'services/geminiService.ts', content: GEMINI_SERVICE_TS_CONTENT, mimeType: 'text/plain' },
    { name: 'components/Icons.tsx', content: ICONS_TSX_CONTENT, mimeType: 'text/plain' },
    { name: 'components/PlantCard.tsx', content: PLANT_CARD_TSX_CONTENT, mimeType: 'text/plain' },
    { name: 'components/PlantLibrary.tsx', content: PLANT_LIBRARY_TSX_CONTENT, mimeType: 'text/plain' },
    { name: 'components/GardenCanvas.tsx', content: GARDEN_CANVAS_TSX_CONTENT, mimeType: 'text/plain' },
    { name: 'components/ChatPanel.tsx', content: CHAT_PANEL_TSX_CONTENT, mimeType: 'text/plain' },
    { name: 'App.tsx', content: APP_TSX_CONTENT, mimeType: 'text/plain' },
];

// To avoid a circular dependency and keep the bundle reasonable, we'll replace the content of sourceData.ts
// with the stringified version of the array itself.
const sourceDataFile = APP_SOURCE_FILES.find(f => f.name === 'sourceData.ts');
if(sourceDataFile) {
    sourceDataFile.content = `export const APP_SOURCE_FILES = ${JSON.stringify(APP_SOURCE_FILES, null, 2)};`
}
