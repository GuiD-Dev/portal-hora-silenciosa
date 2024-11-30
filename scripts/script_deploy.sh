#! /bin/bash

NOME_BRANCH="deploy-tmp-branch"

quasar build -m spa
git --work-tree dist/spa checkout --orphan $NOME_BRANCH
git --work-tree dist/spa add --all
git --work-tree dist/spa commit -m new-deploy
git checkout -f deploy
git merge $NOME_BRANCH -X theirs --allow-unrelated-histories
git push origin deploy
git checkout -f master
git branch -D $NOME_BRANCH

