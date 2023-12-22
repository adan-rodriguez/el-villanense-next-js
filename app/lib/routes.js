export const routes = {
  root: "/",
  routes: {
    articles: { root: "/routes/articles" },
    cloudinary: { root: "/routes/cloudinary" },
    revalidate: { root: "/routes/revalidate" },
  },
  login: { root: "/login" },
  dashboard: {
    root: "/dashboard",
    new: { root: "/dashboard/nuevo" },
    edit: { root: "/dashboard/editar" },
    articles: { root: "/dashboard/articulos" },
  },
  authors: { root: "/autores" },
};
