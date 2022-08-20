import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";
import { Product } from "@stripe/firestore-stripe-payments";

import Table from "./Table";
import Loader from "./Loader";
import useAuth from "../hooks/useAuth";
import { loadCheck } from "../lib/stripe";
import netflixLogo from '../img/netflix-logo-png-2562.png';
import { plansDescriptions } from "../helpers/helperConstants";

interface ProductsInterface {
  products: Product[];
}

function Plans({ products }: ProductsInterface) {
  const { logout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return
    loadCheck(selectedPlan?.prices[0].id!);
    setIsPaymentLoading(true)
  }

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-white/10 bg=[#141414]">
        <Link href="/">
          <img
            src={netflixLogo.src}
            alt='Netflix Logo'
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button className="text-lg font-medium hover:underline" onClick={logout}>Sign Out</button>
      </header>
      <main className="mx-auto pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">Choose the plan which is right for you</h1>
        <ul>
          {plansDescriptions?.map(plansDescription => {
            return (
              <li className="planListItem" key={plansDescription?.id}>
                <CheckIcon className="checkIcon" />
                {plansDescription?.description}
              </li>
            )
          })}
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products?.map(product => {
              return (
                <div
                  key={product.id}
                  className={`planBox ${selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'}`}
                  onClick={() => setSelectedPlan(product)}
                >
                  {product?.name}
                </div>
              )
            })}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isPaymentLoading}
            className={`mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isPaymentLoading && 'opacity-60'}`}
            onClick={subscribeToPlan}
          >
            {isPaymentLoading ? <Loader color="dark:fill-gray-300" /> : "Subscribe"}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Plans;
