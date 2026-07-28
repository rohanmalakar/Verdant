import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PLANTS } from './src/data/plants.js';
import { INITIAL_CATEGORIES } from './src/data/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '10mb' }));

// In-Memory Data Store (Persists during server lifecycle)
let plants = [...INITIAL_PLANTS];
let categories = [...INITIAL_CATEGORIES];

let coupons = [
  {
    id: 'c-1',
    code: 'VERDANT10',
    discountPercent: 10,
    minSpend: 20,
    expiresAt: '2026-12-31',
    isActive: true,
    description: '10% off on all orders over $20'
  },
  {
    id: 'c-2',
    code: 'GREENSPRING',
    discountPercent: 15,
    minSpend: 40,
    expiresAt: '2026-12-31',
    isActive: true,
    description: '15% off spring welcome coupon'
  },
  {
    id: 'c-3',
    code: 'WELCOME20',
    discountPercent: 20,
    minSpend: 60,
    expiresAt: '2026-12-31',
    isActive: true,
    description: '20% off for first time buyers over $60'
  }
];

let orders: any[] = [
  {
    id: 'ORD-98214',
    userId: 'user-demo',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Sarah Jenkins',
      street: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA',
      phone: '+1 (555) 234-5678'
    },
    items: [
      { plant: INITIAL_PLANTS[0], quantity: 1, selectedSize: 'Medium' },
      { plant: INITIAL_PLANTS[1], quantity: 1, selectedSize: 'Medium' }
    ],
    subtotal: 82,
    discountAmount: 8.2,
    taxAmount: 5.9,
    shippingCost: 0,
    totalAmount: 79.7,
    couponCode: 'VERDANT10',
    status: 'Delivered',
    paymentMethod: 'Credit Card (**** 4242)',
    paymentStatus: 'Paid',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    trackingNumber: 'VRD-TRK-881293',
    estimatedDelivery: 'Delivered on Jul 25'
  }
];

let users: any[] = [
  {
    id: 'user-admin',
    name: 'Verdant Admin',
    email: 'admin@verdant.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date().toISOString(),
    addresses: []
  },
  {
    id: 'user-demo',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    addresses: [
      {
        id: 'addr-1',
        fullName: 'Sarah Jenkins',
        street: '742 Evergreen Terrace',
        city: 'Portland',
        state: 'OR',
        zipCode: '97201',
        country: 'USA',
        phone: '+1 (555) 234-5678',
        isDefault: true
      }
    ]
  }
];

let settings = {
  bannerMessage: '🌿 Free Eco-Friendly Shipping on orders over $50! Use code GREENSPRING for 15% off.',
  showBanner: true,
  freeShippingThreshold: 50,
  standardShippingRate: 7.99,
  taxPercent: 8,
  storePhone: '+1 (800) 555-PLANT',
  storeEmail: 'hello@verdantplants.com'
};

// Lazy initialization of Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('GEMINI_API_KEY environment variable not set.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// REST API ROUTES

// Products
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: plants });
});

app.get('/api/products/:id', (req, res) => {
  const plant = plants.find((p) => p.id === req.params.id);
  if (!plant) {
    return res.status(404).json({ success: false, message: 'Plant not found' });
  }
  res.json({ success: true, data: plant });
});

app.post('/api/products', (req, res) => {
  const newPlant = {
    id: `plant-${Date.now()}`,
    reviewsCount: 0,
    rating: 5.0,
    ...req.body
  };
  plants.unshift(newPlant);
  res.status(201).json({ success: true, data: newPlant });
});

app.put('/api/products/:id', (req, res) => {
  const idx = plants.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Plant not found' });
  }
  plants[idx] = { ...plants[idx], ...req.body };
  res.json({ success: true, data: plants[idx] });
});

app.delete('/api/products/:id', (req, res) => {
  plants = plants.filter((p) => p.id !== req.params.id);
  res.json({ success: true, message: 'Plant deleted' });
});

// Categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

app.post('/api/categories', (req, res) => {
  const newCat = {
    id: `cat-${Date.now()}`,
    itemCount: 0,
    ...req.body
  };
  categories.push(newCat);
  res.status(201).json({ success: true, data: newCat });
});

// Orders
app.get('/api/orders', (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const userOrders = orders.filter((o) => o.userId === userId);
    return res.json({ success: true, data: userOrders });
  }
  res.json({ success: true, data: orders });
});

app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  const newOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    status: 'Pending',
    paymentStatus: 'Paid',
    createdAt: new Date().toISOString(),
    trackingNumber: `VRD-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
    estimatedDelivery: '3-5 Business Days',
    ...orderData
  };
  orders.unshift(newOrder);

  // Update product stock counts
  if (Array.isArray(orderData.items)) {
    orderData.items.forEach((item: any) => {
      const p = plants.find((plant) => plant.id === item.plant?.id);
      if (p) {
        p.stock = Math.max(0, p.stock - (item.quantity || 1));
      }
    });
  }

  res.status(201).json({ success: true, data: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  order.status = status;
  res.json({ success: true, data: order });
});

// Coupons
app.get('/api/coupons', (req, res) => {
  res.json({ success: true, data: coupons });
});

app.post('/api/coupons/validate', (req, res) => {
  const { code, subtotal } = req.body;
  const coupon = coupons.find(
    (c) => c.code.toUpperCase() === (code || '').toUpperCase() && c.isActive
  );

  if (!coupon) {
    return res.status(400).json({ success: false, message: 'Invalid or expired coupon code' });
  }

  if (subtotal < coupon.minSpend) {
    return res.status(400).json({
      success: false,
      message: `Minimum order amount of $${coupon.minSpend} required for this coupon.`
    });
  }

  const discountAmount = Number(((subtotal * coupon.discountPercent) / 100).toFixed(2));
  res.json({
    success: true,
    data: {
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      discountAmount,
      description: coupon.description
    }
  });
});

app.post('/api/coupons', (req, res) => {
  const newCoupon = {
    id: `c-${Date.now()}`,
    isActive: true,
    ...req.body
  };
  coupons.unshift(newCoupon);
  res.status(201).json({ success: true, data: newCoupon });
});

// Auth & Users
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if (user.isBlocked) {
    return res.status(403).json({ success: false, message: 'Account suspended. Please contact support.' });
  }

  res.json({
    success: true,
    data: {
      user,
      token: `jwt-demo-token-${user.id}`
    }
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ success: false, message: 'Email is already registered.' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    role: 'user',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    createdAt: new Date().toISOString(),
    addresses: []
  };

  users.push(newUser);
  res.status(201).json({
    success: true,
    data: {
      user: newUser,
      token: `jwt-demo-token-${newUser.id}`
    }
  });
});

app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

app.put('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  Object.assign(user, req.body);
  res.json({ success: true, data: user });
});

// Settings
app.get('/api/settings', (req, res) => {
  res.json({ success: true, data: settings });
});

app.put('/api/settings', (req, res) => {
  settings = { ...settings, ...req.body };
  res.json({ success: true, data: settings });
});

// AI Plant Care Advisor Endpoint (Powered by Gemini 3.6 Flash)
app.post('/api/ai/plant-advisor', async (req, res) => {
  try {
    const { message, plantName, environment, userQuery } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `You are "Sprout", an expert botanical botanist and friendly AI Plant Care Assistant for Verdant E-Commerce.
Provide warm, concise, highly actionable plant advice. Format key points with bullet points or bold text.
If diagnosing brown leaves, yellowing, pests, or watering, explain root cause and step-by-step remedy.
Keep answers readable, practical, and under 250 words.`;

    const promptText = userQuery || message || `Please give plant care tips for ${plantName || 'indoor plants'} given environment: ${environment || 'indoor apartment'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7
      }
    });

    const reply = response.text || "I'm sorry, I couldn't generate plant advice right now. Ensure your plant gets indirect sunlight and well-draining soil!";
    res.json({ success: true, reply });
  } catch (error: any) {
    console.error('Gemini AI Plant Care Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to contact AI Plant Care Advisor.',
      reply: '🌿 *Plant Care Tip*: Brown leaf tips usually indicate low atmospheric humidity or fluoride in tap water. Try misting or using filtered rainwater!'
    });
  }
});

// START SERVER / VITE MIDDLEWARE
async function main() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`🌿 Verdant Server running at http://${HOST}:${PORT}`);
  });
}

main();
