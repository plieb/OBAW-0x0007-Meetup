[logo]: https://github.com/plieb/OBAW-0x0007-Meetup/blob/master/assets/OBAW%20-%20Week%200x0007.png "Meetup + Recast.AI"
![Meetup + Recast.AI][logo]

This bot is part of the #[OBAW Github](https://github.com/plieb/OBAW) project - Week 0x0007 - Meetup

Medium publication project page #[OBAW Medium](https://medium.com/the-obaw-project)

Medium publication Meetup project #[OBAW Meetup](https://medium.com/the-obaw-project/obaw-project-week-0x0007-meetup-1aca9c5f1dff#)

# Meetup Bot for Facebook Messenger using Recast.AI

A [Meetup](https://www.meetup.com/)-powered bot using [Recast.AI](https://recast.ai) NLP

Follow the instructions below to create your own instance of the bot:

## Step 1: Deploy the Bot

1. Make sure you are logged in to the [Heroku Dashboard](https://dashboard.heroku.com/)
1. Click the button below to deploy the Messenger bot on Heroku:

    [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

1. Fill in the config variables as described.

    - For **LANGUAGE** put 'en'
    - For **REQUEST_TOKEN** blank for now (filled at step 2)
    - For **MEETUP_API_KEY** blank for now (filled at step 4)

## Step 2: Get your Recast.AI bot

1. Make sure youhttps://github.com/plieb/OBAW-0x0007-Meetup are logged in to your [Recast.AI account](https://recast.ai/)
1. Follow this link [Meetup Bot](https://recast.ai/pe/obaw-0x0007-meetup/learn) and fork the bot to your account
1. Copy paste your `bot request access token` in the **Config Variables** section of your Heroku app to `REQUEST_TOKEN`

## Step 3: Connect your bot to Messenger

1. Go to your **RUN** tab
1. Click the **Bot Connector** tab and follow instructions to add a Messenger channel
1. Once it's done at the top set your **Current bot webhook** to :
    - Heroku URL + **/webhook** (MY_HEROKU_URL.heroku.com/webhook)

## Step 4: Get your Meetup API Key

1. Make sure you are logged in to your [Meetup account](https://www.meetup.com/)
1. Follow this link [Meetup API](https://secure.meetup.com/meetup_api/key/) and get your API key
1. Paste your `API Key` in the **Config Variables** section of your Heroku app to `MEETUP_API_KEY`

## Author

PE Lieb [@liebpe](https://twitter.com/liebpe)

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## Special thanks

- [Meetup API](https://www.meetup.com/meetup_api/)
