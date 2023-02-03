import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Catalog } from '../../components';

export function MainPage(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <Catalog location={ pathname } />
        </div>
      </main>
    </>
  );
}

