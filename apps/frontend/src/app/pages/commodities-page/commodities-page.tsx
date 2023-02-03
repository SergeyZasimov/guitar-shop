import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Catalog } from '../../components';

export interface CommoditiesPageProps { }

export function CommoditiesPage(props: CommoditiesPageProps): JSX.Element {
  const { pathname } = useLocation();
  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <Breadcrumbs />
          <Catalog location={ pathname } />
        </div>
      </section>
    </main>
  );
}

