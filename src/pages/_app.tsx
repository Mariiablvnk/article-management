import  AOSInit from '../components/aosProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import Layout from '../components/layout';
import { ArticleProvider } from '../context/articleProvider'

const cactus = localFont({
  src: './Cactus_Jack.woff',
  display: 'swap',
  variable: '--font-cactus',
})

const bebas = localFont({
  src: './Bebas_Neue.ttf',
  display: 'swap',
  variable: '--font-bebas',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Find Your Sound',
  description: 'Generated by create next app',
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <AOSInit />
      <div className={`${bebas.variable} ${poppins.variable} ${cactus.variable}`}>
        <Layout>
          <ArticleProvider>
            <Component {...pageProps} />
          </ArticleProvider>
        </Layout>
      </div>
    </ClerkProvider>
  );
}