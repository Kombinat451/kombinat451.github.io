### After updating

First generate static pages
```
npm run generate
```
check out gh-pages branch
```
git checkout gh-pages
```

Update the static pages - to be automated!
```
clean up docs
git rm -r docs/
git restore --staged docs/.nojekyll docs/CNAME
git restore docs/.nojekyll docs/CNAME
cp -r dist/* docs/
git add docs/
git commit -m "Update static pages"
git push
```
