
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Mock data - in a real app, this would come from API/database
const mockRatingHistory = [
  { 
    id: "1", 
    raterEmail: "david@example.com", 
    playerRated: "John Smith", 
    position: "ST", 
    overallRating: 88, 
    timestamp: "2023-05-15T14:30:00Z" 
  },
  { 
    id: "2", 
    raterEmail: "john@example.com", 
    playerRated: "David Miller", 
    position: "CM", 
    overallRating: 84, 
    timestamp: "2023-05-14T11:20:00Z" 
  },
  { 
    id: "3", 
    raterEmail: "alex@example.com", 
    playerRated: "Carlos Perez", 
    position: "CB", 
    overallRating: 82, 
    timestamp: "2023-05-14T10:15:00Z" 
  },
  { 
    id: "4", 
    raterEmail: "carlos@example.com", 
    playerRated: "Alex Chen", 
    position: "GK", 
    overallRating: 79, 
    timestamp: "2023-05-13T16:45:00Z" 
  },
  { 
    id: "5", 
    raterEmail: "marcus@example.com", 
    playerRated: "John Smith", 
    position: "ST", 
    overallRating: 90, 
    timestamp: "2023-05-12T09:30:00Z" 
  },
  { 
    id: "6", 
    raterEmail: "luis@example.com", 
    playerRated: "David Miller", 
    position: "CM", 
    overallRating: 85, 
    timestamp: "2023-05-11T14:10:00Z" 
  },
];

const AdminPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Filter and search the rating history
  const filteredHistory = mockRatingHistory.filter((rating) => {
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !rating.raterEmail.toLowerCase().includes(query) &&
        !rating.playerRated.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    
    // Apply filter
    if (filter === "high") {
      return rating.overallRating >= 85;
    }
    if (filter === "low") {
      return rating.overallRating < 75;
    }
    
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Rating History</CardTitle>
        <CardDescription>
          View all player ratings submitted by users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search by player or rater..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary"
            />
          </div>
          <div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-secondary">
                <SelectValue placeholder="Filter ratings" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="high">High Ratings (85+)</SelectItem>
                <SelectItem value="low">Low Ratings (Below 75)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rater</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No rating history found
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((rating) => (
                  <TableRow key={rating.id}>
                    <TableCell className="font-medium">{rating.raterEmail}</TableCell>
                    <TableCell>{rating.playerRated}</TableCell>
                    <TableCell>{rating.position}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-block px-2 py-1 rounded ${
                        rating.overallRating >= 85
                          ? "bg-green-100 text-green-800"
                          : rating.overallRating < 75
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}>
                        {rating.overallRating}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {formatDate(rating.timestamp)}
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

export default AdminPanel;
