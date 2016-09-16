# Angular2 basic components with routing and services

Simple test of the Angular2 routing component based on the sample/tutorial application on
the [Angular Routing](https://angular.io/docs/ts/latest/guide/router.html) site.

All the application content is hosted behind an nginx web server running in a container. It
also has a crude example of using a service to access a remote HTTP-based API (Docker Engine).

Note this is currently dependent on another nginx instance acting as a proxy in front of the
Docker Engine API instances. I was having trouble with the Docker Engine's "--api-cors-header"
and a browser's initial OPTIONS request.

## ToDo

- Try the --api-cors-header again with Docker 1.12 / v24 API

## Contact

Email: tithomas@cisco.com

For more information on AngularJS please check out http://angularjs.org/