
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlayerPosition } from "@/utils/calculations";
import { Player, getGlobalPlayers, updateGlobalPlayers } from "./PlayerRatingForm";
import PlayerList from "./player/PlayerList";
import PlayerForm from "./player/PlayerForm";
import SearchBar from "./player/SearchBar";

const PlayerManagement: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(getGlobalPlayers());
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "CM" as PlayerPosition,
    bio: "",
  });
  
  // Initialize players from global state
  useEffect(() => {
    setPlayers(getGlobalPlayers());
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Open edit dialog with player data
  const handleEditPlayer = (player: Player) => {
    setCurrentPlayer(player);
    setFormData({
      name: player.name,
      email: player.email || "",
      position: player.position,
      bio: player.bio || "",
    });
    setIsEditDialogOpen(true);
  };
  
  // Submit add player form
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPlayer = {
      id: `player-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      position: formData.position,
      bio: formData.bio,
      profilePicture: null
    };
    
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    updateGlobalPlayers(updatedPlayers);
    
    toast.success(`${formData.name} added successfully!`);
    setIsAddDialogOpen(false);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      position: "CM",
      bio: "",
    });
  };
  
  // Submit edit player form
  const handleUpdatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPlayer) return;
    
    const updatedPlayers = players.map(player => 
      player.id === currentPlayer.id 
        ? { 
            ...player, 
            name: formData.name,
            email: formData.email,
            position: formData.position,
            bio: formData.bio
          } 
        : player
    );
    
    setPlayers(updatedPlayers);
    updateGlobalPlayers(updatedPlayers);
    
    toast.success(`${formData.name} updated successfully!`);
    setIsEditDialogOpen(false);
  };
  
  // Delete player
  const handleDeletePlayer = (playerId: string) => {
    if (confirm("Are you sure you want to delete this player?")) {
      const updatedPlayers = players.filter(player => player.id !== playerId);
      setPlayers(updatedPlayers);
      updateGlobalPlayers(updatedPlayers);
      
      toast.success("Player removed successfully!");
    }
  };
  
  // Filter players based on search query
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (player.email && player.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Player Management</CardTitle>
            <CardDescription>
              Add, edit, or remove players from the system
            </CardDescription>
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>Add Player</Button>
        </div>
      </CardHeader>
      <CardContent>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <PlayerList 
          players={filteredPlayers} 
          onEdit={handleEditPlayer} 
          onDelete={handleDeletePlayer} 
        />
        
        {/* Add Player Form Dialog */}
        <PlayerForm
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddPlayer}
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          title="Add New Player"
          description="Create a new player profile in the system"
          submitLabel="Add Player"
        />
        
        {/* Edit Player Form Dialog */}
        <PlayerForm
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdatePlayer}
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          title="Edit Player"
          description="Update player information"
          submitLabel="Update Player"
        />
      </CardContent>
    </Card>
  );
};

export default PlayerManagement;
