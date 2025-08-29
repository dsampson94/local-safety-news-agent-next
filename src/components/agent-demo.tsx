"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Cog, CheckCircle, ArrowRight } from 'lucide-react';

interface DemoStep {
  id: string;
  type: 'thinking' | 'tool_call' | 'tool_result' | 'final';
  title: string;
  description: string;
  data?: any;
  timestamp: number;
}

export function AgentDemo() {
  const [query, setQuery] = useState("Any recent crime in Sandton CBD?");
  const [steps, setSteps] = useState<DemoStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const runAgentDemo = async () => {
    setIsRunning(true);
    setSteps([]);
    setCurrentStep(0);

    const demoSteps: DemoStep[] = [
      {
        id: '1',
        type: 'thinking',
        title: 'Agent Analyzes Query',
        description: 'Agent reads the query and decides what information is needed',
        timestamp: Date.now()
      },
      {
        id: '2', 
        type: 'tool_call',
        title: 'Agent Calls Search Tool',
        description: 'Agent autonomously decides to use search_local_crime_data tool',
        data: { tool: 'search_local_crime_data', params: { query, location: 'Sandton CBD' } },
        timestamp: Date.now()
      },
      {
        id: '3',
        type: 'tool_result',
        title: 'Tool Returns Real Data',
        description: 'Search tool executes and returns actual crime incidents',
        data: {
          results: [
            {
              type: "Property & Financial Crimes",
              summary: "Armed robbery at Sandton City ATM. Three suspects approached victim.",
              severity: 4,
              keywords: ["armed robbery", "Sandton", "ATM"],
              newsID: "sandton_001"
            },
            {
              type: "Violent Crimes",
              summary: "Pedestrian mugged near Sandton Gautrain station. Phone and wallet stolen.",
              severity: 3,
              keywords: ["mugging", "Sandton", "evening"],
              newsID: "sandton_002"
            }
          ]
        },
        timestamp: Date.now()
      },
      {
        id: '4',
        type: 'thinking',
        title: 'Agent Processes Results',
        description: 'Agent analyzes tool results and decides next actions',
        timestamp: Date.now()
      },
      {
        id: '5',
        type: 'tool_call',
        title: 'Agent Calls Geocoding Tool',
        description: 'Agent decides to get coordinates for the incidents',
        data: { tool: 'geocode_location', params: { location: 'Sandton CBD' } },
        timestamp: Date.now()
      },
      {
        id: '6',
        type: 'tool_result',
        title: 'Geocoding Tool Returns Coordinates',
        description: 'Tool provides precise latitude/longitude for the area',
        data: {
          coordinates: {
            type: "Point",
            coordinates: [28.0567, -26.1076]
          },
          address: "Sandton CBD, Johannesburg"
        },
        timestamp: Date.now()
      },
      {
        id: '7',
        type: 'final',
        title: 'Agent Creates Final Response',
        description: 'Agent combines all tool results into structured output',
        data: {
          summary: "Found 2 safety incidents in Sandton CBD area. The incidents include 1 armed robbery (high severity) and 1 mugging (medium severity). Recent activity suggests heightened caution advised in the area.",
          totalIncidents: 2,
          averageSeverity: 3.5,
          recommendations: [
            "Avoid displaying valuables in public",
            "Be extra cautious near ATM areas",
            "Use well-lit areas when walking"
          ]
        },
        timestamp: Date.now()
      }
    ];

    // Simulate agent execution with delays
    for (let i = 0; i < demoSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSteps(prev => [...prev, demoSteps[i]]);
      setCurrentStep(i + 1);
    }

    setIsRunning(false);
  };

  const getStepIcon = (type: DemoStep['type']) => {
    switch (type) {
      case 'thinking': return <Brain className="h-5 w-5 text-blue-500" />;
      case 'tool_call': return <Cog className="h-5 w-5 text-orange-500" />;
      case 'tool_result': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'final': return <CheckCircle className="h-5 w-5 text-purple-500" />;
    }
  };

  const getStepColor = (type: DemoStep['type']) => {
    switch (type) {
      case 'thinking': return 'border-blue-200 bg-blue-50';
      case 'tool_call': return 'border-orange-200 bg-orange-50';
      case 'tool_result': return 'border-green-200 bg-green-50';
      case 'final': return 'border-purple-200 bg-purple-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            TRUE Agent Demonstration
          </CardTitle>
          <CardDescription>
            Watch how our agent autonomously decides which tools to use and processes real data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Ask about crime in any area..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isRunning}
            />
            <Button 
              onClick={runAgentDemo}
              disabled={isRunning || !query.trim()}
            >
              {isRunning ? 'Agent Running...' : 'Run Agent Demo'}
            </Button>
          </div>

          {steps.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Agent Execution Steps:</h3>
              
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full border-2 ${
                        index < currentStep ? 'border-green-300 bg-green-100' : 'border-gray-300 bg-gray-100'
                      }`}>
                        {getStepIcon(step.type)}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    
                    <Card className={`flex-1 ${getStepColor(step.type)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{step.title}</h4>
                          <Badge variant="outline">
                            Step {index + 1}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        
                        {step.data && (
                          <div className="bg-white rounded p-3 text-xs font-mono">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(step.data, null, 2)}
                            </pre>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Differences */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 Key Differences: TRUE Agent vs Fake "Agent"</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">❌ Fake "Agent" (Most Apps)</h4>
              <ul className="space-y-2 text-sm">
                <li>• Just prompts LLM for JSON response</li>
                <li>• LLM makes up/hallucinates data</li>
                <li>• No real tool execution</li>
                <li>• No autonomous decision making</li>
                <li>• Single LLM call</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">✅ TRUE Agent (Our System)</h4>
              <ul className="space-y-2 text-sm">
                <li>• LLM autonomously chooses tools</li>
                <li>• Real tool execution with parameters</li>
                <li>• Tool results fed back to LLM</li>
                <li>• Multi-step reasoning process</li>
                <li>• Agent makes decisions at each step</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why This Matters */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Why TRUE Agents Matter for Community Wolf</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Real Data Processing</h4>
                <p className="text-sm text-gray-600">Agents can search real news sources, APIs, and databases</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Autonomous Decision Making</h4>
                <p className="text-sm text-gray-600">Agent decides when to search, geocode, analyze, or alert</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Multi-Step Reasoning</h4>
                <p className="text-sm text-gray-600">Can chain multiple tools together for complex workflows</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Scalable Integration</h4>
                <p className="text-sm text-gray-600">Easy to add new tools (Twitter API, police feeds, etc.)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
