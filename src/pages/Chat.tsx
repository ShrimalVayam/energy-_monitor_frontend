import React, { useEffect, useState } from 'react';
import { Device } from '../types/types';
import { getDevices } from '../services/deviceService';
import { SidebarLayout } from '../components';
import ChatBox from '../components/ChatBot/ChatBot';
import { HiChatBubbleLeftRight, HiLightBulb } from 'react-icons/hi2';
import { FiZap } from 'react-icons/fi';

const Chat = () => {
  const [data, setData] = useState<Device[]>();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getDevices();
        setData(fetchedDevices);
      } catch (error) {
        console.error('Failed to fetch devices:', error);
      }
    };
    fetchDevices();
  }, []);

  console.log(data, 'this is data');

  return (
    <SidebarLayout>
      {/* Full page height and no horizontal overflow */}
      <main className="bg-slate-900 h-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 text-white">
          {/* ChatBox card */}
          <section className="mb-8">
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 overflow-x-hidden">
              {/* Give ChatBox room to breathe; let it handle its own inner scrolling */}
              <div className="px-5 py-5">
                {/* Outer clamp to avoid double scrolling; ChatBox messages area will scroll */}
                <div className=" overflow-hidden">
                  <ChatBox devices={data} />
                </div>
              </div>
            </div>
          </section>

          {/* AI Tips card */}
          <section className="rounded-xl border border-slate-700/60 bg-slate-800/40 px-6 py-5 overflow-x-hidden">
            <div className="flex items-center gap-2 mb-5">
              <HiLightBulb className="text-yellow-400" size={18} />
              <h2 className="text-base font-semibold">AI Tips</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Smart Questions */}
              <div className="rounded-lg bg-slate-800/30 border border-slate-700/40 px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiZap className="text-cyan-400" size={14} />
                  <h3 className="text-cyan-400 text-sm font-medium">
                    Smart Questions
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-400">
                  Ask specific questions like “What device consumed the most
                  energy last week?” for detailed insights.
                </p>
              </div>

              {/* Natural Language */}
              <div className="rounded-lg bg-slate-800/30 border border-slate-700/40 px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiChatBubbleLeftRight className="text-cyan-400" size={14} />
                  <h3 className="text-cyan-400 text-sm font-medium">
                    Natural Language
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-400">
                  Use natural language — I understand questions about costs,
                  efficiency, and optimization.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Chat;
