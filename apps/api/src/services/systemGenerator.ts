export function sanitizeSystemObject(raw: any, userPrompt: string) {
  const id = 'sys_' + Math.random().toString(36).substring(2, 9);
  
  return {
    id,
    titleAr: raw.titleAr || 'نظام أتمتة مخصص - SAASX',
    titleEn: raw.titleEn || 'Custom SAASX Automation System',
    category: raw.category || 'أتمتة عامة',
    descriptionAr: raw.descriptionAr || 'نظام ذكي تم توليده بواسطة SAASX لتسهيل إدارة العمليات والبيانات.',
    promptUsed: userPrompt,
    nodes: Array.isArray(raw.nodes) && raw.nodes.length > 0 ? raw.nodes : [
      { id: 'node-1', type: 'customNode', position: { x: 50, y: 150 }, data: { label: 'مدخلات المستخدم', type: 'ui', description: 'نموذج استقبال الطلبات' } },
      { id: 'node-2', type: 'customNode', position: { x: 300, y: 150 }, data: { label: 'معالج الذكاء الاصطناعي', type: 'ai', description: 'تحليل وتوزيع البيانات' } },
      { id: 'node-3', type: 'customNode', position: { x: 550, y: 150 }, data: { label: 'قاعدة بيانات Supabase', type: 'database', description: 'حفظ سجلات النظام' } },
      { id: 'node-4', type: 'customNode', position: { x: 800, y: 150 }, data: { label: 'محرك n8n Core', type: 'n8n', description: 'أتمتة المهام والإشعارات' } }
    ],
    edges: Array.isArray(raw.edges) && raw.edges.length > 0 ? raw.edges : [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
      { id: 'e2-3', source: 'node-2', target: 'node-3', animated: true },
      { id: 'e3-4', source: 'node-3', target: 'node-4', animated: true }
    ],
    databaseTables: Array.isArray(raw.databaseTables) && raw.databaseTables.length > 0 ? raw.databaseTables : [
      {
        tableName: 'system_records',
        tableNameAr: 'جدول سجلات النظام',
        description: 'يخزن مدخلات وحالات العمليات المكتملة',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'title', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
          { name: 'created_at', type: 'timestamp', required: true }
        ],
        rlsPolicySql: 'CREATE POLICY "قراءة السجلات الخاصة بالمسخدم" ON system_records FOR SELECT USING (auth.uid() = user_id);'
      }
    ],
    n8nConfig: raw.n8nConfig || {
      workflowName: raw.titleEn || 'SAASX Workflow',
      webhookPath: `/webhook/saasx-${id}`,
      nodesCount: 4,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: { N8N_PORT: '5678', NODE_ENV: 'production' }
    },
    generatedUi: raw.generatedUi || {
      titleAr: raw.titleAr || 'إدخال بيانات جديدة',
      descriptionAr: 'قم بملء البيانات التالية لتشغيل سير العمل الآلي',
      submitButtonTextAr: 'إرسال وتنفيذ سير العمل',
      paymentMethod: 'zaincash',
      fields: [
        { id: 'user_name', labelAr: 'الاسم الكامل', type: 'text', required: true },
        { id: 'phone', labelAr: 'رقم الموبايل', type: 'phone', required: true },
        { id: 'notes', labelAr: 'التفاصيل أو الطلب', type: 'textarea', required: false }
      ]
    },
    dockerComposeYaml: raw.dockerComposeYaml || `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_n8n_${id}
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  };
}

export function generateFallbackSystem(promptAr: string) {
  const isPaymentRequested = promptAr.includes('دفع') || promptAr.includes('زين كاش') || promptAr.includes('فاست باي');
  const isClinic = promptAr.includes('عيادة') || promptAr.includes('طبي') || promptAr.includes('حجز');
  const isEcom = promptAr.includes('متجر') || promptAr.includes('شراء') || promptAr.includes('بضاعة');

  let titleAr = 'نظام أتمتة مخصص بالذكاء الاصطناعي';
  let category = 'أنظمة عامة';
  
  if (isClinic) {
    titleAr = 'نظام إدارة حجز المواعيد والعيادات الطبية';
    category = 'عيادات وصحة';
  } else if (isEcom) {
    titleAr = 'نظام المتجر الإلكتروني والمستودع الأوتوماتيكي';
    category = 'تجارة إلكترونية';
  }

  const nodes = [
    {
      id: 'node-1',
      type: 'customNode',
      position: { x: 50, y: 160 },
      data: { label: 'نموذج استقبال المدخلات (UI)', type: 'ui', description: 'واجهة التفاعل المباشرة مع المستفيد', iconName: 'Layout' }
    },
    {
      id: 'node-2',
      type: 'customNode',
      position: { x: 300, y: 160 },
      data: { label: 'محلل الذكاء الاصطناعي (Claude/Gemini)', type: 'ai', description: 'معالجة النص العربي والتحقق من البيانات', iconName: 'Sparkles' }
    },
    {
      id: 'node-3',
      type: 'customNode',
      position: { x: 550, y: 60 },
      data: { label: 'قاعدة بيانات Supabase (Postgres)', type: 'database', description: 'تخزين الجداول وعلاقات الحقول وحماية RLS', iconName: 'Database' }
    }
  ];

  if (isPaymentRequested) {
    nodes.push({
      id: 'node-4',
      type: 'customNode',
      position: { x: 550, y: 260 },
      data: { label: 'بوابة الدفع العراقي (ZainCash / FastPay)', type: 'payment', description: 'معالجة التحويل المالي برقم الهاتف', iconName: 'CreditCard' }
    });
  }

  nodes.push({
    id: 'node-5',
    type: 'customNode',
    position: { x: 820, y: 160 },
    data: { label: 'محرك أتمتة n8n Core', type: 'n8n', description: 'توجيه الـ Webhook وتنفيذ الإجراءات الآلية', iconName: 'Workflow' }
  });

  const edges = [
    { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true, label: 'إرسال البيانات' },
    { id: 'e2-3', source: 'node-2', target: 'node-3', animated: true, label: 'حفظ الحقول' }
  ];

  if (isPaymentRequested) {
    edges.push({ id: 'e2-4', source: 'node-2', target: 'node-4', animated: true, label: 'طلب الدفع' });
    edges.push({ id: 'e4-5', source: 'node-4', target: 'node-5', animated: true, label: 'تأكيد العملية' });
  } else {
    edges.push({ id: 'e3-5', source: 'node-3', target: 'node-5', animated: true, label: 'تفعيل سير العمل' });
  }

  return sanitizeSystemObject({
    titleAr,
    category,
    descriptionAr: `نظام متكامل ينفذ العمليات التالية: ${promptAr}`,
    nodes,
    edges
  }, promptAr);
}
