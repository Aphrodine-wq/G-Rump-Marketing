// This utility loads all markdown files from the docs directory
// and exposes them as a map of slug -> content.

// Vite glob import for all markdown files in the docs directory
const modules = import.meta.glob('/docs/**/*.md', { as: 'raw', eager: true });

export interface DocFile {
  slug: string;
  content: string;
  path: string;
}

export const getDocContent = (slug: string): string | null => {
  // Normalize slug
  const normalizedSlug = slug.replace(/^\//, '').replace(/\/$/, '');
  
  // Try to find exact match first
  let match = Object.keys(modules).find(path => {
    const pathSlug = path
      .replace('/docs/', '')
      .replace('.md', '')
      .replace(/\/index$/, ''); // Handle index files if any
      
    return pathSlug === normalizedSlug;
  });

  // Fallback: try finding index.md if slug is a directory
  if (!match) {
    match = Object.keys(modules).find(path => {
       const pathSlug = path.replace('/docs/', '').replace('/index.md', '');
       return pathSlug === normalizedSlug;
    });
  }

  // Fallback: try case-insensitive match (as some files are UPPERCASE)
  if (!match) {
     match = Object.keys(modules).find(path => {
        const pathSlug = path
          .replace('/docs/', '')
          .replace('.md', '')
          .toLowerCase();
        return pathSlug === normalizedSlug.toLowerCase();
     });
  }

  if (match) {
    return modules[match] as unknown as string;
  }
  
  return null;
};

export const getAllDocs = (): DocFile[] => {
  return Object.keys(modules).map(path => {
    const slug = path
      .replace('/docs/', '')
      .replace('.md', '')
      .replace(/\/index$/, '');
      
    return {
      slug,
      path,
      content: modules[path] as unknown as string
    };
  });
};
