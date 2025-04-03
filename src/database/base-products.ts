import type {
  CreateProductInput,
  Product,
} from '../modules/products/product.types'

export const baseProducts: (Omit<Product, 'id' | 'image'> & {
  imagePath: string
})[] = [
  {
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    imagePath: '../public/images/tradicional.png',
    price: 9.99,
    tags: ['tradicional'],
  },
  {
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    imagePath: "../public/images/americano.png",
    price: 9.99,
    tags: ['tradicional'],
  },
  {
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    imagePath: "../public/images/cremoso.png",
    price: 9.99,
    tags: ['tradicional'],
  },
  {
    name: 'Expresso Gelado',
    description: 'Café expresso tradicional com gelo',
    imagePath: "../public/images/gelado.png",
    price: 9.99,
    tags: ['tradicional', 'gelado'],
  },
  {
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    imagePath: "../public/images/com-leite.png",
    price: 9.99,
    tags: ['tradicional', 'com leite'],
  },
  {
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma',
    imagePath: "../public/images/latte.png",
    price: 9.99,
    tags: ['tradicional', 'com leite'],
  },
  {
    name: 'Capuccino',
    description: 'Bebida feita com café expresso, leite e espuma',
    imagePath: "../public/images/capuccino.png",
    price: 9.99,
    tags: ['tradicional', 'com leite'],
  },
  {
    name: 'Macchiato',
    description:
      'Café expresso misturado com um pouco de leite quente e espuma',
    imagePath: "../public/images/macchiato.png",
    price: 9.99,
    tags: ['tradicional', 'com leite'],
  },
  {
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, leite e chantilly',
    imagePath: "../public/images/mocaccino.png",
    price: 9.99,
    tags: ['tradicional', 'com leite'],
  },
  {
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    imagePath: "../public/images/chocolate-quente.png",
    price: 9.99,
    tags: ['especial', 'com leite'],
  },
  {
    name: 'Cubano',
    description:
      'Drink gelado de café expresso com rum, creme de leite e hortelã',
    imagePath: "../public/images/cubano.png",
    price: 9.99,
    tags: ['especial', 'alcoólico', 'gelado'],
  },
  {
    name: 'Havaiano',
    description:
      'Café típico do Hawaii, levemente adocicado e com notas frutadas',
    imagePath: "../public/images/havaiano.png",
    price: 9.99,
    tags: ['especial'],
  },
  {
    name: 'Árabe',
    description:
      'Bebida preparada com grãos de café árabe e especiarias, como canela e cardamomo',
    imagePath: "../public/images/arabe.png",
    price: 9.99,
    tags: ['especial'],
  },
  {
    name: 'Irlandês',
    description: 'Café expresso misturado com whisky, creme de leite e açúcar',
    imagePath: "../public/images/irlandes.png",
    price: 9.99,
    tags: ['especial', 'alcoólico'],
  },
]
