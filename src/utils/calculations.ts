
export type PlayerPosition = 'GK' | 'CB' | 'LB' | 'RB' | 'LWB' | 'RWB' | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'ST';

export type PositionGroup = 'OVERALL' | 'DEFENDERS' | 'MIDFIELDERS' | 'STRIKERS' | 'GOALKEEPERS';

export const positionGroups: Record<PositionGroup, PlayerPosition[]> = {
  'OVERALL': ['GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'ST'],
  'DEFENDERS': ['CB', 'LB', 'RB', 'LWB', 'RWB'],
  'MIDFIELDERS': ['CDM', 'CM', 'CAM', 'LM', 'RM'],
  'STRIKERS': ['ST'],
  'GOALKEEPERS': ['GK']
};

export const positionWeights: Record<PlayerPosition, Record<string, number>> = {
  'GK': {
    pace: 0.2,
    stamina: 0.3,
    shooting: 0.05,
    passing: 0.4,
    dribbling: 0.2,
    defense: 0.7,
    vision: 0.5,
    physical: 0.6,
    positioning: 0.9,
    weakFoot: 0.1
  },
  'CB': {
    pace: 0.6,
    stamina: 0.7,
    shooting: 0.2,
    passing: 0.5,
    dribbling: 0.3,
    defense: 0.9,
    vision: 0.4,
    physical: 0.8,
    positioning: 0.8,
    weakFoot: 0.4
  },
  'LB': {
    pace: 0.8,
    stamina: 0.7,
    shooting: 0.3,
    passing: 0.6,
    dribbling: 0.6,
    defense: 0.8,
    vision: 0.5,
    physical: 0.7,
    positioning: 0.7,
    weakFoot: 0.5
  },
  'RB': {
    pace: 0.8,
    stamina: 0.7,
    shooting: 0.3,
    passing: 0.6,
    dribbling: 0.6,
    defense: 0.8,
    vision: 0.5,
    physical: 0.7,
    positioning: 0.7,
    weakFoot: 0.5
  },
  'LWB': {
    pace: 0.8,
    stamina: 0.8,
    shooting: 0.4,
    passing: 0.7,
    dribbling: 0.7,
    defense: 0.7,
    vision: 0.6,
    physical: 0.7,
    positioning: 0.7,
    weakFoot: 0.6
  },
  'RWB': {
    pace: 0.8,
    stamina: 0.8,
    shooting: 0.4,
    passing: 0.7,
    dribbling: 0.7,
    defense: 0.7,
    vision: 0.6,
    physical: 0.7,
    positioning: 0.7,
    weakFoot: 0.6
  },
  'CDM': {
    pace: 0.6,
    stamina: 0.8,
    shooting: 0.4,
    passing: 0.7,
    dribbling: 0.6,
    defense: 0.8,
    vision: 0.7,
    physical: 0.7,
    positioning: 0.8,
    weakFoot: 0.6
  },
  'CM': {
    pace: 0.6,
    stamina: 0.8,
    shooting: 0.6,
    passing: 0.9,
    dribbling: 0.7,
    defense: 0.6,
    vision: 0.9,
    physical: 0.6,
    positioning: 0.7,
    weakFoot: 0.7
  },
  'CAM': {
    pace: 0.7,
    stamina: 0.7,
    shooting: 0.7,
    passing: 0.9,
    dribbling: 0.8,
    defense: 0.4,
    vision: 0.9,
    physical: 0.5,
    positioning: 0.7,
    weakFoot: 0.8
  },
  'LM': {
    pace: 0.8,
    stamina: 0.7,
    shooting: 0.7,
    passing: 0.8,
    dribbling: 0.8,
    defense: 0.3,
    vision: 0.8,
    physical: 0.5,
    positioning: 0.7,
    weakFoot: 0.7
  },
  'RM': {
    pace: 0.8,
    stamina: 0.7,
    shooting: 0.7,
    passing: 0.8,
    dribbling: 0.8,
    defense: 0.3,
    vision: 0.8,
    physical: 0.5,
    positioning: 0.7,
    weakFoot: 0.7
  },
  'ST': {
    pace: 0.9,
    stamina: 0.7,
    shooting: 0.9,
    passing: 0.5,
    dribbling: 0.8,
    defense: 0.2,
    vision: 0.6,
    physical: 0.7,
    positioning: 0.9,
    weakFoot: 0.9
  }
};

export type PlayerRating = {
  pace: number;
  stamina: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  vision: number;
  physical: number;
  positioning: number;
  weakFoot: number; // 1-5 stars stored as 1-5
};

export type Player = {
  id: string;
  name: string;
  email: string;
  position: PlayerPosition;
  ratings: Record<string, PlayerRating>; // Keyed by rater's email
  overallRating: number;
};

// Convert 1-5 stars to 60-99 score
export const starToScore = (stars: number): number => {
  if (stars <= 1) return 60;
  if (stars === 2) return 70;
  if (stars === 3) return 80;
  if (stars === 4) return 90;
  return 99;
};

// Calculate overall rating for a player based on their position and ratings
export const calculateOverallRating = (ratings: PlayerRating, position: PlayerPosition): number => {
  const weights = positionWeights[position];
  
  let totalWeight = 0;
  let weightedSum = 0;
  
  for (const [attribute, weight] of Object.entries(weights)) {
    const score = attribute === 'weakFoot' 
      ? starToScore(ratings[attribute as keyof PlayerRating] as number) 
      : ratings[attribute as keyof PlayerRating] as number;
    
    weightedSum += score * weight;
    totalWeight += weight;
  }
  
  // Return rounded rating
  return Math.round(weightedSum / totalWeight);
};

// Get the rating color class
export const getRatingColorClass = (rating: number): string => {
  if (rating < 70) return "rating-red";
  if (rating < 80) return "rating-yellow";
  return "rating-green";
};

// Get the position group color class
export const getPositionColorClass = (position: PlayerPosition): string => {
  if (position === 'GK') return "position-gk";
  if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(position)) return "position-def";
  if (['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(position)) return "position-mid";
  return "position-fwd";
};
