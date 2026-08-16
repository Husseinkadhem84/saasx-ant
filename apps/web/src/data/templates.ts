import { GeneratedSystem } from '@saasx/shared';

export const SYSTEM_TEMPLATES: GeneratedSystem[] = [
  // 1. نظام مطعم
  {
    id: 'restaurant-pos',
    titleAr: 'نظام مطعم (إدارة الطلبات والمطبخ)',
    titleEn: 'Restaurant & POS Workflow',
    category: 'مطاعم وتوصيل',
    descriptionAr: 'نظام متكامل يستقبل طلبات الزبائن، يسجل البيانات في Supabase، يعالج الدفع عبر زين كاش، وينبه المطبخ تلقائياً عبر n8n.',
    promptUsed: 'أريد نظام إدارة مطعم يستقبل الطلبات من الزبائن مع جدول وجبات وجدول طلبات وقاعدة بيانات Supabase وبوابة دفع زين كاش وإشعارات للمطبخ.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'واجهة طلبات الزبائن (UI)',
          type: 'ui',
          description: 'نموذج اختيار الوجبات وتحديد العنوان ورقم الموبايل',
          iconName: 'Utensils'
        }
      },
      {
        id: 'node-ai',
        type: 'customNode',
        position: { x: 300, y: 150 },
        data: {
          label: 'معالج الذكاء الاصطناعي',
          type: 'ai',
          description: 'تحليل ملاحظات الزبون وحساب كلفة التوصيل التلقائية',
          iconName: 'Sparkles'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 550, y: 50 },
        data: {
          label: 'قاعدة بيانات Supabase',
          type: 'database',
          description: 'جدول orders وجدول order_items مع حماية RLS',
          iconName: 'Database'
        }
      },
      {
        id: 'node-zaincash',
        type: 'customNode',
        position: { x: 550, y: 250 },
        data: {
          label: 'بوابة زين كاش (ZainCash)',
          type: 'payment',
          description: 'إنشاء رمز دفع QR وتوليد Redirect URL رسمي',
          iconName: 'CreditCard'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 800, y: 150 },
        data: {
          label: 'محرك أتمتة n8n Core',
          type: 'n8n',
          description: 'ارسال طلب المطبخ عبر Webhook وتفعيل شاشة التحضير',
          iconName: 'Workflow'
        }
      },
      {
        id: 'node-notify',
        type: 'customNode',
        position: { x: 1050, y: 150 },
        data: {
          label: 'إشعار واتساب للزبون',
          type: 'notification',
          description: 'رسالة تأكيد الطلب ورابط التتبع المباشر',
          iconName: 'Send'
        }
      }
    ],
    edges: [
      { id: 'e1-2', source: 'node-ui', target: 'node-ai', animated: true, label: 'إرسال الطلب' },
      { id: 'e2-3', source: 'node-ai', target: 'node-db', animated: true, label: 'حفظ الطلب' },
      { id: 'e2-4', source: 'node-ai', target: 'node-zaincash', animated: true, label: 'طلب الدفع' },
      { id: 'e4-5', source: 'node-zaincash', target: 'node-n8n', animated: true, label: 'تأكيد العملية' },
      { id: 'e3-5', source: 'node-db', target: 'node-n8n', animated: true },
      { id: 'e5-6', source: 'node-n8n', target: 'node-notify', animated: true, label: 'إرسال التنبيه' }
    ],
    databaseTables: [
      {
        tableName: 'orders',
        tableNameAr: 'جدول الطلبات',
        description: 'يخزن كافة معلومات طلبات المطعم مع حالة الدفع والتوصيل',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'customer_name', type: 'text', required: true },
          { name: 'phone', type: 'text', required: true },
          { name: 'total_iqd', type: 'decimal', required: true },
          { name: 'payment_status', type: 'text', required: true },
          { name: 'created_at', type: 'timestamp', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "الزبائن يمكنهم قراءة طلباتهم فقط" ON orders FOR SELECT USING (auth.uid() = user_id);`
      },
      {
        tableName: 'menu_items',
        tableNameAr: 'جدول قائمة الطعام',
        description: 'الوجبات والأسعار المتوفرة في المطعم',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'item_name', type: 'text', required: true },
          { name: 'price_iqd', type: 'integer', required: true },
          { name: 'is_available', type: 'boolean', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "القراءة عامة للجميع" ON menu_items FOR SELECT USING (true);`
      }
    ],
    n8nConfig: {
      workflowName: 'Restaurant Order Dispatcher',
      webhookPath: '/webhook/saasx-restaurant-order',
      nodesCount: 5,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        N8N_PORT: '5678',
        ZAINCASH_MERCHANT_SECRET: '******',
        SUPABASE_URL: 'https://xyz.supabase.co'
      }
    },
    generatedUi: {
      titleAr: 'طلب وجبة جديدة',
      descriptionAr: 'حدد وجبتك المفضلة وعنوانك لإتمام الطلب بسرعة وسهولة',
      submitButtonTextAr: 'تأكيد الطلب والدفع عبر زين كاش',
      paymentMethod: 'zaincash',
      priceField: 'total_price',
      fields: [
        { id: 'name', labelAr: 'الاسم الكامل', type: 'text', placeholderAr: 'أحمد جاسم', required: true },
        { id: 'phone', labelAr: 'رقم الموبايل', type: 'phone', placeholderAr: '0770XXXXXXX', required: true },
        { id: 'item', labelAr: 'الوجبة المختارة', type: 'select', options: ['وجبة كباب عراقي (12,000 د.ع)', 'وجبة برغر لحم مضاعف (9,000 د.ع)', 'بيتزا شاورما كبير (14,000 د.ع)'], required: true },
        { id: 'address', labelAr: 'عنوان التوصيل (المنطقة / الشارع)', type: 'text', placeholderAr: 'بغداد - المنصور', required: true },
        { id: 'notes', labelAr: 'ملاحظات إضافية للمطبخ', type: 'textarea', placeholderAr: 'بدون بصل، زيادة صلصة الثوم', required: false }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_n8n_core
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 2. نظام عيادة
  {
    id: 'clinic-booking',
    titleAr: 'نظام عيادة (حجز المواعيد والعربون)',
    titleEn: 'Medical Clinic Booking & Deposit System',
    category: 'عيادات وصحة',
    descriptionAr: 'نظام أتمتة حجز المواعيد للعيادات الطبية مع تأكيد الحجز بواسطة فاست باي وإرسال تذكير للمريض عبر أتمتة n8n.',
    promptUsed: 'أريد نظام حجز عيادة طبية يسمح للمريض باختيار العيادة وتاريخ الحجز ودفع عربون عبر فاست باي وحفظ البيانات في Supabase.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'واجهة حجز المريض',
          type: 'ui',
          description: 'اختيار الطبيب والتخصص وتاريخ الموعد',
          iconName: 'Calendar'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 350, y: 50 },
        data: {
          label: 'جدول المواعيد (Supabase)',
          type: 'database',
          description: 'التحقق من عدم تضارب الأوقات وحفظ الحجز',
          iconName: 'Database'
        }
      },
      {
        id: 'node-fastpay',
        type: 'customNode',
        position: { x: 350, y: 250 },
        data: {
          label: 'بوابة فاست باي (FastPay)',
          type: 'payment',
          description: 'استقطاع عربون التأكيد (10,000 دينار)',
          iconName: 'Wallet'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 680, y: 150 },
        data: {
          label: 'أتمتة المواعيد (n8n)',
          type: 'n8n',
          description: 'جدولة تذكير قبل 24 ساعة وإشعار الطبيب',
          iconName: 'Clock'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-db', animated: true, label: 'التحقق وحفظ الموعد' },
      { id: 'e2', source: 'node-ui', target: 'node-fastpay', animated: true, label: 'دفع العربون' },
      { id: 'e3', source: 'node-fastpay', target: 'node-n8n', animated: true, label: 'تأكيد الحجز والإشعار' }
    ],
    databaseTables: [
      {
        tableName: 'appointments',
        tableNameAr: 'جدول المواعيد الطبية',
        description: 'يحتوي على كافة الحجوزات مع وقت الحضور واسم الطبيب والعربون المدفوع',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'patient_name', type: 'text', required: true },
          { name: 'patient_phone', type: 'text', required: true },
          { name: 'doctor_id', type: 'uuid', required: true },
          { name: 'appointment_time', type: 'timestamp', required: true },
          { name: 'deposit_paid_iqd', type: 'decimal', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "يمكن للمريض رؤية موعده فقط" ON appointments FOR SELECT USING (patient_phone = current_setting('request.jwt.claims')::json->>'phone');`
      }
    ],
    n8nConfig: {
      workflowName: 'Clinic Booking Automation',
      webhookPath: '/webhook/saasx-clinic-booking',
      nodesCount: 4,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        FASTPAY_MERCHANT_MOBILE: '07501234567',
        FASTPAY_STORE_PASSWORD: '******'
      }
    },
    generatedUi: {
      titleAr: 'حجز موعد في العيادة الطبية',
      descriptionAr: 'اختر العيادة والوقت المناسب وادفع عربون تثبيت الموعد بآمان',
      submitButtonTextAr: 'تأكيد الحجز ودفع العربون عبر FastPay',
      paymentMethod: 'fastpay',
      priceField: 'deposit_price',
      fields: [
        { id: 'patient_name', labelAr: 'اسم المريض الكامل', type: 'text', placeholderAr: 'سارة علي حسين', required: true },
        { id: 'patient_phone', labelAr: 'رقم الهاتف للتواصل والتذكير', type: 'phone', placeholderAr: '0750XXXXXXX', required: true },
        { id: 'specialty', labelAr: 'العيادة المطلوبة', type: 'select', options: ['عيادة الأسنـان - د. حيدر العبيدي', 'عيادة الجلدية والتجميل - د. مريم البصري', 'عيادة الباطنية والأطفال - د. عمر البغدادي'], required: true },
        { id: 'date', labelAr: 'تاريخ الموعد الفضل', type: 'date', required: true }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_clinic_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 3. نظام مدرسة
  {
    id: 'school-management',
    titleAr: 'نظام مدرسة (إدارة الطلاب والدرجات والأقساط)',
    titleEn: 'School & Academic Management System',
    category: 'تعليم ومدارس',
    descriptionAr: 'نظام إداري شامل لربط أسر الطلاب والمدرسة: متابعة الحضور، تسديد الأقساط المدرسية عبر زين كاش، وتنبيه ولي الأمر بالنتائج عبر واتساب.',
    promptUsed: 'أريد نظام إدارة مدرسة وأقساط دراسية مع تسجيل الطلاب وجدول بالنتائج وبوابة دفع زين كاش للاقساط وأتمتة إشعارات التلغرام والواتساب للوالدين.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'بوابة ولي الأمر والطلاب',
          type: 'ui',
          description: 'استعراض درجات الطالب وتسديد الأقساط المدرسية',
          iconName: 'GraduationCap'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 350, y: 50 },
        data: {
          label: 'سجل الطلاب والدرجات (Supabase)',
          type: 'database',
          description: 'جدول students وجدول tuition_fees مع RLS',
          iconName: 'Database'
        }
      },
      {
        id: 'node-zaincash',
        type: 'customNode',
        position: { x: 350, y: 250 },
        data: {
          label: 'دفع الأقساط (زين كاش)',
          type: 'payment',
          description: 'تسديد القسط المدرسي وتوليد وصل استلام إلكتروني',
          iconName: 'CreditCard'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 680, y: 150 },
        data: {
          label: 'أتمتة الإشعارات (n8n)',
          type: 'n8n',
          description: 'إرسال إشعارات الغياب والشهادات الشهرية عبر الواتساب',
          iconName: 'Workflow'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-db', animated: true, label: 'استعلام عن الطالب' },
      { id: 'e2', source: 'node-ui', target: 'node-zaincash', animated: true, label: 'تسديد القسط' },
      { id: 'e3', source: 'node-zaincash', target: 'node-n8n', animated: true, label: 'إرسال وصل التسديد' }
    ],
    databaseTables: [
      {
        tableName: 'students',
        tableNameAr: 'جدول الطلاب',
        description: 'بيانات الطلاب والصفوف الدراسية وحالة تسديد الأقساط',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'student_name', type: 'text', required: true },
          { name: 'grade_level', type: 'text', required: true },
          { name: 'parent_phone', type: 'text', required: true },
          { name: 'tuition_due_iqd', type: 'decimal', required: true },
          { name: 'is_paid', type: 'boolean', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "الأهالي يرون بيانات أبنائهم فقط" ON students FOR SELECT USING (parent_phone = current_setting('request.jwt.claims')::json->>'phone');`
      }
    ],
    n8nConfig: {
      workflowName: 'School Tuition & Notification System',
      webhookPath: '/webhook/saasx-school-tuition',
      nodesCount: 5,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        SCHOOL_PORTAL_KEY: '******',
        ZAINCASH_MERCHANT_ID: '987654'
      }
    },
    generatedUi: {
      titleAr: 'تسديد القسط المدرسي ومتابعة الطالب',
      descriptionAr: 'ادخل الرقم الامتحاني أو رقم هاتف ولي الأمر لمتابعة الطالب وتسديد الدفعة',
      submitButtonTextAr: 'دفع القسط المدرسي عبر زين كاش',
      paymentMethod: 'zaincash',
      priceField: 'tuition_amount',
      fields: [
        { id: 'student_name', labelAr: 'اسم الطالب الثلاثي', type: 'text', placeholderAr: 'علي محمد جاسم', required: true },
        { id: 'student_code', labelAr: 'الرمز الامتحاني / كود الطالب', type: 'text', placeholderAr: 'SCH-2026-88', required: true },
        { id: 'grade', labelAr: 'المرحلة الدراسية', type: 'select', options: ['الرابع الإعدادي', 'الخامس العلمي', 'السادس العلمي'], required: true },
        { id: 'parent_phone', labelAr: 'رقم هاتف ولي الأمر', type: 'phone', placeholderAr: '0770XXXXXXX', required: true }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_school_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 4. نظام متجر
  {
    id: 'store-ecommerce',
    titleAr: 'نظام متجر (تجارة إلكترونية ومبيعات)',
    titleEn: 'E-Commerce Store & Order System',
    category: 'تجارة وتسوق',
    descriptionAr: 'منظومة متجر إلكتروني مع سلة تسوق زجاجية، ربط خيارات الدفع فاست باي وزين كاش، وتوجيه الطلب تلقائياً لشركات التوصيل عبر n8n.',
    promptUsed: 'أريد نظام متجر إلكتروني لبيع المنتجات مع جدول منتجات وجدول مبيعات ودفع أونلاين عبر زين كاش وتأكيد تلقائي للعميل.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'كتالوج المتجر والسلة',
          type: 'ui',
          description: 'عرض المنتجات مع خيارات الحجم واللون وإضافة للسلة',
          iconName: 'ShoppingBag'
        }
      },
      {
        id: 'node-ai',
        type: 'customNode',
        position: { x: 300, y: 150 },
        data: {
          label: 'مستشار المبيعات الذكي',
          type: 'ai',
          description: 'اقتراح منتجات مكملة واحتساب خصومات كوبونات الشراء',
          iconName: 'Sparkles'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 550, y: 50 },
        data: {
          label: 'المخزن والطلبات (Supabase)',
          type: 'database',
          description: 'خصم الكمية المتوفرة تلقائياً وتسجيل المبيعات',
          iconName: 'Database'
        }
      },
      {
        id: 'node-payment',
        type: 'customNode',
        position: { x: 550, y: 250 },
        data: {
          label: 'بوابة الدفع (زين كاش / فاست باي)',
          type: 'payment',
          description: 'معالجة المبلغ وتحويله للمتجر بآمان',
          iconName: 'CreditCard'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 820, y: 150 },
        data: {
          label: 'أتمتة شركات التوصيل (n8n)',
          type: 'n8n',
          description: 'إنشاء بوليصة شحن وتنبيه السائق المباشر',
          iconName: 'Truck'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-ai', animated: true, label: 'إرسال السلة' },
      { id: 'e2', source: 'node-ai', target: 'node-db', animated: true, label: 'خصم المخزون' },
      { id: 'e3', source: 'node-ai', target: 'node-payment', animated: true, label: 'توليد فاتورة الدفع' },
      { id: 'e4', source: 'node-payment', target: 'node-n8n', animated: true, label: 'طلب التوصيل' }
    ],
    databaseTables: [
      {
        tableName: 'products',
        tableNameAr: 'جدول المنتجات',
        description: 'قائمة المنتجات والأسعار والكميات المتوفرة بالمخزن',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'title', type: 'text', required: true },
          { name: 'price_iqd', type: 'integer', required: true },
          { name: 'stock_quantity', type: 'integer', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "تصفح المنتجات عام" ON products FOR SELECT USING (true);`
      }
    ],
    n8nConfig: {
      workflowName: 'E-Commerce Shipping Dispatch',
      webhookPath: '/webhook/saasx-store-order',
      nodesCount: 6,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        STORE_API_KEY: '******',
        FASTPAY_MERCHANT: '998877'
      }
    },
    generatedUi: {
      titleAr: 'طلب منتج من المتجر الإلكتروني',
      descriptionAr: 'ادخل بيانات الشحن واختر وسيلة الدفع لإتمام طلبك',
      submitButtonTextAr: 'إتمام الشراء والدفع بآمان',
      paymentMethod: 'zaincash',
      priceField: 'total_price',
      fields: [
        { id: 'customer_name', labelAr: 'الاسم الثلاثي', type: 'text', placeholderAr: 'مصطفى أحمد', required: true },
        { id: 'phone', labelAr: 'رقم الموبايل للتوصيل', type: 'phone', placeholderAr: '0780XXXXXXX', required: true },
        { id: 'product', labelAr: 'المنتج المطلوب', type: 'select', options: ['ساعة ذكية أصلية (45,000 د.ع)', 'سماعة لاسلكية عازلة للصوت (30,000 د.ع)', 'قاعدة شحن سريعة 65W (25,000 د.ع)'], required: true },
        { id: 'city', labelAr: 'المحافظة والعنوان', type: 'text', placeholderAr: 'النجف الأشرف - حي الحسين', required: true }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_store_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 5. نظام مخزن
  {
    id: 'warehouse-inventory',
    titleAr: 'نظام مخزن (إدارة المخزون والتوريد)',
    titleEn: 'Warehouse Inventory & Logistics System',
    category: 'لوجستيات ومخازن',
    descriptionAr: 'نظام مراقبة المخزون والتوريد الذكي: تسجيل حركة المواد الواردة والصادرة، التنبيه عند اقتراب نفاد الشحنات، وأتمتة جرد المواد.',
    promptUsed: 'أريد نظام إدارة مخزن ومستودع يسجل حركات الإدخال والإخراج مع تنبيهات عند نقص المخزون وجدول للموردين وتنبيهات تلغرام.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'واجهة أمين المخزن',
          type: 'ui',
          description: 'تسجيل الوارد والصادر مع قراءة البارشود',
          iconName: 'Warehouse'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 350, y: 50 },
        data: {
          label: 'قاعدة بيانات المخزون (Supabase)',
          type: 'database',
          description: 'سجل الشحنات والكميات والمواد المتبقية',
          iconName: 'Database'
        }
      },
      {
        id: 'node-[#38BDF8]',
        type: 'customNode',
        position: { x: 350, y: 250 },
        data: {
          label: 'ذكاء التحليل والتوقع (AI)',
          type: 'ai',
          description: 'التنبؤ باحتياجات المواد القادمة حسب معدل الاستهلاك',
          iconName: 'Sparkles'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 680, y: 150 },
        data: {
          label: 'أتمتة الموردين والتنبيهات (n8n)',
          type: 'n8n',
          description: 'إرسال أومر شراء تلقائية للموردين عند الحد الأدنى',
          iconName: 'Workflow'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-db', animated: true, label: 'تحديث الكمية' },
      { id: 'e2', source: 'node-db', target: 'node-[#38BDF8]', animated: true, label: 'فحص الحد الأدنى' },
      { id: 'e3', source: 'node-[#38BDF8]', target: 'node-n8n', animated: true, label: 'طلب إعادة التوريد' }
    ],
    databaseTables: [
      {
        tableName: 'inventory_items',
        tableNameAr: 'جدول عناصر المخزن',
        description: 'بيانات المواد والكميات والموقع في المستودع',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'item_code', type: 'text', required: true },
          { name: 'item_name', type: 'text', required: true },
          { name: 'quantity_in_stock', type: 'integer', required: true },
          { name: 'min_reorder_level', type: 'integer', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "حماية بيانات المخزن للموظفين فقط" ON inventory_items FOR ALL USING (auth.uid() IS NOT NULL);`
      }
    ],
    n8nConfig: {
      workflowName: 'Warehouse Low Stock Auto-Order',
      webhookPath: '/webhook/saasx-inventory-alert',
      nodesCount: 4,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        INVENTORY_SECRET: '******'
      }
    },
    generatedUi: {
      titleAr: 'تسجيل حركـة إدخال / إخراج مخزني',
      descriptionAr: 'ادخل كود المادة والكمية وتحديد طبيعة الحركة',
      submitButtonTextAr: 'تأكيد تسجيل الشحنة',
      paymentMethod: 'none',
      fields: [
        { id: 'item_code', labelAr: 'كود / باركود المادة', type: 'text', placeholderAr: 'SKU-99012', required: true },
        { id: 'item_name', labelAr: 'اسم المادة أو الشحنة', type: 'text', placeholderAr: 'أنابيب بلاستيك 2 إنش', required: true },
        { id: 'movement_type', labelAr: 'نوع الحركة', type: 'select', options: ['إدخال مخزني (وارد)', 'صرف وإخراج (صادر)', 'تالف / مفقود'], required: true },
        { id: 'quantity', labelAr: 'الكمية (بالقطعة / الصندوق)', type: 'number', placeholderAr: '50', required: true }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_warehouse_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 6. نظام شركة
  {
    id: 'company-erp',
    titleAr: 'نظام شركة (إدارة المهام والمشاريع والعملاء)',
    titleEn: 'Enterprise ERP & Project Management',
    category: 'شركات وإدارة',
    descriptionAr: 'منظومة إدارية للشركات والمؤسسات: تنظيم عقود العملاء، تتبع تسليم المشاريع، أتمتة الفواتير الإلكترونية ومتابعة الأداء.',
    promptUsed: 'أريد نظام إدارة شركة ومشاريع يسجل عقود العملاء والمهام والمستحقات مع ربط قاعدة بيانات ومتابعة الأداء التلقائي عبر n8n.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'لوحة قيادة إدارة الشركة',
          type: 'ui',
          description: 'متابعة المشاريع والمهام والعقود النشطة',
          iconName: 'Building2'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 350, y: 50 },
        data: {
          label: 'قواعد بيانات الشركة (Supabase)',
          type: 'database',
          description: 'جداول العملاء والمشاريع والمهام والمستحقات',
          iconName: 'Database'
        }
      },
      {
        id: 'node-payment',
        type: 'customNode',
        position: { x: 350, y: 250 },
        data: {
          label: 'تحصيل مستحقات العقود',
          type: 'payment',
          description: 'بوابة دفع الفواتير للعملاء أونلاين',
          iconName: 'CreditCard'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 680, y: 150 },
        data: {
          label: 'محرك أتمتة الشركة (n8n)',
          type: 'n8n',
          description: 'توليد تقارير الإنجاز الأسبوعية وإرسال الفواتير',
          iconName: 'Workflow'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-db', animated: true, label: 'تحديث حالة المشروع' },
      { id: 'e2', source: 'node-ui', target: 'node-payment', animated: true, label: 'إصدار فاتورة عاجلة' },
      { id: 'e3', source: 'node-payment', target: 'node-n8n', animated: true, label: 'تأكيد المستحقات' }
    ],
    databaseTables: [
      {
        tableName: 'projects',
        tableNameAr: 'جدول مشاريع الشركة',
        description: 'تتبع المشاريع، الميزانية والمواعيد النهائية للتسليم',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'client_name', type: 'text', required: true },
          { name: 'project_title', type: 'text', required: true },
          { name: 'budget_iqd', type: 'decimal', required: true },
          { name: 'status', type: 'text', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "الموظفون المصرّح لهم فقط" ON projects FOR SELECT USING (auth.role() = 'authenticated');`
      }
    ],
    n8nConfig: {
      workflowName: 'Company Project & Billing ERP',
      webhookPath: '/webhook/saasx-company-erp',
      nodesCount: 5,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        COMPANY_API_SECRET: '******'
      }
    },
    generatedUi: {
      titleAr: 'تسجيل مشروع جديد في الشركة',
      descriptionAr: 'ادخل بيانات العقد وقيمة المشروع وفريق العمل المسؤول',
      submitButtonTextAr: 'اعتماد المشروع وحفظ العقد',
      paymentMethod: 'none',
      fields: [
        { id: 'client_name', labelAr: 'اسم الشركة / العميل', type: 'text', placeholderAr: 'شركة دجلة للتطوير العقاري', required: true },
        { id: 'project_title', labelAr: 'اسم المشروع أو الخدمة', type: 'text', placeholderAr: 'تطوير تطبيق الهاتف الذكي', required: true },
        { id: 'budget', labelAr: 'قيمة العقد (بالدينار العراقي)', type: 'number', placeholderAr: '15000000', required: true },
        { id: 'deadline', labelAr: 'تاريخ تسليم المشروع النهائي', type: 'date', required: true }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_company_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 7. نظام محاماة
  {
    id: 'law-firm',
    titleAr: 'نظام محاماة (إدارة القضايا والخدمات القانونية)',
    titleEn: 'Law Firm & Legal Case Management',
    category: 'استشارات وقانون',
    descriptionAr: 'نظام إدارة المكتب القانوني: متابعة جلسات المحاكم، توثيق مستندات موكلي المحاماة، حجز الاستشارات القانونية الإلكترونية ودفع أتعاب المحاماة.',
    promptUsed: 'أريد نظام مكتب محاماة لحجز الاستشارات القانونية وإدارة القضايا ومواعيد الجلسات في المحاكم مع أتمتة التذكير عبر الواتساب.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'بوابة الموكلين والاستشارات',
          type: 'ui',
          description: 'طلب استشارة قانونية وحجز موعد الجلسة',
          iconName: 'Scale'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 350, y: 50 },
        data: {
          label: 'سجل القضايا والمستندات (Supabase)',
          type: 'database',
          description: 'تشفير وحفظ مستندات القضايا وجدول الجلسات',
          iconName: 'Database'
        }
      },
      {
        id: 'node-zaincash',
        type: 'customNode',
        position: { x: 350, y: 250 },
        data: {
          label: 'سداد الأتعاب القانونية (زين كاش)',
          type: 'payment',
          description: 'دفع أتعاب الاستشارة القانونية بآمان',
          iconName: 'CreditCard'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 680, y: 150 },
        data: {
          label: 'تنبيهات الجلسات (n8n)',
          type: 'n8n',
          description: 'تذكير المحامي والموكل بموعد الجلسة قبل 48 ساعة',
          iconName: 'Workflow'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-db', animated: true, label: 'رفع مستندات القضية' },
      { id: 'e2', source: 'node-ui', target: 'node-zaincash', animated: true, label: 'دفع قيمة الاستشارة' },
      { id: 'e3', source: 'node-zaincash', target: 'node-n8n', animated: true, label: 'جدولة تذكير الجلسة' }
    ],
    databaseTables: [
      {
        tableName: 'legal_cases',
        tableNameAr: 'جدول القضايا القانونية',
        description: 'بيانات القضايا، اسم المحكمة، ورقم الجلسة القادمة',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'client_name', type: 'text', required: true },
          { name: 'case_number', type: 'text', required: true },
          { name: 'court_name', type: 'text', required: true },
          { name: 'next_session_date', type: 'timestamp', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "سرية القضايا للموكل والمحامي فقط" ON legal_cases FOR SELECT USING (auth.uid() = user_id);`
      }
    ],
    n8nConfig: {
      workflowName: 'Law Firm Sessions Reminder',
      webhookPath: '/webhook/saasx-law-session',
      nodesCount: 4,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        LAWFIRM_SECRET: '******'
      }
    },
    generatedUi: {
      titleAr: 'حجز استشارة قانونية جديدة',
      descriptionAr: 'ادخل طبيعة القضية والمحكمة المطلوبة لحجز موعد مع المحامي',
      submitButtonTextAr: 'تأكيد الحجز وسداد الأتعاب عبر زين كاش',
      paymentMethod: 'zaincash',
      priceField: 'consultation_fee',
      fields: [
        { id: 'client_name', labelAr: 'اسم الموكل الكامل', type: 'text', placeholderAr: 'حسين كاظم', required: true },
        { id: 'phone', labelAr: 'رقم الموبايل للتواصل السرّي', type: 'phone', placeholderAr: '0770XXXXXXX', required: true },
        { id: 'case_type', labelAr: 'نوع القضية / الاستشارة', type: 'select', options: ['قضايا تجارية وعقود شركات', 'قضايا عقارية وملكية', 'استشارة مدنية عامة'], required: true },
        { id: 'notes', labelAr: 'ملخص مختصر لموضوع القضية', type: 'textarea', placeholderAr: 'شرح مختصر لموضوع الخلاف القانوني...', required: false }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_law_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 8. نظام صالون
  {
    id: 'salon-booking',
    titleAr: 'نظام صالون (حجز العناية والتجميل)',
    titleEn: 'Beauty Salon & Spa Appointment System',
    category: 'تجميل وعناية',
    descriptionAr: 'نظام حجز مواعيد لصالونات التجميل والـ Spa: اختيار خبيرة التجميل، تحديد باقة الخدمات، تثبيت الموعد ببطاقة فاست باي، وإرسال تأكيد الحجز.',
    promptUsed: 'أريد نظام حجز صالون تجميل وعناية للباقات والخدمات مع تحديد الوقت وتأكيد الحجز بدفع عربون فاست باي وإرسال تنبيهات للزبائن.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'واجهة حجز الصالون',
          type: 'ui',
          description: 'اختيار خدمات التجميل والوقت المفضل',
          iconName: 'Sparkles'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 350, y: 50 },
        data: {
          label: 'جدول مواعيد الصالون (Supabase)',
          type: 'database',
          description: 'تنظيم جدول الأخصائيات وتجنب تضارب الأوقات',
          iconName: 'Database'
        }
      },
      {
        id: 'node-fastpay',
        type: 'customNode',
        position: { x: 350, y: 250 },
        data: {
          label: 'عربون الحجز (FastPay)',
          type: 'payment',
          description: 'استقطاع مبلغ تثبيت الحجز أونلاين',
          iconName: 'Wallet'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 680, y: 150 },
        data: {
          label: 'أتمتة التذكير بالموعد (n8n)',
          type: 'n8n',
          description: 'تنبيه الزبونة قبل ساعتين من موعد الجلسة',
          iconName: 'Workflow'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-db', animated: true, label: 'تثبيت الجدول' },
      { id: 'e2', source: 'node-ui', target: 'node-fastpay', animated: true, label: 'دفع عربون الحجز' },
      { id: 'e3', source: 'node-fastpay', target: 'node-n8n', animated: true, label: 'إرسال تأكيد الواتساب' }
    ],
    databaseTables: [
      {
        tableName: 'salon_bookings',
        tableNameAr: 'جدول حجز الصالون',
        description: 'بيانات الحجوزات والخدمات المطلوبة وقيمة العربون',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'client_name', type: 'text', required: true },
          { name: 'service_name', type: 'text', required: true },
          { name: 'booking_date', type: 'timestamp', required: true },
          { name: 'deposit_iqd', type: 'decimal', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "قراءة الحجوزات الشخصية فقط" ON salon_bookings FOR SELECT USING (true);`
      }
    ],
    n8nConfig: {
      workflowName: 'Salon Booking Dispatcher',
      webhookPath: '/webhook/saasx-salon-booking',
      nodesCount: 4,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        FASTPAY_SALON_KEY: '******'
      }
    },
    generatedUi: {
      titleAr: 'حجز موعد في صالون التجميل',
      descriptionAr: 'حددي الخدمة المطلوبة والوقت المناسب لتثبيت الموعد',
      submitButtonTextAr: 'تأكيد الحجز ودفع العربون عبر FastPay',
      paymentMethod: 'fastpay',
      priceField: 'deposit_price',
      fields: [
        { id: 'client_name', labelAr: 'الاسم الكامـل', type: 'text', placeholderAr: 'زينب أحمد', required: true },
        { id: 'phone', labelAr: 'رقم الموبايل للتأكيد', type: 'phone', placeholderAr: '0750XXXXXXX', required: true },
        { id: 'service', labelAr: 'الخدمة المطلوبة', type: 'select', options: ['باكج العناية بالشعر والبشرة (35,000 د.ع)', 'جلسة تنظيف بشرة هيدرافيسيال (25,000 د.ع)', 'خدمات ميك أب وتسريحة كاملة (60,000 د.ع)'], required: true },
        { id: 'date', labelAr: 'تاريخ وساعة الموعد', type: 'date', required: true }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_salon_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 9. نظام عقارات
  {
    id: 'real-estate',
    titleAr: 'نظام عقارات (إدارة البيوع والعقود والأملاك)',
    titleEn: 'Real Estate & Property Management',
    category: 'عقارات واستثمار',
    descriptionAr: 'منظومة إدارة المكاتب والشركات العقارية: عرض العقارات للبيع والإيجار، تسجيل عقود الإيجار، تحصيل الإيجارات الشهرية عبر زين كاش والتنبيه التلقائي.',
    promptUsed: 'أريد نظام إدارة شركة عقارية يعرض دور وشقق للبيع والإيجار مع سجل العقود وتحصيل الإيجار عبر زين كاش وإرسال تنبيه للمستأجر.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'معرض العقارات والعقود',
          type: 'ui',
          description: 'تصفح الأملاك، حجز معاينة ميدانية وتسديد الإيجار',
          iconName: 'Home'
        }
      },
      {
        id: 'node-[#38BDF8]',
        type: 'customNode',
        position: { x: 300, y: 150 },
        data: {
          label: 'مستشار العقارات الذكي (AI)',
          type: 'ai',
          description: 'تقييم أسعار العقار وحساب القسط الشهري المتوقع',
          iconName: 'Sparkles'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 550, y: 50 },
        data: {
          label: 'سجل العقارات والمستأجرين (Supabase)',
          type: 'database',
          description: 'جداول العقارات، مالكي العقار وعقود الإيجار',
          iconName: 'Database'
        }
      },
      {
        id: 'node-zaincash',
        type: 'customNode',
        position: { x: 550, y: 250 },
        data: {
          label: 'تحصيل الإيجار (زين كاش)',
          type: 'payment',
          description: 'سداد الإيجار الشهري أونلاين وتوليد سند قبض',
          iconName: 'CreditCard'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 820, y: 150 },
        data: {
          label: 'أتمتة التجديد والإشعارات (n8n)',
          type: 'n8n',
          description: 'تنبيه المستأجر بموعد الإيجار وتوليد عقد إلكتروني',
          iconName: 'Workflow'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-[#38BDF8]', animated: true, label: 'طلب تقييم العقار' },
      { id: 'e2', source: 'node-[#38BDF8]', target: 'node-db', animated: true, label: 'حفظ العقد' },
      { id: 'e3', source: 'node-ui', target: 'node-zaincash', animated: true, label: 'سداد القسط/الإيجار' },
      { id: 'e4', source: 'node-zaincash', target: 'node-n8n', animated: true, label: 'تأكيد السداد والوصل' }
    ],
    databaseTables: [
      {
        tableName: 'properties',
        tableNameAr: 'جدول العقارات والأملاك',
        description: 'قائمة العقارات، المواصفات، السعر وحالة الإيجار/البيع',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'title', type: 'text', required: true },
          { name: 'location', type: 'text', required: true },
          { name: 'price_iqd', type: 'decimal', required: true },
          { name: 'type', type: 'text', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "عرض العقارات متاح للعملاء" ON properties FOR SELECT USING (true);`
      }
    ],
    n8nConfig: {
      workflowName: 'Real Estate Rent Collector',
      webhookPath: '/webhook/saasx-realestate-rent',
      nodesCount: 5,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        REALESTATE_ZAIN_KEY: '******'
      }
    },
    generatedUi: {
      titleAr: 'حجز معاينة عقار أو سداد إيجار',
      descriptionAr: 'حدد العقار المطلوب وسجل معلومات التواصل لتأكيد الطلب',
      submitButtonTextAr: 'تأكيد الطلب وسداد المبلغ عبر زين كاش',
      paymentMethod: 'zaincash',
      priceField: 'rent_price',
      fields: [
        { id: 'client_name', labelAr: 'الاسم الكامل', type: 'text', placeholderAr: 'عمر المختار', required: true },
        { id: 'phone', labelAr: 'رقم الموبايل', type: 'phone', placeholderAr: '0770XXXXXXX', required: true },
        { id: 'property', labelAr: 'العقار المحدد', type: 'select', options: ['شقة سكنية فاخرة - الجادرية (800,000 د.ع/شهر)', 'منزل مستقل 200م - اليرموك (1,200,000 د.ع/شهر)', 'مكتب تجاري - زيونة (650,000 د.ع/شهر)'], required: true },
        { id: 'action_type', labelAr: 'نوع الطلب', type: 'select', options: ['حجز موعد معاينة ميدانية', 'سداد إيجار الشهر الحالي'], required: true }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_realestate_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  },

  // 10. نظام إدارة موظفين
  {
    id: 'employee-hr',
    titleAr: 'نظام إدارة موظفين (الموارد البشرية والرواتب)',
    titleEn: 'HR & Employee Attendance System',
    category: 'موارد بشرية',
    descriptionAr: 'نظام الموارد البشرية والرواتب: تسشجيل الحضور والغياب، تقديم طلبات الإجازات الإلكترونية، واحتساب الرواتب والمكافآت مع أتمتة الإشعارات.',
    promptUsed: 'أريد نظام إدارة موظفين للموارد البشرية والرواتب مع سجل الحضور والغياب وطلبات الإجازات وحساب صافي الراتب المستحق في Supabase.',
    nodes: [
      {
        id: 'node-ui',
        type: 'customNode',
        position: { x: 50, y: 150 },
        data: {
          label: 'بوابة الموظف وHR',
          type: 'ui',
          description: 'تسجيل البصمة، تقديم طلب إجازة واستعراض كشف الراتب',
          iconName: 'Users'
        }
      },
      {
        id: 'node-db',
        type: 'customNode',
        position: { x: 350, y: 50 },
        data: {
          label: 'قاعدة بيانات الموظفين (Supabase)',
          type: 'database',
          description: 'جدول الموظفين، الحضور، الإجازات وقوائم الرواتب',
          iconName: 'Database'
        }
      },
      {
        id: 'node-ai',
        type: 'customNode',
        position: { x: 350, y: 250 },
        data: {
          label: 'حاسبة الرواتب والإنتاجية (AI)',
          type: 'ai',
          description: 'احتساب الساعات الإضافية والخصومات والتأمينات أوتوماتيكياً',
          iconName: 'Sparkles'
        }
      },
      {
        id: 'node-n8n',
        type: 'customNode',
        position: { x: 680, y: 150 },
        data: {
          label: 'أتمتة إشعارات الرواتب (n8n)',
          type: 'n8n',
          description: 'إرسال كشف الراتب الإلكتروني (Payslip) شهرياً للموظف',
          iconName: 'Workflow'
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'node-ui', target: 'node-db', animated: true, label: 'تسجيل البصمة/الإجازة' },
      { id: 'e2', source: 'node-db', target: 'node-ai', animated: true, label: 'حساب صافي المستحقات' },
      { id: 'e3', source: 'node-ai', target: 'node-n8n', animated: true, label: 'إرسال كشف الراتب' }
    ],
    databaseTables: [
      {
        tableName: 'employees',
        tableNameAr: 'جدول الموظفين',
        description: 'بيانات الموظف، المسمى الوظيفي، الراتب الأساسي والمسموحات',
        fields: [
          { name: 'id', type: 'uuid', required: true, isPrimary: true },
          { name: 'full_name', type: 'text', required: true },
          { name: 'job_title', type: 'text', required: true },
          { name: 'base_salary_iqd', type: 'decimal', required: true },
          { name: 'department', type: 'text', required: true }
        ],
        rlsPolicySql: `CREATE POLICY "الموظف يرسم بياناته فقط" ON employees FOR SELECT USING (auth.uid() = user_id);`
      }
    ],
    n8nConfig: {
      workflowName: 'HR Payroll & Leave Dispatcher',
      webhookPath: '/webhook/saasx-hr-payroll',
      nodesCount: 5,
      dockerVolumeMount: 'D:\\saasx-data\\n8n',
      envVars: {
        HR_SYSTEM_SECRET: '******'
      }
    },
    generatedUi: {
      titleAr: 'تقديم طلب إجازة أو مغادرة موظف',
      descriptionAr: 'اختر نوع الإجازة وتاريخ البدء لإرسال الطلب للمدير المباشر',
      submitButtonTextAr: 'إرسال الطلب للموارد البشرية',
      paymentMethod: 'none',
      fields: [
        { id: 'employee_name', labelAr: 'اسم الموظف الكامل', type: 'text', placeholderAr: 'بلال عبد الستار', required: true },
        { id: 'emp_id', labelAr: 'الرقم الوظيفي', type: 'text', placeholderAr: 'EMP-1044', required: true },
        { id: 'leave_type', labelAr: 'نوع الإجازة', type: 'select', options: ['إجازة اعتيادية براتب', 'إجازة مرضية بتقرير طبي', 'مغادرة زمنية ساعتين'], required: true },
        { id: 'start_date', labelAr: 'تاريخ بداية الإجازة', type: 'date', required: true },
        { id: 'reason', labelAr: 'سبب الطلب', type: 'textarea', placeholderAr: 'ظرف عائلي طارئ...', required: false }
      ]
    },
    dockerComposeYaml: `version: '3.8'
services:
  n8n:
    image: docker.n8nio/n8nio/n8n:latest
    container_name: saasx_hr_n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - D:\\saasx-data\\n8n:/home/node/.n8n
`,
    createdAt: new Date().toISOString()
  }
];
