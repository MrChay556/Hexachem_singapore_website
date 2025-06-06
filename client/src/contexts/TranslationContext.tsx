import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
];

// Translations for the site
export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.industries': 'Industries',
    'nav.sustainability': 'Sustainability',
    'nav.contact': 'Contact',
    
    // Product Modal
    'products.noProductsFound': 'No products found',
    'products.tryAdjusting': 'Try adjusting your search terms',
    
    // Hero Section
    'hero.title': 'Quality Chemical Distribution',
    'hero.subtitle': 'Leading chemical distribution company with operations across Southeast Asia, providing innovative solutions and quality products to diverse industries.',
    'hero.learnMore': 'LEARN MORE',
    'hero.contactUs': 'CONTACT US',
    
    // About Section
    'about.title': 'About Hexachem',
    'about.subtitle': 'Your reliable chemical solution provider',
    'about.description1': 'Hexachem (S) Pte Ltd is a leading chemical distribution company headquartered in Singapore with operations across Southeast Asia.',
    'about.description2': 'With more than 20 years of experience, we specialize in distributing high-quality chemicals and innovative solutions to various industries including food, pharmaceutical, and manufacturing sectors.',
    'about.vision': 'Our Vision',
    'about.visionText': 'To be the most trusted and innovative chemical solutions partner in Southeast Asia.',
    'about.mission': 'Our Mission',
    'about.missionText': 'To provide sustainable, high-quality chemical products and solutions that enhance our customers\' processes and products while maintaining the highest standards of safety and environmental responsibility.',
    'about.values': 'Our Values',
    'about.integrity': 'Integrity',
    'about.integrityText': 'We conduct business with honesty and transparency.',
    'about.excellence': 'Excellence',
    'about.excellenceText': 'We strive for the highest standards in all we do.',
    'about.innovation': 'Innovation',
    'about.innovationText': 'We continuously seek better solutions for our customers.',
    'about.sustainability': 'Sustainability',
    'about.sustainabilityText': 'We are committed to environmental responsibility.',
    
    // Products Section
    'products.title': 'Our Products',
    'products.subtitle': 'High-quality chemicals for diverse applications',
    'products.description': 'We offer a comprehensive range of chemical products for various industries. Explore our categories below.',
    'products.viewAll': 'VIEW ALL PRODUCTS',
    'products.viewDetails': 'View Details',
    'products.applications': 'Applications',
    'products.specifications': 'Specifications',
    'products.moreInfo': 'For more information on our products, please contact our sales team.',
    'products.casNumber': 'CAS Number',
    'products.industrial': 'Industrial Solvents',
    'products.fuel': 'Fuel Oil Products',
    'products.monomers': 'Specialized Monomers',
    'products.recycling': 'Chemical Recycling',
    'products.technical': 'Technical Consultation',
    // Product Category Titles
    'products.alcohols': 'Alcohols',
    'products.aromatics': 'Aromatics',
    'products.aliphatics': 'Aliphatics',
    'products.glycols': 'Glycols',
    'products.ketones': 'Ketones',
    'products.amines': 'Amines',
    
    // Product Descriptions
    'products.alcoholsDescription': 'Premium-grade alcohols for various industrial applications including cleaning, extraction, and synthesis processes.',
    
    // Product Details - Common Applications
    'products.app.cleaning': 'Cleaning and disinfection',
    'products.app.solvent': 'Industrial solvent',
    'products.app.manufacturing': 'Manufacturing processes',
    'products.app.personal': 'Personal care products',
    'products.app.synthesis': 'Chemical synthesis',
    'products.app.extraction': 'Extraction processes',
    'products.app.pharmaceutical': 'Pharmaceutical applications',
    'products.app.fuel': 'Fuel additive',
    
    // Product Details - UI Elements
    'products.backToProducts': 'Back to Products',
    'products.productDetails': 'Product Details',
    'products.aromaticsDescription': 'High-quality aromatic chemicals for coatings, plastics, and pharmaceutical applications.',
    'products.aliphaticsDescription': 'Premium aliphatic hydrocarbons for industrial applications and manufacturing processes.',
    'products.glycolsDescription': 'Industrial-grade glycols and glycol ethers for antifreeze, deicing, and solvent applications.',
    'products.ketonesDescription': 'Specialized ketones for industrial solvents, coatings, and pharmaceutical intermediates.',
    'products.aminesDescription': 'High-purity amines for pharmaceutical, agrochemical, and polymer industries.',
    
    // UI Elements
    'products.learnMore': 'Learn More',
    'products.chemical': 'Chemical',
    'products.industrialTag': 'Industrial',
    'products.aromaticsTag': 'Aromatics',
    'products.aliphaticsTag': 'Aliphatics',
    
    // Industries Section
    'industries.title': 'Industries We Serve',
    'industries.subtitle': 'Customized solutions for diverse sectors',
    'industries.description': 'We provide specialized chemical solutions tailored to the unique needs of various industries.',
    'industries.food': 'Food & Beverage',
    'industries.foodDesc': 'Quality ingredients and processing aids for food and beverage manufacturers.',
    'industries.pharma': 'Pharmaceutical',
    'industries.pharmaDesc': 'High-purity chemicals and excipients for pharmaceutical production.',
    'industries.personal': 'Personal Care',
    'industries.personalDesc': 'Innovative ingredients for personal care and cosmetic products.',
    'industries.textile': 'Textile',
    'industries.textileDesc': 'Specialized dyes, auxiliaries and treatments for textile industry.',
    'industries.agriculture': 'Agriculture',
    'industries.agricultureDesc': 'Effective solutions for crop protection and soil enhancement.',
    'industries.paint': 'Paint & Coatings',
    'industries.paintDesc': 'Quality additives and resins for paint and coating formulations.',
    
    // Sustainability Section
    'sustainability.title': 'Our Commitment to Sustainability',
    'sustainability.subtitle': 'Building a greener future',
    'sustainability.description': 'At Hexachem, we are committed to sustainable practices and environmental responsibility.',
    'sustainability.emissions': 'Carbon Emissions Reduced',
    'sustainability.recycled': 'Materials Recycled',
    'sustainability.renewable': 'Renewable Energy Used',
    'sustainability.environmental': 'Eco-Conscious Processes',
    'sustainability.environmentalDesc': 'Hexachem has developed innovative chemical recycling technology that significantly reduces waste, minimizes energy consumption, and leverages sustainable practices to create a positive environmental impact.',
    'sustainability.responsible': 'Responsible Sourcing',
    'sustainability.responsibleDesc': 'We ensure our supply chain adheres to sustainable and ethical practices.',
    'sustainability.community': 'Community Engagement',
    'sustainability.communityDesc': 'We participate in and support local community environmental projects.',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'re here to help',
    'contact.description': 'Have questions about our products or services? Contact us today.',
    'contact.whatsapp': 'Connect on WhatsApp',
    'contact.scan': 'Scan the QR code to chat with us directly on WhatsApp',
    'contact.chat': 'Chat on WhatsApp',
    'contact.location': 'Our Location',
    'contact.address': 'NO.3, SOON LEE STREET, PIONEER JUNCTION, #05-03, SINGAPORE - 627606',
    'contact.phone': 'Phone Number',
    'contact.phoneNumber': '+65 8306 3522',
    'contact.email': 'Email Address',
    'contact.emailAddress': 'hexasales@hexachem.sg',
    'contact.hours': 'Business Hours',
    'contact.businessHours': 'Monday - Friday: 9:00 AM - 6:00 PM',
    
    // Footer
    'footer.description': 'Innovating chemical sustainability since 2011. Leading the way in chemical recycling and trading solutions.',
    'footer.quickLinks': 'Quick Links',
    'footer.subscribe': 'Subscribe',
    'footer.subscribeDesc': 'Stay updated with our latest news and product announcements.',
    'footer.emailPlaceholder': 'Your email address',
    'footer.copyright': 'All rights reserved',
    'footer.powered': 'Powered by',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.sitemap': 'Sitemap',
    
    // Molecular Mascot
    'mascot.welcome': 'Hi there! I\'m MoleCueBuddy, Hexachem\'s virtual assistant. How can I help you today?',
    'mascot.placeholder': 'Ask me about Hexachem products...',
    'mascot.send': 'Send',
    'mascot.tryAsk': 'Try asking about our products, services, or company information.',
    'mascot.poweredBy': 'Powered by RSV AI'
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.products': '产品',
    'nav.industries': '行业',
    'nav.sustainability': '可持续发展',
    'nav.contact': '联系我们',
    
    // Product Modal Text
    'applications': '应用',
    'products.backToProducts': '返回产品',
    'products.productDetails': '产品详情',
    'products.noProductsFound': '未找到产品',
    'products.tryAdjusting': '请尝试调整搜索条件',
    
    // Product Descriptions for Modal Cards
    'products.alcoholsDescription': '高级醇类产品，适用于各种工业应用，包括清洁、提取和合成工艺。',
    'products.aromaticsDescription': '用于涂料、塑料和制药应用的高质量芳香族化学品。',
    'products.aliphaticsDescription': '适用于工业应用和制造工艺的优质脂肪族碳氢化合物。',
    'products.glycolsDescription': '用于防冻、除冰和溶剂应用的工业级乙二醇和乙二醇醚。',
    'products.ketonesDescription': '用于工业溶剂、涂料和制药中间体的特种酮类。',
    'products.aminesDescription': '用于制药、农用化学品和聚合物行业的高纯度胺类。',
    
    // Product Detail Descriptions
    'product.ipaDescription': '无色、易燃的化学化合物，具有强烈的气味。它是仅次于乙醇的简单的醇，其中醇碳原子连接到两个其他碳原子。',
    'product.butanolDescription': '一种含有4个碳原子的初级醇。它是一种无色液体，在水中溶解度较差，但可与大多数有机溶剂混溶。',
    'product.methanolDescription': '最简单的醇，是一种轻、挥发性、无色、易燃的液体，有特殊的气味。用作原料、溶剂和燃料。',
    'product.ethanolDescription': '一种是无色、微毒的化学化合物，有特殊的气味。它广泛用于消毒、溶剂、燃料和饮料工业。',
    
    // Hero Section
    'hero.title': '优质化学品分销',
    'hero.subtitle': '领先的化学品分销公司，业务遍及东南亚，为各行各业提供创新解决方案和优质产品。',
    'hero.learnMore': '了解更多',
    'hero.contactUs': '联系我们',
    
    // About Section
    'about.title': '关于 Hexachem',
    'about.subtitle': '您可靠的化学解决方案提供商',
    'about.description1': 'Hexachem (S) Pte Ltd 是一家总部位于新加坡的领先化学品分销公司，业务遍及东南亚。',
    'about.description2': '凭借超过20年的经验，我们专注于为食品、医药和制造业等各行业分销高质量化学品和创新解决方案。',
    'about.vision': '我们的愿景',
    'about.visionText': '成为东南亚最值得信赖和最具创新性的化学解决方案合作伙伴。',
    'about.mission': '我们的使命',
    'about.missionText': '提供可持续、高质量的化学产品和解决方案，以增强客户的流程和产品，同时保持最高的安全和环境责任标准。',
    'about.values': '我们的价值观',
    'about.integrity': '诚信',
    'about.integrityText': '我们以诚实和透明的方式开展业务。',
    'about.excellence': '卓越',
    'about.excellenceText': '我们努力在所有工作中达到最高标准。',
    'about.innovation': '创新',
    'about.innovationText': '我们不断为客户寻求更好的解决方案。',
    'about.sustainability': '可持续性',
    'about.sustainabilityText': '我们致力于环境责任。',
    
    // Products Section
    'products.title': '我们的产品',
    'products.subtitle': '适用于各种应用的高质量化学品',
    'products.description': '我们为各行业提供全面的化学产品。探索下面的类别。',
    'products.viewAll': '查看所有产品',
    'products.viewDetails': '查看详情',
    'products.applications': '应用',
    'products.specifications': '规格',
    'products.moreInfo': '有关我们产品的更多信息，请联系我们的销售团队。',
    'products.casNumber': 'CAS 编号',
    'products.industrial': '工业溶剂',
    'products.fuel': '燃料油产品',
    'products.monomers': '专用单体',
    'products.recycling': '化学回收',
    'products.technical': '技术咨询',
    // Product Category Titles
    'products.alcohols': '醇类',
    'products.aromatics': '芳香族化合物',
    'products.aliphatics': '脂肪族化合物',
    'products.glycols': '二醇类',
    'products.ketones': '酮类',
    'products.amines': '胺类',
    
    // Product Descriptions
    'products.alcoholsDescription': '用于各种工业应用的优质醇类，包括清洁、提取和合成工艺。',
    'products.aromaticsDescription': '用于涂料、塑料和制药应用的高品质芳香族化学品。',
    'products.aliphaticsDescription': '用于工业应用和制造工艺的优质脂肪族碳氢化合物。',
    'products.glycolsDescription': '用于防冻剂、除冰和溶剂应用的工业级二醇和二醇醚。',
    'products.ketonesDescription': '用于工业溶剂、涂料和制药中间体的专用酮类。',
    'products.aminesDescription': '用于制药、农用化学品和聚合物行业的高纯度胺类。',
    
    // UI Elements
    'products.learnMore': '了解更多',
    'products.chemical': '化学',
    'products.industrialTag': '工业',
    'products.aromaticsTag': '芳香族',
    'products.aliphaticsTag': '脂肪族',
    
    // Industries Section
    'industries.title': '我们服务的行业',
    'industries.subtitle': '为各行业量身定制的解决方案',
    'industries.description': '我们提供针对各行业独特需求的专业化学解决方案。',
    'industries.food': '食品与饮料',
    'industries.foodDesc': '为食品和饮料制造商提供优质原料和加工助剂。',
    'industries.pharma': '制药',
    'industries.pharmaDesc': '为医药生产提供高纯度化学品和辅料。',
    'industries.personal': '个人护理',
    'industries.personalDesc': '为个人护理和化妆品提供创新成分。',
    'industries.textile': '纺织',
    'industries.textileDesc': '为纺织工业提供专业染料、助剂和处理剂。',
    'industries.agriculture': '农业',
    'industries.agricultureDesc': '为作物保护和土壤改良提供有效解决方案。',
    'industries.paint': '涂料与涂层',
    'industries.paintDesc': '为涂料和涂层配方提供优质添加剂和树脂。',
    
    // Sustainability Section
    'sustainability.title': '我们对可持续发展的承诺',
    'sustainability.subtitle': '建设更绿色的未来',
    'sustainability.description': '在 Hexachem，我们致力于可持续实践和环境责任。',
    'sustainability.emissions': '减少碳排放',
    'sustainability.recycled': '材料回收',
    'sustainability.renewable': '使用可再生能源',
    'sustainability.environmental': '环境倡议',
    'sustainability.environmentalDesc': '我们积极实施减少环境足迹的计划。',
    'sustainability.responsible': '负责任采购',
    'sustainability.responsibleDesc': '我们确保我们的供应链遵循可持续和道德实践。',
    'sustainability.community': '社区参与',
    'sustainability.communityDesc': '我们参与并支持当地社区环境项目。',
    
    // Contact Section
    'contact.title': '联系我们',
    'contact.subtitle': '我们随时为您提供帮助',
    'contact.description': '对我们的产品或服务有疑问？立即联系我们。',
    'contact.whatsapp': '通过 WhatsApp 联系',
    'contact.scan': '扫描二维码在 WhatsApp 上与我们直接聊天',
    'contact.chat': '在 WhatsApp 上聊天',
    'contact.location': '我们的位置',
    'contact.address': '新加坡 627606，先驱路段，顺利街3号，#05-03',
    'contact.phone': '电话号码',
    'contact.phoneNumber': '+65 8306 3522',
    'contact.email': '电子邮件',
    'contact.emailAddress': 'hexasales@hexachem.sg',
    'contact.hours': '营业时间',
    'contact.businessHours': '周一至周五：上午9:00 - 下午6:00',
    
    // Footer
    'footer.description': '自2011年以来创新化学可持续性。引领化学回收和贸易解决方案。',
    'footer.quickLinks': '快速链接',
    'footer.subscribe': '订阅',
    'footer.subscribeDesc': '随时了解我们的最新消息和产品公告。',
    'footer.emailPlaceholder': '您的电子邮件地址',
    'footer.copyright': '版权所有',
    'footer.powered': '技术支持',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.sitemap': '网站地图',
    
    // Molecular Mascot
    'mascot.welcome': '您好！我是 MoleCueBuddy，Hexachem 的虚拟助手。今天我能为您提供什么帮助？',
    'mascot.placeholder': '询问有关 Hexachem 产品的信息...',
    'mascot.send': '发送',
    'mascot.tryAsk': '尝试询问我们的产品、服务或公司信息。',
    'mascot.poweredBy': '由 RSV AI 提供支持'
  },
  ms: {
    // Navigation
    'nav.home': 'Utama',
    'nav.about': 'Tentang Kami',
    'nav.products': 'Produk',
    'nav.industries': 'Industri',
    'nav.sustainability': 'Kelestarian',
    'nav.contact': 'Hubungi',
    
    // Hero Section
    'hero.title': 'Pengedaran Bahan Kimia Berkualiti',
    'hero.subtitle': 'Syarikat pengedaran bahan kimia terkemuka dengan operasi di seluruh Asia Tenggara, menyediakan penyelesaian inovatif dan produk berkualiti kepada pelbagai industri.',
    'hero.learnMore': 'KETAHUI LEBIH LANJUT',
    'hero.contactUs': 'HUBUNGI KAMI',
    
    // About Section
    'about.title': 'Tentang Hexachem',
    'about.subtitle': 'Pembekal penyelesaian kimia yang boleh dipercayai',
    'about.description1': 'Hexachem (S) Pte Ltd adalah syarikat pengedaran bahan kimia terkemuka yang berpusat di Singapura dengan operasi di seluruh Asia Tenggara.',
    'about.description2': 'Dengan pengalaman lebih dari 20 tahun, kami pakar dalam mengedarkan bahan kimia berkualiti tinggi dan penyelesaian inovatif kepada pelbagai industri termasuk sektor makanan, farmaseutikal, dan pembuatan.',
    'about.vision': 'Visi Kami',
    'about.visionText': 'Untuk menjadi rakan kongsi penyelesaian kimia yang paling dipercayai dan inovatif di Asia Tenggara.',
    'about.mission': 'Misi Kami',
    'about.missionText': 'Untuk menyediakan produk dan penyelesaian kimia yang mampan, berkualiti tinggi yang meningkatkan proses dan produk pelanggan kami sambil mengekalkan standard keselamatan dan tanggungjawab alam sekitar yang tertinggi.',
    'about.values': 'Nilai-Nilai Kami',
    'about.integrity': 'Integriti',
    'about.integrityText': 'Kami menjalankan perniagaan dengan kejujuran dan ketelusan.',
    'about.excellence': 'Kecemerlangan',
    'about.excellenceText': 'Kami berusaha untuk mencapai standard tertinggi dalam semua yang kami lakukan.',
    'about.innovation': 'Inovasi',
    'about.innovationText': 'Kami sentiasa mencari penyelesaian yang lebih baik untuk pelanggan kami.',
    'about.sustainability': 'Kemampanan',
    'about.sustainabilityText': 'Kami komited terhadap tanggungjawab alam sekitar.',
    
    // Products Section
    'products.title': 'Produk Kami',
    'products.subtitle': 'Bahan kimia berkualiti tinggi untuk pelbagai aplikasi',
    'products.description': 'Kami menawarkan pelbagai produk kimia yang komprehensif untuk pelbagai industri. Terokai kategori di bawah.',
    'products.viewAll': 'LIHAT SEMUA PRODUK',
    'products.viewDetails': 'Lihat Butiran',
    'products.applications': 'Aplikasi',
    'products.specifications': 'Spesifikasi',
    'products.moreInfo': 'Untuk maklumat lanjut tentang produk kami, sila hubungi pasukan jualan kami.',
    'products.casNumber': 'Nombor CAS',
    'products.industrial': 'Pelarut Industri',
    'products.fuel': 'Produk Minyak Bahan Api',
    'products.monomers': 'Monomer Khusus',
    'products.recycling': 'Kitar Semula Kimia',
    'products.technical': 'Perundingan Teknikal',
    // Product Category Titles
    'products.alcohols': 'Alkohol',
    'products.aromatics': 'Aromatik',
    'products.aliphatics': 'Alifatik',
    'products.glycols': 'Glikol',
    'products.ketones': 'Keton',
    'products.amines': 'Amina',
    
    // Product Descriptions
    'products.alcoholsDescription': 'Alkohol gred premium untuk pelbagai aplikasi industri termasuk pembersihan, pengekstrakan, dan proses sintesis.',
    'products.aromaticsDescription': 'Bahan kimia aromatik berkualiti tinggi untuk salutan, plastik, dan aplikasi farmaseutikal.',
    'products.aliphaticsDescription': 'Hidrokarbon alifatik premium untuk aplikasi industri dan proses pembuatan.',
    'products.glycolsDescription': 'Glikol dan eter glikol gred industri untuk aplikasi antibeku, penyahfrost, dan pelarut.',
    'products.ketonesDescription': 'Keton khusus untuk pelarut industri, salutan, dan perantara farmaseutikal.',
    'products.aminesDescription': 'Amina berkepekatan tinggi untuk industri farmaseutikal, agrokimia, dan polimer.',
    
    // UI Elements
    'products.learnMore': 'Ketahui Lebih Lanjut',
    'products.chemical': 'Kimia',
    'products.industrialTag': 'Industri',
    'products.aromaticsTag': 'Aromatik',
    'products.aliphaticsTag': 'Alifatik',
    
    // Industries Section
    'industries.title': 'Industri Yang Kami Layani',
    'industries.subtitle': 'Penyelesaian yang disesuaikan untuk pelbagai sektor',
    'industries.description': 'Kami menyediakan penyelesaian kimia khusus yang disesuaikan dengan keperluan unik pelbagai industri.',
    'industries.food': 'Makanan & Minuman',
    'industries.foodDesc': 'Bahan-bahan berkualiti dan bantuan pemprosesan untuk pengeluar makanan dan minuman.',
    'industries.pharma': 'Farmaseutikal',
    'industries.pharmaDesc': 'Bahan kimia dan eksipien berketulenan tinggi untuk pengeluaran farmaseutikal.',
    'industries.personal': 'Penjagaan Peribadi',
    'industries.personalDesc': 'Bahan-bahan inovatif untuk produk penjagaan peribadi dan kosmetik.',
    'industries.textile': 'Tekstil',
    'industries.textileDesc': 'Pewarna khusus, pembantu dan rawatan untuk industri tekstil.',
    'industries.agriculture': 'Pertanian',
    'industries.agricultureDesc': 'Penyelesaian berkesan untuk perlindungan tanaman dan peningkatan tanah.',
    'industries.paint': 'Cat & Salutan',
    'industries.paintDesc': 'Bahan tambahan dan resin berkualiti untuk formulasi cat dan salutan.',
    
    // Sustainability Section
    'sustainability.title': 'Komitmen Kami Terhadap Kelestarian',
    'sustainability.subtitle': 'Membina masa depan yang lebih hijau',
    'sustainability.description': 'Di Hexachem, kami komited terhadap amalan mampan dan tanggungjawab alam sekitar.',
    'sustainability.emissions': 'Pengurangan Pelepasan Karbon',
    'sustainability.recycled': 'Bahan Dikitar Semula',
    'sustainability.renewable': 'Penggunaan Tenaga Boleh Diperbaharui',
    'sustainability.environmental': 'Inisiatif Alam Sekitar',
    'sustainability.environmentalDesc': 'Kami secara aktif melaksanakan program untuk mengurangkan jejak alam sekitar kami.',
    'sustainability.responsible': 'Perolehan Bertanggungjawab',
    'sustainability.responsibleDesc': 'Kami memastikan rantaian bekalan kami mematuhi amalan mampan dan beretika.',
    'sustainability.community': 'Penglibatan Komuniti',
    'sustainability.communityDesc': 'Kami mengambil bahagian dalam dan menyokong projek alam sekitar komuniti tempatan.',
    
    // Contact Section
    'contact.title': 'Hubungi Kami',
    'contact.subtitle': 'Kami sedia membantu',
    'contact.description': 'Ada soalan tentang produk atau perkhidmatan kami? Hubungi kami hari ini.',
    'contact.whatsapp': 'Hubungi di WhatsApp',
    'contact.scan': 'Imbas kod QR untuk berbual terus dengan kami di WhatsApp',
    'contact.chat': 'Berbual di WhatsApp',
    'contact.location': 'Lokasi Kami',
    'contact.address': 'NO.3, SOON LEE STREET, PIONEER JUNCTION, #05-03, SINGAPURA - 627606',
    'contact.phone': 'Nombor Telefon',
    'contact.phoneNumber': '+65 8306 3522',
    'contact.email': 'Alamat E-mel',
    'contact.emailAddress': 'hexasales@hexachem.sg',
    'contact.hours': 'Waktu Perniagaan',
    'contact.businessHours': 'Isnin - Jumaat: 9:00 Pagi - 6:00 Petang',
    
    // Footer
    'footer.description': 'Berinovasi dalam kelestarian kimia sejak 2011. Memimpin dalam penyelesaian kitar semula dan perdagangan kimia.',
    'footer.quickLinks': 'Pautan Pantas',
    'footer.subscribe': 'Langganan',
    'footer.subscribeDesc': 'Dapatkan maklumat terkini tentang berita dan pengumuman produk terbaru kami.',
    'footer.emailPlaceholder': 'Alamat e-mel anda',
    'footer.copyright': 'Hak cipta terpelihara',
    'footer.powered': 'Dikuasakan oleh',
    'footer.privacy': 'Dasar Privasi',
    'footer.terms': 'Terma Perkhidmatan',
    'footer.sitemap': 'Peta Laman',
    
    // Molecular Mascot
    'mascot.welcome': 'Hai! Saya MoleCueBuddy, pembantu maya Hexachem. Bagaimana saya boleh membantu anda hari ini?',
    'mascot.placeholder': 'Tanya tentang produk Hexachem...',
    'mascot.send': 'Hantar',
    'mascot.tryAsk': 'Cuba tanya tentang produk, perkhidmatan, atau maklumat syarikat kami.',
    'mascot.poweredBy': 'Dikuasakan oleh RSV AI'
  }
}

// Create the context
type TranslationContextType = {
  currentLanguage: typeof languages[0];
  setLanguage: (language: typeof languages[0]) => void;
  t: (key: string) => string;
  availableLanguages: typeof languages;
};

const TranslationContext = createContext<TranslationContextType>({
  currentLanguage: languages[0],
  setLanguage: () => {},
  t: (key: string) => key,
  availableLanguages: languages,
});

// Provider component
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  // Function to set language
  const setLanguage = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
    document.documentElement.lang = language.code;
  };

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code as keyof typeof translations];
    return langTranslations && langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      t,
      availableLanguages: languages
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useTranslation = () => useContext(TranslationContext);

export default TranslationProvider;