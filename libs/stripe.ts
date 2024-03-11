import Stripe from "stripe";

export const stripe = new Stripe(process.env.NODE_ENV ?? "", {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Sound On",
    version: "0.1.0",
  },
});
