import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import AddFile from '@/components/AddFile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
    },
    {
      path: '/addfile',
      name: 'AddFile',
      component: AddFile,
    },
  ],
});
