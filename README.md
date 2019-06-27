# CompanyPresentation

This repository showcases the use of Angular with [CosmicJS](cosmicjs.com), a headless CMS service, to create a simple yet flexible website for a company, freelance, etc. Bulma has been chosen as the CSS framework due to its simplicity.

## How to start

Once you've got your CosmicJS App created, fill the data on the `environment` files as follows:
```
{
  production: true|false,
  read_key: 'COSMIC_READ_KEY',
  write_key: 'COSMIC_WRITE_KEY',
  bucket_slug: 'BUCKET_SLUG',
  URL: 'https://api.cosmicjs.com/v1/',
  presets: 'YOUR_PRESETS_OBJECT_SLUG'
}
```
The `cosmic interceptor` will make sure to send the read and write keys when communicating with the CMS.

## About the project

### Structure

* `App` module will fetch the main presets defined in the CMS, this will define the main page, title of the site, navigation, etc.

* `Core` module holds the service to communicate with the CMS and components used across all the site. It also contains other services, guards and interceptors that will ensure the behaviour of the site is correct.

* `Pages` module is a lazy loaded module that contain the components to show the content pulled from the CMS. It's essentially the body of the website.

* `Shared` module contains elements that can be reused on any other module. It holds a pipe to allow HTML content pulled from the CMS to bypass sanitization.

### Route management

The `Pages` module will sit at the root path: virtually, any URL could be a `page` requested to the CMS. If there is no `page` specified (e.g., when the user hits the root URL), then the `homepage guard` will get the default page from the `presets`. If the URL specified doesn't match any known `page` on the CMS, the `http-error interceptor` will intercept the 404 error and redirect accordingly.

### Features

`cosmic service` has cache implemented so the API consumption is reduced to a minimum.

`analytics service` will automatically send pageviews of your production instance to Google Analytics. The tracking ID has to be set on the presets.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
