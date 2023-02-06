import { useParams } from 'react-router-dom';
import { Breadcrumbs, ProductForm } from '../../components';
import { useAppSelector } from '../../hooks/store.hooks';
import { getProductById } from '../../store/features/product/product-slice';

export interface EditProductPageProps { }

export function EditProductPage(props: EditProductPageProps): JSX.Element {
  const { productId } = useParams();
  const product = useAppSelector((state) => getProductById(state, productId));

  return (
    <main className="page-content">
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">{ product?.title }</h1>
          <Breadcrumbs entityTitle={ product?.title } />
          <ProductForm product={ product } />
        </div>
      </section>
    </main>
  );
}

