import Vue from 'vue';
import Router from 'vue-router';
import CheckFile from '@/components/CheckFile';
import AddFile from '@/components/AddFile';
import ViewFile from '@/components/ViewFile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CheckFile',
      component: CheckFile,
    },
    {
      path: '/addfile',
      name: 'AddFile',
      component: AddFile,
    },
    {
      path: '/file/:digest',
      component: ViewFile,
    },
  ],
});
