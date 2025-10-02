import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ApiToken } from "@shared/schema";

interface ApiTokenCardProps {
  token: ApiToken;
  onDelete?: (id: string) => void;
}

export function ApiTokenCard({ token, onDelete }: ApiTokenCardProps) {
  const [showToken, setShowToken] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token.token);
    toast({
      title: "Token copied",
      description: "API token has been copied to clipboard",
    });
  };

  const maskedToken = token.token.slice(0, 12) + "..." + token.token.slice(-8);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg" data-testid="text-token-name">{token.name}</CardTitle>
            <CardDescription data-testid="text-token-date">
              Created {new Date(token.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant="secondary" data-testid="badge-token-status">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 text-sm font-mono bg-muted rounded-md border overflow-hidden text-ellipsis" data-testid="text-token-value">
              {showToken ? token.token : maskedToken}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowToken(!showToken)}
              data-testid="button-toggle-token"
            >
              {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              data-testid="button-copy-token"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Token
            </Button>
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(token.id)}
                data-testid="button-delete-token"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
