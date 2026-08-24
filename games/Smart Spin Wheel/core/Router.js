export default class Router {

    constructor() {

        this.routes = new Map();

    }


    register(name, callback) {

        this.routes.set(
            name,
            callback
        );

    }


    navigate(name, data = null) {

        const route =
            this.routes.get(name);

        if (!route) {
            return;
        }

        route(data);

    }

}