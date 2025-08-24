<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سوبر ماركت العراق</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Variables and Basic Styles */
        :root {
            --primary: #3d5a80;
            --primary-light: #98c1d9;
            --secondary: #ee6c4d;
            --accent: #e0fbfc;
            --dark: #293241;
            --light: #f4f7f9;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Tajawal', sans-serif;
            background-color: var(--light);
            color: var(--dark);
            line-height: 1.6;
            direction: rtl;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Initial state: Hide everything except the floating button */
        .hidden-until-start {
            display: none;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }

        .show-content {
            display: block;
            opacity: 1;
        }

        /* Floating Button */
        .floating-button {
            position: fixed;
            bottom: 50%;
            left: 50%;
            transform: translate(-50%, 50%);
            background-color: var(--secondary);
            color: var(--light);
            padding: 20px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 100;
            display: flex;
            align-items: center;
            cursor: pointer;
            border: none;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: translate(-50%, 50%) scale(1); }
            50% { transform: translate(-50%, 50%) scale(1.05); }
            100% { transform: translate(-50%, 50%) scale(1); }
        }
        
        .floating-button:hover {
            transform: translate(-50%, 50%) scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .floating-button i {
            margin-right: 15px;
            animation: bounce 1.5s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }

        /* Main Sections */
        .header {
            background-color: var(--primary);
            color: var(--accent);
            padding: 100px 0;
            text-align: center;
        }

        .header h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: 900;
        }
        
        /* Category Menu */
        .category-menu {
            padding: 50px 0;
            text-align: center;
        }

        .category-menu h2 {
            font-size: 2.5rem;
            margin-bottom: 40px;
            color: var(--primary);
            position: relative;
            display: inline-block;
        }

        .category-menu h2::after {
            content: "";
            position: absolute;
            bottom: -10px;
            right: 0;
            width: 80%;
            height: 4px;
            background-color: var(--secondary);
            border-radius: 2px;
        }

        .category-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
        
        .category-item {
            background-color: #fff;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 25px;
            text-align: center;
            flex: 1;
            min-width: 200px;
            max-width: 250px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }

        .category-item:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .category-item i {
            font-size: 3rem;
            color: var(--primary);
            margin-bottom: 15px;
        }

        .category-item h3 {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--dark);
        }

        /* Product Lightbox (Modal) */
        .product-lightbox, .confirmation-modal, .quantity-modal, .success-modal, .order-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 200;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .product-lightbox.show, .confirmation-modal.show, .quantity-modal.show, .success-modal.show, .order-modal.show {
            display: flex;
            opacity: 1;
        }

        .lightbox-content, .modal-content {
            background-color: var(--light);
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.4s ease-out;
        }

        .modal-content {
            max-width: 500px;
        }
        
        .lightbox-content h2, .modal-content h2 {
            text-align: center;
            margin-bottom: 20px;
            color: var(--primary);
            border-bottom: 2px solid var(--secondary);
            padding-bottom: 10px;
        }
        
        .product-grid-lightbox {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .product-card-lightbox {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        
        .product-card-lightbox:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .product-card-lightbox img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }

        .product-card-lightbox .product-details {
            padding: 15px;
            text-align: center;
        }

        .product-card-lightbox h3 {
            font-size: 1rem;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 5px;
        }

        .product-card-lightbox .price {
            font-size: 1.1rem;
            font-weight: 900;
            color: var(--secondary);
        }
        
        .product-lightbox .close-btn, .confirmation-modal .close-btn, .quantity-modal .close-btn, .success-modal .close-btn, .order-modal .close-btn {
            position: absolute;
            top: 15px;
            left: 15px;
            font-size: 2rem;
            color: var(--dark);
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .product-lightbox .close-btn:hover, .confirmation-modal .close-btn:hover, .quantity-modal .close-btn:hover, .success-modal .close-btn:hover, .order-modal .close-btn:hover {
            transform: rotate(90deg);
            color: var(--secondary);
        }

        /* Order Review Modal */
        .order-review {
            text-align: center;
        }

        .order-review h2 {
            margin-bottom: 20px;
            color: var(--primary);
        }

        .order-review ul {
            list-style: none;
            padding: 0;
            border: 1px solid var(--primary-light);
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .order-review li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px dashed var(--primary-light);
        }
        
        .order-review li .item-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .order-review li .item-actions button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: var(--secondary);
            transition: transform 0.2s ease;
        }
        
        .order-review li .item-actions button:hover {
            transform: scale(1.1);
        }
        
        .order-review li:last-child {
            border-bottom: none;
        }

        .order-review h4 {
            font-weight: 500;
            margin: 0;
        }

        .order-review .price {
            color: var(--secondary);
            font-weight: bold;
        }

        .order-review .total-price {
            font-size: 1.5rem;
            font-weight: 900;
            color: var(--dark);
        }
        
        .order-review .btn-group {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }

        .order-review .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .order-review .confirm-btn {
            background-color: #4CAF50;
            color: #fff;
        }

        .order-review .cancel-btn {
            background-color: #f44336;
            color: #fff;
        }

        .order-review .confirm-btn:hover, .order-review .cancel-btn:hover {
            transform: translateY(-2px);
            opacity: 0.9;
        }
        
        /* Quantity Modal */
        .quantity-modal .modal-content {
            text-align: center;
            max-width: 400px;
        }

        .quantity-modal h3 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: var(--dark);
        }
        
        .quantity-modal .quantity-input {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .quantity-modal .quantity-input input {
            width: 80px;
            text-align: center;
            font-size: 1.2rem;
            padding: 8px;
            border: 1px solid var(--primary-light);
            border-radius: 5px;
        }
        
        .quantity-modal .quantity-input button {
            background-color: var(--primary);
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .quantity-modal .btn-group {
            display: flex;
            justify-content: center;
            gap: 15px;
        }

        /* Order Modal (for user details) */
        .order-modal .modal-content {
            max-width: 450px;
        }

        .order-modal form p {
            text-align: right;
            margin-bottom: 15px;
        }
        
        .order-modal form input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--primary-light);
            border-radius: 5px;
            font-size: 1rem;
            margin-top: 5px;
        }

        .order-modal .btn-group {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        
        /* Success Modal */
        .success-modal .modal-content {
            text-align: center;
            max-width: 400px;
        }
        
        .success-modal i.fa-check-circle {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 20px;
            animation: bounceIn 0.8s ease;
        }

        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
        }
        
        .success-modal h3 {
            color: var(--dark);
            margin-bottom: 10px;
        }
        
        .success-modal p {
            color: var(--text);
            margin-bottom: 20px;
        }

        /* Floating View Orders Button */
        .floating-view-orders {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background-color: var(--dark);
            color: var(--light);
            padding: 15px 25px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 100;
            display: none; /* Initially hidden */
            align-items: center;
            cursor: pointer;
            border: none;
        }
        
        .floating-view-orders:hover {
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .floating-view-orders i {
            margin-right: 10px;
        }
        
        /* Loading indicator */
        .loading {
            display: none;
            text-align: center;
            padding: 20px;
        }
        
        .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--secondary);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>

    <button id="startButton" class="floating-button">
        <i class="fas fa-shopping-basket"></i> تصفح المنتجات
    </button>
    
    <button id="viewOrdersButton" class="floating-view-orders">
        <i class="fas fa-list-check"></i> عرض الطلبات
    </button>
    
    <div id="mainContent" class="hidden-until-start">
        <header class="header">
            <div class="container">
                <h1>سوبر ماركت العراق</h1>
                <p>مفهوم جديد للتسوق يجمع بين التنوع والجودة. اختر ما تريد واستلم طلبك بكل سهولة.</p>
            </div>
        </header>

        <main class="products-section">
            <div class="container">
                <div class="category-menu">
                    <h2>الأقسام الرئيسية</h2>
                    <div id="categoryList" class="category-list">
                    </div>
                </div>
            </div>
        </main>
        
        <footer>
            <p style="text-align:center; padding: 20px; background-color: var(--dark); color: var(--light);">© 2024 سوبر ماركت العراق. جميع الحقوق محفوظة.</p>
        </footer>
    </div>

    <div id="productLightbox" class="product-lightbox">
        <div class="lightbox-content">
            <span class="close-btn">&times;</span>
            <h2 id="lightboxTitle"></h2>
            <div id="productGrid" class="product-grid-lightbox">
            </div>
        </div>
    </div>
    
    <div id="quantityModal" class="quantity-modal">
        <div class="modal-content">
            <h3 id="quantityModalTitle"></h3>
            <div class="quantity-input">
                <button id="decreaseQuantity">-</button>
                <input type="number" id="productQuantity" value="1" min="1">
                <button id="increaseQuantity">+</button>
            </div>
            <div class="btn-group">
                <button id="addFinalBtn" class="btn confirm-btn">أضف إلى الطلب</button>
                <button id="cancelFinalBtn" class="btn cancel-btn">إلغاء</button>
            </div>
        </div>
    </div>
    
    <div id="confirmationModal" class="confirmation-modal">
        <div class="lightbox-content">
            <span class="close-btn" id="closeConfirmationBtn">&times;</span>
            <div class="order-review">
                <h2>مراجعة الطلب</h2>
                <ul id="orderReviewList">
                    </ul>
                <h3 id="finalTotal">المجموع الإجمالي: 0 د.ع</h3>
                <div class="btn-group">
                    <button id="continueOrderingBtn" class="btn confirm-btn">أضف المزيد</button>
                    <button id="finalizeOrderBtn" class="btn cancel-btn">أرسل الطلب</button>
                </div>
            </div>
        </div>
    </div>
    
    <div id="orderModal" class="order-modal">
        <div class="modal-content">
            <span class="close-btn" id="closeOrderModalBtn">&times;</span>
            <h2>إرسال الطلب</h2>
            <form id="orderForm">
                <p>الاسم الثلاثي: <input type="text" id="customerName" required></p>
                <p>رقم الهاتف: <input type="tel" id="customerPhone" required></p>
                <div class="btn-group">
                    <button type="submit" class="btn confirm-btn">إرسال</button>
                </div>
            </form>
        </div>
    </div>

    <div id="successModal" class="success-modal">
        <div class="modal-content">
            <span class="close-btn" id="closeSuccessModalBtn">&times;</span>
            <i class="fas fa-check-circle"></i>
            <h3>تم إرسال طلبك بنجاح!</h3>
            <p>سنقوم بالاتصال بك في أقرب وقت لتأكيد الطلب.</p>
        </div>
    </div>
    
    <div id="loadingIndicator" class="loading">
        <div class="loading-spinner"></div>
        <p>جاري إرسال الطلب...</p>
    </div>

    <script>
        const productsData = {
            'قسم الشيبس والـ"سناكس"': [
                { name: 'ليز', price: 1000, img: 'https://images.unsplash.com/photo-1599491741513-2d256860368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc1Mjh8MHwxfHNlYXJjaHwxM3x8Y2hpcHN8ZW58MHx8fHwxNzIzMjk2ODc4fDA&ixlib=rb-4.0.3&q=80&w=200' },
                { name: 'هلا', price: 750, img: 'https://images.unsplash.com/photo-1596497042571-0814fdb23173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc1Mjh8MHwxfHNlYXJjaHwyMHx8c25hY2tzfGVufDB8fHx8MTcyMzI5NjkzM3ww&ixlib=rb-4.0.3&q=80&w=200' },
                { name: 'ماكس', price: 1200, img: 'x1.jpg' },
                { name: 'دوو', price: 1000, img: 'x2.jpg' },
                { name: 'كرانشي', price: 1000, img: 'x3.jpg' },
                { name: 'شيبس البطل', price: 1000, img: 'x4.jpg' },
                { name: 'تشيتوس', price: 1000, img: 'x5.jpg' },
                { name: 'كورنتس', price: 1000, img: 'x6.jpg' },
            ],
            'قسم المشروبات الغازية': [
                { name: 'بيبسي', price: 1500, img: 'x7.jpg' },
                { name: 'كوكاكولا', price: 1500, img: 'x8.jpg' },
                { name: 'سفن أب', price: 1500, img: 'x9.jpg' },
                { name: 'ميرندا', price: 1500, img: 'x10.jpg' },
                { name: 'فانتا', price: 1500, img: 'x11.jpg' },
                { name: 'باربيكان', price: 1250, img: 'x12.jpg' },
                { name: 'فيروز', price: 1000, img: 'x13.jpg' },
                { name: 'راني', price: 1250, img: 'x14.jpg' },
            ],
            'قسم العصائر': [
                { name: 'راني', price: 1250, img: 'x15.jpg' },
                { name: 'سن توب', price: 750, img: 'x16.jpg' },
                { name: 'تانغ', price: 2000, img: 'x17.jpg' },
                { name: 'دانا', price: 1250, img: 'x18.jpg' },
            ],
            'قسم المياه المعدنية': [
                { name: 'دجلة', price: 500, img: 'x19.jpg' },
                { name: 'الكفيل', price: 600, img: 'x20.jpg' },
            ],
            'قسم الألبان والأجبان': [
                { name: 'كاله (إيراني)', price: 2000, img: 'x21.jpg' },
                { name: 'المراعي', price: 2500, img: 'x22.jpg' },
                { name: 'كلية', price: 1500, img: 'x23.jpg' },
                { name: 'كرافت', price: 3000, img: 'x24.jpg' },
                { name: 'لاكتيل', price: 2200, img: 'x25.jpg' },
            ],
            'قسم المعلبات': [
                { name: 'طون سيدي بعلبك', price: 1750, img: 'x26.jpg' },
                { name: 'تونة أمريكانا', price: 2000, img: 'x27.jpg' },
                { name: 'حمص وفول حدائق كاليفورنيا', price: 1500, img: 'x28.jpg' },
                { name: 'صلصة طماطة', price: 1250, img: 'x29.jpg' },
                { name: 'بامية/سبانخ', price: 1000, img: 'x30.jpg' },
            ],
            'قسم المثلجات (الآيس كريم)': [
                { name: 'موطا شوكولاتة', price: 1000, img: 'x31.jpg' },
                { name: 'موطا فستق', price: 1250, img: 'x32.jpg' },
                { name: 'موطا موز', price: 1000, img: 'x33.jpg' },
                { name: 'موطا كاكاو أبيض', price: 1100, img: 'x34.jpg' },
                { name: 'موطا توت / فراولة', price: 1000, img: 'x35.jpg' },
            ],
            'قسم الحلويات والبسكويت': [
                { name: 'أوريو', price: 750, img: 'x36.jpg' },
                { name: 'سنيكرز', price: 1000, img: 'x37.jpg' },
                { name: 'مارس', price: 1000, img: 'x38.jpg' },
                { name: 'كتكات', price: 750, img: 'x39.jpg' },
            ],
            'قسم المخبوزات والمعجنات': [
                { name: 'خبز صمون', price: 500, img: 'x40.jpg' },
                { name: 'خبز لبناني', price: 750, img: 'x41.jpg' },
                { name: 'خبز تنور', price: 1000, img: 'x42.jpg' },
                { name: 'خبز باب الاغا', price: 1500, img: 'x43.jpg' },
            ],
            'قسم المواد الجافة والحبوب': [
                { name: 'عدس', price: 2500, img: 'x44.jpg' },
                { name: 'حمص', price: 3000, img: 'x45.jpg' },
                { name: 'ماش', price: 2750, img: 'x46.jpg' },
                { name: 'تمن', price: 3500, img: 'x47.jpg' },
                { name: 'برغل', price: 2000, img: 'x48.jpg' },
                { name: 'شعيرية', price: 750, img: 'x49.jpg' },
            ],
            'قسم البهارات': [
                { name: 'كمون', price: 1000, img: 'x50.jpg' },
                { name: 'كركم', price: 1250, img: 'x51.jpg' },
                { name: 'فلفل أسود', price: 1500, img: 'x52.jpg' },
                { name: 'دارسين (قرفة)', price: 1750, img: 'x53.jpg' },
                { name: 'بهارات دولمة', price: 2000, img: 'x54.jpg' },
            ],
            'قسم اللحوم والأسماك': [
                { name: 'لحم عجل/غنم محلي', price: 15000, img: 'x55.jpg' },
                { name: 'دجاج مجمد', price: 7500, img: 'x56.jpg' },
                { name: 'أسماك (شلك، كطان، زوري، بني، كارپ)', price: 10000, img: 'x57.jpg' },
            ],
            'قسم التنظيفات': [
                { name: 'تايد', price: 3500, img: 'x58.jpg' },
                { name: 'بونكس', price: 3000, img: 'x59.jpg' },
                { name: 'اريال', price: 4000, img: 'x60.jpg' },
                { name: 'فينش', price: 2500, img: 'x61.jpg' },
                { name: 'فيري', price: 1750, img: 'x62.jpg' },
                { name: 'ديو', price: 1000, img: 'x63.jpg' },
                { name: 'زاهي', price: 750, img: 'x64.jpg' },
            ],
        };

        const startButton = document.getElementById('startButton');
        const mainContent = document.getElementById('mainContent');
        const categoryList = document.getElementById('categoryList');
        const productLightbox = document.getElementById('productLightbox');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const productGrid = document.getElementById('productGrid');
        const closeLightboxBtn = document.querySelector('#productLightbox .close-btn');
        const quantityModal = document.getElementById('quantityModal');
        const quantityModalTitle = document.getElementById('quantityModalTitle');
        const productQuantityInput = document.getElementById('productQuantity');
        const increaseQuantityBtn = document.getElementById('increaseQuantity');
        const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
        const addFinalBtn = document.getElementById('addFinalBtn');
        const cancelFinalBtn = document.getElementById('cancelFinalBtn');
        const confirmationModal = document.getElementById('confirmationModal');
        const orderReviewList = document.getElementById('orderReviewList');
        const finalTotal = document.getElementById('finalTotal');
        const continueOrderingBtn = document.getElementById('continueOrderingBtn');
        const finalizeOrderBtn = document.getElementById('finalizeOrderBtn');
        const orderModal = document.getElementById('orderModal');
        const orderForm = document.getElementById('orderForm');
        const customerNameInput = document.getElementById('customerName');
        const customerPhoneInput = document.getElementById('customerPhone');
        const successModal = document.getElementById('successModal');
        const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
        const closeOrderModalBtn = document.getElementById('closeOrderModalBtn');
        const viewOrdersButton = document.getElementById('viewOrdersButton');
        const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');
        const loadingIndicator = document.getElementById('loadingIndicator');

        let cartItems = {};
        let currentProduct = null;
        let totalPrice = 0;
        
        // استبدل هذا الرابط برابط الـ Worker الخاص بك
        const WORKER_URL = 'https://iui.asdffdsa28er.workers.dev/';
        
        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            mainContent.classList.add('show-content');
            renderCategories();
        });
        
        viewOrdersButton.addEventListener('click', () => {
            if (Object.keys(cartItems).length > 0) {
                showConfirmationModal();
            } else {
                alert('سلة مشترياتك فارغة!');
            }
        });

        function renderCategories() {
            categoryList.innerHTML = '';
            for (const category in productsData) {
                const categoryItem = document.createElement('div');
                categoryItem.className = 'category-item';
                categoryItem.innerHTML = `<i class="fas fa-shopping-basket"></i><h3>${category}</h3>`;
                categoryItem.addEventListener('click', () => {
                    showProducts(category);
                });
                categoryList.appendChild(categoryItem);
            }
        }

        function showProducts(category) {
            lightboxTitle.textContent = category;
            productGrid.innerHTML = '';
            const categoryProducts = productsData[category];
            categoryProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card-lightbox';
                card.innerHTML = `
                    <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x150?text=صورة+غير+متوفرة'">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price.toLocaleString('ar-SY')} د.ع</p>
                    </div>
                `;
                card.addEventListener('click', () => {
                    currentProduct = product;
                    showQuantityModal(product.name);
                });
                productGrid.appendChild(card);
            });
            productLightbox.classList.add('show');
        }

        function showQuantityModal(productName) {
            quantityModalTitle.textContent = productName;
            productQuantityInput.value = 1;
            quantityModal.classList.add('show');
        }

        increaseQuantityBtn.addEventListener('click', () => {
            productQuantityInput.value = parseInt(productQuantityInput.value) + 1;
        });

        decreaseQuantityBtn.addEventListener('click', () => {
            const currentQuantity = parseInt(productQuantityInput.value);
            if (currentQuantity > 1) {
                productQuantityInput.value = currentQuantity - 1;
            }
        });

        addFinalBtn.addEventListener('click', () => {
            const quantity = parseInt(productQuantityInput.value);
            if (quantity > 0 && currentProduct) {
                if (cartItems[currentProduct.name]) {
                    cartItems[currentProduct.name].quantity += quantity;
                } else {
                    cartItems[currentProduct.name] = { 
                        quantity: quantity, 
                        price: currentProduct.price, 
                        name: currentProduct.name 
                    };
                }
                viewOrdersButton.style.display = 'flex'; // Show the view orders button
                updateTotalPrice();
            }
            quantityModal.classList.remove('show');
            productLightbox.classList.remove('show');
        });
        
        cancelFinalBtn.addEventListener('click', () => {
            quantityModal.classList.remove('show');
        });

        closeLightboxBtn.addEventListener('click', () => {
            productLightbox.classList.remove('show');
        });
        
        closeConfirmationBtn.addEventListener('click', () => {
            confirmationModal.classList.remove('show');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && productLightbox.classList.contains('show')) {
                productLightbox.classList.remove('show');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && quantityModal.classList.contains('show')) {
                quantityModal.classList.remove('show');
            }
        });
        
        continueOrderingBtn.addEventListener('click', () => {
            confirmationModal.classList.remove('show');
            // Scroll to the categories section
            const categorySection = document.querySelector('.products-section');
            categorySection.scrollIntoView({ behavior: 'smooth' });
        });
        
        finalizeOrderBtn.addEventListener('click', () => {
            confirmationModal.classList.remove('show');
            orderModal.classList.add('show');
        });

        function showConfirmationModal() {
            orderReviewList.innerHTML = '';
            updateTotalPrice();
            for (const name in cartItems) {
                const item = cartItems[name];
                const li = document.createElement('li');
                li.innerHTML = `
                    <h4>${item.name} (${item.quantity} قطعة)</h4>
                    <div class="item-actions">
                        <span class="price">${(item.quantity * item.price).toLocaleString('ar-SY')} د.ع</span>
                        <button onclick="removeItem('${name}')"><i class="fas fa-trash-alt"></i></button>
                    </div>
                `;
                orderReviewList.appendChild(li);
            }
            finalTotal.textContent = `المجموع الإجمالي: ${totalPrice.toLocaleString('ar-SY')} د.ع`;
            confirmationModal.classList.add('show');
        }
        
        function updateTotalPrice() {
            totalPrice = 0;
            for (const name in cartItems) {
                const item = cartItems[name];
                totalPrice += item.quantity * item.price;
            }
        }
        
        function removeItem(name) {
            delete cartItems[name];
            if (Object.keys(cartItems).length === 0) {
                confirmationModal.classList.remove('show');
                viewOrdersButton.style.display = 'none';
                alert('سلة مشترياتك أصبحت فارغة.');
            } else {
                showConfirmationModal(); // Re-render the modal after removal
            }
        }
        
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = customerNameInput.value;
            const phone = customerPhoneInput.value;

            const orderDetails = {
                customer: {
                    name: name,
                    phone: phone,
                },
                items: cartItems,
                total: totalPrice,
                totalFormatted: `${totalPrice.toLocaleString('ar-SY')} د.ع`
            };

            // Show loading indicator
            loadingIndicator.style.display = 'block';
            orderModal.classList.remove('show');
            
            try {
                // إرسال الطلب إلى Worker
                const response = await fetch(WORKER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails),
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log('Order sent successfully:', result);
                    
                    // Show success modal
                    successModal.classList.add('show');
                    
                    // Resetting state
                    cartItems = {};
                    totalPrice = 0;
                    viewOrdersButton.style.display = 'none';
                    orderForm.reset();
                } else {
                    throw new Error('فشل في إرسال الطلب');
                }
            } catch (error) {
                console.error('Error sending order:', error);
                alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
            } finally {
                // Hide loading indicator
                loadingIndicator.style.display = 'none';
            }
        });

        closeSuccessModalBtn.addEventListener('click', () => {
            successModal.classList.remove('show');
            startButton.style.display = 'block';
            mainContent.classList.remove('show-content');
        });

        closeOrderModalBtn.addEventListener('click', () => {
            orderModal.classList.remove('show');
        });
        
        // جعل الدوال متاحة عالمياً للاستخدام في الأحداث
        window.removeItem = removeItem;

    </script>
</body>
</html>
