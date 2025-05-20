import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle
} from "lucide-react";

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Location</h3>
            <p className="text-gray-600">NO.3, SOON LEE STREET, PIONEER JUNCTION, #05-03, SINGAPORE - 627606</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone Number</h3>
            <p className="text-gray-600">TEL: +65 6684 1780</p>
            <p className="text-gray-600">FAX: +65 6684 1781</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Address</h3>
            <p className="text-gray-600">sales@hexachem.sg</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Business Hours</h3>
            <p className="text-gray-600">Monday - Friday:</p>
            <p className="text-gray-600">9am - 6pm</p>
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