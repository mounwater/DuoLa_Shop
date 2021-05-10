import { get } from '../utils/request';

export function loadCommidity() {
  return get('/api/v1/admin/product_categories');
}
