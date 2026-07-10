import { SectionHeader, LeadOSSuggestionTag, PageTitle, Button, FilterButton, Card, BodyText, PageSubtitle, HelperText } from '../components/ui';
import { aiQuickPrompts, aiSampleExchange } from '../data';
import { Bot, User } from 'lucide-react';

export default function AIAssistent() {
  return (
    <div className="max-w-[800px]">
      <header className="page-header">
        <PageTitle>AI-assistent</PageTitle>
        <PageSubtitle>Kontekstbevidst ledelsesassistent — ikke en generisk chatbot</PageSubtitle>
      </header>

      <div className="flex flex-wrap gap-1.5 mb-8">
        {aiQuickPrompts.map((prompt) => (
          <FilterButton key={prompt}>
            {prompt}
          </FilterButton>
        ))}
      </div>

      <Card className="overflow-hidden" padded={false}>
        <div className="card--padded border-b border-border flex items-center justify-between">
          <SectionHeader
            title="Samtale"
            subtitle="Eksempel på kontekstbevidst svar"
            className="mb-0"
          />
          <LeadOSSuggestionTag />
        </div>

        <div className="card--padded space-y-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <HelperText className="block mb-1.5">Mathias</HelperText>
              <BodyText>{aiSampleExchange.user}</BodyText>
            </div>
          </div>

          <div className="flex gap-3 border-l-2 border-primary/35 pl-4 ml-1">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 -ml-1">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <HelperText className="block mb-1.5">LeadOS</HelperText>
              <BodyText>{aiSampleExchange.assistant}</BodyText>
            </div>
          </div>
        </div>

        <div className="card--padded border-t border-border">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Stil et spørgsmål om dit team..."
              className="flex-1 px-4 py-2 text-sm bg-paper border border-border rounded-[8px] focus:outline-none focus:border-primary/40 placeholder:text-subtle/70 min-h-[36px]"
            />
            <Button>Send</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
