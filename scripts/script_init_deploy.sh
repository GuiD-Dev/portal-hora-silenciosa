#! /bin/bash

git --work-tree dist/spa checkout --orphan deploy
git --work-tree dist/spa add --all
git --work-tree dist/spa commit -m 'Init Deploy'
git push --all
git checkout -f master
