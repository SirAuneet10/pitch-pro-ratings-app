
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy } from "lucide-react";
import { 
  Player, 
  getRatingColorClass, 
  getPositionColorClass, 
  PositionGroup, 
  positionGroups,
  PlayerPosition
} from "@/utils/calculations";

// Mock data - in a real app, this would come from API/database
const mockLeaderboardData: Player[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    position: "ST",
    ratings: {},
    overallRating: 88
  },
  {
    id: "2",
    name: "David Miller",
    email: "david@example.com",
    position: "CM",
    ratings: {},
    overallRating: 84
  },
  {
    id: "3",
    name: "Carlos Perez",
    email: "carlos@example.com",
    position: "CB",
    ratings: {},
    overallRating: 82
  },
  {
    id: "4",
    name: "Alex Chen",
    email: "alex@example.com",
    position: "GK",
    ratings: {},
    overallRating: 79
  },
  {
    id: "5",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    position: "LM",
    ratings: {},
    overallRating: 75
  },
  {
    id: "6",
    name: "Luis Rodriguez",
    email: "luis@example.com",
    position: "RB",
    ratings: {},
    overallRating: 67
  }
];

const Leaderboard: React.FC = () => {
  const [positionFilter, setPositionFilter] = useState<PositionGroup>("OVERALL");
  
  const filteredPlayers = positionFilter === "OVERALL"
    ? mockLeaderboardData
    : mockLeaderboardData.filter(player => 
        positionGroups[positionFilter].includes(player.position as PlayerPosition)
      );
  
  // Sort by rating (highest to lowest)
  const sortedPlayers = [...filteredPlayers].sort((a, b) => b.overallRating - a.overallRating);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Leaderboard</CardTitle>
          </div>
          <Select value={positionFilter} onValueChange={(value) => setPositionFilter(value as PositionGroup)}>
            <SelectTrigger className="w-[180px] bg-secondary">
              <SelectValue placeholder="Filter by position" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {Object.keys(positionGroups).map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Players ranked by their overall rating
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Player</div>
            <div className="col-span-3">Position</div>
            <div className="col-span-2 text-right">Rating</div>
          </div>
          
          {/* Players List */}
          {sortedPlayers.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No players found for this position
            </div>
          ) : (
            sortedPlayers.map((player, index) => (
              <div 
                key={player.id}
                className="grid grid-cols-12 px-4 py-3 rounded-md hover:bg-secondary/40 transition-colors"
              >
                <div className="col-span-1 font-bold">{index + 1}</div>
                <div className="col-span-6 font-medium">{player.name}</div>
                <div className="col-span-3">
                  <span className={`${getPositionColorClass(player.position as PlayerPosition)} position-badge`}>
                    {player.position}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`${getRatingColorClass(player.overallRating)} rating-value`}>
                    {player.overallRating}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
