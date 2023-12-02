#!/bin/bash

echo -n "What day?"
read day
cp -R src/routes/day "src/routes/day$day"
cp -R static/day "static/day$day"