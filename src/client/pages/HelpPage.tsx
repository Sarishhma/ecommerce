  import React, { useState } from 'react';
  import { Search, ChevronDown, Mail, Phone, MessageSquare } from 'lucide-react';
  import { useScrollReveal } from '../feature/home/hooks/use-scroll-reveal';

  const faqCategories = [
    {
      name: 'Orders & Shipping',
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 5-7 business days within the continental US. Express shipping options are available at checkout for faster delivery. International orders may take 10-21 business days depending on destination.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes! We offer free shipping on orders over Rs150 within the US. For orders under Rs150, shipping costs vary based on location and carrier selection at checkout.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Absolutely. Once your order ships, you&apos;ll receive a tracking number via email. You can also track your order anytime from your account dashboard under "Order History".'
        },
        {
          question: 'What if my order hasn&apos;t arrived?',
          answer: 'If your order hasn&apos;t arrived within the estimated delivery window, please contact our support team with your order number. We&apos;ll investigate and help resolve the issue.'
        }
      ]
    },
    {
      name: 'Returns & Refunds',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items in unused condition with original packaging. Some items like incense or wellness products may have different return policies. Check the product page for specific details.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Contact our customer service team with your order number and reason for return. We&apos;ll provide you with a prepaid shipping label and return instructions.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Once we receive and inspect your return, refunds are typically processed within 5-7 business days. The time it takes to appear in your account may vary depending on your bank.'
        },
        {
          question: 'Can I exchange an item instead of returning it?',
          answer: 'Yes! We&apos;re happy to arrange exchanges. Contact us with your original order number and the item you&apos;d like to exchange for.'
        }
      ]
    },
    {
      name: 'Product & Artisan',
      faqs: [
        {
          question: 'Are your products handmade?',
          answer: 'Most of our products are handcrafted by skilled artisans from Himalayan regions. Each item is unique and made with traditional techniques. Check individual product pages for artisan information.'
        },
        {
          question: 'What materials are used?',
          answer: 'We use only natural, ethically-sourced materials. Our incense contains organic herbs and resins, and our home goods use sustainable textiles and metals. See product descriptions for detailed material information.'
        },
        {
          question: 'Do you have information about the artisans?',
          answer: 'Yes! We celebrate our artisan partners. Many product pages include stories about the creators. Visit our Story page to learn more about Bijeshwori Mala Traders mission to support Himalayan communities.'
        },
        {
          question: 'Are your products sustainable?',
          answer: 'Sustainability is core to our mission. We work directly with artisans, minimize packaging waste, and support fair-trade practices. Learn more on our Story page.'
        }
      ]
    },
    {
      name: 'Account & Payment',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the navigation menu and fill out your email and password. You can also sign up during checkout. Having an account helps track orders and manage your wishlist.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are securely processed through encrypted connections.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes. We use industry-standard SSL encryption and never store your full credit card information on our servers. All transactions are secure and PCI compliant.'
        },
        {
          question: 'Can I save multiple payment methods?',
          answer: 'Yes! You can save multiple payment methods in your account settings for faster checkout on future purchases.'
        }
      ]
    }
  ];

  export const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const contentReveal = useScrollReveal();

    const filteredFaqs = faqCategories.map(category => ({
      ...category,
      faqs: category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.faqs.length > 0);

    return (
      <div className="pt-[calc(var(--nav-height)+2rem)] pb-20 lg:pb-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">Help & Support</h1>
          <p className="text-lg text-stone">Find answers to common questions or reach out to our team</p>
        </div>

        {/* Contact Options */}
        <div ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <a href="mailto:support@Bijeshwori Mala Traders.com" className="p-6 bg-white rounded-2xl border border-sand/50 shadow-sm hover:shadow-md transition-shadow text-center hover:border-terracotta/50">
            <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-medium text-charcoal mb-2">Email Us</h3>
            <p className="text-sm text-stone mb-3">support@Bijeshwori Mala Traders.com</p>
            <p className="text-xs text-stone">Response time: Usually within 24 hours</p>
          </a>

          <a href="tel:+1-555-0123" className="p-6 bg-white rounded-2xl border border-sand/50 shadow-sm hover:shadow-md transition-shadow text-center hover:border-terracotta/50">
            <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-medium text-charcoal mb-2">Call Us</h3>
            <p className="text-sm text-stone mb-3">+1 (555) 0123</p>
            <p className="text-xs text-stone">Mon-Fri: 9am-6pm EST</p>
          </a>

          <button className="p-6 bg-white rounded-2xl border border-sand/50 shadow-sm hover:shadow-md transition-shadow text-center hover:border-terracotta/50">
            <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-medium text-charcoal mb-2">Live Chat</h3>
            <p className="text-sm text-stone mb-3">Chat with our team</p>
            <p className="text-xs text-stone">Available 24/7</p>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-charcoal"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-stone mb-4">No results found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-terracotta font-medium hover:text-charcoal transition-colors"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredFaqs.map((category) => (
              <div key={category.name}>
                <h2 className="font-display text-2xl font-bold text-charcoal mb-4">{category.name}</h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, idx) => {
                    const faqId = `${category.name}-${idx}`;
                    return (
                      <div key={faqId} className="bg-white rounded-xl border border-sand/50 overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faqId ? null : faqId)}
                          className="w-full p-5 flex items-center justify-between hover:bg-sand/5 transition-colors text-left"
                        >
                          <h3 className="font-medium text-charcoal pr-4">{faq.question}</h3>
                          <ChevronDown className={`w-5 h-5 text-terracotta flex-shrink-0 transition-transform ${expandedFaq === faqId ? 'rotate-180' : ''}`} />
                        </button>

                        {expandedFaq === faqId && (
                          <div className="px-5 pb-5 border-t border-sand/50 bg-sand/5">
                            <p className="text-stone leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-terracotta rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-white/90 mb-6 max-w-md mx-auto">Our customer support team is here to help. Reach out anytime!</p>
          <button className="px-8 py-3 bg-white text-terracotta rounded-lg font-medium hover:bg-ivory transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    );
  };
