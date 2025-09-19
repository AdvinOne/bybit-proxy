import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const upstream = process.env.UPSTREAM || 'https://api-demo.bybit.com';

app.use(cors());
app.use(compression());

app.use('/', createProxyMiddleware({
  target: upstream,
  changeOrigin: true,
  xfwd: true,
  secure: true,
  ws: true,
  logLevel: 'warn'
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Proxy up on', port, '→', upstream));
