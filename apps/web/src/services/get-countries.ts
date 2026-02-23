import { CountryRepository } from '@/repositories';

export async function getAllCountries(repo: CountryRepository) {
  return repo.findAll();
}
