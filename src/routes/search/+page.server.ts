import { db } from '$lib/db';
import * as schema from '$lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

export const load = async ({ url }) => {
	const id = url.searchParams.get('id');
	const type = url.searchParams.get('type');

	try {
		const products = [];

		if (type === 'product' && id) {
			const product = await db
				.select()
				.from(schema.productTable)
				.where(eq(schema.productTable.id, id))
				.execute();

			if (product.length > 0) {
				products.push(product[0]);

				const productCategories = await db
					.select()
					.from(schema.productCategoryTable)
					.where(eq(schema.productCategoryTable.productId, id))
					.execute();

				const categoryIds = productCategories.map((pc) => pc.categoryId);

				if (categoryIds.length > 0) {
					const relatedProductIds = await db
						.select()
						.from(schema.productCategoryTable)
						.where(inArray(schema.productCategoryTable.categoryId, categoryIds))
						.execute()
						.then((rows) => rows.map((row) => row.productId))
						.then((productIds) => productIds.filter((productId) => productId !== id));

					const relatedProducts = await db
						.select()
						.from(schema.productTable)
						.where(inArray(schema.productTable.id, relatedProductIds))
						.execute();

					products.push(...relatedProducts);
				}
			} else {
				return { error: 'Not Found' };
			}
		} else if (type === 'category' && id) {
			const category = await db
				.select()
				.from(schema.categoryTable)
				.where(eq(schema.categoryTable.id, id))
				.execute();

			if (category.length > 0) {
				const productIdsInCategory = await db
					.select()
					.from(schema.productCategoryTable)
					.where(eq(schema.productCategoryTable.categoryId, id))
					.execute()
					.then((rows) => rows.map((row) => row.productId));

				const productsInCategory = await db
					.select()
					.from(schema.productTable)
					.where(inArray(schema.productTable.id, productIdsInCategory))
					.execute();

				products.push(...productsInCategory);
			}
		} else {
			return { error: 'Not Found' };
		}

		return { products };
	} catch (error) {
		console.error('Error fetching products:', error);
		return { error: 'Internal Server Error' };
	}
};
