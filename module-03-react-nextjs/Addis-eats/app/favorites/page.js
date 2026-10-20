import { redirect } from 'next/navigation';
import { getSession } from '../../lib/session';
import FavouritesClient from './FavouritesClient';

export const metadata = {
  title: 'Favourites',
  description: 'Your saved favourite dishes on Addis Eats.',
};

export default async function FavouritesPage() {
  const session = await getSession();
  if (!session) redirect('/signin?next=/favorites');
  return <FavouritesClient />;
}
