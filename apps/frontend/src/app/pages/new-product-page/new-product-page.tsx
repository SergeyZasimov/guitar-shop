import { Breadcrumbs, ProductForm } from '../../components';

export interface NewProductPageProps { }

export function NewProductPage(): JSX.Element {
  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <Breadcrumbs />
          <ProductForm />
        </div>
      </section>
    </main>
  );
}
