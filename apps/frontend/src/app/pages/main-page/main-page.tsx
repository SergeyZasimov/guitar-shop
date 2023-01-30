import { Breadcrumbs, CatalogFilter, CatalogSort, Footer, Header, Pagination, ProductList } from '../../components';
import { useAppSelector } from '../../hooks/store.hooks';
import { getProducts } from '../../store/features/product/product-slice';


export function MainPage() {
  const products = useAppSelector(getProducts);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <ProductList products={ products } />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
