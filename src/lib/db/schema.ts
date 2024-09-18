import { pgTable, text, uuid, numeric, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const profileTable = pgTable('profile', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull()
});

export const categoryTable = pgTable('category', {
	id: uuid('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull()
});

export const productTable = pgTable('product', {
	id: uuid('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: numeric('price', { precision: 10, scale: 2 }).notNull(),
	stock: integer('stock').notNull(),
	imageUrl: text('image_url').notNull(),
	isFeatured: boolean('is_featured').default(false).notNull()
});

export const productCategoryTable = pgTable('product_category', {
	id: uuid('id').primaryKey(),
	productId: uuid('product_id')
		.notNull()
		.references(() => productTable.id),
	categoryId: uuid('category_id')
		.notNull()
		.references(() => categoryTable.id)
});

export const customerTable = pgTable('customer', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	phone: text('phone').notNull(),
	address: text('address').notNull(),
	city: text('city').notNull(),
	state: text('state').notNull(),
	zipCode: text('zip_code').notNull(),
	country: text('country').notNull()
});

export const orderTable = pgTable('order', {
	id: uuid('id').primaryKey(),
	customerId: uuid('customer_id')
		.notNull()
		.references(() => customerTable.id),
	totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
	status: text('status').notNull(), // e.g., pending, shipped, delivered
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const orderItemTable = pgTable('order_item', {
	id: uuid('id').primaryKey(),
	orderId: uuid('order_id')
		.notNull()
		.references(() => orderTable.id),
	productId: uuid('product_id')
		.notNull()
		.references(() => productTable.id),
	quantity: integer('quantity').notNull(),
	price: numeric('price', { precision: 10, scale: 2 }).notNull()
});

export const productReviewTable = pgTable('product_review', {
	id: uuid('id').primaryKey(),
	productId: uuid('product_id')
		.notNull()
		.references(() => productTable.id),
	customerId: uuid('customer_id')
		.notNull()
		.references(() => customerTable.id),
	rating: integer('rating').notNull(),
	review: text('review').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const cartItemTable = pgTable('cart_item', {
	id: uuid('id').primaryKey(),
	customerId: uuid('customer_id')
		.notNull()
		.references(() => customerTable.id),
	productId: uuid('product_id')
		.notNull()
		.references(() => productTable.id),
	quantity: integer('quantity').notNull(),
	addedAt: timestamp('added_at').defaultNow().notNull()
});

export const paymentTable = pgTable('payment', {
	id: uuid('id').primaryKey(),
	orderId: uuid('order_id')
		.notNull()
		.references(() => orderTable.id),
	amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
	method: text('method').notNull(),
	status: text('status').notNull(),
	paidAt: timestamp('paid_at')
});

export const wishlistTable = pgTable('wishlist', {
	id: uuid('id').primaryKey(),
	customerId: uuid('customer_id')
		.notNull()
		.references(() => customerTable.id),
	productId: uuid('product_id')
		.notNull()
		.references(() => productTable.id),
	addedAt: timestamp('added_at').defaultNow().notNull()
});

export const shippingTable = pgTable('shipping', {
	id: uuid('id').primaryKey(),
	orderId: uuid('order_id')
		.notNull()
		.references(() => orderTable.id),
	address: text('address').notNull(),
	city: text('city').notNull(),
	state: text('state').notNull(),
	zipCode: text('zip_code').notNull(),
	country: text('country').notNull(),
	shippedAt: timestamp('shipped_at'),
	deliveredAt: timestamp('delivered_at')
});

export const productRelations = relations(productTable, ({ many }) => ({
	categories: many(productCategoryTable),
	orderItems: many(orderItemTable),
	reviews: many(productReviewTable),
	cartItems: many(cartItemTable),
	wishlists: many(wishlistTable)
}));

export const categoryRelations = relations(categoryTable, ({ many }) => ({
	products: many(productCategoryTable)
}));

export const customerRelations = relations(customerTable, ({ many }) => ({
	orders: many(orderTable),
	reviews: many(productReviewTable),
	cartItems: many(cartItemTable),
	wishlists: many(wishlistTable)
}));

export const orderRelations = relations(orderTable, ({ many }) => ({
	orderItems: many(orderItemTable),
	payments: many(paymentTable),
	shippings: many(shippingTable)
}));

export const orderItemRelations = relations(orderItemTable, ({ one }) => ({
	product: one(productTable, {
		fields: [orderItemTable.productId],
		references: [productTable.id]
	}),
	order: one(orderTable, {
		fields: [orderItemTable.orderId],
		references: [orderTable.id]
	})
}));

export const productReviewRelations = relations(productReviewTable, ({ one }) => ({
	product: one(productTable, {
		fields: [productReviewTable.productId],
		references: [productTable.id]
	}),
	customer: one(customerTable, {
		fields: [productReviewTable.customerId],
		references: [customerTable.id]
	})
}));

export const cartItemRelations = relations(cartItemTable, ({ one }) => ({
	product: one(productTable, {
		fields: [cartItemTable.productId],
		references: [productTable.id]
	}),
	customer: one(customerTable, {
		fields: [cartItemTable.customerId],
		references: [customerTable.id]
	})
}));

export const wishlistRelations = relations(wishlistTable, ({ one }) => ({
	product: one(productTable, {
		fields: [wishlistTable.productId],
		references: [productTable.id]
	}),
	customer: one(customerTable, {
		fields: [wishlistTable.customerId],
		references: [customerTable.id]
	})
}));

export const shippingRelations = relations(shippingTable, ({ one }) => ({
	order: one(orderTable, {
		fields: [shippingTable.orderId],
		references: [orderTable.id]
	})
}));

export const paymentRelations = relations(paymentTable, ({ one }) => ({
	order: one(orderTable, {
		fields: [paymentTable.orderId],
		references: [orderTable.id]
	})
}));
