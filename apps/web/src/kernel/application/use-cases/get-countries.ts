import { CountryRepository } from '../../domain/repositories';

export async function getAllCountries(repo: CountryRepository) {
  return repo.findAll();
}
