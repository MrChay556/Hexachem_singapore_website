import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle
} from "lucide-react";
import whatsappQrCode from "../../assets/whatsapp-qr.svg";

export default function ContactSection() {
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
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about our products or services? Reach out to our team for personalized assistance
            or chat with our molecular assistant to get quick answers about our chemical solutions.
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
                  <h4 className="text-lg font-semibold">Our Location</h4>
                  <p className="text-gray-600">NO.3, SOON LEE STREET, PIONEER JUNCTION, #05-03, SINGAPORE - 627606</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Phone Number</h4>
                  <p className="text-gray-600">TEL: +65 6684 1780</p>
                  <p className="text-gray-600">FAX: +65 6684 1781</p>
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
            
            {/* WhatsApp QR Code - Using SVG for a placeholder QR code */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M40 40H60V60H40V40ZM60 60H80V80H60V60ZM40 80H60V100H40V80ZM60 100H80V120H60V100ZM40 120H60V140H40V120ZM60 140H80V160H60V140ZM80 40H100V60H80V40ZM120 40H140V60H120V40ZM140 60H160V80H140V60ZM80 80H100V100H80V80ZM120 80H140V100H120V80ZM80 120H100V140H80V120ZM120 120H140V140H120V120ZM80 140H100V160H80V140ZM120 140H140V160H120V140ZM140 140H160V160H140V140Z" fill="#1A56DB"/>
                <rect x="90" y="90" width="20" height="20" fill="#1A56DB"/>
                <path d="M90 40H120V60H90V40Z" fill="#1A56DB"/>
                <path d="M40 160H80V180H40V160Z" fill="#1A56DB"/>
                <path d="M120 160H160V180H120V160Z" fill="#1A56DB"/>
                <path d="M160 40H180V80H160V40Z" fill="#1A56DB"/>
                <path d="M160 120H180V160H160V120Z" fill="#1A56DB"/>
              </svg>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="https://wa.me/6583063522" 
                target="_blank" 
                rel="noopener noreferrer"
                className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold flex items-center transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm6.262 17.577c-.276.782-.782 1.462-1.372 1.958-.59.495-1.289.777-2.064.852-.729.067-1.43.034-2.113-.252-3.35-1.43-5.512-4.777-5.682-5.005-.166-.223-1.348-1.791-1.348-3.415 0-1.625.85-2.423 1.15-2.756.298-.333.645-.382.865-.382.22 0 .442 0 .635.015.207.008.488-.058.765.584.293.675 1 2.344 1.084 2.516.083.17.139.378.021.596-.118.218-.177.338-.346.532-.17.195-.361.437-.52.588-.173.168-.354.348-.151.683.202.336.899 1.436 1.932 2.328 1.324 1.142 2.444 1.494 2.794 1.659.347.166.55.151.753-.042.205-.195.877-.932 1.114-1.252.236-.32.472-.264.795-.158.323.106 2.051.967 2.405 1.143.354.176.59.26.678.408.083.151.083.872-.197 1.715z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <p className="text-center text-gray-600 text-sm sm:text-left">
                Direct Line: <span className="font-medium">+65 8306 3522</span>
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <MessageCircle className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-bold">Chat With Our AI Assistant</h3>
          </div>
          
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Look for our molecular mascot in the corner! Our AI-powered assistant can help answer your
            questions about our products, services, and chemical solutions. Try asking about our
            different chemical categories, applications, or sustainability initiatives.
          </p>
          
          <div className="flex justify-center">
            <div className="max-w-md bg-primary/5 p-6 rounded-lg">
              <p className="text-primary font-medium mb-2">Try asking questions like:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• "What types of chemicals does Hexachem offer?"</li>
                <li>• "Tell me about your solvent recycling capabilities."</li>
                <li>• "What industries do you work with?"</li>
                <li>• "What makes Hexachem unique in the market?"</li>
              </ul>
            </div>
          </div>
        </motion.div>
        
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