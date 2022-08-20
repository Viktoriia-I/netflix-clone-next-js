import { createCheckoutSession, getStripePayments } from '@stripe/firestore-stripe-payments';
import { getFunctions, httpsCallable } from '@firebase/functions';
import app from '../firebase';

const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

const loadCheck = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error));
};

const goToBillingPortal = async () => {
  const instance = getFunctions(app, 'us-central1');
  const functionReference = httpsCallable(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  );

  await functionReference({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message));
};

export default payments;
export { loadCheck, goToBillingPortal };
