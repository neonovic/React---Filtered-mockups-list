export function flatten(into, node) {
  if (node == null) return into;
  if (Array.isArray(node)) return node.reduce(flatten, into);
  into.push(node);
  return flatten(into, node.children);
}

export function getFilteredUniqueCategoriesWithSlugAndTitle(
  mockupsData,
  categoriesData,
  initialCategory
) {
  return [initialCategory].concat(
    mockupsData
      .flatMap((item) => item.category)
      .filter((slug, i, arr) => arr.indexOf(slug) === i) // unique
      .filter((slug, i, arr) => arr.indexOf(slug.replace("_", "-")) === i) // filter duplicates
      .map((slug) => {
        // ochrana - kdyby se vyskytl slug, pro ktery nebude nalezen zaznam v categories.json
        let categoryFoundBySlug = categoriesData.find((o) => o.slug === slug);
        return {
          slug: slug,
          title: categoryFoundBySlug ? categoryFoundBySlug.title : slug
        };
      })
  );
}
