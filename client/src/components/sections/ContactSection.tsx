import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle
} from "lucide-react";
import whatsappQrCode from "../../assets/whatsapp-real-qr.png";
import { useTranslation } from "../../contexts/TranslationContext";

export default function ContactSection() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Left Side: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">{t('contact.location')}</h4>
                  <p className="text-gray-600">{t('contact.address')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">{t('contact.phone')}</h4>
                  <p className="text-gray-600">{t('contact.phoneNumber')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Email Address</h4>
                  <p className="text-gray-600">hexasales@hexachem.sg</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Business Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side: WhatsApp QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Connect on WhatsApp</h3>
            <p className="text-gray-600 text-center mb-6">Scan the QR code to chat with us directly on WhatsApp</p>
            
            {/* WhatsApp QR Code */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <img 
                src={whatsappQrCode} 
                alt="WhatsApp QR Code" 
                width="200" 
                height="200"
                className="mx-auto"
              />
            </div>
            
            <div className="flex justify-center">
              <a 
                href="https://wa.me/6583063522" 
                target="_blank" 
                rel="noopener noreferrer"
                className="py-3 px-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-medium flex items-center transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.4539 3.54523C18.2166 1.30308 15.2128 0.0488281 12.0055 0.0488281C5.4457 0.0488281 0.102616 5.39069 0.102616 11.9526C0.102616 14.0618 0.662843 16.1213 1.7216 17.9379L0 24.0488L6.24766 22.3606C7.99672 23.3219 9.97889 23.8323 12.0012 23.8327H12.0055C18.5636 23.8327 23.9067 18.4909 23.9067 11.9288C23.9067 8.72305 22.6914 5.78738 20.4539 3.54523ZM12.0055 21.8202H12.002C10.2103 21.8197 8.45406 21.3309 6.92016 20.4126L6.56122 20.1975L2.842 21.1766L3.83772 17.5448L3.60154 17.1724C2.58868 15.5845 2.05232 13.7982 2.05275 11.9526C2.05275 6.49553 6.55 2.0014 12.009 2.0014C14.6631 2.0014 17.1567 3.03808 19.0162 4.90018C20.8758 6.76229 21.9069 9.25747 21.9065 11.9284C21.9065 17.3871 17.4611 21.8202 12.0055 21.8202ZM17.4464 14.4471C17.1432 14.2956 15.6873 13.5782 15.4082 13.4769C15.1293 13.3754 14.9262 13.3249 14.7233 13.6284C14.5203 13.9318 13.9522 14.5989 13.7734 14.8021C13.5945 15.0052 13.4157 15.0301 13.1127 14.8782C12.8096 14.7265 11.8568 14.4182 10.7381 13.4266C9.86322 12.6547 9.26531 11.7072 9.08646 11.4038C8.90761 11.1003 9.06666 10.9357 9.21962 10.7848C9.35716 10.6486 9.52446 10.433 9.67908 10.2542C9.8337 10.0754 9.88463 9.94874 9.98603 9.74575C10.0874 9.54275 10.0365 9.36405 9.96093 9.21244C9.88463 9.06084 9.29035 7.60303 9.03817 6.9956C8.79208 6.40473 8.54207 6.4869 8.35365 6.47879C8.17479 6.4711 8.00261 6.47131 7.8269 6.47131C7.68935 6.47131 7.46096 6.53744 7.18201 6.84077C6.90346 7.1441 6.13675 7.8614 6.13675 9.31922C6.13675 10.777 7.20727 12.1846 7.36189 12.3876C7.51651 12.5906 9.25885 15.2588 11.9011 16.5671C14.5433 17.8754 14.5433 17.427 15.1004 17.3764C15.6576 17.3257 16.8678 16.6589 17.1201 15.9499C17.3723 15.2411 17.3723 14.6337 17.296 14.5029C17.2198 14.3721 17.0166 14.299 16.7136 14.1471H17.4464V14.4471Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
        

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe 
              title="Hexachem Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2043.5111530592844!2d103.69622065741115!3d1.3338924179783453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b6b0fb2997%3A0x5670a3a787c39050!2sHexachem%20(S)%20Pte.%20Ltd.!5e1!3m2!1sen!2ssg!4v1747724909503!5m2!1sen!2ssg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}