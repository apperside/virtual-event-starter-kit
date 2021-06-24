import React from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import { GetServerSideProps } from "next";
import Header from "@components/header";
import Layout from "@components/layout";
import Page from "@components/page";
import { META_DESCRIPTION } from "@lib/constants";

export default function SignIn({ providers, csrfToken }: any) {
  const meta = {
    title: 'Expo - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", alignSelf: "stretch" }}>
          {/* <Header hero="Expo" description={meta.description} /> */}
          {Object.values(providers).map((provider: any) => {
            if (provider.name === "Email") {
              return;
            }
            return <div key={provider.name} style={{ marginTop: 20 }}>
              <input type="hidden" value={csrfToken} />
              <button className="button" onClick={() => signIn(provider.id, {
                callbackUrl: "http://localhost:3000/booked-events"
              })}>
                Sign in with {provider.name}
              </button>
            </div>
          })}
        </div>
      </Layout>
    </Page>
    // <Container maxW="xl" centerContent>
    //   <Heading as="h1" textAlign="center">
    //     Welcome to our custom page
    //   </Heading>
    //   <Box alignContent="center" justifyContent="center" marginTop={12}>
    //     <Box className="email-form">
    //       <form method="post" action="/api/auth/signin/email">
    //         <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //         <label>
    //           Email address
    //           <Input type="text" id="email" name="email" />
    //         </label>
    //         <Button type="submit">Use your Email</Button>
    //       </form>
    //     </Box>
    //     <Stack isInline marginTop={12}>
    //       {Object.values(providers).map((provider) => {
    //         if (provider.name === "Email") {
    //           return;
    //         }
    //         return (
    //           <Box key={provider.name}>
    //             <Button variant="outline" onClick={() => signIn(provider.id)}>
    //               Sign in with {provider.name}
    //             </Button>
    //           </Box>
    //         );
    //       })}
    //     </Stack>
    //   </Box>
    // </Container>
  );
}

export const getServerSideProps: any = async (context: any) => {

  const { req, res } = context;
  const session = await getSession({ req });

  // if (session && res) {
  //   // res.writeHead(302, {
  //   //   Location: "/",
  //   // });
  //   res.end();
  //   return;
  // }

  return {
    props: {
      session: null,
      providers: await providers(),
      csrfToken: await csrfToken(context),
    }
  };
};
