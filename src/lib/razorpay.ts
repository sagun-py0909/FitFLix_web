import { PaymentOrder } from '@/types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export class RazorpayService {
  private static isScriptLoaded = false;

  static async loadScript(): Promise<boolean> {
    if (this.isScriptLoaded) {
      return true;
    }

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        this.isScriptLoaded = true;
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  static async initiatePayment(
    paymentOrder: PaymentOrder,
    onSuccess: (response: RazorpayResponse) => void,
    onFailure: () => void
  ): Promise<void> {
    const isLoaded = await this.loadScript();
    
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    const options: RazorpayOptions = {
      key: paymentOrder.razorpay_key_id,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      name: 'Fitflix',
      description: 'Gym Membership Payment',
      order_id: paymentOrder.order_id,
      prefill: {
        name: paymentOrder.user_details.name,
        email: paymentOrder.user_details.email,
        contact: paymentOrder.user_details.contact,
      },
      theme: {
        color: '#f97316', // Fitflix orange theme
      },
      handler: onSuccess,
      modal: {
        ondismiss: onFailure,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  static formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount / 100); // Razorpay amounts are in paise
  }
}