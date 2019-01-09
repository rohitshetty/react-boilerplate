This is a minimal boiler plate code for my future react projects. This is based off from this interesting [article](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) by [Jedai Saboteur](https://twitter.com/jedaisaboteur). 

I have made the following changes to the original article's recommended setup:

1. Remove dependency of `/public` folder when serving the site. All the assets and stuff should be in `/dist`. This is important to just deploy off the build output to static file hosts.
2. Disable serving of files from `/public`
3. Prevent Relative path imports to escape the agony of `import xyz from '../../../../a/b/c'`.

This was also my exercise in learning about how to setup a react project from scratch. I highly recommend going through the above article once and checking out the webpack.config.js (If possible recreate the files according to the article)


##### To Run:
- `npm install`
- `npm run serve` serves the file to `localhost:3000`
- `npm run build` builds and outputs the result in `/dist`

##### TODO: 
- Add scripts to deploy the `/dist` output to static file hosting services like `surge.sh` or `github-pages` 