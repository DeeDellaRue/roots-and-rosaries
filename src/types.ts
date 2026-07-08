/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TarotCard {
  id: string;
  numeral: string;
  title: string;
  faceText: string;
  message: string;
  accent: "gold" | "haint" | "burgundy";
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  duration?: string;
  price: string;
  accentText: string;
  description: string;
  details: string[];
}

export interface Petition {
  id: string;
  userName: string;
  email: string;
  serviceType: string;
  intention: string;
  createdAt: string;
  status: "active" | "ascended";
  candleColor: string;
  candlesCount: number;
}
