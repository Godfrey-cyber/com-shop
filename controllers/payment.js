import asyncHandler from "express-async-handler"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const KEY = "pk_test_51K8P6eBAuY8XODRoZHtY0qruDSMWYS7isKfwfa8NjWrQCEvrC8HbCFx58mSV7kDSp8RSLTojLk3gQk4x80csOTqY00VX3TDeHd"
// export const chargeClient = async(req, res) => {
// 	    stripe.charges.create({
// 		source: req.body.tokenId,
// 		amount: req.body.amount,
// 		currency: "kes",
// 	}, (stripeErr, stripeRes) => {
// 		if (stripeRes) {
// 			res.status(200).json({data: charge})
// 		} else {
// 			res.status(400).json(stripeErr)
// 		}
// 	})
// }
// console.log(stripe)

export const chargeClient = async(req, res) => {
	const { items, amount, email } = req.body
	const newItems = items.map(item => ({
		description: item.desc,
		quantity: 1,
		price_data: {
			currency: "kes",
			unit_amount: item.price * 100,
			product_data: {
				name: item.title,
				images: [item.photo]
			}
		}
	}))
	// console.log(items)
	console.log(email)
	// console.log(newItems)
	const sessions = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_rates: ["shr_1MdemRBAuY8XODRoY0UUMEf8"],
		shipping_address_collection: {
			allowed_countries: ["GB", "US", "CA", "KE"] 
		},
		line_items: newItems,
		mode: "payment",
		success_url: "http://localhost:3000/success",
		cancel_url: "http://localhost:3000/cancel",
		metadata: {
			email: email,
			images: JSON.stringify(items.map(item => item.photo))
		}
	}, {apiKey: 'sk_test_51K8P6eBAuY8XODRosWWfFycGoPBx1MvWbUae8dfEA2PZv8ecA6DU2FnIlFtHsjDdnscKA5VzZElo21xyrFDjINZu006lt78eOz'})
	console.log(sessions)
	res.status(200).json({ id: sessions.id})
}

// This is your test secret API key.
// export const chargeClient = require('stripe')('sk_test_51K8P6eBAuY8XODRosWWfFycGoPBx1MvWbUae8dfEA2PZv8ecA6DU2FnIlFtHsjDdnscKA5VzZElo21xyrFDjINZu006lt78eOz');
// export const chargeClient = async (req, res) => {
// 	try {
// 	const session = await stripe.checkout.sessions.create({apiKey: process.env.STRIPE_KEY},{
//     line_items: [
//       {
// 		source: req.body.tokenId,
// 		amount: req.body.amount,
// 		currency: "kes",
//       },
//     ],
//     payment_method_types: ["card"],
//     mode: 'payment',
//     success_url: "http://localhost:3000/success?success=true",
//     cancel_url: "http://localhost:3000?cancelled=false",
//   });

//   res.redirect(303, session.url);
//   res.send(session)
//   console.log(session)
// 	} catch(error) {
// 		res.status(500).json(error)
// 	}
   
// };

// app.listen(4242, () => console.log('Running on port 4242'));