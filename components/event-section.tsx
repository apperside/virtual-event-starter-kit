/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Sponsor, Event } from '@lib/types';
import styles from './event-section.module.css';
import styleUtils from './utils.module.css';
import React, { useEffect, useRef, useState } from "react";
import Loader from "./loader";
import { StripeCardElement } from "@stripe/stripe-js";
import { Stripe, loadStripe } from '@stripe/stripe-js'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// import { loadStripe } from '@stripe/stripe-js';


//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-call

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// const stripe = stripeLib('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call

// console.log("stripe is", stripe)
type Props = {
  event: Event;
};
let stripePromise: Promise<Stripe | null>

//@ts-ignore
const getStripe = () => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);//"pk_test_51IdwlJCgP78hQYYmKOkQb91h1gM6VNDgrXrYbcpDUGGt3F5JWSBRYhajmoJaQg1suf8DNPNVQRZzviMpkMKhJ1H4006PUY8hcC")
  }
  return stripePromise
}
export default function SponsorSection({ event }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const stripeCard = useRef<StripeCardElement>()
  // console
  const pay = async () => {
    setIsLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call

    const createPaymentIntentResponse = await fetch("/api/payments/init", {
      method: "POST",

      body: JSON.stringify({
        eventId: event.id
      })
    });
    const paymentIntent = await createPaymentIntentResponse.json();
    console.log("result is", paymentIntent)
    if (paymentIntent.clientSecret) {
      const stripe = await getStripe();
      console.log("has stripe", !!stripe)
      try {
        const confirmResult = await stripe?.confirmCardPayment(paymentIntent.clientSecret, {
          payment_method: {
            card: stripeCard.current!,
            billing_details: {
              name: 'Jenny Rosen'
            }
          },
          setup_future_usage: 'off_session'
        });
        alert("ok")
      } catch (err) {
        alert("error")
      }
      finally {
        setIsLoading(false)
      }
    }
    else {
      setIsLoading(false)
      alert("error")
    }
  }

  useEffect(() => {
    console.log(process.env)

    const init = async () => {
      const stripe = await getStripe()

      if (stripe) {
        const elements = stripe.elements();
        const style = {
          base: {
            color: "red",
          }
        };

        const card = elements.create("card", {
          style: {
            base: {
              iconColor: 'white',
              color: '#0bb07a',
              fontWeight: '500',
              fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
              fontSize: '16px',
              fontSmoothing: 'antialiased',
              ':-webkit-autofill': {
                color: '#fce883',
              },
              '::placeholder': {
                color: '#0bb07a',
              },
            },
            invalid: {
              iconColor: 'red',
              color: 'red',
            },
          }
        });
        stripeCard.current = card;
        card.on('change', function (event) {
          const displayError = document.getElementById('card-errors');
          if (displayError) {
            if (event.error) {
              displayError.textContent = event.error.message;
            } else {
              displayError.textContent = '';
            }
          }
        });
        console.log("card is", card)
        card.mount("#card-element");
      }
      else {
        alert("no stripe")
      }
    }
    init()
      .then(res => console.log(res)).catch(err => console.error(err))
  }, [])
  return (
    <>
      <Link href="/expo">
        <a className={styles.backlink}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to expo
        </a>
      </Link>
      <div className={styles.layout}>
        <iframe
          className={cn(styles.video, styleUtils.appear, styleUtils['appear-first'])}
          allow="picture-in-picture"
          allowFullScreen
          frameBorder="0"
          height="100%"
          src={`https://youtube.com/embed/12345`}
          title={event.artists[0].name}
          width="100%"
        />
        <div className={styles.container}>
          <div className={styles['name-and-logo']}>
            <Image
              alt={event.artists[0].name}
              src={event.artists[0].smallImage}
              className={styles.image}
              loading="lazy"
              title={event.artists[0].name}
              height={64}
              width={64}
            />
            <h1 className={styles.name}>{event.artists[0].name}</h1>
          </div>
          <p className={styles.description}>{event.description}</p>
          <div style={{}} id="card-element">

          </div>
          <div className={styles['sponsor-details']}>


            <div id="card-errors" role="alert"></div>
            <button
              id="submit"
              // href={sponsor.callToActionLink}
              // target="_blank"
              // rel="noopener noreferrer"
              onClick={pay}
              type="button"
              className={styles.button}
            >
              {!!isLoading &&
                <Loader />
              }
              {!isLoading && "ACQUISTA"
              }
            </button>
            <a
              // href={sponsor.discord}
              target="_blank"
              rel="noopener noreferrer"
              type="button"
              className={cn(styles.button, styles['button-link'])}
            >
              Chat on Discord
            </a>
          </div>
          {/* <div className={styles.resources}>
            <h2 className={styles.heading}>Resources</h2>
            {sponsor.links.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.button, styles['button-resource'])}
              >
                <span className={styles.truncate}>{link.text}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}
