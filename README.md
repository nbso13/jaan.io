# [nicko.io (Preview here)](https://nicko.io)

This Jekyll theme powers my personal website.

This is forked from [Jaan Altosaar](http://jaan.io)'s theme with heavy inspiration from his website.

Setup and settings are similar to [Balzac](https://github.com/ColeTownsend/Balzac-for-Jekyll)'s. Please file an issue if something is not clear or you have any questions.

## Testing locally

`jekyll serve --config _config.yml,_config_dev.yml --watch`

`scss -t compress assets/sass/i.scss assets/css/i.css`

Check for broken internal and external links:
`rake test`

## Deploying

Deploy with [s3_website](https://github.com/laurilehmijoki/s3_website). Use the `.env` file to set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables.
Build with `bundle exec jekyll build`, deploy to S3 with `s3_website push`.

### Managing ruby on a mac
Use rbenv. As in [this guide](https://gorails.com/setup/osx/10.12-sierra).

On a mac, use rvm for managing ruby environment.

Use bundler for managing gems:
`gem install bundler`
Run from root of the repo:
`bundler install`
Important: need to rehash to create symbolic links to gems like jekyll -
`rbenv rehash`
Then run jekyll commands:
`jekyll build`

### Updating google metadata
* Update index.md, about.md, home.html

## License

Use this for anything you want.
