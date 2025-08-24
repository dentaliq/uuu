addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event.env));
});

async function handleRequest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: corsHeaders
    });
  }

  const contentType = request.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return new Response('Unsupported Media Type', {
      status: 415,
      headers: corsHeaders
    });
  }

  try {
    const orderDetails = await request.json();

    const BOT_TOKEN = env.BOT_TOKEN;
    const CHAT_ID = env.CHAT_ID;

    // بناء رسالة تيليجرام
    let messageText = '<b>✅ طلب جديد من السوبر ماركت:</b>\n\n';
    messageText += `<b>- الاسم:</b> ${orderDetails.customer.name}\n`;
    messageText += `<b>- الهاتف:</b> ${orderDetails.customer.phone}\n\n`;
    messageText += `<b><u>المنتجات:</u></b>\n`;

    // **التعديل هنا:** استخدام حلقة for..of لمعالجة المصفوفة
    for (const item of orderDetails.items) {
      messageText += `• ${item.name} (الكمية: ${item.quantity}) - السعر: ${(item.price * item.quantity).toLocaleString('ar-SY')} د.ع\n`;
    }
    
    // استخدام totalFormatted من البيانات المرسلة
    messageText += `\n<b><u>المجموع الإجمالي: ${orderDetails.totalFormatted}</u></b>`;


    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-Worker'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error('Telegram API Error:', errorData);
      throw new Error(`Failed to send message: ${telegramResponse.status}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Order sent to Telegram successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });
  }
}
