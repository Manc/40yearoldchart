import PGP from 'pg-promise';

const pgp = PGP();
const db = pgp(process.env.POSTGRES_URL!);

type CountryAttributes = {
	id: number | string;
	name: string;
	iso2: string;
	iso3: string;
	local_name: string | null;
	continent: string | null;
};

export function findCountries(): Promise<CountryAttributes[]> {
	return db.any(
		'SELECT ${columns:name} FROM ${table:name} WHERE id > ${minID} LIMIT 5',
		{
			columns: '*',
			table: 'countries',
			minID: 14,
		}
	);
}
