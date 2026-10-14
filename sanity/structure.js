export const structure = S =>
  S.list()
    .title('Conteúdo')
    .items([
      S.documentTypeListItem('post').title('Posts do blog'),
      S.documentTypeListItem('category').title('Categorias'),
    ]);
