import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({ name: 'title', title: 'Nome', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      description: 'Gerado a partir do nome. Clique em "Generate".',
      options: { source: 'title', maxLength: 64 },
      validation: r => r.required(),
    }),
  ],
});
