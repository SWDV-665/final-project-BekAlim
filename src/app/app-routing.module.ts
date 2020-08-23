import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-modal',
    loadChildren: () => import('./modals/add-modal/add-modal.module').then( m => m.AddModalPageModule)
  },
  {
    path: 'info-modal',
    loadChildren: () => import('./modals/info-modal/info-modal.module').then( m => m.InfoModalPageModule)
  },
  {
    path: 'edit-modal',
    loadChildren: () => import('./modals/edit-modal/edit-modal.module').then( m => m.EditModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
