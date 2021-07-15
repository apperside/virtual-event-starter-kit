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
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import { NAVIGATION } from '@lib/constants';
import styles from './layout.module.css';
import Logo from './icons/icon-logo';
import MobileMenu from './mobile-menu';
import Footer, { HostedByVercel } from './footer';
import ViewSource from '@components/view-source';
import { signIn, useSession } from "next-auth/client";
//@ts-ignore
import JSXStyle from 'styled-jsx/style'

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
};

export default function Layout({ children, className, hideNav, layoutStyles }: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;
  const [session] = useSession()
  return (
    <>
      <ViewSource />
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-logos']}>
              <MobileMenu key={router.asPath} />
              <Link href="/">
                {/* eslint-disable-next-line */}
                <a className={styles.logo}>
                  <Logo />
                </a>
              </Link>
            </div>
            <div className={styles.tabs}>
              {NAVIGATION.map(({ name, route }) => (
                <Link key={name} href={route}>
                  <a
                    className={cn(styles.tab, {
                      [styles['tab-active']]: activeRoute.startsWith(route)
                    })}
                  >
                    {name}
                  </a>
                </Link>
              ))}
            </div>
            <div>
              {!session &&
                <>

                  {/* <style jsx>{`
                  .logout {
                    color: var(--primary);
                  }
                `}</style> */}
                  <span className="logout" onClick={() => signIn()} >LOGIN</span>
                  <JSXStyle id="123">{`span.logout {cursor:pointer;color: var(--primary);}`}</JSXStyle>
                </>
              }
              {!!session &&
                <Link href="/api/auth/signout"><b><span style={{ cursor: "pointer", marginLeft: 32, color: "#0bb07a" }}>LOGOUT</span></b></Link>
              }
            </div>
            {/* <div className={cn(styles['header-right'])}>
              <HostedByVercel />
            </div> */}
          </header>
        )}
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          {!activeRoute.startsWith('/stage') && <Footer />}
        </div>
      </div>

    </>
  );
}
