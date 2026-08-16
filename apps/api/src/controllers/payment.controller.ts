import { Request, Response } from 'express';

export const processZainCashPayment = (req: Request, res: Response) => {
  const { amountIqd, phone, orderTitle } = req.body;
  const transactionId = 'ZC_' + Math.floor(10000000 + Math.random() * 90000000);
  
  res.json({
    success: true,
    mode: 'mock',
    provider: 'zaincash',
    transactionId,
    amountIqd,
    customerPhone: phone,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ZAINCASH:${transactionId}:${amountIqd}`,
    redirectUrl: `/payment-callback?provider=zaincash&tx=${transactionId}&status=success`,
    status: 'pending_authorization',
    message: 'تم إنشاء عملية دفع زين كاش بنجاح (وضع الاختبار)'
  });
};

export const processFastPayPayment = (req: Request, res: Response) => {
  const { amountIqd, phone } = req.body;
  const transactionId = 'FP_' + Math.floor(1000000 + Math.random() * 900000);
  
  res.json({
    success: true,
    mode: 'mock',
    provider: 'fastpay',
    transactionId,
    amountIqd,
    customerPhone: phone,
    status: 'approved',
    message: 'تم خصم المبلغ من محفظة فاست باي بنجاح (وضع الاختبار)'
  });
};
