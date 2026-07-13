import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ShoppingCart, Percent, ArrowLeft, ArrowRight, ShieldCheck, CreditCard, Clock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartView: React.FC = () => {
  const {
    language,
    cart,
    removeFromCart,
    applyCoupon,
    currentDiscount,
    currentCoupon,
    createOrder,
    completePayment,
    setActivePage
  } = useApp();

  const isRtl = language === 'fa';
  
  // Local checkout states
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponErr, setCouponErr] = useState('');
  
  // Payment gateway modal state
  const [activeOrder, setActiveOrder] = useState<any | null>(null);
  const [showGateway, setShowGateway] = useState(false);

  // Rial gateway form states
  const [cardNumber, setCardNumber] = useState('');
  const [cvv2, setCvv2] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Math totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotalRial = cart.reduce((sum, item) => sum + (item.priceRial * item.quantity), 0);
  
  const discountAmount = subtotal * currentDiscount;
  const discountAmountRial = subtotalRial * currentDiscount;

  const total = subtotal - discountAmount;
  const totalRial = subtotalRial - discountAmountRial;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMsg(isRtl ? res.messageFa : res.message);
      setCouponErr('');
    } else {
      setCouponErr(isRtl ? res.messageFa : res.message);
      setCouponMsg('');
    }
  };

  const handleCheckoutClick = () => {
    const order = createOrder();
    if (order) {
      setActiveOrder(order);
      setShowGateway(true);
    }
  };

  const handlePaymentSuccess = () => {
    if (!activeOrder) return;
    const trackingNo = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;
    completePayment(activeOrder.id, trackingNo, true);
    setShowGateway(false);
    setActiveOrder(null);
    setActivePage('dashboard');
  };

  const handlePaymentCancel = () => {
    if (!activeOrder) return;
    completePayment(activeOrder.id, '', false);
    setShowGateway(false);
    setActiveOrder(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-12 animate-fade-in" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col gap-3">
        <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'ثبت سفارش و پرداخت ایمن' : 'CHECKOUT SYSTEM'}</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
          {isRtl ? 'سبد خرید و صندوق پرداخت' : 'Your Shopping Cart'}
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 border rounded-2xl flex flex-col items-center gap-5">
          <ShoppingCart className="h-12 w-12 text-stone-400" />
          <h3 className="font-serif text-lg font-bold text-stone-800">
            {isRtl ? 'سبد خرید شما خالی است' : 'Your cart is empty'}
          </h3>
          <p className="text-xs text-stone-500">
            {isRtl ? 'جهت مطالعه آنلاین یا خرید پی‌دی‌اف، کتاب‌ها را انتخاب کنید.' : 'Browse the library and add books or membership plans to continue.'}
          </p>
          <button
            onClick={() => setActivePage('books')}
            className="rounded bg-stone-900 text-white font-medium px-6 py-3 text-xs uppercase"
            id="cart-empty-browse-btn"
          >
            {isRtl ? 'بررسی کتابخانه و کتاب‌ها' : 'Explore Library'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart items list (Col 1) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-5 bg-white border border-stone-200/60 rounded-xl shadow-luxury"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                    {item.type === 'membership' ? (isRtl ? 'طرح عضویت ویژه' : 'Membership Plan') : (isRtl ? 'نسخه کامل پی‌دی‌اف' : 'Book PDF Edition')}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-stone-950">
                    {isRtl ? item.titleFa : item.title}
                  </h3>
                  <span className="text-xs text-stone-500">
                    {isRtl ? `تعداد: ${item.quantity.toLocaleString('fa-IR')}` : `Qty: ${item.quantity}`}
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <span className="text-sm font-bold text-stone-900" dir="ltr">
                    {isRtl ? `${(item.priceRial * item.quantity).toLocaleString('fa-IR')} تومان` : `$${(item.price * item.quantity).toFixed(2)}`}
                  </span>

                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-stone-400 hover:text-red-500 transition-colors"
                    id={`cart-delete-${idx}`}
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing summary & promo details (Col 2) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-luxury flex flex-col gap-5">
              <h3 className="font-serif text-sm font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'خلاصه فاکتور خرید' : 'Order Invoice'}</h3>
              
              {/* Promo input field */}
              <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'کد تخفیف (کوپن):' : 'Promo Coupon Code:'}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. SHIFA50"
                    className="w-full rounded border border-stone-200 px-3 py-2 text-xs focus:outline-none placeholder-stone-400 uppercase font-semibold"
                    id="coupon-input-field"
                  />
                  <button
                    type="submit"
                    className="rounded bg-stone-950 hover:bg-stone-800 text-white font-semibold text-xs px-4 py-2 uppercase transition-all"
                    id="coupon-apply-btn"
                  >
                    {isRtl ? 'اعمال' : 'Apply'}
                  </button>
                </div>
                {couponMsg && <span className="text-[10px] text-emerald-600 font-semibold">{couponMsg}</span>}
                {couponErr && <span className="text-[10px] text-red-500 font-semibold">{couponErr}</span>}
                <span className="text-[9px] text-stone-400 italic">
                  {isRtl ? 'از کد تخفیف SHIFA50 برای ۵۰ درصد تخفیف استفاده کنید.' : 'Use coupon code SHIFA50 for 50% discount.'}
                </span>
              </form>

              {/* Invoicing Breakdown */}
              <div className="flex flex-col gap-3.5 border-t border-stone-100 pt-5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{isRtl ? 'مجموع سبد خرید:' : 'Subtotal:'}</span>
                  <span dir="ltr">{isRtl ? `${subtotalRial.toLocaleString('fa-IR')} تومان` : `$${subtotal.toFixed(2)}`}</span>
                </div>

                {currentDiscount > 0 && (
                  <div className="flex justify-between text-amber-600 font-semibold">
                    <span>{isRtl ? `تخفیف (${(currentDiscount * 100).toLocaleString('fa-IR')}٪ - ${currentCoupon}):` : `Discount (${currentDiscount * 100}% - ${currentCoupon}):`}</span>
                    <span dir="ltr">-{isRtl ? `${discountAmountRial.toLocaleString('fa-IR')} تومان` : `$${discountAmount.toFixed(2)}`}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-stone-100 pt-4 text-sm font-bold text-stone-950">
                  <span>{isRtl ? 'مبلغ نهایی قابل پرداخت:' : 'Grand Total Amount:'}</span>
                  <span dir="ltr" className="text-amber-600">
                    {isRtl ? `${totalRial.toLocaleString('fa-IR')} تومان` : `$${total.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full rounded-lg bg-stone-900 hover:bg-amber-600 text-white font-bold py-3.5 text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                id="cart-checkout-btn"
              >
                <CreditCard className="h-4 w-4" />
                <span>{isRtl ? 'انتقال به درگاه پرداخت ریالی' : 'Checkout & Proceed to Payment'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LUXURIOUS PERSIA SHAPARAK PAYMENT GATEWAY SIMULATION */}
      <AnimatePresence>
        {showGateway && activeOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 font-fa-only"
            dir="rtl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-stone-100 rounded-xl overflow-hidden shadow-2xl border border-stone-300 max-w-2xl w-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Shaparak branding Header */}
              <div className="bg-amber-600 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-amber-600 font-bold">
                    ش
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-wide">درگاه پرداخت الکترونیک شاپرک (شبیه‌ساز)</span>
                    <span className="text-[10px] text-amber-100">سامانه شبکه پرداخت الکترونیکی کارت‌های بانکی</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] bg-amber-700 rounded px-2.5 py-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>زمان باقی‌مانده: ۹:۵۹</span>
                </div>
              </div>

              {/* Invoice snapshot */}
              <div className="bg-amber-50 p-4 border-b border-amber-200/50 flex flex-wrap justify-between items-center text-xs text-stone-700 gap-4">
                <div>
                  <span className="text-stone-400">نام پذیرنده:</span>{' '}
                  <span className="font-bold text-stone-900">انتشارات روانشناختی آنیا راد</span>
                </div>
                <div>
                  <span className="text-stone-400">شماره سفارش:</span>{' '}
                  <span className="font-mono text-stone-950">{activeOrder.id}</span>
                </div>
                <div>
                  <span className="text-stone-400">مبلغ پرداخت:</span>{' '}
                  <span className="font-bold text-amber-700 text-sm">{activeOrder.totalAmountRial.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>

              {/* Shaparak payment card details layout */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white text-stone-800">
                
                {/* Form fields */}
                <div className="md:col-span-8 flex flex-col gap-4">
                  
                  {/* Card number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-700">شماره کارت ۱۶ رقمی بانکی:</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        // Format card number 6104-3377-...
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1-').trim();
                        setCardNumber(val.endsWith('-') ? val.slice(0, -1) : val);
                      }}
                      placeholder="۶۱۰۴-۳۳۷۷-۸۸۹۹-۰۰۱۱"
                      className="rounded border border-stone-300 px-3 py-2.5 text-center font-mono text-sm font-semibold tracking-widest focus:outline-none focus:border-amber-500 bg-stone-50"
                      required
                    />
                  </div>

                  {/* CVV2 and Expiry */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-stone-700">کد امنیتی CVV2:</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cvv2}
                        onChange={(e) => setCvv2(e.target.value.replace(/\D/g, ''))}
                        placeholder="۱۲۳"
                        className="rounded border border-stone-300 px-3 py-2.5 text-center font-mono text-sm tracking-widest focus:outline-none focus:border-amber-500 bg-stone-50"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-stone-700">تاریخ انقضای کارت:</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          maxLength={2}
                          value={expMonth}
                          onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, ''))}
                          placeholder="ماه"
                          className="w-1/2 rounded border border-stone-300 px-2 py-2.5 text-center font-mono text-xs focus:outline-none bg-stone-50"
                          required
                        />
                        <span className="text-stone-300">/</span>
                        <input
                          type="text"
                          maxLength={2}
                          value={expYear}
                          onChange={(e) => setExpYear(e.target.value.replace(/\D/g, ''))}
                          placeholder="سال"
                          className="w-1/2 rounded border border-stone-300 px-2 py-2.5 text-center font-mono text-xs focus:outline-none bg-stone-50"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* OTP password area */}
                  <div className="flex flex-col gap-1.5 border-t border-stone-100 pt-4 mt-1">
                    <label className="text-xs font-bold text-stone-700">رمز پویا (رمز دوم):</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="رمز پویا پیامک‌شده..."
                        className="w-full rounded border border-stone-300 px-3 py-2.5 text-center font-mono text-sm tracking-widest focus:outline-none focus:border-amber-500 bg-stone-50"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(true);
                          setOtpCode('123456'); // Simulated fill
                          alert('رمز دوم پویای شبیه‌ساز با موفقیت ارسال شد و در فیلد رمز پویا قرار گرفت (رمز: 123456)');
                        }}
                        className="rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-4 py-2 shrink-0 transition-all"
                        id="payment-otp-request"
                      >
                        {otpSent ? 'ارسال مجدد رمز' : 'درخواست رمز پویا'}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Secure instructions helper sidebar */}
                <div className="md:col-span-4 flex flex-col gap-4 text-xs text-stone-500 border-r border-stone-100 pr-4 leading-relaxed">
                  <div className="flex gap-2 items-start text-stone-700">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-bold">راهنمای پرداخت ایمن:</span>
                  </div>
                  <p>۱. لطفاً پیش از وارد کردن اطلاعات، آدرس مرورگر خود را جهت وجود پروتکل امن HTTPS و عبارت shaparak.ir بررسی فرمایید.</p>
                  <p>۲. رمز پویای بانکی شما صرفاً از طریق پیامک رسمی بانک صادرکننده کارت معتبر است.</p>
                  <p>۳. این یک شبیه‌ساز رسمی جهت تست فرایند پرداخت و فعال‌سازی خودکار اشتراک و دسترسی‌های دانلود روی پلتفرم آنیا راد می‌باشد.</p>
                </div>

              </div>

              {/* Payments portal footer actions */}
              <div className="bg-stone-100 p-5 border-t border-stone-200 flex justify-end gap-3.5">
                <button
                  onClick={handlePaymentSuccess}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 shadow transition-colors flex items-center gap-1.5"
                  id="payment-portal-success"
                >
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span>پرداخت موفق (شبیه‌ساز)</span>
                </button>

                <button
                  onClick={handlePaymentCancel}
                  className="rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 transition-colors"
                  id="payment-portal-cancel"
                >
                  انصراف از پرداخت
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
