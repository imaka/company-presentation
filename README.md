# Textual Studio

This is a company portfolio website using Angular and Contenful.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## About the project

### Modules

- `App` module will fetch the main presets defined in the CMS, this will define the main page, title of the site, navigation, etc. It will also initialize the tracking service.

- `Core` module holds the service to communicate with the CMS and components used across all the site. It also contains other services, guards and interceptors that will ensure the behaviour of the site is correct and several components to compose the layout of the site.

- `Shared` module contains elements that can be reused on any other module. It holds a pipe to allow HTML content pulled from the CMS to bypass sanitization and a directive to detect internal links (injected from the CMS) and parse them through the Angular router.

- `Pages` module is a lazy loaded module that contain the components to show the content pulled from the CMS. It's essentially the body of the website.

- `Not Found`
- `Coming Soon`
- `Ng Simple Analytics`

### Route management

The `Pages` module will sit at the root path: virtually, any URL could be a `page` requested to the CMS. If there is no `page` specified (e.g., when the user hits the root URL), then the `homepage guard` will get the default page from the `presets`. If the URL specified doesn't match any known `page` on the CMS, the `http-error interceptor` will intercept the 404 error and redirect accordingly.
