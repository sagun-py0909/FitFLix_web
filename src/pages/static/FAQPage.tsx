import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, HelpCircle, MessageCircle, Mail } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'membership', label: 'Membership' },
    { id: 'payment', label: 'Payment & Billing' },
    { id: 'gym', label: 'Gym Access' },
    { id: 'app', label: 'App Features' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'technical', label: 'Technical Support' },
  ];

  const faqs = [
    {
      id: '1',
      category: 'membership',
      question: 'How do I purchase a gym membership?',
      answer: 'You can purchase a membership by browsing our gym directory, selecting a gym, choosing a membership plan, and completing the payment through our secure Razorpay integration. Once purchased, you\'ll receive a digital pass code for gym access.',
    },
    {
      id: '2',
      category: 'membership',
      question: 'Can I cancel my membership?',
      answer: 'Yes, you can cancel your membership at any time from your account dashboard. Go to "My Memberships" and select the cancel option. Please note that cancellation policies may vary by gym and membership type.',
    },
    {
      id: '3',
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods through Razorpay including credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely.',
    },
    {
      id: '4',
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use Razorpay\'s secure payment gateway which is PCI DSS compliant. We never store your payment information on our servers.',
    },
    {
      id: '5',
      category: 'gym',
      question: 'How do I access the gym with my membership?',
      answer: 'After purchasing a membership, you\'ll receive a digital pass code. Show this code at the gym reception along with a valid ID to gain access. Some gyms may also have QR code scanning systems.',
    },
    {
      id: '6',
      category: 'gym',
      question: 'Can I use my membership at multiple gym locations?',
      answer: 'This depends on the specific membership plan you purchase. Some plans offer multi-location access while others are specific to one gym. Check the plan details before purchasing.',
    },
    {
      id: '7',
      category: 'app',
      question: 'How does the nutrition tracker work?',
      answer: 'Our nutrition tracker allows you to log your meals by entering food items, calories, and macronutrients. The app calculates your daily totals and shows progress toward your nutrition goals.',
    },
    {
      id: '8',
      category: 'app',
      question: 'What can I ask the AI fitness coach?',
      answer: 'You can ask our AI coach about workout routines, nutrition advice, exercise form, fitness goals, and general wellness questions. The AI provides personalized recommendations based on your profile.',
    },
    {
      id: '9',
      category: 'nutrition',
      question: 'How accurate is the nutrition tracking?',
      answer: 'The nutrition tracking is based on standard nutritional databases. For the most accurate tracking, we recommend using a food scale and checking nutrition labels when available.',
    },
    {
      id: '10',
      category: 'technical',
      question: 'The app is not working properly. What should I do?',
      answer: 'First, try refreshing the page or restarting the app. If the issue persists, clear your browser cache or update to the latest version. Contact our support team if problems continue.',
    },
    {
      id: '11',
      category: 'membership',
      question: 'Do you offer free trials?',
      answer: 'Many of our partner gyms offer free trial sessions. Check the individual gym pages for trial availability and terms. Some gyms may require advance booking for trial sessions.',
    },
    {
      id: '12',
      category: 'app',
      question: 'Can I use the app offline?',
      answer: 'Some features like viewing your membership details and logged nutrition data are available offline. However, features requiring real-time data like gym discovery and AI chat require an internet connection.',
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">
              Questions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Fitflix, memberships, and our services.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* FAQs */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      <div className="space-y-3">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === faq.category)?.label}
                        </Badge>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or browse different categories.
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/chat">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};