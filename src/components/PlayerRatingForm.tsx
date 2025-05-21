
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRatingColorClass, starToScore, PlayerPosition } from "@/utils/calculations";
import { useAuth } from "@/contexts/AuthContext";

// Player type definition to share across components
export type Player = {
  id: string;
  name: string;
  position: PlayerPosition;
  email?: string;
  bio?: string;
  profilePicture?: string | null;
};

// Global state to share players across components
let globalPlayers: Player[] = [
  { id: "1", name: "John Smith", position: "ST" as PlayerPosition },
  { id: "2", name: "David Miller", position: "CM" as PlayerPosition },
  { id: "3", name: "Carlos Perez", position: "CB" as PlayerPosition },
  { id: "4", name: "Alex Chen", position: "GK" as PlayerPosition },
  { id: "5", name: "Marcus Johnson", position: "LM" as PlayerPosition },
];

// Event to notify components when players are updated
const playersUpdatedEvent = new CustomEvent("playersUpdated");

// Helper function to update global players
export const updateGlobalPlayers = (players: Player[]) => {
  globalPlayers = [...players];
  window.dispatchEvent(playersUpdatedEvent);
};

// Helper function to get global players
export const getGlobalPlayers = (): Player[] => {
  return [...globalPlayers];
};

type RatingAttribute = {
  name: string;
  key: string;
  description: string;
  isWeakFoot?: boolean;
};

const ratingAttributes: RatingAttribute[] = [
  { name: "Pace", key: "pace", description: "Speed and acceleration" },
  { name: "Stamina", key: "stamina", description: "Energy and endurance" },
  { name: "Shooting", key: "shooting", description: "Shot power and accuracy" },
  { name: "Passing", key: "passing", description: "Pass accuracy and technique" },
  { name: "Dribbling", key: "dribbling", description: "Ball control and agility" },
  { name: "Defense", key: "defense", description: "Tackling and interceptions" },
  { name: "Vision", key: "vision", description: "Awareness and creativity" },
  { name: "Physical", key: "physical", description: "Strength and balance" },
  { name: "Positioning", key: "positioning", description: "Tactical positioning" },
  { name: "Weak Foot", key: "weakFoot", description: "Non-dominant foot skill", isWeakFoot: true },
];

const PlayerRatingForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>(getGlobalPlayers());
  const [ratings, setRatings] = useState(() => {
    const initialRatings: Record<string, number> = {};
    ratingAttributes.forEach(attr => {
      initialRatings[attr.key] = attr.isWeakFoot ? 3 : 80;
    });
    return initialRatings;
  });
  const [submitted, setSubmitted] = useState(false);

  // Listen for player updates
  useEffect(() => {
    const handlePlayersUpdated = () => {
      setPlayers(getGlobalPlayers());
    };

    window.addEventListener("playersUpdated", handlePlayersUpdated);
    
    return () => {
      window.removeEventListener("playersUpdated", handlePlayersUpdated);
    };
  }, []);

  const handleRatingChange = (attribute: string, value: number[]) => {
    setRatings(prev => ({
      ...prev,
      [attribute]: value[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlayer) {
      toast.error("Please select a player to rate");
      return;
    }
    
    // In a real app, this would send data to an API/database
    console.log({
      ratedBy: currentUser?.email,
      playerId: selectedPlayer,
      ratings,
      timestamp: new Date().toISOString()
    });
    
    toast.success("Ratings submitted successfully!");
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      const initialRatings: Record<string, number> = {};
      ratingAttributes.forEach(attr => {
        initialRatings[attr.key] = attr.isWeakFoot ? 3 : 80;
      });
      setRatings(initialRatings);
      setSelectedPlayer("");
      setSubmitted(false);
    }, 2000);
  };

  const playerOptions = players.filter(player => 
    // Filter out the current user - you can't rate yourself
    !currentUser || player.name !== currentUser.email
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Rate a Player</CardTitle>
        <CardDescription>
          Select a player and rate their abilities on a scale of 60-99
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="player-select">Select Player</Label>
            <Select 
              value={selectedPlayer} 
              onValueChange={setSelectedPlayer}
              disabled={submitted}
            >
              <SelectTrigger id="player-select" className="bg-secondary">
                <SelectValue placeholder="Select a player" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {playerOptions.map(player => (
                  <SelectItem key={player.id} value={player.id}>
                    {player.name} ({player.position})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPlayer && (
            <div className="space-y-5">
              {ratingAttributes.map((attribute) => (
                <div key={attribute.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`rating-${attribute.key}`} className="text-sm">
                      {attribute.name}
                    </Label>
                    <div 
                      className={`${
                        attribute.isWeakFoot 
                          ? "bg-secondary text-foreground" 
                          : getRatingColorClass(ratings[attribute.key])
                      } rating-value`}
                    >
                      {attribute.isWeakFoot 
                        ? `${ratings[attribute.key]}★` 
                        : ratings[attribute.key]
                      }
                    </div>
                  </div>
                  
                  <Slider
                    id={`rating-${attribute.key}`}
                    min={attribute.isWeakFoot ? 1 : 60}
                    max={attribute.isWeakFoot ? 5 : 99}
                    step={attribute.isWeakFoot ? 1 : 1}
                    value={[ratings[attribute.key]]}
                    onValueChange={(value) => handleRatingChange(attribute.key, value)}
                    disabled={submitted}
                  />
                  
                  <p className="text-xs text-muted-foreground">
                    {attribute.description}
                  </p>
                </div>
              ))}
              
              <Button 
                type="submit" 
                disabled={submitted}
                className="w-full mt-4"
              >
                {submitted ? "Submitted ✓" : "Submit Rating"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PlayerRatingForm;
