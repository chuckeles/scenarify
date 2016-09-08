/**
 * Definition of all the top-level routes in the app.
 */


import VueRouter from 'vue-router';

import Home from '../components/home/home';

/**
 * Map the top-level routes to components.
 */
export default {
    map(router) {
        router.map({
            '/': {
                component: Home
            }
        });
    }
};
