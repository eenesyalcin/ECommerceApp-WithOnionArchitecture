import { Routes } from '@angular/router';

export const routes: Routes = [
  // 📌 Uygulama açıldığında UI Home sayfasına yönlendir
  { path: "", redirectTo: "ui/home", pathMatch: "full" },

  // 📌 UI Routes (Kullanıcı Arayüzü)
  {
    path: "ui",
    children: [
      { path: "home", loadComponent: () => import('./ui/components/home/home.component').then(m => m.HomeComponent) },
      { path: "products", loadComponent: () => import('./ui/components/products/products.component').then(m => m.ProductsComponent) },
      { path: "baskets", loadComponent: () => import('./ui/components/baskets/baskets.component').then(m => m.BasketsComponent) },
      { path: "register", loadComponent: () => import('./ui/components/register/register.component').then(m => m.RegisterComponent)},
      { path: "login", loadComponent: () => import('./ui/components/login/login.component').then(m => m.LoginComponent)},
      { path: "", redirectTo: "home", pathMatch: "full" } // UI içindeki boş path home’a yönlendirilmeli
    ]
  },

  // 📌 Admin Routes (Yönetici Paneli)
  {
    path: "admin",
    loadComponent: () => import('./admin/components/layout/layout.component').then(m => m.LayoutComponent), // ✅ Sadece 1 kez yüklenecek
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" }, // `/admin` path'ine girildiğinde dashboard açılmalı
      { path: "dashboard", loadComponent: () => import('./admin/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: "products", loadComponent: () => import('./admin/components/products/products.component').then(m => m.ProductsComponent) },
      { path: "orders", loadComponent: () => import('./admin/components/orders/orders.component').then(m => m.OrdersComponent) },
      { path: "customers", loadComponent: () => import('./admin/components/customers/customers.component').then(m => m.CustomersComponent) }
    ]
  },

  // 📌 Geçersiz URL durumunda "ui/home" sayfasına yönlendirme
  { path: "**", redirectTo: "ui/home" }
];
