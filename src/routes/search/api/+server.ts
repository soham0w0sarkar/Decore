import { db } from '$lib/db';
import { eq } from 'drizzle-orm';

export const GET = async ({ url }) => {
	const q = url.searchParams.get('q');

	try {
		if (!q) {
			const categories = await db.query.categoryTable.findMany({
				limit: 10,
				columns: {
					name: true
				}
			});

			return new Response(JSON.stringify(categories), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const filteredCategories = await db.query.categoryTable.findMany({
			where: eq('name', q),
			columns: {
				name: true
			}
		});

		return new Response(JSON.stringify(filteredCategories), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: `Internal Server Error: ${error.message}` }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
