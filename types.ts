
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
