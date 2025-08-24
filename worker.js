addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // يرفض أي طلبات لا تأتي بطريقة POST
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // يستقبل بيانات الطلب بصيغة JSON
    const orderDetails = await request.json();

    // يتم الحصول على المتغيرات السرية من Cloudflare Workers.
    // يجب عليك إضافتها من قائمة "الإعدادات" > "المتغيرات".
    const BOT_TOKEN = env.BOT_TOKEN;
    const CHAT_ID = env.CHAT_ID;

    // بناء رسالة الطلب بصيغة HTML لإرسالها إلى تيليجرام
    let message = '<b>✅ طلب جديد من السوبر ماركت:</b>\n\n';
    message += `<b>- الاسم:</b> ${orderDetails.customer.name}\n`;
    message += `<b>- الهاتف:</b> ${orderDetails.customer.phone}\n\n`;
    message += `<b><u>المنتجات:</u></b>\n`;

    const items = orderDetails.items;
    for (const itemName in items) {
        const item = items[itemName];
        message += `• ${item.name} (الكمية: ${item.quantity}) - السعر: ${(item.price * item.quantity).toLocaleString('ar-SY')} د.ع\n`;
    }

    message += `\n<b><u>${orderDetails.total}</u></b>`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (telegramResponse.ok) {
      return new Response(JSON.stringify({ success: true, message: 'Order sent to Telegram' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const errorText = await telegramResponse.text();
      return new Response(`Failed to send message to Telegram: ${errorText}`, { status: 500 });
    }

  } catch (error) {
    return new Response(`Error processing request: ${error.message}`, { status: 400 });
  }
}
