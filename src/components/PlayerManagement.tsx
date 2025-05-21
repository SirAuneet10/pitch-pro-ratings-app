import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlayerPosition } from "@/utils/calculations";
import { toast } from "sonner";
import { Player, getGlobalPlayers, updateGlobalPlayers } from "./PlayerRatingForm";

// All available positions
const positions: PlayerPosition[] = [
  'GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'ST'
];

const PlayerManagement: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(getGlobalPlayers());
  const [searchQuery, setSearchQuery] = useState("");
  
  // Player form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
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
          
          {/* Add Player Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Player</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddPlayer}>
                <DialogHeader>
                  <DialogTitle>Add New Player</DialogTitle>
                  <DialogDescription>
                    Create a new player profile in the system
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="position">Default Position</Label>
                    <Select 
                      value={formData.position} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, position: value as PlayerPosition }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Player bio information..."
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Player</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          {/* Edit Player Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleUpdatePlayer}>
                <DialogHeader>
                  <DialogTitle>Edit Player</DialogTitle>
                  <DialogDescription>
                    Update player information
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-position">Default Position</Label>
                    <Select 
                      value={formData.position} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, position: value as PlayerPosition }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-bio">Bio</Label>
                    <Textarea
                      id="edit-bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Player bio information..."
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Player</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search players by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No players found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={player.profilePicture || undefined} alt={player.name} />
                        <AvatarFallback>
                          {player.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{player.name}</span>
                    </TableCell>
                    <TableCell>{player.email}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPlayer(player)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeletePlayer(player.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerManagement;
