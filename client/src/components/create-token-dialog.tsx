import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface CreateTokenDialogProps {
  onCreateToken: (name: string) => void;
}

export function CreateTokenDialog({ onCreateToken }: CreateTokenDialogProps) {
  const [open, setOpen] = useState(false);
  const [tokenName, setTokenName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenName.trim()) {
      onCreateToken(tokenName);
      setTokenName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-token">
          <Plus className="h-4 w-4 mr-2" />
          Create API Token
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New API Token</DialogTitle>
          <DialogDescription>
            Generate a new API token to authenticate your requests
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token-name">Token Name</Label>
            <Input
              id="token-name"
              placeholder="Production API Key"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              data-testid="input-token-name"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit">
              Create Token
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
