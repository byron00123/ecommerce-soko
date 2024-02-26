import stripe from 'stripe';

// stripe setup
const stripeGateway = stripe(process.env.stripe_api);
const DOMAIN = process.env.DOMAIN;

export async function handler(req, res) {
    if (req.method === 'GET') {
        if (req.url === '/') {
            // Home Route
            res.sendFile('index.html', {root: "public"});
        } else if (req.url === '/success') {
            // Success Route
            res.sendFile('success.html', {root: "public"});
        } else if (req.url === '/cancel') {
            // Cancel Route
            res.sendFile('cancel.html', {root: "public"});
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else if (req.method === 'POST' && req.url === '/stripe-checkout') {
        // Stripe Checkout Route
        const { items } = req.body;
        const lineItems = items.map(item => {
            const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100);
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        images: [item.productImg]
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            };
        });

        try {
            // Create checkout session
            const session = await stripeGateway.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${DOMAIN}/success`,
                cancel_url: `${DOMAIN}/cancel`,
                line_items: lineItems,
                billing_address_collection: 'required',
            });
            res.status(200).json({ url: session.url });
        } catch (error) {
            console.error('Error creating checkout session:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
}
