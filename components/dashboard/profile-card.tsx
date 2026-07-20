import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function ProfileCard({ user }: { user: any }) {
  const formattedNumber = String(user.supporterNumber).padStart(6, '0');
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-sm">
              #{formattedNumber}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Joined {joinedDate}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Shares</span>
            <span className="font-medium text-lg">{user.shareCount}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Country</span>
            <span className="font-medium text-lg">{user.country || "Earth"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
