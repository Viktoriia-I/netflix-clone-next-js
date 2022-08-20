import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { Product } from '@stripe/firestore-stripe-payments';
import React from 'react'

interface ProductsInterface {
  products: Product[];
  selectedPlan: Product | null;
}

function Table({ products, selectedPlan }: ProductsInterface) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products.map(product => {
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}>
                {product?.prices[0]?.unit_amount! / 100} USD
              </td>
            )
          })}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map(product => {
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}>
                {product?.metadata.videoQuality}
              </td>
            )
          })}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map(product => {
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}>
                {product?.metadata.resolution}
              </td>
            )
          })}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Watch on your TV, computer, mobile phone and tablet</td>
          {products.map(product => {
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}>
                {product?.metadata.portability === 'true'
                  ? <CheckIcon className="inline-block h-8 w-8" />
                  : <XIcon className="inline-block h-8 w-8" />}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default Table