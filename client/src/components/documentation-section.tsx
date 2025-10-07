import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DocumentationSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-2">API Documentation</h2>
        <p className="text-muted-foreground">
          Complete reference for all available endpoints and authentication methods
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>All requests require a valid Bearer token in the Authorization header</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-sm mb-2">Authorization Header</h4>
              <pre className="p-3 bg-muted rounded-md border text-sm font-mono">
                Authorization: Bearer sk_your_api_token_here
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Example Request</h4>
              <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`curl -X GET https://api.example.com/api/customers \\
  -H "Authorization: Bearer sk_your_api_token_here"`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Customers</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/customers</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve all customers</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/customers/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve a specific customer by ID</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm font-mono">/api/customers</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Create a new customer</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "name": "John Doe",
  "tagid": "550e8400-e29b-41d4-a716-446655440000",
  "mailingAddress": "123 Main St, City, State 12345",
  "phoneNo": "+1-555-0123"
}`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="response">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "id": 1,
  "name": "John Doe",
  "tagid": "550e8400-e29b-41d4-a716-446655440000",
  "mailingAddress": "123 Main St, City, State 12345",
  "phoneNo": "+1-555-0123",
  "createdAt": "2025-01-20T10:30:00.000Z"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">PATCH</Badge>
                  <code className="text-sm font-mono">/api/customers/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Update an existing customer</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "name": "Jane Doe",
  "mailingAddress": "456 Oak Ave, Town, State 67890",
  "phoneNo": "+1-555-9876"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">DELETE</Badge>
                  <code className="text-sm font-mono">/api/customers/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Delete a customer</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Conversation Memory</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/conversation-memory</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve all conversation memories</p>
                <p className="text-sm text-muted-foreground ml-16">Query parameter: <code>?customerId=xxx</code> to filter by user</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/conversation-memory/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve a specific conversation memory by ID</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm font-mono">/api/conversation-memory</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Create a new conversation memory</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "id": "mem_123",
  "customerId": "cust_123",
  "conversationData": { "context": "any JSON data" },
  "message": "Hello, how can I help you?",
  "recipient": "user_456",
  "sender": "agent_789",
  "tagid": "user_456"
}`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="response">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "id": "mem_123",
  "customerId": "cust_123",
  "conversationData": { "context": "any JSON data" },
  "message": "Hello, how can I help you?",
  "recipient": "user_456",
  "sender": "agent_789",
  "tagid": "user_456",
  "createdAt": "2025-01-20T10:30:00.000Z"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">PATCH</Badge>
                  <code className="text-sm font-mono">/api/conversation-memory/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Update an existing conversation memory (all fields are optional)</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "customerId": "cust_456",
  "conversationData": { "updated": "data" },
  "message": "Updated message",
  "recipient": "new_recipient",
  "sender": "new_sender",
  "tagid": "new_user_id"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">DELETE</Badge>
                  <code className="text-sm font-mono">/api/conversation-memory/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Delete a conversation memory</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Incidents</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/incidents</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve all incidents</p>
                <p className="text-sm text-muted-foreground ml-16">Query parameter: <code>?customerId=xxx</code> to filter by user</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/incidents/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve a specific incident by ID</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm font-mono">/api/incidents</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Create a new incident</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "owner": "John Doe",
  "finder": "Jane Smith",
  "tagid": "550e8400-e29b-41d4-a716-446655440000"
}`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="response">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "owner": "John Doe",
  "finder": "Jane Smith",
  "tagid": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2025-01-20T10:30:00.000Z"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">PATCH</Badge>
                  <code className="text-sm font-mono">/api/incidents/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Update an existing incident (all fields are optional)</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "owner": "Updated Owner",
  "finder": "Updated Finder",
  "tagid": "550e8400-e29b-41d4-a716-446655440001"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">DELETE</Badge>
                  <code className="text-sm font-mono">/api/incidents/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Delete an incident</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/preferences</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve all preferences</p>
                <p className="text-sm text-muted-foreground ml-16">Query parameter: <code>?customerId=xxx</code> to filter by user</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/preferences/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve a specific preference by ID</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm font-mono">/api/preferences</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Create a new preference</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "description": "User theme preference",
  "selectedValue": "dark",
  "tagid": "550e8400-e29b-41d4-a716-446655440000"
}`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="response">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "id": "b1c2d3e4-f5a6-7890-bcde-f12345678901",
  "description": "User theme preference",
  "selectedValue": "dark",
  "tagid": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2025-01-20T10:30:00.000Z",
  "updatedAt": "2025-01-20T10:30:00.000Z"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">PATCH</Badge>
                  <code className="text-sm font-mono">/api/preferences/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Update an existing preference (all fields are optional)</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "description": "Updated preference description",
  "selectedValue": "light",
  "tagid": "550e8400-e29b-41d4-a716-446655440001"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">DELETE</Badge>
                  <code className="text-sm font-mono">/api/preferences/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Delete a preference</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Chat Memory</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/chat-memory</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve all chat memories</p>
                <p className="text-sm text-muted-foreground ml-16">Query parameter: <code>?customerId=xxx</code> to filter by customer</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm font-mono">/api/chat-memory/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Retrieve a specific chat memory by ID</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm font-mono">/api/chat-memory</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Create a new chat memory</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "customerId": "cust_123",
  "message": "Hello, how can I help you today?",
  "sender": "agent_001",
  "recipient": "customer_456",
  "metadata": {
    "channel": "web",
    "sentiment": "positive"
  }
}`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="response">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "id": "c1d2e3f4-g5h6-7890-ijkl-mn1234567890",
  "customerId": "cust_123",
  "message": "Hello, how can I help you today?",
  "sender": "agent_001",
  "recipient": "customer_456",
  "metadata": {
    "channel": "web",
    "sentiment": "positive"
  },
  "createdAt": "2025-01-20T10:30:00.000Z"
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">PATCH</Badge>
                  <code className="text-sm font-mono">/api/chat-memory/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Update an existing chat memory (all fields are optional)</p>
                <Tabs defaultValue="request" className="ml-16">
                  <TabsList>
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <pre className="p-3 bg-muted rounded-md border text-sm font-mono overflow-x-auto">
{`{
  "message": "Updated message content",
  "metadata": {
    "channel": "mobile",
    "sentiment": "neutral"
  }
}`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">DELETE</Badge>
                  <code className="text-sm font-mono">/api/chat-memory/:id</code>
                </div>
                <p className="text-sm text-muted-foreground ml-16">Delete a chat memory</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
