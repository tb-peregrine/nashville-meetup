"use client";

import { Subtitle, Title, Card } from '@tremor/react';
import TopSalesDays from './components/topSalesDays'
import React from 'react';

const TB_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST;
const TB_TOKEN = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN;

export default function BuildDashboard() {
  let host = TB_HOST;
  let token = TB_TOKEN;

  return (
    <main>
      <Title className="chart-title">Real-Time Dashboard</Title>
      <Subtitle className="chart-subtitle">Built with Tinybird, Confluent, and Next.js</Subtitle>
      <TopSalesDays
        host={host}
        token={token}
      />
  </main>
  );
};