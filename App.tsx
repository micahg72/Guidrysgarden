
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
        const delimiter = `\r\n--${boundary}\r\n`;
        const close_delim = `\r\n--${boundary}--`;

        const metadata = {
            'name': 'guidrys-garden-layout.jpeg',
            'mimeType': 'image/jpeg'
        };

        const multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: image/jpeg\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            finalImage +
            close_delim;

        const request = window.gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': { 'uploadType': 'multipart' },
            'headers': {
                'Content-Type': `multipart/related; boundary="${boundary}"`
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
        const folderName = `Guidrys Garden Ai Source - ${new Date().toISOString()}`;
        const folderMetadata = {
            'name': folderName,
            'mimeType': 'application/vnd.google-apps.folder'
        };
        const folderResponse = await window.gapi.client.drive.files.create({
            resource: folderMetadata,
            fields: 'id'
        });
        const folderId = folderResponse.result.id;

        addMessage({ role: 'model', text: `Created folder "${folderName}". Now uploading files...` });

        for (const file of APP_SOURCE_FILES) {
            const fileMetadata = {
                'name': file.name,
                'mimeType': file.mimeType,
                'parents': [folderId]
            };
            
            const boundary = '-------314159265358979323846';
            const delimiter = `\r\n--${boundary}\r\n`;
            const close_delim = `\r\n--${boundary}--`;

            const multipartRequestBody =
                delimiter +
                'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
                JSON.stringify(fileMetadata) +
                delimiter +
                `Content-Type: ${file.mimeType}; charset=UTF-8\r\n` +
                '\r\n' +
                file.content +
                close_delim;
            
            await window.gapi.client.request({
                'path': '/upload/drive/v3/files',
                'method': 'POST',
                'params': { 'uploadType': 'multipart' },
                'headers': {
                    'Content-Type': `multipart/related; boundary="${boundary}"`
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

      // FIX: Cast window to `any` to access `webkitAudioContext` for Safari compatibility.
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      nextStartTimeRef.current = 0;
      sourcesRef.current.clear();

      liveSessionRef.current = geminiService.startVoiceConversation({
        onOpen: async () => {
          mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
          // FIX: Cast window to `any` to access `webkitAudioContext` for Safari compatibility.
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
