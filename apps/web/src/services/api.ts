import { GeneratedSystem } from '@saasx/shared';

export async function generateSystemWithAI(promptAr: string): Promise<GeneratedSystem> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/generate-workflow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promptAr })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'فشل في الاتصال بمحرك التوليد الآلي');
  }

  return await response.json();
}

export async function processZainCashPayment(amountIqd: number, phone: string, orderTitle: string) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/zaincash/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amountIqd, phone, orderTitle })
  });
  return await response.json();
}

export async function processFastPayPayment(amountIqd: number, phone: string) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/fastpay/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amountIqd, phone })
  });
  return await response.json();
}

export async function testN8nWebhook(webhookPath: string, payload: any) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/n8n/webhook-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ webhookPath, payload })
  });
  return await response.json();
}
