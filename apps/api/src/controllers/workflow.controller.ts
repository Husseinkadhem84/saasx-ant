import { Request, Response, NextFunction } from 'express';
import { getAiClient } from '../services/ai.js';
import { sanitizeSystemObject, generateFallbackSystem } from '../services/systemGenerator.js';
import { AppError } from '../utils/AppError.js';

export const generateWorkflow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { promptAr } = req.body;

    const client = getAiClient();
    
    if (!client) {
      console.log('Gemini client not available. Returning smart generated system template.');
      const generated = generateFallbackSystem(promptAr);
      res.json({ success: true, ...generated });
      return;
    }

    const systemInstruction = `أنت مهندس معمارية أنظمة وذكاء اصطناعي خبير لمنصة SAASX.
مهمتك: تحويل الوصف النصي العربي القادم من المستخدم إلى نظام أتمتة وقواعد بيانات سير عمل كامل وصارم بتنسيق JSON حصراً.
يجب أن يحتوي الـ JSON على المفاتيح التالية فقط:
- titleAr: اسم النظام باللغة العربية
- titleEn: اسم النظام بالإنكليزية
- category: الفئة (مطاعم، عقارات، عيادات، متجر، إلخ)
- descriptionAr: وصف مختصر للنظام
- nodes: قائمة بالعقد (React Flow Nodes). من الأنواع: 'trigger', 'database', 'ai', 'ui', 'payment', 'n8n', 'notification'
- edges: قائمة بالتوصيلات بين العقد (source -> target)
- databaseTables: جداول Supabase المتوقعة مع الأسماء والحقول وسياسة RLS بالـ SQL
- n8nConfig: إعدادات سير عمل n8n مع مسار التثبيت الملتزم بشرط القرص D:\\saasx-data\\n8n
- generatedUi: عناصر واجهة المستخدم والحقول المطلوبة لاستقبال بيانات المدخلات
- dockerComposeYaml: ملف docker-compose لتشغيل n8n محلياً على القرص D:\\
لا تكتب أي مقدمات أو كلام خارجي. رجع الـ JSON فقط!`;

    const aiResponse = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `الوصف المطلوب من المستخدم: "${promptAr}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const responseText = aiResponse.text;
    if (!responseText) {
      throw new AppError(500, 'AI_ERROR', 'لم يتم استلام استجابة من نموذج الذكاء الاصطناعي');
    }

    let parsedSystem;
    try {
      parsedSystem = JSON.parse(responseText.trim());
    } catch (e) {
      console.warn('Failed to parse AI JSON response, falling back to smart builder:', e);
      parsedSystem = generateFallbackSystem(promptAr);
    }

    const validatedSystem = sanitizeSystemObject(parsedSystem, promptAr);
    res.json({ success: true, ...validatedSystem });

  } catch (error: any) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    
    console.error('Error generating workflow:', error);
    const fallback = generateFallbackSystem(req.body?.promptAr || 'نظام ذكي جديد');
    res.json({ success: true, ...fallback });
  }
};

export const testWebhook = (req: Request, res: Response) => {
  const { webhookPath, payload } = req.body;
  
  res.json({
    success: true,
    mode: 'mock',
    status: 'success',
    executedAt: new Date().toISOString(),
    webhookReceived: webhookPath,
    n8nEngineResponse: {
      code: 200,
      executionId: 'exec_' + Math.random().toString(36).substring(7),
      nodesProcessed: 4,
      volumePathVerified: 'mocked_volume'
    },
    receivedPayload: payload || {}
  });
};
