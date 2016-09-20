#!/bin/bash

cd build
git init
git remote add origin git@github.com:ahmednuaman/redux-counter.git
git add .
git commit -a -m 'deploy, yo'
git branch gh-pages
git checkout gh-pages
git branch -D master
git push origin gh-pages -f

echo "Deployed, yo"
