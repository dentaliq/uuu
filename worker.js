addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event.env));
});

async function handleRequest(request, env) {
    // إذا كان الطلب من نوع 'OPTIONS'، هذا هو طلب "Preflight" من المتصفح.
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204, // "لا يوجد محتوى"
            headers: {
                'Access-Control-Allow-Origin': '*', // السماح بالطلبات من أي نطاق
                'Access-Control-Allow-Methods': 'POST, OPTIONS', // السماح بطرق POST و OPTIONS
                'Access-Control-Allow-Headers': 'Content-Type', // السماح بترويسة Content-Type
            },
        });
    }

    // يرفض أي طلبات لا تأتي بطريقة POST
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    const responseHeaders = {
        'Access-Control-Allow-Origin': '*', // إضافة ترويسة السماح بالوصول للرد النهائي
        'Content-Type': 'application/json', // نوع المحتوى
    };

    try {
        const orderDetails = await request.json();

        const BOT_TOKEN = env.BOT_TOKEN;
        const CHAT_ID = env.CHAT_ID;

        // كود إرسال الرسالة إلى تيليجرام
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const messageText = `طلب جديد!\n\n${Object.entries(orderDetails).map(([key, value]) => `${key}: ${value}`).join('\n')}`;

        const telegramResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: messageText,
                parse_mode: 'HTML' // أو 'MarkdownV2'
            }),
        });

        if (!telegramResponse.ok) {
            const errorData = await telegramResponse.json();
            throw new Error(`Failed to send message: ${errorData.description}`);
        }

        return new Response(JSON.stringify({ status: 'success', message: 'Order sent to Telegram' }), {
            status: 200,
            headers: responseHeaders,
        });
    } catch (error) {
        return new Response(JSON.stringify({ status: 'error', message: error.message }), {
            status: 500,
            headers: responseHeaders,
        });
    }
}
