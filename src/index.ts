import 'dotenv/config';
import express from 'express';
import globalRouter from './global-router';
import { logger } from './logger';
import OpenAI from 'openai';
import axios from 'axios';
import * as fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);

const getLaptopsFromAPage = async (pageId) => {
  try {
    const response = await axios.get(
      'https://kaspi.kz/yml/product-view/pl/results',
      {
        params: {
          page: pageId,
          q: ':category:Notebooks:availableInZones:Magnum_ZONE1',
          text: '',
          sort: 'relevance',
          qs: '',
          ui: 'd',
          i: -1,
          c: 750000000,
        },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          Accept: 'application/json, text/*',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'sec-ch-ua':
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-ks-city': '750000000',
          Cookie:
            '_hjSessionUser_283363=eyJpZCI6ImIyMmI3OTY4LThkYzAtNTJjYi1hNmRlLWY3YzAwZGY4ZWYxZSIsImNyZWF0ZWQiOjE3MTg2MjU3Mjk4OTcsImV4aXN0aW5nIjpmYWxzZX0=; k_stat=f7a78b01-408d-4b65-ba91-16cb2fb94948; _hjSession_283363=eyJpZCI6ImUzZGE0M2M1LWE5YWUtNDYwOC05YTJlLTFmYjRiNDFiNTE2NyIsImMiOjE3MTg2MjU3Mjk4OTksInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MX0=; ks.tg=96; amp_6e9c16=-2cya7qSHE5mv_Rl7mV09v...1i0j16ve8.1i0j16ve8.0.0.0; current-action-name=Index; locale=ru-RU; kaspi.storefront.cookie.city=750000000',
          Referer: 'https://kaspi.kz/shop/c/notebooks/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data from page ${pageId}:`, error);
    return [];
  }
};

const parseLaptops = async () => {
  const laptopsToSave: any = [];
  for (let i = 1; i < 15; ++i) {
    const laptopsFromPage: any = await getLaptopsFromAPage(i);
    laptopsToSave.push(...laptopsFromPage);
  }
  fs.writeFileSync('laptops.json', JSON.stringify(laptopsToSave, null, 2));
};

// parseLaptops();

const filterLaptops = () => {
  const laptops = JSON.parse(fs.readFileSync('laptops.json', 'utf-8'));
  const filteredLaptops = laptops.map((laptop: any) => ({
    title: laptop.title,
    brand: laptop.brand,
    price: laptop.unitPrice,
    image: laptop.previewImages[0].medium,
    url: laptop.shopLink,
  }));
  fs.writeFileSync(
    'filtered-laptops.json',
    JSON.stringify(filteredLaptops, null, 2)
  );
};

// filterLaptops();

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
