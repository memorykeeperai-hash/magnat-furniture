/**
 * Converts a string into an SEO-friendly slug.
 * - lowercase
 * - spaces -> hyphens
 * - remove special characters
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars (except -)
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

/**
 * Ensures a slug is unique by appending a suffix if necessary.
 * This is intended to be used in a Server Action with DB access.
 */
export async function ensureUniqueSlug(
  baseSlug: string,
  table: string,
  supabase: any,
  id?: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  let exists = true;

  while (exists) {
    let query = supabase
      .from(table)
      .select('id')
      .eq('slug', slug);
    
    // If updating, ignore the current record
    if (id && id !== 'new') {
      query = query.neq('id', id);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error checking slug uniqueness:', error);
      break;
    }

    if (data && data.length > 0) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    } else {
      exists = false;
    }
  }

  return slug;
}
