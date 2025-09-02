import { chatbotApi } from '.';

export const chatbotAI = async ({ obj }: { obj: unknown }) => {
  return await chatbotApi.post('/chat', obj);
};
