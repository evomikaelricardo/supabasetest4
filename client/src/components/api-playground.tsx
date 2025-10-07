import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Play } from "lucide-react";

export function ApiPlayground() {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/api/chat-memory");
  const [bearerToken, setBearerToken] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    setResponse("");
    setStatusCode(null);
    
    try {
      let data: unknown | undefined = undefined;
      if ((method === "POST" || method === "PATCH") && requestBody) {
        try {
          data = JSON.parse(requestBody);
        } catch (e) {
          setResponse(JSON.stringify({ error: "Invalid JSON in request body" }, null, 2));
          setStatusCode(400);
          setIsLoading(false);
          return;
        }
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (bearerToken) {
        headers["Authorization"] = `Bearer ${bearerToken}`;
      }

      const res = await fetch(endpoint, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include",
      });

      setStatusCode(res.status);
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const jsonData = await res.json();
        setResponse(JSON.stringify(jsonData, null, 2));
      } else {
        const text = await res.text();
        setResponse(text || "Success");
      }
    } catch (error) {
      setStatusCode(500);
      setResponse(JSON.stringify({ error: error instanceof Error ? error.message : "Request failed" }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Playground</CardTitle>
        <CardDescription>Test your API endpoints with authentication</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="method">Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method" data-testid="select-method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="endpoint">Endpoint</Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/chat-memory"
              data-testid="input-endpoint"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bearer-token">Bearer Token</Label>
          <Input
            id="bearer-token"
            type="password"
            value={bearerToken}
            onChange={(e) => setBearerToken(e.target.value)}
            placeholder="sk_..."
            className="font-mono"
            data-testid="input-bearer-token"
          />
        </div>

        {(method === "POST" || method === "PATCH") && (
          <div className="space-y-2">
            <Label htmlFor="request-body">Request Body (JSON)</Label>
            <Textarea
              id="request-body"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder='{"customerId": "cust_123", "message": "Hello!", "sender": "agent_001", "recipient": "customer_456", "metadata": {"channel": "web"}}'
              className="font-mono"
              rows={4}
              data-testid="textarea-request-body"
            />
          </div>
        )}

        <Button onClick={handleSendRequest} className="w-full" disabled={isLoading} data-testid="button-send-request">
          <Play className="h-4 w-4 mr-2" />
          {isLoading ? "Sending..." : "Send Request"}
        </Button>

        {response && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Response</Label>
              <Badge 
                variant={statusCode && statusCode >= 200 && statusCode < 300 ? "secondary" : "destructive"} 
                data-testid="badge-response-status"
              >
                {statusCode} {statusCode && statusCode >= 200 && statusCode < 300 ? "OK" : "Error"}
              </Badge>
            </div>
            <pre className="p-4 bg-muted rounded-md border text-sm font-mono overflow-x-auto" data-testid="text-response">
              {response}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
