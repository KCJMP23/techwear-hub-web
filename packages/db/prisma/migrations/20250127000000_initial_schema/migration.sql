-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED');

-- CreateEnum
CREATE TYPE "ApiService" AS ENUM ('OPENAI', 'CLAUDE', 'LEONARDO', 'AMAZON');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sites" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "settings" JSONB,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "site_id" TEXT NOT NULL,
    "featured_image_url" TEXT,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" TEXT NOT NULL,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "key_takeaways" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "affiliate_url" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "image_url" TEXT,
    "site_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "review_count" INTEGER,
    "custom_fields" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clicks" (
    "id" TEXT NOT NULL,
    "affiliate_url" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "visitor_ip" TEXT,
    "user_agent" TEXT,
    "referrer" TEXT,
    "clicked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "conversion_value" DOUBLE PRECISION,

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_subscriptions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "subscribed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service" "ApiService" NOT NULL,
    "key_hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used" TIMESTAMP(3),

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_email_site_id_key" ON "newsletter_subscriptions"("email", "site_id");

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsletter_subscriptions" ADD CONSTRAINT "newsletter_subscriptions_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Enable Row Level Security
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sites" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "clicks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "newsletter_subscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "api_keys" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON "users"
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own profile" ON "users"
    FOR UPDATE USING (auth.uid()::text = id);

-- RLS Policies for sites table
CREATE POLICY "Users can view their own sites" ON "sites"
    FOR SELECT USING (auth.uid()::text = owner_id);

CREATE POLICY "Users can insert their own sites" ON "sites"
    FOR INSERT WITH CHECK (auth.uid()::text = owner_id);

CREATE POLICY "Users can update their own sites" ON "sites"
    FOR UPDATE USING (auth.uid()::text = owner_id);

CREATE POLICY "Users can delete their own sites" ON "sites"
    FOR DELETE USING (auth.uid()::text = owner_id);

-- RLS Policies for posts table
CREATE POLICY "Users can view posts from their sites" ON "posts"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = posts.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert posts to their sites" ON "posts"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = posts.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can update posts from their sites" ON "posts"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = posts.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can delete posts from their sites" ON "posts"
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = posts.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

-- RLS Policies for products table
CREATE POLICY "Users can view products from their sites" ON "products"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = products.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert products to their sites" ON "products"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = products.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can update products from their sites" ON "products"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = products.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can delete products from their sites" ON "products"
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = products.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

-- RLS Policies for clicks table
CREATE POLICY "Users can view clicks from their sites" ON "clicks"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = clicks.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert clicks to their sites" ON "clicks"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = clicks.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

-- RLS Policies for newsletter_subscriptions table
CREATE POLICY "Users can view subscriptions from their sites" ON "newsletter_subscriptions"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = newsletter_subscriptions.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert subscriptions to their sites" ON "newsletter_subscriptions"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = newsletter_subscriptions.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can update subscriptions from their sites" ON "newsletter_subscriptions"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = newsletter_subscriptions.site_id 
            AND sites.owner_id = auth.uid()::text
        )
    );

-- RLS Policies for api_keys table
CREATE POLICY "Users can view their own API keys" ON "api_keys"
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own API keys" ON "api_keys"
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own API keys" ON "api_keys"
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own API keys" ON "api_keys"
    FOR DELETE USING (auth.uid()::text = user_id);