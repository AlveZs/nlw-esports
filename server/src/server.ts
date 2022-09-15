import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId: string = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hoursStart: true,
      hoursEnd: true,
      useVoiceChannel: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHourString(ad.hoursStart),
      hoursEnd: convertMinutesToHourString(ad.hoursEnd),
    }
  }));
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const { 
    name,
    yearsPlaying,
    discord,
    weekDays,
    hoursStart,
    hoursEnd,
    useVoiceChannel,
  } = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hoursStart: convertHourStringToMinutes(hoursStart),
      hoursEnd: convertHourStringToMinutes(hoursEnd),
      useVoiceChannel,
    }
  });

  return response.status(201).json(ad)
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json({ discord: ad.discord });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running');
});