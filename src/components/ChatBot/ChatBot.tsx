import { useEffect, useRef, useState } from 'react';
import { FiZap, FiMessageCircle, FiSend } from 'react-icons/fi';
import type { Device } from '../../types/types';
import { chatbotAI } from '../../services/chatbotService';
import { suggestedPrompts } from '../../utils/constants';

type ChatBoxProps = { devices: Device[] | unknown };

export default function ChatBox({ devices }: ChatBoxProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (message?: string) => {
    const messageToSend = message || input;
    if (!messageToSend.trim()) return;

    setMessages((prev) => [...prev, `You: ${messageToSend}`]);
    setInput('');

    const obj = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: JSON.stringify(devices, null, 2) },
        { role: 'user', content: messageToSend },
      ],
    };

    try {
      const res = await chatbotAI({ obj });
      const reply =
        res?.data.reply.content || 'No response from chatbot service.';
      setMessages((prev) => [...prev, `Bot: ${reply}`]);
    } catch {
      setMessages((prev) => [...prev, `Bot: Failed to fetch response.`]);
    }
  };

  return (
    <div
      className="
        flex flex-col
        w-full max-w-full
        overflow-x-hidden
        h-[min(64vh,700px)] min-h-[560px]
        /* Ensure all text can wrap to avoid overflow */
        break-words
        [overflow-wrap:anywhere]
      "
    >
      {/* Header */}
      <header className="text-center mb-6 shrink-0 w-full overflow-x-hidden">
        <div className="flex items-center justify-center gap-3 mb-2">
          <FiMessageCircle className="text-cyan-400" size={28} />
          <h1 className="text-3xl font-bold leading-tight">
            AI Energy Assistant
          </h1>
        </div>
        <p className="text-slate-400 text-base">
          Ask me anything about your smart home's energy consumption
        </p>
      </header>

      {/* Section title */}
      <div className="flex items-center gap-2 mb-3 shrink-0 w-full overflow-x-hidden">
        <FiZap className="text-cyan-400" size={20} />
        <h2 className="text-xl font-semibold">Energy Chat</h2>
      </div>

      {/* Middle column */}
      <div className="grow flex flex-col w-full max-w-full overflow-hidden">
        {/* Messages list */}
        <div
          className="
            overflow-y-auto overflow-x-hidden
            pr-1 custom-scroll
            max-h-[calc(100%-220px)] min-h-[160px]
            mb-4
            w-full max-w-full
            break-words
            [overflow-wrap:anywhere]
            hyphens-auto
          "
        >
          {messages.length === 0 ? (
            <div className="flex items-start gap-3 w-full max-w-full">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FiZap size={16} className="text-white" />
              </div>
              <div className="bg-slate-700 rounded-2xl rounded-tl-md p-4 w-fit max-w-full sm:max-w-lg">
                <p className="text-sm leading-relaxed text-slate-200 break-words [overflow-wrap:anywhere] hyphens-auto">
                  Hi! I'm your AI energy assistant. Ask me anything about your
                  smart home's energy consumption. For example: 'Which device
                  uses the most energy?' or 'How much energy did I use
                  yesterday?'
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4  w-full max-w-full">
              {messages.map((m, i) => (
                <div key={i} className="w-full max-w-full">
                  {m.startsWith('You: ') ? (
                    <div className="flex justify-end">
                      <div className="bg-cyan-600 rounded-2xl rounded-tr-md p-3 w-fit max-w-full sm:max-w-lg">
                        <p className="text-sm break-words [overflow-wrap:anywhere] hyphens-auto">
                          {m.replace('You: ', '')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 w-full max-w-full">
                      <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiZap size={16} className="text-white" />
                      </div>
                      <div className="bg-slate-700 rounded-2xl rounded-tl-md p-4 w-fit max-w-full sm:max-w-lg">
                        <p className="text-sm leading-relaxed text-slate-200 break-words [overflow-wrap:anywhere] hyphens-auto">
                          {m.replace('Bot: ', '')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Suggestions */}
        <section className="mb-3 shrink-0 w-full max-w-full overflow-x-hidden">
          <p className="text-slate-400 text-sm mb-3">Try asking:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="
                  text-left bg-slate-700 hover:bg-slate-600 rounded-lg px-4 py-3 text-sm
                  transition-colors border border-slate-600 hover:border-slate-500 text-slate-200
                  w-full max-w-full break-words [overflow-wrap:anywhere]
                "
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Input row */}
        <footer className="flex gap-3 mt-1 shrink-0 w-full max-w-full overflow-x-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="
              flex-1
              bg-slate-700 text-white placeholder-slate-400
              border border-slate-600 rounded-lg
              px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
              overflow-x-hidden break-words [overflow-wrap:anywhere]
            "
            placeholder="Ask about your energy usage..."
          />
          <button
            onClick={() => handleSend()}
            className="
              bg-cyan-500 hover:bg-cyan-600
              text-white px-4 py-3 rounded-lg
              transition-colors flex items-center justify-center
            "
            aria-label="Send"
          >
            <FiSend size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
}
