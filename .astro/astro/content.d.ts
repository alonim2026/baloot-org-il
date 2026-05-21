declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"acorns.md": {
	id: "acorns.md";
  slug: "acorns";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"kermes-oak-quercus-calliprinos.md": {
	id: "kermes-oak-quercus-calliprinos.md";
  slug: "kermes-oak-quercus-calliprinos";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"metzar-mount-tabor-oak-trees.md": {
	id: "metzar-mount-tabor-oak-trees.md";
  slug: "metzar-mount-tabor-oak-trees";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"registration-fee-donation.md": {
	id: "registration-fee-donation.md";
  slug: "registration-fee-donation";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אביבה-רבינוביץ.md": {
	id: "אביבה-רבינוביץ.md";
  slug: "אביבה-רבינוביץ";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אבינועם-דנין.md": {
	id: "אבינועם-דנין.md";
  slug: "אבינועם-דנין";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"איסוף-בלוטים.md": {
	id: "איסוף-בלוטים.md";
  slug: "איסוף-בלוטים";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אלון-התבור-mt-tabor-oak-quercus-ithaburensis.md": {
	id: "אלון-התבור-mt-tabor-oak-quercus-ithaburensis.md";
  slug: "אלון-התבור-mt-tabor-oak-quercus-ithaburensis";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אלון-חרמוני-quercus-look.md": {
	id: "אלון-חרמוני-quercus-look.md";
  slug: "אלון-חרמוני-quercus-look";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אלון-שסוע-turkish-oak-quercus-cerris.md": {
	id: "אלון-שסוע-turkish-oak-quercus-cerris.md";
  slug: "אלון-שסוע-turkish-oak-quercus-cerris";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אלון-תולע-cyprus-oak-quercus-infectoria-ssp-veneris.md": {
	id: "אלון-תולע-cyprus-oak-quercus-infectoria-ssp-veneris.md";
  slug: "אלון-תולע-cyprus-oak-quercus-infectoria-ssp-veneris";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אלונים-באמנות.md": {
	id: "אלונים-באמנות.md";
  slug: "אלונים-באמנות";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אלכסנדר-אייג.md": {
	id: "אלכסנדר-אייג.md";
  slug: "אלכסנדר-אייג";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"אמנון-ראובני.md": {
	id: "אמנון-ראובני.md";
  slug: "אמנון-ראובני";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"בלוט-זריעת-עצי-אלון-במרחב-הציבורי-בישר.md": {
	id: "בלוט-זריעת-עצי-אלון-במרחב-הציבורי-בישר.md";
  slug: "בלוט-זריעת-עצי-אלון-במרחב-הציבורי-בישר";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"האלון-רקע-כללי.md": {
	id: "האלון-רקע-כללי.md";
  slug: "האלון-רקע-כללי";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"האלונים-הגדולים-בישראל-אלון-התבור-מקו.md": {
	id: "האלונים-הגדולים-בישראל-אלון-התבור-מקו.md";
  slug: "האלונים-הגדולים-בישראל-אלון-התבור-מקו";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"האלונים-הגדולים-בישראל-אלון-מצוי-מקום.md": {
	id: "האלונים-הגדולים-בישראל-אלון-מצוי-מקום.md";
  slug: "האלונים-הגדולים-בישראל-אלון-מצוי-מקום";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"האלונים-הגדולים-בישראל.md": {
	id: "האלונים-הגדולים-בישראל.md";
  slug: "האלונים-הגדולים-בישראל";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"הדרכה-בנושא-עצים.md": {
	id: "הדרכה-בנושא-עצים.md";
  slug: "הדרכה-בנושא-עצים";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"זריעה-ושתילה.md": {
	id: "זריעה-ושתילה.md";
  slug: "זריעה-ושתילה";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"טקס-הכרזת-העמותה.md": {
	id: "טקס-הכרזת-העמותה.md";
  slug: "טקס-הכרזת-העמותה";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"יהודה-זיו.md": {
	id: "יהודה-זיו.md";
  slug: "יהודה-זיו";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"יהודה-מינדל.md": {
	id: "יהודה-מינדל.md";
  slug: "יהודה-מינדל";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ישראל-גינדל.md": {
	id: "ישראל-גינדל.md";
  slug: "ישראל-גינדל";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"מדריך-מצולם-של-עצי-אלון.md": {
	id: "מדריך-מצולם-של-עצי-אלון.md";
  slug: "מדריך-מצולם-של-עצי-אלון";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"מחקר.md": {
	id: "מחקר.md";
  slug: "מחקר";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"מיהו-האלון-מבוא-להכרת-הסוג.md": {
	id: "מיהו-האלון-מבוא-להכרת-הסוג.md";
  slug: "מיהו-האלון-מבוא-להכרת-הסוג";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"מיכאל-אבישי.md": {
	id: "מיכאל-אבישי.md";
  slug: "מיכאל-אבישי";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"מיכאל-זהרי.md": {
	id: "מיכאל-זהרי.md";
  slug: "מיכאל-זהרי";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"מפתח-להגדרת-מיני-האלון-בישראל.md": {
	id: "מפתח-להגדרת-מיני-האלון-בישראל.md";
  slug: "מפתח-להגדרת-מיני-האלון-בישראל";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"מקורות-וביבליוגרפיה.md": {
	id: "מקורות-וביבליוגרפיה.md";
  slug: "מקורות-וביבליוגרפיה";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ספרי-ילדים.md": {
	id: "ספרי-ילדים.md";
  slug: "ספרי-ילדים";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"עזריה-אלון.md": {
	id: "עזריה-אלון.md";
  slug: "עזריה-אלון";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"על-עצי-אלון-חינוך-והגות.md": {
	id: "על-עצי-אלון-חינוך-והגות.md";
  slug: "על-עצי-אלון-חינוך-והגות";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"עץ-האלון.md": {
	id: "עץ-האלון.md";
  slug: "עץ-האלון";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"צרעות-עפצים-ואלונים.md": {
	id: "צרעות-עפצים-ואלונים.md";
  slug: "צרעות-עפצים-ואלונים";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"שימוש-בעץ-האלון.md": {
	id: "שימוש-בעץ-האלון.md";
  slug: "שימוש-בעץ-האלון";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"תפוצת-האלונים-בישראל.md": {
	id: "תפוצת-האלונים-בישראל.md";
  slug: "תפוצת-האלונים-בישראל";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
};
"blog": {
"8-mto-regavim.md": {
	id: "8-mto-regavim.md";
  slug: "8-mto-regavim";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"an-updated-infrageneric-classification-of-the-oaks.md": {
	id: "an-updated-infrageneric-classification-of-the-oaks.md";
  slug: "an-updated-infrageneric-classification-of-the-oaks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"carmel-mountain-range-1940.md": {
	id: "carmel-mountain-range-1940.md";
  slug: "carmel-mountain-range-1940";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"et-mysterymiricoulus-redoak-regeneration.md": {
	id: "et-mysterymiricoulus-redoak-regeneration.md";
  slug: "et-mysterymiricoulus-redoak-regeneration";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"giant-fara-mto.md": {
	id: "giant-fara-mto.md";
  slug: "giant-fara-mto";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hagaimedini-plants-gan-yoshia.md": {
	id: "hagaimedini-plants-gan-yoshia.md";
  slug: "hagaimedini-plants-gan-yoshia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ioregistry-webinar-invitation.md": {
	id: "ioregistry-webinar-invitation.md";
  slug: "ioregistry-webinar-invitation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"israel-oak-registry-webinar.md": {
	id: "israel-oak-registry-webinar.md";
  slug: "israel-oak-registry-webinar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"life-is-nice-nadav-brings-life2acorns.md": {
	id: "life-is-nice-nadav-brings-life2acorns.md";
  slug: "life-is-nice-nadav-brings-life2acorns";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mixed-oak-coniferous-forest.md": {
	id: "mixed-oak-coniferous-forest.md";
  slug: "mixed-oak-coniferous-forest";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mto-transplantin-16-years-later.md": {
	id: "mto-transplantin-16-years-later.md";
  slug: "mto-transplantin-16-years-later";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"my-favorite-oak.md": {
	id: "my-favorite-oak.md";
  slug: "my-favorite-oak";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"neve-sharet-community-plants-nahal-pardesim-bank.md": {
	id: "neve-sharet-community-plants-nahal-pardesim-bank.md";
  slug: "neve-sharet-community-plants-nahal-pardesim-bank";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"omri-boneh-ioa-chairman.md": {
	id: "omri-boneh-ioa-chairman.md";
  slug: "omri-boneh-ioa-chairman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ongoing-human-impact-in-forests-of-the-upper-golan.md": {
	id: "ongoing-human-impact-in-forests-of-the-upper-golan.md";
  slug: "ongoing-human-impact-in-forests-of-the-upper-golan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"over3000oaksregistered.md": {
	id: "over3000oaksregistered.md";
  slug: "over3000oaksregistered";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"planting-oaks-on-the-alexander.md": {
	id: "planting-oaks-on-the-alexander.md";
  slug: "planting-oaks-on-the-alexander";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rafi-tzur-oaks-gvat.md": {
	id: "rafi-tzur-oaks-gvat.md";
  slug: "rafi-tzur-oaks-gvat";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"right-place-right-time.md": {
	id: "right-place-right-time.md";
  slug: "right-place-right-time";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"shir-celebrates-100-oaks.md": {
	id: "shir-celebrates-100-oaks.md";
  slug: "shir-celebrates-100-oaks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-land-lord-of-all-living-things.md": {
	id: "the-land-lord-of-all-living-things.md";
  slug: "the-land-lord-of-all-living-things";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-oaks-of-shfaram-hills.md": {
	id: "the-oaks-of-shfaram-hills.md";
  slug: "the-oaks-of-shfaram-hills";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-trio-oak-of-elyachin.md": {
	id: "the-trio-oak-of-elyachin.md";
  slug: "the-trio-oak-of-elyachin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"transplant-caabia-mt-tabor-oaks.md": {
	id: "transplant-caabia-mt-tabor-oaks.md";
  slug: "transplant-caabia-mt-tabor-oaks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"events": {
"ioa2025conference.md": {
	id: "ioa2025conference.md";
  slug: "ioa2025conference";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"אלונים-בישראל-יום-העיון-השנתי-לזכר-דר.md": {
	id: "אלונים-בישראל-יום-העיון-השנתי-לזכר-דר.md";
  slug: "אלונים-בישראל-יום-העיון-השנתי-לזכר-דר";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"הכנס-השנתי-הראשון-של-עמותת-אלוני-ישראל.md": {
	id: "הכנס-השנתי-הראשון-של-עמותת-אלוני-ישראל.md";
  slug: "הכנס-השנתי-הראשון-של-עמותת-אלוני-ישראל";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"הכנס-השנתי-השני-של-עמותת-אלוני-ישראל.md": {
	id: "הכנס-השנתי-השני-של-עמותת-אלוני-ישראל.md";
  slug: "הכנס-השנתי-השני-של-עמותת-אלוני-ישראל";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
};
"guides": {
"acorns.md": {
	id: "acorns.md";
  slug: "acorns";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"הדרכה-בנושא-עצים.md": {
	id: "הדרכה-בנושא-עצים.md";
  slug: "הדרכה-בנושא-עצים";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"מדריך-מצולם-של-עצי-אלון.md": {
	id: "מדריך-מצולם-של-עצי-אלון.md";
  slug: "מדריך-מצולם-של-עצי-אלון";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
};
"pages": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"home.md": {
	id: "home.md";
  slug: "home";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
};
"projects": {
"israel-oak-map.md": {
	id: "israel-oak-map.md";
  slug: "israel-oak-map";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sowing-planting-oak-trees.md": {
	id: "sowing-planting-oak-trees.md";
  slug: "sowing-planting-oak-trees";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"אלון-לכל-אחד.md": {
	id: "אלון-לכל-אחד.md";
  slug: "אלון-לכל-אחד";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"אשרנו-אלונים-בשרון.md": {
	id: "אשרנו-אלונים-בשרון.md";
  slug: "אשרנו-אלונים-בשרון";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"האלון-העץ-הלאומי-של-ישראל.md": {
	id: "האלון-העץ-הלאומי-של-ישראל.md";
  slug: "האלון-העץ-הלאומי-של-ישראל";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"השוות-עצי-אלון-התבור-לפארק-השרון.md": {
	id: "השוות-עצי-אלון-התבור-לפארק-השרון.md";
  slug: "השוות-עצי-אלון-התבור-לפארק-השרון";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"חורשות-אלונים.md": {
	id: "חורשות-אלונים.md";
  slug: "חורשות-אלונים";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"יום-האלון-השנתי.md": {
	id: "יום-האלון-השנתי.md";
  slug: "יום-האלון-השנתי";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"שיקום-נחל-עדה.md": {
	id: "שיקום-נחל-עדה.md";
  slug: "שיקום-נחל-עדה";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
