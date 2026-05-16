#!/bin/bash
# Seed database if empty, then start the app
node seed.js && node src/app.js
