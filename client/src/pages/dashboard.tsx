import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ApiTokenCard } from "@/components/api-token-card";
import { CreateTokenDialog } from "@/components/create-token-dialog";
import { ApiPlayground } from "@/components/api-playground";
import { DocumentationSection } from "@/components/documentation-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ApiToken } from "@shared/schema";
import { Key, Code, BookOpen } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();

  /* API Tokens functionality - commented out but kept for future use
  const { data: tokens = [], isLoading } = useQuery<ApiToken[]>({
    queryKey: ['/api/tokens'],
  });

  const createTokenMutation = useMutation({
    mutationFn: async (name: string) => {
      return apiRequest('POST', '/api/tokens', { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tokens'] });
      toast({
        title: "Token created",
        description: "Your new API token has been generated successfully",
      });
    },
  });

  const deleteTokenMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/tokens/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tokens'] });
      toast({
        title: "Token deleted",
        description: "API token has been removed",
      });
    },
  });
  */

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <Code className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold" data-testid="text-app-title">REST API Platform</h1>
                <p className="text-xs text-muted-foreground">Powered by Supabase</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="playground" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            {/* API Tokens tab hidden - uncomment to restore:
            <TabsTrigger value="tokens" data-testid="tab-tokens">
              <Key className="h-4 w-4 mr-2" />
              API Tokens
            </TabsTrigger>
            */}
            <TabsTrigger value="playground" data-testid="tab-playground">
              <Code className="h-4 w-4 mr-2" />
              Playground
            </TabsTrigger>
            <TabsTrigger value="docs" data-testid="tab-docs">
              <BookOpen className="h-4 w-4 mr-2" />
              Docs
            </TabsTrigger>
          </TabsList>

          {/* API Tokens TabsContent hidden - To restore:
          1. Uncomment the hooks/mutations at the top of the file
          2. Uncomment the TabsTrigger above
          3. Uncomment this TabsContent block
          
          <TabsContent value="tokens" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">API Tokens</h2>
                <p className="text-muted-foreground">Manage your authentication tokens</p>
              </div>
              <CreateTokenDialog onCreateToken={(name) => createTokenMutation.mutate(name)} />
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading tokens...</div>
            ) : tokens.length === 0 ? (
              <div className="text-center py-12 border rounded-lg bg-muted/50">
                <Key className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No API tokens yet</h3>
                <p className="text-muted-foreground mb-4">Create your first token to get started</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {tokens.map((token) => (
                  <ApiTokenCard
                    key={token.id}
                    token={token}
                    onDelete={(id) => deleteTokenMutation.mutate(id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          */}

          <TabsContent value="playground">
            <ApiPlayground />
          </TabsContent>

          <TabsContent value="docs">
            <DocumentationSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
