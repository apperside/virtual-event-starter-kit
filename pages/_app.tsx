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

import { SSRProvider, OverlayProvider } from 'react-aria';
import { Provider as AuthProvider, signIn, useSession } from 'next-auth/client'
import '@styles/global.css';
import '@styles/nprogress.css';
import '@styles/chrome-bug.css';
import type { AppProps } from 'next/app';
import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';
import { useEffect } from 'react';
import React from "react";

const Auth: React.FC = ({ children }) => {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn()
      .then(result => {
        console.log("result", result)
      })
      .catch(err => {
        console.error(err)
      }) // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return children as any;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

export default function App({ Component, pageProps }: AppProps) {
  const [session] = useSession();
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (
    <AuthProvider session={session!}>
      <SSRProvider>
        <OverlayProvider>
          {(Component as any).auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <ResizeHandler />
          <NProgress />
        </OverlayProvider>
      </SSRProvider>
    </AuthProvider>
  );
}

