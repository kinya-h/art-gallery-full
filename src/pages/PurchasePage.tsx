import React, { useEffect, useState } from 'react'

import { RootState, useAppSelector } from '../store'
import { useAppDispatch } from '../lib/hooks';
import { fetchPurchasedArtworks } from '../actions/purchase-service';
import { PurchaseInfo } from '../actions/purchaseInfo';
import { User } from '../types/User';

const PurchasePage = () => {

    const [userPurchases ,setUserPurchases] = useState<PurchaseInfo[]>([])
    const {purchases} = useAppSelector((state:RootState)=>state.allpurchasedArtworks);
    const {user} = useAppSelector((state:RootState)=>state.authenticatedUser)
    const dispatch = useAppDispatch();
    useEffect(()=>{
       const fetchPurcheses = async ()=>{
        await dispatch(fetchPurchasedArtworks())
       }

       fetchPurcheses()
       
    },[ ])
    
    
useEffect(()=>{

    if (purchases && user) {
        setUserPurchases(purchases.filter((purchase) => purchase.buyer.id === (user as User).id));
      }
    }, [purchases, user]);


if (!purchases ){
    return <h2>Loading...</h2>
}

  return (
    <div className='mt-24'>
<ul className='list-disc ml-10'>

    {userPurchases?.map((purchase,i)=>(
        <div key={i}>
            <li className='flex gap-x-4 '>
                {purchase?.artwork?.title}

                <p>

                {purchase?.artwork?.collection?.title}

                </p >
                
                <p className="text-teal-500 font-bold">

                {purchase?.amount}

                </p>
            </li>
        </div>
    ))}
</ul>
        
    </div>
  )
}

export default PurchasePage