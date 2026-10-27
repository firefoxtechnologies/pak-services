export type Lang = "en" | "ur";

export interface Service { cat: string; icon: string; en: string; ur: string; den: string; dur: string; from: string }
interface Need { en: string[]; ur: string[] }

/* =====================================================================
   EDIT HERE — ALL YOUR BUSINESS DATA LIVES IN src/data/
   ===================================================================== */
export const CONFIG = {
  name: "Pak Services",
  whatsapp: "923002141517",          // ← YOUR WHATSAPP NUMBER: country code, no + or 0 (0300-2141517 → 923002141517)
  displayPhone: "0300-2141517",
  email: "info@thepakservices.com",  // ← receives the contact-form emails
  /* Form-to-email service. FormSubmit is free: the FIRST submission sends an activation email to the
     address above; click the link in it once and every later enquiry arrives in that inbox. */
  formEndpoint: "https://formsubmit.co/ajax/info@thepakservices.com",
  facebook: "https://www.facebook.com/pakservicespvtltd", // ← your Facebook page
  instagram: "https://www.instagram.com/pakservices2026/", // ← your Instagram page
  address: "Pak Services, Plot SD-15, Block A, North Nazimabad, Karachi 74600, Pakistan", // ← pinned on the map + directions link
  mapLat: 24.926956, mapLng: 67.029742,   // ← exact Google Maps pin of the office
  membershipForm: "https://docs.google.com/forms/d/e/1FAIpQLSfimS2eB-t0jJR9aJKxqEmsw63EZdQaDGOqlae7u53b0sKHSw/viewform", // ← public (viewform) link of your membership Google Form
  affiliationForm: "https://forms.gle/hi7S76iNokqHo2kF8", // ← business affiliation / partner Google Form
  channel: "https://whatsapp.com/channel/0029VbDUAD62ZjCeYYV25h0q", // ← your WhatsApp Channel
  phoneTel: "+923002141517",         // ← number used by the "Call now" buttons
  /* Top announcement bar. Set to null to hide it. Change the text for deadlines/offers. */
  announcement: {
    en: "🎉 Join Pak Services Membership — save 5% to 30% at partner businesses.",
    ur: "🎉 پاک سروسز ممبرشپ میں شامل ہوں — پارٹنر کاروباروں پر 5% سے 30% بچت۔"
  }
};

export const CITIES = [
  { img:"assets/cities/karachi.jpg", en:"Karachi",    ur:"کراچی",     live:true  },
  { img:"assets/cities/lahore.jpg", en:"Lahore",     ur:"لاہور",     live:false },
  { img:"assets/cities/islamabad.jpg", en:"Islamabad",  ur:"اسلام آباد", live:false },
  { img:"assets/cities/rawalpindi.jpg", en:"Rawalpindi", ur:"راولپنڈی",  live:false },
  { img:"assets/cities/faisalabad.jpg", en:"Faisalabad", ur:"فیصل آباد", live:false },
  { img:"assets/cities/multan.jpg", en:"Multan",     ur:"ملتان",     live:false },
  { img:"assets/cities/peshawar.jpg", en:"Peshawar",   ur:"پشاور",     live:false },
  { img:"assets/cities/quetta.jpg", en:"Quetta",     ur:"کوئٹہ",     live:false }
];

export const SLABS: [number, number, number][] = [
  [600000, 0, 0], [1200000, 0.01, 0], [2200000, 0.11, 6000],
  [3200000, 0.23, 116000], [4100000, 0.30, 346000], [Infinity, 0.35, 616000]
];
export const SURCHARGE = { above: 10000000, rate: 0.10 }; // extra 10% of tax if annual income exceeds Rs. 10M

export const CATEGORIES = [
  { id: "all",      en: "All",             ur: "تمام" },
  { id: "home",     en: "Home & Property", ur: "گھر اور پراپرٹی" },
  { id: "legal",    en: "Legal & Govt.",   ur: "قانونی و سرکاری" },
  { id: "business", en: "Business",        ur: "کاروبار" }
];

export const SERVICES: Service[] = [
  { cat:"home",     icon:"🏠", en:"Home Maintenance",     ur:"گھر کی دیکھ بھال",   den:"Complete upkeep and repair for your home.",            dur:"آپ کے گھر کی مکمل مرمت اور دیکھ بھال۔", from:"" },
  { cat:"home",     icon:"⚡", en:"Electrical Services",  ur:"الیکٹریکل سروسز",     den:"Wiring, fittings, repairs and safety checks.",         dur:"وائرنگ، فٹنگ، مرمت اور حفاظتی معائنہ۔", from:"" },
  { cat:"home",     icon:"🚰", en:"Plumbing",             ur:"پلمبنگ",              den:"Leaks, fittings, bathrooms and water systems.",        dur:"لیکیج، فٹنگ، باتھ روم اور پانی کا نظام۔", from:"" },
  { cat:"home",     icon:"🏗️", en:"Construction",         ur:"تعمیرات",             den:"Reliable construction and structural work.",           dur:"قابلِ اعتماد تعمیراتی کام۔", from:"" },
  { cat:"home",     icon:"🎨", en:"Renovation & Painting",ur:"تزئین و آرائش اور پینٹنگ",den:"Fresh paint, remodeling and finishing work.",         dur:"نیا رنگ، تزئین و آرائش اور فنشنگ۔", from:"" },
  { cat:"home",     icon:"🏡", en:"Property Consultancy", ur:"پراپرٹی کنسلٹنسی",    den:"Guidance on buying, selling and renting property.",    dur:"پراپرٹی خریدنے، بیچنے اور کرائے پر رہنمائی۔", from:"" },
  { cat:"legal",    icon:"⚖️", en:"Legal Services",       ur:"قانونی خدمات",        den:"Professional legal advice and documentation.",         dur:"پیشہ ورانہ قانونی مشورہ اور دستاویزات۔", from:"" },
  { cat:"legal",    icon:"👮", en:"Police Verification",  ur:"پولیس ویریفکیشن",     den:"Hassle-free police verification support.",             dur:"آسان پولیس ویریفکیشن میں مدد۔", from:"" },
  { cat:"legal",    icon:"🧾", en:"FBR Services",         ur:"ایف بی آر سروسز",     den:"NTN, tax filing and FBR-related support.",             dur:"این ٹی این، ٹیکس فائلنگ اور ایف بی آر معاونت۔", from:"" },
  { cat:"business", icon:"🏢", en:"Business Registration",ur:"کاروباری رجسٹریشن",   den:"Company, firm and business registration.",             dur:"کمپنی، فرم اور کاروبار کی رجسٹریشن۔", from:"" },
  { cat:"business", icon:"💳", en:"Membership Program",   ur:"ممبرشپ پروگرام",      den:"Silver, Gold and Elite member discounts.",             dur:"سلور، گولڈ اور ایلیٹ ممبر ڈسکاؤنٹس۔", from:"5% – 30% off" },
  { cat:"business", icon:"➕", en:"And Many More",        ur:"اور بہت کچھ",         den:"Need something else? Tell us and we'll arrange it.",   dur:"کچھ اور چاہیے؟ ہمیں بتائیں، ہم انتظام کریں گے۔", from:"" }
];

export const DETAILS_DEFAULT: Need = { en:["Your location / address","A short description of what you need","Preferred date and time"],
                          ur:["آپ کا مقام / پتہ","ضرورت کی مختصر تفصیل","پسندیدہ تاریخ اور وقت"] };
const HOME_NEED: Need = { en:["Address and area","Photos or a short description of the issue","Preferred date and time"],
                    ur:["پتہ اور علاقہ","مسئلے کی تصاویر یا مختصر تفصیل","پسندیدہ تاریخ اور وقت"] };
export const DETAILS: Record<string, Need> = {
  "Home Maintenance":{...HOME_NEED}, "Electrical Services":{...HOME_NEED}, "Plumbing":{...HOME_NEED},
  "Renovation & Painting":{ en:["Address and area","Size of the space / rooms","Photos and your color or design ideas","Preferred start date"], ur:["پتہ اور علاقہ","جگہ / کمروں کا سائز","تصاویر اور رنگ یا ڈیزائن کی پسند","شروع کرنے کی تاریخ"] },
  "Construction":{ en:["Plot / site location and size","Drawings or your requirements","Approximate budget","Expected timeline"], ur:["پلاٹ / سائٹ کا مقام اور سائز","نقشہ یا آپ کی ضروریات","اندازاً بجٹ","متوقع مدت"] },
  "Property Consultancy":{ en:["Buy, sell or rent?","Area and property type","Budget","Ownership documents (if selling / renting)"], ur:["خریدنا، بیچنا یا کرائے پر؟","علاقہ اور پراپرٹی کی قسم","بجٹ","ملکیتی دستاویزات (بیچنے / کرائے پر دینے کی صورت میں)"] },
  "Legal Services":{ en:["A short summary of your matter","Any notices, agreements or documents","Copy of your CNIC","Preferred time for a call"], ur:["معاملے کا مختصر خلاصہ","نوٹس، معاہدے یا دستاویزات","شناختی کارڈ کی کاپی","کال کے لیے پسندیدہ وقت"] },
  "Police Verification":{ en:["CNIC copy","Passport-size photos","Current and permanent address","Purpose (job, tenant, etc.)"], ur:["شناختی کارڈ کی کاپی","پاسپورٹ سائز تصاویر","موجودہ اور مستقل پتہ","مقصد (نوکری، کرایہ دار وغیرہ)"] },
  "FBR Services":{ en:["CNIC copy and mobile number","Salary slips / income details","Bank statements (if any)","Previous return, if you have filed before"], ur:["شناختی کارڈ کی کاپی اور موبائل نمبر","تنخواہ کی سلپ / آمدن کی تفصیل","بینک اسٹیٹمنٹ (اگر ہو)","پچھلا ریٹرن (اگر فائل کیا ہو)"] },
  "Business Registration":{ en:["CNIC copies of owners / directors","2–3 proposed business names","Business address","Email address and mobile number"], ur:["مالکان / ڈائریکٹرز کے شناختی کارڈ","کاروبار کے 2–3 مجوزہ نام","کاروبار کا پتہ","ای میل اور موبائل نمبر"] },
  "Membership Program":{ en:["Your name and mobile number","Preferred tier: Silver, Gold or Elite"], ur:["آپ کا نام اور موبائل نمبر","پسندیدہ ٹیر: سلور، گولڈ یا ایلیٹ"] }
};

export const TIERS = [
  { cls:"silver", icon:"⭐", en:"Silver",  ur:"سلور",  off:"5% – 10%",  lo:5,  hi:10 },
  { cls:"gold",   icon:"👑", en:"Gold",    ur:"گولڈ",  off:"10% – 20%", lo:10, hi:20 },
  { cls:"elite",  icon:"💎", en:"Elite",   ur:"ایلیٹ", off:"20% – 30%", lo:20, hi:30 }
];

/* Google reviews shown in the Testimonials rotator */
export const REVIEWS = [
  { name: "Asghar Mughal", text: "Best people and satisfying services highly appreciated thanks 😊" },
  { name: "Abdul Rehman Qureshi", text: "Good service" }
];
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Pak+Services/@24.9305096,67.0359526,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33fcd926975cb:0x8fac61656bd054c7!8m2!3d24.9305096!4d67.0359526";

export const GRADS = ["linear-gradient(135deg,#0a1f44,#1e6fe0)","linear-gradient(135deg,#0f6b2c,#1b8a3a 60%,#0a1f44)","linear-gradient(135deg,#6b4e0c,#9a7420 55%,#0a1f44)",
  "linear-gradient(135deg,#102a5c,#6d3fc9)","linear-gradient(135deg,#0a1f44,#0f6b2c)","linear-gradient(135deg,#8a1f3a,#0a1f44)"];

/* Real-life photo for each service (no people). Files live in public/assets/services/ — see CREDITS.txt there. */
export const SERVICE_IMG: Record<string, string> = {
  "Home Maintenance": "home", "Electrical Services": "electrical", "Plumbing": "plumbing", "Construction": "construction",
  "Renovation & Painting": "painting", "Property Consultancy": "property", "Legal Services": "legal", "Police Verification": "police",
  "FBR Services": "fbr", "Business Registration": "business", "Membership Program": "membership", "And Many More": "more"
};
export const serviceImg = (en: string) => `/assets/services/${SERVICE_IMG[en] ?? "more"}.jpg`;
